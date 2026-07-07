import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Transaction {
  id: string;
  date: string;
  description: string;
  category: string;
  amount: number;
  type: 'income' | 'expense' | 'investment';
  isRecurring?: boolean;
  carbonScore?: number; // 0 (bad) to 100 (excellent eco-friendly)
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

export interface Alert {
  id: string;
  type: 'info' | 'warning' | 'success';
  title: string;
  message: string;
  date: string;
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

// Core Mock Data
const INITIAL_TRANSACTIONS: Transaction[] = [
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

const INITIAL_GOALS: Goal[] = [
  { id: 'g-1', name: 'Emergency Reserve Fund', targetAmount: 300000, currentAmount: 180000, targetDate: '2026-12-31', priority: 'High', monthlyContribution: 20000 },
  { id: 'g-2', name: 'Cyberpunk EV Car', targetAmount: 1500000, currentAmount: 250000, targetDate: '2028-06-30', priority: 'Medium', monthlyContribution: 30000 },
  { id: 'g-3', name: 'Masters in AI - London', targetAmount: 2500000, currentAmount: 400000, targetDate: '2029-09-01', priority: 'High', monthlyContribution: 45000 },
];

const INITIAL_CHALLENGES: Challenge[] = [
  { id: 'c-1', title: 'Carbon Conscious Saver', description: 'Keep transportation spending under Rs. 2,000 this month.', targetAmount: 2000, currentAmount: 800, rewardPoints: 250, isCompleted: false },
  { id: 'c-2', title: 'Obsidian Lockbox Challenge', description: 'Save Rs. 15,000 additionally outside standard SIPs.', targetAmount: 15000, currentAmount: 15000, rewardPoints: 400, isCompleted: true },
  { id: 'c-3', title: 'Unused Subscriptions Cleanup', description: 'Audit and unsubscribe from at least two unused services.', targetAmount: 2, currentAmount: 0, rewardPoints: 150, isCompleted: false },
];

export const WealthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

  const [balance, setBalance] = useState<number>(245000);
  const [investments, setInvestments] = useState<number>(820000);
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem('finaura_transactions');
    return saved ? JSON.parse(saved) : INITIAL_TRANSACTIONS;
  });
  const [goals, setGoals] = useState<Goal[]>(() => {
    const saved = localStorage.getItem('finaura_goals');
    return saved ? JSON.parse(saved) : INITIAL_GOALS;
  });
  const [challenges, setChallenges] = useState<Challenge[]>(() => {
    const saved = localStorage.getItem('finaura_challenges');
    return saved ? JSON.parse(saved) : INITIAL_CHALLENGES;
  });
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [streakDays, setStreakDays] = useState<number>(() => {
    const saved = localStorage.getItem('finaura_streak');
    return saved ? parseInt(saved, 10) : 18;
  });
  const [badges, setBadges] = useState<string[]>(['Early Adopter', 'Obsidian Saver']);
  const [geminiApiKey, setGeminiApiKey] = useState<string>(() => {
    return localStorage.getItem('finaura_gemini_key') || '';
  });

  // Save changes to LocalStorage
  useEffect(() => {
    localStorage.setItem('finaura_transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('finaura_goals', JSON.stringify(goals));
  }, [goals]);

  useEffect(() => {
    localStorage.setItem('finaura_challenges', JSON.stringify(challenges));
  }, [challenges]);

  useEffect(() => {
    localStorage.setItem('finaura_gemini_key', geminiApiKey);
  }, [geminiApiKey]);

  // Adjust financial aggregates dynamically based on transactions and user state
  const salarySum = transactions.filter(t => t.type === 'income').reduce((acc, t) => acc + t.amount, 0);

  const investmentSum = transactions.filter(t => t.type === 'investment').reduce((acc, t) => acc + t.amount, 0);

  // Compute stats
  const monthlyExpenses = transactions
    .filter(t => t.type === 'expense' && t.date.startsWith('2026-06'))
    .reduce((sum, t) => sum + t.amount, 0);

  const monthlySavings = transactions
    .filter(t => t.type === 'income' && t.date.startsWith('2026-06'))
    .reduce((sum, t) => sum + t.amount, 0) - monthlyExpenses;

  const netWorth = balance + investments;

  // Emergency Fund is the current amount inside the Emergency Reserve Fund goal
  const emergencyFund = goals.find(g => g.id === 'g-1')?.currentAmount || 180000;

  // Carbon score based on transactions
  const carbonScore = Math.round(
    transactions.reduce((acc, curr) => acc + (curr.carbonScore || 50), 0) / transactions.length
  );

  // Generate Proactive Smart Alerts dynamically
  useEffect(() => {
    const list: Alert[] = [];
    
    // Alert 1: Idle Money
    if (balance > 75000) {
      list.push({
        id: 'alt-1',
        type: 'warning',
        title: 'Idle Money Alert',
        message: `You have Rs. ${balance.toLocaleString('en-IN')} idle in your savings account. Move it to liquid funds to yield 6.5% interest.`,
        date: '2026-06-29',
      });
    }

    // Alert 2: Emergency Fund coverage
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

    // Alert 3: Unused Subscriptions Detection
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

    // Alert 4: Carbon footprint
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
  // Max 100 points
  // 1. Savings Ratio (Savings / Income): target 30%+ (20 points)
  // 2. Investment Rate (Investment / Income): target 25%+ (20 points)
  // 3. Emergency Fund (months of expenses covered): target 6+ months (20 points)
  // 4. Goal Progress ratio (20 points)
  // 5. Subscription count / Spending Discipline (20 points)
  const savingsRatio = Math.max(0, Math.min(1, monthlySavings / (salarySum || 150000)));
  const investmentRatio = Math.max(0, Math.min(1, investmentSum / (salarySum || 150000)));
  const emFundCoverage = Math.min(1, emergencyFund / ((monthlyExpenses || 25000) * 6));
  const goalProgressSum = goals.reduce((acc, g) => acc + (g.currentAmount / g.targetAmount), 0) / goals.length;
  
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

  // Core functions
  const addGoal = (newGoal: Omit<Goal, 'id' | 'currentAmount' | 'monthlyContribution'>) => {
    // Math to calculate required monthly investment
    // Simple straight-line calculation: Target / Months remaining
    const timeDiff = new Date(newGoal.targetDate).getTime() - new Date().getTime();
    const monthsRemaining = Math.max(1, Math.round(timeDiff / (1000 * 60 * 60 * 24 * 30.4)));
    const monthlyContribution = Math.round(newGoal.targetAmount / monthsRemaining);

    const goal: Goal = {
      ...newGoal,
      id: `g-${Date.now()}`,
      currentAmount: 0,
      monthlyContribution,
    };
    setGoals((prev) => [...prev, goal]);
  };

  const updateGoalAmount = (id: string, amount: number) => {
    setGoals((prev) =>
      prev.map((g) => {
        if (g.id === id) {
          const newAmount = Math.min(g.targetAmount, g.currentAmount + amount);
          return { ...g, currentAmount: newAmount };
        }
        return g;
      })
    );
    setBalance((prev) => prev - amount);
    // Track contribution as an investment transaction
    addTransaction({
      date: new Date().toISOString().split('T')[0],
      description: `Invested in ${goals.find(g => g.id === id)?.name || 'Goal'}`,
      category: 'Investments',
      amount,
      type: 'investment',
      carbonScore: 98
    });
  };

  const deleteGoal = (id: string) => {
    setGoals((prev) => prev.filter((g) => g.id !== id));
  };

  const addTransaction = (tx: Omit<Transaction, 'id'>) => {
    const newTx: Transaction = {
      ...tx,
      id: `tx-${Date.now()}`,
    };
    setTransactions((prev) => [newTx, ...prev]);

    // Apply financial adjustments
    if (tx.type === 'income') {
      setBalance((prev) => prev + tx.amount);
    } else if (tx.type === 'expense') {
      setBalance((prev) => prev - tx.amount);
    } else if (tx.type === 'investment') {
      setInvestments((prev) => prev + tx.amount);
    }
  };

  const dismissAlert = (id: string) => {
    setAlerts((prev) => prev.filter((a) => a.id !== id));
  };

  const joinChallenge = (challenge: Challenge) => {
    setChallenges((prev) => [...prev, challenge]);
  };

  const completeChallenge = (id: string) => {
    setChallenges((prev) =>
      prev.map((c) => {
        if (c.id === id) {
          if (!c.isCompleted) {
            setStreakDays(s => s + 1);
            setBadges(b => [...new Set([...b, 'Challenge Conqueror'])]);
            return { ...c, isCompleted: true };
          }
        }
        return c;
      })
    );
  };

  const incrementStreak = () => {
    setStreakDays((prev) => {
      const next = prev + 1;
      localStorage.setItem('finaura_streak', next.toString());
      if (next === 20) {
        setBadges((prevBadges) => [...new Set([...prevBadges, 'Streak Master'])]);
      }
      return next;
    });
  };

  const resetAllData = () => {
    setBalance(245000);
    setInvestments(820000);
    setTransactions(INITIAL_TRANSACTIONS);
    setGoals(INITIAL_GOALS);
    setChallenges(INITIAL_CHALLENGES);
    setStreakDays(18);
    setBadges(['Early Adopter', 'Obsidian Saver']);
    localStorage.removeItem('finaura_transactions');
    localStorage.removeItem('finaura_goals');
    localStorage.removeItem('finaura_challenges');
    localStorage.setItem('finaura_streak', '18');
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
