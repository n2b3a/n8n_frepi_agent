#!/usr/bin/env node
// Script to set tools to use AI-inferred schemas (most flexible option)

const fs = require('fs');

const WORKFLOW_FILE = 'Frepi MVP2 - Full Architecture with Supabase Validations.json';

console.log('🔧 Setting tools to use AI-inferred schemas...\n');

// Read workflow JSON
const workflow = JSON.parse(fs.readFileSync(WORKFLOW_FILE, 'utf8'));

// Find all tool nodes
const toolNodes = workflow.nodes.filter(n => n.type === '@n8n/n8n-nodes-langchain.toolCode');

console.log(`✅ Found ${toolNodes.length} tool nodes\n`);

let updatedCount = 0;

toolNodes.forEach(tool => {
  console.log(`🔄 Processing: ${tool.name}`);

  // Change to "fromAI" schema type
  // This is the most flexible - lets the AI decide what to send
  tool.parameters.schemaType = 'fromAI';

  // Remove manual schema if exists
  if (tool.parameters.schema) {
    delete tool.parameters.schema;
  }

  console.log(`   ✅ Set to 'fromAI' (AI-inferred schema)`);
  updatedCount++;
  console.log();
});

// Write updated workflow
fs.writeFileSync(WORKFLOW_FILE, JSON.stringify(workflow, null, 2), 'utf8');

console.log(`💾 Updated workflow saved\n`);
console.log(`✅ Schema update complete!`);
console.log(`   ${updatedCount}/${toolNodes.length} tools updated to 'fromAI'\n`);

console.log('📝 Next steps:');
console.log('1. In n8n: Delete or deactivate the current workflow');
console.log('2. Import the updated JSON file');
console.log('3. Configure credentials (Supabase, OpenAI)');
console.log('4. Activate and test again');
console.log('\nThe AI will now automatically infer what parameters to send to each tool.');
