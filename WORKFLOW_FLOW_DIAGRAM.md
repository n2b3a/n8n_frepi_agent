# 🔄 WORKFLOW FLOW - Arquitectura Correcta

**Última actualización:** 2025-01-18 (Post-fix)

---

## 📊 FLUJO COMPLETO CORREGIDO

```
┌─────────────────────────────────────────────────────────────────┐
│                      WHATSAPP TRIGGER                           │
│  (Recibe mensajes de WhatsApp)                                 │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                   EXTRACT MESSAGE DATA                          │
│  (Code node - Extrae phone_number y message del payload)       │
│                                                                 │
│  Output:                                                        │
│  {                                                              │
│    phone_number: "+5511999999999",                             │
│    message: "oi"                                                │
│  }                                                              │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                   REGISTRATION AGENT                            │
│  (AI Agent - Verificación y registro centralizado)             │
│                                                                 │
│  Tools disponibles:                                             │
│  ├─ check_user_in_database                                     │
│  ├─ onboarding_restaurant_complete                             │
│  └─ onboarding_supplier_complete                               │
│                                                                 │
│  Flujo interno:                                                │
│  1. Llama check_user_in_database                               │
│  2. Si registered=true: Saluda y retorna user info             │
│  3. Si registered=false:                                        │
│     - Pregunta: ¿Restaurante o Fornecedor?                     │
│     - Llama onboarding correspondiente                         │
│     - Retorna user info cuando completo                        │
│                                                                 │
│  Output:                                                        │
│  {                                                              │
│    registered: true,                                            │
│    user_type: "restaurant" | "supplier",                       │
│    restaurant_id: 123,                                          │
│    restaurant_person_id: 45,                                    │
│    phone_number: "+5511999999999",                             │
│    person_name: "João Silva",                                  │
│    ...                                                          │
│  }                                                              │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│              ROUTER: CUSTOMER OR SUPPLIER                       │
│  (IF node - Routing simple basado en user_type)                │
│                                                                 │
│  Condición:                                                     │
│  IF {{ $json.user_type }} == "restaurant"                      │
│     → TRUE branch                                               │
│  ELSE                                                           │
│     → FALSE branch                                              │
└─────────────┬───────────────────────────┬───────────────────────┘
              │ TRUE                      │ FALSE
              ▼                           ▼
┌──────────────────────────┐  ┌──────────────────────────┐
│  CUSTOMER JOURNEY AGENT  │  │  SUPPLIER JOURNEY AGENT  │
│  (Para restaurantes)     │  │  (Para fornecedores)     │
│                          │  │                          │
│  Tools:                  │  │  Tools:                  │
│  - setup_buying_prefs    │  │  - upload_supplier_prices│
│  - search_products       │  │  - normalize_product_list│
│  - build_shopping_cart   │  │  - publish_to_catalog    │
│  - execute_checkout      │  │  - show_supplier_menu    │
│  - show_customer_menu    │  │                          │
└──────────────────────────┘  └──────────────────────────┘
```

---

## 🔗 CONEXIONES DETALLADAS

### 1. WhatsApp Trigger → Extract Message Data
**Tipo:** `main`
**Propósito:** Pasar el mensaje raw para procesamiento

---

### 2. Extract Message Data → Registration Agent
**Tipo:** `main`
**Propósito:** Pasar datos estructurados (phone_number, message)
**Data pasada:**
```json
{
  "phone_number": "+5511999999999",
  "message": "oi"
}
```

---

### 3. Tools → Registration Agent
**Tipo:** `ai_tool`
**Tools conectados:**
- `check_user_in_database`
- `onboarding_restaurant_complete`
- `onboarding_supplier_complete`

**Propósito:** El Registration Agent puede llamar estos tools durante la conversación

---

### 4. Registration Agent → Router
**Tipo:** `main`
**Propósito:** Pasar user info completa para routing
**Data pasada:**
```json
{
  "registered": true,
  "user_type": "restaurant",
  "restaurant_id": 123,
  "restaurant_person_id": 45,
  "supplier_id": null,
  "phone_number": "+5511999999999",
  "person_name": "João Silva",
  "company_name": "Pizzaria Bella",
  "setup_complete": true
}
```

---

### 5. Router → Customer Journey Agent (TRUE branch)
**Tipo:** `main`
**Condición:** `user_type == "restaurant"`
**Propósito:** Dirigir restaurantes al Customer Agent

---

### 6. Router → Supplier Journey Agent (FALSE branch)
**Tipo:** `main`
**Condición:** `user_type != "restaurant"` (es decir, "supplier")
**Propósito:** Dirigir fornecedores al Supplier Agent

---

## ✅ PROBLEMAS CORREGIDOS

### ❌ Problema 1: Router duplicado
**Antes:**
- "Route: Customer or Supplier?" (viejo)
- "Router: Customer or Supplier" (nuevo)

**Después:**
- Solo "Router: Customer or Supplier" ✅

---

### ❌ Problema 2: Extract Message Data desconectado
**Antes:**
- Extract Message Data sin conexiones

**Después:**
- WhatsApp Trigger → Extract Message Data ✅
- Extract Message Data → Registration Agent ✅

---

## 🎯 VALIDACIÓN

Para verificar que el flow está correcto en n8n:

### 1. Verificar nodos existen:
- [ ] WhatsApp Trigger
- [ ] Extract Message Data
- [ ] Registration Agent
- [ ] check_user_in_database (tool)
- [ ] onboarding_restaurant_complete (tool)
- [ ] onboarding_supplier_complete (tool)
- [ ] Router: Customer or Supplier (IF node)
- [ ] Customer Journey Agent
- [ ] Supplier Journey Agent

### 2. Verificar conexiones:
- [ ] WhatsApp Trigger tiene flecha a Extract Message Data
- [ ] Extract Message Data tiene flecha a Registration Agent
- [ ] Los 3 tools tienen conexiones (pequeñas) a Registration Agent
- [ ] Registration Agent tiene flecha a Router
- [ ] Router tiene DOS flechas de salida:
  - [ ] Una a Customer Journey Agent (branch verde/TRUE)
  - [ ] Una a Supplier Journey Agent (branch roja/FALSE)

### 3. Verificar NO existen:
- [ ] "Route: Customer or Supplier?" (viejo, debe estar eliminado)
- [ ] "Buscar Usuario en DB" (viejo, debe estar eliminado)
- [ ] "Prepare User Context" (viejo, debe estar eliminado)
- [ ] "determine_user_type" tool (viejo, debe estar eliminado)

---

## 📝 NOTAS IMPORTANTES

### Extract Message Data
Este nodo es CRÍTICO porque transforma el payload de WhatsApp en el formato que Registration Agent necesita:

**Input (WhatsApp raw):**
```json
{
  "from": "+5511999999999",
  "body": "oi",
  "timestamp": "...",
  ...
}
```

**Output (para Registration Agent):**
```json
{
  "phone_number": "+5511999999999",
  "message": "oi"
}
```

### Router IF Condition
La condición EXACTA debe ser:
```javascript
{{ $json.user_type }} == "restaurant"
```

**NO usar:**
- `=== "restaurant"` (sintaxis incorrecta para n8n)
- Otras variaciones

---

## 🔍 DEBUGGING

Si el flow no funciona:

1. **Verificar execution en n8n:**
   - Ejecutar workflow
   - Ver cada nodo que se ejecuta
   - Verificar data que pasa entre nodos

2. **Verificar logs:**
   - Registration Agent debe mostrar console.log
   - Tools deben mostrar sus logs

3. **Verificar routing:**
   - Ver qué branch del Router se activa
   - Verificar que `user_type` tiene el valor correcto

---

## ✨ RESULTADO ESPERADO

**Cuando funciona correctamente:**

1. Usuario envía "oi" por WhatsApp
2. WhatsApp Trigger recibe mensaje
3. Extract Message Data extrae phone_number
4. Registration Agent:
   - Llama check_user_in_database
   - Si nuevo: hace onboarding
   - Si existente: saluda
5. Router lee `user_type`
6. Dirige a Customer o Supplier Agent
7. Agent correspondiente responde al usuario

**Todo en un flujo limpio y lineal!** 🎉
