// ===================================================================
// TOOL: match_with_existing_supplier_mapped
// ===================================================================
// Purpose: Match reported prices with existing supplier_mapped_products
//          using dual strategy: vector search + previous purchases
// Part of: Supplier Price Updater Agent (Sub-agent)
// Phase: 1
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
      product_name: "Picanha",
      reported_price: 47.00,
      unit: "kg",
      supplier_mapped_product_id: 123,
      master_list_product_id: 45,
      similarity: 0.95,
      match_source: "vector_search" | "previous_purchase"
    }
  ],
  products_without_master_list_id: [
    {
      product_name: "Arroz Tipo 1",
      reported_price: 28.00,
      unit: "saco",
      supplier_mapped_product_id: 124,
      similarity: 0.87,
      needs_manual_match: true
    }
  ],
  new_products: [
    {
      product_name: "Produto Desconhecido",
      reported_price: 15.00,
      unit: "kg",
      reason: "no_match_found"
    }
  ],
  relationship_updated: boolean,
  message_to_user: string
}
*/

// ===================================================================
// STEP 1: Find Supplier by Name
// ===================================================================

// Get supplier_name from user input
const supplierName = $input.item.json.supplier_name;
const productList = $input.item.json.product_list; // Array of {product_name, price, unit}
const restaurantId = $input.item.json.restaurant_id;
const phoneNumber = $input.item.json.phone_number;

console.log('[match_with_existing_supplier_mapped] Inputs:', {
  supplierName,
  productCount: productList?.length,
  restaurantId,
  phoneNumber
});

// Validate inputs
if (!supplierName || !productList || !restaurantId) {
  return [{
    json: {
      error: true,
      message: "Parâmetros faltando: supplier_name, product_list ou restaurant_id"
    }
  }];
}

// Validate product_list is array
if (!Array.isArray(productList) || productList.length === 0) {
  return [{
    json: {
      error: true,
      message: "product_list deve ser um array com pelo menos um produto"
    }
  }];
}

// ===================================================================
// STEP 1.1: Search supplier by name (vector search)
// ===================================================================

console.log('[match_with_existing_supplier_mapped] Searching for supplier:', supplierName);

// Generate embedding for supplier name
const supplierEmbeddingResponse = await $http.request({
  method: 'POST',
  url: 'https://api.openai.com/v1/embeddings',
  headers: {
    'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
    'Content-Type': 'application/json'
  },
  body: {
    model: 'text-embedding-3-small',
    input: supplierName
  }
});

const supplierEmbedding = supplierEmbeddingResponse.data[0].embedding;

// Search suppliers with vector similarity
const { data: supplierMatches, error: supplierSearchError } = await $supabase
  .rpc('match_suppliers_by_name', {
    query_embedding: supplierEmbedding,
    match_threshold: 0.7,
    match_count: 5
  });

if (supplierSearchError) {
  console.error('[match_with_existing_supplier_mapped] Error searching suppliers:', supplierSearchError);
  return [{
    json: {
      error: true,
      message: "Erro ao buscar fornecedor no banco de dados",
      details: supplierSearchError.message
    }
  }];
}

console.log('[match_with_existing_supplier_mapped] Supplier matches found:', supplierMatches?.length);

// Check if supplier found
let supplierId = null;
let supplierFound = false;
let actualSupplierName = supplierName;

if (supplierMatches && supplierMatches.length > 0) {
  // Take best match (first result)
  const bestMatch = supplierMatches[0];

  // If similarity >= 80%, auto-accept
  if (bestMatch.similarity >= 0.8) {
    supplierId = bestMatch.id;
    supplierFound = true;
    actualSupplierName = bestMatch.company_name;
    console.log('[match_with_existing_supplier_mapped] Supplier found:', {
      id: supplierId,
      name: actualSupplierName,
      similarity: bestMatch.similarity
    });
  } else {
    // Between 70-80%, ask for confirmation (handled by agent)
    return [{
      json: {
        supplier_found: false,
        needs_confirmation: true,
        suggested_supplier: {
          id: bestMatch.id,
          name: bestMatch.company_name,
          similarity: bestMatch.similarity
        },
        message_to_user: `Encontrei um fornecedor parecido: "${bestMatch.company_name}" (${Math.round(bestMatch.similarity * 100)}% similar). É este fornecedor que você quis dizer?`
      }
    }];
  }
} else {
  // No supplier found
  console.log('[match_with_existing_supplier_mapped] Supplier not found');
  return [{
    json: {
      supplier_found: false,
      supplier_id: null,
      message_to_user: `O fornecedor "${supplierName}" não está cadastrado no sistema. Deseja cadastrá-lo agora?`
    }
  }];
}

// ===================================================================
// STEP 2: Match Products (Dual Strategy)
// ===================================================================

console.log('[match_with_existing_supplier_mapped] Starting product matching...');

const productsWithMasterListId = [];
const productsWithoutMasterListId = [];
const newProducts = [];

// ===================================================================
// STEP 2.1: Get previous purchases for this restaurant-supplier pair
// ===================================================================

const { data: previousPurchases, error: purchaseError } = await $supabase
  .from('supplier_mapped_products')
  .select(`
    id,
    product_name,
    master_list_product_id,
    embedding
  `)
  .eq('supplier_id', supplierId)
  .not('master_list_product_id', 'is', null);

if (purchaseError) {
  console.error('[match_with_existing_supplier_mapped] Error fetching previous purchases:', purchaseError);
}

console.log('[match_with_existing_supplier_mapped] Previous purchases found:', previousPurchases?.length || 0);

// Create lookup map for previous purchases by product name
const previousPurchaseMap = {};
if (previousPurchases) {
  previousPurchases.forEach(p => {
    previousPurchaseMap[p.product_name.toLowerCase().trim()] = p;
  });
}

// ===================================================================
// STEP 2.2: Process each product in the list
// ===================================================================

for (const product of productList) {
  const productName = product.product_name;
  const price = parseFloat(product.price);
  const unit = product.unit || 'unidade';

  console.log(`[match_with_existing_supplier_mapped] Processing product: ${productName}`);

  // -------------------------------------------------------------------
  // Strategy 1: Check previous purchases (exact or fuzzy match)
  // -------------------------------------------------------------------

  const normalizedName = productName.toLowerCase().trim();
  let matchFound = false;

  if (previousPurchaseMap[normalizedName]) {
    // Exact match found in previous purchases
    const previousProduct = previousPurchaseMap[normalizedName];

    productsWithMasterListId.push({
      product_name: productName,
      reported_price: price,
      unit: unit,
      supplier_mapped_product_id: previousProduct.id,
      master_list_product_id: previousProduct.master_list_product_id,
      similarity: 1.0,
      match_source: 'previous_purchase',
      match_type: 'exact'
    });

    matchFound = true;
    console.log(`  ✅ Exact match in previous purchases (master_list_id: ${previousProduct.master_list_product_id})`);
    continue;
  }

  // -------------------------------------------------------------------
  // Strategy 2: Vector search in supplier_mapped_products
  // -------------------------------------------------------------------

  // Generate embedding for product name
  const productEmbeddingResponse = await $http.request({
    method: 'POST',
    url: 'https://api.openai.com/v1/embeddings',
    headers: {
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: {
      model: 'text-embedding-3-small',
      input: productName
    }
  });

  const productEmbedding = productEmbeddingResponse.data[0].embedding;

  // Search in supplier_mapped_products for this supplier
  const { data: productMatches, error: productSearchError } = await $supabase
    .rpc('match_supplier_products', {
      query_embedding: productEmbedding,
      supplier_id_filter: supplierId,
      match_threshold: 0.7,
      match_count: 3
    });

  if (productSearchError) {
    console.error(`  ❌ Error searching product "${productName}":`, productSearchError);
    newProducts.push({
      product_name: productName,
      reported_price: price,
      unit: unit,
      reason: 'search_error',
      error: productSearchError.message
    });
    continue;
  }

  if (productMatches && productMatches.length > 0) {
    const bestMatch = productMatches[0];

    console.log(`  🔍 Vector match found: ${bestMatch.product_name} (similarity: ${bestMatch.similarity})`);

    // Check if match has master_list_product_id
    if (bestMatch.master_list_product_id) {
      // Product already linked to master list
      productsWithMasterListId.push({
        product_name: productName,
        reported_price: price,
        unit: unit,
        supplier_mapped_product_id: bestMatch.id,
        master_list_product_id: bestMatch.master_list_product_id,
        similarity: bestMatch.similarity,
        match_source: 'vector_search',
        matched_product_name: bestMatch.product_name
      });

      console.log(`  ✅ Has master_list_id: ${bestMatch.master_list_product_id}`);
    } else {
      // Product exists but NOT linked to master list
      productsWithoutMasterListId.push({
        product_name: productName,
        reported_price: price,
        unit: unit,
        supplier_mapped_product_id: bestMatch.id,
        similarity: bestMatch.similarity,
        needs_manual_match: true,
        matched_product_name: bestMatch.product_name
      });

      console.log(`  ⚠️  No master_list_id (needs manual matching)`);
    }

    matchFound = true;
  } else {
    // No match found - completely new product
    console.log(`  ❌ No match found (new product)`);

    newProducts.push({
      product_name: productName,
      reported_price: price,
      unit: unit,
      reason: 'no_match_found',
      needs_creation: true
    });
  }
}

// ===================================================================
// STEP 3: Update restaurant_supplier_relationships
// ===================================================================

console.log('[match_with_existing_supplier_mapped] Updating restaurant-supplier relationship...');

const { data: existingRelationship, error: relationshipFetchError } = await $supabase
  .from('restaurant_supplier_relationships')
  .select('*')
  .eq('restaurant_id', restaurantId)
  .eq('supplier_id', supplierId)
  .maybeSingle();

if (relationshipFetchError) {
  console.error('[match_with_existing_supplier_mapped] Error fetching relationship:', relationshipFetchError);
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
    console.error('[match_with_existing_supplier_mapped] Error updating relationship:', updateError);
  } else {
    relationshipUpdated = true;
    console.log('  ✅ Relationship updated');
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
    console.error('[match_with_existing_supplier_mapped] Error creating relationship:', insertError);
  } else {
    relationshipUpdated = true;
    console.log('  ✅ Relationship created');
  }
}

// ===================================================================
// STEP 4: Generate summary message for user
// ===================================================================

let messageToUser = `✅ Cotação de **${actualSupplierName}** processada!\n\n`;

if (productsWithMasterListId.length > 0) {
  messageToUser += `📊 **${productsWithMasterListId.length} produto(s)** com match confirmado:\n`;
  productsWithMasterListId.forEach(p => {
    messageToUser += `  • ${p.product_name}: R$ ${p.reported_price.toFixed(2)}/${p.unit}\n`;
  });
  messageToUser += '\n';
}

if (productsWithoutMasterListId.length > 0) {
  messageToUser += `⚠️  **${productsWithoutMasterListId.length} produto(s)** precisam de confirmação:\n`;
  productsWithoutMasterListId.forEach(p => {
    messageToUser += `  • ${p.product_name} → ${p.matched_product_name}\n`;
  });
  messageToUser += '\n';
}

if (newProducts.length > 0) {
  messageToUser += `🆕 **${newProducts.length} produto(s)** novos (não encontrados):\n`;
  newProducts.forEach(p => {
    messageToUser += `  • ${p.product_name}\n`;
  });
  messageToUser += '\n';
}

// ===================================================================
// STEP 5: Return results
// ===================================================================

console.log('[match_with_existing_supplier_mapped] Summary:', {
  supplier_found: true,
  supplier_id: supplierId,
  products_with_master_list_id: productsWithMasterListId.length,
  products_without_master_list_id: productsWithoutMasterListId.length,
  new_products: newProducts.length,
  relationship_updated: relationshipUpdated
});

return [{
  json: {
    supplier_found: true,
    supplier_id: supplierId,
    supplier_name: actualSupplierName,
    products_with_master_list_id: productsWithMasterListId,
    products_without_master_list_id: productsWithoutMasterListId,
    new_products: newProducts,
    relationship_updated: relationshipUpdated,
    message_to_user: messageToUser,
    summary: {
      total_products: productList.length,
      ready_to_update: productsWithMasterListId.length,
      needs_manual_match: productsWithoutMasterListId.length,
      new_products: newProducts.length
    }
  }
}];
