// ===================================================================
// TOOL: onboarding_restaurant_complete
// ===================================================================
// PURPOSE: Maneja el proceso COMPLETO de onboarding de un restaurante
//          Tool conversacional multi-turn (6 pasos)
//          Guarda en restaurants + restaurant_people
// ===================================================================

const input = $input.first().json;
const userMessage = (input.message || input.query || '').trim();

console.log('📝 [Onboarding Restaurant] Starting...');
console.log('💬 [Onboarding Restaurant] User message:', userMessage);

// Obtener phone number del contexto del Registration Agent
// El agent debe pasar el phone_number en el input
const phoneNumber = input.phone_number;

if (!phoneNumber) {
  console.error('❌ [Onboarding Restaurant] No phone number in context');
  return JSON.stringify({
    success: false,
    error: 'phone_number is required',
    message: 'Erro interno: número de telefone não encontrado. Por favor, tente novamente.'
  });
}

console.log('📱 [Onboarding Restaurant] Phone:', phoneNumber);

try {
  // ===================================================================
  // PASO 0: Obtener o crear sesión de onboarding
  // ===================================================================

  const { data: existingSessions } = await $supabase
    .from('line_sessions')
    .select('*')
    .eq('phone_number', phoneNumber)
    .eq('session_type', 'onboarding_restaurant')
    .eq('awaiting_continuation', true)
    .order('created_at', { ascending: false })
    .limit(1);

  let sessionData;
  let sessionId = null;

  if (existingSessions && existingSessions.length > 0) {
    sessionData = existingSessions[0].preferences_captured || {
      step: 1,
      data: {}
    };
    sessionId = existingSessions[0].id;
    console.log('📝 [Onboarding Restaurant] Existing session found, step:', sessionData.step);
  } else {
    sessionData = {
      step: 1,
      data: {}
    };
    console.log('📝 [Onboarding Restaurant] New session created');
  }

  // ===================================================================
  // PASO 1: Nombre del restaurante
  // ===================================================================

  if (sessionData.step === 1) {
    if (!userMessage) {
      // Primera vez, preguntar nombre
      return JSON.stringify({
        needs_user_input: true,
        current_step: 1,
        total_steps: 5,
        message: "Qual é o nome do seu restaurante? 🍽️"
      });
    }

    // Guardar nombre y avanzar
    sessionData.data.restaurant_name = userMessage;
    sessionData.step = 2;
    await saveSession(phoneNumber, sessionData, sessionId);

    return JSON.stringify({
      needs_user_input: true,
      current_step: 2,
      total_steps: 5,
      message: `Ótimo! E qual tipo de restaurante é o "${sessionData.data.restaurant_name}"?\n\nExemplos: pizzaria, churrascaria, restaurante italiano, lanchonete, comida japonesa, etc.`
    });
  }

  // ===================================================================
  // PASO 2: Tipo de restaurante
  // ===================================================================

  if (sessionData.step === 2) {
    sessionData.data.restaurant_type = userMessage;
    sessionData.step = 3;
    await saveSession(phoneNumber, sessionData, sessionId);

    return JSON.stringify({
      needs_user_input: true,
      current_step: 3,
      total_steps: 5,
      message: "Qual é o endereço completo do restaurante?\n\nExemplo: Rua das Flores, 123, Centro, São Paulo, SP, 01234-567"
    });
  }

  // ===================================================================
  // PASO 3: Endereço
  // ===================================================================

  if (sessionData.step === 3) {
    sessionData.data.full_address = userMessage;

    // Parse address to extract city, state, postal_code
    const addressParts = parseAddress(userMessage);
    sessionData.data.address = addressParts.street;
    sessionData.data.city = addressParts.city;
    sessionData.data.state = addressParts.state;
    sessionData.data.postal_code = addressParts.postal_code;

    sessionData.step = 4;
    await saveSession(phoneNumber, sessionData, sessionId);

    return JSON.stringify({
      needs_user_input: true,
      current_step: 4,
      total_steps: 5,
      message: "E qual é o seu nome? 👤"
    });
  }

  // ===================================================================
  // PASO 4: Nome da pessoa
  // ===================================================================

  if (sessionData.step === 4) {
    sessionData.data.person_name = userMessage;
    sessionData.step = 5;
    await saveSession(phoneNumber, sessionData, sessionId);

    return JSON.stringify({
      needs_user_input: true,
      current_step: 5,
      total_steps: 5,
      message: "Qual é a sua função no restaurante?\n\nExemplos: Chef, Gerente, Proprietário, Comprador, Cozinheiro, etc."
    });
  }

  // ===================================================================
  // PASO 5: Função/Role - SALVAR NA BASE DE DADOS
  // ===================================================================

  if (sessionData.step === 5) {
    sessionData.data.role = userMessage;

    console.log('💾 [Onboarding Restaurant] Saving to database...');
    console.log('   Data:', JSON.stringify(sessionData.data, null, 2));

    // Criar restaurant
    const { data: restaurant, error: restaurantError } = await $supabase
      .from('restaurants')
      .insert({
        restaurant_name: sessionData.data.restaurant_name,
        restaurant_type: sessionData.data.restaurant_type,
        address: sessionData.data.address,
        city: sessionData.data.city,
        state: sessionData.data.state,
        postal_code: sessionData.data.postal_code,
        phone_number: phoneNumber,
        is_active: true,
        category_preferences: {} // Empty JSONB object
      })
      .select()
      .single();

    if (restaurantError) {
      console.error('❌ [Onboarding Restaurant] Error creating restaurant:', restaurantError);
      throw new Error(`Erro ao criar restaurante: ${restaurantError.message}`);
    }

    console.log('✅ [Onboarding Restaurant] Restaurant created, ID:', restaurant.id);

    // Criar restaurant_person
    const { data: person, error: personError } = await $supabase
      .from('restaurant_people')
      .insert({
        restaurant_id: restaurant.id,
        person_name: sessionData.data.person_name,
        role: sessionData.data.role,
        whatsapp_number: phoneNumber,
        is_active: true
      })
      .select()
      .single();

    if (personError) {
      console.error('❌ [Onboarding Restaurant] Error creating person:', personError);
      // Rollback: delete restaurant
      await $supabase
        .from('restaurants')
        .delete()
        .eq('id', restaurant.id);
      throw new Error(`Erro ao criar pessoa: ${personError.message}`);
    }

    console.log('✅ [Onboarding Restaurant] Person created, ID:', person.id);

    // Marcar sesión como completada
    await $supabase
      .from('line_sessions')
      .update({ awaiting_continuation: false })
      .eq('phone_number', phoneNumber)
      .eq('session_type', 'onboarding_restaurant');

    console.log('✅ [Onboarding Restaurant] Onboarding complete!');

    // Retornar success con toda la info
    return JSON.stringify({
      success: true,
      onboarding_complete: true,

      // User info
      registered: true,
      user_type: 'restaurant',

      // IDs
      restaurant_id: restaurant.id,
      restaurant_person_id: person.id,
      supplier_id: null,

      // Contact
      phone_number: phoneNumber,

      // Personal
      person_name: sessionData.data.person_name,
      role: sessionData.data.role,

      // Company
      company_name: sessionData.data.restaurant_name,
      restaurant_type: sessionData.data.restaurant_type,

      // Address
      address: sessionData.data.address,
      city: sessionData.data.city,
      state: sessionData.data.state,
      postal_code: sessionData.data.postal_code,

      // Status
      setup_complete: true,

      message: `Perfeito, ${sessionData.data.person_name}! ✅\n\nSeu restaurante "${sessionData.data.restaurant_name}" está cadastrado no Frepi!\n\nAgora você já pode começar a usar o sistema! 🎉`
    });
  }

  // Se chegou aqui, algo está errado
  console.error('❌ [Onboarding Restaurant] Invalid step:', sessionData.step);
  return JSON.stringify({
    success: false,
    error: 'Invalid step',
    message: 'Erro no processo de cadastro. Vamos começar novamente.'
  });

} catch (error) {
  console.error('❌ [Onboarding Restaurant] Error:', error);

  return JSON.stringify({
    success: false,
    error: error.message,
    message: 'Desculpe, houve um erro ao salvar seus dados. Por favor, tente novamente.'
  });
}

// ===================================================================
// HELPER FUNCTIONS
// ===================================================================

async function saveSession(phoneNumber, sessionData, sessionId) {
  if (sessionId) {
    // Update existing session
    await $supabase
      .from('line_sessions')
      .update({
        preferences_captured: sessionData,
        last_activity_at: new Date().toISOString()
      })
      .eq('id', sessionId);

    console.log('💾 [Session] Updated session:', sessionId);
  } else {
    // Create new session
    const { data } = await $supabase
      .from('line_sessions')
      .insert({
        phone_number: phoneNumber,
        session_type: 'onboarding_restaurant',
        awaiting_continuation: true,
        preferences_captured: sessionData,
        last_activity_at: new Date().toISOString()
      })
      .select()
      .single();

    console.log('💾 [Session] Created new session:', data.id);
  }
}

function parseAddress(fullAddress) {
  // Simple address parser
  // Expected format: "Street, Number, Neighborhood, City, State, PostalCode"
  // Example: "Rua das Flores, 123, Centro, São Paulo, SP, 01234-567"

  const parts = fullAddress.split(',').map(p => p.trim());

  let street = '';
  let city = '';
  let state = '';
  let postal_code = '';

  if (parts.length >= 4) {
    // Street + Number + Neighborhood
    street = parts.slice(0, -3).join(', ');
    // City
    city = parts[parts.length - 3];
    // State
    state = parts[parts.length - 2];
    // Postal code (may not be present)
    postal_code = parts[parts.length - 1];

    // If postal code doesn't look like a code, it's probably part of state
    if (postal_code && !/\d/.test(postal_code)) {
      state = state + ', ' + postal_code;
      postal_code = '';
    }
  } else if (parts.length >= 2) {
    street = parts[0];
    city = parts[parts.length - 2] || '';
    state = parts[parts.length - 1] || '';
  } else {
    street = fullAddress;
  }

  return {
    street,
    city,
    state,
    postal_code
  };
}
