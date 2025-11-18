# 🔐 REGISTRATION AGENT - Arquitectura Centralizada

**Fecha:** 2025-01-18
**Propósito:** Centralizar TODA la lógica de registro/verificación en un solo AI Agent

---

## 🎯 PROBLEMA A RESOLVER

### ❌ Arquitectura Actual (Dispersa)

```
WhatsApp Message
    ↓
"Buscar Usuario en DB" (Code node - no AI)
    ↓
"Prepare User Context" (Code node)
    ↓
IF node: ¿Nuevo usuario?
    ├─→ SÍ: determine_user_type tool
    │        ↓
    │   Customer/Supplier Agent llama onboarding_restaurant/supplier
    │
    └─→ NO: Route to Customer/Supplier Agent

PROBLEMAS:
❌ Lógica de registro dispersa en múltiples lugares
❌ Code nodes + Tools + Agent calls = complejo de mantener
❌ Difícil de debuggear
❌ No hay un punto único de control
❌ determine_user_type es un tool, no un flow completo
```

---

### ✅ Arquitectura Propuesta (Centralizada)

```
WhatsApp Message
    ↓
┌─────────────────────────────────────────────────────┐
│     REGISTRATION AGENT (AI Agent dedicado)          │
│                                                     │
│  Responsabilidades:                                │
│  1. Verificar si usuario existe en DB              │
│  2. Si NO existe:                                  │
│     - Preguntar: ¿Restaurant o Supplier?          │
│     - Hacer onboarding completo                    │
│     - Guardar en DB                                │
│  3. Si SÍ existe:                                  │
│     - Cargar información completa                  │
│  4. Retornar JSON con TODA la info del usuario     │
│                                                     │
│  Tools disponibles:                                │
│  - check_user_in_database                          │
│  - onboarding_restaurant_complete                  │
│  - onboarding_supplier_complete                    │
│  - get_user_full_info                              │
└─────────────────────────────────────────────────────┘
    ↓
Retorna JSON completo:
{
  "registered": true/false,
  "user_type": "restaurant" | "supplier",
  "restaurant_id": 123,
  "restaurant_person_id": 45,
  "supplier_id": null,
  "phone_number": "+5511999999999",
  "name": "João Silva",
  "company_name": "Restaurante Sabor",
  "setup_complete": true
}
    ↓
┌─────────────────────────────────────────────────────┐
│       ROUTER NODE (Simple IF)                       │
│                                                     │
│  IF user_type == "restaurant":                     │
│      → Customer Journey Agent                      │
│  ELSE IF user_type == "supplier":                  │
│      → Supplier Journey Agent                      │
└─────────────────────────────────────────────────────┘

VENTAJAS:
✅ TODO el registro en UN solo lugar
✅ AI Agent puede manejar conversación compleja
✅ Fácil de debuggear (logs en un solo agent)
✅ Router posterior es trivial (solo IF)
✅ JSON de salida completo y estructurado
```

---

## 🏗️ IMPLEMENTACIÓN DETALLADA

### 1. REGISTRATION AGENT (AI Agent)

**Node type:** `@n8n/n8n-nodes-langchain.agent`

**System Message:**

```
# 🔐 REGISTRATION AGENT - Frepi

## TU ÚNICA MISIÓN

Eres el agente responsable de VERIFICAR y REGISTRAR usuarios en el sistema Frepi.
Tu trabajo es CRÍTICO porque determinas quién es el usuario antes de que interactúe
con el sistema principal.

## FLUJO QUE DEBES SEGUIR

### PASO 1: Verificar si usuario existe

1. SIEMPRE llama primero el tool `check_user_in_database` con el phone_number del usuario
2. Este tool te dirá si el usuario ya está registrado o no

### PASO 2: Si usuario YA EXISTE (registered: true)

1. El tool ya te retornó toda su información
2. Tu trabajo está COMPLETO
3. Responde al usuario con un saludo personalizado:
   - "Olá [nombre]! Bem-vindo de volta ao Frepi! 👋"
4. NO hagas nada más - deja que el Router lo dirija al agent correcto

### PASO 3: Si usuario NO EXISTE (registered: false)

1. Saluda al usuario:
   "Olá! Bem-vindo ao Frepi! 🎉"

2. Pregunta QUÉ TIPO de usuario es:
   "Para começar, preciso saber:

   Você é:
   1️⃣ Um restaurante (quero comprar produtos)
   2️⃣ Um fornecedor (quero vender produtos)

   Responda com 1 ou 2, ou escreva 'restaurante' ou 'fornecedor'."

3. ESPERA la respuesta del usuario

4. Una vez que tengas la respuesta:
   - Si eligió "restaurante" (o 1): Llama `onboarding_restaurant_complete`
   - Si eligió "fornecedor" (o 2): Llama `onboarding_supplier_complete`

5. El tool de onboarding hará una conversación multi-turn contigo para recopilar:
   - Restaurant: nombre, dirección, categoría, contacto
   - Supplier: nombre empresa, CNPJ, contacto, productos que ofrece

6. Una vez completado el onboarding, el tool retorna success: true

7. Responde al usuario:
   "Perfeito! Seu cadastro está completo! ✅

   Agora você já pode usar o Frepi!"

8. Tu trabajo está COMPLETO

## REGLAS CRÍTICAS

❌ NUNCA intentes responder preguntas sobre productos, precios, pedidos
❌ NUNCA hables de funcionalidades del sistema (eso es trabajo de otros agents)
❌ Tu ÚNICA responsabilidad es VERIFICAR y REGISTRAR

✅ SIEMPRE llama check_user_in_database primero
✅ SIEMPRE sé amable y claro en tus preguntas
✅ SIEMPRE confirma cuando el registro esté completo

## DATOS DEL USUARIO ACTUAL

Phone number: {{ $json.phone_number }}
Mensaje: {{ $json.message }}

## OUTPUT ESPERADO

Cuando termines (usuario registrado o registro completo), el sistema
automáticamente pasará el control al siguiente agent.

NO necesitas preocuparte por qué pasa después - solo asegúrate de que
el usuario esté registrado correctamente.
```

---

### 2. TOOLS PARA REGISTRATION AGENT

#### Tool 1: `check_user_in_database`

```javascript
// check_user_in_database_COMPLETE.js

/**
 * TOOL: Check User in Database
 *
 * Verifica si un usuario existe en la base de datos
 * y retorna TODA su información si existe.
 */

const input = $input.first().json;
const phoneNumber = input.phone_number;

console.log('🔍 [Check User] Verificando usuario:', phoneNumber);

// Buscar en restaurant_people
const { data: restaurantPerson, error: restaurantError } = await $supabase
  .from('restaurant_people')
  .select(`
    id,
    person_name,
    role,
    whatsapp_number,
    is_active,
    restaurant:restaurants (
      id,
      restaurant_name,
      restaurant_type,
      address,
      city,
      state,
      category_preferences
    )
  `)
  .eq('whatsapp_number', phoneNumber)
  .eq('is_active', true)
  .maybeSingle();

if (restaurantPerson && restaurantPerson.restaurant) {
  console.log('✅ [Check User] Usuario encontrado: Restaurant Person');

  return JSON.stringify({
    registered: true,
    user_type: 'restaurant',
    restaurant_id: restaurantPerson.restaurant.id,
    restaurant_person_id: restaurantPerson.id,
    supplier_id: null,
    phone_number: phoneNumber,
    person_name: restaurantPerson.person_name,
    role: restaurantPerson.role,
    company_name: restaurantPerson.restaurant.restaurant_name,
    restaurant_type: restaurantPerson.restaurant.restaurant_type,
    address: restaurantPerson.restaurant.address,
    setup_complete: true,
    preferences: restaurantPerson.restaurant.category_preferences || {}
  });
}

// Buscar en suppliers
const { data: supplier, error: supplierError } = await $supabase
  .from('suppliers')
  .select('*')
  .eq('phone_number', phoneNumber)
  .eq('is_active', true)
  .maybeSingle();

if (supplier) {
  console.log('✅ [Check User] Usuario encontrado: Supplier');

  return JSON.stringify({
    registered: true,
    user_type: 'supplier',
    restaurant_id: null,
    restaurant_person_id: null,
    supplier_id: supplier.id,
    phone_number: phoneNumber,
    person_name: supplier.contact_name || supplier.company_name,
    company_name: supplier.company_name,
    business_type: supplier.business_type,
    setup_complete: true
  });
}

// Usuario NO encontrado
console.log('❌ [Check User] Usuario NO encontrado');

return JSON.stringify({
  registered: false,
  user_type: null,
  phone_number: phoneNumber,
  message: "Usuario nuevo - requiere onboarding"
});
```

---

#### Tool 2: `onboarding_restaurant_complete`

```javascript
// onboarding_restaurant_complete_COMPLETE.js

/**
 * TOOL: Onboarding Restaurant Complete
 *
 * Maneja el proceso COMPLETO de onboarding de un restaurante.
 * Este es un tool conversacional multi-turn.
 */

const input = $input.first().json;
const userMessage = (input.message || input.query || '').trim();

// Obtener o crear sesión de onboarding
const phoneNumber = $('Registration Agent').first().json.phone_number;

console.log('📝 [Onboarding Restaurant] Iniciando para:', phoneNumber);
console.log('📝 [Onboarding Restaurant] Mensaje:', userMessage);

// Check if we have an active onboarding session
const { data: existingSession } = await $supabase
  .from('line_sessions')
  .select('*')
  .eq('phone_number', phoneNumber)
  .eq('session_type', 'onboarding_restaurant')
  .eq('awaiting_continuation', true)
  .order('created_at', { ascending: false })
  .limit(1);

let sessionData;

if (existingSession && existingSession.length > 0) {
  sessionData = existingSession[0].preferences_captured || {
    step: 1,
    data: {}
  };
  console.log('📝 [Onboarding Restaurant] Sesión existente, step:', sessionData.step);
} else {
  sessionData = {
    step: 1,
    data: {}
  };
  console.log('📝 [Onboarding Restaurant] Nueva sesión');
}

// Multi-step flow
switch (sessionData.step) {
  case 1: // Nombre del restaurante
    if (!sessionData.data.restaurant_name) {
      return JSON.stringify({
        needs_user_input: true,
        message: "Qual é o nome do seu restaurante? 🍽️"
      });
    }
    sessionData.step = 2;

  case 2: // Tipo de restaurante
    if (!sessionData.data.restaurant_type) {
      sessionData.data.restaurant_name = userMessage;
      await saveSession(phoneNumber, sessionData);

      return JSON.stringify({
        needs_user_input: true,
        message: `Ótimo! E qual tipo de restaurante é o ${sessionData.data.restaurant_name}?\n\nExemplo: pizzaria, churrascaria, restaurante italiano, lanchonete, etc.`
      });
    }
    sessionData.step = 3;

  case 3: // Endereço
    if (!sessionData.data.address) {
      sessionData.data.restaurant_type = userMessage;
      await saveSession(phoneNumber, sessionData);

      return JSON.stringify({
        needs_user_input: true,
        message: "Qual é o endereço completo do restaurante?\n\nExemplo: Rua das Flores, 123, São Paulo, SP"
      });
    }
    sessionData.step = 4;

  case 4: // Nome da pessoa
    if (!sessionData.data.person_name) {
      sessionData.data.address = userMessage;
      await saveSession(phoneNumber, sessionData);

      return JSON.stringify({
        needs_user_input: true,
        message: "E qual é o seu nome? 👤"
      });
    }
    sessionData.step = 5;

  case 5: // Cargo/Função
    if (!sessionData.data.role) {
      sessionData.data.person_name = userMessage;
      await saveSession(phoneNumber, sessionData);

      return JSON.stringify({
        needs_user_input: true,
        message: "Qual é a sua função no restaurante?\n\nExemplo: Chef, Gerente, Proprietário, Comprador, etc."
      });
    }
    sessionData.step = 6;

  case 6: // SALVAR EN DB
    sessionData.data.role = userMessage;

    // Parse address
    const addressParts = sessionData.data.address.split(',').map(s => s.trim());
    const city = addressParts.length > 2 ? addressParts[addressParts.length - 2] : '';
    const state = addressParts.length > 2 ? addressParts[addressParts.length - 1] : '';

    try {
      // 1. Crear restaurant
      const { data: restaurant, error: restaurantError } = await $supabase
        .from('restaurants')
        .insert({
          restaurant_name: sessionData.data.restaurant_name,
          restaurant_type: sessionData.data.restaurant_type,
          address: sessionData.data.address,
          city: city,
          state: state,
          phone_number: phoneNumber,
          is_active: true
        })
        .select()
        .single();

      if (restaurantError) throw restaurantError;

      // 2. Crear restaurant_person
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

      if (personError) throw personError;

      // 3. Limpiar sesión
      await $supabase
        .from('line_sessions')
        .update({ awaiting_continuation: false })
        .eq('phone_number', phoneNumber)
        .eq('session_type', 'onboarding_restaurant');

      console.log('✅ [Onboarding Restaurant] Registro completo!');
      console.log('   Restaurant ID:', restaurant.id);
      console.log('   Person ID:', person.id);

      return JSON.stringify({
        success: true,
        registered: true,
        user_type: 'restaurant',
        restaurant_id: restaurant.id,
        restaurant_person_id: person.id,
        supplier_id: null,
        phone_number: phoneNumber,
        person_name: sessionData.data.person_name,
        company_name: sessionData.data.restaurant_name,
        setup_complete: true,
        message: `Perfeito, ${sessionData.data.person_name}! ✅\n\nSeu restaurante "${sessionData.data.restaurant_name}" está cadastrado no Frepi!\n\nAgora você já pode começar a usar o sistema!`
      });

    } catch (error) {
      console.error('❌ [Onboarding Restaurant] Erro ao salvar:', error);

      return JSON.stringify({
        success: false,
        error: error.message,
        message: "Desculpe, houve um erro ao salvar seus dados. Por favor, tente novamente."
      });
    }
}

// Helper function to save session
async function saveSession(phoneNumber, sessionData) {
  const { data: existing } = await $supabase
    .from('line_sessions')
    .select('id')
    .eq('phone_number', phoneNumber)
    .eq('session_type', 'onboarding_restaurant')
    .order('created_at', { ascending: false })
    .limit(1);

  if (existing && existing.length > 0) {
    await $supabase
      .from('line_sessions')
      .update({
        preferences_captured: sessionData,
        last_activity_at: new Date().toISOString()
      })
      .eq('id', existing[0].id);
  } else {
    await $supabase
      .from('line_sessions')
      .insert({
        phone_number: phoneNumber,
        session_type: 'onboarding_restaurant',
        awaiting_continuation: true,
        preferences_captured: sessionData,
        last_activity_at: new Date().toISOString()
      });
  }
}
```

---

#### Tool 3: `onboarding_supplier_complete`

**Similar a onboarding_restaurant_complete pero con campos de supplier:**
- company_name
- cnpj
- contact_name
- business_type (distribuidor, productor, mayorista)
- productos que ofrece

*(Implementación análoga al restaurant onboarding)*

---

### 3. ROUTER NODE (Simple IF)

**Node type:** `IF`

```javascript
// Router basado en user_type retornado por Registration Agent

const registrationResult = $('Registration Agent').first().json;

if (registrationResult.user_type === 'restaurant') {
  return { route: 'customer' };
} else if (registrationResult.user_type === 'supplier') {
  return { route: 'supplier' };
} else {
  // No debería llegar aquí, pero por seguridad
  return { route: 'error' };
}
```

---

## 🔄 FLUJO COMPLETO ILUSTRADO

### Caso 1: Usuario NUEVO (Restaurant)

```
1. WhatsApp: Usuario envía "oi"
   ↓
2. Registration Agent
   → Llama check_user_in_database
   → Retorna: { registered: false }
   ↓
3. Registration Agent responde:
   "Olá! Bem-vindo ao Frepi! 🎉

   Você é:
   1️⃣ Restaurante
   2️⃣ Fornecedor"
   ↓
4. Usuario: "1"
   ↓
5. Registration Agent
   → Llama onboarding_restaurant_complete
   → Tool pregunta: "Qual é o nome do seu restaurante?"
   ↓
6. Usuario: "Pizzaria Bella Napoli"
   ↓
7. Registration Agent
   → Tool continúa: "Qual tipo de restaurante?"
   ↓
8. Usuario: "pizzaria"
   ↓
9. [Continúa recopilando: endereço, nombre, cargo]
   ↓
10. Registration Agent
    → Tool salva en DB
    → Retorna: {
        success: true,
        registered: true,
        user_type: 'restaurant',
        restaurant_id: 456,
        restaurant_person_id: 789,
        ...
      }
   ↓
11. Router IF
    → user_type == 'restaurant'
    → Route to: Customer Journey Agent
   ↓
12. Customer Journey Agent
    → Recibe usuario YA REGISTRADO
    → Muestra 4-option menu
    → Listo para operar!
```

---

### Caso 2: Usuario EXISTENTE (Restaurant)

```
1. WhatsApp: Usuario envía "oi"
   ↓
2. Registration Agent
   → Llama check_user_in_database
   → Retorna: {
       registered: true,
       user_type: 'restaurant',
       restaurant_id: 123,
       person_name: 'João Silva',
       ...
     }
   ↓
3. Registration Agent responde:
   "Olá João Silva! Bem-vindo de volta ao Frepi! 👋"
   ↓
4. Router IF
   → user_type == 'restaurant'
   → Route to: Customer Journey Agent
   ↓
5. Customer Journey Agent
   → Recibe usuario registrado
   → Responde al mensaje original
   → Muestra 4-option menu
```

---

## 📊 VENTAJAS DE ESTA ARQUITECTURA

### ✅ Ventajas Técnicas

1. **Separación de responsabilidades clara**
   - Registration Agent: SOLO registro/verificación
   - Customer/Supplier Agents: SOLO funcionalidad de negocio

2. **Más fácil de debuggear**
   - Logs centralizados en Registration Agent
   - Si falla registro, solo revisar un agent

3. **Context window optimizado**
   - Registration Agent solo carga tools de registro
   - Customer/Supplier agents no necesitan tools de registro

4. **Stateless routing**
   - Router es un IF trivial
   - No necesita lógica compleja

5. **JSON estructurado**
   - Salida consistente del Registration Agent
   - Agents posteriores reciben data completa

---

### ✅ Ventajas de Producto

1. **Onboarding más fluido**
   - AI Agent puede manejar conversación natural
   - Puede re-preguntar si respuesta no es clara
   - Puede validar datos antes de guardar

2. **Experiencia consistente**
   - Mismo flow para todos los usuarios nuevos
   - Mensajes de bienvenida personalizados

3. **Fácil de iterar**
   - Cambiar preguntas de onboarding en un solo lugar
   - Agregar/quitar campos fácilmente

---

## 🚀 PLAN DE IMPLEMENTACIÓN

### Paso 1: Crear Tools (2 días)

- [ ] `check_user_in_database` - Búsqueda en DB
- [ ] `onboarding_restaurant_complete` - Onboarding multi-turn restaurant
- [ ] `onboarding_supplier_complete` - Onboarding multi-turn supplier

### Paso 2: Crear Registration Agent (1 día)

- [ ] Configurar AI Agent node
- [ ] Escribir system message
- [ ] Conectar los 3 tools
- [ ] Configurar output JSON

### Paso 3: Actualizar Workflow (1 día)

- [ ] Agregar Registration Agent antes del routing
- [ ] Simplificar Router a IF simple
- [ ] Conectar a Customer/Supplier Agents
- [ ] Remover nodos antiguos (Buscar Usuario, determine_user_type, etc.)

### Paso 4: Testing (1 día)

- [ ] Test: Usuario nuevo restaurant
- [ ] Test: Usuario nuevo supplier
- [ ] Test: Usuario existente restaurant
- [ ] Test: Usuario existente supplier
- [ ] Test: Usuario abandona onboarding mid-way
- [ ] Test: Usuario da respuestas inválidas

**Total: 5 días**

---

## 🎯 RESULTADO FINAL

**Workflow simplificado:**

```
WhatsApp Trigger
    ↓
Registration Agent (AI)
    ├─ check_user_in_database (tool)
    ├─ onboarding_restaurant_complete (tool)
    └─ onboarding_supplier_complete (tool)
    ↓
    Retorna JSON con user_type
    ↓
Router (IF simple)
    ├─→ user_type == 'restaurant' → Customer Journey Agent
    └─→ user_type == 'supplier' → Supplier Journey Agent
```

**Beneficios:**
- ✅ 1 AI Agent para registro (vs. múltiples nodos dispersos)
- ✅ Conversacional y flexible
- ✅ JSON estructurado de salida
- ✅ Fácil de mantener y debuggear
- ✅ Mejor UX para usuarios

---

## 📝 PRÓXIMOS PASOS

1. ¿Apruebas esta arquitectura?
2. ¿Quieres revisar/modificar algún aspecto?
3. ¿Empezamos la implementación?

**Esta es la PRIORIDAD #1 antes de implementar features del gap analysis.**

Una vez que tengamos el Registration Agent funcionando, podemos proceder con:
- Buying Algorithm
- Price Approval
- Recommendations
- etc.

Porque TODOS esos features asumen que el usuario ya está registrado y validado.
