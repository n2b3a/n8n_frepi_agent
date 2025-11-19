// ===================================================================
// TOOL: update_prices
// ===================================================================
// Purpose: Update prices in supplier_mapped_products for confirmed matches
// Part of: Supplier Price Updater Agent (Sub-agent)
// Phase: 1
// ===================================================================

/*
INPUTS:
- products_to_update: Array of {
    supplier_mapped_product_id: number,
    new_price: number,
    unit: string,
    product_name: string (for confirmation message)
  }
- restaurant_id: number
- supplier_id: number

OUTPUTS:
{
  success: boolean,
  updated_count: number,
  failed_count: number,
  updates: [
    {
      supplier_mapped_product_id: 123,
      product_name: "Picanha",
      old_price: 45.00,
      new_price: 47.00,
      price_change: 2.00,
      price_change_percent: 4.44,
      updated: true
    }
  ],
  failed_updates: [
    {
      supplier_mapped_product_id: 456,
      product_name: "Arroz",
      error: "Product not found"
    }
  ],
  message_to_user: string
}
*/

// ===================================================================
// STEP 1: Validate inputs
// ===================================================================

const productsToUpdate = $input.item.json.products_to_update;
const restaurantId = $input.item.json.restaurant_id;
const supplierId = $input.item.json.supplier_id;

console.log('[update_prices] Inputs:', {
  productsCount: productsToUpdate?.length,
  restaurantId,
  supplierId
});

// Validate inputs
if (!productsToUpdate || !Array.isArray(productsToUpdate) || productsToUpdate.length === 0) {
  return [{
    json: {
      error: true,
      message: "products_to_update deve ser um array com pelo menos um produto"
    }
  }];
}

if (!restaurantId || !supplierId) {
  return [{
    json: {
      error: true,
      message: "restaurant_id e supplier_id são obrigatórios"
    }
  }];
}

// ===================================================================
// STEP 2: Process each product update
// ===================================================================

const updates = [];
const failedUpdates = [];

for (const product of productsToUpdate) {
  const productId = product.supplier_mapped_product_id;
  const newPrice = parseFloat(product.new_price);
  const unit = product.unit || 'unidade';
  const productName = product.product_name || 'Produto';

  console.log(`[update_prices] Updating product ${productId}: ${productName} → R$ ${newPrice}/${unit}`);

  // -------------------------------------------------------------------
  // STEP 2.1: Fetch current product data
  // -------------------------------------------------------------------

  const { data: currentProduct, error: fetchError } = await $supabase
    .from('supplier_mapped_products')
    .select('id, product_name, price, unit, supplier_id, master_list_product_id')
    .eq('id', productId)
    .maybeSingle();

  if (fetchError || !currentProduct) {
    console.error(`  ❌ Error fetching product ${productId}:`, fetchError?.message || 'Not found');
    failedUpdates.push({
      supplier_mapped_product_id: productId,
      product_name: productName,
      error: fetchError?.message || 'Product not found'
    });
    continue;
  }

  // Verify supplier_id matches
  if (currentProduct.supplier_id !== supplierId) {
    console.error(`  ❌ Supplier mismatch for product ${productId}`);
    failedUpdates.push({
      supplier_mapped_product_id: productId,
      product_name: productName,
      error: 'Supplier ID mismatch'
    });
    continue;
  }

  const oldPrice = parseFloat(currentProduct.price) || 0;
  const priceChange = newPrice - oldPrice;
  const priceChangePercent = oldPrice > 0 ? (priceChange / oldPrice) * 100 : 0;

  // -------------------------------------------------------------------
  // STEP 2.2: Update price in supplier_mapped_products
  // -------------------------------------------------------------------

  const { error: updateError } = await $supabase
    .from('supplier_mapped_products')
    .update({
      price: newPrice,
      unit: unit,
      updated_at: new Date().toISOString()
    })
    .eq('id', productId);

  if (updateError) {
    console.error(`  ❌ Error updating product ${productId}:`, updateError.message);
    failedUpdates.push({
      supplier_mapped_product_id: productId,
      product_name: currentProduct.product_name,
      error: updateError.message
    });
    continue;
  }

  // -------------------------------------------------------------------
  // STEP 2.3: Log price change (optional - if price_history table exists)
  // -------------------------------------------------------------------

  // Check if price_history table exists and log the change
  try {
    const { error: historyError } = await $supabase
      .from('price_history')
      .insert({
        supplier_mapped_product_id: productId,
        master_list_product_id: currentProduct.master_list_product_id,
        old_price: oldPrice,
        new_price: newPrice,
        price_change: priceChange,
        price_change_percent: priceChangePercent,
        reported_by_restaurant_id: restaurantId,
        supplier_id: supplierId,
        change_date: new Date().toISOString()
      });

    if (historyError) {
      // Table might not exist, that's ok
      console.log(`  ℹ️  Could not log to price_history (table might not exist):`, historyError.message);
    } else {
      console.log(`  📊 Price change logged to history`);
    }
  } catch (historyError) {
    // Silently fail - price_history is optional
    console.log(`  ℹ️  price_history table not available`);
  }

  // -------------------------------------------------------------------
  // STEP 2.4: Add to successful updates
  // -------------------------------------------------------------------

  updates.push({
    supplier_mapped_product_id: productId,
    product_name: currentProduct.product_name,
    old_price: oldPrice,
    new_price: newPrice,
    unit: unit,
    price_change: priceChange,
    price_change_percent: priceChangePercent,
    updated: true
  });

  console.log(`  ✅ Updated: ${currentProduct.product_name} (${oldPrice} → ${newPrice})`);
}

// ===================================================================
// STEP 3: Update restaurant_supplier_relationships
// ===================================================================

if (updates.length > 0) {
  console.log('[update_prices] Updating restaurant-supplier relationship...');

  const { data: relationship, error: relError } = await $supabase
    .from('restaurant_supplier_relationships')
    .select('*')
    .eq('restaurant_id', restaurantId)
    .eq('supplier_id', supplierId)
    .maybeSingle();

  if (relationship) {
    const { error: updateRelError } = await $supabase
      .from('restaurant_supplier_relationships')
      .update({
        price_updates_count: relationship.price_updates_count + 1,
        last_interaction_date: new Date().toISOString()
      })
      .eq('id', relationship.id);

    if (updateRelError) {
      console.error('[update_prices] Error updating relationship:', updateRelError);
    } else {
      console.log('  ✅ Relationship updated');
    }
  }
}

// ===================================================================
// STEP 4: Generate summary message
// ===================================================================

let messageToUser = '';

if (updates.length > 0) {
  messageToUser += `✅ **${updates.length} preço(s) atualizado(s) com sucesso!**\n\n`;

  // Show updates with significant price changes
  const significantChanges = updates.filter(u => Math.abs(u.price_change_percent) >= 5);

  if (significantChanges.length > 0) {
    messageToUser += '📈 **Mudanças significativas (≥5%):**\n';
    significantChanges.forEach(u => {
      const arrow = u.price_change > 0 ? '⬆️' : '⬇️';
      const sign = u.price_change > 0 ? '+' : '';
      messageToUser += `  ${arrow} ${u.product_name}: R$ ${u.old_price.toFixed(2)} → R$ ${u.new_price.toFixed(2)} (${sign}${u.price_change_percent.toFixed(1)}%)\n`;
    });
    messageToUser += '\n';
  }

  // Show all updates summary
  messageToUser += '📝 **Resumo completo:**\n';
  updates.forEach(u => {
    const sign = u.price_change > 0 ? '+' : '';
    messageToUser += `  • ${u.product_name}: R$ ${u.new_price.toFixed(2)}/${u.unit}`;
    if (u.old_price > 0) {
      messageToUser += ` (${sign}${u.price_change.toFixed(2)})`;
    }
    messageToUser += '\n';
  });
}

if (failedUpdates.length > 0) {
  messageToUser += `\n⚠️  **${failedUpdates.length} atualização(ões) falharam:**\n`;
  failedUpdates.forEach(f => {
    messageToUser += `  • ${f.product_name}: ${f.error}\n`;
  });
}

// ===================================================================
// STEP 5: Return results
// ===================================================================

const success = updates.length > 0 && failedUpdates.length === 0;

console.log('[update_prices] Summary:', {
  success,
  updated_count: updates.length,
  failed_count: failedUpdates.length
});

return [{
  json: {
    success: success,
    updated_count: updates.length,
    failed_count: failedUpdates.length,
    updates: updates,
    failed_updates: failedUpdates,
    message_to_user: messageToUser,
    summary: {
      total_requested: productsToUpdate.length,
      successful: updates.length,
      failed: failedUpdates.length,
      significant_changes: updates.filter(u => Math.abs(u.price_change_percent) >= 5).length
    }
  }
}];
