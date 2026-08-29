import { supabase, isSupabaseConfigured } from '../lib/supabase';
import type { User, Session, AuthChangeEvent } from '@supabase/supabase-js';

export interface SignUpParams {
  name: string;
  email: string;
  password: string;
}

export interface SignInParams {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User | null;
  session: Session | null;
  error: string | null;
}

/**
 * Real Server-Backed Supabase Authentication Service
 */
export const authService = {
  /**
   * Registers a new user with Supabase Auth
   */
  async signUp({ name, email, password }: SignUpParams): Promise<AuthResponse> {
    if (!isSupabaseConfigured) {
      return {
        user: null,
        session: null,
        error: 'Supabase configuration is missing. Please check your VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.',
      };
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          data: {
            full_name: name.trim(),
            display_name: name.trim(),
          },
        },
      });

      if (error) {
        return { user: null, session: null, error: error.message };
      }

      return { user: data.user, session: data.session, error: null };
    } catch (err: any) {
      return {
        user: null,
        session: null,
        error: err?.message || 'An unexpected error occurred during registration.',
      };
    }
  },

  /**
   * Signs in an existing user with Supabase Auth
   */
  async signIn({ email, password }: SignInParams): Promise<AuthResponse> {
    if (!isSupabaseConfigured) {
      return {
        user: null,
        session: null,
        error: 'Supabase configuration is missing. Please check your VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.',
      };
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) {
        return { user: null, session: null, error: error.message };
      }

      return { user: data.user, session: data.session, error: null };
    } catch (err: any) {
      return {
        user: null,
        session: null,
        error: err?.message || 'An unexpected error occurred during sign in.',
      };
    }
  },

  /**
   * Signs out the current user session
   */
  async signOut(): Promise<{ error: string | null }> {
    if (!isSupabaseConfigured) {
      return { error: null };
    }

    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        return { error: error.message };
      }
      return { error: null };
    } catch (err: any) {
      return { error: err?.message || 'Error signing out' };
    }
  },

  /**
   * Retrieves the current Supabase session
   */
  async getSession(): Promise<Session | null> {
    if (!isSupabaseConfigured) return null;
    try {
      const { data } = await supabase.auth.getSession();
      return data.session;
    } catch (err) {
      console.error('Error fetching Supabase session:', err);
      return null;
    }
  },

  /**
   * Subscribes to Supabase authentication state changes
   */
  onAuthStateChange(callback: (event: AuthChangeEvent, session: Session | null) => void) {
    if (!isSupabaseConfigured) {
      return { unsubscribe: () => {} };
    }
    const { data: { subscription } } = supabase.auth.onAuthStateChange(callback);
    return subscription;
  },
};
