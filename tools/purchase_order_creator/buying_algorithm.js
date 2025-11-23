// ===================================================================
// TOOL: buying_algorithm
// ===================================================================
// Propósito: Determinar la MEJOR combinación de compra
//            Analiza: precios, preferencias, agrupación por fornecedor
//            Optimiza: costo total, delivery fees, preferencias matched
// Parte de: Purchase Order Creator Agent
// Fase: 1 - Paso 5 | Fase 2 - Paso 15
// ===================================================================

/*
INPUTS:
- products: Array of { master_list_product_id, quantity, unit }
- prices: Array (output de get_prices tool)
- preferences: Object (output de get_user_preferences tool)
- restaurant_id: Number

OUTPUTS:
{
  success: boolean,
  recommended_purchase: {
    restaurant_id: number,
    total_amount: number,
    subtotal: number,
    delivery_fees: number,
    items: [
      {
        master_list_product_id: 45,
        product_name: "Picanha",
        quantity: 10,
        unit: "kg",
        unit_price: 47.00,
        subtotal: 470.00,
        supplier_id: 3,
        supplier_name: "Friboi",
        reason: "marca preferida + melhor preço"
      }
    ],
    grouped_by_supplier: [
      {
        supplier_id: 3,
        supplier_name: "Friboi",
        subtotal: 470.00,
        items_count: 2,
        delivery_fee: 0,
        is_preferred: true
      }
    ],
    total_savings: 35.00,
    savings_percent: 5.0,
    preferences_matched: ["marca preferida", "fornecedor conhecido"],
    warnings: ["Preço de arroz está há 45 dias sem atualização"]
  },
  alternative_options: [
    {
      description: "Comprar tudo de um único fornecedor",
      total_amount: 685.00,
      supplier_name: "Friboi"
    }
  ],
  message_to_user: string
}
*/

const input = $input.first().json;
const products = input.products; // Array of {master_list_product_id, quantity, unit}
const prices = input.prices; // Array from get_prices
const preferences = input.preferences; // Object from get_user_preferences
const restaurantId = input.restaurant_id;

console.log('[buying_algorithm] Inputs:', {
  productsCount: products?.length,
  pricesCount: prices?.length,
  hasPreferences: !!preferences,
  restaurantId
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

if (!prices || !Array.isArray(prices) || prices.length === 0) {
  return JSON.stringify({
    error: true,
    message: "prices deve ser fornecido (output do tool get_prices)"
  });
}

if (!restaurantId) {
  return JSON.stringify({
    error: true,
    message: "restaurant_id é obrigatório"
  });
}

// ===================================================================
// PASO 1: Preparar datos
// ===================================================================

console.log('[buying_algorithm] Iniciando análise...');

// Crear map de precios por master_list_product_id
const priceMap = {};
prices.forEach(p => {
  if (!priceMap[p.master_list_product_id]) {
    priceMap[p.master_list_product_id] = [];
  }
  priceMap[p.master_list_product_id].push(p);
});

// Extraer preferencias
const preferredBrands = preferences?.preferred_brands || [];
const preferredSuppliers = preferences?.preferred_suppliers || [];
const preferredSupplierIds = preferredSuppliers.map(s => s.supplier_id);

console.log('[buying_algorithm] Preferências:', {
  brands: preferredBrands.length,
  suppliers: preferredSupplierIds.length
});

// ===================================================================
// PASO 2: Seleccionar mejor precio para cada producto
// ===================================================================

const recommendedItems = [];
const warnings = [];
const preferencesMatched = new Set();
let totalProductsWithPrice = 0;
let totalProductsWithoutPrice = 0;

for (const product of products) {
  const masterListProductId = product.master_list_product_id;
  const quantity = parseFloat(product.quantity) || 1;
  const unit = product.unit || 'unidade';

  console.log(`[buying_algorithm] Analisando: product_id ${masterListProductId}`);

  // Obtener todos los precios disponibles para este producto
  const availablePrices = priceMap[masterListProductId] || [];

  if (availablePrices.length === 0) {
    console.log(`  ❌ Sem preços disponíveis`);
    warnings.push(`Produto ${masterListProductId} não tem preço disponível`);
    totalProductsWithoutPrice++;
    continue;
  }

  // -------------------------------------------------------------------
  // Algoritmo de selección:
  // 1. Filtrar solo precios válidos
  // 2. Priorizar fornecedores preferidos
  // 3. Priorizar marcas preferidas (si está en metadata)
  // 4. Seleccionar el de menor precio
  // -------------------------------------------------------------------

  const validPrices = availablePrices.filter(p => p.is_valid);

  if (validPrices.length === 0) {
    // Todos los precios están expirados
    console.log(`  ⚠️  Todos os preços expirados`);

    const oldestPrice = availablePrices[0]; // Ya viene ordenado por effective_date DESC

    warnings.push(
      `${oldestPrice.product_name}: preço há ${oldestPrice.days_since_update} dias (considere confirmar)`
    );

    // Usar el precio expirado pero alertar
    recommendedItems.push({
      master_list_product_id: masterListProductId,
      product_name: oldestPrice.product_name,
      quantity: quantity,
      unit: unit,
      unit_price: oldestPrice.unit_price,
      subtotal: quantity * oldestPrice.unit_price,
      supplier_id: oldestPrice.supplier_id,
      supplier_name: oldestPrice.supplier_name,
      reason: '⚠️ preço expirado (confirmar com fornecedor)',
      is_price_valid: false,
      days_since_update: oldestPrice.days_since_update
    });

    totalProductsWithPrice++;
    continue;
  }

  // -------------------------------------------------------------------
  // Scoring system para seleccionar mejor opción
  // -------------------------------------------------------------------

  const scoredPrices = validPrices.map(priceOption => {
    let score = 0;

    // Factor 1: Fornecedor preferido (+100 puntos)
    if (priceOption.is_preferred_supplier) {
      score += 100;
      console.log(`    🌟 Fornecedor preferido: ${priceOption.supplier_name} (+100)`);
    }

    // Factor 2: Precio bajo (normalizado, max +50 puntos)
    // Encontrar precio mínimo y máximo
    const allValidPrices = validPrices.map(p => p.unit_price);
    const minPrice = Math.min(...allValidPrices);
    const maxPrice = Math.max(...allValidPrices);

    if (maxPrice > minPrice) {
      const priceScore = 50 * (1 - (priceOption.unit_price - minPrice) / (maxPrice - minPrice));
      score += priceScore;
      console.log(`    💰 Pontuação de preço: +${priceScore.toFixed(1)}`);
    } else {
      score += 50; // Todos tienen mismo precio
    }

    // Factor 3: Actualización reciente (+20 puntos si < 7 días)
    if (priceOption.days_since_update < 7) {
      score += 20;
      console.log(`    📅 Preço recente: +20`);
    }

    // Factor 4: Marca preferida (si disponible en metadata) (+30 puntos)
    // Esto requeriría metadata adicional en pricing_history
    // Por ahora, lo dejamos como placeholder

    return {
      ...priceOption,
      score: score
    };
  });

  // Ordenar por score DESC
  scoredPrices.sort((a, b) => b.score - a.score);

  const bestOption = scoredPrices[0];

  console.log(`  ✅ Melhor opção: ${bestOption.supplier_name} - R$ ${bestOption.unit_price} (score: ${bestOption.score.toFixed(1)})`);

  // Construir razón
  let reason = [];
  if (bestOption.is_preferred_supplier) {
    reason.push('fornecedor preferido');
    preferencesMatched.add('fornecedor preferido');
  }
  if (bestOption.unit_price === Math.min(...validPrices.map(p => p.unit_price))) {
    reason.push('melhor preço');
    preferencesMatched.add('melhor preço');
  }
  if (bestOption.days_since_update < 7) {
    reason.push('preço atualizado');
  }

  recommendedItems.push({
    master_list_product_id: masterListProductId,
    product_name: bestOption.product_name,
    quantity: quantity,
    unit: unit,
    unit_price: bestOption.unit_price,
    subtotal: quantity * bestOption.unit_price,
    currency: bestOption.currency || 'BRL',
    supplier_id: bestOption.supplier_id,
    supplier_name: bestOption.supplier_name,
    reason: reason.join(' + '),
    is_price_valid: true,
    days_since_update: bestOption.days_since_update,
    score: bestOption.score
  });

  totalProductsWithPrice++;
}

// ===================================================================
// PASO 3: Agrupar por fornecedor y calcular delivery fees
// ===================================================================

console.log('[buying_algorithm] Agrupando por fornecedor...');

const groupedBySupplier = {};

recommendedItems.forEach(item => {
  if (!groupedBySupplier[item.supplier_id]) {
    groupedBySupplier[item.supplier_id] = {
      supplier_id: item.supplier_id,
      supplier_name: item.supplier_name,
      subtotal: 0,
      items_count: 0,
      delivery_fee: 0, // TODO: Calcular según lógica de fornecedor
      is_preferred: preferredSupplierIds.includes(item.supplier_id),
      items: []
    };
  }

  groupedBySupplier[item.supplier_id].subtotal += item.subtotal;
  groupedBySupplier[item.supplier_id].items_count += 1;
  groupedBySupplier[item.supplier_id].items.push(item);
});

// Convertir a array
const groupedArray = Object.values(groupedBySupplier);

// Calcular delivery fees (placeholder - lógica real dependería de cada fornecedor)
// Por ejemplo: R$ 20 por fornecedor si subtotal < R$ 200
groupedArray.forEach(group => {
  if (group.subtotal < 200) {
    group.delivery_fee = 20.00;
  } else {
    group.delivery_fee = 0; // Gratis si compra > R$ 200
  }
});

// ===================================================================
// PASO 4: Calcular totales
// ===================================================================

const subtotal = recommendedItems.reduce((sum, item) => sum + item.subtotal, 0);
const deliveryFees = groupedArray.reduce((sum, group) => sum + group.delivery_fee, 0);
const totalAmount = subtotal + deliveryFees;

console.log('[buying_algorithm] Totais:', {
  subtotal: subtotal.toFixed(2),
  delivery_fees: deliveryFees.toFixed(2),
  total: totalAmount.toFixed(2)
});

// ===================================================================
// PASO 5: Calcular ahorros (comparar con precios no preferidos)
// ===================================================================

// Para calcular ahorros, comparamos el precio seleccionado vs el precio promedio
let totalSavings = 0;

recommendedItems.forEach(item => {
  const allPricesForProduct = priceMap[item.master_list_product_id] || [];
  const validPricesForProduct = allPricesForProduct.filter(p => p.is_valid);

  if (validPricesForProduct.length > 1) {
    const avgPrice = validPricesForProduct.reduce((sum, p) => sum + p.unit_price, 0) / validPricesForProduct.length;
    const savings = (avgPrice - item.unit_price) * item.quantity;

    if (savings > 0) {
      totalSavings += savings;
    }
  }
});

const savingsPercent = subtotal > 0 ? (totalSavings / subtotal) * 100 : 0;

console.log('[buying_algorithm] Economia:', {
  total_savings: totalSavings.toFixed(2),
  percent: savingsPercent.toFixed(1) + '%'
});

// ===================================================================
// PASO 6: Generar opciones alternativas
// ===================================================================

const alternativeOptions = [];

// Opción 1: Comprar todo de un único fornecedor (si hay múltiples)
if (groupedArray.length > 1) {
  groupedArray.forEach(group => {
    // Calcular cuánto costaría comprar TODO de este fornecedor
    // (placeholder - requeriría buscar precios de este fornecedor para todos los productos)

    alternativeOptions.push({
      description: `Comprar tudo de ${group.supplier_name}`,
      total_amount: null, // Requiere cálculo adicional
      supplier_name: group.supplier_name,
      note: 'Reduz custo de entrega mas pode aumentar preços'
    });
  });
}

// ===================================================================
// PASO 7: Generar mensaje para usuario
// ===================================================================

let messageToUser = `💰 **Melhor combinação de compra encontrada!**\\n\\n`;

messageToUser += `📦 **Resumo do pedido:**\\n`;
messageToUser += `Subtotal: R$ ${subtotal.toFixed(2)}\\n`;
if (deliveryFees > 0) {
  messageToUser += `Entrega: R$ ${deliveryFees.toFixed(2)}\\n`;
} else {
  messageToUser += `Entrega: GRÁTIS ✅\\n`;
}
messageToUser += `**Total: R$ ${totalAmount.toFixed(2)}**\\n\\n`;

if (totalSavings > 0) {
  messageToUser += `💵 Economia: R$ ${totalSavings.toFixed(2)} (${savingsPercent.toFixed(1)}%)\\n\\n`;
}

messageToUser += `📋 **Itens (${recommendedItems.length}):**\\n`;
groupedArray.forEach(group => {
  messageToUser += `\\n🏪 **${group.supplier_name}** ${group.is_preferred ? '⭐' : ''}\\n`;
  group.items.forEach(item => {
    messageToUser += `  • ${item.product_name}: ${item.quantity} ${item.unit} x R$ ${item.unit_price.toFixed(2)} = R$ ${item.subtotal.toFixed(2)}\\n`;
  });
  messageToUser += `  Subtotal: R$ ${group.subtotal.toFixed(2)}`;
  if (group.delivery_fee > 0) {
    messageToUser += ` + entrega R$ ${group.delivery_fee.toFixed(2)}`;
  }
  messageToUser += '\\n';
});

if (preferencesMatched.size > 0) {
  messageToUser += `\\n✅ **Preferências atendidas:**\\n`;
  Array.from(preferencesMatched).forEach(pref => {
    messageToUser += `  • ${pref}\\n`;
  });
}

if (warnings.length > 0) {
  messageToUser += `\\n⚠️  **Avisos:**\\n`;
  warnings.forEach(warning => {
    messageToUser += `  • ${warning}\\n`;
  });
}

if (totalProductsWithoutPrice > 0) {
  messageToUser += `\\n❌ **${totalProductsWithoutPrice} produto(s) sem preço** (não incluídos no pedido)\\n`;
}

// ===================================================================
// PASO 8: Return results
// ===================================================================

return JSON.stringify({
  success: true,
  recommended_purchase: {
    restaurant_id: restaurantId,
    total_amount: totalAmount,
    subtotal: subtotal,
    delivery_fees: deliveryFees,
    currency: 'BRL',
    items: recommendedItems,
    grouped_by_supplier: groupedArray.map(g => ({
      supplier_id: g.supplier_id,
      supplier_name: g.supplier_name,
      subtotal: g.subtotal,
      items_count: g.items_count,
      delivery_fee: g.delivery_fee,
      is_preferred: g.is_preferred
    })),
    total_savings: totalSavings,
    savings_percent: savingsPercent,
    preferences_matched: Array.from(preferencesMatched),
    warnings: warnings
  },
  alternative_options: alternativeOptions,
  statistics: {
    total_products_requested: products.length,
    products_with_price: totalProductsWithPrice,
    products_without_price: totalProductsWithoutPrice,
    suppliers_count: groupedArray.length,
    preferred_suppliers_used: groupedArray.filter(g => g.is_preferred).length
  },
  message_to_user: messageToUser
});
