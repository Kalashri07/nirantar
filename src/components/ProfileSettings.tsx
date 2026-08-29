import React from 'react';
import {
  User,
  GraduationCap,
  Globe,
  HardDrive,
  CheckCircle2,
  LogOut,
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

  const { user, signOut } = useAuth();

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

      {/* 2. Education Level & Language Preferences */}
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

      {/* 3. Storage & Sync diagnostics */}
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
