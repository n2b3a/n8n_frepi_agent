// ===================================================================
// TOOL: get_user_preferences_from_master_list
// ===================================================================
// Propósito: Obtener preferencias del restaurante desde la DB
//            Filtrar por categorías relevantes a los productos solicitados
//            Incluir fornecedores preferidos
// Parte de: Purchase Order Creator Agent
// Fase: 1 - Paso 3 | Fase 2 - Paso 13
// ===================================================================

/*
INPUTS:
- restaurant_id: Number
- product_categories: Array de strings (opcional, para filtrar preferencias)

OUTPUTS:
{
  success: boolean,
  restaurant_id: number,
  preferences: {
    preferred_brands: ["Friboi", "Camil"],
    preferred_formats: ["kg", "saco"],
    order_frequency: "weekly",
    delivery_schedule: "morning",
    special_restrictions: "sem glúten",
    category_specific: {
      "Carnes": {
        preferred_brands: ["Friboi", "Swift"],
        max_price_per_kg: 50.00
      },
      "Grãos": {
        preferred_brands: ["Camil", "Tio João"],
        preferred_format: "saco"
      }
    }
  },
  preferred_suppliers: [
    {
      supplier_id: 3,
      supplier_name: "Friboi",
      category: "Carnes",
      relationship_type: "preferred",
      last_order_date: "2025-01-10"
    }
  ],
  has_preferences: boolean,
  message_to_user: string
}
*/

const input = $input.first().json;
const restaurantId = input.restaurant_id;
const productCategories = input.product_categories || null; // Opcional

console.log('[get_preferences] Inputs:', {
  restaurantId,
  productCategories
});

// ===================================================================
// VALIDACIONES
// ===================================================================

if (!restaurantId) {
  return JSON.stringify({
    error: true,
    message: "restaurant_id é obrigatório"
  });
}

// ===================================================================
// PASO 1: Obtener restaurant con category_preferences
// ===================================================================

console.log('[get_preferences] Buscando preferências do restaurante...');

const { data: restaurant, error: restaurantError } = await $supabase
  .from('restaurants')
  .select('id, restaurant_name, category_preferences')
  .eq('id', restaurantId)
  .single();

if (restaurantError) {
  console.error('[get_preferences] Error obteniendo restaurante:', restaurantError);
  return JSON.stringify({
    error: true,
    message: "Erro ao buscar dados do restaurante",
    details: restaurantError.message
  });
}

if (!restaurant) {
  console.error('[get_preferences] Restaurante não encontrado');
  return JSON.stringify({
    error: true,
    message: "Restaurante não encontrado"
  });
}

console.log('[get_preferences] Restaurante encontrado:', restaurant.restaurant_name);

// ===================================================================
// PASO 2: Parsear preferences (JSONB)
// ===================================================================

const categoryPreferences = restaurant.category_preferences || {};

// Estructura esperada de category_preferences:
// {
//   "preferred_brands": ["Friboi", "Camil"],
//   "preferred_formats": ["kg", "saco"],
//   "order_frequency": "weekly",
//   "delivery_schedule": "morning",
//   "special_restrictions": "sem glúten",
//   "category_specific": {
//     "Carnes": { ... },
//     "Grãos": { ... }
//   }
// }

const preferences = {
  preferred_brands: categoryPreferences.preferred_brands || [],
  preferred_formats: categoryPreferences.preferred_formats || [],
  order_frequency: categoryPreferences.order_frequency || null,
  delivery_schedule: categoryPreferences.delivery_schedule || null,
  special_restrictions: categoryPreferences.special_restrictions || null,
  category_specific: categoryPreferences.category_specific || {}
};

// Filtrar por categorías si se proporcionaron
if (productCategories && Array.isArray(productCategories) && productCategories.length > 0) {
  const filteredCategorySpecific = {};

  productCategories.forEach(category => {
    if (preferences.category_specific[category]) {
      filteredCategorySpecific[category] = preferences.category_specific[category];
    }
  });

  if (Object.keys(filteredCategorySpecific).length > 0) {
    preferences.category_specific = filteredCategorySpecific;
  }
}

console.log('[get_preferences] Preferências obtidas:', {
  has_brands: preferences.preferred_brands.length > 0,
  has_formats: preferences.preferred_formats.length > 0,
  has_category_specific: Object.keys(preferences.category_specific).length > 0
});

// ===================================================================
// PASO 3: Obtener fornecedores preferidos/recientes
// ===================================================================

console.log('[get_preferences] Buscando fornecedores preferidos...');

const { data: supplierRelationships, error: supplierError } = await $supabase
  .from('restaurant_supplier_relationships')
  .select(`
    id,
    supplier_id,
    relationship_type,
    last_interaction_date,
    order_count,
    supplier:suppliers (
      id,
      company_name,
      product_categories
    )
  `)
  .eq('restaurant_id', restaurantId)
  .order('last_interaction_date', { ascending: false })
  .limit(10);

if (supplierError) {
  console.error('[get_preferences] Error obteniendo fornecedores:', supplierError);
}

const preferredSuppliers = [];

if (supplierRelationships && supplierRelationships.length > 0) {
  supplierRelationships.forEach(rel => {
    if (rel.supplier) {
      const supplierCategories = rel.supplier.product_categories || [];

      // Si se proporcionaron product_categories, filtrar solo suppliers relevantes
      let isRelevant = true;
      if (productCategories && productCategories.length > 0) {
        isRelevant = productCategories.some(cat =>
          supplierCategories.some(supplierCat =>
            supplierCat.toLowerCase().includes(cat.toLowerCase()) ||
            cat.toLowerCase().includes(supplierCat.toLowerCase())
          )
        );
      }

      if (isRelevant) {
        preferredSuppliers.push({
          supplier_id: rel.supplier.id,
          supplier_name: rel.supplier.company_name,
          categories: supplierCategories,
          relationship_type: rel.relationship_type || 'known',
          last_order_date: rel.last_interaction_date,
          order_count: rel.order_count || 0
        });
      }
    }
  });
}

console.log('[get_preferences] Fornecedores encontrados:', preferredSuppliers.length);

// ===================================================================
// PASO 4: Generar mensaje de resumen
// ===================================================================

const hasPreferences =
  preferences.preferred_brands.length > 0 ||
  preferences.preferred_formats.length > 0 ||
  preferences.order_frequency ||
  preferences.delivery_schedule ||
  preferences.special_restrictions ||
  Object.keys(preferences.category_specific).length > 0;

let messageToUser = `⚙️  Preferências do restaurante obtidas!\\n\\n`;

if (hasPreferences) {
  messageToUser += `✅ Configurações encontradas:\\n`;

  if (preferences.preferred_brands.length > 0) {
    messageToUser += `  • Marcas preferidas: ${preferences.preferred_brands.join(', ')}\\n`;
  }

  if (preferences.preferred_formats.length > 0) {
    messageToUser += `  • Formatos preferidos: ${preferences.preferred_formats.join(', ')}\\n`;
  }

  if (preferences.order_frequency) {
    messageToUser += `  • Frequência de pedidos: ${preferences.order_frequency}\\n`;
  }

  if (preferences.delivery_schedule) {
    messageToUser += `  • Horário de entrega: ${preferences.delivery_schedule}\\n`;
  }

  if (preferences.special_restrictions) {
    messageToUser += `  • Restrições: ${preferences.special_restrictions}\\n`;
  }

  if (Object.keys(preferences.category_specific).length > 0) {
    messageToUser += `  • Preferências por categoria: ${Object.keys(preferences.category_specific).join(', ')}\\n`;
  }

  messageToUser += '\\n';
} else {
  messageToUser += `⚠️  Nenhuma preferência configurada.\\n\\n`;
  messageToUser += `💡 Vou usar critérios padrão (melhor preço e qualidade).\\n\\n`;
}

if (preferredSuppliers.length > 0) {
  messageToUser += `🏪 Fornecedores conhecidos: ${preferredSuppliers.length}\\n`;
  preferredSuppliers.slice(0, 3).forEach(s => {
    messageToUser += `  • ${s.supplier_name}\\n`;
  });
  if (preferredSuppliers.length > 3) {
    messageToUser += `  • ...e mais ${preferredSuppliers.length - 3}\\n`;
  }
}

// ===================================================================
// PASO 5: Return results
// ===================================================================

return JSON.stringify({
  success: true,
  restaurant_id: restaurantId,
  restaurant_name: restaurant.restaurant_name,
  preferences: preferences,
  preferred_suppliers: preferredSuppliers,
  has_preferences: hasPreferences,
  message_to_user: messageToUser
});
