import React, { useState } from 'react';
import { BookOpen, Eye, EyeOff, WifiOff, ArrowRight, CheckCircle2, AlertCircle, Loader2, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';

interface LoginPageProps {
  onSwitchToSignup: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onSwitchToSignup }) => {
  const { signIn, verifyMFALogin, isConfigured } = useAuth();
  const { language, setLanguage, t, connectivityMode } = useApp();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  // MFA Challenge State
  const [isMfaStep, setIsMfaStep] = useState(false);
  const [mfaFactorId, setMfaFactorId] = useState<string | null>(null);
  const [mfaCode, setMfaCode] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const isOffline = connectivityMode === 'offline';

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (isOffline) {
      setErrorMessage('Initial sign-in requires an active internet connection.');
      return;
    }

    if (!email.trim()) {
      setErrorMessage('Please enter your email.');
      return;
    }

    if (!password.trim()) {
      setErrorMessage('Please enter your password.');
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await signIn({
        email: email.trim(),
        password,
      });

      if (res.error) {
        setErrorMessage(res.error);
      } else if (res.mfaRequired && res.factorId) {
        setIsMfaStep(true);
        setMfaFactorId(res.factorId);
        setErrorMessage(null);
        setSuccessMessage(null);
      } else {
        setSuccessMessage('Welcome back! Loading your dashboard...');
      }
    } catch (err: any) {
      setErrorMessage(err?.message || 'An unexpected error occurred during sign in.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerifyMfa = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!mfaFactorId) {
      setErrorMessage('MFA verification session expired. Please sign in again.');
      setIsMfaStep(false);
      return;
    }

    const cleanCode = mfaCode.trim().replace(/\s+/g, '');
    if (cleanCode.length !== 6) {
      setErrorMessage('Please enter a valid 6-digit authenticator code.');
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await verifyMFALogin(mfaFactorId, cleanCode);
      if (res.error) {
        setErrorMessage(res.error);
      } else {
        setSuccessMessage('MFA verified successfully! Loading your dashboard...');
      }
    } catch (err: any) {
      setErrorMessage(err?.message || 'Failed to verify authenticator code.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F3EBDD] text-[#102A43] flex flex-col justify-between p-4 sm:p-6 md:p-8">
      {/* Top Header: Brand & Language Switcher */}
      <header className="flex items-center justify-between max-w-5xl w-full mx-auto">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-[#102A43] text-white flex items-center justify-center font-bold shadow-2xs">
            <BookOpen className="w-4 h-4" />
          </div>
          <span className="text-base font-bold text-[#102A43] tracking-tight">
            Nirantar
          </span>
        </div>

        {/* Language selector */}
        <div className="flex items-center gap-1 bg-[#E9DDCB] p-1 rounded-xl border border-[#D8CABA]">
          {(['en', 'mr', 'hi'] as const).map((lang) => (
            <button
              key={lang}
              type="button"
              onClick={() => setLanguage(lang)}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                language === lang
                  ? 'bg-[#102A43] text-white shadow-2xs'
                  : 'text-[#675E54] hover:text-[#102A43]'
              }`}
            >
              {lang === 'en' ? 'EN' : lang === 'mr' ? 'मराठी' : 'हिंदी'}
            </button>
          ))}
        </div>
      </header>

      {/* Main Login Card */}
      <main className="max-w-md w-full mx-auto my-6">
        <div className="bg-[#FAF6EF] border border-[#D8CABA] rounded-2xl p-6 sm:p-8 shadow-xs space-y-5">
          {/* Welcoming Header */}
          <div className="text-center space-y-1.5">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-[#102A43] text-white mb-2 shadow-xs">
              {isMfaStep ? (
                <ShieldCheck className="w-6 h-6 text-[#F3EBDD]" />
              ) : (
                <BookOpen className="w-6 h-6 text-[#F3EBDD]" />
              )}
            </div>
            <h1 className="text-2xl font-black tracking-tight text-[#102A43]">
              {isMfaStep ? 'Two-Factor Authentication' : 'Welcome Back'}
            </h1>
            <p className="text-xs text-[#675E54] leading-relaxed">
              {isMfaStep
                ? 'Enter the 6-digit code from your authenticator app.'
                : "Learning that continues, even when connectivity doesn't."}
            </p>
          </div>

          {/* Config Missing Warning Banner */}
          {!isConfigured && (
            <div className="p-3.5 bg-amber-50 border border-amber-200 text-amber-800 text-xs rounded-xl flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
              <div className="text-[11px] leading-relaxed">
                <strong>Supabase credentials not detected:</strong> Please set <code className="font-mono bg-amber-100 px-1 py-0.5 rounded">VITE_SUPABASE_URL</code> and <code className="font-mono bg-amber-100 px-1 py-0.5 rounded">VITE_SUPABASE_ANON_KEY</code> in your environment.
              </div>
            </div>
          )}

          {/* Offline warning indicator */}
          {isOffline && (
            <div className="p-3 bg-amber-50 border border-amber-200 text-amber-900 rounded-xl space-y-1">
              <div className="flex items-center gap-2 font-bold text-xs">
                <WifiOff className="w-4 h-4 text-amber-700 flex-shrink-0" />
                <span>You are currently offline</span>
              </div>
              <p className="text-[11px] leading-relaxed text-amber-800">
                Signing in for the first time requires an internet connection. Once signed in, Nirantar stays fully accessible offline.
              </p>
            </div>
          )}

          {/* Error message banner */}
          {errorMessage && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-xl flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Success message banner */}
          {successMessage && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold rounded-xl flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* MFA TOTP Challenge Form */}
          {isMfaStep ? (
            <form onSubmit={handleVerifyMfa} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#102A43] block">
                  Authenticator Code (6 Digits)
                </label>
                <input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={6}
                  required
                  autoFocus
                  value={mfaCode}
                  onChange={(e) => {
                    setMfaCode(e.target.value.replace(/\D/g, '').slice(0, 6));
                    if (errorMessage) setErrorMessage(null);
                  }}
                  placeholder="000000"
                  className="w-full bg-[#E9DDCB] border border-[#D8CABA] rounded-xl px-3.5 py-3 text-center text-lg font-mono font-bold tracking-widest text-[#102A43] placeholder-[#8C8275] focus:outline-none focus:border-[#102A43] transition-colors"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting || mfaCode.length !== 6}
                className="w-full py-3 bg-[#102A43] hover:bg-[#0C1F33] disabled:opacity-50 active:scale-95 text-white text-xs font-bold rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Verifying Code...</span>
                  </>
                ) : (
                  <>
                    <span>Verify & Continue</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsMfaStep(false);
                  setMfaFactorId(null);
                  setMfaCode('');
                  setErrorMessage(null);
                }}
                className="w-full py-2.5 bg-[#E9DDCB] hover:bg-[#E2D4BF] text-[#102A43] font-bold text-xs rounded-xl border border-[#D8CABA] transition-colors cursor-pointer"
              >
                ← Back to Email & Password
              </button>
            </form>
          ) : (
            /* Standard Login Form */
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#102A43] block">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errorMessage) setErrorMessage(null);
                  }}
                  placeholder="Enter your email"
                  className="w-full bg-[#E9DDCB] border border-[#D8CABA] rounded-xl px-3.5 py-2.5 text-xs text-[#102A43] placeholder-[#8C8275] focus:outline-none focus:border-[#102A43] transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-[#102A43]">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => alert('Please contact your administrator or use Supabase password reset if enabled.')}
                    className="text-[11px] text-[#675E54] hover:text-[#102A43] cursor-pointer"
                  >
                    Forgot Password?
                  </button>
                </div>

                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (errorMessage) setErrorMessage(null);
                    }}
                    placeholder="Enter your password"
                    className="w-full bg-[#E9DDCB] border border-[#D8CABA] rounded-xl pl-3.5 pr-10 py-2.5 text-xs text-[#102A43] placeholder-[#8C8275] focus:outline-none focus:border-[#102A43] transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#675E54] hover:text-[#102A43] cursor-pointer"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember Me Checkbox */}
              <div className="flex items-center justify-between text-xs pt-0.5">
                <label className="flex items-center gap-2 cursor-pointer text-[#675E54]">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded border-[#D8CABA] text-[#102A43] focus:ring-0 cursor-pointer accent-[#102A43]"
                  />
                  <span>Remember me</span>
                </label>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-[#102A43] hover:bg-[#0C1F33] disabled:opacity-50 active:scale-95 text-white text-xs font-bold rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Signing In...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </form>
          )}

          {/* New User / Create Account Section */}
          {!isMfaStep && (
            <div className="pt-3 border-t border-[#D8CABA] text-center space-y-2 text-xs">
              <span className="text-[#675E54] block">
                Don't have an account?
              </span>
              <button
                type="button"
                onClick={onSwitchToSignup}
                className="w-full py-2.5 bg-[#E9DDCB] hover:bg-[#E2D4BF] text-[#102A43] font-bold text-xs rounded-xl border border-[#D8CABA] transition-colors cursor-pointer"
              >
                Create Account
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center text-xs text-[#675E54] py-2">
        <p>Nirantar • Offline-first, multilingual learning platform</p>
      </footer>
    </div>
  );
};
