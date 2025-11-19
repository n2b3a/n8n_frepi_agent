-- ===================================================================
-- SUPABASE RPC FUNCTIONS FOR SUPPLIER PRICE UPDATER
-- ===================================================================
-- These functions enable vector similarity search for:
-- 1. Supplier matching by name
-- 2. Product matching in supplier_mapped_products
-- 3. Product matching in master_list
-- ===================================================================
-- Required extension: pgvector
-- ===================================================================

-- Enable pgvector extension (if not already enabled)
CREATE EXTENSION IF NOT EXISTS vector;

-- ===================================================================
-- FUNCTION 1: match_suppliers_by_name
-- ===================================================================
-- Purpose: Find suppliers by name using vector similarity search
-- Used by: match_with_existing_supplier_mapped tool
-- ===================================================================

CREATE OR REPLACE FUNCTION match_suppliers_by_name(
  query_embedding vector(1536),
  match_threshold float DEFAULT 0.7,
  match_count int DEFAULT 5
)
RETURNS TABLE (
  id int,
  company_name varchar,
  business_type varchar,
  contact_name varchar,
  phone_number varchar,
  similarity float
)
LANGUAGE plpgsql
AS $
BEGIN
  RETURN QUERY
  SELECT
    s.id,
    s.company_name,
    s.business_type,
    s.contact_name,
    s.phone_number,
    1 - (s.name_embedding <=> query_embedding) as similarity
  FROM suppliers s
  WHERE s.is_active = TRUE
    AND s.name_embedding IS NOT NULL
    AND 1 - (s.name_embedding <=> query_embedding) >= match_threshold
  ORDER BY s.name_embedding <=> query_embedding
  LIMIT match_count;
END;
$;

-- Grant execute permission
GRANT EXECUTE ON FUNCTION match_suppliers_by_name(vector, float, int) TO authenticated;
GRANT EXECUTE ON FUNCTION match_suppliers_by_name(vector, float, int) TO anon;

-- ===================================================================
-- FUNCTION 2: match_supplier_products
-- ===================================================================
-- Purpose: Find products in supplier_mapped_products by name + supplier
-- Used by: match_with_existing_supplier_mapped tool
-- ===================================================================

CREATE OR REPLACE FUNCTION match_supplier_products(
  query_embedding vector(1536),
  supplier_id_filter int,
  match_threshold float DEFAULT 0.7,
  match_count int DEFAULT 3
)
RETURNS TABLE (
  id int,
  product_name varchar,
  price numeric,
  unit varchar,
  supplier_id int,
  master_list_product_id int,
  similarity float
)
LANGUAGE plpgsql
AS $
BEGIN
  RETURN QUERY
  SELECT
    smp.id,
    smp.product_name,
    smp.price,
    smp.unit,
    smp.supplier_id,
    smp.master_list_product_id,
    1 - (smp.embedding <=> query_embedding) as similarity
  FROM supplier_mapped_products smp
  WHERE smp.supplier_id = supplier_id_filter
    AND smp.embedding IS NOT NULL
    AND 1 - (smp.embedding <=> query_embedding) >= match_threshold
  ORDER BY smp.embedding <=> query_embedding
  LIMIT match_count;
END;
$;

-- Grant execute permission
GRANT EXECUTE ON FUNCTION match_supplier_products(vector, int, float, int) TO authenticated;
GRANT EXECUTE ON FUNCTION match_supplier_products(vector, int, float, int) TO anon;

-- ===================================================================
-- FUNCTION 3: match_master_list_products
-- ===================================================================
-- Purpose: Find products in master_list by name (for manual matching)
-- Used by: proposal_to_match_master_list tool
-- ===================================================================

CREATE OR REPLACE FUNCTION match_master_list_products(
  query_embedding vector(1536),
  match_threshold float DEFAULT 0.65,
  match_count int DEFAULT 5
)
RETURNS TABLE (
  id int,
  product_name varchar,
  category varchar,
  unit varchar,
  similarity float
)
LANGUAGE plpgsql
AS $
BEGIN
  RETURN QUERY
  SELECT
    ml.id,
    ml.product_name,
    ml.category,
    ml.unit,
    1 - (ml.embedding <=> query_embedding) as similarity
  FROM master_list ml
  WHERE ml.embedding IS NOT NULL
    AND 1 - (ml.embedding <=> query_embedding) >= match_threshold
  ORDER BY ml.embedding <=> query_embedding
  LIMIT match_count;
END;
$;

-- Grant execute permission
GRANT EXECUTE ON FUNCTION match_master_list_products(vector, float, int) TO authenticated;
GRANT EXECUTE ON FUNCTION match_master_list_products(vector, float, int) TO anon;

-- ===================================================================
-- FUNCTION 4: match_products_across_all_suppliers
-- ===================================================================
-- Purpose: Search supplier_mapped_products across ALL suppliers (no filter)
-- Used by: Future feature - finding product availability across suppliers
-- ===================================================================

CREATE OR REPLACE FUNCTION match_products_across_all_suppliers(
  query_embedding vector(1536),
  match_threshold float DEFAULT 0.7,
  match_count int DEFAULT 10
)
RETURNS TABLE (
  id int,
  product_name varchar,
  price numeric,
  unit varchar,
  supplier_id int,
  supplier_name varchar,
  master_list_product_id int,
  similarity float
)
LANGUAGE plpgsql
AS $
BEGIN
  RETURN QUERY
  SELECT
    smp.id,
    smp.product_name,
    smp.price,
    smp.unit,
    smp.supplier_id,
    s.company_name as supplier_name,
    smp.master_list_product_id,
    1 - (smp.embedding <=> query_embedding) as similarity
  FROM supplier_mapped_products smp
  JOIN suppliers s ON smp.supplier_id = s.id
  WHERE smp.embedding IS NOT NULL
    AND s.is_active = TRUE
    AND 1 - (smp.embedding <=> query_embedding) >= match_threshold
  ORDER BY smp.embedding <=> query_embedding
  LIMIT match_count;
END;
$;

-- Grant execute permission
GRANT EXECUTE ON FUNCTION match_products_across_all_suppliers(vector, float, int) TO authenticated;
GRANT EXECUTE ON FUNCTION match_products_across_all_suppliers(vector, float, int) TO anon;

-- ===================================================================
-- VERIFICATION QUERIES
-- ===================================================================
-- Run these to verify functions were created successfully
-- ===================================================================

-- Check if functions exist
SELECT routine_name, routine_type
FROM information_schema.routines
WHERE routine_schema = 'public'
  AND routine_name IN (
    'match_suppliers_by_name',
    'match_supplier_products',
    'match_master_list_products',
    'match_products_across_all_suppliers'
  );

-- ===================================================================
-- TEST QUERIES (Optional - for debugging)
-- ===================================================================

-- Test 1: Search suppliers by name
-- (Replace [...] with actual embedding vector)
/*
SELECT * FROM match_suppliers_by_name(
  '[0.1, 0.2, ...]'::vector(1536),
  0.7,
  5
);
*/

-- Test 2: Search supplier products
-- (Replace supplier_id and embedding)
/*
SELECT * FROM match_supplier_products(
  '[0.1, 0.2, ...]'::vector(1536),
  5,  -- supplier_id
  0.7,
  3
);
*/

-- Test 3: Search master list
-- (Replace embedding)
/*
SELECT * FROM match_master_list_products(
  '[0.1, 0.2, ...]'::vector(1536),
  0.65,
  5
);
*/

-- ===================================================================
-- NOTES
-- ===================================================================

/*
1. **Vector Dimensions:**
   All embeddings use 1536 dimensions (OpenAI text-embedding-3-small)

2. **Similarity Metric:**
   Uses cosine distance operator: <=>
   Formula: 1 - (embedding <=> query_embedding)
   Result: Higher = more similar (0 to 1 scale)

3. **Thresholds:**
   - Suppliers: 0.7 (70% minimum)
   - Products: 0.7 (70% minimum)
   - Master list: 0.65 (65% for proposals)

4. **Performance:**
   - Indexes on embedding columns recommended
   - Use LIMIT to prevent large result sets
   - Filter by is_active where applicable

5. **Permissions:**
   - Granted to both 'authenticated' and 'anon' roles
   - Adjust based on your Supabase RLS policies

6. **Dependencies:**
   These functions require that the following columns have embeddings:
   - suppliers.name_embedding
   - supplier_mapped_products.embedding
   - master_list.embedding

   If embeddings are missing, results will be empty.
   Use the embedding generation workflow to populate them.
*/

-- ===================================================================
-- OPTIONAL: Create indexes for better performance
-- ===================================================================

-- Index for supplier name embeddings
CREATE INDEX IF NOT EXISTS idx_suppliers_name_embedding
ON suppliers USING ivfflat (name_embedding vector_cosine_ops)
WITH (lists = 100);

-- Index for supplier_mapped_products embeddings
CREATE INDEX IF NOT EXISTS idx_supplier_mapped_products_embedding
ON supplier_mapped_products USING ivfflat (embedding vector_cosine_ops)
WITH (lists = 100);

-- Index for master_list embeddings
CREATE INDEX IF NOT EXISTS idx_master_list_embedding
ON master_list USING ivfflat (embedding vector_cosine_ops)
WITH (lists = 100);

-- Composite indexes for filtered searches
CREATE INDEX IF NOT EXISTS idx_supplier_mapped_products_supplier_id
ON supplier_mapped_products(supplier_id)
WHERE embedding IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_suppliers_active_with_embedding
ON suppliers(is_active)
WHERE name_embedding IS NOT NULL;

-- ===================================================================
-- EXECUTION INSTRUCTIONS
-- ===================================================================

/*
HOW TO EXECUTE:

1. **Via Supabase Dashboard:**
   - Go to SQL Editor
   - Copy this entire file
   - Click "Run"
   - Check for success messages

2. **Via psql:**
   psql "postgresql://[connection_string]" -f database/supabase_rpc_functions.sql

3. **Via n8n Code node:**
   const { error } = await $supabase.rpc('exec_sql', {
     sql: [content of this file]
   });

VERIFICATION:
After execution, run the verification query above to confirm
all 4 functions were created successfully.
*/
