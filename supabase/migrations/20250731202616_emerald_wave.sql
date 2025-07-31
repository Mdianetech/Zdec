/*
  # Add category column to projects table

  1. Changes
    - Add `category` column to `projects` table with default value
    - Update existing records to have a default category
    - Add check constraint for valid categories

  2. Security
    - No changes to existing RLS policies needed
*/

-- Add category column to projects table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'projects' AND column_name = 'category'
  ) THEN
    ALTER TABLE projects ADD COLUMN category text DEFAULT 'electrical';
  END IF;
END $$;

-- Add check constraint for valid categories
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.check_constraints
    WHERE constraint_name = 'projects_category_check'
  ) THEN
    ALTER TABLE projects ADD CONSTRAINT projects_category_check 
    CHECK (category IN ('electrical', 'irve', 'domotique', 'network'));
  END IF;
END $$;