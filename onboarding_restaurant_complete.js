// ========================================
// ONBOARDING RESTAURANT - IMPLEMENTACIÓN COMPLETA
// ========================================
// Este código implementa el flujo completo de onboarding paso a paso
// con estado persistente en Supabase y validaciones

// INPUT: Recibe el mensaje del usuario y contexto de sesión
const input = $input.first().json;
const userData = input.userData || {}; // Contexto del usuario (viene de nodo anterior)
const userMessage = input.query || input.message || '';

// Inicializar cliente Supabase (configurar con tus credenciales)
const supabaseUrl = 'YOUR_SUPABASE_URL';
const supabaseKey = 'YOUR_SUPABASE_ANON_KEY';

// Helper para hacer requests a Supabase (simplificado - en producción usar SDK)
async function supabaseQuery(table, method, data = null, filters = {}) {
  // Implementación simplificada
  // En producción usar: const { data, error } = await $supabase.from(table).select()
  return { data: null, error: null };
}

// ========================================
// PASO 0: VERIFICAR SI YA EXISTE USUARIO
// ========================================
// Verificar si el número de WhatsApp ya está registrado
if (userData.phone_number) {
  const existingPerson = await supabaseQuery('restaurant_people', 'select', null, {
    whatsapp_number: userData.phone_number,
    is_active: true
  });

  if (existingPerson.data && existingPerson.data.length > 0) {
    return JSON.stringify({
      error: true,
      error_type: 'already_registered',
      message: '⚠️ Este número de WhatsApp ya está cadastrado.\n\n' +
        'Digite "menu" para acessar sua conta.'
    });
  }
}

// ========================================
// PASO 1: VERIFICAR/CREAR SESIÓN
// ========================================
let sessionData = null;
let sessionId = userData.session_id || `session-${Date.now()}`;

// Buscar sesión activa de onboarding
if (userData.has_active_session && userData.active_session) {
  const session = userData.active_session;

  // Verificar que sea sesión de registro
  if (session.primary_intent === 'registro_nuevo' && session.awaiting_continuation) {
    sessionData = session.preferences_captured || {};
    sessionId = session.session_id;

    // CHECK: Timeout de sesión (30 minutos)
    const sessionAge = Date.now() - new Date(session.last_activity_at).getTime();
    const TIMEOUT_MS = 30 * 60 * 1000; // 30 minutos

    if (sessionAge > TIMEOUT_MS) {
      // Marcar sesión como expirada
      await supabaseQuery('line_sessions', 'update', {
        awaiting_continuation: false,
        session_notes: 'Timeout: usuario não respondeu em 30 minutos'
      }, { session_id: sessionId });

      return JSON.stringify({
        status: 'timeout',
        message: '⏰ Sua sessão expirou. 😔\n\n' +
          'Digite "registrar" para começar de novo.'
      });
    }
  }
}

// Si NO hay sesión activa, crear nueva
if (!sessionData) {
  sessionData = {
    onboarding_status: 'in_progress',
    step: 1,
    collected_data: {
      restaurant_name: null,
      contact_name: null,
      city: null,
      business_type: null
    }
  };

  // Crear sesión en Supabase
  const newSession = await supabaseQuery('line_sessions', 'insert', {
    session_id: sessionId,
    person_id: userData.person_id || null,
    channel_type: 'whatsapp',
    channel_id: userData.phone_number,
    session_type: 'discovery',
    primary_intent: 'registro_nuevo',
    awaiting_continuation: true,
    last_activity_at: new Date().toISOString(),
    preferences_captured: sessionData
  });

  if (newSession.error) {
    console.error('Error creating session:', newSession.error);
    return JSON.stringify({
      error: true,
      message: '⚠️ Erro ao iniciar sessão. Tente novamente.'
    });
  }
}

// ========================================
// PASO 2: MANEJAR COMANDOS ESPECIALES
// ========================================
const normalizedMessage = userMessage.toLowerCase().trim();

// CANCELAR onboarding
if (normalizedMessage.includes('cancelar')) {
  await supabaseQuery('line_sessions', 'update', {
    session_goal_achieved: false,
    awaiting_continuation: false,
    session_end: new Date().toISOString(),
    session_notes: 'Usuario canceló el onboarding'
  }, { session_id: sessionId });

  return JSON.stringify({
    status: 'cancelled',
    message: '❌ Cadastro cancelado.\n\n' +
      'Digite "registrar" quando quiser tentar novamente.'
  });
}

// VOLTAR al paso anterior
if (normalizedMessage.includes('voltar') && sessionData.step > 1) {
  sessionData.step = sessionData.step - 1;

  // Limpiar el dato del paso actual
  const stepFields = ['restaurant_name', 'contact_name', 'city', 'business_type'];
  sessionData.collected_data[stepFields[sessionData.step - 1]] = null;

  await supabaseQuery('line_sessions', 'update', {
    preferences_captured: sessionData,
    last_activity_at: new Date().toISOString()
  }, { session_id: sessionId });

  // Retornar pregunta del paso anterior (se manejará en el switch abajo)
}

// ========================================
// PASO 3: PROCESAR SEGÚN EL PASO ACTUAL
// ========================================
const currentStep = sessionData.step;

switch (currentStep) {

  // ==================== PASO 1: NOMBRE DEL RESTAURANTE ====================
  case 1:
    // Si es la primera vez (no hay mensaje), solo mostrar pregunta
    if (!userMessage || userMessage === 'start' || normalizedMessage === 'registrar') {
      return JSON.stringify({
        status: 'collecting',
        step: 1,
        total_steps: 4,
        message: '📝 ¡Hola! Bienvenido a Frepi.\n\n' +
          'Para comenzar, necesito algunos datos básicos.\n\n' +
          '¿Cuál es el *nombre de tu restaurante*?'
      });
    }

    // Validar nombre del restaurante
    if (userMessage.length < 3) {
      return JSON.stringify({
        error: true,
        message: '⚠️ Por favor, informe un nombre válido para o restaurante (mínimo 3 caracteres).'
      });
    }

    // Validar duplicado
    const existingRestaurant = await supabaseQuery('restaurants', 'select', null, {
      restaurant_name: userMessage // usar ilike en producción
    });

    if (existingRestaurant.data && existingRestaurant.data.length > 0) {
      return JSON.stringify({
        error: true,
        message: `⚠️ Já existe um restaurante com o nome "${userMessage}".\n\n` +
          'Por favor, escolha outro nome.'
      });
    }

    // Guardar y avanzar al paso 2
    sessionData.collected_data.restaurant_name = userMessage;
    sessionData.step = 2;

    await supabaseQuery('line_sessions', 'update', {
      preferences_captured: sessionData,
      last_activity_at: new Date().toISOString()
    }, { session_id: sessionId });

    return JSON.stringify({
      status: 'collecting',
      step: 2,
      total_steps: 4,
      message: `✅ Perfeito! "${userMessage}" registrado.\n\n` +
        'Agora, qual é o *seu nome*? (pessoa de contato)'
    });

  // ==================== PASO 2: NOMBRE DE CONTACTO ====================
  case 2:
    if (!userMessage || userMessage.length < 2) {
      return JSON.stringify({
        error: true,
        message: '⚠️ Por favor, informe seu nome.'
      });
    }

    sessionData.collected_data.contact_name = userMessage;
    sessionData.step = 3;

    await supabaseQuery('line_sessions', 'update', {
      preferences_captured: sessionData,
      last_activity_at: new Date().toISOString()
    }, { session_id: sessionId });

    return JSON.stringify({
      status: 'collecting',
      step: 3,
      total_steps: 4,
      message: `✅ Prazer, ${userMessage}! 👋\n\n` +
        'Em que *cidade* fica o restaurante?'
    });

  // ==================== PASO 3: CIUDAD ====================
  case 3:
    if (!userMessage || userMessage.length < 2) {
      return JSON.stringify({
        error: true,
        message: '⚠️ Por favor, informe a cidade.'
      });
    }

    sessionData.collected_data.city = userMessage;
    sessionData.step = 4;

    await supabaseQuery('line_sessions', 'update', {
      preferences_captured: sessionData,
      last_activity_at: new Date().toISOString()
    }, { session_id: sessionId });

    const typeOptions =
      '1️⃣ Fine Dining (alta gastronomia)\n' +
      '2️⃣ Casual Dining (restaurante casual)\n' +
      '3️⃣ Fast Food\n' +
      '4️⃣ Café/Padaria\n' +
      '5️⃣ Bistro\n' +
      '6️⃣ Buffet\n' +
      '7️⃣ Catering\n' +
      '8️⃣ Food Truck\n' +
      '9️⃣ Hotel\n' +
      '🔟 Pub/Bar\n' +
      '1️⃣1️⃣ Outro';

    return JSON.stringify({
      status: 'collecting',
      step: 4,
      total_steps: 4,
      message: `✅ Ótimo! ${userMessage} 📍\n\n` +
        'Última pergunta: *Que tipo de estabelecimento é?*\n\n' +
        typeOptions + '\n\n' +
        'Digite o número ou nome.'
    });

  // ==================== PASO 4: TIPO DE NEGOCIO ====================
  case 4:
    // Mapeo de tipo de negocio
    const typeMapping = {
      '1': 'fine_dining',
      '2': 'casual_dining',
      '3': 'fast_food',
      '4': 'cafe',
      '5': 'bistro',
      '6': 'buffet',
      '7': 'catering',
      '8': 'food_truck',
      '9': 'hotel',
      '10': 'pub',
      '11': 'other',
      'fine': 'fine_dining',
      'casual': 'casual_dining',
      'fast': 'fast_food',
      'cafe': 'cafe',
      'padaria': 'cafe',
      'bistro': 'bistro',
      'buffet': 'buffet',
      'catering': 'catering',
      'food truck': 'food_truck',
      'hotel': 'hotel',
      'pub': 'pub',
      'bar': 'pub',
      'outro': 'other'
    };

    const normalizedInput = userMessage.toLowerCase().trim();
    const businessType = typeMapping[normalizedInput];

    if (!businessType) {
      return JSON.stringify({
        error: true,
        message: '⚠️ Tipo inválido.\n\n' +
          'Por favor, escolha um número de 1 a 11 ou digite o nome do tipo.'
      });
    }

    sessionData.collected_data.business_type = businessType;
    sessionData.step = 5;
    sessionData.onboarding_status = 'completed';

    // ===== GUARDAR EN BASE DE DATOS =====

    // 1. Crear restaurante
    const restaurantData = {
      restaurant_name: sessionData.collected_data.restaurant_name,
      restaurant_type: businessType,
      city: sessionData.collected_data.city,
      is_active: true,
      customer_since: new Date().toISOString()
    };

    const restaurantResult = await supabaseQuery('restaurants', 'insert', restaurantData);

    if (restaurantResult.error) {
      console.error('Error creating restaurant:', restaurantResult.error);
      return JSON.stringify({
        error: true,
        message: '⚠️ Erro ao salvar restaurante. Tente novamente.'
      });
    }

    const restaurant = restaurantResult.data[0];

    // 2. Crear persona de contacto
    const nameParts = sessionData.collected_data.contact_name.split(' ');
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(' ') || firstName;

    const personData = {
      restaurant_id: restaurant.id,
      first_name: firstName,
      last_name: lastName,
      whatsapp_number: userData.phone_number,
      is_primary_contact: true,
      is_active: true
    };

    const personResult = await supabaseQuery('restaurant_people', 'insert', personData);

    if (personResult.error) {
      console.error('Error creating person:', personResult.error);

      // Rollback: eliminar restaurante
      await supabaseQuery('restaurants', 'delete', null, { id: restaurant.id });

      return JSON.stringify({
        error: true,
        message: '⚠️ Erro ao salvar contacto. Tente novamente.'
      });
    }

    const person = personResult.data[0];

    // 3. Marcar sesión como completa
    await supabaseQuery('line_sessions', 'update', {
      session_goal_achieved: true,
      awaiting_continuation: false,
      session_end: new Date().toISOString(),
      preferences_captured: sessionData,
      last_activity_at: new Date().toISOString()
    }, { session_id: sessionId });

    // ===== MENSAJE DE BIENVENIDA =====
    const businessTypeLabel = {
      'fine_dining': 'Fine Dining',
      'casual_dining': 'Casual Dining',
      'fast_food': 'Fast Food',
      'cafe': 'Café/Padaria',
      'bistro': 'Bistro',
      'buffet': 'Buffet',
      'catering': 'Catering',
      'food_truck': 'Food Truck',
      'hotel': 'Hotel',
      'pub': 'Pub/Bar',
      'other': 'Outro'
    };

    return JSON.stringify({
      status: 'completed',
      restaurant_id: restaurant.id,
      person_id: person.id,
      message: '✅ *CADASTRO COMPLETO!*\n\n' +
        `🍽️ Restaurante: *${restaurant.restaurant_name}*\n` +
        `👤 Contato: ${person.first_name} ${person.last_name}\n` +
        `📍 Cidade: ${restaurant.city}\n` +
        `🏪 Tipo: ${businessTypeLabel[businessType]}\n\n` +
        '────────────────\n' +
        'Bem-vindo ao Frepi! 🎉\n\n' +
        'Agora você pode:\n' +
        '• Fazer pedidos\n' +
        '• Configurar preferências\n' +
        '• Ver histórico\n\n' +
        'Digite "menu" para começar.'
    });

  // ==================== PASO DESCONOCIDO ====================
  default:
    return JSON.stringify({
      error: true,
      message: '⚠️ Erro no fluxo de onboarding. Digite "registrar" para começar de novo.'
    });
}
