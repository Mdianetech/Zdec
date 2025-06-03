/*
  # Create tables for team members and projects

  1. New Tables
    - `team_members`
      - `id` (uuid, primary key)
      - `name` (text)
      - `role` (text) 
      - `description` (text)
      - `image_url` (text)
      - `linkedin_url` (text)
      - `crop_position_x` (integer)
      - `crop_position_y` (integer)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `projects`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `date` (date)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

    - `project_content`
      - `id` (uuid, primary key)
      - `project_id` (uuid, foreign key)
      - `type` (text)
      - `content` (text)
      - `order` (integer)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create team_members table
CREATE TABLE IF NOT EXISTS team_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  role text NOT NULL,
  description text,
  image_url text,
  linkedin_url text,
  crop_position_x integer DEFAULT 50,
  crop_position_y integer DEFAULT 50,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  date date DEFAULT CURRENT_DATE,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create project_content table
CREATE TABLE IF NOT EXISTS project_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid REFERENCES projects(id) ON DELETE CASCADE,
  type text NOT NULL,
  content text NOT NULL,
  "order" integer NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_content ENABLE ROW LEVEL SECURITY;

-- Create policies for team_members
CREATE POLICY "Allow public read access to team_members"
  ON team_members
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow authenticated users to manage team_members"
  ON team_members
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create policies for projects
CREATE POLICY "Allow public read access to projects"
  ON projects
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow authenticated users to manage projects"
  ON projects
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create policies for project_content
CREATE POLICY "Allow public read access to project_content"
  ON project_content
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow authenticated users to manage project_content"
  ON project_content
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Insert initial team members
INSERT INTO team_members (name, role, description, image_url, linkedin_url, crop_position_x, crop_position_y)
VALUES 
  (
    'AZZOUZ MOUFID',
    'Président',
    'Expert en installations électriques avec plus de 15 ans d''expérience dans le secteur.',
    '/Photo Moufid (1).jpg',
    'https://www.linkedin.com/in/azzouz-moufid',
    50,
    50
  ),
  (
    'Rami Bouchedda',
    'Directeur des Relations',
    'Spécialiste des relations clients et de la coordination des projets.',
    '/files_2655144-1748866352955-files_2655144-1748866279307-1W9A4080.jpg',
    'https://www.linkedin.com/in/rami-bouchedda-7b03a318a/',
    50,
    30
  );