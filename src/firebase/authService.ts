import {
  signInAnonymously,
  onAuthStateChanged,
  User,
  NextOrObserver,
} from 'firebase/auth';
import { auth } from './firebase';

/**
 * Initializes Anonymous Authentication on startup.
 * 1. Checks if a Firebase user session already exists.
 * 2. If existing user exists, reuses that session.
 * 3. If no user exists and online, signs in anonymously.
 * 4. If offline, gracefully continues without blocking offline local app features.
 */
export async function initializeAnonymousAuth(): Promise<User | null> {
  return new Promise((resolve) => {
    // Check current auth state with listener
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      unsubscribe();
      if (user) {
        // User already exists, reuse existing session
        resolve(user);
      } else {
        // No user exists; try anonymous sign-in if connected
        if (typeof navigator !== 'undefined' && !navigator.onLine) {
          // Offline: proceed gracefully with offline storage
          resolve(null);
          return;
        }

        try {
          const userCredential = await signInAnonymously(auth);
          resolve(userCredential.user);
        } catch (error) {
          // Silent fallback for offline / network issues: do not block app
          resolve(null);
        }
      }
    });
  });
}

/**
 * Subscribes to Firebase Authentication state changes.
 */
export function onAuthStatusChange(callback: (user: User | null) => void) {
  return onAuthStateChanged(auth, callback);
}

/**
 * Returns current Firebase User if any.
 */
export function getCurrentFirebaseUser(): User | null {
  return auth.currentUser;
}
