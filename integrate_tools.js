#!/usr/bin/env node
// Script to integrate complete tool implementations into workflow JSON

const fs = require('fs');
const path = require('path');

// File paths
const WORKFLOW_FILE = 'Frepi MVP2 - Full Architecture with Supabase Validations.json';
const OUTPUT_FILE = 'Frepi MVP2 - Full Architecture with Supabase Validations.json';

const TOOLS = [
  {
    name: 'setup_buying_preferences',
    nodeId: 'tool-setup-preferences',
    codeFile: 'setup_buying_preferences_COMPLETE.js',
    description: 'Configura preferências de compra em 5 passos: marcas, formatos, frequência, horário, restrições. Salva em restaurants.category_preferences (JSONB).'
  },
  {
    name: 'build_shopping_cart',
    nodeId: 'tool-build-cart',
    codeFile: 'build_shopping_cart_COMPLETE.js',
    description: 'Gerencia carrinho de compras consultando pricing_history, guardando em line_sessions.preferences_captured.cart. Suporta comandos: confirmar, limpar, ver carrinho.'
  },
  {
    name: 'execute_checkout',
    nodeId: 'tool-execute-checkout',
    codeFile: 'execute_checkout_COMPLETE.js',
    description: 'Finaliza pedido criando purchase_order e purchase_order_items do carrinho. Limpa sessão ao completar. Rollback automático em caso de erro.'
  }
];

console.log('🔧 Starting tool integration...\n');

// Read workflow JSON
console.log(`📖 Reading workflow: ${WORKFLOW_FILE}`);
const workflowContent = fs.readFileSync(WORKFLOW_FILE, 'utf8');
const workflow = JSON.parse(workflowContent);

console.log(`✅ Workflow loaded: ${workflow.nodes.length} nodes found\n`);

// Integrate each tool
let updatedCount = 0;

for (const tool of TOOLS) {
  console.log(`🔄 Processing: ${tool.name}`);

  // Read tool code
  const codeFilePath = path.join(__dirname, tool.codeFile);
  if (!fs.existsSync(codeFilePath)) {
    console.error(`   ❌ Code file not found: ${tool.codeFile}`);
    continue;
  }

  const toolCode = fs.readFileSync(codeFilePath, 'utf8');
  console.log(`   📄 Code loaded: ${toolCode.split('\n').length} lines`);

  // Find node in workflow
  const nodeIndex = workflow.nodes.findIndex(
    n => n.name === tool.name || n.id === tool.nodeId
  );

  if (nodeIndex === -1) {
    console.error(`   ❌ Node not found: ${tool.name} (${tool.nodeId})`);
    continue;
  }

  const node = workflow.nodes[nodeIndex];
  console.log(`   ✅ Node found: ${node.name} (${node.id})`);

  // Update node
  node.parameters.jsCode = toolCode;
  node.parameters.description = tool.description;

  console.log(`   ✅ Node updated with complete implementation`);
  updatedCount++;
  console.log();
}

// Write updated workflow
console.log(`💾 Writing updated workflow to: ${OUTPUT_FILE}`);
fs.writeFileSync(OUTPUT_FILE, JSON.stringify(workflow, null, 2), 'utf8');

console.log(`\n✅ Integration complete!`);
console.log(`   ${updatedCount}/${TOOLS.length} tools integrated successfully`);
console.log(`\nUpdated tools:`);
TOOLS.forEach(t => console.log(`   • ${t.name}`));
