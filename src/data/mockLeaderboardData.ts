import { LeaderboardLearner, FriendChallenge } from '../types';

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
  },
];

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
