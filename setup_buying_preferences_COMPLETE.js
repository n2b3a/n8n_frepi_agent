// ===== SETUP BUYING PREFERENCES - COMPLETE STEP-BY-STEP IMPLEMENTATION =====
// Tool for n8n workflow: handles multi-step preferences configuration with validations

const input = $input.first().json;
const userData = $('Prepare User Context').first().json;
const userMessage = (input.query || input.message || '').trim();

console.log('🔄 [Preferences] User:', userData.phone_number, 'Message:', userMessage);

// ===== CONSTANTS =====
const TIMEOUT_MINUTES = 30;
const VALID_FREQUENCIES = {
  '1': 'daily',
  '2': 'weekly',
  '3': 'biweekly',
  '4': 'monthly',
  'diario': 'daily',
  'daily': 'daily',
  'diariamente': 'daily',
  'semanal': 'weekly',
  'weekly': 'weekly',
  'semanalmente': 'weekly',
  'quinzenal': 'biweekly',
  'biweekly': 'biweekly',
  'mensal': 'monthly',
  'monthly': 'monthly',
  'mensalmente': 'monthly'
};

const VALID_DELIVERY_TIMES = {
  '1': 'morning',
  '2': 'afternoon',
  '3': 'evening',
  '4': 'flexible',
  'manha': 'morning',
  'manhã': 'morning',
  'morning': 'morning',
  'tarde': 'afternoon',
  'afternoon': 'afternoon',
  'noite': 'evening',
  'evening': 'evening',
  'flexivel': 'flexible',
  'flexible': 'flexible',
  'qualquer': 'flexible'
};

// ===== HELPER FUNCTIONS =====
function formatFrequency(freq) {
  const labels = {
    'daily': 'Diariamente',
    'weekly': 'Semanalmente',
    'biweekly': 'Quinzenalmente',
    'monthly': 'Mensalmente'
  };
  return labels[freq] || freq;
}

function formatDeliveryTime(time) {
  const labels = {
    'morning': 'Manhã (6h-12h)',
    'afternoon': 'Tarde (12h-18h)',
    'evening': 'Noite (18h-22h)',
    'flexible': 'Flexível'
  };
  return labels[time] || time;
}

// ===== CHECK IF USER IS REGISTERED =====
if (userData.is_new_user || !userData.restaurant_id) {
  console.log('❌ [Preferences] User not registered');
  return JSON.stringify({
    error: true,
    message: 'Você precisa estar cadastrado primeiro. 😊\n\nDigite "registrar" para começar.'
  });
}

// ===== CHECK FOR EXISTING ACTIVE SESSION =====
let sessionData = null;
let sessionId = null;
let isNewSession = true;

if (userData.has_active_session) {
  const session = userData.active_session;
  if (session.primary_intent === 'configurar_preferencias' && session.awaiting_continuation) {
    // Check timeout
    const sessionAge = Date.now() - new Date(session.last_activity_at).getTime();
    const timeoutMs = TIMEOUT_MINUTES * 60 * 1000;

    if (sessionAge > timeoutMs) {
      console.log('⏱️ [Preferences] Session timeout');
      await $supabase
        .from('line_sessions')
        .update({
          awaiting_continuation: false,
          session_notes: `Timeout: usuario não respondeu em ${TIMEOUT_MINUTES} minutos`
        })
        .eq('session_id', session.session_id);

      // Create new session below
    } else {
      // Continue existing session
      sessionData = session.preferences_captured || {};
      sessionId = session.session_id;
      isNewSession = false;
      console.log('🔄 [Preferences] Continuing session:', sessionId, 'Step:', sessionData.step);
    }
  }
}

// ===== HANDLE CANCELLATION =====
if (userMessage.toLowerCase().match(/cancelar|desistir|parar/)) {
  if (sessionId) {
    await $supabase
      .from('line_sessions')
      .update({
        session_goal_achieved: false,
        awaiting_continuation: false,
        session_end: new Date().toISOString(),
        session_notes: 'Cancelado pelo usuário'
      })
      .eq('session_id', sessionId);
  }

  return JSON.stringify({
    status: 'cancelled',
    message: 'Configuração cancelada. ❌\n\nDigite "menu" para ver opções.'
  });
}

// ===== CREATE NEW SESSION IF NEEDED =====
if (!sessionData) {
  sessionId = `${userData.phone_number}_preferences_${Date.now()}`;
  sessionData = {
    preferences_status: 'in_progress',
    step: 1,
    collected_data: {
      preferred_brands: null,
      preferred_formats: null,
      order_frequency: null,
      delivery_schedule: null,
      special_restrictions: null
    },
    started_at: new Date().toISOString()
  };

  console.log('🆕 [Preferences] Creating new session:', sessionId);

  const { error: sessionError } = await $supabase
    .from('line_sessions')
    .insert({
      session_id: sessionId,
      restaurant_id: userData.restaurant_id,
      person_id: userData.person_id,
      channel_type: 'whatsapp',
      channel_id: userData.phone_number,
      session_type: 'configuration',
      primary_intent: 'configurar_preferencias',
      awaiting_continuation: true,
      message_count: 1,
      user_messages: 1,
      preferences_captured: sessionData
    });

  if (sessionError) {
    console.error('❌ [Preferences] Error creating session:', sessionError);
    return JSON.stringify({
      error: true,
      message: '⚠️ Erro ao iniciar configuração. Tente novamente.'
    });
  }

  isNewSession = true;
}

const currentStep = sessionData.step || 1;

// ===== UPDATE SESSION ACTIVITY =====
await $supabase
  .from('line_sessions')
  .update({
    last_activity_at: new Date().toISOString(),
    message_count: $supabase.sql`message_count + 1`,
    user_messages: $supabase.sql`user_messages + 1`
  })
  .eq('session_id', sessionId);

// ===== STEP 1: PREFERRED BRANDS =====
if (currentStep === 1) {
  if (isNewSession) {
    // First time - show welcome message
    return JSON.stringify({
      status: 'collecting',
      step: 1,
      session_id: sessionId,
      message: '⚙️ *Configuração de Preferências*\n\n' +
        'Vamos configurar suas preferências para oferecer melhores recomendações! 🎯\n\n' +
        '*Tem marcas preferidas que sempre usa?*\n\n' +
        'Exemplos:\n' +
        '• Sadia, Nestlé, Aurora\n' +
        '• Camil, Tio João\n' +
        '• Piracanjuba\n\n' +
        'Se não tem preferência, digite "nenhuma".'
    });
  }

  // Parse brands
  const brands = userMessage.toLowerCase() === 'nenhuma' || userMessage.toLowerCase() === 'não'
    ? []
    : userMessage.split(',').map(b => b.trim()).filter(b => b.length > 0);

  sessionData.collected_data.preferred_brands = brands.length > 0 ? brands : null;
  sessionData.step = 2;

  await $supabase
    .from('line_sessions')
    .update({ preferences_captured: sessionData })
    .eq('session_id', sessionId);

  console.log('✅ [Preferences] Step 1 complete:', brands.length > 0 ? brands.join(', ') : 'nenhuma');

  return JSON.stringify({
    status: 'collecting',
    step: 2,
    session_id: sessionId,
    message: brands.length > 0
      ? `✅ Marcas registradas: ${brands.join(', ')}\n\n*Tem preferência de formato?*\n\nExemplos:\n• kg (quilos)\n• caixa\n• unidade\n• litro\n\nOu digite "nenhuma".`
      : `✅ Sem preferência de marca.\n\n*Tem preferência de formato?*\n\nExemplos:\n• kg (quilos)\n• caixa\n• unidade\n• litro\n\nOu digite "nenhuma".`
  });
}

// ===== STEP 2: PREFERRED FORMATS =====
if (currentStep === 2) {
  // Parse formats
  const formats = userMessage.toLowerCase() === 'nenhuma' || userMessage.toLowerCase() === 'não'
    ? []
    : userMessage.split(',').map(f => f.trim().toLowerCase()).filter(f => f.length > 0);

  sessionData.collected_data.preferred_formats = formats.length > 0 ? formats : null;
  sessionData.step = 3;

  await $supabase
    .from('line_sessions')
    .update({ preferences_captured: sessionData })
    .eq('session_id', sessionId);

  console.log('✅ [Preferences] Step 2 complete:', formats.length > 0 ? formats.join(', ') : 'nenhuma');

  const frequencyOptions =
    '1️⃣ Diariamente\n' +
    '2️⃣ Semanalmente\n' +
    '3️⃣ Quinzenalmente\n' +
    '4️⃣ Mensalmente';

  return JSON.stringify({
    status: 'collecting',
    step: 3,
    session_id: sessionId,
    message: formats.length > 0
      ? `✅ Formatos: ${formats.join(', ')}\n\n*Com que frequência costuma fazer pedidos?*\n\n${frequencyOptions}\n\nDigite o número ou nome.`
      : `✅ Sem preferência de formato.\n\n*Com que frequência costuma fazer pedidos?*\n\n${frequencyOptions}\n\nDigite o número ou nome.`
  });
}

// ===== STEP 3: ORDER FREQUENCY =====
if (currentStep === 3) {
  const normalizedInput = userMessage.toLowerCase().trim();
  const frequency = VALID_FREQUENCIES[normalizedInput];

  if (!frequency) {
    return JSON.stringify({
      error: true,
      message: '⚠️ Frequência inválida.\n\n' +
        'Por favor, escolha um número de *1 a 4* ou digite:\n' +
        '• diario\n' +
        '• semanal\n' +
        '• quinzenal\n' +
        '• mensal'
    });
  }

  sessionData.collected_data.order_frequency = frequency;
  sessionData.step = 4;

  await $supabase
    .from('line_sessions')
    .update({ preferences_captured: sessionData })
    .eq('session_id', sessionId);

  console.log('✅ [Preferences] Step 3 complete:', frequency);

  const deliveryOptions =
    '1️⃣ Manhã (6h-12h)\n' +
    '2️⃣ Tarde (12h-18h)\n' +
    '3️⃣ Noite (18h-22h)\n' +
    '4️⃣ Flexível (qualquer horário)';

  return JSON.stringify({
    status: 'collecting',
    step: 4,
    session_id: sessionId,
    message: `✅ Frequência: ${formatFrequency(frequency)}\n\n` +
      '*Qual o melhor horário para entregas?*\n\n' +
      deliveryOptions + '\n\n' +
      'Digite o número ou nome.'
  });
}

// ===== STEP 4: DELIVERY SCHEDULE =====
if (currentStep === 4) {
  const normalizedInput = userMessage.toLowerCase().trim();
  const deliveryTime = VALID_DELIVERY_TIMES[normalizedInput];

  if (!deliveryTime) {
    return JSON.stringify({
      error: true,
      message: '⚠️ Horário inválido.\n\n' +
        'Escolha um número de *1 a 4*:\n' +
        '• 1 = Manhã\n' +
        '• 2 = Tarde\n' +
        '• 3 = Noite\n' +
        '• 4 = Flexível'
    });
  }

  sessionData.collected_data.delivery_schedule = deliveryTime;
  sessionData.step = 5;

  await $supabase
    .from('line_sessions')
    .update({ preferences_captured: sessionData })
    .eq('session_id', sessionId);

  console.log('✅ [Preferences] Step 4 complete:', deliveryTime);

  return JSON.stringify({
    status: 'collecting',
    step: 5,
    session_id: sessionId,
    message: `✅ Horário: ${formatDeliveryTime(deliveryTime)}\n\n` +
      'Última pergunta:\n\n' +
      '*Tem alguma restrição ou requisito especial?*\n\n' +
      'Exemplos:\n' +
      '• Sem glúten\n' +
      '• Orgânico\n' +
      '• Halal/Kosher\n' +
      '• Produtos locais\n\n' +
      'Ou digite "nenhuma".'
  });
}

// ===== STEP 5: SPECIAL RESTRICTIONS & FINALIZATION =====
if (currentStep === 5) {
  const restrictions = userMessage.toLowerCase() === 'nenhuma' || userMessage.toLowerCase() === 'não'
    ? null
    : userMessage;

  sessionData.collected_data.special_restrictions = restrictions;
  sessionData.step = 6;
  sessionData.preferences_status = 'saving_to_db';

  await $supabase
    .from('line_sessions')
    .update({ preferences_captured: sessionData })
    .eq('session_id', sessionId);

  console.log('✅ [Preferences] Step 5 complete:', restrictions || 'nenhuma');
  console.log('💾 [Preferences] Saving to database...');

  // ===== SAVE TO DATABASE =====
  try {
    // Prepare preferences object
    const categoryPreferences = {
      preferred_brands: sessionData.collected_data.preferred_brands || [],
      preferred_formats: sessionData.collected_data.preferred_formats || [],
      order_frequency: sessionData.collected_data.order_frequency,
      delivery_schedule: sessionData.collected_data.delivery_schedule,
      special_restrictions: sessionData.collected_data.special_restrictions,
      configured_at: new Date().toISOString(),
      configured_by: userData.person_id
    };

    // Update restaurant preferences
    const { data: restaurant, error: updateError } = await $supabase
      .from('restaurants')
      .update({
        category_preferences: categoryPreferences,
        updated_at: new Date().toISOString()
      })
      .eq('id', userData.restaurant_id)
      .select()
      .single();

    if (updateError) {
      console.error('❌ [Preferences] Error updating restaurant:', updateError);
      throw new Error('Error updating preferences: ' + updateError.message);
    }

    console.log('✅ [Preferences] Restaurant preferences updated:', userData.restaurant_id);

    // Mark session as complete
    sessionData.preferences_status = 'completed';
    sessionData.completed_at = new Date().toISOString();

    await $supabase
      .from('line_sessions')
      .update({
        session_goal_achieved: true,
        awaiting_continuation: false,
        session_end: new Date().toISOString(),
        conversion_occurred: false,
        preferences_captured: sessionData,
        resolution_status: 'resolved'
      })
      .eq('session_id', sessionId);

    console.log('✅ [Preferences] Session marked as complete');

    // ===== SUCCESS MESSAGE =====
    const summary = [];
    if (sessionData.collected_data.preferred_brands && sessionData.collected_data.preferred_brands.length > 0) {
      summary.push(`• Marcas: ${sessionData.collected_data.preferred_brands.join(', ')}`);
    }
    if (sessionData.collected_data.preferred_formats && sessionData.collected_data.preferred_formats.length > 0) {
      summary.push(`• Formatos: ${sessionData.collected_data.preferred_formats.join(', ')}`);
    }
    summary.push(`• Frequência: ${formatFrequency(sessionData.collected_data.order_frequency)}`);
    summary.push(`• Horário: ${formatDeliveryTime(sessionData.collected_data.delivery_schedule)}`);
    if (sessionData.collected_data.special_restrictions) {
      summary.push(`• Restrições: ${sessionData.collected_data.special_restrictions}`);
    }

    return JSON.stringify({
      status: 'completed',
      restaurant_id: userData.restaurant_id,
      session_id: sessionId,
      preferences: categoryPreferences,
      message: '✅ *PREFERÊNCIAS CONFIGURADAS!*\n\n' +
        '*Resumo:*\n' +
        summary.join('\n') + '\n\n' +
        '────────────────\n' +
        'Suas preferências foram salvas! 🎉\n\n' +
        'Agora posso oferecer recomendações personalizadas.\n\n' +
        'Digite *"menu"* para ver opções ou comece a fazer pedidos! 🛒'
    });

  } catch (error) {
    console.error('❌ [Preferences] Fatal error:', error);

    // Mark session as failed
    await $supabase
      .from('line_sessions')
      .update({
        session_goal_achieved: false,
        awaiting_continuation: false,
        session_end: new Date().toISOString(),
        session_notes: 'Error: ' + error.message,
        resolution_status: 'escalated'
      })
      .eq('session_id', sessionId);

    return JSON.stringify({
      error: true,
      status: 'failed',
      message: '⚠️ Desculpe, ocorreu um erro ao salvar suas preferências.\n\n' +
        'Por favor, tente novamente mais tarde.\n\n' +
        'Digite *"menu"* para ver opções.'
    });
  }
}

// ===== UNEXPECTED STATE =====
console.error('⚠️ [Preferences] Unexpected step:', currentStep);
return JSON.stringify({
  error: true,
  message: '⚠️ Algo deu errado. Digite "menu" para voltar.'
});
