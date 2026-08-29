import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Play,
  RotateCcw,
  Check,
  Award,
  Sparkles,
  BookOpen,
  WifiOff,
  Zap,
  FlaskConical,
  Code2,
  ShieldCheck,
  X,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import type { InteractiveStep } from '../types';

export const LessonWorkspace: React.FC = () => {
  const {
    activeLessonPackId,
    setActiveLessonPackId,
    learningPacks,
    language,
    t,
    connectivityMode,
    recordStepCompletion,
    triggerCelebration,
  } = useApp();

  const pack = learningPacks.find((p) => p.id === activeLessonPackId);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [stepCompleted, setStepCompleted] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  // 1. Force Simulation State
  const [appliedBrakingForce, setAppliedBrakingForce] = useState(360);
  const [cartSimulating, setCartSimulating] = useState(false);
  const [cartStoppedDistance, setCartStoppedDistance] = useState<number | null>(null);

  // 2. Python Code Editor State
  const [codeContent, setCodeContent] = useState<string>(() => {
    return `# Sensor Data Aggregator\nreadings = [28, 31, 29, 30, 32]\ntotal = 0\nfor temp in readings:\n    total += temp\n\naverage = total / len(readings)\nprint(f"Average: {average} C")`;
  });
  const [codeOutput, setCodeOutput] = useState<string | null>(null);
  const [codeSuccess, setCodeSuccess] = useState<boolean | null>(null);

  // 3. Chemistry Reagent Mixer State
  const [selectedReagent, setSelectedReagent] = useState<string | null>(null);
  const [reactionNote, setReactionNote] = useState<string | null>(null);

  if (!activeLessonPackId || !pack) return null;

  const mission = pack.interactiveMission;
  const currentStep: InteractiveStep | undefined = mission.steps[currentStepIndex];

  const handleSelectOption = (optId: string) => {
    if (hasSubmitted && stepCompleted) return;
    setSelectedOptionId(optId);
    setHasSubmitted(false);
  };

  const handleVerifyAnswer = () => {
    if (!selectedOptionId || !currentStep?.options) return;
    const option = currentStep.options.find((o) => o.id === selectedOptionId);
    setHasSubmitted(true);

    if (option?.isCorrect) {
      setStepCompleted(true);
      triggerCelebration();
      recordStepCompletion(
        pack.id,
        currentStep.id,
        currentStep.xpReward,
        currentStep.title[language]
      );
    }
  };

  const handleNext = () => {
    if (currentStepIndex < mission.steps.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
      setSelectedOptionId(null);
      setHasSubmitted(false);
      setStepCompleted(false);
    } else {
      setIsFinished(true);
      triggerCelebration();
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
      setSelectedOptionId(null);
      setHasSubmitted(false);
      setStepCompleted(false);
    }
  };

  // Run Force Sim
  const handleTestBraking = () => {
    setCartSimulating(true);
    setTimeout(() => {
      setCartSimulating(false);
      const stopDist = Math.round((150 * 12 * 12) / (2 * appliedBrakingForce));
      setCartStoppedDistance(stopDist);
    }, 700);
  };

  // Run Python Code
  const handleRunPython = () => {
    if (codeContent.includes('total += temp') || codeContent.includes('total = total + temp')) {
      setCodeSuccess(true);
      setCodeOutput('>>> Output: Average Temp = 30.0 °C\n>>> Status: All tests passed successfully.');
      triggerCelebration();
    } else {
      setCodeSuccess(false);
      setCodeOutput('>>> Error: Accumulator is overwriting total.\n>>> Hint: Use `total += temp`');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-100">
      <div className="bg-white w-full max-w-5xl rounded-2xl border border-slate-200 shadow-2xl flex flex-col max-h-[92vh] overflow-hidden">
        {/* Top Header Bar */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between gap-4 bg-slate-50/50">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveLessonPackId(null)}
              className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-500 hover:text-slate-900 transition-colors"
              title="Close lesson"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                {pack.subjectName?.[language] || pack.worldId}
              </span>
              <h2 className="text-sm sm:text-base font-bold text-slate-900 leading-tight">
                {pack.title[language]}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {connectivityMode === 'offline' && (
              <span className="text-[11px] font-medium text-rose-700 bg-rose-50 border border-rose-200 px-2.5 py-1 rounded-md flex items-center gap-1">
                <WifiOff className="w-3 h-3" /> Offline Mode
              </span>
            )}
            <button
              onClick={() => setActiveLessonPackId(null)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* COMPLETED SCREEN */}
        {isFinished ? (
          <div className="p-8 sm:p-12 text-center space-y-6 max-w-md mx-auto my-auto">
            <div className="w-16 h-16 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                {t.lesson.completedTitle}
              </span>
              <h3 className="text-2xl font-bold text-slate-900 mt-1">
                {mission.title[language]}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-2">
                {t.lesson.completedDesc}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
                <span className="text-[11px] text-slate-400 block font-medium">Points Earned</span>
                <span className="text-lg font-bold text-emerald-700">+{pack.xpReward} XP</span>
              </div>
              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
                <span className="text-[11px] text-slate-400 block font-medium">Badge Awarded</span>
                <span className="text-xs font-bold text-slate-800 flex items-center justify-center gap-1 mt-1">
                  <Award className="w-3.5 h-3.5 text-amber-500" />
                  {mission.badgeReward}
                </span>
              </div>
            </div>

            <button
              onClick={() => setActiveLessonPackId(null)}
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors"
            >
              {t.lesson.backToCourse}
            </button>
          </div>
        ) : (
          /* TWO-COLUMN LESSON WORKSPACE */
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
            {/* Left Column: Lesson Outline / Checkpoints */}
            <aside className="w-full md:w-64 border-b md:border-b-0 md:border-r border-slate-200 p-4 space-y-3 bg-slate-50/40 overflow-y-auto">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                {t.lesson.checkpoints}
              </span>

              <div className="space-y-1.5">
                {mission.steps.map((st, idx) => {
                  const isActive = idx === currentStepIndex;
                  const isDone = idx < currentStepIndex || (isActive && stepCompleted);
                  return (
                    <button
                      key={st.id}
                      onClick={() => {
                        setCurrentStepIndex(idx);
                        setSelectedOptionId(null);
                        setHasSubmitted(false);
                        setStepCompleted(false);
                      }}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-left transition-colors ${
                        isActive
                          ? 'bg-white text-emerald-800 border border-emerald-200 shadow-2xs font-semibold'
                          : isDone
                          ? 'text-slate-700 hover:bg-slate-100'
                          : 'text-slate-400 hover:bg-slate-100'
                      }`}
                    >
                      <div
                        className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${
                          isDone
                            ? 'bg-emerald-600 text-white'
                            : isActive
                            ? 'border-2 border-emerald-600 text-emerald-600'
                            : 'border border-slate-300 text-slate-400'
                        }`}
                      >
                        {isDone ? '✓' : idx + 1}
                      </div>
                      <span className="truncate">{st.title[language]}</span>
                    </button>
                  );
                })}
              </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
              {currentStep && (
                <div className="space-y-6">
                  {/* Step Title & Explanation */}
                  <div className="space-y-2">
                    <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider">
                      {t.lesson.stepCount} {currentStepIndex + 1} of {mission.steps.length}
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                      {currentStep.title[language]}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl">
                      {currentStep.description[language]}
                    </p>
                  </div>

                  {/* 1. Force Cart Simulation */}
                  {currentStep.interactiveData?.simType === 'force_cart' && (
                    <div className="border border-slate-200 rounded-xl p-4 bg-slate-50 space-y-4 max-w-2xl">
                      <div className="flex items-center justify-between text-xs font-medium text-slate-600">
                        <span>Cart Mass: 150 kg | Initial Velocity: 12 m/s</span>
                        <span className="font-semibold text-emerald-800">Target: Stop before 30m</span>
                      </div>

                      {/* Track */}
                      <div className="relative w-full h-14 bg-white border border-slate-200 rounded-lg overflow-hidden flex items-center px-4">
                        <div className="absolute right-3 w-2.5 h-8 bg-rose-500 rounded-sm" />
                        <div
                          className={`transition-all duration-700 px-3 py-1.5 bg-emerald-600 text-white rounded-md text-xs font-medium flex items-center gap-1.5 ${
                            cartSimulating ? 'translate-x-48' : 'translate-x-1'
                          }`}
                        >
                          <span>Cart (150kg)</span>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
                        <div className="flex items-center gap-3">
                          <label className="text-xs font-medium text-slate-600">Braking Force:</label>
                          <input
                            type="range"
                            min="100"
                            max="600"
                            step="20"
                            value={appliedBrakingForce}
                            onChange={(e) => setAppliedBrakingForce(Number(e.target.value))}
                            className="accent-emerald-600 cursor-pointer"
                          />
                          <span className="text-xs font-mono font-bold text-slate-900">{appliedBrakingForce} N</span>
                        </div>

                        <button
                          onClick={handleTestBraking}
                          disabled={cartSimulating}
                          className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium rounded-lg transition-colors"
                        >
                          {cartSimulating ? 'Testing...' : 'Test Brakes'}
                        </button>
                      </div>

                      {cartStoppedDistance !== null && (
                        <p className="text-xs font-medium text-slate-700 pt-1">
                          {cartStoppedDistance <= 30 ? (
                            <span className="text-emerald-700">✓ Cart stopped safely in {cartStoppedDistance} meters!</span>
                          ) : (
                            <span className="text-rose-700">⚠️ Cart required {cartStoppedDistance} meters. Increase braking force!</span>
                          )}
                        </p>
                      )}
                    </div>
                  )}

                  {/* 2. Python Editor Simulation */}
                  {currentStep.interactiveData?.simType === 'python_editor' && (
                    <div className="border border-slate-200 rounded-xl p-4 bg-slate-50 space-y-3 font-mono max-w-2xl">
                      <div className="flex items-center justify-between text-xs text-slate-500">
                        <span>sensor_script.py</span>
                        <button
                          onClick={() =>
                            setCodeContent(
                              `# Sensor Data Aggregator\nreadings = [28, 31, 29, 30, 32]\ntotal = 0\nfor temp in readings:\n    total += temp\n\naverage = total / len(readings)\nprint(f"Average: {average} C")`
                            )
                          }
                          className="text-[11px] text-emerald-700 hover:underline flex items-center gap-1 font-sans font-medium"
                        >
                          <RotateCcw className="w-3 h-3" /> Auto-Fix
                        </button>
                      </div>

                      <textarea
                        value={codeContent}
                        onChange={(e) => setCodeContent(e.target.value)}
                        rows={5}
                        className="w-full bg-white p-3 rounded-lg border border-slate-200 text-xs font-mono text-slate-900 focus:outline-none focus:border-emerald-500"
                        spellCheck={false}
                      />

                      <div className="flex items-center justify-between">
                        <button
                          onClick={handleRunPython}
                          className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium rounded-lg font-sans transition-colors"
                        >
                          Run Code
                        </button>
                      </div>

                      {codeOutput && (
                        <div
                          className={`p-2.5 rounded-lg text-xs font-mono ${
                            codeSuccess
                              ? 'bg-emerald-50 border border-emerald-200 text-emerald-900'
                              : 'bg-rose-50 border border-rose-200 text-rose-900'
                          }`}
                        >
                          {codeOutput}
                        </div>
                      )}
                    </div>
                  )}

                  {/* 3. Chemistry Mixer Simulation */}
                  {currentStep.interactiveData?.simType === 'chemistry_reaction' && (
                    <div className="border border-slate-200 rounded-xl p-4 bg-slate-50 space-y-3 max-w-2xl">
                      <span className="text-xs font-bold text-slate-700 block">
                        Select Neutralizer for Base (NaOH) Spill:
                      </span>
                      <div className="grid grid-cols-3 gap-2">
                        {['Weak Acid (HCl)', 'Pure Water', 'Alcohol'].map((item) => (
                          <button
                            key={item}
                            onClick={() => {
                              setSelectedReagent(item);
                              if (item.includes('HCl')) {
                                setReactionNote('✓ Reaction: Acid + Base → Salt + Water (Neutralized safely).');
                              } else {
                                setReactionNote('⚠️ Ineffective: Water does not neutralize strong alkalinity.');
                              }
                            }}
                            className={`p-2.5 rounded-lg border text-xs font-medium text-left transition-colors ${
                              selectedReagent === item
                                ? 'bg-white border-emerald-500 text-emerald-900 font-bold ring-1 ring-emerald-500'
                                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                            }`}
                          >
                            {item}
                          </button>
                        ))}
                      </div>
                      {reactionNote && <p className="text-xs font-medium text-slate-700">{reactionNote}</p>}
                    </div>
                  )}

                  {/* Check Question */}
                  {currentStep.question && currentStep.options && (
                    <div className="space-y-3 max-w-2xl pt-2">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                        Check Your Understanding
                      </h4>
                      <p className="text-sm font-semibold text-slate-900">
                        {currentStep.question[language]}
                      </p>

                      <div className="space-y-2">
                        {currentStep.options.map((opt) => {
                          const isSelected = selectedOptionId === opt.id;
                          let style = 'bg-white border-slate-200 text-slate-700 hover:border-slate-300';

                          if (hasSubmitted) {
                            if (opt.isCorrect) {
                              style = 'bg-emerald-50 border-emerald-400 text-emerald-900 font-medium';
                            } else if (isSelected && !opt.isCorrect) {
                              style = 'bg-rose-50 border-rose-300 text-rose-900';
                            }
                          } else if (isSelected) {
                            style = 'bg-emerald-50 border-emerald-400 text-emerald-900 font-medium ring-1 ring-emerald-400';
                          }

                          return (
                            <button
                              key={opt.id}
                              onClick={() => handleSelectOption(opt.id)}
                              className={`w-full p-3 rounded-xl border text-left text-xs font-medium transition-colors flex items-center justify-between ${style}`}
                            >
                              <span>{opt.text[language]}</span>
                              {hasSubmitted && opt.isCorrect && (
                                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                              )}
                            </button>
                          );
                        })}
                      </div>

                      {/* Feedback banner */}
                      {hasSubmitted && (
                        <div
                          className={`p-3 rounded-xl border text-xs leading-relaxed ${
                            stepCompleted
                              ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                              : 'bg-rose-50 border-rose-200 text-rose-900'
                          }`}
                        >
                          <span className="font-bold block mb-0.5">
                            {stepCompleted ? t.lesson.correctNotification : t.lesson.tryAgainNotification}
                          </span>
                          <span>
                            {
                              currentStep.options.find((o) => o.id === selectedOptionId)?.explanation[
                                language
                              ]
                            }
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </main>
          </div>
        )}

        {/* Bottom Workspace Action Bar */}
        {!isFinished && (
          <div className="px-6 py-3.5 border-t border-slate-200 flex items-center justify-between bg-slate-50/50">
            <button
              onClick={handlePrev}
              disabled={currentStepIndex === 0}
              className="px-3.5 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-30 text-xs font-medium text-slate-700 flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Previous</span>
            </button>

            <div>
              {!stepCompleted ? (
                <button
                  onClick={handleVerifyAnswer}
                  disabled={!selectedOptionId}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors"
                >
                  {t.lesson.checkAnswer}
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors flex items-center gap-1"
                >
                  <span>
                    {currentStepIndex === mission.steps.length - 1
                      ? t.lesson.finishLesson
                      : t.lesson.nextCheckpoint}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
