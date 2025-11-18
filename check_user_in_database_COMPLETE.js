// ===================================================================
// TOOL: check_user_in_database
// ===================================================================
// PURPOSE: Verifica si un usuario existe en la base de datos
//          Busca en parallel en restaurant_people y suppliers
//          Retorna TODA la información del usuario si existe
// ===================================================================

const input = $input.first().json;
const phoneNumber = input.phone_number || input.query || input.message;

console.log('🔍 [Check User] Starting verification...');
console.log('📱 [Check User] Phone number:', phoneNumber);

// Validar que tenemos un phone number
if (!phoneNumber) {
  console.error('❌ [Check User] No phone number provided');
  return JSON.stringify({
    success: false,
    error: 'phone_number is required',
    message: 'Por favor, proporciona un número de teléfono válido.'
  });
}

try {
  // ===================================================================
  // PASO 1: Buscar en restaurant_people con JOIN a restaurants
  // ===================================================================

  console.log('🔍 [Check User] Searching in restaurant_people...');

  const { data: restaurantPerson, error: restaurantError } = await $supabase
    .from('restaurant_people')
    .select(`
      id,
      person_name,
      role,
      whatsapp_number,
      is_active,
      restaurant:restaurants (
        id,
        restaurant_name,
        restaurant_type,
        address,
        city,
        state,
        postal_code,
        category_preferences
      )
    `)
    .eq('whatsapp_number', phoneNumber)
    .eq('is_active', true)
    .maybeSingle();

  if (restaurantError && restaurantError.code !== 'PGRST116') {
    console.error('❌ [Check User] Error querying restaurant_people:', restaurantError);
  }

  // Si encontramos un restaurant person
  if (restaurantPerson && restaurantPerson.restaurant) {
    console.log('✅ [Check User] User found as RESTAURANT PERSON');
    console.log('   Person ID:', restaurantPerson.id);
    console.log('   Restaurant ID:', restaurantPerson.restaurant.id);
    console.log('   Name:', restaurantPerson.person_name);

    return JSON.stringify({
      success: true,
      registered: true,
      user_type: 'restaurant',

      // IDs
      restaurant_id: restaurantPerson.restaurant.id,
      restaurant_person_id: restaurantPerson.id,
      supplier_id: null,

      // Contact info
      phone_number: phoneNumber,

      // Personal info
      person_name: restaurantPerson.person_name,
      role: restaurantPerson.role,

      // Company info
      company_name: restaurantPerson.restaurant.restaurant_name,
      restaurant_type: restaurantPerson.restaurant.restaurant_type,

      // Address
      address: restaurantPerson.restaurant.address,
      city: restaurantPerson.restaurant.city,
      state: restaurantPerson.restaurant.state,
      postal_code: restaurantPerson.restaurant.postal_code,

      // Status
      setup_complete: true,

      // Preferences
      preferences: restaurantPerson.restaurant.category_preferences || {},

      message: `Bem-vindo de volta, ${restaurantPerson.person_name}! 👋`
    });
  }

  // ===================================================================
  // PASO 2: Buscar en suppliers
  // ===================================================================

  console.log('🔍 [Check User] Searching in suppliers...');

  const { data: supplier, error: supplierError } = await $supabase
    .from('suppliers')
    .select('*')
    .eq('phone_number', phoneNumber)
    .eq('is_active', true)
    .maybeSingle();

  if (supplierError && supplierError.code !== 'PGRST116') {
    console.error('❌ [Check User] Error querying suppliers:', supplierError);
  }

  // Si encontramos un supplier
  if (supplier) {
    console.log('✅ [Check User] User found as SUPPLIER');
    console.log('   Supplier ID:', supplier.id);
    console.log('   Company:', supplier.company_name);

    return JSON.stringify({
      success: true,
      registered: true,
      user_type: 'supplier',

      // IDs
      restaurant_id: null,
      restaurant_person_id: null,
      supplier_id: supplier.id,

      // Contact info
      phone_number: phoneNumber,

      // Personal info
      person_name: supplier.contact_name || supplier.company_name,

      // Company info
      company_name: supplier.company_name,
      business_type: supplier.business_type,
      cnpj: supplier.cnpj,

      // Address
      address: supplier.address,
      city: supplier.city,
      state: supplier.state,

      // Status
      setup_complete: true,

      message: `Bem-vindo de volta, ${supplier.contact_name || supplier.company_name}! 👋`
    });
  }

  // ===================================================================
  // PASO 3: Usuario NO encontrado - Nuevo usuario
  // ===================================================================

  console.log('📝 [Check User] User NOT found - New user');

  return JSON.stringify({
    success: true,
    registered: false,
    user_type: null,

    // IDs
    restaurant_id: null,
    restaurant_person_id: null,
    supplier_id: null,

    // Contact info
    phone_number: phoneNumber,

    // Status
    setup_complete: false,

    message: 'Novo usuário detectado. Iniciando processo de cadastro...'
  });

} catch (error) {
  console.error('❌ [Check User] Unexpected error:', error);

  return JSON.stringify({
    success: false,
    registered: false,
    error: error.message,
    message: 'Desculpe, houve um erro ao verificar seu cadastro. Por favor, tente novamente.'
  });
}
