import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { useWealth } from '../context/WealthContext';
import {
  LayoutDashboard,
  MessageSquare,
  Target,
  ShieldCheck,
  TrendingUp,
  BookOpen,
  Settings,
  LogOut,
  Sparkles,
  FileText,
  X
} from 'lucide-react';

interface SidebarProps {
  currentView: string;
  setView: (view: string) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentView, setView, isOpen, setIsOpen }) => {
  const { t, language } = useLanguage();
  const { logout, user } = useAuth();
  const { streakDays } = useWealth();

  const menuCategories = [
    {
      title: language === 'hi' ? 'मुख्य क्षेत्र' : language === 'te' ? 'ప్రధాన విభాగం' : 'Core Space',
      items: [
        { id: 'dashboard', label: t('dashboard'), icon: <LayoutDashboard className="w-[18px] h-[18px]" /> },
        { id: 'ai-advisor', label: t('aiAdvisor'), icon: <MessageSquare className="w-[18px] h-[18px]" />, highlight: true },
      ]
    },
    {
      title: language === 'hi' ? 'वित्तीय उपकरण' : language === 'te' ? 'ఆర్థిక సాధనాలు' : 'Financial Tools',
      items: [
        { id: 'goal-planner', label: t('wealthPlanner'), icon: <Target className="w-[18px] h-[18px]" /> },
        { id: 'risk-profiler', label: t('riskProfiling'), icon: <ShieldCheck className="w-[18px] h-[18px]" /> },
        { id: 'transaction-analysis', label: t('transactionAnalysis'), icon: <FileText className="w-[18px] h-[18px]" /> },
      ]
    },
    {
      title: language === 'hi' ? 'सिस्टम और हब' : language === 'te' ? 'సిస్టమ్స్ & హబ్' : 'Systems & Hub',
      items: [
        { id: 'innovations', label: t('innovations'), icon: <TrendingUp className="w-[18px] h-[18px]" /> },
        { id: 'academy', label: t('learningHub'), icon: <BookOpen className="w-[18px] h-[18px]" /> },
        { id: 'admin', label: t('admin'), icon: <Settings className="w-[18px] h-[18px]" /> },
      ]
    }
  ];

  return (
    <>
      {/* Mobile Drawer Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Main Sidebar Panel */}
      <aside
        className={`fixed md:sticky top-0 left-0 h-screen w-64 glass-panel border-r border-white/5 flex flex-col justify-between p-4 z-50 transition-transform duration-300 md:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Top Branding Section */}
        <div>
          <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyber-green to-cyber-gold flex items-center justify-center shadow-neon-green">
                <Sparkles className="w-4.5 h-4.5 text-obsidian-950" />
              </div>
              <div>
                <span className="font-extrabold text-lg tracking-wide text-white">FinAura AI</span>
                <p className="text-[9px] text-cyber-green uppercase tracking-widest font-semibold">Wealth OS</p>
              </div>
            </div>
            {/* Close Mobile Drawer */}
            <button
              onClick={() => setIsOpen(false)}
              className="md:hidden text-slate-400 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-5">
            {menuCategories.map((category) => (
              <div key={category.title} className="space-y-1.5">
                <div className="px-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 flex items-center justify-between">
                  <span>{category.title}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-700" />
                </div>
                <div className="space-y-1">
                  {category.items.map((item) => {
                    const isActive = currentView === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          setView(item.id);
                          setIsOpen(false);
                        }}
                        className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer relative group ${
                          isActive
                            ? 'bg-gradient-to-r from-cyber-green/15 to-cyber-green/5 text-cyber-green border-l-2 border-cyber-green shadow-[inset_1px_0_0_0_rgba(0,242,154,0.15)] shadow-neon-green/5'
                            : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'
                        } ${item.highlight && !isActive ? 'border border-cyber-green/15 bg-cyber-green/5 hover:bg-cyber-green/10' : ''}`}
                      >
                        <span className={`transition-transform duration-200 group-hover:scale-110 ${isActive ? 'text-cyber-green' : 'text-slate-400 group-hover:text-slate-200'}`}>
                          {item.icon}
                        </span>
                        <span className="truncate uppercase tracking-widest text-xs font-extrabold font-mono [word-spacing:0.35em]">
                          {item.label}
                        </span>
                        {item.highlight && (
                          <span className="ml-auto flex h-2 w-2 relative">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyber-green opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyber-green"></span>
                          </span>
                        )}
                        
                        {/* Elegant hover left indicator */}
                        {!isActive && (
                          <div className="absolute left-0 top-1/4 bottom-1/4 w-0.5 bg-slate-500 opacity-0 group-hover:opacity-100 transition-all rounded-r" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>
        </div>

        {/* Bottom Profile Summary */}
        <div className="space-y-4 border-t border-white/5 pt-4">
          
          {/* Savings Streak Widget */}
          <div className="bg-obsidian-900/60 border border-white/5 p-3 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xl">🔥</span>
              <div>
                <p className="text-[10px] text-slate-400 font-medium">{t('savingsStreak')}</p>
                <p className="text-sm font-bold text-white">{streakDays} Days</p>
              </div>
            </div>
            <div className="w-8 h-8 rounded-lg bg-cyber-gold/10 flex items-center justify-center text-xs font-bold text-cyber-gold border border-cyber-gold/20">
              +{streakDays * 10} XP
            </div>
          </div>

          <div className="flex items-center gap-3 px-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyber-blue-light to-cyber-green flex items-center justify-center text-obsidian-950 font-bold uppercase shadow-inner">
              {user?.fullName.charAt(0) || 'U'}
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="text-sm font-bold text-slate-200 truncate">{user?.fullName || 'User'}</h4>
              <p className="text-xs text-slate-500 truncate">{user?.occupation || 'Advisor'}</p>
            </div>
            <button
              onClick={logout}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 cursor-pointer"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
