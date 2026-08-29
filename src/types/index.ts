export type Language = 'en' | 'mr' | 'hi';

export type ConnectivityMode = 'online' | 'low_data' | 'offline';

export type LearnerType = 'school' | 'undergrad';

export type NavSection = 'home' | 'learn' | 'library' | 'missions' | 'achievements' | 'leaderboard' | 'challenges' | 'profile';

export interface LeaderboardLearner {
  id: string;
  rank: number;
  name: string;
  avatar: string;
  xp: number;
  level: number;
  missionsCompleted: number;
  streakDays: number;
  isCurrentUser?: boolean;
  subject: string;
}

export interface FriendChallenge {
  id: string;
  friendName: string;
  friendAvatar: string;
  friendLevel: number;
  subjectType: string;
  durationDays: number;
  userXp: number;
  friendXp: number;
  userMissionsCompleted: number;
  friendMissionsCompleted: number;
  startedAt: string;
  endsAt: string;
  isActive: boolean;
  isCompleted: boolean;
  winner?: 'user' | 'friend';
  rewardClaimed?: boolean;
}

export interface UserProfile {
  name: string;
  learnerType: LearnerType;
  gradeOrStream: string;
  interests: string[];
  preferredLanguage: Language;
  level: number;
  levelTitle: {
    en: string;
    mr: string;
    hi: string;
  };
  currentXp: number;
  targetXp: number;
  streakDays: number;
  completedModuleIds: string[];
  offlineHours: number;
  offlineActivitiesCompleted: number;
  dataSavedMb: number;
  hasOnboarded: boolean;
}

export type WorldId = 'science' | 'math' | 'language' | 'tech';

export interface InteractiveStep {
  id: string;
  type: 'learn' | 'think' | 'play' | 'challenge' | 'code' | 'security';
  title: { en: string; mr: string; hi: string };
  description: { en: string; mr: string; hi: string };
  illustrationSvg?: string;
  question?: { en: string; mr: string; hi: string };
  options?: Array<{
    id: string;
    text: { en: string; mr: string; hi: string };
    isCorrect: boolean;
    explanation: { en: string; mr: string; hi: string };
  }>;
  interactiveData?: {
    simType?: 'force_cart' | 'chemistry_reaction' | 'python_editor' | 'cyber_phishing';
    initialCartWeight?: number;
    initialForce?: number;
    initialCode?: string;
    expectedCodeSubstring?: string;
    solutionCode?: string;
    phishingClues?: string[];
    elements?: Array<{ name: string; symbol: string; atomicNumber: number; group: string }>;
  };
  xpReward: number;
}

export interface LearningPack {
  id: string;
  worldId: WorldId;
  subjectName: { en: string; mr: string; hi: string };
  title: { en: string; mr: string; hi: string };
  subtitle: { en: string; mr: string; hi: string };
  levelBadge: { en: string; mr: string; hi: string };
  targetAudience: 'School' | 'Undergraduate';
  estimatedSizeMb: number;
  xpReward: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  description: { en: string; mr: string; hi: string };
  icon: string;
  gradient: string;
  isDownloaded: boolean;
  downloadProgress?: number; // 0-100
  progressPercentage: number; // 0-100
  lastAccessed?: string;
  syllabus: Array<{
    id: string;
    title: { en: string; mr: string; hi: string };
    durationMin: number;
    completed: boolean;
  }>;
  interactiveMission: {
    title: { en: string; mr: string; hi: string };
    scenario: { en: string; mr: string; hi: string };
    badgeReward: string;
    steps: InteractiveStep[];
  };
}

export interface PendingSyncItem {
  id: string;
  moduleId: string;
  moduleTitle: string;
  stepId: string;
  stepTitle: string;
  xpEarned: number;
  timestamp: string;
}

export interface MissionItem {
  id: string;
  type: 'daily' | 'weekly' | 'subject';
  title: { en: string; mr: string; hi: string };
  description: { en: string; mr: string; hi: string };
  progress: number;
  total: number;
  xpReward: number;
  badgeReward?: string;
  isClaimed: boolean;
  icon: string;
}

export interface BadgeItem {
  id: string;
  title: { en: string; mr: string; hi: string };
  description: { en: string; mr: string; hi: string };
  icon: string;
  category: string;
  isUnlocked: boolean;
  unlockedAt?: string;
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary';
}

export interface DataUsageStats {
  todayUsedMb: number;
  todaySavedMb: number;
  weekUsedMb: number;
  weekSavedMb: number;
  sessionSavedMb: number;
}
