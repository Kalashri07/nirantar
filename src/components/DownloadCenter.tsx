import React, { useState } from 'react';
import {
  Download,
  HardDrive,
  CheckCircle2,
  Trash2,
  Play,
  WifiOff,
  AlertCircle,
  Sparkles,
  BookOpen,
  RefreshCw,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const DownloadCenter: React.FC = () => {
  const {
    learningPacks,
    language,
    t,
    connectivityMode,
    downloadPack,
    removeDownloadedPack,
    setActiveLessonPackId,
    setActivePackModalId,
  } = useApp();

  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const downloadedPacks = learningPacks.filter((p) => p.isDownloaded);
  const availablePacks = learningPacks.filter((p) => !p.isDownloaded);

  const totalUsedMb = downloadedPacks.reduce((acc, p) => acc + p.estimatedSizeMb, 0);
  const maxStorageMb = 250;
  const storagePercentage = Math.min(100, Math.round((totalUsedMb / maxStorageMb) * 100));

  const isOffline = connectivityMode === 'offline';

  const handleDownload = async (packId: string) => {
    if (isOffline) return;
    setDownloadingId(packId);
    await downloadPack(packId);
    setDownloadingId(null);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-150 max-w-5xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200">
            Offline Storage
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">{t.downloads.title}</h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Downloaded lessons stay saved on this device so you can learn without internet.
          </p>
        </div>

        {isOffline && (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold">
            <WifiOff className="w-4 h-4" />
            <span>Offline Mode Active</span>
          </div>
        )}
      </div>

      {/* Storage Gauge Card */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center shadow-2xs">
              <HardDrive className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900">{t.downloads.storageUsage}</h3>
              <p className="text-xs text-slate-500">
                {totalUsedMb.toFixed(1)} MB used out of {maxStorageMb} MB capacity
              </p>
            </div>
          </div>

          <div className="text-left sm:text-right">
            <span className="text-xl font-black text-emerald-700 font-mono">
              {(maxStorageMb - totalUsedMb).toFixed(1)} MB
            </span>
            <span className="text-xs text-slate-400 block font-semibold">{t.downloads.storageFree}</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-1.5">
          <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden border border-slate-200/60 p-0.5">
            <div
              className="bg-gradient-to-r from-emerald-500 to-teal-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${Math.max(5, storagePercentage)}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-[11px] text-slate-500">
            <span>{downloadedPacks.length} packs ready on this phone</span>
            <span>{storagePercentage}% storage used</span>
          </div>
        </div>
      </div>

      {/* SECTION 1: DOWNLOADED PACKS */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span>{t.downloads.downloadedPacks} ({downloadedPacks.length})</span>
          </h2>
          <span className="text-xs font-bold text-emerald-700">100% Offline Ready</span>
        </div>

        {downloadedPacks.length === 0 ? (
          <div className="bg-white p-8 rounded-3xl border border-dashed border-slate-300 text-center space-y-2">
            <HardDrive className="w-8 h-8 text-slate-400 mx-auto" />
            <p className="text-xs text-slate-500 max-w-md mx-auto">{t.downloads.noDownloadsYet}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {downloadedPacks.map((pack) => (
              <div
                key={pack.id}
                className="bg-white p-5 rounded-3xl border border-slate-200 hover:border-emerald-300 hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="w-10 h-10 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center shadow-2xs">
                      <BookOpen className="w-5 h-5" />
                    </div>

                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-bold uppercase flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Ready Offline
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      {pack.estimatedSizeMb} MB • {pack.syllabus.length} Checkpoints
                    </span>
                    <h3 className="text-sm font-black text-slate-900 group-hover:text-emerald-700 transition-colors mt-0.5">
                      {pack.title[language]}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                      {pack.subtitle[language]}
                    </p>
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                  <button
                    onClick={() => removeDownloadedPack(pack.id)}
                    className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors text-xs font-bold flex items-center gap-1"
                    title="Remove from phone"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setActivePackModalId(pack.id)}
                      className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold"
                    >
                      Syllabus
                    </button>
                    <button
                      onClick={() => setActiveLessonPackId(pack.id)}
                      className="px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1 shadow-2xs active:scale-95 transition-all"
                    >
                      <Play className="w-3 h-3 fill-white" />
                      <span>Launch</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* SECTION 2: AVAILABLE FOR DOWNLOAD */}
      <div className="space-y-3 pt-2">
        <div>
          <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
            <Download className="w-5 h-5 text-emerald-600" />
            <span>{t.downloads.availableToDownload} ({availablePacks.length})</span>
          </h2>
          <p className="text-xs text-slate-500">Download when you have Wi-Fi or mobile data to learn anytime later.</p>
        </div>

        {isOffline && (
          <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0" />
            <span>{t.connectivity.downloadDisabledOffline}</span>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {availablePacks.map((pack) => {
            const isDownloading = downloadingId === pack.id || pack.downloadProgress !== undefined;
            return (
              <div
                key={pack.id}
                className="bg-white p-5 rounded-3xl border border-slate-200 hover:border-slate-300 transition-all flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="w-10 h-10 rounded-2xl bg-slate-100 text-slate-700 flex items-center justify-center">
                      <BookOpen className="w-5 h-5" />
                    </div>

                    <span className="text-xs font-mono font-bold text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-full">
                      {pack.estimatedSizeMb} MB
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      {pack.levelBadge[language]}
                    </span>
                    <h3 className="text-sm font-black text-slate-900 mt-0.5">
                      {pack.title[language]}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                      {pack.description[language]}
                    </p>
                  </div>
                </div>

                {/* Download Button */}
                <div className="pt-4 mt-4 border-t border-slate-100">
                  <button
                    onClick={() => handleDownload(pack.id)}
                    disabled={isOffline || isDownloading}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200 border border-transparent disabled:opacity-40 text-slate-700 text-xs font-bold flex items-center justify-center gap-2 transition-all"
                  >
                    {isDownloading ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 text-emerald-600 animate-spin" />
                        <span>Downloading {pack.downloadProgress || 45}%...</span>
                      </>
                    ) : (
                      <>
                        <Download className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Download to Phone ({pack.estimatedSizeMb} MB)</span>
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
