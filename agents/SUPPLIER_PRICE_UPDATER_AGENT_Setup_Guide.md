# 🤖 Supplier Price Updater Agent - Setup Guide

**Version:** 1.0
**Date:** 2025-01-19
**Phase:** 2 - Agent Creation

---

## 📋 PREREQUISITES

Before setting up the agent, ensure:

- ✅ Phase 0 complete: `restaurant_supplier_relationships` table created in Supabase
- ✅ Phase 1 complete: All 4 tools created and tested
- ✅ OpenAI API credentials configured in n8n
- ✅ Supabase credentials configured in n8n
- ✅ Customer Journey Agent exists in workflow

---

## 🏗️ ARCHITECTURE

```
Customer Journey Agent
        ↓
        │ (detects price update intent)
        │
        ▼
Supplier Price Updater Agent (Sub-agent)
        │
        ├─→ match_with_existing_supplier_mapped (Tool)
        ├─→ update_prices (Tool)
        ├─→ proposal_to_match_master_list (Tool)
        └─→ confirm_master_list_matches (Tool)
        │
        ↓ (when done)
        │
Customer Journey Agent
```

---

## 🛠️ STEP 1: Create the Agent Node

### 1.1: Add AI Agent Node

In n8n workflow editor:

1. **Add new node**: Click "+" → Search "AI Agent"
2. **Node name**: `Supplier Price Updater Agent`
3. **Position**: Below Customer Journey Agent

### 1.2: Configure Agent Settings

**Basic Settings:**
- **Agent Type**: Conversational Agent
- **Model**: OpenAI Chat Model
  - Model: `gpt-4o` or `gpt-4o-mini` (for cost efficiency)
  - Temperature: `0.3` (more deterministic for price handling)
  - Max Tokens: `2000`

**System Message:**
- Copy the entire content from `supplier_price_updater_agent_system_message.md`
- Paste into "System Message" field
- This is the agent's instructions and personality

**Memory:**
- **Type**: Buffer Memory
- **Session ID**: `{{ $json.phone_number }}_price_updater`
- **Max Messages**: `20` (keep last 10 exchanges)

---

## 🔧 STEP 2: Create and Connect Tools

### 2.1: Create Tool: match_with_existing_supplier_mapped

1. **Add Code node** near the agent
2. **Node name**: `match_with_existing_supplier_mapped`
3. **Mode**: Run Once for All Items
4. **Language**: JavaScript
5. **Code**: Copy content from `tools/match_with_existing_supplier_mapped_COMPLETE.js`

**Tool Configuration:**
- Enable "Use as Tool" in node settings
- **Tool Name**: `match_with_existing_supplier_mapped`
- **Tool Description**:
  ```
  Match reported product prices with existing supplier catalog using vector search.
  Returns products grouped by: (1) ready to update (has master_list_id),
  (2) needs manual match (no master_list_id), (3) new products (not found).

  Inputs:
  - product_list: Array of {product_name: string, price: number, unit: string}
  - supplier_name: string
  - restaurant_id: number
  - phone_number: string
  ```

**Connect to Agent:**
- Connect tool → agent with `ai_tool` connection type

### 2.2: Create Tool: update_prices

1. **Add Code node**
2. **Node name**: `update_prices`
3. **Code**: Copy from `tools/update_prices_COMPLETE.js`

**Tool Configuration:**
- **Tool Name**: `update_prices`
- **Tool Description**:
  ```
  Update prices in supplier_mapped_products for confirmed matches.
  Logs price changes and updates restaurant-supplier relationship statistics.

  Inputs:
  - products_to_update: Array of {supplier_mapped_product_id, new_price, unit, product_name}
  - restaurant_id: number
  - supplier_id: number
  ```

**Connect to Agent:** ai_tool connection

### 2.3: Create Tool: proposal_to_match_master_list

1. **Add Code node**
2. **Node name**: `proposal_to_match_master_list`
3. **Code**: Copy from `tools/proposal_to_match_master_list_COMPLETE.js`

**Tool Configuration:**
- **Tool Name**: `proposal_to_match_master_list`
- **Tool Description**:
  ```
  Generate match proposals for products that don't have master_list_id.
  Returns top 3-5 suggestions from master_list with similarity scores.

  Inputs:
  - products_to_match: Array of {product_name, supplier_mapped_product_id, reported_price, unit}
  - top_n: number (optional, default: 3)
  ```

**Connect to Agent:** ai_tool connection

### 2.4: Create Tool: confirm_master_list_matches

1. **Add Code node**
2. **Node name**: `confirm_master_list_matches`
3. **Code**: Copy from `tools/confirm_master_list_matches_COMPLETE.js`

**Tool Configuration:**
- **Tool Name**: `confirm_master_list_matches`
- **Tool Description**:
  ```
  Process user confirmations and link supplier products to master_list.
  Accepts format like "1→1, 2→2, 3→none" or "confirmar tudo".

  Inputs:
  - confirmation_string: string (user's response)
  - proposals: array (from proposal_to_match_master_list output)
  ```

**Connect to Agent:** ai_tool connection

---

## 🔗 STEP 3: Connect Agent to Workflow

### 3.1: Modify Customer Journey Agent

Update Customer Journey Agent's system message to include delegation logic:

**Add to Customer Journey Agent system message:**

```markdown
## DELEGATION: Price Updates

When user wants to report prices from suppliers (keywords: "recebi cotação", "preços novos", "atualizar preços"), delegate to Supplier Price Updater Agent.

**Detection keywords:**
- "recebi cotação"
- "recebi preços"
- "fornecedor mandou"
- "atualizar preços"
- "preços novos"
- Product names + prices (e.g., "picanha R$ 47")

**How to delegate:**
1. Detect price update intent
2. Pass control: Say "Vou processar a cotação. Um momento..."
3. Return: $json with {
     action: "delegate_to_price_updater",
     message: [user's message about prices],
     restaurant_id: [from context],
     phone_number: [from context],
     person_name: [from context]
   }

**When control returns:**
- Supplier Price Updater Agent will handle the complete flow
- Await its completion message
- Resume normal conversation
```

### 3.2: Create Router for Delegation

**Option A: IF Node Router**

1. Add **IF node** after Customer Journey Agent
2. **Node name**: `Route: Price Update or Continue`
3. **Condition**:
   ```javascript
   {{ $json.action }} === "delegate_to_price_updater"
   ```
4. **TRUE branch** → Connect to Supplier Price Updater Agent
5. **FALSE branch** → Continue normal flow (e.g., WhatsApp Send)

**Option B: Switch Node Router**

1. Add **Switch node** after Customer Journey Agent
2. **Node name**: `Action Router`
3. **Routes**:
   - Route 0: `{{ $json.action === "delegate_to_price_updater" }}`
   - Route 1: `{{ $json.action === "search_products" }}`
   - Route 2: `{{ $json.action === "build_cart" }}`
   - Default: Normal response

### 3.3: Connect Supplier Price Updater Agent Output

After Supplier Price Updater Agent completes:

1. **Merge with main flow** using Merge node
2. **OR** Connect directly to WhatsApp Send node
3. Agent output already contains the message_to_user

---

## 📥 STEP 4: Input/Output Mapping

### 4.1: Input to Supplier Price Updater Agent

The agent expects these fields in `$json`:

```javascript
{
  "message": "User's message about prices",
  "restaurant_id": 123,
  "restaurant_person_id": 45,
  "phone_number": "+5511999999999",
  "person_name": "João Silva",
  "company_name": "Pizzaria Bella",
  "supplier_name": "Friboi" // Optional, agent will ask if missing
}
```

**Mapping Code Node (if needed):**

```javascript
const input = $input.all();

return input.map(item => ({
  json: {
    message: item.json.message || item.json.body || "",
    restaurant_id: item.json.restaurant_id,
    restaurant_person_id: item.json.restaurant_person_id,
    phone_number: item.json.phone_number,
    person_name: item.json.person_name,
    company_name: item.json.company_name
  }
}));
```

### 4.2: Output from Supplier Price Updater Agent

Agent returns:

```javascript
{
  "output": "Complete message to send to user",
  "metadata": {
    "supplier_id": 5,
    "products_updated": 3,
    "products_matched": 2,
    "completed": true
  }
}
```

**Extract for WhatsApp Send:**

```javascript
{{ $json.output }}
```

---

## 🧪 STEP 5: Testing

### Test Scenario 1: Simple Price Update

**Test Input:**
```
User: "Recebi cotação da Friboi: picanha R$ 47/kg"
```

**Expected Flow:**
1. Customer Journey Agent detects price update intent
2. Routes to Supplier Price Updater Agent
3. Agent calls `match_with_existing_supplier_mapped`
4. Agent calls `update_prices`
5. Agent returns completion message
6. Message sent to user

**Expected Output:**
```
✅ Cotação de Friboi processada!

📊 1 preço atualizado:
• Picanha: R$ 47.00/kg (+R$ 2.00, +4.4%)

✅ Atualização concluída! Posso ajudar com algo mais?
```

### Test Scenario 2: With Manual Matching

**Test Input:**
```
User: "Recebi da Friboi: picanha R$ 47, tempero especial R$ 15"
```

**Expected Flow:**
1. Routes to Supplier Price Updater Agent
2. Agent calls `match_with_existing_supplier_mapped`
3. Agent calls `update_prices` (for picanha)
4. Agent calls `proposal_to_match_master_list` (for tempero)
5. Agent asks user for confirmation
6. User responds: "1→1"
7. Agent calls `confirm_master_list_matches`
8. Agent calls `update_prices` again
9. Returns completion

### Test Scenario 3: Supplier Not Found

**Test Input:**
```
User: "Recebi cotação: picanha R$ 47"
```

**Expected:**
- Agent asks: "De qual fornecedor você recebeu essa cotação?"
- User responds: "Carnes ABC"
- Agent checks, supplier not found
- Agent asks: "O fornecedor 'Carnes ABC' não está cadastrado. Deseja cadastrá-lo?"

---

## 🐛 DEBUGGING

### Enable Verbose Logging

In each tool, logs are already configured:
```javascript
console.log('[tool_name] Step description:', data);
```

View logs in n8n:
1. Execute workflow
2. Click on each node
3. View "Input" and "Output" tabs
4. Check browser console for console.log output

### Common Issues

#### Issue 1: Tool Not Found
**Symptom:** Agent says "I don't have access to that tool"
**Fix:**
- Verify tool has "Use as Tool" enabled
- Check ai_tool connection exists
- Verify tool name matches exactly

#### Issue 2: Missing restaurant_id
**Symptom:** Tools fail with "restaurant_id required"
**Fix:**
- Check input mapping includes restaurant_id from context
- Verify Registration Agent passed user info correctly

#### Issue 3: Supabase RPC Not Found
**Symptom:** "function match_suppliers_by_name does not exist"
**Fix:**
- Create missing RPC functions in Supabase
- See `database/supabase_rpc_functions.sql` (create this file)

#### Issue 4: Embedding API Fails
**Symptom:** "OpenAI API error"
**Fix:**
- Verify OpenAI API key in environment variables
- Check API quota/billing
- Verify `process.env.OPENAI_API_KEY` is accessible

---

## 📊 STEP 6: Monitor Performance

### Key Metrics to Track

1. **Success Rate:**
   - % of price updates completed successfully
   - Track via `updated_count` in tool outputs

2. **Match Accuracy:**
   - % of products matched automatically (with master_list_id)
   - % requiring manual confirmation
   - Track via match_with_existing_supplier_mapped output

3. **User Experience:**
   - Average number of messages to complete update
   - Manual confirmation success rate

4. **Database Impact:**
   - Price changes logged
   - Restaurant-supplier relationships created/updated

### Logging Strategy

Create a `price_update_logs` table (optional):

```sql
CREATE TABLE price_update_logs (
  id BIGSERIAL PRIMARY KEY,
  restaurant_id INTEGER REFERENCES restaurants(id),
  supplier_id INTEGER,
  products_updated INTEGER,
  products_matched_auto INTEGER,
  products_matched_manual INTEGER,
  products_new INTEGER,
  session_date TIMESTAMPTZ DEFAULT NOW(),
  completion_status VARCHAR(50) -- 'completed', 'partial', 'failed'
);
```

---

## ✅ COMPLETION CHECKLIST

Phase 2 is complete when:

- [ ] Supplier Price Updater Agent node created
- [ ] System message configured correctly
- [ ] All 4 tools connected with ai_tool connections
- [ ] Memory configured (buffer, session_id)
- [ ] Customer Journey Agent updated with delegation logic
- [ ] Router created to delegate to sub-agent
- [ ] Input mapping passes required context fields
- [ ] Output extracted and sent to user
- [ ] Test Scenario 1 passes (simple update)
- [ ] Test Scenario 2 passes (with manual matching)
- [ ] Test Scenario 3 passes (supplier not found)
- [ ] Logs show correct tool execution order
- [ ] No errors in execution

---

## 🎯 NEXT STEPS

After Phase 2 completion:

→ **Phase 3**: Full integration testing with Customer Journey Agent
→ **Phase 4**: End-to-end testing with real WhatsApp messages
→ **Phase 5**: Monitor and optimize based on user feedback

---

## 📚 RELATED FILES

- `supplier_price_updater_agent_system_message.md` - Agent instructions
- `tools/match_with_existing_supplier_mapped_COMPLETE.js` - Tool 1
- `tools/update_prices_COMPLETE.js` - Tool 2
- `tools/proposal_to_match_master_list_COMPLETE.js` - Tool 3
- `tools/confirm_master_list_matches_COMPLETE.js` - Tool 4
- `database/restaurant_supplier_relationships_schema.sql` - DB schema
- `SUPPLIER_PRICE_UPDATER_Implementation_Plan.md` - Master plan

---

**Created by:** Claude Code
**Status:** Ready for Implementation
**Estimated Setup Time:** 45-60 minutes
