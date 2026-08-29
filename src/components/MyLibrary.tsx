import React, { useState } from 'react';
import {
  Download,
  Trash2,
  HardDrive,
  CheckCircle2,
  Play,
  Layers,
  ArrowRight,
  BookOpen,
  AlertTriangle,
  X,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { LearningPack } from '../types';

export const MyLibrary: React.FC = () => {
  const {
    learningPacks,
    language,
    connectivityMode,
    downloadPack,
    removeDownloadedPack,
    setActivePackModalId,
    setActiveLessonPackId,
    t,
  } = useApp();

  const [moduleToDelete, setModuleToDelete] = useState<LearningPack | null>(null);

  const downloadedPacks = learningPacks.filter((p) => p.isDownloaded);
  const availablePacks = learningPacks.filter((p) => !p.isDownloaded);

  const totalUsedMb = downloadedPacks
    .reduce((sum, p) => sum + p.estimatedSizeMb, 0)
    .toFixed(1);

  const isOffline = connectivityMode === 'offline';

  const handleStartLesson = (packId: string) => {
    setActiveLessonPackId(packId);
  };

  const confirmDelete = () => {
    if (moduleToDelete) {
      removeDownloadedPack(moduleToDelete.id);
      setModuleToDelete(null);
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto py-2">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#102A43]">
          {t.library.title}
        </h1>
        <p className="text-sm text-[#675E54] mt-1">{t.library.subtitle}</p>
      </div>

      {/* 1. Device Storage Status Widget */}
      <div className="bg-[#FAF6EF] border border-[#D8CABA] rounded-2xl p-5 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-[#E9DDCB] text-[#102A43] flex items-center justify-center flex-shrink-0">
            <HardDrive className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-bold text-[#102A43] block">
              {t.library.storageUsed}
            </span>
            <span className="text-xs text-[#675E54]">
              {downloadedPacks.length} packs installed · {totalUsedMb} MB of 512 MB offline quota
            </span>
          </div>
        </div>

        <div className="w-full sm:w-48 space-y-1">
          <div className="w-full bg-[#E9DDCB] h-2 rounded-full overflow-hidden">
            <div
              className="bg-[#102A43] h-full rounded-full transition-all duration-300"
              style={{ width: `${Math.min(100, (parseFloat(totalUsedMb) / 512) * 100)}%` }}
            />
          </div>
          <span className="text-[10px] text-[#675E54] block text-right font-medium">
            {totalUsedMb} MB used
          </span>
        </div>
      </div>

      {/* 2. Downloaded Offline Modules */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-[#102A43]">{t.library.downloadedList}</h2>
          <span className="text-xs text-[#675E54]">
            {downloadedPacks.length} packs ready offline
          </span>
        </div>

        {downloadedPacks.length === 0 ? (
          <div className="p-8 border border-dashed border-[#D8CABA] rounded-2xl text-center bg-[#FAF6EF]/60 space-y-2">
            <p className="text-xs text-[#675E54]">{t.library.noDownloads}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {downloadedPacks.map((pack) => (
              <div
                key={pack.id}
                className="bg-[#FAF6EF] border border-[#D8CABA] hover:border-[#C9B69C] hover:bg-[#EFE5D5] rounded-2xl p-5 shadow-2xs flex flex-col justify-between transition-all space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#675E54] bg-[#E9DDCB] px-2 py-0.5 rounded border border-[#D8CABA]">
                      {pack.subjectName?.[language] || pack.worldId}
                    </span>
                    <span className="text-[10px] text-[#1E573E] bg-[#DCEFE5] px-2 py-0.5 rounded border border-[#B6DEC9] font-medium flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>{t.library.readyOffline}</span>
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-[#102A43] leading-snug">
                      {pack.title[language]}
                    </h3>
                    <p className="text-xs text-[#675E54] mt-1 line-clamp-2 leading-relaxed">
                      {pack.subtitle[language]}
                    </p>
                  </div>

                  <div className="text-[11px] text-[#675E54] flex items-center justify-between pt-1">
                    <span>{pack.estimatedSizeMb} MB on device</span>
                    <span className="font-semibold text-[#102A43]">
                      {pack.progressPercentage}% done
                    </span>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#D8CABA] flex items-center justify-between gap-2">
                  <button
                    onClick={() => setModuleToDelete(pack)}
                    className="p-2 rounded-lg text-rose-700 hover:bg-rose-50 transition-colors"
                    title="Remove module from offline library"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => handleStartLesson(pack.id)}
                    className="flex-1 py-2 bg-[#102A43] hover:bg-[#0C1F33] active:scale-95 text-white text-xs font-bold rounded-xl shadow-2xs transition-all flex items-center justify-center gap-1.5"
                  >
                    <Play className="w-3.5 h-3.5 fill-white" />
                    <span>Study Offline →</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 3. Available for Download */}
      {availablePacks.length > 0 && (
        <div className="space-y-4 pt-4">
          <h2 className="text-base font-bold text-[#102A43]">{t.library.availableList}</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {availablePacks.map((pack) => (
              <div
                key={pack.id}
                className="bg-[#FAF6EF] border border-[#D8CABA] rounded-2xl p-5 shadow-2xs flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#675E54] bg-[#E9DDCB] px-2 py-0.5 rounded border border-[#D8CABA]">
                    {pack.subjectName?.[language] || pack.worldId}
                  </span>
                  <h3 className="text-sm font-bold text-[#102A43] leading-snug">
                    {pack.title[language]}
                  </h3>
                  <span className="text-xs text-[#675E54] block">{pack.estimatedSizeMb} MB</span>
                </div>

                <div className="pt-3 border-t border-[#D8CABA] flex items-center justify-between">
                  <button
                    onClick={() => downloadPack(pack.id)}
                    disabled={isOffline || pack.downloadProgress !== undefined}
                    className="w-full py-2 bg-[#E9DDCB] hover:bg-[#E2D4BF] disabled:opacity-40 text-[#102A43] text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-2 border border-[#D8CABA]"
                  >
                    <Download className="w-3.5 h-3.5 text-[#102A43]" />
                    <span>
                      {pack.downloadProgress !== undefined
                        ? `Downloading ${pack.downloadProgress}%...`
                        : `${t.library.downloadAction} (${pack.estimatedSizeMb} MB)`}
                    </span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. Delete Confirmation Modal */}
      {moduleToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-100">
          <div className="bg-[#FAF6EF] border border-[#D8CABA] rounded-2xl p-6 shadow-2xl max-w-md w-full space-y-4">
            <div className="flex items-start justify-between">
              <div className="w-10 h-10 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <button
                onClick={() => setModuleToDelete(null)}
                className="p-1 rounded-lg text-[#675E54] hover:text-[#102A43] hover:bg-[#E9DDCB]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-1.5">
              <h3 className="text-base font-bold text-[#102A43]">
                Remove this module?
              </h3>
              <p className="text-xs text-[#675E54] leading-relaxed">
                Are you sure you want to remove <strong>{moduleToDelete.title[language]}</strong> from your offline library? You can download it again whenever an internet connection is available.
              </p>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-[#D8CABA]">
              <button
                onClick={() => setModuleToDelete(null)}
                className="px-4 py-2 bg-[#E9DDCB] hover:bg-[#E2D4BF] text-[#102A43] text-xs font-semibold rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-rose-700 hover:bg-rose-800 text-white text-xs font-bold rounded-xl shadow-2xs transition-colors"
              >
                Remove Module
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
