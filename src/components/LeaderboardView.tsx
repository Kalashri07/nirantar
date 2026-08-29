import React, { useState } from 'react';
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
import { mockLeaderboardLearners } from '../data/mockLeaderboardData';

export const LeaderboardView: React.FC = () => {
  const { userProfile, language, t, setCurrentNav } = useApp();
  const [timeFilter, setTimeFilter] = useState<'week' | 'month' | 'all'>('week');
  const [subjectFilter, setSubjectFilter] = useState<string>('all');

  // Dynamic user data in leaderboard
  const learners = mockLeaderboardLearners.map((lrn) => {
    if (lrn.isCurrentUser) {
      return {
        ...lrn,
        name: `${userProfile.name} (You)`,
        xp: userProfile.currentXp,
        level: userProfile.level,
        missionsCompleted: Math.max(8, userProfile.offlineActivitiesCompleted),
        streakDays: userProfile.streakDays,
      };
    }
    return lrn;
  });

  // Calculate points needed to overtake #3 (Rohan: 1940 XP)
  const rank3Xp = 1940;
  const xpNeeded = Math.max(0, rank3Xp - userProfile.currentXp + 20);

  const getRankBadge = (rank: number) => {
    switch (rank) {
      case 1:
        return <span className="text-base">🥇</span>;
      case 2:
        return <span className="text-base">🥈</span>;
      case 3:
        return <span className="text-base">🥉</span>;
      default:
        return <span className="text-xs font-bold text-[#7E8796]">#{rank}</span>;
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto py-2">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#20242B] flex items-center gap-2.5">
            <span>🏆</span>
            <span>{t.leaderboard.title}</span>
          </h1>
          <p className="text-sm text-[#7E8796] mt-1">{t.leaderboard.subtitle}</p>
        </div>

        {/* Quick link to Personal Challenges */}
        <button
          onClick={() => setCurrentNav('challenges')}
          className="self-start sm:self-center px-4 py-2 bg-[#FAF5ED] hover:bg-[#F2EADB] border border-[#E8DCBE] text-[#977636] rounded-xl text-xs font-bold transition-colors flex items-center gap-2 shadow-2xs"
        >
          <Swords className="w-4 h-4 text-[#C9A96E]" />
          <span>Challenge a Friend →</span>
        </button>
      </div>

      {/* 1. Filter Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white border border-[#EBE8E1] p-3 rounded-2xl shadow-2xs">
        {/* Time Tabs */}
        <div className="flex items-center bg-[#F8F7F4] border border-[#EBE8E1] p-1 rounded-xl">
          {[
            { id: 'week' as const, label: t.leaderboard.weeklyTab },
            { id: 'month' as const, label: t.leaderboard.monthlyTab },
            { id: 'all' as const, label: t.leaderboard.allTimeTab },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setTimeFilter(tab.id)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                timeFilter === tab.id
                  ? 'bg-white text-[#3457D5] font-bold shadow-2xs'
                  : 'text-[#7E8796] hover:text-[#20242B]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Subject Filter Pills */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {[
            { id: 'all', label: t.leaderboard.allSubjects },
            { id: 'science', label: 'Science' },
            { id: 'math', label: 'Mathematics' },
            { id: 'tech', label: 'Technology' },
          ].map((sub) => (
            <button
              key={sub.id}
              onClick={() => setSubjectFilter(sub.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                subjectFilter === sub.id
                  ? 'bg-[#20242B] text-white font-semibold'
                  : 'bg-[#F8F7F4] border border-[#EBE8E1] text-[#4A5160] hover:bg-[#EFECE5]'
              }`}
            >
              {sub.label}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Ranked Leaderboard List */}
      <div className="bg-white border border-[#EBE8E1] rounded-2xl overflow-hidden shadow-2xs">
        <div className="px-5 py-3.5 border-b border-[#EBE8E1] bg-[#F8F7F4] grid grid-cols-12 text-[11px] font-bold text-[#7E8796] uppercase tracking-wider">
          <div className="col-span-2 sm:col-span-1">{t.leaderboard.rankCol}</div>
          <div className="col-span-6 sm:col-span-5">{t.leaderboard.learnerCol}</div>
          <div className="col-span-2 text-center hidden sm:block">{t.leaderboard.levelCol}</div>
          <div className="col-span-2 text-center hidden sm:block">{t.leaderboard.missionsCol}</div>
          <div className="col-span-4 text-right">{t.leaderboard.xpCol}</div>
        </div>

        <div className="divide-y divide-[#EBE8E1]">
          {learners.map((learner) => {
            const isMe = learner.isCurrentUser;
            return (
              <div
                key={learner.id}
                className={`px-5 py-4 grid grid-cols-12 items-center transition-colors ${
                  isMe
                    ? 'bg-[#EDF1FC]/80 border-l-4 border-[#3457D5]'
                    : 'hover:bg-[#F8F7F4]/60'
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
                        ? 'bg-[#3457D5] text-white'
                        : learner.rank === 1
                        ? 'bg-[#FAF5ED] border border-[#E8DCBE] text-[#977636]'
                        : 'bg-[#F8F7F4] border border-[#EBE8E1] text-[#20242B]'
                    }`}
                  >
                    {learner.avatar}
                  </div>
                  <div>
                    <span className={`text-sm font-bold block ${isMe ? 'text-[#3457D5]' : 'text-[#20242B]'}`}>
                      {learner.name}
                    </span>
                    <span className="text-[11px] text-[#7E8796] flex items-center gap-1 sm:hidden">
                      Level {learner.level} • {learner.missionsCompleted} missions
                    </span>
                  </div>
                </div>

                {/* Level */}
                <div className="col-span-2 text-center hidden sm:block">
                  <span className="text-xs font-semibold text-[#4A5160] bg-[#F8F7F4] px-2 py-0.5 rounded-md border border-[#EBE8E1]">
                    Level {learner.level}
                  </span>
                </div>

                {/* Missions */}
                <div className="col-span-2 text-center hidden sm:block text-xs text-[#7E8796]">
                  {learner.missionsCompleted} completed
                </div>

                {/* XP */}
                <div className="col-span-4 text-right">
                  <span className="text-sm font-bold text-[#20242B] block">
                    ⭐ {learner.xp.toLocaleString()} XP
                  </span>
                  <span className="text-[10px] text-[#7E8796]">
                    🔥 {learner.streakDays}d streak
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. YOUR POSITION CARD */}
      <div className="bg-white border border-[#EBE8E1] rounded-2xl p-6 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-[#EDF1FC] border border-[#C3D2F7] flex items-center justify-center text-[#3457D5] text-lg font-bold">
              🏅
            </div>
            <div>
              <span className="text-xs font-bold text-[#7E8796] uppercase tracking-wider block">
                {t.leaderboard.yourPositionTitle}
              </span>
              <h2 className="text-lg font-bold text-[#20242B]">
                {t.leaderboard.yourRank} #4 · {userProfile.name}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <div className="p-2.5 bg-[#F8F7F4] border border-[#EBE8E1] rounded-xl text-center min-w-[100px]">
              <span className="text-[10px] text-[#7E8796] block">Your Score</span>
              <span className="font-bold text-[#3457D5] text-sm">
                ⭐ {userProfile.currentXp.toLocaleString()} XP
              </span>
            </div>
            <div className="p-2.5 bg-[#F8F7F4] border border-[#EBE8E1] rounded-xl text-center min-w-[100px]">
              <span className="text-[10px] text-[#7E8796] block">Current Streak</span>
              <span className="font-bold text-[#20242B] text-sm">
                🔥 {userProfile.streakDays} Days
              </span>
            </div>
          </div>
        </div>

        {/* Progress towards next rank */}
        <div className="space-y-1.5 pt-2 border-t border-[#EBE8E1]">
          <div className="flex justify-between text-xs text-[#7E8796]">
            <span>{t.leaderboard.pointsNeeded} #3 (Rohan)</span>
            <span className="font-bold text-[#3457D5]">{xpNeeded} XP needed</span>
          </div>
          <div className="w-full bg-[#F8F7F4] h-2 rounded-full overflow-hidden">
            <div
              className="bg-[#3457D5] h-full rounded-full transition-all duration-300"
              style={{ width: `${Math.min(100, Math.round((userProfile.currentXp / rank3Xp) * 100))}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
