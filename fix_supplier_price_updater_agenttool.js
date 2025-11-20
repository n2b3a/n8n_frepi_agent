// ===================================================================
// SCRIPT: Fix Supplier Price Updater as agentTool
// ===================================================================
// Purpose: Convert Supplier Price Updater from standalone agent to agentTool
// Changes:
// 1. Convert Supplier Price Updater Agent to agentTool type
// 2. Disconnect 4 price tools from Customer Main Agent
// 3. Connect 4 price tools to Supplier Price Updater Agent (agentTool)
// 4. Connect Supplier Price Updater Agent to Customer Main Agent as tool
// 5. Add OpenAI Chat Model for Supplier Price Updater Agent
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

// Find Customer Main Agent
const customerMainAgent = workflow.nodes.find(n =>
  n.name === 'Customer Main Agent' ||
  n.id === 'customer-main-agent-001'
);

if (!customerMainAgent) {
  console.error('❌ Customer Main Agent not found!');
  process.exit(1);
}
console.log('✅ Found Customer Main Agent:', customerMainAgent.id);

// Find Supplier Price Updater Agent (currently wrong type)
let priceUpdaterAgent = workflow.nodes.find(n =>
  n.name === 'Supplier Price Updater Agent' ||
  n.id === 'supplier-price-updater-agent'
);

// If it was removed in previous restructure, we need to recreate it
if (!priceUpdaterAgent) {
  console.log('⚠️  Supplier Price Updater Agent not found - will create it');
  priceUpdaterAgent = null;
} else {
  console.log('✅ Found Supplier Price Updater Agent:', priceUpdaterAgent.id);
}

// Find the 4 price updater tools
const priceTools = [
  'match_with_existing_supplier_mapped',
  'update_prices',
  'proposal_to_match_master_list',
  'confirm_master_list_matches'
];

const priceToolNodes = {};
priceTools.forEach(toolName => {
  const node = workflow.nodes.find(n => n.name === toolName);
  if (node) {
    priceToolNodes[toolName] = node;
    console.log(`✅ Found tool: ${toolName}`);
  } else {
    console.error(`❌ Tool not found: ${toolName}`);
  }
});

// Find existing OpenAI Chat Model to clone settings
const existingChatModel = workflow.nodes.find(n =>
  n.type === '@n8n/n8n-nodes-langchain.lmChatOpenAi'
);

console.log('✅ Found', Object.keys(priceToolNodes).length, 'price updater tools');

// ===================================================================
// STEP 2: Create or Update Supplier Price Updater Agent as agentTool
// ===================================================================

console.log('\n🔧 Step 2: Converting to agentTool...');

// Read system message
const systemMessagePath = path.join(__dirname, 'agents/supplier_price_updater_agent_system_message.md');
let systemMessage = '';
if (fs.existsSync(systemMessagePath)) {
  systemMessage = fs.readFileSync(systemMessagePath, 'utf8')
    .replace(/^# Supplier Price Updater Agent - System Message\s*\n/, '')
    .replace(/^```\s*\n/, '')
    .replace(/\n```\s*$/, '');
}

if (priceUpdaterAgent) {
  // Update existing node to agentTool type
  priceUpdaterAgent.type = '@n8n/n8n-nodes-langchain.agentTool';
  priceUpdaterAgent.typeVersion = 2.2;

  // Keep existing parameters but ensure it's agentTool config
  if (!priceUpdaterAgent.parameters.name) {
    priceUpdaterAgent.parameters.name = 'supplier_price_updater';
  }
  if (!priceUpdaterAgent.parameters.description) {
    priceUpdaterAgent.parameters.description = 'Specialized agent for updating supplier prices reported by restaurants. Handles matching, updating, proposing, and confirming product prices from suppliers.';
  }

  console.log('✅ Converted existing node to agentTool');
} else {
  // Create new agentTool node
  priceUpdaterAgent = {
    "parameters": {
      "name": "supplier_price_updater",
      "description": "Specialized agent for updating supplier prices reported by restaurants. Handles matching, updating, proposing, and confirming product prices from suppliers.",
      "promptType": "define",
      "text": "={{ $json.query }}",
      "options": {
        "systemMessage": systemMessage || "You are the Supplier Price Updater Agent. You help restaurants update prices they receive from suppliers."
      }
    },
    "type": "@n8n/n8n-nodes-langchain.agentTool",
    "typeVersion": 2.2,
    "position": [
      -600,
      1400
    ],
    "id": "supplier-price-updater-agenttool",
    "name": "Supplier Price Updater Agent"
  };

  workflow.nodes.push(priceUpdaterAgent);
  console.log('✅ Created new agentTool node');
}

// ===================================================================
// STEP 3: Create OpenAI Chat Model for agentTool
// ===================================================================

console.log('\n🤖 Step 3: Creating Chat Model for agentTool...');

// Check if chat model already exists for this agent
let priceUpdaterChatModel = workflow.nodes.find(n =>
  n.name === 'OpenAI Chat Model (Price Updater)'
);

if (!priceUpdaterChatModel) {
  priceUpdaterChatModel = {
    "parameters": {
      "model": {
        "__rl": true,
        "mode": "list",
        "value": "gpt-4o-mini"
      },
      "options": {
        "temperature": 0.3,
        "maxTokens": 2000
      }
    },
    "type": "@n8n/n8n-nodes-langchain.lmChatOpenAi",
    "typeVersion": 1.2,
    "position": [
      -720,
      1600
    ],
    "id": "chat-model-price-updater",
    "name": "OpenAI Chat Model (Price Updater)"
  };

  // Copy credentials from existing chat model if available
  if (existingChatModel && existingChatModel.credentials) {
    priceUpdaterChatModel.credentials = existingChatModel.credentials;
  }

  workflow.nodes.push(priceUpdaterChatModel);
  console.log('✅ Created OpenAI Chat Model for agentTool');
} else {
  console.log('✅ OpenAI Chat Model already exists');
}

// ===================================================================
// STEP 4: Update Connections
// ===================================================================

console.log('\n🔗 Step 4: Updating connections...');

// 4.1: Connect Chat Model to Supplier Price Updater Agent (agentTool)
workflow.connections[priceUpdaterChatModel.name] = {
  ai_languageModel: [[{
    node: priceUpdaterAgent.name,
    type: 'ai_languageModel',
    index: 0
  }]]
};
console.log('✅ Connected Chat Model → Supplier Price Updater Agent');

// 4.2: Connect 4 price tools to Supplier Price Updater Agent (NOT Customer Main Agent)
priceTools.forEach(toolName => {
  if (priceToolNodes[toolName]) {
    workflow.connections[toolName] = {
      ai_tool: [[{
        node: priceUpdaterAgent.name,
        type: 'ai_tool',
        index: 0
      }]]
    };
    console.log(`✅ Connected ${toolName} → Supplier Price Updater Agent`);
  }
});

// 4.3: Connect Supplier Price Updater Agent to Customer Main Agent as a tool
workflow.connections[priceUpdaterAgent.name] = {
  ai_tool: [[{
    node: customerMainAgent.name,
    type: 'ai_tool',
    index: 0
  }]]
};
console.log('✅ Connected Supplier Price Updater Agent → Customer Main Agent (as tool)');

// ===================================================================
// STEP 5: Update Customer Main Agent System Message
// ===================================================================

console.log('\n📝 Step 5: Updating Customer Main Agent system message...');

let customerSystemMessage = customerMainAgent.parameters.options.systemMessage;

// Remove individual price updater tools from documentation
const toolsToRemove = [
  '### 8. match_with_existing_supplier_mapped',
  '### 9. update_prices',
  '### 10. proposal_to_match_master_list',
  '### 11. confirm_master_list_matches'
];

toolsToRemove.forEach(toolHeader => {
  const startIndex = customerSystemMessage.indexOf(toolHeader);
  if (startIndex !== -1) {
    // Find next ### or end of string
    const nextToolIndex = customerSystemMessage.indexOf('\n###', startIndex + 1);
    const endIndex = nextToolIndex !== -1 ? nextToolIndex : customerSystemMessage.length;

    // Remove this section
    customerSystemMessage = customerSystemMessage.substring(0, startIndex) +
                           customerSystemMessage.substring(endIndex);
  }
});

// Add supplier_price_updater tool documentation
const supplierPriceUpdaterToolDoc = `

### 8. supplier_price_updater
**Cuándo usar:** Usuario reporta precios de fornecedor (keywords: "recebi cotação", "preços novos", "fornecedor mandou", "atualizar preços")
**Qué hace:** Sub-agente especializado que maneja TODO el flujo de actualización de precios
**Capacidades:**
- Busca y valida fornecedor
- Match automático de produtos con catálogo (dual strategy: vector search + previous purchases)
- Actualiza precios confirmados
- Genera propuestas para produtos sin master_list_id
- Procesa confirmaciones del usuario
- Trackea relaciones restaurante-fornecedor
**Input:** Mensaje del usuario (conversacional)
**Returns:** Confirmación completa con resumen de precios actualizados

**Keywords de detección:**
- "recebi cotação"
- "recebi preços"
- "fornecedor mandou"
- "atualizar preços"
- "preços novos"
- "[fornecedor] mandou [produto] [preço]"

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
`;

// Insert before the FLUJO section or at the end of tools
const flowIndex = customerSystemMessage.indexOf('## FLUJO');
if (flowIndex !== -1) {
  customerSystemMessage = customerSystemMessage.substring(0, flowIndex) +
                         supplierPriceUpdaterToolDoc + '\n\n' +
                         customerSystemMessage.substring(flowIndex);
} else {
  // Add at the end of tools section
  const toolsEndIndex = customerSystemMessage.indexOf('## REGLAS');
  if (toolsEndIndex !== -1) {
    customerSystemMessage = customerSystemMessage.substring(0, toolsEndIndex) +
                           supplierPriceUpdaterToolDoc + '\n\n' +
                           customerSystemMessage.substring(toolsEndIndex);
  }
}

customerMainAgent.parameters.options.systemMessage = customerSystemMessage;
console.log('✅ Updated Customer Main Agent system message');

// ===================================================================
// STEP 6: Clean Up Old Connections
// ===================================================================

console.log('\n🧹 Step 6: Cleaning up...');

// Remove any old routing nodes if they still exist
const nodesToRemove = [
  'Check: Delegate to Price Updater?',
  'Prepare Price Updater Input',
  'Extract Price Updater Output',
  'if-delegate-price-updater'
];

nodesToRemove.forEach(nodeName => {
  const index = workflow.nodes.findIndex(n => n.name === nodeName || n.id === nodeName);
  if (index !== -1) {
    workflow.nodes.splice(index, 1);
    delete workflow.connections[nodeName];
    console.log(`  ✅ Removed: ${nodeName}`);
  }
});

// ===================================================================
// STEP 7: Save Updated Workflow
// ===================================================================

console.log('\n💾 Step 7: Saving corrected workflow...');

// Create backup
const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
const backupPath = path.join(__dirname, `Frepi MVP2 - BACKUP-before-agenttool-fix-${timestamp}.json`);
fs.writeFileSync(backupPath, fs.readFileSync(workflowPath, 'utf8'));
console.log(`✅ Backup created: ${backupPath}`);

// Save updated workflow
fs.writeFileSync(workflowPath, JSON.stringify(workflow, null, 2));
console.log(`✅ Corrected workflow saved: ${workflowPath}`);

// ===================================================================
// STEP 8: Validation
// ===================================================================

console.log('\n✅ Step 8: Validating structure...');

// Verify agentTool exists
const finalAgentTool = workflow.nodes.find(n =>
  n.type === '@n8n/n8n-nodes-langchain.agentTool'
);

if (finalAgentTool) {
  console.log('✅ Supplier Price Updater Agent is now agentTool');
  console.log('   Type:', finalAgentTool.type);
  console.log('   Name:', finalAgentTool.parameters.name);
} else {
  console.error('❌ agentTool not found!');
}

// Verify connections
console.log('\n🔗 Connection verification:');

// Check price tools → agentTool
priceTools.forEach(toolName => {
  const conn = workflow.connections[toolName];
  if (conn && conn.ai_tool && conn.ai_tool[0] && conn.ai_tool[0][0]) {
    const target = conn.ai_tool[0][0].node;
    console.log(`  ${toolName} → ${target}`, target === priceUpdaterAgent.name ? '✅' : '❌');
  }
});

// Check agentTool → Customer Main Agent
const agentToolConn = workflow.connections[priceUpdaterAgent.name];
if (agentToolConn && agentToolConn.ai_tool && agentToolConn.ai_tool[0] && agentToolConn.ai_tool[0][0]) {
  const target = agentToolConn.ai_tool[0][0].node;
  console.log(`  Supplier Price Updater Agent → ${target}`, target === customerMainAgent.name ? '✅' : '❌');
}

// Check chat model → agentTool
const chatModelConn = workflow.connections[priceUpdaterChatModel.name];
if (chatModelConn && chatModelConn.ai_languageModel && chatModelConn.ai_languageModel[0] && chatModelConn.ai_languageModel[0][0]) {
  const target = chatModelConn.ai_languageModel[0][0].node;
  console.log(`  Chat Model → ${target}`, target === priceUpdaterAgent.name ? '✅' : '❌');
}

// ===================================================================
// STEP 9: Summary
// ===================================================================

console.log('\n' + '='.repeat(70));
console.log('🎉 CORRECTION COMPLETE!');
console.log('='.repeat(70));
console.log('');
console.log('✅ Structure corrected:');
console.log('   1. ✅ Supplier Price Updater Agent → agentTool type');
console.log('   2. ✅ 4 price tools → connected to agentTool');
console.log('   3. ✅ agentTool → connected to Customer Main Agent');
console.log('   4. ✅ OpenAI Chat Model created for agentTool');
console.log('   5. ✅ Customer Main Agent system message updated');
console.log('   6. ✅ Routing nodes removed');
console.log('');
console.log('🏗️  Final architecture:');
console.log('   Customer Main Agent');
console.log('     ├─ determine_user_type (tool)');
console.log('     ├─ onboarding_restaurant (tool)');
console.log('     ├─ setup_buying_preferences (tool)');
console.log('     ├─ search_products_vector (tool)');
console.log('     ├─ build_shopping_cart (tool)');
console.log('     ├─ execute_checkout (tool)');
console.log('     ├─ show_customer_menu (tool)');
console.log('     └─ supplier_price_updater (agentTool)');
console.log('          ├─ match_with_existing_supplier_mapped (tool)');
console.log('          ├─ update_prices (tool)');
console.log('          ├─ proposal_to_match_master_list (tool)');
console.log('          └─ confirm_master_list_matches (tool)');
console.log('');
console.log('📊 Node count:', workflow.nodes.length);
console.log('');
console.log('🚀 Next steps:');
console.log('   1. Import corrected workflow into n8n');
console.log('   2. Verify Supplier Price Updater Agent shows as agentTool');
console.log('   3. Test: "Recebi cotação da Friboi: picanha R$ 47/kg"');
console.log('   4. Customer Main Agent should use supplier_price_updater tool');
console.log('   5. That tool (sub-agent) will handle entire flow');
console.log('');
console.log('='.repeat(70));
