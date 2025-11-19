// ===================================================================
// SCRIPT: Integrate Supplier Price Updater Agent into Workflow
// ===================================================================
// Purpose: Add all nodes, tools, and connections for price updater
// ===================================================================

const fs = require('fs');
const path = require('path');

// Read workflow JSON
const workflowPath = path.join(__dirname, 'Frepi MVP2 - Full Architecture with Supabase Validations.json');
const workflow = JSON.parse(fs.readFileSync(workflowPath, 'utf8'));

console.log('📂 Loaded workflow:', workflow.name);
console.log('📊 Current nodes:', workflow.nodes.length);

// Read tool code files
const matchToolCode = fs.readFileSync(path.join(__dirname, 'tools/match_with_existing_supplier_mapped_COMPLETE.js'), 'utf8');
const updatePricesCode = fs.readFileSync(path.join(__dirname, 'tools/update_prices_COMPLETE.js'), 'utf8');
const proposalCode = fs.readFileSync(path.join(__dirname, 'tools/proposal_to_match_master_list_COMPLETE.js'), 'utf8');
const confirmCode = fs.readFileSync(path.join(__dirname, 'tools/confirm_master_list_matches_COMPLETE.js'), 'utf8');

// Read agent system message
const agentSystemMessage = fs.readFileSync(path.join(__dirname, 'agents/supplier_price_updater_agent_system_message.md'), 'utf8');

// ===================================================================
// STEP 1: Add Tool Nodes
// ===================================================================

console.log('\n🔧 Adding tool nodes...');

const newNodes = [];

// Tool 1: match_with_existing_supplier_mapped
newNodes.push({
  "parameters": {
    "description": "Match reported product prices with existing supplier catalog using vector search. Returns products grouped by: (1) ready to update (has master_list_id), (2) needs manual match (no master_list_id), (3) new products (not found). Inputs: product_list (array), supplier_name (string), restaurant_id (number), phone_number (string)",
    "jsCode": matchToolCode,
    "schemaType": "fromAI"
  },
  "type": "@n8n/n8n-nodes-langchain.toolCode",
  "typeVersion": 1.3,
  "position": [-800, 1600],
  "id": "tool-match-supplier-mapped",
  "name": "match_with_existing_supplier_mapped"
});

// Tool 2: update_prices
newNodes.push({
  "parameters": {
    "description": "Update prices in supplier_mapped_products for confirmed matches. Logs price changes and updates restaurant-supplier relationship statistics. Inputs: products_to_update (array of {supplier_mapped_product_id, new_price, unit, product_name}), restaurant_id (number), supplier_id (number)",
    "jsCode": updatePricesCode,
    "schemaType": "fromAI"
  },
  "type": "@n8n/n8n-nodes-langchain.toolCode",
  "typeVersion": 1.3,
  "position": [-640, 1600],
  "id": "tool-update-prices",
  "name": "update_prices"
});

// Tool 3: proposal_to_match_master_list
newNodes.push({
  "parameters": {
    "description": "Generate match proposals for products that don't have master_list_id. Returns top 3-5 suggestions from master_list with similarity scores. Inputs: products_to_match (array of {product_name, supplier_mapped_product_id, reported_price, unit}), top_n (number, optional, default: 3)",
    "jsCode": proposalCode,
    "schemaType": "fromAI"
  },
  "type": "@n8n/n8n-nodes-langchain.toolCode",
  "typeVersion": 1.3,
  "position": [-480, 1600],
  "id": "tool-proposal-match",
  "name": "proposal_to_match_master_list"
});

// Tool 4: confirm_master_list_matches
newNodes.push({
  "parameters": {
    "description": "Process user confirmations and link supplier products to master_list. Accepts format like '1→1, 2→2, 3→none' or 'confirmar tudo'. Inputs: confirmation_string (string), proposals (array from proposal_to_match_master_list output)",
    "jsCode": confirmCode,
    "schemaType": "fromAI"
  },
  "type": "@n8n/n8n-nodes-langchain.toolCode",
  "typeVersion": 1.3,
  "position": [-320, 1600],
  "id": "tool-confirm-matches",
  "name": "confirm_master_list_matches"
});

console.log('✅ Added 4 tool nodes');

// ===================================================================
// STEP 2: Add Supplier Price Updater Agent Node
// ===================================================================

console.log('🤖 Adding Supplier Price Updater Agent...');

newNodes.push({
  "parameters": {
    "promptType": "define",
    "text": "={{ $json.message }}",
    "options": {
      "systemMessage": agentSystemMessage,
      "temperature": 0.3,
      "maxTokens": 2000
    }
  },
  "type": "@n8n/n8n-nodes-langchain.agent",
  "typeVersion": 2.2,
  "position": [-600, 1400],
  "id": "supplier-price-updater-agent",
  "name": "Supplier Price Updater Agent"
});

console.log('✅ Added Supplier Price Updater Agent');

// ===================================================================
// STEP 3: Add Router and Mapping Nodes
// ===================================================================

console.log('🔀 Adding router and mapping nodes...');

// IF Node: Check delegation
newNodes.push({
  "parameters": {
    "conditions": {
      "options": {
        "caseSensitive": true,
        "leftValue": "",
        "typeValidation": "strict"
      },
      "conditions": [
        {
          "leftValue": "={{ $json.action }}",
          "rightValue": "delegate_to_price_updater",
          "operator": {
            "type": "string",
            "operation": "equals"
          }
        }
      ],
      "combinator": "and"
    },
    "options": {}
  },
  "type": "n8n-nodes-base.if",
  "typeVersion": 2,
  "position": [-880, 1200],
  "id": "if-delegate-price-updater",
  "name": "Check: Delegate to Price Updater?"
});

// Code Node: Prepare Input
newNodes.push({
  "parameters": {
    "jsCode": `// Prepare input for Supplier Price Updater Agent
const input = $input.all();

return input.map(item => {
  const data = item.json;

  return {
    json: {
      // User's original message
      message: data.initial_message || data.message,

      // Supplier name (if extracted)
      supplier_name: data.supplier_name || null,

      // Context from Customer Journey Agent
      restaurant_id: data.context?.restaurant_id || data.restaurant_id,
      restaurant_person_id: data.context?.restaurant_person_id || data.restaurant_person_id,
      phone_number: data.context?.phone_number || data.phone_number,
      person_name: data.context?.person_name || data.person_name,
      company_name: data.context?.company_name || data.company_name,

      // Session info
      session_id: \`\${data.context?.phone_number || data.phone_number}_price_updater\`,
      timestamp: new Date().toISOString()
    }
  };
});`
  },
  "type": "n8n-nodes-base.code",
  "typeVersion": 2,
  "position": [-720, 1280],
  "id": "prepare-price-updater-input",
  "name": "Prepare Price Updater Input"
});

// Code Node: Extract Output
newNodes.push({
  "parameters": {
    "jsCode": `// Extract output from Supplier Price Updater Agent
const items = $input.all();

return items.map(item => ({
  json: {
    // Message to send to user
    body: item.json.output || item.json.message_to_user || item.json.message,

    // Keep phone number for WhatsApp
    phone_number: item.json.phone_number,

    // Keep metadata
    metadata: item.json.metadata || {},

    // Mark as price update flow
    from_price_updater: true
  }
}));`
  },
  "type": "n8n-nodes-base.code",
  "typeVersion": 2,
  "position": [-400, 1400],
  "id": "extract-price-updater-output",
  "name": "Extract Price Updater Output"
});

console.log('✅ Added 3 routing/mapping nodes');

// ===================================================================
// STEP 4: Update Customer Journey Agent System Message
// ===================================================================

console.log('📝 Updating Customer Journey Agent...');

const customerJourneyNode = workflow.nodes.find(n => n.id === 'customer-journey-agent-001');

if (customerJourneyNode) {
  const currentSystemMessage = customerJourneyNode.parameters.options.systemMessage;

  // Add delegation section before "## TOOLS DISPONIBLES"
  const delegationSection = `

## 🔀 DELEGATION: Price Updates from Suppliers

When user wants to report prices from suppliers, delegate to Supplier Price Updater Agent.

**Detection keywords:**
- "recebi cotação"
- "recebi preços"
- "fornecedor mandou"
- "atualizar preços"
- "preços novos"
- "[fornecedor] mandou [produto] [preço]"
- Conversational format: "picanha R$ 47"

**How to delegate:**

When you detect price update intent:

1. **Acknowledge:** "Vou processar a cotação. Um momento..."

2. **Return this JSON structure:**
   {
     "action": "delegate_to_price_updater",
     "supplier_name": "extracted supplier name (or null if not mentioned)",
     "initial_message": "user's original message",
     "context": {
       "restaurant_id": {{ restaurant_id from context }},
       "restaurant_person_id": {{ restaurant_person_id }},
       "phone_number": "{{ phone_number }}",
       "person_name": "{{ person_name }}",
       "company_name": "{{ company_name }}"
     }
   }

3. **Wait:** The Supplier Price Updater Agent will handle everything

4. **Resume:** When control returns, continue normal conversation

**Examples:**

User: "Recebi cotação da Friboi: picanha R$ 47/kg"
→ Delegate with supplier_name: "Friboi"

User: "Recebi cotação: picanha 47 reais"
→ Delegate with supplier_name: null (agent will ask)

**Do NOT delegate for:**
- Searching products to buy
- Building shopping cart
- General questions about prices
`;

  // Insert delegation section before "## TOOLS DISPONIBLES"
  const updatedSystemMessage = currentSystemMessage.replace(
    '## TOOLS DISPONIBLES',
    delegationSection + '\n## TOOLS DISPONIBLES'
  );

  customerJourneyNode.parameters.options.systemMessage = updatedSystemMessage;
  console.log('✅ Updated Customer Journey Agent system message');
} else {
  console.error('❌ Customer Journey Agent node not found!');
}

// ===================================================================
// STEP 5: Add New Nodes to Workflow
// ===================================================================

console.log('\n➕ Adding all new nodes to workflow...');

workflow.nodes.push(...newNodes);

console.log(`✅ Total nodes now: ${workflow.nodes.length}`);

// ===================================================================
// STEP 6: Update Connections
// ===================================================================

console.log('\n🔗 Updating connections...');

// Find Customer Journey Agent output connection
const customerJourneyConnections = workflow.connections['Customer Journey Agent'];

// Store old connection (to WhatsApp Send)
const oldMainConnection = customerJourneyConnections?.main?.[0] || [];

// Update Customer Journey Agent → IF Node
workflow.connections['Customer Journey Agent'] = {
  main: [[{
    node: 'Check: Delegate to Price Updater?',
    type: 'main',
    index: 0
  }]]
};

// IF Node connections
workflow.connections['Check: Delegate to Price Updater?'] = {
  main: [
    // TRUE branch: Delegate to price updater
    [{
      node: 'Prepare Price Updater Input',
      type: 'main',
      index: 0
    }],
    // FALSE branch: Normal flow (keep existing connection)
    oldMainConnection
  ]
};

// Prepare Input → Supplier Price Updater Agent
workflow.connections['Prepare Price Updater Input'] = {
  main: [[{
    node: 'Supplier Price Updater Agent',
    type: 'main',
    index: 0
  }]]
};

// Supplier Price Updater Agent → Extract Output
workflow.connections['Supplier Price Updater Agent'] = {
  main: [[{
    node: 'Extract Price Updater Output',
    type: 'main',
    index: 0
  }]]
};

// Extract Output → WhatsApp Send (find the WhatsApp Send node)
const whatsappSendNode = workflow.nodes.find(n => n.name === 'WhatsApp Send' || n.type === 'n8n-nodes-base.whatsAppSend');

if (whatsappSendNode) {
  workflow.connections['Extract Price Updater Output'] = {
    main: [[{
      node: whatsappSendNode.name,
      type: 'main',
      index: 0
    }]]
  };
  console.log(`✅ Connected Extract Output → ${whatsappSendNode.name}`);
}

// Connect tools to Supplier Price Updater Agent (ai_tool connections)
workflow.connections['match_with_existing_supplier_mapped'] = {
  ai_tool: [[{
    node: 'Supplier Price Updater Agent',
    type: 'ai_tool',
    index: 0
  }]]
};

workflow.connections['update_prices'] = {
  ai_tool: [[{
    node: 'Supplier Price Updater Agent',
    type: 'ai_tool',
    index: 0
  }]]
};

workflow.connections['proposal_to_match_master_list'] = {
  ai_tool: [[{
    node: 'Supplier Price Updater Agent',
    type: 'ai_tool',
    index: 0
  }]]
};

workflow.connections['confirm_master_list_matches'] = {
  ai_tool: [[{
    node: 'Supplier Price Updater Agent',
    type: 'ai_tool',
    index: 0
  }]]
};

console.log('✅ Added tool→agent ai_tool connections');

// ===================================================================
// STEP 7: Save Updated Workflow
// ===================================================================

console.log('\n💾 Saving updated workflow...');

// Create backup
const backupPath = path.join(__dirname, 'Frepi MVP2 - Full Architecture with Supabase Validations.BACKUP.json');
fs.writeFileSync(backupPath, fs.readFileSync(workflowPath, 'utf8'));
console.log(`✅ Backup created: ${backupPath}`);

// Save updated workflow
fs.writeFileSync(workflowPath, JSON.stringify(workflow, null, 2));
console.log(`✅ Updated workflow saved: ${workflowPath}`);

// ===================================================================
// STEP 8: Summary
// ===================================================================

console.log('\n' + '='.repeat(60));
console.log('🎉 INTEGRATION COMPLETE!');
console.log('='.repeat(60));
console.log('');
console.log('✅ Added nodes:');
console.log('   - 4 tool Code nodes (match, update, proposal, confirm)');
console.log('   - 1 AI Agent node (Supplier Price Updater Agent)');
console.log('   - 1 IF node (router for delegation)');
console.log('   - 2 Code nodes (prepare input, extract output)');
console.log('');
console.log('✅ Updated:');
console.log('   - Customer Journey Agent system message (delegation logic)');
console.log('   - Connections for delegation flow');
console.log('   - Tool→Agent ai_tool connections');
console.log('');
console.log(`📊 Total nodes: ${workflow.nodes.length}`);
console.log('');
console.log('🚀 Next steps:');
console.log('   1. Execute database setup:');
console.log('      - database/restaurant_supplier_relationships_schema.sql');
console.log('      - database/supabase_rpc_functions.sql');
console.log('   2. Import updated workflow into n8n');
console.log('   3. Test with: "Recebi cotação da Friboi: picanha R$ 47"');
console.log('');
console.log('📚 Documentation:');
console.log('   - SUPPLIER_PRICE_UPDATER_IMPLEMENTATION_SUMMARY.md');
console.log('');
console.log('='.repeat(60));
