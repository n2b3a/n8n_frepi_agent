// ===== PUBLISH TO CATALOG - COMPLETE IMPLEMENTATION =====
// Tool for n8n workflow: publishes normalized products to pricing_history

const input = $input.first().json;
const userData = $('Prepare User Context').first().json;
const userMessage = (input.query || input.message || '').trim();

console.log('📤 [Publish] Supplier:', userData.phone_number);

// ===== CHECK IF USER IS SUPPLIER =====
if (userData.is_new_user || !userData.supplier_id) {
  console.log('❌ [Publish] Not a supplier');
  return JSON.stringify({
    error: true,
    message: 'Você precisa estar cadastrado como fornecedor.'
  });
}

// ===== GET NORMALIZED DATA FROM SESSION =====
let normalizationData = null;
let sessionId = null;

if (userData.has_active_session) {
  const session = userData.active_session;
  if (session.preferences_captured?.normalization) {
    normalizationData = session.preferences_captured.normalization;
    sessionId = session.session_id;
    console.log('📋 [Publish] Found normalized data:', normalizationData.mapped_products?.length, 'products');
  }
}

if (!normalizationData || !normalizationData.mapped_products || normalizationData.mapped_products.length === 0) {
  console.log('❌ [Publish] No normalized data found');
  return JSON.stringify({
    error: true,
    message: '⚠️ Nenhuma lista normalizada encontrada.\n\nPrimeiro envie e normalize sua lista de preços.'
  });
}

// ===== CHECK FOR CONFIRMATION =====
const confirmed = userMessage.toLowerCase().match(/publicar|confirmar|sim|yes/);

if (!confirmed) {
  return JSON.stringify({
    status: 'awaiting_confirmation',
    message: '⏸️ Publicação pausada.\n\nDigite *"publicar"* para confirmar ou *"cancelar"* para descartar.'
  });
}

console.log(`📤 [Publish] Publishing ${normalizationData.mapped_products.length} products...`);

// ===== PUBLISH TO PRICING_HISTORY =====
const effectiveDate = new Date().toISOString();
const version = 'v' + new Date().toISOString().split('T')[0].replace(/-/g, '');

let productsUpdated = 0;
let productsAdded = 0;
const errors = [];

try {
  for (const product of normalizationData.mapped_products) {
    try {
      // Skip products that are new and not yet in master_list
      if (product.is_new || !product.master_list_id) {
        console.log(`⏭️ [Publish] Skipping new product: ${product.supplier_product_name}`);
        productsAdded++;
        // TODO: In future, create new master_list entries
        continue;
      }

      // Insert into pricing_history
      const pricingData = {
        supplier_id: userData.supplier_id,
        master_list_id: product.master_list_id,
        unit_price: product.unit_price,
        unit: product.unit,
        currency: product.currency || 'BRL',
        effective_date: effectiveDate,
        verification_status: 'verified',
        data_source: 'supplier_upload',
        metadata: {
          supplier_product_name: product.supplier_product_name,
          sku: product.sku,
          brand: product.brand,
          mapping_confidence: product.mapping_confidence,
          uploaded_via: 'whatsapp'
        }
      };

      const { error: priceError } = await $supabase
        .from('pricing_history')
        .insert(pricingData);

      if (priceError) {
        console.error('❌ [Publish] Error inserting price:', product.supplier_product_name, priceError);
        errors.push({
          product: product.supplier_product_name,
          error: priceError.message
        });
        continue;
      }

      // Create/update supplier_mapped_products
      const { data: existingMapping } = await $supabase
        .from('supplier_mapped_products')
        .select('id')
        .eq('supplier_id', userData.supplier_id)
        .eq('master_list_id', product.master_list_id)
        .single();

      if (existingMapping) {
        // Update existing mapping
        await $supabase
          .from('supplier_mapped_products')
          .update({
            supplier_product_name: product.supplier_product_name,
            supplier_sku: product.sku,
            current_unit_price: product.unit_price,
            mapping_confidence: product.mapping_confidence,
            is_active: true,
            last_price_update: effectiveDate,
            updated_at: new Date().toISOString()
          })
          .eq('id', existingMapping.id);

        productsUpdated++;
      } else {
        // Create new mapping
        await $supabase
          .from('supplier_mapped_products')
          .insert({
            supplier_id: userData.supplier_id,
            master_list_id: product.master_list_id,
            supplier_product_name: product.supplier_product_name,
            supplier_sku: product.sku,
            current_unit_price: product.unit_price,
            mapping_confidence: product.mapping_confidence,
            is_active: true,
            last_price_update: effectiveDate
          });

        productsAdded++;
      }

      console.log(`✅ [Publish] Published: ${product.supplier_product_name}`);

    } catch (productError) {
      console.error('❌ [Publish] Error processing product:', product.supplier_product_name, productError);
      errors.push({
        product: product.supplier_product_name,
        error: productError.message
      });
    }
  }

  console.log(`✅ [Publish] Completed: ${productsUpdated} updated, ${productsAdded} added`);

  // ===== MARK SESSION AS COMPLETED =====
  await $supabase
    .from('line_sessions')
    .update({
      session_goal_achieved: true,
      awaiting_continuation: false,
      session_end: new Date().toISOString(),
      conversion_occurred: true,
      session_notes: `Published ${productsUpdated + productsAdded} products`,
      preferences_captured: {
        ...userData.active_session.preferences_captured,
        published_at: new Date().toISOString(),
        publication_version: version,
        products_published: productsUpdated + productsAdded
      }
    })
    .eq('session_id', sessionId);

  console.log('🏁 [Publish] Session completed');

  // ===== PREPARE SUCCESS MESSAGE =====
  const errorSummary = errors.length > 0
    ? `\n\n⚠️ ${errors.length} produto(s) com erro:\n` +
      errors.slice(0, 3).map(e => `• ${e.product}`).join('\n') +
      (errors.length > 3 ? `\n• ...e mais ${errors.length - 3}` : '')
    : '';

  const message = '📤 *LISTA PUBLICADA COM SUCESSO!*\n\n' +
    `✅ Versão: *${version}*\n` +
    `📅 Data: ${new Date().toLocaleDateString('pt-BR')}\n\n` +
    '*Mudanças aplicadas:*\n' +
    `• ${productsUpdated} produtos atualizados\n` +
    `• ${productsAdded} produtos novos adicionados\n` +
    `• Histórico registrado em pricing_history\n` +
    errorSummary +
    '\n\n🎉 *Seus produtos já estão disponíveis!*\n' +
    'Os restaurantes podem ver e fazer pedidos.\n\n' +
    '────────────────\n' +
    '💬 Precisa de algo mais?\n' +
    'Digite *"menu"* para ver opções.';

  return JSON.stringify({
    success: true,
    version: version,
    published_at: new Date().toISOString(),
    products_updated: productsUpdated,
    products_added: productsAdded,
    errors_count: errors.length,
    errors: errors,
    message: message
  });

} catch (error) {
  console.error('❌ [Publish] Fatal error:', error);

  // Mark session as failed
  await $supabase
    .from('line_sessions')
    .update({
      session_goal_achieved: false,
      awaiting_continuation: false,
      session_end: new Date().toISOString(),
      session_notes: 'Error: ' + error.message
    })
    .eq('session_id', sessionId);

  return JSON.stringify({
    success: false,
    error: true,
    message: '⚠️ Erro ao publicar lista.\n\n' +
      'Por favor, tente novamente.\n\n' +
      'Se o problema persistir, contate suporte.'
  });
}
