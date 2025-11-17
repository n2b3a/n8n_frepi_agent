# ESTRUCTURA DE BASE DE DATOS SUPABASE - FREPI MVP2

## 1. LISTA DE TODAS LAS TABLAS

### Tablas Principales del Sistema:

1. **line_sessions** - Sesiones de conversación con usuarios
2. **master_list** - Lista maestra de productos
3. **pricing_history** - Historial de precios
4. **restaurants** - Restaurantes clientes
5. **restaurant_people** - Personas/contactos de restaurantes
6. **suppliers** - Proveedores
7. **supplier_mapped_products** - Productos mapeados de proveedores
8. **purchase_orders** - Órdenes de compra
9. **restaurant_product_preferences** - Preferencias de productos por restaurante
10. **restaurant_product_preferences_history** - Historial de preferencias
11. **product_categories** - Categorías de productos
12. **user_preferences** - Preferencias de usuarios
13. **spatial_ref_sys** - Sistema de referencia espacial (PostGIS)

---

## 2. TABLAS CRÍTICAS PARA EL WORKFLOW

### 2.1 LINE_SESSIONS
**Primary Key:** session_id (VARCHAR 100, NOT NULL)

**Columnas Principales:**
- session_id: VARCHAR(100) NOT NULL - PK
- restaurant_id: INTEGER - FK → restaurants(id)
- person_id: INTEGER - FK → restaurant_people(id)
- parent_session_id: VARCHAR(100) - FK → line_sessions(session_id) (auto-referencia)
- channel_type: channel_type_enum
- channel_id: VARCHAR(100)
- platform_session_id: VARCHAR(255)

**Timestamps:**
- session_start: TIMESTAMPTZ (DEFAULT now())
- session_end: TIMESTAMPTZ
- last_activity_at: TIMESTAMPTZ (DEFAULT now())
- created_at: TIMESTAMPTZ (DEFAULT now())
- updated_at: TIMESTAMPTZ (DEFAULT now())

**Métricas de Sesión:**
- duration_minutes: INTEGER
- message_count: INTEGER (DEFAULT 0)
- user_messages: INTEGER (DEFAULT 0)
- bot_messages: INTEGER (DEFAULT 0)
- response_time_avg: INTEGER

**Clasificación:**
- session_complexity: session_complexity_enum (simple, moderate, complex)
- inquiry_type: inquiry_type_enum
- primary_intent: VARCHAR(100)
- session_type: session_type_enum

**Datos JSON:**
- products_discussed: JSONB
- suppliers_mentioned: JSONB
- categories_explored: JSONB

**AI y Analytics:**
- ai_model_version: VARCHAR(50)
- total_ai_calls: INTEGER (DEFAULT 0)
- embeddings_used: INTEGER (DEFAULT 0)
- recommendations_made: INTEGER (DEFAULT 0)
- recommendations_accepted: INTEGER (DEFAULT 0)

**Análisis de Sentimiento:**
- dominant_language: VARCHAR(10)
- sentiment_overall: sentiment_enum (positive, neutral, negative)
- sentiment_scores: JSONB
- emotion_detected: JSONB
- urgency_level: urgency_level_enum

**Preferencias y Aprendizaje:**
- preferences_captured: JSONB
- new_preferences: JSONB
- preference_confidence: JSONB
- behavioral_signals: JSONB
- learning_opportunities: JSONB

**Resultados:**
- session_goal_achieved: BOOLEAN
- conversion_occurred: BOOLEAN (DEFAULT false)
- order_value: NUMERIC
- satisfaction_level: NUMERIC
- resolution_status: resolution_status_enum (resolved, pending, escalated)

**Follow-up:**
- follow_up_required: BOOLEAN (DEFAULT false)
- follow_up_type: follow_up_type_enum
- follow_up_scheduled_at: TIMESTAMPTZ
- follow_up_completed: BOOLEAN (DEFAULT false)

**Quality y Analytics:**
- learning_value: NUMERIC
- pattern_match: JSONB
- anomalies_detected: JSONB
- improvement_suggestions: JSONB
- quality_score: NUMERIC

**Escalation:**
- escalation_required: BOOLEAN (DEFAULT false)
- escalation_reason: TEXT
- escalated_to: VARCHAR(100)
- escalation_resolved: BOOLEAN (DEFAULT false)

**Notas:**
- session_notes: TEXT
- internal_tags: JSONB

**Continuación:**
- awaiting_continuation: BOOLEAN (DEFAULT false)
- continuation_timestamp: TIMESTAMP

**Índices:**
- idx_line_sessions_date ON (session_start DESC)
- idx_line_sessions_person ON (person_id)
- idx_line_sessions_restaurant ON (restaurant_id)

---

### 2.2 MASTER_LIST
**Primary Key:** id (BIGINT, AUTO-INCREMENT)

**Columnas Principales:**
- id: BIGINT NOT NULL (AUTO) - PK
- product_name: VARCHAR(255) NOT NULL
- product_description: TEXT
- brand: VARCHAR(255)
- barcode_ean: VARCHAR(50)

**Categorización:**
- base_category_id: INTEGER
- product_category_id: INTEGER - FK → product_categories(id)
- product_tags: JSONB
- quality_tier: quality_tier_enum (premium, standard, economy)

**Relación con Restaurante:**
- restaurant_id: INTEGER - FK → restaurants(id)

**Embeddings:**
- embedding_vector: JSONB
- embedding_vector_v2: VECTOR (tipo nativo de pgvector)
- embedding_version: VARCHAR(50)
- embedding_created_at: TIMESTAMPTZ

**Búsqueda y Matching:**
- search_frequency: INTEGER (DEFAULT 0)
- match_confidence_avg: NUMERIC
- alternative_names: JSONB
- synonym_variations: JSONB
- common_misspellings: JSONB

**Especificaciones:**
- specifications: JSONB

**Disponibilidad:**
- seasonal_availability: JSONB
- peak_season_months: JSONB
- availability_score: NUMERIC

**Popularidad:**
- total_orders: INTEGER (DEFAULT 0)
- last_ordered_at: TIMESTAMPTZ
- popularity_score: NUMERIC (DEFAULT 0)
- trend_indicator: trend_indicator_enum (rising, stable, declining)

**Auditoría:**
- created_at: TIMESTAMPTZ (DEFAULT now())
- updated_at: TIMESTAMPTZ (DEFAULT now())
- created_by: INTEGER
- is_active: BOOLEAN (DEFAULT true)
- is_verified: BOOLEAN (DEFAULT false)

**Wallet Share:**
- wallet_spend_share_position: NUMERIC

**Índices:**
- idx_master_list_active ON (is_active) WHERE (is_active = true)
- idx_master_list_category ON (product_category_id)
- idx_master_list_embedding_v2 ON embedding_vector_v2 (HNSW vector_cosine_ops)
- idx_master_list_search_freq ON (search_frequency DESC)

---

### 2.3 PRICING_HISTORY
**Primary Key:** id (BIGINT, AUTO-INCREMENT)

**Columnas Principales:**
- id: BIGINT NOT NULL (AUTO) - PK
- supplier_id: INTEGER - FK → suppliers(id)
- master_list_id: BIGINT - FK → master_list(id)
- supplier_mapped_product_id: BIGINT - FK → supplier_mapped_products(id)

**Precio:**
- unit_price: NUMERIC NOT NULL
- currency: VARCHAR(3) (DEFAULT 'EUR')

**NOTA:** Esta tabla tiene más columnas. Necesitamos leer más del archivo para ver todas.

**Índices:**
- idx_pricing_history_date ON (effective_date DESC)
- idx_pricing_history_product ON (master_list_id)
- idx_pricing_history_supplier ON (supplier_id)

---

### 2.4 RESTAURANTS
**Primary Key:** id (INTEGER, AUTO-INCREMENT)

**Foreign Keys:**
- Recibe FK de: line_sessions, restaurant_people, purchase_orders, master_list, restaurant_product_preferences

**Índices:**
- idx_restaurants_active ON (is_active) WHERE (is_active = true)
- idx_restaurants_location ON (coordinates) USING GIST
- idx_restaurants_segment ON (customer_segment)

---

### 2.5 RESTAURANT_PEOPLE
**Primary Key:** id (INTEGER, AUTO-INCREMENT)

**Foreign Keys:**
- restaurant_id → restaurants(id)
- reports_to_id → restaurant_people(id) (auto-referencia)
- Recibe FK de: line_sessions, purchase_orders, user_preferences, restaurant_product_preferences

**Índices:**
- idx_restaurant_people_active ON (is_active) WHERE (is_active = true)
- idx_restaurant_people_restaurant ON (restaurant_id)

---

### 2.6 SUPPLIERS
**Primary Key:** id (INTEGER, AUTO-INCREMENT)

**Foreign Keys:**
- Recibe FK de: pricing_history, purchase_orders, supplier_mapped_products

**Índices:**
- idx_suppliers_active ON (is_active) WHERE (is_active = true)
- idx_suppliers_contact_method ON (preferred_contact_method)
- idx_suppliers_location ON (coordinates) USING GIST

---

### 2.7 SUPPLIER_MAPPED_PRODUCTS
**Primary Key:** id (BIGINT, AUTO-INCREMENT)

**Foreign Keys:**
- supplier_id → suppliers(id)
- master_list_id → master_list(id)
- Recibe FK de: pricing_history

**Índices:**
- idx_supplier_mapped_products_confidence ON (mapping_confidence DESC)
- idx_supplier_mapped_products_master ON (master_list_id)
- idx_supplier_mapped_products_price ON (current_unit_price)
- idx_supplier_mapped_products_supplier ON (supplier_id)

---

### 2.8 PURCHASE_ORDERS
**Primary Key:** order_id (tipo desconocido - necesitamos ver más del archivo)

**Foreign Keys:**
- restaurant_id → restaurants(id)
- supplier_id → suppliers(id)
- session_id → line_sessions(session_id)
- ordered_by_person_id → restaurant_people(id)

**Índices:**
- idx_purchase_orders_date ON (order_date DESC)
- idx_purchase_orders_restaurant ON (restaurant_id)
- idx_purchase_orders_supplier ON (supplier_id)

---

## 3. TODOS LOS ENUMs RELEVANTES

### Channel & Communication
- **channel_type_enum**: whatsapp, telegram, web, mobile, phone, email
- **communication_style_enum**: formal, casual, technical
- **contact_method_enum**: email, whatsapp, phone, website, portal, fax, in_person

### Session Types
- **session_type_enum**: discovery, negotiation, transactional, support, setup, purchase
- **session_complexity_enum**: simple, moderate, complex
- **inquiry_type_enum**: product_search, price_check, order_placement, support, information, complaint

### Sentiment & Urgency
- **sentiment_enum**: positive, neutral, negative
- **urgency_level_enum**: low, normal, high, critical

### Resolution & Follow-up
- **resolution_status_enum**: resolved, pending, escalated
- **follow_up_type_enum**: call, email, whatsapp, none

### Product & Quality
- **quality_tier_enum**: premium, standard, economy
- **trend_indicator_enum**: rising, stable, declining
- **quality_vs_master_enum**: same, better, worse, unknown
- **brand_vs_master_enum**: same, different, generic
- **size_vs_master_enum**: same, larger, smaller

### Business & Market
- **restaurant_type_enum**: restaurant, cafe, bistro, brasserie, hotel, catering
- **business_type_enum**: wholesaler, distributor, manufacturer, local_producer
- **company_size_enum**: small, medium, large
- **customer_base_size_enum**: small, medium, large
- **market_position_enum**: premium, mid-market, budget
- **market_position_price_enum**: below, at, above, premium

### Customer Segmentation
- **customer_segment_enum**: premium, standard, budget, new, loyal, at_risk
- **lifecycle_stage_enum**: prospect, new, growing, mature, declining
- **value_tier_enum**: high, medium, low
- **engagement_level_enum**: low, medium, high

### Orders & Delivery
- **order_status_enum**: pending, confirmed, prepared, shipped, delivered, cancelled
- **order_type_enum**: regular, emergency, bulk
- **order_complexity_enum**: simple, moderate, complex
- **delivery_status_enum**: scheduled, in_transit, delivered, failed
- **fulfillment_status_enum**: full, partial, failed
- **payment_status_enum**: pending, paid, overdue

### Pricing & Availability
- **price_trend_enum**: up, down, stable
- **price_competitiveness_enum**: low, competitive, high
- **pricing_update_frequency_enum**: daily, weekly, monthly, quarterly, seasonal, irregular
- **availability_status_enum**: available, limited, out_of_stock, discontinued
- **demand_level_enum**: low, normal, high, peak
- **supply_level_enum**: shortage, low, normal, surplus

### People & Roles
- **role_category_enum**: owner, manager, chef, sous_chef, buyer, staff
- **seniority_level_enum**: junior, mid, senior, exec
- **user_type_enum**: power_user, regular, casual
- **ai_comfort_level_enum**: low, medium, high

### Data & Mapping
- **data_source_enum**: supplier, scraping, manual, api, import
- **mapping_method_enum**: manual, ai_matched, verified, customer_confirmed
- **verification_status_enum**: pending, verified, rejected
- **verification_status_price_enum**: unverified, verified, disputed

### Analytics & Behavior
- **priority_level_enum**: low, normal, high, urgent
- **risk_level_enum**: low, medium, high
- **compliance_status_enum**: compliant, warning, failed
- **credit_rating_enum**: excellent, good, fair, poor

### Business Metrics
- **revenue_range_enum**: 0-100k, 100k-500k, 500k+
- **growth_trajectory_enum**: growing, stable, declining
- **category_maturity_enum**: emerging, growing, mature, declining
- **decision_speed_enum**: fast, normal, slow
- **negotiation_style_enum**: aggressive, balanced, passive
- **research_depth_enum**: minimal, moderate, thorough
- **learning_speed_enum**: slow, normal, fast
- **feedback_frequency_enum**: never, rare, occasional, frequent

---

## 4. FOREIGN KEYS Y RELACIONES

### LINE_SESSIONS
```
parent_session_id → line_sessions(session_id) [AUTO-REFERENCIA]
person_id → restaurant_people(id)
restaurant_id → restaurants(id)
```

### MASTER_LIST
```
product_category_id → product_categories(id)
restaurant_id → restaurants(id)
```

### PRICING_HISTORY
```
master_list_id → master_list(id)
supplier_id → suppliers(id)
supplier_mapped_product_id → supplier_mapped_products(id)
```

### PRODUCT_CATEGORIES
```
parent_category_id → product_categories(id) [AUTO-REFERENCIA]
```

### PURCHASE_ORDERS
```
ordered_by_person_id → restaurant_people(id)
restaurant_id → restaurants(id)
session_id → line_sessions(session_id)
supplier_id → suppliers(id)
```

### RESTAURANT_PEOPLE
```
reports_to_id → restaurant_people(id) [AUTO-REFERENCIA]
restaurant_id → restaurants(id)
```

### RESTAURANT_PRODUCT_PREFERENCES
```
brand_preferences_added_by → restaurant_people(id)
frequency_added_by → restaurant_people(id)
master_list_id → master_list(id)
payment_preference_added_by → restaurant_people(id)
price_preference_added_by → restaurant_people(id)
quality_preference_added_by → restaurant_people(id)
quantity_preference_added_by → restaurant_people(id)
restaurant_id → restaurants(id)
specification_preference_added_by → restaurant_people(id)
tracked_only_added_by → restaurant_people(id)
```

### RESTAURANT_PRODUCT_PREFERENCES_HISTORY
```
changed_by → restaurant_people(id)
preference_id → restaurant_product_preferences(id) [ON DELETE CASCADE]
session_id → line_sessions(session_id)
```

### SUPPLIER_MAPPED_PRODUCTS
```
master_list_id → master_list(id)
supplier_id → suppliers(id)
```

### USER_PREFERENCES
```
master_list_id → master_list(id)
person_id → restaurant_people(id)
restaurant_id → restaurants(id)
```

**Regla de Actualización/Eliminación:** NO ACTION (por defecto en todas excepto CASCADE en restaurant_product_preferences_history)

---

## 5. VALIDACIONES IMPORTANTES

### UNIQUE Constraints
- **line_sessions**: session_id (PK)
- **master_list**: id (PK)
- **pricing_history**: id (PK)
- **product_categories**: 
  - id (PK)
  - category_slug (UNIQUE)
- **purchase_orders**: order_id (PK)
- **restaurant_people**: id (PK)
- **restaurant_product_preferences**: 
  - id (PK)
  - (restaurant_id, master_list_id) UNIQUE COMPOSITE
- **restaurants**: id (PK)
- **supplier_mapped_products**: id (PK)
- **suppliers**: id (PK)
- **user_preferences**: id (PK)

### NOT NULL Fields (Campos Críticos)

**line_sessions:**
- session_id (PK)

**master_list:**
- id (PK)
- product_name

**pricing_history:**
- id (PK)
- unit_price

### DEFAULT Values Importantes

**line_sessions:**
- session_start: now()
- last_activity_at: now()
- message_count: 0
- user_messages: 0
- bot_messages: 0
- total_ai_calls: 0
- embeddings_used: 0
- recommendations_made: 0
- recommendations_accepted: 0
- conversion_occurred: false
- follow_up_required: false
- follow_up_completed: false
- escalation_required: false
- escalation_resolved: false
- awaiting_continuation: false
- created_at: now()
- updated_at: now()

**master_list:**
- search_frequency: 0
- total_orders: 0
- popularity_score: 0
- is_active: true
- is_verified: false
- created_at: now()
- updated_at: now()

**pricing_history:**
- currency: 'EUR'

### Constraints Especiales

**GIS/Spatial:**
- restaurants.coordinates: GIST index (PostGIS geometry)
- suppliers.coordinates: GIST index (PostGIS geometry)

**Vector Search:**
- master_list.embedding_vector_v2: HNSW index con vector_cosine_ops

**Partial Indexes (WHERE clauses):**
- Todos los índices de is_active están filtrados: WHERE (is_active = true)

---

## 6. FUNCIONES Y TRIGGERS

### Trigger Functions

**update_updated_at_column()**
- Usado en: line_sessions, master_list, pricing_history, product_categories, purchase_orders, restaurant_people, restaurants, supplier_mapped_products, suppliers
- Timing: BEFORE UPDATE
- Acción: Actualiza automáticamente el campo updated_at

**update_restaurant_product_preferences_updated_at()**
- Usado en: restaurant_product_preferences
- Timing: BEFORE UPDATE
- Acción: Actualiza updated_at en restaurant_product_preferences

### Triggers Activos

```sql
-- Todos BEFORE UPDATE triggers
update_line_sessions_updated_at
update_master_list_updated_at
update_pricing_history_updated_at
update_product_categories_updated_at
update_purchase_orders_updated_at
update_restaurant_people_updated_at
trigger_update_restaurant_product_preferences_updated_at
update_restaurants_updated_at
update_supplier_mapped_products_updated_at
update_suppliers_updated_at
```

### Funciones RPC

**NOTA:** El archivo contiene muchas funciones de PostGIS (geometrías espaciales). No se identificaron funciones RPC custom específicas del negocio en la sección revisada.

---

## 7. NOTAS IMPORTANTES PARA WORKFLOWS

### Claves para Inserción de Datos:

1. **line_sessions** requiere solo session_id (NOT NULL)
   - Todos los demás campos opcionales con defaults
   - restaurant_id y person_id son opcionales pero críticos para analytics

2. **master_list** requiere solo product_name (NOT NULL)
   - id es auto-increment
   - is_active default true
   - is_verified default false

3. **pricing_history** requiere solo unit_price (NOT NULL)
   - currency default 'EUR'

### Relaciones Críticas para Workflows:

1. **Flujo de Sesión → Orden:**
   ```
   line_sessions → purchase_orders (via session_id)
   ```

2. **Flujo de Producto:**
   ```
   master_list ← supplier_mapped_products (via master_list_id)
   supplier_mapped_products → suppliers (via supplier_id)
   ```

3. **Flujo de Pricing:**
   ```
   supplier_mapped_products → pricing_history (via supplier_mapped_product_id)
   master_list → pricing_history (via master_list_id)
   ```

4. **Flujo de Usuario:**
   ```
   restaurants → restaurant_people (via restaurant_id)
   restaurant_people → line_sessions (via person_id)
   restaurant_people → purchase_orders (via ordered_by_person_id)
   ```

### Campos JSONB Importantes:

**line_sessions:**
- products_discussed
- suppliers_mentioned
- categories_explored
- sentiment_scores
- preferences_captured
- behavioral_signals

**master_list:**
- product_tags
- alternative_names
- synonym_variations
- specifications
- seasonal_availability


---

## 8. INFORMACIÓN ADICIONAL NECESARIA

### Tablas que Requieren Definición Completa:

Las siguientes tablas están referenciadas en las Foreign Keys pero sus columnas completas no están en la sección inicial del archivo. Se requiere consulta directa a Supabase para obtener sus definiciones completas:

#### RESTAURANTS
- **Primary Key:** id (INTEGER)
- **Índices conocidos:**
  - is_active (partial index WHERE is_active = true)
  - coordinates (GIST index para búsquedas geoespaciales)
  - customer_segment
- **Campos conocidos por FKs:**
  - id (PK)
  - coordinates (geometry - PostGIS)
  - customer_segment (customer_segment_enum)
  - is_active (boolean)

#### RESTAURANT_PEOPLE
- **Primary Key:** id (INTEGER)
- **Foreign Keys conocidos:**
  - restaurant_id → restaurants(id)
  - reports_to_id → restaurant_people(id) [jerarquía organizacional]
- **Índices conocidos:**
  - is_active (partial index WHERE is_active = true)
  - restaurant_id

#### SUPPLIERS
- **Primary Key:** id (INTEGER)
- **Índices conocidos:**
  - is_active (partial index WHERE is_active = true)
  - preferred_contact_method
  - coordinates (GIST index para búsquedas geoespaciales)
- **Campos conocidos:**
  - id (PK)
  - preferred_contact_method (contact_method_enum)
  - coordinates (geometry - PostGIS)
  - is_active (boolean)

#### SUPPLIER_MAPPED_PRODUCTS
- **Primary Key:** id (BIGINT)
- **Foreign Keys:**
  - supplier_id → suppliers(id)
  - master_list_id → master_list(id)
- **Índices conocidos:**
  - mapping_confidence (DESC)
  - master_list_id
  - current_unit_price
  - supplier_id
- **Campos inferidos:**
  - id (PK)
  - supplier_id
  - master_list_id
  - mapping_confidence (numeric)
  - current_unit_price (numeric)

#### PURCHASE_ORDERS (Definición Parcial)
- **Primary Key:** order_id
- **Foreign Keys:**
  - restaurant_id → restaurants(id)
  - supplier_id → suppliers(id)
  - session_id → line_sessions(session_id)
  - ordered_by_person_id → restaurant_people(id)
- **Índices conocidos:**
  - order_date (DESC)
  - restaurant_id
  - supplier_id
- **Campos inferidos:**
  - order_id (PK)
  - restaurant_id
  - supplier_id
  - session_id
  - ordered_by_person_id
  - order_date (timestamp)

---

## 9. RECOMENDACIONES PARA ACTUALIZAR WORKFLOWS N8N

### Consideraciones Importantes:

1. **Validación de ENUMs:** Todos los valores de enum deben validarse antes de insertar datos

2. **Campos JSONB:** Utilizar estructura JSON válida para campos:
   - products_discussed
   - suppliers_mentioned
   - preferences_captured
   - etc.

3. **Foreign Keys Opcionales:** La mayoría de FKs son opcionales (nullable), pero su presencia mejora el analytics

4. **Timestamps Automáticos:** Los triggers se encargan de updated_at automáticamente

5. **Índices Parciales:** Queries sobre tablas grandes deben incluir filtro `is_active = true` para usar índices parciales

### Queries Críticas para Workflows:

```sql
-- Buscar sesión activa por usuario
SELECT * FROM line_sessions 
WHERE person_id = $1 
AND awaiting_continuation = true 
ORDER BY last_activity_at DESC 
LIMIT 1;

-- Buscar productos por embedding (vector search)
SELECT * FROM master_list 
WHERE is_active = true
ORDER BY embedding_vector_v2 <=> $1::vector 
LIMIT 10;

-- Obtener precios actuales de un producto
SELECT ph.*, s.name as supplier_name
FROM pricing_history ph
JOIN suppliers s ON ph.supplier_id = s.id
WHERE ph.master_list_id = $1
ORDER BY ph.effective_date DESC;

-- Preferencias de restaurante por producto
SELECT rpp.*, ml.product_name
FROM restaurant_product_preferences rpp
JOIN master_list ml ON rpp.master_list_id = ml.id
WHERE rpp.restaurant_id = $1 
AND rpp.is_active = true;
```

### Flujo de Inserción Recomendado:

1. **Nueva Sesión:**
   ```
   INSERT INTO line_sessions (session_id, channel_type, channel_id)
   VALUES ($1, $2, $3)
   RETURNING *;
   ```

2. **Actualizar Sesión:**
   ```
   UPDATE line_sessions 
   SET last_activity_at = now(),
       message_count = message_count + 1,
       products_discussed = $2
   WHERE session_id = $1;
   ```

3. **Crear Orden:**
   ```
   INSERT INTO purchase_orders 
   (restaurant_id, supplier_id, session_id, ordered_by_person_id)
   VALUES ($1, $2, $3, $4)
   RETURNING order_id;
   ```

4. **Registrar Precio:**
   ```
   INSERT INTO pricing_history 
   (supplier_id, master_list_id, unit_price, effective_date)
   VALUES ($1, $2, $3, now());
   ```

---

## 10. CHECKLIST PARA DESARROLLO DE WORKFLOWS

- [ ] Validar todos los valores de ENUM antes de insertar
- [ ] Manejar campos JSONB con estructura válida
- [ ] Usar transacciones para operaciones multi-tabla
- [ ] Capturar session_id para tracking completo
- [ ] Actualizar last_activity_at en cada interacción
- [ ] Registrar embeddings para productos nuevos
- [ ] Verificar is_active en todas las queries de lectura
- [ ] Implementar retry logic para FK violations
- [ ] Loguear errores de inserción para debugging
- [ ] Monitorear performance de vector search (HNSW)

