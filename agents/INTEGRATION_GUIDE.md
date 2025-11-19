# 🔗 Integration Guide - Supplier Price Updater Agent

**Phase 3: Integrating Sub-agent into Main Workflow**

---

## 📋 OVERVIEW

This guide shows how to integrate the Supplier Price Updater Agent into the existing Customer Journey Agent workflow, enabling seamless delegation for price update tasks.

---

## 🎯 INTEGRATION GOALS

1. Customer Journey Agent detects price update intent
2. Delegates to Supplier Price Updater Agent
3. Sub-agent handles complete price update flow
4. Returns control to Customer Journey Agent
5. Seamless user experience (no context loss)

---

## 🔄 WORKFLOW FLOW

```
WhatsApp Trigger
    ↓
Extract Message Data
    ↓
Registration Agent
    ↓
Router: Customer or Supplier
    ↓
Customer Journey Agent
    ↓
    ├─→ (normal flow) → IF Node → WhatsApp Send
    │
    └─→ (price update detected) → IF Node → Supplier Price Updater Agent
                                                    ↓
                                             (when complete)
                                                    ↓
                                              WhatsApp Send
```

---

## 📝 STEP 1: Update Customer Journey Agent System Message

### 1.1: Add Delegation Instructions

Add this section to the Customer Journey Agent's system message (after the "YOUR TOOLS" section):

```markdown
## 🔀 DELEGATION TO SUB-AGENTS

You have access to specialized sub-agents for complex tasks. Delegate when appropriate.

### Supplier Price Updater Agent

**When to delegate:**
- User wants to report prices from a supplier
- User received a price quote/cotação
- User mentions updating prices

**Detection keywords:**
- "recebi cotação"
- "recebi preços"
- "preços novos"
- "fornecedor mandou"
- "atualizar preços"
- "[fornecedor] mandou [produto] [preço]"
- Conversational format: "picanha R$ 47"

**How to delegate:**

When you detect price update intent:

1. **Acknowledge:** "Vou processar a cotação. Um momento..."

2. **Return this JSON structure:**
   ```json
   {
     "action": "delegate_to_price_updater",
     "supplier_name": "extracted supplier name (or null if not mentioned)",
     "initial_message": "user's original message",
     "context": {
       "restaurant_id": {{ restaurant_id }},
       "restaurant_person_id": {{ restaurant_person_id }},
       "phone_number": "{{ phone_number }}",
       "person_name": "{{ person_name }}",
       "company_name": "{{ company_name }}"
     }
   }
   ```

3. **Wait:** The Supplier Price Updater Agent will handle everything

4. **Resume:** When control returns, continue normal conversation

**Examples of delegation triggers:**

User: "Recebi cotação da Friboi: picanha R$ 47/kg"
→ Delegate with supplier_name: "Friboi"

User: "Friboi mandou preços novos"
→ Delegate with supplier_name: "Friboi"

User: "Recebi cotação: picanha 47 reais"
→ Delegate with supplier_name: null (agent will ask)

User: "Quero atualizar preços do fornecedor"
→ Delegate with supplier_name: null

**Do NOT delegate for:**
- Searching products to buy
- Building shopping cart
- Placing orders
- Asking about supplier catalogs
- General questions about prices
```

### 1.2: Example Updated System Message Snippet

```markdown
You are the Customer Journey Agent for restaurant owners.

## YOUR TOOLS
[... existing tools ...]

## 🔀 DELEGATION TO SUB-AGENTS
[... add delegation section above ...]

## YOUR CONVERSATION FLOW
[... rest of existing instructions ...]
```

---

## 🔧 STEP 2: Create Delegation Router

### 2.1: Add IF Node After Customer Journey Agent

**Node Configuration:**

- **Node name:** `Check: Delegate to Price Updater?`
- **Node type:** IF
- **Condition:**
  ```javascript
  {{ $json.action === "delegate_to_price_updater" }}
  ```

**Outputs:**
- **TRUE branch:** Connect to "Prepare Price Updater Input"
- **FALSE branch:** Connect to existing flow (e.g., "WhatsApp Send")

---

## 🎨 STEP 3: Prepare Input for Sub-Agent

### 3.1: Add Code Node (Optional, for data transformation)

**Node name:** `Prepare Price Updater Input`

**Purpose:** Transform Customer Journey Agent output into Supplier Price Updater Agent input

**Code:**

```javascript
const input = $input.all();

return input.map(item => {
  const data = item.json;

  return {
    json: {
      // User's original message
      message: data.initial_message || data.message,

      // Supplier name (if extracted)
      supplier_name: data.supplier_name || null,

      // Context from Customer Journey Agent
      restaurant_id: data.context.restaurant_id,
      restaurant_person_id: data.context.restaurant_person_id,
      phone_number: data.context.phone_number,
      person_name: data.context.person_name,
      company_name: data.context.company_name,

      // Session info
      session_id: `${data.context.phone_number}_price_updater`,
      timestamp: new Date().toISOString()
    }
  };
});
```

**Connect:** TRUE branch of IF node → This Code node → Supplier Price Updater Agent

---

## 🤖 STEP 4: Connect Supplier Price Updater Agent

### 4.1: Agent Input

The agent receives data from "Prepare Price Updater Input":

```javascript
{
  "message": "Recebi cotação da Friboi: picanha R$ 47/kg",
  "supplier_name": "Friboi",
  "restaurant_id": 123,
  "restaurant_person_id": 45,
  "phone_number": "+5511999999999",
  "person_name": "João Silva",
  "company_name": "Pizzaria Bella",
  "session_id": "+5511999999999_price_updater"
}
```

### 4.2: Agent Output

After completion, agent returns:

```javascript
{
  "output": "✅ Cotação de Friboi processada!\n\n📊 2 preço(s) atualizado(s)...",
  "metadata": {
    "supplier_id": 5,
    "products_updated": 2,
    "completed": true
  }
}
```

---

## 📤 STEP 5: Extract Output for WhatsApp

### 5.1: Add Code Node to Extract Message

**Node name:** `Extract Price Updater Response`

**Purpose:** Get the message to send to user

**Code:**

```javascript
const items = $input.all();

return items.map(item => ({
  json: {
    // Message to send
    body: item.json.output || item.json.message_to_user,

    // Keep phone number for WhatsApp
    phone_number: item.json.phone_number,

    // Metadata (optional, for logging)
    metadata: item.json.metadata
  }
}));
```

---

## 📱 STEP 6: Connect to WhatsApp Send

### 6.1: Merge Both Flows

**Option A: Use Merge Node**

1. Add **Merge node** before WhatsApp Send
2. **Input 1:** Normal Customer Journey Agent output (FALSE branch)
3. **Input 2:** Extract Price Updater Response output (TRUE branch)
4. **Mode:** Merge by Position
5. Output → WhatsApp Send

**Option B: Direct Connection**

Connect both paths directly to WhatsApp Send:
- FALSE branch → WhatsApp Send
- Extract Price Updater Response → WhatsApp Send

WhatsApp Send should read: `{{ $json.body }}`

---

## 🔍 STEP 7: Testing Integration

### Test 1: Delegation Detection

**Input:**
```
User: "Recebi cotação da Friboi: picanha R$ 47"
```

**Expected:**
1. ✅ Customer Journey Agent outputs `action: "delegate_to_price_updater"`
2. ✅ IF node routes to TRUE branch
3. ✅ Supplier Price Updater Agent receives input
4. ✅ Agent processes and returns output
5. ✅ WhatsApp sends agent's response

### Test 2: Normal Flow (No Delegation)

**Input:**
```
User: "Quero comprar picanha"
```

**Expected:**
1. ✅ Customer Journey Agent outputs normal response
2. ✅ IF node routes to FALSE branch
3. ✅ WhatsApp sends Customer Journey Agent response

### Test 3: Multi-turn Price Update

**Input:**
```
User: "Recebi cotação: picanha R$ 47"
Agent: "De qual fornecedor?"
User: "Friboi"
Agent: [processes and completes]
```

**Expected:**
1. ✅ Memory maintained throughout conversation
2. ✅ Agent remembers context between messages
3. ✅ Completion returns control to Customer Journey Agent

---

## 🐛 DEBUGGING

### Issue 1: Delegation Not Detected

**Symptoms:**
- User says "recebi cotação" but Customer Journey Agent responds normally
- No delegation occurs

**Debug:**
1. Check Customer Journey Agent output: Look for `action` field
2. Verify delegation instructions are in system message
3. Check keywords match user input

**Fix:**
- Update system message with delegation section
- Add more detection keywords
- Test with exact phrases from examples

### Issue 2: Context Lost in Sub-Agent

**Symptoms:**
- Supplier Price Updater Agent errors with "restaurant_id required"
- Missing context fields

**Debug:**
1. Check "Prepare Price Updater Input" output
2. Verify all context fields present
3. Check Customer Journey Agent includes context in delegation

**Fix:**
- Update Customer Journey Agent to include all context fields
- Verify mapping in "Prepare Price Updater Input"

### Issue 3: Output Not Sent to WhatsApp

**Symptoms:**
- Agent completes but user receives no message

**Debug:**
1. Check "Extract Price Updater Response" output
2. Verify `body` field exists
3. Check WhatsApp Send node configuration

**Fix:**
- Ensure extraction maps `output` → `body`
- Verify WhatsApp Send reads `{{ $json.body }}`
- Check merge node configuration

---

## 📊 STEP 8: Monitor Integration

### Key Metrics

1. **Delegation Rate:**
   - How often price update intent is detected
   - Track via IF node TRUE/FALSE counts

2. **Completion Rate:**
   - % of delegated tasks completed successfully
   - Track via Supplier Price Updater Agent metadata

3. **Average Interaction Time:**
   - Time from delegation to completion
   - Monitor for performance optimization

4. **Error Rate:**
   - Failed delegations
   - Tool execution errors
   - Track via logs and error outputs

### Logging

Add logging Code node after Supplier Price Updater Agent:

```javascript
const items = $input.all();

items.forEach(item => {
  console.log('[INTEGRATION] Price update completed:', {
    phone_number: item.json.phone_number,
    supplier_id: item.json.metadata?.supplier_id,
    products_updated: item.json.metadata?.products_updated,
    completed: item.json.metadata?.completed,
    timestamp: new Date().toISOString()
  });
});

return items;
```

---

## ✅ INTEGRATION CHECKLIST

Phase 3 is complete when:

- [ ] Customer Journey Agent system message updated with delegation section
- [ ] IF node created after Customer Journey Agent
- [ ] IF condition: `action === "delegate_to_price_updater"`
- [ ] "Prepare Price Updater Input" Code node created
- [ ] Supplier Price Updater Agent connected to TRUE branch
- [ ] "Extract Price Updater Response" Code node created
- [ ] Both flows merge before WhatsApp Send
- [ ] WhatsApp Send configured to read `{{ $json.body }}`
- [ ] Test 1 passes (delegation detected)
- [ ] Test 2 passes (normal flow unaffected)
- [ ] Test 3 passes (multi-turn works)
- [ ] Logging configured for monitoring

---

## 🎉 SUCCESS CRITERIA

The integration is successful when:

1. ✅ User can report prices naturally ("recebi cotação da Friboi...")
2. ✅ Customer Journey Agent detects intent and delegates
3. ✅ Supplier Price Updater Agent handles complete flow
4. ✅ User receives confirmation messages at each step
5. ✅ Context is maintained (user doesn't repeat info)
6. ✅ Control returns to Customer Journey Agent after completion
7. ✅ User can continue with other tasks (search, order, etc.)
8. ✅ No errors in execution logs
9. ✅ Performance is acceptable (< 10 seconds per update)

---

## 🚀 DEPLOYMENT

After successful testing:

1. **Backup workflow JSON** before deploying
2. **Deploy to production n8n instance**
3. **Monitor first 10-20 real interactions**
4. **Collect user feedback**
5. **Iterate on detection keywords if needed**
6. **Optimize tool performance based on usage**

---

## 📚 RELATED FILES

- `SUPPLIER_PRICE_UPDATER_AGENT_Setup_Guide.md` - Agent setup
- `supplier_price_updater_agent_system_message.md` - Agent instructions
- `tools/match_with_existing_supplier_mapped_COMPLETE.js` - Tool 1
- `tools/update_prices_COMPLETE.js` - Tool 2
- `tools/proposal_to_match_master_list_COMPLETE.js` - Tool 3
- `tools/confirm_master_list_matches_COMPLETE.js` - Tool 4

---

**Created by:** Claude Code
**Status:** Ready for Implementation
**Estimated Integration Time:** 30-45 minutes
