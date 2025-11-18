#!/usr/bin/env node
// Script to add schemas to tools in workflow JSON

const fs = require('fs');

const WORKFLOW_FILE = 'Frepi MVP2 - Full Architecture with Supabase Validations.json';

console.log('🔧 Adding schemas to tools...\n');

// Read workflow JSON
console.log(`📖 Reading workflow: ${WORKFLOW_FILE}`);
const workflow = JSON.parse(fs.readFileSync(WORKFLOW_FILE, 'utf8'));

// Find all tool nodes
const toolNodes = workflow.nodes.filter(n => n.type === '@n8n/n8n-nodes-langchain.toolCode');

console.log(`✅ Found ${toolNodes.length} tool nodes\n`);

// Add schema to each tool
let updatedCount = 0;

toolNodes.forEach(tool => {
  console.log(`🔄 Processing: ${tool.name}`);

  // Set schema type to automatic
  // This tells n8n to accept any input and pass it to the tool
  if (!tool.parameters.schemaType) {
    tool.parameters.schemaType = 'manual';
    tool.parameters.schema = {
      type: 'object',
      properties: {
        query: {
          type: 'string',
          description: 'User message or query'
        },
        message: {
          type: 'string',
          description: 'User message'
        }
      },
      required: []
    };

    console.log(`   ✅ Schema added (manual with query/message properties)`);
    updatedCount++;
  } else {
    console.log(`   ⏭️  Schema already exists`);
  }
  console.log();
});

// Write updated workflow
console.log(`💾 Writing updated workflow to: ${WORKFLOW_FILE}`);
fs.writeFileSync(WORKFLOW_FILE, JSON.stringify(workflow, null, 2), 'utf8');

console.log(`\n✅ Schema update complete!`);
console.log(`   ${updatedCount}/${toolNodes.length} tools updated`);
console.log(`\nNote: All tools now accept 'query' and 'message' as optional parameters.`);
console.log(`The code inside each tool can access these via:`);
console.log(`  const userMessage = input.query || input.message || '';`);
