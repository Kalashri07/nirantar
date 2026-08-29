import React, { createContext, useContext, useState, useEffect } from 'react';
import type { User, Session } from '@supabase/supabase-js';
import { authService, SignUpParams, SignInParams, AuthResponse } from '../services/authService';
import { isSupabaseConfigured } from '../lib/supabase';

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

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;

    // 1. Initial Session Check on App Startup
    async function initializeAuth() {
      try {
        const initialSession = await authService.getSession();
        if (isMounted) {
          setSession(initialSession);
          setUser(initialSession?.user || null);
          setLoading(false);
        }
      } catch (err) {
        console.error('Failed to initialize Supabase session:', err);
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    initializeAuth();

    // 2. Listen to real-time auth state changes
    const subscription = authService.onAuthStateChange((_event, newSession) => {
      if (isMounted) {
        setSession(newSession);
        setUser(newSession?.user || null);
        setLoading(false);
      }
    });

    return () => {
      isMounted = false;
      subscription?.unsubscribe();
    };
  }, []);

  const signUp = async (params: SignUpParams): Promise<AuthResponse> => {
    const res = await authService.signUp(params);
    if (res.session) {
      setSession(res.session);
      setUser(res.user);
    }
    return res;
  };

  const signIn = async (params: SignInParams): Promise<AuthResponse> => {
    const res = await authService.signIn(params);
    if (res.session) {
      setSession(res.session);
      setUser(res.user);
    }
    return res;
  };

  const signOut = async (): Promise<void> => {
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
        isConfigured: isSupabaseConfigured,
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
