import React, { useState, useMemo } from 'react';
import {
  Trophy,
  Flame,
  Star,
  Award,
  Medal,
  TrendingUp,
  Target,
  Sparkles,
  ArrowRight,
  Swords,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import {
  mockLeaderboardLearners,
  getLearnerPeriodMetrics,
  LeaderboardTimePeriod,
} from '../data/mockLeaderboardData';

export const LeaderboardView: React.FC = () => {
  const { userProfile, language, t, setCurrentNav } = useApp();
  const [timeFilter, setTimeFilter] = useState<LeaderboardTimePeriod>('week');

  // Dynamic date-based calculations for the selected time period
  const { rankedLearners, currentUserRank, currentUserScore, targetLearner, xpNeeded, progressPercent } = useMemo(() => {
    // 1. Calculate metrics for all learners for the selected period
    const computedLearners = mockLeaderboardLearners.map((lrn) => {
      if (lrn.isCurrentUser) {
        // Compute active user's period XP proportionally based on their live profile XP
        let userPeriodXp = userProfile.currentXp;
        let userPeriodMissions = Math.max(1, userProfile.offlineActivitiesCompleted);

        if (timeFilter === 'week') {
          userPeriodXp = Math.min(
            userProfile.currentXp,
            Math.round(userProfile.currentXp * 0.23) + (userProfile.offlineActivitiesCompleted * 20) + 40
          );
          userPeriodMissions = Math.max(2, Math.round(userProfile.offlineActivitiesCompleted * 0.4) + 2);
        } else if (timeFilter === 'month') {
          userPeriodXp = Math.min(
            userProfile.currentXp,
            Math.round(userProfile.currentXp * 0.68) + (userProfile.offlineActivitiesCompleted * 30) + 70
          );
          userPeriodMissions = Math.max(4, Math.round(userProfile.offlineActivitiesCompleted * 0.7) + 3);
        }

        return {
          ...lrn,
          name: `${userProfile.name} (You)`,
          xp: userPeriodXp,
          level: userProfile.level,
          missionsCompleted: userPeriodMissions,
          streakDays: userProfile.streakDays,
        };
      }

      const metrics = getLearnerPeriodMetrics(lrn, timeFilter);
      return {
        ...lrn,
        xp: metrics.xp,
        missionsCompleted: metrics.missionsCompleted,
      };
    });

    // 2. Sort learners strictly by XP earned in this period descending
    computedLearners.sort((a, b) => b.xp - a.xp);

    // 3. Re-assign ranks based on sorted order
    const ranked = computedLearners.map((lrn, index) => ({
      ...lrn,
      rank: index + 1,
    }));

    // 4. Determine user's standing and targets
    const userIndex = ranked.findIndex((l) => l.isCurrentUser);
    const userRank = userIndex >= 0 ? userIndex + 1 : 4;
    const userScore = userIndex >= 0 ? ranked[userIndex].xp : userProfile.currentXp;

    let target = null;
    let needed = 0;
    let percent = 100;

    if (userIndex > 0) {
      target = ranked[userIndex - 1];
      needed = Math.max(0, target.xp - userScore + 10);
      percent = Math.min(100, Math.round((userScore / target.xp) * 100));
    }

    return {
      rankedLearners: ranked,
      currentUserRank: userRank,
      currentUserScore: userScore,
      targetLearner: target,
      xpNeeded: needed,
      progressPercent: percent,
    };
  }, [timeFilter, userProfile]);

  const getRankBadge = (rank: number) => {
    switch (rank) {
      case 1:
        return <span className="text-base">🥇</span>;
      case 2:
        return <span className="text-base">🥈</span>;
      case 3:
        return <span className="text-base">🥉</span>;
      default:
        return <span className="text-xs font-bold text-[#675E54]">#{rank}</span>;
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto py-2">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#102A43] flex items-center gap-2.5">
            <span>🏆</span>
            <span>{t.leaderboard.title}</span>
          </h1>
          <p className="text-sm text-[#675E54] mt-1">{t.leaderboard.subtitle}</p>
        </div>

        {/* Quick link to Personal Challenges */}
        <button
          onClick={() => setCurrentNav('challenges')}
          className="self-start sm:self-center px-4 py-2 bg-[#E9DDCB] hover:bg-[#E2D4BF] border border-[#D8CABA] text-[#102A43] rounded-xl text-xs font-bold transition-colors flex items-center gap-2 shadow-2xs cursor-pointer"
        >
          <Swords className="w-4 h-4 text-[#102A43]" />
          <span>Challenge a Friend →</span>
        </button>
      </div>

      {/* 1. YOUR POSITION CARD */}
      <div className="bg-[#FAF6EF] border border-[#D8CABA] rounded-2xl p-6 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-[#E9DDCB] border border-[#D8CABA] flex items-center justify-center text-[#102A43] text-lg font-bold">
              🏅
            </div>
            <div>
              <span className="text-xs font-bold text-[#675E54] uppercase tracking-wider block">
                {t.leaderboard.yourPositionTitle}
              </span>
              <h2 className="text-lg font-bold text-[#102A43]">
                {t.leaderboard.yourRank} #{currentUserRank} · {userProfile.name}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <div className="p-2.5 bg-[#E9DDCB] border border-[#D8CABA] rounded-xl text-center min-w-[100px]">
              <span className="text-[10px] text-[#675E54] block">Your Score</span>
              <span className="font-bold text-[#102A43] text-sm">
                ⭐ {currentUserScore.toLocaleString()} XP
              </span>
            </div>
            <div className="p-2.5 bg-[#E9DDCB] border border-[#D8CABA] rounded-xl text-center min-w-[100px]">
              <span className="text-[10px] text-[#675E54] block">Current Streak</span>
              <span className="font-bold text-[#102A43] text-sm">
                🔥 {userProfile.streakDays} Days
              </span>
            </div>
          </div>
        </div>

        {/* Progress towards next rank */}
        <div className="space-y-1.5 pt-2 border-t border-[#D8CABA]">
          <div className="flex justify-between text-xs text-[#675E54]">
            {targetLearner ? (
              <>
                <span>
                  {t.leaderboard.pointsNeeded} #{targetLearner.rank} ({targetLearner.name.replace(' (You)', '')})
                </span>
                <span className="font-bold text-[#102A43]">{xpNeeded} XP needed</span>
              </>
            ) : (
              <span className="font-bold text-[#1E573E]">
                👑 You are in 1st Place for {timeFilter === 'week' ? 'this week' : timeFilter === 'month' ? 'this month' : 'this year'}!
              </span>
            )}
          </div>
          <div className="w-full bg-[#E9DDCB] h-2 rounded-full overflow-hidden">
            <div
              className="bg-[#102A43] h-full rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* 2. Filter Controls (Time-Period Only: This Week | This Month | This Year) */}
      <div className="flex items-center bg-[#FAF6EF] border border-[#D8CABA] p-3 rounded-2xl shadow-2xs">
        <div className="flex items-center bg-[#E9DDCB] border border-[#D8CABA] p-1 rounded-xl">
          {[
            { id: 'week' as const, label: t.leaderboard.weeklyTab },
            { id: 'month' as const, label: t.leaderboard.monthlyTab },
            { id: 'year' as const, label: t.leaderboard.yearlyTab || 'This Year' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setTimeFilter(tab.id)}
              className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                timeFilter === tab.id
                  ? 'bg-[#102A43] text-white font-bold shadow-2xs'
                  : 'text-[#675E54] hover:text-[#102A43]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Ranked Leaderboard List */}
      <div className="bg-[#FAF6EF] border border-[#D8CABA] rounded-2xl overflow-hidden shadow-2xs">
        <div className="px-5 py-3.5 border-b border-[#D8CABA] bg-[#E9DDCB] grid grid-cols-12 text-[11px] font-bold text-[#675E54] uppercase tracking-wider">
          <div className="col-span-2 sm:col-span-1">{t.leaderboard.rankCol}</div>
          <div className="col-span-6 sm:col-span-5">{t.leaderboard.learnerCol}</div>
          <div className="col-span-2 text-center hidden sm:block">{t.leaderboard.levelCol}</div>
          <div className="col-span-2 text-center hidden sm:block">{t.leaderboard.missionsCol}</div>
          <div className="col-span-4 text-right">{t.leaderboard.xpCol}</div>
        </div>

        <div className="divide-y divide-[#D8CABA]">
          {rankedLearners.map((learner) => {
            const isMe = learner.isCurrentUser;
            return (
              <div
                key={learner.id}
                className={`px-5 py-4 grid grid-cols-12 items-center transition-colors ${
                  isMe
                    ? 'bg-[#E9DDCB] border-l-4 border-[#102A43]'
                    : 'hover:bg-[#EFE5D5]'
                }`}
              >
                {/* Rank */}
                <div className="col-span-2 sm:col-span-1 flex items-center gap-1.5 font-bold">
                  {getRankBadge(learner.rank)}
                </div>

                {/* Learner Name & Badge */}
                <div className="col-span-6 sm:col-span-5 flex items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs ${
                      isMe
                        ? 'bg-[#102A43] text-white'
                        : learner.rank === 1
                        ? 'bg-[#E9DDCB] border border-[#D8CABA] text-[#102A43]'
                        : 'bg-[#E9DDCB] border border-[#D8CABA] text-[#102A43]'
                    }`}
                  >
                    {learner.avatar}
                  </div>
                  <div>
                    <span className="text-sm font-bold block text-[#102A43]">
                      {learner.name}
                    </span>
                    <span className="text-[11px] text-[#675E54] flex items-center gap-1 sm:hidden">
                      Level {learner.level} • {learner.missionsCompleted} missions
                    </span>
                  </div>
                </div>

                {/* Level */}
                <div className="col-span-2 text-center hidden sm:block">
                  <span className="text-xs font-semibold text-[#102A43] bg-[#E9DDCB] px-2 py-0.5 rounded-md border border-[#D8CABA]">
                    Level {learner.level}
                  </span>
                </div>

                {/* Missions */}
                <div className="col-span-2 text-center hidden sm:block text-xs text-[#675E54]">
                  {learner.missionsCompleted} completed
                </div>

                {/* XP */}
                <div className="col-span-4 text-right">
                  <span className="text-sm font-bold text-[#102A43] block">
                    ⭐ {learner.xp.toLocaleString()} XP
                  </span>
                  <span className="text-[10px] text-[#675E54]">
                    🔥 {learner.streakDays}d streak
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
