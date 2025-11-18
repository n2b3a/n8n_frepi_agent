// ========================================
// ONBOARDING RESTAURANT - Versión para n8n Tool
// ========================================
// Versión simplificada que funciona como Tool de LangChain en n8n
// NOTA: Adaptar las llamadas a Supabase según tu configuración

const input = $input.first().json;
const userMessage = input.query || input.message || '';
const phoneNumber = input.phone_number || input.from || 'unknown';

// ========================================
// CONFIGURACIÓN
// ========================================
// IMPORTANTE: Configurar credenciales de Supabase en variables de entorno
// o directamente aquí (no recomendado para producción)
const SUPABASE_URL = $env.SUPABASE_URL || 'https://your-project.supabase.co';
const SUPABASE_KEY = $env.SUPABASE_KEY || 'your-anon-key';
const TIMEOUT_MINUTES = 30;

// ========================================
// HELPER: Supabase Request
// ========================================
async function supabaseRequest(table, method, data = null, select = '*', filter = '') {
  const url = `${SUPABASE_URL}/rest/v1/${table}${filter ? '?' + filter : ''}`;
  const headers = {
    'apikey': SUPABASE_KEY,
    'Authorization': `Bearer ${SUPABASE_KEY}`,
    'Content-Type': 'application/json',
    'Prefer': 'return=representation'
  };

  const options = {
    method: method,
    headers: headers
  };

  if (data && (method === 'POST' || method === 'PATCH')) {
    options.body = JSON.stringify(data);
  }

  if (method === 'GET' && select !== '*') {
    url += (filter ? '&' : '?') + `select=${select}`;
  }

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    const result = await response.json();
    return { data: result, error: null };
  } catch (error) {
    return { data: null, error: error.message };
  }
}

// ========================================
// PASO 1: Verificar usuario existente
// ========================================
const existingCheck = await supabaseRequest(
  'restaurant_people',
  'GET',
  null,
  '*',
  `whatsapp_number=eq.${phoneNumber}&is_active=eq.true`
);

if (existingCheck.data && existingCheck.data.length > 0) {
  return JSON.stringify({
    error: true,
    error_type: 'already_registered',
    message: '⚠️ Este número já está cadastrado.\n\nDigite "menu" para acessar.'
  });
}

// ========================================
// PASO 2: Buscar o crear sesión
// ========================================
const sessionCheck = await supabaseRequest(
  'line_sessions',
  'GET',
  null,
  '*',
  `channel_id=eq.${phoneNumber}&primary_intent=eq.registro_nuevo&awaiting_continuation=eq.true&order=last_activity_at.desc&limit=1`
);

let session = null;
let sessionData = null;

if (sessionCheck.data && sessionCheck.data.length > 0) {
  session = sessionCheck.data[0];

  // Check timeout
  const lastActivity = new Date(session.last_activity_at);
  const now = new Date();
  const minutesElapsed = (now - lastActivity) / 1000 / 60;

  if (minutesElapsed > TIMEOUT_MINUTES) {
    await supabaseRequest(
      'line_sessions',
      'PATCH',
      {
        awaiting_continuation: false,
        session_notes: 'Timeout: não respondeu em 30 min'
      },
      '*',
      `session_id=eq.${session.session_id}`
    );

    return JSON.stringify({
      status: 'timeout',
      message: '⏰ Sessão expirou.\n\nDigite "registrar" para recomeçar.'
    });
  }

  sessionData = session.preferences_captured || {
    step: 1,
    collected_data: {}
  };
} else {
  // Crear nueva sesión
  sessionData = {
    step: 1,
    collected_data: {}
  };

  const newSessionId = `onb-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  const createSession = await supabaseRequest(
    'line_sessions',
    'POST',
    {
      session_id: newSessionId,
      channel_type: 'whatsapp',
      channel_id: phoneNumber,
      session_type: 'discovery',
      primary_intent: 'registro_nuevo',
      awaiting_continuation: true,
      last_activity_at: new Date().toISOString(),
      preferences_captured: sessionData
    }
  );

  if (createSession.error) {
    return JSON.stringify({
      error: true,
      message: '⚠️ Erro ao iniciar. Tente novamente.'
    });
  }

  session = createSession.data[0];
}

// ========================================
// PASO 3: Comandos especiales
// ========================================
const msgLower = userMessage.toLowerCase().trim();

if (msgLower.includes('cancelar')) {
  await supabaseRequest(
    'line_sessions',
    'PATCH',
    {
      awaiting_continuation: false,
      session_end: new Date().toISOString()
    },
    '*',
    `session_id=eq.${session.session_id}`
  );

  return JSON.stringify({
    status: 'cancelled',
    message: '❌ Cadastro cancelado.'
  });
}

if (msgLower.includes('voltar') && sessionData.step > 1) {
  sessionData.step--;
  const fields = ['restaurant_name', 'contact_name', 'city', 'business_type'];
  delete sessionData.collected_data[fields[sessionData.step - 1]];
}

// ========================================
// PASO 4: Procesar según paso actual
// ========================================
const step = sessionData.step;

// ===== PASO 1: Nombre restaurante =====
if (step === 1) {
  if (!userMessage || msgLower === 'registrar' || msgLower === 'start') {
    return JSON.stringify({
      status: 'collecting',
      step: 1,
      message: '📝 Olá! Bem-vindo ao Frepi.\n\n¿Cuál es el *nombre de tu restaurante*?'
    });
  }

  if (userMessage.length < 3) {
    return JSON.stringify({
      error: true,
      message: '⚠️ Nome muito curto (mínimo 3 caracteres).'
    });
  }

  // Check duplicado
  const dupCheck = await supabaseRequest(
    'restaurants',
    'GET',
    null,
    'id',
    `restaurant_name=ilike.${encodeURIComponent(userMessage)}`
  );

  if (dupCheck.data && dupCheck.data.length > 0) {
    return JSON.stringify({
      error: true,
      message: `⚠️ Já existe restaurante "${userMessage}".\n\nEscolha outro nome.`
    });
  }

  sessionData.collected_data.restaurant_name = userMessage;
  sessionData.step = 2;

  await supabaseRequest(
    'line_sessions',
    'PATCH',
    {
      preferences_captured: sessionData,
      last_activity_at: new Date().toISOString()
    },
    '*',
    `session_id=eq.${session.session_id}`
  );

  return JSON.stringify({
    status: 'collecting',
    step: 2,
    message: `✅ "${userMessage}" registrado.\n\nQual é o *seu nome*?`
  });
}

// ===== PASO 2: Nombre contacto =====
if (step === 2) {
  if (userMessage.length < 2) {
    return JSON.stringify({
      error: true,
      message: '⚠️ Por favor, informe seu nome.'
    });
  }

  sessionData.collected_data.contact_name = userMessage;
  sessionData.step = 3;

  await supabaseRequest(
    'line_sessions',
    'PATCH',
    {
      preferences_captured: sessionData,
      last_activity_at: new Date().toISOString()
    },
    '*',
    `session_id=eq.${session.session_id}`
  );

  return JSON.stringify({
    status: 'collecting',
    step: 3,
    message: `✅ Prazer, ${userMessage}! 👋\n\nEm que *cidade* fica?`
  });
}

// ===== PASO 3: Ciudad =====
if (step === 3) {
  if (userMessage.length < 2) {
    return JSON.stringify({
      error: true,
      message: '⚠️ Informe a cidade.'
    });
  }

  sessionData.collected_data.city = userMessage;
  sessionData.step = 4;

  await supabaseRequest(
    'line_sessions',
    'PATCH',
    {
      preferences_captured: sessionData,
      last_activity_at: new Date().toISOString()
    },
    '*',
    `session_id=eq.${session.session_id}`
  );

  return JSON.stringify({
    status: 'collecting',
    step: 4,
    message: `✅ ${userMessage} 📍\n\n*Tipo de estabelecimento?*\n\n` +
      '1️⃣ Fine Dining\n2️⃣ Casual\n3️⃣ Fast Food\n4️⃣ Café\n' +
      '5️⃣ Bistro\n6️⃣ Buffet\n7️⃣ Catering\n8️⃣ Food Truck\n' +
      '9️⃣ Hotel\n🔟 Pub\n1️⃣1️⃣ Outro\n\nDigite número ou nome:'
  });
}

// ===== PASO 4: Tipo de negocio =====
if (step === 4) {
  const types = {
    '1': 'fine_dining', 'fine': 'fine_dining',
    '2': 'casual_dining', 'casual': 'casual_dining',
    '3': 'fast_food', 'fast': 'fast_food',
    '4': 'cafe', 'café': 'cafe', 'padaria': 'cafe',
    '5': 'bistro', 'bistro': 'bistro',
    '6': 'buffet', 'buffet': 'buffet',
    '7': 'catering', 'catering': 'catering',
    '8': 'food_truck', 'food truck': 'food_truck',
    '9': 'hotel', 'hotel': 'hotel',
    '10': 'pub', 'pub': 'pub', 'bar': 'pub',
    '11': 'other', 'outro': 'other'
  };

  const businessType = types[msgLower];

  if (!businessType) {
    return JSON.stringify({
      error: true,
      message: '⚠️ Tipo inválido. Digite 1-11 ou nome.'
    });
  }

  sessionData.collected_data.business_type = businessType;

  // ===== GUARDAR EN DB =====

  // 1. Crear restaurante
  const restResult = await supabaseRequest(
    'restaurants',
    'POST',
    {
      restaurant_name: sessionData.collected_data.restaurant_name,
      restaurant_type: businessType,
      city: sessionData.collected_data.city,
      is_active: true,
      customer_since: new Date().toISOString()
    }
  );

  if (restResult.error || !restResult.data || restResult.data.length === 0) {
    return JSON.stringify({
      error: true,
      message: '⚠️ Erro ao salvar. Tente novamente.'
    });
  }

  const restaurant = restResult.data[0];

  // 2. Crear persona
  const nameParts = sessionData.collected_data.contact_name.split(' ');
  const firstName = nameParts[0];
  const lastName = nameParts.slice(1).join(' ') || firstName;

  const personResult = await supabaseRequest(
    'restaurant_people',
    'POST',
    {
      restaurant_id: restaurant.id,
      first_name: firstName,
      last_name: lastName,
      whatsapp_number: phoneNumber,
      is_primary_contact: true,
      is_active: true
    }
  );

  if (personResult.error) {
    // Rollback
    await supabaseRequest('restaurants', 'DELETE', null, '*', `id=eq.${restaurant.id}`);
    return JSON.stringify({
      error: true,
      message: '⚠️ Erro ao salvar contato.'
    });
  }

  const person = personResult.data[0];

  // 3. Marcar sesión completa
  await supabaseRequest(
    'line_sessions',
    'PATCH',
    {
      session_goal_achieved: true,
      awaiting_continuation: false,
      session_end: new Date().toISOString(),
      preferences_captured: sessionData
    },
    '*',
    `session_id=eq.${session.session_id}`
  );

  // ===== ÉXITO =====
  return JSON.stringify({
    status: 'completed',
    restaurant_id: restaurant.id,
    person_id: person.id,
    message: '✅ *CADASTRO COMPLETO!*\n\n' +
      `🍽️ ${restaurant.restaurant_name}\n` +
      `👤 ${firstName} ${lastName}\n` +
      `📍 ${restaurant.city}\n\n` +
      '🎉 Bem-vindo ao Frepi!\n\n' +
      'Digite "menu" para começar.'
  });
}

// Paso desconocido
return JSON.stringify({
  error: true,
  message: '⚠️ Erro. Digite "registrar" para recomeçar.'
});
