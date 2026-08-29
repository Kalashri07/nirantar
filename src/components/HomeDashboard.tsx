import React from 'react';
import {
  Play,
  Download,
  Flame,
  Star,
  CheckCircle2,
  HardDrive,
  Clock,
  ArrowRight,
  BookOpen,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const HomeDashboard: React.FC = () => {
  const {
    userProfile,
    learningPacks,
    language,
    setCurrentNav,
    setActivePackModalId,
    setActiveLessonPackId,
    t,
  } = useApp();

  // Find the in-progress pack
  const continuePack =
    learningPacks.find((p) => p.progressPercentage > 0 && p.progressPercentage < 100) ||
    learningPacks[0];

  const recommendedPacks = learningPacks.slice(0, 3);

  const handleStartLesson = (packId: string) => {
    setActiveLessonPackId(packId);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto py-2">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#102A43]">
          Welcome to Nirantar 👋
        </h1>
        <p className="text-sm text-[#675E54] mt-1">{t.tagline}</p>
      </div>

      {/* 1. Continue Learning Hero Card (Deep Navy Blue structural highlight) */}
      {continuePack && (
        <div className="bg-[#102A43] border border-[#0C1F33] rounded-2xl p-6 sm:p-8 text-white shadow-md relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div className="space-y-2 max-w-xl">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#C9B69C] bg-[#1A3A5A] px-2.5 py-0.5 rounded-full border border-[#244E78]">
                  {continuePack.subjectName?.[language] || continuePack.worldId}
                </span>
                {continuePack.isDownloaded && (
                  <span className="text-[11px] text-[#C9B69C] flex items-center gap-1 font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{t.home.availableOffline}</span>
                  </span>
                )}
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-white leading-snug">
                {continuePack.title[language]}
              </h2>
              <p className="text-xs sm:text-sm text-[#BAC7D5] line-clamp-2">
                {continuePack.subtitle[language]}
              </p>

              {/* Progress bar */}
              <div className="pt-2 space-y-1.5">
                <div className="flex justify-between text-xs font-semibold text-[#E2E9F0]">
                  <span>{t.home.learningProgress}</span>
                  <span>{continuePack.progressPercentage}%</span>
                </div>
                <div className="w-full bg-[#1A3A5A] h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-[#C9B69C] h-full rounded-full transition-all duration-300"
                    style={{ width: `${Math.max(8, continuePack.progressPercentage)}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Right Action buttons */}
            <div className="flex flex-col sm:flex-row md:flex-col gap-2.5 flex-shrink-0">
              <button
                onClick={() => handleStartLesson(continuePack.id)}
                className="px-6 py-3 bg-[#C9B69C] hover:bg-[#BFA98C] active:scale-95 text-[#102A43] font-bold text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-2"
              >
                <Play className="w-3.5 h-3.5 fill-[#102A43]" />
                <span>{t.home.continueAction}</span>
              </button>

              <button
                onClick={() => setActivePackModalId(continuePack.id)}
                className="px-6 py-2.5 border border-[#244E78] hover:bg-[#1A3A5A] text-xs font-semibold text-[#E2E9F0] rounded-xl transition-colors text-center"
              >
                View Syllabus
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. Overview Stats Strip (Warm Light Beige elevated cards) */}
      <div className="space-y-3">
        <h2 className="text-base font-bold text-[#102A43]">{t.home.overview}</h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Daily Streak */}
          <div className="bg-[#FAF6EF] border border-[#D8CABA] rounded-2xl p-5 shadow-2xs space-y-1">
            <div className="flex items-center justify-between text-xs text-[#675E54]">
              <span className="font-semibold">{t.home.currentStreak}</span>
              <Flame className="w-4 h-4 text-[#9E6B20]" />
            </div>
            <div className="text-2xl font-bold text-[#102A43]">
              {userProfile.streakDays}{' '}
              <span className="text-xs font-normal text-[#675E54]">{t.home.daysStreak}</span>
            </div>
            <span className="text-[11px] text-[#675E54] block">Maintained offline & online</span>
          </div>

          {/* Points / XP */}
          <div className="bg-[#FAF6EF] border border-[#D8CABA] rounded-2xl p-5 shadow-2xs space-y-1">
            <div className="flex items-center justify-between text-xs text-[#675E54]">
              <span className="font-semibold">{t.home.points}</span>
              <Star className="w-4 h-4 text-[#9E6B20]" />
            </div>
            <div className="text-2xl font-bold text-[#102A43]">
              {userProfile.currentXp.toLocaleString()}{' '}
              <span className="text-xs font-normal text-[#675E54]">XP</span>
            </div>
            <span className="text-[11px] text-[#675E54] block">
              Level {userProfile.level} ({userProfile.levelTitle[language]})
            </span>
          </div>

          {/* Downloaded Modules */}
          <div className="bg-[#FAF6EF] border border-[#D8CABA] rounded-2xl p-5 shadow-2xs space-y-1">
            <div className="flex items-center justify-between text-xs text-[#675E54]">
              <span className="font-semibold">{t.library.readyOffline}</span>
              <HardDrive className="w-4 h-4 text-[#102A43]" />
            </div>
            <div className="text-2xl font-bold text-[#102A43]">
              {learningPacks.filter((p) => p.isDownloaded).length}{' '}
              <span className="text-xs font-normal text-[#675E54]">packs</span>
            </div>
            <span className="text-[11px] text-[#675E54] block">Ready for 100% offline study</span>
          </div>
        </div>
      </div>

      {/* 3. Recommended Modules */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-[#102A43]">{t.home.recommended}</h2>
            <p className="text-xs text-[#675E54] mt-0.5">{t.home.recommendedSub}</p>
          </div>
          <button
            onClick={() => setCurrentNav('learn')}
            className="text-xs font-bold text-[#102A43] hover:text-[#0C1F33] flex items-center gap-1"
          >
            <span>{t.home.viewAll}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {recommendedPacks.map((pack) => (
            <div
              key={pack.id}
              className="bg-[#FAF6EF] border border-[#D8CABA] hover:border-[#C9B69C] hover:bg-[#EFE5D5] rounded-2xl p-5 shadow-2xs flex flex-col justify-between transition-all"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#675E54] bg-[#E9DDCB] px-2 py-0.5 rounded border border-[#D8CABA]">
                    {pack.subjectName?.[language] || pack.worldId}
                  </span>
                  {pack.isDownloaded && (
                    <span className="text-[10px] text-[#1E573E] bg-[#DCEFE5] px-1.5 py-0.5 rounded border border-[#B6DEC9] font-medium">
                      ✓ Offline
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="text-sm font-bold text-[#102A43] leading-snug">
                    {pack.title[language]}
                  </h3>
                  <p className="text-xs text-[#675E54] mt-1 line-clamp-2 leading-relaxed">
                    {pack.subtitle[language]}
                  </p>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-[#D8CABA] flex items-center justify-between">
                <span className="text-[11px] text-[#675E54] font-medium">
                  {pack.estimatedSizeMb} MB · {pack.difficulty}
                </span>

                <button
                  onClick={() => handleStartLesson(pack.id)}
                  className="px-3.5 py-1.5 bg-[#102A43] hover:bg-[#0C1F33] text-white text-xs font-bold rounded-lg shadow-2xs transition-colors flex items-center gap-1"
                >
                  <span>Start Lesson →</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
