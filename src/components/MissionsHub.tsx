import React, { useState } from 'react';
import {
  Target,
  Sparkles,
  Award,
  Zap,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const MissionsHub: React.FC = () => {
  const { missions, claimMissionReward, language, t, setActiveLessonPackId } = useApp();
  const [activeTab, setActiveTab] = useState<'daily' | 'weekly' | 'subject'>('daily');

  const filteredMissions = missions.filter((m) => m.type === activeTab);

  return (
    <div className="space-y-6 animate-in fade-in duration-150 max-w-5xl mx-auto">
      {/* Top Header */}
      <div>
        <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200">
          Learning Missions
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">{t.missions.title}</h1>
        <p className="text-xs sm:text-sm text-slate-500 max-w-2xl">{t.missions.subtitle}</p>
      </div>

      {/* Friendly Tabs */}
      <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-2xl w-fit border border-slate-200">
        <button
          onClick={() => setActiveTab('daily')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
            activeTab === 'daily'
              ? 'bg-white text-emerald-700 shadow-2xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Target className="w-3.5 h-3.5" />
          <span>{t.missions.dailyTab}</span>
        </button>
        <button
          onClick={() => setActiveTab('weekly')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
            activeTab === 'weekly'
              ? 'bg-white text-emerald-700 shadow-2xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Award className="w-3.5 h-3.5" />
          <span>{t.missions.weeklyTab}</span>
        </button>
        <button
          onClick={() => setActiveTab('subject')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
            activeTab === 'subject'
              ? 'bg-white text-emerald-700 shadow-2xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Zap className="w-3.5 h-3.5" />
          <span>{t.missions.subjectTab}</span>
        </button>
      </div>

      {/* Mission Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredMissions.map((mission) => {
          const isFinished = mission.progress >= mission.total;
          const percent = Math.min(100, Math.round((mission.progress / mission.total) * 100));

          return (
            <div
              key={mission.id}
              className={`p-6 rounded-3xl border transition-all flex flex-col justify-between ${
                mission.isClaimed
                  ? 'bg-slate-50 border-slate-200 opacity-80'
                  : isFinished
                  ? 'bg-emerald-50/70 border-emerald-300 shadow-sm'
                  : 'bg-white border-slate-200 shadow-2xs'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                    <Target className="w-5 h-5" />
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-amber-800 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-full flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-amber-500" /> +{mission.xpReward} XP
                    </span>
                    {mission.badgeReward && (
                      <span className="text-xs font-bold text-teal-800 bg-teal-50 border border-teal-200 px-2.5 py-1 rounded-full flex items-center gap-1">
                        <Award className="w-3 h-3 text-teal-600" /> {mission.badgeReward}
                      </span>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="text-base font-black text-slate-900">{mission.title[language]}</h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">{mission.description[language]}</p>
                </div>

                {/* Progress bar */}
                <div className="space-y-1.5 pt-1">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
                    <span>Progress: {percent}%</span>
                    <span>
                      {mission.progress} / {mission.total}
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden border border-slate-200/60">
                    <div
                      className={`h-full rounded-full transition-all ${
                        isFinished ? 'bg-emerald-500' : 'bg-slate-400'
                      }`}
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Bottom Action */}
              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-400 font-semibold">
                  {mission.type === 'daily' && 'Resets Daily'}
                  {mission.type === 'weekly' && 'Weekly Reward'}
                  {mission.type === 'subject' && 'Curriculum Track'}
                </span>

                {mission.isClaimed ? (
                  <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Claimed ✓</span>
                  </span>
                ) : isFinished ? (
                  <button
                    onClick={() => claimMissionReward(mission.id)}
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-xs active:scale-95 transition-all flex items-center gap-1.5"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Claim Reward</span>
                  </button>
                ) : (
                  <button
                    onClick={() => setActiveLessonPackId('physics-quest')}
                    className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1"
                  >
                    <span>Go to Mission</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
