import React from 'react';
import {
  Play,
  CheckCircle2,
  BookOpen,
  Sparkles,
  ArrowRight,
  Flame,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Dashboard: React.FC = () => {
  const {
    userProfile,
    learningPacks,
    language,
    t,
    setActivePackModalId,
    setActiveLessonPackId,
    setCurrentNav,
  } = useApp();

  const activeModule = learningPacks.find((p) => p.id === 'physics-quest') || learningPacks[0];
  const recommendedPacks = learningPacks.filter((p) => p.id !== activeModule.id);

  const xpPercent = Math.min(100, Math.round((userProfile.currentXp / userProfile.targetXp) * 100));

  return (
    <div className="space-y-10 animate-in fade-in duration-150 max-w-4xl mx-auto py-2">
      {/* 1. PRODUCT HEADER & SUBTLE STATUS */}
      <div className="flex flex-col sm:flex-row items-start sm:items-baseline justify-between gap-2">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            {t.dashboard.greeting}
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            {t.dashboard.greetingSubtitle}
          </p>
        </div>

        {/* Subtle Streak & XP Summary (No heavy borders) */}
        <div className="flex items-center gap-4 text-xs text-slate-500 font-semibold pt-1">
          <span className="flex items-center gap-1 text-amber-700 font-bold bg-amber-50 px-2.5 py-1 rounded-xl">
            <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
            <span>{userProfile.streakDays} Day Streak</span>
          </span>
          <span className="text-slate-400">•</span>
          <span className="font-bold text-emerald-700">
            {userProfile.currentXp} / {userProfile.targetXp} XP
          </span>
        </div>
      </div>

      {/* 2. PRIMARY ACTION HERO: CONTINUE LEARNING */}
      <div className="bg-gradient-to-br from-emerald-600 via-teal-600 to-emerald-700 text-white rounded-3xl p-7 sm:p-9 shadow-md relative overflow-hidden">
        {/* Soft background accents */}
        <div className="absolute right-0 top-0 w-72 h-72 bg-white/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

        <div className="space-y-6 relative z-10">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full bg-white/20 text-white">
              Continue Learning
            </span>
            <span className="text-xs font-bold text-emerald-100 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" /> Ready Offline
            </span>
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight">
              {activeModule.title[language]}
            </h2>
            <p className="text-xs sm:text-sm text-emerald-50 max-w-xl leading-relaxed">
              {activeModule.subtitle[language]}
            </p>
          </div>

          {/* Simple Progress Bar */}
          <div className="space-y-1.5 max-w-md pt-1">
            <div className="flex items-center justify-between text-xs text-emerald-100 font-semibold">
              <span>{activeModule.progressPercentage}% Completed</span>
              <span>Checkpoint 4 of 6</span>
            </div>
            <div className="w-full bg-emerald-950/40 h-2 rounded-full overflow-hidden">
              <div className="bg-white h-full rounded-full w-[68%]" />
            </div>
          </div>

          {/* Single Clear Primary Action Button */}
          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <button
              onClick={() => setActiveLessonPackId(activeModule.id)}
              className="px-8 py-4 bg-white hover:bg-emerald-50 text-emerald-800 text-sm sm:text-base font-black rounded-2xl shadow-lg hover:shadow-xl active:scale-95 transition-all flex items-center justify-center gap-2.5"
            >
              <Play className="w-5 h-5 fill-emerald-800" />
              <span>Continue Learning</span>
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

      {/* 3. RECOMMENDED LESSONS (Clean, airy grid without heavy cards) */}
      <div className="space-y-4 pt-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-black text-slate-900 tracking-tight">
              More Lessons for You
            </h2>
            <p className="text-xs text-slate-400">Lightweight interactive modules</p>
          </div>
          <button
            onClick={() => setCurrentNav('explore')}
            className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
          >
            <span>View All Worlds</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {recommendedPacks.slice(0, 3).map((pack) => (
            <div
              key={pack.id}
              onClick={() => setActivePackModalId(pack.id)}
              className="bg-white p-6 rounded-3xl border border-slate-200/90 hover:border-emerald-300 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                    {pack.estimatedSizeMb} MB
                  </span>
                </div>

                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    {pack.levelBadge[language]}
                  </span>
                  <h3 className="text-sm font-black text-slate-900 group-hover:text-emerald-700 transition-colors mt-0.5 line-clamp-1">
                    {pack.title[language]}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                    {pack.description[language]}
                  </p>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-amber-800 font-bold flex items-center gap-1 text-[11px]">
                  <Sparkles className="w-3 h-3 text-amber-500" /> +{pack.xpReward} XP
                </span>
                <span className="text-emerald-700 font-bold group-hover:translate-x-1 transition-transform flex items-center gap-1 text-xs">
                  Start →
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
