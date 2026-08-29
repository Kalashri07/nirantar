import React from 'react';
import {
  Target,
  Award,
  CheckCircle2,
  Clock,
  Sparkles,
  Flame,
  ArrowRight,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const MissionsView: React.FC = () => {
  const { missions, claimMissionReward, language, t } = useApp();

  const activeMissions = missions.filter((m) => !m.isClaimed);
  const completedMissions = missions.filter((m) => m.isClaimed);

  return (
    <div className="space-y-8 max-w-5xl mx-auto py-2">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#102A43]">
          {t.missions.title}
        </h1>
        <p className="text-sm text-[#675E54] mt-1">{t.missions.subtitle}</p>
      </div>

      {/* 1. Daily Learning Goal Card */}
      <div className="bg-[#FAF6EF] border border-[#D8CABA] rounded-2xl p-6 sm:p-7 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-[#675E54] block">
              {t.missions.todaysGoal}
            </span>
            <h2 className="text-lg font-bold text-[#102A43]">
              Daily Habit: Finish 1 Lesson Checkpoint
            </h2>
            <p className="text-xs text-[#675E54]">{t.missions.todaysGoalDesc}</p>
          </div>

          <div className="flex items-center gap-2 bg-[#E9DDCB] border border-[#D8CABA] px-3.5 py-1.5 rounded-xl text-xs font-bold text-[#102A43] self-start sm:self-auto">
            <span>⭐ +50 XP Daily Reward</span>
          </div>
        </div>

        {/* Goal Progress bar */}
        <div className="space-y-1.5 pt-2">
          <div className="flex justify-between text-xs font-semibold text-[#102A43]">
            <span>{t.missions.weeklyProgress}</span>
            <span>4 / 5 Days Completed</span>
          </div>
          <div className="w-full bg-[#E9DDCB] h-2 rounded-full overflow-hidden">
            <div className="bg-[#102A43] h-full rounded-full w-4/5" />
          </div>
        </div>
      </div>

      {/* 2. Available Learning Missions */}
      <div className="space-y-4">
        <h2 className="text-base font-bold text-[#102A43]">
          {t.missions.availableChallenges}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {missions.map((mission) => {
            const isDone = mission.progress >= mission.total;
            return (
              <div
                key={mission.id}
                className="bg-[#FAF6EF] border border-[#D8CABA] hover:border-[#C9B69C] hover:bg-[#EFE5D5] rounded-2xl p-5 shadow-2xs flex flex-col justify-between transition-all space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#675E54] bg-[#E9DDCB] px-2 py-0.5 rounded border border-[#D8CABA]">
                      {mission.type} Mission
                    </span>
                    <span className="text-xs font-bold text-[#102A43]">
                      +{mission.xpReward} XP
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-[#102A43]">
                      {mission.title[language]}
                    </h3>
                    <p className="text-xs text-[#675E54] mt-1 leading-relaxed">
                      {mission.description[language]}
                    </p>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-1 pt-1">
                    <div className="flex justify-between text-[11px] font-medium text-[#675E54]">
                      <span>Progress</span>
                      <span>
                        {mission.progress} / {mission.total}
                      </span>
                    </div>
                    <div className="w-full bg-[#E9DDCB] h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-[#102A43] h-full rounded-full transition-all duration-300"
                        style={{
                          width: `${Math.min(
                            100,
                            (mission.progress / mission.total) * 100
                          )}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Claim Button */}
                <div className="pt-2 border-t border-[#D8CABA]">
                  {mission.isClaimed ? (
                    <div className="py-2 text-center text-xs font-semibold text-[#1E573E] bg-[#DCEFE5] rounded-xl border border-[#B6DEC9]">
                      ✓ {t.missions.completed}
                    </div>
                  ) : isDone ? (
                    <button
                      onClick={() => claimMissionReward(mission.id)}
                      className="w-full py-2 bg-[#102A43] hover:bg-[#0C1F33] active:scale-95 text-white text-xs font-bold rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{t.missions.claimReward}</span>
                    </button>
                  ) : (
                    <div className="py-2 text-center text-xs font-medium text-[#675E54] bg-[#E9DDCB] rounded-xl border border-[#D8CABA]">
                      In Progress
                    </div>
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
