// ===== UPLOAD SUPPLIER PRICES - COMPLETE IMPLEMENTATION =====
// Tool for n8n workflow: parses and validates supplier price lists

const input = $input.first().json;
const userData = $('Prepare User Context').first().json;
const userMessage = (input.query || input.message || '').trim();

console.log('💰 [Upload] Supplier:', userData.phone_number, 'Message length:', userMessage.length);

// ===== CHECK IF USER IS SUPPLIER =====
if (userData.is_new_user || !userData.supplier_id) {
  console.log('❌ [Upload] Not a supplier');
  return JSON.stringify({
    error: true,
    message: 'Você precisa estar cadastrado como fornecedor. 😊\n\nDigite "registrar" para começar.'
  });
}

// ===== CONSTANTS =====
const TIMEOUT_MINUTES = 30;
const VALID_UNITS = ['kg', 'g', 'l', 'ml', 'caixa', 'unidade', 'pacote', 'fardo', 'saco'];
const VALID_CURRENCIES = ['BRL', 'USD', 'EUR'];

// ===== HELPER FUNCTIONS =====
function parsePriceList(text) {
  // Parse formats:
  // "Tomate 500g | 4.50 | caixa"
  // "Tomate 500g, 4.50, caixa"
  // "Tomate 500g - R$ 4.50 - caixa"

  const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0);
  const products = [];
  const errors = [];

  for (let i = 0; i < lines.length; i++) {
    const lineNum = i + 1;
    const line = lines[i];

    // Try different separators
    let parts = null;
    if (line.includes('|')) {
      parts = line.split('|').map(p => p.trim());
    } else if (line.includes(',')) {
      parts = line.split(',').map(p => p.trim());
    } else if (line.includes('-')) {
      parts = line.split('-').map(p => p.trim());
    }

    if (!parts || parts.length < 3) {
      errors.push({
        line: lineNum,
        content: line,
        error: 'Formato inválido. Use: Produto | Preço | Unidade'
      });
      continue;
    }

    // Extract parts
    const productName = parts[0].trim();
    let priceStr = parts[1].trim().replace('R$', '').replace(',', '.').trim();
    const unit = parts[2].trim().toLowerCase();

    // Optional fields
    const sku = parts[3] ? parts[3].trim() : null;
    const brand = parts[4] ? parts[4].trim() : null;

    // Validate product name
    if (productName.length < 3) {
      errors.push({
        line: lineNum,
        content: line,
        error: 'Nome de produto muito curto (mínimo 3 caracteres)'
      });
      continue;
    }

    // Validate price
    const price = parseFloat(priceStr);
    if (isNaN(price) || price <= 0) {
      errors.push({
        line: lineNum,
        content: line,
        error: `Preço inválido: "${priceStr}". Deve ser número > 0`
      });
      continue;
    }

    // Validate unit
    if (!VALID_UNITS.includes(unit)) {
      errors.push({
        line: lineNum,
        content: line,
        error: `Unidade inválida: "${unit}". Use: ${VALID_UNITS.join(', ')}`
      });
      continue;
    }

    // Add product
    products.push({
      product_name: productName,
      unit_price: price,
      unit: unit,
      sku: sku,
      brand: brand,
      currency: 'BRL'
    });
  }

  return { products, errors };
}

// ===== CHECK FOR EXISTING SESSION =====
let sessionData = null;
let sessionId = null;
let isNewSession = true;

if (userData.has_active_session) {
  const session = userData.active_session;
  if (session.primary_intent === 'upload_prices' && session.awaiting_continuation) {
    // Check timeout
    const sessionAge = Date.now() - new Date(session.last_activity_at).getTime();
    const timeoutMs = TIMEOUT_MINUTES * 60 * 1000;

    if (sessionAge > timeoutMs) {
      console.log('⏱️ [Upload] Session timeout');
      await $supabase
        .from('line_sessions')
        .update({
          awaiting_continuation: false,
          session_notes: `Timeout: ${TIMEOUT_MINUTES} minutos`
        })
        .eq('session_id', session.session_id);
    } else {
      sessionData = session.preferences_captured || {};
      sessionId = session.session_id;
      isNewSession = false;
      console.log('🔄 [Upload] Continuing session:', sessionId);
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
    message: 'Upload cancelado. ❌\n\nDigite "menu" para ver opções.'
  });
}

// ===== CREATE NEW SESSION IF NEEDED =====
if (!sessionData) {
  sessionId = `${userData.phone_number}_upload_${Date.now()}`;
  sessionData = {
    upload_status: 'awaiting_list',
    supplier_id: userData.supplier_id,
    started_at: new Date().toISOString()
  };

  console.log('🆕 [Upload] Creating new session:', sessionId);

  const { error: sessionError } = await $supabase
    .from('line_sessions')
    .insert({
      session_id: sessionId,
      supplier_id: userData.supplier_id,
      person_id: userData.person_id,
      channel_type: 'whatsapp',
      channel_id: userData.phone_number,
      session_type: 'data_upload',
      primary_intent: 'upload_prices',
      awaiting_continuation: true,
      message_count: 1,
      user_messages: 1,
      preferences_captured: sessionData
    });

  if (sessionError) {
    console.error('❌ [Upload] Error creating session:', sessionError);
    return JSON.stringify({
      error: true,
      message: '⚠️ Erro ao iniciar upload. Tente novamente.'
    });
  }

  isNewSession = true;
}

// Update session activity
await $supabase
  .from('line_sessions')
  .update({
    last_activity_at: new Date().toISOString(),
    message_count: $supabase.sql`message_count + 1`,
    user_messages: $supabase.sql`user_messages + 1`
  })
  .eq('session_id', sessionId);

// ===== SHOW WELCOME MESSAGE IF NEW SESSION =====
if (isNewSession) {
  return JSON.stringify({
    status: 'awaiting_file',
    session_id: sessionId,
    accepted_formats: ['text'],
    message: '💰 *Enviar Lista de Preços*\n\n' +
      'Envie sua lista de produtos no formato:\n\n' +
      '📝 *Formato:*\n' +
      'Produto | Preço | Unidade\n\n' +
      '📋 *Exemplo:*\n' +
      'Tomate 500g | 4.50 | caixa\n' +
      'Cebola 1kg | 3.20 | kg\n' +
      'Arroz Integral 1kg | 5.50 | pacote\n\n' +
      '⚙️ *Unidades válidas:*\n' +
      `${VALID_UNITS.join(', ')}\n\n` +
      '💡 *Dica:*\n' +
      '• Separe com | ou , ou -\n' +
      '• Preço sem R$ (só números)\n' +
      '• Uma linha por produto\n\n' +
      'Cole sua lista e envie!'
  });
}

// ===== PARSE PRICE LIST =====
console.log('📝 [Upload] Parsing price list...');
const { products, errors } = parsePriceList(userMessage);

console.log(`✅ [Upload] Parsed: ${products.length} products, ${errors.length} errors`);

// ===== HANDLE ERRORS =====
if (errors.length > 0 && products.length === 0) {
  // All lines failed
  const errorMsg = errors.slice(0, 5).map(e =>
    `Linha ${e.line}: ${e.error}`
  ).join('\n');

  return JSON.stringify({
    status: 'parse_error',
    errors: errors,
    message: '❌ *Erro ao processar lista*\n\n' +
      errorMsg +
      (errors.length > 5 ? `\n\n...e mais ${errors.length - 5} erros` : '') +
      '\n\n📝 *Formato correto:*\n' +
      'Produto | Preço | Unidade\n\n' +
      'Exemplo:\n' +
      'Tomate 500g | 4.50 | caixa'
  });
}

// ===== SAVE TO SESSION =====
sessionData.upload_status = 'list_received';
sessionData.price_list = products;
sessionData.parse_errors = errors;
sessionData.total_products = products.length;
sessionData.total_errors = errors.length;
sessionData.uploaded_at = new Date().toISOString();

await $supabase
  .from('line_sessions')
  .update({
    preferences_captured: sessionData
  })
  .eq('session_id', sessionId);

console.log('💾 [Upload] Saved to session:', sessionId);

// ===== PREPARE SUCCESS MESSAGE =====
const totalValue = products.reduce((sum, p) => sum + p.unit_price, 0);

// Group by unit for summary
const unitSummary = {};
products.forEach(p => {
  if (!unitSummary[p.unit]) {
    unitSummary[p.unit] = 0;
  }
  unitSummary[p.unit]++;
});

const unitBreakdown = Object.entries(unitSummary)
  .map(([unit, count]) => `• ${count} em ${unit}`)
  .join('\n');

const errorWarning = errors.length > 0
  ? `\n\n⚠️ *${errors.length} linha(s) com erro* (ignoradas):\n` +
    errors.slice(0, 3).map(e => `• Linha ${e.line}: ${e.error}`).join('\n') +
    (errors.length > 3 ? `\n• ...e mais ${errors.length - 3}` : '')
  : '';

const sampleProducts = products.slice(0, 5).map((p, i) =>
  `${i + 1}. ${p.product_name} - R$ ${p.unit_price.toFixed(2)}/${p.unit}`
).join('\n');

const message = '✅ *LISTA RECEBIDA!*\n\n' +
  `📦 *${products.length} produtos* processados\n` +
  `💰 Valor médio: R$ ${(totalValue / products.length).toFixed(2)}\n\n` +
  '*Distribuição por unidade:*\n' +
  unitBreakdown +
  errorWarning +
  '\n\n*Primeiros produtos:*\n' +
  sampleProducts +
  (products.length > 5 ? `\n...e mais ${products.length - 5} produtos` : '') +
  '\n\n────────────────\n' +
  '🔄 *Próximo passo:*\n' +
  'O agente vai normalizar os produtos mapeando ao catálogo.\n\n' +
  'Aguarde...';

return JSON.stringify({
  status: 'success',
  session_id: sessionId,
  products_count: products.length,
  errors_count: errors.length,
  total_value: totalValue,
  unit_summary: unitSummary,
  products: products,
  next_action: 'normalize_product_list',
  message: message
});
