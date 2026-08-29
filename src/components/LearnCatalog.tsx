import React, { useState } from 'react';
import {
  BookOpen,
  Atom,
  FlaskConical,
  Calculator,
  Code2,
  ShieldAlert,
  Search,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const LearnCatalog: React.FC = () => {
  const { learningPacks, language, t, setActiveLessonPackId, setActivePackModalId } = useApp();
  const [selectedAudience, setSelectedAudience] = useState<'School' | 'Undergraduate'>('School');
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const schoolSubjects = [
    { id: 'all', label: t.learn.allSubjects },
    { id: 'science', label: 'Science / Physics / Chemistry' },
    { id: 'math', label: 'Mathematics' },
    { id: 'language', label: 'English & Communication' },
  ];

  const undergradSubjects = [
    { id: 'all', label: t.learn.allSubjects },
    { id: 'tech', label: 'Programming & Tech' },
    { id: 'science', label: 'Applied Sciences' },
  ];

  const currentSubjects = selectedAudience === 'School' ? schoolSubjects : undergradSubjects;

  const filteredPacks = learningPacks.filter((pack) => {
    const matchesAudience = pack.targetAudience === selectedAudience;
    const matchesSubject = selectedSubject === 'all' || pack.worldId === selectedSubject;
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      pack.title[language].toLowerCase().includes(query) ||
      pack.description[language].toLowerCase().includes(query) ||
      (pack.subjectName?.[language] && pack.subjectName[language].toLowerCase().includes(query));
    return matchesAudience && matchesSubject && matchesSearch;
  });

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
    <div className="space-y-6 max-w-5xl mx-auto py-2">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
          {t.learn.title}
        </h1>
        <p className="text-sm text-slate-500 mt-1">{t.learn.subtitle}</p>
      </div>

      {/* Audience Category Tabs (School vs Undergraduate) */}
      <div className="flex border-b border-slate-200 gap-8">
        <button
          onClick={() => {
            setSelectedAudience('School');
            setSelectedSubject('all');
          }}
          className={`pb-3 text-sm font-semibold transition-colors relative ${
            selectedAudience === 'School'
              ? 'text-indigo-700 font-bold'
              : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <span>{t.learn.schoolTab}</span>
          {selectedAudience === 'School' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 rounded-full" />
          )}
        </button>

        <button
          onClick={() => {
            setSelectedAudience('Undergraduate');
            setSelectedSubject('all');
          }}
          className={`pb-3 text-sm font-semibold transition-colors relative ${
            selectedAudience === 'Undergraduate'
              ? 'text-indigo-700 font-bold'
              : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <span>{t.learn.undergradTab}</span>
          {selectedAudience === 'Undergraduate' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 rounded-full" />
          )}
        </button>
      </div>

      {/* Filter controls & Search */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        {/* Subject Pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          {currentSubjects.map((sub) => (
            <button
              key={sub.id}
              onClick={() => setSelectedSubject(sub.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                selectedSubject === sub.id
                  ? 'bg-slate-900 text-white font-semibold'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {sub.label}
            </button>
          ))}
        </div>

        {/* Search input */}
        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filter courses..."
            className="w-full bg-white border border-slate-200 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-500"
          />
        </div>
      </div>

      {/* Course Modules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-1">
        {filteredPacks.map((module) => {
          const Icon = getSubjectIcon(module.icon);
          const colors = getSubjectColors(module.worldId);
          return (
            <div
              key={module.id}
              className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-2xs hover:border-slate-300 hover:shadow-xs transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-lg ${colors.bg} border ${colors.border} ${colors.text} flex items-center justify-center`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                        {module.subjectName?.[language] || module.worldId}
                      </span>
                      <span className="text-[10px] text-slate-400 font-medium">
                        {module.levelBadge[language]}
                      </span>
                    </div>
                  </div>

                  <span
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                      module.isDownloaded
                        ? 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                        : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {module.isDownloaded ? '✓ Offline Ready' : `${module.estimatedSizeMb} MB`}
                  </span>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-slate-900 line-clamp-1">
                    {module.title[language]}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                    {module.description[language]}
                  </p>
                </div>

                <div className="text-[11px] text-slate-500 flex items-center gap-3">
                  <span>{module.syllabus.length} Checkpoints</span>
                  <span>•</span>
                  <span>{module.difficulty}</span>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => setActivePackModalId(module.id)}
                  className="px-2.5 py-1 text-xs text-slate-600 hover:text-slate-900 font-medium"
                >
                  Syllabus Details
                </button>
                <button
                  onClick={() => setActiveLessonPackId(module.id)}
                  className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg shadow-2xs transition-colors flex items-center gap-1.5"
                >
                  <span>Start Course</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
