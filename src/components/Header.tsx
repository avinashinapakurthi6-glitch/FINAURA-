import React, { useState } from 'react';
import { useLanguage, type Language } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { useWealth } from '../context/WealthContext';
import { Bell, Moon, Sun, Globe, Menu, ShieldAlert, X, Sparkles, AlertTriangle, BadgePercent } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface HeaderProps {
  setSidebarOpen: (open: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({ setSidebarOpen }) => {
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const { alerts, dismissAlert, balance, investments } = useWealth();
  
  const [alertsOpen, setAlertsOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-cyber-gold" />;
      case 'info':
        return <ShieldAlert className="w-5 h-5 text-cyber-blue-light" />;
      default:
        return <BadgePercent className="w-5 h-5 text-cyber-green" />;
    }
  };

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    setLangOpen(false);
  };

  return (
    <header className="sticky top-0 z-30 w-full glass-panel border-b border-white/5 px-6 py-4 flex items-center justify-between backdrop-blur-md">
      
      {/* Left: Mobile hamburger menu & Welcome text */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => setSidebarOpen(true)}
          className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 cursor-pointer"
        >
          <Menu className="w-6 h-6" />
        </button>

        <div className="hidden sm:block">
          <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">{t('portfolioSummary')}</p>
          <h2 className="text-lg font-bold text-white flex items-center gap-1.5">
            {t('netWorth')}: <span className="text-cyber-green glow-text-green font-extrabold">Rs. {(balance + investments).toLocaleString('en-IN')}</span>
          </h2>
        </div>
      </div>

      {/* Right: Controls & Alerts & Selectors */}
      <div className="flex items-center gap-3 relative">
        
        {/* Language Selector */}
        <div className="relative">
          <button
            onClick={() => setLangOpen(!langOpen)}
            className="p-2.5 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/10 text-slate-300 hover:text-white cursor-pointer transition-all flex items-center gap-1.5 text-xs font-semibold"
          >
            <Globe className="w-4 h-4 text-cyber-green" />
            <span className="uppercase">{language}</span>
          </button>
          
          <AnimatePresence>
            {langOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute right-0 mt-2 w-32 rounded-xl bg-obsidian-900 border border-white/10 p-1.5 shadow-2xl z-50"
              >
                <button
                  onClick={() => handleLanguageChange('en')}
                  className="w-full text-left px-3 py-2 text-xs rounded-lg text-slate-300 hover:bg-white/5 hover:text-white font-semibold transition-colors cursor-pointer"
                >
                  English (EN)
                </button>
                <button
                  onClick={() => handleLanguageChange('hi')}
                  className="w-full text-left px-3 py-2 text-xs rounded-lg text-slate-300 hover:bg-white/5 hover:text-white font-semibold transition-colors cursor-pointer"
                >
                  हिंदी (HI)
                </button>
                <button
                  onClick={() => handleLanguageChange('te')}
                  className="w-full text-left px-3 py-2 text-xs rounded-lg text-slate-300 hover:bg-white/5 hover:text-white font-semibold transition-colors cursor-pointer"
                >
                  తెలుగు (TE)
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2.5 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/10 text-slate-300 hover:text-white cursor-pointer transition-all"
        >
          {theme === 'dark' ? <Sun className="w-4 h-4 text-cyber-gold" /> : <Moon className="w-4 h-4 text-cyber-blue-light" />}
        </button>

        {/* Alerts Bell Notification Icon */}
        <div className="relative">
          <button
            onClick={() => setAlertsOpen(!alertsOpen)}
            className="p-2.5 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/10 text-slate-300 hover:text-white cursor-pointer transition-all relative"
          >
            <Bell className="w-4 h-4" />
            {alerts.length > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-cyber-gold shadow-neon-gold animate-pulse" />
            )}
          </button>

          <AnimatePresence>
            {alertsOpen && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                className="absolute right-0 mt-3 w-80 sm:w-96 rounded-2xl bg-obsidian-900/95 border border-white/10 shadow-2xl z-50 backdrop-blur-glass overflow-hidden"
              >
                <div className="p-4 border-b border-white/5 flex items-center justify-between bg-obsidian-950/50">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-cyber-gold animate-bounce" />
                    <span className="font-bold text-sm text-white">{t('alertsTitle')}</span>
                  </div>
                  <span className="text-[10px] bg-cyber-gold/15 text-cyber-gold border border-cyber-gold/25 px-2 py-0.5 rounded-full font-bold">
                    {alerts.length} Insights
                  </span>
                </div>

                <div className="max-h-[320px] overflow-y-auto glass-scroll p-2 divide-y divide-white/5">
                  {alerts.length === 0 ? (
                    <div className="p-6 text-center text-slate-500 text-xs font-semibold">
                      ⚡ No new insights detected. Your wealth autopilot is stable.
                    </div>
                  ) : (
                    alerts.map((alert) => (
                      <div key={alert.id} className="p-3 hover:bg-white/5 transition-all flex gap-3 group">
                        <div className="mt-0.5 flex-shrink-0">{getAlertIcon(alert.type)}</div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <h5 className="font-bold text-xs text-slate-200 truncate">{alert.title}</h5>
                            <button
                              onClick={() => dismissAlert(alert.id)}
                              className="text-slate-500 hover:text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity ml-2"
                              title="Dismiss Alert"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">{alert.message}</p>
                          <span className="text-[9px] text-slate-600 font-medium mt-1.5 block">{alert.date}</span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>

    </header>
  );
};
