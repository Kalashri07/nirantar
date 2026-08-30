import React, { createContext, useContext, useState, useEffect } from 'react';
import type { User, Session } from '@supabase/supabase-js';
import { authService, SignUpParams, SignInParams, AuthResponse } from '../services/authService';
import { isSupabaseConfigured } from '../lib/supabase';

const LOCAL_SESSION_KEY = 'nirantar_auth_session_v1';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  isConfigured: boolean;
  signUp: (params: SignUpParams) => Promise<AuthResponse>;
  signIn: (params: SignInParams) => Promise<AuthResponse>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function getInitialStoredSession(): { session: Session | null; user: User | null } {
  try {
    const raw = localStorage.getItem(LOCAL_SESSION_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed?.user) {
        return { session: parsed as Session, user: parsed.user as User };
      }
    }
  } catch (e) {
    console.error('Error reading stored session:', e);
  }
  return { session: null, user: null };
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Synchronous instant initialization from localStorage to prevent any logout on page refresh
  const initialData = getInitialStoredSession();
  const [session, setSession] = useState<Session | null>(initialData.session);
  const [user, setUser] = useState<User | null>(initialData.user);
  const [loading, setLoading] = useState<boolean>(!initialData.session);

  useEffect(() => {
    let isMounted = true;

    // 1. Re-verify or hydrate session asynchronously on startup
    async function hydrateSession() {
      try {
        const currentSession = await authService.getSession();
        if (isMounted) {
          if (currentSession) {
            setSession(currentSession);
            setUser(currentSession.user || null);
            localStorage.setItem(LOCAL_SESSION_KEY, JSON.stringify(currentSession));
          }
          setLoading(false);
        }
      } catch (err) {
        console.warn('Session hydration notice:', err);
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    hydrateSession();

    // 2. Real-time auth changes listener
    const subscription = authService.onAuthStateChange((event, newSession) => {
      if (!isMounted) return;

      if (event === 'SIGNED_IN' || (event === 'TOKEN_REFRESHED' && newSession)) {
        setSession(newSession);
        setUser(newSession?.user || null);
        if (newSession) {
          localStorage.setItem(LOCAL_SESSION_KEY, JSON.stringify(newSession));
        }
      } else if (event === 'USER_UPDATED' && newSession) {
        setSession(newSession);
        setUser(newSession.user || null);
        localStorage.setItem(LOCAL_SESSION_KEY, JSON.stringify(newSession));
      }
      // Note: We deliberately do NOT wipe local session on INITIAL_SESSION or network drop
      setLoading(false);
    });

    return () => {
      isMounted = false;
      subscription?.unsubscribe();
    };
  }, []);

  const signUp = async (params: SignUpParams): Promise<AuthResponse> => {
    const res = await authService.signUp(params);
    if (res.session && res.user) {
      setSession(res.session);
      setUser(res.user);
      localStorage.setItem(LOCAL_SESSION_KEY, JSON.stringify(res.session));
    }
    return res;
  };

  const signIn = async (params: SignInParams): Promise<AuthResponse> => {
    const res = await authService.signIn(params);
    if (res.session && res.user) {
      setSession(res.session);
      setUser(res.user);
      localStorage.setItem(LOCAL_SESSION_KEY, JSON.stringify(res.session));
    }
    return res;
  };

  const signOut = async (): Promise<void> => {
    localStorage.removeItem(LOCAL_SESSION_KEY);
    await authService.signOut();
    setUser(null);
    setSession(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        loading,
        isConfigured: true,
        signUp,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
