// ===================================================================
// TOOL: match_with_existing_supplier_mapped
// ===================================================================
// Propósito: Hacer match de productos reportados con supplier_mapped_products
//            Si NO encuentra match, CREA nuevo producto con master_list_id = NULL
// Parte de: Supplier Price Updater Agent (Sub-agente)
// Fase: 1 - Paso 2
// ===================================================================

/*
INPUTS:
- product_list: Array of { product_name, price, unit }
- supplier_name: String (e.g., "Friboi")
- restaurant_id: Number
- phone_number: String (from context)

OUTPUTS:
{
  supplier_found: boolean,
  supplier_id: number | null,
  supplier_name: string,
  products_with_master_list_id: [
    {
      supplier_mapped_product_id: 123,
      product_name: "Picanha",
      reported_price: 47.00,
      unit: "kg",
      master_list_product_id: 45,
      similarity: 0.95,
      match_source: "vector_search" | "previous_purchase"
    }
  ],
  products_without_master_list_id: [
    {
      supplier_mapped_product_id: 124,
      product_name: "Arroz Tipo 1",
      reported_price: 28.00,
      unit: "saco",
      master_list_product_id: null,
      similarity: 0.87,
      needs_manual_match: true
    }
  ],
  new_products_created: [
    {
      supplier_mapped_product_id: 125,
      product_name: "Produto Novo",
      reported_price: 15.00,
      unit: "kg",
      master_list_product_id: null,
      reason: "no_match_found_created_new"
    }
  ],
  relationship_updated: boolean,
  message_to_user: string
}
*/

const input = $input.first().json;
const supplierName = input.supplier_name;
const productList = input.product_list; // Array of {product_name, price, unit}
const restaurantId = input.restaurant_id;
const phoneNumber = input.phone_number;

console.log('[match_supplier_mapped] Inputs:', {
  supplierName,
  productCount: productList?.length,
  restaurantId,
  phoneNumber
});

// ===================================================================
// VALIDACIONES
// ===================================================================

if (!supplierName || !productList || !restaurantId) {
  return JSON.stringify({
    error: true,
    message: "Parâmetros faltando: supplier_name, product_list ou restaurant_id"
  });
}

if (!Array.isArray(productList) || productList.length === 0) {
  return JSON.stringify({
    error: true,
    message: "product_list deve ser um array com pelo menos um produto"
  });
}

// ===================================================================
// PASO 1: Buscar fornecedor por nombre (vector search)
// ===================================================================

console.log('[match_supplier_mapped] Buscando fornecedor:', supplierName);

// Generate embedding for supplier name
const supplierEmbeddingResponse = await $http.request({
  method: 'POST',
  url: 'https://api.openai.com/v1/embeddings',
  headers: {
    'Authorization': `Bearer ${$credentials.openAiApi.apiKey}`,
    'Content-Type': 'application/json'
  },
  body: {
    model: 'text-embedding-3-small',
    input: supplierName
  }
});

const supplierEmbedding = supplierEmbeddingResponse.data.data[0].embedding;

// Search suppliers with vector similarity
const { data: supplierMatches, error: supplierSearchError } = await $supabase
  .rpc('match_suppliers_by_name', {
    query_embedding: supplierEmbedding,
    match_threshold: 0.7,
    match_count: 5
  });

if (supplierSearchError) {
  console.error('[match_supplier_mapped] Error buscando fornecedor:', supplierSearchError);
  return JSON.stringify({
    error: true,
    message: "Erro ao buscar fornecedor no banco de dados",
    details: supplierSearchError.message
  });
}

console.log('[match_supplier_mapped] Fornecedores encontrados:', supplierMatches?.length);

// Check if supplier found
let supplierId = null;
let supplierFound = false;
let actualSupplierName = supplierName;

if (supplierMatches && supplierMatches.length > 0) {
  const bestMatch = supplierMatches[0];

  // Si similarity >= 80%, auto-accept
  if (bestMatch.similarity >= 0.8) {
    supplierId = bestMatch.id;
    supplierFound = true;
    actualSupplierName = bestMatch.company_name;
    console.log('[match_supplier_mapped] Fornecedor encontrado:', {
      id: supplierId,
      name: actualSupplierName,
      similarity: bestMatch.similarity
    });
  } else {
    // Entre 70-80%, pedir confirmación
    return JSON.stringify({
      supplier_found: false,
      needs_confirmation: true,
      suggested_supplier: {
        id: bestMatch.id,
        name: bestMatch.company_name,
        similarity: bestMatch.similarity
      },
      message_to_user: `Encontrei um fornecedor parecido: "${bestMatch.company_name}" (${Math.round(bestMatch.similarity * 100)}% similar). É este fornecedor?`
    });
  }
} else {
  // No supplier found
  console.log('[match_supplier_mapped] Fornecedor não encontrado');
  return JSON.stringify({
    supplier_found: false,
    supplier_id: null,
    message_to_user: `O fornecedor "${supplierName}" não está cadastrado no sistema. Deseja cadastrá-lo agora?`
  });
}

// ===================================================================
// PASO 2: Match Products (Dual Strategy + CREATE if not found)
// ===================================================================

console.log('[match_supplier_mapped] Iniciando matching de produtos...');

const productsWithMasterListId = [];
const productsWithoutMasterListId = [];
const newProductsCreated = [];

// Get previous purchases for this restaurant-supplier pair
const { data: previousPurchases, error: purchaseError } = await $supabase
  .from('supplier_mapped_products')
  .select('id, product_name, master_list_product_id, embedding')
  .eq('supplier_id', supplierId)
  .not('master_list_product_id', 'is', null);

if (purchaseError) {
  console.error('[match_supplier_mapped] Error obteniendo compras previas:', purchaseError);
}

console.log('[match_supplier_mapped] Compras previas encontradas:', previousPurchases?.length || 0);

// Create lookup map
const previousPurchaseMap = {};
if (previousPurchases) {
  previousPurchases.forEach(p => {
    previousPurchaseMap[p.product_name.toLowerCase().trim()] = p;
  });
}

// ===================================================================
// PASO 2.1: Procesar cada producto
// ===================================================================

for (const product of productList) {
  const productName = product.product_name;
  const price = parseFloat(product.price);
  const unit = product.unit || 'unidade';

  console.log(`[match_supplier_mapped] Procesando: ${productName}`);

  const normalizedName = productName.toLowerCase().trim();
  let matchFound = false;
  let supplierMappedProductId = null;

  // -------------------------------------------------------------------
  // Strategy 1: Check previous purchases (exact match)
  // -------------------------------------------------------------------

  if (previousPurchaseMap[normalizedName]) {
    const previousProduct = previousPurchaseMap[normalizedName];

    productsWithMasterListId.push({
      supplier_mapped_product_id: previousProduct.id,
      product_name: productName,
      reported_price: price,
      unit: unit,
      master_list_product_id: previousProduct.master_list_product_id,
      similarity: 1.0,
      match_source: 'previous_purchase',
      match_type: 'exact'
    });

    matchFound = true;
    console.log(`  ✅ Match exacto en compras previas (master_list_id: ${previousProduct.master_list_product_id})`);
    continue;
  }

  // -------------------------------------------------------------------
  // Strategy 2: Vector search in supplier_mapped_products
  // -------------------------------------------------------------------

  // Generate embedding
  const productEmbeddingResponse = await $http.request({
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

  const productEmbedding = productEmbeddingResponse.data.data[0].embedding;

  // Search in supplier_mapped_products
  const { data: productMatches, error: productSearchError } = await $supabase
    .rpc('match_supplier_products', {
      query_embedding: productEmbedding,
      supplier_id_filter: supplierId,
      match_threshold: 0.7,
      match_count: 3
    });

  if (productSearchError) {
    console.error(`  ❌ Error buscando producto "${productName}":`, productSearchError);
  }

  if (productMatches && productMatches.length > 0) {
    const bestMatch = productMatches[0];

    console.log(`  🔍 Vector match encontrado: ${bestMatch.product_name} (similarity: ${bestMatch.similarity})`);

    // Check if match has master_list_product_id
    if (bestMatch.master_list_product_id) {
      // Producto ya vinculado a master list
      productsWithMasterListId.push({
        supplier_mapped_product_id: bestMatch.id,
        product_name: productName,
        reported_price: price,
        unit: unit,
        master_list_product_id: bestMatch.master_list_product_id,
        similarity: bestMatch.similarity,
        match_source: 'vector_search',
        matched_product_name: bestMatch.product_name
      });

      console.log(`  ✅ Tiene master_list_id: ${bestMatch.master_list_product_id}`);
    } else {
      // Producto existe pero NO vinculado a master list
      productsWithoutMasterListId.push({
        supplier_mapped_product_id: bestMatch.id,
        product_name: productName,
        reported_price: price,
        unit: unit,
        master_list_product_id: null,
        similarity: bestMatch.similarity,
        needs_manual_match: true,
        matched_product_name: bestMatch.product_name
      });

      console.log(`  ⚠️  Sin master_list_id (necesita matching manual)`);
    }

    matchFound = true;
  }

  // -------------------------------------------------------------------
  // Strategy 3: CREATE NEW if no match found
  // -------------------------------------------------------------------

  if (!matchFound) {
    console.log(`  🆕 No match encontrado - CREANDO NUEVO producto con master_list_id = NULL`);

    // Create new product in supplier_mapped_products
    const { data: newProduct, error: createError } = await $supabase
      .from('supplier_mapped_products')
      .insert({
        supplier_id: supplierId,
        product_name: productName,
        price: price,
        unit: unit,
        master_list_product_id: null, // ⭐ CRÍTICO: NULL porque no sabemos a cuál del master list corresponde
        is_active: true,
        embedding: productEmbedding
      })
      .select()
      .single();

    if (createError) {
      console.error(`  ❌ Error creando nuevo producto:`, createError);
      continue;
    }

    console.log(`  ✅ Producto creado con ID: ${newProduct.id} (master_list_id: NULL)`);

    newProductsCreated.push({
      supplier_mapped_product_id: newProduct.id,
      product_name: productName,
      reported_price: price,
      unit: unit,
      master_list_product_id: null,
      reason: 'no_match_found_created_new'
    });

    // Agregar a la lista de productos sin master_list_id
    productsWithoutMasterListId.push({
      supplier_mapped_product_id: newProduct.id,
      product_name: productName,
      reported_price: price,
      unit: unit,
      master_list_product_id: null,
      similarity: 0,
      needs_manual_match: true,
      matched_product_name: productName
    });
  }
}

// ===================================================================
// PASO 3: Actualizar restaurant_supplier_relationships
// ===================================================================

console.log('[match_supplier_mapped] Actualizando relación restaurante-fornecedor...');

const { data: existingRelationship, error: relationshipFetchError } = await $supabase
  .from('restaurant_supplier_relationships')
  .select('*')
  .eq('restaurant_id', restaurantId)
  .eq('supplier_id', supplierId)
  .maybeSingle();

if (relationshipFetchError) {
  console.error('[match_supplier_mapped] Error obteniendo relación:', relationshipFetchError);
}

let relationshipUpdated = false;

if (existingRelationship) {
  // Update existing relationship
  const { error: updateError } = await $supabase
    .from('restaurant_supplier_relationships')
    .update({
      price_updates_count: existingRelationship.price_updates_count + 1,
      last_interaction_date: new Date().toISOString()
    })
    .eq('id', existingRelationship.id);

  if (updateError) {
    console.error('[match_supplier_mapped] Error actualizando relación:', updateError);
  } else {
    relationshipUpdated = true;
    console.log('  ✅ Relación actualizada');
  }
} else {
  // Create new relationship
  const { error: insertError } = await $supabase
    .from('restaurant_supplier_relationships')
    .insert({
      restaurant_id: restaurantId,
      supplier_id: supplierId,
      relationship_type: 'price_reporting',
      first_interaction_date: new Date().toISOString(),
      last_interaction_date: new Date().toISOString(),
      price_updates_count: 1
    });

  if (insertError) {
    console.error('[match_supplier_mapped] Error creando relación:', insertError);
  } else {
    relationshipUpdated = true;
    console.log('  ✅ Relación creada');
  }
}

// ===================================================================
// PASO 4: Generar mensaje de resumen
// ===================================================================

let messageToUser = `✅ Cotação de **${actualSupplierName}** processada!\\n\\n`;

if (productsWithMasterListId.length > 0) {
  messageToUser += `📊 **${productsWithMasterListId.length} produto(s)** prontos para atualizar:\\n`;
  productsWithMasterListId.forEach(p => {
    messageToUser += `  • ${p.product_name}: R$ ${p.reported_price.toFixed(2)}/${p.unit}\\n`;
  });
  messageToUser += '\\n';
}

if (productsWithoutMasterListId.length > 0) {
  messageToUser += `⚠️  **${productsWithoutMasterListId.length} produto(s)** precisam de confirmação (sem vínculo ao catálogo):\\n`;
  productsWithoutMasterListId.forEach(p => {
    messageToUser += `  • ${p.product_name}: R$ ${p.reported_price.toFixed(2)}/${p.unit}\\n`;
  });
  messageToUser += '\\n';
}

if (newProductsCreated.length > 0) {
  messageToUser += `🆕 **${newProductsCreated.length} produto(s) novo(s) criado(s)** (adicionados ao sistema):\\n`;
  newProductsCreated.forEach(p => {
    messageToUser += `  • ${p.product_name}\\n`;
  });
  messageToUser += '\\n';
}

// ===================================================================
// PASO 5: Return results
// ===================================================================

console.log('[match_supplier_mapped] Resumo:', {
  supplier_found: true,
  supplier_id: supplierId,
  products_with_master_list_id: productsWithMasterListId.length,
  products_without_master_list_id: productsWithoutMasterListId.length,
  new_products_created: newProductsCreated.length,
  relationship_updated: relationshipUpdated
});

return JSON.stringify({
  supplier_found: true,
  supplier_id: supplierId,
  supplier_name: actualSupplierName,
  products_with_master_list_id: productsWithMasterListId,
  products_without_master_list_id: productsWithoutMasterListId,
  new_products_created: newProductsCreated,
  relationship_updated: relationshipUpdated,
  message_to_user: messageToUser,
  summary: {
    total_products: productList.length,
    ready_to_update: productsWithMasterListId.length,
    needs_manual_match: productsWithoutMasterListId.length,
    new_products: newProductsCreated.length
  }
});
