import React from 'react';
import {
  X,
  Zap,
  Smartphone,
  BarChart3,
  ShieldCheck,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const DataImpactModal: React.FC = () => {
  const {
    isDataImpactOpen,
    setIsDataImpactOpen,
    connectivityMode,
    setConnectivityMode,
    dataStats,
    t,
  } = useApp();

  if (!isDataImpactOpen) return null;

  const isLowData = connectivityMode === 'low_data';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="w-full max-w-md bg-white border border-slate-200 rounded-3xl p-6 shadow-2xl relative">
        {/* Close button */}
        <button
          onClick={() => setIsDataImpactOpen(false)}
          className="absolute top-5 right-5 p-1.5 rounded-full bg-slate-100 text-slate-500 hover:text-slate-900"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-2xl bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-black text-slate-900">{t.lowDataMode.impactTitle}</h2>
            <p className="text-xs text-slate-500">Low-data optimization for Kopargaon learners</p>
          </div>
        </div>

        {/* Low Data Mode Toggle Box */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 mb-4 flex items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-slate-900">Low Data Mode</span>
              <span
                className={`text-[10px] uppercase px-2 py-0.5 rounded-full font-bold ${
                  isLowData ? 'bg-amber-100 text-amber-900 border border-amber-300' : 'bg-slate-200 text-slate-600'
                }`}
              >
                {isLowData ? 'Active' : 'Off'}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Saves up to 85% bandwidth by turning off heavy background assets.
            </p>
          </div>

          <button
            onClick={() => setConnectivityMode(isLowData ? 'online' : 'low_data')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1 shadow-2xs flex-shrink-0 ${
              isLowData
                ? 'bg-amber-600 text-white hover:bg-amber-500'
                : 'bg-emerald-600 text-white hover:bg-emerald-500'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>{isLowData ? 'Disable' : 'Enable ⚡'}</span>
          </button>
        </div>

        {/* Real-time Session Savings */}
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 mb-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-800">{t.lowDataMode.sessionSaved}</span>
            <span className="text-base font-black text-emerald-700">+{dataStats.sessionSavedMb} MB</span>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-600 mb-1">
              <Smartphone className="w-3.5 h-3.5 text-blue-600" />
              <span>Today</span>
            </div>
            <span className="text-[11px] text-slate-400 block">Data Saved:</span>
            <span className="text-base font-black text-emerald-700">{dataStats.todaySavedMb} MB</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-600 mb-1">
              <BarChart3 className="w-3.5 h-3.5 text-amber-600" />
              <span>This Week</span>
            </div>
            <span className="text-[11px] text-slate-400 block">Data Saved:</span>
            <span className="text-base font-black text-emerald-700">{dataStats.weekSavedMb} MB</span>
          </div>
        </div>

        {/* Reassurance note */}
        <div className="flex items-start gap-2 text-xs text-slate-500 p-3 rounded-2xl bg-slate-50 border border-slate-100">
          <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
          <p>
            All lesson text, diagrams, and quizzes load instantaneously without video lag.
          </p>
        </div>
      </div>
    </div>
  );
};
