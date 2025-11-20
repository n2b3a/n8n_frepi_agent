// ===================================================================
// SCRIPT: Restructure Workflow - Customer Main Agent Architecture
// ===================================================================
// Purpose: Fix architecture to have all tools inside Customer Main Agent
// Changes:
// 1. Rename "Customer Journey Agent" → "Customer Main Agent"
// 2. Remove "Supplier Price Updater Agent" (separate agent)
// 3. Remove routing nodes (IF, Prepare Input, Extract Output)
// 4. Connect all 10 tools directly to Customer Main Agent
// 5. Update system message with price updater logic
// ===================================================================

const fs = require('fs');
const path = require('path');

// Read workflow JSON
const workflowPath = path.join(__dirname, 'Frepi MVP2 - Full Architecture with Supabase Validations.json');
const workflow = JSON.parse(fs.readFileSync(workflowPath, 'utf8'));

console.log('📂 Loaded workflow:', workflow.name);
console.log('📊 Current nodes:', workflow.nodes.length);

// ===================================================================
// STEP 1: Find and Rename Customer Journey Agent → Customer Main Agent
// ===================================================================

console.log('\n🔄 Step 1: Renaming Customer Journey Agent...');

const customerAgent = workflow.nodes.find(n => n.id === 'customer-journey-agent-001' || n.name === 'Customer Journey Agent');

if (customerAgent) {
  customerAgent.name = 'Customer Main Agent';
  customerAgent.id = 'customer-main-agent-001';
  console.log('✅ Renamed to: Customer Main Agent');
} else {
  console.error('❌ Customer Journey Agent not found!');
  process.exit(1);
}

// ===================================================================
// STEP 2: Update Customer Main Agent System Message
// ===================================================================

console.log('\n📝 Step 2: Updating Customer Main Agent system message...');

// Read the price updater system message content
const priceUpdaterSystemMessage = fs.readFileSync(
  path.join(__dirname, 'agents/supplier_price_updater_agent_system_message.md'),
  'utf8'
);

// Extract just the core instructions (remove the header)
const priceUpdaterInstructions = priceUpdaterSystemMessage
  .replace(/^# Supplier Price Updater Agent - System Message\s*\n/, '')
  .replace(/^```\s*\n/, '')
  .replace(/\n```\s*$/, '');

// Update system message
const currentSystemMessage = customerAgent.parameters.options.systemMessage;

// Add price updater tools section
const newToolsSection = `

### 8. match_with_existing_supplier_mapped
**Cuándo usar:** Usuario reporta precios de fornecedor (keywords: "recebi cotação", "preços novos")
**Qué hace:** Match productos con catálogo usando dual strategy (vector search + previous purchases)
**Input:** product_list, supplier_name, restaurant_id, phone_number
**Returns:** products_with_master_list_id, products_without_master_list_id, new_products

### 9. update_prices
**Cuándo usar:** Después de match_with_existing_supplier_mapped para productos confirmados
**Qué hace:** Actualiza precios en supplier_mapped_products
**Input:** products_to_update, restaurant_id, supplier_id
**Returns:** Updated prices con change statistics

### 10. proposal_to_match_master_list
**Cuándo usar:** Para productos sin master_list_id que necesitan matching manual
**Qué hace:** Genera top 3-5 sugerencias con similarity scores
**Input:** products_to_match, top_n (default: 3)
**Returns:** Proposals con confidence scores (🟢 🟡 🔴)

### 11. confirm_master_list_matches
**Cuándo usar:** Después de proposal cuando usuario confirma matches
**Qué hace:** Procesa confirmaciones y linkea productos a master_list
**Input:** confirmation_string ("1→1, 2→2" o "confirmar tudo"), proposals
**Returns:** Linked products

## FLUJO PRICE UPDATE (Nuevo)

Cuando usuario dice "recebi cotação" o similares:

1. **Match productos:** call match_with_existing_supplier_mapped
2. **Update automático:** call update_prices para products_with_master_list_id
3. **Propuestas:** call proposal_to_match_master_list para products_without_master_list_id
4. **User confirma:** "1→1, 2→2"
5. **Confirmar:** call confirm_master_list_matches
6. **Update nuevos:** call update_prices para newly linked products
7. **Resumen:** Mostrar resultado final

**Keywords de detección:**
- "recebi cotação"
- "recebi preços"
- "fornecedor mandou"
- "atualizar preços"
- "preços novos"
- "[fornecedor] mandou [produto] [preço]"

**NO confundir con:**
- "quero comprar" → usar search_products_vector
- "quanto custa" → búsqueda normal
`;

// Insert new tools section before existing tools
const updatedSystemMessage = currentSystemMessage.replace(
  '### 1. determine_user_type',
  newToolsSection + '\n\n### 1. determine_user_type'
);

customerAgent.parameters.options.systemMessage = updatedSystemMessage;

console.log('✅ System message updated with price updater tools');

// ===================================================================
// STEP 3: Remove Supplier Price Updater Agent Node
// ===================================================================

console.log('\n🗑️  Step 3: Removing Supplier Price Updater Agent...');

const agentToRemove = workflow.nodes.findIndex(n => n.id === 'supplier-price-updater-agent' || n.name === 'Supplier Price Updater Agent');

if (agentToRemove !== -1) {
  workflow.nodes.splice(agentToRemove, 1);
  console.log('✅ Removed Supplier Price Updater Agent');
} else {
  console.log('⚠️  Supplier Price Updater Agent not found (may already be removed)');
}

// ===================================================================
// STEP 4: Remove Routing Nodes (IF, Prepare, Extract)
// ===================================================================

console.log('\n🗑️  Step 4: Removing routing nodes...');

const nodesToRemove = [
  'if-delegate-price-updater',
  'Check: Delegate to Price Updater?',
  'prepare-price-updater-input',
  'Prepare Price Updater Input',
  'extract-price-updater-output',
  'Extract Price Updater Output'
];

let removedCount = 0;
nodesToRemove.forEach(nodeName => {
  const index = workflow.nodes.findIndex(n => n.id === nodeName || n.name === nodeName);
  if (index !== -1) {
    workflow.nodes.splice(index, 1);
    removedCount++;
    console.log(`  ✅ Removed: ${nodeName}`);
  }
});

console.log(`✅ Removed ${removedCount} routing nodes`);

// ===================================================================
// STEP 5: Update Tool Connections (all tools → Customer Main Agent)
// ===================================================================

console.log('\n🔗 Step 5: Reconnecting tools to Customer Main Agent...');

// List of all tools that should connect to Customer Main Agent
const toolsToConnect = [
  'determine_user_type',
  'onboarding_restaurant',
  'onboarding_supplier',
  'setup_buying_preferences',
  'search_products_vector',
  'build_shopping_cart',
  'execute_checkout',
  'show_customer_menu',
  'show_supplier_menu',
  'upload_supplier_prices',
  'normalize_product_list',
  'publish_to_catalog',
  'match_with_existing_supplier_mapped',
  'update_prices',
  'proposal_to_match_master_list',
  'confirm_master_list_matches'
];

toolsToConnect.forEach(toolName => {
  if (workflow.connections[toolName]) {
    // Update existing connection
    workflow.connections[toolName] = {
      ai_tool: [[{
        node: 'Customer Main Agent',
        type: 'ai_tool',
        index: 0
      }]]
    };
  } else {
    // Create new connection
    workflow.connections[toolName] = {
      ai_tool: [[{
        node: 'Customer Main Agent',
        type: 'ai_tool',
        index: 0
      }]]
    };
  }
});

console.log(`✅ Connected ${toolsToConnect.length} tools to Customer Main Agent`);

// ===================================================================
// STEP 6: Fix Customer Main Agent Output Connection
// ===================================================================

console.log('\n🔗 Step 6: Fixing Customer Main Agent output...');

// Find WhatsApp Send or next node in flow
const routerNode = workflow.nodes.find(n =>
  n.name === 'Router: Customer or Supplier' ||
  n.id === 'router_if_1763503554746'
);

if (routerNode) {
  // Customer Main Agent should connect to WhatsApp Send directly
  // Find what the router's TRUE branch connects to
  const routerConnections = workflow.connections[routerNode.name];

  if (routerConnections && routerConnections.main && routerConnections.main[0]) {
    const trueConnection = routerConnections.main[0][0];

    // Update Customer Main Agent to connect to same target
    workflow.connections['Customer Main Agent'] = {
      main: [[trueConnection]]
    };

    console.log(`✅ Customer Main Agent → ${trueConnection.node}`);
  }
} else {
  console.log('⚠️  Router node not found, keeping existing connections');
}

// ===================================================================
// STEP 7: Clean Up Old Connections
// ===================================================================

console.log('\n🧹 Step 7: Cleaning up old connections...');

// Remove connections from deleted nodes
delete workflow.connections['Supplier Price Updater Agent'];
delete workflow.connections['Check: Delegate to Price Updater?'];
delete workflow.connections['Prepare Price Updater Input'];
delete workflow.connections['Extract Price Updater Output'];
delete workflow.connections['if-delegate-price-updater'];

// Update any references to "Customer Journey Agent" in connections
if (workflow.connections['Customer Journey Agent']) {
  workflow.connections['Customer Main Agent'] = workflow.connections['Customer Journey Agent'];
  delete workflow.connections['Customer Journey Agent'];
}

console.log('✅ Cleaned up old connections');

// ===================================================================
// STEP 8: Save Updated Workflow
// ===================================================================

console.log('\n💾 Step 8: Saving restructured workflow...');

// Create backup
const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
const backupPath = path.join(__dirname, `Frepi MVP2 - BACKUP-before-restructure-${timestamp}.json`);
fs.writeFileSync(backupPath, fs.readFileSync(workflowPath, 'utf8'));
console.log(`✅ Backup created: ${backupPath}`);

// Save updated workflow
fs.writeFileSync(workflowPath, JSON.stringify(workflow, null, 2));
console.log(`✅ Restructured workflow saved: ${workflowPath}`);

// ===================================================================
// STEP 9: Summary
// ===================================================================

console.log('\n' + '='.repeat(70));
console.log('🎉 RESTRUCTURE COMPLETE!');
console.log('='.repeat(70));
console.log('');
console.log('✅ Changes made:');
console.log('   1. ✅ Renamed: Customer Journey Agent → Customer Main Agent');
console.log('   2. ✅ Removed: Supplier Price Updater Agent (separate agent)');
console.log(`   3. ✅ Removed: ${removedCount} routing nodes (IF, Prepare, Extract)`);
console.log(`   4. ✅ Connected: ${toolsToConnect.length} tools → Customer Main Agent`);
console.log('   5. ✅ Updated: System message with price updater instructions');
console.log('');
console.log('📊 Workflow stats:');
console.log(`   - Total nodes: ${workflow.nodes.length}`);
console.log(`   - Tools connected to Customer Main Agent: ${toolsToConnect.length}`);
console.log('');
console.log('🏗️  New architecture:');
console.log('   Router: Customer or Supplier');
console.log('     ├─ TRUE → Customer Main Agent (with 16 tools)');
console.log('     └─ FALSE → Supplier Journey Agent');
console.log('');
console.log('🔧 Customer Main Agent tools:');
console.log('   Registration (2): determine_user_type, onboarding_restaurant');
console.log('   Preferences (1): setup_buying_preferences');
console.log('   Shopping (3): search_products_vector, build_shopping_cart, execute_checkout');
console.log('   Menu (1): show_customer_menu');
console.log('   Price Update (4): match_supplier_mapped, update_prices, proposal, confirm');
console.log('   Supplier (3): onboarding_supplier, upload_prices, normalize, publish');
console.log('');
console.log('🚀 Next steps:');
console.log('   1. Import updated workflow into n8n');
console.log('   2. Test price update flow:');
console.log('      "Recebi cotação da Friboi: picanha R$ 47/kg"');
console.log('   3. Verify all 16 tools appear in Customer Main Agent');
console.log('');
console.log('='.repeat(70));
