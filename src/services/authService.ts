import { supabase, isSupabaseConfigured } from '../lib/supabase';
import type { User, Session, AuthChangeEvent } from '@supabase/supabase-js';
import {
  isValidEmail,
  validatePassword,
  sanitizeInput,
  checkRateLimit,
  resetRateLimit,
  SECURITY_LIMITS,
} from '../utils/security';

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

const LOCAL_SESSION_KEY = 'nirantar_auth_session_v1';

/**
 * Official Supabase Authentication Service
 * Communicates directly with Supabase Auth API
 */
export const authService = {
  /**
   * Registers a new user account with Supabase Auth
   */
  async signUp({ name, email, password }: SignUpParams): Promise<AuthResponse> {
    const rateCheck = checkRateLimit('auth_signup', 6, 60000, 30000);
    if (!rateCheck.allowed) {
      return {
        user: null,
        session: null,
        error: `Too many registration attempts. Please wait ${rateCheck.waitSeconds} seconds before trying again.`,
      };
    }

    const sanitizedName = sanitizeInput(name, SECURITY_LIMITS.MAX_NAME_LENGTH);
    const normalizedEmail = email.trim().toLowerCase();

    if (!sanitizedName) {
      return { user: null, session: null, error: 'Please enter your full name.' };
    }

    if (!isValidEmail(normalizedEmail)) {
      return { user: null, session: null, error: 'Please enter a valid email address.' };
    }

    const passCheck = validatePassword(password);
    if (!passCheck.valid) {
      return { user: null, session: null, error: passCheck.error };
    }

    if (!isSupabaseConfigured) {
      return {
        user: null,
        session: null,
        error: 'Supabase configuration is missing. Please check your VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.',
      };
    }

    try {
      // Direct call to official Supabase Auth signup
      const { data, error } = await supabase.auth.signUp({
        email: normalizedEmail,
        password,
        options: {
          data: {
            full_name: sanitizedName,
            display_name: sanitizedName,
          },
        },
      });

      if (error) {
        return { user: null, session: null, error: error.message };
      }

      // If user already exists, Supabase returns empty identities array
      if (data.user && data.user.identities && data.user.identities.length === 0) {
        return {
          user: null,
          session: null,
          error: 'An account with this email already exists. Please sign in.',
        };
      }

      // If session is returned immediately (when Confirm Email is disabled in Supabase)
      if (data.session) {
        localStorage.setItem(LOCAL_SESSION_KEY, JSON.stringify(data.session));
      } else {
        // If email confirmation is required, attempt login or return user confirmation status
        const loginAttempt = await supabase.auth.signInWithPassword({
          email: normalizedEmail,
          password,
        });
        if (loginAttempt.data?.session) {
          localStorage.setItem(LOCAL_SESSION_KEY, JSON.stringify(loginAttempt.data.session));
          return {
            user: loginAttempt.data.user,
            session: loginAttempt.data.session,
            error: null,
          };
        }
      }

      resetRateLimit('auth_signup');
      return {
        user: data.user,
        session: data.session,
        error: null,
      };
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
    const normalizedEmail = email.trim().toLowerCase();

    if (!isValidEmail(normalizedEmail)) {
      return { user: null, session: null, error: 'Please enter a valid email address.' };
    }

    const passCheck = validatePassword(password);
    if (!passCheck.valid) {
      return { user: null, session: null, error: passCheck.error };
    }

    const rateCheck = checkRateLimit(`auth_signin_${normalizedEmail}`, 5, 60000, 30000);
    if (!rateCheck.allowed) {
      return {
        user: null,
        session: null,
        error: `Too many failed login attempts. Please wait ${rateCheck.waitSeconds} seconds before trying again.`,
      };
    }

    if (!isSupabaseConfigured) {
      return {
        user: null,
        session: null,
        error: 'Supabase configuration is missing. Please check your environment variables.',
      };
    }

    try {
      // Direct call to official Supabase Auth signin
      const { data, error } = await supabase.auth.signInWithPassword({
        email: normalizedEmail,
        password,
      });

      if (error) {
        if (error.message.toLowerCase().includes('email not confirmed')) {
          return {
            user: null,
            session: null,
            error: 'Email not confirmed. Please check your email inbox to confirm, or turn OFF "Confirm email" in Supabase Dashboard (Authentication → Providers → Email).',
          };
        }
        return { user: null, session: null, error: error.message };
      }

      if (data.session) {
        localStorage.setItem(LOCAL_SESSION_KEY, JSON.stringify(data.session));
      }

      resetRateLimit(`auth_signin_${normalizedEmail}`);
      return {
        user: data.user,
        session: data.session,
        error: null,
      };
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
    try {
      localStorage.removeItem(LOCAL_SESSION_KEY);
      if (isSupabaseConfigured) {
        await supabase.auth.signOut().catch(() => {});
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
    if (isSupabaseConfigured) {
      try {
        const { data } = await supabase.auth.getSession();
        if (data?.session) {
          localStorage.setItem(LOCAL_SESSION_KEY, JSON.stringify(data.session));
          return data.session;
        }
      } catch (err) {
        console.warn('Session retrieval notice:', err);
      }
    }

    try {
      const localData = localStorage.getItem(LOCAL_SESSION_KEY);
      if (localData) {
        const parsed = JSON.parse(localData);
        if (parsed?.user) return parsed as Session;
      }
    } catch (e) {}

    return null;
  },

  /**
   * Subscribes to real-time Supabase authentication state changes
   */
  onAuthStateChange(callback: (event: AuthChangeEvent, session: Session | null) => void) {
    if (!isSupabaseConfigured) {
      return { unsubscribe: () => {} };
    }
    try {
      const { data: { subscription } } = supabase.auth.onAuthStateChange(callback);
      return subscription;
    } catch (e) {
      return { unsubscribe: () => {} };
    }
  },
};
