/*
  # Fix RLS policies for anonymous access

  1. Security Updates
    - Update RLS policies to allow anonymous users to insert/update data
    - This enables the demo functionality to work without authentication
    - Maintains read access for public users
    - Allows authenticated users full access

  2. Policy Changes
    - Allow anonymous users to manage projects and project_content
    - Keep existing public read access
    - Maintain authenticated user privileges
*/

-- Drop existing restrictive policies
DROP POLICY IF EXISTS "Allow authenticated users to manage projects" ON projects;
DROP POLICY IF EXISTS "Allow authenticated users to manage project_content" ON project_content;

-- Create new policies that allow anonymous access for demo purposes
CREATE POLICY "Allow public access to manage projects"
  ON projects
  FOR ALL
  TO public
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow public access to manage project_content"
  ON project_content
  FOR ALL
  TO public
  USING (true)
  WITH CHECK (true);

-- Keep existing read policies (they're already permissive)
-- The "Allow public read access" policies should already exist and work fine