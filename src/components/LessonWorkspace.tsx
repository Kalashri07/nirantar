import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Award,
  BookOpen,
  WifiOff,
  Flame,
  Star,
  Layers,
  Sparkles,
  X,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { detailedLessons, WrittenModuleStep } from '../data/lessonModulesData';

export const LessonWorkspace: React.FC = () => {
  const {
    activeLessonPackId,
    setActiveLessonPackId,
    learningPacks,
    language,
    connectivityMode,
    userProfile,
    recordStepCompletion,
    triggerCelebration,
  } = useApp();

  const pack = learningPacks.find((p) => p.id === activeLessonPackId);
  const lessonData = activeLessonPackId ? detailedLessons[activeLessonPackId] : undefined;

  // Active Tab: 'lesson' | 'gamification'
  const [activeTab, setActiveTab] = useState<'lesson' | 'gamification'>('lesson');

  // Step state
  const [currentModuleIndex, setCurrentModuleIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [moduleCompletedMap, setModuleCompletedMap] = useState<Record<number, boolean>>({});
  const [isFinished, setIsFinished] = useState(false);

  // Initialize completion state from pack's syllabus
  useEffect(() => {
    if (pack) {
      const initialMap: Record<number, boolean> = {};
      pack.syllabus.forEach((s, idx) => {
        if (s.completed) initialMap[idx] = true;
      });
      setModuleCompletedMap(initialMap);
      setCurrentModuleIndex(0);
      setIsFinished(false);
      setActiveTab('lesson');
      setSelectedOptionId(null);
      setHasSubmitted(false);
    }
  }, [activeLessonPackId, pack]);

  if (!activeLessonPackId || !pack || !lessonData) return null;

  const currentModule: WrittenModuleStep | undefined = lessonData.modules[currentModuleIndex];
  const totalModules = lessonData.modules.length;
  const completedCount = Object.values(moduleCompletedMap).filter(Boolean).length;
  const progressPct = Math.round((completedCount / totalModules) * 100);

  const isCurrentModuleDone = !!moduleCompletedMap[currentModuleIndex];
  const isOffline = connectivityMode === 'offline';

  const handleSelectOption = (optId: string) => {
    if (hasSubmitted && isCurrentModuleDone) return;
    setSelectedOptionId(optId);
    setHasSubmitted(false);
  };

  const handleVerifyAnswer = () => {
    if (!currentModule) return;

    if (!currentModule.hasQuestion) {
      setModuleCompletedMap((prev) => ({ ...prev, [currentModuleIndex]: true }));
      triggerCelebration();
      recordStepCompletion(
        pack.id,
        currentModule.id,
        currentModule.xpReward,
        currentModule.title[language]
      );
      return;
    }

    if (!selectedOptionId || !currentModule.options) return;
    const option = currentModule.options.find((o) => o.id === selectedOptionId);
    setHasSubmitted(true);

    if (option?.isCorrect) {
      setModuleCompletedMap((prev) => ({ ...prev, [currentModuleIndex]: true }));
      triggerCelebration();
      recordStepCompletion(
        pack.id,
        currentModule.id,
        currentModule.xpReward,
        currentModule.title[language]
      );
    }
  };

  const handleNextModule = () => {
    if (currentModuleIndex < totalModules - 1) {
      setCurrentModuleIndex((prev) => prev + 1);
      setSelectedOptionId(null);
      setHasSubmitted(false);
    } else {
      setIsFinished(true);
      triggerCelebration();
    }
  };

  const handlePrevModule = () => {
    if (currentModuleIndex > 0) {
      setCurrentModuleIndex((prev) => prev - 1);
      setSelectedOptionId(null);
      setHasSubmitted(false);
    }
  };

  // Gamification earned XP calculation
  const earnedXp = lessonData.modules.reduce((sum, m, idx) => {
    return moduleCompletedMap[idx] ? sum + m.xpReward : sum;
  }, 0);

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 md:p-6 animate-in fade-in duration-100">
      <div className="bg-[#F8F7F4] w-full max-w-4xl rounded-2xl border border-[#EBE8E1] shadow-2xl flex flex-col max-h-[95vh] overflow-hidden">
        
        {/* =========================================================
            1. TOP HEADER & METADATA BAR
           ========================================================= */}
        <header className="bg-white px-5 py-3.5 border-b border-[#EBE8E1] flex flex-col sm:flex-row sm:items-center justify-between gap-3 sticky top-0 z-10">
          <div className="flex items-center gap-3 min-w-0">
            <button
              onClick={() => setActiveLessonPackId(null)}
              className="p-1.5 rounded-lg hover:bg-[#F8F7F4] text-[#7E8796] hover:text-[#20242B] transition-colors flex-shrink-0"
              title="Return to Courses"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold text-[#7E8796] uppercase tracking-wider">
                  {pack.subjectName?.[language] || pack.worldId}
                </span>
                <span className="text-[#EBE8E1]">•</span>
                <span className="text-xs font-semibold text-[#3457D5]">
                  Progress: {progressPct}%
                </span>
                <span className="text-[#EBE8E1]">•</span>
                {isOffline ? (
                  <span className="text-[11px] font-semibold text-rose-700 flex items-center gap-1 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                    🔴 Offline
                  </span>
                ) : (
                  <span className="text-[11px] font-semibold text-emerald-700 flex items-center gap-1 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    Offline Ready ✓
                  </span>
                )}
              </div>
              <h1 className="text-base sm:text-lg font-bold text-[#20242B] truncate">
                {pack.title[language]}
              </h1>
            </div>
          </div>

          {/* TAB NAVIGATION: 📖 LESSON vs 🎮 GAMIFICATION */}
          <div className="flex items-center gap-2 self-end sm:self-center flex-shrink-0">
            <div className="bg-[#F8F7F4] p-1 rounded-xl flex items-center gap-1 border border-[#EBE8E1]">
              <button
                onClick={() => setActiveTab('lesson')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                  activeTab === 'lesson'
                    ? 'bg-white text-[#3457D5] shadow-2xs font-bold'
                    : 'text-[#7E8796] hover:text-[#20242B]'
                }`}
              >
                <span>📖</span>
                <span>LESSON</span>
              </button>
              <button
                onClick={() => setActiveTab('gamification')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                  activeTab === 'gamification'
                    ? 'bg-white text-[#3457D5] shadow-2xs font-bold'
                    : 'text-[#7E8796] hover:text-[#20242B]'
                }`}
              >
                <span>🎮</span>
                <span>GAMIFICATION</span>
              </button>
            </div>

            <button
              onClick={() => setActiveLessonPackId(null)}
              className="p-1.5 rounded-lg text-[#7E8796] hover:text-[#20242B] hover:bg-[#F8F7F4] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* =========================================================
            2. MAIN CONTENT BODY
           ========================================================= */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8">
          
          {/* SCREEN A: MISSION COMPLETE CELEBRATION */}
          {isFinished ? (
            <div className="bg-white border border-[#EBE8E1] rounded-2xl p-8 sm:p-12 text-center space-y-6 max-w-lg mx-auto shadow-2xs">
              <div className="w-16 h-16 rounded-2xl bg-[#EDF1FC] border border-[#C3D2F7] text-[#3457D5] mx-auto flex items-center justify-center shadow-xs">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-1">
                <span className="text-xs font-bold text-[#3457D5] uppercase tracking-wider">
                  🎉 MISSION COMPLETE
                </span>
                <h2 className="text-2xl font-bold text-[#20242B]">
                  {pack.title[language]}
                </h2>
                <p className="text-xs text-[#7E8796]">
                  You have successfully finished all learning checkpoints!
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-4 bg-[#F8F7F4] border border-[#EBE8E1] rounded-xl text-center">
                  <span className="text-[11px] text-[#7E8796] block font-medium">XP Reward</span>
                  <span className="text-xl font-bold text-[#3457D5]">+{lessonData.totalXp} XP</span>
                </div>
                <div className="p-4 bg-[#F8F7F4] border border-[#EBE8E1] rounded-xl text-center">
                  <span className="text-[11px] text-[#7E8796] block font-medium">Badge Awarded</span>
                  <span className="text-xs font-bold text-[#977636] flex items-center justify-center gap-1 mt-1">
                    <Award className="w-4 h-4 text-[#C9A96E]" />
                    {lessonData.badgeName}
                  </span>
                </div>
              </div>

              <div className="p-3 bg-emerald-50 text-emerald-800 text-xs font-bold rounded-xl border border-emerald-200">
                100% Complete · Local Progress Saved Locally
              </div>

              <button
                onClick={() => setActiveLessonPackId(null)}
                className="w-full py-3 bg-[#3457D5] hover:bg-[#2845B2] active:scale-95 text-white text-xs font-bold rounded-xl shadow-xs transition-all flex items-center justify-center gap-2"
              >
                <span>Continue Learning →</span>
              </button>
            </div>
          ) : activeTab === 'gamification' ? (

            /* =========================================================
               TAB B: 🎮 DEDICATED GAMIFICATION VIEW
               ========================================================= */
            <div className="space-y-6 max-w-2xl mx-auto">
              {/* Gamification Header */}
              <div className="bg-white border border-[#EBE8E1] rounded-2xl p-6 shadow-2xs space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#EDF1FC] border border-[#C3D2F7] flex items-center justify-center text-[#3457D5]">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="text-base font-bold text-[#20242B]">🎮 {pack.title[language]}</h2>
                      <span className="text-xs text-[#7E8796] font-medium">Lesson Gamification Hub</span>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-[#3457D5] bg-[#EDF1FC] px-3 py-1 rounded-full border border-[#C3D2F7]">
                    ⭐ {earnedXp} / {lessonData.totalXp} XP
                  </span>
                </div>

                {/* Your Progress */}
                <div className="space-y-1.5 pt-2">
                  <div className="flex justify-between text-xs font-semibold text-[#20242B]">
                    <span>Your Progress</span>
                    <span>{progressPct}%</span>
                  </div>
                  <div className="w-full bg-[#F8F7F4] h-2.5 rounded-full overflow-hidden">
                    <div
                      className="bg-[#3457D5] h-full rounded-full transition-all duration-300"
                      style={{ width: `${Math.max(5, progressPct)}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Badge Progress & Streak */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Badge Card */}
                <div className="bg-white border border-[#EBE8E1] rounded-2xl p-5 shadow-2xs space-y-2">
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-[#C9A96E]" />
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#7E8796]">Badge Progress</h3>
                  </div>
                  <div className="pt-1">
                    <span className="text-sm font-bold text-[#20242B] block">
                      🏅 {lessonData.badgeName}
                    </span>
                    <p className="text-xs text-[#7E8796] mt-0.5">
                      Progress: {completedCount} / {totalModules} checkpoints completed
                    </p>
                  </div>
                </div>

                {/* Streak Card */}
                <div className="bg-white border border-[#EBE8E1] rounded-2xl p-5 shadow-2xs space-y-2">
                  <div className="flex items-center gap-2">
                    <Flame className="w-4 h-4 text-[#C9A96E]" />
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#7E8796]">Streak</h3>
                  </div>
                  <div className="pt-1">
                    <span className="text-sm font-bold text-[#20242B] block flex items-center gap-1.5">
                      🔥 {userProfile.streakDays} Day Learning Streak
                    </span>
                    <p className="text-xs text-[#7E8796] mt-0.5">
                      Daily habit maintained across offline sessions
                    </p>
                  </div>
                </div>
              </div>

              {/* Mission Checkpoints List */}
              <div className="bg-white border border-[#EBE8E1] rounded-2xl p-6 shadow-2xs space-y-4">
                <h3 className="text-sm font-bold text-[#20242B]">Mission Checkpoints</h3>

                <div className="divide-y divide-[#EBE8E1] text-xs">
                  {lessonData.modules.map((mod, idx) => {
                    const isDone = !!moduleCompletedMap[idx];
                    return (
                      <div key={mod.id} className="py-3 flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <span className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-[11px] ${
                            isDone ? 'bg-[#3457D5] text-white' : 'border border-[#D8D4CB] text-[#7E8796]'
                          }`}>
                            {isDone ? '✓' : idx + 1}
                          </span>
                          <span className={`font-medium ${isDone ? 'text-[#20242B]' : 'text-[#7E8796]'}`}>
                            {mod.title[language]}
                          </span>
                        </div>
                        <span className={`font-mono text-xs font-semibold ${isDone ? 'text-[#3457D5]' : 'text-[#7E8796]'}`}>
                          +{mod.xpReward} XP {isDone ? '✓' : ''}
                        </span>
                      </div>
                    );
                  })}
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => setActiveTab('lesson')}
                    className="w-full py-2.5 bg-[#EDF1FC] hover:bg-[#DDE6FA] text-[#3457D5] text-xs font-bold rounded-xl transition-colors text-center"
                  >
                    Return to Lesson →
                  </button>
                </div>
              </div>
            </div>
          ) : (

            /* =========================================================
               TAB A: 📖 DEDICATED WRITTEN LESSON VIEW
               ========================================================= */
            <div className="space-y-6 max-w-2xl mx-auto">
              
              {/* Checkpoint Pills Bar */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                {lessonData.modules.map((mod, idx) => {
                  const isActive = idx === currentModuleIndex;
                  const isDone = !!moduleCompletedMap[idx];
                  return (
                    <button
                      key={mod.id}
                      onClick={() => {
                        setCurrentModuleIndex(idx);
                        setSelectedOptionId(null);
                        setHasSubmitted(false);
                      }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                        isActive
                          ? 'bg-[#20242B] text-white'
                          : isDone
                          ? 'bg-white border border-[#C3D2F7] text-[#3457D5]'
                          : 'bg-white border border-[#EBE8E1] text-[#7E8796] hover:bg-[#F8F7F4]'
                      }`}
                    >
                      <span>{isDone ? '✓' : `M${idx + 1}`}</span>
                      <span>{mod.title[language].split(':')[0].split('(')[0]}</span>
                    </button>
                  );
                })}
              </div>

              {/* Active Written Module Card */}
              {currentModule && (
                <div className="bg-white border border-[#EBE8E1] rounded-2xl p-6 sm:p-8 shadow-2xs space-y-6">
                  
                  {/* Module Header */}
                  <div className="space-y-1.5 border-b border-[#EBE8E1] pb-4">
                    <span className="text-[11px] font-bold text-[#3457D5] uppercase tracking-wider block">
                      {currentModule.moduleLabel[language]}
                    </span>
                    <h2 className="text-xl sm:text-2xl font-bold text-[#20242B] leading-snug">
                      {currentModule.title[language]}
                    </h2>
                  </div>

                  {/* Written Educational Explanation */}
                  <div className="space-y-4 text-[#4A5160] leading-relaxed text-sm sm:text-base">
                    <p>{currentModule.conceptText[language]}</p>

                    {/* Formula if present */}
                    {currentModule.formula && (
                      <div className="p-3.5 bg-[#F8F7F4] border border-[#EBE8E1] rounded-xl text-center font-mono font-bold text-[#20242B] text-sm">
                        {currentModule.formula}
                      </div>
                    )}

                    {/* Key Points */}
                    {currentModule.keyPoints && (
                      <div className="bg-[#FAF5ED] border border-[#E8DCBE] rounded-xl p-4 space-y-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-[#977636] block">
                          Key Concept Points:
                        </span>
                        <ul className="space-y-1.5 text-xs sm:text-sm text-[#4A5160]">
                          {currentModule.keyPoints[language].map((pt, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="text-[#C9A96E] font-bold">•</span>
                              <span>{pt}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Real-World Example */}
                    <div className="p-4 bg-[#F8F7F4] rounded-xl border border-[#EBE8E1] text-xs sm:text-sm text-[#7E8796] italic">
                      {currentModule.exampleText[language]}
                    </div>
                  </div>

                  {/* Quick Check Question (if module has question) */}
                  {currentModule.hasQuestion && currentModule.question && currentModule.options && (
                    <div className="space-y-4 pt-4 border-t border-[#EBE8E1]">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xs font-bold uppercase tracking-wider text-[#7E8796]">
                          Quick Check
                        </h3>
                        <span className="text-xs font-bold text-[#3457D5] bg-[#EDF1FC] px-2 py-0.5 rounded">
                          +{currentModule.xpReward} XP
                        </span>
                      </div>

                      <p className="text-sm sm:text-base font-semibold text-[#20242B]">
                        {currentModule.question[language]}
                      </p>

                      <div className="space-y-2.5">
                        {currentModule.options.map((opt) => {
                          const isSelected = selectedOptionId === opt.id;
                          let style = 'bg-white border-[#EBE8E1] text-[#4A5160] hover:border-[#D8D4CB]';

                          if (hasSubmitted || isCurrentModuleDone) {
                            if (opt.isCorrect) {
                              style = 'bg-[#EDF1FC] border-[#3457D5] text-[#20242B] font-semibold';
                            } else if (isSelected && !opt.isCorrect) {
                              style = 'bg-rose-50 border-rose-300 text-rose-900';
                            }
                          } else if (isSelected) {
                            style = 'bg-[#EDF1FC] border-[#3457D5] text-[#20242B] font-semibold ring-1 ring-[#3457D5]';
                          }

                          return (
                            <button
                              key={opt.id}
                              onClick={() => handleSelectOption(opt.id)}
                              className={`w-full p-3.5 rounded-xl border text-left text-xs sm:text-sm font-medium transition-all flex items-center justify-between ${style}`}
                            >
                              <span>{opt.text[language]}</span>
                              {(hasSubmitted || isCurrentModuleDone) && opt.isCorrect && (
                                <CheckCircle2 className="w-4 h-4 text-[#3457D5] flex-shrink-0" />
                              )}
                            </button>
                          );
                        })}
                      </div>

                      {/* Feedback banner */}
                      {hasSubmitted && (
                        <div
                          className={`p-3.5 rounded-xl border text-xs leading-relaxed ${
                            isCurrentModuleDone
                              ? 'bg-[#EDF1FC] border-[#C3D2F7] text-[#20242B]'
                              : 'bg-rose-50 border-rose-200 text-rose-900'
                          }`}
                        >
                          <span className="font-bold block mb-0.5">
                            {isCurrentModuleDone ? '✓ Correct! +XP Awarded' : '⚠️ Try again'}
                          </span>
                          <span>
                            {
                              currentModule.options.find((o) => o.id === selectedOptionId)?.explanation[
                                language
                              ]
                            }
                          </span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Actions & Next Module Button */}
                  <div className="pt-6 border-t border-[#EBE8E1] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <button
                      onClick={handlePrevModule}
                      disabled={currentModuleIndex === 0}
                      className="px-4 py-2 rounded-xl border border-[#EBE8E1] bg-white hover:bg-[#F8F7F4] disabled:opacity-30 text-xs font-semibold text-[#4A5160] flex items-center justify-center gap-1.5"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Previous Module</span>
                    </button>

                    <div>
                      {!isCurrentModuleDone ? (
                        <button
                          onClick={handleVerifyAnswer}
                          disabled={currentModule.hasQuestion && !selectedOptionId}
                          className="w-full sm:w-auto px-6 py-2.5 bg-[#3457D5] hover:bg-[#2845B2] disabled:opacity-40 text-white text-xs font-bold rounded-xl shadow-xs transition-all"
                        >
                          {currentModule.hasQuestion ? 'Check Answer & Earn XP' : 'Mark as Complete →'}
                        </button>
                      ) : (
                        <button
                          onClick={handleNextModule}
                          className="w-full sm:w-auto px-6 py-2.5 bg-[#3457D5] hover:bg-[#2845B2] text-white text-xs font-bold rounded-xl shadow-xs transition-all flex items-center justify-center gap-2"
                        >
                          <span>
                            {currentModuleIndex === totalModules - 1
                              ? 'Finish Lesson →'
                              : 'Next Module →'}
                          </span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
