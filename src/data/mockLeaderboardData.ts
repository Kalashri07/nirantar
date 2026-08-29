import { LeaderboardLearner, FriendChallenge, LearnerActivity } from '../types';

export type LeaderboardTimePeriod = 'week' | 'month' | 'year';

/**
 * Returns a date string formatted as YYYY-MM-DD offset by daysAgo relative to referenceDate
 */
function getOffsetDate(daysAgo: number, ref = new Date()): string {
  const d = new Date(ref);
  d.setDate(d.getDate() - daysAgo);
  return d.toISOString().split('T')[0];
}

/**
 * Helper to compute start dates for current week, month, and year dynamically
 */
export function getPeriodStartDate(period: LeaderboardTimePeriod, ref = new Date()): Date {
  const date = new Date(ref);
  if (period === 'week') {
    // Current week starting from Monday (ISO standard)
    const day = date.getDay();
    const diff = (day === 0 ? -6 : 1) - day;
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() + diff);
    startOfWeek.setHours(0, 0, 0, 0);
    return startOfWeek;
  } else if (period === 'month') {
    // Current calendar month (1st of month at 00:00:00)
    return new Date(date.getFullYear(), date.getMonth(), 1, 0, 0, 0, 0);
  } else {
    // Current calendar year (Jan 1st at 00:00:00)
    return new Date(date.getFullYear(), 0, 1, 0, 0, 0, 0);
  }
}

/**
 * Base mock learners with dated activity entries so weekly, monthly, and yearly XP
 * can be calculated dynamically based on the current active date.
 */
export const mockLeaderboardLearners: LeaderboardLearner[] = [
  {
    id: 'lrn-1',
    rank: 1,
    name: 'Aarav',
    avatar: 'A',
    xp: 2450,
    level: 8,
    missionsCompleted: 14,
    streakDays: 12,
    subject: 'all',
    activities: [
      { date: getOffsetDate(0), xp: 120, missions: 1 },
      { date: getOffsetDate(2), xp: 150, missions: 1 },
      { date: getOffsetDate(4), xp: 150, missions: 2 },
      { date: getOffsetDate(10), xp: 320, missions: 2 },
      { date: getOffsetDate(15), xp: 340, missions: 2 },
      { date: getOffsetDate(21), xp: 370, missions: 3 },
      { date: getOffsetDate(45), xp: 450, missions: 3 },
      { date: getOffsetDate(90), xp: 550, missions: 0 },
    ],
  },
  {
    id: 'lrn-2',
    rank: 2,
    name: 'Anaya',
    avatar: 'A',
    xp: 2180,
    level: 7,
    missionsCompleted: 11,
    streakDays: 8,
    subject: 'science',
    activities: [
      { date: getOffsetDate(0), xp: 160, missions: 2 },
      { date: getOffsetDate(1), xp: 140, missions: 1 },
      { date: getOffsetDate(3), xp: 180, missions: 2 },
      { date: getOffsetDate(8), xp: 260, missions: 2 },
      { date: getOffsetDate(14), xp: 280, missions: 2 },
      { date: getOffsetDate(22), xp: 200, missions: 2 },
      { date: getOffsetDate(50), xp: 460, missions: 0 },
      { date: getOffsetDate(100), xp: 500, missions: 0 },
    ],
  },
  {
    id: 'lrn-3',
    rank: 3,
    name: 'Rohan',
    avatar: 'R',
    xp: 1940,
    level: 7,
    missionsCompleted: 9,
    streakDays: 7,
    subject: 'math',
    activities: [
      { date: getOffsetDate(1), xp: 110, missions: 1 },
      { date: getOffsetDate(3), xp: 120, missions: 1 },
      { date: getOffsetDate(5), xp: 80, missions: 1 },
      { date: getOffsetDate(9), xp: 290, missions: 2 },
      { date: getOffsetDate(16), xp: 270, missions: 2 },
      { date: getOffsetDate(24), xp: 270, missions: 2 },
      { date: getOffsetDate(60), xp: 400, missions: 0 },
      { date: getOffsetDate(110), xp: 400, missions: 0 },
    ],
  },
  {
    id: 'lrn-me',
    rank: 4,
    name: 'You (Me)',
    avatar: 'U',
    xp: 1720,
    level: 6,
    missionsCompleted: 8,
    streakDays: 6,
    isCurrentUser: true,
    subject: 'all',
    activities: [
      { date: getOffsetDate(0), xp: 140, missions: 1 },
      { date: getOffsetDate(2), xp: 130, missions: 1 },
      { date: getOffsetDate(4), xp: 110, missions: 1 },
      { date: getOffsetDate(11), xp: 280, missions: 2 },
      { date: getOffsetDate(17), xp: 260, missions: 2 },
      { date: getOffsetDate(23), xp: 260, missions: 1 },
      { date: getOffsetDate(70), xp: 280, missions: 0 },
      { date: getOffsetDate(120), xp: 260, missions: 0 },
    ],
  },
  {
    id: 'lrn-5',
    rank: 5,
    name: 'Kavya',
    avatar: 'K',
    xp: 1580,
    level: 6,
    missionsCompleted: 7,
    streakDays: 5,
    subject: 'tech',
    activities: [
      { date: getOffsetDate(0), xp: 100, missions: 1 },
      { date: getOffsetDate(2), xp: 90, missions: 1 },
      { date: getOffsetDate(5), xp: 90, missions: 1 },
      { date: getOffsetDate(12), xp: 220, missions: 2 },
      { date: getOffsetDate(18), xp: 240, missions: 2 },
      { date: getOffsetDate(25), xp: 240, missions: 2 },
      { date: getOffsetDate(80), xp: 300, missions: 0 },
      { date: getOffsetDate(130), xp: 300, missions: 0 },
    ],
  },
  {
    id: 'lrn-6',
    rank: 6,
    name: 'Aditya',
    avatar: 'A',
    xp: 1430,
    level: 5,
    missionsCompleted: 6,
    streakDays: 4,
    subject: 'science',
    activities: [
      { date: getOffsetDate(1), xp: 110, missions: 1 },
      { date: getOffsetDate(4), xp: 100, missions: 1 },
      { date: getOffsetDate(13), xp: 210, missions: 2 },
      { date: getOffsetDate(19), xp: 240, missions: 2 },
      { date: getOffsetDate(27), xp: 230, missions: 2 },
      { date: getOffsetDate(90), xp: 270, missions: 0 },
      { date: getOffsetDate(140), xp: 270, missions: 0 },
    ],
  },
  {
    id: 'lrn-7',
    rank: 7,
    name: 'Sneha',
    avatar: 'S',
    xp: 1290,
    level: 5,
    missionsCompleted: 5,
    streakDays: 3,
    subject: 'math',
    activities: [
      { date: getOffsetDate(2), xp: 130, missions: 1 },
      { date: getOffsetDate(5), xp: 110, missions: 1 },
      { date: getOffsetDate(15), xp: 190, missions: 1 },
      { date: getOffsetDate(20), xp: 180, missions: 1 },
      { date: getOffsetDate(28), xp: 170, missions: 1 },
      { date: getOffsetDate(100), xp: 260, missions: 0 },
      { date: getOffsetDate(150), xp: 250, missions: 0 },
    ],
  },
  {
    id: 'lrn-8',
    rank: 8,
    name: 'Tanmay',
    avatar: 'T',
    xp: 1150,
    level: 4,
    missionsCompleted: 4,
    streakDays: 2,
    subject: 'tech',
    activities: [
      { date: getOffsetDate(3), xp: 100, missions: 1 },
      { date: getOffsetDate(6), xp: 80, missions: 1 },
      { date: getOffsetDate(16), xp: 230, missions: 2 },
      { date: getOffsetDate(24), xp: 240, missions: 2 },
      { date: getOffsetDate(110), xp: 250, missions: 0 },
      { date: getOffsetDate(160), xp: 250, missions: 0 },
    ],
  },
];

/**
 * Calculates a learner's XP and completed missions for a given time period
 */
export function getLearnerPeriodMetrics(
  learner: LeaderboardLearner,
  period: LeaderboardTimePeriod,
  ref = new Date()
): { xp: number; missionsCompleted: number } {
  const startDate = getPeriodStartDate(period, ref);

  if (!learner.activities || learner.activities.length === 0) {
    if (period === 'week') {
      return {
        xp: Math.round(learner.xp * 0.22),
        missionsCompleted: Math.max(1, Math.round(learner.missionsCompleted * 0.3)),
      };
    }
    if (period === 'month') {
      return {
        xp: Math.round(learner.xp * 0.65),
        missionsCompleted: Math.max(2, Math.round(learner.missionsCompleted * 0.7)),
      };
    }
    return {
      xp: learner.xp,
      missionsCompleted: learner.missionsCompleted,
    };
  }

  let totalXp = 0;
  let totalMissions = 0;

  for (const act of learner.activities) {
    const actDate = new Date(act.date + 'T00:00:00');
    if (actDate >= startDate) {
      totalXp += act.xp;
      totalMissions += act.missions;
    }
  }

  return {
    xp: Math.max(totalXp, period === 'week' ? 120 : period === 'month' ? 450 : learner.xp),
    missionsCompleted: Math.max(totalMissions, 1),
  };
}

export const mockAvailableFriends = [
  { id: 'f-1', name: 'Aarav', avatar: 'A', level: 7, rank: '#1 this week', preferredSubject: 'Physics' },
  { id: 'f-2', name: 'Anaya', avatar: 'A', level: 7, rank: '#2 this week', preferredSubject: 'Chemistry' },
  { id: 'f-3', name: 'Rohan', avatar: 'R', level: 6, rank: '#3 this week', preferredSubject: 'Mathematics' },
  { id: 'f-4', name: 'Kavya', avatar: 'K', level: 6, rank: '#5 this week', preferredSubject: 'Python' },
];

export const defaultActiveChallenge: FriendChallenge = {
  id: 'active-ch-1',
  friendName: 'Aarav',
  friendAvatar: 'A',
  friendLevel: 7,
  subjectType: 'Physics',
  durationDays: 3,
  userXp: 420,
  friendXp: 380,
  userMissionsCompleted: 3,
  friendMissionsCompleted: 2,
  startedAt: '2026-08-28',
  endsAt: '2026-08-31',
  isActive: true,
  isCompleted: false,
};

export const mockChallengeHistory: Array<{
  id: string;
  friendName: string;
  userXp: number;
  friendXp: number;
  winner: 'You' | string;
  date: string;
  subject: string;
}> = [
  {
    id: 'hist-1',
    friendName: 'Aarav',
    userXp: 820,
    friendXp: 760,
    winner: 'You',
    date: '3 days ago',
    subject: 'Physics: Laws of Motion',
  },
  {
    id: 'hist-2',
    friendName: 'Anaya',
    userXp: 640,
    friendXp: 710,
    winner: 'Anaya',
    date: '1 week ago',
    subject: 'Chemistry Lab',
  },
  {
    id: 'hist-3',
    friendName: 'Rohan',
    userXp: 930,
    friendXp: 880,
    winner: 'You',
    date: '2 weeks ago',
    subject: 'Math Explorer',
  },
];
