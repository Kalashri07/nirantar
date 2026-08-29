import React, { useState } from 'react';
import {
  X,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Play,
  RotateCcw,
  Zap,
  Award,
  BookOpen,
  HelpCircle,
  Code2,
  Atom,
  FlaskConical,
  WifiOff,
  Check,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import type { InteractiveStep } from '../types';

export const GamifiedLessonViewer: React.FC = () => {
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
  const [isMissionFinished, setIsMissionFinished] = useState(false);

  // 1. Force Cart Simulation State
  const [appliedBrakingForce, setAppliedBrakingForce] = useState(360);
  const [cartSimulating, setCartSimulating] = useState(false);
  const [cartStoppedDistance, setCartStoppedDistance] = useState<number | null>(null);

  // 2. Python Code Editor State
  const [codeContent, setCodeContent] = useState<string>(() => {
    return `# Kopargaon Weather Sensor\nreadings = [28, 31, 29, 30, 32]\ntotal = 0\nfor temp in readings:\n    total += temp\n\naverage = total / len(readings)\nprint(f"Average: {average} C")`;
  });
  const [codeOutput, setCodeOutput] = useState<string | null>(null);
  const [codeStatus, setCodeStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // 3. Chemistry Reagent Mixer State
  const [selectedReagent, setSelectedReagent] = useState<string | null>(null);
  const [chemReactionMessage, setChemReactionMessage] = useState<string | null>(null);

  if (!activeLessonPackId || !pack) return null;

  const mission = pack.interactiveMission;
  const currentStep: InteractiveStep | undefined = mission.steps[currentStepIndex];

  const handleSelectOption = (optionId: string) => {
    if (hasSubmitted && stepCompleted) return;
    setSelectedOptionId(optionId);
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

  const handleNextStep = () => {
    if (currentStepIndex < mission.steps.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
      setSelectedOptionId(null);
      setHasSubmitted(false);
      setStepCompleted(false);
    } else {
      setIsMissionFinished(true);
      triggerCelebration();
    }
  };

  const handlePrevStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
      setSelectedOptionId(null);
      setHasSubmitted(false);
      setStepCompleted(false);
    }
  };

  // Run Cart Simulation
  const handleRunCartSim = () => {
    setCartSimulating(true);
    setTimeout(() => {
      setCartSimulating(false);
      const stopDist = Math.round((150 * 12 * 12) / (2 * appliedBrakingForce));
      setCartStoppedDistance(stopDist);
    }, 1000);
  };

  // Run Python Code Simulator
  const handleRunPythonCode = () => {
    if (codeContent.includes('total += temp') || codeContent.includes('total = total + temp')) {
      setCodeStatus('success');
      setCodeOutput('>>> Sensor Connected Successfully!\n>>> Total Sum: 150\n>>> Sensor Count: 5\n>>> Result: Average Temperature = 30.0 °C\n>>> [OK] Test Passed!');
      triggerCelebration();
    } else {
      setCodeStatus('error');
      setCodeOutput('>>> Line 4 Error: Accumulator overwriting total instead of adding.\n>>> Hint: Change "total = temp" to "total += temp"');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-900/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-150">
      <div className="w-full max-w-3xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden my-auto flex flex-col max-h-[92vh]">
        {/* Top Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 bg-slate-50/80 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
              {pack.worldId === 'science' && <Atom className="w-5 h-5" />}
              {pack.worldId === 'tech' && <Code2 className="w-5 h-5" />}
              {pack.worldId === 'math' && <HelpCircle className="w-5 h-5" />}
              {pack.worldId === 'language' && <BookOpen className="w-5 h-5" />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold text-emerald-700 uppercase">
                  {pack.title[language]}
                </span>
                {connectivityMode === 'offline' && (
                  <span className="px-2 py-0.5 rounded-full bg-rose-50 border border-rose-200 text-[10px] text-rose-700 font-bold flex items-center gap-1">
                    <WifiOff className="w-3 h-3" /> Offline Lesson
                  </span>
                )}
              </div>
              <h2 className="text-base sm:text-lg font-black text-slate-900 leading-snug">
                {mission.title[language]}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-amber-800 hidden sm:flex items-center gap-1 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              +{pack.xpReward} XP
            </span>
            <button
              onClick={() => setActiveLessonPackId(null)}
              className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* MISSION COMPLETED CELEBRATION */}
        {isMissionFinished ? (
          <div className="p-8 text-center space-y-6 animate-in zoom-in-95 duration-150">
            <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-tr from-amber-400 to-emerald-400 p-1 shadow-lg flex items-center justify-center animate-bounce">
              <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
                <Award className="w-10 h-10 text-amber-500" />
              </div>
            </div>

            <div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-700">
                🎉 Awesome Job!
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
                {t.lesson.missionCompleted}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto mt-2">
                You have successfully completed all interactive checkpoints for this mission!
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-center">
                <span className="text-xs text-emerald-700 block font-semibold">Total XP Earned</span>
                <span className="text-2xl font-black text-emerald-800">+{pack.xpReward} XP</span>
              </div>
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-center">
                <span className="text-xs text-amber-700 block font-semibold">Unlocked Badge</span>
                <span className="text-sm font-black text-amber-900 flex items-center justify-center gap-1 mt-1">
                  <Award className="w-4 h-4 text-amber-600" /> {mission.badgeReward}
                </span>
              </div>
            </div>

            {connectivityMode === 'offline' && (
              <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-2xl text-xs text-amber-900 max-w-md mx-auto flex items-center gap-2 text-left">
                <WifiOff className="w-4 h-4 text-amber-600 flex-shrink-0" />
                <span>
                  <strong>Saved Offline:</strong> Your score and new badge are safely stored on this phone and will synchronize when you reconnect.
                </span>
              </div>
            )}

            <div className="pt-2">
              <button
                onClick={() => setActiveLessonPackId(null)}
                className="px-8 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-sm shadow-md"
              >
                {t.lesson.backToDashboard}
              </button>
            </div>
          </div>
        ) : (
          /* ACTIVE STEP CONTENT */
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5">
            {/* Step Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {mission.steps.map((st, idx) => (
                <div
                  key={st.id}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                    idx === currentStepIndex
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : idx < currentStepIndex
                      ? 'bg-slate-100 text-slate-500'
                      : 'bg-slate-50 text-slate-400'
                  }`}
                >
                  {idx < currentStepIndex ? (
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                  ) : (
                    <span>{idx + 1}.</span>
                  )}
                  <span>{st.type.toUpperCase()}</span>
                </div>
              ))}
            </div>

            {/* Story / Scenario Note */}
            <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-100 text-xs text-emerald-900 leading-relaxed">
              <span className="font-bold text-emerald-800 block mb-0.5">📋 Mission Scenario:</span>
              {mission.scenario[language]}
            </div>

            {/* Current Step Concept */}
            {currentStep && (
              <div className="space-y-4">
                <div className="border-l-4 border-emerald-500 pl-3.5 py-1">
                  <h3 className="text-base sm:text-lg font-black text-slate-900">{currentStep.title[language]}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                    {currentStep.description[language]}
                  </p>
                </div>

                {/* 1. INTERACTIVE SIMULATOR (FORCE CART) */}
                {currentStep.interactiveData?.simType === 'force_cart' && (
                  <div className="p-4 sm:p-5 rounded-3xl bg-slate-50 border border-slate-200 space-y-4">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                      <span className="flex items-center gap-1 text-emerald-700">
                        <Zap className="w-4 h-4 text-emerald-600" /> Lab Braking Force Test
                      </span>
                      <span className="font-mono text-slate-500">Cart Mass: 150 kg | Velocity: 12 m/s</span>
                    </div>

                    {/* Animated Track */}
                    <div className="relative w-full h-18 bg-white border border-slate-200 rounded-2xl overflow-hidden flex items-center px-4 shadow-inner">
                      <div className="absolute inset-x-0 h-1 bg-slate-200 bottom-3" />
                      <div className="absolute right-4 bottom-3 w-3.5 h-10 bg-rose-500 rounded-t flex items-center justify-center text-[8px] font-bold text-white uppercase">
                        Wall
                      </div>

                      <div
                        className={`transition-all duration-1000 flex items-center gap-1.5 p-2 rounded-xl bg-emerald-600 text-white text-xs font-bold shadow-md ${
                          cartSimulating ? 'translate-x-44' : 'translate-x-1'
                        }`}
                      >
                        <span>🛒 150kg Cart</span>
                        {cartSimulating && <span className="text-[10px] text-amber-200 animate-pulse">Braking...</span>}
                      </div>
                    </div>

                    {/* Controls */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
                      <div className="flex items-center gap-2 w-full sm:w-auto">
                        <label className="text-xs text-slate-700 font-bold">Braking Force:</label>
                        <input
                          type="range"
                          min="100"
                          max="600"
                          step="20"
                          value={appliedBrakingForce}
                          onChange={(e) => setAppliedBrakingForce(Number(e.target.value))}
                          className="accent-emerald-600 cursor-pointer"
                        />
                        <span className="text-xs font-mono font-bold text-emerald-700">{appliedBrakingForce} N</span>
                      </div>

                      <button
                        onClick={handleRunCartSim}
                        disabled={cartSimulating}
                        className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs"
                      >
                        <Play className="w-3.5 h-3.5 fill-white" />
                        <span>{cartSimulating ? 'Testing...' : 'Test Brakes'}</span>
                      </button>
                    </div>

                    {cartStoppedDistance !== null && (
                      <div className="text-xs p-3 rounded-xl bg-white border border-slate-200 text-slate-700 font-semibold">
                        {cartStoppedDistance <= 30 ? (
                          <span className="text-emerald-700 font-bold">
                            ✓ Great! Cart stopped safely in {cartStoppedDistance} meters before the barrier.
                          </span>
                        ) : (
                          <span className="text-rose-700 font-bold">
                            ⚠️ Cart overshot at {cartStoppedDistance} meters. Increase the braking force!
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {/* 2. PYTHON CODE EDITOR */}
                {currentStep.interactiveData?.simType === 'python_editor' && (
                  <div className="p-4 rounded-3xl bg-slate-50 border border-slate-200 space-y-3 font-mono">
                    <div className="flex items-center justify-between text-xs text-slate-500 border-b border-slate-200 pb-2">
                      <span className="font-bold text-slate-800">sensor_script.py</span>
                      <button
                        onClick={() =>
                          setCodeContent(
                            `# Kopargaon Weather Sensor\nreadings = [28, 31, 29, 30, 32]\ntotal = 0\nfor temp in readings:\n    total += temp\n\naverage = total / len(readings)\nprint(f"Average: {average} C")`
                          )
                        }
                        className="text-[11px] text-emerald-700 hover:underline flex items-center gap-1 font-bold"
                      >
                        <RotateCcw className="w-3 h-3" /> Auto-Fix Hint
                      </button>
                    </div>

                    <textarea
                      value={codeContent}
                      onChange={(e) => setCodeContent(e.target.value)}
                      rows={6}
                      className="w-full bg-white p-3 rounded-xl border border-slate-200 text-slate-900 text-xs font-mono focus:outline-none focus:border-emerald-500 resize-none leading-relaxed"
                      spellCheck={false}
                    />

                    <div className="flex items-center justify-between pt-1">
                      <button
                        onClick={handleRunPythonCode}
                        className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs"
                      >
                        <Play className="w-3.5 h-3.5 fill-white" />
                        <span>{t.lesson.runCode}</span>
                      </button>
                      <span className="text-[11px] text-slate-500">Expected Average: 30.0 °C</span>
                    </div>

                    {codeOutput && (
                      <div
                        className={`p-3 rounded-xl text-xs font-mono whitespace-pre-line border ${
                          codeStatus === 'success'
                            ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                            : 'bg-rose-50 border-rose-200 text-rose-900'
                        }`}
                      >
                        {codeOutput}
                      </div>
                    )}
                  </div>
                )}

                {/* 3. CHEMISTRY MIXER */}
                {currentStep.interactiveData?.simType === 'chemistry_reaction' && (
                  <div className="p-4 rounded-3xl bg-slate-50 border border-slate-200 space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-emerald-800 flex items-center gap-1">
                        <FlaskConical className="w-4 h-4 text-emerald-600" /> Neutralize Sodium Hydroxide (NaOH)
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      {['Weak Hydrochloric Acid (HCl)', 'Pure Water (H2O)', 'Alcohol'].map((item) => (
                        <button
                          key={item}
                          onClick={() => {
                            setSelectedReagent(item);
                            if (item.includes('HCl')) {
                              setChemReactionMessage('✓ Reaction: NaOH + HCl → NaCl (Table Salt) + H2O (Pure Water). Safe neutral state achieved!');
                            } else {
                              setChemReactionMessage('⚠️ Ineffective! Water alone does not neutralize basic hydroxide alkalinity.');
                            }
                          }}
                          className={`p-3 rounded-2xl border text-xs font-bold text-left transition-all ${
                            selectedReagent === item
                              ? 'bg-emerald-100 border-emerald-400 text-emerald-900 shadow-xs'
                              : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                          }`}
                        >
                          {item}
                        </button>
                      ))}
                    </div>

                    {chemReactionMessage && (
                      <div className="p-3 rounded-xl bg-white border border-slate-200 text-xs text-slate-800 font-semibold">
                        {chemReactionMessage}
                      </div>
                    )}
                  </div>
                )}

                {/* MULTIPLE CHOICE QUESTION */}
                {currentStep.question && currentStep.options && (
                  <div className="p-4 sm:p-5 rounded-3xl bg-slate-50 border border-slate-200 space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 font-black text-xs flex items-center justify-center">
                        ?
                      </span>
                      <h4 className="text-sm font-bold text-slate-900">
                        {currentStep.question[language]}
                      </h4>
                    </div>

                    <div className="space-y-2">
                      {currentStep.options.map((opt) => {
                        const isSelected = selectedOptionId === opt.id;
                        let optionStyle = 'bg-white border-slate-200 text-slate-800 hover:border-slate-300';

                        if (hasSubmitted) {
                          if (opt.isCorrect) {
                            optionStyle = 'bg-emerald-50 border-emerald-400 text-emerald-900 ring-1 ring-emerald-400';
                          } else if (isSelected && !opt.isCorrect) {
                            optionStyle = 'bg-rose-50 border-rose-300 text-rose-900';
                          }
                        } else if (isSelected) {
                          optionStyle = 'bg-emerald-50 border-emerald-400 text-emerald-900 ring-1 ring-emerald-400';
                        }

                        return (
                          <button
                            key={opt.id}
                            onClick={() => handleSelectOption(opt.id)}
                            className={`w-full p-3.5 rounded-2xl border text-left text-xs sm:text-sm font-semibold transition-all flex items-center justify-between ${optionStyle}`}
                          >
                            <span>{opt.text[language]}</span>
                            {hasSubmitted && opt.isCorrect && (
                              <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                            )}
                            {hasSubmitted && isSelected && !opt.isCorrect && (
                              <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0" />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {/* Feedback Alert */}
                    {hasSubmitted && (
                      <div
                        className={`p-3.5 rounded-2xl border text-xs space-y-1 animate-in fade-in duration-150 ${
                          stepCompleted
                            ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                            : 'bg-rose-50 border-rose-200 text-rose-900'
                        }`}
                      >
                        <div className="flex items-center gap-1.5 font-black">
                          {stepCompleted ? (
                            <>
                              <Sparkles className="w-4 h-4 text-emerald-600" />
                              <span>{t.lesson.correctAnswer}</span>
                            </>
                          ) : (
                            <>
                              <AlertCircle className="w-4 h-4 text-rose-600" />
                              <span>{t.lesson.tryAgain}</span>
                            </>
                          )}
                        </div>
                        <p className="text-xs pt-0.5 leading-relaxed">
                          {
                            currentStep.options.find((o) => o.id === selectedOptionId)?.explanation[
                              language
                            ]
                          }
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Bottom Actions */}
        {!isMissionFinished && (
          <div className="p-4 sm:p-5 border-t border-slate-100 bg-slate-50/80 flex items-center justify-between gap-3">
            <button
              onClick={handlePrevStep}
              disabled={currentStepIndex === 0}
              className="px-4 py-2 rounded-xl bg-white hover:bg-slate-100 disabled:opacity-30 text-slate-700 text-xs font-bold flex items-center gap-1.5 border border-slate-200"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{t.lesson.prevStep}</span>
            </button>

            <div className="flex items-center gap-2">
              {!stepCompleted ? (
                <button
                  onClick={handleVerifyAnswer}
                  disabled={!selectedOptionId}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white text-xs font-bold shadow-xs"
                >
                  {t.lesson.verifyAnswer}
                </button>
              ) : (
                <button
                  onClick={handleNextStep}
                  className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black flex items-center gap-1.5 shadow-sm"
                >
                  <span>
                    {currentStepIndex === mission.steps.length - 1
                      ? t.lesson.finishMission
                      : t.lesson.nextStep}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
