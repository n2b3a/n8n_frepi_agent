// ===== EXECUTE CHECKOUT - COMPLETE IMPLEMENTATION =====
// Tool for n8n workflow: creates purchase_order and purchase_order_items from cart in session

const input = $input.first().json;
const userData = $('Prepare User Context').first().json;

console.log('💳 [Checkout] User:', userData.phone_number);

// ===== VALIDATE USER =====
if (!userData.restaurant_id || !userData.person_id) {
  console.error('❌ [Checkout] User data incomplete');
  return JSON.stringify({
    success: false,
    error: true,
    message: '⚠️ Erro: dados de usuário incompletos. Por favor, faça login novamente.'
  });
}

// ===== GET CART FROM SESSION =====
let cart = null;
let sessionId = null;

if (userData.has_active_session) {
  const session = userData.active_session;

  // Check if this is a shopping session with a cart
  if (session.primary_intent === 'compra' && session.preferences_captured?.cart) {
    cart = session.preferences_captured.cart;
    sessionId = session.session_id;

    // Check if cart is marked ready for checkout
    const isReady = session.preferences_captured?.ready_for_checkout;

    console.log('🛒 [Checkout] Cart found:', cart.cart_id, 'Items:', cart.items?.length || 0);
    console.log('✅ [Checkout] Ready for checkout:', isReady);

    // Optional: enforce ready_for_checkout flag
    // if (!isReady) {
    //   return JSON.stringify({
    //     success: false,
    //     message: 'Carrinho não confirmado. Digite "confirmar" para finalizar.'
    //   });
    // }
  }
}

// ===== VALIDATE CART EXISTS AND HAS ITEMS =====
if (!cart || !cart.items || cart.items.length === 0) {
  console.error('❌ [Checkout] No cart or empty cart');
  return JSON.stringify({
    success: false,
    error: true,
    message: '🛒 Carrinho vazio!\n\n' +
      'Adicione produtos ao carrinho antes de finalizar.\n\n' +
      'Digite "buscar produtos" para começar.'
  });
}

console.log(`💰 [Checkout] Cart total: ${cart.total} (${cart.items.length} items)`);

// ===== CREATE PURCHASE ORDER =====
try {
  const orderData = {
    restaurant_id: userData.restaurant_id,
    ordered_by_person_id: userData.person_id,
    session_id: sessionId,
    order_status: 'pending', // ENUM: pending, confirmed, preparing, shipped, delivered, cancelled
    payment_status: 'pending', // ENUM: pending, paid, failed, refunded
    order_date: new Date().toISOString(),
    total_amount: cart.total,
    subtotal: cart.subtotal,
    tax: cart.tax || 0,
    delivery_fee: cart.delivery_fee || 0,
    currency: cart.currency || 'BRL',
    order_notes: `Created from cart: ${cart.cart_id}`
    // delivery_date would be calculated based on supplier lead times
    // expected_delivery_date: null (can be added later)
  };

  console.log('📝 [Checkout] Creating purchase order...');

  const { data: order, error: orderError } = await $supabase
    .from('purchase_orders')
    .insert(orderData)
    .select('*')
    .single();

  if (orderError) {
    console.error('❌ [Checkout] Error creating order:', orderError);
    return JSON.stringify({
      success: false,
      error: true,
      message: '⚠️ Erro ao criar pedido. Tente novamente.\n\n' +
        'Se o problema persistir, contate suporte.'
    });
  }

  console.log('✅ [Checkout] Purchase order created:', order.id);

  // ===== CREATE PURCHASE ORDER ITEMS =====
  const orderItems = cart.items.map(item => ({
    order_id: order.id,
    master_list_id: item.master_list_id,
    product_name: item.product_name, // Denormalized for history
    quantity: item.quantity,
    unit: item.unit,
    unit_price: item.unit_price,
    subtotal: item.subtotal,
    supplier_id: item.supplier_id,
    currency: item.currency || 'BRL',
    // Optional fields:
    // brand: item.brand,
    // sku: item.sku,
    // item_notes: item.notes
  }));

  console.log('📦 [Checkout] Creating order items:', orderItems.length);

  const { data: items, error: itemsError } = await $supabase
    .from('purchase_order_items')
    .insert(orderItems)
    .select('*');

  if (itemsError) {
    console.error('❌ [Checkout] Error creating order items:', itemsError);

    // Rollback: Delete the order since items failed
    await $supabase
      .from('purchase_orders')
      .delete()
      .eq('id', order.id);

    console.log('🔄 [Checkout] Rolled back order:', order.id);

    return JSON.stringify({
      success: false,
      error: true,
      message: '⚠️ Erro ao processar items do pedido.\n\n' +
        'Por favor, tente novamente.'
    });
  }

  console.log('✅ [Checkout] Order items created:', items?.length || 0);

  // ===== MARK SESSION AS COMPLETED =====
  await $supabase
    .from('line_sessions')
    .update({
      awaiting_continuation: false,
      session_end: new Date().toISOString(),
      session_notes: `Order created: ${order.id}`,
      preferences_captured: {
        ...userData.active_session.preferences_captured,
        cart: null, // Clear cart
        order_id: order.id,
        order_completed_at: new Date().toISOString()
      }
    })
    .eq('session_id', sessionId);

  console.log('🏁 [Checkout] Session completed:', sessionId);

  // ===== PREPARE CONFIRMATION MESSAGE =====
  const orderNumber = order.id || 'ORD-' + Date.now();

  // Calculate estimated delivery (2-3 days)
  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 2);

  // Build items summary
  const itemsSummary = cart.items.map((item, i) =>
    `${i + 1}. *${item.product_name}*\n` +
    `   ${item.quantity} ${item.unit} x R$ ${item.unit_price.toFixed(2)} = R$ ${item.subtotal.toFixed(2)}`
  ).join('\n\n');

  const message = `✅ *PEDIDO CONFIRMADO!*\n\n` +
    `📋 Número: *#${orderNumber}*\n` +
    `📅 Data: ${new Date().toLocaleDateString('pt-BR')}\n` +
    `🚚 Entrega estimada: ${deliveryDate.toLocaleDateString('pt-BR')}\n\n` +
    `───────────────────\n` +
    `📦 *ITENS DO PEDIDO* (${cart.items.length})\n\n` +
    `${itemsSummary}\n\n` +
    `───────────────────\n` +
    `Subtotal: R$ ${cart.subtotal.toFixed(2)}\n` +
    (cart.tax > 0 ? `Impostos: R$ ${cart.tax.toFixed(2)}\n` : '') +
    (cart.delivery_fee > 0 ? `Entrega: R$ ${cart.delivery_fee.toFixed(2)}\n` : 'Entrega: GRÁTIS\n') +
    `───────────────────\n` +
    `💰 *TOTAL: R$ ${cart.total.toFixed(2)}*\n\n` +
    `📦 Status: ${translateStatus(order.order_status)}\n` +
    `💳 Pagamento: ${translatePaymentStatus(order.payment_status)}\n\n` +
    `🎉 Seu pedido está confirmado!\n` +
    `Avisaremos quando houver atualizações.\n\n` +
    `────────────────\n` +
    `💬 Precisa de algo mais?\n` +
    `Digite "menu" para ver opções.`;

  return JSON.stringify({
    success: true,
    order: {
      id: order.id,
      order_number: orderNumber,
      total: cart.total,
      items_count: cart.items.length,
      status: order.order_status,
      payment_status: order.payment_status,
      order_date: order.order_date,
      estimated_delivery: deliveryDate.toISOString()
    },
    message: message
  });

} catch (error) {
  console.error('❌ [Checkout] Unexpected error:', error);
  return JSON.stringify({
    success: false,
    error: true,
    message: '⚠️ Erro ao processar pedido.\n\n' +
      'Por favor, tente novamente.\n' +
      'Se o problema persistir, contate suporte.'
  });
}

// ===== HELPER FUNCTIONS =====
function translateStatus(status) {
  const statusMap = {
    'pending': 'Pendente',
    'confirmed': 'Confirmado',
    'preparing': 'Em Preparação',
    'shipped': 'Enviado',
    'delivered': 'Entregue',
    'cancelled': 'Cancelado'
  };
  return statusMap[status] || status;
}

function translatePaymentStatus(status) {
  const statusMap = {
    'pending': 'Pendente',
    'paid': 'Pago',
    'failed': 'Falhou',
    'refunded': 'Reembolsado'
  };
  return statusMap[status] || status;
}
