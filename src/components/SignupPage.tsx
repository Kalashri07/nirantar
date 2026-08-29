import React, { useState } from 'react';
import { BookOpen, Eye, EyeOff, ArrowRight, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';

interface SignupPageProps {
  onSwitchToLogin: () => void;
}

export const SignupPage: React.FC<SignupPageProps> = ({ onSwitchToLogin }) => {
  const { signUp, isConfigured } = useAuth();
  const { language, setLanguage, t, connectivityMode } = useApp();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const isOffline = connectivityMode === 'offline';

  const validateForm = (): boolean => {
    if (!fullName.trim()) {
      setErrorMessage('Please enter your full name.');
      return false;
    }
    if (!email.trim()) {
      setErrorMessage('Please enter your email address.');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setErrorMessage('Please enter a valid email address.');
      return false;
    }
    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters long.');
      return false;
    }
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match. Please re-enter.');
      return false;
    }
    return true;
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (isOffline) {
      setErrorMessage('Creating an account requires an active internet connection.');
      return;
    }

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const res = await signUp({
        name: fullName.trim(),
        email: email.trim(),
        password,
      });

      if (res.error) {
        setErrorMessage(res.error);
      } else {
        setSuccessMessage('Account created successfully! You can now sign in or continue.');
      }
    } catch (err: any) {
      setErrorMessage(err?.message || 'An unexpected error occurred during registration.');
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

      {/* Main Registration Card */}
      <main className="max-w-md w-full mx-auto my-6">
        <div className="bg-[#FAF6EF] border border-[#D8CABA] rounded-2xl p-6 sm:p-8 shadow-xs space-y-5">
          {/* Title Area */}
          <div className="text-center space-y-1.5">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-[#102A43] text-white mb-2 shadow-xs">
              <BookOpen className="w-6 h-6 text-[#F3EBDD]" />
            </div>
            <h1 className="text-2xl font-black tracking-tight text-[#102A43]">
              Create Your Account
            </h1>
            <p className="text-xs text-[#675E54]">
              Join Nirantar and start learning with resilient offline progress.
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

          {/* Registration Form */}
          <form onSubmit={handleSignup} className="space-y-3.5">
            {/* Full Name */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-[#102A43] block">
                Full Name
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. Rahul Sharma"
                className="w-full bg-[#E9DDCB] border border-[#D8CABA] rounded-xl px-3.5 py-2.5 text-xs text-[#102A43] placeholder-[#8C8275] focus:outline-none focus:border-[#102A43] transition-colors"
              />
            </div>

            {/* Email */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-[#102A43] block">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full bg-[#E9DDCB] border border-[#D8CABA] rounded-xl px-3.5 py-2.5 text-xs text-[#102A43] placeholder-[#8C8275] focus:outline-none focus:border-[#102A43] transition-colors"
              />
            </div>

            {/* Password */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-[#102A43] block">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  className="w-full bg-[#E9DDCB] border border-[#D8CABA] rounded-xl pl-3.5 pr-10 py-2.5 text-xs text-[#102A43] placeholder-[#8C8275] focus:outline-none focus:border-[#102A43] transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#675E54] hover:text-[#102A43]"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-[#102A43] block">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter your password"
                  className="w-full bg-[#E9DDCB] border border-[#D8CABA] rounded-xl pl-3.5 pr-10 py-2.5 text-xs text-[#102A43] placeholder-[#8C8275] focus:outline-none focus:border-[#102A43] transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#675E54] hover:text-[#102A43]"
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-[#102A43] hover:bg-[#0C1F33] disabled:opacity-50 active:scale-95 text-white text-xs font-bold rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer mt-3"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Creating Account...</span>
                </>
              ) : (
                <>
                  <span>Create Account</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>

          {/* Switch to Login */}
          <div className="pt-3 border-t border-[#D8CABA] text-center space-y-2 text-xs">
            <span className="text-[#675E54] block">
              Already have an account?
            </span>
            <button
              type="button"
              onClick={onSwitchToLogin}
              className="w-full py-2.5 bg-[#E9DDCB] hover:bg-[#E2D4BF] text-[#102A43] font-bold text-xs rounded-xl border border-[#D8CABA] transition-colors cursor-pointer"
            >
              Sign In
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
