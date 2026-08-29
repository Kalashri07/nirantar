import React from 'react';
import {
  LayoutDashboard,
  Compass,
  Download,
  Target,
  Award,
  BookOpen,
  Zap,
  Flame,
  User,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Sidebar: React.FC = () => {
  const {
    currentNav,
    setCurrentNav,
    t,
    userProfile,
    connectivityMode,
    setIsDataImpactOpen,
  } = useApp();

  const navItems = [
    {
      id: 'dashboard',
      label: t.nav.dashboard,
      icon: LayoutDashboard,
      emoji: '🏠',
    },
    {
      id: 'explore',
      label: t.nav.explore,
      icon: Compass,
      emoji: '🌍',
    },
    {
      id: 'downloads',
      label: t.nav.downloads,
      icon: Download,
      emoji: '📚',
    },
    {
      id: 'missions',
      label: t.nav.missions,
      icon: Target,
      emoji: '🎯',
    },
    {
      id: 'achievements',
      label: t.nav.achievements,
      icon: Award,
      emoji: '🏆',
    },
  ];

  return (
    <>
      {/* Desktop & Tablet Vertical Left Sidebar */}
      <aside className="hidden md:flex flex-col w-64 lg:w-72 bg-white border-r border-slate-200/90 min-h-screen sticky top-0 z-30 p-6 justify-between select-none">
        <div className="space-y-8">
          {/* Brand Logo & Name */}
          <div
            onClick={() => setCurrentNav('dashboard')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <span className="text-lg font-black tracking-tight text-slate-900 flex items-center gap-1.5">
                Learn<span className="text-emerald-600">Kopargaon</span>
              </span>
              <p className="text-[11px] text-slate-400 font-medium leading-tight">
                Simple Offline Learning
              </p>
            </div>
          </div>

          {/* Vertical Navigation Links */}
          <nav className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentNav === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentNav(item.id)}
                  className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-2xl text-sm font-bold transition-all text-left ${
                    isActive
                      ? 'bg-emerald-50 text-emerald-800 shadow-2xs font-black'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <span className="text-base">{item.emoji}</span>
                  <span className="tracking-wide">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Sidebar Widget: Streak & Data Saver shortcut */}
        <div className="space-y-3 pt-6 border-t border-slate-100">
          <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-100 text-xs">
            <div className="flex items-center gap-2">
              <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span className="font-bold text-slate-700">{userProfile.streakDays} Day Streak</span>
            </div>
            <span className="font-mono font-bold text-emerald-700">{userProfile.currentXp} XP</span>
          </div>

          <button
            onClick={() => setIsDataImpactOpen(true)}
            className="w-full py-2 px-3 text-[11px] text-slate-500 hover:text-emerald-700 hover:bg-emerald-50 rounded-xl transition-colors font-semibold flex items-center justify-center gap-1.5"
          >
            <Zap className="w-3.5 h-3.5 text-amber-500" />
            <span>Data Saver Info</span>
          </button>
        </div>
      </aside>

      {/* Mobile Bottom Navigation Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 py-2 px-3 flex items-center justify-around shadow-lg">
        {navItems.map((item) => {
          const isActive = currentNav === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentNav(item.id)}
              className={`flex flex-col items-center gap-1 py-1 px-2.5 rounded-xl text-[10px] font-bold transition-all ${
                isActive
                  ? 'text-emerald-700 scale-105'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <span className="text-base leading-none">{item.emoji}</span>
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </>
  );
};
