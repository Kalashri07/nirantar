import React from 'react';
import {
  User,
  GraduationCap,
  Globe,
  Zap,
  HardDrive,
  RefreshCw,
  RotateCcw,
  CheckCircle2,
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
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
          {t.profile.title}
        </h1>
        <p className="text-sm text-slate-500 mt-1">{t.profile.subtitle}</p>
      </div>

      {/* 1. Student Identity Card */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-800 font-bold text-xl flex items-center justify-center border border-emerald-200">
            {userProfile.name.charAt(0)}
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">{userProfile.name}</h2>
            <p className="text-xs text-slate-500">
              {userProfile.gradeOrStream} · {userProfile.learnerType === 'school' ? 'School Student' : 'Undergraduate Scholar'}
            </p>
            <span className="text-[11px] font-semibold text-emerald-700 mt-1 inline-block">
              Level {userProfile.level} ({userProfile.levelTitle[language]}) · {userProfile.currentXp.toLocaleString()} XP
            </span>
          </div>
        </div>
      </div>

      {/* 2. Education & Language Preferences */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Education Details */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-2xs space-y-3">
          <div className="flex items-center gap-2 text-slate-800">
            <GraduationCap className="w-4 h-4 text-emerald-600" />
            <h3 className="text-sm font-bold">{t.profile.educationDetails}</h3>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between py-1.5 border-b border-slate-100">
              <span className="text-slate-500">{t.profile.learnerType}</span>
              <span className="font-semibold text-slate-800 capitalize">{userProfile.learnerType}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-100">
              <span className="text-slate-500">{t.profile.gradeStream}</span>
              <span className="font-semibold text-slate-800">{userProfile.gradeOrStream}</span>
            </div>
          </div>
        </div>

        {/* Language Selection */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-2xs space-y-3">
          <div className="flex items-center gap-2 text-slate-800">
            <Globe className="w-4 h-4 text-emerald-600" />
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
                    ? 'bg-slate-900 text-white font-bold'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                {lang.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Low Data Mode & Savings */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-500" />
              <h3 className="text-sm font-bold text-slate-900">{t.profile.dataSaverTitle}</h3>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  isLowData ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-600'
                }`}
              >
                {isLowData ? 'Enabled' : 'Off'}
              </span>
            </div>
            <p className="text-xs text-slate-500">{t.profile.dataSaverDesc}</p>
          </div>

          <button
            onClick={() => setConnectivityMode(isLowData ? 'online' : 'low_data')}
            className={`px-4 py-2 text-xs font-semibold rounded-xl transition-colors ${
              isLowData
                ? 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-2xs'
            }`}
          >
            {isLowData ? 'Disable Low Data' : 'Enable Low Data'}
          </button>
        </div>

        <div className="p-3 bg-slate-50 rounded-xl text-xs text-slate-600">
          <span>{t.profile.dataSavedEstimate}</span>
        </div>
      </div>

      {/* 4. Local Storage & Sync Queue */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-2xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <HardDrive className="w-4 h-4 text-slate-500" />
            <h3 className="text-sm font-bold text-slate-900">{t.profile.offlineSyncTitle}</h3>
          </div>
          <span className="text-xs text-slate-400">
            {pendingSyncQueue.length} items queued for sync
          </span>
        </div>

        <p className="text-xs text-slate-500 leading-relaxed">
          {t.profile.offlineSyncDesc}
        </p>

        <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
          <span className="text-xs text-slate-400">Reset learning state for demonstration?</span>
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
