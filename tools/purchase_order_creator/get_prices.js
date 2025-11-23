// ===================================================================
// TOOL: get_prices
// ===================================================================
// Propósito: Obtener precios de pricing_history para cada producto
//            Verificar vigencia (effective_date)
//            Marcar precios expirados o no válidos
//            En FASE 2: priorizar fornecedores preferidos
// Parte de: Purchase Order Creator Agent
// Fase: 1 - Paso 4 | Fase 2 - Paso 14
// ===================================================================

/*
INPUTS:
- products: Array of { master_list_product_id, quantity, unit }
- restaurant_id: Number (para preferencias)
- preferred_suppliers: Array de supplier_ids (opcional, para priorizar)
- max_days_old: Number (opcional, default: 30) - máx días para considerar precio válido

OUTPUTS:
{
  success: boolean,
  prices: [
    {
      master_list_product_id: 45,
      product_name: "Picanha",
      unit_price: 47.00,
      unit: "kg",
      supplier_id: 3,
      supplier_name: "Friboi",
      effective_date: "2025-01-15",
      is_valid: true,
      days_since_update: 2,
      is_preferred_supplier: true
    },
    {
      master_list_product_id: 46,
      product_name: "Arroz",
      unit_price: 28.00,
      unit: "saco",
      supplier_id: 5,
      supplier_name: "Outro Fornecedor",
      effective_date: "2024-12-01",
      is_valid: false,
      days_since_update: 47,
      reason: "price_expired",
      is_preferred_supplier: false
    },
    {
      master_list_product_id: 47,
      product_name: "Feijão",
      unit_price: null,
      is_valid: false,
      reason: "no_price_available"
    }
  ],
  summary: {
    total_products: 5,
    valid_count: 3,
    expired_count: 1,
    no_price_count: 1
  },
  message_to_user: string
}
*/

const input = $input.first().json;
const products = input.products; // Array of {master_list_product_id, quantity, unit}
const restaurantId = input.restaurant_id;
const preferredSuppliers = input.preferred_suppliers || []; // Array de supplier_ids
const maxDaysOld = input.max_days_old || 30; // Default: 30 dias

console.log('[get_prices] Inputs:', {
  productsCount: products?.length,
  restaurantId,
  preferredSuppliersCount: preferredSuppliers.length,
  maxDaysOld
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
// PASO 1: Obtener precios para cada producto
// ===================================================================

console.log('[get_prices] Buscando preços...');

const prices = [];
let validCount = 0;
let expiredCount = 0;
let noPriceCount = 0;

for (const product of products) {
  const masterListProductId = product.master_list_product_id;
  const quantity = parseFloat(product.quantity) || 1;
  const unit = product.unit || 'unidade';

  console.log(`[get_prices] Buscando preço para product_id: ${masterListProductId}`);

  // -------------------------------------------------------------------
  // PASO 1.1: Obtener producto del master_list
  // -------------------------------------------------------------------

  const { data: masterProduct, error: masterError } = await $supabase
    .from('master_list')
    .select('id, product_name, category, unit')
    .eq('id', masterListProductId)
    .single();

  if (masterError || !masterProduct) {
    console.error(`  ❌ Producto ${masterListProductId} não encontrado no master_list`);
    prices.push({
      master_list_product_id: masterListProductId,
      product_name: 'Produto desconhecido',
      unit_price: null,
      is_valid: false,
      reason: 'product_not_found_in_master_list'
    });
    noPriceCount++;
    continue;
  }

  console.log(`  📦 Produto: ${masterProduct.product_name}`);

  // -------------------------------------------------------------------
  // PASO 1.2: Buscar precios en pricing_history
  // -------------------------------------------------------------------

  // Estrategia:
  // 1. Si hay preferred_suppliers, buscar primero en esos
  // 2. Luego buscar en todos los suppliers
  // 3. Ordenar por effective_date DESC

  let priceQuery = $supabase
    .from('pricing_history')
    .select(`
      id,
      supplier_id,
      unit_price,
      unit,
      currency,
      effective_date,
      verification_status,
      supplier:suppliers (
        id,
        company_name
      )
    `)
    .eq('master_list_id', masterListProductId)
    .eq('verification_status', 'verified')
    .order('effective_date', { ascending: false });

  // Si hay preferred_suppliers, filtrar
  if (preferredSuppliers.length > 0) {
    priceQuery = priceQuery.in('supplier_id', preferredSuppliers);
  }

  const { data: priceRecords, error: priceError } = await priceQuery.limit(10);

  if (priceError) {
    console.error(`  ❌ Error buscando preços:`, priceError);
    prices.push({
      master_list_product_id: masterListProductId,
      product_name: masterProduct.product_name,
      unit_price: null,
      is_valid: false,
      reason: 'price_search_error',
      error: priceError.message
    });
    noPriceCount++;
    continue;
  }

  // -------------------------------------------------------------------
  // PASO 1.3: Si no hay precios con preferred_suppliers, buscar en todos
  // -------------------------------------------------------------------

  if ((!priceRecords || priceRecords.length === 0) && preferredSuppliers.length > 0) {
    console.log(`  ⚠️  No se encontraron preços com fornecedores preferidos, buscando en todos...`);

    const { data: allPriceRecords, error: allPriceError } = await $supabase
      .from('pricing_history')
      .select(`
        id,
        supplier_id,
        unit_price,
        unit,
        currency,
        effective_date,
        verification_status,
        supplier:suppliers (
          id,
          company_name
        )
      `)
      .eq('master_list_id', masterListProductId)
      .eq('verification_status', 'verified')
      .order('effective_date', { ascending: false })
      .limit(10);

    if (!allPriceError && allPriceRecords && allPriceRecords.length > 0) {
      priceRecords.push(...allPriceRecords);
    }
  }

  // -------------------------------------------------------------------
  // PASO 1.4: Evaluar validez de precios
  // -------------------------------------------------------------------

  if (!priceRecords || priceRecords.length === 0) {
    console.log(`  ❌ Nenhum preço encontrado`);
    prices.push({
      master_list_product_id: masterListProductId,
      product_name: masterProduct.product_name,
      unit_price: null,
      unit: unit,
      is_valid: false,
      reason: 'no_price_available'
    });
    noPriceCount++;
    continue;
  }

  // Tomar el precio más reciente
  const latestPrice = priceRecords[0];

  // Calcular días desde última actualización
  const effectiveDate = new Date(latestPrice.effective_date);
  const today = new Date();
  const daysSinceUpdate = Math.floor((today - effectiveDate) / (1000 * 60 * 60 * 24));

  // Determinar si es válido
  const isValid = daysSinceUpdate <= maxDaysOld;
  const isPreferredSupplier = preferredSuppliers.includes(latestPrice.supplier_id);

  console.log(`  ${isValid ? '✅' : '⚠️'} Preço: R$ ${latestPrice.unit_price}/${latestPrice.unit} - ${latestPrice.supplier?.company_name || 'Supplier desconhecido'} (${daysSinceUpdate} dias)`);

  prices.push({
    master_list_product_id: masterListProductId,
    product_name: masterProduct.product_name,
    unit_price: parseFloat(latestPrice.unit_price),
    unit: latestPrice.unit || unit,
    currency: latestPrice.currency || 'BRL',
    supplier_id: latestPrice.supplier_id,
    supplier_name: latestPrice.supplier?.company_name || 'Fornecedor desconhecido',
    effective_date: latestPrice.effective_date,
    is_valid: isValid,
    days_since_update: daysSinceUpdate,
    is_preferred_supplier: isPreferredSupplier,
    reason: isValid ? null : 'price_expired'
  });

  if (isValid) {
    validCount++;
  } else {
    expiredCount++;
  }
}

// ===================================================================
// PASO 2: Generar mensaje de resumen
// ===================================================================

console.log('[get_prices] Resumo:', {
  total: prices.length,
  valid: validCount,
  expired: expiredCount,
  no_price: noPriceCount
});

let messageToUser = `💰 Análise de preços concluída!\\n\\n`;

if (validCount > 0) {
  messageToUser += `✅ **${validCount} preço(s) válido(s):**\\n`;
  prices.filter(p => p.is_valid).forEach(p => {
    const preferredBadge = p.is_preferred_supplier ? '⭐' : '';
    messageToUser += `  ${preferredBadge} ${p.product_name}: R$ ${p.unit_price.toFixed(2)}/${p.unit}`;
    messageToUser += ` - ${p.supplier_name}`;
    messageToUser += ` (${p.days_since_update} dias)\\n`;
  });
  messageToUser += '\\n';
}

if (expiredCount > 0) {
  messageToUser += `⚠️  **${expiredCount} preço(s) expirado(s)** (>${maxDaysOld} dias):\\n`;
  prices.filter(p => !p.is_valid && p.reason === 'price_expired').forEach(p => {
    messageToUser += `  • ${p.product_name}: R$ ${p.unit_price.toFixed(2)}/${p.unit}`;
    messageToUser += ` (${p.days_since_update} dias atrás)\\n`;
  });
  messageToUser += '\\n';
  messageToUser += `💡 Recomendo confirmar preços atualizados com os fornecedores.\\n\\n`;
}

if (noPriceCount > 0) {
  messageToUser += `❌ **${noPriceCount} produto(s) sem preço:**\\n`;
  prices.filter(p => !p.unit_price).forEach(p => {
    messageToUser += `  • ${p.product_name}\\n`;
  });
  messageToUser += '\\n';
  messageToUser += `💡 Será necessário solicitar cotação para estes produtos.\\n`;
}

// ===================================================================
// PASO 3: Return results
// ===================================================================

return JSON.stringify({
  success: true,
  prices: prices,
  summary: {
    total_products: prices.length,
    valid_count: validCount,
    expired_count: expiredCount,
    no_price_count: noPriceCount
  },
  message_to_user: messageToUser
});
