import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import type { User } from 'firebase/auth';
import type {
  Language,
  ConnectivityMode,
  UserProfile,
  LearningPack,
  PendingSyncItem,
  MissionItem,
  BadgeItem,
  DataUsageStats,
  FriendChallenge,
} from '../types';
import { translations, type Translations } from '../data/translations';
import { initialUserProfile, learningPacks as initialPacks, mockMissions, mockBadges } from '../data/mockData';
import { defaultActiveChallenge, mockChallengeHistory } from '../data/mockLeaderboardData';
import { initializeAnonymousAuth, onAuthStatusChange } from '../firebase/authService';
import {
  saveUserProfileToFirestore,
  syncModuleProgressToFirestore,
  syncBadgeToFirestore,
  fetchUserProfileFromFirestore,
  fetchAllModuleProgressFromFirestore,
  fetchAllBadgesFromFirestore,
} from '../firebase/firestoreService';

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
  // Leaderboard & Friend Challenge
  activeChallenge: FriendChallenge | null;
  challengeHistory: typeof mockChallengeHistory;
  startFriendChallenge: (friendName: string, subjectType: string, durationDays: number) => void;
  completeActiveChallenge: () => void;
  claimChallengeBonusXp: () => void;
  // Auth state
  firebaseUser: User | null;
  isAuthenticated: boolean;
  hasPreviouslyLoggedIn: boolean;
  loginUser: (userNameOrEmail?: string) => void;
  logoutUser: () => void;
  currentNav: string;
  setCurrentNav: (nav: string) => void;
  resetAllDemoState: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  AUTH: 'nirantar_auth_v2',
  HAS_LOGGED_IN: 'nirantar_has_logged_in_v2',
  PROFILE: 'nirantar_user_profile_v2',
  PACKS: 'nirantar_packs_v2',
  SYNC_QUEUE: 'nirantar_pending_sync_v2',
  LANG: 'nirantar_language_v2',
  CONN_MODE: 'nirantar_conn_mode_v2',
  MISSIONS: 'nirantar_missions_v2',
  BADGES: 'nirantar_badges_v2',
  CHALLENGE: 'nirantar_active_challenge_v2',
  CHALLENGE_HIST: 'nirantar_challenge_hist_v2',
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

  // 4. Learning Packs (Merge with initial definitions)
  const [learningPacks, setLearningPacks] = useState<LearningPack[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.PACKS);
    if (!saved) return initialPacks;
    try {
      const parsed: LearningPack[] = JSON.parse(saved);
      return initialPacks.map((initPack) => {
        const found = parsed.find((p) => p.id === initPack.id);
        return found ? { ...initPack, ...found, subjectName: initPack.subjectName } : initPack;
      });
    } catch {
      return initialPacks;
    }
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

  // 7. Friend Challenge State
  const [activeChallenge, setActiveChallenge] = useState<FriendChallenge | null>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.CHALLENGE);
    return saved ? JSON.parse(saved) : defaultActiveChallenge;
  });

  const [challengeHistory, setChallengeHistory] = useState<typeof mockChallengeHistory>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.CHALLENGE_HIST);
    return saved ? JSON.parse(saved) : mockChallengeHistory;
  });

  // 8. Authentication State
  const [firebaseUser, setFirebaseUser] = useState<User | null>(null);

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.AUTH);
    return saved === 'true';
  });

  const [hasPreviouslyLoggedIn, setHasPreviouslyLoggedIn] = useState<boolean>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.HAS_LOGGED_IN);
    return saved === 'true';
  });

  // Initialize Anonymous Firebase Auth on Startup
  useEffect(() => {
    const unsubscribe = onAuthStatusChange((user) => {
      setFirebaseUser(user);
      if (user) {
        setIsAuthenticated(true);
        setHasPreviouslyLoggedIn(true);
        localStorage.setItem(STORAGE_KEYS.AUTH, 'true');
        localStorage.setItem(STORAGE_KEYS.HAS_LOGGED_IN, 'true');
      }
    });

    // Check existing or sign in anonymously without blocking offline usage
    initializeAnonymousAuth().then((user) => {
      if (user) {
        setFirebaseUser(user);
        setIsAuthenticated(true);
        setHasPreviouslyLoggedIn(true);
        localStorage.setItem(STORAGE_KEYS.AUTH, 'true');
        localStorage.setItem(STORAGE_KEYS.HAS_LOGGED_IN, 'true');
      }
    });

    return () => unsubscribe();
  }, []);

  // =========================================================================
  // STARTUP HYDRATION & CONFLICT-RESOLUTION STRATEGY:
  // 1. Instantaneous Local-First Load:
  //    - Local state is initialized synchronously from localStorage on boot.
  // 2. High-Water Mark Convergence (Progressive Merge):
  //    - When firebaseUser is available and remote Firestore data is fetched:
  //      a) XP & Level: Take Math.max(local, remote) to ensure progress is never downgraded.
  //      b) Module Progress: Take Math.max(local.progressPercentage, remote.progressPercentage).
  //      c) Syllabus Checkpoints: Union of completed checkpoints from local & remote.
  //      d) Completed Modules & Badges: Union of completed IDs and unlocked states.
  // 3. Bi-directional Convergence:
  //    - The resulting merged progressive state is saved back to localStorage and Firestore.
  // =========================================================================
  useEffect(() => {
    if (!firebaseUser?.uid) return;

    let isMounted = true;

    async function hydrateFromFirestore() {
      try {
        const [remoteProfile, remoteModuleProgress, remoteBadges] = await Promise.all([
          fetchUserProfileFromFirestore(firebaseUser!.uid),
          fetchAllModuleProgressFromFirestore(firebaseUser!.uid),
          fetchAllBadgesFromFirestore(firebaseUser!.uid),
        ]);

        if (!isMounted) return;

        // 1. Merge User Profile (High-water mark for XP, level, streaks, completed modules)
        if (remoteProfile) {
          setUserProfile((local) => {
            const mergedCurrentXp = Math.max(local.currentXp, remoteProfile.currentXp ?? 0);
            const mergedLevel = Math.max(local.level, remoteProfile.level ?? 1);
            const mergedTargetXp = Math.max(local.targetXp, remoteProfile.targetXp ?? 2000);
            const mergedStreak = Math.max(local.streakDays, remoteProfile.streakDays ?? 0);
            const mergedOfflineActivities = Math.max(
              local.offlineActivitiesCompleted,
              remoteProfile.offlineActivitiesCompleted ?? 0
            );
            const mergedCompletedModules = Array.from(
              new Set([...local.completedModuleIds, ...(remoteProfile.completedModuleIds || [])])
            );

            const mergedProfile: UserProfile = {
              ...local,
              name: remoteProfile.name || local.name,
              learnerType: remoteProfile.learnerType || local.learnerType,
              gradeOrStream: remoteProfile.gradeOrStream || local.gradeOrStream,
              preferredLanguage: (remoteProfile.preferredLanguage as Language) || local.preferredLanguage,
              currentXp: mergedCurrentXp,
              level: mergedLevel,
              targetXp: mergedTargetXp,
              streakDays: mergedStreak,
              offlineActivitiesCompleted: mergedOfflineActivities,
              completedModuleIds: mergedCompletedModules,
            };

            // Sync back merged state to Firestore
            saveUserProfileToFirestore(firebaseUser!.uid, mergedProfile).catch(() => {});
            return mergedProfile;
          });
        } else {
          // If no remote profile exists yet, seed Firestore with local profile
          saveUserProfileToFirestore(firebaseUser!.uid, userProfile).catch(() => {});
        }

        // 2. Merge Module Progress (Preserve maximum progress & completed checkpoints)
        if (remoteModuleProgress && Object.keys(remoteModuleProgress).length > 0) {
          setLearningPacks((localPacks) => {
            const mergedPacks = localPacks.map((pack) => {
              const remote = remoteModuleProgress[pack.id];
              if (!remote) return pack;

              const mergedPct = Math.max(pack.progressPercentage, remote.progressPercentage);
              const mergedSyllabus = pack.syllabus.map((item, idx) => ({
                ...item,
                completed: item.completed || (remote.completedCheckpoints || []).includes(idx),
              }));

              return {
                ...pack,
                progressPercentage: mergedPct,
                syllabus: mergedSyllabus,
              };
            });

            return mergedPacks;
          });
        }

        // 3. Merge Badges (Never relock unlocked achievements)
        if (remoteBadges && Object.keys(remoteBadges).length > 0) {
          setBadges((localBadges) => {
            const mergedBadges = localBadges.map((badge) => {
              const remote = remoteBadges[badge.id];
              if (remote && remote.isUnlocked && !badge.isUnlocked) {
                return {
                  ...badge,
                  isUnlocked: true,
                  unlockedAt: remote.unlockedAt || badge.unlockedAt || 'Synced',
                };
              }
              return badge;
            });
            return mergedBadges;
          });
        }
      } catch (error) {
        // Fallback gracefully on network timeout / offline
      }
    }

    hydrateFromFirestore();

    return () => {
      isMounted = false;
    };
  }, [firebaseUser]);

  const loginUser = (userNameOrEmail?: string) => {
    setIsAuthenticated(true);
    setHasPreviouslyLoggedIn(true);
    localStorage.setItem(STORAGE_KEYS.AUTH, 'true');
    localStorage.setItem(STORAGE_KEYS.HAS_LOGGED_IN, 'true');
    if (userNameOrEmail && userNameOrEmail.trim().length > 0) {
      const cleanName = userNameOrEmail.split('@')[0];
      setUserProfile((prev) => ({
        ...prev,
        name: cleanName.charAt(0).toUpperCase() + cleanName.slice(1),
      }));
    }
  };

  const logoutUser = () => {
    setIsAuthenticated(false);
    localStorage.setItem(STORAGE_KEYS.AUTH, 'false');
  };

  // Sync state animations
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncSuccessMessage, setSyncSuccessMessage] = useState<string | null>(null);

  // Active views / modals
  const [currentNav, setCurrentNav] = useState('home');
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

  useEffect(() => {
    if (activeChallenge) {
      localStorage.setItem(STORAGE_KEYS.CHALLENGE, JSON.stringify(activeChallenge));
    }
  }, [activeChallenge]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CHALLENGE_HIST, JSON.stringify(challengeHistory));
  }, [challengeHistory]);

  // Automatic background network listener & auto-sync
  useEffect(() => {
    const handleOnline = () => {
      setConnectivityModeState('online');
      if (!firebaseUser) {
        initializeAnonymousAuth().then((user) => {
          if (user) setFirebaseUser(user);
        });
      }
      if (pendingSyncQueue.length > 0) {
        setIsSyncing(true);
        const count = pendingSyncQueue.length;
        setTimeout(() => {
          setIsSyncing(false);
          setPendingSyncQueue([]);
          setSyncSuccessMessage(`✓ ${count} activities synchronized with cloud servers!`);
          setTimeout(() => setSyncSuccessMessage(null), 4000);
        }, 1500);
      }
    };

    const handleOffline = () => {
      setConnectivityModeState('offline');
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    if (typeof navigator !== 'undefined' && !navigator.onLine) {
      setConnectivityModeState('offline');
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [pendingSyncQueue]);

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
        setSyncSuccessMessage(t.connectivity.syncedBanner);
        setTimeout(() => setSyncSuccessMessage(null), 3500);
      }
    }
  };

  const updateUserProfile = (updates: Partial<UserProfile>) => {
    setUserProfile((prev) => {
      const updated = { ...prev, ...updates };
      if (firebaseUser?.uid) {
        saveUserProfileToFirestore(firebaseUser.uid, updated).catch(() => {});
      }
      return updated;
    });
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
      const updatedProfile = {
        ...prev,
        currentXp: nextXp,
        level: nextLevel,
        targetXp: nextTargetXp,
      };

      if (firebaseUser?.uid) {
        saveUserProfileToFirestore(firebaseUser.uid, updatedProfile).catch(() => {});
      }

      return updatedProfile;
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
    let updatedPercentage = 0;

    setUserProfile((prev) => {
      const newXp = prev.currentXp + xpEarned;
      let newLevel = prev.level;
      let newTarget = prev.targetXp;
      if (newXp >= prev.targetXp) {
        newLevel += 1;
        newTarget += 1000;
      }
      const updatedProfile = {
        ...prev,
        currentXp: newXp,
        level: newLevel,
        targetXp: newTarget,
        offlineActivitiesCompleted:
          connectivityMode === 'offline'
            ? prev.offlineActivitiesCompleted + 1
            : prev.offlineActivitiesCompleted,
      };

      if (firebaseUser?.uid) {
        saveUserProfileToFirestore(firebaseUser.uid, updatedProfile).catch(() => {});
      }

      return updatedProfile;
    });

    setLearningPacks((prev) =>
      prev.map((p) => {
        if (p.id === packId) {
          updatedPercentage = Math.min(100, p.progressPercentage + 20);
          return {
            ...p,
            progressPercentage: updatedPercentage,
          };
        }
        return p;
      })
    );

    // Sync module progress to Firestore in background
    if (firebaseUser?.uid) {
      syncModuleProgressToFirestore(firebaseUser.uid, packId, {
        progressPercentage: updatedPercentage,
      }).catch(() => {});
    }

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

    // Update active friend challenge dynamically if active
    if (activeChallenge && !activeChallenge.isCompleted) {
      setActiveChallenge((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          userXp: prev.userXp + xpEarned,
          userMissionsCompleted: prev.userMissionsCompleted + 1,
        };
      });
    }

    if (packId === 'physics-quest') {
      const badgeObj = mockBadges.find((b) => b.id === 'b-science-explorer');
      if (badgeObj && firebaseUser?.uid) {
        syncBadgeToFirestore(firebaseUser.uid, { ...badgeObj, isUnlocked: true }).catch(() => {});
      }
      setBadges((prev) =>
        prev.map((b) =>
          b.id === 'b-science-explorer' ? { ...b, isUnlocked: true, unlockedAt: 'Just now' } : b
        )
      );
    } else if (packId === 'python-quest') {
      const badgeObj = mockBadges.find((b) => b.id === 'b-code-breaker');
      if (badgeObj && firebaseUser?.uid) {
        syncBadgeToFirestore(firebaseUser.uid, { ...badgeObj, isUnlocked: true }).catch(() => {});
      }
      setBadges((prev) =>
        prev.map((b) =>
          b.id === 'b-code-breaker' ? { ...b, isUnlocked: true, unlockedAt: 'Just now' } : b
        )
      );
    } else if (packId === 'cybersecurity-mission') {
      const badgeObj = mockBadges.find((b) => b.id === 'b-cyber-guardian');
      if (badgeObj && firebaseUser?.uid) {
        syncBadgeToFirestore(firebaseUser.uid, { ...badgeObj, isUnlocked: true }).catch(() => {});
      }
      setBadges((prev) =>
        prev.map((b) =>
          b.id === 'b-cyber-guardian' ? { ...b, isUnlocked: true, unlockedAt: 'Just now' } : b
        )
      );
    }
  };

  // Friend Challenge Actions
  const startFriendChallenge = (friendName: string, subjectType: string, durationDays: number) => {
    const friendLevels: Record<string, number> = { Aarav: 7, Anaya: 7, Rohan: 6, Kavya: 6 };
    const friendBaseXp: Record<string, number> = { Aarav: 380, Anaya: 410, Rohan: 320, Kavya: 350 };

    const newChallenge: FriendChallenge = {
      id: `ch-${Date.now()}`,
      friendName,
      friendAvatar: friendName.charAt(0),
      friendLevel: friendLevels[friendName] || 6,
      subjectType,
      durationDays,
      userXp: 420,
      friendXp: friendBaseXp[friendName] || 380,
      userMissionsCompleted: 3,
      friendMissionsCompleted: 2,
      startedAt: new Date().toISOString().split('T')[0],
      endsAt: new Date(Date.now() + durationDays * 86400000).toISOString().split('T')[0],
      isActive: true,
      isCompleted: false,
    };

    setActiveChallenge(newChallenge);
    triggerCelebration();
  };

  const completeActiveChallenge = () => {
    if (!activeChallenge) return;
    const isUserWinner = activeChallenge.userXp >= activeChallenge.friendXp;
    
    setActiveChallenge((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        isCompleted: true,
        winner: isUserWinner ? 'user' : 'friend',
      };
    });

    // Add to history
    setChallengeHistory((prev) => [
      {
        id: `hist-${Date.now()}`,
        friendName: activeChallenge.friendName,
        userXp: activeChallenge.userXp,
        friendXp: activeChallenge.friendXp,
        winner: isUserWinner ? 'You' : activeChallenge.friendName,
        date: 'Just now',
        subject: `${activeChallenge.subjectType} Challenge`,
      },
      ...prev,
    ]);

    if (isUserWinner) {
      triggerCelebration();
    }
  };

  const claimChallengeBonusXp = () => {
    if (!activeChallenge || activeChallenge.rewardClaimed) return;

    setActiveChallenge((prev) => prev ? { ...prev, rewardClaimed: true } : null);

    // Award +100 bonus XP
    setUserProfile((prev) => {
      const nextXp = prev.currentXp + 100;
      let nextLevel = prev.level;
      let nextTarget = prev.targetXp;
      if (nextXp >= prev.targetXp) {
        nextLevel += 1;
        nextTarget += 1000;
      }
      return { ...prev, currentXp: nextXp, level: nextLevel, targetXp: nextTarget };
    });

    // Unlock badge
    setBadges((prev) =>
      prev.map((b) =>
        b.id === 'b-friend-champion' ? { ...b, isUnlocked: true, unlockedAt: 'Just now' } : b
      )
    );

    triggerCelebration();
  };

  const triggerCelebration = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#3457D5', '#C9A96E', '#10B981', '#F59E0B'],
    });
  };

  const resetAllDemoState = () => {
    localStorage.clear();
    setUserProfile(initialUserProfile);
    setLearningPacks(initialPacks);
    setPendingSyncQueue([]);
    setMissions(mockMissions);
    setBadges(mockBadges);
    setActiveChallenge(defaultActiveChallenge);
    setChallengeHistory(mockChallengeHistory);
    setConnectivityModeState('online');
    setLanguageState('en');
    setDemoStep(1);
    setCurrentNav('home');
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
        activeChallenge,
        challengeHistory,
        startFriendChallenge,
        completeActiveChallenge,
        claimChallengeBonusXp,
        firebaseUser,
        isAuthenticated,
        hasPreviouslyLoggedIn,
        loginUser,
        logoutUser,
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
