import {
  doc,
  setDoc,
  getDoc,
  collection,
  getDocs,
  serverTimestamp,
  FieldValue,
} from 'firebase/firestore';
import { db } from './firebase';
import type { UserProfile, BadgeItem, LearningPack } from '../types';

export interface FirestoreUserProfile {
  name: string;
  learnerType: 'school' | 'undergrad';
  gradeOrStream: string;
  preferredLanguage: string;
  level: number;
  currentXp: number;
  targetXp: number;
  streakDays: number;
  offlineActivitiesCompleted: number;
  completedModuleIds: string[];
  updatedAt: FieldValue | string;
}

export interface FirestoreModuleProgress {
  moduleId: string;
  progressPercentage: number;
  completedCheckpoints: number[];
  isCompleted: boolean;
  lastAccessed: FieldValue | string;
}

export interface FirestoreBadgeRecord {
  badgeId: string;
  badgeCode: string;
  isUnlocked: boolean;
  unlockedAt: string;
  xpAwarded: number;
  updatedAt: FieldValue | string;
}

/**
 * 1. USER PROFILE SYNCHRONIZATION
 * Saves or merges the user profile document at users/{uid}
 */
export async function saveUserProfileToFirestore(
  uid: string,
  profile: Partial<UserProfile>
): Promise<void> {
  if (!uid) return;

  const userDocRef = doc(db, 'users', uid);
  const dataToSave: Partial<FirestoreUserProfile> = {
    name: profile.name,
    learnerType: profile.learnerType,
    gradeOrStream: profile.gradeOrStream,
    preferredLanguage: profile.preferredLanguage,
    level: profile.level,
    currentXp: profile.currentXp,
    targetXp: profile.targetXp,
    streakDays: profile.streakDays,
    offlineActivitiesCompleted: profile.offlineActivitiesCompleted,
    completedModuleIds: profile.completedModuleIds || [],
    updatedAt: serverTimestamp(),
  };

  // Clean undefined keys before saving
  Object.keys(dataToSave).forEach((key) => {
    if (dataToSave[key as keyof typeof dataToSave] === undefined) {
      delete dataToSave[key as keyof typeof dataToSave];
    }
  });

  await setDoc(userDocRef, dataToSave, { merge: true });
}

/**
 * Fetches user profile document from Firestore at users/{uid}
 */
export async function fetchUserProfileFromFirestore(
  uid: string
): Promise<Partial<UserProfile> | null> {
  if (!uid) return null;

  try {
    const userDocRef = doc(db, 'users', uid);
    const snapshot = await getDoc(userDocRef);
    if (snapshot.exists()) {
      return snapshot.data() as Partial<UserProfile>;
    }
    return null;
  } catch (error) {
    // Graceful offline fallback
    return null;
  }
}

/**
 * 2. MODULE PROGRESS SYNCHRONIZATION
 * Saves or merges module progress document at users/{uid}/moduleProgress/{moduleId}
 */
export async function syncModuleProgressToFirestore(
  uid: string,
  moduleId: string,
  progressData: {
    progressPercentage: number;
    completedCheckpoints?: number[];
    isCompleted?: boolean;
  }
): Promise<void> {
  if (!uid || !moduleId) return;

  const moduleDocRef = doc(db, 'users', uid, 'moduleProgress', moduleId);
  const dataToSave: Partial<FirestoreModuleProgress> = {
    moduleId,
    progressPercentage: progressData.progressPercentage,
    completedCheckpoints: progressData.completedCheckpoints || [],
    isCompleted: progressData.isCompleted ?? progressData.progressPercentage >= 100,
    lastAccessed: serverTimestamp(),
  };

  await setDoc(moduleDocRef, dataToSave, { merge: true });
}

/**
 * Fetches all module progress documents for a user from users/{uid}/moduleProgress
 */
export async function fetchAllModuleProgressFromFirestore(
  uid: string
): Promise<Record<string, { progressPercentage: number; completedCheckpoints: number[]; isCompleted: boolean }>> {
  if (!uid) return {};

  try {
    const subcollRef = collection(db, 'users', uid, 'moduleProgress');
    const snapshot = await getDocs(subcollRef);
    const progressMap: Record<string, { progressPercentage: number; completedCheckpoints: number[]; isCompleted: boolean }> = {};

    snapshot.forEach((docSnap) => {
      const data = docSnap.data() as FirestoreModuleProgress;
      progressMap[docSnap.id] = {
        progressPercentage: data.progressPercentage || 0,
        completedCheckpoints: data.completedCheckpoints || [],
        isCompleted: data.isCompleted || (data.progressPercentage >= 100),
      };
    });

    return progressMap;
  } catch (error) {
    // Graceful offline fallback
    return {};
  }
}

/**
 * 3. BADGE SYNCHRONIZATION
 * Saves or merges unlocked badge record at users/{uid}/badges/{badgeId}
 */
export async function syncBadgeToFirestore(
  uid: string,
  badge: BadgeItem
): Promise<void> {
  if (!uid || !badge.id) return;

  const badgeDocRef = doc(db, 'users', uid, 'badges', badge.id);
  const dataToSave: FirestoreBadgeRecord = {
    badgeId: badge.id,
    badgeCode: badge.badgeCode,
    isUnlocked: badge.isUnlocked,
    unlockedAt: badge.unlockedAt || new Date().toISOString().split('T')[0],
    xpAwarded: badge.xpReward,
    updatedAt: serverTimestamp(),
  };

  await setDoc(badgeDocRef, dataToSave, { merge: true });
}

/**
 * Fetches all unlocked badge documents from users/{uid}/badges
 */
export async function fetchAllBadgesFromFirestore(
  uid: string
): Promise<Record<string, { isUnlocked: boolean; unlockedAt: string }>> {
  if (!uid) return {};

  try {
    const badgesCollRef = collection(db, 'users', uid, 'badges');
    const snapshot = await getDocs(badgesCollRef);
    const badgesMap: Record<string, { isUnlocked: boolean; unlockedAt: string }> = {};

    snapshot.forEach((docSnap) => {
      const data = docSnap.data() as FirestoreBadgeRecord;
      badgesMap[docSnap.id] = {
        isUnlocked: data.isUnlocked,
        unlockedAt: data.unlockedAt,
      };
    });

    return badgesMap;
  } catch (error) {
    // Graceful offline fallback
    return {};
  }
}
