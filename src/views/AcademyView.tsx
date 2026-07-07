import React, { useState } from 'react';
import { BookOpen, Sparkles, Calculator } from 'lucide-react';
import { ResponsiveContainer, AreaChart, CartesianGrid, XAxis, YAxis, Tooltip, Area } from 'recharts';
import { AIAvatar } from '../components/AIAvatar';

interface Topic {
  id: string;
  title: string;
  category: string;
  desc: string;
  aiExplanation: string;
}

export const AcademyView: React.FC = () => {
  const [activeTopicId, setActiveTopicId] = useState<string>('sip');
  
  // SIP sandbox states
  const [sipAmount, setSipAmount] = useState('5000');
  const [returnRate, setReturnRate] = useState('12');
  const [tenureYears, setTenureYears] = useState('10');

  const topics: Topic[] = [
    {
      id: 'sip',
      title: "What is a Systematic Investment Plan (SIP)?",
      category: "Mutual Funds",
      desc: "Invest a fixed sum periodically (monthly) rather than a lump sum to build long-term wealth.",
      aiExplanation: "A **SIP** is like training your money to go to the gym every month. Instead of waiting for a large sum of cash, you invest smaller amounts (like Rs. 1,000 or Rs. 5,000) every month. This protects you from 'market timing' stress through **Rupee Cost Averaging**: when markets are down, your SIP buys more units; when markets are up, your SIP buys fewer units, smoothing out your average cost over time. The secret ingredient is **compounding**—reinvesting interest yields interest on interest over 10-20 years!"
    },
    {
      id: 'mutual-funds',
      title: "Understanding Mutual Funds",
      category: "Investments",
      desc: "Pools money from thousands of investors to buy a diversified basket of stocks and bonds.",
      aiExplanation: "Think of a **Mutual Fund** as a pre-planned picnic basket. Instead of buying individual ingredients (individual stocks like Reliance or Infosys), a professional Fund Manager gathers money from thousands of investors to buy a broad set of diversified stocks. This instantly reduces your risk because if one stock performs poorly, others in the basket balance it out. You can buy **Equity Funds** (growth), **Debt Funds** (stability), or **Hybrid Funds** (both)."
    },
    {
      id: 'tax-saving',
      title: "Tax Saving under Section 80C & ELSS",
      category: "Tax Optimization",
      desc: "Save up to Rs. 46,800 in taxes annually using Equity Linked Savings Schemes.",
      aiExplanation: "In India, the government rewards saving for the future. Under **Section 80C**, you can deduct up to Rs. 1,500,000 from your taxable income. The best instrument is **ELSS (Equity Linked Savings Scheme)**: mutual funds with a 3-year lock-in (the shortest among all tax-saving options) that grow your wealth in equity markets while shaving off your income tax bill. Other options include **PPF** (15-year risk-free) and **NPS** (National Pension System)."
    },
    {
      id: 'emergency-fund',
      title: "How to Build an Emergency Fund",
      category: "Financial Safety",
      desc: "A liquid cash reserve covering 6 months of expenses to absorb life surprises.",
      aiExplanation: "An **Emergency Fund** is your financial airbag. If you lose your job, face a medical crisis, or have urgent house repairs, this fund covers your bills so you do not have to sell investments or take high-interest credit card debt. Keep **6 months of expenses** in a high-yield savings account or liquid mutual fund. Never invest this in volatile stocks, because emergency funds must be accessible instantly."
    }
  ];

  const activeTopic = topics.find(t => t.id === activeTopicId) || topics[0];

  // Compound Interest Math for Sandbox
  const p = parseFloat(sipAmount) || 0;
  const r = (parseFloat(returnRate) || 12) / 12 / 100;
  const n = (parseFloat(tenureYears) || 10) * 12;

  const totalInvested = p * n;
  
  // Future value of SIP formula: FV = P * [ ( (1 + r)^n - 1 ) / r ] * (1 + r)
  const futureValue = r > 0 
    ? Math.round(p * (((Math.pow(1 + r, n) - 1) / r) * (1 + r)))
    : totalInvested;

  const estimatedGains = Math.max(0, futureValue - totalInvested);

  // Generate chart points
  const sandboxChartData = [];
  let tempInvested = 0;
  let tempValue = 0;
  for (let year = 1; year <= (parseInt(tenureYears, 10) || 10); year++) {
    const months = year * 12;
    tempInvested = p * months;
    tempValue = r > 0 
      ? Math.round(p * (((Math.pow(1 + r, months) - 1) / r) * (1 + r)))
      : tempInvested;
    
    sandboxChartData.push({
      name: `Yr ${year}`,
      Invested: tempInvested,
      'Maturity Value': tempValue
    });
  }

  // Formatting markdown tags
  const formatText = (text: string) => {
    return text.split('**').map((part, i) => (i % 2 === 1 ? <strong key={i} className="text-cyber-green font-extrabold">{part}</strong> : part));
  };

  return (
    <div className="space-y-6">
      
      {/* Title */}
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-white flex items-center gap-2">
          FinAura Academy <BookOpen className="w-6 h-6 text-cyber-green" />
        </h1>
        <p className="text-slate-400 text-sm mt-1">
          De-jargonize financial engineering. Try our compounding math sandbox to map compounding effects.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Articles List (4 Cols) */}
        <div className="lg:col-span-4 space-y-3">
          {topics.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTopicId(t.id)}
              className={`w-full text-left p-4 rounded-2xl border transition-all flex flex-col justify-between h-40 ${
                activeTopicId === t.id
                  ? 'bg-gradient-to-br from-cyber-green/15 to-transparent text-cyber-green border-cyber-green shadow-glass'
                  : 'bg-obsidian-900/60 border-white/5 text-slate-300 hover:border-white/10 hover:bg-white/5'
              }`}
            >
              <div className="flex justify-between items-start w-full">
                <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                  activeTopicId === t.id ? 'bg-cyber-green/20 text-cyber-green' : 'bg-white/5 text-slate-400'
                }`}>
                  {t.category}
                </span>
                <span className="text-slate-500 text-xs">Article</span>
              </div>
              <div className="mt-4 w-full">
                <h4 className="font-extrabold text-sm text-white mb-1.5 truncate">{t.title}</h4>
                <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                  {t.desc}
                </p>
              </div>
            </button>
          ))}
        </div>

        {/* Right: Active Article & Compounding Sandbox (8 Cols) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Article detail card */}
          <div className="glass-panel rounded-2xl p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyber-green/5 rounded-full blur-2xl" />
            
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-5 h-5 text-cyber-gold animate-pulse" />
              <span className="text-[10px] text-cyber-gold font-bold uppercase tracking-widest">FinAura AI explanation</span>
            </div>

            <h3 className="text-xl font-extrabold text-white mb-4">
              {activeTopic.title}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              <div className="md:col-span-7">
                <p className="text-slate-300 text-xs leading-relaxed font-medium">
                  {formatText(activeTopic.aiExplanation)}
                </p>
              </div>
              <div className="md:col-span-5 w-full">
                <AIAvatar textToSpeak={activeTopic.aiExplanation} />
              </div>
            </div>
          </div>

          {/* Interactive Calculator Sandbox */}
          <div className="glass-panel rounded-2xl p-6 space-y-6">
            <div className="flex items-center gap-2 border-b border-white/5 pb-3">
              <Calculator className="w-5 h-5 text-cyber-blue-light" />
              <div>
                <h3 className="font-extrabold text-sm text-white uppercase tracking-wider">SIP Compounding Sandbox</h3>
                <p className="text-[10px] text-slate-400">See how time and returns multiply your monthly contributions.</p>
              </div>
            </div>

            {/* Sliders / Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-400">Monthly Contribution</span>
                  <span className="text-white">Rs. {parseInt(sipAmount).toLocaleString('en-IN')}</span>
                </div>
                <input
                  type="range"
                  min="500"
                  max="100000"
                  step="500"
                  value={sipAmount}
                  onChange={(e) => setSipAmount(e.target.value)}
                  className="w-full accent-cyber-green cursor-pointer"
                />
                <div className="flex justify-between text-[9px] text-slate-600 font-mono">
                  <span>Rs. 500</span>
                  <span>Rs. 1 Lakh</span>
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-400">Rate of Return (p.a.)</span>
                  <span className="text-cyber-green">{returnRate}%</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="25"
                  step="0.5"
                  value={returnRate}
                  onChange={(e) => setReturnRate(e.target.value)}
                  className="w-full accent-cyber-green cursor-pointer"
                />
                <div className="flex justify-between text-[9px] text-slate-600 font-mono">
                  <span>5%</span>
                  <span>25%</span>
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-400">Tenure Duration</span>
                  <span className="text-white">{tenureYears} Years</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="30"
                  step="1"
                  value={tenureYears}
                  onChange={(e) => setTenureYears(e.target.value)}
                  className="w-full accent-cyber-green cursor-pointer"
                />
                <div className="flex justify-between text-[9px] text-slate-600 font-mono">
                  <span>1 Yr</span>
                  <span>30 Yrs</span>
                </div>
              </div>

            </div>

            {/* Calculations display */}
            <div className="grid grid-cols-3 gap-4 bg-obsidian-950/40 p-4 rounded-xl border border-white/5 text-center">
              <div>
                <p className="text-[10px] text-slate-500 font-semibold uppercase">Total Invested</p>
                <p className="text-xs sm:text-sm font-bold text-white mt-1">Rs. {totalInvested.toLocaleString('en-IN')}</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-500 font-semibold uppercase">Estimated Gain</p>
                <p className="text-xs sm:text-sm font-bold text-cyber-green mt-1">+Rs. {estimatedGains.toLocaleString('en-IN')}</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-500 font-semibold uppercase">Maturity Value</p>
                <p className="text-xs sm:text-sm font-bold text-cyber-gold mt-1">Rs. {futureValue.toLocaleString('en-IN')}</p>
              </div>
            </div>

            {/* Compound line chart */}
            <div className="h-60">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={sandboxChartData}>
                  <defs>
                    <linearGradient id="colorMaturity" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#F59E0B" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="name" stroke="#6B7280" style={{ fontSize: 10 }} />
                  <YAxis stroke="#6B7280" style={{ fontSize: 10 }} />
                  <Tooltip formatter={(value) => `Rs. ${Number(value).toLocaleString('en-IN')}`} />
                  <Area type="monotone" dataKey="Maturity Value" stroke="#F59E0B" fillOpacity={1} fill="url(#colorMaturity)" strokeWidth={2} />
                  <Area type="monotone" dataKey="Invested" stroke="#6B7280" fillOpacity={0.05} fill="rgba(255,255,255,0.05)" strokeWidth={1} strokeDasharray="3 3" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
