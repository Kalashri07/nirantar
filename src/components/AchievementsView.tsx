import React from 'react';
import {
  Award,
  Lock,
  CheckCircle2,
  Flame,
  Zap,
  WifiOff,
  Terminal,
  ShieldCheck,
  Telescope,
  TrendingUp,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const AchievementsView: React.FC = () => {
  const { badges, language, t, userProfile } = useApp();

  const getBadgeIcon = (iconName: string) => {
    switch (iconName) {
      case 'Telescope':
        return Telescope;
      case 'ShieldCheck':
        return ShieldCheck;
      case 'Terminal':
        return Terminal;
      case 'Flame':
        return Flame;
      case 'WifiOff':
        return WifiOff;
      case 'Zap':
        return Zap;
      default:
        return Award;
    }
  };

  const unlockedCount = badges.filter((b) => b.isUnlocked).length;

  return (
    <div className="space-y-6 animate-in fade-in duration-150 max-w-5xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200">
            Student Achievements
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">{t.achievements.title}</h1>
          <p className="text-xs sm:text-sm text-slate-500 max-w-2xl">{t.achievements.subtitle}</p>
        </div>

        <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-2xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 border border-amber-200 flex items-center justify-center font-bold text-sm">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs text-slate-400 font-semibold block">Badges Collected</span>
            <span className="text-base font-black text-slate-900">
              {unlockedCount} of {badges.length} Unlocked
            </span>
          </div>
        </div>
      </div>

      {/* Badges Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {badges.map((badge) => {
          const Icon = getBadgeIcon(badge.icon);
          const isUnlocked = badge.isUnlocked;

          return (
            <div
              key={badge.id}
              className={`p-6 rounded-3xl border transition-all flex flex-col justify-between ${
                isUnlocked
                  ? 'bg-white border-amber-300 shadow-sm'
                  : 'bg-slate-50 border-slate-200 opacity-60'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-2xs ${
                      isUnlocked
                        ? 'bg-amber-100 text-amber-700 border border-amber-200'
                        : 'bg-slate-200 text-slate-400'
                    }`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>

                  <span
                    className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                      badge.rarity === 'Legendary'
                        ? 'bg-purple-100 text-purple-800'
                        : badge.rarity === 'Epic'
                        ? 'bg-rose-100 text-rose-800'
                        : badge.rarity === 'Rare'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {badge.rarity}
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-black text-slate-900 flex items-center gap-1.5">
                    <span>{badge.title[language]}</span>
                    {!isUnlocked && <Lock className="w-3.5 h-3.5 text-slate-400" />}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    {badge.description[language]}
                  </p>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-[11px] text-slate-400">Category: {badge.category}</span>
                {isUnlocked ? (
                  <span className="text-[11px] text-emerald-700 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Unlocked ({badge.unlockedAt})
                  </span>
                ) : (
                  <span className="text-[11px] text-slate-400 font-semibold">Locked 🔒</span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Simple XP Milestones */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-black text-slate-900 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-emerald-600" />
            <span>{t.achievements.xpHistory}</span>
          </h2>
          <span className="text-xs font-mono font-bold text-emerald-700">Total: {userProfile.currentXp} XP</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
            <span className="text-[11px] text-slate-400 block font-semibold">Today</span>
            <span className="text-lg font-black text-emerald-700">+140 XP</span>
            <span className="text-[10px] text-slate-500 block">Physics Lesson</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
            <span className="text-[11px] text-slate-400 block font-semibold">Yesterday</span>
            <span className="text-lg font-black text-emerald-700">+220 XP</span>
            <span className="text-[10px] text-slate-500 block">Chemistry Lab</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
            <span className="text-[11px] text-slate-400 block font-semibold">Streak Bonus</span>
            <span className="text-lg font-black text-amber-700">+150 XP</span>
            <span className="text-[10px] text-slate-500 block">6-Day Streak</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
            <span className="text-[11px] text-slate-400 block font-semibold">Offline Syncs</span>
            <span className="text-lg font-black text-teal-700">+420 XP</span>
            <span className="text-[10px] text-slate-500 block">Saved Quizzes</span>
          </div>
        </div>
      </div>
    </div>
  );
};
