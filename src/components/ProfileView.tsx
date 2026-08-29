import React from 'react';
import {
  GraduationCap,
  Globe,
  Clock,
  CheckCircle2,
  HardDrive,
  RotateCcw,
  Zap,
  ShieldCheck,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ProfileView: React.FC = () => {
  const {
    userProfile,
    language,
    setLanguage,
    t,
    setIsOnboardingOpen,
    resetAllDemoState,
    learningPacks,
  } = useApp();

  const downloadedCount = learningPacks.filter((p) => p.isDownloaded).length;

  return (
    <div className="space-y-6 animate-in fade-in duration-150 max-w-5xl mx-auto">
      {/* Profile Header */}
      <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-500 p-0.5 flex items-center justify-center shadow-xs">
            <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center text-2xl font-black text-emerald-700">
              {userProfile.name.charAt(0)}
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-emerald-700 uppercase px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200">
                {userProfile.learnerType === 'school' ? 'School Student' : 'College Scholar'}
              </span>
              <span className="text-xs text-slate-500 font-semibold">{userProfile.gradeOrStream}</span>
            </div>
            <h1 className="text-2xl font-black text-slate-900">{userProfile.name}</h1>
            <p className="text-xs text-slate-500">
              Level {userProfile.level} • <span className="text-emerald-700 font-bold">{userProfile.levelTitle[language]}</span>
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
          <button
            onClick={() => setIsOnboardingOpen(true)}
            className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all"
          >
            Edit Settings
          </button>
          <button
            onClick={() => {
              if (window.confirm('Reset all demo modules, XP, and sync queue to initial state?')) {
                resetAllDemoState();
              }
            }}
            className="px-4 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold border border-rose-200 transition-all flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Demo</span>
          </button>
        </div>
      </div>

      {/* Offline Impact Stats */}
      <div className="space-y-3">
        <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-600" />
          <span>{t.profile.offlineImpact}</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-2xs space-y-1">
            <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center mb-2">
              <Clock className="w-5 h-5" />
            </div>
            <span className="text-xs text-slate-400 block font-semibold">{t.profile.hoursLearnedOffline}</span>
            <span className="text-2xl font-black text-slate-900">{userProfile.offlineHours} hrs</span>
            <span className="text-[11px] text-blue-700 font-semibold block">Zero buffer learning</span>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-2xs space-y-1">
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-2">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <span className="text-xs text-slate-400 block font-semibold">{t.profile.activitiesCompletedOffline}</span>
            <span className="text-2xl font-black text-emerald-700">{userProfile.offlineActivitiesCompleted}</span>
            <span className="text-[11px] text-emerald-700 font-semibold block">Saved locally on device</span>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-2xs space-y-1">
            <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center mb-2">
              <Zap className="w-5 h-5" />
            </div>
            <span className="text-xs text-slate-400 block font-semibold">{t.profile.estimatedDataSaved}</span>
            <span className="text-2xl font-black text-amber-800">{userProfile.dataSavedMb} MB</span>
            <span className="text-[11px] text-amber-700 font-semibold block">Mobile data saved</span>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-2xs space-y-1">
            <div className="w-10 h-10 rounded-2xl bg-purple-50 text-purple-700 flex items-center justify-center mb-2">
              <HardDrive className="w-5 h-5" />
            </div>
            <span className="text-xs text-slate-400 block font-semibold">Offline Library</span>
            <span className="text-2xl font-black text-purple-800">{downloadedCount} Packs</span>
            <span className="text-[11px] text-purple-700 font-semibold block">Ready anytime</span>
          </div>
        </div>
      </div>

      {/* Language & Subject Preferences */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200 shadow-xs space-y-3">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
            <Globe className="w-4 h-4 text-emerald-600" />
            <span>Language Preference</span>
          </h3>

          <div className="space-y-2">
            {[
              { id: 'en' as const, label: 'English', native: 'English' },
              { id: 'mr' as const, label: 'मराठी (Maharashtra)', native: 'मराठी' },
              { id: 'hi' as const, label: 'हिंदी (National)', native: 'हिंदी' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setLanguage(item.id)}
                className={`w-full p-3 rounded-2xl border text-left text-xs font-bold transition-all flex items-center justify-between ${
                  language === item.id
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-900 ring-1 ring-emerald-300'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <span>{item.label}</span>
                <span className="text-emerald-700">{item.native}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200 shadow-xs space-y-3">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-emerald-600" />
            <span>Learning Interests</span>
          </h3>

          <div className="flex flex-wrap gap-2">
            {userProfile.interests.map((interest) => (
              <span
                key={interest}
                className="px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200 text-xs font-bold text-slate-700"
              >
                ✨ {interest}
              </span>
            ))}
          </div>

          <p className="text-xs text-slate-500 pt-2 border-t border-slate-100">
            Your dashboard automatically highlights lessons in these subjects.
          </p>
        </div>
      </div>
    </div>
  );
};
