# 🔀 User Type Detection - Guía Completa

## 📋 Problema Resuelto

**Antes:** El sistema ASUMÍA si el usuario era restaurante o proveedor sin preguntar.

**Ahora:** El sistema PREGUNTA explícitamente al usuario nuevo qué tipo es.

---

## ✨ Nueva Funcionalidad

### Tool: `determine_user_type`

Este tool es el PRIMER contacto con cualquier usuario nuevo.

**Propósito:**
- Preguntar al usuario si es restaurante o fornecedor
- Guardar su elección temporalmente
- Dirigir al onboarding correcto

**Cuándo se llama:**
- Automáticamente cuando `is_new_user = true`
- ANTES de cualquier otro tool de onboarding

---

## 🔄 Flujo Completo para Usuario Nuevo

### 1. Usuario escribe por primera vez

```
Usuario: "oi"
```

### 2. Sistema detecta usuario nuevo

```javascript
// En "Buscar Usuario en DB"
{
  found: false,
  user_type: null
}

// En "Prepare User Context"
{
  is_new_user: true,
  phone_number: "5511999999999"
}
```

### 3. Agent llama determine_user_type

```
Bot: "Olá! 👋 Bem-vindo ao Frepi!

Para melhor atendê-lo, preciso saber:

*Você é:*
1️⃣ Um restaurante (quero comprar produtos)
2️⃣ Um fornecedor (quero vender produtos)

Por favor, responda com *1* ou *2*, ou escreva "restaurante" ou "fornecedor"."
```

### 4. Usuario responde

**Opción A: Responde con número**
```
Usuario: "1"
```

**Opción B: Responde con texto**
```
Usuario: "sou restaurante"
```

**Opción C: Responde con texto descriptivo**
```
Usuario: "quero comprar produtos"
```

### 5. Sistema guarda la elección

```javascript
// En line_sessions (temporal)
{
  phone_number: "5511999999999",
  session_type: "type_detection",
  preferences_captured: {
    chosen_user_type: "restaurant",
    choice_timestamp: "2025-01-18T10:30:00Z"
  }
}
```

### 6. Sistema confirma y redirige

**Si eligió Restaurante:**
```
Bot: "Perfeito! Vou iniciar seu cadastro como *restaurante*. 🍽️

Vamos começar!"

[Llama onboarding_restaurant]
```

**Si eligió Fornecedor:**
```
Bot: "Perfeito! Vou iniciar seu cadastro como *fornecedor*. 📦

Vamos começar!"

[Llama onboarding_supplier]
```

---

## 💻 Implementación Técnica

### Detección de Respuesta

El tool acepta múltiples formatos de respuesta:

```javascript
// Formato 1: Número
"1" → restaurant
"2" → supplier

// Formato 2: Palabra clave en portugués
"restaurante" → restaurant
"fornecedor" → supplier

// Formato 3: Palabra clave en español
"restaurante" → restaurant
"proveedor" → supplier

// Formato 4: Palabra clave en inglés
"restaurant" → restaurant
"supplier" → supplier

// Formato 5: Intención implícita
"quiero comprar" → restaurant
"quiero vender" → supplier
"compra" → restaurant
"venda" → supplier
```

### Persistencia Temporal

```javascript
// Guardar elección en line_sessions
await $supabase
  .from('line_sessions')
  .insert({
    phone_number: userContext.phone_number,
    session_type: 'type_detection',
    primary_intent: 'onboarding',
    awaiting_continuation: true,
    preferences_captured: {
      chosen_user_type: 'restaurant', // or 'supplier'
      choice_timestamp: new Date().toISOString()
    },
    last_activity_at: new Date().toISOString()
  });
```

### Validación de Estado

```javascript
// Verificar si ya eligió antes (evitar preguntar dos veces)
const { data: tempData } = await $supabase
  .from('line_sessions')
  .select('preferences_captured')
  .eq('phone_number', userContext.phone_number)
  .order('created_at', { ascending: false })
  .limit(1);

const alreadyChosen = tempData?.[0]?.preferences_captured?.chosen_user_type;
```

---

## 🎯 Reglas de Negocio

### 1. Solo para Usuarios Nuevos

```javascript
if (!userContext.is_new_user) {
  return {
    success: false,
    message: "Este tool solo se usa para usuarios nuevos."
  };
}
```

### 2. Pregunta Solo Una Vez

Si el usuario ya respondió en un mensaje anterior, el tool:
- No vuelve a preguntar
- Retorna directamente la elección guardada

### 3. Validación de Respuesta

Si el usuario responde algo que no podemos interpretar:
- El tool vuelve a preguntar con el mismo mensaje
- Mantiene el estado de "esperando respuesta"

### 4. Limpieza de Sesión

Una vez que el onboarding se completa:
- La sesión temporal se puede eliminar o marcar como completada
- Los datos reales del usuario están en `restaurants` o `suppliers`

---

## 🧪 Testing

### Test 1: Usuario Nuevo con Respuesta Numérica

```
INPUT:
- Usuario nuevo: true
- Mensaje: "1"

EXPECTED:
- Guarda: chosen_user_type = "restaurant"
- Retorna: "Perfeito! Vou iniciar seu cadastro como restaurante."
- Next tool: onboarding_restaurant
```

### Test 2: Usuario Nuevo con Respuesta de Texto

```
INPUT:
- Usuario nuevo: true
- Mensaje: "sou fornecedor"

EXPECTED:
- Guarda: chosen_user_type = "supplier"
- Retorna: "Perfeito! Vou iniciar seu cadastro como fornecedor."
- Next tool: onboarding_supplier
```

### Test 3: Usuario Nuevo Sin Respuesta Clara

```
INPUT:
- Usuario nuevo: true
- Mensaje: "oi"

EXPECTED:
- needs_user_input = true
- Muestra pregunta completa con opciones 1/2
- NO llama ningún tool de onboarding
```

### Test 4: Usuario Ya Registrado

```
INPUT:
- Usuario nuevo: false
- Mensaje: "cualquier cosa"

EXPECTED:
- success = false
- message: "Este tool solo se usa para usuarios nuevos"
- El agente debe usar otros tools
```

### Test 5: Usuario Eligió Previamente

```
INPUT:
- Usuario nuevo: true
- Ya existe sesión con chosen_user_type = "restaurant"
- Mensaje: "2" (intenta cambiar)

EXPECTED:
- Usa la elección PREVIA (restaurant)
- Procede con onboarding_restaurant
- Ignora el "2"
```

---

## 📊 SQL para Debugging

### Ver elecciones de tipo de usuario

```sql
SELECT
  phone_number,
  session_type,
  preferences_captured->>'chosen_user_type' as chosen_type,
  preferences_captured->>'choice_timestamp' as when_chosen,
  created_at,
  last_activity_at
FROM line_sessions
WHERE session_type = 'type_detection'
ORDER BY created_at DESC
LIMIT 10;
```

### Limpiar sesiones de detección antiguas

```sql
-- Eliminar sesiones de más de 24 horas sin completar
DELETE FROM line_sessions
WHERE session_type = 'type_detection'
  AND created_at < NOW() - INTERVAL '24 hours'
  AND NOT EXISTS (
    SELECT 1 FROM restaurants WHERE phone_number = line_sessions.phone_number
  )
  AND NOT EXISTS (
    SELECT 1 FROM suppliers WHERE phone_number = line_sessions.phone_number
  );
```

---

## 🔧 Integración con Workflow

### System Message - Customer Journey Agent

```
## 🚨 REGLA CRÍTICA #1: DETECCIÓN DE TIPO DE USUARIO NUEVO

**ANTES DE CUALQUIER COSA**, verifica:
Usuario nuevo: {{ $('Prepare User Context').first().json.is_new_user }}

**SI is_new_user = true:**
1. ✅ USA INMEDIATAMENTE el tool `determine_user_type`
2. ✅ ESPERA la respuesta del usuario
3. ✅ Si elige "restaurante", llama `onboarding_restaurant`
4. ❌ NO hagas preguntas generales
```

### System Message - Supplier Journey Agent

```
**SI is_new_user = true:**
1. ✅ USA INMEDIATAMENTE el tool `determine_user_type`
2. ✅ ESPERA la respuesta del usuario
3. ✅ Si elige "fornecedor", llama `onboarding_supplier`
```

---

## ✅ Ventajas de Este Approach

1. **UX Mejorado:** No asumimos, preguntamos claramente
2. **Menos Errores:** El usuario sabe exactamente qué opciones tiene
3. **Flexible:** Acepta múltiples formatos de respuesta
4. **Persistente:** No vuelve a preguntar si ya respondió
5. **Auditable:** Queda registro de cuándo y qué eligió

---

## 🚨 Casos Edge

### ¿Qué pasa si el usuario cambia de opinión?

**Escenario:**
```
Usuario: "1" (restaurante)
Bot: "Vou iniciar cadastro como restaurante"
Usuario: "no, sou fornecedor"
```

**Solución:**
- El onboarding_restaurant detecta que el usuario se confundió
- Se puede implementar un comando "cancelar" o "volver"
- O permitir que llame manualmente determine_user_type de nuevo

### ¿Qué pasa si responde en otro idioma?

**Solución Actual:** Solo soporta portugués, español e inglés

**Mejora Futura:** Usar LLM para interpretar respuesta en cualquier idioma

### ¿Qué pasa si es ambos (restaurante Y fornecedor)?

**Escenario:** Usuario tiene tanto un restaurante como una empresa proveedora

**Solución Actual:** Debe elegir UNO por número de teléfono

**Mejora Futura:**
- Permitir registro dual con el mismo teléfono
- Agregar opción "3️⃣ Ambos"
- Crear dos registros pero vincularlos

---

## 📞 Próximos Pasos

1. ✅ Tool implementado
2. ✅ Integrado en workflow
3. ✅ System messages actualizados
4. ⏳ **RE-IMPORTAR workflow en n8n**
5. ⏳ Testear con usuarios reales
6. ⏳ Monitorear métricas de elección (cuántos restaurantes vs fornecedores)

---

## 🎉 Resultado Final

**Usuario Nuevo Antes:**
```
Usuario: "oi"
Bot: [Error o asume restaurante]
```

**Usuario Nuevo Ahora:**
```
Usuario: "oi"
Bot: "Olá! Você é:
     1️⃣ Restaurante
     2️⃣ Fornecedor"

Usuario: "1"
Bot: "Perfeito! Vou iniciar seu cadastro como restaurante 🍽️"
[Inicia onboarding]
```

✨ **MUCHO MÁS CLARO Y PROFESIONAL** ✨
