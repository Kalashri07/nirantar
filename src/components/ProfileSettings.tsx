import React, { useState, useEffect } from 'react';
import {
  User,
  GraduationCap,
  Globe,
  HardDrive,
  CheckCircle2,
  LogOut,
  ShieldCheck,
  ShieldAlert,
  Loader2,
  Copy,
  Key,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import { SUPPORTED_EDUCATION_LEVELS } from '../data/mockData';

export const ProfileSettings: React.FC = () => {
  const {
    userProfile,
    setUserProfile,
    language,
    setLanguage,
    pendingSyncQueue,
    resetAllDemoState,
    t,
  } = useApp();

  const { user, signOut, enrollMFA, verifyMFAEnrollment, listMFAFactors, unenrollMFA } = useAuth();

  // MFA State
  const [isMfaLoading, setIsMfaLoading] = useState(true);
  const [isMfaEnabled, setIsMfaEnabled] = useState(false);
  const [activeFactorId, setActiveFactorId] = useState<string | null>(null);

  // MFA Setup State
  const [isSettingUpMfa, setIsSettingUpMfa] = useState(false);
  const [enrollData, setEnrollData] = useState<{
    factorId: string | null;
    qrCode: string | null;
    secret: string | null;
  } | null>(null);
  const [mfaVerifyCode, setMfaVerifyCode] = useState('');
  const [mfaError, setMfaError] = useState<string | null>(null);
  const [mfaSuccess, setMfaSuccess] = useState<string | null>(null);
  const [isProcessingMfa, setIsProcessingMfa] = useState(false);

  useEffect(() => {
    async function loadMfaStatus() {
      try {
        setIsMfaLoading(true);
        const res = await listMFAFactors();
        setIsMfaEnabled(res.isMFAEnabled);
        if (res.primaryFactorId) {
          setActiveFactorId(res.primaryFactorId);
        }
      } catch (err) {
        console.warn('MFA check error:', err);
      } finally {
        setIsMfaLoading(false);
      }
    }
    loadMfaStatus();
  }, [listMFAFactors]);

  const handleStartMfaSetup = async () => {
    setMfaError(null);
    setMfaSuccess(null);
    setIsProcessingMfa(true);
    try {
      const res = await enrollMFA();
      if (res.error) {
        setMfaError(res.error);
      } else {
        setEnrollData({
          factorId: res.factorId,
          qrCode: res.qrCode,
          secret: res.secret,
        });
        setIsSettingUpMfa(true);
      }
    } catch (err: any) {
      setMfaError(err?.message || 'Failed to start MFA setup.');
    } finally {
      setIsProcessingMfa(false);
    }
  };

  const handleVerifyAndEnableMfa = async (e: React.FormEvent) => {
    e.preventDefault();
    setMfaError(null);
    setMfaSuccess(null);

    if (!enrollData?.factorId) return;
    const cleanCode = mfaVerifyCode.trim().replace(/\s+/g, '');
    if (cleanCode.length !== 6) {
      setMfaError('Please enter the 6-digit code from your authenticator app.');
      return;
    }

    setIsProcessingMfa(true);
    try {
      const res = await verifyMFAEnrollment(enrollData.factorId, cleanCode);
      if (res.error) {
        setMfaError(res.error);
      } else {
        setIsMfaEnabled(true);
        setActiveFactorId(enrollData.factorId);
        setIsSettingUpMfa(false);
        setEnrollData(null);
        setMfaVerifyCode('');
        setMfaSuccess('Two-Factor Authentication successfully enabled!');
      }
    } catch (err: any) {
      setMfaError(err?.message || 'Failed to verify MFA code.');
    } finally {
      setIsProcessingMfa(false);
    }
  };

  const handleDisableMfa = async () => {
    if (!activeFactorId) return;
    if (!window.confirm('Are you sure you want to disable Two-Factor Authentication on your account?')) {
      return;
    }

    setMfaError(null);
    setMfaSuccess(null);
    setIsProcessingMfa(true);
    try {
      const res = await unenrollMFA(activeFactorId);
      if (res.error) {
        setMfaError(res.error);
      } else {
        setIsMfaEnabled(false);
        setActiveFactorId(null);
        setMfaSuccess('Two-Factor Authentication disabled.');
      }
    } catch (err: any) {
      setMfaError(err?.message || 'Failed to disable MFA.');
    } finally {
      setIsProcessingMfa(false);
    }
  };

  const handleEducationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLevel = e.target.value;
    const isSchool = selectedLevel.includes('Standard');
    setUserProfile((prev) => ({
      ...prev,
      gradeOrStream: selectedLevel,
      learnerType: isSchool ? 'school' : 'undergrad',
    }));
  };

  const displayName = user?.user_metadata?.full_name || user?.user_metadata?.display_name || userProfile.name;
  const userEmail = user?.email || 'Authenticated Learner';

  const handleLogout = async () => {
    if (window.confirm('Log out of Nirantar?')) {
      await signOut();
    }
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto py-2">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#102A43]">
          {t.profile.title}
        </h1>
        <p className="text-sm text-[#675E54] mt-1">{t.profile.subtitle}</p>
      </div>

      {/* 1. Student Identity Card */}
      <div className="bg-[#FAF6EF] border border-[#D8CABA] rounded-2xl p-6 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-[#E9DDCB] text-[#102A43] font-bold text-xl flex items-center justify-center border border-[#D8CABA]">
            {displayName.charAt(0).toUpperCase()}
          </div>
          <div>
            <h2 className="text-lg font-bold text-[#102A43]">{displayName}</h2>
            <p className="text-xs text-[#675E54]">
              {userEmail} · {userProfile.gradeOrStream}
            </p>
            <span className="text-[11px] font-semibold text-[#102A43] mt-1 inline-block">
              Level {userProfile.level} ({userProfile.levelTitle[language]}) · {userProfile.currentXp.toLocaleString()} XP
            </span>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-[#E9DDCB] hover:bg-[#E2D4BF] text-[#102A43] text-xs font-bold rounded-xl border border-[#D8CABA] transition-colors self-start sm:self-auto cursor-pointer flex items-center gap-1.5"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Log Out</span>
        </button>
      </div>

      {/* 2. Account Security & Two-Factor Authentication (MFA) */}
      <div className="bg-[#FAF6EF] border border-[#D8CABA] rounded-2xl p-5 shadow-2xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-[#102A43]">
            <ShieldCheck className="w-4 h-4 text-[#102A43]" />
            <h3 className="text-sm font-bold">Account Security & Two-Factor Authentication (2FA)</h3>
          </div>
          {isMfaEnabled && (
            <span className="px-2.5 py-0.5 bg-emerald-100 border border-emerald-300 text-emerald-800 text-[11px] font-bold rounded-md flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-700" />
              <span>2FA Active</span>
            </span>
          )}
        </div>

        {mfaError && (
          <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-xl flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-rose-600 flex-shrink-0" />
            <span>{mfaError}</span>
          </div>
        )}

        {mfaSuccess && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold rounded-xl flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>{mfaSuccess}</span>
          </div>
        )}

        {isMfaLoading ? (
          <div className="flex items-center gap-2 text-xs text-[#675E54] py-2">
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
            <span>Checking security configuration...</span>
          </div>
        ) : isSettingUpMfa && enrollData ? (
          /* MFA Setup Step: QR Code + Code Verification */
          <div className="bg-[#E9DDCB]/50 border border-[#D8CABA] rounded-xl p-4 sm:p-5 space-y-4">
            <div className="space-y-1">
              <h4 className="text-xs font-bold text-[#102A43]">Scan QR Code with Authenticator App</h4>
              <p className="text-[11px] text-[#675E54] leading-relaxed">
                Open Google Authenticator, Microsoft Authenticator, or Authy on your mobile device and scan the QR code below.
              </p>
            </div>

            {/* QR Code Container */}
            <div className="flex flex-col sm:flex-row items-center gap-4 bg-[#FAF6EF] p-4 rounded-xl border border-[#D8CABA]">
              {enrollData.qrCode ? (
                <div
                  className="w-36 h-36 bg-white p-2 rounded-lg border border-[#D8CABA] flex items-center justify-center shadow-2xs flex-shrink-0"
                  dangerouslySetInnerHTML={{ __html: enrollData.qrCode }}
                />
              ) : (
                <div className="w-36 h-36 bg-white p-2 rounded-lg border border-[#D8CABA] flex items-center justify-center text-xs text-[#675E54] flex-shrink-0">
                  <Key className="w-8 h-8 text-[#102A43]" />
                </div>
              )}

              <div className="space-y-2 text-xs text-[#675E54] w-full">
                <div>
                  <span className="font-semibold text-[#102A43] block">Manual Entry Secret Key:</span>
                  <code className="font-mono text-xs bg-[#E9DDCB] px-2 py-1 rounded border border-[#D8CABA] text-[#102A43] block mt-1 break-all select-all">
                    {enrollData.secret || 'Unavailable'}
                  </code>
                </div>
                <p className="text-[11px] text-[#675E54]">
                  If you cannot scan the QR code, enter this key manually into your authenticator app.
                </p>
              </div>
            </div>

            {/* 6-Digit Code Verification Form */}
            <form onSubmit={handleVerifyAndEnableMfa} className="space-y-3">
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#102A43] block">
                  Enter 6-Digit Code from Authenticator
                </label>
                <input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={6}
                  required
                  autoFocus
                  value={mfaVerifyCode}
                  onChange={(e) => setMfaVerifyCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  placeholder="000000"
                  className="w-full sm:w-64 bg-[#FAF6EF] border border-[#D8CABA] rounded-xl px-3.5 py-2.5 text-center text-base font-mono font-bold tracking-widest text-[#102A43] focus:outline-none focus:border-[#102A43]"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <button
                  type="submit"
                  disabled={isProcessingMfa || mfaVerifyCode.length !== 6}
                  className="px-5 py-2 bg-[#102A43] hover:bg-[#0C1F33] disabled:opacity-50 text-white text-xs font-bold rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  {isProcessingMfa && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  <span>Verify and Enable 2FA</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setIsSettingUpMfa(false);
                    setEnrollData(null);
                    setMfaVerifyCode('');
                    setMfaError(null);
                  }}
                  className="px-4 py-2 bg-[#E9DDCB] hover:bg-[#E2D4BF] text-[#102A43] text-xs font-bold rounded-xl border border-[#D8CABA] transition-colors cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        ) : isMfaEnabled ? (
          /* MFA Enabled View */
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
            <p className="text-xs text-[#675E54] leading-relaxed">
              Two-Factor Authentication is currently <strong>enabled</strong>. You will be prompted for an authenticator code whenever you log in with your password.
            </p>
            <button
              type="button"
              disabled={isProcessingMfa}
              onClick={handleDisableMfa}
              className="px-4 py-2 bg-rose-50 hover:bg-rose-100 text-rose-800 text-xs font-bold rounded-xl border border-rose-200 transition-colors self-start sm:self-auto cursor-pointer flex-shrink-0"
            >
              {isProcessingMfa ? 'Disabling...' : 'Disable Two-Factor Auth'}
            </button>
          </div>
        ) : (
          /* MFA Disabled View */
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
            <p className="text-xs text-[#675E54] leading-relaxed">
              Protect your Nirantar account with an extra layer of security using Google Authenticator, Microsoft Authenticator, or Authy.
            </p>
            <button
              type="button"
              disabled={isProcessingMfa}
              onClick={handleStartMfaSetup}
              className="px-4 py-2 bg-[#102A43] hover:bg-[#0C1F33] text-white text-xs font-bold rounded-xl shadow-xs transition-all self-start sm:self-auto cursor-pointer flex-shrink-0 flex items-center gap-1.5"
            >
              {isProcessingMfa && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
              <span>Set up Two-Factor Auth</span>
            </button>
          </div>
        )}
      </div>

      {/* 3. Education Level & Language Preferences */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Education Details & Selector */}
        <div className="bg-[#FAF6EF] border border-[#D8CABA] rounded-2xl p-5 shadow-2xs space-y-3">
          <div className="flex items-center gap-2 text-[#102A43]">
            <GraduationCap className="w-4 h-4 text-[#102A43]" />
            <h3 className="text-sm font-bold">{t.profile.educationDetails}</h3>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-[#675E54]">
              Select Your Standard or Degree
            </label>
            <select
              value={userProfile.gradeOrStream}
              onChange={handleEducationChange}
              className="w-full bg-[#E9DDCB] border border-[#D8CABA] rounded-xl px-3 py-2 text-xs font-bold text-[#102A43] focus:outline-none focus:border-[#102A43]"
            >
              {SUPPORTED_EDUCATION_LEVELS.map((group) => (
                <optgroup key={group.category} label={`--- ${group.category} ---`}>
                  {group.options.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
          </div>
          <p className="text-[11px] text-[#675E54] leading-relaxed">
            Selecting your level automatically customizes recommended learning missions, quizzes, and difficulty.
          </p>
        </div>

        {/* Language Selection */}
        <div className="bg-[#FAF6EF] border border-[#D8CABA] rounded-2xl p-5 shadow-2xs space-y-3">
          <div className="flex items-center gap-2 text-[#102A43]">
            <Globe className="w-4 h-4 text-[#102A43]" />
            <h3 className="text-sm font-bold">{t.profile.languagePref}</h3>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {[
              { code: 'en', label: 'English', sub: 'Default' },
              { code: 'mr', label: 'मराठी', sub: 'स्थानिक' },
              { code: 'hi', label: 'हिंदी', sub: 'राष्ट्रभाषा' },
            ].map((lang) => (
              <button
                key={lang.code}
                onClick={() => setLanguage(lang.code as any)}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  language === lang.code
                    ? 'bg-[#102A43] text-white border-[#102A43] shadow-xs'
                    : 'bg-[#E9DDCB] border-[#D8CABA] text-[#102A43] hover:bg-[#E2D4BF]'
                }`}
              >
                <span className="font-bold text-xs block">{lang.label}</span>
                <span className={`text-[10px] ${language === lang.code ? 'text-[#F3EBDD]/70' : 'text-[#675E54]'}`}>
                  {lang.sub}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 4. Storage & Sync diagnostics */}
      <div className="bg-[#FAF6EF] border border-[#D8CABA] rounded-2xl p-5 shadow-2xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <HardDrive className="w-4 h-4 text-[#675E54]" />
            <h3 className="text-sm font-bold text-[#102A43]">{t.profile.offlineSyncTitle}</h3>
          </div>
          <span className="text-xs text-[#675E54]">
            {pendingSyncQueue.length} items queued for background sync
          </span>
        </div>

        <p className="text-xs text-[#675E54] leading-relaxed">
          {t.profile.offlineSyncDesc}
        </p>

        <div className="pt-2 border-t border-[#D8CABA] flex items-center justify-between">
          <span className="text-xs text-[#675E54]">Reset learning state for demonstration?</span>
          <button
            onClick={() => {
              if (window.confirm('Reset all demo state to fresh start?')) {
                resetAllDemoState();
              }
            }}
            className="px-3 py-1.5 text-xs text-rose-700 hover:bg-rose-50 rounded-lg border border-rose-200 font-medium transition-colors cursor-pointer"
          >
            {t.profile.resetDemo}
          </button>
        </div>
      </div>
    </div>
  );
};
