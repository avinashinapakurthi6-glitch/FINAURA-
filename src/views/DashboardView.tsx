import React from 'react';
import { generateWealthPDF } from '../utils/pdf';
import { useWealth } from '../context/WealthContext';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import {
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  PiggyBank,
  Wallet,
  Activity,
  Award,
  Sparkles,
  ShieldCheck,
  Compass,
  Target
} from 'lucide-react';
import { motion } from 'framer-motion';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from 'recharts';

export const DashboardView: React.FC = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const {
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
    challenges,
    completeChallenge
  } = useWealth();

  // 1. Data Prep for Expense Distribution Pie
  const expenseCategories = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc: { [key: string]: number }, curr) => {
      acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
      return acc;
    }, {});

  const expensePieData = Object.keys(expenseCategories).map(cat => ({
    name: cat,
    value: expenseCategories[cat]
  }));

  const COLORS = ['#10B981', '#3B82F6', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#6B7280'];

  // 2. Data Prep for Income vs Expense Bar (dynamically aggregated)
  const getHistoricalMonthlyData = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const now = new Date();
    const data = [];
    
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthLabel = months[d.getMonth()];
      const yearVal = d.getFullYear();
      const monthPrefix = `${yearVal}-${String(d.getMonth() + 1).padStart(2, '0')}`;
      
      const monthTx = transactions.filter(t => t.date && t.date.startsWith(monthPrefix));
      
      const monthIncome = monthTx.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
      const monthExpense = monthTx.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
      const monthInvestment = monthTx.filter(t => t.type === 'investment').reduce((sum, t) => sum + t.amount, 0);

      data.push({
        name: monthLabel,
        Income: monthIncome,
        Expense: monthExpense + monthInvestment
      });
    }
    
    return data;
  };

  const incomeVsExpenseData = getHistoricalMonthlyData();

  // 3. Data Prep for Savings Trend
  const savingsTrendData = incomeVsExpenseData.map(d => ({
    name: d.name,
    Savings: d.Income - d.Expense
  }));

  // 4. Data Prep for Investment Donut
  const investmentAllocationData = [
    { name: 'Equity Mutual Funds', value: Math.round(investments * 0.5) },
    { name: 'Direct Equity Stocks', value: Math.round(investments * 0.25) },
    { name: 'Sovereign Gold Bonds', value: Math.round(investments * 0.15) },
    { name: 'Fixed Deposits (FD)', value: Math.round(investments * 0.1) },
  ];

  // 5. Data Prep for 10-Year Growth Forecast
  const forecastData = [];
  let compoundWealthAdvisor = netWorth;
  let compoundWealthBasic = netWorth;
  const monthlySalary = user ? user.annualIncome / 12 : 125000;
  const dynamicMonthlySavings = monthlySavings > 0 ? monthlySavings : Math.max(0, monthlySalary - monthlyExpenses);
  const annualSavings = dynamicMonthlySavings * 12;

  for (let year = 0; year <= 10; year++) {
    forecastData.push({
      year: `Yr ${year}`,
      'FinAura Portfolio (12%)': Math.round(compoundWealthAdvisor),
      'Basic Savings Acc (4%)': Math.round(compoundWealthBasic),
    });
    compoundWealthAdvisor = (compoundWealthAdvisor + annualSavings) * 1.12;
    compoundWealthBasic = (compoundWealthBasic + annualSavings) * 1.04;
  }

  // Calculate Emergency Fund ratio status text
  const efTarget = monthlyExpenses * 6;
  const efRatio = emergencyFund / (efTarget || 1);
  const efProgressPercentage = Math.round(Math.min(1, efRatio) * 100);

  // Goal average progress
  const averageGoalProgress = goals.length > 0 
    ? Math.round((goals.reduce((sum, g) => sum + (g.currentAmount / g.targetAmount), 0) / goals.length) * 100)
    : 0;

  // Animations configuration
  const cardVariant = {
    hidden: { opacity: 0, y: 15 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.5 }
    })
  };

  return (
    <div className="space-y-6">
      
      {/* Welcome Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white flex items-center gap-2">
            Welcome back, <span className="bg-gradient-to-r from-white via-slate-200 to-cyber-green bg-clip-text text-transparent">{user?.fullName || 'Wealth Owner'}</span>
            <Sparkles className="w-5 h-5 text-cyber-gold animate-pulse" />
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            FinAura wealth advisor aggregates your accounts. Your portfolio is updated in real-time.
          </p>
        </div>
        <div className="flex gap-2 items-center flex-wrap">
          <button
            onClick={() => generateWealthPDF({
              user,
              balance,
              investments,
              monthlySavings,
              monthlyExpenses,
              goals,
              transactions,
              wealthHealthScore,
              suggestions: wealthHealthSuggestions
            })}
            className="px-3.5 py-1.5 rounded-full bg-cyber-gold hover:bg-cyber-gold-light text-obsidian-950 text-xs font-bold transition-all shadow-md flex items-center gap-1 cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
          >
            Download PDF Report
          </button>
          <div className="px-3 py-1.5 rounded-full bg-cyber-green/10 border border-cyber-green/30 text-xs font-bold text-cyber-green flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" /> {user?.riskProfile || 'Moderate'} Investor
          </div>
          <div className="px-3 py-1.5 rounded-full bg-cyber-gold/10 border border-cyber-gold/30 text-xs font-bold text-cyber-gold flex items-center gap-1">
            <Award className="w-3.5 h-3.5" /> Level 4 Saver
          </div>
        </div>
      </div>

      {/* Grid of Key metrics (Framer Motion) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        
        {/* Net Worth */}
        <motion.div custom={0} initial="hidden" animate="visible" variants={cardVariant} className="glass-card p-5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-cyber-blue/5 rounded-full blur-xl" />
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">{t('netWorth')}</span>
            <div className="w-8 h-8 rounded-lg bg-cyber-blue/10 flex items-center justify-center text-cyber-blue-light"><TrendingUp className="w-4 h-4" /></div>
          </div>
          <h3 className="text-2xl font-black text-white">Rs. {netWorth.toLocaleString('en-IN')}</h3>
          <p className="text-[11px] text-slate-400 mt-1">
            Combined assets & investments
          </p>
        </motion.div>

        {/* Total Balance */}
        <motion.div custom={1} initial="hidden" animate="visible" variants={cardVariant} className="glass-card p-5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-cyber-green/5 rounded-full blur-xl" />
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">{t('totalBalance')}</span>
            <div className="w-8 h-8 rounded-lg bg-cyber-green/10 flex items-center justify-center text-cyber-green"><Wallet className="w-4 h-4" /></div>
          </div>
          <h3 className="text-2xl font-black text-white">Rs. {balance.toLocaleString('en-IN')}</h3>
          <p className="text-[11px] text-slate-400 mt-1">Liquid Bank Account</p>
        </motion.div>

        {/* Total Investments */}
        <motion.div custom={2} initial="hidden" animate="visible" variants={cardVariant} className="glass-card p-5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-cyber-gold/5 rounded-full blur-xl" />
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">{t('totalInvestments')}</span>
            <div className="w-8 h-8 rounded-lg bg-cyber-gold/10 flex items-center justify-center text-cyber-gold"><Compass className="w-4 h-4" /></div>
          </div>
          <h3 className="text-2xl font-black text-white">Rs. {investments.toLocaleString('en-IN')}</h3>
          <p className="text-[11px] text-slate-400 mt-1">
            Market-allocated assets
          </p>
        </motion.div>

        {/* Monthly Savings */}
        <motion.div custom={3} initial="hidden" animate="visible" variants={cardVariant} className="glass-card p-5 relative overflow-hidden">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">{t('monthlySavings')}</span>
            <div className="w-8 h-8 rounded-lg bg-cyber-green/10 flex items-center justify-center text-cyber-green"><PiggyBank className="w-4 h-4" /></div>
          </div>
          <h3 className="text-2xl font-black text-white">Rs. {monthlySavings.toLocaleString('en-IN')}</h3>
          <p className="text-[11px] text-cyber-green font-semibold mt-1">
            Savings rate: {monthlySalary > 0 ? Math.round(Math.max(0, monthlySavings) / monthlySalary * 100) : 0}% of income
          </p>
        </motion.div>

        {/* Monthly Expenses */}
        <motion.div custom={4} initial="hidden" animate="visible" variants={cardVariant} className="glass-card p-5 relative overflow-hidden">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">{t('monthlyExpenses')}</span>
            <div className="w-8 h-8 rounded-lg bg-red-950/20 border border-red-500/10 flex items-center justify-center text-red-400"><ArrowDownRight className="w-4 h-4" /></div>
          </div>
          <h3 className="text-2xl font-black text-white">Rs. {monthlyExpenses.toLocaleString('en-IN')}</h3>
          <p className="text-[11px] text-slate-400 mt-1">
            Total monthly cash outflow
          </p>
        </motion.div>

      </div>

      {/* Middle Row: Score Card & Goals summary */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Wealth Health Score (4 Cols) */}
        <div className="lg:col-span-5 glass-panel rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden">
          
          <div className="absolute top-[-10%] right-[-10%] w-40 h-40 bg-cyber-green/5 rounded-full blur-[40px]" />
          
          <div>
            <h4 className="text-sm font-extrabold text-white uppercase tracking-wider mb-1 flex items-center gap-2">
              <Activity className="w-4.5 h-4.5 text-cyber-green" />
              {t('wealthHealthScore')}
            </h4>
            <p className="text-xs text-slate-400">Calculated across cash surplus, debt levels, goals pacing, and asset spread.</p>
          </div>

          <div className="my-6 flex items-center justify-center gap-6">
            <div className="relative w-32 h-32 flex items-center justify-center">
              {/* Circular Gauge */}
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="64" cy="64" r="54" className="stroke-white/5 fill-transparent" strokeWidth="10" />
                <circle
                  cx="64"
                  cy="64"
                  r="54"
                  className={`fill-transparent transition-all duration-1000 ${
                    wealthHealthCategory === 'Excellent' ? 'stroke-cyber-green' : wealthHealthCategory === 'Good' ? 'stroke-cyber-blue-light' : 'stroke-red-500'
                  }`}
                  strokeWidth="10"
                  strokeDasharray="339.3"
                  strokeDashoffset={339.3 - (339.3 * wealthHealthScore) / 100}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute flex flex-col items-center justify-center">
                <span className="text-3xl font-black text-white">{wealthHealthScore}</span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                  wealthHealthCategory === 'Excellent' ? 'bg-cyber-green/10 text-cyber-green' : wealthHealthCategory === 'Good' ? 'bg-cyber-blue/10 text-cyber-blue-light' : 'bg-red-500/10 text-red-500'
                }`}>
                  {wealthHealthCategory}
                </span>
              </div>
            </div>

            <div className="space-y-2 flex-1">
              <div>
                <div className="flex justify-between text-[11px] font-semibold text-slate-400 mb-1">
                  <span>Savings Ratio</span>
                  <span className="text-white">Excel</span>
                </div>
                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-cyber-green rounded-full" style={{ width: '80%' }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-[11px] font-semibold text-slate-400 mb-1">
                  <span>Emergency Fund</span>
                  <span className="text-white">Pacing</span>
                </div>
                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-cyber-gold rounded-full" style={{ width: `${efProgressPercentage}%` }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-[11px] font-semibold text-slate-400 mb-1">
                  <span>Goal Achievement</span>
                  <span className="text-white">{averageGoalProgress}%</span>
                </div>
                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-cyber-blue-light rounded-full" style={{ width: `${averageGoalProgress}%` }} />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-obsidian-950/40 border border-white/5 p-3 rounded-xl">
            <span className="text-[10px] text-cyber-gold font-bold uppercase tracking-wider flex items-center gap-1">💡 ADV-RECOMMENDATION</span>
            <p className="text-[11px] text-slate-300 leading-relaxed mt-1 font-medium">{wealthHealthSuggestions[0]}</p>
          </div>

        </div>

        {/* Goals & Challenges Panel (7 Cols) */}
        <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Goals Tracker card */}
          <div className="glass-panel rounded-2xl p-5 flex flex-col justify-between">
            <div className="flex items-center justify-between border-b border-white/5 pb-2.5 mb-3">
              <span className="font-extrabold text-sm text-white uppercase tracking-wider flex items-center gap-2">
                <Target className="w-4 h-4 text-cyber-blue-light" />
                {t('goalProgress')}
              </span>
              <span className="text-[11px] text-slate-400 font-semibold">{goals.length} Active Goals</span>
            </div>

            <div className="space-y-4">
              {goals.slice(0, 3).map((goal) => {
                const ratio = goal.currentAmount / goal.targetAmount;
                const percent = Math.round(ratio * 100);
                return (
                  <div key={goal.id} className="space-y-1.5">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-slate-200">{goal.name}</span>
                      <span className="text-cyber-green">{percent}%</span>
                    </div>
                    <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden relative">
                      <div className="h-full bg-gradient-to-r from-cyber-blue to-cyber-green rounded-full transition-all duration-500" style={{ width: `${percent}%` }} />
                    </div>
                    <div className="flex justify-between text-[10px] text-slate-500">
                      <span>Rs. {goal.currentAmount.toLocaleString('en-IN')}</span>
                      <span>Target: Rs. {goal.targetAmount.toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Gamified Wellness Challenges */}
          <div className="glass-panel rounded-2xl p-5 flex flex-col justify-between">
            <div className="flex items-center justify-between border-b border-white/5 pb-2.5 mb-3">
              <span className="font-extrabold text-sm text-white uppercase tracking-wider flex items-center gap-2">
                <Award className="w-4 h-4 text-cyber-gold" />
                {t('activeChallenges')}
              </span>
              <span className="text-[10px] bg-cyber-gold/15 text-cyber-gold border border-cyber-gold/20 px-1.5 py-0.5 rounded-full font-bold">Challenge XP</span>
            </div>

            <div className="space-y-3">
              {challenges.slice(0, 2).map((c) => (
                <div key={c.id} className="p-2.5 rounded-xl bg-obsidian-900/60 border border-white/5 flex items-start gap-2.5 justify-between">
                  <div className="min-w-0">
                    <p className={`text-xs font-bold truncate ${c.isCompleted ? 'text-slate-500 line-through' : 'text-slate-200'}`}>
                      {c.title}
                    </p>
                    <p className="text-[10px] text-slate-400 mt-0.5 leading-snug line-clamp-2">
                      {c.description}
                    </p>
                  </div>
                  {!c.isCompleted ? (
                    <button
                      onClick={() => completeChallenge(c.id)}
                      className="px-2.5 py-1 rounded bg-cyber-gold hover:bg-cyber-gold-light text-obsidian-950 font-extrabold text-[9px] uppercase tracking-wider transition-all"
                    >
                      Complete
                    </button>
                  ) : (
                    <span className="text-[10px] text-cyber-green font-bold flex items-center gap-0.5">&bull; Done</span>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* Bottom Chart Rows */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Income vs Expenses (Bar) */}
        <div className="glass-panel rounded-2xl p-5">
          <h4 className="text-sm font-extrabold text-slate-300 uppercase tracking-wider mb-4">Monthly Income vs Expenses</h4>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={incomeVsExpenseData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="name" stroke="#6B7280" style={{ fontSize: 11 }} />
                <YAxis stroke="#6B7280" style={{ fontSize: 11 }} />
                <Tooltip cursor={{ fill: 'rgba(255,255,255,0.02)' }} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Bar dataKey="Income" fill="rgba(59, 130, 246, 0.7)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Expense" fill="rgba(239, 68, 68, 0.7)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Future Wealth Simulation (10-Year Growth) */}
        <div className="glass-panel rounded-2xl p-5">
          <h4 className="text-sm font-extrabold text-slate-300 uppercase tracking-wider mb-4">10-Year Growth Forecast (FinAura vs Basic)</h4>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={forecastData}>
                <defs>
                  <linearGradient id="colorAdv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorBasic" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6B7280" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#6B7280" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="year" stroke="#6B7280" style={{ fontSize: 11 }} />
                <YAxis stroke="#6B7280" style={{ fontSize: 11 }} />
                <Tooltip />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Area type="monotone" dataKey="FinAura Portfolio (12%)" stroke="#10B981" fillOpacity={1} fill="url(#colorAdv)" strokeWidth={2} />
                <Area type="monotone" dataKey="Basic Savings Acc (4%)" stroke="#9CA3AF" fillOpacity={1} fill="url(#colorBasic)" strokeWidth={1} strokeDasharray="4 4" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Expense distribution Pie Chart (1/3 width) */}
        <div className="glass-panel rounded-2xl p-5">
          <h4 className="text-sm font-extrabold text-slate-300 uppercase tracking-wider mb-4">Expense Categories</h4>
          <div className="h-60 flex items-center justify-center">
            {expensePieData.length === 0 ? (
              <p className="text-slate-500 text-xs">No expenses logged yet</p>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={expensePieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {expensePieData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `Rs. ${Number(value).toLocaleString('en-IN')}`} />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4 text-[10px] font-semibold text-slate-400">
            {expensePieData.slice(0, 4).map((entry, idx) => (
              <div key={entry.name} className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[idx % COLORS.length] }} />
                <span className="truncate">{entry.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Investment Allocation Donut Chart (1/3 width) */}
        <div className="glass-panel rounded-2xl p-5">
          <h4 className="text-sm font-extrabold text-slate-300 uppercase tracking-wider mb-4">Asset Allocations</h4>
          <div className="h-60 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={investmentAllocationData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {investmentAllocationData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[(index + 2) % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `Rs. ${Number(value).toLocaleString('en-IN')}`} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4 text-[10px] font-semibold text-slate-400">
            {investmentAllocationData.map((entry, idx) => (
              <div key={entry.name} className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[(idx + 2) % COLORS.length] }} />
                <span className="truncate">{entry.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Savings Trend Line Chart (1/3 width) */}
        <div className="glass-panel rounded-2xl p-5">
          <h4 className="text-sm font-extrabold text-slate-300 uppercase tracking-wider mb-4">Savings Trend</h4>
          <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={savingsTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="name" stroke="#6B7280" style={{ fontSize: 10 }} />
                <YAxis stroke="#6B7280" style={{ fontSize: 10 }} />
                <Tooltip formatter={(value) => `Rs. ${Number(value).toLocaleString('en-IN')}`} />
                <Line type="monotone" dataKey="Savings" stroke="#10B981" strokeWidth={3} dot={{ stroke: '#10B981', strokeWidth: 2, r: 4 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 text-center">
            <p className="text-[11px] text-slate-400">
              Savings peaked at **June 2026** with a surplus rate of **{Math.round(monthlySavings / 150000 * 100)}%**.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
};
