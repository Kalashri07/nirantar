import React from 'react';
import {
  Sparkles,
  Flame,
  Zap,
  Wifi,
  WifiOff,
  Download,
  Play,
  ArrowRight,
  Clock,
  CheckCircle2,
  Atom,
  BookOpen,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Dashboard: React.FC = () => {
  const {
    userProfile,
    learningPacks,
    language,
    t,
    connectivityMode,
    setConnectivityMode,
    setActivePackModalId,
    setActiveLessonPackId,
    setCurrentNav,
  } = useApp();

  const activeModule = learningPacks.find((p) => p.id === 'physics-quest') || learningPacks[0];
  const recommendedPacks = learningPacks.filter((p) => p.id !== activeModule.id);

  const xpPercent = Math.min(100, Math.round((userProfile.currentXp / userProfile.targetXp) * 100));

  return (
    <div className="space-y-6 animate-in fade-in duration-150 max-w-5xl mx-auto">
      {/* 1. TOP GREETING & SIMPLE XP BAR */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-5 sm:p-6 rounded-3xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-emerald-700 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200">
              {userProfile.gradeOrStream}
            </span>
            <span className="text-xs text-slate-500">
              Level {userProfile.level} • {userProfile.levelTitle[language]}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Good Morning, {userProfile.name} 👋
          </h1>
        </div>

        {/* Level & Streak Pill */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 border border-amber-200 text-amber-900 rounded-2xl text-xs font-bold shadow-2xs">
            <Flame className="w-4 h-4 fill-amber-500 text-amber-500" />
            <span>{userProfile.streakDays} Day Streak!</span>
          </div>

          <div className="flex flex-col items-end gap-1">
            <span className="text-xs font-black text-emerald-700">
              {userProfile.currentXp} / {userProfile.targetXp} XP
            </span>
            <div className="w-28 sm:w-36 bg-slate-100 h-2.5 rounded-full overflow-hidden border border-slate-200/60">
              <div
                className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${xpPercent}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 2. PRIMARY ACTION: CONTINUE LEARNING HERO CARD */}
      <div className="bg-gradient-to-br from-emerald-600 via-teal-600 to-emerald-700 text-white rounded-3xl p-6 sm:p-8 shadow-md relative overflow-hidden">
        {/* Soft background accents */}
        <div className="absolute right-0 top-0 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none -mr-16 -mt-16" />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-3 flex-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-white/20 text-white tracking-wide">
                ⭐ Continue Learning
              </span>
              <span className="text-xs font-semibold text-emerald-100 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Available Offline
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-white leading-snug">
              {activeModule.title[language]}
            </h2>
            <p className="text-xs sm:text-sm text-emerald-50 max-w-xl leading-relaxed">
              {activeModule.subtitle[language]}
            </p>

            {/* Simple progress bar */}
            <div className="space-y-1.5 max-w-md pt-1">
              <div className="flex items-center justify-between text-xs text-emerald-100 font-semibold">
                <span>Progress: {activeModule.progressPercentage}%</span>
                <span>Checkpoint 4 of 6</span>
              </div>
              <div className="w-full bg-emerald-950/40 h-2 rounded-full overflow-hidden">
                <div className="bg-white h-full rounded-full w-[68%]" />
              </div>
            </div>
          </div>

          {/* Primary Big Continue Button */}
          <div className="w-full md:w-auto flex flex-col sm:flex-row md:flex-col gap-3">
            <button
              onClick={() => setActiveLessonPackId(activeModule.id)}
              className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-emerald-50 text-emerald-800 text-sm sm:text-base font-black rounded-2xl shadow-lg hover:shadow-xl active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <Play className="w-5 h-5 fill-emerald-800" />
              <span>Continue Lesson →</span>
            </button>
            <button
              onClick={() => setActivePackModalId(activeModule.id)}
              className="px-4 py-2 text-xs text-emerald-100 hover:text-white font-bold text-center underline underline-offset-4"
            >
              View Lesson Details
            </button>
          </div>
        </div>
      </div>

      {/* 3. SIMPLE CONNECTIVITY CARD */}
      <div className="bg-white p-4 sm:p-5 rounded-3xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-sm ${
              connectivityMode === 'online'
                ? 'bg-emerald-100 text-emerald-700'
                : connectivityMode === 'low_data'
                ? 'bg-amber-100 text-amber-700'
                : 'bg-rose-100 text-rose-700'
            }`}
          >
            {connectivityMode === 'online' && <Wifi className="w-5 h-5" />}
            {connectivityMode === 'low_data' && <Zap className="w-5 h-5" />}
            {connectivityMode === 'offline' && <WifiOff className="w-5 h-5" />}
          </div>
          <div>
            <h3 className="text-sm font-black text-slate-900">
              {connectivityMode === 'online' && '🟢 Connected (Online)'}
              {connectivityMode === 'low_data' && '🟡 Low Data Mode (Saving Bandwidth)'}
              {connectivityMode === 'offline' && '🔴 Offline Mode (No Internet Needed)'}
            </h3>
            <p className="text-xs text-slate-500">
              {connectivityMode === 'offline'
                ? 'Your downloaded lessons and quiz answers are safely stored on this device.'
                : 'All your progress syncs automatically with cloud servers.'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={() => setCurrentNav('downloads')}
            className="flex-1 sm:flex-initial px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center justify-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5 text-emerald-600" />
            <span>My Downloads</span>
          </button>
          <button
            onClick={() => {
              if (connectivityMode === 'online') setConnectivityMode('low_data');
              else if (connectivityMode === 'low_data') setConnectivityMode('offline');
              else setConnectivityMode('online');
            }}
            className="flex-1 sm:flex-initial px-3.5 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 text-xs font-bold"
          >
            Switch Mode
          </button>
        </div>
      </div>

      {/* 4. RECOMMENDED LEARNING MODULES */}
      <div className="space-y-4 pt-2">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-black text-slate-900 tracking-tight">
              {t.dashboard.recommendedPacks}
            </h2>
            <p className="text-xs text-slate-500">Fun, lightweight lessons tailored for your grade</p>
          </div>
          <button
            onClick={() => setCurrentNav('explore')}
            className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
          >
            <span>Explore All Subjects →</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {recommendedPacks.map((pack) => (
            <div
              key={pack.id}
              onClick={() => setActivePackModalId(pack.id)}
              className="bg-white p-5 rounded-3xl border border-slate-200 hover:border-emerald-300 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center shadow-2xs">
                    <BookOpen className="w-5 h-5" />
                  </div>

                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      pack.isDownloaded
                        ? 'bg-emerald-50 border border-emerald-200 text-emerald-700'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {pack.isDownloaded ? 'Downloaded ✓' : `${pack.estimatedSizeMb} MB`}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    {pack.levelBadge[language]}
                  </span>
                  <h3 className="text-sm font-black text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-1 mt-0.5">
                    {pack.title[language]}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                    {pack.description[language]}
                  </p>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-amber-800 font-bold flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded-md">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" /> +{pack.xpReward} XP
                </span>
                <span className="text-emerald-700 font-bold group-hover:translate-x-1 transition-transform flex items-center gap-1">
                  Start Lesson →
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
