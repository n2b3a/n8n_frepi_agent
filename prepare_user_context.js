// ========================================
// PREPARE USER CONTEXT
// ========================================
// Este nodo prepara el contexto del usuario consultando Supabase
// para obtener datos de sesión activa, persona, restaurante, etc.

const input = $input.first().json;

// Extraer datos básicos del mensaje
const chatInput = input.chatInput || input.message || '';
const sessionId = input.sessionId || `session-${Date.now()}`;

// Extraer phone_number (depende de cómo llegue desde WhatsApp)
// Ajustar según tu integración
const phoneNumber = input.from || input.phone_number || input.userId || '';

// ========================================
// CONFIGURACIÓN SUPABASE
// ========================================
// IMPORTANTE: Configurar con tus credenciales reales
const supabaseUrl = process.env.SUPABASE_URL || 'YOUR_SUPABASE_URL';
const supabaseKey = process.env.SUPABASE_ANON_KEY || 'YOUR_SUPABASE_KEY';

// En n8n, usar el nodo de Supabase o hacer requests HTTP
// Esta es una implementación de ejemplo con fetch

async function supabaseQuery(table, method, data = null, filters = {}) {
  const url = `${supabaseUrl}/rest/v1/${table}`;
  const headers = {
    'apikey': supabaseKey,
    'Authorization': `Bearer ${supabaseKey}`,
    'Content-Type': 'application/json',
    'Prefer': 'return=representation'
  };

  let fetchUrl = url;
  let fetchOptions = { method, headers };

  if (method === 'GET' || method === 'SELECT') {
    // Agregar filtros como query params
    const params = new URLSearchParams();
    for (const [key, value] of Object.entries(filters)) {
      params.append(key, `eq.${value}`);
    }
    if (params.toString()) {
      fetchUrl += `?${params.toString()}`;
    }
    fetchOptions.method = 'GET';
  } else if (method === 'POST' || method === 'INSERT') {
    fetchOptions.method = 'POST';
    fetchOptions.body = JSON.stringify(data);
  } else if (method === 'PATCH' || method === 'UPDATE') {
    const params = new URLSearchParams();
    for (const [key, value] of Object.entries(filters)) {
      params.append(key, `eq.${value}`);
    }
    if (params.toString()) {
      fetchUrl += `?${params.toString()}`;
    }
    fetchOptions.method = 'PATCH';
    fetchOptions.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(fetchUrl, fetchOptions);
    const result = await response.json();
    return { data: result, error: null };
  } catch (error) {
    return { data: null, error: error.message };
  }
}

// ========================================
// BUSCAR PERSONA POR WHATSAPP
// ========================================
let person = null;
let restaurant = null;
let activeSession = null;

if (phoneNumber) {
  const personResult = await supabaseQuery('restaurant_people', 'GET', null, {
    whatsapp_number: phoneNumber,
    is_active: 'true'
  });

  if (personResult.data && personResult.data.length > 0) {
    person = personResult.data[0];

    // Buscar restaurante asociado
    if (person.restaurant_id) {
      const restaurantResult = await supabaseQuery('restaurants', 'GET', null, {
        id: person.restaurant_id
      });

      if (restaurantResult.data && restaurantResult.data.length > 0) {
        restaurant = restaurantResult.data[0];
      }
    }
  }

  // Buscar sesión activa
  const sessionResult = await supabaseQuery('line_sessions', 'GET', null, {
    channel_id: phoneNumber,
    awaiting_continuation: 'true'
  });

  if (sessionResult.data && sessionResult.data.length > 0) {
    // Ordenar por last_activity_at desc y tomar la más reciente
    activeSession = sessionResult.data.sort((a, b) =>
      new Date(b.last_activity_at) - new Date(a.last_activity_at)
    )[0];
  }
}

// ========================================
// PREPARAR CONTEXTO COMPLETO
// ========================================
const userData = {
  // Identificadores
  session_id: sessionId,
  phone_number: phoneNumber,
  person_id: person?.id || null,
  restaurant_id: restaurant?.id || null,

  // Datos de persona
  person: person || null,
  first_name: person?.first_name || null,
  last_name: person?.last_name || null,
  is_primary_contact: person?.is_primary_contact || false,

  // Datos de restaurante
  restaurant: restaurant || null,
  restaurant_name: restaurant?.restaurant_name || null,
  restaurant_type: restaurant?.restaurant_type || null,
  city: restaurant?.city || null,

  // Estado de sesión
  has_active_session: activeSession !== null,
  active_session: activeSession || null,

  // Flags de usuario
  is_new_user: person === null,
  is_registered: person !== null && restaurant !== null,

  // Mensaje original
  message: chatInput,
  raw_input: input
};

// Retornar contexto preparado
return {
  json: {
    userData: userData,
    message: chatInput,
    query: chatInput
  }
};
