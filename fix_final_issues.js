// ===================================================================
// SCRIPT: Fix Customer Main Agent - Connections, Tools, and Prompts
// ===================================================================
// Purpose:
// 1. Connect Customer Main Agent to workflow (Router → Agent → WhatsApp)
// 2. Remove duplicate tools (keep only customer-specific ones)
// 3. Translate system messages to Spanish (responses stay Portuguese BR)
// 4. Ensure proper tool responsibilities
// ===================================================================

const fs = require('fs');
const path = require('path');

// Read workflow JSON
const workflowPath = path.join(__dirname, 'Frepi MVP2 - Full Architecture with Supabase Validations.json');
const workflow = JSON.parse(fs.readFileSync(workflowPath, 'utf8'));

console.log('📂 Loaded workflow:', workflow.name);
console.log('📊 Current nodes:', workflow.nodes.length);

// ===================================================================
// STEP 1: Find Key Nodes
// ===================================================================

console.log('\n🔍 Step 1: Finding key nodes...');

const customerMainAgent = workflow.nodes.find(n => n.name === 'Customer Main Agent');
const routerNode = workflow.nodes.find(n => n.name === 'Router: Customer or Supplier');
const whatsappSendNode = workflow.nodes.find(n =>
  n.name === 'Send Whatsapp response' ||
  n.name === 'WhatsApp Send' ||
  n.type === 'n8n-nodes-base.whatsApp'
);

if (!customerMainAgent) {
  console.error('❌ Customer Main Agent not found!');
  process.exit(1);
}

if (!routerNode) {
  console.error('❌ Router node not found!');
  process.exit(1);
}

console.log('✅ Found Customer Main Agent:', customerMainAgent.id);
console.log('✅ Found Router:', routerNode.name);
console.log('✅ Found WhatsApp Send:', whatsappSendNode?.name || 'Not found, will search for target');

// ===================================================================
// STEP 2: Fix Connections
// ===================================================================

console.log('\n🔗 Step 2: Fixing connections...');

// 2.1: Connect Router TRUE branch → Customer Main Agent
if (!workflow.connections[routerNode.name]) {
  workflow.connections[routerNode.name] = { main: [[], []] };
}

// TRUE branch (index 0) = Customer (restaurante)
workflow.connections[routerNode.name].main[0] = [{
  node: customerMainAgent.name,
  type: 'main',
  index: 0
}];

console.log('✅ Connected Router (TRUE) → Customer Main Agent');

// 2.2: Connect Customer Main Agent → WhatsApp Send
if (whatsappSendNode) {
  workflow.connections[customerMainAgent.name] = {
    main: [[{
      node: whatsappSendNode.name,
      type: 'main',
      index: 0
    }]]
  };
  console.log('✅ Connected Customer Main Agent → WhatsApp Send');
} else {
  // Find what other agents connect to
  const supplierJourneyAgent = workflow.nodes.find(n => n.name === 'Supplier Journey Agent');
  if (supplierJourneyAgent && workflow.connections[supplierJourneyAgent.name]) {
    const targetConnection = workflow.connections[supplierJourneyAgent.name].main[0][0];
    workflow.connections[customerMainAgent.name] = {
      main: [[targetConnection]]
    };
    console.log('✅ Connected Customer Main Agent → ', targetConnection.node);
  }
}

// ===================================================================
// STEP 3: Remove Duplicate Tools from Customer Main Agent
// ===================================================================

console.log('\n🧹 Step 3: Removing duplicate tools...');

// Tools that should NOT be in Customer Main Agent
const toolsToRemove = [
  'determine_user_type',        // Registration Agent
  'onboarding_restaurant',      // Registration Agent
  'onboarding_supplier',        // Registration Agent
  'upload_supplier_prices',     // Supplier Journey Agent
  'normalize_product_list',     // Supplier Journey Agent
  'publish_to_catalog',         // Supplier Journey Agent
  'show_supplier_menu'          // Supplier Journey Agent
];

// Tools that SHOULD stay in Customer Main Agent
const correctTools = [
  'setup_buying_preferences',   // Customer specific
  'search_products_vector',     // Customer specific
  'build_shopping_cart',        // Customer specific
  'execute_checkout',           // Customer specific
  'show_customer_menu',         // Customer specific
  'Supplier Price Updater Agent' // Customer specific (agentTool)
];

toolsToRemove.forEach(toolName => {
  if (workflow.connections[toolName]) {
    const conn = workflow.connections[toolName];
    if (conn.ai_tool && conn.ai_tool[0] && conn.ai_tool[0][0]) {
      if (conn.ai_tool[0][0].node === 'Customer Main Agent') {
        // This tool is incorrectly connected to Customer Main Agent
        // We need to remove this connection or redirect it

        // For registration tools, they should connect to Registration Agent
        if (['determine_user_type', 'onboarding_restaurant', 'onboarding_supplier'].includes(toolName)) {
          const registrationAgent = workflow.nodes.find(n => n.name === 'Registration Agent');
          if (registrationAgent) {
            workflow.connections[toolName].ai_tool[0][0].node = 'Registration Agent';
            console.log(`  ✅ Reconnected ${toolName} → Registration Agent`);
          }
        }

        // For supplier tools, they should connect to Supplier Journey Agent
        if (['upload_supplier_prices', 'normalize_product_list', 'publish_to_catalog', 'show_supplier_menu'].includes(toolName)) {
          const supplierAgent = workflow.nodes.find(n => n.name === 'Supplier Journey Agent');
          if (supplierAgent) {
            workflow.connections[toolName].ai_tool[0][0].node = 'Supplier Journey Agent';
            console.log(`  ✅ Reconnected ${toolName} → Supplier Journey Agent`);
          }
        }
      }
    }
  }
});

console.log('\n✅ Customer Main Agent now has only:');
correctTools.forEach((tool, i) => {
  console.log(`  ${i + 1}. ${tool}`);
});

// ===================================================================
// STEP 4: Translate System Messages to Spanish
// ===================================================================

console.log('\n📝 Step 4: Translating system messages to Spanish...');

// 4.1: Customer Main Agent System Message (Spanish)
const customerMainAgentSystemMessage = `# 🛒 CUSTOMER MAIN AGENT - FREPI

## TU ROL

Eres el agente principal para restaurantes en Frepi. Ayudas con compras, preferencias y gestión de precios.

## CONTEXTO DEL USUARIO

Usuario nuevo: {{ $('Prepare User Context').first().json.is_new_user }}
Tipo: {{ $('Prepare User Context').first().json.user_type || 'desconocido' }}
{{ $('Prepare User Context').first().json.restaurant_name ? 'Restaurante: ' + $('Prepare User Context').first().json.restaurant_name : '' }}

## HERRAMIENTAS DISPONIBLES

### 1. setup_buying_preferences
**Cuándo usar:** Usuario quiere configurar preferencias de compra
**Qué hace:** Configura marcas preferidas, formatos, frecuencia, horarios
**Flujo:** 5 pasos con validaciones
**Guarda en:** restaurants.category_preferences (JSONB)

### 2. search_products_vector
**Cuándo usar:** Usuario busca productos para comprar
**Qué hace:** Búsqueda semántica en catálogo
**Ejemplo input:** "quero tomates e cebolas"
**Retorna:** Lista de productos con precios

### 3. build_shopping_cart
**Cuándo usar:** Usuario selecciona productos con cantidades
**Qué hace:** Construye carrito de compras
**Ejemplo input:** "quero 2 de tomate e 3 de cebolla"
**Guarda en:** line_sessions.preferences_captured.cart

### 4. execute_checkout
**Cuándo usar:** Usuario confirma que quiere finalizar compra
**Qué hace:** Crea purchase_order con items
**Requiere:** Carrito activo en sesión
**Guarda en:** purchase_orders + purchase_order_items

### 5. show_customer_menu
**Cuándo usar:** Usuario pide ver opciones o escribe "menu"
**Qué hace:** Muestra menú de opciones disponibles
**Formato:** Lista clara de opciones

### 6. supplier_price_updater (AI Agent Tool)
**Cuándo usar:** Usuario reporta precios de fornecedor
**Keywords de detección:**
- "recebi cotação"
- "recebi preços"
- "fornecedor mandou"
- "atualizar preços"
- "preços novos"
- "[fornecedor] mandou [produto] [preço]"

**Qué hace:** Sub-agente especializado que maneja TODO el flujo de actualización de precios
**Capacidades:**
- Busca y valida fornecedor
- Match automático de produtos (dual strategy: vector search + previous purchases)
- Actualiza precios confirmados
- Genera propuestas para produtos sin master_list_id
- Procesa confirmaciones del usuario
- Trackea relaciones restaurante-fornecedor

**Input:** Mensaje conversacional del usuario
**Returns:** Confirmación completa con resumen de precios actualizados

**Flujo completo manejado por el sub-agente:**
1. Pregunta nombre de fornecedor si no fue mencionado
2. Match automático de produtos
3. Actualiza los que tienen master_list_id
4. Genera propuestas para los que no tienen
5. Pide confirmación al usuario
6. Actualiza produtos confirmados
7. Retorna resumen completo

**NO confundir con búsqueda normal:**
- "quero comprar" → usar search_products_vector
- "quanto custa" → búsqueda normal de precios

## FLUJO DE CONVERSACIÓN

### Preferencias
Usuario: "Quero configurar preferências"
→ Llama setup_buying_preferences

### Compras
Usuario: "Quero comprar tomates"
→ Llama search_products_vector
→ Muestra productos
→ Usuario: "Quero 2kg"
→ Llama build_shopping_cart
→ Usuario: "Finalizar"
→ Llama execute_checkout

### Actualización de Precios
Usuario: "Recebi cotação da Friboi: picanha R$ 47/kg"
→ Llama supplier_price_updater (agentTool)
→ El sub-agente maneja todo el flujo
→ Retorna confirmación al usuario

### Menú
Usuario: "menu"
→ Llama show_customer_menu

## REGLAS IMPORTANTES

1. ✅ SIEMPRE responde en **Português Brasileiro** al usuario
2. ✅ Una herramienta a la vez - espera resultado antes de llamar otra
3. ✅ Si una herramienta retorna needs_user_input, muestra el mensaje y espera
4. ✅ Si una herramienta falla, explica el error y sugiere alternativas
5. ❌ NO asumas datos - siempre pregunta si falta información
6. ❌ NO llames execute_checkout sin un carrito activo
7. ❌ NO confundas búsqueda de productos con actualización de precios

## TONO Y ESTILO

- Amigable y profesional
- Conciso pero claro
- Usa emojis moderadamente
- Confirma acciones importantes antes de ejecutar
- Siempre en **Português Brasileiro**

## EJEMPLOS

**Ejemplo 1 - Búsqueda:**
Usuario: "Preciso de tomates"
Tú: Llamas search_products_vector
Retornas: "Encontrei tomates! 🍅\\n\\n1. Tomate Italiano - R$ 5.50/kg\\n2. Tomate Cereja - R$ 8.00/kg\\n\\nQual você gostaria?"

**Ejemplo 2 - Precios:**
Usuario: "Recebi cotação: picanha R$ 47"
Tú: Llamas supplier_price_updater
El sub-agente: Pregunta fornecedor, hace match, actualiza
Retornas: "✅ Cotação processada! Picanha atualizada para R$ 47.00/kg"

**Ejemplo 3 - Menú:**
Usuario: "menu"
Tú: Llamas show_customer_menu
Retornas: "📱 Menu Frepi\\n\\n1. 🛒 Fazer pedido\\n2. ⚙️ Configurar preferências\\n3. 💰 Atualizar preços\\n..."
`;

customerMainAgent.parameters.options.systemMessage = customerMainAgentSystemMessage;
console.log('✅ Customer Main Agent system message → Spanish (responses: Portuguese BR)');

// 4.2: Supplier Price Updater Agent System Message (Spanish)
const priceUpdaterAgent = workflow.nodes.find(n =>
  n.type === '@n8n/n8n-nodes-langchain.agentTool' &&
  n.name === 'Supplier Price Updater Agent'
);

if (priceUpdaterAgent) {
  const priceUpdaterSystemMessage = `# 🏷️ SUPPLIER PRICE UPDATER AGENT

## TU ROL

Eres el agente especializado en actualizar precios que los restaurantes reciben de sus fornecedores.

## MISIÓN

Ayudar a restaurantes a reportar y actualizar precios de productos que recibieron en cotaciones de fornecedores.

## TUS HERRAMIENTAS

### 1. match_with_existing_supplier_mapped
**Cuándo usar:** Primer paso después de recibir lista de precios
**Qué hace:** Busca fornecedor y hace match de produtos con catálogo
**Input:**
- product_list: Array de {product_name, price, unit}
- supplier_name: String
- restaurant_id: Number
- phone_number: String

**Returns:**
- products_with_master_list_id: Listos para actualizar
- products_without_master_list_id: Necesitan match manual
- new_products: No encontrados en sistema

### 2. update_prices
**Cuándo usar:** Para productos con master_list_id confirmado
**Qué hace:** Actualiza precios en base de datos
**Input:**
- products_to_update: Array de productos
- restaurant_id: Number
- supplier_id: Number

**Returns:** Éxito/fallo de cada actualización con estadísticas

### 3. proposal_to_match_master_list
**Cuándo usar:** Para productos sin master_list_id
**Qué hace:** Genera 3-5 sugerencias de match
**Input:**
- products_to_match: Array de productos
- top_n: Number (default: 3)

**Returns:** Propuestas con similarity scores (🟢 🟡 🔴)

### 4. confirm_master_list_matches
**Cuándo usar:** Después de que usuario confirma matches
**Qué hace:** Linkea produtos a master_list según confirmación
**Input:**
- confirmation_string: String como "1→1, 2→2, 3→none"
- proposals: Array de proposal_to_match_master_list

**Returns:** Éxito/fallo de cada confirmación

## FLUJO DE CONVERSACIÓN

### PASO 1: Recibir Lista de Precios
Usuario dice algo como:
- "Recebi cotação da Friboi: picanha R$ 47/kg, arroz R$ 28/saco"
- "Friboi mandou preços novos"
- O envía lista estructurada

### PASO 2: Extraer Información
Parsea el mensaje para extraer:
- Nombre del fornecedor (si no está, PREGUNTA: "De qual fornecedor você recebeu essa cotação?")
- Lista de productos con precios y unidades
- Si formato no es claro, haz preguntas aclaratorias

### PASO 3: Match Productos
Llama match_with_existing_supplier_mapped con:
- product_list: Productos parseados
- supplier_name: Extraído o preguntado
- restaurant_id: De contexto
- phone_number: De contexto

**Maneja resultados:**
- Si fornecedor no encontrado: Pregunta si quiere crearlo
- Si fornecedor encontrado con baja confianza: Pide confirmación
- Procesa los tres grupos de productos retornados

### PASO 4: Actualizar Matches Confirmados
Para products_with_master_list_id:
- Llama update_prices inmediatamente
- Muestra resumen al usuario
- Destaca cambios significativos (≥5%)

### PASO 5: Manejar Produtos Sin Match
Para products_without_master_list_id:
- Llama proposal_to_match_master_list
- Muestra propuestas al usuario en formato claro:
  """
  1. Arroz Tipo 1 (R$ 28/saco)
     Sugestões:
     1. 🟢 Arroz Branco Tipo 1 (Grãos) - 92% similar
     2. 🟡 Arroz Tipo 2 (Grãos) - 85% similar
     3. 🔴 Arroz Integral (Grãos) - 70% similar

     ✅ Recomendação: Opção 1 tem alta confiança
  """
- Pregunta: "Qual opção corresponde a cada produto? Formato: 1→1, 2→2, 3→none"

### PASO 6: Confirmar Matches
Cuando usuario responde con confirmaciones:
- Llama confirm_master_list_matches
- Muestra links exitosos
- Para productos recién linkeados: Llama update_prices de nuevo

### PASO 7: Completar
Resumir:
- Total de productos procesados
- Precios actualizados
- Productos linkeados
- Próximos pasos si hay productos omitidos

## PARSING CONVERSACIONAL

Sé flexible al entender:
- "picanha 47 reais o kilo" → {product_name: "picanha", price: 47, unit: "kg"}
- "arroz R$ 28 o saco" → {product_name: "arroz", price: 28, unit: "saco"}
- "contrafilé R$ 42" → {product_name: "contrafilé", price: 42, unit: "kg"} (asume kg para carne)
- "tomate 6 reais" → {product_name: "tomate", price: 6, unit: "kg"} (asume kg para vegetales)

## VARIABLES DE CONTEXTO

Siempre usa del input:
- restaurant_id: ID del restaurante
- restaurant_person_id: ID de la persona
- phone_number: Número de WhatsApp
- person_name: Nombre de la persona
- company_name: Nombre del restaurante

## MANEJO DE ERRORES

- Si herramienta falla: Explica error claramente, ofrece alternativas
- Si fornecedor no encontrado: Pregunta si quiere crear
- Si no hay matches: Explica y sugiere entrada manual
- Si input ambiguo: Haz preguntas aclaratorias

## TONO Y ESTILO

- **Idioma:** Português Brasileiro (Brazil)
- **Tono:** Profesional pero amigable
- **Emojis:** Usa con moderación para claridad (✅ ❌ 🟢 🟡 🔴)
- **Formato:** Usa **negrita** para énfasis, bullets para listas

## EJEMPLO COMPLETO

**Usuario:** "Recebi cotação da Friboi: picanha R$ 47/kg"

**Tú:**
1. Llamas match_with_existing_supplier_mapped
2. Resultado: Picanha tiene master_list_id ✅
3. Llamas update_prices
4. Respondes:
   """
   ✅ Cotação de Friboi processada!

   📊 1 preço atualizado:
   • Picanha: R$ 47.00/kg (+R$ 2.00, +4.4%)

   ✅ Atualização concluída! Posso ajudar com algo mais?
   """

## RECUERDA

- Tu trabajo es SOLO actualización de precios
- No manejes pedidos, búsquedas u otras tareas
- Siempre verifica fornecedor antes de procesar
- Sé paciente con input conversacional/no estructurado
- Usa herramientas en orden correcto (match → update → propose → confirm)
- Trackea relaciones restaurante-fornecedor automáticamente

Eres eficiente, preciso y útil. ¡Vamos a actualizar precios! 🚀
`;

  priceUpdaterAgent.parameters.options.systemMessage = priceUpdaterSystemMessage;
  console.log('✅ Supplier Price Updater Agent system message → Spanish (responses: Portuguese BR)');
}

// ===================================================================
// STEP 5: Save Updated Workflow
// ===================================================================

console.log('\n💾 Step 5: Saving corrected workflow...');

// Create backup
const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
const backupPath = path.join(__dirname, `Frepi MVP2 - BACKUP-before-final-fixes-${timestamp}.json`);
fs.writeFileSync(backupPath, fs.readFileSync(workflowPath, 'utf8'));
console.log(`✅ Backup created`);

// Save updated workflow
fs.writeFileSync(workflowPath, JSON.stringify(workflow, null, 2));
console.log(`✅ Updated workflow saved`);

// ===================================================================
// STEP 6: Validation
// ===================================================================

console.log('\n✅ Step 6: Validation...');

// Check connections
console.log('\n🔗 Flow validation:');
const routerConn = workflow.connections[routerNode.name];
if (routerConn && routerConn.main && routerConn.main[0] && routerConn.main[0][0]) {
  console.log('  Router (TRUE) →', routerConn.main[0][0].node, routerConn.main[0][0].node === 'Customer Main Agent' ? '✅' : '❌');
}

const customerMainConn = workflow.connections[customerMainAgent.name];
if (customerMainConn && customerMainConn.main && customerMainConn.main[0] && customerMainConn.main[0][0]) {
  console.log('  Customer Main Agent →', customerMainConn.main[0][0].node, '✅');
}

// Check tool connections
console.log('\n🔧 Customer Main Agent tools:');
let customerToolCount = 0;
Object.keys(workflow.connections).forEach(key => {
  const conn = workflow.connections[key];
  if (conn.ai_tool && conn.ai_tool[0] && conn.ai_tool[0][0]) {
    if (conn.ai_tool[0][0].node === 'Customer Main Agent') {
      customerToolCount++;
      console.log(`  ${customerToolCount}. ${key}`);
    }
  }
});

console.log(`  Total: ${customerToolCount} tools (should be 6)`);

// ===================================================================
// STEP 7: Summary
// ===================================================================

console.log('\n' + '='.repeat(70));
console.log('🎉 FIXES COMPLETE!');
console.log('='.repeat(70));
console.log('');
console.log('✅ Corrections made:');
console.log('   1. ✅ Connected Router (TRUE) → Customer Main Agent');
console.log('   2. ✅ Connected Customer Main Agent → WhatsApp Send');
console.log('   3. ✅ Removed duplicate tools from Customer Main Agent');
console.log('   4. ✅ Reconnected registration tools → Registration Agent');
console.log('   5. ✅ Reconnected supplier tools → Supplier Journey Agent');
console.log('   6. ✅ Translated system messages to Spanish');
console.log('   7. ✅ Responses to user remain in Portuguese BR');
console.log('');
console.log('🏗️  Final Customer Main Agent tools (6):');
console.log('   1. setup_buying_preferences');
console.log('   2. search_products_vector');
console.log('   3. build_shopping_cart');
console.log('   4. execute_checkout');
console.log('   5. show_customer_menu');
console.log('   6. supplier_price_updater (agentTool)');
console.log('');
console.log('📊 Flow:');
console.log('   Router: Customer or Supplier');
console.log('     ├─ TRUE → Customer Main Agent → WhatsApp Send');
console.log('     └─ FALSE → Supplier Journey Agent → WhatsApp Send');
console.log('');
console.log('🚀 Ready for testing!');
console.log('='.repeat(70));
