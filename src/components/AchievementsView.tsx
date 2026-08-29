import React from 'react';
import {
  Award,
  Lock,
  Flame,
  Zap,
  WifiOff,
  Terminal,
  ShieldCheck,
  Telescope,
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

  const unlockedBadges = badges.filter((b) => b.isUnlocked);
  const lockedBadges = badges.filter((b) => !b.isUnlocked);

  return (
    <div className="space-y-8 max-w-5xl mx-auto py-2">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#20242B]">
            {t.achievements.title}
          </h1>
          <p className="text-sm text-[#7E8796] mt-1">{t.achievements.subtitle}</p>
        </div>

        <div className="flex items-center gap-3 bg-white border border-[#EBE8E1] rounded-2xl px-4 py-2.5 shadow-2xs self-start">
          <div className="w-8 h-8 rounded-lg bg-[#FAF5ED] text-[#C9A96E] flex items-center justify-center border border-[#E8DCBE]">
            <Award className="w-4 h-4" />
          </div>
          <div>
            <span className="text-xs font-bold text-[#20242B] block">
              {unlockedBadges.length} of {badges.length} Unlocked
            </span>
            <span className="text-[10px] text-[#7E8796] font-medium">
              Total Points: {userProfile.currentXp} XP
            </span>
          </div>
        </div>
      </div>

      {/* 1. Recently Earned Badges */}
      <div className="space-y-3">
        <h2 className="text-base font-bold text-[#20242B]">{t.achievements.recentEarned}</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {unlockedBadges.map((badge) => {
            const Icon = getBadgeIcon(badge.icon);
            return (
              <div
                key={badge.id}
                className="bg-white border border-[#EBE8E1] rounded-2xl p-5 shadow-2xs flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="w-10 h-10 rounded-xl bg-[#FAF5ED] border border-[#E8DCBE] flex items-center justify-center text-[#977636]">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#977636] bg-[#FAF5ED] px-2 py-0.5 rounded border border-[#E8DCBE]">
                      ✓ {t.achievements.unlocked}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-[#20242B]">
                      {badge.title[language]}
                    </h3>
                    <p className="text-xs text-[#7E8796] mt-1 leading-relaxed">
                      {badge.description[language]}
                    </p>
                  </div>
                </div>

                <div className="pt-3 mt-3 border-t border-[#EBE8E1] flex items-center justify-between text-[11px] text-[#7E8796]">
                  <span>{badge.category}</span>
                  <span>{badge.unlockedAt || 'Earned'}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. In-Progress & Locked Badges */}
      <div className="space-y-3 pt-2">
        <h2 className="text-base font-bold text-[#20242B]">{t.achievements.locked}</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {lockedBadges.map((badge) => {
            const Icon = getBadgeIcon(badge.icon);
            return (
              <div
                key={badge.id}
                className="bg-[#F8F7F4]/80 border border-[#EBE8E1] rounded-2xl p-5 flex flex-col justify-between opacity-80"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="w-10 h-10 rounded-xl bg-white border border-[#EBE8E1] flex items-center justify-center text-[#7E8796]">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-medium text-[#7E8796] flex items-center gap-1">
                      <Lock className="w-3 h-3" />
                      <span>{t.achievements.locked}</span>
                    </span>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-[#4A5160]">
                      {badge.title[language]}
                    </h3>
                    <p className="text-xs text-[#7E8796] mt-1 leading-relaxed">
                      {badge.description[language]}
                    </p>
                  </div>
                </div>

                <div className="pt-3 mt-3 border-t border-[#EBE8E1] text-[11px] text-[#7E8796]">
                  <span>{badge.category}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
