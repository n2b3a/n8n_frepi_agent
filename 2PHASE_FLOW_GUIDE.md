# 🔄 Supplier Price Updater - Flujo en 2 Fases

**Status:** ✅ Implementado
**Date:** 2025-11-23
**Commit:** `39c2a8d`

---

## 📋 Resumen

El **Supplier Price Updater Agent** (agentTool) sigue un **flujo conversacional en DOS FASES** para actualizar precios que los restaurantes reciben de fornecedores.

### ¿Por qué 2 fases?

Porque hay productos que **NO tienen master_list_id** y necesitan **confirmación manual del usuario** antes de actualizar.

---

## 📍 FASE 1: Procesamiento Inicial (Automático)

### Pasos 1-6 (Ejecutados en secuencia sin pausas)

#### **Paso 1: Customer envía lista de precios**

Ejemplo de entrada:
```
"Recebi cotação da Friboi: picanha R$ 47/kg, arroz R$ 28/saco"
```

El agente extrae:
- Fornecedor: "Friboi"
- Productos: ["picanha", "arroz"]
- Precios: [47, 28]
- Unidades: ["kg", "saco"]

---

#### **Paso 2: Tool `match_with_existing_supplier_mapped`**

**Qué hace:**
- Busca cada producto en `supplier_mapped_products` usando vector search
- **Si encuentra match:** Retorna `product_id` existente
- **Si NO encuentra:** **CREA nuevo registro** con `master_list_id = NULL`

**Ejemplo de retorno:**
```json
{
  "supplier_id": 5,
  "supplier_name": "Friboi",
  "products_with_master_list_id": [
    {
      "product_id": 123,
      "product_name": "Picanha",
      "price": 47,
      "unit": "kg",
      "master_list_id": 45
    }
  ],
  "products_without_master_list_id": [
    {
      "product_id": 124,  // ← CREADO NUEVO
      "product_name": "Arroz Tipo 1",
      "price": 28,
      "unit": "saco",
      "master_list_id": null  // ← SIN LINKEAR
    }
  ]
}
```

**Key point:** Los productos que NO existen se **crean automáticamente** en `supplier_mapped_products` con `master_list_id = NULL`.

---

#### **Paso 3: Tool `update_prices` (Primera vez)**

**Qué actualiza:**
- ✅ SOLO productos que **YA tienen master_list_id** (ejemplo: picanha)
- ❌ NO actualiza productos sin master_list_id (ejemplo: arroz)

**Por qué:**
- Productos con `master_list_id` están confirmados → seguros para actualizar
- Productos sin `master_list_id` necesitan confirmación primero

**Resultado:**
```
Picanha actualizada: R$ 47.00/kg ✅
Arroz NO actualizado todavía ⏸️
```

---

#### **Paso 4: Tool `proposal_to_match_master_list`**

**Qué hace:**
- Toma productos **SIN master_list_id** (ejemplo: arroz)
- Busca en `master_list` usando vector search
- Genera top 3-5 sugerencias con similarity scores

**Ejemplo de retorno:**
```json
{
  "proposals": [
    {
      "product_id": 124,
      "product_name": "Arroz Tipo 1",
      "suggestions": [
        {
          "master_list_id": 45,
          "product_name": "Arroz Branco Tipo 1",
          "category": "Grãos",
          "similarity": 0.92
        },
        {
          "master_list_id": 46,
          "product_name": "Arroz Tipo 2",
          "category": "Grãos",
          "similarity": 0.85
        }
      ]
    }
  ]
}
```

---

#### **Paso 5: Muestra resumen al usuario**

**Formato de respuesta (Português BR):**
```
✅ Preços atualizados com sucesso!
• Picanha: R$ 47.00/kg

⚠️ Este produto pode ser um match. Pode confirmar?

1. Arroz Tipo 1 (R$ 28/saco)
   Sugestões:
   1. 🟢 Arroz Branco Tipo 1 (Grãos) - 92% similar
   2. 🟡 Arroz Tipo 2 (Grãos) - 85% similar

Responda no formato: 1→1 (ou "1→none" se não for nenhum)
```

**Elementos:**
- ✅ Productos actualizados exitosamente
- ⚠️ Productos que necesitan confirmación
- Propuestas con similarity visual (🟢 alta, 🟡 media, 🔴 baja)
- Instrucciones claras de formato de respuesta

---

#### **Paso 6: ⏸️ ESPERA confirmación del usuario**

**CRÍTICO:**
- El agente **NO continúa automáticamente**
- Debe esperar que el usuario responda
- Formato esperado: "1→1", "2→2", "1→none", etc.

**Fin de FASE 1** - Esperando input del usuario...

---

## 📍 FASE 2: Confirmación y Actualización Final

### Pasos 7-10 (Después de confirmación del usuario)

#### **Paso 7: Usuario confirma**

Ejemplos de entrada válidos:
```
"1→1"
"1->1"
"1→1, 2→2"
"1→none"
"confirmar tudo"  (confirma todas las sugerencias #1)
```

El agente parsea la confirmación.

---

#### **Paso 8: Tool `confirm_master_list_matches`**

**Qué hace:**
- Parsea confirmación del usuario
- Actualiza `master_list_id` en `supplier_mapped_products`
- **Linkea** productos según confirmación

**Ejemplo:**
Usuario dijo: "1→1"
```sql
UPDATE supplier_mapped_products
SET master_list_id = 45  -- Arroz Branco Tipo 1
WHERE id = 124;  -- Arroz Tipo 1
```

**Retorna:**
```json
{
  "confirmed": [
    {
      "product_id": 124,
      "product_name": "Arroz Tipo 1",
      "master_list_id": 45,
      "master_list_name": "Arroz Branco Tipo 1"
    }
  ],
  "skipped": []
}
```

---

#### **Paso 9: Tool `update_prices` (Segunda vez)**

**Qué actualiza:**
- ✅ Productos **recién linkeados** en paso 8
- Ahora estos productos YA tienen `master_list_id`

**Resultado:**
```
Arroz Branco Tipo 1 actualizado: R$ 28.00/saco ✅
```

---

#### **Paso 10: Muestra confirmación final**

**Formato de respuesta:**
```
✅ Todos os preços atualizados!

📊 Resumo:
• Picanha: R$ 47.00/kg ✅
• Arroz Branco Tipo 1: R$ 28.00/saco ✅ (vinculado)

Total: 2 produtos processados, 2 preços atualizados 🎉
```

**Fin de FASE 2** - Proceso completado.

---

## 🔄 Diagrama de Flujo Completo

```
┌─────────────────────────────────────────────┐
│  FASE 1: Procesamiento Inicial (Automático) │
└─────────────────────────────────────────────┘

1. Usuario envía: "Recebi cotação da Friboi: picanha R$ 47, arroz R$ 28"
         ↓
2. match_with_existing_supplier_mapped
   - Picanha: ENCONTRADO (product_id=123, master_list_id=45) ✅
   - Arroz: NO ENCONTRADO → CREA NUEVO (product_id=124, master_list_id=NULL) 🆕
         ↓
3. update_prices (primera vez)
   - Picanha: ACTUALIZADO a R$ 47 ✅
   - Arroz: NO ACTUALIZADO (sin master_list_id) ⏸️
         ↓
4. proposal_to_match_master_list
   - Arroz → Propuestas: [Arroz Branco (92%), Arroz Tipo 2 (85%)]
         ↓
5. Responde al usuario:
   "✅ Picanha atualizada
    ⚠️ Arroz precisa confirmação: 1→1?"
         ↓
6. ⏸️ ESPERA CONFIRMACIÓN
         ↓
         │
   [Usuario responde: "1→1"]
         │
         ↓
┌─────────────────────────────────────────────┐
│  FASE 2: Confirmación (Después de respuesta)│
└─────────────────────────────────────────────┘

7. Usuario confirma: "1→1"
         ↓
8. confirm_master_list_matches
   - Arroz (product_id=124) → master_list_id=45 (Arroz Branco) ✅
         ↓
9. update_prices (segunda vez)
   - Arroz: ACTUALIZADO a R$ 28 ✅
         ↓
10. Responde al usuario:
    "✅ Todos atualizados!
     • Picanha: R$ 47 ✅
     • Arroz Branco: R$ 28 ✅ (vinculado)"
```

---

## 🎯 Puntos Clave

### 1. Creación Automática de Productos

En **Paso 2**, si un producto NO existe en `supplier_mapped_products`:
- ✅ Se CREA automáticamente
- ✅ Se asigna `master_list_id = NULL`
- ✅ Se retorna el `product_id` nuevo

**NO se rechaza**, **NO se omite** - se crea para poder trabajar con él.

### 2. Actualización en Dos Etapas

**Paso 3 (FASE 1):** Actualiza SOLO productos con `master_list_id`
**Paso 9 (FASE 2):** Actualiza productos recién linkeados

**Por qué dos veces:**
- Primera vez: Ya están confirmados
- Segunda vez: Recién se confirmaron

### 3. Espera entre Fases

**CRÍTICO:**
- El agente **DEBE ESPERAR** respuesta del usuario
- **NO puede** continuar automáticamente a FASE 2
- La conversación es **multi-turno**

### 4. Formato de Confirmación

Formatos aceptados:
```
"1→1"          (producto 1 → sugerencia 1)
"1->1"         (flecha alternativa)
"1:1"          (dos puntos)
"1→none"       (no linkear)
"1→1, 2→2"     (múltiples)
"confirmar tudo" (todas las sugerencias #1)
```

---

## 🧪 Ejemplo Completo de Testing

### Mensaje 1 (Usuario):
```
"Recebi cotação da Friboi: picanha R$ 47/kg, arroz R$ 28/saco"
```

### Respuesta Esperada (FASE 1):
```
✅ Preços atualizados com sucesso!
• Picanha: R$ 47.00/kg

⚠️ Este produto pode ser um match. Pode confirmar?

1. Arroz (R$ 28/saco)
   Sugestões:
   1. 🟢 Arroz Branco Tipo 1 - 92% similar
   2. 🟡 Arroz Tipo 2 - 85% similar

Responda: 1→1 (ou 1→none)
```

**Verificar:**
- ✅ Picanha está actualizada en DB
- ✅ Arroz está creado en supplier_mapped_products
- ✅ Arroz tiene `master_list_id = NULL`
- ✅ Arroz NO está actualizado todavía
- ✅ Agente muestra propuestas
- ✅ Agente espera respuesta

---

### Mensaje 2 (Usuario):
```
"1→1"
```

### Respuesta Esperada (FASE 2):
```
✅ Todos os preços atualizados!

📊 Resumo:
• Picanha: R$ 47.00/kg ✅
• Arroz Branco Tipo 1: R$ 28.00/saco ✅ (vinculado)

Total: 2 produtos processados, 2 preços atualizados 🎉
```

**Verificar:**
- ✅ Arroz ahora tiene `master_list_id = 45`
- ✅ Arroz precio actualizado a R$ 28.00
- ✅ `restaurant_supplier_relationships` actualizado
- ✅ `price_history` tiene registro (si tabla existe)
- ✅ Agente muestra resumen completo

---

## 🚨 Errores Comunes a Evitar

### ❌ Error 1: Actualizar todo en FASE 1
**Incorrecto:**
```
Paso 3: update_prices → Actualiza picanha Y arroz
```

**Correcto:**
```
Paso 3: update_prices → Actualiza SOLO picanha (tiene master_list_id)
Paso 9: update_prices → Actualiza arroz (después de linkear)
```

### ❌ Error 2: No crear productos nuevos
**Incorrecto:**
```
Paso 2: Si producto no existe → retorna error
```

**Correcto:**
```
Paso 2: Si producto no existe → CREA con master_list_id=NULL
```

### ❌ Error 3: No esperar confirmación
**Incorrecto:**
```
Paso 6: Automáticamente asume "1→1" y continúa
```

**Correcto:**
```
Paso 6: ESPERA respuesta explícita del usuario
```

### ❌ Error 4: Llamar confirm_master_list_matches sin propuestas
**Incorrecto:**
```
Paso 8: Llamar sin haber llamado proposal_to_match_master_list antes
```

**Correcto:**
```
Paso 4: proposal_to_match_master_list (genera propuestas)
...espera...
Paso 8: confirm_master_list_matches (usa propuestas del paso 4)
```

---

## 📋 Checklist de Implementación

### Sistema
- [x] Supplier Price Updater Agent es tipo `agentTool`
- [x] Conectado a Customer Main Agent como tool
- [x] Tiene Chat Model dedicado
- [x] System message con flujo en 2 fases

### Tools
- [x] `match_with_existing_supplier_mapped` crea productos nuevos
- [x] `update_prices` puede llamarse dos veces
- [x] `proposal_to_match_master_list` genera propuestas
- [x] `confirm_master_list_matches` parsea confirmación

### Flujo
- [x] FASE 1 ejecuta pasos 1-6 automáticamente
- [x] Paso 6 espera confirmación del usuario
- [x] FASE 2 ejecuta pasos 7-10 después de confirmación
- [x] Respuestas en Português Brasileiro
- [x] Formato claro de propuestas

---

## 🎉 Status

**Implementación:** ✅ Complete
**Testing:** ⏸️ Pendiente
**Branch:** `claude/initial-setup-01HgjCxZE2CAnbXfJmyzjd3p`
**Commit:** `39c2a8d`

---

**Creado por:** Claude Code
**Fecha:** 2025-11-23
**Próximo paso:** Importar en n8n y testear flujo en 2 fases
