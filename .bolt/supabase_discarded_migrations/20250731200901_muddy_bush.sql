/*
  # Base de données de stockage pour les projets

  1. New Tables
    - `projects`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `date` (date)
      - `category` (text) - 'electrical', 'irve', 'domotique', 'network'
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

    - `project_content`
      - `id` (uuid, primary key)
      - `project_id` (uuid, foreign key)
      - `type` (text) - 'text', 'image', 'video'
      - `content` (text)
      - `order` (integer)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for public read access
    - Add policies for authenticated write access
*/

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  date date DEFAULT CURRENT_DATE,
  category text NOT NULL DEFAULT 'electrical' CHECK (category IN ('electrical', 'irve', 'domotique', 'network')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create project_content table
CREATE TABLE IF NOT EXISTS project_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid REFERENCES projects(id) ON DELETE CASCADE,
  type text NOT NULL CHECK (type IN ('text', 'image', 'video')),
  content text NOT NULL,
  "order" integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_content ENABLE ROW LEVEL SECURITY;

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

-- Insert demo projects
INSERT INTO projects (title, description, date, category) VALUES
  (
    'Installation électrique résidentielle',
    'Mise aux normes complète d''une installation électrique dans une maison individuelle',
    '2024-01-15',
    'electrical'
  ),
  (
    'Borne de recharge IRVE',
    'Installation d''une borne de recharge pour véhicule électrique',
    '2024-02-10',
    'irve'
  ),
  (
    'Système domotique intelligent',
    'Installation complète d''un système domotique pour maison connectée',
    '2024-03-05',
    'domotique'
  ),
  (
    'Réseau informatique entreprise',
    'Câblage structuré et installation réseau pour bureaux professionnels',
    '2024-03-20',
    'network'
  );

-- Insert demo content for first project (electrical)
INSERT INTO project_content (project_id, type, content, "order") 
SELECT 
  p.id,
  'text',
  'Installation complète du tableau électrique avec mise aux normes NF C 15-100',
  0
FROM projects p WHERE p.title = 'Installation électrique résidentielle';

INSERT INTO project_content (project_id, type, content, "order") 
SELECT 
  p.id,
  'image',
  '/1749721290289.jpeg',
  1
FROM projects p WHERE p.title = 'Installation électrique résidentielle';

INSERT INTO project_content (project_id, type, content, "order") 
SELECT 
  p.id,
  'image',
  '/1750071623260.jpeg',
  2
FROM projects p WHERE p.title = 'Installation électrique résidentielle';

-- Insert demo content for second project (IRVE)
INSERT INTO project_content (project_id, type, content, "order") 
SELECT 
  p.id,
  'text',
  'Installation certifiée IRVE d''une borne de recharge 22kW',
  0
FROM projects p WHERE p.title = 'Borne de recharge IRVE';

INSERT INTO project_content (project_id, type, content, "order") 
SELECT 
  p.id,
  'image',
  '/edf61b3d-67aa-467b-86c6-4fcb836ea43c.jpeg',
  1
FROM projects p WHERE p.title = 'Borne de recharge IRVE';

INSERT INTO project_content (project_id, type, content, "order") 
SELECT 
  p.id,
  'image',
  '/af7d00c0-ac68-4e24-94eb-fb3210a07c30.jpeg',
  2
FROM projects p WHERE p.title = 'Borne de recharge IRVE';

-- Insert demo content for third project (domotique)
INSERT INTO project_content (project_id, type, content, "order") 
SELECT 
  p.id,
  'text',
  'Système domotique complet avec contrôle éclairage, chauffage et sécurité',
  0
FROM projects p WHERE p.title = 'Système domotique intelligent';

INSERT INTO project_content (project_id, type, content, "order") 
SELECT 
  p.id,
  'image',
  '/1750010421911.jpeg',
  1
FROM projects p WHERE p.title = 'Système domotique intelligent';

-- Insert demo content for fourth project (network)
INSERT INTO project_content (project_id, type, content, "order") 
SELECT 
  p.id,
  'text',
  'Installation complète du réseau VDI avec certification',
  0
FROM projects p WHERE p.title = 'Réseau informatique entreprise';

INSERT INTO project_content (project_id, type, content, "order") 
SELECT 
  p.id,
  'image',
  'https://images.pexels.com/photos/2881232/pexels-photo-2881232.jpeg?auto=compress&cs=tinysrgb&w=1600',
  1
FROM projects p WHERE p.title = 'Réseau informatique entreprise';