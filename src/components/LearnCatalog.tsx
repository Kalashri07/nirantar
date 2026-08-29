import React, { useState } from 'react';
import {
  Download,
  CheckCircle2,
  Play,
  Layers,
  Sparkles,
  BookOpen,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const LearnCatalog: React.FC = () => {
  const {
    learningPacks,
    language,
    connectivityMode,
    downloadPack,
    setActivePackModalId,
    setActiveLessonPackId,
    t,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'School' | 'Undergraduate'>('School');
  const [selectedSubject, setSelectedSubject] = useState<string>('all');

  const isOffline = connectivityMode === 'offline';

  // Filter packs based on target audience & subject
  const filteredPacks = learningPacks.filter((pack) => {
    const matchAudience = pack.targetAudience === activeTab;
    const matchSubject = selectedSubject === 'all' || pack.worldId === selectedSubject;
    return matchAudience && matchSubject;
  });

  const handleStartLesson = (packId: string) => {
    setActiveLessonPackId(packId);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto py-2">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#102A43]">
          {t.learn.title}
        </h1>
        <p className="text-sm text-[#675E54] mt-1">{t.learn.subtitle}</p>
      </div>

      {/* 1. Academic Level Switcher (School vs Undergraduate) */}
      <div className="flex border-b border-[#D8CABA] gap-8">
        <button
          onClick={() => {
            setActiveTab('School');
            setSelectedSubject('all');
          }}
          className={`pb-3 text-sm font-bold border-b-2 transition-colors ${
            activeTab === 'School'
              ? 'border-[#102A43] text-[#102A43]'
              : 'border-transparent text-[#675E54] hover:text-[#102A43]'
          }`}
        >
          {t.learn.schoolTab}
        </button>

        <button
          onClick={() => {
            setActiveTab('Undergraduate');
            setSelectedSubject('all');
          }}
          className={`pb-3 text-sm font-bold border-b-2 transition-colors ${
            activeTab === 'Undergraduate'
              ? 'border-[#102A43] text-[#102A43]'
              : 'border-transparent text-[#675E54] hover:text-[#102A43]'
          }`}
        >
          {t.learn.undergradTab}
        </button>
      </div>

      {/* 2. Subject Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {[
          { id: 'all', label: t.learn.allSubjects },
          { id: 'science', label: 'Science' },
          { id: 'math', label: 'Mathematics' },
          { id: 'tech', label: 'Technology / Code' },
          { id: 'language', label: 'Language & Logic' },
        ].map((sub) => (
          <button
            key={sub.id}
            onClick={() => setSelectedSubject(sub.id)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-colors whitespace-nowrap ${
              selectedSubject === sub.id
                ? 'bg-[#102A43] text-white font-semibold shadow-2xs'
                : 'bg-[#E9DDCB] border border-[#D8CABA] text-[#675E54] hover:bg-[#E2D4BF]'
            }`}
          >
            {sub.label}
          </button>
        ))}
      </div>

      {/* 3. Course Modules Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-[#675E54]">
          <span>
            Showing {filteredPacks.length} {t.learn.modulesCount}
          </span>
          <span className="font-semibold text-[#102A43]">
            {activeTab === 'School' ? 'K-12 Syllabus' : 'Undergraduate Syllabus'}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredPacks.map((pack) => (
            <div
              key={pack.id}
              className="bg-[#FAF6EF] border border-[#D8CABA] hover:border-[#C9B69C] hover:bg-[#EFE5D5] rounded-2xl p-5 shadow-2xs flex flex-col justify-between transition-all space-y-4"
            >
              <div className="space-y-3">
                {/* Subject tag & status */}
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#675E54] bg-[#E9DDCB] px-2 py-0.5 rounded border border-[#D8CABA]">
                    {pack.subjectName?.[language] || pack.worldId}
                  </span>
                  <div className="flex items-center gap-1.5">
                    {pack.isDownloaded ? (
                      <span className="text-[10px] text-[#1E573E] bg-[#DCEFE5] px-2 py-0.5 rounded border border-[#B6DEC9] font-medium flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Offline</span>
                      </span>
                    ) : (
                      <span className="text-[10px] text-[#675E54] font-medium">
                        {pack.estimatedSizeMb} MB
                      </span>
                    )}
                  </div>
                </div>

                {/* Title & Description */}
                <div>
                  <h3 className="text-base font-bold text-[#102A43] leading-snug">
                    {pack.title[language]}
                  </h3>
                  <p className="text-xs text-[#675E54] mt-1 line-clamp-2 leading-relaxed">
                    {pack.subtitle[language]}
                  </p>
                </div>

                {/* Checkpoints summary */}
                <div className="flex items-center gap-2 text-[11px] text-[#675E54] pt-1">
                  <Layers className="w-3.5 h-3.5 text-[#8C8275]" />
                  <span>{pack.syllabus.length} Checkpoints</span>
                  <span>•</span>
                  <span>+{pack.xpReward} XP</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-[#D8CABA] flex items-center justify-between gap-2">
                {!pack.isDownloaded && (
                  <button
                    onClick={() => downloadPack(pack.id)}
                    disabled={isOffline || pack.downloadProgress !== undefined}
                    className="p-2 rounded-lg border border-[#D8CABA] bg-[#E9DDCB] hover:bg-[#E2D4BF] disabled:opacity-40 text-[#102A43] transition-colors"
                    title={`Download pack (${pack.estimatedSizeMb} MB)`}
                  >
                    <Download className="w-3.5 h-3.5 text-[#102A43]" />
                  </button>
                )}

                <button
                  onClick={() => handleStartLesson(pack.id)}
                  className="flex-1 py-2 bg-[#102A43] hover:bg-[#0C1F33] active:scale-95 text-white text-xs font-bold rounded-xl shadow-2xs transition-all flex items-center justify-center gap-1.5"
                >
                  <Play className="w-3.5 h-3.5 fill-white" />
                  <span>Start Lesson →</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
