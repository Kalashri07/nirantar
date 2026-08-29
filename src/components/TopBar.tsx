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
        <div className="bg-[#F9E2E2] border-b border-[#EBB6B6] px-4 py-2 text-xs text-[#782323] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <WifiOff className="w-3.5 h-3.5 text-[#9B3333] flex-shrink-0" />
            <span>
              <strong>{t.connectivity.offlineBanner}</strong>
              {pendingSyncQueue.length > 0 && (
                <span className="ml-1 text-[#675E54]">
                  ({pendingSyncQueue.length} {t.connectivity.pendingSyncText})
                </span>
              )}
            </span>
          </div>
          <button
            onClick={() => setConnectivityMode('online')}
            className="text-[11px] font-semibold text-[#782323] hover:underline bg-[#FAF6EF] px-2 py-0.5 rounded border border-[#EBB6B6]"
          >
            Connect Online
          </button>
        </div>
      )}

      {isSyncing && (
        <div className="bg-[#102A43] text-[#F3EBDD] px-4 py-1.5 text-xs font-medium flex items-center justify-center gap-2">
          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
          <span>{t.connectivity.syncingBanner}</span>
        </div>
      )}

      {syncSuccessMessage && !isSyncing && (
        <div className="bg-[#DCEFE5] border-b border-[#B6DEC9] px-4 py-1.5 text-xs text-[#1E573E] font-medium flex items-center justify-center gap-2">
          <CheckCircle2 className="w-3.5 h-3.5 text-[#2D7A58]" />
          <span>{t.connectivity.syncedBanner}</span>
        </div>
      )}

      {/* Main Top Header (Warm Light Beige surface) */}
      <header className="bg-[#E9DDCB] border-b border-[#D8CABA] px-4 sm:px-8 py-3 flex items-center justify-between gap-4 sticky top-0 z-20 shadow-2xs">
        {/* Search Learning Content */}
        <div className="relative w-full max-w-xs sm:max-w-sm">
          <Search className="w-4 h-4 text-[#8C8275] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search courses, lessons, topics..."
            className="w-full bg-[#F3EBDD] border border-[#D8CABA] rounded-lg pl-9 pr-3 py-1.5 text-xs text-[#102A43] placeholder-[#8C8275] focus:outline-none focus:bg-[#FAF6EF] focus:border-[#102A43] transition-colors"
          />
        </div>

        {/* Right Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Language Selector */}
          <div className="flex items-center bg-[#F3EBDD] border border-[#D8CABA] rounded-lg p-0.5">
            <button
              onClick={() => setLanguage('en')}
              className={`px-2 py-1 text-xs font-medium rounded-md transition-colors ${
                language === 'en'
                  ? 'bg-[#C9B69C] text-[#102A43] font-bold shadow-2xs'
                  : 'text-[#675E54] hover:text-[#102A43]'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLanguage('mr')}
              className={`px-2 py-1 text-xs font-medium rounded-md transition-colors ${
                language === 'mr'
                  ? 'bg-[#C9B69C] text-[#102A43] font-bold shadow-2xs'
                  : 'text-[#675E54] hover:text-[#102A43]'
              }`}
            >
              मराठी
            </button>
            <button
              onClick={() => setLanguage('hi')}
              className={`px-2 py-1 text-xs font-medium rounded-md transition-colors ${
                language === 'hi'
                  ? 'bg-[#C9B69C] text-[#102A43] font-bold shadow-2xs'
                  : 'text-[#675E54] hover:text-[#102A43]'
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
                  ? 'bg-[#DCEFE5] text-[#1E573E] border-[#B6DEC9] hover:bg-[#CFE8DB]'
                  : connectivityMode === 'low_data'
                  ? 'bg-[#F7EED8] text-[#7C5113] border-[#E8D2A2] hover:bg-[#F2E5C7]'
                  : 'bg-[#F9E2E2] text-[#782323] border-[#EBB6B6] hover:bg-[#F4D2D2]'
              }`}
            >
              {connectivityMode === 'online' && <Wifi className="w-3.5 h-3.5 text-[#2D7A58]" />}
              {connectivityMode === 'low_data' && <Zap className="w-3.5 h-3.5 text-[#9E6B20]" />}
              {connectivityMode === 'offline' && <WifiOff className="w-3.5 h-3.5 text-[#9B3333]" />}
              <span className="hidden sm:inline capitalize">
                {connectivityMode === 'online' && t.connectivity.online}
                {connectivityMode === 'low_data' && t.connectivity.lowData}
                {connectivityMode === 'offline' && t.connectivity.offline}
              </span>
            </button>

            {modeDropdownOpen && (
              <div className="absolute right-0 mt-1.5 w-44 bg-[#FAF6EF] border border-[#D8CABA] rounded-xl shadow-lg p-1.5 z-50 text-xs">
                <button
                  onClick={() => {
                    setConnectivityMode('online');
                    setModeDropdownOpen(false);
                  }}
                  className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg hover:bg-[#E9DDCB] text-[#102A43] text-left"
                >
                  <Wifi className="w-3.5 h-3.5 text-[#2D7A58]" />
                  <span>Online (Cloud Sync)</span>
                </button>
                <button
                  onClick={() => {
                    setConnectivityMode('low_data');
                    setModeDropdownOpen(false);
                  }}
                  className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg hover:bg-[#E9DDCB] text-[#102A43] text-left"
                >
                  <Zap className="w-3.5 h-3.5 text-[#9E6B20]" />
                  <span>Low Data Mode</span>
                </button>
                <button
                  onClick={() => {
                    setConnectivityMode('offline');
                    setModeDropdownOpen(false);
                  }}
                  className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg hover:bg-[#E9DDCB] text-[#102A43] text-left"
                >
                  <WifiOff className="w-3.5 h-3.5 text-[#9B3333]" />
                  <span>Simulate Offline</span>
                </button>
              </div>
            )}
          </div>

          {/* User Profile Avatar */}
          <button
            onClick={() => setCurrentNav('profile')}
            className="flex items-center gap-2 pl-1 sm:pl-2 text-[#102A43] hover:text-[#0C1F33]"
          >
            <div className="w-8 h-8 rounded-lg bg-[#C9B69C] text-[#102A43] font-bold text-xs flex items-center justify-center border border-[#BFA98C] shadow-2xs">
              {userProfile.name.charAt(0)}
            </div>
            <div className="hidden lg:block text-left text-xs">
              <span className="font-semibold block text-[#102A43] leading-tight">
                {userProfile.name}
              </span>
              <span className="text-[10px] text-[#675E54] block leading-tight">
                {userProfile.gradeOrStream}
              </span>
            </div>
          </button>
        </div>
      </header>
    </>
  );
};
