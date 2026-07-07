import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '../firebase';

// ---------- Types (mirroring WealthContext) ----------

export interface Transaction {
  id: string;
  date: string;
  description: string;
  category: string;
  amount: number;
  type: 'income' | 'expense' | 'investment';
  isRecurring?: boolean;
  carbonScore?: number;
}

export interface Goal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  targetDate: string;
  priority: 'High' | 'Medium' | 'Low';
  monthlyContribution: number;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  targetAmount: number;
  currentAmount: number;
  rewardPoints: number;
  isCompleted: boolean;
}

export interface UserFinancialData {
  balance: number;
  investments: number;
  transactions: Transaction[];
  goals: Goal[];
  challenges: Challenge[];
  streakDays: number;
  badges: string[];
  createdAt?: unknown;
  updatedAt?: unknown;
}

// ---------- Seed / Default Data ----------

const SEED_TRANSACTIONS: Transaction[] = [
  { id: 'tx-1', date: '2026-06-01', description: 'TechCorp Salary Credit', category: 'Salary', amount: 150000, type: 'income', carbonScore: 90 },
  { id: 'tx-2', date: '2026-06-02', description: 'HDFC SIP Mutual Fund', category: 'Investments', amount: 20000, type: 'investment', carbonScore: 95 },
  { id: 'tx-3', date: '2026-06-03', description: 'Amazon India Shopping', category: 'Shopping', amount: 8500, type: 'expense', carbonScore: 30 },
  { id: 'tx-4', date: '2026-06-04', description: 'Zomato Food Order', category: 'Food', amount: 1200, type: 'expense', carbonScore: 40 },
  { id: 'tx-5', date: '2026-06-05', description: 'Netflix India Subscription', category: 'Entertainment', amount: 649, type: 'expense', isRecurring: true, carbonScore: 85 },
  { id: 'tx-6', date: '2026-06-08', description: 'PVR Cinemas Ticket', category: 'Entertainment', amount: 1500, type: 'expense', carbonScore: 70 },
  { id: 'tx-7', date: '2026-06-10', description: 'Shell Petrol Pump', category: 'Fuel', amount: 4000, type: 'expense', carbonScore: 10 },
  { id: 'tx-8', date: '2026-06-12', description: 'Uber India Ride', category: 'Travel', amount: 800, type: 'expense', carbonScore: 60 },
  { id: 'tx-9', date: '2026-06-14', description: 'BESCOM Electricity Bill', category: 'Utilities', amount: 3200, type: 'expense', isRecurring: true, carbonScore: 85 },
  { id: 'tx-10', date: '2026-06-15', description: 'Starbucks Coffee', category: 'Food', amount: 950, type: 'expense', carbonScore: 45 },
  { id: 'tx-11', date: '2026-06-18', description: 'Apollo Pharmacy', category: 'Healthcare', amount: 1800, type: 'expense', carbonScore: 80 },
  { id: 'tx-12', date: '2026-06-20', description: 'Gym Membership Renewal', category: 'Healthcare', amount: 2500, type: 'expense', isRecurring: true, carbonScore: 90 },
  { id: 'tx-13', date: '2026-06-22', description: 'Udemy React Course', category: 'Education', amount: 499, type: 'expense', carbonScore: 95 },
  { id: 'tx-14', date: '2026-06-24', description: 'Zerodha Equity Buy', category: 'Investments', amount: 15000, type: 'investment', carbonScore: 95 },
  { id: 'tx-15', date: '2026-06-25', description: 'Youtube Premium', category: 'Entertainment', amount: 189, type: 'expense', isRecurring: true, carbonScore: 85 },
  { id: 'tx-16', date: '2026-06-26', description: 'Canva Pro Yearly', category: 'Entertainment', amount: 3999, type: 'expense', isRecurring: true, carbonScore: 90 },
];

const SEED_GOALS: Goal[] = [
  { id: 'g-1', name: 'Emergency Reserve Fund', targetAmount: 300000, currentAmount: 180000, targetDate: '2026-12-31', priority: 'High', monthlyContribution: 20000 },
  { id: 'g-2', name: 'Cyberpunk EV Car', targetAmount: 1500000, currentAmount: 250000, targetDate: '2028-06-30', priority: 'Medium', monthlyContribution: 30000 },
  { id: 'g-3', name: 'Masters in AI - London', targetAmount: 2500000, currentAmount: 400000, targetDate: '2029-09-01', priority: 'High', monthlyContribution: 45000 },
];

const SEED_CHALLENGES: Challenge[] = [
  { id: 'c-1', title: 'Carbon Conscious Saver', description: 'Keep transportation spending under Rs. 2,000 this month.', targetAmount: 2000, currentAmount: 0, rewardPoints: 250, isCompleted: false },
  { id: 'c-2', title: 'Obsidian Lockbox Challenge', description: 'Save Rs. 15,000 additionally outside standard SIPs.', targetAmount: 15000, currentAmount: 0, rewardPoints: 400, isCompleted: false },
  { id: 'c-3', title: 'Unused Subscriptions Cleanup', description: 'Audit and unsubscribe from at least two unused services.', targetAmount: 2, currentAmount: 0, rewardPoints: 150, isCompleted: false },
];

const DEFAULT_DATA: UserFinancialData = {
  balance: 0,
  investments: 0,
  transactions: [],
  goals: [],
  challenges: SEED_CHALLENGES,
  streakDays: 0,
  badges: [],
};

// ---------- Firestore Helpers ----------

const userDocRef = (uid: string) => doc(db, 'users', uid);

/**
 * Fetch user financial data from Firestore.
 * If the user document doesn't exist yet (first login), seed it with defaults.
 */
export async function getUserData(uid: string): Promise<UserFinancialData> {
  const snap = await getDoc(userDocRef(uid));
  if (snap.exists()) {
    return snap.data() as UserFinancialData;
  }
  // First-time user — seed with default data
  const seedData: UserFinancialData = {
    ...DEFAULT_DATA,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };
  await setDoc(userDocRef(uid), seedData);
  return { ...DEFAULT_DATA };
}

/**
 * Overwrite the entire user financial document (used for bulk saves).
 */
export async function saveUserData(uid: string, data: Partial<UserFinancialData>): Promise<void> {
  await setDoc(userDocRef(uid), { ...data, updatedAt: serverTimestamp() }, { merge: true });
}

/**
 * Add a single transaction to the user's transactions array.
 */
export async function addTransactionToFirestore(uid: string, tx: Transaction): Promise<void> {
  await updateDoc(userDocRef(uid), {
    transactions: arrayUnion(tx),
    updatedAt: serverTimestamp(),
  });
}

/**
 * Save updated goals array.
 */
export async function saveGoals(uid: string, goals: Goal[]): Promise<void> {
  await updateDoc(userDocRef(uid), {
    goals,
    updatedAt: serverTimestamp(),
  });
}

/**
 * Save updated challenges array.
 */
export async function saveChallenges(uid: string, challenges: Challenge[]): Promise<void> {
  await updateDoc(userDocRef(uid), {
    challenges,
    updatedAt: serverTimestamp(),
  });
}

/**
 * Update balance and investments.
 */
export async function saveFinancials(uid: string, balance: number, investments: number): Promise<void> {
  await updateDoc(userDocRef(uid), {
    balance,
    investments,
    updatedAt: serverTimestamp(),
  });
}

/**
 * Update streak and badges.
 */
export async function saveStreakAndBadges(uid: string, streakDays: number, badges: string[]): Promise<void> {
  await updateDoc(userDocRef(uid), {
    streakDays,
    badges,
    updatedAt: serverTimestamp(),
  });
}

/**
 * Reset user data to defaults.
 */
export async function resetUserData(uid: string): Promise<void> {
  await setDoc(userDocRef(uid), {
    ...DEFAULT_DATA,
    updatedAt: serverTimestamp(),
  });
}
