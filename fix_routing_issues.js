#!/usr/bin/env node
// ===================================================================
// Script to fix workflow routing issues
// ===================================================================
// Fixes:
// 1. Remove duplicate "Route: Customer or Supplier?" node
// 2. Connect Extract Message Data properly
// 3. Ensure correct flow: WhatsApp → Extract → Registration → Router
// ===================================================================

const fs = require('fs');

const WORKFLOW_FILE = 'Frepi MVP2 - Full Architecture with Supabase Validations.json';

console.log('🔧 Fixing workflow routing issues...\n');

// Read workflow
const workflow = JSON.parse(fs.readFileSync(WORKFLOW_FILE, 'utf8'));

// ===================================================================
// STEP 1: Identify duplicate Router nodes
// ===================================================================

console.log('1️⃣ Finding Router nodes...');

const routerNodes = workflow.nodes.filter(n =>
  n.name && (
    n.name.toLowerCase().includes('route') ||
    n.name.toLowerCase().includes('router')
  ) && n.type === 'n8n-nodes-base.if'
);

console.log('   Found Router nodes:');
routerNodes.forEach(n => {
  console.log(`   - "${n.name}" (id: ${n.id})`);
});

// Keep the NEW router (created by integrate_registration_agent.js)
const newRouter = routerNodes.find(n => n.name === 'Router: Customer or Supplier');
const oldRouter = routerNodes.find(n => n.name === 'Route: Customer or Supplier?');

if (oldRouter) {
  console.log(`   ❌ Will remove OLD router: "${oldRouter.name}"\n`);
} else {
  console.log('   ℹ️  Old router already removed\n');
}

// ===================================================================
// STEP 2: Remove old Router node
// ===================================================================

if (oldRouter) {
  console.log('2️⃣ Removing old Router node...');

  // Remove from nodes array
  workflow.nodes = workflow.nodes.filter(n => n.id !== oldRouter.id);

  // Remove connections FROM old router
  if (workflow.connections[oldRouter.name]) {
    delete workflow.connections[oldRouter.name];
  }

  // Remove connections TO old router
  Object.keys(workflow.connections).forEach(fromNode => {
    const nodeConnections = workflow.connections[fromNode];

    Object.keys(nodeConnections).forEach(connectionType => {
      nodeConnections[connectionType] = nodeConnections[connectionType].map(outputConnections => {
        return outputConnections.filter(connection => connection.node !== oldRouter.name);
      });
    });
  });

  console.log('   ✅ Old Router removed\n');
}

// ===================================================================
// STEP 3: Find key nodes
// ===================================================================

console.log('3️⃣ Finding key nodes...');

const whatsappTrigger = workflow.nodes.find(n =>
  n.name && n.name.toLowerCase().includes('whatsapp')
);

const extractMessageData = workflow.nodes.find(n =>
  n.name === 'Extract Message Data'
);

const registrationAgent = workflow.nodes.find(n =>
  n.name === 'Registration Agent'
);

const customerAgent = workflow.nodes.find(n =>
  n.name === 'Customer Journey Agent'
);

const supplierAgent = workflow.nodes.find(n =>
  n.name === 'Supplier Journey Agent'
);

console.log('   Found nodes:');
if (whatsappTrigger) console.log(`   ✅ WhatsApp Trigger: "${whatsappTrigger.name}"`);
if (extractMessageData) console.log(`   ✅ Extract Message Data: "${extractMessageData.name}"`);
if (registrationAgent) console.log(`   ✅ Registration Agent: "${registrationAgent.name}"`);
if (newRouter) console.log(`   ✅ New Router: "${newRouter.name}"`);
if (customerAgent) console.log(`   ✅ Customer Journey Agent: "${customerAgent.name}"`);
if (supplierAgent) console.log(`   ✅ Supplier Journey Agent: "${supplierAgent.name}"`);
console.log();

// ===================================================================
// STEP 4: Set up correct flow
// ===================================================================

console.log('4️⃣ Setting up correct connection flow...');

// Flow should be:
// WhatsApp Trigger → Extract Message Data → Registration Agent → Router → Customer/Supplier Agents

// WhatsApp Trigger → Extract Message Data
if (whatsappTrigger && extractMessageData) {
  workflow.connections[whatsappTrigger.name] = {
    main: [[{
      node: extractMessageData.name,
      type: 'main',
      index: 0
    }]]
  };
  console.log(`   ✅ ${whatsappTrigger.name} → ${extractMessageData.name}`);
}

// Extract Message Data → Registration Agent
if (extractMessageData && registrationAgent) {
  workflow.connections[extractMessageData.name] = {
    main: [[{
      node: registrationAgent.name,
      type: 'main',
      index: 0
    }]]
  };
  console.log(`   ✅ ${extractMessageData.name} → ${registrationAgent.name}`);
}

// Registration Agent → Router (already exists, but verify)
if (registrationAgent && newRouter) {
  if (!workflow.connections[registrationAgent.name]) {
    workflow.connections[registrationAgent.name] = {
      main: [[{
        node: newRouter.name,
        type: 'main',
        index: 0
      }]]
    };
  }
  console.log(`   ✅ ${registrationAgent.name} → ${newRouter.name}`);
}

// Router → Customer/Supplier Agents (already exists, but verify)
if (newRouter && customerAgent && supplierAgent) {
  workflow.connections[newRouter.name] = {
    main: [
      [{
        node: customerAgent.name,
        type: 'main',
        index: 0
      }],
      [{
        node: supplierAgent.name,
        type: 'main',
        index: 0
      }]
    ]
  };
  console.log(`   ✅ ${newRouter.name} → ${customerAgent.name} (true)`);
  console.log(`   ✅ ${newRouter.name} → ${supplierAgent.name} (false)`);
}

console.log();

// ===================================================================
// STEP 5: Verify Tools are connected to Registration Agent
// ===================================================================

console.log('5️⃣ Verifying tools connected to Registration Agent...');

const tools = [
  'check_user_in_database',
  'onboarding_restaurant_complete',
  'onboarding_supplier_complete'
];

tools.forEach(toolName => {
  const toolNode = workflow.nodes.find(n => n.name === toolName);
  if (toolNode && registrationAgent) {
    // Ensure connection exists
    if (!workflow.connections[toolNode.name]) {
      workflow.connections[toolNode.name] = {};
    }
    workflow.connections[toolNode.name].ai_tool = [[{
      node: registrationAgent.name,
      type: 'ai_tool',
      index: 0
    }]];
    console.log(`   ✅ ${toolName} → Registration Agent`);
  }
});

console.log();

// ===================================================================
// STEP 6: Clean up orphaned connections
// ===================================================================

console.log('6️⃣ Cleaning up orphaned connections...');

let orphansRemoved = 0;

// Get all valid node names
const validNodeNames = workflow.nodes.map(n => n.name);

// Remove connections to non-existent nodes
Object.keys(workflow.connections).forEach(fromNode => {
  if (!validNodeNames.includes(fromNode)) {
    delete workflow.connections[fromNode];
    orphansRemoved++;
    console.log(`   ❌ Removed orphaned connection from: ${fromNode}`);
    return;
  }

  const nodeConnections = workflow.connections[fromNode];

  Object.keys(nodeConnections).forEach(connectionType => {
    nodeConnections[connectionType] = nodeConnections[connectionType].map(outputConnections => {
      const before = outputConnections.length;
      const filtered = outputConnections.filter(connection => validNodeNames.includes(connection.node));
      if (filtered.length < before) {
        orphansRemoved += (before - filtered.length);
      }
      return filtered;
    });
  });
});

if (orphansRemoved === 0) {
  console.log('   ✅ No orphaned connections found');
} else {
  console.log(`   ✅ Removed ${orphansRemoved} orphaned connections`);
}

console.log();

// ===================================================================
// STEP 7: Save workflow
// ===================================================================

console.log('💾 Saving fixed workflow...');

// Create backup
const backupFile = WORKFLOW_FILE.replace('.json', '.before-fix.json');
fs.writeFileSync(backupFile, fs.readFileSync(WORKFLOW_FILE, 'utf8'));
console.log(`   📦 Backup: ${backupFile}`);

fs.writeFileSync(WORKFLOW_FILE, JSON.stringify(workflow, null, 2), 'utf8');
console.log('   ✅ Workflow saved\n');

// ===================================================================
// SUMMARY
// ===================================================================

console.log('✅ Fix complete!\n');
console.log('📝 Correct flow now:');
console.log('   1. WhatsApp Trigger');
console.log('   2. → Extract Message Data');
console.log('   3. → Registration Agent');
console.log('   4. → Router: Customer or Supplier');
console.log('   5. → Customer Journey Agent (if restaurant)');
console.log('   6. → Supplier Journey Agent (if supplier)');
console.log('\n🔧 Tools connected:');
console.log('   - check_user_in_database → Registration Agent');
console.log('   - onboarding_restaurant_complete → Registration Agent');
console.log('   - onboarding_supplier_complete → Registration Agent');
console.log('\n🔄 Next: Re-import workflow in n8n!');
