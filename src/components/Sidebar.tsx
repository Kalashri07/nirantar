import React from 'react';
import {
  Home,
  BookOpen,
  FolderDown,
  Target,
  Award,
  User,
  Trophy,
  Swords,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Sidebar: React.FC = () => {
  const { currentNav, setCurrentNav, t } = useApp();

  const navItems = [
    {
      id: 'home',
      label: t.nav.home,
      icon: Home,
    },
    {
      id: 'learn',
      label: t.nav.learn,
      icon: BookOpen,
    },
    {
      id: 'library',
      label: t.nav.library,
      icon: FolderDown,
    },
    {
      id: 'missions',
      label: t.nav.missions,
      icon: Target,
    },
    {
      id: 'achievements',
      label: t.nav.achievements,
      icon: Award,
    },
    {
      id: 'leaderboard',
      label: t.nav.leaderboard,
      icon: Trophy,
    },
    {
      id: 'challenges',
      label: t.nav.challenges,
      icon: Swords,
    },
    {
      id: 'profile',
      label: t.nav.profile,
      icon: User,
    },
  ];

  return (
    <>
      {/* Desktop & Tablet Sidebar (Deep Navy Blue structural theme) */}
      <aside className="hidden md:flex flex-col w-64 lg:w-68 bg-[#102A43] border-r border-[#0C1F33] min-h-screen sticky top-0 z-30 p-5 justify-between select-none shadow-lg">
        <div className="space-y-6">
          {/* Brand Logo & Name */}
          <button
            onClick={() => setCurrentNav('home')}
            className="flex items-center gap-3 px-2 text-left group w-full"
          >
            <div className="w-9 h-9 rounded-xl bg-[#C9B69C] text-[#102A43] flex items-center justify-center font-bold shadow-2xs group-hover:bg-[#BFA98C] transition-colors">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <span className="text-lg font-bold tracking-tight text-white block leading-tight">
                Nirantar
              </span>
              <span className="text-[11px] text-[#BAC7D5] font-medium block">
                Offline Learning Platform
              </span>
            </div>
          </button>

          {/* Navigation Links */}
          <nav className="space-y-1 pt-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentNav === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentNav(item.id)}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors text-left ${
                    isActive
                      ? 'bg-[#C9B69C] text-[#102A43] font-bold shadow-xs'
                      : 'text-[#BAC7D5] hover:text-white hover:bg-[#1A3B5C]'
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 ${
                      isActive ? 'text-[#102A43]' : 'text-[#8EA2B8]'
                    }`}
                  />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Sidebar Info */}
        <div className="pt-4 border-t border-[#1C3B5E] text-center">
          <p className="text-[11px] text-[#BAC7D5]">
            Continuous offline learning
          </p>
        </div>
      </aside>

      {/* Mobile Bottom Navigation Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#102A43]/95 backdrop-blur-md border-t border-[#0C1F33] py-1.5 px-3 flex items-center justify-around shadow-xl">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentNav === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentNav(item.id)}
              className={`flex flex-col items-center gap-1 py-1 px-2 rounded-lg text-[10px] font-medium transition-colors ${
                isActive ? 'text-[#C9B69C] font-bold' : 'text-[#8EA2B8]'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </>
  );
};
