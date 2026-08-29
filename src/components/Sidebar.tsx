import React from 'react';
import {
  Home,
  BookOpen,
  FolderDown,
  Target,
  Award,
  User,
  Zap,
  WifiOff,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Sidebar: React.FC = () => {
  const { currentNav, setCurrentNav, t, connectivityMode, setConnectivityMode } = useApp();

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
      id: 'profile',
      label: t.nav.profile,
      icon: User,
    },
  ];

  return (
    <>
      {/* Desktop & Tablet Sidebar */}
      <aside className="hidden md:flex flex-col w-64 lg:w-68 bg-white border-r border-slate-200/90 min-h-screen sticky top-0 z-30 p-5 justify-between select-none">
        <div className="space-y-6">
          {/* Brand Logo & Name */}
          <button
            onClick={() => setCurrentNav('home')}
            className="flex items-center gap-3 px-2 text-left group w-full"
          >
            <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-2xs group-hover:bg-indigo-700 transition-colors">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <span className="text-lg font-bold tracking-tight text-slate-900 block leading-tight">
                Nirantar
              </span>
              <span className="text-[11px] text-slate-400 font-medium block">
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
                      ? 'bg-indigo-50/90 text-indigo-700 font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 ${
                      isActive ? 'text-indigo-600' : 'text-slate-400'
                    }`}
                  />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Sidebar Status */}
        <div className="pt-4 border-t border-slate-100">
          <button
            onClick={() => {
              const nextMode =
                connectivityMode === 'online'
                  ? 'low_data'
                  : connectivityMode === 'low_data'
                  ? 'offline'
                  : 'online';
              setConnectivityMode(nextMode);
            }}
            className="w-full p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200/80 flex items-center justify-between text-left transition-colors"
            title="Click to toggle network simulation mode"
          >
            <div className="flex items-center gap-2">
              {connectivityMode === 'online' && (
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 ring-4 ring-emerald-100" />
              )}
              {connectivityMode === 'low_data' && (
                <Zap className="w-3.5 h-3.5 text-amber-600" />
              )}
              {connectivityMode === 'offline' && (
                <WifiOff className="w-3.5 h-3.5 text-rose-600" />
              )}
              <span className="text-xs font-medium text-slate-700">
                {connectivityMode === 'online' && t.connectivity.connected}
                {connectivityMode === 'low_data' && t.connectivity.lowData}
                {connectivityMode === 'offline' && t.connectivity.offlineAvailable}
              </span>
            </div>
          </button>
        </div>
      </aside>

      {/* Mobile Bottom Navigation Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 py-1.5 px-3 flex items-center justify-around shadow-lg">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentNav === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentNav(item.id)}
              className={`flex flex-col items-center gap-1 py-1 px-2 rounded-lg text-[10px] font-medium transition-colors ${
                isActive ? 'text-indigo-600 font-bold' : 'text-slate-500'
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
