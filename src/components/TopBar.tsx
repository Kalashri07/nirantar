import React, { useState } from 'react';
import {
  Search,
  Globe,
  Wifi,
  WifiOff,
  Zap,
  RefreshCw,
  User,
  CheckCircle2,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const TopBar: React.FC<{ onSearch?: (query: string) => void }> = () => {
  const {
    language,
    setLanguage,
    connectivityMode,
    setConnectivityMode,
    userProfile,
    pendingSyncQueue,
    isSyncing,
    syncSuccessMessage,
    setCurrentNav,
    t,
  } = useApp();

  const [modeDropdownOpen, setModeDropdownOpen] = useState(false);

  return (
    <>
      {/* Top Banner (when offline or syncing) */}
      {connectivityMode === 'offline' && (
        <div className="bg-rose-50 border-b border-rose-200 px-4 py-2 text-xs text-rose-900 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <WifiOff className="w-3.5 h-3.5 text-rose-600 flex-shrink-0" />
            <span>
              <strong>{t.connectivity.offlineBanner}</strong>
              {pendingSyncQueue.length > 0 && (
                <span className="ml-1 text-slate-600">
                  ({pendingSyncQueue.length} {t.connectivity.pendingSyncText})
                </span>
              )}
            </span>
          </div>
          <button
            onClick={() => setConnectivityMode('online')}
            className="text-[11px] font-semibold text-rose-700 hover:underline bg-white px-2 py-0.5 rounded border border-rose-200"
          >
            Connect Online
          </button>
        </div>
      )}

      {isSyncing && (
        <div className="bg-emerald-600 text-white px-4 py-1.5 text-xs font-medium flex items-center justify-center gap-2">
          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
          <span>{t.connectivity.syncingBanner}</span>
        </div>
      )}

      {syncSuccessMessage && !isSyncing && (
        <div className="bg-emerald-50 border-b border-emerald-200 px-4 py-1.5 text-xs text-emerald-900 font-medium flex items-center justify-center gap-2">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          <span>{t.connectivity.syncedBanner}</span>
        </div>
      )}

      {/* Main Top Header */}
      <header className="bg-white border-b border-slate-200 px-4 sm:px-8 py-3 flex items-center justify-between gap-4 sticky top-0 z-20">
        {/* Search Learning Content */}
        <div className="relative w-full max-w-xs sm:max-w-sm">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search courses, lessons, topics..."
            className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-emerald-500 transition-colors"
          />
        </div>

        {/* Right Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Language Selector */}
          <div className="flex items-center bg-slate-50 border border-slate-200 rounded-lg p-0.5">
            <button
              onClick={() => setLanguage('en')}
              className={`px-2 py-1 text-xs font-medium rounded-md transition-colors ${
                language === 'en'
                  ? 'bg-white text-slate-900 shadow-2xs font-bold'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLanguage('mr')}
              className={`px-2 py-1 text-xs font-medium rounded-md transition-colors ${
                language === 'mr'
                  ? 'bg-white text-slate-900 shadow-2xs font-bold'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              मराठी
            </button>
            <button
              onClick={() => setLanguage('hi')}
              className={`px-2 py-1 text-xs font-medium rounded-md transition-colors ${
                language === 'hi'
                  ? 'bg-white text-slate-900 shadow-2xs font-bold'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              हिंदी
            </button>
          </div>

          {/* Connectivity Mode Switcher */}
          <div className="relative">
            <button
              onClick={() => setModeDropdownOpen((prev) => !prev)}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-medium transition-colors ${
                connectivityMode === 'online'
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
                  : connectivityMode === 'low_data'
                  ? 'bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100'
                  : 'bg-rose-50 text-rose-800 border-rose-200 hover:bg-rose-100'
              }`}
            >
              {connectivityMode === 'online' && <Wifi className="w-3.5 h-3.5 text-emerald-600" />}
              {connectivityMode === 'low_data' && <Zap className="w-3.5 h-3.5 text-amber-600" />}
              {connectivityMode === 'offline' && <WifiOff className="w-3.5 h-3.5 text-rose-600" />}
              <span className="hidden sm:inline capitalize">
                {connectivityMode === 'online' && t.connectivity.online}
                {connectivityMode === 'low_data' && t.connectivity.lowData}
                {connectivityMode === 'offline' && t.connectivity.offline}
              </span>
            </button>

            {modeDropdownOpen && (
              <div className="absolute right-0 mt-1.5 w-44 bg-white border border-slate-200 rounded-xl shadow-lg p-1.5 z-50 text-xs">
                <button
                  onClick={() => {
                    setConnectivityMode('online');
                    setModeDropdownOpen(false);
                  }}
                  className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg hover:bg-slate-50 text-slate-700 text-left"
                >
                  <Wifi className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Online (Cloud Sync)</span>
                </button>
                <button
                  onClick={() => {
                    setConnectivityMode('low_data');
                    setModeDropdownOpen(false);
                  }}
                  className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg hover:bg-slate-50 text-slate-700 text-left"
                >
                  <Zap className="w-3.5 h-3.5 text-amber-600" />
                  <span>Low Data Mode</span>
                </button>
                <button
                  onClick={() => {
                    setConnectivityMode('offline');
                    setModeDropdownOpen(false);
                  }}
                  className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg hover:bg-slate-50 text-slate-700 text-left"
                >
                  <WifiOff className="w-3.5 h-3.5 text-rose-600" />
                  <span>Simulate Offline</span>
                </button>
              </div>
            )}
          </div>

          {/* User Profile Avatar */}
          <button
            onClick={() => setCurrentNav('profile')}
            className="flex items-center gap-2 pl-1 sm:pl-2 text-slate-700 hover:text-slate-900"
          >
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center border border-emerald-200">
              {userProfile.name.charAt(0)}
            </div>
            <div className="hidden lg:block text-left text-xs">
              <span className="font-semibold block text-slate-800 leading-tight">
                {userProfile.name}
              </span>
              <span className="text-[10px] text-slate-400 block leading-tight">
                {userProfile.gradeOrStream}
              </span>
            </div>
          </button>
        </div>
      </header>
    </>
  );
};
