# 🎯 Plan de Unificación: Workflow Completo + Documentación

## 📊 Estado Actual del Repositorio

### ✅ Archivos del Usuario (Workflow Completo)
1. **Frepi MVP2 - Full Architecture with Supabase Validations.json** (42KB)
   - Workflow COMPLETO con WhatsApp Trigger
   - Nodo "Prepare User Context" implementado
   - Onboarding restaurant + supplier completos
   - Todos los tools conectados

2. **Frepi MVP2 - Full Architecture.json** (35KB)
   - Versión sin validaciones de Supabase

3. **SUPABASE_STRUCTURE_COMPLETE.md** (23KB)
   - Estructura completa de base de datos
   - Todas las tablas documentadas
   - ENUMs y tipos de datos

### ✅ Archivos Creados por Mí (Documentación)
1. **onboarding_restaurant_n8n.js** (12KB)
   - Código standalone (no necesario, workflow ya lo tiene)

2. **onboarding_restaurant_complete.js** (11KB)
   - Versión con comentarios extensos (no necesario)

3. **prepare_user_context.js** (5KB)
   - Nodo standalone (no necesario, workflow ya lo tiene)

4. **ONBOARDING_IMPLEMENTATION_GUIDE.md** (10KB)
   - ✅ **ÚTIL** - Guía de implementación completa

5. **README_ONBOARDING.md** (8KB)
   - ✅ **ÚTIL** - Quick start guide

6. **COMPARISON_ANALYSIS.md** (13KB)
   - ✅ **ÚTIL** - Análisis comparativo

---

## 🔍 Análisis del Workflow Real

### Estructura del Workflow "Full Architecture with Supabase Validations"

```
WhatsApp Trigger (whatsapp-trigger-001)
  ↓
Extract Message Data (extract-data-001)
  ├─ Detecta tipo de mensaje
  ├─ Maneja archivos no soportados
  └─ Extrae phone_number, user_name, message
  ↓
Buscar Usuario en DB (buscar-usuario-001) [SUPABASE NODE]
  ├─ Consulta: restaurant_people
  ├─ Filtro: whatsapp_number = phone_number
  └─ Filtro: is_active = true
  ↓
Prepare User Context (prepare-context-001) [CODE NODE]
  ├─ Combina datos de mensaje + usuario
  ├─ Consulta line_sessions activas
  ├─ Prepara: is_new_user, restaurant_id, person_id
  └─ Output: userContext completo
  ↓
Route: Customer or Supplier? (route-customer-supplier-001) [IF NODE]
  ├─ Regex: fornecedor|proveedor|vender|supplier
  ├─ TRUE → Supplier Journey Agent
  └─ FALSE → Customer Journey Agent
  ↓                                    ↓
Customer Journey Agent          Supplier Journey Agent
  ├─ OpenAI GPT-4o-mini            ├─ OpenAI GPT-4o-mini
  ├─ Memory Buffer (30 msgs)       ├─ Memory Buffer (30 msgs)
  └─ Tools:                         └─ Tools:
      • onboarding_restaurant           • onboarding_supplier
      • setup_buying_preferences        • upload_supplier_prices
      • search_products_vector          • normalize_product_list
      • build_shopping_cart             • publish_to_catalog
      • execute_checkout                • show_supplier_menu
      • show_customer_menu
  ↓                                    ↓
  └────────────────┬────────────────┘
                   ↓
         Send WhatsApp Response
```

---

## ✅ Lo Que ESTÁ BIEN en el Workflow

### 1. **Nodo "Prepare User Context"** ⭐ CRÍTICO
```javascript
// Consulta usuario existente
const userData = $('Buscar Usuario en DB').all();

// Consulta sesión activa
const { data: activeSessions } = await $supabase
  .from('line_sessions')
  .select('*')
  .eq('person_id', user.id)
  .eq('awaiting_continuation', true)
  .order('last_activity_at', { ascending: false })
  .limit(1);

// Prepara contexto unificado
return [{ json: userContext }];
```

**Estado:** ✅ PERFECTO - Esta es la pieza que faltaba en mi implementación

---

### 2. **Tool: onboarding_restaurant**
```javascript
const userData = $('Prepare User Context').first().json;

// Check if already registered
if (!userData.is_new_user) {
  return JSON.stringify({
    status: 'already_registered',
    message: `Olá ${userData.user_name}! Você já está cadastrado.`
  });
}
```

**Features:**
- ✅ 4 pasos de captura
- ✅ Timeout de 30 minutos
- ✅ Validación de duplicados con `.ilike()`
- ✅ Rollback en errores
- ✅ Session management completo
- ✅ Logging detallado

**Estado:** ✅ COMPLETO Y FUNCIONAL

---

### 3. **Tool: onboarding_supplier**
Similar a restaurant pero con 5 pasos:
1. company_name
2. contact_name
3. business_type (wholesaler, distributor, manufacturer, local_producer)
4. contact_method (whatsapp, email, phone, website)
5. coverage_area

**Estado:** ✅ COMPLETO Y FUNCIONAL

---

### 4. **Otros Tools**

| Tool | Estado | Notas |
|------|--------|-------|
| setup_buying_preferences | ⚠️ MOCK | Retorna estructura pero no guarda en DB |
| search_products_vector | ⚠️ PARCIAL | Tiene embedding generation + RPC pero con fallback |
| build_shopping_cart | ⚠️ MOCK | Estructura correcta pero datos hardcoded |
| execute_checkout | ⚠️ PARCIAL | Crea purchase_order pero sin items |
| upload_supplier_prices | ⚠️ MOCK | Solo retorna formato esperado |
| normalize_product_list | ⚠️ MOCK | Retorna estructura sin procesamiento real |
| publish_to_catalog | ⚠️ MOCK | No guarda en pricing_history |

---

## 🔧 Lo Que FALTA Implementar

### 1. **setup_buying_preferences - Implementación Real**

Actualmente solo retorna mensaje. Necesita:

```javascript
// PASO 1-5: Capturar preferencias paso a paso
// Similar a onboarding_restaurant pero guardando en:

await $supabase
  .from('restaurants')
  .update({
    category_preferences: {
      preferred_brands: brands,
      preferred_formats: formats,
      order_frequency: frequency,
      delivery_schedule: schedule,
      special_restrictions: restrictions
    }
  })
  .eq('id', userData.restaurant_id);
```

---

### 2. **search_products_vector - Completar RPC**

Tiene la estructura pero necesita:

```javascript
// RPC function en Supabase debe existir:
CREATE OR REPLACE FUNCTION match_products_v2(
  query_embedding vector(1536),
  match_threshold float,
  match_count int
)
RETURNS TABLE (
  id int,
  product_name text,
  brand text,
  similarity float
)
```

---

### 3. **build_shopping_cart - Guardar en Temporal/Session**

```javascript
// Guardar cart en session
await $supabase
  .from('line_sessions')
  .update({
    preferences_captured: {
      cart: {
        items: selectedItems,
        total: calculatedTotal
      }
    }
  })
  .eq('session_id', sessionId);
```

---

### 4. **execute_checkout - Crear Order Items**

```javascript
// 1. Crear purchase_order (YA ESTÁ)
// 2. Crear purchase_order_items (FALTA):

const items = sessionData.cart.items;
const orderItems = items.map(item => ({
  order_id: order.id,
  master_list_id: item.master_list_id,
  quantity: item.quantity,
  unit_price: item.unit_price,
  subtotal: item.subtotal
}));

await $supabase
  .from('purchase_order_items')
  .insert(orderItems);
```

---

### 5. **upload_supplier_prices - Parser Real**

```javascript
// Parsear CSV/Excel/Texto
// Formato esperado: Producto | Precio | Unidad

function parseSupplierPrices(message) {
  const lines = message.split('\n');
  return lines.map(line => {
    const [product, price, unit] = line.split('|').map(s => s.trim());
    return { product, price: parseFloat(price), unit };
  });
}
```

---

### 6. **normalize_product_list - Vector Mapping Real**

```javascript
// Para cada producto del supplier:
// 1. Generar embedding
// 2. Buscar en master_list usando RPC
// 3. Mapear si similarity > 0.8
// 4. Detectar outliers de precio

for (const product of supplierProducts) {
  const embedding = await generateEmbedding(product.name);
  const { data: matches } = await $supabase.rpc('match_products_v2', {
    query_embedding: embedding,
    match_threshold: 0.8,
    match_count: 1
  });

  if (matches && matches.length > 0) {
    mappedProducts.push({
      supplier_product: product,
      master_list_id: matches[0].id,
      confidence: matches[0].similarity
    });
  }
}
```

---

### 7. **publish_to_catalog - Guardar en pricing_history**

```javascript
const priceRecords = normalizedProducts.map(p => ({
  master_list_id: p.master_list_id,
  supplier_id: userData.supplier_id,
  unit_price: p.price,
  currency: 'BRL',
  effective_date: new Date().toISOString(),
  data_source: 'supplier',
  verification_status: 'verified'
}));

await $supabase
  .from('pricing_history')
  .insert(priceRecords);

await $supabase
  .from('supplier_mapped_products')
  .upsert(mappedProducts.map(p => ({
    ...p,
    is_active: true
  })));
```

---

## 📁 Archivos a Mantener/Eliminar

### ✅ MANTENER (Archivo Principal)
- **Frepi MVP2 - Full Architecture with Supabase Validations.json**
  - Workflow completo funcional

### ✅ MANTENER (Documentación)
- **SUPABASE_STRUCTURE_COMPLETE.md**
  - Estructura de base de datos

- **ONBOARDING_IMPLEMENTATION_GUIDE.md**
  - Guía de implementación

- **README_ONBOARDING.md**
  - Quick start guide

- **COMPARISON_ANALYSIS.md**
  - Análisis comparativo

### ⚠️ OPCIONAL
- **Frepi MVP2 - Full Architecture.json**
  - Versión sin validaciones (backup?)

### ❌ ELIMINAR (Redundantes)
- **onboarding_restaurant_n8n.js**
  - Ya está en el workflow JSON

- **onboarding_restaurant_complete.js**
  - Versión documentada (redundante)

- **prepare_user_context.js**
  - Ya está en el workflow JSON

---

## 🚀 Plan de Acción Propuesto

### Fase 1: Limpieza ✅
1. Eliminar archivos JS redundantes
2. Mantener solo documentación útil

### Fase 2: Documentación 📚
1. Crear guía de deployment del workflow
2. Documentar cada tool del workflow
3. Agregar ejemplos de uso

### Fase 3: Implementación de Tools Faltantes 🔧
1. Implementar `setup_buying_preferences` completo
2. Crear RPC `match_products_v2` en Supabase
3. Implementar `build_shopping_cart` con persistencia
4. Completar `execute_checkout` con order items
5. Implementar parser en `upload_supplier_prices`
6. Completar `normalize_product_list` con vector mapping
7. Implementar `publish_to_catalog` guardando en DB

### Fase 4: Testing 🧪
1. Probar flujo de onboarding restaurant
2. Probar flujo de onboarding supplier
3. Probar flujo completo de compra
4. Validar manejo de errores

---

## 💡 Recomendación Final

**ACCIÓN INMEDIATA:**

1. ✅ Mantener workflow: "Frepi MVP2 - Full Architecture with Supabase Validations.json"
2. ❌ Eliminar archivos JS redundantes (onboarding_restaurant_n8n.js, etc.)
3. ✅ Mantener documentación (guías MD)
4. 🔧 Implementar tools faltantes uno por uno

**PRIORIDAD:**
1. **Alta:** setup_buying_preferences (necesario para UX)
2. **Alta:** build_shopping_cart + execute_checkout (core funcional)
3. **Media:** search_products_vector con RPC
4. **Media:** Supplier tools (upload, normalize, publish)

---

¿Quieres que proceda con:

**A)** Eliminar archivos redundantes y limpiar repo

**B)** Implementar el siguiente tool prioritario (setup_buying_preferences)

**C)** Crear documentación completa del workflow actual

**D)** Otra cosa

¿Qué prefieres? 🎯
