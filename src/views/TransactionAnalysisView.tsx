import React, { useState } from 'react';
import { useWealth } from '../context/WealthContext';
import {
  UploadCloud,
  FileSpreadsheet,
  Cpu,
  CheckCircle,
  AlertTriangle,
  Leaf,
  Activity,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const TransactionAnalysisView: React.FC = () => {
  const { transactions, addTransaction } = useWealth();
  const [analyzing, setAnalyzing] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [analysisResult, setAnalysisResult] = useState<{
    itemsAdded: number;
    anomalies: string[];
    subscriptions: string[];
    carbonImpact: string;
  } | null>(null);

  // Core Mock Statements for Upload Simulation
  const mockStatements = [
    {
      name: "Q2_CreditCard_Statement.csv",
      description: "Uber & Dining Out heavy (simulates food/travel overspending)",
      txs: [
        { date: '2026-06-27', description: 'Swiggy Gourmet Delivery', category: 'Food', amount: 3500, type: 'expense', carbonScore: 35 },
        { date: '2026-06-27', description: 'Social Pub Indiranagar', category: 'Food', amount: 4800, type: 'expense', carbonScore: 40 },
        { date: '2026-06-28', description: 'Ola Cabs Airport Ride', category: 'Travel', amount: 2200, type: 'expense', carbonScore: 50 },
        { date: '2026-06-28', description: 'Starbucks Reserve Coffee', category: 'Food', amount: 1450, type: 'expense', carbonScore: 45 },
      ],
      anomalies: [
        "Dining out spend increased by 42% compared to your historical baseline.",
        "Single transaction of Rs. 4,800 at Social Pub exceeds your typical Food cap by 2x."
      ],
      subscriptions: ["No new subscriptions found."],
      carbonImpact: "Transportation and dining out carbon score was 42/100 (High Emissions)."
    },
    {
      name: "HDFC_DebitCard_Dump.pdf",
      description: "Subscription audit (simulates recurring waste detection)",
      txs: [
        { date: '2026-06-25', description: 'Amazon Prime Video', category: 'Entertainment', amount: 1499, type: 'expense', isRecurring: true, carbonScore: 85 },
        { date: '2026-06-26', description: 'Disney Hotstar Premium', category: 'Entertainment', amount: 899, type: 'expense', isRecurring: true, carbonScore: 85 },
        { date: '2026-06-26', description: 'Spotify Premium Individual', category: 'Entertainment', amount: 119, type: 'expense', isRecurring: true, carbonScore: 90 },
      ],
      anomalies: [
        "Multiple media subscriptions are active simultaneously."
      ],
      subscriptions: [
        "Disney Hotstar Premium (Rs. 899/yr) - Unused for 45 days.",
        "Spotify Premium (Rs. 119/mo) - Unused for 30 days.",
        "Amazon Prime Video (Rs. 1,499/yr) - Active."
      ],
      carbonImpact: "Digital subscriptions represent green footprint (90/100) but financial waste."
    },
    {
      name: "NammaMetro_GreenRide.csv",
      description: "Eco-friendly commuter (simulates green spending boost)",
      txs: [
        { date: '2026-06-24', description: 'Namma Metro Transit Bangalore', category: 'Travel', amount: 80, type: 'expense', carbonScore: 98 },
        { date: '2026-06-25', description: 'Lithium Cabin EV Ride', category: 'Travel', amount: 450, type: 'expense', carbonScore: 95 },
        { date: '2026-06-26', description: 'Ather Grid EV Charging', category: 'Fuel', amount: 180, type: 'expense', carbonScore: 98 },
      ],
      anomalies: [
        "No spending anomalies detected. Highly disciplined transport budget."
      ],
      subscriptions: ["No subscriptions found."],
      carbonImpact: "Excellent eco-friendly transportation choices! Carbon rating is 97/100."
    }
  ];

  const handleSimulateUpload = (statementIndex: number) => {
    setAnalyzing(true);
    setUploadProgress(0);
    setAnalysisResult(null);

    const statement = mockStatements[statementIndex];

    // Simulate progress timer
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            // Process transactions
            statement.txs.forEach((tx) => {
              addTransaction(tx as any);
            });
            setAnalysisResult({
              itemsAdded: statement.txs.length,
              anomalies: statement.anomalies,
              subscriptions: statement.subscriptions,
              carbonImpact: statement.carbonImpact
            });
            setAnalyzing(false);
          }, 600);
          return 100;
        }
        return prev + 10;
      });
    }, 150);
  };

  return (
    <div className="space-y-6">
      
      {/* Title */}
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-white flex items-center gap-2">
          AI Transaction Analyzer <Cpu className="w-6 h-6 text-cyber-green" />
        </h1>
        <p className="text-slate-400 text-sm mt-1">
          Upload bank statements to automatically classify spending patterns, isolate subscription loops, and audit carbon footprints.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Side: Upload Zone */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Main Upload Box */}
          <div className="glass-panel rounded-2xl p-8 flex flex-col items-center justify-center border-2 border-dashed border-white/10 hover:border-cyber-green/40 transition-colors py-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyber-green/5 rounded-full blur-2xl" />
            
            <UploadCloud className="w-16 h-16 text-slate-500 mb-4" />
            <h3 className="text-lg font-bold text-white mb-1">Drag and drop bank statement</h3>
            <p className="text-xs text-slate-400 mb-6 text-center max-w-sm">
              Supports CSV, PDF, or XLSX statements exported from HDFC, ICICI, SBI, or Paytm Bank.
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => alert("Please choose a Demo statement below to run simulation.")}
                className="px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-300 text-xs font-semibold hover:bg-white/10"
              >
                Browse Local Files
              </button>
            </div>
          </div>

          {/* Preset Statements (For hackathon validation) */}
          <div className="glass-panel rounded-2xl p-6">
            <h4 className="text-sm font-extrabold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyber-gold animate-pulse" />
              Simulate Upload (Hackathon Mocks)
            </h4>
            <div className="space-y-3">
              {mockStatements.map((mock, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-obsidian-900/60 border border-white/5 hover:border-white/15 transition-all flex items-center justify-between gap-4"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <FileSpreadsheet className="w-4.5 h-4.5 text-cyber-green" />
                      <span className="font-bold text-xs text-slate-200 truncate">{mock.name}</span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1 leading-snug">{mock.description}</p>
                  </div>
                  <button
                    onClick={() => handleSimulateUpload(idx)}
                    disabled={analyzing}
                    className="px-3.5 py-2 rounded-lg bg-cyber-green text-obsidian-950 font-bold text-xs hover:bg-cyber-green-light transition-all flex-shrink-0"
                  >
                    Analyze File
                  </button>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Side: Analysis Dashboard */}
        <div className="lg:col-span-5 space-y-6">
          
          <AnimatePresence mode="wait">
            
            {/* Case 1: Analyzing Loader */}
            {analyzing && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="glass-panel rounded-2xl p-6 flex flex-col items-center justify-center py-16"
              >
                <div className="w-16 h-16 rounded-full border-4 border-t-cyber-green border-white/10 animate-spin mb-6" />
                <h4 className="text-white font-bold text-sm mb-2">Analyzing Statement Data...</h4>
                <p className="text-slate-400 text-xs mb-4">FinAura AI is classifying merchant categories...</p>
                <div className="w-full max-w-[200px] h-2 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-cyber-green rounded-full transition-all" style={{ width: `${uploadProgress}%` }} />
                </div>
              </motion.div>
            )}

            {/* Case 2: Analysis Completed Dashboard */}
            {!analyzing && analysisResult && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-panel rounded-2xl p-6 space-y-5"
              >
                <div className="flex items-center gap-2 border-b border-white/5 pb-3">
                  <CheckCircle className="w-5 h-5 text-cyber-green" />
                  <div>
                    <h3 className="font-extrabold text-sm text-white">AI Analysis Complete</h3>
                    <p className="text-[10px] text-slate-400">Processed {analysisResult.itemsAdded} transactions successfully</p>
                  </div>
                </div>

                {/* Spending Anomalies */}
                <div className="space-y-2">
                  <span className="text-[10px] text-red-400 font-bold uppercase tracking-wider flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    Spending Anomalies detected
                  </span>
                  {analysisResult.anomalies.map((a, i) => (
                    <div key={i} className="p-2.5 rounded-lg bg-red-950/20 border border-red-500/10 text-[11px] text-slate-300 leading-normal">
                      {a}
                    </div>
                  ))}
                </div>

                {/* Subscriptions */}
                <div className="space-y-2">
                  <span className="text-[10px] text-cyber-blue-light font-bold uppercase tracking-wider flex items-center gap-1">
                    🔍 Subscriptions Audited
                  </span>
                  <div className="space-y-1.5">
                    {analysisResult.subscriptions.map((s, i) => (
                      <div key={i} className="p-2.5 rounded-lg bg-obsidian-900 border border-white/5 text-[11px] text-slate-300">
                        {s}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Carbon footprint */}
                <div className="p-3.5 rounded-xl bg-cyber-green/5 border border-cyber-green/20 flex gap-3">
                  <Leaf className="w-5 h-5 text-cyber-green flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] text-cyber-green font-bold uppercase tracking-wider">ECO FOOTPRINT INSIGHT</span>
                    <p className="text-[11px] text-slate-300 mt-1 leading-normal">
                      {analysisResult.carbonImpact}
                    </p>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => setAnalysisResult(null)}
                    className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 font-bold text-xs transition-colors"
                  >
                    Clear Results
                  </button>
                </div>
              </motion.div>
            )}

            {/* Case 3: Empty State / Initial screen */}
            {!analyzing && !analysisResult && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="glass-panel rounded-2xl p-6 text-center py-16 text-slate-500"
              >
                <Activity className="w-12 h-12 mx-auto text-slate-600 mb-4" />
                <h4 className="text-white font-bold text-sm mb-1">Waiting for statement</h4>
                <p className="text-xs text-slate-400 max-w-[240px] mx-auto leading-relaxed">
                  Simulate an upload on the left panel to trigger the AI parser model.
                </p>
              </motion.div>
            )}

          </AnimatePresence>

        </div>

      </div>

      {/* Transaction History Table */}
      <div className="glass-panel rounded-2xl p-6">
        <div className="flex justify-between items-center border-b border-white/5 pb-4 mb-4">
          <h4 className="text-sm font-extrabold text-white uppercase tracking-wider">Current Transaction History</h4>
          <span className="text-xs text-slate-400 font-semibold">{transactions.length} Total records</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 text-[10px] uppercase text-slate-500 font-extrabold">
                <th className="pb-3 font-semibold">Date</th>
                <th className="pb-3 font-semibold">Description</th>
                <th className="pb-3 font-semibold">Category</th>
                <th className="pb-3 font-semibold text-right">Amount</th>
                <th className="pb-3 font-semibold text-center">Type</th>
                <th className="pb-3 font-semibold text-center">Eco Carbon</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-xs text-slate-300">
              {transactions.slice(0, 8).map((tx) => (
                <tr key={tx.id} className="hover:bg-white/5 transition-colors">
                  <td className="py-3 font-mono text-[11px] text-slate-400">{tx.date}</td>
                  <td className="py-3 font-bold text-white">{tx.description}</td>
                  <td className="py-3">
                    <span className="px-2.5 py-0.5 rounded-full bg-white/5 text-slate-300 text-[10px] font-semibold border border-white/5">
                      {tx.category}
                    </span>
                  </td>
                  <td className={`py-3 text-right font-extrabold ${tx.type === 'income' ? 'text-cyber-green' : tx.type === 'investment' ? 'text-cyber-blue-light' : 'text-white'}`}>
                    {tx.type === 'income' ? '+' : '-'} Rs. {tx.amount.toLocaleString('en-IN')}
                  </td>
                  <td className="py-3 text-center">
                    <span className={`px-2 py-0.5 rounded text-[9px] uppercase font-black ${
                      tx.type === 'income' ? 'bg-cyber-green/10 text-cyber-green' : tx.type === 'expense' ? 'bg-red-500/10 text-red-400' : 'bg-cyber-blue/10 text-cyber-blue-light'
                    }`}>
                      {tx.type}
                    </span>
                  </td>
                  <td className="py-3 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <span className={`font-bold ${tx.carbonScore && tx.carbonScore > 70 ? 'text-cyber-green' : 'text-cyber-gold'}`}>
                        {tx.carbonScore || 50}
                      </span>
                      <span className="text-[10px] text-slate-500">/100</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
