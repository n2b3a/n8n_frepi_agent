-- ===================================================================
-- VALIDACIÓN DE TABLA restaurant_supplier_relationships
-- ===================================================================
-- Este script verifica que la tabla se haya creado correctamente
-- ===================================================================

\echo '==================================================================='
\echo 'VALIDATING restaurant_supplier_relationships table'
\echo '==================================================================='
\echo ''

-- ===================================================================
-- 1. Verificar que la tabla existe
-- ===================================================================

\echo '1. Checking if table exists...'

SELECT
  table_name,
  table_type
FROM information_schema.tables
WHERE table_schema = 'public'
  AND table_name = 'restaurant_supplier_relationships';

\echo ''

-- ===================================================================
-- 2. Verificar columnas
-- ===================================================================

\echo '2. Checking table columns...'

SELECT
  column_name,
  data_type,
  character_maximum_length,
  column_default,
  is_nullable
FROM information_schema.columns
WHERE table_name = 'restaurant_supplier_relationships'
ORDER BY ordinal_position;

\echo ''

-- ===================================================================
-- 3. Verificar constraints
-- ===================================================================

\echo '3. Checking constraints...'

SELECT
  constraint_name,
  constraint_type
FROM information_schema.table_constraints
WHERE table_name = 'restaurant_supplier_relationships'
ORDER BY constraint_type, constraint_name;

\echo ''

-- ===================================================================
-- 4. Verificar foreign keys
-- ===================================================================

\echo '4. Checking foreign keys...'

SELECT
  tc.constraint_name,
  tc.table_name,
  kcu.column_name,
  ccu.table_name AS foreign_table_name,
  ccu.column_name AS foreign_column_name
FROM information_schema.table_constraints AS tc
JOIN information_schema.key_column_usage AS kcu
  ON tc.constraint_name = kcu.constraint_name
  AND tc.table_schema = kcu.table_schema
JOIN information_schema.constraint_column_usage AS ccu
  ON ccu.constraint_name = tc.constraint_name
  AND ccu.table_schema = tc.table_schema
WHERE tc.constraint_type = 'FOREIGN KEY'
  AND tc.table_name = 'restaurant_supplier_relationships';

\echo ''

-- ===================================================================
-- 5. Verificar índices
-- ===================================================================

\echo '5. Checking indexes...'

SELECT
  indexname,
  indexdef
FROM pg_indexes
WHERE tablename = 'restaurant_supplier_relationships'
ORDER BY indexname;

\echo ''

-- ===================================================================
-- 6. Verificar triggers
-- ===================================================================

\echo '6. Checking triggers...'

SELECT
  trigger_name,
  event_manipulation,
  action_timing,
  action_statement
FROM information_schema.triggers
WHERE event_object_table = 'restaurant_supplier_relationships';

\echo ''

-- ===================================================================
-- 7. TEST: Insert, Update, Delete
-- ===================================================================

\echo '7. Running basic CRUD tests...'
\echo ''

-- Verificar que existan registros mínimos en restaurants y suppliers
\echo '7.1. Checking if test data exists in restaurants and suppliers...'

SELECT
  'Restaurants' AS table_name,
  COUNT(*) AS record_count
FROM restaurants
UNION ALL
SELECT
  'Suppliers' AS table_name,
  COUNT(*) AS record_count
FROM suppliers;

\echo ''

-- Test Insert
\echo '7.2. Test INSERT...'

DO $$
DECLARE
  test_restaurant_id INTEGER;
  test_supplier_id INTEGER;
  test_relationship_id BIGINT;
BEGIN
  -- Get first restaurant and supplier
  SELECT id INTO test_restaurant_id FROM restaurants LIMIT 1;
  SELECT id INTO test_supplier_id FROM suppliers LIMIT 1;

  IF test_restaurant_id IS NULL OR test_supplier_id IS NULL THEN
    RAISE NOTICE 'SKIPPED: No test data available in restaurants or suppliers tables';
  ELSE
    -- Try insert
    INSERT INTO restaurant_supplier_relationships (
      restaurant_id,
      supplier_id,
      relationship_type,
      price_updates_count
    )
    VALUES (
      test_restaurant_id,
      test_supplier_id,
      'price_reporting',
      1
    )
    RETURNING id INTO test_relationship_id;

    RAISE NOTICE 'SUCCESS: Test relationship created with id=%', test_relationship_id;

    -- Test Update
    UPDATE restaurant_supplier_relationships
    SET price_updates_count = price_updates_count + 1,
        last_interaction_date = NOW()
    WHERE id = test_relationship_id;

    RAISE NOTICE 'SUCCESS: Test relationship updated';

    -- Verify updated_at trigger fired
    PERFORM 1
    FROM restaurant_supplier_relationships
    WHERE id = test_relationship_id
      AND updated_at > created_at;

    IF FOUND THEN
      RAISE NOTICE 'SUCCESS: Trigger updated_at is working';
    ELSE
      RAISE NOTICE 'WARNING: Trigger updated_at may not be working';
    END IF;

    -- Test Delete
    DELETE FROM restaurant_supplier_relationships
    WHERE id = test_relationship_id;

    RAISE NOTICE 'SUCCESS: Test relationship deleted';
  END IF;
END $$;

\echo ''

-- ===================================================================
-- 8. Test Unique Constraint
-- ===================================================================

\echo '8. Testing UNIQUE constraint (restaurant_id, supplier_id)...'

DO $$
DECLARE
  test_restaurant_id INTEGER;
  test_supplier_id INTEGER;
BEGIN
  SELECT id INTO test_restaurant_id FROM restaurants LIMIT 1;
  SELECT id INTO test_supplier_id FROM suppliers LIMIT 1;

  IF test_restaurant_id IS NULL OR test_supplier_id IS NULL THEN
    RAISE NOTICE 'SKIPPED: No test data available';
  ELSE
    -- Insert first relationship
    INSERT INTO restaurant_supplier_relationships (restaurant_id, supplier_id)
    VALUES (test_restaurant_id, test_supplier_id);

    RAISE NOTICE 'First insert successful';

    -- Try duplicate (should fail)
    BEGIN
      INSERT INTO restaurant_supplier_relationships (restaurant_id, supplier_id)
      VALUES (test_restaurant_id, test_supplier_id);

      RAISE NOTICE 'FAILED: Duplicate insert was allowed (should have been blocked)';
    EXCEPTION
      WHEN unique_violation THEN
        RAISE NOTICE 'SUCCESS: UNIQUE constraint working - duplicate insert blocked';
    END;

    -- Cleanup
    DELETE FROM restaurant_supplier_relationships
    WHERE restaurant_id = test_restaurant_id
      AND supplier_id = test_supplier_id;

    RAISE NOTICE 'Cleanup successful';
  END IF;
END $$;

\echo ''

-- ===================================================================
-- 9. Test Check Constraints
-- ===================================================================

\echo '9. Testing CHECK constraints...'

DO $$
BEGIN
  -- Test negative price_updates_count (should fail)
  BEGIN
    INSERT INTO restaurant_supplier_relationships (
      restaurant_id,
      supplier_id,
      price_updates_count
    )
    VALUES (1, 1, -1);

    RAISE NOTICE 'FAILED: Negative price_updates_count was allowed';
  EXCEPTION
    WHEN check_violation THEN
      RAISE NOTICE 'SUCCESS: CHECK constraint blocks negative price_updates_count';
  END;

  -- Test negative total_spent (should fail)
  BEGIN
    INSERT INTO restaurant_supplier_relationships (
      restaurant_id,
      supplier_id,
      total_spent
    )
    VALUES (1, 1, -100.00);

    RAISE NOTICE 'FAILED: Negative total_spent was allowed';
  EXCEPTION
    WHEN check_violation THEN
      RAISE NOTICE 'SUCCESS: CHECK constraint blocks negative total_spent';
  END;
END $$;

\echo ''

-- ===================================================================
-- RESUMEN FINAL
-- ===================================================================

\echo '==================================================================='
\echo 'VALIDATION COMPLETE'
\echo '==================================================================='
\echo ''
\echo 'If all tests passed, the table is ready to use!'
\echo 'If any test failed, review the output above for details.'
\echo ''
