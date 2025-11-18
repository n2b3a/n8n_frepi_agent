# 🧪 REGISTRATION AGENT - Testing Guide

**Fecha:** 2025-01-18
**Versión:** 1.0

---

## 📋 PRE-REQUISITOS

Antes de testar, asegúrate de:

- [ ] Workflow re-importado en n8n
- [ ] Credenciales de Supabase configuradas
- [ ] Credenciales de OpenAI configuradas
- [ ] WhatsApp Trigger activado
- [ ] Número de teléfono de prueba disponible

---

## 🎯 TEST SCENARIOS

### Test 1: Usuario NUEVO - Restaurante

**Objetivo:** Verificar onboarding completo de un restaurante nuevo

**Pasos:**

1. **Enviar mensaje inicial:**
   ```
   Usuario: oi
   ```

2. **Esperar respuesta del Registration Agent:**
   ```
   Bot: Olá! Bem-vindo ao Frepi! 🎉

   Para começar, preciso saber:

   Você é:
   1️⃣ Um restaurante (quero comprar produtos)
   2️⃣ Um fornecedor (quero vender produtos)

   Responda com 1 ou 2, ou escreva 'restaurante' ou 'fornecedor'.
   ```

3. **Responder con opción restaurante:**
   ```
   Usuario: 1
   ```

4. **Bot debe preguntar nombre del restaurante:**
   ```
   Bot: Qual é o nome do seu restaurante? 🍽️
   ```

5. **Responder con nombre:**
   ```
   Usuario: Pizzaria Bella Napoli
   ```

6. **Bot debe preguntar tipo:**
   ```
   Bot: Ótimo! E qual tipo de restaurante é o "Pizzaria Bella Napoli"?

   Exemplos: pizzaria, churrascaria, restaurante italiano, lanchonete, etc.
   ```

7. **Responder con tipo:**
   ```
   Usuario: pizzaria
   ```

8. **Bot debe preguntar endereço:**
   ```
   Bot: Qual é o endereço completo do restaurante?

   Exemplo: Rua das Flores, 123, Centro, São Paulo, SP, 01234-567
   ```

9. **Responder con endereço:**
   ```
   Usuario: Rua Giuseppe Verdi, 456, Centro, São Paulo, SP
   ```

10. **Bot debe preguntar nome da pessoa:**
    ```
    Bot: E qual é o seu nome? 👤
    ```

11. **Responder con nome:**
    ```
    Usuario: Giovanni Rossi
    ```

12. **Bot debe preguntar função:**
    ```
    Bot: Qual é a sua função no restaurante?

    Exemplo: Chef, Gerente, Proprietário, Comprador, etc.
    ```

13. **Responder con função:**
    ```
    Usuario: Chef e Proprietário
    ```

14. **Bot debe confirmar cadastro completo:**
    ```
    Bot: Perfeito, Giovanni Rossi! ✅

    Seu restaurante "Pizzaria Bella Napoli" está cadastrado no Frepi!

    Agora você já pode começar a usar o sistema! 🎉
    ```

15. **Router debe dirigir a Customer Journey Agent:**
    - Verificar que el siguiente mensaje viene del Customer Journey Agent
    - Debe mostrar el menú de 4 opciones

**Validación en DB:**

```sql
-- Verificar restaurant criado
SELECT * FROM restaurants
WHERE restaurant_name = 'Pizzaria Bella Napoli';

-- Verificar person criado
SELECT * FROM restaurant_people
WHERE person_name = 'Giovanni Rossi';

-- Verificar relación
SELECT
  r.restaurant_name,
  rp.person_name,
  rp.role,
  rp.whatsapp_number
FROM restaurants r
JOIN restaurant_people rp ON r.id = rp.restaurant_id
WHERE r.restaurant_name = 'Pizzaria Bella Napoli';
```

**Expected Result:**
- ✅ Restaurant creado con is_active = true
- ✅ Person creado con is_active = true
- ✅ Relación correcta entre restaurant y person
- ✅ Session en line_sessions con awaiting_continuation = false

---

### Test 2: Usuario NUEVO - Supplier

**Objetivo:** Verificar onboarding completo de un fornecedor nuevo

**Pasos:**

1. **Enviar mensaje inicial:**
   ```
   Usuario: oi
   ```

2. **Responder con opción supplier:**
   ```
   Usuario: 2
   ```

3. **Bot debe preguntar nome da empresa:**
   ```
   Bot: Qual é o nome da sua empresa fornecedora? 📦
   ```

4. **Responder:**
   ```
   Usuario: Distribuidora Alimentos Premium Ltda
   ```

5. **Bot debe preguntar tipo de negócio:**
   ```
   Bot: Ótimo! E qual é o tipo de negócio da "Distribuidora Alimentos Premium Ltda"?

   1️⃣ Distribuidor
   2️⃣ Produtor
   3️⃣ Atacadista

   Responda com 1, 2, 3 ou escreva o tipo.
   ```

6. **Responder:**
   ```
   Usuario: 1
   ```

7. **Bot debe preguntar CNPJ:**
   ```
   Bot: Qual é o CNPJ da empresa?

   Formato: 12.345.678/0001-90

   (Se não tiver CNPJ, pode pular digitando 'pular')
   ```

8. **Responder:**
   ```
   Usuario: 12.345.678/0001-90
   ```

9. **Bot debe preguntar nome da pessoa de contato:**
   ```
   Bot: Qual é o nome da pessoa de contato? 👤
   ```

10. **Responder:**
    ```
    Usuario: João Silva
    ```

11. **Bot debe preguntar endereço:**
    ```
    Bot: Qual é o endereço da empresa?

    Exemplo: Rua do Comércio, 456, Distrito Industrial, São Paulo, SP
    ```

12. **Responder:**
    ```
    Usuario: Av. Industrial, 1000, Distrito Industrial, São Paulo, SP
    ```

13. **Bot debe preguntar categorias de produtos:**
    ```
    Bot: Por último, quais categorias de produtos vocês fornecem?

    Exemplos: carnes, laticínios, frutas e verduras, grãos, bebidas, etc.

    (Pode listar vários separados por vírgula)
    ```

14. **Responder:**
    ```
    Usuario: carnes, frios, laticínios
    ```

15. **Bot debe confirmar cadastro:**
    ```
    Bot: Perfeito, João Silva! ✅

    Sua empresa "Distribuidora Alimentos Premium Ltda" está cadastrada no Frepi como fornecedor!

    Agora você já pode começar a oferecer seus produtos! 📦🎉
    ```

16. **Router debe dirigir a Supplier Journey Agent**

**Validación en DB:**

```sql
-- Verificar supplier criado
SELECT * FROM suppliers
WHERE company_name = 'Distribuidora Alimentos Premium Ltda';

-- Verificar campos
SELECT
  company_name,
  business_type,
  cnpj,
  contact_name,
  phone_number,
  product_categories,
  is_active
FROM suppliers
WHERE company_name = 'Distribuidora Alimentos Premium Ltda';
```

**Expected Result:**
- ✅ Supplier creado con is_active = true
- ✅ business_type = 'distributor'
- ✅ product_categories = ['carnes', 'frios', 'laticínios']
- ✅ contact_method = 'whatsapp'

---

### Test 3: Usuario EXISTENTE - Restaurante

**Objetivo:** Verificar que usuario registrado es reconocido

**Pre-condición:** Usar el mismo número de teléfono del Test 1

**Pasos:**

1. **Enviar mensaje:**
   ```
   Usuario: oi
   ```

2. **Bot debe reconocer usuario:**
   ```
   Bot: Olá Giovanni Rossi! Bem-vindo de volta ao Frepi! 👋
   ```

3. **Router debe dirigir inmediatamente a Customer Journey Agent:**
   - NO debe pedir onboarding de nuevo
   - Debe ir directo al Customer Journey Agent
   - Customer Agent debe responder al "oi" original

**Validación:**
- ✅ No se creó nuevo registro en DB
- ✅ check_user_in_database retornó registered: true
- ✅ Router dirigió a Customer Journey Agent
- ✅ NO pasó por proceso de onboarding

---

### Test 4: Usuario EXISTENTE - Supplier

**Objetivo:** Verificar que supplier registrado es reconocido

**Pre-condición:** Usar el mismo número del Test 2

**Pasos:**

1. **Enviar mensaje:**
   ```
   Usuario: bom dia
   ```

2. **Bot debe reconocer usuario:**
   ```
   Bot: Olá João Silva! Bem-vindo de volta ao Frepi! 👋
   ```

3. **Router debe dirigir a Supplier Journey Agent**

**Validación:**
- ✅ No se creó nuevo registro
- ✅ Router dirigió a Supplier Journey Agent

---

### Test 5: Onboarding INTERRUMPIDO y REANUDADO

**Objetivo:** Verificar que el onboarding puede ser pausado y reanudado

**Pasos:**

1. **Iniciar onboarding de restaurante:**
   ```
   Usuario: oi
   Bot: [Pregunta tipo de usuario]
   Usuario: 1
   Bot: Qual é o nome do seu restaurante?
   Usuario: Restaurante Teste
   Bot: Qual tipo de restaurante?
   ```

2. **ABANDONAR conversación** (esperar 1 minuto)

3. **Reiniciar conversación:**
   ```
   Usuario: oi
   ```

4. **Bot debe:**
   - Reconocer que hay onboarding incompleto
   - Continuar desde donde quedó (preguntando tipo de restaurante)

**Validación:**
- ✅ Session existe en line_sessions con awaiting_continuation = true
- ✅ preferences_captured tiene step = 2 y data.restaurant_name = "Restaurante Teste"
- ✅ Bot continúa desde step correcto

---

### Test 6: Respuestas INVÁLIDAS

**Objetivo:** Verificar manejo de respuestas no esperadas

**Pasos:**

1. **Enviar mensaje inicial:**
   ```
   Usuario: oi
   Bot: [Pregunta restaurante o supplier]
   ```

2. **Responder con texto inválido:**
   ```
   Usuario: não sei
   ```

3. **Bot debe:**
   - Pedir clarificación
   - Re-preguntar de forma amigable

4. **Probar con variaciones:**
   - Responder con emojis solo
   - Responder con números fuera de rango (3, 4, etc.)
   - Responder con texto random

**Expected:**
- ✅ Bot no se rompe
- ✅ Bot pide clarificación
- ✅ Bot vuelve a preguntar

---

### Test 7: CNPJ con "pular"

**Objetivo:** Verificar que supplier puede registrarse sin CNPJ

**Pasos:**

1. **Iniciar onboarding de supplier**

2. **Cuando pregunte CNPJ:**
   ```
   Usuario: pular
   ```

3. **Bot debe:**
   - Aceptar y continuar al siguiente paso
   - NO pedir CNPJ de nuevo

**Validación en DB:**
```sql
SELECT cnpj FROM suppliers
WHERE contact_name = '[nombre de prueba]';
-- Debe retornar NULL
```

---

## 📊 CHECKLIST COMPLETO

### Funcionalidad Básica
- [ ] Test 1: Onboarding restaurante completo funciona
- [ ] Test 2: Onboarding supplier completo funciona
- [ ] Test 3: Usuario existente restaurant es reconocido
- [ ] Test 4: Usuario existente supplier es reconocido

### Edge Cases
- [ ] Test 5: Onboarding puede ser pausado y reanudado
- [ ] Test 6: Respuestas inválidas son manejadas
- [ ] Test 7: CNPJ opcional funciona con "pular"

### Database Integrity
- [ ] Restaurants table tiene registros correctos
- [ ] Restaurant_people table tiene registros correctos
- [ ] Suppliers table tiene registros correctos
- [ ] Line_sessions tiene sessions correctas
- [ ] Relaciones entre tablas son correctas
- [ ] is_active = true en todos los registros

### Routing
- [ ] Router dirige restaurants a Customer Journey Agent
- [ ] Router dirige suppliers a Supplier Journey Agent
- [ ] Router NO rompe el flujo
- [ ] Customer/Supplier Agents reciben data correcta

### UX
- [ ] Mensajes son claros y amigables
- [ ] Mensajes están en portugués brasileño
- [ ] Confirmaciones incluyen nombre del usuario
- [ ] Errores son informativos

---

## 🐛 DEBUGGING

### Si onboarding no guarda en DB:

1. **Verificar logs en n8n:**
   - Ver console.log en tool execution
   - Buscar errores de Supabase

2. **Verificar credenciales:**
   - Supabase URL correcta
   - Supabase API Key correcta
   - Permisos en tablas (INSERT, SELECT)

3. **Verificar schema:**
   ```sql
   -- Verificar que tablas existen
   SELECT table_name FROM information_schema.tables
   WHERE table_schema = 'public'
   AND table_name IN ('restaurants', 'restaurant_people', 'suppliers');

   -- Verificar columnas
   SELECT column_name, data_type
   FROM information_schema.columns
   WHERE table_name = 'restaurants';
   ```

### Si Router no funciona:

1. **Verificar connections en workflow:**
   - Registration Agent → Router
   - Router → Customer Journey Agent (true branch)
   - Router → Supplier Journey Agent (false branch)

2. **Verificar condición del IF:**
   - Debe ser: `{{ $json.user_type }} == 'restaurant'`
   - Case sensitive

3. **Verificar que Registration Agent retorna user_type:**
   - Ver output del Registration Agent
   - Debe tener campo `user_type: 'restaurant'` o `'supplier'`

### Si usuario existente no es reconocido:

1. **Verificar phone_number en DB:**
   ```sql
   -- Buscar en restaurant_people
   SELECT * FROM restaurant_people
   WHERE whatsapp_number = '+5511999999999';

   -- Buscar en suppliers
   SELECT * FROM suppliers
   WHERE phone_number = '+5511999999999';
   ```

2. **Verificar formato de phone_number:**
   - Debe incluir código de país: +55
   - Debe ser consistente en toda la DB

---

## ✅ SUCCESS CRITERIA

El Registration Agent está funcionando correctamente cuando:

1. ✅ Usuarios nuevos pueden completar onboarding sin errores
2. ✅ Usuarios existentes son reconocidos inmediatamente
3. ✅ Datos se guardan correctamente en DB
4. ✅ Router dirige usuarios al agent correcto
5. ✅ Onboarding puede ser pausado y reanudado
6. ✅ Errores son manejados gracefully
7. ✅ Mensajes son claros y en portugués

---

## 📝 NOTAS DE TESTING

**Fecha:** _____________
**Tester:** _____________

### Test Results:

| Test # | Scenario | Status | Notes |
|--------|----------|--------|-------|
| 1 | Onboarding Restaurant | ⬜ Pass ⬜ Fail | |
| 2 | Onboarding Supplier | ⬜ Pass ⬜ Fail | |
| 3 | Existing Restaurant | ⬜ Pass ⬜ Fail | |
| 4 | Existing Supplier | ⬜ Pass ⬜ Fail | |
| 5 | Interrupted Onboarding | ⬜ Pass ⬜ Fail | |
| 6 | Invalid Responses | ⬜ Pass ⬜ Fail | |
| 7 | CNPJ Skip | ⬜ Pass ⬜ Fail | |

### Issues Found:

1. _______________________________________________________
2. _______________________________________________________
3. _______________________________________________________

### Recommendations:

1. _______________________________________________________
2. _______________________________________________________
3. _______________________________________________________

---

**Next Step:** Una vez que todos los tests pasen, podemos remover los nodos antiguos y considerar la Fase 0 completa! 🎉
