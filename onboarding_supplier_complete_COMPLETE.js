// ===================================================================
// TOOL: onboarding_supplier_complete
// ===================================================================
// PURPOSE: Maneja el proceso COMPLETO de onboarding de un fornecedor
//          Tool conversacional multi-turn (6 pasos)
//          Guarda en suppliers
// ===================================================================

const input = $input.first().json;
const userMessage = (input.message || input.query || '').trim();

console.log('📝 [Onboarding Supplier] Starting...');
console.log('💬 [Onboarding Supplier] User message:', userMessage);

// Obtener phone number del contexto
const phoneNumber = input.phone_number;

if (!phoneNumber) {
  console.error('❌ [Onboarding Supplier] No phone number in context');
  return JSON.stringify({
    success: false,
    error: 'phone_number is required',
    message: 'Erro interno: número de telefone não encontrado. Por favor, tente novamente.'
  });
}

console.log('📱 [Onboarding Supplier] Phone:', phoneNumber);

try {
  // ===================================================================
  // PASO 0: Obtener o crear sesión de onboarding
  // ===================================================================

  const { data: existingSessions } = await $supabase
    .from('line_sessions')
    .select('*')
    .eq('phone_number', phoneNumber)
    .eq('session_type', 'onboarding_supplier')
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
    console.log('📝 [Onboarding Supplier] Existing session found, step:', sessionData.step);
  } else {
    sessionData = {
      step: 1,
      data: {}
    };
    console.log('📝 [Onboarding Supplier] New session created');
  }

  // ===================================================================
  // PASO 1: Nome da empresa
  // ===================================================================

  if (sessionData.step === 1) {
    if (!userMessage) {
      // Primera vez, preguntar nome da empresa
      return JSON.stringify({
        needs_user_input: true,
        current_step: 1,
        total_steps: 6,
        message: "Qual é o nome da sua empresa fornecedora? 📦"
      });
    }

    // Guardar nome e avanzar
    sessionData.data.company_name = userMessage;
    sessionData.step = 2;
    await saveSession(phoneNumber, sessionData, sessionId);

    return JSON.stringify({
      needs_user_input: true,
      current_step: 2,
      total_steps: 6,
      message: `Ótimo! E qual é o tipo de negócio da "${sessionData.data.company_name}"?\n\n1️⃣ Distribuidor\n2️⃣ Produtor\n3️⃣ Atacadista\n\nResponda com 1, 2, 3 ou escreva o tipo.`
    });
  }

  // ===================================================================
  // PASO 2: Tipo de negócio
  // ===================================================================

  if (sessionData.step === 2) {
    // Parse business type
    let businessType = userMessage.toLowerCase();
    if (businessType === '1' || businessType.includes('distribui')) {
      businessType = 'distributor';
    } else if (businessType === '2' || businessType.includes('produ')) {
      businessType = 'producer';
    } else if (businessType === '3' || businessType.includes('ataca')) {
      businessType = 'wholesaler';
    } else {
      businessType = 'other';
    }

    sessionData.data.business_type = businessType;
    sessionData.step = 3;
    await saveSession(phoneNumber, sessionData, sessionId);

    return JSON.stringify({
      needs_user_input: true,
      current_step: 3,
      total_steps: 6,
      message: "Qual é o CNPJ da empresa?\n\nFormato: 12.345.678/0001-90\n\n(Se não tiver CNPJ, pode pular digitando 'pular')"
    });
  }

  // ===================================================================
  // PASO 3: CNPJ
  // ===================================================================

  if (sessionData.step === 3) {
    if (userMessage.toLowerCase() === 'pular') {
      sessionData.data.cnpj = null;
    } else {
      sessionData.data.cnpj = userMessage;
    }

    sessionData.step = 4;
    await saveSession(phoneNumber, sessionData, sessionId);

    return JSON.stringify({
      needs_user_input: true,
      current_step: 4,
      total_steps: 6,
      message: "Qual é o nome da pessoa de contato? 👤"
    });
  }

  // ===================================================================
  // PASO 4: Nome da pessoa de contato
  // ===================================================================

  if (sessionData.step === 4) {
    sessionData.data.contact_name = userMessage;
    sessionData.step = 5;
    await saveSession(phoneNumber, sessionData, sessionId);

    return JSON.stringify({
      needs_user_input: true,
      current_step: 5,
      total_steps: 6,
      message: "Qual é o endereço da empresa?\n\nExemplo: Rua do Comércio, 456, Distrito Industrial, São Paulo, SP"
    });
  }

  // ===================================================================
  // PASO 5: Endereço
  // ===================================================================

  if (sessionData.step === 5) {
    sessionData.data.full_address = userMessage;

    // Parse address
    const addressParts = parseAddress(userMessage);
    sessionData.data.address = addressParts.street;
    sessionData.data.city = addressParts.city;
    sessionData.data.state = addressParts.state;

    sessionData.step = 6;
    await saveSession(phoneNumber, sessionData, sessionId);

    return JSON.stringify({
      needs_user_input: true,
      current_step: 6,
      total_steps: 6,
      message: "Por último, quais categorias de produtos vocês fornecem?\n\nExemplos: carnes, laticínios, frutas e verduras, grãos, bebidas, produtos de limpeza, etc.\n\n(Pode listar vários separados por vírgula)"
    });
  }

  // ===================================================================
  // PASO 6: Categorias de produtos - SALVAR NA BASE DE DADOS
  // ===================================================================

  if (sessionData.step === 6) {
    // Parse product categories
    const categories = userMessage.split(',').map(c => c.trim()).filter(c => c);
    sessionData.data.product_categories = categories;

    console.log('💾 [Onboarding Supplier] Saving to database...');
    console.log('   Data:', JSON.stringify(sessionData.data, null, 2));

    // Criar supplier
    const { data: supplier, error: supplierError } = await $supabase
      .from('suppliers')
      .insert({
        company_name: sessionData.data.company_name,
        business_type: sessionData.data.business_type,
        cnpj: sessionData.data.cnpj,
        contact_name: sessionData.data.contact_name,
        phone_number: phoneNumber,
        address: sessionData.data.address,
        city: sessionData.data.city,
        state: sessionData.data.state,
        product_categories: sessionData.data.product_categories,
        is_active: true,
        contact_method: 'whatsapp' // Default to whatsapp since they're using WhatsApp
      })
      .select()
      .single();

    if (supplierError) {
      console.error('❌ [Onboarding Supplier] Error creating supplier:', supplierError);
      throw new Error(`Erro ao criar fornecedor: ${supplierError.message}`);
    }

    console.log('✅ [Onboarding Supplier] Supplier created, ID:', supplier.id);

    // Marcar sesión como completada
    await $supabase
      .from('line_sessions')
      .update({ awaiting_continuation: false })
      .eq('phone_number', phoneNumber)
      .eq('session_type', 'onboarding_supplier');

    console.log('✅ [Onboarding Supplier] Onboarding complete!');

    // Retornar success con toda la info
    return JSON.stringify({
      success: true,
      onboarding_complete: true,

      // User info
      registered: true,
      user_type: 'supplier',

      // IDs
      restaurant_id: null,
      restaurant_person_id: null,
      supplier_id: supplier.id,

      // Contact
      phone_number: phoneNumber,

      // Personal
      person_name: sessionData.data.contact_name,

      // Company
      company_name: sessionData.data.company_name,
      business_type: sessionData.data.business_type,
      cnpj: sessionData.data.cnpj,

      // Address
      address: sessionData.data.address,
      city: sessionData.data.city,
      state: sessionData.data.state,

      // Products
      product_categories: sessionData.data.product_categories,

      // Status
      setup_complete: true,

      message: `Perfeito, ${sessionData.data.contact_name}! ✅\n\nSua empresa "${sessionData.data.company_name}" está cadastrada no Frepi como fornecedor!\n\nAgora você já pode começar a oferecer seus produtos! 📦🎉`
    });
  }

  // Se chegou aqui, algo está errado
  console.error('❌ [Onboarding Supplier] Invalid step:', sessionData.step);
  return JSON.stringify({
    success: false,
    error: 'Invalid step',
    message: 'Erro no processo de cadastro. Vamos começar novamente.'
  });

} catch (error) {
  console.error('❌ [Onboarding Supplier] Error:', error);

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
        session_type: 'onboarding_supplier',
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
  // Expected format: "Street, Number, Neighborhood, City, State"

  const parts = fullAddress.split(',').map(p => p.trim());

  let street = '';
  let city = '';
  let state = '';

  if (parts.length >= 3) {
    // Street + Number + Neighborhood
    street = parts.slice(0, -2).join(', ');
    // City
    city = parts[parts.length - 2];
    // State
    state = parts[parts.length - 1];
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
    state
  };
}
