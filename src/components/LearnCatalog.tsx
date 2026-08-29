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
        return { bg: 'bg-[#EDF1FC]', text: 'text-[#3457D5]', border: 'border-[#C3D2F7]' };
      case 'math':
        return { bg: 'bg-[#FAF5ED]', text: 'text-[#977636]', border: 'border-[#E8DCBE]' };
      case 'language':
        return { bg: 'bg-[#EEF7F6]', text: 'text-[#2B7A78]', border: 'border-[#CDEAE8]' };
      case 'tech':
        return { bg: 'bg-[#EEF2FC]', text: 'text-[#3457D5]', border: 'border-[#CAD6FA]' };
      default:
        return { bg: 'bg-[#F8F7F4]', text: 'text-[#4A5160]', border: 'border-[#EBE8E1]' };
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto py-2">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#20242B]">
          {t.learn.title}
        </h1>
        <p className="text-sm text-[#7E8796] mt-1">{t.learn.subtitle}</p>
      </div>

      {/* Audience Category Tabs (School vs Undergraduate) */}
      <div className="flex border-b border-[#EBE8E1] gap-8">
        <button
          onClick={() => {
            setSelectedAudience('School');
            setSelectedSubject('all');
          }}
          className={`pb-3 text-sm font-semibold transition-colors relative ${
            selectedAudience === 'School'
              ? 'text-[#3457D5] font-bold'
              : 'text-[#7E8796] hover:text-[#20242B]'
          }`}
        >
          <span>{t.learn.schoolTab}</span>
          {selectedAudience === 'School' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#3457D5] rounded-full" />
          )}
        </button>

        <button
          onClick={() => {
            setSelectedAudience('Undergraduate');
            setSelectedSubject('all');
          }}
          className={`pb-3 text-sm font-semibold transition-colors relative ${
            selectedAudience === 'Undergraduate'
              ? 'text-[#3457D5] font-bold'
              : 'text-[#7E8796] hover:text-[#20242B]'
          }`}
        >
          <span>{t.learn.undergradTab}</span>
          {selectedAudience === 'Undergraduate' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#3457D5] rounded-full" />
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
                  ? 'bg-[#20242B] text-white font-semibold'
                  : 'bg-white border border-[#EBE8E1] text-[#4A5160] hover:bg-[#F8F7F4]'
              }`}
            >
              {sub.label}
            </button>
          ))}
        </div>

        {/* Search input */}
        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-[#7E8796] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filter courses..."
            className="w-full bg-white border border-[#EBE8E1] rounded-lg pl-8 pr-3 py-1.5 text-xs text-[#20242B] placeholder-[#7E8796] focus:outline-none focus:border-[#3457D5]"
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
              className="bg-white border border-[#EBE8E1] rounded-2xl p-5 shadow-2xs hover:border-[#D8D4CB] hover:shadow-xs transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-lg ${colors.bg} border ${colors.border} ${colors.text} flex items-center justify-center`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[11px] font-bold text-[#7E8796] uppercase tracking-wider block">
                        {module.subjectName?.[language] || module.worldId}
                      </span>
                      <span className="text-[10px] text-[#7E8796] font-medium">
                        {module.levelBadge[language]}
                      </span>
                    </div>
                  </div>

                  <span
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                      module.isDownloaded
                        ? 'bg-[#EDF1FC] text-[#3457D5] border border-[#C3D2F7]'
                        : 'bg-[#F8F7F4] text-[#7E8796] border border-[#EBE8E1]'
                    }`}
                  >
                    {module.isDownloaded ? '✓ Offline Ready' : `${module.estimatedSizeMb} MB`}
                  </span>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-[#20242B] line-clamp-1">
                    {module.title[language]}
                  </h3>
                  <p className="text-xs text-[#7E8796] mt-1 line-clamp-2 leading-relaxed">
                    {module.description[language]}
                  </p>
                </div>

                <div className="text-[11px] text-[#7E8796] flex items-center gap-3">
                  <span>{module.syllabus.length} Checkpoints</span>
                  <span>•</span>
                  <span>{module.difficulty}</span>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-[#EBE8E1] flex items-center justify-between">
                <button
                  onClick={() => setActivePackModalId(module.id)}
                  className="px-2.5 py-1 text-xs text-[#4A5160] hover:text-[#20242B] font-medium"
                >
                  Syllabus Details
                </button>
                <button
                  onClick={() => setActiveLessonPackId(module.id)}
                  className="px-3.5 py-1.5 bg-[#3457D5] hover:bg-[#2845B2] text-white text-xs font-semibold rounded-lg shadow-2xs transition-colors flex items-center gap-1.5"
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
