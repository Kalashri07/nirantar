import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { LoginPage } from './LoginPage';
import { SignupPage } from './SignupPage';
import { BookOpen, Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, loading } = useAuth();
  const [authView, setAuthView] = useState<'login' | 'signup'>('login');

  // 1. Initial Session Verification Screen (Prevents flickering)
  if (loading) {
    return (
      <div className="min-h-screen bg-[#F3EBDD] text-[#102A43] flex flex-col items-center justify-center p-4">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="w-14 h-14 rounded-2xl bg-[#102A43] text-[#F3EBDD] flex items-center justify-center shadow-md animate-pulse">
            <BookOpen className="w-7 h-7" />
          </div>
          <div className="space-y-1">
            <h2 className="text-lg font-bold tracking-tight text-[#102A43]">Nirantar</h2>
            <p className="text-xs text-[#675E54]">Verifying secure learning session...</p>
          </div>
          <Loader2 className="w-5 h-5 text-[#102A43] animate-spin mt-2" />
        </div>
      </div>
    );
  }

  // 2. Unauthenticated Gate
  if (!user) {
    if (authView === 'signup') {
      return <SignupPage onSwitchToLogin={() => setAuthView('login')} />;
    }
    return <LoginPage onSwitchToSignup={() => setAuthView('signup')} />;
  }

  // 3. Authenticated Access to Main Nirantar Experience
  return <>{children}</>;
};
