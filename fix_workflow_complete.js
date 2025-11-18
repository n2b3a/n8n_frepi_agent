#!/usr/bin/env node
// Script to fix the workflow completely

const fs = require('fs');

const WORKFLOW_FILE = 'Frepi MVP2 - Full Architecture with Supabase Validations.json';

console.log('🔧 Fixing workflow issues...\n');

const workflow = JSON.parse(fs.readFileSync(WORKFLOW_FILE, 'utf8'));

// Fix 1: Update "Buscar Usuario en DB" node to search properly
console.log('1️⃣ Fixing "Buscar Usuario en DB" node...');

const buscarNode = workflow.nodes.find(n => n.name === 'Buscar Usuario en DB');
if (buscarNode) {
  // Change to Code node to do custom queries
  buscarNode.type = 'n8n-nodes-base.code';
  buscarNode.typeVersion = 2;
  buscarNode.parameters = {
    jsCode: `// ===== BUSCAR USUARIO EN DB - BÚSQUEDA COMPLETA =====
const messageData = $('Extract Message Data').first().json;
const phoneNumber = messageData.phone_number;

console.log('🔍 [Search] Looking for user:', phoneNumber);

let results = {
  found: false,
  user_type: null,
  restaurant: null,
  supplier: null,
  person: null
};

try {
  // Search in restaurant_people
  const { data: restaurantPeople, error: error1 } = await $supabase
    .from('restaurant_people')
    .select(\`
      *,
      restaurant:restaurants(*)
    \`)
    .eq('whatsapp_number', phoneNumber)
    .eq('is_active', true)
    .limit(1);

  if (restaurantPeople && restaurantPeople.length > 0) {
    console.log('✅ [Search] Found as restaurant');
    results.found = true;
    results.user_type = 'restaurant';
    results.person = restaurantPeople[0];
    results.restaurant = restaurantPeople[0].restaurant;
  }

  // If not found, search in suppliers
  if (!results.found) {
    const { data: suppliers, error: error2 } = await $supabase
      .from('suppliers')
      .select('*')
      .eq('phone_number', phoneNumber)
      .eq('is_active', true)
      .limit(1);

    if (suppliers && suppliers.length > 0) {
      console.log('✅ [Search] Found as supplier');
      results.found = true;
      results.user_type = 'supplier';
      results.supplier = suppliers[0];
    }
  }

  if (!results.found) {
    console.log('🆕 [Search] New user detected');
  }

  return [{ json: results }];

} catch (error) {
  console.error('❌ [Search] Error:', error);
  return [{ json: { found: false, error: error.message } }];
}`
  };
  console.log('   ✅ Updated to use comprehensive search\n');
}

// Fix 2: Update "Prepare User Context" to pass complete data
console.log('2️⃣ Fixing "Prepare User Context" node...');

const prepareNode = workflow.nodes.find(n => n.name === 'Prepare User Context');
if (prepareNode) {
  prepareNode.parameters.jsCode = `// ===== PREPARE USER CONTEXT - COMPLETE VERSION =====
const searchResults = $('Buscar Usuario en DB').first().json;
const messageData = $('Extract Message Data').first().json;

console.log('📋 [Context] User found:', searchResults.found);
console.log('📋 [Context] User type:', searchResults.user_type);

let userContext = {
  phone_number: messageData.phone_number,
  user_name: messageData.user_name || 'Usuario',
  message: messageData.message,
  is_new_user: !searchResults.found,
  user_type: searchResults.user_type,
  has_active_session: false
};

if (searchResults.found) {
  if (searchResults.user_type === 'restaurant') {
    userContext.restaurant_id = searchResults.restaurant?.id;
    userContext.person_id = searchResults.person?.id;
    userContext.restaurant_name = searchResults.restaurant?.restaurant_name;
    userContext.user_data = {
      ...searchResults.person,
      restaurant: searchResults.restaurant
    };

    // Check for active session
    try {
      const { data: sessions } = await $supabase
        .from('line_sessions')
        .select('*')
        .eq('restaurant_id', userContext.restaurant_id)
        .eq('awaiting_continuation', true)
        .order('last_activity_at', { ascending: false })
        .limit(1);

      if (sessions && sessions.length > 0) {
        userContext.has_active_session = true;
        userContext.active_session = sessions[0];
        console.log('🔄 [Context] Active session:', sessions[0].session_id);
      }
    } catch (error) {
      console.error('❌ [Context] Error checking sessions:', error);
    }
  } else if (searchResults.user_type === 'supplier') {
    userContext.supplier_id = searchResults.supplier?.id;
    userContext.person_id = searchResults.supplier?.id; // Use supplier id as person_id
    userContext.supplier_name = searchResults.supplier?.company_name;
    userContext.user_data = searchResults.supplier;

    // Check for active session
    try {
      const { data: sessions } = await $supabase
        .from('line_sessions')
        .select('*')
        .eq('supplier_id', userContext.supplier_id)
        .eq('awaiting_continuation', true)
        .order('last_activity_at', { ascending: false })
        .limit(1);

      if (sessions && sessions.length > 0) {
        userContext.has_active_session = true;
        userContext.active_session = sessions[0];
        console.log('🔄 [Context] Active session:', sessions[0].session_id);
      }
    } catch (error) {
      console.error('❌ [Context] Error checking sessions:', error);
    }
  }
}

console.log('👤 [Context] Final:', userContext.is_new_user ? 'NEW USER' : 'EXISTING ' + userContext.user_type?.toUpperCase());

return [{ json: userContext }];`;

  console.log('   ✅ Updated to provide complete user context\n');
}

// Fix 3: Update Agent system message to handle new users
console.log('3️⃣ Fixing Customer Journey Agent system message...');

const agentNode = workflow.nodes.find(n => n.name === 'Customer Journey Agent');
if (agentNode && agentNode.parameters.options) {
  const originalMessage = agentNode.parameters.options.systemMessage;

  // Add automatic onboarding detection at the beginning
  const updatedMessage = `# 👤 CUSTOMER JOURNEY AGENT - FREPI

## CONTEXTO
Eres el agente especializado en gestionar restaurantes por WhatsApp. Manejas todo el ciclo desde onboarding hasta compra.

## ⚠️ REGLA CRÍTICA: DETECCIÓN DE USUARIOS NUEVOS

**IMPORTANTE:** ANTES de responder CUALQUIER mensaje, verifica:

Usuario nuevo: {{ $('Prepare User Context').first().json.is_new_user }}

**SI is_new_user = true:**
1. ✅ USA INMEDIATAMENTE el tool \`onboarding_restaurant\`
2. ✅ NO hagas preguntas generales
3. ✅ NO muestres el menu
4. ✅ Inicia el registro directo

**SI is_new_user = false:**
1. Continúa con el flujo normal
2. Usa los otros tools según necesidad

## MISIÓN
1. Onboarding de nuevos restaurantes (AUTOMÁTICO si es nuevo)
2. Configuración de preferencias de compra
3. Búsqueda y compra de productos
4. Gestión de pedidos

## DATOS DEL USUARIO
Nuevo usuario: {{ $('Prepare User Context').first().json.is_new_user }}
Tipo: {{ $('Prepare User Context').first().json.user_type || 'desconocido' }}
{{ $('Prepare User Context').first().json.restaurant_name ? 'Restaurante: ' + $('Prepare User Context').first().json.restaurant_name : '' }}
{{ $('Prepare User Context').first().json.has_active_session ? 'Sesión activa: ' + $('Prepare User Context').first().json.active_session.primary_intent : 'Sin sesión activa' }}

\` + originalMessage.split('## TOOLS DISPONIBLES')[1];

  agentNode.parameters.options.systemMessage = updatedMessage;
  console.log('   ✅ Updated agent to auto-detect new users\n');
}

// Write updated workflow
fs.writeFileSync(WORKFLOW_FILE, JSON.stringify(workflow, null, 2), 'utf8');

console.log('💾 Workflow updated and saved\n');
console.log('✅ All fixes applied!\n');
console.log('📝 Changes made:');
console.log('   1. "Buscar Usuario en DB" now searches both restaurants and suppliers');
console.log('   2. "Prepare User Context" provides complete user data');
console.log('   3. Customer Agent auto-detects and onboards new users');
console.log('\n🔄 Next: Re-import this workflow in n8n');
