# 📚 Guía de Implementación: upload_supplier_prices

## 🎯 Objetivo

Parsear y validar listas de precios enviadas por proveedores vía WhatsApp, guardando en sesión para normalización posterior.

---

## 📊 Flujo de Upload

```
Supplier envía mensaje: "enviar preços"
    ↓
┌─────────────────────────────────────────┐
│ upload_supplier_prices                   │
│ 1. Validar usuario es supplier          │
│ 2. Crear/continuar sesión               │
│ 3. Mostrar instrucciones de formato     │
└─────────────────────────────────────────┘
    ↓
Supplier copia lista de Excel y envía:
"Tomate 500g | 4.50 | caixa
 Cebola 1kg | 3.20 | kg"
    ↓
┌─────────────────────────────────────────┐
│ upload_supplier_prices                   │
│ 1. Parse líneas de texto                │
│ 2. Validar formato de cada línea        │
│ 3. Validar precio > 0                   │
│ 4. Validar unidad en lista válida       │
│ 5. Acumular productos y errores         │
│ 6. Guardar en line_sessions             │
│ 7. Retornar resumen                     │
└─────────────────────────────────────────┘
    ↓
Mensaje de confirmación con resumen
Agent automáticamente llama normalize_product_list
```

---

## 🔧 Características Implementadas

### 1. **Parsing Flexible de Formatos**

Soporta múltiples separadores:

```javascript
// Formato 1: Pipe
"Tomate 500g | 4.50 | caixa"

// Formato 2: Coma
"Tomate 500g, 4.50, caixa"

// Formato 3: Guión
"Tomate 500g - 4.50 - caixa"

// Formato 4: Con R$
"Tomate 500g | R$ 4.50 | caixa"

// Formato 5: Campos opcionales (SKU, Marca)
"Tomate 500g | 4.50 | caixa | SKU123 | Marca XYZ"
```

### 2. **Validaciones Implementadas**

```javascript
// Nombre de producto
if (productName.length < 3) {
  error: 'Nome muito curto (mínimo 3 caracteres)'
}

// Precio
const price = parseFloat(priceStr);
if (isNaN(price) || price <= 0) {
  error: 'Preço inválido. Deve ser número > 0'
}

// Unidad
const VALID_UNITS = ['kg', 'g', 'l', 'ml', 'caixa', 'unidade', 'pacote', 'fardo', 'saco'];
if (!VALID_UNITS.includes(unit)) {
  error: `Unidade inválida. Use: ${VALID_UNITS.join(', ')}`
}
```

### 3. **Manejo de Errores Parciales**

```javascript
// Si algunas líneas fallan, continúa con las válidas
const { products, errors } = parsePriceList(userMessage);

// Retorna productos válidos + errores por línea
{
  products: [{...}, {...}],  // Productos válidos
  errors: [
    { line: 5, content: "...", error: "Precio inválido" },
    { line: 8, content: "...", error: "Unidad inválida" }
  ]
}
```

### 4. **Session Management**

```javascript
// Guarda en line_sessions.preferences_captured
sessionData = {
  upload_status: 'list_received',
  supplier_id: userData.supplier_id,
  price_list: [
    {
      product_name: "Tomate 500g",
      unit_price: 4.50,
      unit: "caixa",
      sku: null,
      brand: null,
      currency: "BRL"
    }
  ],
  parse_errors: [...],
  total_products: 25,
  total_errors: 2,
  uploaded_at: "2025-01-15T10:00:00Z"
}
```

### 5. **Resumen Estadístico**

```javascript
// Calcula distribución por unidad
const unitSummary = {
  'kg': 10,
  'caixa': 8,
  'pacote': 5,
  'unidade': 2
};

// Calcula valor promedio
const avgPrice = totalValue / products.length;
```

---

## 📝 Estructura de Datos

### Producto Parseado

```javascript
{
  product_name: "Tomate Longa Vida 500g",
  unit_price: 4.50,
  unit: "caixa",
  sku: "SKU123",        // Opcional
  brand: "FreshCo",     // Opcional
  currency: "BRL"       // Default
}
```

### Sesión en line_sessions

```json
{
  "session_id": "5511999999999_upload_1705316400000",
  "supplier_id": 5,
  "primary_intent": "upload_prices",
  "session_type": "data_upload",
  "preferences_captured": {
    "upload_status": "list_received",
    "supplier_id": 5,
    "price_list": [...],
    "parse_errors": [...],
    "total_products": 25,
    "total_errors": 2,
    "uploaded_at": "2025-01-15T10:00:00Z"
  }
}
```

---

## 🧪 Test Cases

### Test Case 1: Upload Exitoso

```
Supplier:
> "enviar preços"

Bot:
💰 *Enviar Lista de Preços*

Envie sua lista de produtos no formato:

📝 *Formato:*
Produto | Preço | Unidade

📋 *Exemplo:*
Tomate 500g | 4.50 | caixa
Cebola 1kg | 3.20 | kg

[...]

Supplier:
> Tomate 500g | 4.50 | caixa
> Cebola 1kg | 3.20 | kg
> Arroz 1kg | 5.50 | pacote

Bot:
✅ *LISTA RECEBIDA!*

📦 *3 produtos* processados
💰 Valor médio: R$ 4.40

*Distribuição por unidade:*
• 1 em caixa
• 1 em kg
• 1 em pacote

*Primeiros produtos:*
1. Tomate 500g - R$ 4.50/caixa
2. Cebola 1kg - R$ 3.20/kg
3. Arroz 1kg - R$ 5.50/pacote

────────────────
🔄 *Próximo passo:*
O agente vai normalizar os produtos...
```

### Test Case 2: Formato Alternativo (Coma)

```
Supplier:
> Tomate 500g, 4.50, caixa
> Cebola 1kg, 3.20, kg

Bot:
✅ *LISTA RECEBIDA!*
📦 *2 produtos* processados
[...]
```

### Test Case 3: Con Errores Parciales

```
Supplier:
> Tomate 500g | 4.50 | caixa
> Cebola | invalido | kg
> Arroz 1kg | 5.50 | pacote

Bot:
✅ *LISTA RECEBIDA!*

📦 *2 produtos* processados

⚠️ *1 linha(s) com erro* (ignoradas):
• Linha 2: Preço inválido: "invalido". Deve ser número > 0

*Primeiros produtos:*
1. Tomate 500g - R$ 4.50/caixa
2. Arroz 1kg - R$ 5.50/pacote
```

### Test Case 4: Unidade Inválida

```
Supplier:
> Tomate 500g | 4.50 | caixinha

Bot:
❌ *Erro ao processar lista*

Linha 1: Unidade inválida: "caixinha". Use: kg, g, l, ml, caixa, unidade, pacote, fardo, saco

📝 *Formato correto:*
Produto | Preço | Unidade
```

### Test Case 5: Usuario No Es Supplier

```
Usuario (restaurant):
> "enviar preços"

Bot:
Você precisa estar cadastrado como fornecedor. 😊

Digite "registrar" para começar.
```

### Test Case 6: Precio Negativo

```
Supplier:
> Tomate | -5.00 | kg

Bot:
❌ *Erro ao processar lista*

Linha 1: Preço inválido: "-5.00". Deve ser número > 0
```

### Test Case 7: Lista Grande (50 Productos)

```
Supplier:
> [50 líneas de productos]

Bot:
✅ *LISTA RECEBIDA!*

📦 *50 produtos* processados
💰 Valor médio: R$ 8.75

*Distribuição por unidade:*
• 25 em kg
• 15 em caixa
• 10 em pacote

*Primeiros produtos:*
1. Produto 1 - R$ 4.50/kg
2. Produto 2 - R$ 3.20/caixa
3. Produto 3 - R$ 5.50/pacote
4. Produto 4 - R$ 7.00/kg
5. Produto 5 - R$ 2.80/pacote
...e mais 45 produtos
```

---

## 🔍 Debugging

### Ver Listas Subidas Hoy

```sql
SELECT
  session_id,
  supplier_id,
  preferences_captured->'total_products' as products_count,
  preferences_captured->'total_errors' as errors_count,
  preferences_captured->'uploaded_at' as uploaded_at,
  created_at
FROM line_sessions
WHERE primary_intent = 'upload_prices'
  AND DATE(created_at) = CURRENT_DATE
ORDER BY created_at DESC;
```

### Ver Contenido de una Lista

```sql
SELECT
  session_id,
  jsonb_pretty(preferences_captured->'price_list') as products,
  jsonb_pretty(preferences_captured->'parse_errors') as errors
FROM line_sessions
WHERE session_id = 'session-id-here';
```

### Ver Distribución de Unidades

```sql
SELECT
  jsonb_array_elements(preferences_captured->'price_list')->>'unit' as unit,
  COUNT(*) as count
FROM line_sessions
WHERE session_id = 'session-id-here'
GROUP BY unit
ORDER BY count DESC;
```

### Logs en n8n

```
💰 [Upload] Supplier: 5511999999999 Message length: 150
🆕 [Upload] Creating new session: 5511999999999_upload_1705316400000
📝 [Upload] Parsing price list...
✅ [Upload] Parsed: 25 products, 2 errors
💾 [Upload] Saved to session: 5511999999999_upload_1705316400000
```

---

## ⚙️ Configuración y Personalización

### Agregar Más Unidades Válidas

```javascript
const VALID_UNITS = [
  'kg', 'g', 'l', 'ml',
  'caixa', 'unidade', 'pacote', 'fardo', 'saco',
  // Agregar nuevas:
  'dúzia', 'bandeja', 'lata', 'garrafa'
];
```

### Soportar Formato CSV Real

```javascript
// Para soportar archivos CSV adjuntos, necesitaríamos:
// 1. n8n File Input node
// 2. CSV Parser
// 3. Integrar con este tool

// Ejemplo de integración:
if (input.binary) {
  // Parse CSV from binary data
  const csv = parseCSV(input.binary.data);
  products = csv.map(row => ({
    product_name: row.Produto,
    unit_price: parseFloat(row.Preço),
    unit: row.Unidade.toLowerCase()
  }));
}
```

### Validación de Precio Máximo

```javascript
const MAX_PRICE = 10000; // R$ 10,000

if (price > MAX_PRICE) {
  errors.push({
    line: lineNum,
    content: line,
    error: `Preço muito alto: R$ ${price}. Máximo: R$ ${MAX_PRICE}`
  });
}
```

### Auto-corrección de Unidades Comunes

```javascript
const UNIT_ALIASES = {
  'kilos': 'kg',
  'kilo': 'kg',
  'litros': 'l',
  'litro': 'l',
  'caixas': 'caixa',
  'unidades': 'unidade',
  'pacotes': 'pacote'
};

// Auto-corregir
const normalizedUnit = UNIT_ALIASES[unit] || unit;
```

---

## 🚨 Casos Especiales y Errores

### Error: Timeout de Sesión

```javascript
const TIMEOUT_MINUTES = 30;

if (sessionAge > TIMEOUT_MINUTES * 60 * 1000) {
  // Limpiar sesión expirada
  await $supabase
    .from('line_sessions')
    .update({
      awaiting_continuation: false,
      session_notes: `Timeout: ${TIMEOUT_MINUTES} minutos`
    })
    .eq('session_id', session.session_id);
}
```

### Error: Lista Vacía

```javascript
if (products.length === 0 && errors.length > 0) {
  return JSON.stringify({
    status: 'parse_error',
    message: 'Nenhum produto válido encontrado. Verifique o formato.'
  });
}
```

### Warning: Precio Muy Bajo

```javascript
// En normalize_product_list, detectar precios sospechosos
const MIN_PRICE = 0.01;

if (price < MIN_PRICE) {
  warnings.push({
    product: productName,
    issue: 'Preço muito baixo',
    price: price
  });
}
```

---

## 🔗 Integración con normalize_product_list

### Flujo Completo

```javascript
// 1. upload_supplier_prices guarda en sesión
await $supabase
  .from('line_sessions')
  .update({
    preferences_captured: {
      price_list: products
    }
  })
  .eq('session_id', sessionId);

// 2. Agent automáticamente llama normalize_product_list

// 3. normalize_product_list lee de sesión
const priceList = session.preferences_captured.price_list;

// 4. Mapea cada producto a master_list usando vector search
for (const item of priceList) {
  const embedding = await generateEmbedding(item.product_name);
  const match = await findBestMatch(embedding);
  // ...
}
```

---

## 📋 Checklist de Implementación

- [x] Implementar parsing de texto estructurado
- [x] Validación de formato (separadores)
- [x] Validación de precio (> 0)
- [x] Validación de unidades
- [x] Session management
- [x] Manejo de errores parciales
- [x] Resumen estadístico
- [x] Logging completo
- [ ] Integrar en workflow JSON
- [ ] Testing con datos reales
- [ ] Soportar CSV adjunto (opcional)

---

## 🎉 ¡Listo!

Con esta implementación tienes un sistema completo de upload de precios que:

- ✅ Parsea múltiples formatos de texto
- ✅ Valida cada línea independientemente
- ✅ Maneja errores parciales (continúa con líneas válidas)
- ✅ Guarda en sesión para procesamiento posterior
- ✅ Resumen estadístico rico
- ✅ Session management con timeout
- ✅ Logging completo

**Próximos pasos:**
1. Implementar `normalize_product_list` para mapear a master_list
2. Implementar `publish_to_catalog` para publicar a pricing_history
3. Testing end-to-end del flujo de supplier

¡Disfruta! 🚀
