import React, { useState, useEffect } from 'react';
import {
  Award,
  Lock,
  Flame,
  Zap,
  WifiOff,
  Terminal,
  ShieldCheck,
  Telescope,
  Sparkles,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { BadgeItem } from '../types';
import { DigitalBadgeModal } from './DigitalBadgeModal';

export const AchievementsView: React.FC = () => {
  const { badges, language, t, userProfile, triggerCelebration } = useApp();
  const [selectedBadge, setSelectedBadge] = useState<BadgeItem | null>(null);
  const [newlyUnlockedBadge, setNewlyUnlockedBadge] = useState<BadgeItem | null>(null);

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
      {/* Newly Unlocked Toast / Banner if active */}
      {newlyUnlockedBadge && (
        <div className="bg-[#FAF6EF] border-2 border-[#102A43] p-4 rounded-2xl shadow-md flex items-center justify-between gap-4 animate-in slide-in-from-top-2 duration-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#E9DDCB] text-[#102A43] flex items-center justify-center font-bold">
              🎉
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#675E54] block">
                ACHIEVEMENT UNLOCKED!
              </span>
              <h3 className="text-sm font-bold text-[#102A43]">
                {newlyUnlockedBadge.title[language]} · +{newlyUnlockedBadge.xpReward} XP
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setSelectedBadge(newlyUnlockedBadge);
                setNewlyUnlockedBadge(null);
              }}
              className="px-3.5 py-1.5 bg-[#102A43] hover:bg-[#0C1F33] text-white text-xs font-bold rounded-xl shadow-2xs transition-colors"
            >
              {t.achievements.viewBadge}
            </button>
            <button
              onClick={() => setNewlyUnlockedBadge(null)}
              className="text-xs text-[#675E54] hover:text-[#102A43] p-1"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#102A43]">
            {t.achievements.title}
          </h1>
          <p className="text-sm text-[#675E54] mt-1">{t.achievements.subtitle}</p>
        </div>

        <div className="flex items-center gap-3 bg-[#FAF6EF] border border-[#D8CABA] rounded-2xl px-4 py-2.5 shadow-2xs self-start">
          <div className="w-8 h-8 rounded-lg bg-[#E9DDCB] text-[#102A43] flex items-center justify-center border border-[#D8CABA]">
            <Award className="w-4 h-4" />
          </div>
          <div>
            <span className="text-xs font-bold text-[#102A43] block">
              {unlockedBadges.length} of {badges.length} Unlocked
            </span>
            <span className="text-[10px] text-[#675E54] font-medium">
              Total Points: {userProfile.currentXp.toLocaleString()} XP
            </span>
          </div>
        </div>
      </div>

      {/* 1. Recently Earned Badges */}
      <div className="space-y-3">
        <h2 className="text-base font-bold text-[#102A43]">{t.achievements.recentEarned}</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {unlockedBadges.map((badge) => {
            const Icon = getBadgeIcon(badge.icon);
            return (
              <div
                key={badge.id}
                className="bg-[#FAF6EF] border border-[#D8CABA] hover:border-[#C9B69C] hover:bg-[#EFE5D5] rounded-2xl p-5 shadow-2xs flex flex-col justify-between transition-all space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="w-10 h-10 rounded-xl bg-[#E9DDCB] border border-[#D8CABA] flex items-center justify-center text-[#102A43]">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#1E573E] bg-[#DCEFE5] px-2 py-0.5 rounded border border-[#B6DEC9]">
                      ✓ {t.achievements.unlocked}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-[#102A43]">
                      {badge.title[language]}
                    </h3>
                    <p className="text-xs text-[#675E54] mt-1 leading-relaxed line-clamp-2">
                      {badge.description[language]}
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#D8CABA] flex items-center justify-between text-[11px] text-[#675E54]">
                  <div className="font-mono font-semibold text-[#102A43]">
                    +{badge.xpReward} XP
                  </div>

                  <button
                    onClick={() => setSelectedBadge(badge)}
                    className="px-3 py-1.5 bg-[#102A43] hover:bg-[#0C1F33] text-white text-xs font-bold rounded-xl shadow-2xs transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <span>{t.achievements.viewBadge}</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. In-Progress & Locked Badges */}
      <div className="space-y-3 pt-2">
        <h2 className="text-base font-bold text-[#102A43]">{t.achievements.locked}</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {lockedBadges.map((badge) => {
            const Icon = getBadgeIcon(badge.icon);
            return (
              <div
                key={badge.id}
                className="bg-[#E9DDCB]/70 border border-[#D8CABA] rounded-2xl p-5 flex flex-col justify-between opacity-80 space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="w-10 h-10 rounded-xl bg-[#FAF6EF] border border-[#D8CABA] flex items-center justify-center text-[#675E54]">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-medium text-[#675E54] flex items-center gap-1">
                      <Lock className="w-3 h-3" />
                      <span>{t.achievements.locked}</span>
                    </span>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-[#102A43]">
                      {badge.title[language]}
                    </h3>
                    <p className="text-xs text-[#675E54] mt-1 leading-relaxed">
                      {badge.description[language]}
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#D8CABA] flex items-center justify-between text-[11px] text-[#675E54]">
                  <span>{badge.category}</span>
                  <span className="font-mono font-semibold">+{badge.xpReward} XP</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Digital Badge Detail & Print/Export Modal */}
      <DigitalBadgeModal
        badge={selectedBadge}
        onClose={() => setSelectedBadge(null)}
      />
    </div>
  );
};
