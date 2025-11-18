#!/usr/bin/env node
// Script to fix user detection in workflow

const fs = require('fs');

const WORKFLOW_FILE = 'Frepi MVP2 - Full Architecture with Supabase Validations.json';

console.log('🔧 Fixing user detection...\n');

const workflow = JSON.parse(fs.readFileSync(WORKFLOW_FILE, 'utf8'));

// Fix 1: Update "Buscar Usuario en DB" node
console.log('1️⃣ Fixing "Buscar Usuario en DB" node...');

const buscarNode = workflow.nodes.find(n => n.name === 'Buscar Usuario en DB');
if (buscarNode) {
  buscarNode.type = 'n8n-nodes-base.code';
  buscarNode.typeVersion = 2;

  // Read from separate file for cleaner handling
  const searchCode = `// ===== BUSCAR USUARIO EN DB - BÚSQUEDA COMPLETA =====
const messageData = $('Extract Message Data').first().json;
const phoneNumber = messageData.phone_number;

console.log('🔍 Looking for user:', phoneNumber);

let results = {
  found: false,
  user_type: null,
  restaurant: null,
  supplier: null,
  person: null
};

try {
  // Search in restaurant_people
  const { data: restaurantPeople } = await $supabase
    .from('restaurant_people')
    .select('*, restaurant:restaurants(*)')
    .eq('whatsapp_number', phoneNumber)
    .eq('is_active', true)
    .limit(1);

  if (restaurantPeople && restaurantPeople.length > 0) {
    console.log('✅ Found as restaurant');
    results.found = true;
    results.user_type = 'restaurant';
    results.person = restaurantPeople[0];
    results.restaurant = restaurantPeople[0].restaurant;
  }

  // If not found, search in suppliers
  if (!results.found) {
    const { data: suppliers } = await $supabase
      .from('suppliers')
      .select('*')
      .eq('phone_number', phoneNumber)
      .eq('is_active', true)
      .limit(1);

    if (suppliers && suppliers.length > 0) {
      console.log('✅ Found as supplier');
      results.found = true;
      results.user_type = 'supplier';
      results.supplier = suppliers[0];
    }
  }

  if (!results.found) {
    console.log('🆕 New user detected');
  }

  return [{ json: results }];

} catch (error) {
  console.error('❌ Error:', error);
  return [{ json: { found: false, error: error.message } }];
}`;

  buscarNode.parameters = { jsCode: searchCode };
  console.log('   ✅ Updated\n');
}

// Fix 2: Update "Prepare User Context"
console.log('2️⃣ Fixing "Prepare User Context" node...');

const prepareNode = workflow.nodes.find(n => n.name === 'Prepare User Context');
if (prepareNode) {
  const contextCode = `// ===== PREPARE USER CONTEXT - COMPLETE =====
const searchResults = $('Buscar Usuario en DB').first().json;
const messageData = $('Extract Message Data').first().json;

console.log('📋 User found:', searchResults.found, '| Type:', searchResults.user_type);

let userContext = {
  phone_number: messageData.phone_number,
  user_name: messageData.user_name || 'Usuario',
  message: messageData.message,
  is_new_user: !searchResults.found,
  user_type: searchResults.user_type,
  has_active_session: false
};

if (searchResults.found && searchResults.user_type === 'restaurant') {
  userContext.restaurant_id = searchResults.restaurant?.id;
  userContext.person_id = searchResults.person?.id;
  userContext.restaurant_name = searchResults.restaurant?.restaurant_name;
  userContext.user_data = searchResults.person;

  // Check session
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
    }
  } catch (error) {
    console.error('Error checking sessions:', error);
  }
} else if (searchResults.found && searchResults.user_type === 'supplier') {
  userContext.supplier_id = searchResults.supplier?.id;
  userContext.person_id = searchResults.supplier?.id;
  userContext.supplier_name = searchResults.supplier?.company_name;
  userContext.user_data = searchResults.supplier;

  // Check session
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
    }
  } catch (error) {
    console.error('Error checking sessions:', error);
  }
}

console.log('👤 Result:', userContext.is_new_user ? 'NEW' : 'EXISTING');

return [{ json: userContext }];`;

  prepareNode.parameters.jsCode = contextCode;
  console.log('   ✅ Updated\n');
}

// Write updated workflow
fs.writeFileSync(WORKFLOW_FILE, JSON.stringify(workflow, null, 2), 'utf8');

console.log('💾 Workflow saved\n');
console.log('✅ Fixes applied!\n');
console.log('\n🔄 Next steps:');
console.log('   1. Re-import workflow in n8n');
console.log('   2. Configure Supabase credentials');
console.log('   3. Test with "sou novo"');
