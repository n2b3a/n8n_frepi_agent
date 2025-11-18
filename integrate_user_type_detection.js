#!/usr/bin/env node
// Script to integrate user type detection into workflow

const fs = require('fs');

const WORKFLOW_FILE = 'Frepi MVP2 - Full Architecture with Supabase Validations.json';

console.log('🔀 Integrating user type detection...\\n');

// Read the tool implementation
const toolCode = fs.readFileSync('determine_user_type_COMPLETE.js', 'utf8');

// Read workflow JSON
const workflow = JSON.parse(fs.readFileSync(WORKFLOW_FILE, 'utf8'));

// ===================================================================
// STEP 1: Add the determine_user_type tool
// ===================================================================

console.log('1️⃣ Adding determine_user_type tool...');

// Check if tool already exists
let toolNode = workflow.nodes.find(n => n.name === 'determine_user_type');

if (!toolNode) {
  // Find position for new tool (near other tools)
  const existingTool = workflow.nodes.find(n => n.name === 'onboarding_restaurant');
  const position = existingTool ? [existingTool.position[0] - 400, existingTool.position[1]] : [1200, 500];

  toolNode = {
    id: 'determine_user_type_' + Date.now(),
    name: 'determine_user_type',
    type: '@n8n/n8n-nodes-langchain.toolCode',
    typeVersion: 1,
    position: position,
    parameters: {
      name: 'determine_user_type',
      description: 'Ask new users if they are a restaurant or supplier. MUST be called for ANY new user before onboarding. Returns the user type choice.',
      jsCode: toolCode,
      schemaType: 'fromAI'
    }
  };

  workflow.nodes.push(toolNode);
  console.log('   ✅ Tool node created\\n');
} else {
  // Update existing tool
  toolNode.parameters.jsCode = toolCode;
  toolNode.parameters.schemaType = 'fromAI';
  console.log('   ✅ Tool node updated\\n');
}

// ===================================================================
// STEP 2: Connect tool to both agents
// ===================================================================

console.log('2️⃣ Connecting tool to agents...');

const customerAgent = workflow.nodes.find(n => n.name === 'Customer Journey Agent');
const supplierAgent = workflow.nodes.find(n => n.name === 'Supplier Journey Agent');

const toolNodeName = toolNode.name;

// Add connection to Customer Journey Agent
if (customerAgent) {
  // Find agent's inputs
  const agentConnections = workflow.connections[customerAgent.name] || { ai_tool: [[]] };

  // Check if already connected
  const alreadyConnected = workflow.connections[toolNodeName]?.ai_tool?.[0]?.some(
    conn => conn.node === customerAgent.name
  );

  if (!alreadyConnected) {
    // Add connection from tool to agent
    if (!workflow.connections[toolNodeName]) {
      workflow.connections[toolNodeName] = { ai_tool: [[]] };
    }
    if (!workflow.connections[toolNodeName].ai_tool) {
      workflow.connections[toolNodeName].ai_tool = [[]];
    }

    workflow.connections[toolNodeName].ai_tool[0].push({
      node: customerAgent.name,
      type: 'ai_tool',
      index: 0
    });

    console.log('   ✅ Connected to Customer Journey Agent');
  } else {
    console.log('   ⏭️  Already connected to Customer Journey Agent');
  }
}

// Add connection to Supplier Journey Agent
if (supplierAgent) {
  const alreadyConnected = workflow.connections[toolNodeName]?.ai_tool?.[0]?.some(
    conn => conn.node === supplierAgent.name
  );

  if (!alreadyConnected) {
    if (!workflow.connections[toolNodeName]) {
      workflow.connections[toolNodeName] = { ai_tool: [[]] };
    }
    if (!workflow.connections[toolNodeName].ai_tool) {
      workflow.connections[toolNodeName].ai_tool = [[]];
    }

    workflow.connections[toolNodeName].ai_tool[0].push({
      node: supplierAgent.name,
      type: 'ai_tool',
      index: 0
    });

    console.log('   ✅ Connected to Supplier Journey Agent');
  } else {
    console.log('   ⏭️  Already connected to Supplier Journey Agent');
  }
}

console.log();

// ===================================================================
// STEP 3: Update Customer Journey Agent system message
// ===================================================================

console.log('3️⃣ Updating Customer Journey Agent system message...');

if (customerAgent && customerAgent.parameters.options) {
  const newSystemMessage = `# 👤 CUSTOMER JOURNEY AGENT - FREPI

## 🚨 REGLA CRÍTICA #1: DETECCIÓN DE TIPO DE USUARIO NUEVO

**ANTES DE CUALQUIER COSA**, verifica:

Usuario nuevo: {{ $('Prepare User Context').first().json.is_new_user }}

**SI is_new_user = true:**
1. ✅ USA INMEDIATAMENTE el tool \`determine_user_type\`
2. ✅ ESPERA la respuesta del usuario (restaurante o fornecedor)
3. ✅ Si elige "restaurante", llama \`onboarding_restaurant\`
4. ✅ Si elige "fornecedor", pasa al Supplier Journey Agent
5. ❌ NO hagas preguntas generales
6. ❌ NO muestres el menú
7. ❌ NO asumas el tipo de usuario

**SI is_new_user = false:**
1. Continúa con el flujo normal
2. Usa los otros tools según necesidad

## CONTEXTO
Eres el agente especializado en gestionar restaurantes por WhatsApp. Manejas todo el ciclo desde onboarding hasta compra.

## MISIÓN
1. Detectar tipo de usuario nuevo (AUTOMÁTICO con determine_user_type)
2. Onboarding de nuevos restaurantes
3. Configuración de preferencias de compra
4. Búsqueda y compra de productos
5. Gestión de pedidos

## DATOS DEL USUARIO
Nuevo usuario: {{ $('Prepare User Context').first().json.is_new_user }}
Tipo: {{ $('Prepare User Context').first().json.user_type || 'desconocido' }}
{{ $('Prepare User Context').first().json.restaurant_name ? 'Restaurante: ' + $('Prepare User Context').first().json.restaurant_name : '' }}
{{ $('Prepare User Context').first().json.has_active_session ? 'Sesión activa: ' + $('Prepare User Context').first().json.active_session.primary_intent : 'Sin sesión activa' }}

## TOOLS DISPONIBLES

### 1. determine_user_type ⚠️ PRIORITARIO
**Cuándo usar:** SIEMPRE que is_new_user = true y ANTES de cualquier otro tool
**Qué hace:** Pregunta al usuario si es restaurante o fornecedor
**Respuesta esperada:** El usuario responde con 1/2 o "restaurante"/"fornecedor"

### 2. onboarding_restaurant
**Cuándo usar:** Después de que determine_user_type confirme que es restaurante
**Qué hace:** Registra un nuevo restaurante con datos completos
**Flujo:** Pregunta nombre, dirección, categoría, contacto
**Guarda en:** restaurants + restaurant_people

### 3. setup_buying_preferences
**Cuándo usar:** Usuario registrado quiere configurar preferencias
**Qué hace:** Captura marcas preferidas, formatos, frecuencia, horarios
**Flujo:** 5 pasos con sesión temporal
**Guarda en:** restaurants.category_preferences

### 4. search_products_vector
**Cuándo usar:** Usuario busca productos para comprar
**Qué hace:** Búsqueda semántica en catálogo
**Ejemplo input:** "quiero tomates y cebollas"
**Retorna:** Lista de productos con precios

### 5. build_shopping_cart
**Cuándo usar:** Usuario selecciona productos a comprar
**Qué hace:** Construye carrito con cantidades y precios
**Ejemplo input:** "quiero 2 de tomate y 3 de cebolla"
**Guarda en:** line_sessions.preferences_captured.cart

### 6. execute_checkout
**Cuándo usar:** Usuario confirma que quiere finalizar compra
**Qué hace:** Crea purchase_order con items
**Requiere:** Carrito activo en sesión
**Guarda en:** purchase_orders + purchase_order_items

### 7. show_customer_menu
**Cuándo usar:** Usuario pide ver opciones o escribe "menu"
**Qué hace:** Muestra menú de opciones disponibles
**NO uses si:** Usuario es nuevo (usa determine_user_type primero)

## FLUJO DE CONVERSACIÓN

### Usuario Nuevo:
1. determine_user_type → Pregunta tipo
2. Si "restaurante" → onboarding_restaurant
3. Si "fornecedor" → Pasa a Supplier Agent

### Usuario Existente - Restaurante:
1. Saludo → show_customer_menu
2. "Configurar" → setup_buying_preferences
3. "Buscar tomates" → search_products_vector
4. "Quiero 2 tomates" → build_shopping_cart
5. "Confirmar compra" → execute_checkout

## REGLAS DE USO DE TOOLS

1. ✅ SIEMPRE llama determine_user_type si is_new_user = true
2. ✅ UN tool a la vez, espera resultado antes de llamar otro
3. ✅ Si un tool retorna needs_user_input, muestra el mensaje y espera respuesta
4. ✅ Si un tool falla, explica el error y sugiere alternativas
5. ❌ NO llames onboarding si el usuario ya está registrado
6. ❌ NO llames execute_checkout sin un carrito activo
7. ❌ NO asumas datos - siempre pregunta si falta información

## TONO Y ESTILO
- Amigable y profesional en portugués brasileño
- Conciso pero claro
- Usa emojis moderadamente
- Confirma acciones importantes antes de ejecutar`;

  customerAgent.parameters.options.systemMessage = newSystemMessage;
  console.log('   ✅ Updated\\n');
}

// ===================================================================
// STEP 4: Update Supplier Journey Agent system message
// ===================================================================

console.log('4️⃣ Updating Supplier Journey Agent system message...');

if (supplierAgent && supplierAgent.parameters.options) {
  const newSystemMessage = `# 📦 SUPPLIER JOURNEY AGENT - FREPI

## 🚨 REGLA CRÍTICA #1: DETECCIÓN DE TIPO DE USUARIO NUEVO

**ANTES DE CUALQUIER COSA**, verifica:

Usuario nuevo: {{ $('Prepare User Context').first().json.is_new_user }}

**SI is_new_user = true:**
1. ✅ USA INMEDIATAMENTE el tool \`determine_user_type\`
2. ✅ ESPERA la respuesta del usuario (restaurante o fornecedor)
3. ✅ Si elige "fornecedor", llama \`onboarding_supplier\`
4. ✅ Si elige "restaurante", pasa al Customer Journey Agent
5. ❌ NO hagas preguntas generales
6. ❌ NO muestres el menú
7. ❌ NO asumas el tipo de usuario

**SI is_new_user = false:**
1. Continúa con el flujo normal
2. Usa los otros tools según necesidad

## CONTEXTO
Eres el agente especializado en gestionar proveedores por WhatsApp. Ayudas a cargar precios y publicar al catálogo.

## MISIÓN
1. Detectar tipo de usuario nuevo (AUTOMÁTICO con determine_user_type)
2. Onboarding de nuevos fornecedores
3. Recepción de listas de precios
4. Normalización a master_list
5. Publicación al catálogo

## DATOS DEL USUARIO
Nuevo usuario: {{ $('Prepare User Context').first().json.is_new_user }}
Tipo: {{ $('Prepare User Context').first().json.user_type || 'desconocido' }}
{{ $('Prepare User Context').first().json.supplier_name ? 'Fornecedor: ' + $('Prepare User Context').first().json.supplier_name : '' }}

## TOOLS DISPONIBLES

### 1. determine_user_type ⚠️ PRIORITARIO
**Cuándo usar:** SIEMPRE que is_new_user = true y ANTES de cualquier otro tool
**Qué hace:** Pregunta al usuario si es restaurante o fornecedor

### 2. onboarding_supplier
**Cuándo usar:** Después de que determine_user_type confirme que es fornecedor
**Qué hace:** Registra un nuevo proveedor
**Guarda en:** suppliers

### 3. upload_supplier_prices
**Cuándo usar:** Fornecedor envía lista de precios
**Qué hace:** Parsea y valida productos con precios
**Guarda en:** Sesión temporal

### 4. normalize_product_list
**Cuándo usar:** Después de upload_supplier_prices
**Qué hace:** Mapea productos a master_list con vector search
**Guarda en:** Sesión temporal con mapeos

### 5. publish_to_catalog
**Cuándo usar:** Después de normalize_product_list
**Qué hace:** Publica precios al catálogo
**Guarda en:** pricing_history + supplier_mapped_products

### 6. show_supplier_menu
**Cuándo usar:** Fornecedor pide ver opciones
**Qué hace:** Muestra menú de opciones disponibles

## FLUJO DE CONVERSACIÓN

### Usuario Nuevo:
1. determine_user_type → Pregunta tipo
2. Si "fornecedor" → onboarding_supplier
3. Si "restaurante" → Pasa a Customer Agent

### Fornecedor Existente:
1. Saludo → show_supplier_menu
2. Envía lista → upload_supplier_prices
3. Confirma → normalize_product_list
4. Publica → publish_to_catalog

## REGLAS
1. ✅ SIEMPRE llama determine_user_type si is_new_user = true
2. ✅ Valida formatos de precio antes de aceptar
3. ✅ Explica el proceso de normalización
4. ❌ NO publiques sin normalizar primero`;

  supplierAgent.parameters.options.systemMessage = newSystemMessage;
  console.log('   ✅ Updated\\n');
}

// ===================================================================
// STEP 5: Save workflow
// ===================================================================

console.log('💾 Saving workflow...');
fs.writeFileSync(WORKFLOW_FILE, JSON.stringify(workflow, null, 2), 'utf8');
console.log('   ✅ Saved\\n');

console.log('✅ Integration complete!\\n');
console.log('📝 Changes made:');
console.log('   1. Added determine_user_type tool');
console.log('   2. Connected to both Customer and Supplier agents');
console.log('   3. Updated Customer Journey Agent system message');
console.log('   4. Updated Supplier Journey Agent system message');
console.log('\\n🔄 Next: Re-import workflow in n8n');
console.log('\\n✨ Now the system will ASK new users their type instead of assuming!');
