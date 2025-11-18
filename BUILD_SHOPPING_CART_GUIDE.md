# 📚 Guía de Implementación: build_shopping_cart

## 🎯 Objetivo

Gestionar el carrito de compras consultando precios reales de `pricing_history`, guardando en `line_sessions.preferences_captured.cart` y calculando totales dinámicamente.

---

## 📊 Flujo del Carrito

```
Usuario hace búsqueda de productos
    ↓
search_products_vector retorna resultados
    ↓
Usuario selecciona: "quero 3 caixas do produto 1"
    ↓
┌─────────────────────────────────────────┐
│ build_shopping_cart                     │
│ 1. Parse selección del usuario         │
│ 2. Consultar pricing_history           │
│ 3. Consultar master_list                │
│ 4. Agregar/actualizar item en carrito  │
│ 5. Calcular totales                    │
│ 6. Guardar en line_sessions            │
│ 7. Retornar resumen del carrito        │
└─────────────────────────────────────────┘
    ↓
Usuario puede:
├─ Agregar más productos (buscar de nuevo)
├─ "confirmar" → marca ready_for_checkout
└─ "limpar" → cancela carrito
    ↓
execute_checkout crea la orden
```

---

## 🔧 Características Implementadas

### 1. **Parsing Inteligente de Selección**

Reconoce patrones como:
- "quero 3 caixas do produto 1"
- "produto 2, 5 unidades"
- "5kg"
- "10 litros do tomate"

```javascript
function parseProductSelection(message) {
  const patterns = [
    /(?:quero|preciso)\s+(\d+)\s*(caixas?|kg|unidades?|litros?)/i,
    /produto\s*(\d+)[,\s]+(\d+)\s*(caixas?|kg)/i,
    /(\d+)\s*(caixas?|kg)\s*(?:do|da)\s*produto\s*(\d+)/i,
    /^(\d+)$/  // Just a number
  ];
  // ...
}
```

### 2. **Consulta de Precios Reales**

```javascript
async function getPricing(masterListId) {
  const { data } = await $supabase
    .from('pricing_history')
    .select('*')
    .eq('master_list_id', masterListId)
    .eq('verification_status', 'verified')
    .order('effective_date', { ascending: false })
    .limit(1);

  return data[0]; // Latest verified price
}
```

### 3. **Persistencia en Sesión**

```javascript
// Guarda en line_sessions.preferences_captured
await $supabase
  .from('line_sessions')
  .update({
    preferences_captured: { cart },
    last_activity_at: new Date().toISOString()
  })
  .eq('session_id', sessionId);
```

### 4. **Cálculo Dinámico de Totales**

```javascript
cart.subtotal = cart.items.reduce((sum, item) => sum + item.subtotal, 0);
cart.tax = 0; // Calculate if needed
cart.delivery_fee = 0; // Based on supplier/location
cart.total = cart.subtotal + cart.tax + cart.delivery_fee;
```

### 5. **Actualización de Cantidades**

Si el producto ya está en el carrito, suma las cantidades:
```javascript
if (existingItemIndex >= 0) {
  cart.items[existingItemIndex].quantity += selection.quantity;
  cart.items[existingItemIndex].subtotal =
    cart.items[existingItemIndex].quantity * cart.items[existingItemIndex].unit_price;
}
```

### 6. **Comandos del Usuario**

| Comando | Acción |
|---------|--------|
| "confirmar", "finalizar" | Marca cart para checkout |
| "limpar", "cancelar" | Cancela carrito |
| "ver carrinho", "carrinho" | Muestra carrito actual |
| "produto X, Y unidades" | Agrega al carrito |

---

## 📝 Estructura de Datos

### Cart Object (en line_sessions.preferences_captured)

```json
{
  "cart": {
    "cart_id": "cart-1705316400000",
    "restaurant_id": 42,
    "items": [
      {
        "master_list_id": 123,
        "product_name": "Tomate Longa Vida 500g",
        "brand": "FreshCo",
        "quantity": 3,
        "unit": "caixas",
        "unit_price": 90.00,
        "subtotal": 270.00,
        "supplier_id": 5,
        "currency": "BRL"
      }
    ],
    "subtotal": 270.00,
    "tax": 0,
    "delivery_fee": 0,
    "total": 270.00,
    "currency": "BRL",
    "created_at": "2025-01-15T10:00:00Z",
    "updated_at": "2025-01-15T10:05:00Z"
  },
  "ready_for_checkout": false
}
```

---

## 🎯 Integración con Otros Tools

### Flujo Completo de Compra

```
1. search_products_vector
   ↓ Retorna productos con IDs

2. build_shopping_cart
   ↓ Usuario selecciona productos
   ↓ Guarda cart en sesión

3. execute_checkout
   ↓ Lee cart de sesión
   ↓ Crea purchase_order
   ↓ Crea purchase_order_items
```

### Conexión con search_products_vector

El tool debe guardar resultados de búsqueda:
```javascript
// En search_products_vector, agregar:
await $supabase
  .from('line_sessions')
  .update({
    preferences_captured: {
      last_search_results: matchingProducts,
      last_search_query: searchQuery,
      last_search_at: new Date().toISOString()
    }
  })
  .eq('session_id', sessionId);
```

---

## 🧪 Test Cases

### Test Case 1: Agregar Primer Producto

```
Usuario: "quero 3 caixas do produto 1"

Respuesta:
✅ *Adicionado ao carrinho!*

3 caixas de *Tomate Longa Vida 500g*
R$ 90.00 cada

───────────────────
🛒 *SEU CARRINHO* (1 item)

1. *Tomate Longa Vida 500g*
   3 caixas x R$ 90.00 = R$ 270.00

───────────────────
Subtotal: R$ 270.00
Entrega: R$ 0.00
───────────────────
*TOTAL: R$ 270.00*

O que deseja fazer?

1️⃣ Adicionar mais produtos
2️⃣ *"confirmar"* para finalizar
3️⃣ *"limpar"* para cancelar
```

### Test Case 2: Agregar Más Productos

```
[Cart ya tiene Tomate]

Usuario: "produto 2, 5 unidades"

Respuesta:
✅ *Adicionado ao carrinho!*

5 unidades de *Cebola Branca 1kg*
R$ 3.20 cada

───────────────────
🛒 *SEU CARRINHO* (2 itens)

1. *Tomate Longa Vida 500g*
   3 caixas x R$ 90.00 = R$ 270.00

2. *Cebola Branca 1kg*
   5 unidades x R$ 3.20 = R$ 16.00

───────────────────
Subtotal: R$ 286.00
Entrega: R$ 0.00
───────────────────
*TOTAL: R$ 286.00*
```

### Test Case 3: Actualizar Cantidad

```
[Cart ya tiene 3 caixas de Tomate]

Usuario: "quero mais 2 caixas do tomate"

Respuesta:
✅ *Adicionado ao carrinho!*

Quantidade atualizada!

*Tomate Longa Vida 500g*
5 caixas (antes: 3) x R$ 90.00 = R$ 450.00

[Muestra carrito completo]
```

### Test Case 4: Ver Carrinho

```
Usuario: "ver carrinho"

Respuesta:
🛒 *Seu Carrinho*

[Muestra todos los items y total]

O que deseja fazer?
• Adicionar mais produtos
• *"confirmar"* para finalizar
• *"limpar"* para cancelar
```

### Test Case 5: Confirmar Pedido

```
Usuario: "confirmar"

Respuesta:
✅ Pronto para finalizar!

O tool "execute_checkout" será chamado pelo agente.

Total: R$ 286.00

[Agent llama execute_checkout]
```

### Test Case 6: Limpar Carrinho

```
Usuario: "limpar"

Respuesta:
🗑️ Carrinho cancelado.

Digite "menu" para ver opções.
```

### Test Case 7: Carrinho Vazio

```
Usuario: "ver carrinho"

Respuesta:
🛒 Seu carrinho está vazio.

Busque produtos para adicionar!
```

---

## 🔍 Debugging

### Ver Carritos Activos

```sql
SELECT
  session_id,
  restaurant_id,
  preferences_captured->'cart'->>'cart_id' as cart_id,
  jsonb_array_length(preferences_captured->'cart'->'items') as num_items,
  (preferences_captured->'cart'->>'total')::numeric as total,
  last_activity_at
FROM line_sessions
WHERE primary_intent = 'compra'
  AND awaiting_continuation = true
ORDER BY last_activity_at DESC;
```

### Ver Items del Carrito

```sql
SELECT
  session_id,
  jsonb_pretty(preferences_captured->'cart'->'items') as cart_items
FROM line_sessions
WHERE session_id = 'session-id-here';
```

### Logs en n8n

```
🛒 [Cart] User: 5511999999999 Message: quero 3 caixas do 1
✅ [Cart] Parsed selection: {"productIndex":1,"quantity":3,"unit":"caixas"}
🔄 [Cart] Found existing cart with 0 items
🆕 [Cart] Created new cart: cart-1705316400000
➕ [Cart] Added item: Tomate Longa Vida 500g
💾 [Cart] Saved. Total items: 1 Total: 270
```

---

## ⚙️ Configuración y Personalización

### Agregar Tax Calculation

```javascript
// En la sección de cálculo de totales:
const TAX_RATE = 0.10; // 10%
cart.tax = cart.subtotal * TAX_RATE;
cart.total = cart.subtotal + cart.tax + cart.delivery_fee;
```

### Agregar Delivery Fee Calculation

```javascript
// Basado en total o supplier
function calculateDeliveryFee(cart) {
  if (cart.subtotal >= 500) {
    return 0; // Free delivery > R$500
  } else if (cart.subtotal >= 200) {
    return 10; // R$10 for R$200-500
  } else {
    return 25; // R$25 for < R$200
  }
}

cart.delivery_fee = calculateDeliveryFee(cart);
```

### Modificar Patterns de Parsing

```javascript
// Agregar más patrones en parseProductSelection:
const patterns = [
  // ... existing patterns
  /adicionar\s+(\d+)\s+do\s+(\d+)/i,  // "adicionar 5 do 2"
  /mais\s+(\d+)\s*(caixas?|kg)/i,     // "mais 3 caixas"
];
```

---

## 🚨 Casos Especiales y Errores

### Producto Sin Precio

```javascript
if (!pricing) {
  return JSON.stringify({
    error: true,
    message: `⚠️ Preço não disponível para "${product.product_name}".\n\nTente outro produto.`
  });
}
```

### Producto Inactivo

```javascript
if (!product || !product.is_active) {
  return JSON.stringify({
    error: true,
    message: '⚠️ Produto não disponível.'
  });
}
```

### Usuario No Registrado

```javascript
if (userData.is_new_user || !userData.restaurant_id) {
  return JSON.stringify({
    error: true,
    message: 'Você precisa estar cadastrado para fazer pedidos.'
  });
}
```

---

## 🔗 Integración con execute_checkout

El tool `execute_checkout` debe leer el cart de la sesión:

```javascript
// En execute_checkout:
const cart = userData.active_session?.preferences_captured?.cart;

if (!cart || cart.items.length === 0) {
  return JSON.stringify({
    error: true,
    message: 'Carrinho vazio. Adicione produtos primeiro!'
  });
}

// Create purchase_order
const orderData = {
  restaurant_id: userData.restaurant_id,
  total_amount: cart.total,
  subtotal: cart.subtotal,
  tax: cart.tax,
  delivery_fee: cart.delivery_fee,
  // ...
};

// Create purchase_order_items
for (const item of cart.items) {
  await $supabase
    .from('purchase_order_items')
    .insert({
      order_id: order.id,
      master_list_id: item.master_list_id,
      quantity: item.quantity,
      unit_price: item.unit_price,
      subtotal: item.subtotal
    });
}
```

---

## 📋 Checklist de Implementación

- [ ] Copiar código a workflow JSON
- [ ] Configurar credenciales de Supabase
- [ ] Probar parsing de selección
- [ ] Verificar consulta de pricing_history
- [ ] Probar agregar producto
- [ ] Probar actualizar cantidad
- [ ] Probar comandos (confirmar, limpar, ver)
- [ ] Probar flujo completo con checkout
- [ ] Verificar sesión persiste correctamente

---

## 🎉 ¡Listo!

Con esta implementación tienes un sistema completo de carrito de compras que:
- ✅ Parsea selección natural del usuario
- ✅ Consulta precios reales de pricing_history
- ✅ Guarda estado en line_sessions
- ✅ Calcula totales dinámicamente
- ✅ Soporta múltiples comandos
- ✅ Actualiza cantidades automáticamente
- ✅ Listo para integrar con checkout

¡Disfruta! 🚀
