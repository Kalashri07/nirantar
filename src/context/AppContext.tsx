import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import type {
  Language,
  ConnectivityMode,
  UserProfile,
  LearningPack,
  PendingSyncItem,
  MissionItem,
  BadgeItem,
  DataUsageStats,
} from '../types';
import { translations, type Translations } from '../data/translations';
import { initialUserProfile, learningPacks as initialPacks, mockMissions, mockBadges } from '../data/mockData';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
  connectivityMode: ConnectivityMode;
  setConnectivityMode: (mode: ConnectivityMode) => void;
  userProfile: UserProfile;
  setUserProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
  updateUserProfile: (updates: Partial<UserProfile>) => void;
  learningPacks: LearningPack[];
  downloadPack: (packId: string) => Promise<void>;
  removeDownloadedPack: (packId: string) => void;
  pendingSyncQueue: PendingSyncItem[];
  isSyncing: boolean;
  syncSuccessMessage: string | null;
  missions: MissionItem[];
  claimMissionReward: (missionId: string) => void;
  badges: BadgeItem[];
  activePackModalId: string | null;
  setActivePackModalId: (id: string | null) => void;
  activeLessonPackId: string | null;
  setActiveLessonPackId: (id: string | null) => void;
  recordStepCompletion: (packId: string, stepId: string, xpEarned: number, stepTitle: string) => void;
  triggerCelebration: () => void;
  dataStats: DataUsageStats;
  isDataImpactOpen: boolean;
  setIsDataImpactOpen: (open: boolean) => void;
  isOnboardingOpen: boolean;
  setIsOnboardingOpen: (open: boolean) => void;
  demoStep: number;
  setDemoStep: (step: number) => void;
  isDemoBarVisible: boolean;
  setIsDemoBarVisible: (visible: boolean) => void;
  currentNav: string;
  setCurrentNav: (nav: string) => void;
  resetAllDemoState: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  PROFILE: 'learnkopargaon_user_profile_v1',
  PACKS: 'learnkopargaon_packs_v1',
  SYNC_QUEUE: 'learnkopargaon_pending_sync_v1',
  LANG: 'learnkopargaon_language_v1',
  CONN_MODE: 'learnkopargaon_conn_mode_v1',
  MISSIONS: 'learnkopargaon_missions_v1',
  BADGES: 'learnkopargaon_badges_v1',
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1. Language state
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.LANG);
    return (saved as Language) || 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem(STORAGE_KEYS.LANG, lang);
  };

  const t = translations[language];

  // 2. Connectivity Mode
  const [connectivityMode, setConnectivityModeState] = useState<ConnectivityMode>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.CONN_MODE);
    return (saved as ConnectivityMode) || 'online';
  });

  // 3. User Profile
  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.PROFILE);
    return saved ? JSON.parse(saved) : initialUserProfile;
  });

  // 4. Learning Packs
  const [learningPacks, setLearningPacks] = useState<LearningPack[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.PACKS);
    return saved ? JSON.parse(saved) : initialPacks;
  });

  // 5. Pending Offline Sync Queue
  const [pendingSyncQueue, setPendingSyncQueue] = useState<PendingSyncItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SYNC_QUEUE);
    return saved ? JSON.parse(saved) : [];
  });

  // 6. Missions & Badges
  const [missions, setMissions] = useState<MissionItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.MISSIONS);
    return saved ? JSON.parse(saved) : mockMissions;
  });

  const [badges, setBadges] = useState<BadgeItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.BADGES);
    return saved ? JSON.parse(saved) : mockBadges;
  });

  // Sync state animations
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncSuccessMessage, setSyncSuccessMessage] = useState<string | null>(null);

  // Active views / modals
  const [currentNav, setCurrentNav] = useState('dashboard');
  const [activePackModalId, setActivePackModalId] = useState<string | null>(null);
  const [activeLessonPackId, setActiveLessonPackId] = useState<string | null>(null);
  const [isDataImpactOpen, setIsDataImpactOpen] = useState(false);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);

  // Demo bar state
  const [demoStep, setDemoStep] = useState(1);
  const [isDemoBarVisible, setIsDemoBarVisible] = useState(true);

  // Data stats
  const [dataStats] = useState<DataUsageStats>({
    todayUsedMb: 3.2,
    todaySavedMb: 18.7,
    weekUsedMb: 21.0,
    weekSavedMb: 146.0,
    sessionSavedMb: 12.6,
  });

  // Persistence effects
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(userProfile));
  }, [userProfile]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PACKS, JSON.stringify(learningPacks));
  }, [learningPacks]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SYNC_QUEUE, JSON.stringify(pendingSyncQueue));
  }, [pendingSyncQueue]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.MISSIONS, JSON.stringify(missions));
  }, [missions]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.BADGES, JSON.stringify(badges));
  }, [badges]);

  // Network mode switcher with Auto-Sync engine
  const setConnectivityMode = (newMode: ConnectivityMode) => {
    const prevMode = connectivityMode;
    setConnectivityModeState(newMode);
    localStorage.setItem(STORAGE_KEYS.CONN_MODE, newMode);

    // If switching back from Offline to Online or Low Data, and there are pending sync items
    if (prevMode === 'offline' && newMode !== 'offline') {
      if (pendingSyncQueue.length > 0) {
        setIsSyncing(true);
        const count = pendingSyncQueue.length;
        setTimeout(() => {
          setIsSyncing(false);
          setPendingSyncQueue([]);
          setSyncSuccessMessage(`✓ ${count} activities synchronized with cloud servers! XP updated.`);
          confetti({
            particleCount: 50,
            spread: 60,
            origin: { y: 0.2 },
            colors: ['#10b981', '#06b6d4', '#f59e0b'],
          });
          setTimeout(() => setSyncSuccessMessage(null), 5000);
        }, 1800);
      } else {
        setSyncSuccessMessage(t.connectivity.connectionRestored);
        setTimeout(() => setSyncSuccessMessage(null), 3500);
      }
    }
  };

  const updateUserProfile = (updates: Partial<UserProfile>) => {
    setUserProfile((prev) => ({ ...prev, ...updates }));
  };

  // Download simulation engine
  const downloadPack = async (packId: string) => {
    setLearningPacks((prev) =>
      prev.map((p) => (p.id === packId ? { ...p, downloadProgress: 10 } : p))
    );

    for (let progress = 25; progress <= 100; progress += 25) {
      await new Promise((r) => setTimeout(r, 200));
      setLearningPacks((prev) =>
        prev.map((p) => (p.id === packId ? { ...p, downloadProgress: progress } : p))
      );
    }

    setLearningPacks((prev) =>
      prev.map((p) =>
        p.id === packId
          ? {
              ...p,
              isDownloaded: true,
              downloadProgress: undefined,
            }
          : p
      )
    );

    // Increment user's offline storage stat
    setUserProfile((prev) => ({
      ...prev,
      dataSavedMb: prev.dataSavedMb + 4.2,
    }));
  };

  const removeDownloadedPack = (packId: string) => {
    setLearningPacks((prev) =>
      prev.map((p) => (p.id === packId ? { ...p, isDownloaded: false } : p))
    );
  };

  // Claim Mission Reward
  const claimMissionReward = (missionId: string) => {
    const mission = missions.find((m) => m.id === missionId);
    if (!mission || mission.isClaimed) return;

    setMissions((prev) =>
      prev.map((m) => (m.id === missionId ? { ...m, isClaimed: true } : m))
    );

    setUserProfile((prev) => {
      const nextXp = prev.currentXp + mission.xpReward;
      let nextLevel = prev.level;
      let nextTargetXp = prev.targetXp;
      if (nextXp >= prev.targetXp) {
        nextLevel += 1;
        nextTargetXp += 1000;
      }
      return {
        ...prev,
        currentXp: nextXp,
        level: nextLevel,
        targetXp: nextTargetXp,
      };
    });

    triggerCelebration();
  };

  // Record step completion in interactive mission
  const recordStepCompletion = (
    packId: string,
    stepId: string,
    xpEarned: number,
    stepTitle: string
  ) => {
    setUserProfile((prev) => {
      const newXp = prev.currentXp + xpEarned;
      let newLevel = prev.level;
      let newTarget = prev.targetXp;
      if (newXp >= prev.targetXp) {
        newLevel += 1;
        newTarget += 1000;
      }
      return {
        ...prev,
        currentXp: newXp,
        level: newLevel,
        targetXp: newTarget,
        offlineActivitiesCompleted:
          connectivityMode === 'offline'
            ? prev.offlineActivitiesCompleted + 1
            : prev.offlineActivitiesCompleted,
      };
    });

    setLearningPacks((prev) =>
      prev.map((p) => {
        if (p.id === packId) {
          const newPercentage = Math.min(100, p.progressPercentage + 20);
          return {
            ...p,
            progressPercentage: newPercentage,
          };
        }
        return p;
      })
    );

    if (connectivityMode === 'offline') {
      const targetPack = learningPacks.find((p) => p.id === packId);
      const syncItem: PendingSyncItem = {
        id: `sync-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
        moduleId: packId,
        moduleTitle: targetPack ? targetPack.title[language] : packId,
        stepId,
        stepTitle,
        xpEarned,
        timestamp: new Date().toLocaleTimeString(),
      };
      setPendingSyncQueue((prev) => [syncItem, ...prev]);
    }

    if (packId === 'physics-quest') {
      setBadges((prev) =>
        prev.map((b) =>
          b.id === 'b-science-explorer' ? { ...b, isUnlocked: true, unlockedAt: 'Just now' } : b
        )
      );
    } else if (packId === 'python-quest') {
      setBadges((prev) =>
        prev.map((b) =>
          b.id === 'b-code-breaker' ? { ...b, isUnlocked: true, unlockedAt: 'Just now' } : b
        )
      );
    } else if (packId === 'cybersecurity-mission') {
      setBadges((prev) =>
        prev.map((b) =>
          b.id === 'b-cyber-guardian' ? { ...b, isUnlocked: true, unlockedAt: 'Just now' } : b
        )
      );
    }
  };

  const triggerCelebration = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#10b981', '#38bdf8', '#fbbf24', '#f43f5e'],
    });
  };

  const resetAllDemoState = () => {
    localStorage.clear();
    setUserProfile(initialUserProfile);
    setLearningPacks(initialPacks);
    setPendingSyncQueue([]);
    setMissions(mockMissions);
    setBadges(mockBadges);
    setConnectivityModeState('online');
    setLanguageState('en');
    setDemoStep(1);
    setCurrentNav('dashboard');
  };

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        t,
        connectivityMode,
        setConnectivityMode,
        userProfile,
        setUserProfile,
        updateUserProfile,
        learningPacks,
        downloadPack,
        removeDownloadedPack,
        pendingSyncQueue,
        isSyncing,
        syncSuccessMessage,
        missions,
        claimMissionReward,
        badges,
        activePackModalId,
        setActivePackModalId,
        activeLessonPackId,
        setActiveLessonPackId,
        recordStepCompletion,
        triggerCelebration,
        dataStats,
        isDataImpactOpen,
        setIsDataImpactOpen,
        isOnboardingOpen,
        setIsOnboardingOpen,
        demoStep,
        setDemoStep,
        isDemoBarVisible,
        setIsDemoBarVisible,
        currentNav,
        setCurrentNav,
        resetAllDemoState,
      }}
    >
      <div className={connectivityMode === 'low_data' ? 'low-data-mode' : ''}>{children}</div>
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
