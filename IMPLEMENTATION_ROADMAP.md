# 🗺️ IMPLEMENTATION ROADMAP - Frepi MVP2 to Full System

**Basado en:** Technical Requirements Document Gap Analysis
**Fecha:** 2025-01-18

---

## 🎯 OBJETIVO GENERAL

Transformar el sistema actual (2 agentes monolíticos) en el sistema multi-agente propuesto en el documento técnico, priorizando features que generen valor inmediato mientras construimos hacia la arquitectura ideal.

---

## 📊 ESTADO ACTUAL - QUICK STATS

| Métrica | Estado | Progreso |
|---------|--------|----------|
| **Journeys Implementados** | 3/15 completos, 7/15 parciales | 🟡 47% |
| **Sub-Agents** | 0/7 | 🔴 0% |
| **Core Tools** | 12 implementados | 🟢 ~70% |
| **Database Schema** | Completo (verificar campos) | 🟢 ~95% |
| **Arquitectura Match** | Monolítica vs. Multi-agent | 🔴 30% |

---

## 🚀 ROADMAP - 3 FASES

---

## FASE 1: QUICK WINS & UX IMPROVEMENTS
**Duración:** 1-2 semanas
**Objetivo:** Mejorar UX y agregar features simples SIN refactor arquitectural

### 🎯 Tareas

#### 1.1 UX Pattern: 4-Option Menu (1 día)

**Qué hacer:**
- Actualizar system message de Customer Journey Agent
- Agregar regla: "SIEMPRE mostrar menú de 4 opciones después de completar una tarea"
- Forzar llamada a `show_customer_menu` tool al final de cada respuesta

**Código a modificar:**
```javascript
// En Customer Journey Agent system message
"## REGLA CRÍTICA: MENÚ DE 4 OPCIONES

DESPUÉS de responder cualquier pregunta o completar cualquier tarea:
1. Responde la pregunta/completa la tarea
2. Proporciona recomendaciones inteligentes (si aplica)
3. Ofrece siguiente acción
4. ✅ LLAMA show_customer_menu tool

NUNCA termines una conversación sin mostrar el menú."
```

**Validación:**
- [ ] Testear 10 conversaciones diferentes
- [ ] Verificar que menú aparece al final de TODAS

---

#### 1.2 Database Schema Validation (2 días)

**Qué hacer:**
- Revisar schema actual de Supabase
- Comparar con campos mencionados en documento
- Agregar campos faltantes

**Campos a verificar/agregar:**

**suppliers table:**
```sql
ALTER TABLE suppliers
ADD COLUMN IF NOT EXISTS preferred_communication_channel TEXT CHECK (preferred_communication_channel IN ('whatsapp', 'web_app', 'mobile_app', 'email'));

ALTER TABLE suppliers
ADD COLUMN IF NOT EXISTS business_type TEXT CHECK (business_type IN ('distributor', 'producer', 'wholesaler'));

ALTER TABLE suppliers
ADD COLUMN IF NOT EXISTS delivery_reliability_score DECIMAL(3,2) DEFAULT 0.80;
```

**purchase_orders table:**
```sql
ALTER TABLE purchase_orders
ADD COLUMN IF NOT EXISTS status TEXT CHECK (status IN ('submitted', 'confirmed', 'in_transit', 'delivered', 'cancelled')) DEFAULT 'submitted';

ALTER TABLE purchase_orders
ADD COLUMN IF NOT EXISTS tracking_number TEXT;

ALTER TABLE purchase_orders
ADD COLUMN IF NOT EXISTS delivery_info JSONB DEFAULT '{}';
```

**restaurant_product_preferences table:**
```sql
ALTER TABLE restaurant_product_preferences
ADD COLUMN IF NOT EXISTS price_sensitivity TEXT CHECK (price_sensitivity IN ('low', 'medium', 'high')) DEFAULT 'medium';

ALTER TABLE restaurant_product_preferences
ADD COLUMN IF NOT EXISTS quality_priority TEXT CHECK (quality_priority IN ('low', 'medium', 'high', 'premium')) DEFAULT 'medium';

ALTER TABLE restaurant_product_preferences
ADD COLUMN IF NOT EXISTS preferred_suppliers INTEGER[] DEFAULT ARRAY[]::INTEGER[];

ALTER TABLE restaurant_product_preferences
ADD COLUMN IF NOT EXISTS blacklisted_suppliers INTEGER[] DEFAULT ARRAY[]::INTEGER[];
```

**master_list table:**
```sql
ALTER TABLE master_list
ADD COLUMN IF NOT EXISTS quality_tier TEXT CHECK (quality_tier IN ('basic', 'standard', 'premium', 'ultra_premium'));

ALTER TABLE master_list
ADD COLUMN IF NOT EXISTS specifications JSONB DEFAULT '{}';
```

**Validación:**
- [ ] Ejecutar migrations
- [ ] Verificar constraints funcionan
- [ ] Testear inserción de datos

---

#### 1.3 Quick Info Tools (3 días)

**Implementar 3 tools simples:**

**Tool 1: `get_user_preferences_for_product`**
```javascript
// Propósito: Retrieve preferences for specific product
// Input: { restaurant_id, master_list_id }
// Output: { preferred_suppliers, max_price, quality_requirements }

const { data: prefs } = await $supabase
  .from('restaurant_product_preferences')
  .select('*')
  .eq('restaurant_id', restaurant_id)
  .eq('master_list_id', master_list_id)
  .single();

return prefs;
```

**Tool 2: `quick_price_fetch`**
```javascript
// Propósito: Fetch current prices for specific products
// Input: { master_list_ids: [45, 78], restaurant_id: 123 }
// Output: { products: [{master_list_id, product_name, suppliers: [...]}] }

const { data: prices } = await $supabase
  .from('pricing_history')
  .select(`
    *,
    supplier:suppliers(*),
    product:master_list(*)
  `)
  .in('master_list_id', master_list_ids)
  .gte('effective_date', new Date(Date.now() - 30*24*60*60*1000)) // Last 30 days
  .order('effective_date', { ascending: false });

// Group by product
return groupByProduct(prices);
```

**Tool 3: `order_history_lookup`**
```javascript
// Propósito: Query purchase_orders with filters
// Input: { restaurant_id, filters: {date_range, product, supplier, status} }
// Output: { orders: [...], summary: {total_orders, total_spent} }

let query = $supabase
  .from('purchase_orders')
  .select(`
    *,
    items:purchase_order_items(
      *,
      product:master_list(*)
    ),
    supplier:suppliers(*)
  `)
  .eq('restaurant_id', restaurant_id);

// Apply filters
if (filters.date_range) {
  query = query.gte('order_date', filters.date_range.start)
               .lte('order_date', filters.date_range.end);
}

if (filters.status) {
  query = query.eq('status', filters.status);
}

const { data: orders } = await query;

// Calculate summary
const summary = {
  total_orders: orders.length,
  total_spent: orders.reduce((sum, o) => sum + o.total_amount, 0)
};

return { orders, summary };
```

**Integración:**
- Agregar estos 3 tools al Customer Journey Agent
- Actualizar system message para incluir cuándo usarlos

**Validación:**
- [ ] Test get_user_preferences con producto existente
- [ ] Test quick_price_fetch con múltiples productos
- [ ] Test order_history_lookup con diferentes filtros

---

#### 1.4 Router Logic Formalization (1 día)

**Qué hacer:**
- Documentar el flow actual de routing
- Asegurar que matches el pattern propuesto en documento
- Crear diagrama visual

**No cambiar código** - solo documentar y validar que funciona como esperado

**Validación:**
- [ ] Diagram creado y revisado
- [ ] Flow documentado en README

---

### 📦 DELIVERABLES FASE 1

- ✅ 4-option menu pattern implementado y testeado
- ✅ Database schema validado y actualizado
- ✅ 3 Quick Info tools implementados
- ✅ Journey 3 (Check Prices) funcionando
- ✅ Journey 8-9 (Order History) funcionando parcialmente
- ✅ Router logic documentado

**User Value:** Usuarios pueden consultar precios, ver historial, mejor UX con menú consistente

---

## FASE 2: CORE PURCHASE FEATURES
**Duración:** 2-3 semanas
**Objetivo:** Implementar features críticas de compra y recommendations

### 🎯 Tareas

#### 2.1 Buying Algorithm Tool (5 días)

**Propósito:** Optimizar selección de suppliers basado en múltiples factores

**Implementación:**

```javascript
// buying_algorithm_COMPLETE.js

/**
 * BUYING ALGORITHM - Supplier Selection Optimizer
 *
 * Scoring factors:
 * - Price (40%)
 * - User preferences (30%)
 * - Reliability (20%)
 * - Availability (10%)
 */

async function buyingAlgorithm(input) {
  const { master_list_ids, restaurant_id, mode } = input;

  // 1. Fetch all available prices
  const prices = await fetchPrices(master_list_ids);

  // 2. Get user preferences
  const preferences = await getUserPreferences(restaurant_id, master_list_ids);

  // 3. Score each supplier option
  const scoredOptions = prices.map(option => {
    const score = calculateScore(option, preferences);
    return { ...option, score, reasons: explainScore(score) };
  });

  // 4. Sort by score
  scoredOptions.sort((a, b) => b.score - a.score);

  // 5. Return best option + alternatives
  return {
    best_option: scoredOptions[0],
    alternatives: scoredOptions.slice(1, 3),
    explanation: formatExplanation(scoredOptions[0])
  };
}

function calculateScore(option, preferences) {
  let score = 0;

  // Price factor (40%)
  const priceScore = calculatePriceScore(option.unit_price, option.market_avg);
  score += priceScore * 0.4;

  // Preference factor (30%)
  const prefScore = preferences.preferred_suppliers.includes(option.supplier_id) ? 1.0 : 0.5;
  score += prefScore * 0.3;

  // Reliability factor (20%)
  const reliabilityScore = option.supplier.delivery_reliability_score || 0.8;
  score += reliabilityScore * 0.2;

  // Availability factor (10%)
  const availScore = option.in_stock ? 1.0 : 0.0;
  score += availScore * 0.1;

  return score;
}

function explainScore(score) {
  const reasons = [];

  if (score.price_component > 0.3) reasons.push("Mejor precio disponible");
  if (score.pref_component > 0.2) reasons.push("Tu proveedor preferido");
  if (score.reliability_component > 0.15) reasons.push("Alta confiabilidad");

  return reasons;
}
```

**Testing:**
- [ ] Test con 1 producto, múltiples suppliers
- [ ] Test con producto sin preferencias
- [ ] Test con supplier no confiable (reliability < 0.5)
- [ ] Validar que explanations son claras

---

#### 2.2 Masterlist Modifier Tool (3 días)

**Implementar tool para agregar productos nuevos:**

```javascript
// add_product_to_masterlist_COMPLETE.js

async function addProductToMasterlist(input) {
  const { product_name, category, specifications, requested_by_restaurant_id } = input;

  // 1. Check for duplicates (vector search)
  const duplicates = await searchForDuplicates(product_name);

  if (duplicates.length > 0 && duplicates[0].similarity > 0.9) {
    return {
      success: false,
      error: 'duplicate',
      existing_product: duplicates[0],
      message: 'Product already exists in master list'
    };
  }

  // 2. Generate embedding
  const embedding = await generateEmbedding(product_name);

  // 3. Insert into master_list
  const { data: newProduct, error } = await $supabase
    .from('master_list')
    .insert({
      product_name,
      category,
      specifications: specifications || {},
      embedding,
      is_active: true,
      created_by_restaurant_id: requested_by_restaurant_id
    })
    .select()
    .single();

  if (error) throw error;

  return {
    success: true,
    master_list_id: newProduct.id,
    product_name: newProduct.product_name,
    message: 'Product added successfully'
  };
}

async function generateEmbedding(text) {
  const response = await fetch('https://api.openai.com/v1/embeddings', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'text-embedding-3-small',
      input: text
    })
  });

  const data = await response.json();
  return data.data[0].embedding;
}
```

**Testing:**
- [ ] Test agregar producto nuevo válido
- [ ] Test detectar duplicado
- [ ] Test con especificaciones complejas
- [ ] Validar embedding generado correctamente

---

#### 2.3 Price Approval Flow (4 días)

**Implementar lógica de detección y aprobación de precios anómalos:**

```javascript
// price_approval_checker_COMPLETE.js

async function checkPriceApproval(input) {
  const { master_list_id, proposed_price, restaurant_id } = input;

  // 1. Get historical average for this restaurant
  const avgPrice = await getHistoricalAverage(master_list_id, restaurant_id);

  if (!avgPrice) {
    // No history, can't compare
    return {
      approval_needed: false,
      message: 'No historical data to compare'
    };
  }

  // 2. Calculate deviation
  const deviation = ((proposed_price - avgPrice) / avgPrice) * 100;

  // 3. Check if approval needed (threshold: 15%)
  if (Math.abs(deviation) > 15) {
    return {
      approval_needed: true,
      proposed_price,
      historical_average: avgPrice,
      deviation_percentage: deviation.toFixed(1),
      recommendation: deviation > 0 ? 'price_increase' : 'price_decrease',
      message: `Price is ${Math.abs(deviation).toFixed(1)}% ${deviation > 0 ? 'higher' : 'lower'} than your average`,
      options: [
        { action: 'accept', label: 'Aceitar mesmo assim' },
        { action: 'negotiate', label: 'Tentar negociar' },
        { action: 'alternatives', label: 'Ver outras opções' },
        { action: 'cancel', label: 'Cancelar este item' }
      ]
    };
  }

  return {
    approval_needed: false,
    message: 'Price within acceptable range'
  };
}

async function getHistoricalAverage(master_list_id, restaurant_id) {
  const { data } = await $supabase
    .from('purchase_orders')
    .select(`
      items:purchase_order_items(unit_price)
    `)
    .eq('restaurant_id', restaurant_id)
    .gte('order_date', new Date(Date.now() - 90*24*60*60*1000)) // Last 90 days
    .contains('items', [{ master_list_id }]);

  if (!data || data.length === 0) return null;

  const prices = data.flatMap(o => o.items.map(i => i.unit_price));
  const avg = prices.reduce((sum, p) => sum + p, 0) / prices.length;

  return avg;
}
```

**Integración con Purchase Flow:**
- Llamar `checkPriceApproval` antes de crear orden
- Si `approval_needed: true`, mostrar opciones al usuario
- Esperar confirmación antes de proceder

**Testing:**
- [ ] Test con precio 20% más alto → solicita aprobación
- [ ] Test con precio 5% más alto → no solicita
- [ ] Test sin histórico → permite sin aprobación
- [ ] Test con usuario que acepta, negocia, cancela

---

#### 2.4 Recommendations Engine (5 días)

**Implementar análisis de historial y generación de recomendaciones:**

```javascript
// analyze_history_and_recommend_COMPLETE.js

async function analyzeAndRecommend(input) {
  const { restaurant_id, time_period } = input;

  // 1. Analyze purchase patterns
  const patterns = await analyzePurchasePatterns(restaurant_id);

  // 2. Identify products due for reorder
  const dueForReorder = await identifyDueProducts(restaurant_id, patterns);

  // 3. Check seasonal trends
  const seasonalRecs = await getSeasonalRecommendations(restaurant_id);

  // 4. Combine and prioritize
  const recommendations = prioritizeRecommendations([
    ...dueForReorder,
    ...seasonalRecs
  ]);

  // 5. Get current pricing
  const withPricing = await attachCurrentPricing(recommendations);

  return {
    recommendations: withPricing,
    summary: {
      total_items: withPricing.length,
      estimated_total: withPricing.reduce((sum, r) => sum + r.estimated_cost, 0),
      budget_status: await checkBudgetStatus(restaurant_id, withPricing)
    }
  };
}

async function analyzePurchasePatterns(restaurant_id) {
  const { data: orders } = await $supabase
    .from('purchase_orders')
    .select(`
      order_date,
      items:purchase_order_items(
        master_list_id,
        quantity,
        product:master_list(product_name)
      )
    `)
    .eq('restaurant_id', restaurant_id)
    .gte('order_date', new Date(Date.now() - 180*24*60*60*1000)) // Last 6 months
    .order('order_date', { ascending: true });

  // Group by product
  const productOrders = {};

  orders.forEach(order => {
    order.items.forEach(item => {
      if (!productOrders[item.master_list_id]) {
        productOrders[item.master_list_id] = [];
      }
      productOrders[item.master_list_id].push({
        date: order.order_date,
        quantity: item.quantity,
        product_name: item.product.product_name
      });
    });
  });

  // Calculate frequency for each product
  const patterns = Object.entries(productOrders).map(([id, orders]) => {
    const sortedDates = orders.map(o => new Date(o.date)).sort((a, b) => a - b);
    const intervals = [];

    for (let i = 1; i < sortedDates.length; i++) {
      const days = (sortedDates[i] - sortedDates[i-1]) / (1000*60*60*24);
      intervals.push(days);
    }

    const avgInterval = intervals.length > 0
      ? intervals.reduce((sum, i) => sum + i, 0) / intervals.length
      : null;

    return {
      master_list_id: parseInt(id),
      product_name: orders[0].product_name,
      order_count: orders.length,
      avg_quantity: orders.reduce((sum, o) => sum + o.quantity, 0) / orders.length,
      avg_interval_days: avgInterval,
      last_order_date: sortedDates[sortedDates.length - 1]
    };
  });

  return patterns;
}

async function identifyDueProducts(restaurant_id, patterns) {
  const now = new Date();

  return patterns
    .filter(p => p.avg_interval_days !== null)
    .map(p => {
      const daysSinceLastOrder = (now - p.last_order_date) / (1000*60*60*24);
      const dueInDays = p.avg_interval_days - daysSinceLastOrder;

      return {
        ...p,
        days_since_last_order: Math.round(daysSinceLastOrder),
        due_in_days: Math.round(dueInDays),
        priority: dueInDays < 0 ? 'high' : dueInDays < 3 ? 'medium' : 'low'
      };
    })
    .filter(p => p.due_in_days <= 7) // Only products due within a week
    .sort((a, b) => a.due_in_days - b.due_in_days);
}

function prioritizeRecommendations(recommendations) {
  const priorityOrder = { high: 1, medium: 2, low: 3 };
  return recommendations.sort((a, b) => {
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });
}

async function attachCurrentPricing(recommendations) {
  const masterListIds = recommendations.map(r => r.master_list_id);

  // Use buying algorithm to get best prices
  const pricing = await buyingAlgorithm({
    master_list_ids: masterListIds,
    mode: 'price_check_only'
  });

  return recommendations.map(rec => {
    const priceInfo = pricing.products.find(p => p.master_list_id === rec.master_list_id);

    return {
      ...rec,
      suggested_quantity: Math.round(rec.avg_quantity),
      current_best_price: priceInfo?.best_option?.unit_price || null,
      estimated_cost: priceInfo ? priceInfo.best_option.unit_price * rec.avg_quantity : null,
      supplier: priceInfo?.best_option?.supplier_name || null
    };
  });
}
```

**Testing:**
- [ ] Test con restaurante con 6 meses de historial
- [ ] Test con restaurante nuevo (sin historial)
- [ ] Test identificación de productos "due"
- [ ] Validar priorización correcta
- [ ] Validar estimación de costos

---

### 📦 DELIVERABLES FASE 2

- ✅ Buying Algorithm implementado y testeado
- ✅ Masterlist Modifier tool funcionando
- ✅ Price Approval flow implementado
- ✅ Recommendations engine completo
- ✅ Journey 4 (Making Purchase) mejorado significativamente
- ✅ Journey 5 (Recommendations) funcionando
- ✅ Journey 6 (New Products) funcionando
- ✅ Journey 7 (Price Approval) funcionando

**User Value:**
- Compras optimizadas automáticamente
- Control de precios anómalos
- Recomendaciones proactivas basadas en patrones
- Facilidad para agregar productos nuevos

---

## FASE 3: ARCHITECTURAL REFACTOR
**Duración:** 3-4 semanas
**Objetivo:** Migrar a arquitectura de sub-agents como propone el documento

### 🎯 Decisión Crítica

**¿Hacer este refactor ahora o después de validar product-market fit?**

**Argumentos para AHORA:**
- ✅ Context window optimization (reduce tokens/costs)
- ✅ Easier to maintain long-term
- ✅ Cleaner separation of concerns
- ✅ Better error handling per sub-agent

**Argumentos para DESPUÉS:**
- ✅ Features ya funcionan con arquitectura actual
- ✅ Evita inversión grande antes de validar PMF
- ✅ Permite iterar más rápido en features
- ✅ Refactor será más informado con datos reales de uso

**RECOMENDACIÓN:** DESPUÉS - Completar Fases 1-2, validar con usuarios, LUEGO decidir si refactor vale la pena

---

### Si se decide hacer el refactor, estas serían las tareas:

#### 3.1 Create Customer Main Agent (Orchestrator)

**Características:**
- NO tiene tools (solo conversación)
- Routing logic a sub-agents
- SIEMPRE muestra 4-option menu
- Mantiene conversation context

#### 3.2 Create Sub-Agents

1. **Purchase Order Creator Agent**
   - Tools: match_master_list, get_preferences, get_prices, buying_algorithm

2. **Supplier Price Updater Agent**
   - Tools: match_supplier_mapped, update_prices, match_master_list, update_master_list_id

3. **Buying Preference Agent**
   - Tools: analyze_history, configure_preferences, generate_recommendations

4. **Supplier Management Agent**
   - Tools: check_supplier, create_supplier, update_supplier

5. **Masterlist Modifier Agent**
   - Tools: add_product, generate_embeddings, categorize

6. **Quick Info Agent**
   - Tools: quick_lookup, price_fetch, order_history

#### 3.3 Migration Plan

1. Create all sub-agents in parallel with existing agents
2. Test each sub-agent independently
3. Update Customer Main Agent to route to sub-agents
4. Run A/B test (old vs new architecture)
5. Monitor performance, costs, error rates
6. Gradual migration (10% → 50% → 100%)
7. Deprecate old monolithic agents

#### 3.4 Testing Strategy

- Unit tests for each sub-agent
- Integration tests for full flows
- Load testing for performance
- Cost analysis (tokens used)

---

## 📊 MÉTRICAS DE ÉXITO

### Fase 1
- [ ] 4-option menu aparece en >95% de conversaciones
- [ ] Quick Info tools responden en <2 segundos
- [ ] Database migrations exitosas sin downtime
- [ ] 0 errores críticos en producción

### Fase 2
- [ ] Buying Algorithm selecciona mejor opción en >90% de casos (validación manual)
- [ ] Price approval detecta 100% de desviaciones >15%
- [ ] Recommendations tienen >70% de acceptance rate
- [ ] Add product funciona sin errores en 100% de casos

### Fase 3 (si se hace)
- [ ] Reducción de 30% en tokens usados por conversación
- [ ] 0 degradación en user experience
- [ ] Response time <5 segundos en 95th percentile
- [ ] Error rate <1%

---

## 🚨 RIESGOS Y MITIGACIONES

### Riesgo 1: Buying Algorithm no tan "inteligente" como esperado
**Mitigación:** Empezar con reglas simples, iterar basado en feedback

### Riesgo 2: Recommendations irrelevantes
**Mitigación:** Empezar conservador (solo productos con patrón claro), agregar ML después

### Riesgo 3: Refactor arquitectural rompe features existentes
**Mitigación:** Migration gradual con A/B testing, rollback plan

### Riesgo 4: Database migrations causan downtime
**Mitigación:** Usar IF NOT EXISTS, hacer migrations fuera de horas pico

### Riesgo 5: Costos de OpenAI se disparan
**Mitigación:** Cachear embeddings, rate limiting, monitoreo de costs

---

## 💰 ESTIMACIÓN DE ESFUERZO

| Fase | Desarrolladores | Semanas | Días-persona |
|------|----------------|---------|--------------|
| Fase 1 | 1 | 1.5 | 7.5 |
| Fase 2 | 1-2 | 3 | 15 |
| Fase 3 | 2 | 4 | 32 |
| **TOTAL** | | **8.5 semanas** | **54.5 días** |

**Recomendación:** Hacer Fase 1-2 primero (~4.5 semanas), validar, luego decidir sobre Fase 3

---

## 🎯 PRÓXIMOS PASOS INMEDIATOS

1. **Revisar este roadmap con el equipo**
   - ¿Están de acuerdo con las prioridades?
   - ¿Qué features son más críticas para usuarios?

2. **Decidir approach: Incremental vs. Big Bang**
   - Incremental (recomendado): Fases 1-2 → Validar → Fase 3
   - Big Bang: Refactor todo de una vez

3. **Crear tickets/tasks en project management tool**
   - Breakdown de cada tarea
   - Asignar responsables
   - Definir deadlines

4. **Configurar testing environment**
   - Sandbox en Supabase
   - Test WhatsApp numbers
   - Monitoring/logging setup

5. **¡EMPEZAR con Fase 1.1! (4-option menu)**
   - Quick win
   - Mejora UX inmediata
   - Solo 1 día de trabajo

---

**¿Listo para empezar? 🚀**
