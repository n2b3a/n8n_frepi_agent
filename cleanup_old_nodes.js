#!/usr/bin/env node
// ===================================================================
// Script to remove old nodes replaced by Registration Agent
// ===================================================================
// This script removes:
// 1. "Buscar Usuario en DB" (replaced by check_user_in_database)
// 2. "Prepare User Context" (replaced by check_user_in_database)
// 3. "determine_user_type" tool (replaced by Registration Agent conversation)
// 4. Old routing nodes (replaced by Router IF)
// ===================================================================

const fs = require('fs');

const WORKFLOW_FILE = 'Frepi MVP2 - Full Architecture with Supabase Validations.json';

console.log('🧹 Cleaning up old nodes from workflow...\n');

// Read workflow
const workflow = JSON.parse(fs.readFileSync(WORKFLOW_FILE, 'utf8'));

// ===================================================================
// STEP 1: Identify nodes to remove
// ===================================================================

console.log('1️⃣ Identifying old nodes to remove...');

const nodesToRemove = [
  'Buscar Usuario en DB',
  'Prepare User Context',
  'determine_user_type',
  // Add any other old routing nodes here
];

let removedCount = 0;
const removedNodes = [];

// Find nodes that match
workflow.nodes = workflow.nodes.filter(node => {
  const shouldRemove = nodesToRemove.some(name =>
    node.name && node.name.toLowerCase().includes(name.toLowerCase())
  );

  if (shouldRemove) {
    console.log('   ❌ Removing:', node.name);
    removedNodes.push(node.name);
    removedCount++;
    return false;
  }

  return true;
});

console.log(`   ✅ Identified ${removedCount} nodes to remove\n`);

// ===================================================================
// STEP 2: Clean up connections
// ===================================================================

console.log('2️⃣ Cleaning up connections...');

let connectionsRemoved = 0;

// Remove connections FROM removed nodes
removedNodes.forEach(nodeName => {
  if (workflow.connections[nodeName]) {
    delete workflow.connections[nodeName];
    connectionsRemoved++;
    console.log('   ❌ Removed connections from:', nodeName);
  }
});

// Remove connections TO removed nodes
Object.keys(workflow.connections).forEach(fromNode => {
  const nodeConnections = workflow.connections[fromNode];

  Object.keys(nodeConnections).forEach(connectionType => {
    nodeConnections[connectionType] = nodeConnections[connectionType].map(outputConnections => {
      return outputConnections.filter(connection => {
        const shouldRemove = removedNodes.includes(connection.node);
        if (shouldRemove) {
          console.log(`   ❌ Removed connection: ${fromNode} → ${connection.node}`);
          connectionsRemoved++;
        }
        return !shouldRemove;
      });
    });
  });
});

console.log(`   ✅ Cleaned up ${connectionsRemoved} connections\n`);

// ===================================================================
// STEP 3: Verify Registration Agent flow is intact
// ===================================================================

console.log('3️⃣ Verifying Registration Agent flow...');

const requiredNodes = [
  'Registration Agent',
  'check_user_in_database',
  'onboarding_restaurant_complete',
  'onboarding_supplier_complete',
  'Router: Customer or Supplier'
];

let allPresent = true;

requiredNodes.forEach(nodeName => {
  const found = workflow.nodes.find(n => n.name === nodeName);
  if (found) {
    console.log('   ✅', nodeName);
  } else {
    console.log('   ❌ MISSING:', nodeName);
    allPresent = false;
  }
});

if (!allPresent) {
  console.log('\n⚠️  WARNING: Some required nodes are missing!');
  console.log('   Please run integrate_registration_agent.js first\n');
  process.exit(1);
}

console.log('   ✅ All required nodes present\n');

// ===================================================================
// STEP 4: Save workflow
// ===================================================================

console.log('💾 Saving cleaned workflow...');

// Create backup first
const backupFile = WORKFLOW_FILE.replace('.json', '.backup.json');
fs.writeFileSync(backupFile, fs.readFileSync(WORKFLOW_FILE, 'utf8'));
console.log('   📦 Backup created:', backupFile);

fs.writeFileSync(WORKFLOW_FILE, JSON.stringify(workflow, null, 2), 'utf8');
console.log('   ✅ Workflow saved\n');

// ===================================================================
// SUMMARY
// ===================================================================

console.log('✅ Cleanup complete!\n');
console.log('📝 Summary:');
console.log(`   - Removed ${removedCount} old nodes`);
console.log(`   - Cleaned ${connectionsRemoved} connections`);
console.log(`   - Verified ${requiredNodes.length} required nodes present`);
console.log(`   - Backup saved to: ${backupFile}`);
console.log('\n🔄 Next step:');
console.log('   Re-import workflow in n8n and test!');
console.log('\n✨ Workflow is now using Registration Agent architecture!');
