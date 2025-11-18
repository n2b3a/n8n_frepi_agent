# 📚 Guía de Implementación: execute_checkout

## 🎯 Objetivo

Finalizar el pedido creando registros en `purchase_orders` y `purchase_order_items` desde el carrito guardado en la sesión.

---

## 📊 Flujo de Checkout

```
Usuario confirma carrito (build_shopping_cart marca ready_for_checkout)
    ↓
┌─────────────────────────────────────────┐
│ execute_checkout                         │
│ 1. Validar usuario registrado           │
│ 2. Leer cart de line_sessions           │
│ 3. Validar cart tiene items             │
│ 4. Crear purchase_order                 │
│ 5. Crear purchase_order_items           │
│ 6. Marcar sesión como completada        │
│ 7. Retornar confirmación                │
└─────────────────────────────────────────┘
    ↓
Pedido creado con estado "pending"
Usuario recibe confirmación con número de orden
```

---

## 🔧 Características Implementadas

### 1. **Lectura del Carrito desde Sesión**

```javascript
if (userData.has_active_session) {
  const session = userData.active_session;

  if (session.primary_intent === 'compra' && session.preferences_captured?.cart) {
    cart = session.preferences_captured.cart;
    sessionId = session.session_id;

    // Opcional: verificar ready_for_checkout flag
    const isReady = session.preferences_captured?.ready_for_checkout;
  }
}
```

### 2. **Creación de Purchase Order**

```javascript
const orderData = {
  restaurant_id: userData.restaurant_id,
  ordered_by_person_id: userData.person_id,
  session_id: sessionId,
  order_status: 'pending',
  payment_status: 'pending',
  order_date: new Date().toISOString(),
  total_amount: cart.total,
  subtotal: cart.subtotal,
  tax: cart.tax || 0,
  delivery_fee: cart.delivery_fee || 0,
  currency: cart.currency || 'BRL',
  order_notes: `Created from cart: ${cart.cart_id}`
};

const { data: order, error: orderError } = await $supabase
  .from('purchase_orders')
  .insert(orderData)
  .select('*')
  .single();
```

### 3. **Creación de Order Items**

```javascript
const orderItems = cart.items.map(item => ({
  order_id: order.id,
  master_list_id: item.master_list_id,
  product_name: item.product_name,
  quantity: item.quantity,
  unit: item.unit,
  unit_price: item.unit_price,
  subtotal: item.subtotal,
  supplier_id: item.supplier_id,
  currency: item.currency || 'BRL'
}));

const { data: items, error: itemsError } = await $supabase
  .from('purchase_order_items')
  .insert(orderItems)
  .select('*');
```

### 4. **Rollback en Caso de Error**

Si falla la creación de items, se borra la orden:

```javascript
if (itemsError) {
  // Rollback: Delete the order since items failed
  await $supabase
    .from('purchase_orders')
    .delete()
    .eq('id', order.id);

  return JSON.stringify({
    success: false,
    message: 'Erro ao processar items do pedido.'
  });
}
```

### 5. **Limpieza de Sesión**

```javascript
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
```

### 6. **Mensaje de Confirmación Rico**

Incluye:
- Número de orden
- Fecha de pedido
- Fecha estimada de entrega
- Lista detallada de items
- Subtotal, impuestos, delivery
- Total final
- Estados del pedido y pago

---

## 📝 Estructura de Datos

### Purchase Order

```sql
CREATE TABLE purchase_orders (
  id SERIAL PRIMARY KEY,
  restaurant_id INT REFERENCES restaurants(id),
  ordered_by_person_id INT REFERENCES restaurant_people(id),
  session_id TEXT REFERENCES line_sessions(session_id),
  order_status TEXT CHECK (order_status IN ('pending', 'confirmed', 'preparing', 'shipped', 'delivered', 'cancelled')),
  payment_status TEXT CHECK (payment_status IN ('pending', 'paid', 'failed', 'refunded')),
  order_date TIMESTAMPTZ,
  total_amount NUMERIC(10,2),
  subtotal NUMERIC(10,2),
  tax NUMERIC(10,2),
  delivery_fee NUMERIC(10,2),
  currency TEXT DEFAULT 'BRL',
  order_notes TEXT,
  expected_delivery_date TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Purchase Order Items

```sql
CREATE TABLE purchase_order_items (
  id SERIAL PRIMARY KEY,
  order_id INT REFERENCES purchase_orders(id) ON DELETE CASCADE,
  master_list_id INT REFERENCES master_list(id),
  product_name TEXT,
  quantity NUMERIC,
  unit TEXT,
  unit_price NUMERIC(10,2),
  subtotal NUMERIC(10,2),
  supplier_id INT REFERENCES suppliers(id),
  currency TEXT DEFAULT 'BRL',
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## 🧪 Test Cases

### Test Case 1: Checkout Exitoso

```
Usuario (con carrito de 3 items):
> "confirmar"

Bot (build_shopping_cart):
✅ Pronto para finalizar!
Total: R$ 286.00

Bot (execute_checkout automático):
✅ PEDIDO CONFIRMADO!

📋 Número: #1234
📅 Data: 15/01/2025
🚚 Entrega estimada: 17/01/2025

───────────────────
📦 ITENS DO PEDIDO (3)

1. Tomate Longa Vida 500g
   3 caixas x R$ 90.00 = R$ 270.00

2. Cebola Branca 1kg
   5 unidades x R$ 3.20 = R$ 16.00

3. Arroz Integral 1kg
   10 kg x R$ 5.50 = R$ 55.00

───────────────────
Subtotal: R$ 341.00
Entrega: GRÁTIS
───────────────────
💰 TOTAL: R$ 341.00

📦 Status: Pendente
💳 Pagamento: Pendente

🎉 Seu pedido está confirmado!
Avisaremos quando houver atualizações.
```

### Test Case 2: Carrito Vacío

```
Usuario (sin carrito):
> "finalizar pedido"

Bot:
🛒 Carrinho vazio!

Adicione produtos ao carrinho antes de finalizar.

Digite "buscar produtos" para começar.
```

### Test Case 3: Usuario No Registrado

```
Usuario (nuevo):
> "finalizar"

Bot:
⚠️ Erro: dados de usuário incompletos. Por favor, faça login novamente.
```

### Test Case 4: Error en Base de Datos (Rollback)

```
[Simular error en purchase_order_items insert]

Bot:
⚠️ Erro ao processar items do pedido.

Por favor, tente novamente.

[En logs:]
❌ [Checkout] Error creating order items: {...}
🔄 [Checkout] Rolled back order: 1234
```

---

## 🔍 Debugging

### Ver Órdenes Creadas Hoy

```sql
SELECT
  o.id,
  o.order_date,
  r.restaurant_name,
  rp.contact_name,
  o.total_amount,
  o.order_status,
  o.payment_status,
  COUNT(oi.id) as items_count
FROM purchase_orders o
JOIN restaurants r ON o.restaurant_id = r.id
JOIN restaurant_people rp ON o.ordered_by_person_id = rp.id
LEFT JOIN purchase_order_items oi ON o.id = oi.order_id
WHERE o.order_date >= CURRENT_DATE
GROUP BY o.id, r.restaurant_name, rp.contact_name
ORDER BY o.order_date DESC;
```

### Ver Items de una Orden

```sql
SELECT
  oi.id,
  oi.product_name,
  oi.quantity,
  oi.unit,
  oi.unit_price,
  oi.subtotal,
  ml.category,
  s.company_name as supplier
FROM purchase_order_items oi
LEFT JOIN master_list ml ON oi.master_list_id = ml.id
LEFT JOIN suppliers s ON oi.supplier_id = s.id
WHERE oi.order_id = 1234
ORDER BY oi.id;
```

### Ver Sesiones con Carritos Pendientes

```sql
SELECT
  session_id,
  restaurant_id,
  preferences_captured->'cart'->>'cart_id' as cart_id,
  preferences_captured->'ready_for_checkout' as ready,
  jsonb_array_length(preferences_captured->'cart'->'items') as items_count,
  (preferences_captured->'cart'->>'total')::numeric as total,
  last_activity_at
FROM line_sessions
WHERE primary_intent = 'compra'
  AND awaiting_continuation = true
  AND preferences_captured->'cart' IS NOT NULL
ORDER BY last_activity_at DESC;
```

### Logs en n8n

```
💳 [Checkout] User: 5511999999999
🛒 [Checkout] Cart found: cart-1705316400000 Items: 3
✅ [Checkout] Ready for checkout: true
💰 [Checkout] Cart total: 286 (3 items)
📝 [Checkout] Creating purchase order...
✅ [Checkout] Purchase order created: 1234
📦 [Checkout] Creating order items: 3
✅ [Checkout] Order items created: 3
🏁 [Checkout] Session completed: session-xxx
```

---

## 🔗 Integración con build_shopping_cart

### Flujo Completo

```javascript
// 1. Usuario agrega productos al carrito
// build_shopping_cart guarda en line_sessions.preferences_captured.cart

// 2. Usuario confirma
// build_shopping_cart marca ready_for_checkout = true

await $supabase
  .from('line_sessions')
  .update({
    preferences_captured: {
      cart,
      ready_for_checkout: true
    }
  })
  .eq('session_id', sessionId);

// 3. Agent llama execute_checkout
// execute_checkout lee cart y crea la orden

const cart = userData.active_session.preferences_captured.cart;

// 4. execute_checkout limpia la sesión
await $supabase
  .from('line_sessions')
  .update({
    awaiting_continuation: false,
    preferences_captured: {
      cart: null,
      order_id: order.id
    }
  });
```

---

## ⚙️ Configuración y Personalización

### Calcular Fecha de Entrega Estimada

```javascript
function calculateDeliveryDate(cart) {
  // Basado en supplier lead time (días)
  const leadTimes = cart.items.map(item => {
    // Query supplier.lead_time_days or default to 2
    return item.supplier_lead_time || 2;
  });

  const maxLeadTime = Math.max(...leadTimes);

  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + maxLeadTime);

  return deliveryDate;
}
```

### Agregar Notificación al Supplier

```javascript
// Después de crear la orden, notificar suppliers
const supplierIds = [...new Set(cart.items.map(item => item.supplier_id))];

for (const supplierId of supplierIds) {
  const supplierItems = cart.items.filter(i => i.supplier_id === supplierId);

  // Send notification via WhatsApp/email
  await notifySupplier(supplierId, {
    order_id: order.id,
    items: supplierItems,
    restaurant: userData.restaurant_name
  });
}
```

### Actualizar Stock/Availability

```javascript
// Después de crear order_items
for (const item of cart.items) {
  await $supabase
    .from('master_list')
    .update({
      reserved_quantity: $supabase.sql`reserved_quantity + ${item.quantity}`
    })
    .eq('id', item.master_list_id);
}
```

---

## 🚨 Casos Especiales y Errores

### Error: Carrito Expirado

```javascript
const sessionAge = Date.now() - new Date(session.last_activity_at).getTime();
const MAX_AGE = 24 * 60 * 60 * 1000; // 24 hours

if (sessionAge > MAX_AGE) {
  return JSON.stringify({
    error: true,
    message: '⏰ Carrinho expirou. Por favor, faça uma nova busca.'
  });
}
```

### Error: Producto Ya No Disponible

```javascript
// Validar disponibilidad antes de crear orden
for (const item of cart.items) {
  const { data: product } = await $supabase
    .from('master_list')
    .select('is_active, available_quantity')
    .eq('id', item.master_list_id)
    .single();

  if (!product?.is_active || product.available_quantity < item.quantity) {
    return JSON.stringify({
      error: true,
      message: `⚠️ "${item.product_name}" não está mais disponível.`
    });
  }
}
```

### Error: Precio Cambió

```javascript
// Verificar que precio no cambió significativamente
const { data: currentPricing } = await $supabase
  .from('pricing_history')
  .select('unit_price')
  .eq('master_list_id', item.master_list_id)
  .order('effective_date', { ascending: false })
  .limit(1)
  .single();

if (Math.abs(currentPricing.unit_price - item.unit_price) > 0.01) {
  // Precio cambió - avisar al usuario
}
```

---

## 📋 Checklist de Implementación

- [ ] Copiar código a workflow JSON (tool-execute-checkout)
- [ ] Verificar que tabla `purchase_order_items` existe
- [ ] Probar crear orden con carrito de 1 item
- [ ] Probar crear orden con carrito de múltiples items
- [ ] Probar con carrito vacío (debe fallar correctamente)
- [ ] Probar con usuario no registrado (debe fallar)
- [ ] Verificar rollback funciona (simular error en items)
- [ ] Verificar sesión se limpia correctamente
- [ ] Probar flujo completo: buscar → agregar → confirmar → checkout

---

## 🎯 Integración con Otros Tools

### Después de execute_checkout

El usuario puede:

1. **Ver pedidos** - Crear tool `view_orders` que muestre historial
2. **Rastrear pedido** - Crear tool `track_order` que muestre estado
3. **Cancelar pedido** - Crear tool `cancel_order` si order_status='pending'

---

## 📈 Métricas y Analytics

### Queries Útiles

**Total de órdenes hoy:**
```sql
SELECT COUNT(*), SUM(total_amount)
FROM purchase_orders
WHERE order_date >= CURRENT_DATE;
```

**Productos más vendidos:**
```sql
SELECT
  oi.product_name,
  COUNT(*) as times_ordered,
  SUM(oi.quantity) as total_quantity,
  SUM(oi.subtotal) as total_revenue
FROM purchase_order_items oi
JOIN purchase_orders o ON oi.order_id = o.id
WHERE o.order_date >= CURRENT_DATE - INTERVAL '30 days'
GROUP BY oi.product_name
ORDER BY total_revenue DESC
LIMIT 10;
```

**Restaurantes más activos:**
```sql
SELECT
  r.restaurant_name,
  COUNT(o.id) as orders_count,
  SUM(o.total_amount) as total_spent
FROM restaurants r
JOIN purchase_orders o ON r.id = o.restaurant_id
WHERE o.order_date >= CURRENT_DATE - INTERVAL '30 days'
GROUP BY r.restaurant_name
ORDER BY total_spent DESC;
```

---

## 🎉 ¡Listo!

Con esta implementación tienes un sistema completo de checkout que:

- ✅ Lee carrito de la sesión
- ✅ Valida usuario y carrito
- ✅ Crea purchase_order con totales reales
- ✅ Crea purchase_order_items para cada producto
- ✅ Rollback automático en caso de error
- ✅ Limpia sesión al finalizar
- ✅ Mensaje de confirmación rico con detalles
- ✅ Logging completo para debugging

**Próximos pasos:**
1. Integrar en workflow JSON
2. Probar flujo completo end-to-end
3. Implementar tools complementarios (view_orders, track_order)

¡Disfruta! 🚀
