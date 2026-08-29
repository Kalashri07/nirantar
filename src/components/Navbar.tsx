import React from 'react';
import {
  Wifi,
  WifiOff,
  Zap,
  Globe,
  Flame,
  Award,
  Layers,
  Download,
  Target,
  Sparkles,
  RefreshCw,
  BookOpen,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Navbar: React.FC = () => {
  const {
    language,
    setLanguage,
    t,
    connectivityMode,
    setConnectivityMode,
    userProfile,
    pendingSyncQueue,
    isSyncing,
    currentNav,
    setCurrentNav,
    setIsDataImpactOpen,
  } = useApp();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/90 bg-white/95 backdrop-blur-md shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div
            className="flex items-center gap-3 cursor-pointer select-none"
            onClick={() => setCurrentNav('dashboard')}
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 p-0.5 flex items-center justify-center shadow-sm">
              <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-emerald-600" />
              </div>
            </div>
            <div>
              <span className="text-lg font-black tracking-tight text-slate-900 flex items-center gap-2">
                Learn<span className="text-emerald-600">Kopargaon</span>
                <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700">
                  Offline Learning
                </span>
              </span>
              <p className="text-[11px] text-slate-500 hidden sm:block">
                {t.tagline}
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1.5 bg-slate-100/80 p-1 rounded-2xl border border-slate-200/80">
            <button
              onClick={() => setCurrentNav('dashboard')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                currentNav === 'dashboard'
                  ? 'bg-white text-emerald-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {t.nav.dashboard}
            </button>
            <button
              onClick={() => setCurrentNav('explore')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                currentNav === 'explore'
                  ? 'bg-white text-emerald-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              {t.nav.explore}
            </button>
            <button
              onClick={() => setCurrentNav('downloads')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                currentNav === 'downloads'
                  ? 'bg-white text-emerald-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Download className="w-3.5 h-3.5" />
              {t.nav.downloads}
            </button>
            <button
              onClick={() => setCurrentNav('missions')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                currentNav === 'missions'
                  ? 'bg-white text-emerald-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Target className="w-3.5 h-3.5" />
              {t.nav.missions}
            </button>
            <button
              onClick={() => setCurrentNav('achievements')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                currentNav === 'achievements'
                  ? 'bg-white text-emerald-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              {t.nav.achievements}
            </button>
          </nav>

          {/* Right Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Language Switcher */}
            <div className="flex items-center bg-slate-100 border border-slate-200 rounded-xl p-0.5">
              <Globe className="w-3.5 h-3.5 text-slate-400 ml-1.5 mr-1 hidden sm:inline" />
              <button
                onClick={() => setLanguage('en')}
                className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all ${
                  language === 'en'
                    ? 'bg-white text-emerald-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('mr')}
                className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all ${
                  language === 'mr'
                    ? 'bg-white text-emerald-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                मराठी
              </button>
              <button
                onClick={() => setLanguage('hi')}
                className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all ${
                  language === 'hi'
                    ? 'bg-white text-emerald-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                हिंदी
              </button>
            </div>

            {/* Connectivity Switcher */}
            <div className="relative group">
              <div
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border cursor-pointer transition-all shadow-xs ${
                  connectivityMode === 'online'
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                    : connectivityMode === 'low_data'
                    ? 'bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100'
                    : 'bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100'
                }`}
              >
                {connectivityMode === 'online' && (
                  <>
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span className="text-[11px] tracking-wide">🟢 Online</span>
                  </>
                )}
                {connectivityMode === 'low_data' && (
                  <>
                    <Zap className="w-3.5 h-3.5 text-amber-600" />
                    <span className="text-[11px] tracking-wide">🟡 Low Data</span>
                  </>
                )}
                {connectivityMode === 'offline' && (
                  <>
                    <WifiOff className="w-3.5 h-3.5 text-rose-600" />
                    <span className="text-[11px] tracking-wide">🔴 Offline</span>
                  </>
                )}
              </div>

              {/* Mode Selection Dropdown */}
              <div className="absolute right-0 mt-2 w-52 bg-white border border-slate-200 rounded-2xl shadow-xl p-2 hidden group-hover:block z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                <p className="text-[10px] uppercase font-bold text-slate-400 px-2.5 py-1 tracking-wider">
                  {t.connectivity.switchMode}
                </p>
                <button
                  onClick={() => setConnectivityMode('online')}
                  className={`w-full flex items-center gap-2 px-3 py-2 text-xs rounded-xl transition-colors text-left ${
                    connectivityMode === 'online'
                      ? 'bg-emerald-50 text-emerald-800 font-bold'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <Wifi className="w-3.5 h-3.5 text-emerald-600" />
                  <span>🟢 Online Mode</span>
                </button>
                <button
                  onClick={() => setConnectivityMode('low_data')}
                  className={`w-full flex items-center gap-2 px-3 py-2 text-xs rounded-xl transition-colors text-left ${
                    connectivityMode === 'low_data'
                      ? 'bg-amber-50 text-amber-800 font-bold'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <Zap className="w-3.5 h-3.5 text-amber-600" />
                  <span>🟡 Low Data Mode</span>
                </button>
                <button
                  onClick={() => setConnectivityMode('offline')}
                  className={`w-full flex items-center gap-2 px-3 py-2 text-xs rounded-xl transition-colors text-left ${
                    connectivityMode === 'offline'
                      ? 'bg-rose-50 text-rose-800 font-bold'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <WifiOff className="w-3.5 h-3.5 text-rose-600" />
                  <span>🔴 Offline Mode</span>
                </button>

                <div className="border-t border-slate-100 mt-1.5 pt-1.5">
                  <button
                    onClick={() => setIsDataImpactOpen(true)}
                    className="w-full text-left px-2.5 py-1 text-[11px] text-teal-700 hover:text-teal-800 font-semibold flex items-center gap-1"
                  >
                    <Zap className="w-3 h-3" />
                    <span>View Data Saved</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Streak & XP Pill */}
            <div className="hidden sm:flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-full px-3 py-1">
              <div className="flex items-center gap-1 text-xs font-bold text-amber-700">
                <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                <span>{userProfile.streakDays}d</span>
              </div>
              <span className="w-px h-3 bg-slate-200"></span>
              <div className="flex items-center gap-1 text-xs font-bold text-emerald-700">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                <span>{userProfile.currentXp} XP</span>
              </div>
            </div>

            {/* Pending Sync Badge */}
            {pendingSyncQueue.length > 0 && (
              <button
                onClick={() => setConnectivityMode('online')}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-xs font-bold animate-pulse"
                title={`${pendingSyncQueue.length} ${t.connectivity.pendingSyncCount}`}
              >
                <RefreshCw className={`w-3 h-3 ${isSyncing ? 'animate-spin' : ''}`} />
                <span className="text-[11px]">{pendingSyncQueue.length} Saved</span>
              </button>
            )}

            {/* Profile Avatar */}
            <button
              onClick={() => setCurrentNav('profile')}
              className="w-9 h-9 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-600 p-0.5 shadow-xs flex items-center justify-center hover:scale-105 transition-transform"
              title="Profile"
            >
              <div className="w-full h-full bg-white rounded-full flex items-center justify-center text-xs font-black text-emerald-700">
                {userProfile.name.charAt(0)}
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation bar */}
        <div className="flex md:hidden items-center justify-around py-2 border-t border-slate-100 text-xs font-semibold">
          <button
            onClick={() => setCurrentNav('dashboard')}
            className={`px-2 py-1 rounded-lg ${currentNav === 'dashboard' ? 'text-emerald-700 font-black' : 'text-slate-500'}`}
          >
            {t.nav.dashboard}
          </button>
          <button
            onClick={() => setCurrentNav('explore')}
            className={`px-2 py-1 rounded-lg ${currentNav === 'explore' ? 'text-emerald-700 font-black' : 'text-slate-500'}`}
          >
            {t.nav.explore}
          </button>
          <button
            onClick={() => setCurrentNav('downloads')}
            className={`px-2 py-1 rounded-lg ${currentNav === 'downloads' ? 'text-emerald-700 font-black' : 'text-slate-500'}`}
          >
            {t.nav.downloads}
          </button>
          <button
            onClick={() => setCurrentNav('missions')}
            className={`px-2 py-1 rounded-lg ${currentNav === 'missions' ? 'text-emerald-700 font-black' : 'text-slate-500'}`}
          >
            {t.nav.missions}
          </button>
          <button
            onClick={() => setCurrentNav('achievements')}
            className={`px-2 py-1 rounded-lg ${currentNav === 'achievements' ? 'text-emerald-700 font-black' : 'text-slate-500'}`}
          >
            {t.nav.achievements}
          </button>
        </div>
      </div>
    </header>
  );
};

export const ConnectivityBanner: React.FC = () => {
  const {
    connectivityMode,
    setConnectivityMode,
    pendingSyncQueue,
    t,
    setCurrentNav,
    setIsDataImpactOpen,
    isSyncing,
    syncSuccessMessage,
  } = useApp();

  return (
    <div>
      {/* Cloud Synchronizing Banner */}
      {isSyncing && (
        <div className="bg-emerald-600 text-white px-4 py-2 text-center text-xs font-bold flex items-center justify-center gap-2 shadow-xs">
          <RefreshCw className="w-4 h-4 animate-spin" />
          <span>{t.connectivity.syncingTitle} ({t.connectivity.syncingSubtitle})</span>
        </div>
      )}

      {/* Sync Success Message */}
      {syncSuccessMessage && !isSyncing && (
        <div className="bg-emerald-100 border-b border-emerald-200 text-emerald-900 px-4 py-2 text-center text-xs font-bold flex items-center justify-center gap-2">
          <span>🎉 {syncSuccessMessage}</span>
        </div>
      )}

      {/* Offline Mode Alert */}
      {connectivityMode === 'offline' && (
        <div className="bg-rose-50 border-b border-rose-200 px-4 py-2 text-xs text-rose-900 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <WifiOff className="w-4 h-4 text-rose-600 flex-shrink-0" />
            <span>
              <strong>🔴 Offline Mode:</strong> Don't worry! Your downloaded lessons and progress are safely available on this device.
              {pendingSyncQueue.length > 0 && (
                <span className="ml-2 font-bold text-amber-800">
                  ({pendingSyncQueue.length} {t.connectivity.pendingSyncCount})
                </span>
              )}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentNav('downloads')}
              className="px-2.5 py-1 bg-white hover:bg-rose-100 rounded-lg text-rose-800 font-bold text-[11px] border border-rose-200 shadow-2xs"
            >
              {t.connectivity.manageDownloads}
            </button>
            <button
              onClick={() => setConnectivityMode('online')}
              className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 rounded-lg text-white font-bold text-[11px] shadow-xs"
            >
              Go Online 🟢
            </button>
          </div>
        </div>
      )}

      {/* Low Data Mode Alert */}
      {connectivityMode === 'low_data' && (
        <div className="bg-amber-50 border-b border-amber-200 px-4 py-2 text-xs text-amber-900 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-600 flex-shrink-0" />
            <span>
              <strong>🟡 Low Data Mode:</strong> {t.connectivity.lowDataDesc}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsDataImpactOpen(true)}
              className="px-2.5 py-1 bg-white hover:bg-amber-100 rounded-lg text-amber-800 font-bold text-[11px] border border-amber-200 shadow-2xs"
            >
              View Data Saved 📉
            </button>
            <button
              onClick={() => setConnectivityMode('online')}
              className="px-2.5 py-1 bg-slate-200 hover:bg-slate-300 rounded-lg text-slate-800 font-semibold text-[11px]"
            >
              Full Mode
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
