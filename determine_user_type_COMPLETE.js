// ===================================================================
// TOOL: determine_user_type
// ===================================================================
// PURPOSE: Ask new users if they are a restaurant or supplier
//          This is the FIRST interaction with any new user
// ===================================================================

const input = $input.first().json;
const userMessage = (input.query || input.message || '').trim().toLowerCase();

console.log('🔀 [User Type Detection] Starting...');
console.log('📝 [User Type Detection] User message:', userMessage);

// Get user context from Prepare User Context node
const userContext = $('Prepare User Context').first().json;

console.log('👤 [User Type Detection] User context:', {
  is_new_user: userContext.is_new_user,
  phone_number: userContext.phone_number
});

// ===================================================================
// VALIDATION: Only for new users
// ===================================================================

if (!userContext.is_new_user) {
  return JSON.stringify({
    success: false,
    message: "Este tool solo se usa para usuarios nuevos. El usuario ya está registrado.",
    user_type: userContext.user_type
  });
}

// ===================================================================
// STEP 1: Check if user has answered
// ===================================================================

// Check if user has already chosen their type
const hasChosen = await (async () => {
  try {
    const { data: tempData } = await $supabase
      .from('line_sessions')
      .select('preferences_captured')
      .eq('phone_number', userContext.phone_number)
      .order('created_at', { ascending: false })
      .limit(1);

    if (tempData && tempData.length > 0) {
      const captured = tempData[0].preferences_captured || {};
      return captured.chosen_user_type || null;
    }
    return null;
  } catch (error) {
    console.error('❌ Error checking for existing choice:', error);
    return null;
  }
})();

// ===================================================================
// STEP 2: Parse user's answer
// ===================================================================

let chosenType = hasChosen;

if (!chosenType) {
  // Parse user's response
  if (userMessage.includes('restaurante') ||
      userMessage.includes('restaurant') ||
      userMessage.includes('comprar') ||
      userMessage.includes('compra')) {
    chosenType = 'restaurant';
  } else if (userMessage.includes('fornecedor') ||
             userMessage.includes('supplier') ||
             userMessage.includes('proveedor') ||
             userMessage.includes('vender') ||
             userMessage.includes('venda')) {
    chosenType = 'supplier';
  } else if (userMessage.match(/\b1\b/)) {
    chosenType = 'restaurant';
  } else if (userMessage.match(/\b2\b/)) {
    chosenType = 'supplier';
  }
}

// ===================================================================
// STEP 3: If still not chosen, ask the question
// ===================================================================

if (!chosenType) {
  console.log('❓ [User Type Detection] User has not chosen yet, asking...');

  return JSON.stringify({
    success: true,
    needs_user_input: true,
    message: `Olá! 👋 Bem-vindo ao Frepi!

Para melhor atendê-lo, preciso saber:

*Você é:*
1️⃣ Um restaurante (quero comprar produtos)
2️⃣ Um fornecedor (quero vender produtos)

Por favor, responda com *1* ou *2*, ou escreva "restaurante" ou "fornecedor".`
  });
}

// ===================================================================
// STEP 4: User has chosen - store and proceed
// ===================================================================

console.log('✅ [User Type Detection] User chose:', chosenType);

// Store the choice temporarily in line_sessions
try {
  // Check if temp session exists
  const { data: existingSession } = await $supabase
    .from('line_sessions')
    .select('*')
    .eq('phone_number', userContext.phone_number)
    .order('created_at', { ascending: false })
    .limit(1);

  if (existingSession && existingSession.length > 0) {
    // Update existing session
    await $supabase
      .from('line_sessions')
      .update({
        preferences_captured: {
          ...(existingSession[0].preferences_captured || {}),
          chosen_user_type: chosenType,
          choice_timestamp: new Date().toISOString()
        },
        last_activity_at: new Date().toISOString()
      })
      .eq('id', existingSession[0].id);

    console.log('📝 [User Type Detection] Updated existing temp session');
  } else {
    // Create new temp session
    await $supabase
      .from('line_sessions')
      .insert({
        phone_number: userContext.phone_number,
        session_type: 'type_detection',
        primary_intent: 'onboarding',
        awaiting_continuation: true,
        preferences_captured: {
          chosen_user_type: chosenType,
          choice_timestamp: new Date().toISOString()
        },
        last_activity_at: new Date().toISOString()
      });

    console.log('📝 [User Type Detection] Created new temp session');
  }

  // Return success with next instructions
  const nextTool = chosenType === 'restaurant' ? 'onboarding_restaurant' : 'onboarding_supplier';

  return JSON.stringify({
    success: true,
    user_type_chosen: chosenType,
    next_action: nextTool,
    message: chosenType === 'restaurant'
      ? `Perfeito! Vou iniciar seu cadastro como *restaurante*. 🍽️\n\nVamos começar!`
      : `Perfeito! Vou iniciar seu cadastro como *fornecedor*. 📦\n\nVamos começar!`,
    instruction_to_agent: `User has chosen ${chosenType}. IMMEDIATELY call the ${nextTool} tool to begin onboarding. Do NOT ask any other questions.`
  });

} catch (error) {
  console.error('❌ [User Type Detection] Error saving choice:', error);

  return JSON.stringify({
    success: false,
    error: error.message,
    message: "Desculpe, houve um erro ao processar sua escolha. Por favor, tente novamente."
  });
}
