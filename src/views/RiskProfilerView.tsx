import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { ShieldCheck, ArrowRight, RefreshCw, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface QuizQuestion {
  id: number;
  text: string;
  options: { text: string; score: number }[];
}

export const RiskProfilerView: React.FC = () => {
  const { user, signup } = useAuth();
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  
  const questions: QuizQuestion[] = [
    {
      id: 1,
      text: "What is your primary investment time horizon?",
      options: [
        { text: "Short term: Under 2 years", score: 10 },
        { text: "Medium term: 2 to 5 years", score: 20 },
        { text: "Long term: Over 5 years", score: 35 }
      ]
    },
    {
      id: 2,
      text: "How would you react if your equity portfolio dropped 20% in a month due to market corrections?",
      options: [
        { text: "Panic and withdraw remaining capital to prevent further loss", score: 5 },
        { text: "Do nothing and wait for recovery", score: 20 },
        { text: "Invest more cash to buy stocks at a lower price point", score: 35 }
      ]
    },
    {
      id: 3,
      text: "Which statement best describes your current income stability?",
      options: [
        { text: "Variable: Highly volatile or self-employed commission base", score: 10 },
        { text: "Stable: Flat salary with standard annual hikes", score: 25 },
        { text: "Secure: Guaranteed income, pension, or multiple cash assets", score: 35 }
      ]
    },
    {
      id: 4,
      text: "What level of returns are you targeting with your assets?",
      options: [
        { text: "Inflation match: 5-7% returns, absolute safety is key", score: 10 },
        { text: "Moderate growth: 8-12% returns, willing to accept minor volatilities", score: 25 },
        { text: "Maximum wealth: 13%+ returns, comfortable with high volatility for gains", score: 40 }
      ]
    }
  ];

  const handleSelectOption = (score: number) => {
    const nextAnswers = [...answers, score];
    setAnswers(nextAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate final score
      const totalScore = nextAnswers.reduce((sum, s) => sum + s, 0);
      let riskProfile: 'Conservative' | 'Moderate' | 'Aggressive' = 'Moderate';
      
      if (totalScore < 50) riskProfile = 'Conservative';
      else if (totalScore >= 85) riskProfile = 'Aggressive';

      // Update profile
      if (user) {
        signup({
          ...user,
          riskProfile,
          riskScore: totalScore
        });
      }
      setQuizStarted(false);
      setCurrentQuestion(0);
      setAnswers([]);
    }
  };

  const getPersonalityBio = (profile: string) => {
    switch (profile) {
      case 'Conservative':
        return {
          title: "Wealth Defender",
          desc: "You prioritize asset preservation over aggressive gains. Volatility stresses your budget, so you prefer compounding returns through debt, government schemes, and gold.",
          color: "text-cyber-gold"
        };
      case 'Aggressive':
        return {
          title: "Growth Hunter",
          desc: "You have a long-term horizon and view market volatility as a purchasing opportunity. You seek maximum compounding and allocate heavily into equities, small-caps, and active indices.",
          color: "text-red-400"
        };
      default:
        return {
          title: "Balanced Strategist",
          desc: "You walk the middle path. You seek inflation-beating equity returns but maintain a solid debt cushion to ease market fluctuations.",
          color: "text-cyber-green"
        };
    }
  };

  const getProductRecommendations = (profile: string) => {
    const conservativeProducts = [
      { name: "Fixed Deposits (FD)", return: "7.1% p.a.", horizon: "1-3 Years", risk: "Low", reason: "Guaranteed lock-in return backed by RBI insurance up to Rs. 5 Lakhs." },
      { name: "Public Provident Fund (PPF)", return: "7.1% p.a. Tax-Free", horizon: "15 Years", risk: "Minimal", reason: "Sovereign backing, EEE tax status makes it perfect for secure long-term capital." },
      { name: "Sovereign Gold Bonds (SGB)", return: "2.5% yield + Gold price", horizon: "8 Years", risk: "Low", reason: "Hedges inflation and currency depreciation with zero storage overhead." }
    ];

    const moderateProducts = [
      { name: "Large Cap SIP Mutual Funds", return: "11-13% p.a.", horizon: "3-5 Years", risk: "Medium", reason: "Diversified exposure across India's top 100 blue-chip companies." },
      { name: "Balanced Hybrid Funds", return: "10-12% p.a.", horizon: "3+ Years", risk: "Medium", reason: "Dynamically shifts between 65% equities and 35% debt to buffer market dips." },
      { name: "Broad Market ETFs", return: "11.5% p.a.", horizon: "3+ Years", risk: "Medium", reason: "Low expense ratio, replicates Nifty 50 or Sensex index performances." }
    ];

    const aggressiveProducts = [
      { name: "Active Mid & Small Cap Mutual Funds", return: "15-18% p.a.", horizon: "5+ Years", risk: "High", reason: "Captures rapid growth in emerging corporate sectors but subject to short-term corrections." },
      { name: "Direct Equity Stock Picks", return: "Variable (15%+ target)", horizon: "5+ Years", risk: "Very High", reason: "High-conviction stakes in tech, finance, and consumer stocks." },
      { name: "Sectoral & Thematic Funds", return: "16-20% p.a.", horizon: "7+ Years", risk: "High", reason: "Focused bets on infrastructure, green energy, or digital banking transitions." }
    ];

    if (profile === 'Conservative') return conservativeProducts;
    if (profile === 'Aggressive') return aggressiveProducts;
    return moderateProducts;
  };

  const currentProfile = user?.riskProfile || 'Moderate';
  const score = user?.riskScore || 65;
  const bio = getPersonalityBio(currentProfile);
  const products = getProductRecommendations(currentProfile);

  return (
    <div className="space-y-6">
      
      {/* Title */}
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-white flex items-center gap-2">
          AI Risk Profiler & Allocation Engine <ShieldCheck className="w-6 h-6 text-cyber-green" />
        </h1>
        <p className="text-slate-400 text-sm mt-1">
          Evaluate your risk profile dynamically. The allocation engine maps your cash surplus to appropriate wealth instruments in real time.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Side: Score & Bio */}
        <div className="lg:col-span-4 space-y-6">
          
          <div className="glass-panel rounded-2xl p-6 space-y-6 relative overflow-hidden">
            <div className="absolute top-[-10%] right-[-10%] w-32 h-32 bg-cyber-green/5 rounded-full blur-[40px]" />
            
            <div className="text-center">
              <h3 className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-2">My Risk Score</h3>
              <div className="inline-flex items-center justify-center p-6 rounded-full bg-white/5 border border-white/10 shadow-glass mb-4">
                <span className="text-5xl font-black text-white">{score}</span>
                <span className="text-xs text-slate-500 font-semibold mt-4">/100</span>
              </div>
              <h4 className={`text-xl font-extrabold ${bio.color}`}>{bio.title}</h4>
              <span className="text-[10px] bg-white/5 text-slate-400 border border-white/5 px-2 py-0.5 rounded-full mt-2 inline-block font-bold">
                {currentProfile} Tier
              </span>
            </div>

            <div className="border-t border-white/5 pt-4">
              <p className="text-xs text-slate-300 leading-relaxed text-center font-medium">
                {bio.desc}
              </p>
            </div>

            <button
              onClick={() => {
                setQuizStarted(true);
                setCurrentQuestion(0);
                setAnswers([]);
              }}
              className="w-full glass-btn-secondary py-2.5 text-xs font-extrabold flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Re-Evaluate Risk Appetite
            </button>
          </div>

        </div>

        {/* Right Side: Quiz or Recommendations */}
        <div className="lg:col-span-8">
          
          <AnimatePresence mode="wait">
            
            {quizStarted ? (
              // Quiz Active View
              <motion.div
                key="quiz"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="glass-panel rounded-2xl p-6 min-h-[380px] flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-center text-xs text-slate-400 font-semibold mb-6">
                    <span>RISK ASSESSMENT INTERVIEW</span>
                    <span>Q. {currentQuestion + 1} OF {questions.length}</span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-6 leading-relaxed">
                    {questions[currentQuestion].text}
                  </h3>

                  <div className="space-y-3">
                    {questions[currentQuestion].options.map((opt, i) => (
                      <button
                        key={i}
                        onClick={() => handleSelectOption(opt.score)}
                        className="w-full text-left p-4 rounded-xl bg-obsidian-900 border border-white/5 hover:border-cyber-green/40 hover:bg-white/5 text-xs font-semibold text-slate-200 transition-all flex justify-between items-center group cursor-pointer"
                      >
                        <span>{opt.text}</span>
                        <ArrowRight className="w-4 h-4 text-cyber-green opacity-0 group-hover:opacity-100 transition-all transform translate-x-[-4px] group-hover:translate-x-0" />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden mt-6">
                  <div
                    className="h-full bg-cyber-green rounded-full transition-all"
                    style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                  />
                </div>
              </motion.div>
            ) : (
              // Product Recommendations View
              <motion.div
                key="results"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <div className="glass-panel rounded-2xl p-5 bg-obsidian-900/60 flex items-center justify-between">
                  <span className="font-extrabold text-sm text-white uppercase tracking-wider">
                    Recommended Asset Mix: {currentProfile} portfolio
                  </span>
                  <div className="flex items-center gap-1 text-xs text-cyber-green font-bold">
                    <Info className="w-4 h-4" /> Auto-updates with goals
                  </div>
                </div>

                {products.map((p, idx) => (
                  <div
                    key={idx}
                    className="glass-panel rounded-2xl p-5 hover:border-white/10 transition-all relative overflow-hidden group"
                  >
                    <div className="absolute top-0 right-0 w-2 h-full bg-cyber-green opacity-20 group-hover:opacity-40 transition-opacity" />

                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="w-7 h-7 rounded-lg bg-cyber-green/10 flex items-center justify-center text-cyber-green text-xs font-bold">
                            {idx + 1}
                          </span>
                          <h4 className="font-extrabold text-base text-white">{p.name}</h4>
                        </div>
                        <p className="text-xs text-slate-400 leading-normal max-w-xl">
                          {p.reason}
                        </p>
                      </div>

                      <div className="grid grid-cols-3 md:flex md:flex-col gap-4 text-center md:text-right border-t border-white/5 pt-3 md:border-0 md:pt-0">
                        <div>
                          <p className="text-[10px] text-slate-500 font-semibold uppercase">Expected Yield</p>
                          <p className="text-sm font-bold text-cyber-green">{p.return}</p>
                        </div>
                        <div>
                          <p className="text-[10px] text-slate-500 font-semibold uppercase">Min Horizon</p>
                          <p className="text-sm font-bold text-white">{p.horizon}</p>
                        </div>
                        <div>
                          <p className="text-[10px] text-slate-500 font-semibold uppercase">Risk Level</p>
                          <p className={`text-sm font-bold ${p.risk === 'High' || p.risk === 'Very High' ? 'text-red-400' : 'text-cyber-green'}`}>
                            {p.risk}
                          </p>
                        </div>
                      </div>

                    </div>
                  </div>
                ))}

              </motion.div>
            )}

          </AnimatePresence>

        </div>

      </div>

    </div>
  );
};
