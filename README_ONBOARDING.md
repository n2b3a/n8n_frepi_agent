# 🎉 Sistema de Onboarding Restaurant - IMPLEMENTADO

## 📦 Resumen de Implementación

Se ha implementado completamente el sistema de onboarding paso a paso para restaurantes en el proyecto Frepi. Este sistema permite capturar datos de nuevos restaurantes de manera conversacional a través de WhatsApp.

---

## 📁 Archivos Creados

### 1. **onboarding_restaurant_n8n.js** ⭐ PRINCIPAL
Código JavaScript completo listo para integrar en n8n como Tool de LangChain.

**Características implementadas:**
- ✅ Flujo conversacional paso a paso (4 pasos)
- ✅ Estado persistente en Supabase (`line_sessions.preferences_captured`)
- ✅ Validaciones completas en cada paso
- ✅ Detección de usuarios duplicados
- ✅ Guardado en `restaurants` + `restaurant_people`
- ✅ Rollback automático en caso de errores
- ✅ Comandos especiales: "cancelar" y "voltar"
- ✅ Timeout de sesión configurable (30 min por defecto)
- ✅ Manejo de errores robusto

**Cómo usarlo:**
Copiar y pegar este código en el nodo `onboarding_restaurant` del workflow de n8n.

---

### 2. **onboarding_restaurant_complete.js**
Versión completa con comentarios extensos para referencia y aprendizaje.

**Propósito:**
Documentación de código completo con explicaciones detalladas de cada sección.

---

### 3. **prepare_user_context.js**
Nodo auxiliar opcional para preparar contexto de usuario.

**Propósito:**
Si necesitas un nodo separado que consulte Supabase y prepare el contexto del usuario antes de llamar al onboarding.

---

### 4. **ONBOARDING_IMPLEMENTATION_GUIDE.md** 📚
Guía completa de implementación con:
- Instrucciones paso a paso para integrar en n8n
- Diagramas de flujo
- Configuración de Supabase
- Scripts SQL para crear tablas
- Test cases
- FAQ
- Troubleshooting

---

## 🔄 Flujo del Onboarding

```
┌─────────────────────────────────────┐
│ Usuario: "Quero me cadastrar"      │
└────────────┬────────────────────────┘
             ↓
┌─────────────────────────────────────┐
│ PASO 1: Nombre del Restaurante     │
│ • Validar longitud mínima          │
│ • Verificar duplicados en DB       │
│ • Guardar en sesión temporal       │
└────────────┬────────────────────────┘
             ↓
┌─────────────────────────────────────┐
│ PASO 2: Nombre de Contacto         │
│ • Validar no vacío                 │
│ • Guardar en sesión                │
└────────────┬────────────────────────┘
             ↓
┌─────────────────────────────────────┐
│ PASO 3: Ciudad                      │
│ • Validar no vacío                 │
│ • Guardar en sesión                │
└────────────┬────────────────────────┘
             ↓
┌─────────────────────────────────────┐
│ PASO 4: Tipo de Negocio            │
│ • Validar contra enum              │
│ • Guardar en sesión                │
└────────────┬────────────────────────┘
             ↓
┌─────────────────────────────────────┐
│ FINALIZACIÓN                        │
│ ✓ INSERT en restaurants            │
│ ✓ INSERT en restaurant_people      │
│ ✓ UPDATE sesión (completa)         │
│ ✓ Mensaje de bienvenida            │
└─────────────────────────────────────┘
```

---

## 🎯 Datos Capturados

| Campo | Validación | Tabla Destino |
|-------|-----------|---------------|
| Nombre Restaurante | Min 3 chars, no duplicado | `restaurants.restaurant_name` |
| Nombre Contacto | Min 2 chars | `restaurant_people.first_name` + `last_name` |
| Ciudad | Min 2 chars | `restaurants.city` |
| Tipo de Negocio | Enum (11 opciones) | `restaurants.restaurant_type` |
| WhatsApp | Auto-detectado | `restaurant_people.whatsapp_number` |

---

## 🚀 Cómo Implementar en n8n

### Opción Rápida (5 minutos)

1. **Abrir workflow** "Frepi v2 - BOT Structure + MVP1 Functions" en n8n

2. **Editar nodo** `onboarding_restaurant`

3. **Reemplazar código**:
   ```javascript
   // Copiar TODO el contenido de: onboarding_restaurant_n8n.js
   ```

4. **Configurar credenciales de Supabase**:
   ```javascript
   // Líneas 16-17 del código
   const SUPABASE_URL = 'https://tu-proyecto.supabase.co';
   const SUPABASE_KEY = 'tu-anon-key';
   ```

5. **Guardar y activar** el workflow

### Opción Segura (Recomendada)

1. Configurar credenciales de Supabase en n8n (Settings > Credentials)
2. Modificar el código para usar credenciales de n8n
3. Guardar y probar

Ver **ONBOARDING_IMPLEMENTATION_GUIDE.md** para instrucciones detalladas.

---

## 💾 Base de Datos Requerida

El sistema necesita estas tablas en Supabase:

### `restaurants`
```sql
CREATE TABLE restaurants (
  id SERIAL PRIMARY KEY,
  restaurant_name VARCHAR(255) NOT NULL,
  restaurant_type VARCHAR(50),
  city VARCHAR(100),
  is_active BOOLEAN DEFAULT true,
  customer_since TIMESTAMPTZ DEFAULT NOW()
);
```

### `restaurant_people`
```sql
CREATE TABLE restaurant_people (
  id SERIAL PRIMARY KEY,
  restaurant_id INTEGER REFERENCES restaurants(id),
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  whatsapp_number VARCHAR(20) UNIQUE,
  is_primary_contact BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true
);
```

### `line_sessions`
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

**Ver scripts completos en:** `ONBOARDING_IMPLEMENTATION_GUIDE.md`

---

## 🧪 Ejemplos de Uso

### Caso 1: Registro Exitoso
```
Usuario: "registrar"
Bot: "📝 Olá! ¿Cuál es el nombre de tu restaurante?"

Usuario: "Pizza House"
Bot: "✅ 'Pizza House' registrado. Qual é o seu nome?"

Usuario: "João Silva"
Bot: "✅ Prazer, João Silva! 👋 Em que cidade fica?"

Usuario: "São Paulo"
Bot: "✅ São Paulo 📍 Tipo de estabelecimento? 1-11"

Usuario: "3"
Bot: "✅ CADASTRO COMPLETO!
     🍽️ Pizza House
     👤 João Silva
     📍 São Paulo
     🎉 Bem-vindo ao Frepi!"
```

### Caso 2: Cancelar
```
Usuario: "registrar"
Bot: "¿Nombre del restaurante?"

Usuario: "cancelar"
Bot: "❌ Cadastro cancelado."
```

### Caso 3: Usuario Ya Registrado
```
Usuario: "registrar"
Bot: "⚠️ Este número já está cadastrado.
     Digite 'menu' para acessar."
```

---

## 📊 Estado de Sesión en Supabase

Durante el onboarding, el estado se guarda en `line_sessions.preferences_captured`:

```json
{
  "step": 3,
  "collected_data": {
    "restaurant_name": "Pizza House",
    "contact_name": "João Silva",
    "city": "São Paulo",
    "business_type": null
  }
}
```

Esto permite que el usuario:
- **Cierre WhatsApp** y continúe después (hasta 30 min)
- **Use "voltar"** para regresar al paso anterior
- **Cancele** en cualquier momento

---

## ⚙️ Configuración

### Timeout de Sesión
```javascript
// En onboarding_restaurant_n8n.js, línea 18
const TIMEOUT_MINUTES = 30; // Cambiar según necesidad
```

### Tipos de Negocio Soportados
1. Fine Dining
2. Casual Dining
3. Fast Food
4. Café/Padaria
5. Bistro
6. Buffet
7. Catering
8. Food Truck
9. Hotel
10. Pub/Bar
11. Otro

Para agregar más tipos, editar el objeto `types` en el PASO 4.

---

## 🐛 Debugging

### Ver sesiones activas en Supabase
```sql
SELECT * FROM line_sessions
WHERE awaiting_continuation = true
  AND primary_intent = 'registro_nuevo'
ORDER BY last_activity_at DESC;
```

### Ver últimos registros
```sql
SELECT r.*, rp.*
FROM restaurants r
LEFT JOIN restaurant_people rp ON r.id = rp.restaurant_id
ORDER BY r.customer_since DESC
LIMIT 10;
```

### Logs en n8n
1. Abrir "Executions" en n8n
2. Ver detalles de ejecución
3. Revisar output del tool `onboarding_restaurant`

---

## ✅ Checklist de Implementación

- [ ] Copiar código de `onboarding_restaurant_n8n.js` a n8n
- [ ] Configurar credenciales de Supabase
- [ ] Verificar que las tablas existan en Supabase
- [ ] Crear índices recomendados (ver guía)
- [ ] Probar flujo completo con WhatsApp de prueba
- [ ] Probar casos de error (duplicado, cancelar, timeout)
- [ ] Activar workflow en producción
- [ ] Monitorear primeros registros

---

## 🎓 Qué Aprendimos

Esta implementación demuestra:

1. **Manejo de estado conversacional** con Supabase JSONB
2. **Validaciones paso a paso** con feedback inmediato
3. **Transacciones con rollback** para consistencia de datos
4. **Timeout de sesión** para evitar sesiones huérfanas
5. **Comandos especiales** (cancelar, voltar)
6. **Detección de duplicados** antes de guardar
7. **Normalización de datos** (nombre completo → first/last name)

---

## 🚀 Próximos Pasos Sugeridos

1. **Implementar setup_buying_preferences** (siguiente tool del agente)
2. **Agregar validación de ciudad** con lista permitida
3. **Enviar email de bienvenida** después del registro
4. **Agregar analytics** para trackear conversión
5. **Implementar notificaciones** a admin cuando hay nuevo registro
6. **Mejorar UX** con botones interactivos (si WhatsApp lo soporta)

---

## 📞 Soporte

Si tienes preguntas o encuentras problemas:

1. Revisar **ONBOARDING_IMPLEMENTATION_GUIDE.md** (FAQ completo)
2. Verificar logs de ejecución en n8n
3. Consultar estado de sesión en Supabase
4. Revisar código fuente con comentarios en `onboarding_restaurant_complete.js`

---

## 📝 Notas Importantes

⚠️ **ANTES de ir a producción:**
- Cambiar credenciales hardcodeadas por variables de entorno
- Configurar rate limiting en Supabase
- Habilitar Row Level Security (RLS) en tablas
- Agregar logging y monitoreo
- Probar con múltiples usuarios concurrentes

✅ **El código está listo para:**
- Desarrollo local
- Testing
- Demo
- Producción (con configuración de seguridad)

---

## 🎉 ¡Felicitaciones!

Has implementado un sistema completo de onboarding conversacional con:
- ✅ 4 pasos de captura de datos
- ✅ Validaciones robustas
- ✅ Persistencia en Supabase
- ✅ Manejo de errores
- ✅ Comandos especiales
- ✅ Timeout de sesión

**Ahora tus usuarios pueden registrarse de manera natural y conversacional! 🚀**

---

*Última actualización: $(date)*
*Versión: 1.0.0*
*Desarrollado para: Frepi MVP2 Agent Structure*
