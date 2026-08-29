import React from 'react';
import {
  Play,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  EyeOff,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const HackathonDemoBar: React.FC = () => {
  const {
    demoStep,
    setDemoStep,
    isDemoBarVisible,
    setIsDemoBarVisible,
    setConnectivityMode,
    connectivityMode,
    setLanguage,
    language,
    setCurrentNav,
    setActiveLessonPackId,
    downloadPack,
    setIsDataImpactOpen,
  } = useApp();

  const demoSteps = [
    {
      num: 1,
      title: "1. Online Dashboard",
      instruction: "Explore the personalized dashboard in Online mode.",
      actionLabel: "Go to Dashboard (Online)",
      action: () => {
        setConnectivityMode('online');
        setCurrentNav('dashboard');
        setActiveLessonPackId(null);
      },
    },
    {
      num: 2,
      title: "2. Download Physics Quest",
      instruction: "Download the Physics Quest module for offline use.",
      actionLabel: "Simulate Pack Download",
      action: async () => {
        setCurrentNav('downloads');
        await downloadPack('physics-quest');
      },
    },
    {
      num: 3,
      title: "3. Verify Offline Library",
      instruction: "Check local device storage and offline-ready badge.",
      actionLabel: "Open Offline Library",
      action: () => {
        setCurrentNav('downloads');
      },
    },
    {
      num: 4,
      title: "4. Switch to OFFLINE",
      instruction: "Cut internet connection. Experience local-first reliability.",
      actionLabel: "Switch Mode: 🔴 OFFLINE",
      action: () => {
        setConnectivityMode('offline');
        setCurrentNav('dashboard');
      },
    },
    {
      num: 5,
      title: "5. Launch Physics Mission",
      instruction: "Open 'Stop the Runaway Cart' without any internet!",
      actionLabel: "Launch Physics Offline",
      action: () => {
        setActiveLessonPackId('physics-quest');
      },
    },
    {
      num: 6,
      title: "6. Solve Newton's Laws Quiz",
      instruction: "Select answers and interact with the force simulation.",
      actionLabel: "Continue Quiz Step",
      action: () => {
        setActiveLessonPackId('physics-quest');
      },
    },
    {
      num: 7,
      title: "7. Earn XP Offline",
      instruction: "Earn +25 XP and +35 XP stored safely in localStorage.",
      actionLabel: "View Earned Rewards",
      action: () => {
        setActiveLessonPackId('physics-quest');
      },
    },
    {
      num: 8,
      title: "8. Check 'Pending Sync'",
      instruction: "See the pending sync counter indicating local-first safety.",
      actionLabel: "View Pending Counter",
      action: () => {
        setCurrentNav('dashboard');
        setActiveLessonPackId(null);
      },
    },
    {
      num: 9,
      title: "9. Switch back to ONLINE",
      instruction: "Restore connection and watch real-time cloud synchronization.",
      actionLabel: "Switch Mode: 🟢 ONLINE",
      action: () => {
        setConnectivityMode('online');
      },
    },
    {
      num: 10,
      title: "10. Automatic Sync Completed",
      instruction: "All offline quiz answers uploaded, cloud profile updated!",
      actionLabel: "Verify Synced Dashboard",
      action: () => {
        setCurrentNav('dashboard');
      },
    },
    {
      num: 11,
      title: "11. Switch to Marathi (मराठी)",
      instruction: "Full local language translation of UI and lesson content.",
      actionLabel: "Switch to मराठी",
      action: () => {
        setLanguage('mr');
      },
    },
    {
      num: 12,
      title: "12. View Marathi Lesson",
      instruction: "See Newton's laws and quizzes in pure Marathi language.",
      actionLabel: "Open Marathi Physics Mission",
      action: () => {
        setActiveLessonPackId('physics-quest');
      },
    },
    {
      num: 13,
      title: "13. Enable Low Data Mode",
      instruction: "Streamline UI, compress assets, and save up to 85% data.",
      actionLabel: "Toggle 🟡 Low Data Mode",
      action: () => {
        setConnectivityMode('low_data');
        setActiveLessonPackId(null);
        setCurrentNav('dashboard');
      },
    },
    {
      num: 14,
      title: "14. Data Impact Statistics",
      instruction: "Review mobile bandwidth saved today (18.7 MB) & weekly (146 MB).",
      actionLabel: "Open Data Impact Report",
      action: () => {
        setIsDataImpactOpen(true);
      },
    },
  ];

  const currentStepObj = demoSteps.find((s) => s.num === demoStep) || demoSteps[0];

  if (!isDemoBarVisible) {
    return (
      <button
        onClick={() => setIsDemoBarVisible(true)}
        className="fixed bottom-4 right-4 z-50 bg-emerald-600 hover:bg-emerald-500 text-white px-3.5 py-2 rounded-full shadow-lg flex items-center gap-2 text-xs font-bold transition-all border border-emerald-400/40"
      >
        <Sparkles className="w-4 h-4" />
        <span>14-Step Demo Tour</span>
      </button>
    );
  }

  return (
    <div className="fixed bottom-3 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-3xl bg-white border border-emerald-200 rounded-3xl shadow-xl p-3 text-slate-800 animate-in slide-in-from-bottom-2 duration-150">
      <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-1.5 mb-2">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-[10px]">
            {demoStep}
          </div>
          <span className="text-xs font-black tracking-wide text-emerald-800">
            DEMO PRESENTER (Step {demoStep} of 14)
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] text-slate-400 hidden sm:inline">
            Status: <strong>{connectivityMode.toUpperCase()}</strong> | Lang: <strong>{language.toUpperCase()}</strong>
          </span>
          <button
            onClick={() => setIsDemoBarVisible(false)}
            className="p-1 text-slate-400 hover:text-slate-700 rounded-lg text-xs"
            title="Minimize"
          >
            <EyeOff className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-2.5">
        <div className="flex-1 text-left">
          <h4 className="text-xs sm:text-sm font-black text-slate-900 leading-tight">
            {currentStepObj.title}
          </h4>
          <p className="text-[11px] text-slate-500 mt-0.5">
            {currentStepObj.instruction}
          </p>
        </div>

        <div className="flex items-center gap-1.5 w-full sm:w-auto justify-end">
          <button
            onClick={() => {
              if (demoStep > 1) {
                const nextStep = demoStep - 1;
                setDemoStep(nextStep);
                demoSteps[nextStep - 1].action();
              }
            }}
            disabled={demoStep === 1}
            className="p-1.5 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 rounded-xl text-xs font-bold text-slate-700 flex items-center"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <button
            onClick={() => {
              currentStepObj.action();
            }}
            className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-2xs flex items-center gap-1.5 active:scale-95 transition-all"
          >
            <Play className="w-3 h-3 fill-white" />
            <span>{currentStepObj.actionLabel}</span>
          </button>

          <button
            onClick={() => {
              if (demoStep < 14) {
                const nextStep = demoStep + 1;
                setDemoStep(nextStep);
                demoSteps[nextStep - 1].action();
              }
            }}
            disabled={demoStep === 14}
            className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 rounded-xl text-xs font-bold text-emerald-800 flex items-center gap-0.5"
          >
            <span>Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Progress pill bar */}
      <div className="flex items-center gap-1 mt-2 pt-1.5 border-t border-slate-100 overflow-x-auto pb-0.5">
        {demoSteps.map((s) => (
          <button
            key={s.num}
            onClick={() => {
              setDemoStep(s.num);
              s.action();
            }}
            className={`h-1.5 rounded-full transition-all flex-1 min-w-[14px] ${
              s.num === demoStep
                ? 'bg-emerald-600 scale-y-125'
                : s.num < demoStep
                ? 'bg-emerald-300'
                : 'bg-slate-200'
            }`}
            title={s.title}
          />
        ))}
      </div>
    </div>
  );
};
