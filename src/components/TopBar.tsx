import React from 'react';
import {
  RefreshCw,
  CheckCircle2,
  WifiOff,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const TopBar: React.FC = () => {
  const {
    language,
    setLanguage,
    connectivityMode,
    userProfile,
    pendingSyncQueue,
    isSyncing,
    syncSuccessMessage,
    setCurrentNav,
  } = useApp();

  const isOffline = connectivityMode === 'offline';

  return (
    <>
      {/* Background Sync & Offline Status Banner (Automatic notifications only, no manual mode selector) */}
      {isOffline && (
        <div className="bg-[#F9E2E2] border-b border-[#EBB6B6] px-4 py-2 text-xs text-[#782323] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <WifiOff className="w-3.5 h-3.5 text-[#9B3333] flex-shrink-0" />
            <span>
              <strong>You are offline.</strong> Downloaded lessons are fully accessible on this device.
              {pendingSyncQueue.length > 0 && (
                <span className="ml-1 text-[#675E54]">
                  ({pendingSyncQueue.length} offline activities will sync automatically when internet returns)
                </span>
              )}
            </span>
          </div>
        </div>
      )}

      {isSyncing && (
        <div className="bg-[#102A43] text-[#F3EBDD] px-4 py-1.5 text-xs font-medium flex items-center justify-center gap-2">
          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
          <span>Syncing offline learning progress to the cloud...</span>
        </div>
      )}

      {syncSuccessMessage && !isSyncing && (
        <div className="bg-[#DCEFE5] border-b border-[#B6DEC9] px-4 py-1.5 text-xs text-[#1E573E] font-medium flex items-center justify-center gap-2">
          <CheckCircle2 className="w-3.5 h-3.5 text-[#2D7A58]" />
          <span>Connected. Progress synchronized.</span>
        </div>
      )}

      {/* Main Top Header (Search bar removed, clean balanced layout) */}
      <header className="bg-[#E9DDCB] border-b border-[#D8CABA] px-4 sm:px-8 py-3 flex items-center justify-between gap-4 sticky top-0 z-20 shadow-2xs">
        {/* Left Side: Platform Title / Breadcrumb context */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-[#102A43] uppercase tracking-wider">
            Nirantar
          </span>
          <span className="text-[#D8CABA]">•</span>
          <span className="text-xs text-[#675E54] font-medium">
            {userProfile.gradeOrStream}
          </span>
        </div>

        {/* Right Action Controls: Language Selector & User Profile */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Language Selector */}
          <div className="flex items-center bg-[#F3EBDD] border border-[#D8CABA] rounded-lg p-0.5">
            <button
              onClick={() => setLanguage('en')}
              className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
                language === 'en'
                  ? 'bg-[#C9B69C] text-[#102A43] font-bold shadow-2xs'
                  : 'text-[#675E54] hover:text-[#102A43]'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLanguage('mr')}
              className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
                language === 'mr'
                  ? 'bg-[#C9B69C] text-[#102A43] font-bold shadow-2xs'
                  : 'text-[#675E54] hover:text-[#102A43]'
              }`}
            >
              मराठी
            </button>
            <button
              onClick={() => setLanguage('hi')}
              className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
                language === 'hi'
                  ? 'bg-[#C9B69C] text-[#102A43] font-bold shadow-2xs'
                  : 'text-[#675E54] hover:text-[#102A43]'
              }`}
            >
              हिंदी
            </button>
          </div>

          {/* User Profile Avatar & Identity */}
          <button
            onClick={() => setCurrentNav('profile')}
            className="flex items-center gap-2.5 pl-1 sm:pl-2 text-[#102A43] hover:text-[#0C1F33] transition-colors"
          >
            <div className="w-8 h-8 rounded-lg bg-[#C9B69C] text-[#102A43] font-bold text-xs flex items-center justify-center border border-[#BFA98C] shadow-2xs">
              {userProfile.name.charAt(0)}
            </div>
            <div className="hidden sm:block text-left text-xs">
              <span className="font-semibold block text-[#102A43] leading-tight">
                {userProfile.name}
              </span>
              <span className="text-[10px] text-[#675E54] block leading-tight">
                Level {userProfile.level} · {userProfile.currentXp} XP
              </span>
            </div>
          </button>
        </div>
      </header>
    </>
  );
};
