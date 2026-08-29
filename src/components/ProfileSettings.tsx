import React from 'react';
import {
  User,
  GraduationCap,
  Globe,
  Zap,
  HardDrive,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ProfileSettings: React.FC = () => {
  const {
    userProfile,
    language,
    setLanguage,
    connectivityMode,
    setConnectivityMode,
    pendingSyncQueue,
    resetAllDemoState,
    t,
  } = useApp();

  const isLowData = connectivityMode === 'low_data';

  return (
    <div className="space-y-8 max-w-4xl mx-auto py-2">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#20242B]">
          {t.profile.title}
        </h1>
        <p className="text-sm text-[#7E8796] mt-1">{t.profile.subtitle}</p>
      </div>

      {/* 1. Student Identity Card */}
      <div className="bg-white border border-[#EBE8E1] rounded-2xl p-6 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-[#EDF1FC] text-[#3457D5] font-bold text-xl flex items-center justify-center border border-[#C3D2F7]">
            {userProfile.name.charAt(0)}
          </div>
          <div>
            <h2 className="text-lg font-bold text-[#20242B]">{userProfile.name}</h2>
            <p className="text-xs text-[#7E8796]">
              {userProfile.gradeOrStream} · {userProfile.learnerType === 'school' ? 'School Student' : 'Undergraduate Scholar'}
            </p>
            <span className="text-[11px] font-semibold text-[#3457D5] mt-1 inline-block">
              Level {userProfile.level} ({userProfile.levelTitle[language]}) · {userProfile.currentXp.toLocaleString()} XP
            </span>
          </div>
        </div>
      </div>

      {/* 2. Education & Language Preferences */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Education Details */}
        <div className="bg-white border border-[#EBE8E1] rounded-2xl p-5 shadow-2xs space-y-3">
          <div className="flex items-center gap-2 text-[#20242B]">
            <GraduationCap className="w-4 h-4 text-[#3457D5]" />
            <h3 className="text-sm font-bold">{t.profile.educationDetails}</h3>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between py-1.5 border-b border-[#EBE8E1]">
              <span className="text-[#7E8796]">{t.profile.learnerType}</span>
              <span className="font-semibold text-[#20242B] capitalize">{userProfile.learnerType}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-[#EBE8E1]">
              <span className="text-[#7E8796]">{t.profile.gradeStream}</span>
              <span className="font-semibold text-[#20242B]">{userProfile.gradeOrStream}</span>
            </div>
          </div>
        </div>

        {/* Language Selection */}
        <div className="bg-white border border-[#EBE8E1] rounded-2xl p-5 shadow-2xs space-y-3">
          <div className="flex items-center gap-2 text-[#20242B]">
            <Globe className="w-4 h-4 text-[#3457D5]" />
            <h3 className="text-sm font-bold">{t.profile.languagePref}</h3>
          </div>

          <div className="grid grid-cols-3 gap-2">
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
                    ? 'bg-[#20242B] text-white font-bold'
                    : 'bg-white border-[#EBE8E1] text-[#4A5160] hover:bg-[#F8F7F4]'
                }`}
              >
                {lang.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Low Data Mode & Savings */}
      <div className="bg-white border border-[#EBE8E1] rounded-2xl p-5 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-[#C9A96E]" />
              <h3 className="text-sm font-bold text-[#20242B]">{t.profile.dataSaverTitle}</h3>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  isLowData ? 'bg-[#FAF5ED] text-[#977636] border border-[#E8DCBE]' : 'bg-[#F8F7F4] text-[#7E8796] border border-[#EBE8E1]'
                }`}
              >
                {isLowData ? 'Enabled' : 'Off'}
              </span>
            </div>
            <p className="text-xs text-[#7E8796]">{t.profile.dataSaverDesc}</p>
          </div>

          <button
            onClick={() => setConnectivityMode(isLowData ? 'online' : 'low_data')}
            className={`px-4 py-2 text-xs font-semibold rounded-xl transition-colors ${
              isLowData
                ? 'bg-[#F8F7F4] text-[#4A5160] hover:bg-[#EFECE5] border border-[#EBE8E1]'
                : 'bg-[#3457D5] hover:bg-[#2845B2] text-white shadow-2xs'
            }`}
          >
            {isLowData ? 'Disable Low Data' : 'Enable Low Data'}
          </button>
        </div>

        <div className="p-3 bg-[#F8F7F4] rounded-xl text-xs text-[#4A5160] border border-[#EBE8E1]">
          <span>{t.profile.dataSavedEstimate}</span>
        </div>
      </div>

      {/* 4. Local Storage & Sync Queue */}
      <div className="bg-white border border-[#EBE8E1] rounded-2xl p-5 shadow-2xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <HardDrive className="w-4 h-4 text-[#7E8796]" />
            <h3 className="text-sm font-bold text-[#20242B]">{t.profile.offlineSyncTitle}</h3>
          </div>
          <span className="text-xs text-[#7E8796]">
            {pendingSyncQueue.length} items queued for sync
          </span>
        </div>

        <p className="text-xs text-[#7E8796] leading-relaxed">
          {t.profile.offlineSyncDesc}
        </p>

        <div className="pt-2 border-t border-[#EBE8E1] flex items-center justify-between">
          <span className="text-xs text-[#7E8796]">Reset learning state for demonstration?</span>
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
