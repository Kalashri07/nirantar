import React from 'react';
import {
  Wifi,
  WifiOff,
  Zap,
  Globe,
  RefreshCw,
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
    setCurrentNav,
    setIsDataImpactOpen,
  } = useApp();

  return (
    <header className="w-full bg-transparent py-4 px-4 sm:px-8 flex items-center justify-between gap-4">
      {/* Left info / Mobile title */}
      <div className="flex items-center gap-2">
        <span className="text-xs text-slate-400 font-bold hidden sm:inline">
          {userProfile.gradeOrStream} • Kopargaon, Maharashtra
        </span>
      </div>

      {/* Right Controls: Language, Connectivity, Profile */}
      <div className="flex items-center gap-2.5 sm:gap-3.5">
        {/* Language Selector */}
        <div className="flex items-center bg-white border border-slate-200 rounded-2xl p-1 shadow-2xs">
          <Globe className="w-3.5 h-3.5 text-slate-400 ml-1.5 mr-1 hidden sm:inline" />
          <button
            onClick={() => setLanguage('en')}
            className={`px-2.5 py-1 text-xs font-bold rounded-xl transition-all ${
              language === 'en'
                ? 'bg-emerald-50 text-emerald-800 shadow-2xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            EN
          </button>
          <button
            onClick={() => setLanguage('mr')}
            className={`px-2.5 py-1 text-xs font-bold rounded-xl transition-all ${
              language === 'mr'
                ? 'bg-emerald-50 text-emerald-800 shadow-2xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            मराठी
          </button>
          <button
            onClick={() => setLanguage('hi')}
            className={`px-2.5 py-1 text-xs font-bold rounded-xl transition-all ${
              language === 'hi'
                ? 'bg-emerald-50 text-emerald-800 shadow-2xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            हिंदी
          </button>
        </div>

        {/* Connectivity Mode Pill with Dropdown */}
        <div className="relative group">
          <div
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border cursor-pointer transition-all shadow-2xs ${
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
                <span>🟢 Online</span>
              </>
            )}
            {connectivityMode === 'low_data' && (
              <>
                <Zap className="w-3.5 h-3.5 text-amber-600" />
                <span>🟡 Low Data</span>
              </>
            )}
            {connectivityMode === 'offline' && (
              <>
                <WifiOff className="w-3.5 h-3.5 text-rose-600" />
                <span>🔴 Offline</span>
              </>
            )}
          </div>

          {/* Mode Dropdown */}
          <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-2xl shadow-xl p-2 hidden group-hover:block z-50 animate-in fade-in duration-100">
            <p className="text-[10px] uppercase font-bold text-slate-400 px-2 py-1 tracking-wider">
              {t.connectivity.switchMode}
            </p>
            <button
              onClick={() => setConnectivityMode('online')}
              className={`w-full flex items-center gap-2 px-2.5 py-1.5 text-xs rounded-xl transition-colors text-left ${
                connectivityMode === 'online' ? 'bg-emerald-50 text-emerald-800 font-bold' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <Wifi className="w-3.5 h-3.5 text-emerald-600" />
              <span>🟢 Online</span>
            </button>
            <button
              onClick={() => setConnectivityMode('low_data')}
              className={`w-full flex items-center gap-2 px-2.5 py-1.5 text-xs rounded-xl transition-colors text-left ${
                connectivityMode === 'low_data' ? 'bg-amber-50 text-amber-800 font-bold' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <Zap className="w-3.5 h-3.5 text-amber-600" />
              <span>🟡 Low Data Mode</span>
            </button>
            <button
              onClick={() => setConnectivityMode('offline')}
              className={`w-full flex items-center gap-2 px-2.5 py-1.5 text-xs rounded-xl transition-colors text-left ${
                connectivityMode === 'offline' ? 'bg-rose-50 text-rose-800 font-bold' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <WifiOff className="w-3.5 h-3.5 text-rose-600" />
              <span>🔴 Offline Mode</span>
            </button>
          </div>
        </div>

        {/* Pending Sync alert badge */}
        {pendingSyncQueue.length > 0 && (
          <button
            onClick={() => setConnectivityMode('online')}
            className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-xs font-bold animate-pulse"
            title={`${pendingSyncQueue.length} ${t.connectivity.pendingSyncCount}`}
          >
            <RefreshCw className={`w-3 h-3 ${isSyncing ? 'animate-spin' : ''}`} />
            <span className="text-[11px]">{pendingSyncQueue.length} Saved Offline</span>
          </button>
        )}

        {/* Profile Avatar */}
        <button
          onClick={() => setCurrentNav('profile')}
          className="w-9 h-9 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-xs font-black text-emerald-800 shadow-2xs hover:scale-105 transition-transform"
          title="My Profile"
        >
          {userProfile.name.charAt(0)}
        </button>
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
    isSyncing,
    syncSuccessMessage,
  } = useApp();

  if (!isSyncing && !syncSuccessMessage && connectivityMode === 'online') {
    return null;
  }

  return (
    <div className="px-4 sm:px-8 mb-4">
      {/* Cloud Sync Progress Alert */}
      {isSyncing && (
        <div className="bg-emerald-600 text-white px-4 py-2 rounded-2xl text-center text-xs font-bold flex items-center justify-center gap-2 shadow-xs animate-pulse">
          <RefreshCw className="w-4 h-4 animate-spin" />
          <span>{t.connectivity.syncingTitle}</span>
        </div>
      )}

      {/* Sync Success Message */}
      {syncSuccessMessage && !isSyncing && (
        <div className="bg-emerald-100 border border-emerald-200 text-emerald-900 px-4 py-2 rounded-2xl text-center text-xs font-bold flex items-center justify-center gap-2">
          <span>🎉 {syncSuccessMessage}</span>
        </div>
      )}

      {/* Offline Mode Reassuring Banner */}
      {connectivityMode === 'offline' && (
        <div className="bg-rose-50 border border-rose-200 p-3.5 rounded-2xl text-xs text-rose-900 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <WifiOff className="w-4 h-4 text-rose-600 flex-shrink-0" />
            <span>
              <strong>You're offline, but your downloaded lessons are ready to use.</strong>
              {pendingSyncQueue.length > 0 && (
                <span className="ml-1 font-bold text-amber-800">
                  ({pendingSyncQueue.length} lessons waiting to sync)
                </span>
              )}
            </span>
          </div>
          <button
            onClick={() => setConnectivityMode('online')}
            className="px-3 py-1 bg-white hover:bg-rose-100 rounded-xl text-rose-800 font-bold text-[11px] border border-rose-200 shadow-2xs"
          >
            Go Online 🟢
          </button>
        </div>
      )}

      {/* Low Data Mode Banner */}
      {connectivityMode === 'low_data' && (
        <div className="bg-amber-50 border border-amber-200 p-3 rounded-2xl text-xs text-amber-900 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-600 flex-shrink-0" />
            <span>
              <strong>Low Data Mode:</strong> Optimized to use minimal mobile bandwidth.
            </span>
          </div>
          <button
            onClick={() => setConnectivityMode('online')}
            className="px-2.5 py-1 bg-white hover:bg-amber-100 rounded-xl text-amber-800 font-bold text-[11px] border border-amber-200"
          >
            Full Mode
          </button>
        </div>
      )}
    </div>
  );
};
