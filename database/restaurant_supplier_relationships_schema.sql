-- ===================================================================
-- SUPPLIER PRICE UPDATER - DATABASE SCHEMA
-- ===================================================================
-- Tabla: restaurant_supplier_relationships
-- Propósito: Trackear qué suppliers conoce cada restaurante
-- ===================================================================

-- DROP TABLE IF EXISTS (solo para desarrollo, comentar en producción)
-- DROP TABLE IF EXISTS restaurant_supplier_relationships CASCADE;

-- ===================================================================
-- CREAR TABLA
-- ===================================================================

CREATE TABLE IF NOT EXISTS restaurant_supplier_relationships (
  -- Primary Key
  id BIGSERIAL PRIMARY KEY,

  -- Foreign Keys
  restaurant_id INTEGER NOT NULL REFERENCES restaurants(id) ON DELETE CASCADE,
  supplier_id INTEGER NOT NULL REFERENCES suppliers(id) ON DELETE CASCADE,

  -- Metadata
  relationship_type VARCHAR(50) DEFAULT 'price_reporting',
    -- Valores posibles:
    -- 'price_reporting': Restaurante reporta precios de este supplier
    -- 'purchase_history': Restaurante ha comprado de este supplier
    -- 'preferred': Restaurante marcó como preferido
    -- 'contract': Tienen contrato formal

  first_interaction_date TIMESTAMPTZ DEFAULT NOW(),
  last_interaction_date TIMESTAMPTZ DEFAULT NOW(),

  -- Statistics
  price_updates_count INTEGER DEFAULT 0,
    -- Cuántas veces el restaurante ha reportado precios de este supplier

  purchases_count INTEGER DEFAULT 0,
    -- Cuántas órdenes de compra ha hecho a este supplier

  total_spent NUMERIC(10,2) DEFAULT 0.00,
    -- Total gastado en este supplier (suma de purchase_orders)

  -- Status Flags
  is_active BOOLEAN DEFAULT TRUE,
    -- Si la relación está activa (el restaurante aún trabaja con este supplier)

  is_preferred BOOLEAN DEFAULT FALSE,
    -- Si el restaurante marcó este supplier como preferido

  notes TEXT,
    -- Notas adicionales sobre la relación

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  -- Constraints
  CONSTRAINT unique_restaurant_supplier UNIQUE(restaurant_id, supplier_id),
    -- Un restaurante no puede tener relación duplicada con el mismo supplier

  CONSTRAINT valid_counts CHECK (price_updates_count >= 0 AND purchases_count >= 0),
    -- Los contadores no pueden ser negativos

  CONSTRAINT valid_spent CHECK (total_spent >= 0)
    -- El total gastado no puede ser negativo
);

-- ===================================================================
-- ÍNDICES
-- ===================================================================

-- Buscar por restaurant_id (query común: "qué suppliers tiene el restaurante X?")
CREATE INDEX IF NOT EXISTS idx_restaurant_supplier_restaurant
ON restaurant_supplier_relationships(restaurant_id);

-- Buscar por supplier_id (query común: "qué restaurantes trabajan con supplier Y?")
CREATE INDEX IF NOT EXISTS idx_restaurant_supplier_supplier
ON restaurant_supplier_relationships(supplier_id);

-- Filtrar por activos (query común: "suppliers activos del restaurante X")
CREATE INDEX IF NOT EXISTS idx_restaurant_supplier_active
ON restaurant_supplier_relationships(is_active)
WHERE is_active = TRUE;

-- Filtrar por preferidos (query común: "suppliers preferidos del restaurante X")
CREATE INDEX IF NOT EXISTS idx_restaurant_supplier_preferred
ON restaurant_supplier_relationships(restaurant_id, is_preferred)
WHERE is_preferred = TRUE;

-- Ordenar por última interacción (query común: "suppliers más recientes")
CREATE INDEX IF NOT EXISTS idx_restaurant_supplier_last_interaction
ON restaurant_supplier_relationships(last_interaction_date DESC);

-- ===================================================================
-- TRIGGERS
-- ===================================================================

-- Trigger para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_restaurant_supplier_relationships_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_restaurant_supplier_relationships_updated_at
BEFORE UPDATE ON restaurant_supplier_relationships
FOR EACH ROW
EXECUTE FUNCTION update_restaurant_supplier_relationships_updated_at();

-- ===================================================================
-- COMENTARIOS (Documentación)
-- ===================================================================

COMMENT ON TABLE restaurant_supplier_relationships IS
'Trackea la relación entre restaurantes y suppliers: reportes de precios, compras, preferencias';

COMMENT ON COLUMN restaurant_supplier_relationships.relationship_type IS
'Tipo de relación: price_reporting, purchase_history, preferred, contract';

COMMENT ON COLUMN restaurant_supplier_relationships.price_updates_count IS
'Número de veces que el restaurante ha reportado precios de este supplier';

COMMENT ON COLUMN restaurant_supplier_relationships.purchases_count IS
'Número de órdenes de compra realizadas a este supplier';

COMMENT ON COLUMN restaurant_supplier_relationships.total_spent IS
'Total acumulado gastado en este supplier';

COMMENT ON COLUMN restaurant_supplier_relationships.is_preferred IS
'Si el restaurante marcó este supplier como preferido para ciertos productos';

-- ===================================================================
-- GRANTS (Permisos)
-- ===================================================================

-- Dar permisos a la aplicación (ajustar según tu setup)
-- GRANT SELECT, INSERT, UPDATE, DELETE ON restaurant_supplier_relationships TO frepi_app;
-- GRANT USAGE, SELECT ON SEQUENCE restaurant_supplier_relationships_id_seq TO frepi_app;

-- ===================================================================
-- TEST DATA (Comentado - descomentar para testing)
-- ===================================================================

/*
-- Test: Crear relación básica
INSERT INTO restaurant_supplier_relationships (restaurant_id, supplier_id, relationship_type)
VALUES (1, 1, 'price_reporting');

-- Test: Verificar unique constraint (debe fallar)
INSERT INTO restaurant_supplier_relationships (restaurant_id, supplier_id)
VALUES (1, 1); -- ERROR: duplicate key

-- Test: Actualizar contadores
UPDATE restaurant_supplier_relationships
SET price_updates_count = price_updates_count + 1,
    last_interaction_date = NOW()
WHERE restaurant_id = 1 AND supplier_id = 1;

-- Test: Verificar trigger de updated_at
SELECT id, created_at, updated_at
FROM restaurant_supplier_relationships
WHERE restaurant_id = 1 AND supplier_id = 1;
*/

-- ===================================================================
-- QUERIES ÚTILES
-- ===================================================================

/*
-- Ver todos los suppliers de un restaurante
SELECT
  r.id,
  r.restaurant_id,
  r.supplier_id,
  s.company_name AS supplier_name,
  r.relationship_type,
  r.price_updates_count,
  r.purchases_count,
  r.total_spent,
  r.is_preferred,
  r.last_interaction_date
FROM restaurant_supplier_relationships r
JOIN suppliers s ON r.supplier_id = s.id
WHERE r.restaurant_id = 1
  AND r.is_active = TRUE
ORDER BY r.last_interaction_date DESC;

-- Ver todos los restaurantes de un supplier
SELECT
  r.id,
  r.restaurant_id,
  rest.restaurant_name,
  r.relationship_type,
  r.price_updates_count,
  r.purchases_count,
  r.total_spent,
  r.last_interaction_date
FROM restaurant_supplier_relationships r
JOIN restaurants rest ON r.restaurant_id = rest.id
WHERE r.supplier_id = 1
  AND r.is_active = TRUE
ORDER BY r.total_spent DESC;

-- Ver suppliers preferidos de un restaurante
SELECT
  s.company_name,
  r.price_updates_count,
  r.purchases_count,
  r.total_spent
FROM restaurant_supplier_relationships r
JOIN suppliers s ON r.supplier_id = s.id
WHERE r.restaurant_id = 1
  AND r.is_preferred = TRUE
  AND r.is_active = TRUE;

-- Estadísticas de un restaurante
SELECT
  COUNT(*) AS total_suppliers,
  COUNT(*) FILTER (WHERE is_preferred = TRUE) AS preferred_suppliers,
  SUM(price_updates_count) AS total_price_updates,
  SUM(purchases_count) AS total_purchases,
  SUM(total_spent) AS total_spent_all_suppliers
FROM restaurant_supplier_relationships
WHERE restaurant_id = 1
  AND is_active = TRUE;
*/

-- ===================================================================
-- FIN DEL SCRIPT
-- ===================================================================

COMMIT;
