import React from 'react';
import {
  Target,
  Award,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const MissionsView: React.FC = () => {
  const { missions, claimMissionReward, language, t, setActiveLessonPackId } = useApp();

  return (
    <div className="space-y-8 max-w-5xl mx-auto py-2">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#20242B]">
          {t.missions.title}
        </h1>
        <p className="text-sm text-[#7E8796] mt-1">{t.missions.subtitle}</p>
      </div>

      {/* 1. Today's Goal Card */}
      <div className="bg-white border border-[#EBE8E1] rounded-2xl p-5 sm:p-6 shadow-2xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#EDF1FC] text-[#3457D5] flex items-center justify-center">
              <Target className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[#20242B]">{t.missions.todaysGoal}</h2>
              <p className="text-xs text-[#7E8796]">{t.missions.todaysGoalDesc}</p>
            </div>
          </div>
          <span className="text-xs font-semibold px-3 py-1 bg-[#EDF1FC] text-[#3457D5] rounded-full border border-[#C3D2F7]">
            Active Today
          </span>
        </div>

        <div className="space-y-1.5 pt-1">
          <div className="flex items-center justify-between text-xs text-[#7E8796] font-medium">
            <span>Progress: 1 / 1 Activity</span>
            <span className="text-[#3457D5] font-bold">100% Complete</span>
          </div>
          <div className="w-full bg-[#F8F7F4] h-2 rounded-full overflow-hidden">
            <div className="bg-[#3457D5] h-full rounded-full w-full" />
          </div>
        </div>
      </div>

      {/* 2. Available Challenges List */}
      <div className="space-y-4">
        <h2 className="text-base font-bold text-[#20242B]">{t.missions.availableChallenges}</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {missions.map((mission) => {
            const isCompleted = mission.progress >= mission.total;
            const percentage = Math.min(100, Math.round((mission.progress / mission.total) * 100));

            return (
              <div
                key={mission.id}
                className="bg-white border border-[#EBE8E1] rounded-2xl p-5 shadow-2xs flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#7E8796]">
                      {mission.type === 'daily' && 'Daily Goal'}
                      {mission.type === 'weekly' && 'Weekly Track'}
                      {mission.type === 'subject' && 'Subject Milestone'}
                    </span>
                    <span className="text-xs font-bold text-[#20242B] bg-[#F8F7F4] border border-[#EBE8E1] px-2.5 py-0.5 rounded-full">
                      +{mission.xpReward} XP
                    </span>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-[#20242B]">
                      {mission.title[language]}
                    </h3>
                    <p className="text-xs text-[#7E8796] mt-1 leading-relaxed">
                      {mission.description[language]}
                    </p>
                  </div>

                  {/* Progress bar */}
                  <div className="space-y-1 pt-1">
                    <div className="flex items-center justify-between text-[11px] text-[#7E8796] font-medium">
                      <span>Progress</span>
                      <span>
                        {mission.progress} of {mission.total}
                      </span>
                    </div>
                    <div className="w-full bg-[#F8F7F4] h-1.5 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          isCompleted ? 'bg-[#3457D5]' : 'bg-[#D8D4CB]'
                        }`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-[#EBE8E1] flex items-center justify-between">
                  {mission.badgeReward ? (
                    <span className="text-[11px] text-[#977636] font-medium flex items-center gap-1 bg-[#FAF5ED] px-2 py-0.5 rounded-md border border-[#E8DCBE]">
                      <Award className="w-3.5 h-3.5 text-[#C9A96E]" />
                      {mission.badgeReward}
                    </span>
                  ) : (
                    <span className="text-[11px] text-[#7E8796]">Standard Quest</span>
                  )}

                  {mission.isClaimed ? (
                    <span className="text-xs font-semibold text-[#3457D5] flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4 text-[#3457D5]" />
                      <span>{t.missions.completed}</span>
                    </span>
                  ) : isCompleted ? (
                    <button
                      onClick={() => claimMissionReward(mission.id)}
                      className="px-3.5 py-1.5 bg-[#3457D5] hover:bg-[#2845B2] text-white text-xs font-semibold rounded-lg shadow-2xs transition-colors"
                    >
                      {t.missions.claimReward}
                    </button>
                  ) : (
                    <button
                      onClick={() => setActiveLessonPackId('physics-quest')}
                      className="px-3.5 py-1.5 text-xs text-[#4A5160] hover:text-[#20242B] font-medium flex items-center gap-1"
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
