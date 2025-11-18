#!/usr/bin/env node
// ===================================================================
// Script to integrate Registration Agent into workflow
// ===================================================================
// This script:
// 1. Creates 3 tool nodes
// 2. Creates Registration Agent node
// 3. Creates Router node
// 4. Connects everything
// 5. Updates existing flow
// ===================================================================

const fs = require('fs');

const WORKFLOW_FILE = 'Frepi MVP2 - Full Architecture with Supabase Validations.json';

console.log('🔧 Integrating Registration Agent into workflow...\n');

// Read tool implementations
const checkUserCode = fs.readFileSync('check_user_in_database_COMPLETE.js', 'utf8');
const onboardingRestaurantCode = fs.readFileSync('onboarding_restaurant_complete_COMPLETE.js', 'utf8');
const onboardingSupplierCode = fs.readFileSync('onboarding_supplier_complete_COMPLETE.js', 'utf8');

// Read workflow
const workflow = JSON.parse(fs.readFileSync(WORKFLOW_FILE, 'utf8'));

// ===================================================================
// STEP 1: Create Tool Nodes
// ===================================================================

console.log('1️⃣ Creating tool nodes...');

// Find a good position for new nodes (near the top of the workflow)
const baseX = 800;
const baseY = 300;

// Tool 1: check_user_in_database
const checkUserTool = {
  id: 'check_user_in_database_' + Date.now(),
  name: 'check_user_in_database',
  type: '@n8n/n8n-nodes-langchain.toolCode',
  typeVersion: 1,
  position: [baseX, baseY],
  parameters: {
    name: 'check_user_in_database',
    description: 'Verifica se um usuário existe na base de dados. Busca em parallel em restaurant_people e suppliers tables. Retorna TODA a informação do usuário se existe (registered: true) ou indica novo usuário (registered: false).',
    jsCode: checkUserCode,
    schemaType: 'fromAI'
  }
};

// Tool 2: onboarding_restaurant_complete
const onboardingRestaurantTool = {
  id: 'onboarding_restaurant_complete_' + Date.now(),
  name: 'onboarding_restaurant_complete',
  type: '@n8n/n8n-nodes-langchain.toolCode',
  typeVersion: 1,
  position: [baseX, baseY + 200],
  parameters: {
    name: 'onboarding_restaurant_complete',
    description: 'Realiza onboarding COMPLETO de um novo restaurante. Tool conversacional multi-turn (5 passos): nome, tipo, endereço, pessoa, função. Salva em restaurants + restaurant_people. Retorna user info completa quando finalizado.',
    jsCode: onboardingRestaurantCode,
    schemaType: 'fromAI'
  }
};

// Tool 3: onboarding_supplier_complete
const onboardingSupplierTool = {
  id: 'onboarding_supplier_complete_' + Date.now(),
  name: 'onboarding_supplier_complete',
  type: '@n8n/n8n-nodes-langchain.toolCode',
  typeVersion: 1,
  position: [baseX, baseY + 400],
  parameters: {
    name: 'onboarding_supplier_complete',
    description: 'Realiza onboarding COMPLETO de um novo fornecedor. Tool conversacional multi-turn (6 passos): empresa, tipo negócio, CNPJ, contato, endereço, categorias. Salva em suppliers. Retorna user info completa quando finalizado.',
    jsCode: onboardingSupplierCode,
    schemaType: 'fromAI'
  }
};

// Add tool nodes to workflow
workflow.nodes.push(checkUserTool);
workflow.nodes.push(onboardingRestaurantTool);
workflow.nodes.push(onboardingSupplierTool);

console.log('   ✅ Created 3 tool nodes\n');

// ===================================================================
// STEP 2: Create Registration Agent Node
// ===================================================================

console.log('2️⃣ Creating Registration Agent...');

const registrationAgentSystemMessage = `# 🔐 REGISTRATION AGENT - Frepi

## TU ÚNICA MISIÓN

Eres el agente responsable de VERIFICAR y REGISTRAR usuarios en el sistema Frepi.
Tu trabajo es CRÍTICO porque determinas quién es el usuario antes de que interactúe
con el sistema principal.

## FLUJO QUE DEBES SEGUIR

### PASO 1: Verificar si usuario existe

1. SIEMPRE llama primero el tool \`check_user_in_database\`
   - Pasa el phone_number que recibes en el input
2. Este tool te dirá si el usuario ya está registrado o no

### PASO 2: Si usuario YA EXISTE (registered: true)

1. El tool ya te retornó toda su información
2. Tu trabajo está COMPLETO
3. Responde al usuario con un saludo personalizado usando el person_name:
   "Olá [person_name]! Bem-vindo de volta ao Frepi! 👋"
4. NO hagas nada más - el workflow automáticamente lo dirigirá al agent correcto

### PASO 3: Si usuario NO EXISTE (registered: false)

1. Saluda al usuario:
   "Olá! Bem-vindo ao Frepi! 🎉"

2. Pregunta QUÉ TIPO de usuario es:
   "Para começar, preciso saber:

   Você é:
   1️⃣ Um restaurante (quero comprar produtos)
   2️⃣ Um fornecedor (quero vender produtos)

   Responda com 1 ou 2, ou escreva 'restaurante' ou 'fornecedor'."

3. ESPERA la respuesta del usuario

4. Una vez que tengas la respuesta:
   - Si eligió "restaurante" (o 1 o palabras como "comprar", "restaurante"):
     → Llama \`onboarding_restaurant_complete\` con phone_number
   - Si eligió "fornecedor" (o 2 o palabras como "vender", "fornecedor", "supplier"):
     → Llama \`onboarding_supplier_complete\` con phone_number

5. El tool de onboarding hará una conversación multi-turn contigo para recopilar datos
   - Restaurant: nombre, tipo, dirección, persona, función
   - Supplier: empresa, CNPJ, contacto, dirección, productos

6. IMPORTANTE: Pasa las respuestas del usuario al tool en cada mensaje
   - El tool maneja el estado de la conversación (qué paso estamos)
   - El tool te dirá si necesita más input (needs_user_input: true)
   - Cuando el tool retorne success: true, el onboarding está completo

7. Una vez completado el onboarding:
   "Perfeito! Seu cadastro está completo! ✅

   Agora você já pode usar o Frepi!"

8. Tu trabajo está COMPLETO

## REGLAS CRÍTICAS

❌ NUNCA intentes responder preguntas sobre productos, precios, pedidos
❌ NUNCA hables de funcionalidades del sistema (eso es trabajo de otros agents)
❌ NUNCA inventes información - solo usa lo que los tools te retornan
❌ Tu ÚNICA responsabilidad es VERIFICAR y REGISTRAR

✅ SIEMPRE llama check_user_in_database primero (con phone_number)
✅ SIEMPRE sé amable y claro en tus preguntas
✅ SIEMPRE pasa phone_number a los tools de onboarding
✅ SIEMPRE confirma cuando el registro esté completo

## DATOS DEL USUARIO ACTUAL

Phone number: {{ $json.phone_number }}
Mensaje del usuario: {{ $json.message }}

## IMPORTANTE: Cómo llamar los tools

Cuando llames check_user_in_database:
- Pasa: { "phone_number": "{{ $json.phone_number }}" }

Cuando llames onboarding_restaurant_complete o onboarding_supplier_complete:
- SIEMPRE pasa el phone_number: { "phone_number": "{{ $json.phone_number }}", "message": "[respuesta del usuario]" }
- El tool necesita el phone_number para guardar en la DB

## OUTPUT ESPERADO

Cuando termines (usuario registrado o registro completo), el sistema
automáticamente pasará el control al Router que dirigirá al agent correcto.

NO necesitas preocuparte por qué pasa después - solo asegúrate de que
el usuario esté registrado correctamente.`;

const registrationAgent = {
  id: 'registration_agent_' + Date.now(),
  name: 'Registration Agent',
  type: '@n8n/n8n-nodes-langchain.agent',
  typeVersion: 1.6,
  position: [baseX + 400, baseY + 200],
  parameters: {
    options: {
      systemMessage: registrationAgentSystemMessage,
      maxIterations: 15,
      returnIntermediateSteps: true
    }
  }
};

workflow.nodes.push(registrationAgent);

console.log('   ✅ Created Registration Agent node\n');

// ===================================================================
// STEP 3: Create Router Node (IF)
// ===================================================================

console.log('3️⃣ Creating Router node...');

const routerNode = {
  id: 'router_if_' + Date.now(),
  name: 'Router: Customer or Supplier',
  type: 'n8n-nodes-base.if',
  typeVersion: 2,
  position: [baseX + 800, baseY + 200],
  parameters: {
    conditions: {
      options: {
        caseSensitive: true,
        leftValue: '',
        typeValidation: 'strict'
      },
      conditions: [
        {
          id: 'condition_restaurant',
          leftValue: '={{ $json.user_type }}',
          rightValue: 'restaurant',
          operator: {
            type: 'string',
            operation: 'equals'
          }
        }
      ],
      combinator: 'and'
    },
    options: {}
  }
};

workflow.nodes.push(routerNode);

console.log('   ✅ Created Router node\n');

// ===================================================================
// STEP 4: Connect nodes
// ===================================================================

console.log('4️⃣ Connecting nodes...');

// Initialize connections if they don't exist
if (!workflow.connections) {
  workflow.connections = {};
}

// Connect tools to Registration Agent
workflow.connections[checkUserTool.name] = {
  ai_tool: [[{
    node: registrationAgent.name,
    type: 'ai_tool',
    index: 0
  }]]
};

workflow.connections[onboardingRestaurantTool.name] = {
  ai_tool: [[{
    node: registrationAgent.name,
    type: 'ai_tool',
    index: 0
  }]]
};

workflow.connections[onboardingSupplierTool.name] = {
  ai_tool: [[{
    node: registrationAgent.name,
    type: 'ai_tool',
    index: 0
  }]]
};

// Connect Registration Agent to Router
workflow.connections[registrationAgent.name] = {
  main: [[{
    node: routerNode.name,
    type: 'main',
    index: 0
  }]]
};

// Find Customer and Supplier Journey Agents
const customerAgent = workflow.nodes.find(n => n.name === 'Customer Journey Agent');
const supplierAgent = workflow.nodes.find(n => n.name === 'Supplier Journey Agent');

if (customerAgent && supplierAgent) {
  // Connect Router to Customer Journey Agent (true branch)
  if (!workflow.connections[routerNode.name]) {
    workflow.connections[routerNode.name] = {};
  }

  workflow.connections[routerNode.name].main = [
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
  ];

  console.log('   ✅ Connected Registration Agent → Router → Customer/Supplier Agents\n');
} else {
  console.log('   ⚠️  Customer or Supplier Journey Agent not found, manual connection needed\n');
}

// ===================================================================
// STEP 5: Update WhatsApp Trigger to connect to Registration Agent
// ===================================================================

console.log('5️⃣ Updating WhatsApp Trigger connection...');

// Find WhatsApp Trigger or similar entry point
const triggerNode = workflow.nodes.find(n =>
  n.type && (
    n.type.includes('webhook') ||
    n.type.includes('trigger') ||
    n.name.toLowerCase().includes('whatsapp') ||
    n.name.toLowerCase().includes('trigger')
  )
);

if (triggerNode) {
  console.log('   Found trigger node:', triggerNode.name);

  // Connect trigger to Registration Agent
  workflow.connections[triggerNode.name] = {
    main: [[{
      node: registrationAgent.name,
      type: 'main',
      index: 0
    }]]
  };

  console.log('   ✅ Connected trigger to Registration Agent\n');
} else {
  console.log('   ⚠️  Trigger node not found, manual connection needed\n');
}

// ===================================================================
// STEP 6: Save workflow
// ===================================================================

console.log('💾 Saving workflow...');
fs.writeFileSync(WORKFLOW_FILE, JSON.stringify(workflow, null, 2), 'utf8');
console.log('   ✅ Saved\n');

// ===================================================================
// SUMMARY
// ===================================================================

console.log('✅ Integration complete!\n');
console.log('📝 Changes made:');
console.log('   1. Added 3 tool nodes:');
console.log('      - check_user_in_database');
console.log('      - onboarding_restaurant_complete');
console.log('      - onboarding_supplier_complete');
console.log('   2. Added Registration Agent (AI Agent)');
console.log('   3. Added Router node (IF)');
console.log('   4. Connected tools to Registration Agent');
console.log('   5. Connected Registration Agent → Router → Customer/Supplier Agents');
if (triggerNode) {
  console.log('   6. Connected WhatsApp Trigger → Registration Agent');
}
console.log('\n🔄 Next steps:');
console.log('   1. Re-import workflow in n8n');
console.log('   2. Configure Supabase credentials if needed');
console.log('   3. Configure OpenAI credentials if needed');
console.log('   4. Test with new user (restaurant)');
console.log('   5. Test with new user (supplier)');
console.log('   6. Test with existing user');
console.log('\n✨ Registration Agent is ready!');
