# 📚 Guía de Implementación: setup_buying_preferences

## 🎯 Objetivo

Capturar las preferencias de compra del restaurante en 5 pasos conversacionales y guardarlas en `restaurants.category_preferences` (JSONB).

---

## 📊 Flujo de Captura

```
Usuario: "configurar preferencias" o "preferencias"
    ↓
┌─────────────────────────────────────────┐
│ PASO 1: Marcas Preferidas               │
│ Bot: "¿Marcas preferidas?"              │
│ Usuario: "Sadia, Nestlé" o "nenhuma"   │
│ ✓ Parse: split por coma                │
│ ✓ Guardar en sesión                    │
└─────────────────────────────────────────┘
    ↓
┌─────────────────────────────────────────┐
│ PASO 2: Formatos Preferidos             │
│ Bot: "¿Formatos preferidos?"            │
│ Usuario: "kg, caixa" o "nenhuma"        │
│ ✓ Parse: split por coma                │
│ ✓ Guardar en sesión                    │
└─────────────────────────────────────────┘
    ↓
┌─────────────────────────────────────────┐
│ PASO 3: Frecuencia de Pedidos           │
│ Bot: "¿Frecuencia? 1-4"                 │
│ Usuario: "2" o "semanal"                │
│ ✓ Validar: ENUM frequency               │
│ ✓ Guardar en sesión                    │
└─────────────────────────────────────────┘
    ↓
┌─────────────────────────────────────────┐
│ PASO 4: Horario de Entrega              │
│ Bot: "¿Horario? 1-4"                    │
│ Usuario: "1" o "manhã"                  │
│ ✓ Validar: ENUM delivery_time           │
│ ✓ Guardar en sesión                    │
└─────────────────────────────────────────┘
    ↓
┌─────────────────────────────────────────┐
│ PASO 5: Restricciones Especiales        │
│ Bot: "¿Restricciones?"                  │
│ Usuario: "sem glúten" o "nenhuma"       │
│ ✓ Parse: texto libre                   │
│ ✓ Guardar en sesión                    │
└─────────────────────────────────────────┘
    ↓
┌─────────────────────────────────────────┐
│ FINALIZACIÓN                             │
│ ✓ UPDATE restaurants.category_preferences│
│ ✓ Marcar sesión completa                │
│ ✓ Mensaje de confirmación               │
└─────────────────────────────────────────┘
```

---

## 🔧 Integración en n8n

### 1. Abrir el Workflow

Workflow: **Frepi MVP2 - Full Architecture with Supabase Validations.json**

### 2. Encontrar el Tool

Buscar el nodo: `setup_buying_preferences`

### 3. Reemplazar el Código

**Código actual (mock):**
```javascript
// Setup Buying Preferences Tool
const input = $input.first().json;

const response = {
  status: 'configuring',
  // ... solo retorna estructura mock
};

return JSON.stringify(response);
```

**Reemplazar con:**
Copiar TODO el contenido de `setup_buying_preferences_COMPLETE.js`

### 4. Verificar Credenciales

Asegurarse de que el workflow tiene acceso a:
- `$supabase` (nodo de Supabase configurado)
- Nodo "Prepare User Context" funcionando

---

## 📝 Estructura de Datos Guardada

### En `line_sessions.preferences_captured`

Durante el proceso:
```json
{
  "preferences_status": "in_progress",
  "step": 3,
  "collected_data": {
    "preferred_brands": ["Sadia", "Nestlé"],
    "preferred_formats": ["kg", "caixa"],
    "order_frequency": "weekly",
    "delivery_schedule": null,
    "special_restrictions": null
  },
  "started_at": "2025-01-15T10:00:00Z"
}
```

### En `restaurants.category_preferences`

Al finalizar:
```json
{
  "preferred_brands": ["Sadia", "Nestlé", "Aurora"],
  "preferred_formats": ["kg", "caixa"],
  "order_frequency": "weekly",
  "delivery_schedule": "morning",
  "special_restrictions": "sem glúten, orgânico",
  "configured_at": "2025-01-15T10:05:00Z",
  "configured_by": 123
}
```

---

## 🎨 Opciones de Configuración

### Frecuencias Válidas

| Input | Valor Guardado |
|-------|----------------|
| 1, "diario", "daily" | `daily` |
| 2, "semanal", "weekly" | `weekly` |
| 3, "quinzenal", "biweekly" | `biweekly` |
| 4, "mensal", "monthly" | `monthly` |

### Horarios de Entrega Válidos

| Input | Valor Guardado | Descripción |
|-------|----------------|-------------|
| 1, "manhã", "morning" | `morning` | 6h-12h |
| 2, "tarde", "afternoon" | `afternoon` | 12h-18h |
| 3, "noite", "evening" | `evening` | 18h-22h |
| 4, "flexível", "flexible" | `flexible` | Qualquer horário |

---

## ✅ Validaciones Implementadas

### Verificaciones Pre-proceso

1. **Usuario Registrado**
   ```javascript
   if (userData.is_new_user || !userData.restaurant_id) {
     return JSON.stringify({
       error: true,
       message: 'Você precisa estar cadastrado primeiro.'
     });
   }
   ```

2. **Timeout de Sesión**
   - 30 minutos de inactividad
   - Limpia sesión expirada automáticamente

3. **Cancelación**
   - Palabras clave: "cancelar", "desistir", "parar"
   - Limpia sesión y notifica al usuario

### Validaciones por Paso

**Paso 3 - Frecuencia:**
```javascript
const frequency = VALID_FREQUENCIES[normalizedInput];
if (!frequency) {
  return JSON.stringify({
    error: true,
    message: 'Frequência inválida. Escolha 1-4...'
  });
}
```

**Paso 4 - Horario:**
```javascript
const deliveryTime = VALID_DELIVERY_TIMES[normalizedInput];
if (!deliveryTime) {
  return JSON.stringify({
    error: true,
    message: 'Horário inválido. Escolha 1-4...'
  });
}
```

---

## 🧪 Test Cases

### Test Case 1: Flujo Completo

```
Usuario: "configurar preferencias"
Bot: "¿Marcas preferidas?"

Usuario: "Sadia, Nestlé, Aurora"
Bot: "✅ Marcas: Sadia, Nestlé, Aurora. ¿Formatos?"

Usuario: "kg, caixa"
Bot: "✅ Formatos: kg, caixa. ¿Frecuencia? 1-4"

Usuario: "2"
Bot: "✅ Frecuencia: Semanalmente. ¿Horario? 1-4"

Usuario: "1"
Bot: "✅ Horario: Manhã. ¿Restricciones?"

Usuario: "sem glúten, orgânico"
Bot: "✅ PREFERÊNCIAS CONFIGURADAS! 🎉
     • Marcas: Sadia, Nestlé, Aurora
     • Formatos: kg, caixa
     • Frequência: Semanalmente
     • Horário: Manhã (6h-12h)
     • Restrições: sem glúten, orgânico"
```

### Test Case 2: Sin Preferencias

```
Usuario: "configurar"
Bot: "¿Marcas?"

Usuario: "nenhuma"
Bot: "✅ Sem preferência. ¿Formatos?"

Usuario: "nenhuma"
Bot: "✅ Sem preferência. ¿Frecuencia? 1-4"

Usuario: "semanal"
Bot: "✅ Semanalmente. ¿Horario? 1-4"

Usuario: "flexível"
Bot: "✅ Flexível. ¿Restricciones?"

Usuario: "nenhuma"
Bot: "✅ CONFIGURADO!
     • Frequência: Semanalmente
     • Horário: Flexível"
```

### Test Case 3: Cancelación

```
Usuario: "configurar"
Bot: "¿Marcas?"

Usuario: "Sadia"
Bot: "✅ Sadia. ¿Formatos?"

Usuario: "cancelar"
Bot: "❌ Configuração cancelada."
```

### Test Case 4: Timeout

```
Usuario: "configurar"
Bot: "¿Marcas?"

Usuario: "Sadia"
Bot: "✅ Sadia. ¿Formatos?"

[espera > 30 minutos]

Usuario: "kg"
Bot: "⏰ Sessão expirou. Digite 'menu'."
```

---

## 🔍 Debugging

### Ver Logs en n8n

1. Abrir "Executions" en n8n
2. Ver detalles de ejecución
3. Buscar logs con prefijo `[Preferences]`

Ejemplos de logs:
```
🔄 [Preferences] User: 5511999999999 Message: Sadia
✅ [Preferences] Step 1 complete: Sadia
🔄 [Preferences] Continuing session: 5511999999999_preferences_1705316400000 Step: 2
💾 [Preferences] Saving to database...
✅ [Preferences] Restaurant preferences updated: 42
✅ [Preferences] Session marked as complete
```

### Verificar en Supabase

**Ver sesiones activas:**
```sql
SELECT * FROM line_sessions
WHERE primary_intent = 'configurar_preferencias'
  AND awaiting_continuation = true
ORDER BY last_activity_at DESC;
```

**Ver preferencias guardadas:**
```sql
SELECT
  id,
  restaurant_name,
  category_preferences
FROM restaurants
WHERE category_preferences IS NOT NULL
ORDER BY updated_at DESC
LIMIT 10;
```

**Ver ejemplo de preferencias:**
```sql
SELECT
  category_preferences->>'preferred_brands' as brands,
  category_preferences->>'order_frequency' as frequency,
  category_preferences->>'delivery_schedule' as delivery,
  category_preferences->>'configured_at' as when
FROM restaurants
WHERE id = 42;
```

---

## 🚀 Próximos Pasos

Una vez implementado `setup_buying_preferences`:

1. **Usar las preferencias en `search_products_vector`**
   - Filtrar por marcas preferidas
   - Priorizar formatos preferidos
   - Ajustar recomendaciones

2. **Crear sugerencias automáticas**
   - Según frecuencia de pedidos
   - Productos habituales del restaurante

3. **Dashboard de preferencias**
   - Permitir editar preferencias
   - Ver historial de cambios

---

## ❓ FAQ

**P: ¿Puedo editar las preferencias después?**
R: Sí, solo ejecutar "configurar preferencias" de nuevo y sobrescribirá.

**P: ¿Se puede agregar/quitar una marca sin rehacer todo?**
R: Por ahora no, pero se puede implementar un comando "editar marcas".

**P: ¿Qué pasa si dejo campos en blanco?**
R: Se guardan como `null` o array vacío. No hay problema.

**P: ¿Las preferencias afectan las búsquedas?**
R: Sí, una vez implementado en `search_products_vector`, priorizará según preferencias.

---

## 🎉 ¡Listo!

Con esta implementación tienes un sistema completo de configuración de preferencias que:
- ✅ Captura 5 tipos de preferencias
- ✅ Valida cada entrada
- ✅ Maneja sesión con timeout
- ✅ Guarda en JSONB
- ✅ Soporta cancelación
- ✅ Logging completo

¡Disfruta! 🚀
