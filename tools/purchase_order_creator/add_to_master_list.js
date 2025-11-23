// ===================================================================
// TOOL: add_to_master_list (Master List Modifier Agent)
// ===================================================================
// Propósito: Agregar productos nuevos a master_list
//            Asociar con categorías
//            Guardar preferencias a nivel de restaurante
//            Generar embeddings para vector search futuro
// Parte de: Purchase Order Creator Agent
// Fase: 1 - Paso 8
// ===================================================================

/*
INPUTS:
- products: Array of { product_name, unit, category }
- restaurant_id: Number
- preferences: Object (marcas, formatos, restricciones)

OUTPUTS:
{
  success: boolean,
  products_added: [
    {
      master_list_product_id: 150,
      product_name: "Arroz Especial",
      category: "Grãos",
      unit: "saco",
      embedding_generated: true
    }
  ],
  count: number,
  message_to_user: string
}
*/

const input = $input.first().json;
const products = input.products; // Array of {product_name, unit, category}
const restaurantId = input.restaurant_id;
const preferences = input.preferences || {}; // Opcional

console.log('[add_to_master_list] Inputs:', {
  productsCount: products?.length,
  restaurantId,
  hasPreferences: !!preferences
});

// ===================================================================
// VALIDACIONES
// ===================================================================

if (!products || !Array.isArray(products) || products.length === 0) {
  return JSON.stringify({
    error: true,
    message: "products deve ser um array com pelo menos um produto"
  });
}

if (!restaurantId) {
  return JSON.stringify({
    error: true,
    message: "restaurant_id é obrigatório"
  });
}

// ===================================================================
// PASO 1: Verificar que restaurant existe
// ===================================================================

console.log('[add_to_master_list] Verificando restaurante...');

const { data: restaurant, error: restaurantError } = await $supabase
  .from('restaurants')
  .select('id, restaurant_name')
  .eq('id', restaurantId)
  .single();

if (restaurantError || !restaurant) {
  console.error('[add_to_master_list] Restaurante não encontrado:', restaurantError);
  return JSON.stringify({
    error: true,
    message: "Restaurante não encontrado"
  });
}

console.log('[add_to_master_list] Restaurante:', restaurant.restaurant_name);

// ===================================================================
// PASO 2: Procesar cada producto
// ===================================================================

console.log('[add_to_master_list] Processando produtos...');

const productsAdded = [];
const errors = [];

for (const product of products) {
  const productName = product.product_name;
  const unit = product.unit || 'unidade';
  const category = product.category || 'Outros';

  console.log(`[add_to_master_list] Processando: ${productName}`);

  // -------------------------------------------------------------------
  // PASO 2.1: Verificar que no exista ya en master_list
  // -------------------------------------------------------------------

  const { data: existingProduct, error: checkError } = await $supabase
    .from('master_list')
    .select('id, product_name')
    .ilike('product_name', productName)
    .limit(1);

  if (checkError) {
    console.error(`  ❌ Error verificando duplicado:`, checkError);
    errors.push({
      product_name: productName,
      error: 'Error verificando duplicado: ' + checkError.message
    });
    continue;
  }

  if (existingProduct && existingProduct.length > 0) {
    console.log(`  ⚠️  Produto já existe no master_list: ${existingProduct[0].product_name}`);
    errors.push({
      product_name: productName,
      error: 'Produto já existe no catálogo',
      existing_id: existingProduct[0].id
    });
    continue;
  }

  // -------------------------------------------------------------------
  // PASO 2.2: Generar embedding para el producto
  // -------------------------------------------------------------------

  let productEmbedding = null;

  try {
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

    productEmbedding = embeddingResponse.data.data[0].embedding;
    console.log(`  ✅ Embedding gerado`);
  } catch (embeddingError) {
    console.error(`  ❌ Error generando embedding:`, embeddingError);
    errors.push({
      product_name: productName,
      error: 'Error generando embedding: ' + embeddingError.message
    });
    continue;
  }

  // -------------------------------------------------------------------
  // PASO 2.3: Insertar en master_list
  // -------------------------------------------------------------------

  const { data: newProduct, error: insertError } = await $supabase
    .from('master_list')
    .insert({
      product_name: productName,
      category: category,
      unit: unit,
      is_active: true,
      embedding_vector_v2: productEmbedding,
      created_by_restaurant_id: restaurantId, // Trackear quién lo creó
      metadata: {
        created_via: 'purchase_order_creator_agent',
        preferences: preferences,
        created_at: new Date().toISOString()
      }
    })
    .select()
    .single();

  if (insertError) {
    console.error(`  ❌ Error insertando producto:`, insertError);
    errors.push({
      product_name: productName,
      error: 'Error insertando: ' + insertError.message
    });
    continue;
  }

  console.log(`  ✅ Produto adicionado ao master_list: ID ${newProduct.id}`);

  productsAdded.push({
    master_list_product_id: newProduct.id,
    product_name: newProduct.product_name,
    category: newProduct.category,
    unit: newProduct.unit,
    embedding_generated: true
  });

  // -------------------------------------------------------------------
  // PASO 2.4: Opcional - Agregar a preferencias del restaurante
  // -------------------------------------------------------------------

  // Si el producto tiene categoría, podríamos agregar automáticamente
  // a category_preferences del restaurante
  // Por ahora, lo dejamos como placeholder

  // Ejemplo:
  // await $supabase
  //   .from('restaurants')
  //   .update({
  //     category_preferences: {
  //       ...existingPreferences,
  //       category_specific: {
  //         ...categorySpecific,
  //         [category]: { added_products: [productName] }
  //       }
  //     }
  //   })
  //   .eq('id', restaurantId);
}

// ===================================================================
// PASO 3: Generar mensaje de resumen
// ===================================================================

console.log('[add_to_master_list] Resumo:', {
  added: productsAdded.length,
  errors: errors.length
});

let messageToUser = '';

if (productsAdded.length > 0) {
  messageToUser += `✅ **${productsAdded.length} produto(s) adicionado(s) ao catálogo mestre!**\\n\\n`;
  productsAdded.forEach(p => {
    messageToUser += `  • ${p.product_name} (${p.category}) - ID: ${p.master_list_product_id}\\n`;
  });
  messageToUser += '\\n';

  if (productsAdded.length === 1) {
    messageToUser += `Este produto agora está disponível para todos os restaurantes! 🎉\\n\\n`;
  } else {
    messageToUser += `Estes produtos agora estão disponíveis para todos os restaurantes! 🎉\\n\\n`;
  }
}

if (errors.length > 0) {
  messageToUser += `⚠️  **${errors.length} erro(s):**\\n`;
  errors.forEach(e => {
    messageToUser += `  • ${e.product_name}: ${e.error}\\n`;
  });
  messageToUser += '\\n';
}

if (productsAdded.length > 0) {
  messageToUser += `Vou continuar criando o melhor pedido para você...`;
}

// ===================================================================
// PASO 4: Return results
// ===================================================================

return JSON.stringify({
  success: productsAdded.length > 0,
  products_added: productsAdded,
  count: productsAdded.length,
  errors: errors,
  errors_count: errors.length,
  message_to_user: messageToUser
});
