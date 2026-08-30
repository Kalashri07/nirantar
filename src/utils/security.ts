/**
 * Production Security Utilities for Nirantar
 */

// 1. Input Validation Limits
export const SECURITY_LIMITS = {
  MAX_EMAIL_LENGTH: 254,
  MIN_PASSWORD_LENGTH: 6,
  MAX_PASSWORD_LENGTH: 128,
  MAX_NAME_LENGTH: 80,
  MAX_SEARCH_QUERY_LENGTH: 100,
};

/**
 * Validates email format according to RFC 5322 standard
 */
export function isValidEmail(email: string): boolean {
  if (!email || typeof email !== 'string') return false;
  const trimmed = email.trim();
  if (trimmed.length > SECURITY_LIMITS.MAX_EMAIL_LENGTH) return false;
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  return emailRegex.test(trimmed);
}

/**
 * Validates password length and constraints
 */
export function validatePassword(password: string): { valid: boolean; error: string | null } {
  if (!password || typeof password !== 'string') {
    return { valid: false, error: 'Password is required.' };
  }
  if (password.length < SECURITY_LIMITS.MIN_PASSWORD_LENGTH) {
    return {
      valid: false,
      error: `Password must be at least ${SECURITY_LIMITS.MIN_PASSWORD_LENGTH} characters long.`,
    };
  }
  if (password.length > SECURITY_LIMITS.MAX_PASSWORD_LENGTH) {
    return {
      valid: false,
      error: `Password cannot exceed ${SECURITY_LIMITS.MAX_PASSWORD_LENGTH} characters.`,
    };
  }
  return { valid: true, error: null };
}

/**
 * Sanitizes user-provided string inputs against XSS and HTML injection
 */
export function sanitizeInput(input: string, maxLength = 255): string {
  if (!input || typeof input !== 'string') return '';
  return input
    .trim()
    .slice(0, maxLength)
    .replace(/[<>]/g, '') // Strip angle brackets to prevent HTML tag injection
    .replace(/javascript:/gi, '') // Strip pseudo-protocol URLs
    .replace(/on\w+=/gi, ''); // Strip inline event handlers
}

/**
 * Simple client-side submission rate-limiter / brute-force throttle
 */
interface RateLimitRecord {
  attempts: number;
  lastAttempt: number;
  blockedUntil: number;
}

const rateLimitStore: Record<string, RateLimitRecord> = {};

export function checkRateLimit(
  actionKey: string,
  maxAttempts = 5,
  windowMs = 60000,
  blockDurationMs = 30000
): { allowed: boolean; waitSeconds?: number } {
  const now = Date.now();
  const record = rateLimitStore[actionKey] || { attempts: 0, lastAttempt: now, blockedUntil: 0 };

  // If currently blocked
  if (now < record.blockedUntil) {
    const waitSeconds = Math.ceil((record.blockedUntil - now) / 1000);
    return { allowed: false, waitSeconds };
  }

  // If window expired, reset attempts
  if (now - record.lastAttempt > windowMs) {
    record.attempts = 1;
    record.lastAttempt = now;
    record.blockedUntil = 0;
    rateLimitStore[actionKey] = record;
    return { allowed: true };
  }

  // Increment attempts
  record.attempts += 1;
  record.lastAttempt = now;

  if (record.attempts > maxAttempts) {
    record.blockedUntil = now + blockDurationMs;
    rateLimitStore[actionKey] = record;
    const waitSeconds = Math.ceil(blockDurationMs / 1000);
    return { allowed: false, waitSeconds };
  }

  rateLimitStore[actionKey] = record;
  return { allowed: true };
}

export function resetRateLimit(actionKey: string) {
  delete rateLimitStore[actionKey];
}
