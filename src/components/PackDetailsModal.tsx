import React from 'react';
import {
  X,
  Download,
  CheckCircle2,
  Clock,
  HardDrive,
  Play,
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-100">
      <div className="w-full max-w-xl bg-white border border-[#EBE8E1] rounded-2xl p-6 shadow-xl relative max-h-[90vh] overflow-y-auto space-y-6">
        {/* Close Button */}
        <button
          onClick={() => setActivePackModalId(null)}
          className="absolute top-5 right-5 p-1.5 rounded-lg text-[#7E8796] hover:text-[#20242B] hover:bg-[#F8F7F4]"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-[#F8F7F4] border border-[#EBE8E1] flex items-center justify-center text-[#20242B] flex-shrink-0">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] font-bold text-[#7E8796] uppercase tracking-wider">
                {pack.subjectName?.[language] || pack.worldId}
              </span>
              <span className="text-xs text-[#EBE8E1]">•</span>
              <span className="text-[11px] font-medium text-[#7E8796]">
                {pack.difficulty}
              </span>
            </div>
            <h2 className="text-lg font-bold text-[#20242B] leading-snug">
              {pack.title[language]}
            </h2>
            <p className="text-xs text-[#7E8796] mt-1">{pack.subtitle[language]}</p>
          </div>
        </div>

        {/* Stats strip */}
        <div className="grid grid-cols-3 gap-3 p-3 rounded-xl bg-[#F8F7F4] border border-[#EBE8E1] text-center text-xs">
          <div>
            <span className="text-[11px] text-[#7E8796] block font-medium">Status</span>
            <span className="font-bold text-[#20242B]">
              {pack.isDownloaded ? '✓ Offline Ready' : 'Online Stream'}
            </span>
          </div>
          <div>
            <span className="text-[11px] text-[#7E8796] block font-medium">File Size</span>
            <span className="font-bold text-[#20242B]">{pack.estimatedSizeMb} MB</span>
          </div>
          <div>
            <span className="text-[11px] text-[#7E8796] block font-medium">Progress</span>
            <span className="font-bold text-[#3457D5]">{pack.progressPercentage}%</span>
          </div>
        </div>

        {/* Checkpoints Syllabus */}
        <div className="space-y-2.5">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#7E8796] flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-[#7E8796]" />
            <span>Course Checkpoints ({pack.syllabus.length})</span>
          </h3>

          <div className="divide-y divide-[#EBE8E1] border border-[#EBE8E1] rounded-xl overflow-hidden text-xs">
            {pack.syllabus.map((item, idx) => (
              <div
                key={item.id}
                className="p-3 flex items-center justify-between bg-white hover:bg-[#F8F7F4]/60"
              >
                <div className="flex items-center gap-2.5">
                  <span
                    className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${
                      item.completed
                        ? 'bg-[#3457D5] text-white'
                        : 'border border-[#D8D4CB] text-[#7E8796]'
                    }`}
                  >
                    {item.completed ? '✓' : idx + 1}
                  </span>
                  <span className={`font-medium ${item.completed ? 'text-[#7E8796]' : 'text-[#20242B]'}`}>
                    {item.title[language]}
                  </span>
                </div>
                <span className="text-[11px] text-[#7E8796]">{item.durationMin} min</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-[#EBE8E1]">
          <div>
            {pack.isDownloaded ? (
              <button
                onClick={() => removeDownloadedPack(pack.id)}
                className="text-xs text-rose-600 hover:text-rose-700 flex items-center gap-1 font-medium"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Remove offline download</span>
              </button>
            ) : (
              <button
                onClick={() => downloadPack(pack.id)}
                disabled={isOffline || pack.downloadProgress !== undefined}
                className="px-3.5 py-1.5 rounded-lg border border-[#EBE8E1] bg-white hover:bg-[#F8F7F4] disabled:opacity-40 text-xs font-medium text-[#4A5160] flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5 text-[#3457D5]" />
                <span>
                  {pack.downloadProgress !== undefined
                    ? `Downloading ${pack.downloadProgress}%...`
                    : `Download (${pack.estimatedSizeMb} MB)`}
                </span>
              </button>
            )}
          </div>

          <button
            onClick={handleStartMission}
            className="px-5 py-2.5 bg-[#3457D5] hover:bg-[#2845B2] active:scale-95 text-white text-xs font-bold rounded-xl shadow-xs transition-all flex items-center justify-center gap-2"
          >
            <Play className="w-3.5 h-3.5 fill-white" />
            <span>Launch Lesson</span>
          </button>
        </div>
      </div>
    </div>
  );
};
