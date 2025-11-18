# 📊 GAP ANALYSIS - Technical Requirements vs. Current Implementation

**Fecha:** 2025-01-18
**Propósito:** Identificar qué nos falta para implementar el sistema multi-agente descrito en "Technical Requirements: Restaurant-Facing Agent System"

---

## 📋 RESUMEN EJECUTIVO

### Estado Actual
Tenemos un sistema funcional con:
- ✅ 2 agentes principales (Customer + Supplier)
- ✅ 12 tools implementados
- ✅ Database schema completo
- ✅ User type detection para nuevos usuarios

### Arquitectura Propuesta (Documento)
Sistema multi-agente con:
- 🔴 1 Customer Main Agent (orquestador conversacional sin tools)
- 🔴 7 Sub-agents especializados con tools específicos
- 🔴 Router Logic dedicado
- 🔴 15 User Journeys documentados
- 🔴 Patrón de 4-option menu SIEMPRE visible

### Nivel de Gap: **MEDIO-ALTO**
- Arquitectura fundamental: ⚠️ Diferente (pero adaptable)
- Tools básicos: ✅ Mayormente implementados
- User Journeys: 🔴 5/15 cubiertos
- UX Pattern: 🔴 No implementado (menú de 4 opciones)

---

## 1️⃣ ARQUITECTURA: Current vs. Proposed

### 🟢 ACTUAL (Lo que tenemos)

```
┌─────────────────────────────────────────┐
│     CUSTOMER JOURNEY AGENT              │
│  - Maneja todo el flujo de restaurantes │
│  - Tiene acceso a TODOS los tools       │
│  - Conversación + Ejecución mezcladas   │
└─────────────────────────────────────────┘
         │
         └──> Tools (12):
              - onboarding_restaurant
              - setup_buying_preferences
              - search_products_vector
              - build_shopping_cart
              - execute_checkout
              - show_customer_menu
              - determine_user_type
              (+ 5 supplier tools)

┌─────────────────────────────────────────┐
│     SUPPLIER JOURNEY AGENT              │
│  - Maneja todo el flujo de proveedores  │
│  - Tiene acceso a TODOS los tools       │
└─────────────────────────────────────────┘
```

**Características:**
- ✅ Funcional y operativo
- ✅ Tools bien implementados
- ⚠️ Context window grande (todos los tools cargados)
- ⚠️ Mixing concerns (conversación + lógica de negocio)

---

### 🔵 PROPUESTA (Documento técnico)

```
┌─────────────────────────────────────────────────────┐
│         CUSTOMER MAIN AGENT                         │
│  - SOLO conversación y routing                      │
│  - NO tiene tools (context window limpio)           │
│  - SIEMPRE muestra menú de 4 opciones               │
└──────────┬──────────────────────────────────────────┘
           │
           ├──> 1. Purchase Order Creator Agent
           │    └─> Tools: match_master_list, get_preferences,
           │              get_prices, buying_algorithm
           │
           ├──> 2. Supplier Price Updater Agent
           │    └─> Tools: match_supplier_mapped, update_prices,
           │              match_master_list, update_master_list_id
           │
           ├──> 3. Supplier Management Agent
           │    └─> Tools: check_supplier, create_supplier,
           │              update_supplier
           │
           ├──> 4. Buying Preference Agent
           │    └─> Tools: analyze_history, configure_preferences,
           │              generate_recommendations, save_changes
           │
           ├──> 5. Masterlist Modifier Agent
           │    └─> Tools: add_product, generate_embeddings,
           │              categorize, set_attributes
           │
           ├──> 6. Quick Info Agent
           │    └─> Tools: quick_lookup, price_fetch,
           │              order_history
           │
           └──> 7. Purchase Order Executor Agent (Post-MVP)
                └─> Tools: send_order, track_status, follow_up
```

**Ventajas de la arquitectura propuesta:**
- 🎯 Separation of concerns (conversación vs. ejecución)
- 🧠 Context window optimizado (solo tools relevantes por agent)
- 🔧 Modularidad (cambiar un sub-agent sin afectar otros)
- 📊 Más fácil de debuggear y monitorear
- 🚀 Mejor performance (menos tokens por llamada)

---

## 2️⃣ ROUTER LOGIC: GAP CRÍTICO

### 🔴 NO TENEMOS (Documento propone)

El documento especifica un **Router Logic dedicado** que:

```
1. Recibe Webhook de WhatsApp
2. Extrae phone_number
3. Query PARALELO a 3 tablas:
   - restaurants
   - restaurant_people
   - suppliers
4. Decide routing:
   - No ID encontrado → Initial Onboarding Agent
   - ID en restaurants → Customer Agent (con restaurant_id, person_id, setup_status)
   - ID en suppliers → Supplier Agent (con supplier_id)
```

### 🟢 LO QUE TENEMOS

Tenemos:
- ✅ "Buscar Usuario en DB" node (Code)
- ✅ "Prepare User Context" node
- ✅ Routing básico a Customer/Supplier agents
- ✅ determine_user_type tool para nuevos usuarios

Pero:
- ⚠️ No está estructurado como "Router Logic" dedicado
- ⚠️ No hace queries paralelos optimizados
- ⚠️ No retorna el JSON exacto propuesto en el documento

**Impacto:** BAJO - Lo que tenemos funciona, pero no coincide con la spec

**Acción sugerida:** Refactorizar para que coincida con el patrón propuesto

---

## 3️⃣ UX PATTERN: 4-Option Menu - GAP CRÍTICO

### 🔴 NO IMPLEMENTADO

El documento especifica:

**CRITICAL PATTERN:** Customer Main Agent MUST ALWAYS show 4-option menu after completing any task:

```
1️⃣ Fazer uma compra
2️⃣ Atualizar preços de fornecedor
3️⃣ Registrar/Atualizar fornecedor
4️⃣ Configurar preferências
```

**Pattern Flow:**
1. Agent answers question/completes task
2. Agent provides intelligent recommendations
3. Agent offers next action
4. **Agent shows 4-option menu (ALWAYS)**

### 🟢 LO QUE TENEMOS

- ✅ Tenemos `show_customer_menu` tool
- ⚠️ Pero NO se llama automáticamente después de cada tarea
- ⚠️ NO está en el system message del agent como regla obligatoria

**Impacto:** MEDIO - Afecta UX consistency

**Acción sugerida:** Actualizar system message del Customer Agent para SIEMPRE mostrar menú

---

## 4️⃣ USER JOURNEYS: Coverage Analysis

| Journey # | Nombre | Status | Tools Needed | Gap |
|-----------|--------|--------|--------------|-----|
| **A. ONBOARDING & SETUP** |
| Journey 1 | First-Time User Onboarding | ✅ PARCIAL | Initial Onboarding Agent, write_setup_info | 🟡 Tenemos onboarding pero no como agent separado |
| Journey 2 | Updating Supplier Prices | ✅ COMPLETO | Supplier Price Updater Agent tools | ✅ upload_supplier_prices + normalize + publish |
| **B. PRE-PURCHASE** |
| Journey 3 | Checking Prices | 🟡 PARCIAL | Quick Info Agent, identify_products, get_prices | 🟡 Tenemos search_products_vector pero falta Quick Info Agent |
| Journey 4 | Making a Purchase | 🟡 PARCIAL | Purchase Order Creator, Masterlist Modifier, Executor | 🟡 Tenemos build_cart + checkout, falta Purchase Order Creator Agent |
| Journey 5 | Product Recommendations | 🔴 NO | Buying Preference Agent, analyze_history, recommendations | 🔴 NO IMPLEMENTADO |
| Journey 6 | Products Not in Master List | 🟡 PARCIAL | Masterlist Modifier Agent | 🟡 Podemos agregar pero no hay agent dedicado |
| Journey 7 | Price Approval/Negotiation | 🔴 NO | Buying Algorithm with approval logic | 🔴 NO IMPLEMENTADO |
| **C. CORE PURCHASING** |
| (Continuación de Journey 4) |
| **D. POST-PURCHASE** |
| Journey 8 | Order Tracking & Status | 🔴 NO | Quick Info Agent, order_status tool | 🔴 NO IMPLEMENTADO |
| Journey 9 | Order History & Reports | 🔴 NO | Quick Info Agent, spending_report | 🔴 NO IMPLEMENTADO |
| **E. ONGOING MANAGEMENT** |
| Journey 10 | Configuring Preferences | ✅ COMPLETO | Buying Preference Agent, configure_preferences | ✅ setup_buying_preferences |
| Journey 11 | Register/Update Suppliers | ✅ COMPLETO | Supplier Management Agent | ✅ onboarding_supplier |
| Journey 12 | Managing Master List | 🔴 NO | Masterlist Modifier Agent (edit mode) | 🔴 NO IMPLEMENTADO |
| **F. ERROR HANDLING** |
| Journey 13 | No Pricing Available | 🔴 NO | Special flow with supplier contact | 🔴 NO IMPLEMENTADO |
| Journey 14 | Supplier Not Registered | 🟡 PARCIAL | Inline registration | 🟡 Puede funcionar pero no documentado |
| Journey 15 | General Questions/Help | 🟡 PARCIAL | Customer Agent (no tools) | 🟡 Funciona pero no optimizado |

### 📊 Coverage Summary

- ✅ **COMPLETO:** 3/15 (20%)
- 🟡 **PARCIAL:** 7/15 (47%)
- 🔴 **FALTA:** 5/15 (33%)

**Journeys críticos que faltan:**
1. 🔴 Journey 5: Product Recommendations
2. 🔴 Journey 7: Price Approval/Negotiation
3. 🔴 Journey 8: Order Tracking & Status
4. 🔴 Journey 9: Order History & Reports
5. 🔴 Journey 13: No Pricing Available Flow

---

## 5️⃣ SUB-AGENTS: Current vs. Proposed

### 🔴 PROPUESTOS (Documento) - NO IMPLEMENTADOS

| Sub-Agent | Purpose | Tools | Status |
|-----------|---------|-------|--------|
| **1. Purchase Order Creator Agent** | Crea órdenes de compra optimizadas | match_master_list, get_preferences, get_prices, buying_algorithm | 🔴 NO - Funcionalidad existe en tools pero no como agent |
| **2. Supplier Price Updater Agent** | Actualiza precios y mapea productos | match_supplier_mapped, update_prices, match_master_list, update_master_list_id | 🔴 NO - Tools existen pero no como agent separado |
| **3. Supplier Management Agent** | Gestiona registro de suppliers | check_supplier, create_supplier, update_supplier | 🔴 NO - onboarding_supplier existe pero no es agent |
| **4. Buying Preference Agent** | Configura preferencias y recommendations | analyze_history, configure_preferences, generate_recommendations | 🔴 NO - setup_buying_preferences existe pero no como agent |
| **5. Masterlist Modifier Agent** | Añade/edita productos en master list | add_product, generate_embeddings, categorize | 🔴 NO IMPLEMENTADO |
| **6. Quick Info Agent** | Consultas rápidas (precios, historial) | quick_lookup, price_fetch, order_history | 🔴 NO IMPLEMENTADO |
| **7. Purchase Order Executor Agent** | Ejecuta pedidos confirmados (Post-MVP) | send_order, track_status, follow_up | 🔴 NO IMPLEMENTADO (Post-MVP) |

**Observación clave:**
- Tenemos la **funcionalidad** de varios sub-agents implementada como **tools**
- Lo que NO tenemos es la **separación arquitectural** en sub-agents independientes
- Esto es un **refactor arquitectural**, no nuevas features

---

## 6️⃣ TOOLS: Current vs. Proposed

### ✅ TOOLS QUE TENEMOS (Implementados)

| Tool Name | Functionality | Maps to Proposed |
|-----------|---------------|------------------|
| `onboarding_restaurant` | Registra nuevo restaurante | ✅ Write Setup Info to Database |
| `onboarding_supplier` | Registra nuevo proveedor | ✅ Supplier Management tools |
| `setup_buying_preferences` | Configura preferencias de compra | ✅ Buying Preference Agent tools |
| `search_products_vector` | Búsqueda vectorial en master_list | ✅ Identify Products to Master List |
| `build_shopping_cart` | Construye carrito con pricing | ✅ Parte de Purchase Order Creator |
| `execute_checkout` | Crea purchase_order | ✅ Parte de Purchase Order Executor |
| `upload_supplier_prices` | Parsea lista de precios | ✅ Supplier Price Updater tools |
| `normalize_product_list` | Mapea a master_list con vector search | ✅ Match with Existing Supplier Mapped + Proposal to Match |
| `publish_to_catalog` | Publica a pricing_history | ✅ Update Prices + Update Master List ID |
| `show_customer_menu` | Muestra menú de opciones | ✅ UX pattern (pero no se usa siempre) |
| `show_supplier_menu` | Muestra menú supplier | ✅ Supplier UX |
| `determine_user_type` | Detecta tipo de usuario nuevo | ✅ Router Logic component |

---

### 🔴 TOOLS QUE FALTAN (Propuestos en documento)

| Tool Name | Purpose | Priority | Complexity |
|-----------|---------|----------|------------|
| **Get User Preferences from Master List** | Retrieve preferences for specific products | 🔴 HIGH | LOW - DB query |
| **Buying Algorithm** | Optimiza selección de suppliers basado en precio, preferencias, logistics | 🔴 HIGH | MEDIUM - Requiere lógica de scoring |
| **Analyze Purchase History** | Analiza patrones, frecuencia, tendencias | 🟡 MEDIUM | MEDIUM - Analytics query |
| **Generate Recommendations** | Sugiere productos basado en histórico | 🟡 MEDIUM | MEDIUM - ML opcional |
| **Add Product to Master List** | Crea nuevo producto con embeddings | 🔴 HIGH | LOW - Similar a onboarding |
| **Check if Supplier Exists** | Valida existencia de supplier | 🟢 LOW | TRIVIAL - DB query |
| **Update Supplier Information** | Actualiza datos de supplier | 🟢 LOW | TRIVIAL - DB update |
| **Quick Product Lookup** | Búsqueda simple sin vector | 🟢 LOW | TRIVIAL - DB query |
| **Quick Price Fetch** | Fetch precios para productos específicos | 🟡 MEDIUM | LOW - DB query |
| **Historic Orders Lookup** | Consulta purchase_orders con filtros | 🟡 MEDIUM | LOW - DB query |
| **Send Order to Supplier** | Envía pedido via WhatsApp/API | 🔴 HIGH (Post-MVP) | HIGH - Integration |
| **Parse Supplier Response** | Extrae confirmación de respuesta | 🟡 MEDIUM (Post-MVP) | MEDIUM - NLP |
| **Update Order Status** | Tracking de estados de pedido | 🟡 MEDIUM (Post-MVP) | LOW - DB update |

---

## 7️⃣ DATABASE SCHEMA: Current vs. Proposed

### ✅ TENEMOS (Confirmado)

Todas las tablas propuestas en el documento:
- ✅ `master_list` (con pgvector)
- ✅ `suppliers`
- ✅ `restaurants`
- ✅ `restaurant_people`
- ✅ `supplier_mapped_products`
- ✅ `pricing_history`
- ✅ `purchase_orders`
- ✅ `purchase_order_items`
- ✅ `restaurant_product_preferences`
- ✅ `line_sessions`

### 🟡 POSIBLES GAPS EN CAMPOS

El documento menciona campos específicos que debemos verificar:

**Suppliers table:**
- ⚠️ `preferred_communication_channel` - ¿Existe?
- ⚠️ `business_type` enum - ¿Existe?
- ⚠️ `contact_method` enum - ¿Existe?

**Purchase_orders table:**
- ⚠️ `status` enum - ¿Valores: submitted, confirmed, in_transit, delivered?
- ⚠️ `tracking_number` - ¿Existe?
- ⚠️ `delivery_info` JSONB - ¿Existe?

**Master_list table:**
- ⚠️ `quality_tier` - ¿Existe?
- ⚠️ `specifications` JSONB - ¿Existe?

**Restaurant_product_preferences table:**
- ⚠️ `price_sensitivity` - ¿Existe?
- ⚠️ `quality_priority` - ¿Existe?
- ⚠️ `preferred_suppliers` array - ¿Existe?
- ⚠️ `blacklisted_suppliers` array - ¿Existe?

**Acción sugerida:** Verificar schema actual y agregar campos faltantes

---

## 8️⃣ CRITICAL GAPS - RESUMEN

### 🔴 GAPS DE ARQUITECTURA (Refactor necesario)

1. **Separación de Customer Main Agent vs. Sub-Agents**
   - Impacto: Alto
   - Esfuerzo: Alto
   - Beneficio: Context window optimizado, modularidad

2. **Pattern de 4-Option Menu obligatorio**
   - Impacto: Medio
   - Esfuerzo: Bajo
   - Beneficio: UX consistency

3. **Router Logic formalizado**
   - Impacto: Bajo
   - Esfuerzo: Bajo
   - Beneficio: Clarity, maintainability

---

### 🔴 GAPS DE FUNCIONALIDAD (Features faltantes)

**HIGH PRIORITY:**

1. **Buying Algorithm Tool**
   - Para: Journey 4, 5, 7
   - Complejidad: Media
   - Crítico para: Purchase optimization

2. **Purchase Order Creator Agent**
   - Para: Journey 4
   - Complejidad: Alta
   - Crítico para: Core purchase flow

3. **Masterlist Modifier Agent (Add Product)**
   - Para: Journey 6
   - Complejidad: Baja
   - Crítico para: Handling new products

**MEDIUM PRIORITY:**

4. **Quick Info Agent**
   - Para: Journey 3, 8, 9
   - Complejidad: Baja
   - Importante para: Information requests

5. **Analyze History + Generate Recommendations**
   - Para: Journey 5
   - Complejidad: Media
   - Importante para: Proactive selling

6. **Price Approval Flow**
   - Para: Journey 7
   - Complejidad: Media
   - Importante para: Budget control

**LOW PRIORITY (Post-MVP):**

7. **Purchase Order Executor Agent**
   - Para: Journey 4 (post-confirmation)
   - Complejidad: Alta
   - Post-MVP per documento

---

### 🔴 GAPS DE DATABASE (Schema fields)

1. **Verificar campos en suppliers table**
   - preferred_communication_channel
   - business_type enum
   - contact_method enum

2. **Verificar campos en purchase_orders**
   - status enum values
   - tracking_number
   - delivery_info JSONB

3. **Verificar campos en restaurant_product_preferences**
   - price_sensitivity
   - quality_priority
   - preferred_suppliers array
   - blacklisted_suppliers array

---

## 9️⃣ PLAN DE IMPLEMENTACIÓN SUGERIDO

### FASE 1: Quick Wins (1-2 semanas)

**Objetivo:** Mejorar UX sin cambiar arquitectura

1. ✅ Actualizar system message para mostrar 4-option menu siempre
2. ✅ Verificar y agregar campos faltantes en DB
3. ✅ Implementar Quick Info Agent (simple)
4. ✅ Implementar tool "Get User Preferences from Master List"
5. ✅ Implementar tool "Quick Price Fetch"
6. ✅ Implementar tool "Historic Orders Lookup"

**Resultado:** Journey 3, 8, 9 funcionando + mejor UX

---

### FASE 2: Core Features (2-3 semanas)

**Objetivo:** Implementar features críticas de compra

1. ✅ Implementar **Buying Algorithm Tool**
   - Scoring de suppliers
   - Price comparison
   - Preference application
   - Logistics optimization

2. ✅ Implementar **Masterlist Modifier Agent**
   - Add product tool
   - Generate embeddings
   - Categorize products

3. ✅ Implementar **Price Approval Flow**
   - Detect price anomalies
   - Request user confirmation
   - Suggest alternatives

4. ✅ Implementar **Analyze History + Recommendations**
   - Pattern analysis
   - Frequency detection
   - Seasonal trends
   - Recommendation generation

**Resultado:** Journey 4, 5, 6, 7 funcionando

---

### FASE 3: Architectural Refactor (3-4 semanas)

**Objetivo:** Migrar a arquitectura de sub-agents

1. ✅ Crear **Customer Main Agent** (orchestrator only, no tools)

2. ✅ Crear **Purchase Order Creator Agent** con tools:
   - match_master_list
   - get_preferences
   - get_prices
   - buying_algorithm

3. ✅ Crear **Supplier Price Updater Agent** con tools:
   - match_supplier_mapped
   - update_prices
   - match_master_list
   - update_master_list_id

4. ✅ Crear **Buying Preference Agent** con tools:
   - analyze_history
   - configure_preferences
   - generate_recommendations

5. ✅ Crear **Supplier Management Agent** con tools:
   - check_supplier
   - create_supplier
   - update_supplier

6. ✅ Migrar routing de Customer Main Agent a sub-agents

7. ✅ Testing exhaustivo de todos los flows

**Resultado:** Arquitectura completa como documento propone

---

### FASE 4: Post-MVP (Futuro)

**Objetivo:** Features avanzadas

1. ✅ Purchase Order Executor Agent
2. ✅ Autonomous follow-up
3. ✅ Delivery confirmation
4. ✅ Issue resolution workflows
5. ✅ Payment/invoice tracking

---

## 🎯 DECISIONES CLAVE A TOMAR

### Decisión 1: ¿Implementar arquitectura de sub-agents ahora o después?

**Opción A: Ahora (Fase 3 primero)**
- ✅ Arquitectura limpia desde el inicio
- ✅ Más fácil de mantener a largo plazo
- ❌ Más tiempo antes de lanzar features
- ❌ Requiere refactor de código existente

**Opción B: Después (Fases 1-2 primero)**
- ✅ Features rápidas para usuarios
- ✅ Validar funcionalidad antes de refactor
- ❌ Deuda técnica temporal
- ❌ Refactor posterior más costoso

**Recomendación:** Opción B (Features primero) - Validar product-market fit antes de invertir en arquitectura

---

### Decisión 2: ¿Cuáles journeys priorizar?

**Críticos para MVP:**
- ✅ Journey 4: Making a Purchase (core value)
- ✅ Journey 3: Checking Prices (information gathering)
- ✅ Journey 10: Configure Preferences (personalization)

**Importante pero no blocker:**
- 🟡 Journey 5: Recommendations (nice-to-have)
- 🟡 Journey 7: Price Approval (control)
- 🟡 Journey 8-9: Tracking & Reports (post-purchase)

**Post-MVP:**
- ⏳ Journey 13-15: Error handling edge cases
- ⏳ Purchase Order Executor automation

**Recomendación:** Focus en Journey 3, 4, 10 para MVP

---

### Decisión 3: ¿Implementar Buying Algorithm con ML o reglas?

**Opción A: Machine Learning**
- ✅ Más inteligente
- ✅ Aprende de datos
- ❌ Requiere training data
- ❌ Más complejo de debuggear
- ❌ Más tiempo de desarrollo

**Opción B: Rule-Based Scoring**
- ✅ Simple y predecible
- ✅ Fácil de debuggear
- ✅ Rápido de implementar
- ❌ Menos flexible
- ❌ Requiere ajustes manuales

**Recomendación:** Opción B para MVP, migrar a ML después con datos reales

---

## 📝 CONCLUSIONES

### ✅ LO BUENO

1. **Tenemos una base sólida:**
   - Database schema completo
   - Tools fundamentales implementados
   - Sistema de onboarding funcionando
   - User type detection implementado

2. **No estamos tan lejos:**
   - ~60% de funcionalidad core existe
   - Gaps son principalmente arquitecturales, no de features
   - Podemos lanzar MVP sin refactor completo

---

### ⚠️ LO QUE FALTA

1. **Arquitectura:**
   - Sub-agents no implementados
   - Customer Main Agent no existe
   - 4-option menu pattern no enforced

2. **Features críticas:**
   - Buying Algorithm
   - Purchase Order Creator flow completo
   - Price approval/negotiation
   - Recommendations engine
   - Order tracking & history

3. **Database fields:**
   - Algunos campos específicos pueden faltar
   - Requiere validación contra schema actual

---

### 🎯 RECOMENDACIÓN FINAL

**ENFOQUE PRAGMÁTICO:**

1. **Corto plazo (2-3 semanas):**
   - Implementar tools faltantes críticos (Buying Algorithm, Quick Info)
   - Agregar 4-option menu pattern
   - Completar Journey 3, 4 sin refactor arquitectural

2. **Mediano plazo (1-2 meses):**
   - Validar con usuarios reales
   - Iterar en features basado en feedback
   - Planear refactor arquitectural

3. **Largo plazo (3+ meses):**
   - Migrar a arquitectura de sub-agents
   - Implementar features Post-MVP
   - Optimizar performance y costs

**Esto permite:**
- ✅ Lanzar más rápido
- ✅ Validar product-market fit
- ✅ Evitar over-engineering prematuro
- ✅ Mantener flexibilidad para pivotar

---

**Siguiente paso:** Decidir qué approach tomar y crear roadmap detallado
