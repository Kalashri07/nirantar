import React from 'react';
import {
  Play,
  CheckCircle2,
  BookOpen,
  ArrowRight,
  Flame,
  Star,
  Download,
  GraduationCap,
  Atom,
  FlaskConical,
  Calculator,
  Code2,
  ShieldAlert,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import type { LearningPack } from '../types';

export const HomeDashboard: React.FC = () => {
  const {
    userProfile,
    learningPacks,
    language,
    t,
    setActiveLessonPackId,
    setActivePackModalId,
    setCurrentNav,
  } = useApp();

  const currentCourse = learningPacks.find((p) => p.id === 'physics-quest') || learningPacks[0];
  const recommendedModules = learningPacks.filter((p) => p.id !== currentCourse.id);

  // Dynamic greeting based on time of day
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const getSubjectIcon = (iconName: string) => {
    switch (iconName) {
      case 'Atom':
        return Atom;
      case 'FlaskConical':
        return FlaskConical;
      case 'Calculator':
        return Calculator;
      case 'Code2':
        return Code2;
      case 'ShieldAlert':
        return ShieldAlert;
      default:
        return BookOpen;
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto py-2">
      {/* 1. Welcoming Header */}
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
          {getGreeting()}, {userProfile.name} 👋
        </h1>
        <p className="text-sm text-slate-500">{t.home.welcomeSub}</p>
      </div>

      {/* 2. Primary Action: Continue Learning Horizontal Card */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 shadow-2xs hover:border-slate-300 transition-colors">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-3 flex-1">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md">
                {t.home.continueLearning}
              </span>
              <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>{t.home.availableOffline}</span>
              </span>
            </div>

            <div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
                {currentCourse.title[language]}
              </h2>
              <p className="text-xs text-slate-500 mt-0.5 max-w-xl line-clamp-1">
                {currentCourse.subtitle[language]}
              </p>
            </div>

            {/* Simple progress bar */}
            <div className="space-y-1.5 max-w-md">
              <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
                <span>{currentCourse.progressPercentage}% complete</span>
                <span>{currentCourse.syllabus.filter((s) => s.completed).length} of {currentCourse.syllabus.length} lessons</span>
              </div>
              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-emerald-600 h-full rounded-full transition-all"
                  style={{ width: `${currentCourse.progressPercentage}%` }}
                />
              </div>
            </div>
          </div>

          <div className="flex items-center sm:self-center gap-2 pt-2 sm:pt-0">
            <button
              onClick={() => setActiveLessonPackId(currentCourse.id)}
              className="w-full sm:w-auto px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white text-xs font-semibold rounded-xl shadow-xs transition-all flex items-center justify-center gap-2"
            >
              <Play className="w-3.5 h-3.5 fill-white" />
              <span>{t.home.continueAction}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3. Learning Overview (3 Simple Summary Cards) */}
      <div className="space-y-3">
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500">
          {t.home.overview}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Card 1: Learning Progress */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-2xs space-y-2">
            <div className="flex items-center justify-between text-slate-500">
              <span className="text-xs font-semibold">{t.home.learningProgress}</span>
              <GraduationCap className="w-4 h-4 text-slate-400" />
            </div>
            <div>
              <span className="text-xl font-bold text-slate-900 block">
                {learningPacks.filter((p) => p.progressPercentage > 0).length} In Progress
              </span>
              <span className="text-xs text-slate-400">
                {userProfile.offlineActivitiesCompleted} lessons finished
              </span>
            </div>
          </div>

          {/* Card 2: Current Streak */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-2xs space-y-2">
            <div className="flex items-center justify-between text-slate-500">
              <span className="text-xs font-semibold">{t.home.currentStreak}</span>
              <Flame className="w-4 h-4 text-amber-500" />
            </div>
            <div>
              <span className="text-xl font-bold text-slate-900 block flex items-center gap-1.5">
                <span>🔥 {userProfile.streakDays} {t.home.daysStreak}</span>
              </span>
              <span className="text-xs text-slate-400">Daily learning habit active</span>
            </div>
          </div>

          {/* Card 3: Points */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-2xs space-y-2">
            <div className="flex items-center justify-between text-slate-500">
              <span className="text-xs font-semibold">{t.home.points}</span>
              <Star className="w-4 h-4 text-amber-500" />
            </div>
            <div>
              <span className="text-xl font-bold text-slate-900 block flex items-center gap-1">
                <span>⭐ {userProfile.currentXp.toLocaleString()} XP</span>
              </span>
              <span className="text-xs text-slate-400">
                Level {userProfile.level} · {userProfile.levelTitle[language]}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Recommended for You */}
      <div className="space-y-4 pt-2">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              {t.home.recommended}
            </h2>
            <p className="text-xs text-slate-500">{t.home.recommendedSub}</p>
          </div>
          <button
            onClick={() => setCurrentNav('learn')}
            className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
          >
            <span>{t.home.viewAll}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {recommendedModules.map((module) => {
            const Icon = getSubjectIcon(module.icon);
            return (
              <div
                key={module.id}
                className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-2xs hover:border-slate-300 hover:shadow-xs transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-200 text-slate-700 flex items-center justify-center">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                          {module.subjectName?.[language] || module.worldId}
                        </span>
                        <span className="text-[10px] text-slate-400 font-medium">
                          {module.difficulty} · {module.estimatedSizeMb} MB
                        </span>
                      </div>
                    </div>

                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                        module.isDownloaded
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      {module.isDownloaded ? '✓ Offline Ready' : `${module.estimatedSizeMb} MB`}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-slate-900 line-clamp-1">
                      {module.title[language]}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                      {module.description[language]}
                    </p>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 font-medium">
                    {module.syllabus.length} Checkpoints
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setActivePackModalId(module.id)}
                      className="px-2.5 py-1 text-xs text-slate-600 hover:text-slate-900 font-medium"
                    >
                      Details
                    </button>
                    <button
                      onClick={() => setActiveLessonPackId(module.id)}
                      className="px-3.5 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1"
                    >
                      <span>Start</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
