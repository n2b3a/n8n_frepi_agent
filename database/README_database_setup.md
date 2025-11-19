# 🗄️ DATABASE SETUP - Supplier Price Updater

**Propósito:** Scripts SQL para crear la tabla `restaurant_supplier_relationships`

---

## 📋 ARCHIVOS

1. **restaurant_supplier_relationships_schema.sql**
   - Crea la tabla completa
   - Índices optimizados
   - Triggers para updated_at
   - Constraints de validación
   - Documentación inline

2. **validate_restaurant_supplier_relationships.sql**
   - Tests automáticos de validación
   - Verifica estructura, constraints, índices
   - CRUD tests
   - Unique constraint test

---

## 🚀 CÓMO EJECUTAR

### Opción 1: Desde psql (Terminal)

```bash
# Conectar a Supabase
psql "postgresql://[user]:[password]@[host]:[port]/[database]"

# Ejecutar schema
\i database/restaurant_supplier_relationships_schema.sql

# Ejecutar validación
\i database/validate_restaurant_supplier_relationships.sql
```

---

### Opción 2: Desde Supabase Dashboard

1. **Ir a SQL Editor en Supabase**
2. **Copiar contenido de `restaurant_supplier_relationships_schema.sql`**
3. **Ejecutar (Run)**
4. **Verificar:** Ir a Table Editor → Buscar `restaurant_supplier_relationships`

---

### Opción 3: Desde código (n8n Code node o script)

```javascript
// En un Code node de n8n o script Node.js

const schemaSQL = `
[copiar contenido de restaurant_supplier_relationships_schema.sql]
`;

const { error } = await $supabase.rpc('exec_sql', { sql: schemaSQL });

if (error) {
  console.error('Error creating table:', error);
} else {
  console.log('Table created successfully!');
}
```

---

## ✅ VALIDACIÓN

Después de ejecutar el schema, ejecuta el script de validación:

```bash
psql "postgresql://[...]" -f database/validate_restaurant_supplier_relationships.sql
```

**Expected output:**
```
===================================================================
VALIDATING restaurant_supplier_relationships table
===================================================================

1. Checking if table exists...
 table_name                           | table_type
--------------------------------------+-----------
 restaurant_supplier_relationships    | BASE TABLE

2. Checking table columns...
[Lista de columnas]

3. Checking constraints...
[Lista de constraints]

...

VALIDATION COMPLETE
If all tests passed, the table is ready to use!
```

---

## 📊 ESTRUCTURA DE LA TABLA

```sql
restaurant_supplier_relationships
├─ id (BIGSERIAL) PK
├─ restaurant_id (INTEGER) FK → restaurants
├─ supplier_id (INTEGER) FK → suppliers
├─ relationship_type (VARCHAR)
├─ first_interaction_date (TIMESTAMPTZ)
├─ last_interaction_date (TIMESTAMPTZ)
├─ price_updates_count (INTEGER)
├─ purchases_count (INTEGER)
├─ total_spent (NUMERIC)
├─ is_active (BOOLEAN)
├─ is_preferred (BOOLEAN)
├─ notes (TEXT)
├─ created_at (TIMESTAMPTZ)
└─ updated_at (TIMESTAMPTZ)

UNIQUE: (restaurant_id, supplier_id)
```

---

## 🔍 QUERIES ÚTILES

### Ver suppliers de un restaurante

```sql
SELECT
  s.company_name,
  r.relationship_type,
  r.price_updates_count,
  r.purchases_count,
  r.total_spent,
  r.is_preferred,
  r.last_interaction_date
FROM restaurant_supplier_relationships r
JOIN suppliers s ON r.supplier_id = s.id
WHERE r.restaurant_id = 123
  AND r.is_active = TRUE
ORDER BY r.last_interaction_date DESC;
```

---

### Ver restaurantes de un supplier

```sql
SELECT
  rest.restaurant_name,
  r.price_updates_count,
  r.purchases_count,
  r.total_spent,
  r.last_interaction_date
FROM restaurant_supplier_relationships r
JOIN restaurants rest ON r.restaurant_id = rest.id
WHERE r.supplier_id = 5
  AND r.is_active = TRUE
ORDER BY r.total_spent DESC;
```

---

### Suppliers preferidos

```sql
SELECT
  s.company_name,
  r.total_spent
FROM restaurant_supplier_relationships r
JOIN suppliers s ON r.supplier_id = s.id
WHERE r.restaurant_id = 123
  AND r.is_preferred = TRUE
  AND r.is_active = TRUE;
```

---

### Estadísticas de un restaurante

```sql
SELECT
  COUNT(*) AS total_suppliers,
  COUNT(*) FILTER (WHERE is_preferred = TRUE) AS preferred_suppliers,
  SUM(price_updates_count) AS total_price_updates,
  SUM(purchases_count) AS total_purchases,
  SUM(total_spent) AS total_spent_all
FROM restaurant_supplier_relationships
WHERE restaurant_id = 123
  AND is_active = TRUE;
```

---

## 🔄 UPDATE PATTERNS

### Cuando el restaurante reporta precios

```javascript
// En el tool match_with_existing_supplier_mapped

// 1. Buscar relación existente
const { data: relationship } = await $supabase
  .from('restaurant_supplier_relationships')
  .select('*')
  .eq('restaurant_id', restaurantId)
  .eq('supplier_id', supplierId)
  .maybeSingle();

if (relationship) {
  // 2. Actualizar existente
  await $supabase
    .from('restaurant_supplier_relationships')
    .update({
      price_updates_count: relationship.price_updates_count + 1,
      last_interaction_date: new Date().toISOString()
    })
    .eq('id', relationship.id);
} else {
  // 3. Crear nueva relación
  await $supabase
    .from('restaurant_supplier_relationships')
    .insert({
      restaurant_id: restaurantId,
      supplier_id: supplierId,
      relationship_type: 'price_reporting',
      price_updates_count: 1
    });
}
```

---

### Cuando el restaurante hace una compra

```javascript
// En el tool execute_checkout o similar

await $supabase
  .from('restaurant_supplier_relationships')
  .update({
    purchases_count: relationship.purchases_count + 1,
    total_spent: relationship.total_spent + orderTotal,
    last_interaction_date: new Date().toISOString()
  })
  .eq('restaurant_id', restaurantId)
  .eq('supplier_id', supplierId);
```

---

## 🐛 TROUBLESHOOTING

### Error: "relation does not exist"
**Causa:** Tabla no creada
**Solución:** Ejecutar `restaurant_supplier_relationships_schema.sql`

---

### Error: "foreign key violation"
**Causa:** restaurant_id o supplier_id no existe
**Solución:** Verificar que los IDs existen en restaurants y suppliers

```sql
SELECT id FROM restaurants WHERE id = 123;
SELECT id FROM suppliers WHERE id = 5;
```

---

### Error: "duplicate key value violates unique constraint"
**Causa:** Ya existe relación entre ese restaurant y supplier
**Solución:** Hacer UPDATE en lugar de INSERT

---

### Trigger no funciona (updated_at no se actualiza)
**Causa:** Trigger no creado o función no existe
**Solución:** Ejecutar sección de TRIGGERS del schema

```sql
-- Verificar que existe
SELECT tgname FROM pg_trigger
WHERE tgname = 'trigger_update_restaurant_supplier_relationships_updated_at';
```

---

## 📝 NOTAS

1. **Unique Constraint:** Un restaurante solo puede tener UNA relación con cada supplier
2. **Soft Deletes:** Usa `is_active = FALSE` en lugar de DELETE
3. **Timestamps:** `updated_at` se actualiza automáticamente en cada UPDATE
4. **Permisos:** Ajustar GRANTS según tu setup de Supabase

---

## ✅ CHECKLIST

Antes de continuar con la implementación de tools:

- [ ] Tabla `restaurant_supplier_relationships` creada
- [ ] Todos los índices creados
- [ ] Trigger `updated_at` funcionando
- [ ] Constraints validadas (UNIQUE, CHECK, FK)
- [ ] Test insert/update/delete exitoso
- [ ] Queries de ejemplo funcionan

**Si todo ✅, puedes continuar con FASE 1: Tools!**
