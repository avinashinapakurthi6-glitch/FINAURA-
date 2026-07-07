import React, { useState } from 'react';
import { useWealth } from '../context/WealthContext';
import { Target, Plus, Trash2, Award } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

export const GoalPlannerView: React.FC = () => {
  const { goals, addGoal, deleteGoal, updateGoalAmount, balance } = useWealth();
  const [showAddModal, setShowAddModal] = useState(false);

  // New goal form states
  const [name, setName] = useState('');
  const [targetAmount, setTargetAmount] = useState('');
  const [targetDate, setTargetDate] = useState('');
  const [priority, setPriority] = useState<'High' | 'Medium' | 'Low'>('Medium');

  // Deposit state
  const [depositGoalId, setDepositGoalId] = useState<string | null>(null);
  const [depositAmount, setDepositAmount] = useState('');

  const handleCreateGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !targetAmount || !targetDate) return;

    addGoal({
      name,
      targetAmount: parseInt(targetAmount, 10),
      targetDate,
      priority,
    });

    setName('');
    setTargetAmount('');
    setTargetDate('');
    setPriority('Medium');
    setShowAddModal(false);
  };

  const handleDeposit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!depositGoalId || !depositAmount) return;

    const amount = parseInt(depositAmount, 10);
    if (amount > balance) {
      alert("Insufficient account balance to make this deposit!");
      return;
    }

    const targetGoal = goals.find(g => g.id === depositGoalId);
    if (targetGoal) {
      const isCompletedAfter = (targetGoal.currentAmount + amount) >= targetGoal.targetAmount;
      updateGoalAmount(depositGoalId, amount);

      if (isCompletedAfter) {
        // Fire Confetti!
        confetti({
          particleCount: 150,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#10B981', '#F59E0B', '#3B82F6']
        });
      }
    }

    setDepositAmount('');
    setDepositGoalId(null);
  };

  const calculateMonths = (dateStr: string) => {
    const diff = new Date(dateStr).getTime() - new Date().getTime();
    return Math.max(1, Math.round(diff / (1000 * 60 * 60 * 24 * 30.4)));
  };

  return (
    <div className="space-y-6">
      
      {/* View Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white flex items-center gap-2">
            Goal-Based Wealth Planner <Target className="w-6 h-6 text-cyber-blue-light" />
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Automate your investments toward life milestones. Our algorithm aggregates inflation compounding to match your dates.
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="glass-btn-primary self-start sm:self-center"
        >
          <Plus className="w-4 h-4" /> Create Wealth Goal
        </button>
      </div>

      {/* Goal Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {goals.map((goal) => {
          const monthsLeft = calculateMonths(goal.targetDate);
          const percent = Math.round((goal.currentAmount / goal.targetAmount) * 100);
          const isComplete = goal.currentAmount >= goal.targetAmount;

          // Simple compounding corpus projection (at 10% returns)
          const futureProjectedCorpus = Math.round(
            goal.currentAmount * Math.pow(1.0083, monthsLeft) + 
            goal.monthlyContribution * ((Math.pow(1.0083, monthsLeft) - 1) / 0.0083)
          );

          return (
            <div
              key={goal.id}
              className={`glass-panel rounded-2xl p-5 flex flex-col justify-between h-96 relative overflow-hidden transition-all duration-300 border ${
                isComplete ? 'border-cyber-green/30 bg-cyber-green/5' : 'border-white/5'
              }`}
            >
              {/* Background glows */}
              {isComplete && <div className="absolute top-0 right-0 w-24 h-24 bg-cyber-green/5 rounded-full blur-xl" />}

              <div>
                {/* Header */}
                <div className="flex justify-between items-start mb-3">
                  <div className="min-w-0">
                    <h3 className="font-extrabold text-base text-white truncate">{goal.name}</h3>
                    <span className={`inline-block text-[9px] font-bold px-2 py-0.5 rounded-full mt-1.5 uppercase ${
                      goal.priority === 'High' ? 'bg-red-500/10 text-red-400 border border-red-500/20' : goal.priority === 'Medium' ? 'bg-cyber-gold/10 text-cyber-gold border border-cyber-gold/20' : 'bg-white/5 text-slate-400'
                    }`}>
                      {goal.priority} Priority
                    </span>
                  </div>
                  <button
                    onClick={() => deleteGoal(goal.id)}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-white/5 transition-colors"
                    title="Delete Goal"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Progress bar */}
                <div className="space-y-1.5 my-4">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-slate-400">Pacing Progress</span>
                    <span className={isComplete ? 'text-cyber-green' : 'text-cyber-blue-light'}>{percent}%</span>
                  </div>
                  <div className="w-full h-2.5 bg-white/5 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-1000 ${
                        isComplete ? 'bg-cyber-green' : 'bg-gradient-to-r from-cyber-blue to-cyber-green'
                      }`}
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] font-mono text-slate-500">
                    <span>Rs. {goal.currentAmount.toLocaleString('en-IN')}</span>
                    <span>Rs. {goal.targetAmount.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>

              {/* Projections block */}
              <div className="bg-obsidian-950/40 border border-white/5 rounded-xl p-3.5 space-y-2 text-[11px] text-slate-400">
                <div className="flex justify-between">
                  <span>Months Remaining:</span>
                  <span className="text-white font-bold">{monthsLeft} months</span>
                </div>
                <div className="flex justify-between">
                  <span>Needed SIP/Month:</span>
                  <span className="text-cyber-green font-bold">Rs. {goal.monthlyContribution.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between border-t border-white/5 pt-1.5 mt-1.5">
                  <span className="flex items-center gap-0.5">Projected Value (10%):</span>
                  <span className="text-cyber-gold font-bold">Rs. {futureProjectedCorpus.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 mt-4 pt-3 border-t border-white/5">
                {isComplete ? (
                  <div className="w-full py-2.5 rounded-xl bg-cyber-green/10 text-cyber-green border border-cyber-green/20 text-xs font-extrabold flex items-center justify-center gap-1.5">
                    <Award className="w-4 h-4 animate-bounce" /> Target Achieved!
                  </div>
                ) : (
                  <>
                    <button
                      onClick={() => setDepositGoalId(goal.id)}
                      className="flex-1 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 border border-white/5 text-xs font-bold transition-all text-center"
                    >
                      Deposit Funds
                    </button>
                    <a
                      href="#ai-advisor"
                      className="flex-1 py-2.5 rounded-xl bg-cyber-blue-light/10 hover:bg-cyber-blue-light/20 text-cyber-blue-light border border-cyber-blue-light/20 text-xs font-bold transition-all text-center flex items-center justify-center gap-1"
                    >
                      Ask Advisor
                    </a>
                  </>
                )}
              </div>
            </div>
          );
        })}

      </div>

      {/* Deposit Modal */}
      <AnimatePresence>
        {depositGoalId && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md rounded-2xl glass-panel p-6 border-white/10 relative"
            >
              <h3 className="font-extrabold text-lg text-white mb-2">Fund Wealth Goal</h3>
              <p className="text-xs text-slate-400 mb-4">
                Transfer liquid funds directly from your account balance (Rs. {balance.toLocaleString('en-IN')} available).
              </p>

              <form onSubmit={handleDeposit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase">Amount to Deposit (Rs.)</label>
                  <input
                    type="number"
                    value={depositAmount}
                    onChange={(e) => setDepositAmount(e.target.value)}
                    placeholder="e.g. 10000"
                    required
                    max={balance}
                    className="w-full glass-input text-lg font-bold"
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setDepositGoalId(null)}
                    className="w-1/3 glass-btn-secondary"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="w-2/3 glass-btn-primary"
                  >
                    Authorize Deposit
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Create Goal Modal */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg rounded-2xl glass-panel p-6 border-white/10 relative"
            >
              <div className="flex justify-between items-center border-b border-white/5 pb-3 mb-4">
                <h3 className="font-extrabold text-lg text-white">Create Wealth Goal</h3>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="text-slate-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleCreateGoal} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase">Goal Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Buy Luxury EV Car"
                    required
                    className="w-full glass-input"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase">Target Amount (Rs.)</label>
                    <input
                      type="number"
                      value={targetAmount}
                      onChange={(e) => setTargetAmount(e.target.value)}
                      placeholder="1500000"
                      required
                      className="w-full glass-input"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase">Target Date</label>
                    <input
                      type="date"
                      value={targetDate}
                      onChange={(e) => setTargetDate(e.target.value)}
                      required
                      className="w-full glass-input text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase">Priority Tier</label>
                  <div className="grid grid-cols-3 gap-2">
                    {['Low', 'Medium', 'High'].map((p) => (
                      <button
                        key={p}
                        type="button"
                        onClick={() => setPriority(p as any)}
                        className={`py-2.5 rounded-xl text-xs font-bold border transition-all ${
                          priority === p
                            ? 'bg-cyber-blue-light text-obsidian-950 border-cyber-blue-light shadow-neon-blue'
                            : 'bg-white/5 border-white/5 text-slate-400 hover:bg-white/10'
                        }`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3 pt-4 border-t border-white/5 mt-4">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="w-1/3 glass-btn-secondary"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="w-2/3 glass-btn-primary"
                  >
                    Establish Goal
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
