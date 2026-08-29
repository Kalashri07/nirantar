import React, { useState } from 'react';
import {
  BookOpen,
  Eye,
  EyeOff,
  WifiOff,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const LoginPage: React.FC = () => {
  const {
    language,
    setLanguage,
    connectivityMode,
    loginUser,
    hasPreviouslyLoggedIn,
    t,
  } = useApp();

  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const isOffline = connectivityMode === 'offline';

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // If offline and user hasn't logged in before on this device
    if (isOffline && !hasPreviouslyLoggedIn) {
      setErrorMessage(t.login.firstTimeOfflineError);
      return;
    }

    if (!emailOrUsername.trim()) {
      setErrorMessage('Please enter your email or username.');
      return;
    }

    if (!password.trim()) {
      setErrorMessage('Please enter your password.');
      return;
    }

    loginUser(emailOrUsername);
  };

  const handleDemoLogin = () => {
    setEmailOrUsername('demo@nirantar.app');
    setPassword('demo123');
    setSuccessMessage('Logging in with Demo Account...');
    setTimeout(() => {
      loginUser('Learner');
    }, 400);
  };

  const handleContinueOffline = () => {
    loginUser();
  };

  const handleCreateAccount = () => {
    if (isOffline) {
      setErrorMessage(t.login.firstTimeOfflineError);
      return;
    }
    // Quick demo account creation
    if (emailOrUsername.trim()) {
      loginUser(emailOrUsername);
    } else {
      loginUser('Student');
    }
  };

  return (
    <div className="min-h-screen bg-[#F3EBDD] text-[#102A43] flex flex-col justify-between p-4 sm:p-6 md:p-8">
      {/* Top Header: Language Switcher */}
      <header className="flex items-center justify-between max-w-5xl w-full mx-auto">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-[#102A43] text-white flex items-center justify-center font-bold shadow-2xs">
            <BookOpen className="w-4 h-4" />
          </div>
          <span className="text-base font-bold text-[#102A43] tracking-tight">
            Nirantar
          </span>
        </div>

        {/* Multilingual Selector */}
        <div className="flex items-center bg-[#E9DDCB] border border-[#D8CABA] rounded-lg p-0.5 shadow-2xs">
          <button
            onClick={() => setLanguage('en')}
            className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
              language === 'en'
                ? 'bg-[#C9B69C] text-[#102A43] font-bold shadow-2xs'
                : 'text-[#675E54] hover:text-[#102A43]'
            }`}
          >
            EN
          </button>
          <button
            onClick={() => setLanguage('mr')}
            className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
              language === 'mr'
                ? 'bg-[#C9B69C] text-[#102A43] font-bold shadow-2xs'
                : 'text-[#675E54] hover:text-[#102A43]'
            }`}
          >
            मराठी
          </button>
          <button
            onClick={() => setLanguage('hi')}
            className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
              language === 'hi'
                ? 'bg-[#C9B69C] text-[#102A43] font-bold shadow-2xs'
                : 'text-[#675E54] hover:text-[#102A43]'
            }`}
          >
            हिंदी
          </button>
        </div>
      </header>

      {/* Center Main Login Card */}
      <main className="w-full max-w-md mx-auto my-auto py-6">
        <div className="bg-[#FAF6EF] border border-[#D8CABA] rounded-2xl p-6 sm:p-8 shadow-md space-y-6">
          
          {/* Brand Header */}
          <div className="text-center space-y-1.5">
            <div className="w-12 h-12 rounded-2xl bg-[#102A43] text-white flex items-center justify-center mx-auto shadow-xs">
              <BookOpen className="w-6 h-6" />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#102A43]">
              NIRANTAR
            </h1>
            <p className="text-xs text-[#675E54] max-w-xs mx-auto leading-relaxed">
              {t.tagline}
            </p>
          </div>

          {/* Offline Status Alert if offline */}
          {isOffline && (
            <div className="bg-[#F9E2E2] border border-[#EBB6B6] rounded-xl p-3.5 space-y-2 text-xs text-[#782323]">
              <div className="flex items-center gap-2 font-bold">
                <WifiOff className="w-4 h-4 text-[#9B3333] flex-shrink-0" />
                <span>{t.login.offlineTitle}</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                {hasPreviouslyLoggedIn
                  ? t.login.offlineDesc
                  : t.login.firstTimeOfflineError}
              </p>

              {hasPreviouslyLoggedIn && (
                <button
                  type="button"
                  onClick={handleContinueOffline}
                  className="w-full py-2 bg-[#102A43] hover:bg-[#0C1F33] text-white text-xs font-bold rounded-lg shadow-2xs transition-colors mt-1"
                >
                  {t.login.continueOfflineBtn} →
                </button>
              )}
            </div>
          )}

          {/* Error message banner */}
          {errorMessage && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-xl">
              {errorMessage}
            </div>
          )}

          {/* Success message banner */}
          {successMessage && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold rounded-xl flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* Main Login Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#102A43] block">
                {t.login.emailLabel}
              </label>
              <input
                type="text"
                value={emailOrUsername}
                onChange={(e) => setEmailOrUsername(e.target.value)}
                placeholder={t.login.emailPlaceholder}
                className="w-full bg-[#E9DDCB] border border-[#D8CABA] rounded-xl px-3.5 py-2.5 text-xs text-[#102A43] placeholder-[#8C8275] focus:outline-none focus:border-[#102A43] transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-[#102A43]">
                  {t.login.passwordLabel}
                </label>
                <button
                  type="button"
                  onClick={() => alert('Demo prototype: Use password "demo123" or click Login with Demo Account.')}
                  className="text-[11px] text-[#675E54] hover:text-[#102A43]"
                >
                  {t.login.forgotPassword}
                </button>
              </div>

              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t.login.passwordPlaceholder}
                  className="w-full bg-[#E9DDCB] border border-[#D8CABA] rounded-xl pl-3.5 pr-10 py-2.5 text-xs text-[#102A43] placeholder-[#8C8275] focus:outline-none focus:border-[#102A43] transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#675E54] hover:text-[#102A43]"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#102A43] hover:bg-[#0C1F33] active:scale-95 text-white text-xs font-bold rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
            >
              <span>{t.login.loginBtn}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>

          {/* New User / Create Account Section */}
          <div className="pt-3 border-t border-[#D8CABA] text-center space-y-2 text-xs">
            <span className="text-[#675E54] block">
              {t.login.newToApp}
            </span>
            <button
              type="button"
              onClick={handleCreateAccount}
              className="w-full py-2 bg-[#E9DDCB] hover:bg-[#E2D4BF] text-[#102A43] font-bold text-xs rounded-xl border border-[#D8CABA] transition-colors"
            >
              {t.login.createAccount}
            </button>
          </div>

          {/* Demo Account Box */}
          <div className="p-3.5 bg-[#E9DDCB]/70 border border-[#D8CABA] rounded-xl text-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-[#102A43] uppercase tracking-wider text-[10px]">
                {t.login.demoAccountTitle}
              </span>
              <span className="text-[10px] text-[#675E54]">Instant Access</span>
            </div>

            <div className="text-[11px] text-[#675E54] font-mono space-y-0.5">
              <div>Username: <strong className="text-[#102A43]">demo@nirantar.app</strong></div>
              <div>Password: <strong className="text-[#102A43]">demo123</strong></div>
            </div>

            <button
              type="button"
              onClick={handleDemoLogin}
              className="w-full py-2 bg-[#102A43] hover:bg-[#0C1F33] text-white font-bold text-xs rounded-lg shadow-2xs transition-colors flex items-center justify-center gap-1.5 mt-1 cursor-pointer"
            >
              <Sparkles className="w-3 h-3" />
              <span>{t.login.demoBtn}</span>
            </button>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="text-center text-xs text-[#675E54] py-2">
        <p>Nirantar • Offline-first, multilingual learning platform</p>
      </footer>
    </div>
  );
};
