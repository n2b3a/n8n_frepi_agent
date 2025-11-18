# 🎯 Guía de Implementación - Onboarding Restaurant

## 📋 Resumen

Esta guía documenta la implementación completa del sistema de onboarding paso a paso para restaurantes en el workflow de Frepi.

## 🔧 Componentes Implementados

### 1. **onboarding_restaurant_n8n.js**
Código JavaScript completo del tool de onboarding que se integra en n8n como Tool de LangChain.

**Características:**
- ✅ Captura paso a paso de 4 campos
- ✅ Estado persistente en `line_sessions.preferences_captured`
- ✅ Validaciones en cada paso
- ✅ Detección de duplicados
- ✅ Guardado en `restaurants` + `restaurant_people`
- ✅ Manejo de errores con rollback
- ✅ Soporte para comandos "cancelar" y "voltar"
- ✅ Timeout de sesión (30 minutos)

### 2. **prepare_user_context.js**
Nodo auxiliar para preparar el contexto del usuario (opcional, si necesitas contexto avanzado).

## 📊 Flujo de Onboarding

```
Usuario: "Quero me cadastrar"
    ↓
┌─────────────────────────────────────────┐
│ PASO 1: Nombre del Restaurante          │
│ Bot: "¿Cuál es el nombre?"              │
│ Usuario: "Restaurante Sabor"            │
│ ✓ Validar: no vacío, no duplicado       │
│ ✓ Guardar en sesión                     │
└─────────────────────────────────────────┘
    ↓
┌─────────────────────────────────────────┐
│ PASO 2: Nombre de Contacto              │
│ Bot: "¿Cuál es tu nombre?"              │
│ Usuario: "João Silva"                   │
│ ✓ Validar: no vacío                     │
│ ✓ Guardar en sesión                     │
└─────────────────────────────────────────┘
    ↓
┌─────────────────────────────────────────┐
│ PASO 3: Ciudad                           │
│ Bot: "¿En qué ciudad?"                  │
│ Usuario: "São Paulo"                    │
│ ✓ Validar: no vacío                     │
│ ✓ Guardar en sesión                     │
└─────────────────────────────────────────┘
    ↓
┌─────────────────────────────────────────┐
│ PASO 4: Tipo de Negocio                 │
│ Bot: "¿Qué tipo? 1-11"                  │
│ Usuario: "2" o "Casual"                 │
│ ✓ Validar: enum restaurant_type         │
│ ✓ Guardar en sesión                     │
└─────────────────────────────────────────┘
    ↓
┌─────────────────────────────────────────┐
│ FINALIZACIÓN                             │
│ ✓ Crear registro en restaurants         │
│ ✓ Crear registro en restaurant_people   │
│ ✓ Vincular ambos                         │
│ ✓ Marcar sesión completa                │
│ ✓ Mensaje de bienvenida                 │
└─────────────────────────────────────────┘
```

## 🔌 Instrucciones de Instalación en n8n

### Opción A: Actualizar el Tool Existente

1. **Abrir n8n** y navegar al workflow "Frepi v2 - BOT Structure + MVP1 Functions"

2. **Encontrar el nodo** `onboarding_restaurant` (Tool Code node)

3. **Reemplazar el código**:
   - Abrir el nodo para editar
   - Copiar todo el contenido de `onboarding_restaurant_n8n.js`
   - Pegarlo en el campo `jsCode` del nodo
   - **IMPORTANTE**: Actualizar las credenciales de Supabase:
     ```javascript
     const SUPABASE_URL = 'https://tu-proyecto.supabase.co';
     const SUPABASE_KEY = 'tu-anon-key';
     ```

4. **Guardar** el workflow

### Opción B: Usar Variables de Entorno (Recomendado)

1. **Configurar credenciales en n8n**:
   - Ir a "Credentials" en n8n
   - Crear nueva credencial tipo "Supabase"
   - Guardar URL y Key

2. **Modificar el código** para usar las credenciales:
   ```javascript
   const supabaseCredentials = await this.getCredentials('supabase');
   const SUPABASE_URL = supabaseCredentials.host;
   const SUPABASE_KEY = supabaseCredentials.serviceRole;
   ```

3. **En el Tool Code node**, asegurarse de que tenga acceso a las credenciales

## 📝 Configuración Requerida

### 1. Tablas de Supabase

Asegurarse de que estas tablas existan:

#### `restaurants`
```sql
CREATE TABLE restaurants (
  id SERIAL PRIMARY KEY,
  restaurant_name VARCHAR(255) NOT NULL,
  restaurant_type VARCHAR(50),
  city VARCHAR(100),
  is_active BOOLEAN DEFAULT true,
  customer_since TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

#### `restaurant_people`
```sql
CREATE TABLE restaurant_people (
  id SERIAL PRIMARY KEY,
  restaurant_id INTEGER REFERENCES restaurants(id),
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  whatsapp_number VARCHAR(20) UNIQUE,
  is_primary_contact BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

#### `line_sessions`
```sql
CREATE TABLE line_sessions (
  id SERIAL PRIMARY KEY,
  session_id VARCHAR(100) UNIQUE NOT NULL,
  person_id INTEGER REFERENCES restaurant_people(id),
  channel_type VARCHAR(50),
  channel_id VARCHAR(100),
  session_type VARCHAR(50),
  primary_intent VARCHAR(100),
  awaiting_continuation BOOLEAN DEFAULT false,
  session_goal_achieved BOOLEAN DEFAULT false,
  session_start TIMESTAMPTZ DEFAULT NOW(),
  session_end TIMESTAMPTZ,
  last_activity_at TIMESTAMPTZ DEFAULT NOW(),
  preferences_captured JSONB,
  session_notes TEXT
);
```

### 2. Índices Recomendados

```sql
-- Para búsquedas rápidas
CREATE INDEX idx_restaurant_people_whatsapp
  ON restaurant_people(whatsapp_number);

CREATE INDEX idx_line_sessions_channel
  ON line_sessions(channel_id, awaiting_continuation);

CREATE INDEX idx_line_sessions_intent
  ON line_sessions(primary_intent, awaiting_continuation);
```

## 🎨 Personalización

### Cambiar el Timeout de Sesión

En `onboarding_restaurant_n8n.js`, línea ~30:
```javascript
const TIMEOUT_MINUTES = 30; // Cambiar a lo que necesites
```

### Agregar Más Tipos de Negocio

En el PASO 4, modificar el objeto `types`:
```javascript
const types = {
  '1': 'fine_dining',
  '2': 'casual_dining',
  // ... agregar más aquí
  '12': 'bakery',
  'panadería': 'bakery'
};
```

### Modificar Mensajes

Buscar los strings de mensaje en el código y personalizarlos:
```javascript
message: '📝 Olá! Bem-vindo ao Frepi.\n\n¿Cuál es el *nombre de tu restaurante*?'
```

## 🧪 Pruebas

### Test Case 1: Flujo Completo Exitoso
```
Usuario: "registrar"
Bot: "¿Nombre del restaurante?"
Usuario: "Pizza House"
Bot: "¿Tu nombre?"
Usuario: "María García"
Bot: "¿Ciudad?"
Usuario: "São Paulo"
Bot: "¿Tipo? 1-11"
Usuario: "3"
Bot: "✅ CADASTRO COMPLETO! ..."
```

### Test Case 2: Duplicado
```
Usuario: "registrar"
Bot: "¿Nombre del restaurante?"
Usuario: "Pizza House" (ya existe)
Bot: "⚠️ Já existe restaurante 'Pizza House'"
```

### Test Case 3: Cancelar
```
Usuario: "registrar"
Bot: "¿Nombre del restaurante?"
Usuario: "cancelar"
Bot: "❌ Cadastro cancelado."
```

### Test Case 4: Timeout
```
Usuario: "registrar"
Bot: "¿Nombre del restaurante?"
Usuario: "Pizza House"
[esperar > 30 minutos]
Usuario: "João"
Bot: "⏰ Sessão expirou."
```

## 📊 Estructura de Datos en `preferences_captured`

Ejemplo de cómo se almacena el estado durante el onboarding:

```json
{
  "step": 3,
  "collected_data": {
    "restaurant_name": "Pizza House",
    "contact_name": "María García",
    "city": "São Paulo",
    "business_type": null
  }
}
```

## 🔍 Debugging

### Ver logs en n8n
1. Activar "Execution List" en n8n
2. Ver detalles de cada ejecución
3. Revisar output del tool `onboarding_restaurant`

### Verificar en Supabase
```sql
-- Ver sesiones activas
SELECT * FROM line_sessions
WHERE awaiting_continuation = true
ORDER BY last_activity_at DESC;

-- Ver últimos registros
SELECT * FROM restaurants
ORDER BY created_at DESC LIMIT 10;

SELECT * FROM restaurant_people
ORDER BY created_at DESC LIMIT 10;
```

## 🚀 Próximos Pasos

Una vez implementado el onboarding:

1. **Implementar setup_buying_preferences** (siguiente paso del flujo)
2. **Agregar validaciones de ciudad** (lista permitida o geocoding)
3. **Implementar notificaciones** (email de bienvenida)
4. **Agregar analytics** (trackear conversiones de onboarding)
5. **Mejorar manejo de errores** (retry automático en caso de fallas de red)

## 📚 Referencias

- [Documentación de n8n LangChain Tools](https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent/)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript/introduction)
- [Frepi Database Schema](./Data%20supabase.md)

## ❓ FAQ

**P: ¿Qué pasa si el usuario cierra WhatsApp en medio del onboarding?**
R: La sesión queda guardada en `line_sessions` con `awaiting_continuation=true`. Cuando regrese, continuará desde donde quedó (si no pasaron 30 minutos).

**P: ¿Se puede cambiar el orden de las preguntas?**
R: Sí, solo reordenar los bloques de código de cada paso y ajustar el array `fields` en la función de "voltar".

**P: ¿Cómo agregar un paso adicional?**
R: Agregar un nuevo `case` en el switch, incrementar `total_steps`, y actualizar el paso 4 para que avance al paso 5.

**P: ¿Funciona con Telegram/otros canales?**
R: Sí, solo ajustar `channel_type` y `channel_id` según el canal. El flujo es el mismo.

## 🎉 ¡Listo!

Con esta implementación, tienes un sistema completo de onboarding conversacional que:
- Guía al usuario paso a paso
- Valida cada entrada
- Maneja errores graciosamente
- Guarda todo en Supabase
- Soporta interrupciones y continuación

¡Disfruta tu nuevo sistema de onboarding! 🚀
