// ===== NORMALIZE PRODUCT LIST - COMPLETE IMPLEMENTATION =====
// Tool for n8n workflow: maps supplier products to master_list using vector search

const input = $input.first().json;
const userData = $('Prepare User Context').first().json;

console.log('🔧 [Normalize] Supplier:', userData.phone_number);

// ===== CHECK IF USER IS SUPPLIER =====
if (userData.is_new_user || !userData.supplier_id) {
  console.log('❌ [Normalize] Not a supplier');
  return JSON.stringify({
    error: true,
    message: 'Você precisa estar cadastrado como fornecedor.'
  });
}

// ===== GET PRICE LIST FROM SESSION =====
let priceList = null;
let sessionId = null;

if (userData.has_active_session) {
  const session = userData.active_session;
  if (session.primary_intent === 'upload_prices' && session.preferences_captured?.price_list) {
    priceList = session.preferences_captured.price_list;
    sessionId = session.session_id;
    console.log('📋 [Normalize] Found price list:', priceList.length, 'products');
  }
}

if (!priceList || priceList.length === 0) {
  console.log('❌ [Normalize] No price list found');
  return JSON.stringify({
    error: true,
    message: '⚠️ Nenhuma lista de preços encontrada.\n\nEnvie primeiro sua lista usando "enviar preços".'
  });
}

console.log(`🔄 [Normalize] Normalizing ${priceList.length} products...`);

// ===== NORMALIZE PRODUCTS =====
const mappedProducts = [];
const warnings = [];
let highConfidence = 0;
let mediumConfidence = 0;
let newProducts = 0;

for (const item of priceList) {
  try {
    // Generate embedding for product name
    console.log(`🔍 [Normalize] Searching: ${item.product_name}`);

    const embeddingResponse = await $http.request({
      method: 'POST',
      url: 'https://api.openai.com/v1/embeddings',
      headers: {
        'Authorization': `Bearer ${$credentials.openAiApi.apiKey}`,
        'Content-Type': 'application/json'
      },
      body: {
        model: 'text-embedding-ada-002',
        input: item.product_name
      }
    });

    if (embeddingResponse.statusCode !== 200) {
      console.error('❌ [Normalize] Embedding failed for:', item.product_name);
      warnings.push({
        product: item.product_name,
        issue: 'Embedding generation failed',
        action: 'skip'
      });
      continue;
    }

    const queryEmbedding = embeddingResponse.data.data[0].embedding;

    // Search master_list using vector similarity
    const { data: matches, error: searchError } = await $supabase.rpc('match_products_v2', {
      query_embedding: queryEmbedding,
      match_threshold: 0.7,
      match_count: 1
    });

    let masterListId = null;
    let similarity = 0;
    let confidence = 'new';

    if (!searchError && matches && matches.length > 0) {
      const bestMatch = matches[0];
      masterListId = bestMatch.id;
      similarity = bestMatch.similarity || 0;

      // Classify confidence
      if (similarity >= 0.9) {
        confidence = 'high';
        highConfidence++;
      } else if (similarity >= 0.7) {
        confidence = 'medium';
        mediumConfidence++;
      } else {
        confidence = 'low';
        newProducts++;
      }

      console.log(`✅ [Normalize] Matched: ${item.product_name} → ${bestMatch.product_name} (${(similarity * 100).toFixed(0)}%)`);
    } else {
      // No match found - treat as new product
      newProducts++;
      console.log(`🆕 [Normalize] New product: ${item.product_name}`);
    }

    // Check for price outliers if matched
    if (masterListId) {
      const { data: priceHistory } = await $supabase
        .from('pricing_history')
        .select('unit_price')
        .eq('master_list_id', masterListId)
        .order('effective_date', { ascending: false })
        .limit(10);

      if (priceHistory && priceHistory.length > 0) {
        const avgPrice = priceHistory.reduce((sum, p) => sum + parseFloat(p.unit_price), 0) / priceHistory.length;
        const priceChange = Math.abs((item.unit_price - avgPrice) / avgPrice);

        if (priceChange > 0.5) {
          // Price changed more than 50%
          warnings.push({
            product: item.product_name,
            issue: `Preço ${priceChange > 0 ? 'maior' : 'menor'} que média`,
            current_price: item.unit_price,
            market_avg: avgPrice.toFixed(2),
            change_percent: (priceChange * 100).toFixed(0),
            action: 'review_recommended'
          });
        }
      }
    }

    // Add to mapped products
    mappedProducts.push({
      supplier_product_name: item.product_name,
      master_list_id: masterListId,
      unit_price: item.unit_price,
      unit: item.unit,
      sku: item.sku,
      brand: item.brand,
      currency: item.currency || 'BRL',
      mapping_confidence: similarity,
      confidence_level: confidence,
      is_new: masterListId === null
    });

  } catch (error) {
    console.error('❌ [Normalize] Error processing:', item.product_name, error);
    warnings.push({
      product: item.product_name,
      issue: 'Processing error: ' + error.message,
      action: 'skip'
    });
  }
}

console.log(`✅ [Normalize] Completed: ${mappedProducts.length} products normalized`);
console.log(`   High confidence: ${highConfidence}, Medium: ${mediumConfidence}, New: ${newProducts}`);

// ===== SAVE TO SESSION =====
const normalizationData = {
  normalized_at: new Date().toISOString(),
  mapped_products: mappedProducts,
  warnings: warnings,
  stats: {
    total_products: mappedProducts.length,
    high_confidence: highConfidence,
    medium_confidence: mediumConfidence,
    new_products: newProducts,
    warnings_count: warnings.length
  }
};

await $supabase
  .from('line_sessions')
  .update({
    preferences_captured: {
      ...userData.active_session.preferences_captured,
      normalization: normalizationData
    },
    last_activity_at: new Date().toISOString()
  })
  .eq('session_id', sessionId);

console.log('💾 [Normalize] Saved to session');

// ===== CALCULATE TOTALS =====
const totalValue = mappedProducts.reduce((sum, p) => sum + p.unit_price, 0);

// Group by category (if we had category info)
const categorySummary = {};
mappedProducts.forEach(p => {
  const category = p.category || 'Outros';
  if (!categorySummary[category]) {
    categorySummary[category] = 0;
  }
  categorySummary[category]++;
});

// ===== PREPARE RESPONSE MESSAGE =====
const warningsList = warnings.length > 0
  ? `\n\n⚠️ *${warnings.length} alerta(s):*\n` +
    warnings.slice(0, 3).map(w =>
      `• ${w.product}: ${w.issue}` +
      (w.current_price ? `\n  Seu preço: R$ ${w.current_price.toFixed(2)} | Média: R$ ${w.market_avg}` : '')
    ).join('\n') +
    (warnings.length > 3 ? `\n• ...e mais ${warnings.length - 3} alertas` : '')
  : '';

const confidenceBreakdown =
  `📊 *Confiança do mapeamento:*\n` +
  `• Alta (>90%): ${highConfidence} produtos\n` +
  `• Média (70-90%): ${mediumConfidence} produtos\n` +
  `• Novos no catálogo: ${newProducts} produtos`;

const message = '🔧 *NORMALIZAÇÃO CONCLUÍDA!*\n\n' +
  `✅ ${mappedProducts.length} produtos processados\n` +
  `💰 Valor total: R$ ${totalValue.toFixed(2)}\n\n` +
  confidenceBreakdown +
  warningsList +
  '\n\n────────────────\n' +
  '🔄 *Próximo passo:*\n' +
  'Deseja publicar estes preços no catálogo?\n\n' +
  '• *"publicar"* - Publicar agora\n' +
  '• *"revisar"* - Ver detalhes dos alertas\n' +
  '• *"cancelar"* - Descartar esta lista';

return JSON.stringify({
  status: 'normalized',
  session_id: sessionId,
  products_mapped: mappedProducts.length,
  high_confidence: highConfidence,
  medium_confidence: mediumConfidence,
  new_products: newProducts,
  warnings_count: warnings.length,
  total_value: totalValue,
  next_action: 'await_publish_confirmation',
  message: message
});
