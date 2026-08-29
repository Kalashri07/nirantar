import React from 'react';
import {
  X,
  Download,
  CheckCircle2,
  Clock,
  HardDrive,
  Sparkles,
  Play,
  Globe,
  Trash2,
  Layers,
  BookOpen,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const PackDetailsModal: React.FC = () => {
  const {
    activePackModalId,
    setActivePackModalId,
    learningPacks,
    language,
    setLanguage,
    t,
    connectivityMode,
    downloadPack,
    removeDownloadedPack,
    setActiveLessonPackId,
  } = useApp();

  const pack = learningPacks.find((p) => p.id === activePackModalId);
  if (!activePackModalId || !pack) return null;

  const isOffline = connectivityMode === 'offline';

  const handleStartMission = () => {
    setActivePackModalId(null);
    setActiveLessonPackId(pack.id);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="w-full max-w-2xl bg-white border border-slate-200 rounded-3xl p-6 sm:p-7 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={() => setActivePackModalId(null)}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Top Header */}
        <div className="flex items-start gap-4 mb-5">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center shadow-2xs flex-shrink-0">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 uppercase">
                {pack.levelBadge[language]}
              </span>
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600">
                {pack.difficulty}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">{pack.title[language]}</h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">{pack.subtitle[language]}</p>
          </div>
        </div>

        {/* Meta Stats Bar */}
        <div className="grid grid-cols-3 gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200 mb-5 text-center">
          <div>
            <span className="text-[11px] text-slate-400 block font-semibold">Progress</span>
            <span className="text-sm font-black text-emerald-700">{pack.progressPercentage}% Done</span>
          </div>
          <div>
            <span className="text-[11px] text-slate-400 block font-semibold">Download Size</span>
            <span className="text-sm font-black text-slate-800">{pack.estimatedSizeMb} MB</span>
          </div>
          <div>
            <span className="text-[11px] text-slate-400 block font-semibold">Offline Status</span>
            <span className={`text-sm font-black ${pack.isDownloaded ? 'text-emerald-700' : 'text-slate-500'}`}>
              {pack.isDownloaded ? '✓ Ready' : 'Cloud Only'}
            </span>
          </div>
        </div>

        {/* Language Selection */}
        <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200 mb-5">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-emerald-600" />
            <span className="text-xs font-bold text-slate-800">Available Languages:</span>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setLanguage('en')}
              className={`px-2.5 py-1 text-xs font-bold rounded-lg ${language === 'en' ? 'bg-emerald-600 text-white shadow-2xs' : 'bg-white text-slate-700 border border-slate-200'}`}
            >
              English
            </button>
            <button
              onClick={() => setLanguage('mr')}
              className={`px-2.5 py-1 text-xs font-bold rounded-lg ${language === 'mr' ? 'bg-emerald-600 text-white shadow-2xs' : 'bg-white text-slate-700 border border-slate-200'}`}
            >
              मराठी
            </button>
            <button
              onClick={() => setLanguage('hi')}
              className={`px-2.5 py-1 text-xs font-bold rounded-lg ${language === 'hi' ? 'bg-emerald-600 text-white shadow-2xs' : 'bg-white text-slate-700 border border-slate-200'}`}
            >
              हिंदी
            </button>
          </div>
        </div>

        {/* Checkpoints Syllabus */}
        <div className="space-y-3 mb-6">
          <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-emerald-600" />
            <span>Lesson Checkpoints ({pack.syllabus.length})</span>
          </h3>

          <div className="space-y-1.5">
            {pack.syllabus.map((item) => (
              <div
                key={item.id}
                className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-2.5">
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                      item.completed
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-slate-200 text-slate-500'
                    }`}
                  >
                    {item.completed ? '✓' : '•'}
                  </div>
                  <span className={`font-semibold ${item.completed ? 'text-slate-400 line-through' : 'text-slate-800'}`}>
                    {item.title[language]}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-slate-400 text-[11px]">
                  <Clock className="w-3 h-3" />
                  <span>{item.durationMin} min</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-100">
          <div>
            {pack.isDownloaded ? (
              <button
                onClick={() => removeDownloadedPack(pack.id)}
                className="text-xs text-rose-600 hover:text-rose-700 flex items-center gap-1 font-bold"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Remove from offline storage</span>
              </button>
            ) : (
              <button
                onClick={() => downloadPack(pack.id)}
                disabled={isOffline || pack.downloadProgress !== undefined}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 disabled:opacity-40 text-xs font-bold text-slate-700 flex items-center gap-2"
              >
                <Download className="w-3.5 h-3.5 text-emerald-600" />
                <span>
                  {pack.downloadProgress !== undefined
                    ? `Downloading ${pack.downloadProgress}%...`
                    : `Download Pack (${pack.estimatedSizeMb} MB)`}
                </span>
              </button>
            )}
          </div>

          <button
            onClick={handleStartMission}
            disabled={isOffline && !pack.isDownloaded}
            className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm active:scale-95 transition-all"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>Continue Mission →</span>
          </button>
        </div>
      </div>
    </div>
  );
};
