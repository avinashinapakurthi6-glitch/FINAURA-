import React, { useState, useEffect } from 'react';
import { useWealth } from '../context/WealthContext';
import { Settings, Shield, RefreshCw, Terminal, Users } from 'lucide-react';

interface SystemLog {
  timestamp: string;
  module: string;
  message: string;
  type: 'INFO' | 'SUCCESS' | 'WARN';
}

export const AdminPortalView: React.FC = () => {
  const { resetAllData } = useWealth();
  
  const [logs, setLogs] = useState<SystemLog[]>([
    { timestamp: '14:30:02', module: 'AUTH_MDL', message: 'JWT verification completed for user session.', type: 'SUCCESS' },
    { timestamp: '14:30:05', module: 'WEALTH_DB', message: 'Fetched 16 transaction history blocks.', type: 'INFO' },
    { timestamp: '14:30:10', module: 'AI_COGNITIVE', message: 'Gemini system prompt compiled successfully.', type: 'INFO' }
  ]);

  // Simulate logging activity
  useEffect(() => {
    const modules = ['AUTH_MDL', 'WEALTH_DB', 'AI_COGNITIVE', 'CARBON_API', 'GAMIFICATION'];
    const messages = [
      'Cached transaction queries for dashboard optimization.',
      'System alerts evaluated. Emergency Fund warning triggered.',
      'Refreshed future net worth projection matrices.',
      'XP rewards updated for challenge completions.',
      'Syncing local storage caches with banking database API.',
    ];

    const interval = setInterval(() => {
      const logModule = modules[Math.floor(Math.random() * modules.length)];
      const logMsg = messages[Math.floor(Math.random() * messages.length)];
      const now = new Date();
      const timestamp = now.toTimeString().split(' ')[0];

      setLogs((prev) => [
        { timestamp, module: logModule, message: logMsg, type: 'INFO' },
        ...prev.slice(0, 15) // limit size
      ]);
    }, 4500);

    return () => clearInterval(interval);
  }, []);



  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset all dashboard metrics and goals? This clears localStorage.")) {
      resetAllData();
      alert("Application state reset. Please refresh the browser.");
      window.location.reload();
    }
  };

  const mockDbUsers = [
    { name: "Kiran Reddy", age: 28, occupation: "Product Manager", income: "Rs. 15,00,000", risk: "Aggressive" },
    { name: "Vikram Aditya", age: 34, occupation: "Business consultant", income: "Rs. 22,00,000", risk: "Moderate" },
    { name: "Aarav Mehta", age: 35, occupation: "Investment Analyst", income: "Rs. 24,00,000", risk: "Aggressive" }
  ];

  return (
    <div className="space-y-6">
      
      {/* Title */}
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-white flex items-center gap-2">
          Admin & Config Portal <Settings className="w-6 h-6 text-cyber-green" />
        </h1>
        <p className="text-slate-400 text-sm mt-1">
          Adjust security parameters, manage connection tokens, audit users, and view platform execution logs.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Side: Security Settings (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          


          {/* Master Reset and Security Policy */}
          <div className="glass-panel rounded-2xl p-6 space-y-4">
            <h3 className="font-extrabold text-sm text-white uppercase tracking-wider flex items-center gap-2">
              <Shield className="w-4.5 h-4.5 text-red-400" /> Platform Controls
            </h3>
            
            <div className="space-y-2">
              <button
                onClick={handleReset}
                className="w-full py-2.5 rounded-xl bg-red-950/20 border border-red-500/20 hover:bg-red-950/40 text-red-300 font-extrabold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" /> WIPE ALL CACHE DATA
              </button>
            </div>
            
            <p className="text-[10px] text-slate-500 leading-snug">
              Note: Wiping cache clears your created goals, uploaded statements, and resets your balance history.
            </p>
          </div>

        </div>

        {/* Right Side: Logs & User List (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* User database */}
          <div className="glass-panel rounded-2xl p-6">
            <h3 className="font-extrabold text-sm text-white uppercase tracking-wider mb-4 flex items-center gap-2">
              <Users className="w-4.5 h-4.5 text-cyber-blue-light" /> Mock User Registrations
            </h3>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-white/5 text-[9px] uppercase text-slate-500 font-extrabold pb-2">
                    <th className="pb-2">Name</th>
                    <th className="pb-2">Occupation</th>
                    <th className="pb-2">Annual Income</th>
                    <th className="pb-2">Risk</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-slate-300">
                  {mockDbUsers.map((u, i) => (
                    <tr key={i} className="hover:bg-white/5 transition-colors">
                      <td className="py-2.5 font-bold text-white">{u.name}</td>
                      <td className="py-2.5">{u.occupation}</td>
                      <td className="py-2.5 text-cyber-green font-bold">{u.income}</td>
                      <td className="py-2.5">
                        <span className="px-2 py-0.5 rounded bg-white/5 text-slate-400 text-[10px]">
                          {u.risk}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* System Terminal activity logs */}
          <div className="glass-panel rounded-2xl p-6">
            <h3 className="font-extrabold text-sm text-white uppercase tracking-wider mb-4 flex items-center gap-2">
              <Terminal className="w-4.5 h-4.5 text-cyber-green" /> Banking API Gateway Log Console
            </h3>

            <div className="bg-obsidian-950 border border-white/5 rounded-xl p-4 h-48 overflow-y-auto font-mono text-[10px] text-slate-400 space-y-1.5 glass-scroll select-all">
              {logs.map((log, index) => (
                <div key={index} className="flex gap-2">
                  <span className="text-slate-600">{log.timestamp}</span>
                  <span className="text-cyber-blue-light font-bold">[{log.module}]</span>
                  <span className={log.type === 'SUCCESS' ? 'text-cyber-green' : log.type === 'WARN' ? 'text-cyber-gold' : 'text-slate-300'}>
                    {log.message}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
