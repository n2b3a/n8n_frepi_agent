# 🚀 GUÍA DE IMPLEMENTACIÓN - Frepi Agents

## 📋 RESUMEN

Esta guía explica cómo implementar dos agentes AI especializados:

1. **Supplier Price Updater Agent** - Actualiza precios reportados por restaurantes ✅ **COMPLETADO**
2. **Purchase Order Creator Agent** - Crea órdenes de compra optimizadas ✅ **COMPLETADO**

---

## 🏗️ ARQUITECTURA

```
Customer Main Agent
├── supplier_price_updater (AI Agent Tool)
│   ├── match_with_existing_supplier_mapped
│   ├── update_prices
│   ├── proposal_to_match_master_list
│   └── confirm_master_list_matches
│
└── purchase_order_creator (AI Agent Tool)
    ├── match_with_existing_master_list
    ├── get_user_preferences_from_master_list
    ├── get_prices
    ├── buying_algorithm
    └── add_to_master_list
```

---

## 📦 ARCHIVOS CREADOS

### Supplier Price Updater Agent
```
/tools/supplier_price_updater/
├── match_with_existing_supplier_mapped.js  ✅
├── update_prices.js  (ya existe en JSON original)
├── proposal_to_match_master_list.js  (ya existe en JSON original)
└── confirm_master_list_matches.js  (ya existe en JSON original)
```

### Purchase Order Creator Agent
```
/agents/
└── purchase_order_creator_agent_system_message.md  ✅

/tools/purchase_order_creator/
├── match_with_existing_master_list.js  ✅
├── get_user_preferences_from_master_list.js  ✅
├── get_prices.js  ✅
├── buying_algorithm.js  ✅
└── add_to_master_list.js  ✅
```

---

## 🔧 PASOS DE IMPLEMENTACIÓN

### **PASO 1: Actualizar Supplier Price Updater Agent**

#### 1.1. Reemplazar tool `match_with_existing_supplier_mapped`

En el JSON de n8n, buscar el nodo con `id: "tool-match-supplier-mapped"` y reemplazar el código JavaScript con el contenido de:
```
/tools/supplier_price_updater/match_with_existing_supplier_mapped.js
```

**Cambio clave:** Ahora el tool **CREA automáticamente** productos en `supplier_mapped_products` con `master_list_id = NULL` si no encuentra match.

#### 1.2. Verificar el system message del agente

El system message debe seguir el flujo de 2 FASES (11 pasos totales):
- **FASE 1:** Pasos 1-6 (match, update, proposal, espera confirmación)
- **FASE 2:** Pasos 7-11 (confirmación, link a master_list, update final)

**El system message ya está correcto en el JSON original.**

---

### **PASO 2: Crear Purchase Order Creator Agent** ⭐

#### 2.1. Crear el AI Agent Tool

En el JSON de n8n, agregar un nuevo nodo de tipo `@n8n/n8n-nodes-langchain.agentTool`:

```json
{
  "parameters": {
    "name": "purchase_order_creator",
    "description": "Specialized agent for creating optimized purchase orders. Handles product matching, preferences, pricing, and buying optimization.",
    "promptType": "define",
    "text": "={{ $json.query }}",
    "options": {
      "systemMessage": "[COPIAR CONTENIDO DE: agents/purchase_order_creator_agent_system_message.md]"
    }
  },
  "type": "@n8n/n8n-nodes-langchain.agentTool",
  "typeVersion": 2.2,
  "position": [-600, 800],
  "id": "purchase-order-creator-agenttool",
  "name": "Purchase Order Creator Agent"
}
```

#### 2.2. Agregar Chat Model para el agente

```json
{
  "parameters": {
    "model": {
      "__rl": true,
      "mode": "list",
      "value": "gpt-4o-mini"
    },
    "options": {
      "temperature": 0.3,
      "maxTokens": 3000
    }
  },
  "type": "@n8n/n8n-nodes-langchain.lmChatOpenAi",
  "typeVersion": 1.2,
  "position": [-720, 1000],
  "id": "chat-model-purchase-creator",
  "name": "OpenAI Chat Model (Purchase Creator)",
  "credentials": {
    "openAiApi": {
      "id": "MdAepMtuPO5nFVI0",
      "name": "OpenAi account"
    }
  }
}
```

#### 2.3. Crear los 5 tools

**Tool 1: match_with_existing_master_list**
```json
{
  "parameters": {
    "description": "Match customer's product list with master_list using vector search. Groups by master_list_product_id. Separates: matched / unmatched.",
    "jsCode": "[COPIAR CONTENIDO DE: tools/purchase_order_creator/match_with_existing_master_list.js]",
    "schemaType": "fromAI"
  },
  "type": "@n8n/n8n-nodes-langchain.toolCode",
  "typeVersion": 1.3,
  "position": [-800, 800],
  "id": "tool-match-master-list",
  "name": "match_with_existing_master_list"
}
```

**Tool 2: get_user_preferences_from_master_list**
```json
{
  "parameters": {
    "description": "Get restaurant preferences from database. Filters by relevant product categories. Includes preferred suppliers.",
    "jsCode": "[COPIAR CONTENIDO DE: tools/purchase_order_creator/get_user_preferences_from_master_list.js]",
    "schemaType": "fromAI"
  },
  "type": "@n8n/n8n-nodes-langchain.toolCode",
  "typeVersion": 1.3,
  "position": [-640, 800],
  "id": "tool-get-preferences",
  "name": "get_user_preferences_from_master_list"
}
```

**Tool 3: get_prices**
```json
{
  "parameters": {
    "description": "Get prices from pricing_history. Verifies validity (effective_date). Marks expired or invalid prices. Prioritizes preferred suppliers in PHASE 2.",
    "jsCode": "[COPIAR CONTENIDO DE: tools/purchase_order_creator/get_prices.js]",
    "schemaType": "fromAI"
  },
  "type": "@n8n/n8n-nodes-langchain.toolCode",
  "typeVersion": 1.3,
  "position": [-480, 800],
  "id": "tool-get-prices",
  "name": "get_prices"
}
```

**Tool 4: buying_algorithm**
```json
{
  "parameters": {
    "description": "Determines BEST purchase combination. Analyzes: prices, preferences, supplier grouping. Optimizes: cost, delivery fees, preferences matched. Returns RECOMMENDED PURCHASE ORDER.",
    "jsCode": "[COPIAR CONTENIDO DE: tools/purchase_order_creator/buying_algorithm.js]",
    "schemaType": "fromAI"
  },
  "type": "@n8n/n8n-nodes-langchain.toolCode",
  "typeVersion": 1.3,
  "position": [-320, 800],
  "id": "tool-buying-algorithm",
  "name": "buying_algorithm"
}
```

**Tool 5: add_to_master_list**
```json
{
  "parameters": {
    "description": "Add new products to master_list with restaurant-level preferences. Generates embeddings for future vector search. Part of Master List Modifier Agent.",
    "jsCode": "[COPIAR CONTENIDO DE: tools/purchase_order_creator/add_to_master_list.js]",
    "schemaType": "fromAI"
  },
  "type": "@n8n/n8n-nodes-langchain.toolCode",
  "typeVersion": 1.3,
  "position": [-160, 800],
  "id": "tool-add-master-list",
  "name": "add_to_master_list"
}
```

#### 2.4. Conectar los tools al agente

En la sección `connections` del JSON, agregar:

```json
{
  "match_with_existing_master_list": {
    "ai_tool": [[{
      "node": "Purchase Order Creator Agent",
      "type": "ai_tool",
      "index": 0
    }]]
  },
  "get_user_preferences_from_master_list": {
    "ai_tool": [[{
      "node": "Purchase Order Creator Agent",
      "type": "ai_tool",
      "index": 0
    }]]
  },
  "get_prices": {
    "ai_tool": [[{
      "node": "Purchase Order Creator Agent",
      "type": "ai_tool",
      "index": 0
    }]]
  },
  "buying_algorithm": {
    "ai_tool": [[{
      "node": "Purchase Order Creator Agent",
      "type": "ai_tool",
      "index": 0
    }]]
  },
  "add_to_master_list": {
    "ai_tool": [[{
      "node": "Purchase Order Creator Agent",
      "type": "ai_tool",
      "index": 0
    }]]
  },
  "OpenAI Chat Model (Purchase Creator)": {
    "ai_languageModel": [[{
      "node": "Purchase Order Creator Agent",
      "type": "ai_languageModel",
      "index": 0
    }]]
  },
  "Purchase Order Creator Agent": {
    "ai_tool": [[{
      "node": "Customer Main Agent",
      "type": "ai_tool",
      "index": 0
    }]]
  }
}
```

---

### **PASO 3: Actualizar Customer Main Agent**

#### 3.1. Agregar Purchase Order Creator a las herramientas

En el `systemMessage` del Customer Main Agent, agregar:

```markdown
### 7. purchase_order_creator (AI Agent Tool)
**Cuándo usar:** Usuario quiere hacer un pedido de compra
**Keywords de detección:**
- "quero fazer um pedido"
- "preciso comprar"
- "fazer uma compra"
- "criar pedido"

**Qué hace:** Sub-agente especializado que maneja TODO el flujo de creación de pedidos
**Capacidades:**
- Match de produtos con master_list
- Obtiene preferencias del restaurante
- Verifica precios válidos
- Optimiza combinación de compra
- Agrega productos faltantes al catálogo
- Genera mejor orden de compra

**Input:** Lista de productos que el usuario quiere comprar
**Returns:** Mejor combinación de compra con precios optimizados

**Flujo completo manejado por el sub-agente:**
1. Match produtos con master_list
2. Obtiene preferencias del restaurante
3. Verifica precios
4. Calcula mejor combinación
5. Si hay produtos sin match: pregunta si agregar al catálogo
6. Retorna recomendación de compra optimizada

**Ejemplo de uso:**
Usuario: "Quero comprar picanha 10kg e arroz 5 sacos"
→ Llama purchase_order_creator
→ El sub-agente maneja todo el flujo
→ Retorna mejor combinación de compra
```

#### 3.2. Agregar lógica para Purchase Order Executor (no disponible)

En el Customer Main Agent, agregar manejo de intento de ejecutar orden:

```markdown
### 8. purchase_order_executor (NO DISPONIBLE EN ESTA VERSIÓN)
**Qué hacer:** Si el Purchase Order Creator Agent retorna una recomendación
y el usuario confirma que quiere ejecutarla:

1. Informar al usuario:
   "⚠️ O Purchase Order Executor Agent ainda não está disponível nesta versão.

   Estamos trabalhando nisso! 🚧

   Por enquanto, salvei a recomendação de compra. Você pode:
   • Fazer o pedido manualmente
   • Esperar a próxima atualização do sistema

   Posso ajudar com algo mais?"

2. NO intentar crear el pedido
3. NO llamar execute_checkout (ese es para carritos, no para orden optimizada)
```

---

## 🗄️ CAMBIOS EN SUPABASE

### Nuevas columnas opcionales

Para mejorar tracking, considerar agregar:

#### `master_list` table:
```sql
ALTER TABLE master_list
ADD COLUMN created_by_restaurant_id UUID REFERENCES restaurants(id),
ADD COLUMN metadata JSONB DEFAULT '{}';
```

#### `supplier_mapped_products` table:
```sql
ALTER TABLE supplier_mapped_products
ADD COLUMN price DECIMAL(10,2),
ADD COLUMN embedding VECTOR(1536);
```

#### RPC Functions requeridas:
- `match_suppliers_by_name` - vector search en suppliers
- `match_supplier_products` - vector search en supplier_mapped_products
- `match_master_list_products` - vector search en master_list

---

## ✅ TESTING

### Test 1: Supplier Price Updater

**Input:**
```
Recebi cotação da Friboi:
picanha R$ 47/kg
arroz R$ 28/saco
```

**Flujo esperado:**
1. FASE 1:
   - Match picanha → encontrado con master_list_id
   - Match arroz → NO encontrado, CREA nuevo con master_list_id = NULL
   - Update precio de picanha
   - Propone match de arroz con master_list
   - Pregunta confirmación al usuario

2. FASE 2 (después de "1→1"):
   - Linkea arroz a master_list
   - Update precio de arroz
   - Confirma: "2 preços atualizados!"

---

### Test 2: Purchase Order Creator

**Input:**
```
Quero comprar picanha 10kg e arroz 5 sacos
```

**Flujo esperado:**
1. FASE 1:
   - Match picanha → encontrado
   - Match arroz → NO encontrado
   - Get preferencias
   - Get preços (solo picanha)
   - Buying algorithm (parcial)
   - Pregunta: "Arroz não está no catálogo. Deseja adicionar?"

2. FASE 2 (después de "sim"):
   - Add arroz a master_list
   - Re-match (ahora ambos con master_list_id)
   - Re-get preferencias
   - Re-get preços (ambos)
   - Buying algorithm (completo)
   - Retorna: "Melhor combinação: R$ 610.00"

3. Intento de ejecutar (después de "confirmar"):
   - "Purchase Order Executor não disponível nesta versão"

---

## 📝 CHECKLIST DE IMPLEMENTACIÓN

- [x] Supplier Price Updater Agent: tool match_with_existing_supplier_mapped
- [x] Purchase Order Creator Agent: system message
- [x] Purchase Order Creator Agent: tool match_with_existing_master_list
- [x] Purchase Order Creator Agent: tool get_user_preferences
- [x] Purchase Order Creator Agent: tool get_prices
- [x] Purchase Order Creator Agent: tool buying_algorithm
- [x] Purchase Order Creator Agent: tool add_to_master_list
- [ ] Actualizar Customer Main Agent system message
- [ ] Conectar Purchase Order Creator Agent al Customer Main Agent
- [ ] Crear RPC functions en Supabase si no existen
- [ ] Testing end-to-end
- [ ] Deploy a producción

---

## 🚀 PRÓXIMOS PASOS

1. **Purchase Order Executor Agent** (próxima versión)
   - Ejecutar la orden de compra
   - Crear registros en purchase_orders
   - Notificar a fornecedores
   - Trackear estado del pedido

2. **Master List Modifier Agent** (separado)
   - Actualmente es un tool dentro de Purchase Order Creator
   - Podría ser un agente independiente con más capacidades:
     - Merge de productos duplicados
     - Categorización automática
     - Sugerencias de productos relacionados

3. **Analytics & Insights**
   - Reportes de ahorros
   - Tendencias de precios
   - Mejores fornecedores

---

## ❓ FAQs

**Q: ¿Por qué dos fases en cada agente?**
A: Para mantener control humano en decisiones importantes (confirmar matches, agregar al catálogo).

**Q: ¿Qué pasa si el usuario cancela en medio del flujo?**
A: Ambos agentes manejan cancelación con comandos como "cancelar", "desistir", "parar".

**Q: ¿Cómo se manejan los timeouts de sesión?**
A: Las sesiones en `line_sessions` tienen `awaiting_continuation` y se verifican por timestamp.

**Q: ¿Los embeddings son compatibles?**
A: Sí, todos usan `text-embedding-3-small` de OpenAI para consistencia.

**Q: ¿Por qué Purchase Order Executor no está implementado?**
A: Requiere lógica de negocio adicional (notificaciones a fornecedores, gestión de inventario, etc.) que está fuera del scope inicial.

---

## 📞 SOPORTE

Para dudas o problemas:
1. Revisar los logs en consola (cada tool tiene logging extensivo)
2. Verificar que todas las RPC functions existan en Supabase
3. Confirmar que los credentials de OpenAI están configurados
4. Verificar que las conexiones en el JSON de n8n están correctas

---

✅ **IMPLEMENTACIÓN COMPLETADA**

Tienes todos los archivos y la guía completa para implementar ambos agentes. 🎉
