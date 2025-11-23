// ===================================================================
// TOOL: match_with_existing_master_list
// ===================================================================
// Propósito: Hacer match de productos solicitados con master_list
//            Agrupa por master_list_product_id
//            Separa: con match / sin match
// Parte de: Purchase Order Creator Agent
// Fase: 1 - Paso 2 | Fase 2 - Paso 12
// ===================================================================

/*
INPUTS:
- product_list: Array of { product_name, quantity, unit }
- restaurant_id: Number

OUTPUTS:
{
  success: boolean,
  products_with_master_list_id: [
    {
      product_name: "Picanha",
      master_list_product_id: 45,
      quantity: 10,
      unit: "kg",
      category: "Carnes",
      similarity: 0.95,
      match_confidence: "high"
    }
  ],
  products_without_master_list_id: [
    {
      product_name: "Arroz Especial",
      quantity: 5,
      unit: "saco",
      reason: "no_match_found"
    }
  ],
  summary: {
    total_requested: 5,
    matched: 3,
    unmatched: 2,
    match_rate: 0.6
  },
  message_to_user: string
}
*/

const input = $input.first().json;
const productList = input.product_list; // Array of {product_name, quantity, unit}
const restaurantId = input.restaurant_id;

console.log('[match_master_list] Inputs:', {
  productCount: productList?.length,
  restaurantId
});

// ===================================================================
// VALIDACIONES
// ===================================================================

if (!productList || !Array.isArray(productList) || productList.length === 0) {
  return JSON.stringify({
    error: true,
    message: "product_list deve ser um array com pelo menos um produto"
  });
}

if (!restaurantId) {
  return JSON.stringify({
    error: true,
    message: "restaurant_id é obrigatório"
  });
}

// ===================================================================
// PASO 1: Procesar cada producto con vector search
// ===================================================================

console.log('[match_master_list] Iniciando matching de produtos...');

const productsWithMasterListId = [];
const productsWithoutMasterListId = [];

for (const product of productList) {
  const productName = product.product_name;
  const quantity = parseFloat(product.quantity) || 1;
  const unit = product.unit || 'unidade';

  console.log(`[match_master_list] Procesando: ${productName}`);

  // -------------------------------------------------------------------
  // PASO 1.1: Generate embedding for product name
  // -------------------------------------------------------------------

  const embeddingResponse = await $http.request({
    method: 'POST',
    url: 'https://api.openai.com/v1/embeddings',
    headers: {
      'Authorization': `Bearer ${$credentials.openAiApi.apiKey}`,
      'Content-Type': 'application/json'
    },
    body: {
      model: 'text-embedding-3-small',
      input: productName
    }
  });

  const productEmbedding = embeddingResponse.data.data[0].embedding;

  // -------------------------------------------------------------------
  // PASO 1.2: Vector search in master_list
  // -------------------------------------------------------------------

  const { data: masterListMatches, error: searchError } = await $supabase
    .rpc('match_master_list_products', {
      query_embedding: productEmbedding,
      match_threshold: 0.7,
      match_count: 3
    });

  if (searchError) {
    console.error(`  ❌ Error buscando en master_list para "${productName}":`, searchError);
    productsWithoutMasterListId.push({
      product_name: productName,
      quantity: quantity,
      unit: unit,
      reason: 'search_error',
      error: searchError.message
    });
    continue;
  }

  // -------------------------------------------------------------------
  // PASO 1.3: Evaluar matches
  // -------------------------------------------------------------------

  if (masterListMatches && masterListMatches.length > 0) {
    const bestMatch = masterListMatches[0];

    // Determinar confidence
    let matchConfidence = 'low';
    if (bestMatch.similarity >= 0.9) {
      matchConfidence = 'high';
    } else if (bestMatch.similarity >= 0.75) {
      matchConfidence = 'medium';
    }

    // Solo aceptar si confidence >= medium (similarity >= 0.75)
    if (bestMatch.similarity >= 0.75) {
      console.log(`  ✅ Match encontrado: ${bestMatch.product_name} (${(bestMatch.similarity * 100).toFixed(0)}%)`);

      productsWithMasterListId.push({
        product_name: productName,
        master_list_product_id: bestMatch.id,
        master_list_product_name: bestMatch.product_name,
        quantity: quantity,
        unit: unit,
        category: bestMatch.category || 'Sem categoria',
        similarity: bestMatch.similarity,
        match_confidence: matchConfidence
      });
    } else {
      // Similarity muy baja - considerar como sin match
      console.log(`  ⚠️  Match con baja confianza (${(bestMatch.similarity * 100).toFixed(0)}%) - marcando como sin match`);

      productsWithoutMasterListId.push({
        product_name: productName,
        quantity: quantity,
        unit: unit,
        reason: 'low_confidence_match',
        best_suggestion: {
          master_list_product_id: bestMatch.id,
          product_name: bestMatch.product_name,
          similarity: bestMatch.similarity
        }
      });
    }
  } else {
    // No match found
    console.log(`  ❌ Sin match en master_list`);

    productsWithoutMasterListId.push({
      product_name: productName,
      quantity: quantity,
      unit: unit,
      reason: 'no_match_found'
    });
  }
}

// ===================================================================
// PASO 2: Generar resumen y mensaje
// ===================================================================

const totalRequested = productList.length;
const matched = productsWithMasterListId.length;
const unmatched = productsWithoutMasterListId.length;
const matchRate = totalRequested > 0 ? matched / totalRequested : 0;

console.log('[match_master_list] Resumo:', {
  total_requested: totalRequested,
  matched: matched,
  unmatched: unmatched,
  match_rate: (matchRate * 100).toFixed(1) + '%'
});

// Construir mensaje para usuario
let messageToUser = `🔍 Análise de produtos concluída!\\n\\n`;

if (matched > 0) {
  messageToUser += `✅ **${matched} produto(s) encontrado(s) no catálogo:**\\n`;
  productsWithMasterListId.forEach(p => {
    messageToUser += `  • ${p.product_name} → ${p.master_list_product_name}`;
    messageToUser += ` (${p.quantity} ${p.unit})`;
    messageToUser += ` [${(p.similarity * 100).toFixed(0)}%]\\n`;
  });
  messageToUser += '\\n';
}

if (unmatched > 0) {
  messageToUser += `⚠️  **${unmatched} produto(s) não encontrado(s):**\\n`;
  productsWithoutMasterListId.forEach(p => {
    messageToUser += `  • ${p.product_name} (${p.quantity} ${p.unit})\\n`;
  });
  messageToUser += '\\n';
  messageToUser += `💡 Estes produtos precisam ser adicionados ao catálogo.\\n`;
}

messageToUser += `\\n📊 Taxa de match: ${(matchRate * 100).toFixed(0)}%`;

// ===================================================================
// PASO 3: Return results
// ===================================================================

return JSON.stringify({
  success: true,
  products_with_master_list_id: productsWithMasterListId,
  products_without_master_list_id: productsWithoutMasterListId,
  summary: {
    total_requested: totalRequested,
    matched: matched,
    unmatched: unmatched,
    match_rate: matchRate
  },
  message_to_user: messageToUser
});
