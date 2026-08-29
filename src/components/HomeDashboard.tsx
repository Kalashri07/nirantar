import React from 'react';
import {
  Play,
  CheckCircle2,
  BookOpen,
  ArrowRight,
  Flame,
  Star,
  GraduationCap,
  Atom,
  FlaskConical,
  Calculator,
  Code2,
  ShieldAlert,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

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

  const getSubjectColors = (worldId: string) => {
    switch (worldId) {
      case 'science':
        return { bg: 'bg-[#EDF1FC]', text: 'text-[#3457D5]', border: 'border-[#C3D2F7]' };
      case 'math':
        return { bg: 'bg-[#FAF5ED]', text: 'text-[#977636]', border: 'border-[#E8DCBE]' };
      case 'language':
        return { bg: 'bg-[#EEF7F6]', text: 'text-[#2B7A78]', border: 'border-[#CDEAE8]' };
      case 'tech':
        return { bg: 'bg-[#EEF2FC]', text: 'text-[#3457D5]', border: 'border-[#CAD6FA]' };
      default:
        return { bg: 'bg-[#F8F7F4]', text: 'text-[#4A5160]', border: 'border-[#EBE8E1]' };
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto py-2">
      {/* 1. Welcoming Header */}
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#20242B]">
          {getGreeting()}, {userProfile.name} 👋
        </h1>
        <p className="text-sm text-[#7E8796]">{t.home.welcomeSub}</p>
      </div>

      {/* 2. Primary Action: Continue Learning Horizontal Card */}
      <div className="bg-white border border-[#EBE8E1] rounded-2xl p-5 sm:p-6 shadow-2xs hover:border-[#D8D4CB] transition-colors">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-3 flex-1">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#3457D5] bg-[#EDF1FC] px-2.5 py-0.5 rounded-md">
                {t.home.continueLearning}
              </span>
              <span className="text-xs text-[#7E8796] font-medium flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#3457D5]" />
                <span>{t.home.availableOffline}</span>
              </span>
            </div>

            <div>
              <h2 className="text-lg sm:text-xl font-bold text-[#20242B] leading-snug">
                {currentCourse.title[language]}
              </h2>
              <p className="text-xs text-[#7E8796] mt-0.5 max-w-xl line-clamp-1">
                {currentCourse.subtitle[language]}
              </p>
            </div>

            {/* Simple progress bar */}
            <div className="space-y-1.5 max-w-md">
              <div className="flex items-center justify-between text-xs text-[#7E8796] font-medium">
                <span>{currentCourse.progressPercentage}% complete</span>
                <span>{currentCourse.syllabus.filter((s) => s.completed).length} of {currentCourse.syllabus.length} lessons</span>
              </div>
              <div className="w-full bg-[#F8F7F4] h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-[#3457D5] h-full rounded-full transition-all"
                  style={{ width: `${currentCourse.progressPercentage}%` }}
                />
              </div>
            </div>
          </div>

          <div className="flex items-center sm:self-center gap-2 pt-2 sm:pt-0">
            <button
              onClick={() => setActiveLessonPackId(currentCourse.id)}
              className="w-full sm:w-auto px-5 py-2.5 bg-[#3457D5] hover:bg-[#2845B2] active:scale-95 text-white text-xs font-semibold rounded-xl shadow-xs transition-all flex items-center justify-center gap-2"
            >
              <Play className="w-3.5 h-3.5 fill-white" />
              <span>{t.home.continueAction}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3. Learning Overview (3 Simple Summary Cards) */}
      <div className="space-y-3">
        <h2 className="text-sm font-bold uppercase tracking-wider text-[#7E8796]">
          {t.home.overview}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Card 1: Learning Progress */}
          <div className="bg-white border border-[#EBE8E1] rounded-2xl p-4 shadow-2xs space-y-2">
            <div className="flex items-center justify-between text-[#7E8796]">
              <span className="text-xs font-semibold">{t.home.learningProgress}</span>
              <GraduationCap className="w-4 h-4 text-[#3457D5]" />
            </div>
            <div>
              <span className="text-xl font-bold text-[#20242B] block">
                {learningPacks.filter((p) => p.progressPercentage > 0).length} In Progress
              </span>
              <span className="text-xs text-[#7E8796]">
                {userProfile.offlineActivitiesCompleted} lessons finished
              </span>
            </div>
          </div>

          {/* Card 2: Current Streak */}
          <div className="bg-white border border-[#EBE8E1] rounded-2xl p-4 shadow-2xs space-y-2">
            <div className="flex items-center justify-between text-[#7E8796]">
              <span className="text-xs font-semibold">{t.home.currentStreak}</span>
              <Flame className="w-4 h-4 text-[#C9A96E]" />
            </div>
            <div>
              <span className="text-xl font-bold text-[#20242B] block flex items-center gap-1.5">
                <span>🔥 {userProfile.streakDays} {t.home.daysStreak}</span>
              </span>
              <span className="text-xs text-[#7E8796]">Daily learning habit active</span>
            </div>
          </div>

          {/* Card 3: Points */}
          <div className="bg-white border border-[#EBE8E1] rounded-2xl p-4 shadow-2xs space-y-2">
            <div className="flex items-center justify-between text-[#7E8796]">
              <span className="text-xs font-semibold">{t.home.points}</span>
              <Star className="w-4 h-4 text-[#C9A96E]" />
            </div>
            <div>
              <span className="text-xl font-bold text-[#20242B] block flex items-center gap-1">
                <span>⭐ {userProfile.currentXp.toLocaleString()} XP</span>
              </span>
              <span className="text-xs text-[#7E8796]">
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
            <h2 className="text-base font-bold text-[#20242B]">
              {t.home.recommended}
            </h2>
            <p className="text-xs text-[#7E8796]">{t.home.recommendedSub}</p>
          </div>
          <button
            onClick={() => setCurrentNav('learn')}
            className="text-xs font-semibold text-[#3457D5] hover:text-[#2845B2] flex items-center gap-1"
          >
            <span>{t.home.viewAll}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {recommendedModules.map((module) => {
            const Icon = getSubjectIcon(module.icon);
            const colors = getSubjectColors(module.worldId);
            return (
              <div
                key={module.id}
                className="bg-white border border-[#EBE8E1] rounded-2xl p-5 shadow-2xs hover:border-[#D8D4CB] hover:shadow-xs transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <div className={`w-8 h-8 rounded-lg ${colors.bg} border ${colors.border} ${colors.text} flex items-center justify-center`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-[11px] font-bold text-[#7E8796] uppercase tracking-wider block">
                          {module.subjectName?.[language] || module.worldId}
                        </span>
                        <span className="text-[10px] text-[#7E8796] font-medium">
                          {module.difficulty} · {module.estimatedSizeMb} MB
                        </span>
                      </div>
                    </div>

                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                        module.isDownloaded
                          ? 'bg-[#EDF1FC] text-[#3457D5] border border-[#C3D2F7]'
                          : 'bg-[#F8F7F4] text-[#7E8796] border border-[#EBE8E1]'
                      }`}
                    >
                      {module.isDownloaded ? '✓ Offline Ready' : `${module.estimatedSizeMb} MB`}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-[#20242B] line-clamp-1">
                      {module.title[language]}
                    </h3>
                    <p className="text-xs text-[#7E8796] mt-1 line-clamp-2 leading-relaxed">
                      {module.description[language]}
                    </p>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-[#EBE8E1] flex items-center justify-between">
                  <span className="text-[11px] text-[#7E8796] font-medium">
                    {module.syllabus.length} Checkpoints
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setActivePackModalId(module.id)}
                      className="px-2.5 py-1 text-xs text-[#4A5160] hover:text-[#20242B] font-medium"
                    >
                      Details
                    </button>
                    <button
                      onClick={() => setActiveLessonPackId(module.id)}
                      className="px-3.5 py-1.5 bg-[#EDF1FC] hover:bg-[#DDE6FA] text-[#3457D5] text-xs font-semibold rounded-lg transition-colors flex items-center gap-1"
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
