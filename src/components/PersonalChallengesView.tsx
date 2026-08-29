import React, { useState } from 'react';
import {
  Swords,
  Trophy,
  Users,
  Clock,
  Award,
  CheckCircle2,
  Flame,
  Star,
  ArrowRight,
  WifiOff,
  Sparkles,
  RotateCcw,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { mockAvailableFriends } from '../data/mockLeaderboardData';

export const PersonalChallengesView: React.FC = () => {
  const {
    activeChallenge,
    challengeHistory,
    startFriendChallenge,
    completeActiveChallenge,
    claimChallengeBonusXp,
    connectivityMode,
    userProfile,
    language,
    t,
    setActiveLessonPackId,
  } = useApp();

  // Setup challenge form state
  const [selectedFriend, setSelectedFriend] = useState<string>('Aarav');
  const [selectedSubject, setSelectedSubject] = useState<string>('Physics');
  const [selectedDuration, setSelectedDuration] = useState<number>(3);

  const isOffline = connectivityMode === 'offline';

  const handleCreateChallenge = (e: React.FormEvent) => {
    e.preventDefault();
    startFriendChallenge(selectedFriend, selectedSubject, selectedDuration);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto py-2">
      {/* Offline / Synced Notice Bar */}
      <div
        className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center justify-between border ${
          isOffline
            ? 'bg-[#F9E2E2] border-[#EBB6B6] text-[#782323]'
            : 'bg-[#DCEFE5] border-[#B6DEC9] text-[#1E573E]'
        }`}
      >
        <div className="flex items-center gap-2">
          {isOffline ? (
            <WifiOff className="w-3.5 h-3.5 text-[#9B3333] flex-shrink-0" />
          ) : (
            <CheckCircle2 className="w-3.5 h-3.5 text-[#2D7A58] flex-shrink-0" />
          )}
          <span>{isOffline ? t.challenges.offlineNotice : t.challenges.syncedNotice}</span>
        </div>
      </div>

      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#102A43] flex items-center gap-2.5">
          <span>⚔️</span>
          <span>{t.challenges.title}</span>
        </h1>
        <p className="text-sm text-[#675E54] mt-1">{t.challenges.subtitle}</p>
      </div>

      {/* =========================================================
          1. ACTIVE FRIEND VS FRIEND SCREEN / OR RESULT SCREEN
         ========================================================= */}
      {activeChallenge && !activeChallenge.isCompleted ? (
        <div className="bg-[#FAF6EF] border border-[#D8CABA] rounded-2xl p-6 sm:p-8 shadow-2xs space-y-6">
          {/* Top Title */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#D8CABA] pb-4">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#102A43] block">
                {t.challenges.vsTitle}
              </span>
              <h2 className="text-xl font-bold text-[#102A43]">
                {userProfile.name} (You) VS {activeChallenge.friendName}
              </h2>
              <span className="text-xs text-[#675E54]">
                {activeChallenge.subjectType} Track · {activeChallenge.durationDays} Days Duration
              </span>
            </div>

            <div className="flex items-center gap-2 bg-[#E9DDCB] border border-[#D8CABA] px-3 py-1.5 rounded-xl text-xs text-[#675E54]">
              <Clock className="w-3.5 h-3.5 text-[#102A43]" />
              <span>{t.challenges.timeRemaining}: 2 Days 14 Hours</span>
            </div>
          </div>

          {/* TWO SIDE-BY-SIDE PARTICIPANTS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* YOU CARD */}
            <div className="bg-[#E9DDCB] border-2 border-[#102A43] rounded-2xl p-5 space-y-3 relative">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#102A43] text-white font-bold flex items-center justify-center text-sm shadow-2xs">
                    {userProfile.name.charAt(0)}
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#102A43] uppercase tracking-wider block">
                      YOU
                    </span>
                    <h3 className="text-base font-bold text-[#102A43]">{userProfile.name}</h3>
                  </div>
                </div>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#102A43] text-white">
                  Level {userProfile.level}
                </span>
              </div>

              <div className="pt-2">
                <span className="text-2xl font-bold text-[#102A43] block">
                  ⭐ {activeChallenge.userXp} XP
                </span>
                <span className="text-xs text-[#675E54]">
                  {activeChallenge.userMissionsCompleted} Missions Completed
                </span>
              </div>

              {/* Progress visual */}
              <div className="w-full bg-[#FAF6EF] h-2.5 rounded-full overflow-hidden border border-[#D8CABA]">
                <div
                  className="bg-[#102A43] h-full rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(100, Math.round((activeChallenge.userXp / 600) * 100))}%` }}
                />
              </div>
            </div>

            {/* FRIEND CARD */}
            <div className="bg-[#E9DDCB]/60 border border-[#D8CABA] rounded-2xl p-5 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#FAF6EF] border border-[#D8CABA] text-[#102A43] font-bold flex items-center justify-center text-sm shadow-2xs">
                    {activeChallenge.friendAvatar}
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#675E54] uppercase tracking-wider block">
                      FRIEND
                    </span>
                    <h3 className="text-base font-bold text-[#102A43]">{activeChallenge.friendName}</h3>
                  </div>
                </div>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#FAF6EF] border border-[#D8CABA] text-[#675E54]">
                  Level {activeChallenge.friendLevel}
                </span>
              </div>

              <div className="pt-2">
                <span className="text-2xl font-bold text-[#102A43] block">
                  ⭐ {activeChallenge.friendXp} XP
                </span>
                <span className="text-xs text-[#675E54]">
                  {activeChallenge.friendMissionsCompleted} Missions Completed
                </span>
              </div>

              {/* Progress visual */}
              <div className="w-full bg-[#FAF6EF] h-2.5 rounded-full overflow-hidden border border-[#D8CABA]">
                <div
                  className="bg-[#675E54] h-full rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(100, Math.round((activeChallenge.friendXp / 600) * 100))}%` }}
                />
              </div>
            </div>
          </div>

          {/* CHALLENGE STATUS BOX */}
          <div className="p-4 bg-[#E9DDCB] border border-[#D8CABA] rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-[#102A43] text-white flex items-center justify-center font-bold">
                🏆
              </div>
              <div>
                <span className="font-bold text-[#102A43] block">
                  {t.challenges.currentLeader}: {activeChallenge.userXp >= activeChallenge.friendXp ? 'YOU' : activeChallenge.friendName}
                </span>
                <span className="text-[#675E54]">
                  {Math.abs(activeChallenge.userXp - activeChallenge.friendXp)} XP {t.challenges.aheadBy}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveLessonPackId('physics-quest')}
                className="px-3 py-1.5 bg-[#102A43] hover:bg-[#0C1F33] text-white font-semibold rounded-lg shadow-2xs transition-colors flex items-center gap-1"
              >
                <span>Study to Earn +XP</span>
                <ArrowRight className="w-3 h-3" />
              </button>
              <button
                onClick={completeActiveChallenge}
                className="px-3 py-1.5 bg-[#FAF6EF] border border-[#D8CABA] text-[#102A43] hover:bg-[#EFE5D5] font-semibold rounded-lg transition-colors"
                title="Conclude challenge to see result"
              >
                End & Calculate
              </button>
            </div>
          </div>
        </div>
      ) : activeChallenge && activeChallenge.isCompleted ? (
        
        /* =========================================================
           CHALLENGE COMPLETE / RESULT SCREEN
           ========================================================= */
        <div className="bg-[#FAF6EF] border border-[#D8CABA] rounded-2xl p-8 sm:p-10 shadow-2xs text-center space-y-6 max-w-lg mx-auto">
          <div className="w-16 h-16 rounded-2xl bg-[#E9DDCB] border border-[#D8CABA] text-[#102A43] mx-auto flex items-center justify-center text-2xl shadow-xs">
            🏆
          </div>

          <div className="space-y-1">
            <span className="text-xs font-bold text-[#102A43] uppercase tracking-wider">
              {t.challenges.completeTitle}
            </span>
            <h2 className="text-2xl font-bold text-[#102A43]">
              {activeChallenge.winner === 'user' ? t.challenges.youWon : `${activeChallenge.friendName} ${t.challenges.friendWon}`}
            </h2>
            <p className="text-xs text-[#675E54]">
              {userProfile.name}: {activeChallenge.userXp} XP · {activeChallenge.friendName}: {activeChallenge.friendXp} XP
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="p-4 bg-[#E9DDCB] border border-[#D8CABA] rounded-xl text-center">
              <span className="text-[11px] text-[#675E54] block font-medium">Reward</span>
              <span className="text-xl font-bold text-[#102A43]">+100 XP</span>
            </div>
            <div className="p-4 bg-[#E9DDCB] border border-[#D8CABA] rounded-xl text-center">
              <span className="text-[11px] text-[#675E54] block font-medium">Badge Awarded</span>
              <span className="text-xs font-bold text-[#102A43] flex items-center justify-center gap-1 mt-1">
                <Award className="w-4 h-4 text-[#102A43]" />
                Friend Winner
              </span>
            </div>
          </div>

          {!activeChallenge.rewardClaimed ? (
            <button
              onClick={claimChallengeBonusXp}
              className="w-full py-3 bg-[#102A43] hover:bg-[#0C1F33] active:scale-95 text-white text-xs font-bold rounded-xl shadow-xs transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Claim +100 XP Reward & Badge</span>
            </button>
          ) : (
            <div className="p-3 bg-[#DCEFE5] border border-[#B6DEC9] text-[#1E573E] rounded-xl text-xs font-bold">
              ✓ Reward Claimed! Progress saved locally.
            </div>
          )}
        </div>
      ) : null}

      {/* =========================================================
          2. SETUP A NEW FRIEND CHALLENGE (FORM)
         ========================================================= */}
      <div className="bg-[#FAF6EF] border border-[#D8CABA] rounded-2xl p-6 sm:p-7 shadow-2xs space-y-5">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#E9DDCB] text-[#102A43] flex items-center justify-center">
            <Swords className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-[#102A43]">{t.challenges.createTitle}</h2>
            <p className="text-xs text-[#675E54]">{t.challenges.goalDesc}</p>
          </div>
        </div>

        <form onSubmit={handleCreateChallenge} className="space-y-4 pt-2">
          {/* Friend Selection */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#102A43] block">
              {t.challenges.chooseFriend}:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {mockAvailableFriends.map((fr) => (
                <button
                  type="button"
                  key={fr.id}
                  onClick={() => setSelectedFriend(fr.name)}
                  className={`p-3 rounded-xl border text-left transition-colors ${
                    selectedFriend === fr.name
                      ? 'bg-[#C9B69C] border-[#102A43] ring-1 ring-[#102A43]'
                      : 'bg-[#E9DDCB] border-[#D8CABA] hover:bg-[#E2D4BF]'
                  }`}
                >
                  <div className="w-7 h-7 rounded-lg bg-[#FAF6EF] border border-[#D8CABA] text-[#102A43] font-bold text-xs flex items-center justify-center mb-2">
                    {fr.avatar}
                  </div>
                  <span className="text-xs font-bold text-[#102A43] block">{fr.name}</span>
                  <span className="text-[10px] text-[#675E54] block">Level {fr.level}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Subject & Duration */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#102A43] block">
                {t.challenges.challengeType}:
              </label>
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="w-full bg-[#E9DDCB] border border-[#D8CABA] rounded-xl px-3 py-2 text-xs text-[#102A43] focus:outline-none focus:border-[#102A43]"
              >
                <option value="Physics">Physics (Laws of Motion)</option>
                <option value="Chemistry">Chemistry (Periodic Table)</option>
                <option value="Mathematics">Mathematics (Algebra)</option>
                <option value="Python">Python (Code Breaker)</option>
                <option value="Cybersecurity">Cybersecurity (Network Defense)</option>
                <option value="Mixed">Mixed Subjects</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#102A43] block">
                {t.challenges.duration}:
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[1, 3, 7].map((days) => (
                  <button
                    type="button"
                    key={days}
                    onClick={() => setSelectedDuration(days)}
                    className={`py-2 rounded-xl border text-xs font-semibold transition-colors ${
                      selectedDuration === days
                        ? 'bg-[#102A43] text-white'
                        : 'bg-[#E9DDCB] border-[#D8CABA] text-[#675E54] hover:bg-[#E2D4BF]'
                    }`}
                  >
                    {days} {days === 1 ? 'Day' : 'Days'}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-3">
            <button
              type="submit"
              className="w-full py-3 bg-[#102A43] hover:bg-[#0C1F33] active:scale-95 text-white text-xs font-bold rounded-xl shadow-xs transition-all flex items-center justify-center gap-2"
            >
              <Swords className="w-4 h-4" />
              <span>⚔️ {t.challenges.startBtn}</span>
            </button>
          </div>
        </form>
      </div>

      {/* =========================================================
          3. PREVIOUS CHALLENGES HISTORY
         ========================================================= */}
      <div className="space-y-3">
        <h2 className="text-base font-bold text-[#102A43]">{t.challenges.prevChallenges}</h2>

        <div className="divide-y divide-[#D8CABA] bg-[#FAF6EF] border border-[#D8CABA] rounded-2xl overflow-hidden shadow-2xs">
          {challengeHistory.map((hist) => (
            <div
              key={hist.id}
              className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-[#EFE5D5] transition-colors"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#E9DDCB] border border-[#D8CABA] text-[#102A43] flex items-center justify-center font-bold text-xs flex-shrink-0">
                  ⚔️
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#102A43]">
                    You vs {hist.friendName}
                  </h3>
                  <span className="text-xs text-[#675E54]">
                    {hist.subject} • {hist.date}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-4 pt-1 sm:pt-0">
                <div className="text-right">
                  <span className="text-xs font-mono font-bold text-[#102A43] block">
                    {hist.userXp} XP vs {hist.friendXp} XP
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      hist.winner === 'You'
                        ? 'bg-[#DCEFE5] text-[#1E573E]'
                        : 'bg-[#E9DDCB] text-[#675E54]'
                    }`}
                  >
                    Winner: {hist.winner}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
