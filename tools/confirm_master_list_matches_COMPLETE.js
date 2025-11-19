// ===================================================================
// TOOL: confirm_master_list_matches
// ===================================================================
// Purpose: Process user confirmations and link supplier products to master list
// Part of: Supplier Price Updater Agent (Sub-agent)
// Phase: 1
// ===================================================================

/*
INPUTS:
- confirmations: Array of {
    supplier_mapped_product_id: number,
    master_list_product_id: number | null,
    product_name: string (for messages)
  }
  OR
- confirmation_string: String like "1→1, 2→2, 3→none"
- proposals: Array (from previous proposal_to_match_master_list output)

OUTPUTS:
{
  success: boolean,
  confirmed_count: number,
  skipped_count: number,
  failed_count: number,
  confirmations: [
    {
      supplier_mapped_product_id: 124,
      product_name: "Arroz Tipo 1",
      master_list_product_id: 45,
      linked: true
    }
  ],
  skipped: [
    {
      supplier_mapped_product_id: 125,
      product_name: "Produto X",
      reason: "User skipped"
    }
  ],
  failed: [
    {
      supplier_mapped_product_id: 126,
      product_name: "Produto Y",
      error: "Database error"
    }
  ],
  message_to_user: string
}
*/

// ===================================================================
// STEP 1: Parse and validate inputs
// ===================================================================

let confirmations = $input.item.json.confirmations;
const confirmationString = $input.item.json.confirmation_string;
const proposals = $input.item.json.proposals;

console.log('[confirm_master_list_matches] Inputs:', {
  hasConfirmations: !!confirmations,
  hasConfirmationString: !!confirmationString,
  hasProposals: !!proposals,
  confirmationsCount: confirmations?.length
});

// ===================================================================
// STEP 1.1: Parse confirmation_string if provided
// ===================================================================

if (confirmationString && proposals) {
  console.log('[confirm_master_list_matches] Parsing confirmation string:', confirmationString);

  confirmations = [];

  // Handle special cases
  const lowerString = confirmationString.toLowerCase().trim();

  if (lowerString === 'confirmar tudo' || lowerString === 'confirmar todos' || lowerString === 'aceitar tudo') {
    // Auto-confirm all high-confidence matches
    console.log('  → Auto-confirming all high-confidence matches');

    proposals.forEach(proposal => {
      if (proposal.has_high_confidence_match && proposal.suggestions.length > 0) {
        confirmations.push({
          supplier_mapped_product_id: proposal.reported_product.supplier_mapped_product_id,
          master_list_product_id: proposal.suggestions[0].master_list_product_id,
          product_name: proposal.reported_product.product_name
        });
      }
    });
  } else {
    // Parse format: "1→1, 2→2, 3→none"
    const parts = confirmationString.split(',').map(s => s.trim());

    parts.forEach(part => {
      // Match patterns like "1→1", "1->1", "1:1", "1=1"
      const match = part.match(/(\d+)\s*[→\->=:]\s*(\d+|none|nenhum|skip|pular)/i);

      if (match) {
        const productIndex = parseInt(match[1]) - 1; // Convert to 0-based index
        const suggestionChoice = match[2].toLowerCase();

        if (productIndex >= 0 && productIndex < proposals.length) {
          const proposal = proposals[productIndex];

          if (['none', 'nenhum', 'skip', 'pular'].includes(suggestionChoice)) {
            // User skipped this product
            console.log(`  → Product ${productIndex + 1}: Skipped`);
            confirmations.push({
              supplier_mapped_product_id: proposal.reported_product.supplier_mapped_product_id,
              master_list_product_id: null,
              product_name: proposal.reported_product.product_name,
              skipped: true
            });
          } else {
            const suggestionIndex = parseInt(suggestionChoice) - 1;

            if (suggestionIndex >= 0 && suggestionIndex < proposal.suggestions.length) {
              const selectedSuggestion = proposal.suggestions[suggestionIndex];

              console.log(`  → Product ${productIndex + 1}: Matched to suggestion ${suggestionIndex + 1}`);

              confirmations.push({
                supplier_mapped_product_id: proposal.reported_product.supplier_mapped_product_id,
                master_list_product_id: selectedSuggestion.master_list_product_id,
                product_name: proposal.reported_product.product_name
              });
            } else {
              console.error(`  ❌ Invalid suggestion index: ${suggestionIndex + 1}`);
            }
          }
        } else {
          console.error(`  ❌ Invalid product index: ${productIndex + 1}`);
        }
      }
    });
  }

  console.log(`[confirm_master_list_matches] Parsed ${confirmations.length} confirmations`);
}

// Validate we have confirmations
if (!confirmations || !Array.isArray(confirmations) || confirmations.length === 0) {
  return [{
    json: {
      error: true,
      message: "Não consegui entender as confirmações. Por favor, use o formato: '1→1, 2→2, 3→none' ou 'confirmar tudo'"
    }
  }];
}

// ===================================================================
// STEP 2: Process each confirmation
// ===================================================================

const successfulConfirmations = [];
const skippedConfirmations = [];
const failedConfirmations = [];

for (const confirmation of confirmations) {
  const supplierMappedProductId = confirmation.supplier_mapped_product_id;
  const masterListProductId = confirmation.master_list_product_id;
  const productName = confirmation.product_name || 'Produto';

  console.log(`[confirm_master_list_matches] Processing: ${productName} (${supplierMappedProductId})`);

  // -------------------------------------------------------------------
  // STEP 2.1: Handle skipped products
  // -------------------------------------------------------------------

  if (confirmation.skipped || masterListProductId === null) {
    console.log(`  ⏭️  Skipped by user`);

    skippedConfirmations.push({
      supplier_mapped_product_id: supplierMappedProductId,
      product_name: productName,
      reason: 'User skipped'
    });
    continue;
  }

  // -------------------------------------------------------------------
  // STEP 2.2: Verify master_list_product exists
  // -------------------------------------------------------------------

  const { data: masterProduct, error: masterFetchError } = await $supabase
    .from('master_list')
    .select('id, product_name, category, unit')
    .eq('id', masterListProductId)
    .maybeSingle();

  if (masterFetchError || !masterProduct) {
    console.error(`  ❌ Master list product ${masterListProductId} not found`);

    failedConfirmations.push({
      supplier_mapped_product_id: supplierMappedProductId,
      product_name: productName,
      error: 'Master list product not found'
    });
    continue;
  }

  // -------------------------------------------------------------------
  // STEP 2.3: Update supplier_mapped_products with master_list_product_id
  // -------------------------------------------------------------------

  const { error: updateError } = await $supabase
    .from('supplier_mapped_products')
    .update({
      master_list_product_id: masterListProductId,
      updated_at: new Date().toISOString()
    })
    .eq('id', supplierMappedProductId);

  if (updateError) {
    console.error(`  ❌ Error updating supplier_mapped_product:`, updateError.message);

    failedConfirmations.push({
      supplier_mapped_product_id: supplierMappedProductId,
      product_name: productName,
      error: updateError.message
    });
    continue;
  }

  // -------------------------------------------------------------------
  // STEP 2.4: Success
  // -------------------------------------------------------------------

  console.log(`  ✅ Linked to master list: ${masterProduct.product_name}`);

  successfulConfirmations.push({
    supplier_mapped_product_id: supplierMappedProductId,
    product_name: productName,
    master_list_product_id: masterListProductId,
    master_list_product_name: masterProduct.product_name,
    linked: true
  });
}

// ===================================================================
// STEP 3: Generate summary message
// ===================================================================

let messageToUser = '';

if (successfulConfirmations.length > 0) {
  messageToUser += `✅ **${successfulConfirmations.length} produto(s) vinculado(s) com sucesso!**\n\n`;
  messageToUser += '📝 **Vínculos criados:**\n';

  successfulConfirmations.forEach(c => {
    messageToUser += `  • ${c.product_name} → ${c.master_list_product_name}\n`;
  });

  messageToUser += '\n';
}

if (skippedConfirmations.length > 0) {
  messageToUser += `⏭️  **${skippedConfirmations.length} produto(s) pulado(s)**\n`;
  messageToUser += 'Estes produtos não foram vinculados ao catálogo mestre.\n\n';
}

if (failedConfirmations.length > 0) {
  messageToUser += `❌ **${failedConfirmations.length} erro(s):**\n`;
  failedConfirmations.forEach(f => {
    messageToUser += `  • ${f.product_name}: ${f.error}\n`;
  });
  messageToUser += '\n';
}

// Add next steps
if (successfulConfirmations.length > 0) {
  messageToUser += `\n🎉 **Próximo passo:** Agora esses produtos estão vinculados e você pode atualizar os preços!\n`;
  messageToUser += `Use o comando "atualizar preços" para aplicar as mudanças.`;
}

// ===================================================================
// STEP 4: Return results
// ===================================================================

const success = successfulConfirmations.length > 0 && failedConfirmations.length === 0;

console.log('[confirm_master_list_matches] Summary:', {
  success,
  confirmed: successfulConfirmations.length,
  skipped: skippedConfirmations.length,
  failed: failedConfirmations.length
});

return [{
  json: {
    success: success,
    confirmed_count: successfulConfirmations.length,
    skipped_count: skippedConfirmations.length,
    failed_count: failedConfirmations.length,
    confirmations: successfulConfirmations,
    skipped: skippedConfirmations,
    failed: failedConfirmations,
    message_to_user: messageToUser,
    summary: {
      total_processed: confirmations.length,
      successful: successfulConfirmations.length,
      skipped: skippedConfirmations.length,
      failed: failedConfirmations.length
    }
  }
}];
