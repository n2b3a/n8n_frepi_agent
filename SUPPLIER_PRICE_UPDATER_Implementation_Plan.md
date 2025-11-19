# 📋 PLAN DE IMPLEMENTACIÓN - Supplier Price Updater Agent

**Fecha:** 2025-01-18
**Feature:** Actualización de precios de suppliers por restaurantes
**Arquitectura:** Sub-agent dentro de Customer Journey Agent

---

## 🎯 RESUMEN EJECUTIVO

**Objetivo:** Permitir que restaurantes reporten listas de precios de suppliers y el sistema las almacene, mapee a master_list, y use para recomendaciones de compra.

**Arquitectura Propuesta:**
```
Customer Journey Agent
    ↓ (cuando usuario menciona precios)
Supplier Price Updater Agent (SUB-AGENT)
    ├─ Tool: match_with_existing_supplier_mapped
    ├─ Tool: update_prices
    ├─ Tool: proposal_to_match_master_list
    └─ Tool: confirm_master_list_matches
```

---

## 📊 FLUJO COMPLETO DE USUARIO

```
1. Usuario envía lista de precios
   Usuario: "Recebi cotação:
            picanha R$ 47/kg
            arroz R$ 28/saco"

2. Customer Journey Agent detecta → delega a Supplier Price Updater Agent

3. Supplier Price Updater Agent pregunta supplier
   Bot: "De qual fornecedor você recebeu essa cotação?"

4. Usuario responde
   Usuario: "Friboi"

5. Agent procesa con Tool: match_with_existing_supplier_mapped
   - Busca supplier "Friboi" en DB
   - Para cada producto:
     a) Vector search en supplier_mapped_products (supplier_id + nombre)
     b) Si encuentra: usa supplier_mapped_product_id existente
     c) Si NO encuentra: crea nuevo con master_list_id = null
   - Agrupa: WITH master_list_id vs WITHOUT master_list_id

6. Agent llama Tool: update_prices
   - Para productos WITH master_list_id:
     → Inserta en pricing_history

7. Agent llama Tool: proposal_to_match_master_list
   - Para productos WITHOUT master_list_id:
     → Vector search en master_list
     → Retorna propuestas con similarity >70%

8. Agent presenta resultados al usuario
   Bot: "✅ Preços atualizados para 1 produto!

        📦 Picanha - Friboi
        💰 R$ 47,00/kg
        ✅ Já vinculado ao catálogo mestre

        ⚠️ Novo produto detectado:
        📦 Arroz - Friboi
        💰 R$ 28,00/saco

        Encontrei uma possível correspondência:
        🔗 Arroz branco Camil 5kg (87% similar)

        É o mesmo produto? (sim/não)"

9. Usuario confirma
   Usuario: "sim"

10. Agent llama Tool: confirm_master_list_matches
    - Actualiza supplier_mapped_products con master_list_id
    - Inserta en pricing_history

11. Agent confirma final
    Bot: "Perfeito! ✅

         Todos os preços foram atualizados e vinculados!

         📊 Resumo:
         • 2 produtos processados
         • Fornecedor: Friboi
         • Próxima compra: esses preços serão usados!"
```

---

## 🗄️ SCHEMA DE BASE DE DATOS

### supplier_mapped_products (Existente)

**Campos inferidos:**
```sql
CREATE TABLE supplier_mapped_products (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  supplier_id INTEGER NOT NULL REFERENCES suppliers(id),
  master_list_id INTEGER NULL REFERENCES master_list(id),
  supplier_product_name TEXT NOT NULL,
  embedding vector(1536),
  mapping_confidence DECIMAL(5,4),
  current_unit_price NUMERIC,
  unit VARCHAR(50),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices
CREATE INDEX idx_supplier_mapped_products_supplier ON supplier_mapped_products(supplier_id);
CREATE INDEX idx_supplier_mapped_products_master ON supplier_mapped_products(master_list_id);
CREATE INDEX idx_supplier_mapped_products_confidence ON supplier_mapped_products(mapping_confidence DESC);
CREATE INDEX idx_supplier_mapped_products_embedding ON supplier_mapped_products USING ivfflat (embedding vector_cosine_ops);
```

### restaurant_supplier_relationships (NUEVA - A CREAR)

**Propósito:** Trackear qué suppliers conoce cada restaurante

```sql
CREATE TABLE restaurant_supplier_relationships (
  id BIGSERIAL PRIMARY KEY,
  restaurant_id INTEGER NOT NULL REFERENCES restaurants(id),
  supplier_id INTEGER NOT NULL REFERENCES suppliers(id),

  -- Metadata
  relationship_type VARCHAR(50) DEFAULT 'price_reporting', -- price_reporting, purchase_history, preferred
  first_interaction_date TIMESTAMPTZ DEFAULT NOW(),
  last_interaction_date TIMESTAMPTZ DEFAULT NOW(),

  -- Stats
  price_updates_count INTEGER DEFAULT 0,
  purchases_count INTEGER DEFAULT 0,
  total_spent NUMERIC DEFAULT 0,

  -- Status
  is_active BOOLEAN DEFAULT TRUE,
  is_preferred BOOLEAN DEFAULT FALSE,

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  -- Constraint: un restaurante no puede tener duplicado con mismo supplier
  UNIQUE(restaurant_id, supplier_id)
);

-- Índices
CREATE INDEX idx_restaurant_supplier_restaurant ON restaurant_supplier_relationships(restaurant_id);
CREATE INDEX idx_restaurant_supplier_supplier ON restaurant_supplier_relationships(supplier_id);
CREATE INDEX idx_restaurant_supplier_active ON restaurant_supplier_relationships(is_active) WHERE is_active = TRUE;
```

**Trigger para update timestamp:**
```sql
CREATE OR REPLACE FUNCTION update_restaurant_supplier_relationships_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_restaurant_supplier_relationships_updated_at
BEFORE UPDATE ON restaurant_supplier_relationships
FOR EACH ROW
EXECUTE FUNCTION update_restaurant_supplier_relationships_updated_at();
```

---

## 🛠️ IMPLEMENTACIÓN - FASE POR FASE

---

## FASE 0: Database Setup (0.5 días)

### Task 0.1: Crear tabla restaurant_supplier_relationships

**Script SQL:**
```sql
-- Ver arriba: restaurant_supplier_relationships
```

**Validación:**
```sql
-- Verificar tabla creada
SELECT table_name, column_name, data_type
FROM information_schema.columns
WHERE table_name = 'restaurant_supplier_relationships'
ORDER BY ordinal_position;

-- Test insert
INSERT INTO restaurant_supplier_relationships (restaurant_id, supplier_id)
VALUES (1, 1);

-- Verify unique constraint works
INSERT INTO restaurant_supplier_relationships (restaurant_id, supplier_id)
VALUES (1, 1); -- Should fail with unique violation
```

---

## FASE 1: Tools (3 días)

---

### Task 1.1: Tool - match_with_existing_supplier_mapped (1 día)

**Archivo:** `match_with_existing_supplier_mapped_COMPLETE.js`

**Propósito:**
- Buscar/crear registros en supplier_mapped_products
- Matching dual: vector search + master_list_id previo

**Input:**
```javascript
{
  restaurant_id: 123,
  supplier_name: "Friboi",
  products: [
    { name: "picanha", price: 47.00, unit: "kg" },
    { name: "arroz", price: 28.00, unit: "saco" }
  ]
}
```

**Logic:**
1. Buscar supplier por nombre (fuzzy match)
2. Si NO existe supplier: retornar error pidiendo registro
3. Si existe supplier:
   - Para cada producto:
     a) **Búsqueda 1:** supplier_id + vector search del nombre
        - Genera embedding del nombre
        - Busca en supplier_mapped_products con cosine similarity
     b) **Búsqueda 2:** supplier_id + master_list_id previo
        - Si el restaurante ya compró este producto antes, usar ese mapping
     c) Si encuentra (cualquiera de las dos búsquedas):
        - Usar supplier_mapped_product_id existente
     d) Si NO encuentra:
        - Crear nuevo registro con master_list_id = null
        - Generar embedding
4. Crear/actualizar relationship en restaurant_supplier_relationships
5. Agrupar productos: WITH master_list_id vs WITHOUT

**Output:**
```javascript
{
  supplier_id: 5,
  supplier_name: "Friboi",
  relationship_created: true,
  products_with_master_list_id: [
    {
      supplier_mapped_product_id: 78,
      supplier_product_name: "picanha",
      master_list_id: 45,
      master_list_product_name: "Carne bovina - Picanha",
      new_price: 47.00,
      unit: "kg",
      matched_by: "vector_search" // or "previous_purchase"
    }
  ],
  products_without_master_list_id: [
    {
      supplier_mapped_product_id: 156,
      supplier_product_name: "arroz",
      master_list_id: null,
      new_price: 28.00,
      unit: "saco",
      newly_created: true
    }
  ]
}
```

---

### Task 1.2: Tool - update_prices (0.5 días)

**Archivo:** `update_prices_COMPLETE.js`

**Propósito:** Insertar precios en pricing_history para productos CON master_list_id

**Input:**
```javascript
{
  restaurant_id: 123,
  supplier_id: 5,
  products: [
    {
      supplier_mapped_product_id: 78,
      master_list_id: 45,
      new_price: 47.00,
      unit: "kg"
    }
  ],
  effective_date: "2025-01-18" // opcional, default TODAY
}
```

**Logic:**
1. Para cada producto:
   - Insert en pricing_history
   - Actualizar current_unit_price en supplier_mapped_products
2. Actualizar last_interaction_date en restaurant_supplier_relationships
3. Incrementar price_updates_count

**Output:**
```javascript
{
  success: true,
  prices_updated: 1,
  pricing_history_ids: [1234],
  message: "Preços atualizados com sucesso!"
}
```

---

### Task 1.3: Tool - proposal_to_match_master_list (1 día)

**Archivo:** `proposal_to_match_master_list_COMPLETE.js`

**Propósito:** Vector search en master_list para productos SIN master_list_id

**Input:**
```javascript
{
  products: [
    {
      supplier_mapped_product_id: 156,
      supplier_product_name: "arroz",
      unit: "saco"
    }
  ]
}
```

**Logic:**
1. Para cada producto:
   - Obtener embedding del supplier_product_name (ya debe existir en supplier_mapped_products)
   - Vector search en master_list
   - Filtrar por similarity >0.70 (70%)
   - Retornar top 3 matches ordenados por similarity

**Output:**
```javascript
{
  proposals: [
    {
      supplier_mapped_product_id: 156,
      supplier_product_name: "arroz",
      proposed_matches: [
        {
          master_list_id: 78,
          product_name: "Arroz branco Camil 5kg",
          similarity_score: 0.87,
          confidence: "high" // high >0.85, medium >0.75, low >0.70
        },
        {
          master_list_id: 79,
          product_name: "Arroz integral Uncle Ben's 1kg",
          similarity_score: 0.73,
          confidence: "medium"
        }
      ],
      has_matches: true
    }
  ],
  products_with_matches: 1,
  products_without_matches: 0
}
```

---

### Task 1.4: Tool - confirm_master_list_matches (0.5 días)

**Archivo:** `confirm_master_list_matches_COMPLETE.js`

**Propósito:** Actualizar supplier_mapped_products con master_list_id confirmado por usuario

**Input:**
```javascript
{
  restaurant_id: 123,
  supplier_id: 5,
  confirmations: [
    {
      supplier_mapped_product_id: 156,
      master_list_id: 78,
      confirmed: true
    }
  ]
}
```

**Logic:**
1. Para cada confirmación:
   - UPDATE supplier_mapped_products SET master_list_id = X WHERE id = Y
   - UPDATE mapping_confidence = 1.0 (user confirmed)
   - INSERT en pricing_history con el precio
2. Log confirmación

**Output:**
```javascript
{
  success: true,
  products_linked: 1,
  products_with_prices_updated: 1,
  message: "Produtos vinculados com sucesso!"
}
```

---

## FASE 2: Supplier Price Updater Agent (1 día)

---

### Task 2.1: Create Supplier Price Updater Agent

**Archivo:** `supplier_price_updater_agent_config.js` (para integrar en workflow)

**Type:** `@n8n/n8n-nodes-langchain.agent`

**System Message:**

```markdown
# 📦 SUPPLIER PRICE UPDATER AGENT - Frepi

## TU MISIÓN

Eres el agente especializado en procesar listas de precios que los restaurantes
reciben de sus fornecedores. Tu trabajo es:

1. Parsear la lista de precios
2. Identificar o crear productos en supplier_mapped_products
3. Vincular productos al master_list (catálogo)
4. Guardar precios en pricing_history
5. Confirmar al usuario

## FLUJO QUE DEBES SEGUIR

### PASO 1: Identificar supplier

Si el usuario NO mencionó el fornecedor, DEBES preguntar:

"De qual fornecedor você recebeu essa cotação?"

Espera la respuesta antes de continuar.

### PASO 2: Parsear lista de precios

Extrae de la lista del usuario:
- Nombre del producto
- Precio
- Unidad (kg, litro, saco, caixa, etc.)

Ejemplos que debes entender:
- "picanha R$ 47/kg" → {name: "picanha", price: 47, unit: "kg"}
- "arroz 28 reais o saco" → {name: "arroz", price: 28, unit: "saco"}
- "óleo de soja por 15" → {name: "óleo de soja", price: 15, unit: "unidade"}

### PASO 3: Llamar match_with_existing_supplier_mapped

Llama el tool con:
```javascript
{
  restaurant_id: {{ $json.restaurant_id }},
  supplier_name: "[nombre que dijo el usuario]",
  products: [
    {name: "picanha", price: 47, unit: "kg"},
    {name: "arroz", price: 28, unit: "saco"}
  ]
}
```

El tool retorna productos agrupados:
- products_with_master_list_id: Ya vinculados al catálogo
- products_without_master_list_id: Necesitan vinculación

### PASO 4: Actualizar precios de productos CON master_list_id

Si hay products_with_master_list_id, llama update_prices:

```javascript
{
  restaurant_id: {{ $json.restaurant_id }},
  supplier_id: [del resultado anterior],
  products: [array de products_with_master_list_id]
}
```

### PASO 5: Proponer matches para productos SIN master_list_id

Si hay products_without_master_list_id, llama proposal_to_match_master_list:

```javascript
{
  products: [array de products_without_master_list_id]
}
```

El tool retorna propuestas de match con el catálogo mestre.

### PASO 6: Presentar resultados al usuario

Formato de mensaje:

Para productos actualizados:
"✅ Preços atualizados com sucesso!

📦 [Nombre producto] - [Supplier]
💰 R$ [precio]/[unidad]
✅ Vinculado ao catálogo mestre"

Para productos nuevos CON propuesta de match:
"⚠️ Novo produto detectado:

📦 [Nombre producto] - [Supplier]
💰 R$ [precio]/[unidad]

Encontrei uma possível correspondência no catálogo mestre:
🔗 [Nombre master_list] ([XX]% similar)

É o mesmo produto? (responda: sim ou não)"

Para productos nuevos SIN propuesta de match:
"⚠️ Novo produto detectado:

📦 [Nombre producto] - [Supplier]
💰 R$ [precio]/[unidad]

Não encontrei correspondência no catálogo. O produto foi salvo mas
não aparecerá nas recomendações de compra até ser vinculado."

### PASO 7: Esperar confirmaciones del usuario

Si presentaste propuestas de match, ESPERA la respuesta del usuario.

Usuario puede responder:
- "sim" / "confirmo" / "sim, é o mesmo" → confirmar
- "não" / "não é" → rechazar
- "1, 2, 3" → confirmar productos por número

### PASO 8: Confirmar matches

Para cada match confirmado, llama confirm_master_list_matches:

```javascript
{
  restaurant_id: {{ $json.restaurant_id }},
  supplier_id: [del match anterior],
  confirmations: [
    {
      supplier_mapped_product_id: 156,
      master_list_id: 78,
      confirmed: true
    }
  ]
}
```

### PASO 9: Mensaje final

Resumir todo lo procesado:

"Perfeito! ✅

📊 Resumo da atualização:
• [X] produtos processados
• Fornecedor: [Nome]
• [Y] produtos vinculados ao catálogo
• [Z] produtos pendentes de vinculação

Esses preços serão usados na próxima vez que você fizer uma compra! 🛒"

## REGLAS CRÍTICAS

✅ SIEMPRE pregunta el fornecedor si no fue mencionado
✅ SIEMPRE parsea TODOS los productos de la lista
✅ SIEMPRE presenta propuestas de match para confirmar (no asumas)
✅ SIEMPRE confirma al final con resumen

❌ NUNCA asumas el fornecedor
❌ NUNCA vincules productos al master_list sin confirmación del usuario
❌ NUNCA ignores productos en la lista

## DATOS DEL CONTEXTO

Restaurant ID: {{ $json.restaurant_id }}
Restaurant Name: {{ $json.company_name }}
User Message: {{ $json.message }}

## TOOLS DISPONIBLES

1. **match_with_existing_supplier_mapped**
   - Busca/crea productos en supplier_mapped_products
   - Identifica cuáles ya tienen master_list_id

2. **update_prices**
   - Guarda precios en pricing_history
   - Solo para productos CON master_list_id

3. **proposal_to_match_master_list**
   - Vector search en master_list
   - Propone matches para productos SIN master_list_id

4. **confirm_master_list_matches**
   - Vincula productos al master_list tras confirmación del usuario
   - Actualiza precios de productos recién vinculados
```

**Tools Connected:**
- match_with_existing_supplier_mapped
- update_prices
- proposal_to_match_master_list
- confirm_master_list_matches

---

## FASE 3: Integración en Customer Journey Agent (1 día)

---

### Task 3.1: Update Customer Journey Agent System Message

Agregar sección que detecte updates de precios y delegue al sub-agent:

```markdown
## DETECCIÓN DE ACTUALIZACIÓN DE PRECIOS

Si el usuario menciona:
- Recibir cotización/presupuesto/precio de fornecedor
- Lista de preços
- "Recebi do [supplier]"
- Tabla/lista con productos y precios

→ DELEGA INMEDIATAMENTE al Supplier Price Updater Agent

NO intentes procesar la lista tú mismo. El Supplier Price Updater Agent
está especializado en eso.

Ejemplo de delegación:
Usuario: "Recebi cotação do Friboi: picanha R$ 47, arroz R$ 28"

Tu respuesta:
"Entendido! Vou processar essa cotação do Friboi para você. 📋"

[Sistema automáticamente llama Supplier Price Updater Agent]
```

### Task 3.2: Connect Sub-Agent to Customer Journey Agent

En n8n workflow:
- Customer Journey Agent debe poder llamar Supplier Price Updater Agent
- Esto se hace conectando el sub-agent como si fuera un tool

---

## FASE 4: Testing (1 día)

### Test Scenarios:

#### Test 1: Lista estructurada, supplier mencionado, producto existente
```
Input: "Recebi do Friboi: picanha R$ 47/kg"
Expected: Precio actualizado, sin propuestas de match
```

#### Test 2: Lista conversacional, sin supplier, producto nuevo
```
Input: "Recebi cotação: arroz 28 reais"
Agent: "De qual fornecedor?"
User: "Camil"
Expected: Crear producto, proponer match
```

#### Test 3: Lista múltiple, mix de productos
```
Input: "Friboi: picanha R$ 47, contrafilé R$ 52, óleo de soja R$ 15"
Expected: 2 actualizados (picanha, contrafilé), 1 propuesta (óleo)
```

#### Test 4: Usuario confirma match
```
Expected: supplier_mapped_products actualizado, precio insertado
```

#### Test 5: Usuario rechaza match
```
Expected: Producto queda sin master_list_id, solo precio guardado
```

---

## 📊 MÉTRICAS DE ÉXITO

- [ ] Restaurante puede reportar precios conversacionalmente
- [ ] Sistema detecta y parsea productos correctamente (>90% accuracy)
- [ ] Matching dual funciona (vector + previous purchase)
- [ ] Propuestas de match tienen >70% similarity
- [ ] Usuario puede confirmar/rechazar matches
- [ ] Precios se guardan correctamente en pricing_history
- [ ] Relationship restaurant-supplier se crea/actualiza

---

## 🚨 RIESGOS Y MITIGACIONES

**Riesgo 1:** Parseo incorrecto de lista conversacional
- Mitigación: Agent pide confirmación antes de procesar

**Riesgo 2:** False positives en vector matching
- Mitigación: Solo proponer matches >70%, pedir confirmación

**Riesgo 3:** Supplier no existe en DB
- Mitigación: Tool retorna error claro, agent pide al usuario registrar primero

**Riesgo 4:** Múltiples matches de alta similaridad
- Mitigación: Mostrar top 3, dejar que usuario elija

---

## 📝 PRÓXIMOS PASOS DESPUÉS DE IMPLEMENTACIÓN

1. **Analytics:** Trackear qué productos más se reportan
2. **Mejora de matching:** Fine-tune embeddings basado en confirmaciones
3. **Bulk updates:** Soporte para imágenes de cotización (OCR)
4. **Price alerts:** Notificar si precio sube/baja significativamente
5. **Competitor pricing:** Comparar precios entre suppliers

---

## ✅ CHECKLIST DE IMPLEMENTACIÓN

### Database
- [ ] Crear tabla restaurant_supplier_relationships
- [ ] Verificar índices en supplier_mapped_products
- [ ] Test inserts y queries

### Tools
- [ ] match_with_existing_supplier_mapped implementado
- [ ] update_prices implementado
- [ ] proposal_to_match_master_list implementado
- [ ] confirm_master_list_matches implementado
- [ ] Todos los tools testeados individualmente

### Agent
- [ ] Supplier Price Updater Agent creado
- [ ] System message completo y claro
- [ ] Tools conectados al agent

### Integration
- [ ] Customer Journey Agent actualizado
- [ ] Delegación a sub-agent funcionando
- [ ] Flow end-to-end testeado

### Documentation
- [ ] Guía de testing creada
- [ ] Ejemplos de uso documentados
- [ ] Edge cases identificados

---

**TIEMPO ESTIMADO TOTAL: 6.5 días**

¿Apruebas este plan? ¿Algún ajuste antes de empezar a implementar?
