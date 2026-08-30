import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Clean the base URL so it is strictly the root Supabase project URL (never has /rest/v1 or trailing slash)
const envUrl = import.meta.env.VITE_SUPABASE_URL || 'https://jeckykudsrxwwgyrzrdv.supabase.co';
const supabaseUrl = envUrl
  .trim()
  .replace(/\/rest\/v1\/?$/i, '')
  .replace(/\/+$/, '');

const supabaseAnonKey = (import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_gJ1Q99WLH6-jdrP7Sq9Jyg_eqm1y89H').trim();

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
  supabaseAnonKey &&
  !supabaseUrl.includes('placeholder')
);

// Initialize official Supabase client directly with clean root project URL
export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    storage: typeof window !== 'undefined' ? window.localStorage : undefined,
  },
});
