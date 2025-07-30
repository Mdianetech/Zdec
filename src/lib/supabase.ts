import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://newbrain-7955f.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'demo-key';

// Vérifier si les variables d'environnement sont configurées
export const isSupabaseConfigured = () => {
  return import.meta.env.VITE_SUPABASE_URL && 
         import.meta.env.VITE_SUPABASE_ANON_KEY &&
         import.meta.env.VITE_SUPABASE_URL !== 'https://newbrain-7955f.supabase.co' &&
         import.meta.env.VITE_SUPABASE_ANON_KEY !== 'demo-key';
};

if (!isSupabaseConfigured()) {
  console.warn('Supabase non configuré - Mode démonstration activé');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);