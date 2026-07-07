import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { WealthProvider } from './context/WealthContext';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { AuthView } from './views/AuthView';
import { DashboardView } from './views/DashboardView';
import { AIAdvisorView } from './views/AIAdvisorView';
import { GoalPlannerView } from './views/GoalPlannerView';
import { RiskProfilerView } from './views/RiskProfilerView';
import { TransactionAnalysisView } from './views/TransactionAnalysisView';
import { InnovationsHubView } from './views/InnovationsHubView';
import { AcademyView } from './views/AcademyView';
import { AdminPortalView } from './views/AdminPortalView';
import { motion, AnimatePresence } from 'framer-motion';

const MainApp: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const [currentView, setView] = useState<string>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  if (isLoading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-obsidian-950">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full border-4 border-t-cyber-green border-white/10 animate-spin" />
          <p className="text-slate-400 text-xs font-semibold uppercase tracking-widest">FinAura Encrypted Link...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AuthView />;
  }

  const renderActiveView = () => {
    switch (currentView) {
      case 'dashboard':
        return <DashboardView />;
      case 'ai-advisor':
        return <AIAdvisorView />;
      case 'goal-planner':
        return <GoalPlannerView />;
      case 'risk-profiler':
        return <RiskProfilerView />;
      case 'transaction-analysis':
        return <TransactionAnalysisView />;
      case 'innovations':
        return <InnovationsHubView />;
      case 'academy':
        return <AcademyView />;
      case 'admin':
        return <AdminPortalView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="min-h-screen flex bg-obsidian-950 overflow-x-hidden">
      {/* Navigation Sidebar Drawer */}
      <Sidebar
        currentView={currentView}
        setView={setView}
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
      />

      {/* Main Panel Viewport */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">
        <Header setSidebarOpen={setSidebarOpen} />
        
        {/* Page Inner Container */}
        <main className="flex-1 p-4 md:p-6 pb-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentView}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
            >
              {renderActiveView()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <WealthProvider>
            <MainApp />
          </WealthProvider>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
