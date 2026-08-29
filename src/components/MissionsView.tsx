import React from 'react';
import {
  Target,
  Award,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Calendar,
  Zap,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const MissionsView: React.FC = () => {
  const { missions, claimMissionReward, language, t, setActiveLessonPackId } = useApp();

  const dailyMissions = missions.filter((m) => m.type === 'daily');
  const weeklyMissions = missions.filter((m) => m.type === 'weekly');
  const subjectMissions = missions.filter((m) => m.type === 'subject');

  return (
    <div className="space-y-8 max-w-5xl mx-auto py-2">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
          {t.missions.title}
        </h1>
        <p className="text-sm text-slate-500 mt-1">{t.missions.subtitle}</p>
      </div>

      {/* 1. Today's Goal Card */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 shadow-2xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <Target className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">{t.missions.todaysGoal}</h2>
              <p className="text-xs text-slate-500">{t.missions.todaysGoalDesc}</p>
            </div>
          </div>
          <span className="text-xs font-semibold px-3 py-1 bg-emerald-50 text-emerald-800 rounded-full border border-emerald-200">
            Active Today
          </span>
        </div>

        <div className="space-y-1.5 pt-1">
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>Progress: 1 / 1 Activity</span>
            <span className="text-emerald-700 font-bold">100% Complete</span>
          </div>
          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div className="bg-emerald-600 h-full rounded-full w-full" />
          </div>
        </div>
      </div>

      {/* 2. Available Challenges List */}
      <div className="space-y-4">
        <h2 className="text-base font-bold text-slate-900">{t.missions.availableChallenges}</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {missions.map((mission) => {
            const isCompleted = mission.progress >= mission.total;
            const percentage = Math.min(100, Math.round((mission.progress / mission.total) * 100));

            return (
              <div
                key={mission.id}
                className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-2xs flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      {mission.type === 'daily' && 'Daily Goal'}
                      {mission.type === 'weekly' && 'Weekly Track'}
                      {mission.type === 'subject' && 'Subject Milestone'}
                    </span>
                    <span className="text-xs font-bold text-slate-800 bg-slate-100 px-2.5 py-0.5 rounded-full">
                      +{mission.xpReward} XP
                    </span>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-slate-900">
                      {mission.title[language]}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      {mission.description[language]}
                    </p>
                  </div>

                  {/* Progress bar */}
                  <div className="space-y-1 pt-1">
                    <div className="flex items-center justify-between text-[11px] text-slate-400 font-medium">
                      <span>Progress</span>
                      <span>
                        {mission.progress} of {mission.total}
                      </span>
                    </div>
                    <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          isCompleted ? 'bg-emerald-600' : 'bg-slate-400'
                        }`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                  {mission.badgeReward ? (
                    <span className="text-[11px] text-slate-500 font-medium flex items-center gap-1">
                      <Award className="w-3.5 h-3.5 text-amber-500" />
                      {mission.badgeReward}
                    </span>
                  ) : (
                    <span className="text-[11px] text-slate-400">Standard Quest</span>
                  )}

                  {mission.isClaimed ? (
                    <span className="text-xs font-semibold text-emerald-700 flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>{t.missions.completed}</span>
                    </span>
                  ) : isCompleted ? (
                    <button
                      onClick={() => claimMissionReward(mission.id)}
                      className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg shadow-2xs transition-colors"
                    >
                      {t.missions.claimReward}
                    </button>
                  ) : (
                    <button
                      onClick={() => setActiveLessonPackId('physics-quest')}
                      className="px-3.5 py-1.5 text-xs text-slate-700 hover:text-slate-900 font-medium flex items-center gap-1"
                    >
                      <span>Start Lesson</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
