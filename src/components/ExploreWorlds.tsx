import React, { useState } from 'react';
import {
  Atom,
  Calculator,
  BookOpen,
  Code2,
  Sparkles,
  Download,
  Search,
  Play,
  Layers,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import type { WorldId } from '../types';

export const ExploreWorlds: React.FC = () => {
  const { learningPacks, language, t, setActivePackModalId, setActiveLessonPackId } = useApp();
  const [selectedWorld, setSelectedWorld] = useState<WorldId | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [onlyDownloaded, setOnlyDownloaded] = useState(false);

  const worldsConfig: Array<{ id: WorldId; name: string; icon: any; color: string; desc: string; bg: string; text: string }> = [
    {
      id: 'science',
      name: t.worlds.science,
      icon: Atom,
      color: 'bg-blue-500',
      bg: 'bg-blue-50 border-blue-200',
      text: 'text-blue-900',
      desc: t.worlds.scienceDesc,
    },
    {
      id: 'math',
      name: t.worlds.math,
      icon: Calculator,
      color: 'bg-amber-500',
      bg: 'bg-amber-50 border-amber-200',
      text: 'text-amber-900',
      desc: t.worlds.mathDesc,
    },
    {
      id: 'language',
      name: t.worlds.language,
      icon: BookOpen,
      color: 'bg-purple-500',
      bg: 'bg-purple-50 border-purple-200',
      text: 'text-purple-900',
      desc: t.worlds.languageDesc,
    },
    {
      id: 'tech',
      name: t.worlds.tech,
      icon: Code2,
      color: 'bg-teal-500',
      bg: 'bg-teal-50 border-teal-200',
      text: 'text-teal-900',
      desc: t.worlds.techDesc,
    },
  ];

  const filteredPacks = learningPacks.filter((pack) => {
    const matchesWorld = selectedWorld === 'all' || pack.worldId === selectedWorld;
    const matchesDownload = !onlyDownloaded || pack.isDownloaded;
    const titleText = pack.title[language].toLowerCase();
    const descText = pack.description[language].toLowerCase();
    const matchesSearch =
      titleText.includes(searchQuery.toLowerCase()) ||
      descText.includes(searchQuery.toLowerCase());
    return matchesWorld && matchesDownload && matchesSearch;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-150 max-w-5xl mx-auto">
      {/* Header */}
      <div>
        <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200">
          Learning Worlds
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">{t.worlds.allWorlds}</h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Pick a subject world to start interactive lessons and challenges.
        </p>
      </div>

      {/* World Category Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {worldsConfig.map((world) => {
          const Icon = world.icon;
          const isSelected = selectedWorld === world.id;
          return (
            <button
              key={world.id}
              onClick={() => setSelectedWorld(isSelected ? 'all' : world.id)}
              className={`p-4 rounded-3xl border text-left transition-all flex flex-col justify-between ${
                isSelected
                  ? `${world.bg} ring-2 ring-emerald-500 shadow-sm`
                  : 'bg-white border-slate-200 hover:border-slate-300 shadow-2xs'
              }`}
            >
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-2xl bg-white border border-slate-200 flex items-center justify-center shadow-2xs">
                  <Icon className="w-5 h-5 text-slate-800" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-slate-900">{world.name}</h3>
                  <p className="text-[11px] text-slate-500 line-clamp-2 mt-0.5 leading-snug">{world.desc}</p>
                </div>
              </div>

              <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
                <span className="text-slate-400 font-semibold">
                  {learningPacks.filter((p) => p.worldId === world.id).length} Packs
                </span>
                <span className={`font-bold ${isSelected ? 'text-emerald-700' : 'text-slate-400'}`}>
                  {isSelected ? 'Active ✓' : 'View →'}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Search & Simple Filter */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3 bg-white border border-slate-200 rounded-2xl shadow-2xs">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search lessons (e.g. Newton, Python, Math)..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <button
            onClick={() => setOnlyDownloaded((prev) => !prev)}
            className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              onlyDownloaded
                ? 'bg-emerald-100 border border-emerald-300 text-emerald-900'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Download className="w-3.5 h-3.5" />
            <span>Downloaded Only ({learningPacks.filter((p) => p.isDownloaded).length})</span>
          </button>

          {selectedWorld !== 'all' && (
            <button
              onClick={() => setSelectedWorld('all')}
              className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-600"
            >
              All Worlds
            </button>
          )}
        </div>
      </div>

      {/* Modules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPacks.map((pack) => (
          <div
            key={pack.id}
            className="bg-white p-5 rounded-3xl border border-slate-200 hover:border-emerald-300 hover:shadow-md transition-all flex flex-col justify-between group"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div className="w-10 h-10 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center shadow-2xs">
                  <BookOpen className="w-5 h-5" />
                </div>

                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    pack.isDownloaded
                      ? 'bg-emerald-50 border border-emerald-200 text-emerald-700'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {pack.isDownloaded ? 'Downloaded ✓' : `${pack.estimatedSizeMb} MB`}
                </span>
              </div>

              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  {pack.levelBadge[language]}
                </span>
                <h3 className="text-sm font-black text-slate-900 group-hover:text-emerald-700 transition-colors mt-0.5">
                  {pack.title[language]}
                </h3>
                <p className="text-xs text-slate-500 mt-1 line-clamp-3 leading-relaxed">
                  {pack.description[language]}
                </p>
              </div>

              {/* Simple syllabus hint */}
              <div className="p-2.5 rounded-2xl bg-slate-50 border border-slate-100 text-[11px] text-slate-600">
                <span className="font-bold text-slate-700">{pack.syllabus.length} Checkpoints: </span>
                <span>{pack.syllabus[0]?.title[language]}</span>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between gap-2">
              <span className="text-xs font-bold text-amber-800 flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded-md">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" /> +{pack.xpReward} XP
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActivePackModalId(pack.id)}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold"
                >
                  Details
                </button>
                <button
                  onClick={() => setActiveLessonPackId(pack.id)}
                  className="px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1 shadow-2xs active:scale-95 transition-all"
                >
                  <Play className="w-3 h-3 fill-white" />
                  <span>Start</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
