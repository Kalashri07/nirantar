import React from 'react';
import {
  User,
  GraduationCap,
  Globe,
  HardDrive,
  CheckCircle2,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SUPPORTED_EDUCATION_LEVELS } from '../data/mockData';

export const ProfileSettings: React.FC = () => {
  const {
    userProfile,
    setUserProfile,
    language,
    setLanguage,
    pendingSyncQueue,
    resetAllDemoState,
    logoutUser,
    t,
  } = useApp();

  const handleEducationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLevel = e.target.value;
    const isSchool = selectedLevel.includes('Standard');
    setUserProfile((prev) => ({
      ...prev,
      gradeOrStream: selectedLevel,
      learnerType: isSchool ? 'school' : 'undergrad',
    }));
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
            {userProfile.name.charAt(0)}
          </div>
          <div>
            <h2 className="text-lg font-bold text-[#102A43]">{userProfile.name}</h2>
            <p className="text-xs text-[#675E54]">
              {userProfile.gradeOrStream} · {userProfile.learnerType === 'school' ? 'School Student' : 'Higher Education Scholar'}
            </p>
            <span className="text-[11px] font-semibold text-[#102A43] mt-1 inline-block">
              Level {userProfile.level} ({userProfile.levelTitle[language]}) · {userProfile.currentXp.toLocaleString()} XP
            </span>
          </div>
        </div>

        <button
          onClick={() => {
            if (window.confirm('Log out of Nirantar?')) {
              logoutUser();
            }
          }}
          className="px-4 py-2 bg-[#E9DDCB] hover:bg-[#E2D4BF] text-[#102A43] text-xs font-bold rounded-xl border border-[#D8CABA] transition-colors self-start sm:self-auto cursor-pointer"
        >
          Log Out
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

          <div className="space-y-3 pt-1 text-xs">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#675E54] block">
                Select Your Educational Level:
              </label>
              <select
                value={userProfile.gradeOrStream}
                onChange={handleEducationChange}
                className="w-full bg-[#E9DDCB] border border-[#D8CABA] text-[#102A43] font-medium rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#102A43]"
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

            <div className="flex justify-between py-1.5 border-t border-[#D8CABA] text-[#675E54]">
              <span>Category:</span>
              <span className="font-semibold text-[#102A43] capitalize">
                {userProfile.learnerType === 'school' ? 'School (K-12)' : 'Undergraduate / Higher Ed'}
              </span>
            </div>
          </div>
        </div>

        {/* Language Selection */}
        <div className="bg-[#FAF6EF] border border-[#D8CABA] rounded-2xl p-5 shadow-2xs space-y-3">
          <div className="flex items-center gap-2 text-[#102A43]">
            <Globe className="w-4 h-4 text-[#102A43]" />
            <h3 className="text-sm font-bold">{t.profile.languagePref}</h3>
          </div>

          <div className="grid grid-cols-3 gap-2 pt-2">
            {[
              { id: 'en' as const, label: 'English' },
              { id: 'mr' as const, label: 'मराठी' },
              { id: 'hi' as const, label: 'हिंदी' },
            ].map((lang) => (
              <button
                key={lang.id}
                onClick={() => setLanguage(lang.id)}
                className={`py-2 px-3 rounded-lg border text-xs font-medium transition-colors ${
                  language === lang.id
                    ? 'bg-[#102A43] text-white font-bold'
                    : 'bg-[#E9DDCB] border-[#D8CABA] text-[#675E54] hover:bg-[#E2D4BF]'
                }`}
              >
                {lang.label}
              </button>
            ))}
          </div>

          <p className="text-[11px] text-[#675E54] pt-1">
            Multilingual curriculum and interface available across English, Marathi, and Hindi.
          </p>
        </div>
      </div>

      {/* 3. Local Storage & Sync Queue */}
      <div className="bg-[#FAF6EF] border border-[#D8CABA] rounded-2xl p-5 shadow-2xs space-y-4">
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
            className="px-3 py-1.5 text-xs text-rose-700 hover:bg-rose-50 rounded-lg border border-rose-200 font-medium transition-colors"
          >
            {t.profile.resetDemo}
          </button>
        </div>
      </div>
    </div>
  );
};
