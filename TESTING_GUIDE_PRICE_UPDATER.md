# 🧪 Testing Guide - Supplier Price Updater Agent

**Status:** Integrated into Workflow JSON
**Ready for:** Import and Testing in n8n

---

## ✅ PRE-REQUISITES CHECKLIST

Before testing, ensure:

- [ ] Database setup complete:
  - [ ] `restaurant_supplier_relationships` table created
  - [ ] `supabase_rpc_functions.sql` executed
  - [ ] Validation script passed
- [ ] Workflow imported into n8n
- [ ] OpenAI API key configured
- [ ] Supabase credentials configured
- [ ] At least one test restaurant registered
- [ ] At least one test supplier in database

---

## 📥 STEP 1: Import Workflow

1. **Open n8n** → Workflows

2. **Import workflow:**
   - Click "Import from File"
   - Select: `Frepi MVP2 - Full Architecture with Supabase Validations.json`
   - Click "Import"

3. **Verify new nodes appear:**
   - ✅ Supplier Price Updater Agent (AI Agent)
   - ✅ match_with_existing_supplier_mapped (Code)
   - ✅ update_prices (Code)
   - ✅ proposal_to_match_master_list (Code)
   - ✅ confirm_master_list_matches (Code)
   - ✅ Check: Delegate to Price Updater? (IF)
   - ✅ Prepare Price Updater Input (Code)
   - ✅ Extract Price Updater Output (Code)

4. **Verify connections:**
   - Customer Journey Agent → IF Node
   - IF TRUE → Prepare Input → Sub-Agent → Extract Output
   - Tools → Sub-Agent (ai_tool connections)

5. **Save workflow**

---

## 🗄️ STEP 2: Database Setup

### 2.1: Create Table

```sql
-- Execute in Supabase SQL Editor
-- Copy content from: database/restaurant_supplier_relationships_schema.sql
```

**Verify:**
```sql
SELECT * FROM restaurant_supplier_relationships LIMIT 1;
-- Should return: (empty table, no error)
```

### 2.2: Create RPC Functions

```sql
-- Execute in Supabase SQL Editor
-- Copy content from: database/supabase_rpc_functions.sql
```

**Verify:**
```sql
SELECT routine_name
FROM information_schema.routines
WHERE routine_name LIKE 'match_%';

-- Should return 4 functions:
-- - match_suppliers_by_name
-- - match_supplier_products
-- - match_master_list_products
-- - match_products_across_all_suppliers
```

### 2.3: Validate Schema

```sql
-- Execute validation script
-- Copy content from: database/validate_restaurant_supplier_relationships.sql
```

**Expected output:** "VALIDATION COMPLETE - All tests passed"

---

## 🧪 STEP 3: Test Scenarios

### Test 1: Simple Price Update (All Products Known)

**Objective:** Test automatic matching and price update

**Pre-condition:**
- Supplier "Friboi" exists in database
- Product "Picanha" exists in `supplier_mapped_products` with `master_list_id`

**Test Input (via WhatsApp):**
```
Recebi cotação da Friboi: picanha R$ 47/kg
```

**Expected Flow:**
1. ✅ Customer Journey Agent receives message
2. ✅ Detects "recebi cotação" keyword
3. ✅ Returns `action: "delegate_to_price_updater"`
4. ✅ IF node routes to TRUE branch
5. ✅ Prepare Input maps data
6. ✅ Sub-Agent receives: `{message: "...", supplier_name: "Friboi", restaurant_id: ...}`
7. ✅ Agent calls `match_with_existing_supplier_mapped`
8. ✅ Tool finds supplier, matches product
9. ✅ Agent calls `update_prices`
10. ✅ Tool updates price in database
11. ✅ Agent returns completion message
12. ✅ Extract Output formats message
13. ✅ WhatsApp sends to user

**Expected Output (to user):**
```
✅ Cotação de Friboi processada!

📊 1 preço atualizado:
• Picanha: R$ 47.00/kg (+R$ 2.00, +4.4%)

✅ Atualização concluída! Posso ajudar com algo mais?
```

**Verify in Database:**
```sql
-- Check price was updated
SELECT product_name, price, updated_at
FROM supplier_mapped_products
WHERE product_name LIKE '%Picanha%'
  AND supplier_id = (SELECT id FROM suppliers WHERE company_name = 'Friboi');

-- Check relationship was updated
SELECT price_updates_count, last_interaction_date
FROM restaurant_supplier_relationships
WHERE supplier_id = (SELECT id FROM suppliers WHERE company_name = 'Friboi')
  AND restaurant_id = [test_restaurant_id];
```

---

### Test 2: With Manual Matching

**Objective:** Test proposal and confirmation flow

**Pre-condition:**
- Supplier "Friboi" exists
- Product "Tempero Especial" exists in `supplier_mapped_products` but NO `master_list_id`
- Product "Tempero Completo" exists in `master_list`

**Test Input:**
```
Recebi da Friboi: picanha R$ 47, tempero especial R$ 15
```

**Expected Flow:**
1-6. ✅ (same as Test 1)
7. ✅ Agent calls `match_with_existing_supplier_mapped`
8. ✅ Tool returns:
   - `products_with_master_list_id`: [Picanha]
   - `products_without_master_list_id`: [Tempero Especial]
9. ✅ Agent calls `update_prices` (for Picanha only)
10. ✅ Agent calls `proposal_to_match_master_list`
11. ✅ Tool returns suggestions for Tempero Especial
12. ✅ Agent asks user for confirmation

**Expected Output (First Message):**
```
✅ Picanha atualizada: R$ 47.00/kg

🔍 1 produto precisa de confirmação:

1. Tempero Especial (R$ 15/unidade)
   Sugestões:
   1. 🟡 Tempero Completo (Temperos) - 78% similar
   2. 🔴 Tempero Pronto (Temperos) - 72% similar

Qual opção corresponde? Responda no formato: 1→1
Ou responda "none" se for produto novo.
```

**User Response:**
```
1→1
```

**Expected Flow (Continuation):**
13. ✅ Agent calls `confirm_master_list_matches`
14. ✅ Tool links Tempero Especial → Tempero Completo
15. ✅ Agent calls `update_prices` (for newly linked product)
16. ✅ Agent returns final message

**Expected Output (Second Message):**
```
✅ Tempero Especial vinculado a Tempero Completo!
✅ Preço atualizado: R$ 15.00/unidade

🎉 Todos os preços foram atualizados!
```

**Verify in Database:**
```sql
-- Check Tempero Especial now has master_list_id
SELECT product_name, master_list_product_id, price
FROM supplier_mapped_products
WHERE product_name = 'Tempero Especial';

-- Should return: master_list_product_id = [id of Tempero Completo]
```

---

### Test 3: Supplier Not Found

**Objective:** Test supplier detection and creation flow

**Pre-condition:**
- Supplier "Carnes ABC" does NOT exist in database

**Test Input:**
```
Recebi cotação: picanha R$ 47
```

**Expected Flow:**
1-6. ✅ (same as Test 1)
7. ✅ Agent realizes no supplier mentioned
8. ✅ Agent asks: "De qual fornecedor você recebeu essa cotação?"

**Expected Output (First Message):**
```
De qual fornecedor você recebeu essa cotação?
```

**User Response:**
```
Carnes ABC
```

**Expected Flow (Continuation):**
9. ✅ Agent calls `match_with_existing_supplier_mapped` with "Carnes ABC"
10. ✅ Tool searches, finds no match
11. ✅ Tool returns `supplier_found: false`
12. ✅ Agent asks if user wants to create supplier

**Expected Output (Second Message):**
```
O fornecedor "Carnes ABC" não está cadastrado no sistema.

Deseja cadastrá-lo agora? (Sim/Não)
```

**User Response:**
```
Sim
```

**Expected:** Agent would ideally delegate to Registration Agent to create supplier
**Current Implementation:** Agent acknowledges and suggests manual creation

---

### Test 4: Multiple Products with Mixed Results

**Objective:** Test complex scenario with all cases

**Pre-condition:**
- Supplier "Friboi" exists
- "Picanha" has master_list_id ✅
- "Arroz" has master_list_id ✅
- "Tempero X" exists but no master_list_id ⚠️
- "Produto Novo" doesn't exist at all ❌

**Test Input:**
```
Friboi mandou preços:
- Picanha R$ 47/kg
- Arroz R$ 28/saco
- Tempero X R$ 15
- Produto Novo R$ 10
```

**Expected Output:**
```
✅ Cotação de Friboi processada!

📊 2 preço(s) atualizado(s) com sucesso:
• Picanha: R$ 47.00/kg
• Arroz: R$ 28.00/saco

🔍 1 produto precisa de confirmação:
[Tempero X suggestions...]

🆕 1 produto novo (não encontrado):
• Produto Novo

Vamos confirmar o match para Tempero X primeiro.
Qual opção corresponde?
```

---

### Test 5: Delegation Detection

**Objective:** Test Customer Journey Agent properly detects intent

**Test Keywords:**

✅ Should delegate:
- "recebi cotação"
- "recebi preços"
- "fornecedor mandou"
- "atualizar preços"
- "preços novos"
- "Friboi mandou picanha R$ 47"

❌ Should NOT delegate:
- "quero comprar picanha" (normal search)
- "quanto custa picanha?" (price inquiry)
- "ver catálogo" (browsing)
- "menu" (menu request)

**Test each keyword:**

```
User: "recebi cotação"
Expected: Routes to Sub-Agent

User: "quero comprar picanha"
Expected: Normal flow (search_products_vector)
```

---

## 🐛 DEBUGGING

### Enable Verbose Logging

1. **In n8n:** Click each node → View execution data
2. **In browser console:** Check `console.log` outputs
3. **In Supabase:** Check table `line_sessions` for session logs

### Common Issues

#### Issue 1: Agent Not Receiving Input

**Symptom:** Sub-Agent doesn't execute

**Debug:**
1. Click "Prepare Price Updater Input" node
2. Check output has all required fields:
   - `message`
   - `restaurant_id`
   - `phone_number`
   - `supplier_name`

**Fix:** Verify Customer Journey Agent returns proper delegation JSON

#### Issue 2: Tools Not Found

**Symptom:** Agent says "I don't have access to that tool"

**Debug:**
1. Check tool nodes have "Use as Tool" enabled
2. Verify ai_tool connections exist
3. Check tool names match exactly

**Fix:** Re-connect tools to agent with ai_tool connection type

#### Issue 3: Database Errors

**Symptom:** "function match_suppliers_by_name does not exist"

**Debug:**
```sql
SELECT routine_name FROM information_schema.routines WHERE routine_name LIKE 'match_%';
```

**Fix:** Execute `supabase_rpc_functions.sql`

#### Issue 4: Empty Results

**Symptom:** Tools return no matches

**Debug:**
```sql
-- Check if embeddings exist
SELECT COUNT(*) FROM suppliers WHERE name_embedding IS NOT NULL;
SELECT COUNT(*) FROM supplier_mapped_products WHERE embedding IS NOT NULL;
SELECT COUNT(*) FROM master_list WHERE embedding IS NOT NULL;
```

**Fix:** Generate embeddings for existing data (separate workflow needed)

---

## ✅ SUCCESS CRITERIA

All tests pass when:

- [ ] Test 1: Simple update completes successfully
- [ ] Test 2: Manual matching flow works end-to-end
- [ ] Test 3: Supplier not found handled gracefully
- [ ] Test 4: Mixed results all processed correctly
- [ ] Test 5: All keywords detected properly
- [ ] Database updated correctly after each test
- [ ] No errors in execution logs
- [ ] User receives clear messages at each step
- [ ] Session tracking works (check `line_sessions` table)
- [ ] Relationship tracking works (check `restaurant_supplier_relationships`)

---

## 📊 MONITORING

### Key Metrics to Track

1. **Success Rate:**
   ```sql
   -- Count successful updates in last 24h
   SELECT COUNT(*)
   FROM restaurant_supplier_relationships
   WHERE last_interaction_date >= NOW() - INTERVAL '24 hours';
   ```

2. **Match Accuracy:**
   ```sql
   -- Products with vs without master_list_id
   SELECT
     COUNT(*) FILTER (WHERE master_list_product_id IS NOT NULL) as with_master_list,
     COUNT(*) FILTER (WHERE master_list_product_id IS NULL) as without_master_list
   FROM supplier_mapped_products;
   ```

3. **Price Changes:**
   ```sql
   -- Recent price updates (if price_history table exists)
   SELECT
     product_name,
     old_price,
     new_price,
     price_change_percent,
     change_date
   FROM price_history
   ORDER BY change_date DESC
   LIMIT 20;
   ```

---

## 🎯 NEXT STEPS AFTER TESTING

Once all tests pass:

1. **Production Deployment:**
   - Backup production workflow
   - Import updated workflow
   - Monitor first 10-20 real interactions

2. **User Training:**
   - Share example messages with users
   - Explain confirmation flow
   - Provide support contact

3. **Optimization:**
   - Adjust similarity thresholds based on real data
   - Add more detection keywords if needed
   - Fine-tune agent prompts

4. **Monitoring:**
   - Set up alerts for errors
   - Track success metrics daily
   - Collect user feedback

---

## 📚 DOCUMENTATION REFERENCE

- **Implementation Summary:** `SUPPLIER_PRICE_UPDATER_IMPLEMENTATION_SUMMARY.md`
- **Setup Guide:** `agents/SUPPLIER_PRICE_UPDATER_AGENT_Setup_Guide.md`
- **Integration Guide:** `agents/INTEGRATION_GUIDE.md`
- **Database Guide:** `database/README_database_setup.md`

---

**Created by:** Claude Code
**Status:** Ready for Testing
**Estimated Testing Time:** 1-2 hours
