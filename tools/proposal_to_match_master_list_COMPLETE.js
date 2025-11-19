// ===================================================================
// TOOL: proposal_to_match_master_list
// ===================================================================
// Purpose: Generate matching proposals for products without master_list_id
// Part of: Supplier Price Updater Agent (Sub-agent)
// Phase: 1
// ===================================================================

/*
INPUTS:
- products_to_match: Array of {
    product_name: string,
    supplier_mapped_product_id: number,
    reported_price: number,
    unit: string
  }
- top_n: number (default: 3, max: 5)

OUTPUTS:
{
  success: boolean,
  proposals: [
    {
      reported_product: {
        product_name: "Arroz Tipo 1",
        supplier_mapped_product_id: 124,
        reported_price: 28.00,
        unit: "saco"
      },
      suggestions: [
        {
          master_list_product_id: 45,
          product_name: "Arroz Branco Tipo 1",
          category: "Grãos",
          similarity: 0.92,
          rank: 1
        },
        {
          master_list_product_id: 46,
          product_name: "Arroz Tipo 2",
          category: "Grãos",
          similarity: 0.85,
          rank: 2
        }
      ],
      has_high_confidence_match: boolean
    }
  ],
  message_to_user: string
}
*/

// ===================================================================
// STEP 1: Validate inputs
// ===================================================================

const productsToMatch = $input.item.json.products_to_match;
const topN = $input.item.json.top_n || 3;

console.log('[proposal_to_match_master_list] Inputs:', {
  productsCount: productsToMatch?.length,
  topN
});

// Validate inputs
if (!productsToMatch || !Array.isArray(productsToMatch) || productsToMatch.length === 0) {
  return [{
    json: {
      error: true,
      message: "products_to_match deve ser um array com pelo menos um produto"
    }
  }];
}

// Limit topN to reasonable range
const actualTopN = Math.min(Math.max(topN, 1), 5);

// ===================================================================
// STEP 2: Generate proposals for each product
// ===================================================================

const proposals = [];

for (const product of productsToMatch) {
  const productName = product.product_name;
  const supplierMappedProductId = product.supplier_mapped_product_id;
  const reportedPrice = parseFloat(product.reported_price);
  const unit = product.unit || 'unidade';

  console.log(`[proposal_to_match_master_list] Finding matches for: ${productName}`);

  // -------------------------------------------------------------------
  // STEP 2.1: Generate embedding for product name
  // -------------------------------------------------------------------

  const embeddingResponse = await $http.request({
    method: 'POST',
    url: 'https://api.openai.com/v1/embeddings',
    headers: {
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: {
      model: 'text-embedding-3-small',
      input: productName
    }
  });

  const productEmbedding = embeddingResponse.data[0].embedding;

  // -------------------------------------------------------------------
  // STEP 2.2: Vector search in master_list
  // -------------------------------------------------------------------

  const { data: masterListMatches, error: searchError } = await $supabase
    .rpc('match_master_list_products', {
      query_embedding: productEmbedding,
      match_threshold: 0.65, // Lower threshold for proposals
      match_count: actualTopN
    });

  if (searchError) {
    console.error(`  ❌ Error searching master list for "${productName}":`, searchError);
    proposals.push({
      reported_product: {
        product_name: productName,
        supplier_mapped_product_id: supplierMappedProductId,
        reported_price: reportedPrice,
        unit: unit
      },
      suggestions: [],
      has_high_confidence_match: false,
      error: searchError.message
    });
    continue;
  }

  // -------------------------------------------------------------------
  // STEP 2.3: Format suggestions
  // -------------------------------------------------------------------

  const suggestions = [];

  if (masterListMatches && masterListMatches.length > 0) {
    masterListMatches.forEach((match, index) => {
      suggestions.push({
        master_list_product_id: match.id,
        product_name: match.product_name,
        category: match.category || 'Sem categoria',
        unit: match.unit || unit,
        similarity: match.similarity,
        rank: index + 1
      });
    });

    console.log(`  ✅ Found ${suggestions.length} suggestions (best: ${suggestions[0].similarity.toFixed(2)})`);
  } else {
    console.log(`  ⚠️  No suggestions found above threshold`);
  }

  // -------------------------------------------------------------------
  // STEP 2.4: Determine if high confidence match exists
  // -------------------------------------------------------------------

  const hasHighConfidenceMatch = suggestions.length > 0 && suggestions[0].similarity >= 0.85;

  proposals.push({
    reported_product: {
      product_name: productName,
      supplier_mapped_product_id: supplierMappedProductId,
      reported_price: reportedPrice,
      unit: unit
    },
    suggestions: suggestions,
    has_high_confidence_match: hasHighConfidenceMatch
  });
}

// ===================================================================
// STEP 3: Generate user-friendly message
// ===================================================================

let messageToUser = `🔍 **Sugestões de correspondência**\n\n`;
messageToUser += `Encontrei ${proposals.length} produto(s) que precisam de confirmação:\n\n`;

proposals.forEach((proposal, index) => {
  const product = proposal.reported_product;
  messageToUser += `**${index + 1}. ${product.product_name}** (R$ ${product.reported_price.toFixed(2)}/${product.unit})\n`;

  if (proposal.suggestions.length === 0) {
    messageToUser += `   ⚠️  Nenhuma correspondência encontrada no catálogo\n`;
    messageToUser += `   💡 Sugestão: Este pode ser um produto novo que precisa ser cadastrado\n\n`;
  } else {
    messageToUser += `   Sugestões de correspondência:\n`;

    proposal.suggestions.forEach(suggestion => {
      const confidence = suggestion.similarity >= 0.85 ? '🟢' : suggestion.similarity >= 0.75 ? '🟡' : '🔴';
      const percent = Math.round(suggestion.similarity * 100);

      messageToUser += `   ${suggestion.rank}. ${confidence} **${suggestion.product_name}** (${suggestion.category}) - ${percent}% similar\n`;
    });

    if (proposal.has_high_confidence_match) {
      messageToUser += `   ✅ Recomendação: Opção 1 tem alta confiança\n`;
    } else {
      messageToUser += `   ⚠️  Confiança baixa - verifique cuidadosamente\n`;
    }

    messageToUser += '\n';
  }
});

messageToUser += `\n📝 **Próximo passo:** Por favor, confirme qual opção corresponde a cada produto.\n`;
messageToUser += `Exemplo: "1→1, 2→2, 3→nenhum"\n\n`;
messageToUser += `Ou responda "confirmar tudo" para aceitar todas as recomendações de alta confiança.`;

// ===================================================================
// STEP 4: Prepare structured proposals for agent
// ===================================================================

// Create a simplified format for the agent to parse
const proposalSummary = proposals.map(p => {
  return {
    product_name: p.reported_product.product_name,
    supplier_mapped_product_id: p.reported_product.supplier_mapped_product_id,
    best_match: p.suggestions.length > 0 ? {
      master_list_product_id: p.suggestions[0].master_list_product_id,
      product_name: p.suggestions[0].product_name,
      similarity: p.suggestions[0].similarity,
      auto_confirm_recommended: p.has_high_confidence_match
    } : null,
    all_suggestions: p.suggestions
  };
});

// ===================================================================
// STEP 5: Return results
// ===================================================================

console.log('[proposal_to_match_master_list] Summary:', {
  total_products: proposals.length,
  with_suggestions: proposals.filter(p => p.suggestions.length > 0).length,
  high_confidence: proposals.filter(p => p.has_high_confidence_match).length,
  no_match: proposals.filter(p => p.suggestions.length === 0).length
});

return [{
  json: {
    success: true,
    proposals: proposals,
    proposal_summary: proposalSummary,
    message_to_user: messageToUser,
    statistics: {
      total_products: proposals.length,
      with_suggestions: proposals.filter(p => p.suggestions.length > 0).length,
      high_confidence_matches: proposals.filter(p => p.has_high_confidence_match).length,
      no_matches: proposals.filter(p => p.suggestions.length === 0).length,
      can_auto_confirm_all: proposals.every(p => p.has_high_confidence_match)
    }
  }
}];
