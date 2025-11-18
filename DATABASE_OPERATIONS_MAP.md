# 📊 Mapa de Operaciones de Base de Datos - Frepi MVP2

## 🔑 Concepto Clave

En el workflow **NO hay nodos separados de Supabase**. En su lugar, cada **Tool Code node** usa el cliente `$supabase` dentro de su código JavaScript para leer/escribir en la base de datos.

---

## 📍 ¿Dónde se Guardan los Datos?

### 1. PREPARE USER CONTEXT (Node de Lectura)

**Ubicación en workflow:** Nodo al inicio
**Tipo:** Solo lectura (queries)
**Qué hace:**
- Lee datos del usuario desde múltiples tablas
- Pasa estos datos a todos los tools

**Queries que ejecuta:**
```javascript
// 1. Buscar restaurant por phone
const { data: restaurant } = await $supabase
  .from('restaurants')
  .select('*')
  .eq('phone_number', phoneNumber)
  .single();

// 2. Buscar supplier por phone
const { data: supplier } = await $supabase
  .from('suppliers')
  .select('*')
  .eq('phone_number', phoneNumber)
  .single();

// 3. Buscar sesión activa
const { data: activeSession } = await $supabase
  .from('line_sessions')
  .select('*')
  .eq('channel_id', phoneNumber)
  .eq('awaiting_continuation', true)
  .single();
```

**Salida:** Objeto `userData` que se pasa a todos los tools

---

## 🛠️ Operaciones de Escritura por Tool

### 2. ONBOARDING_RESTAURANT

**Tablas afectadas:**
- ✍️ `restaurants` (INSERT)
- ✍️ `restaurant_people` (INSERT)
- ✍️ `line_sessions` (INSERT + UPDATE)

**Código específico:**
```javascript
// Paso 1: Crear sesión
await $supabase
  .from('line_sessions')
  .insert({
    session_id: sessionId,
    restaurant_id: null, // Todavía no existe
    channel_type: 'whatsapp',
    primary_intent: 'onboarding_restaurant',
    awaiting_continuation: true,
    preferences_captured: sessionData
  });

// Paso 2: Durante la conversación - actualizar sesión
await $supabase
  .from('line_sessions')
  .update({
    preferences_captured: sessionData,
    last_activity_at: new Date().toISOString()
  })
  .eq('session_id', sessionId);

// Paso 3: Al finalizar - crear restaurant
const { data: restaurant } = await $supabase
  .from('restaurants')
  .insert({
    restaurant_name: sessionData.restaurant_name,
    phone_number: phoneNumber,
    city: sessionData.city,
    restaurant_type: sessionData.restaurant_type,
    category_preferences: {}
  })
  .select()
  .single();

// Paso 4: Crear persona de contacto
await $supabase
  .from('restaurant_people')
  .insert({
    restaurant_id: restaurant.id,
    contact_name: sessionData.contact_name,
    role: 'owner',
    is_primary: true,
    is_active: true
  });

// Paso 5: Marcar sesión como completada
await $supabase
  .from('line_sessions')
  .update({
    restaurant_id: restaurant.id,
    person_id: person.id,
    session_goal_achieved: true,
    awaiting_continuation: false
  })
  .eq('session_id', sessionId);
```

**Flujo:**
```
Usuario: "registrar"
    ↓
line_sessions (INSERT) → estado: "collecting"
    ↓
Usuario: "Pizza Bella"
    ↓
line_sessions (UPDATE) → preferences_captured.restaurant_name = "Pizza Bella"
    ↓
Usuario: "João Silva"
    ↓
line_sessions (UPDATE) → preferences_captured.contact_name = "João Silva"
    ↓
... (más campos)
    ↓
Finalizar:
restaurants (INSERT) → nuevo restaurant
restaurant_people (INSERT) → nuevo contacto
line_sessions (UPDATE) → session_goal_achieved = true
```

---

### 3. SETUP_BUYING_PREFERENCES

**Tablas afectadas:**
- ✍️ `line_sessions` (INSERT + UPDATE)
- ✍️ `restaurants` (UPDATE campo `category_preferences`)

**Código específico:**
```javascript
// Paso 1: Crear sesión
await $supabase
  .from('line_sessions')
  .insert({
    session_id: sessionId,
    restaurant_id: userData.restaurant_id,
    primary_intent: 'configurar_preferencias',
    awaiting_continuation: true,
    preferences_captured: {
      step: 1,
      collected_data: {
        preferred_brands: null,
        preferred_formats: null,
        order_frequency: null,
        delivery_schedule: null,
        special_restrictions: null
      }
    }
  });

// Paso 2: Actualizar durante conversación
await $supabase
  .from('line_sessions')
  .update({
    preferences_captured: sessionData // Va acumulando datos
  })
  .eq('session_id', sessionId);

// Paso 3: Guardar en restaurant al finalizar
const categoryPreferences = {
  preferred_brands: ['Sadia', 'Nestlé'],
  preferred_formats: ['kg', 'caixa'],
  order_frequency: 'weekly',
  delivery_schedule: 'morning',
  special_restrictions: 'sem glúten',
  configured_at: new Date().toISOString()
};

await $supabase
  .from('restaurants')
  .update({
    category_preferences: categoryPreferences
  })
  .eq('id', userData.restaurant_id);

// Paso 4: Marcar sesión como completada
await $supabase
  .from('line_sessions')
  .update({
    session_goal_achieved: true,
    awaiting_continuation: false
  })
  .eq('session_id', sessionId);
```

**Dónde están los datos:**
- **Durante:** `line_sessions.preferences_captured` (temporal)
- **Final:** `restaurants.category_preferences` (permanente)

---

### 4. BUILD_SHOPPING_CART

**Tablas afectadas:**
- ✍️ `line_sessions` (INSERT + UPDATE)
- 📖 `pricing_history` (solo lectura para precios)
- 📖 `master_list` (solo lectura para productos)

**Código específico:**
```javascript
// Paso 1: Crear sesión si no existe
await $supabase
  .from('line_sessions')
  .insert({
    session_id: sessionId,
    restaurant_id: userData.restaurant_id,
    primary_intent: 'compra',
    preferences_captured: {
      cart: {
        cart_id: 'cart-' + Date.now(),
        items: [],
        subtotal: 0,
        total: 0
      }
    }
  });

// Paso 2: Agregar producto al carrito
const cart = session.preferences_captured.cart;
cart.items.push({
  master_list_id: productId,
  product_name: "Tomate 500g",
  quantity: 3,
  unit: "caixa",
  unit_price: 4.50,
  subtotal: 13.50
});
cart.total = cart.items.reduce((sum, i) => sum + i.subtotal, 0);

await $supabase
  .from('line_sessions')
  .update({
    preferences_captured: {
      cart: cart
    }
  })
  .eq('session_id', sessionId);

// Paso 3: Usuario confirma
await $supabase
  .from('line_sessions')
  .update({
    preferences_captured: {
      cart: cart,
      ready_for_checkout: true // Bandera para checkout
    }
  })
  .eq('session_id', sessionId);
```

**Dónde están los datos:**
- **Carrito completo:** `line_sessions.preferences_captured.cart` (JSONB)

**Estructura del cart:**
```json
{
  "cart_id": "cart-1705316400000",
  "restaurant_id": 5,
  "items": [
    {
      "master_list_id": 123,
      "product_name": "Tomate 500g",
      "quantity": 3,
      "unit": "caixa",
      "unit_price": 4.50,
      "subtotal": 13.50,
      "supplier_id": 10
    }
  ],
  "subtotal": 13.50,
  "tax": 0,
  "delivery_fee": 0,
  "total": 13.50
}
```

---

### 5. EXECUTE_CHECKOUT

**Tablas afectadas:**
- ✍️ `purchase_orders` (INSERT)
- ✍️ `purchase_order_items` (INSERT - múltiples filas)
- ✍️ `line_sessions` (UPDATE - limpiar carrito)

**Código específico:**
```javascript
// Paso 1: Leer carrito de la sesión
const cart = userData.active_session.preferences_captured.cart;

// Paso 2: Crear purchase_order
const { data: order } = await $supabase
  .from('purchase_orders')
  .insert({
    restaurant_id: userData.restaurant_id,
    ordered_by_person_id: userData.person_id,
    session_id: sessionId,
    order_status: 'pending',
    payment_status: 'pending',
    total_amount: cart.total,
    subtotal: cart.subtotal,
    tax: cart.tax,
    delivery_fee: cart.delivery_fee,
    currency: 'BRL'
  })
  .select()
  .single();

// Paso 3: Crear items de la orden (loop por cada item del cart)
const orderItems = cart.items.map(item => ({
  order_id: order.id,
  master_list_id: item.master_list_id,
  product_name: item.product_name,
  quantity: item.quantity,
  unit: item.unit,
  unit_price: item.unit_price,
  subtotal: item.subtotal,
  supplier_id: item.supplier_id
}));

await $supabase
  .from('purchase_order_items')
  .insert(orderItems); // Inserta múltiples filas

// Paso 4: Limpiar sesión
await $supabase
  .from('line_sessions')
  .update({
    awaiting_continuation: false,
    session_end: new Date().toISOString(),
    preferences_captured: {
      cart: null,
      order_id: order.id
    }
  })
  .eq('session_id', sessionId);
```

**Flujo de datos:**
```
line_sessions.preferences_captured.cart (LEER)
    ↓
purchase_orders (INSERT 1 fila)
order_id = 1234
    ↓
purchase_order_items (INSERT N filas, una por producto)
    [
      { order_id: 1234, product: "Tomate", qty: 3 },
      { order_id: 1234, product: "Cebola", qty: 5 }
    ]
    ↓
line_sessions (UPDATE - limpiar cart)
```

---

### 6. UPLOAD_SUPPLIER_PRICES

**Tablas afectadas:**
- ✍️ `line_sessions` (INSERT + UPDATE)

**Código específico:**
```javascript
// Paso 1: Crear sesión
await $supabase
  .from('line_sessions')
  .insert({
    session_id: sessionId,
    supplier_id: userData.supplier_id,
    primary_intent: 'upload_prices',
    preferences_captured: {
      upload_status: 'awaiting_list'
    }
  });

// Paso 2: Guardar lista parseada
const products = parsePriceList(userMessage);

await $supabase
  .from('line_sessions')
  .update({
    preferences_captured: {
      upload_status: 'list_received',
      price_list: [
        {
          product_name: "Tomate 500g",
          unit_price: 4.50,
          unit: "caixa",
          sku: null,
          brand: null
        }
      ],
      total_products: 25,
      total_errors: 2
    }
  })
  .eq('session_id', sessionId);
```

**Dónde están los datos:**
- `line_sessions.preferences_captured.price_list` (temporal, para siguiente paso)

---

### 7. NORMALIZE_PRODUCT_LIST

**Tablas afectadas:**
- ✍️ `line_sessions` (UPDATE)
- 📖 `master_list` (solo lectura para vector search)
- 📖 `pricing_history` (solo lectura para detectar precios anómalos)

**Código específico:**
```javascript
// Paso 1: Leer price_list de la sesión
const priceList = userData.active_session.preferences_captured.price_list;

// Paso 2: Mapear cada producto (vector search)
for (const item of priceList) {
  // Generar embedding
  const embedding = await generateEmbedding(item.product_name);

  // Buscar en master_list
  const { data: matches } = await $supabase.rpc('match_products_v2', {
    query_embedding: embedding,
    match_threshold: 0.7,
    match_count: 1
  });

  mappedProducts.push({
    supplier_product_name: item.product_name,
    master_list_id: matches[0]?.id,
    unit_price: item.unit_price,
    mapping_confidence: matches[0]?.similarity
  });
}

// Paso 3: Guardar normalización
await $supabase
  .from('line_sessions')
  .update({
    preferences_captured: {
      price_list: priceList, // Original
      normalization: {
        mapped_products: mappedProducts,
        stats: {
          high_confidence: 18,
          medium_confidence: 4,
          new_products: 3
        }
      }
    }
  })
  .eq('session_id', sessionId);
```

**Dónde están los datos:**
- `line_sessions.preferences_captured.normalization` (temporal, para siguiente paso)

---

### 8. PUBLISH_TO_CATALOG

**Tablas afectadas:**
- ✍️ `pricing_history` (INSERT - múltiples filas)
- ✍️ `supplier_mapped_products` (INSERT o UPDATE)
- ✍️ `line_sessions` (UPDATE - marcar completado)

**Código específico:**
```javascript
// Paso 1: Leer normalización de la sesión
const normalization = userData.active_session.preferences_captured.normalization;
const mappedProducts = normalization.mapped_products;

// Paso 2: Publicar cada producto
for (const product of mappedProducts) {
  // Insert precio en pricing_history
  await $supabase
    .from('pricing_history')
    .insert({
      supplier_id: userData.supplier_id,
      master_list_id: product.master_list_id,
      unit_price: product.unit_price,
      unit: product.unit,
      currency: 'BRL',
      effective_date: new Date().toISOString(),
      verification_status: 'verified',
      data_source: 'supplier_upload'
    });

  // Verificar si ya existe mapping
  const { data: existingMapping } = await $supabase
    .from('supplier_mapped_products')
    .select('id')
    .eq('supplier_id', userData.supplier_id)
    .eq('master_list_id', product.master_list_id)
    .single();

  if (existingMapping) {
    // UPDATE mapping existente
    await $supabase
      .from('supplier_mapped_products')
      .update({
        current_unit_price: product.unit_price,
        mapping_confidence: product.mapping_confidence,
        is_active: true
      })
      .eq('id', existingMapping.id);
  } else {
    // INSERT nuevo mapping
    await $supabase
      .from('supplier_mapped_products')
      .insert({
        supplier_id: userData.supplier_id,
        master_list_id: product.master_list_id,
        supplier_product_name: product.supplier_product_name,
        current_unit_price: product.unit_price,
        mapping_confidence: product.mapping_confidence,
        is_active: true
      });
  }
}

// Paso 3: Marcar sesión como completada
await $supabase
  .from('line_sessions')
  .update({
    session_goal_achieved: true,
    awaiting_continuation: false,
    preferences_captured: {
      ...existingData,
      published_at: new Date().toISOString()
    }
  })
  .eq('session_id', sessionId);
```

**Dónde están los datos finales:**
- `pricing_history` (precios publicados - permanente)
- `supplier_mapped_products` (mapeo supplier-producto - permanente)

---

## 📊 Resumen Visual por Tabla

### line_sessions (Temporal - Session Management)
**Usada por:** TODOS los tools
**Propósito:** Guardar estado temporal de conversaciones
**Campo clave:** `preferences_captured` (JSONB)

```
onboarding_restaurant → preferences_captured = { step: 2, restaurant_name: "..." }
setup_buying_preferences → preferences_captured = { step: 3, brands: [...] }
build_shopping_cart → preferences_captured = { cart: {...} }
execute_checkout → preferences_captured = { cart: null, order_id: 1234 }
upload_supplier_prices → preferences_captured = { price_list: [...] }
normalize_product_list → preferences_captured = { normalization: {...} }
publish_to_catalog → preferences_captured = { published_at: "..." }
```

### restaurants (Permanente)
**Usada por:**
- onboarding_restaurant (INSERT)
- setup_buying_preferences (UPDATE `category_preferences`)

### restaurant_people (Permanente)
**Usada por:**
- onboarding_restaurant (INSERT)

### suppliers (Permanente)
**Usada por:**
- onboarding_supplier (INSERT)

### purchase_orders (Permanente)
**Usada por:**
- execute_checkout (INSERT)

### purchase_order_items (Permanente)
**Usada por:**
- execute_checkout (INSERT múltiple)

### pricing_history (Permanente)
**Usada por:**
- build_shopping_cart (lectura - obtener precios)
- normalize_product_list (lectura - detectar anomalías)
- publish_to_catalog (INSERT múltiple - publicar precios)

### supplier_mapped_products (Permanente)
**Usada por:**
- publish_to_catalog (INSERT o UPDATE)

---

## 🔍 Cómo Verificar en Supabase

### Ver sesiones activas:
```sql
SELECT
  session_id,
  primary_intent,
  awaiting_continuation,
  preferences_captured,
  created_at
FROM line_sessions
WHERE awaiting_continuation = true
ORDER BY created_at DESC;
```

### Ver carrito de una sesión:
```sql
SELECT
  session_id,
  preferences_captured->'cart' as cart_data
FROM line_sessions
WHERE primary_intent = 'compra'
  AND preferences_captured->'cart' IS NOT NULL;
```

### Ver órdenes creadas hoy:
```sql
SELECT
  o.*,
  COUNT(oi.id) as items_count
FROM purchase_orders o
LEFT JOIN purchase_order_items oi ON o.id = oi.order_id
WHERE DATE(o.order_date) = CURRENT_DATE
GROUP BY o.id;
```

### Ver precios publicados por supplier:
```sql
SELECT
  ph.*,
  ml.product_name,
  s.company_name as supplier
FROM pricing_history ph
JOIN master_list ml ON ph.master_list_id = ml.id
JOIN suppliers s ON ph.supplier_id = s.id
WHERE ph.supplier_id = 5
  AND ph.verification_status = 'verified'
ORDER BY ph.effective_date DESC;
```

---

## ✅ Checklist de Datos

**¿Dónde se guarda cada dato?**

- [ ] Registro de restaurant → `restaurants` + `restaurant_people`
- [ ] Registro de supplier → `suppliers`
- [ ] Preferencias de compra → `restaurants.category_preferences`
- [ ] Carrito de compras → `line_sessions.preferences_captured.cart`
- [ ] Orden de compra → `purchase_orders` + `purchase_order_items`
- [ ] Lista de precios (temp) → `line_sessions.preferences_captured.price_list`
- [ ] Normalización (temp) → `line_sessions.preferences_captured.normalization`
- [ ] Precios publicados → `pricing_history` + `supplier_mapped_products`
- [ ] Estado de sesiones → `line_sessions` (siempre)

---

**Nota importante:** La tabla `line_sessions` es el "cerebro" temporal del sistema. Guarda el estado de TODAS las conversaciones en el campo JSONB `preferences_captured`, que cambia según el tipo de conversación.
