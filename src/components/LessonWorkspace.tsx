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
  TrendingUp,
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
    t,
  } = useApp();

  const pack = learningPacks.find((p) => p.id === activeLessonPackId);
  const lessonData = activeLessonPackId ? detailedLessons[activeLessonPackId] : undefined;

  // Active Tab: 'lesson' | 'progress'
  const [activeTab, setActiveTab] = useState<'lesson' | 'progress'>('lesson');

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
    setSelectedOptionId(optId);
    setHasSubmitted(false);
  };

  const handleVerifyAnswer = () => {
    if (!currentModule) return;

    if (!currentModule.hasQuestion) {
      if (!moduleCompletedMap[currentModuleIndex]) {
        setModuleCompletedMap((prev) => ({ ...prev, [currentModuleIndex]: true }));
        triggerCelebration();
        recordStepCompletion(
          pack.id,
          currentModule.id,
          currentModule.xpReward,
          currentModule.title[language]
        );
      }
      return;
    }

    if (!selectedOptionId || !currentModule.options) return;
    const option = currentModule.options.find((o) => o.id === selectedOptionId);
    setHasSubmitted(true);

    if (option?.isCorrect) {
      if (!moduleCompletedMap[currentModuleIndex]) {
        setModuleCompletedMap((prev) => ({ ...prev, [currentModuleIndex]: true }));
        triggerCelebration();
        recordStepCompletion(
          pack.id,
          currentModule.id,
          currentModule.xpReward,
          currentModule.title[language]
        );
      }
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

  const handleSelectCheckpoint = (idx: number) => {
    setCurrentModuleIndex(idx);
    setSelectedOptionId(null);
    setHasSubmitted(false);
  };

  // Progress earned XP calculation
  const earnedXp = lessonData.modules.reduce((sum, m, idx) => {
    return moduleCompletedMap[idx] ? sum + m.xpReward : sum;
  }, 0);

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 md:p-6 animate-in fade-in duration-100">
      <div className="bg-[#F3EBDD] w-full max-w-4xl rounded-2xl border border-[#D8CABA] shadow-2xl flex flex-col max-h-[95vh] overflow-hidden">
        
        {/* =========================================================
            1. TOP HEADER & METADATA BAR
           ========================================================= */}
        <header className="bg-[#E9DDCB] px-5 py-3.5 border-b border-[#D8CABA] flex flex-col sm:flex-row sm:items-center justify-between gap-3 sticky top-0 z-10">
          <div className="flex items-center gap-3 min-w-0">
            <button
              onClick={() => setActiveLessonPackId(null)}
              className="p-1.5 rounded-lg hover:bg-[#FAF6EF] text-[#675E54] hover:text-[#102A43] transition-colors flex-shrink-0"
              title="Return to Courses"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold text-[#675E54] uppercase tracking-wider">
                  {pack.subjectName?.[language] || pack.worldId}
                </span>
                <span className="text-[#D8CABA]">•</span>
                <span className="text-xs font-semibold text-[#102A43]">
                  Progress: {progressPct}%
                </span>
                <span className="text-[#D8CABA]">•</span>
                {isOffline ? (
                  <span className="text-[11px] font-semibold text-[#782323] flex items-center gap-1 bg-[#F9E2E2] px-2 py-0.5 rounded border border-[#EBB6B6]">
                    🔴 Offline
                  </span>
                ) : (
                  <span className="text-[11px] font-semibold text-[#1E573E] flex items-center gap-1 bg-[#DCEFE5] px-2 py-0.5 rounded border border-[#B6DEC9]">
                    Offline Ready ✓
                  </span>
                )}
              </div>
              <h1 className="text-base sm:text-lg font-bold text-[#102A43] truncate">
                {pack.title[language]}
              </h1>
            </div>
          </div>

          {/* TAB NAVIGATION: 📖 LESSON vs 📈 PROGRESS */}
          <div className="flex items-center gap-2 self-end sm:self-center flex-shrink-0">
            <div className="bg-[#F3EBDD] p-1 rounded-xl flex items-center gap-1 border border-[#D8CABA]">
              <button
                onClick={() => setActiveTab('lesson')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                  activeTab === 'lesson'
                    ? 'bg-[#102A43] text-white shadow-2xs font-bold'
                    : 'text-[#675E54] hover:text-[#102A43]'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>LESSON</span>
              </button>
              <button
                onClick={() => setActiveTab('progress')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                  activeTab === 'progress'
                    ? 'bg-[#102A43] text-white shadow-2xs font-bold'
                    : 'text-[#675E54] hover:text-[#102A43]'
                }`}
              >
                <TrendingUp className="w-3.5 h-3.5" />
                <span>PROGRESS</span>
              </button>
            </div>

            <button
              onClick={() => setActiveLessonPackId(null)}
              className="p-1.5 rounded-lg text-[#675E54] hover:text-[#102A43] hover:bg-[#FAF6EF] transition-colors"
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
            <div className="bg-[#FAF6EF] border border-[#D8CABA] rounded-2xl p-8 sm:p-12 text-center space-y-6 max-w-lg mx-auto shadow-2xs">
              <div className="w-16 h-16 rounded-2xl bg-[#E9DDCB] border border-[#D8CABA] text-[#102A43] mx-auto flex items-center justify-center shadow-xs">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-1">
                <span className="text-xs font-bold text-[#102A43] uppercase tracking-wider">
                  🎉 MISSION COMPLETE
                </span>
                <h2 className="text-2xl font-bold text-[#102A43]">
                  {pack.title[language]}
                </h2>
                <p className="text-xs text-[#675E54]">
                  You have successfully finished all learning checkpoints!
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-4 bg-[#E9DDCB] border border-[#D8CABA] rounded-xl text-center">
                  <span className="text-[11px] text-[#675E54] block font-medium">XP Reward</span>
                  <span className="text-xl font-bold text-[#102A43]">+{lessonData.totalXp} XP</span>
                </div>
                <div className="p-4 bg-[#E9DDCB] border border-[#D8CABA] rounded-xl text-center">
                  <span className="text-[11px] text-[#675E54] block font-medium">Badge Awarded</span>
                  <span className="text-xs font-bold text-[#102A43] flex items-center justify-center gap-1 mt-1">
                    <Award className="w-4 h-4 text-[#102A43]" />
                    {lessonData.badgeName}
                  </span>
                </div>
              </div>

              <div className="p-3 bg-[#DCEFE5] text-[#1E573E] text-xs font-bold rounded-xl border border-[#B6DEC9]">
                100% Complete · Progress Saved on Device
              </div>

              <button
                onClick={() => setActiveLessonPackId(null)}
                className="w-full py-3 bg-[#102A43] hover:bg-[#0C1F33] active:scale-95 text-white text-xs font-bold rounded-xl shadow-xs transition-all flex items-center justify-center gap-2"
              >
                <span>Continue Learning →</span>
              </button>
            </div>
          ) : activeTab === 'progress' ? (

            /* =========================================================
               TAB B: 📈 DEDICATED PROGRESS VIEW
               ========================================================= */
            <div className="space-y-6 max-w-2xl mx-auto">
              {/* Progress Header */}
              <div className="bg-[#FAF6EF] border border-[#D8CABA] rounded-2xl p-6 shadow-2xs space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#E9DDCB] border border-[#D8CABA] flex items-center justify-center text-[#102A43]">
                      <TrendingUp className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="text-base font-bold text-[#102A43]">{pack.title[language]}</h2>
                      <span className="text-xs text-[#675E54] font-medium">Learning Progress Overview</span>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-[#102A43] bg-[#E9DDCB] px-3 py-1 rounded-full border border-[#D8CABA]">
                    ⭐ {earnedXp} / {lessonData.totalXp} XP
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="space-y-1.5 pt-2">
                  <div className="flex justify-between text-xs font-semibold text-[#102A43]">
                    <span>Module Progress</span>
                    <span>{progressPct}%</span>
                  </div>
                  <div className="w-full bg-[#E9DDCB] h-2.5 rounded-full overflow-hidden">
                    <div
                      className="bg-[#102A43] h-full rounded-full transition-all duration-300"
                      style={{ width: `${Math.max(5, progressPct)}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Badge Progress & Streak */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Badge Card */}
                <div className="bg-[#FAF6EF] border border-[#D8CABA] rounded-2xl p-5 shadow-2xs space-y-2">
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-[#102A43]" />
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#675E54]">Badge Milestone</h3>
                  </div>
                  <div className="pt-1">
                    <span className="text-sm font-bold text-[#102A43] block">
                      🏅 {lessonData.badgeName}
                    </span>
                    <p className="text-xs text-[#675E54] mt-0.5">
                      {completedCount} / {totalModules} checkpoints completed
                    </p>
                  </div>
                </div>

                {/* Streak Card */}
                <div className="bg-[#FAF6EF] border border-[#D8CABA] rounded-2xl p-5 shadow-2xs space-y-2">
                  <div className="flex items-center gap-2">
                    <Flame className="w-4 h-4 text-[#9E6B20]" />
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#675E54]">Daily Streak</h3>
                  </div>
                  <div className="pt-1">
                    <span className="text-sm font-bold text-[#102A43] block flex items-center gap-1.5">
                      🔥 {userProfile.streakDays} Day Learning Streak
                    </span>
                    <p className="text-xs text-[#675E54] mt-0.5">
                      Maintained across offline and online study sessions
                    </p>
                  </div>
                </div>
              </div>

              {/* Checkpoints Checklist */}
              <div className="bg-[#FAF6EF] border border-[#D8CABA] rounded-2xl p-6 shadow-2xs space-y-4">
                <h3 className="text-sm font-bold text-[#102A43]">Checkpoints Status</h3>

                <div className="divide-y divide-[#D8CABA] text-xs">
                  {lessonData.modules.map((mod, idx) => {
                    const isDone = !!moduleCompletedMap[idx];
                    return (
                      <div key={mod.id} className="py-3 flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <span className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-[11px] ${
                            isDone ? 'bg-[#102A43] text-white' : 'border border-[#C9B69C] text-[#675E54]'
                          }`}>
                            {isDone ? '✓' : idx + 1}
                          </span>
                          <span className={`font-medium ${isDone ? 'text-[#102A43]' : 'text-[#675E54]'}`}>
                            {mod.title[language]}
                          </span>
                        </div>
                        <span className={`font-mono text-xs font-semibold ${isDone ? 'text-[#102A43]' : 'text-[#675E54]'}`}>
                          +{mod.xpReward} XP {isDone ? '✓' : ''}
                        </span>
                      </div>
                    );
                  })}
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => setActiveTab('lesson')}
                    className="w-full py-2.5 bg-[#E9DDCB] hover:bg-[#E2D4BF] text-[#102A43] text-xs font-bold rounded-xl transition-colors text-center"
                  >
                    Return to Lesson →
                  </button>
                </div>
              </div>
            </div>
          ) : (

            /* =========================================================
               TAB A: 📖 DEDICATED WRITTEN LESSON & QUIZ VIEW
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
                      onClick={() => handleSelectCheckpoint(idx)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                        isActive
                          ? 'bg-[#102A43] text-white'
                          : isDone
                          ? 'bg-[#E9DDCB] border border-[#D8CABA] text-[#102A43]'
                          : 'bg-[#FAF6EF] border border-[#D8CABA] text-[#675E54] hover:bg-[#EFE5D5]'
                      }`}
                    >
                      <span>{isDone ? '✓' : `M${idx + 1}`}</span>
                      <span>{mod.title[language].split(':')[0].split('(')[0]}</span>
                    </button>
                  );
                })}
              </div>

              {/* Active Written Module & Quiz Card */}
              {currentModule && (
                <div className="bg-[#FAF6EF] border border-[#D8CABA] rounded-2xl p-6 sm:p-8 shadow-2xs space-y-6">
                  
                  {/* Module Header */}
                  <div className="space-y-1.5 border-b border-[#D8CABA] pb-4">
                    <span className="text-[11px] font-bold text-[#102A43] uppercase tracking-wider block">
                      {currentModule.moduleLabel[language]}
                    </span>
                    <h2 className="text-xl sm:text-2xl font-bold text-[#102A43] leading-snug">
                      {currentModule.title[language]}
                    </h2>
                  </div>

                  {/* Written Educational Explanation */}
                  <div className="space-y-4 text-[#102A43] leading-relaxed text-sm sm:text-base">
                    <p>{currentModule.conceptText[language]}</p>

                    {/* Formula if present */}
                    {currentModule.formula && (
                      <div className="p-3.5 bg-[#E9DDCB] border border-[#D8CABA] rounded-xl text-center font-mono font-bold text-[#102A43] text-sm">
                        {currentModule.formula}
                      </div>
                    )}

                    {/* Key Points */}
                    {currentModule.keyPoints && (
                      <div className="bg-[#EFE5D5] border border-[#C9B69C] rounded-xl p-4 space-y-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-[#102A43] block">
                          Key Concept Points:
                        </span>
                        <ul className="space-y-1.5 text-xs sm:text-sm text-[#102A43]">
                          {currentModule.keyPoints[language].map((pt, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="text-[#102A43] font-bold">•</span>
                              <span>{pt}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Real-World Example */}
                    <div className="p-4 bg-[#E9DDCB]/60 rounded-xl border border-[#D8CABA] text-xs sm:text-sm text-[#675E54] italic">
                      {currentModule.exampleText[language]}
                    </div>
                  </div>

                  {/* Quick Check Quiz Question (Never pre-selected automatically) */}
                  {currentModule.hasQuestion && currentModule.question && currentModule.options && (
                    <div className="space-y-4 pt-4 border-t border-[#D8CABA]">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xs font-bold uppercase tracking-wider text-[#675E54]">
                          Quick Check Question
                        </h3>
                        <span className="text-xs font-bold text-[#102A43] bg-[#E9DDCB] px-2 py-0.5 rounded">
                          +{currentModule.xpReward} XP
                        </span>
                      </div>

                      <p className="text-sm sm:text-base font-semibold text-[#102A43]">
                        {currentModule.question[language]}
                      </p>

                      {/* Options List */}
                      <div className="space-y-2.5">
                        {currentModule.options.map((opt) => {
                          const isSelected = selectedOptionId === opt.id;
                          let style = 'bg-[#FAF6EF] border-[#D8CABA] text-[#102A43] hover:bg-[#EFE5D5]';

                          if (hasSubmitted) {
                            if (isSelected && opt.isCorrect) {
                              style = 'bg-[#DCEFE5] border-[#2D7A58] text-[#1E573E] font-semibold';
                            } else if (isSelected && !opt.isCorrect) {
                              style = 'bg-[#F9E2E2] border-[#EBB6B6] text-[#782323] font-medium';
                            }
                          } else if (isSelected) {
                            style = 'bg-[#E9DDCB] border-[#102A43] text-[#102A43] font-semibold ring-1 ring-[#102A43]';
                          }

                          return (
                            <button
                              key={opt.id}
                              type="button"
                              onClick={() => handleSelectOption(opt.id)}
                              className={`w-full p-3.5 rounded-xl border text-left text-xs sm:text-sm font-medium transition-all flex items-center justify-between cursor-pointer ${style}`}
                            >
                              <span>{opt.text[language]}</span>
                              {hasSubmitted && isSelected && opt.isCorrect && (
                                <CheckCircle2 className="w-4 h-4 text-[#1E573E] flex-shrink-0" />
                              )}
                            </button>
                          );
                        })}
                      </div>

                      {/* Feedback banner (shown only after explicit submit) */}
                      {hasSubmitted && selectedOptionId && (
                        <div
                          className={`p-3.5 rounded-xl border text-xs leading-relaxed ${
                            isCurrentModuleDone
                              ? 'bg-[#DCEFE5] border-[#B6DEC9] text-[#1E573E]'
                              : 'bg-[#F9E2E2] border-[#EBB6B6] text-[#782323]'
                          }`}
                        >
                          <span className="font-bold block mb-0.5">
                            {isCurrentModuleDone
                              ? t.lesson.correctNotification
                              : t.lesson.tryAgainNotification}
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

                  {/* Actions & Next Module Navigation */}
                  <div className="pt-6 border-t border-[#D8CABA] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <button
                      onClick={handlePrevModule}
                      disabled={currentModuleIndex === 0}
                      className="px-4 py-2 rounded-xl border border-[#D8CABA] bg-[#E9DDCB] hover:bg-[#E2D4BF] disabled:opacity-30 text-xs font-semibold text-[#102A43] flex items-center justify-center gap-1.5"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Previous Checkpoint</span>
                    </button>

                    <div>
                      {!isCurrentModuleDone ? (
                        <button
                          onClick={handleVerifyAnswer}
                          disabled={currentModule.hasQuestion && !selectedOptionId}
                          className="w-full sm:w-auto px-6 py-2.5 bg-[#102A43] hover:bg-[#0C1F33] disabled:opacity-40 text-white text-xs font-bold rounded-xl shadow-xs transition-all cursor-pointer"
                        >
                          {currentModule.hasQuestion ? t.lesson.checkAnswer : 'Mark Checkpoint Complete →'}
                        </button>
                      ) : (
                        <button
                          onClick={handleNextModule}
                          className="w-full sm:w-auto px-6 py-2.5 bg-[#102A43] hover:bg-[#0C1F33] text-white text-xs font-bold rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <span>
                            {currentModuleIndex === totalModules - 1
                              ? t.lesson.finishLesson
                              : t.lesson.nextCheckpoint}
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
