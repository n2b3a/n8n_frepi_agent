// ===== BUILD SHOPPING CART - COMPLETE IMPLEMENTATION =====
// Tool for n8n workflow: manages shopping cart with pricing_history queries and session persistence

const input = $input.first().json;
const userData = $('Prepare User Context').first().json;
const userMessage = (input.query || input.message || '').trim();

console.log('🛒 [Cart] User:', userData.phone_number, 'Message:', userMessage);

// ===== CHECK IF USER IS REGISTERED =====
if (userData.is_new_user || !userData.restaurant_id) {
  console.log('❌ [Cart] User not registered');
  return JSON.stringify({
    error: true,
    message: 'Você precisa estar cadastrado para fazer pedidos. 😊\n\nDigite "registrar" para começar.'
  });
}

// ===== HELPER FUNCTIONS =====
function parseProductSelection(message) {
  // Parse patterns like:
  // "quero 3 caixas do 1" -> { productIndex: 1, quantity: 3, unit: 'caixas' }
  // "produto 2, 5 unidades" -> { productIndex: 2, quantity: 5, unit: 'unidades' }
  // "5kg do tomate" -> { productName: 'tomate', quantity: 5, unit: 'kg' }

  const patterns = [
    // "quero X unidades do Y" or "quero X do Y"
    /(?:quero|preciso)\s+(\d+)\s*(caixas?|kg|unidades?|litros?|l)?\s*(?:do|da|de)?\s*(?:produto)?\s*(\d+|tomate|cebola|arroz)/i,
    // "produto X, Y unidades"
    /produto\s*(\d+)[,\s]+(\d+)\s*(caixas?|kg|unidades?|litros?|l)?/i,
    // "X caixas do produto Y"
    /(\d+)\s*(caixas?|kg|unidades?|litros?|l)?\s*(?:do|da)\s*produto\s*(\d+)/i,
    // Just "X" (assume last search result)
    /^(\d+)$/
  ];

  for (const pattern of patterns) {
    const match = message.match(pattern);
    if (match) {
      if (pattern.source.includes('^(\\d+)$')) {
        // Just a number - assume it's a product index from last search
        return {
          productIndex: parseInt(match[1]),
          quantity: 1,
          unit: 'unidades'
        };
      } else {
        // Extract quantity and product
        const groups = match.slice(1).filter(g => g);
        const quantity = parseInt(groups.find(g => /^\d+$/.test(g)));
        const productIndex = parseInt(groups.find(g => /^\d+$/.test(g) && g !== quantity.toString()));
        const unit = groups.find(g => /^(caixas?|kg|unidades?|litros?|l)$/i.test(g)) || 'unidades';

        return {
          productIndex,
          quantity: quantity || 1,
          unit: unit.toLowerCase()
        };
      }
    }
  }

  return null;
}

async function getPricing(masterListId) {
  // Query pricing_history for latest price
  const { data, error } = await $supabase
    .from('pricing_history')
    .select('*')
    .eq('master_list_id', masterListId)
    .eq('verification_status', 'verified')
    .order('effective_date', { ascending: false })
    .limit(1);

  if (error || !data || data.length === 0) {
    console.warn('⚠️ [Cart] No pricing found for product:', masterListId);
    return null;
  }

  return data[0];
}

async function getProductDetails(masterListId) {
  // Query master_list for product details
  const { data, error } = await $supabase
    .from('master_list')
    .select('*')
    .eq('id', masterListId)
    .eq('is_active', true)
    .single();

  if (error || !data) {
    console.warn('⚠️ [Cart] Product not found:', masterListId);
    return null;
  }

  return data;
}

// ===== GET CURRENT CART FROM SESSION =====
let cart = null;
let sessionId = null;

if (userData.has_active_session) {
  const session = userData.active_session;
  if (session.primary_intent === 'compra' && session.preferences_captured?.cart) {
    cart = session.preferences_captured.cart;
    sessionId = session.session_id;
    console.log('🔄 [Cart] Found existing cart with', cart.items?.length || 0, 'items');
  }
}

// Initialize cart if not exists
if (!cart) {
  cart = {
    cart_id: `cart-${Date.now()}`,
    restaurant_id: userData.restaurant_id,
    items: [],
    subtotal: 0,
    tax: 0,
    delivery_fee: 0,
    total: 0,
    currency: 'BRL',
    created_at: new Date().toISOString()
  };

  // Create session for shopping
  sessionId = `${userData.phone_number}_cart_${Date.now()}`;

  const { error: sessionError } = await $supabase
    .from('line_sessions')
    .insert({
      session_id: sessionId,
      restaurant_id: userData.restaurant_id,
      person_id: userData.person_id,
      channel_type: 'whatsapp',
      channel_id: userData.phone_number,
      session_type: 'transaction',
      primary_intent: 'compra',
      awaiting_continuation: true,
      message_count: 1,
      user_messages: 1,
      preferences_captured: { cart }
    });

  if (sessionError) {
    console.error('❌ [Cart] Error creating session:', sessionError);
    return JSON.stringify({
      error: true,
      message: '⚠️ Erro ao criar carrinho. Tente novamente.'
    });
  }

  console.log('🆕 [Cart] Created new cart:', cart.cart_id);
}

// ===== HANDLE COMMANDS =====
const msgLower = userMessage.toLowerCase();

// LIMPAR CARRINHO
if (msgLower.match(/limpar|cancelar|desistir/)) {
  await $supabase
    .from('line_sessions')
    .update({
      awaiting_continuation: false,
      session_end: new Date().toISOString(),
      session_notes: 'Cart cancelled by user'
    })
    .eq('session_id', sessionId);

  return JSON.stringify({
    status: 'cancelled',
    message: '🗑️ Carrinho cancelado.\n\nDigite "menu" para ver opções.'
  });
}

// VER CARRINHO
if (msgLower.match(/ver carrinho|mostrar carrinho|carrinho/)) {
  if (cart.items.length === 0) {
    return JSON.stringify({
      status: 'empty',
      message: '🛒 Seu carrinho está vazio.\n\nBusque produtos para adicionar!'
    });
  }

  // Show current cart (will be shown at the end)
}

// CONFIRMAR PEDIDO
if (msgLower.match(/confirmar|finalizar|fechar pedido/)) {
  if (cart.items.length === 0) {
    return JSON.stringify({
      error: true,
      message: '⚠️ Carrinho vazio. Adicione produtos primeiro!'
    });
  }

  // Mark session as ready for checkout
  await $supabase
    .from('line_sessions')
    .update({
      preferences_captured: {
        cart,
        ready_for_checkout: true
      }
    })
    .eq('session_id', sessionId);

  return JSON.stringify({
    status: 'ready_for_checkout',
    cart,
    message: '✅ Pronto para finalizar!\n\n' +
      'O tool "execute_checkout" será chamado pelo agente para criar o pedido.\n\n' +
      `Total: R$ ${cart.total.toFixed(2)}`
  });
}

// ===== PARSE PRODUCT SELECTION =====
const selection = parseProductSelection(userMessage);

if (!selection) {
  // No clear selection - ask for clarification
  if (cart.items.length > 0) {
    // Show cart
    const message = `🛒 *Seu Carrinho*\n\n` +
      cart.items.map((item, i) =>
        `${i + 1}. *${item.product_name}*\n` +
        `   ${item.quantity} ${item.unit} x R$ ${item.unit_price.toFixed(2)} = R$ ${item.subtotal.toFixed(2)}`
      ).join('\n\n') +
      `\n\n───────────────────\n` +
      `Subtotal: R$ ${cart.subtotal.toFixed(2)}\n` +
      `Entrega: R$ ${cart.delivery_fee.toFixed(2)}\n` +
      `───────────────────\n` +
      `*TOTAL: R$ ${cart.total.toFixed(2)}*\n\n` +
      `O que deseja fazer?\n` +
      `• Adicionar mais produtos (busque novamente)\n` +
      `• *"confirmar"* para finalizar pedido\n` +
      `• *"limpar"* para cancelar`;

    return JSON.stringify({
      status: 'showing_cart',
      cart,
      message
    });
  }

  return JSON.stringify({
    error: true,
    message: '🔍 Não entendi a seleção.\n\n' +
      'Exemplos válidos:\n' +
      '• "quero 3 caixas do produto 1"\n' +
      '• "produto 2, 5 unidades"\n' +
      '• "5kg"\n\n' +
      'Ou busque produtos primeiro!'
  });
}

console.log('✅ [Cart] Parsed selection:', JSON.stringify(selection));

// ===== GET PRODUCT FROM LAST SEARCH =====
// In production: get from session's last search results
// For now: assume we have access to search results or product ID

let productId = selection.productIndex; // This would be master_list_id

// If user just said a number, try to get from last search
if (!productId && userData.active_session?.preferences_captured?.last_search_results) {
  const searchResults = userData.active_session.preferences_captured.last_search_results;
  if (selection.productIndex && searchResults[selection.productIndex - 1]) {
    productId = searchResults[selection.productIndex - 1].id;
  }
}

if (!productId) {
  return JSON.stringify({
    error: true,
    message: '⚠️ Produto não encontrado.\n\nFaça uma busca primeiro e depois selecione o número do produto.'
  });
}

// ===== QUERY PRODUCT AND PRICING =====
const product = await getProductDetails(productId);
if (!product) {
  return JSON.stringify({
    error: true,
    message: '⚠️ Produto não disponível.'
  });
}

const pricing = await getPricing(productId);
if (!pricing) {
  return JSON.stringify({
    error: true,
    message: `⚠️ Preço não disponível para "${product.product_name}".\n\nTente outro produto.`
  });
}

// ===== ADD TO CART =====
const existingItemIndex = cart.items.findIndex(item => item.master_list_id === productId);

if (existingItemIndex >= 0) {
  // Update quantity
  cart.items[existingItemIndex].quantity += selection.quantity;
  cart.items[existingItemIndex].subtotal =
    cart.items[existingItemIndex].quantity * cart.items[existingItemIndex].unit_price;
  console.log('📝 [Cart] Updated quantity for:', product.product_name);
} else {
  // Add new item
  const cartItem = {
    master_list_id: productId,
    product_name: product.product_name,
    brand: product.brand,
    quantity: selection.quantity,
    unit: selection.unit,
    unit_price: pricing.unit_price,
    subtotal: selection.quantity * pricing.unit_price,
    supplier_id: pricing.supplier_id,
    currency: pricing.currency || 'BRL'
  };

  cart.items.push(cartItem);
  console.log('➕ [Cart] Added item:', product.product_name);
}

// ===== CALCULATE TOTALS =====
cart.subtotal = cart.items.reduce((sum, item) => sum + item.subtotal, 0);
cart.tax = 0; // Calculate if needed
cart.delivery_fee = 0; // Calculate based on supplier or location
cart.total = cart.subtotal + cart.tax + cart.delivery_fee;
cart.updated_at = new Date().toISOString();

// ===== SAVE CART TO SESSION =====
await $supabase
  .from('line_sessions')
  .update({
    preferences_captured: { cart },
    last_activity_at: new Date().toISOString(),
    message_count: $supabase.sql`message_count + 1`,
    user_messages: $supabase.sql`user_messages + 1`
  })
  .eq('session_id', sessionId);

console.log('💾 [Cart] Saved. Total items:', cart.items.length, 'Total:', cart.total);

// ===== RETURN CART SUMMARY =====
const message = `✅ *Adicionado ao carrinho!*\n\n` +
  `${selection.quantity} ${selection.unit} de *${product.product_name}*\n` +
  `R$ ${pricing.unit_price.toFixed(2)} cada\n\n` +
  `───────────────────\n` +
  `🛒 *SEU CARRINHO* (${cart.items.length} ${cart.items.length === 1 ? 'item' : 'itens'})\n\n` +
  cart.items.map((item, i) =>
    `${i + 1}. *${item.product_name}*\n` +
    `   ${item.quantity} ${item.unit} x R$ ${item.unit_price.toFixed(2)} = R$ ${item.subtotal.toFixed(2)}`
  ).join('\n\n') +
  `\n\n───────────────────\n` +
  `Subtotal: R$ ${cart.subtotal.toFixed(2)}\n` +
  `Entrega: R$ ${cart.delivery_fee.toFixed(2)}\n` +
  `───────────────────\n` +
  `*TOTAL: R$ ${cart.total.toFixed(2)}*\n\n` +
  `O que deseja fazer?\n\n` +
  `1️⃣ Adicionar mais produtos (busque novamente)\n` +
  `2️⃣ *"confirmar"* para finalizar pedido\n` +
  `3️⃣ *"limpar"* para cancelar`;

return JSON.stringify({
  status: 'item_added',
  cart,
  message
});
