import React from 'react';
import {
  FolderDown,
  HardDrive,
  CheckCircle2,
  Trash2,
  Play,
  Download,
  BookOpen,
  RefreshCw,
  Atom,
  FlaskConical,
  Calculator,
  Code2,
  ShieldAlert,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const MyLibrary: React.FC = () => {
  const {
    learningPacks,
    language,
    t,
    connectivityMode,
    downloadPack,
    removeDownloadedPack,
    setActiveLessonPackId,
  } = useApp();

  const downloadedModules = learningPacks.filter((p) => p.isDownloaded);
  const availableModules = learningPacks.filter((p) => !p.isDownloaded);

  const totalUsedMb = downloadedModules.reduce((acc, p) => acc + p.estimatedSizeMb, 0);
  const maxStorageMb = 250;
  const storagePercentage = Math.round((totalUsedMb / maxStorageMb) * 100);

  const isOffline = connectivityMode === 'offline';

  const getSubjectIcon = (iconName: string) => {
    switch (iconName) {
      case 'Atom':
        return Atom;
      case 'FlaskConical':
        return FlaskConical;
      case 'Calculator':
        return Calculator;
      case 'Code2':
        return Code2;
      case 'ShieldAlert':
        return ShieldAlert;
      default:
        return BookOpen;
    }
  };

  const getSubjectColors = (worldId: string) => {
    switch (worldId) {
      case 'science':
        return { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' };
      case 'math':
        return { bg: 'bg-amber-50', text: 'text-amber-800', border: 'border-amber-200' };
      case 'language':
        return { bg: 'bg-teal-50', text: 'text-teal-700', border: 'border-teal-200' };
      case 'tech':
        return { bg: 'bg-indigo-50', text: 'text-indigo-700', border: 'border-indigo-200' };
      default:
        return { bg: 'bg-slate-50', text: 'text-slate-700', border: 'border-slate-200' };
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto py-2">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
          {t.library.title}
        </h1>
        <p className="text-sm text-slate-500 mt-1">{t.library.subtitle}</p>
      </div>

      {/* Storage Gauge */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-2xs space-y-3">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <HardDrive className="w-4 h-4 text-slate-500" />
            <span className="font-semibold text-slate-800">{t.library.storageUsed}</span>
          </div>
          <span className="text-slate-500">
            <strong>{totalUsedMb.toFixed(1)} MB</strong> used of {maxStorageMb} MB ({storagePercentage}%)
          </span>
        </div>

        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
          <div
            className="bg-indigo-600 h-full rounded-full transition-all duration-300"
            style={{ width: `${Math.max(4, storagePercentage)}%` }}
          />
        </div>
      </div>

      {/* SECTION 1: DOWNLOADED MODULES */}
      <div className="space-y-3">
        <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <span>{t.library.downloadedList}</span>
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
            {downloadedModules.length}
          </span>
        </h2>

        {downloadedModules.length === 0 ? (
          <div className="bg-white border border-dashed border-slate-200 rounded-2xl p-8 text-center text-xs text-slate-500 max-w-md mx-auto">
            <FolderDown className="w-8 h-8 text-slate-400 mx-auto mb-2" />
            <p>{t.library.noDownloads}</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100 bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-2xs">
            {downloadedModules.map((module) => {
              const Icon = getSubjectIcon(module.icon);
              const colors = getSubjectColors(module.worldId);
              return (
                <div
                  key={module.id}
                  className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors"
                >
                  <div className="flex items-start sm:items-center gap-3.5 flex-1">
                    <div className={`w-10 h-10 rounded-xl ${colors.bg} border ${colors.border} flex items-center justify-center ${colors.text} flex-shrink-0`}>
                      <Icon className="w-5 h-5" />
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                          {module.subjectName?.[language] || module.worldId}
                        </span>
                        <span className="text-[10px] text-indigo-700 font-semibold flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> {t.library.readyOffline}
                        </span>
                      </div>
                      <h3 className="text-sm font-bold text-slate-900">
                        {module.title[language]}
                      </h3>
                      <p className="text-xs text-slate-500">
                        {module.progressPercentage}% complete · {module.estimatedSizeMb} MB
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-2 sm:pt-0">
                    <button
                      onClick={() => removeDownloadedPack(module.id)}
                      className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors text-xs font-medium"
                      title="Remove from device"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setActiveLessonPackId(module.id)}
                      className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white text-xs font-semibold rounded-xl shadow-2xs transition-all flex items-center gap-1.5"
                    >
                      <Play className="w-3.5 h-3.5 fill-white" />
                      <span>Start Lesson</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* SECTION 2: AVAILABLE FOR DOWNLOAD */}
      <div className="space-y-3 pt-2">
        <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <span>{t.library.availableList}</span>
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
            {availableModules.length}
          </span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {availableModules.map((module) => {
            const Icon = getSubjectIcon(module.icon);
            const colors = getSubjectColors(module.worldId);
            return (
              <div
                key={module.id}
                className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-2xs flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className={`w-8 h-8 rounded-lg ${colors.bg} border ${colors.border} flex items-center justify-center ${colors.text}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-mono text-slate-500">
                      {module.estimatedSizeMb} MB
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      {module.subjectName?.[language] || module.worldId}
                    </span>
                    <h3 className="text-xs font-bold text-slate-900 line-clamp-1">
                      {module.title[language]}
                    </h3>
                  </div>
                </div>

                <div className="pt-3 mt-3 border-t border-slate-100">
                  <button
                    onClick={() => downloadPack(module.id)}
                    disabled={isOffline || module.downloadProgress !== undefined}
                    className="w-full py-2 bg-slate-50 hover:bg-slate-100 disabled:opacity-40 text-slate-700 text-xs font-medium rounded-lg border border-slate-200 transition-colors flex items-center justify-center gap-1.5"
                  >
                    {module.downloadProgress !== undefined ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin text-indigo-600" />
                        <span>{t.library.downloading} ({module.downloadProgress}%)</span>
                      </>
                    ) : (
                      <>
                        <Download className="w-3.5 h-3.5 text-indigo-600" />
                        <span>{t.library.downloadAction}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
