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
            ? 'bg-rose-50 border-rose-200 text-rose-900'
            : 'bg-emerald-50 border-emerald-200 text-emerald-800'
        }`}
      >
        <div className="flex items-center gap-2">
          {isOffline ? (
            <WifiOff className="w-3.5 h-3.5 text-rose-600 flex-shrink-0" />
          ) : (
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
          )}
          <span>{isOffline ? t.challenges.offlineNotice : t.challenges.syncedNotice}</span>
        </div>
      </div>

      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#20242B] flex items-center gap-2.5">
          <span>⚔️</span>
          <span>{t.challenges.title}</span>
        </h1>
        <p className="text-sm text-[#7E8796] mt-1">{t.challenges.subtitle}</p>
      </div>

      {/* =========================================================
          1. ACTIVE FRIEND VS FRIEND SCREEN / OR RESULT SCREEN
         ========================================================= */}
      {activeChallenge && !activeChallenge.isCompleted ? (
        <div className="bg-white border border-[#EBE8E1] rounded-2xl p-6 sm:p-8 shadow-2xs space-y-6">
          {/* Top Title */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#EBE8E1] pb-4">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#3457D5] block">
                {t.challenges.vsTitle}
              </span>
              <h2 className="text-xl font-bold text-[#20242B]">
                {userProfile.name} (You) VS {activeChallenge.friendName}
              </h2>
              <span className="text-xs text-[#7E8796]">
                {activeChallenge.subjectType} Track · {activeChallenge.durationDays} Days Duration
              </span>
            </div>

            <div className="flex items-center gap-2 bg-[#F8F7F4] border border-[#EBE8E1] px-3 py-1.5 rounded-xl text-xs text-[#7E8796]">
              <Clock className="w-3.5 h-3.5 text-[#3457D5]" />
              <span>{t.challenges.timeRemaining}: 2 Days 14 Hours</span>
            </div>
          </div>

          {/* TWO SIDE-BY-SIDE PARTICIPANTS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* YOU CARD */}
            <div className="bg-[#EDF1FC]/50 border-2 border-[#3457D5] rounded-2xl p-5 space-y-3 relative">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#3457D5] text-white font-bold flex items-center justify-center text-sm shadow-2xs">
                    {userProfile.name.charAt(0)}
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#3457D5] uppercase tracking-wider block">
                      YOU
                    </span>
                    <h3 className="text-base font-bold text-[#20242B]">{userProfile.name}</h3>
                  </div>
                </div>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#3457D5] text-white">
                  Level {userProfile.level}
                </span>
              </div>

              <div className="pt-2">
                <span className="text-2xl font-bold text-[#20242B] block">
                  ⭐ {activeChallenge.userXp} XP
                </span>
                <span className="text-xs text-[#7E8796]">
                  {activeChallenge.userMissionsCompleted} Missions Completed
                </span>
              </div>

              {/* Progress visual */}
              <div className="w-full bg-[#F8F7F4] h-2.5 rounded-full overflow-hidden border border-[#C3D2F7]">
                <div
                  className="bg-[#3457D5] h-full rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(100, Math.round((activeChallenge.userXp / 600) * 100))}%` }}
                />
              </div>
            </div>

            {/* FRIEND CARD */}
            <div className="bg-[#F8F7F4] border border-[#EBE8E1] rounded-2xl p-5 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white border border-[#EBE8E1] text-[#20242B] font-bold flex items-center justify-center text-sm shadow-2xs">
                    {activeChallenge.friendAvatar}
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#7E8796] uppercase tracking-wider block">
                      FRIEND
                    </span>
                    <h3 className="text-base font-bold text-[#20242B]">{activeChallenge.friendName}</h3>
                  </div>
                </div>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-white border border-[#EBE8E1] text-[#4A5160]">
                  Level {activeChallenge.friendLevel}
                </span>
              </div>

              <div className="pt-2">
                <span className="text-2xl font-bold text-[#20242B] block">
                  ⭐ {activeChallenge.friendXp} XP
                </span>
                <span className="text-xs text-[#7E8796]">
                  {activeChallenge.friendMissionsCompleted} Missions Completed
                </span>
              </div>

              {/* Progress visual */}
              <div className="w-full bg-white h-2.5 rounded-full overflow-hidden border border-[#EBE8E1]">
                <div
                  className="bg-[#977636] h-full rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(100, Math.round((activeChallenge.friendXp / 600) * 100))}%` }}
                />
              </div>
            </div>
          </div>

          {/* CHALLENGE STATUS BOX */}
          <div className="p-4 bg-[#FAF5ED] border border-[#E8DCBE] rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-[#C9A96E] text-white flex items-center justify-center font-bold">
                🏆
              </div>
              <div>
                <span className="font-bold text-[#977636] block">
                  {t.challenges.currentLeader}: {activeChallenge.userXp >= activeChallenge.friendXp ? 'YOU' : activeChallenge.friendName}
                </span>
                <span className="text-[#7E8796]">
                  {Math.abs(activeChallenge.userXp - activeChallenge.friendXp)} XP {t.challenges.aheadBy}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveLessonPackId('physics-quest')}
                className="px-3 py-1.5 bg-[#3457D5] hover:bg-[#2845B2] text-white font-semibold rounded-lg shadow-2xs transition-colors flex items-center gap-1"
              >
                <span>Study to Earn +XP</span>
                <ArrowRight className="w-3 h-3" />
              </button>
              <button
                onClick={completeActiveChallenge}
                className="px-3 py-1.5 bg-white border border-[#E8DCBE] text-[#977636] hover:bg-[#FAF5ED] font-semibold rounded-lg transition-colors"
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
        <div className="bg-white border border-[#EBE8E1] rounded-2xl p-8 sm:p-10 shadow-2xs text-center space-y-6 max-w-lg mx-auto">
          <div className="w-16 h-16 rounded-2xl bg-[#FAF5ED] border border-[#E8DCBE] text-[#C9A96E] mx-auto flex items-center justify-center text-2xl shadow-xs">
            🏆
          </div>

          <div className="space-y-1">
            <span className="text-xs font-bold text-[#977636] uppercase tracking-wider">
              {t.challenges.completeTitle}
            </span>
            <h2 className="text-2xl font-bold text-[#20242B]">
              {activeChallenge.winner === 'user' ? t.challenges.youWon : `${activeChallenge.friendName} ${t.challenges.friendWon}`}
            </h2>
            <p className="text-xs text-[#7E8796]">
              {userProfile.name}: {activeChallenge.userXp} XP · {activeChallenge.friendName}: {activeChallenge.friendXp} XP
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="p-4 bg-[#F8F7F4] border border-[#EBE8E1] rounded-xl text-center">
              <span className="text-[11px] text-[#7E8796] block font-medium">Reward</span>
              <span className="text-xl font-bold text-[#3457D5]">+100 XP</span>
            </div>
            <div className="p-4 bg-[#F8F7F4] border border-[#EBE8E1] rounded-xl text-center">
              <span className="text-[11px] text-[#7E8796] block font-medium">Badge Awarded</span>
              <span className="text-xs font-bold text-[#977636] flex items-center justify-center gap-1 mt-1">
                <Award className="w-4 h-4 text-[#C9A96E]" />
                Friend Winner
              </span>
            </div>
          </div>

          {!activeChallenge.rewardClaimed ? (
            <button
              onClick={claimChallengeBonusXp}
              className="w-full py-3 bg-[#3457D5] hover:bg-[#2845B2] active:scale-95 text-white text-xs font-bold rounded-xl shadow-xs transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Claim +100 XP Reward & Badge</span>
            </button>
          ) : (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-bold">
              ✓ Reward Claimed! Progress saved locally.
            </div>
          )}
        </div>
      ) : null}

      {/* =========================================================
          2. SETUP A NEW FRIEND CHALLENGE (FORM)
         ========================================================= */}
      <div className="bg-white border border-[#EBE8E1] rounded-2xl p-6 sm:p-7 shadow-2xs space-y-5">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#EDF1FC] text-[#3457D5] flex items-center justify-center">
            <Swords className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-[#20242B]">{t.challenges.createTitle}</h2>
            <p className="text-xs text-[#7E8796]">{t.challenges.goalDesc}</p>
          </div>
        </div>

        <form onSubmit={handleCreateChallenge} className="space-y-4 pt-2">
          {/* Friend Selection */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#20242B] block">
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
                      ? 'bg-[#EDF1FC] border-[#3457D5] ring-1 ring-[#3457D5]'
                      : 'bg-[#F8F7F4] border-[#EBE8E1] hover:bg-[#EFECE5]'
                  }`}
                >
                  <div className="w-7 h-7 rounded-lg bg-white border border-[#EBE8E1] text-[#20242B] font-bold text-xs flex items-center justify-center mb-2">
                    {fr.avatar}
                  </div>
                  <span className="text-xs font-bold text-[#20242B] block">{fr.name}</span>
                  <span className="text-[10px] text-[#7E8796] block">Level {fr.level}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Subject & Duration */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#20242B] block">
                {t.challenges.challengeType}:
              </label>
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="w-full bg-[#F8F7F4] border border-[#EBE8E1] rounded-xl px-3 py-2 text-xs text-[#20242B] focus:outline-none focus:border-[#3457D5]"
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
              <label className="text-xs font-bold text-[#20242B] block">
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
                        ? 'bg-[#20242B] text-white'
                        : 'bg-[#F8F7F4] border-[#EBE8E1] text-[#4A5160] hover:bg-[#EFECE5]'
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
              className="w-full py-3 bg-[#3457D5] hover:bg-[#2845B2] active:scale-95 text-white text-xs font-bold rounded-xl shadow-xs transition-all flex items-center justify-center gap-2"
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
        <h2 className="text-base font-bold text-[#20242B]">{t.challenges.prevChallenges}</h2>

        <div className="divide-y divide-[#EBE8E1] bg-white border border-[#EBE8E1] rounded-2xl overflow-hidden shadow-2xs">
          {challengeHistory.map((hist) => (
            <div
              key={hist.id}
              className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-[#F8F7F4]/60 transition-colors"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#FAF5ED] border border-[#E8DCBE] text-[#977636] flex items-center justify-center font-bold text-xs flex-shrink-0">
                  ⚔️
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#20242B]">
                    You vs {hist.friendName}
                  </h3>
                  <span className="text-xs text-[#7E8796]">
                    {hist.subject} • {hist.date}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-4 pt-1 sm:pt-0">
                <div className="text-right">
                  <span className="text-xs font-mono font-bold text-[#20242B] block">
                    {hist.userXp} XP vs {hist.friendXp} XP
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      hist.winner === 'You'
                        ? 'bg-[#EDF1FC] text-[#3457D5]'
                        : 'bg-[#FAF5ED] text-[#977636]'
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
