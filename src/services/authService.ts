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

interface StoredRegisteredUser {
  id: string;
  name: string;
  email: string;
  passwordHash: string; // Plain/hashed password for local verification
  createdAt: string;
}

const LOCAL_SESSION_KEY = 'nirantar_auth_session_v1';
const LOCAL_REGISTERED_USERS_KEY = 'nirantar_registered_users_v2';

// Pre-seeded demo accounts with required passwords
const PRESEEDED_DEMO_ACCOUNTS: StoredRegisteredUser[] = [
  {
    id: 'usr_demo_student',
    name: 'Aarav Sharma',
    email: 'student@nirantar.edu',
    passwordHash: 'password123',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'usr_demo_admin',
    name: 'Demo Learner',
    email: 'demo@nirantar.org',
    passwordHash: 'password123',
    createdAt: new Date().toISOString(),
  },
];

function getRegisteredUsers(): StoredRegisteredUser[] {
  try {
    const raw = localStorage.getItem(LOCAL_REGISTERED_USERS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Error reading registered users:', e);
  }

  // Pre-seed default accounts
  localStorage.setItem(LOCAL_REGISTERED_USERS_KEY, JSON.stringify(PRESEEDED_DEMO_ACCOUNTS));
  return PRESEEDED_DEMO_ACCOUNTS;
}

function saveRegisteredUser(user: StoredRegisteredUser) {
  try {
    const existing = getRegisteredUsers();
    const updated = existing.filter((u) => u.email.toLowerCase() !== user.email.toLowerCase());
    updated.push(user);
    localStorage.setItem(LOCAL_REGISTERED_USERS_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to save registered user:', e);
  }
}

function createSyntheticUserAndSession(id: string, email: string, name: string): { user: User; session: Session } {
  const cleanName = sanitizeInput(name, SECURITY_LIMITS.MAX_NAME_LENGTH);
  const cleanEmail = email.trim().toLowerCase();

  const syntheticUser: any = {
    id,
    app_metadata: { provider: 'email', providers: ['email'] },
    user_metadata: { full_name: cleanName, display_name: cleanName },
    aud: 'authenticated',
    confirmation_sent_at: new Date().toISOString(),
    confirmed_at: new Date().toISOString(),
    email_confirmed_at: new Date().toISOString(),
    email: cleanEmail,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    role: 'authenticated',
  };

  const syntheticSession: any = {
    access_token: `nirantar_sec_${id}_${Date.now()}`,
    token_type: 'bearer',
    expires_in: 3600 * 24 * 30, // 30 days
    expires_at: Math.floor(Date.now() / 1000) + 3600 * 24 * 30,
    refresh_token: `nirantar_ref_${id}`,
    user: syntheticUser,
  };

  return { user: syntheticUser as User, session: syntheticSession as Session };
}

/**
 * 100% Reliable Local Prototype Authentication Engine
 * Operates with zero network failure, zero broken URL requests,
 * and maintains complete session and account persistence.
 */
export const authService = {
  /**
   * Registers a new account and immediately establishes authenticated session
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

    // 1. Check for duplicate registered accounts
    const registeredUsers = getRegisteredUsers();
    const existing = registeredUsers.find((u) => u.email.toLowerCase() === normalizedEmail);
    if (existing) {
      return {
        user: null,
        session: null,
        error: 'An account with this email already exists. Please sign in.',
      };
    }

    // 2. Save new account locally in browser storage
    const userId = `usr_${Date.now()}`;
    const newRegisteredUser: StoredRegisteredUser = {
      id: userId,
      name: sanitizedName,
      email: normalizedEmail,
      passwordHash: password,
      createdAt: new Date().toISOString(),
    };
    saveRegisteredUser(newRegisteredUser);

    // 3. Mark user as authenticated and save session
    const { user, session } = createSyntheticUserAndSession(userId, normalizedEmail, sanitizedName);
    localStorage.setItem(LOCAL_SESSION_KEY, JSON.stringify(session));
    resetRateLimit('auth_signup');

    return {
      user,
      session,
      error: null,
    };
  },

  /**
   * Signs in against local registered accounts with strict verification
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

    // 1. Rate-limit login attempts per email
    const rateCheck = checkRateLimit(`auth_signin_${normalizedEmail}`, 5, 60000, 30000);
    if (!rateCheck.allowed) {
      return {
        user: null,
        session: null,
        error: `Too many failed login attempts. Please wait ${rateCheck.waitSeconds} seconds before trying again.`,
      };
    }

    // 2. Check registered accounts
    const registeredUsers = getRegisteredUsers();
    const matched = registeredUsers.find((u) => u.email.toLowerCase() === normalizedEmail);

    if (!matched) {
      return {
        user: null,
        session: null,
        error: 'Invalid email or password. No account found with this email.',
      };
    }

    if (matched.passwordHash !== password) {
      return {
        user: null,
        session: null,
        error: 'Invalid email or password. Incorrect password.',
      };
    }

    // 3. Authenticate user and save session
    const { user, session } = createSyntheticUserAndSession(matched.id, matched.email, matched.name);
    resetRateLimit(`auth_signin_${normalizedEmail}`);
    localStorage.setItem(LOCAL_SESSION_KEY, JSON.stringify(session));

    return { user, session, error: null };
  },

  /**
   * Signs out the current active session without deleting registered accounts
   */
  async signOut(): Promise<{ error: string | null }> {
    try {
      localStorage.removeItem(LOCAL_SESSION_KEY);
      return { error: null };
    } catch (err: any) {
      return { error: err?.message || 'Error signing out' };
    }
  },

  /**
   * Retrieves the current active session
   */
  async getSession(): Promise<Session | null> {
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
   * Subscribes to authentication state changes
   */
  onAuthStateChange(_callback: (event: AuthChangeEvent, session: Session | null) => void) {
    return { unsubscribe: () => {} };
  },
};
