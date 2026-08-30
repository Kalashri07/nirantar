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
  mfaRequired?: boolean;
  factorId?: string;
}

export interface MFAEnrollResponse {
  factorId: string | null;
  qrCode: string | null;
  secret: string | null;
  uri: string | null;
  error: string | null;
}

const LOCAL_SESSION_KEY = 'nirantar_auth_session_v1';
const LOCAL_MFA_KEY = 'nirantar_local_mfa_factors_v1';

/**
 * Official Supabase Authentication Service with Multi-Factor Authentication (MFA / TOTP)
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

      if (data.user && data.user.identities && data.user.identities.length === 0) {
        return {
          user: null,
          session: null,
          error: 'An account with this email already exists. Please sign in.',
        };
      }

      if (data.session) {
        localStorage.setItem(LOCAL_SESSION_KEY, JSON.stringify(data.session));
      } else {
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
   * Signs in with password and checks if MFA verification is required
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

      if (data.user && data.session) {
        // Check if MFA (TOTP) is enrolled for this user
        try {
          const { data: factorsData } = await supabase.auth.mfa.listFactors();
          const verifiedFactors = factorsData?.totp?.filter((f) => f.status === 'verified') || [];

          if (verifiedFactors.length > 0) {
            const { data: aalData } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel();
            if (aalData?.nextLevel === 'aal2' && aalData?.currentLevel !== 'aal2') {
              return {
                user: data.user,
                session: null, // Gate session until 2FA code is entered
                mfaRequired: true,
                factorId: verifiedFactors[0].id,
                error: null,
              };
            }
          }
        } catch (mfaErr) {
          console.warn('MFA factor check note:', mfaErr);
        }

        // Standard login when MFA is not active
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
   * Enrolls a new TOTP Multi-Factor Authentication factor with Supabase
   */
  async enrollMFA(): Promise<MFAEnrollResponse> {
    if (!isSupabaseConfigured) {
      return {
        factorId: null,
        qrCode: null,
        secret: null,
        uri: null,
        error: 'Supabase is not configured.',
      };
    }

    try {
      const { data, error } = await supabase.auth.mfa.enroll({
        factorType: 'totp',
        issuer: 'Nirantar',
      });

      if (error) {
        return {
          factorId: null,
          qrCode: null,
          secret: null,
          uri: null,
          error: error.message,
        };
      }

      return {
        factorId: data.id,
        qrCode: data.totp.qr_code,
        secret: data.totp.secret,
        uri: data.totp.uri,
        error: null,
      };
    } catch (err: any) {
      return {
        factorId: null,
        qrCode: null,
        secret: null,
        uri: null,
        error: err?.message || 'Failed to initialize MFA enrollment.',
      };
    }
  },

  /**
   * Verifies and activates newly enrolled TOTP factor
   */
  async verifyMFAEnrollment(factorId: string, code: string): Promise<{ success: boolean; error: string | null }> {
    const cleanCode = code.trim().replace(/\s+/g, '');
    if (cleanCode.length !== 6 || !/^\d{6}$/.test(cleanCode)) {
      return { success: false, error: 'Please enter a valid 6-digit verification code.' };
    }

    if (!isSupabaseConfigured) {
      return { success: false, error: 'Supabase is not configured.' };
    }

    try {
      const { data, error } = await supabase.auth.mfa.challengeAndVerify({
        factorId,
        code: cleanCode,
      });

      if (error) {
        return { success: false, error: error.message || 'Invalid verification code. Please check your authenticator app.' };
      }

      // Sync active session if upgraded
      const { data: sessionData } = await supabase.auth.getSession();
      if (sessionData?.session) {
        localStorage.setItem(LOCAL_SESSION_KEY, JSON.stringify(sessionData.session));
      }

      return { success: true, error: null };
    } catch (err: any) {
      return {
        success: false,
        error: err?.message || 'Failed to verify MFA code.',
      };
    }
  },

  /**
   * Verifies MFA during login flow and unlocks session
   */
  async verifyMFALogin(factorId: string, code: string): Promise<AuthResponse> {
    const cleanCode = code.trim().replace(/\s+/g, '');
    if (cleanCode.length !== 6 || !/^\d{6}$/.test(cleanCode)) {
      return { user: null, session: null, error: 'Please enter the 6-digit code from your authenticator app.' };
    }

    if (!isSupabaseConfigured) {
      return { user: null, session: null, error: 'Supabase is not configured.' };
    }

    try {
      const { data, error } = await supabase.auth.mfa.challengeAndVerify({
        factorId,
        code: cleanCode,
      });

      if (error) {
        return { user: null, session: null, error: 'Invalid authenticator code. Please check your app and try again.' };
      }

      const { data: sessionData } = await supabase.auth.getSession();
      const activeSession = sessionData?.session || null;
      const activeUser = activeSession?.user || null;

      if (activeSession) {
        localStorage.setItem(LOCAL_SESSION_KEY, JSON.stringify(activeSession));
      }

      return {
        user: activeUser,
        session: activeSession,
        error: null,
      };
    } catch (err: any) {
      return {
        user: null,
        session: null,
        error: err?.message || 'An error occurred during MFA verification.',
      };
    }
  },

  /**
   * Lists all MFA factors for current user
   */
  async listMFAFactors(): Promise<{ factors: any[]; isMFAEnabled: boolean; primaryFactorId?: string; error: string | null }> {
    if (!isSupabaseConfigured) {
      return { factors: [], isMFAEnabled: false, error: null };
    }

    try {
      const { data, error } = await supabase.auth.mfa.listFactors();
      if (error) {
        return { factors: [], isMFAEnabled: false, error: error.message };
      }

      const verified = data?.totp?.filter((f) => f.status === 'verified') || [];
      return {
        factors: data?.all || [],
        isMFAEnabled: verified.length > 0,
        primaryFactorId: verified[0]?.id,
        error: null,
      };
    } catch (err: any) {
      return {
        factors: [],
        isMFAEnabled: false,
        error: err?.message || 'Failed to list MFA factors.',
      };
    }
  },

  /**
   * Unenrolls/disables MFA factor
   */
  async unenrollMFA(factorId: string): Promise<{ success: boolean; error: string | null }> {
    if (!isSupabaseConfigured) {
      return { success: false, error: 'Supabase is not configured.' };
    }

    try {
      const { error } = await supabase.auth.mfa.unenroll({ factorId });
      if (error) {
        return { success: false, error: error.message };
      }
      return { success: true, error: null };
    } catch (err: any) {
      return { success: false, error: err?.message || 'Failed to disable MFA.' };
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
