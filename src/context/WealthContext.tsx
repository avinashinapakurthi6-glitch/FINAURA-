import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext';
import {
  getUserData,
  saveUserData,
  addTransactionToFirestore,
  saveGoals,
  saveChallenges,
  saveFinancials,
  saveStreakAndBadges,
  resetUserData,
  type Transaction,
  type Goal,
  type Challenge,
  type UserFinancialData,
} from '../utils/firestoreService';

// Re-export types so existing imports from WealthContext still work
export type { Transaction, Goal, Challenge } from '../utils/firestoreService';

export interface Alert {
  id: string;
  type: 'info' | 'warning' | 'success';
  title: string;
  message: string;
  date: string;
}

interface WealthContextProps {
  balance: number;
  investments: number;
  monthlySavings: number;
  monthlyExpenses: number;
  netWorth: number;
  emergencyFund: number;
  wealthHealthScore: number;
  wealthHealthCategory: 'Poor' | 'Good' | 'Excellent';
  wealthHealthSuggestions: string[];
  transactions: Transaction[];
  goals: Goal[];
  alerts: Alert[];
  challenges: Challenge[];
  streakDays: number;
  carbonScore: number;
  badges: string[];
  geminiApiKey: string;
  isDataLoading: boolean;
  setGeminiApiKey: (key: string) => void;
  addGoal: (goal: Omit<Goal, 'id' | 'currentAmount' | 'monthlyContribution'>) => void;
  updateGoalAmount: (id: string, amount: number) => void;
  deleteGoal: (id: string) => void;
  addTransaction: (tx: Omit<Transaction, 'id'>) => void;
  dismissAlert: (id: string) => void;
  joinChallenge: (challenge: Challenge) => void;
  completeChallenge: (id: string) => void;
  incrementStreak: () => void;
  resetAllData: () => void;
}

const WealthContext = createContext<WealthContextProps | undefined>(undefined);

// Fallback mock data for non-Firebase users (OTP, demo)
const FALLBACK_TRANSACTIONS: Transaction[] = [
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

const FALLBACK_GOALS: Goal[] = [
  { id: 'g-1', name: 'Emergency Reserve Fund', targetAmount: 300000, currentAmount: 180000, targetDate: '2026-12-31', priority: 'High', monthlyContribution: 20000 },
  { id: 'g-2', name: 'Cyberpunk EV Car', targetAmount: 1500000, currentAmount: 250000, targetDate: '2028-06-30', priority: 'Medium', monthlyContribution: 30000 },
  { id: 'g-3', name: 'Masters in AI - London', targetAmount: 2500000, currentAmount: 400000, targetDate: '2029-09-01', priority: 'High', monthlyContribution: 45000 },
];

const FALLBACK_CHALLENGES: Challenge[] = [
  { id: 'c-1', title: 'Carbon Conscious Saver', description: 'Keep transportation spending under Rs. 2,000 this month.', targetAmount: 2000, currentAmount: 800, rewardPoints: 250, isCompleted: false },
  { id: 'c-2', title: 'Obsidian Lockbox Challenge', description: 'Save Rs. 15,000 additionally outside standard SIPs.', targetAmount: 15000, currentAmount: 15000, rewardPoints: 400, isCompleted: true },
  { id: 'c-3', title: 'Unused Subscriptions Cleanup', description: 'Audit and unsubscribe from at least two unused services.', targetAmount: 2, currentAmount: 0, rewardPoints: 150, isCompleted: false },
];

export const WealthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { firebaseUser, isAuthenticated } = useAuth();

  const [balance, setBalance] = useState<number>(245000);
  const [investments, setInvestments] = useState<number>(820000);
  const [transactions, setTransactions] = useState<Transaction[]>(FALLBACK_TRANSACTIONS);
  const [goals, setGoals] = useState<Goal[]>(FALLBACK_GOALS);
  const [challenges, setChallenges] = useState<Challenge[]>(FALLBACK_CHALLENGES);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [streakDays, setStreakDays] = useState<number>(18);
  const [badges, setBadges] = useState<string[]>(['Early Adopter', 'Obsidian Saver']);
  const [isDataLoading, setIsDataLoading] = useState<boolean>(false);
  const [geminiApiKey, setGeminiApiKeyState] = useState<string>(() => {
    return localStorage.getItem('finaura_gemini_key') || '';
  });

  const uid = firebaseUser?.uid;

  // Load data from Firestore when user authenticates
  useEffect(() => {
    if (!uid) return;

    let cancelled = false;
    setIsDataLoading(true);

    getUserData(uid)
      .then((data: UserFinancialData) => {
        if (cancelled) return;
        setBalance(data.balance);
        setInvestments(data.investments);
        setTransactions(data.transactions);
        setGoals(data.goals);
        setChallenges(data.challenges);
        setStreakDays(data.streakDays);
        setBadges(data.badges);
      })
      .catch((err) => {
        console.error('Failed to load user data from Firestore:', err);
        // Keep fallback data
      })
      .finally(() => {
        if (!cancelled) setIsDataLoading(false);
      });

    return () => { cancelled = true; };
  }, [uid]);

  // Persist Gemini API key to localStorage (not Firestore)
  const setGeminiApiKey = useCallback((key: string) => {
    setGeminiApiKeyState(key);
    localStorage.setItem('finaura_gemini_key', key);
  }, []);

  // Debounced save helper
  const persistToFirestore = useCallback(
    (data: Partial<UserFinancialData>) => {
      if (!uid) return;
      saveUserData(uid, data).catch((err) =>
        console.error('Firestore save failed:', err)
      );
    },
    [uid]
  );

  // Compute stats (same logic as before)
  const salarySum = transactions.filter(t => t.type === 'income').reduce((acc, t) => acc + t.amount, 0);
  const investmentSum = transactions.filter(t => t.type === 'investment').reduce((acc, t) => acc + t.amount, 0);

  const monthlyExpenses = transactions
    .filter(t => t.type === 'expense' && t.date.startsWith('2026-06'))
    .reduce((sum, t) => sum + t.amount, 0);

  const monthlySavings = transactions
    .filter(t => t.type === 'income' && t.date.startsWith('2026-06'))
    .reduce((sum, t) => sum + t.amount, 0) - monthlyExpenses;

  const netWorth = balance + investments;
  const emergencyFund = goals.find(g => g.id === 'g-1')?.currentAmount || 180000;

  const carbonScore = transactions.length > 0
    ? Math.round(transactions.reduce((acc, curr) => acc + (curr.carbonScore || 50), 0) / transactions.length)
    : 50;

  // Generate Proactive Smart Alerts dynamically
  useEffect(() => {
    const list: Alert[] = [];

    if (balance > 75000) {
      list.push({
        id: 'alt-1',
        type: 'warning',
        title: 'Idle Money Alert',
        message: `You have Rs. ${balance.toLocaleString('en-IN')} idle in your savings account. Move it to liquid funds to yield 6.5% interest.`,
        date: '2026-06-29',
      });
    }

    const monthsCovered = Math.round((emergencyFund / (monthlyExpenses || 25000)) * 10) / 10;
    if (monthsCovered < 6) {
      list.push({
        id: 'alt-2',
        type: 'warning',
        title: 'Low Emergency Fund Buffer',
        message: `Your emergency fund of Rs. ${emergencyFund.toLocaleString('en-IN')} covers only ${monthsCovered} months of expenses. Recommended: 6 months.`,
        date: '2026-06-28',
      });
    }

    const subscriptions = transactions.filter(t => t.isRecurring && t.category === 'Entertainment');
    if (subscriptions.length >= 3) {
      list.push({
        id: 'alt-3',
        type: 'info',
        title: 'Subscription Waste Detected',
        message: `Three potentially unused subscription services (Netflix, Youtube Premium, Canva Pro) are active. You could save Rs. 4,837 monthly.`,
        date: '2026-06-27',
      });
    }

    if (carbonScore < 60) {
      list.push({
        id: 'alt-4',
        type: 'warning',
        title: 'High Carbon Footprint Spending',
        message: `Your spending carbon score is ${carbonScore}/100. Reduce online delivery and taxi emissions to unlock the 'Eco-Saver' badge.`,
        date: '2026-06-26',
      });
    }

    setAlerts(list);
  }, [balance, emergencyFund, monthlyExpenses, transactions, carbonScore]);

  // Compute Wealth Health Score
  const savingsRatio = Math.max(0, Math.min(1, monthlySavings / (salarySum || 150000)));
  const investmentRatio = Math.max(0, Math.min(1, investmentSum / (salarySum || 150000)));
  const emFundCoverage = Math.min(1, emergencyFund / ((monthlyExpenses || 25000) * 6));
  const goalProgressSum = goals.length > 0
    ? goals.reduce((acc, g) => acc + (g.currentAmount / g.targetAmount), 0) / goals.length
    : 0;

  const score = Math.round(
    (savingsRatio * 20) +
    (investmentRatio * 20) +
    (emFundCoverage * 20) +
    (goalProgressSum * 20) +
    (carbonScore / 100 * 20)
  );

  const wealthHealthScore = Math.max(25, Math.min(100, score));

  let wealthHealthCategory: 'Poor' | 'Good' | 'Excellent' = 'Good';
  if (wealthHealthScore <= 40) wealthHealthCategory = 'Poor';
  else if (wealthHealthScore >= 71) wealthHealthCategory = 'Excellent';

  const wealthHealthSuggestions: string[] = [];
  if (savingsRatio < 0.3) {
    wealthHealthSuggestions.push('Increase your savings ratio. Minimize dining out and subscription renewals.');
  }
  if (investmentRatio < 0.2) {
    wealthHealthSuggestions.push('Automate your investments. Schedule a recurring SIP on salary credit day.');
  }
  if (emFundCoverage < 1) {
    wealthHealthSuggestions.push('Top up your emergency reserve fund. Allocate Rs. 15,000 monthly to reach the 6-month buffer.');
  }
  if (carbonScore < 70) {
    wealthHealthSuggestions.push('Switch to public transit or electric mobility to improve your Carbon Footprint spending score.');
  }
  if (wealthHealthSuggestions.length === 0) {
    wealthHealthSuggestions.push('Excellent financial health! Keep diversifying your portfolio with aggressive mutual funds.');
  }

  // Core functions (with Firestore persistence)
  const addGoal = (newGoal: Omit<Goal, 'id' | 'currentAmount' | 'monthlyContribution'>) => {
    const timeDiff = new Date(newGoal.targetDate).getTime() - new Date().getTime();
    const monthsRemaining = Math.max(1, Math.round(timeDiff / (1000 * 60 * 60 * 24 * 30.4)));
    const monthlyContribution = Math.round(newGoal.targetAmount / monthsRemaining);

    const goal: Goal = {
      ...newGoal,
      id: `g-${Date.now()}`,
      currentAmount: 0,
      monthlyContribution,
    };
    setGoals((prev) => {
      const updated = [...prev, goal];
      persistToFirestore({ goals: updated });
      return updated;
    });
  };

  const updateGoalAmount = (id: string, amount: number) => {
    setGoals((prev) => {
      const updated = prev.map((g) => {
        if (g.id === id) {
          const newAmount = Math.min(g.targetAmount, g.currentAmount + amount);
          return { ...g, currentAmount: newAmount };
        }
        return g;
      });
      persistToFirestore({ goals: updated });
      return updated;
    });
    setBalance((prev) => {
      const newBal = prev - amount;
      if (uid) saveFinancials(uid, newBal, investments).catch(console.error);
      return newBal;
    });
    // Track contribution as an investment transaction
    addTransaction({
      date: new Date().toISOString().split('T')[0],
      description: `Invested in ${goals.find(g => g.id === id)?.name || 'Goal'}`,
      category: 'Investments',
      amount,
      type: 'investment',
      carbonScore: 98,
    });
  };

  const deleteGoal = (id: string) => {
    setGoals((prev) => {
      const updated = prev.filter((g) => g.id !== id);
      persistToFirestore({ goals: updated });
      return updated;
    });
  };

  const addTransaction = (tx: Omit<Transaction, 'id'>) => {
    const newTx: Transaction = {
      ...tx,
      id: `tx-${Date.now()}`,
    };
    setTransactions((prev) => {
      const updated = [newTx, ...prev];
      persistToFirestore({ transactions: updated });
      return updated;
    });

    if (tx.type === 'income') {
      setBalance((prev) => {
        const newBal = prev + tx.amount;
        if (uid) saveFinancials(uid, newBal, investments).catch(console.error);
        return newBal;
      });
    } else if (tx.type === 'expense') {
      setBalance((prev) => {
        const newBal = prev - tx.amount;
        if (uid) saveFinancials(uid, newBal, investments).catch(console.error);
        return newBal;
      });
    } else if (tx.type === 'investment') {
      setInvestments((prev) => {
        const newInv = prev + tx.amount;
        if (uid) saveFinancials(uid, balance, newInv).catch(console.error);
        return newInv;
      });
    }
  };

  const dismissAlert = (id: string) => {
    setAlerts((prev) => prev.filter((a) => a.id !== id));
  };

  const joinChallenge = (challenge: Challenge) => {
    setChallenges((prev) => {
      const updated = [...prev, challenge];
      persistToFirestore({ challenges: updated });
      return updated;
    });
  };

  const completeChallenge = (id: string) => {
    setChallenges((prev) => {
      const updated = prev.map((c) => {
        if (c.id === id && !c.isCompleted) {
          setStreakDays(s => {
            const next = s + 1;
            if (uid) saveStreakAndBadges(uid, next, badges).catch(console.error);
            return next;
          });
          setBadges(b => {
            const next = [...new Set([...b, 'Challenge Conqueror'])];
            if (uid) saveStreakAndBadges(uid, streakDays + 1, next).catch(console.error);
            return next;
          });
          return { ...c, isCompleted: true };
        }
        return c;
      });
      persistToFirestore({ challenges: updated });
      return updated;
    });
  };

  const incrementStreak = () => {
    setStreakDays((prev) => {
      const next = prev + 1;
      if (next === 20) {
        setBadges((prevBadges) => {
          const nextBadges = [...new Set([...prevBadges, 'Streak Master'])];
          if (uid) saveStreakAndBadges(uid, next, nextBadges).catch(console.error);
          return nextBadges;
        });
      } else {
        if (uid) saveStreakAndBadges(uid, next, badges).catch(console.error);
      }
      return next;
    });
  };

  const resetAllData = () => {
    setBalance(245000);
    setInvestments(820000);
    setTransactions(FALLBACK_TRANSACTIONS);
    setGoals(FALLBACK_GOALS);
    setChallenges(FALLBACK_CHALLENGES);
    setStreakDays(18);
    setBadges(['Early Adopter', 'Obsidian Saver']);

    if (uid) {
      resetUserData(uid).catch(console.error);
    }
  };

  return (
    <WealthContext.Provider
      value={{
        balance,
        investments,
        monthlySavings,
        monthlyExpenses,
        netWorth,
        emergencyFund,
        wealthHealthScore,
        wealthHealthCategory,
        wealthHealthSuggestions,
        transactions,
        goals,
        alerts,
        challenges,
        streakDays,
        carbonScore,
        badges,
        geminiApiKey,
        isDataLoading,
        setGeminiApiKey,
        addGoal,
        updateGoalAmount,
        deleteGoal,
        addTransaction,
        dismissAlert,
        joinChallenge,
        completeChallenge,
        incrementStreak,
        resetAllData,
      }}
    >
      {children}
    </WealthContext.Provider>
  );
};

export const useWealth = () => {
  const context = useContext(WealthContext);
  if (!context) {
    throw new Error('useWealth must be used within a WealthProvider');
  }
  return context;
};
