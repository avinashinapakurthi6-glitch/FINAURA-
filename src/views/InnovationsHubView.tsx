import React, { useState } from 'react';
import { useWealth } from '../context/WealthContext';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import {
  Award,
  Zap,
  Calendar,
  Leaf,
  UserCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Multilingual translations dictionary
const PLAN_TRANSLATIONS = {
  sweep: {
    name: {
      en: "Aura Sweep Fixed Deposit",
      hi: "ऑरा स्वीप फिक्स्ड डिपॉजिट",
      te: "ఆరా స్వీప్ ఫిక్స్‌డ్ డిపాజిట్"
    },
    category: {
      en: "Liquid Sweep Plan",
      hi: "लिक्विड स्वीप योजना",
      te: "లిక్విడ్ స్వీప్ ప్లాన్"
    },
    speech: {
      en: "Hi! The Sweep FD automatically moves any balance above Rs. 25,000 into high-yield deposits. On your balance, it will generate an extra Rs. 15,620 this year, with 100% liquidity!",
      hi: "नमस्ते! स्वीप एफडी 25,000 रुपये से अधिक की राशि को उच्च-ब्याज एफडी में स्वचालित रूप से स्थानांतरित करती है। आपके बैलेंस पर, यह इस साल 15,620 रुपये अतिरिक्त ब्याज उत्पन्न करेगा, 100% तरलता के साथ!",
      te: "నమస్తే! స్వీప్ ఎఫ్‌డి 25,000 రూపాయల కంటే ఎక్కువ ఉన్న మొత్తాన్ని ఆటోమేటిక్‌గా ఎఫ్‌డి లోకి మారుస్తుంది. మీ బ్యాలెన్స్‌పై, ఇది ఈ సంవత్సరం అదనంగా 15,620 రూపాయల లాభాన్ని ఇస్తుంది, 100% లిక్విడిటీతో!"
    }
  },
  rd: {
    name: {
      en: "Cyber Recurring Deposit",
      hi: "साइबर आवर्ती जमा (RD)",
      te: "సైబర్ రికరింగ్ డిపాజిట్"
    },
    category: {
      en: "Automated Saving",
      hi: "स्वचालित बचत",
      te: "ఆటోమేటిక్ సేవింగ్స్"
    },
    speech: {
      en: "Excellent low-risk choice! Dedicating Rs. 10,000 monthly on salary-day builds a secure reserve. Over your tenure, my compounding logs project a massive growth multiplier compared to ordinary bank accounts.",
      hi: "उत्कृष्ट कम जोखिम वाला विकल्प! वेतन के दिन 10,000 रुपये मासिक जमा करने से एक सुरक्षित कोष बनता है। साधारण बैंक खातों की तुलना में मेरे कंपाउंडिंग चार्ट अत्यधिक वृद्धि दर्शाते हैं।",
      te: "చక్కని తక్కువ రిస్క్ ఎంపిక! ప్రతి నెలా శాలరీ రోజున 10,000 రూపాయలు డిపాజిట్ చేయడం ద్వారా ఒక బలమైన అత్యవసర నిధి ఏర్పడుతుంది. సాధారణ బ్యాంకు ఖాతాలతో పోలిస్తే ఇది అత్యంత వేగంగా పెరుగుతుంది."
    }
  },
  sgb: {
    name: {
      en: "Gold Vault Sovereign Bond",
      hi: "गोल्ड वॉल्ट सॉवरेन बॉन्ड",
      te: "గోల్డ్ వాల్ట్ సావరేన్ బాండ్"
    },
    category: {
      en: "Sovereign Hedge",
      hi: "सॉवरेन हेज योजना",
      te: "సావరేన్ హెడ్జ్ ప్లాన్"
    },
    speech: {
      en: "Perfect hedge! Government gold bonds pay you a fixed 2.5% p.a. interest plus 100% tax-free capital appreciation. Highly recommended matching your risk profile.",
      hi: "उत्कृष्ट सुरक्षा! सरकारी स्वर्ण बांड आपको 2.5% प्रति वर्ष ब्याज और 100% कर-मुक्त पूंजी वृद्धि प्रदान करते हैं। यह आपके मध्यम जोखिम प्रोफाइल के लिए सबसे अनुकूल है।",
      te: "అద్భుతమైన రక్షణ! ప్రభుత్వ బంగారు బాండ్లు మీకు సంవత్సరానికి 2.5% వడ్డీతో పాటు 100% పన్ను రహిత మూలధన వృద్ధిని అందిస్తాయి. మీ రిస్క్ ప్రొఫైల్‌కు ఇది చాలా సరిపోతుంది."
    }
  },
  default: {
    speech: {
      en: "Hi! Adjust the sliders, or select a banking plan below. Compounding your surplus will generate high returns. Let's secure your net worth!",
      hi: "नमस्ते! नीचे दिए गए स्लाइडर्स को समायोजित करें, या बैंकिंग योजना चुनें। आपके सरप्लस को कंपाउंड करने से उच्च रिटर्न मिलेगा। आइए आपकी कुल संपत्ति सुरक्षित करें!",
      te: "నమస్తే! కింద ఉన్న స్లైడర్లను మార్చండి, లేదా బ్యాంకింగ్ ప్లాన్ ఎంచుకోండి. మీ మిగులును చక్రవడ్డీతో పెంచడం ద్వారా అధిక లాభాలు వస్తాయి. మీ నికర విలువను పెంచుకుందాం!"
    }
  }
};

const LABELS = {
  title: { en: "AI Financial Twin", hi: "एआई वित्तीय जुड़वां", te: "AI ఫైనాన్షియల్ ట్విన్" },
  sub: { en: "Holo-Twin Message", hi: "होलो-ट्विन संदेश", te: "హోలో-ట్విన్ సందేశం" },
  simTitle: { en: "What-If Wealth Simulator", hi: "व्हाट-इफ वेल्थ सिम्युलेटर", te: "వాట్-ఇఫ్ సంపద సిమ్యులేటర్" },
  monthlyCont: { en: "Monthly Contribution", hi: "मासिक योगदान", te: "నెలవారీ సహకారం" },
  horizon: { en: "Time Horizon", hi: "समय सीमा", te: "కాల పరిమితి" },
  targetRate: { en: "Target Return Rate", hi: "लक्ष्य रिटर्न दर", te: "లక్ష్య రిటర్న్ రేట్" },
  compValue: { en: "Twin Portfolio (Compounded)", hi: "ट्विन पोर्टफोलियो (कंपाउंडेड)", te: "ట్విన్ పోర్ట్‌ఫోలియో (చక్రవడ్డీ)" },
  basicValue: { en: "Standard Cash Account", hi: "साधारण बचत खाता", te: "సాధారణ సేవింగ్స్ ఖాతా" },
  sugTitle: { en: "Avatar Banking Plan Suggester", hi: "अवतार बैंकिंग योजना सलाहकार", te: "అవతార్ బ్యాంకింగ్ ప్లాన్ సలహాదారు" },
  sugDesc: { en: "Select a recommended high-yield banking product to instruct your Twin avatar clone.", hi: "अपने ट्विन क्लोन को निर्देशित करने के लिए अनुशंसित उच्च-ब्याज बैंकिंग योजना चुनें।", te: "మీ ట్విన్ అవతార్ క్లోన్‌కు సూచించడానికి సిఫార్సు చేయబడిన అధిక-లాభాల బ్యాంకింగ్ ఉత్పత్తిని ఎంచుకోండి." },
  yieldText: { en: "Yield", hi: "रिटर्न दर", te: "రిటర్న్ రేట్" },
  selectText: { en: "Select", hi: "चुनें", te: "ఎంచుకోండి" },
  summaryText: { en: "Yield Summary:", hi: "रिटर्न सारांश:", te: "రిటర్న్ సారాంశం:" },
  years: { en: "years", hi: "वर्ष", te: "సంవత్సరాలు" },
  authorizeBtn: { en: "Authorize Twin Automation", hi: "ट्विन ऑटोमेशन को अधिकृत करें", te: "ట్విన్ ఆటోమేషన్ను అనుమतించు" }
};

export const InnovationsHubView: React.FC = () => {
  const { user } = useAuth();
  const { investments, streakDays, carbonScore, badges, incrementStreak } = useWealth();
  const { language } = useLanguage();

  const [activeTab, setActiveTab] = useState<'twin' | 'life-events' | 'carbon'>('twin');
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speakingTimer, setSpeakingTimer] = useState<any>(null);

  // AI Twin Sliders
  const [twinSip, setTwinSip] = useState('5000');
  const [twinYears, setTwinYears] = useState('10');
  const [twinReturn, setTwinReturn] = useState('12');

  // Calculations for Financial Twin
  const p = parseFloat(twinSip) || 0;
  const t = parseInt(twinYears, 10) || 10;
  const r = (parseFloat(twinReturn) || 12) / 100 / 12;
  const n = t * 12;

  // FV of SIP: P * [((1 + r)^n - 1) / r] * (1 + r)
  const compoundTwinValue = Math.round(
    p * (((Math.pow(1 + r, n) - 1) / r) * (1 + r))
  );

  // Compare standard cash (stored in typical low-yield account at 3.5%)
  const rBasic = 0.035 / 12;
  const compoundBasicValue = Math.round(
    p * (((Math.pow(1 + rBasic, n) - 1) / rBasic) * (1 + rBasic))
  );

  // Life Event Projections based on age
  const userAge = user?.age || 32;
  const lifeEvents = [
    { name: "Cyber EV vehicle Upgrade", targetAge: userAge + 2, estimatedBudget: 1500000, desc: "Downpayment & loan amortization for zero-emission EV.", status: investments > 500000 ? "On Track" : "Action Needed" },
    { name: "Family Vacation (Europe)", targetAge: userAge + 4, estimatedBudget: 600000, desc: "Flights, accommodation, and currency buffer.", status: "On Track" },
    { name: "Child Higher Education", targetAge: userAge + 12, estimatedBudget: 3500000, desc: "Premium degree tuition, adjusted for 6% annual inflation.", status: "Review Pacing" },
    { name: "Retirement Phase Out", targetAge: 60, estimatedBudget: 25000000, desc: "Perpetual payout fund to sustain lifestyle.", status: "Review Pacing" }
  ];

  // Banking Plans array (multilingual responsive)
  const getBankingPlans = () => {
    const lang = language as 'en' | 'hi' | 'te';
    return [
      {
        id: 'sweep',
        name: PLAN_TRANSLATIONS.sweep.name[lang],
        category: PLAN_TRANSLATIONS.sweep.category[lang],
        yield: '7.1',
        suggestedSip: '15000',
        avatarSpeech: PLAN_TRANSLATIONS.sweep.speech[lang]
      },
      {
        id: 'rd',
        name: PLAN_TRANSLATIONS.rd.name[lang],
        category: PLAN_TRANSLATIONS.rd.category[lang],
        yield: '7.4',
        suggestedSip: '10000',
        avatarSpeech: PLAN_TRANSLATIONS.rd.speech[lang]
      },
      {
        id: 'sgb',
        name: PLAN_TRANSLATIONS.sgb.name[lang],
        category: PLAN_TRANSLATIONS.sgb.category[lang],
        yield: '2.5',
        suggestedSip: '5000',
        avatarSpeech: PLAN_TRANSLATIONS.sgb.speech[lang]
      }
    ];
  };

  const bankingPlans = getBankingPlans();

  // Get current avatar text based on active states & selected language
  const getAvatarSpeechText = () => {
    const lang = language as 'en' | 'hi' | 'te';
    if (selectedPlanId) {
      const activePlan = bankingPlans.find(p => p.id === selectedPlanId);
      if (activePlan) return activePlan.avatarSpeech;
    }
    return PLAN_TRANSLATIONS.default.speech[lang];
  };

  const getLabel = (key: keyof typeof LABELS) => {
    const lang = language as 'en' | 'hi' | 'te';
    return LABELS[key][lang];
  };

  // Render holographic avatar outline with ANIMATED SVG Advisor Face
  const renderTwinAvatar = () => (
    <div className={`w-full max-w-[260px] aspect-square rounded-full border bg-cyber-green/5 relative flex flex-col items-center justify-center overflow-hidden transition-all duration-500 ${
      isSpeaking ? 'speaking-active border-cyber-gold/40 shadow-neon-gold bg-cyber-gold/5' : 'border-cyber-green/30 pulse-glow-green'
    }`}>
      
      {/* Keyframe animation styles injection */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes eyeblink {
          0%, 90%, 100% { transform: scaleY(1); }
          95% { transform: scaleY(0.1); }
        }
        @keyframes sonicwave {
          0%, 100% { height: 4px; opacity: 0.4; }
          50% { height: 18px; opacity: 1; }
        }
        @keyframes speak {
          0%, 100% { transform: scaleY(1); }
          50% { transform: scaleY(4.5); }
        }
        .avatar-eye {
          animation: eyeblink 4s infinite ease-in-out;
          transform-origin: center;
        }
        .sonic-bar {
          animation: sonicwave 1.2s infinite ease-in-out;
        }
        .speaking-active .sonic-bar {
          animation: sonicwave 0.3s infinite ease-in-out !important;
        }
        .speaking-active .avatar-mouth {
          animation: speak 0.2s infinite ease-in-out;
          transform-origin: 50px 46px;
        }
      `}} />

      {/* Futuristic Grid Scanner laser line */}
      <motion.div
        animate={{ y: [-130, 130, -130] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        className="absolute w-full h-0.5 bg-cyber-green/60 shadow-neon-green z-0"
      />
      
      {/* Holo grid gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-obsidian-950/20 to-obsidian-950" />

      {/* SVG ANIMATED AVATAR FACE */}
      <svg className={`w-24 h-24 z-10 transition-all duration-300 ${isSpeaking ? 'text-cyber-gold drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]' : 'text-cyber-green drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]'}`} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Outer head rim */}
        <circle cx="50" cy="50" r="44" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
        {/* Futuristic visor/helmet shell */}
        <path d="M22 45C22 35 32 25 50 25C68 25 78 35 78 45C78 47 75 52 70 52H30C25 52 22 47 22 45Z" fill="rgba(16, 185, 129, 0.08)" stroke="currentColor" strokeWidth="2" />
        {/* Left Glowing Eye */}
        <ellipse className="avatar-eye" cx="38" cy="40" rx="4" ry="4" fill="currentColor" />
        {/* Right Glowing Eye */}
        <ellipse className="avatar-eye" cx="62" cy="40" rx="4" ry="4" fill="currentColor" />
        {/* Digital Visor mouth */}
        <ellipse className="avatar-mouth" cx="50" cy="46" rx="6" ry="1" fill="currentColor" />
        {/* Digital Visor scanner overlay */}
        <path d="M26 40H74" stroke="rgba(16, 185, 129, 0.4)" strokeWidth="1" />
        {/* Cybernetic Neck/collar */}
        <path d="M42 70L45 78H55L58 70" stroke="currentColor" strokeWidth="1.5" />
        {/* Audio sensor node */}
        <circle cx="50" cy="82" r="2.5" fill="#F59E0B" className="animate-ping" />
      </svg>

      {/* Speech Audio frequency visualizer wave bars (bounces when active) */}
      <div className="flex items-end justify-center gap-1 h-5 mt-4 z-10 w-24">
        <div className={`w-1.5 rounded-full sonic-bar ${isSpeaking ? 'bg-cyber-gold' : 'bg-cyber-green'}`} style={{ animationDelay: '0.1s' }} />
        <div className={`w-1.5 rounded-full sonic-bar ${isSpeaking ? 'bg-cyber-gold' : 'bg-cyber-green'}`} style={{ animationDelay: '0.3s' }} />
        <div className="w-1.5 bg-cyber-gold rounded-full sonic-bar" style={{ animationDelay: '0.5s' }} />
        <div className={`w-1.5 rounded-full sonic-bar ${isSpeaking ? 'bg-cyber-gold' : 'bg-cyber-green'}`} style={{ animationDelay: '0.2s' }} />
        <div className={`w-1.5 rounded-full sonic-bar ${isSpeaking ? 'bg-cyber-gold' : 'bg-cyber-green'}`} style={{ animationDelay: '0.4s' }} />
      </div>

      <div className="text-center mt-3 z-10">
        <span className={`text-[10px] font-black tracking-widest uppercase transition-colors ${isSpeaking ? 'text-cyber-gold' : 'text-cyber-green'}`}>
          {isSpeaking ? 'Twin Speaking' : 'FIN-AURA V1.4'}
        </span>
        <div className="text-[8px] text-slate-400 font-mono mt-0.5">{user?.fullName.split(' ')[0]}'s Advisor Clone</div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      
      {/* Title */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white flex items-center gap-2">
            Innovations Hub <Zap className="w-6 h-6 text-cyber-gold animate-bounce" />
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Exclusive hackathon sandbox. Simulate scenarios with your AI Financial Twin or audit carbon spending.
          </p>
        </div>
      </div>

      {/* Tab Selectors */}
      <div className="flex gap-2 border-b border-white/5 pb-2">
        <button
          onClick={() => setActiveTab('twin')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all relative ${
            activeTab === 'twin' ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          {getLabel('title')}
        </button>
        <button
          onClick={() => setActiveTab('life-events')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all relative ${
            activeTab === 'life-events' ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          AI Life Event Predictor
        </button>
        <button
          onClick={() => setActiveTab('carbon')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all relative ${
            activeTab === 'carbon' ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Carbon Footprint Insights
        </button>
      </div>

      <AnimatePresence mode="wait">
        
        {/* TAB 1: AI FINANCIAL TWIN */}
        {activeTab === 'twin' && (
          <motion.div
            key="twin"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-6"
          >
            {/* Hologram Avatar (4 Cols) */}
            <div className="lg:col-span-4 glass-panel rounded-2xl p-6 flex flex-col items-center justify-center gap-6 relative">
              <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(rgba(16,185,129,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.01)_1px,transparent_1px)] bg-[size:10px_10px]" />
              {renderTwinAvatar()}
              <div className="text-center space-y-1.5 z-10 px-2 w-full">
                <h4 className="text-xs font-extrabold text-cyber-green uppercase tracking-wider">{getLabel('sub')}</h4>
                <p className="text-[11px] text-slate-300 leading-normal bg-obsidian-950/60 p-3.5 rounded-xl border border-white/5 text-left font-medium min-h-[90px]">
                  "{getAvatarSpeechText()}"
                </p>
              </div>
            </div>

            {/* Twin Controls, Simulator & Plan Suggester (8 Cols) */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Simulator Sliders */}
              <div className="glass-panel rounded-2xl p-6 space-y-6">
                <h3 className="font-extrabold text-sm text-white uppercase tracking-wider flex items-center gap-2">
                  <UserCheck className="w-4.5 h-4.5 text-cyber-green" /> {getLabel('simTitle')}
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-slate-400">{getLabel('monthlyCont')}</span>
                      <span className="text-white">Rs. {parseInt(twinSip).toLocaleString('en-IN')}</span>
                    </div>
                    <input
                      type="range"
                      min="1000"
                      max="100000"
                      step="1000"
                      value={twinSip}
                      onChange={(e) => setTwinSip(e.target.value)}
                      className="w-full accent-cyber-green cursor-pointer"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-slate-400">{getLabel('horizon')}</span>
                      <span className="text-white">{twinYears} {getLabel('years')}</span>
                    </div>
                    <input
                      type="range"
                      min="2"
                      max="25"
                      step="1"
                      value={twinYears}
                      onChange={(e) => setTwinYears(e.target.value)}
                      className="w-full accent-cyber-green cursor-pointer"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-slate-400">{getLabel('targetRate')}</span>
                      <span className="text-cyber-green">{twinReturn}%</span>
                    </div>
                    <input
                      type="range"
                      min="2"
                      max="20"
                      step="0.5"
                      value={twinReturn}
                      onChange={(e) => setTwinReturn(e.target.value)}
                      className="w-full accent-cyber-green cursor-pointer"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 bg-obsidian-950/40 p-4 rounded-xl border border-white/5 text-center text-xs">
                  <div>
                    <span className="text-slate-500 font-semibold uppercase">{getLabel('compValue')}</span>
                    <p className="text-base font-black text-cyber-green mt-1">Rs. {compoundTwinValue.toLocaleString('en-IN')}</p>
                  </div>
                  <div>
                    <span className="text-slate-500 font-semibold uppercase">{getLabel('basicValue')}</span>
                    <p className="text-base font-black text-slate-300 mt-1">Rs. {compoundBasicValue.toLocaleString('en-IN')}</p>
                  </div>
                </div>
              </div>

              {/* Avatar Banking Plan Suggester */}
              <div className="glass-panel rounded-2xl p-6 space-y-4">
                <h3 className="font-extrabold text-sm text-white uppercase tracking-wider flex items-center gap-2">
                  <Award className="w-4.5 h-4.5 text-cyber-gold" /> {getLabel('sugTitle')}
                </h3>
                <p className="text-xs text-slate-400">
                  {getLabel('sugDesc')}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {bankingPlans.map((plan) => (
                    <button
                      key={plan.id}
                      onClick={() => {
                        setSelectedPlanId(plan.id);
                        setTwinSip(plan.suggestedSip);
                        setTwinReturn(plan.yield);
                        
                        // Authorize speaking states
                        if (speakingTimer) clearTimeout(speakingTimer);
                        setIsSpeaking(true);
                        const timer = setTimeout(() => {
                          setIsSpeaking(false);
                        }, 5000);
                        setSpeakingTimer(timer);
                      }}
                      className={`p-4 rounded-xl border text-left transition-all flex flex-col justify-between h-36 cursor-pointer ${
                        selectedPlanId === plan.id
                          ? 'bg-gradient-to-br from-cyber-green/10 to-transparent border-cyber-green shadow-neon-green'
                          : 'bg-obsidian-900/60 border-white/5 hover:border-white/15'
                      }`}
                    >
                      <div>
                        <span className="text-slate-500 text-[9px] uppercase font-bold tracking-wider">{plan.category}</span>
                        <h4 className="font-bold text-xs text-white mt-1 leading-snug">{plan.name}</h4>
                      </div>
                      <div className="flex justify-between items-end mt-4">
                        <div>
                          <p className="text-[9px] text-slate-500 uppercase">{getLabel('yieldText')}</p>
                          <p className="text-xs font-black text-cyber-green">{plan.yield}% p.a.</p>
                        </div>
                        <span className="text-[10px] text-cyber-gold font-bold">{getLabel('selectText')} &rarr;</span>
                      </div>
                    </button>
                  ))}
                </div>

                {selectedPlanId && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-xl bg-obsidian-950/60 border border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div>
                      <h4 className="font-extrabold text-xs text-white">
                        {bankingPlans.find((p) => p.id === selectedPlanId)?.name} {getLabel('summaryText')}
                      </h4>
                      <p className="text-[11px] text-slate-400 mt-1">
                        Allocating Rs. {parseInt(twinSip).toLocaleString('en-IN')}/month for {twinYears} {getLabel('years')} will yield approx. **Rs. {compoundTwinValue.toLocaleString('en-IN')}**.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        alert(
                          language === 'hi'
                            ? `बैंकिंग निर्देश अधिकृत किए गए! हमने आपके बचत खाते से ${bankingPlans.find(p => p.id === selectedPlanId)?.name} को स्वचालित कर दिया है।`
                            : language === 'te'
                            ? `బ్యాంకింగ్ సూచనలు విజయవంతంగా అమలయ్యాయి! మీ ఖాతా నుండి ${bankingPlans.find(p => p.id === selectedPlanId)?.name} ఆటోమేట్ చేయబడింది.`
                            : `Banking instructions authorized! We have automated the ${bankingPlans.find(p => p.id === selectedPlanId)?.name} from your savings account.`
                        );
                        incrementStreak();
                      }}
                      className="px-4 py-2.5 rounded-xl bg-cyber-green text-obsidian-950 font-extrabold text-xs hover:bg-cyber-green-light transition-all flex-shrink-0 cursor-pointer hover:shadow-neon-green"
                    >
                      {getLabel('authorizeBtn')}
                    </button>
                  </motion.div>
                )}
              </div>

            </div>
          </motion.div>
        )}

        {/* TAB 2: AI LIFE EVENT PREDICTOR */}
        {activeTab === 'life-events' && (
          <motion.div
            key="life-events"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="glass-panel rounded-2xl p-6"
          >
            <div className="flex items-center gap-2 border-b border-white/5 pb-3 mb-6">
              <Calendar className="w-5 h-5 text-cyber-blue-light" />
              <div>
                <h3 className="font-extrabold text-sm text-white uppercase tracking-wider">AI Life Event Predictor Timeline</h3>
                <p className="text-[10px] text-slate-400">Predicted financial checkpoints based on age ({userAge}), occupation, and statistics.</p>
              </div>
            </div>

            <div className="relative pl-6 border-l border-white/10 space-y-6 ml-2">
              {lifeEvents.map((evt, idx) => (
                <div key={idx} className="relative group">
                  {/* node marker */}
                  <span className="absolute left-[-31px] top-1.5 w-2.5 h-2.5 rounded-full bg-cyber-blue-light group-hover:scale-125 transition-transform shadow-neon-blue" />
                  
                  <div className="p-4 rounded-xl bg-obsidian-900/60 border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-extrabold text-xs text-white">{evt.name}</h4>
                        <span className="text-[9px] bg-white/5 text-slate-400 px-1.5 py-0.2 rounded font-mono">Age {evt.targetAge}</span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-1 leading-relaxed max-w-xl">{evt.desc}</p>
                    </div>

                    <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center border-t sm:border-0 border-white/5 pt-2 sm:pt-0">
                      <div>
                        <p className="text-[9px] text-slate-500 font-semibold uppercase">Estimated Budget</p>
                        <p className="text-xs font-black text-cyber-gold">Rs. {evt.estimatedBudget.toLocaleString('en-IN')}</p>
                      </div>
                      <span className={`text-[9px] font-bold px-2 py-0.5 rounded mt-1.5 ${
                        evt.status === 'On Track' ? 'bg-cyber-green/10 text-cyber-green' : 'bg-cyber-gold/10 text-cyber-gold'
                      }`}>
                        {evt.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* TAB 3: CARBON FOOTPRINT */}
        {activeTab === 'carbon' && (
          <motion.div
            key="carbon"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-6"
          >
            {/* Score ring */}
            <div className="lg:col-span-5 glass-panel rounded-2xl p-6 flex flex-col justify-between items-center text-center relative overflow-hidden">
              <div className="absolute top-[-10%] right-[-10%] w-32 h-32 bg-cyber-green/5 rounded-full blur-[45px]" />
              
              <div>
                <h3 className="text-xs font-extrabold text-white uppercase tracking-wider flex items-center gap-1.5 justify-center">
                  <Leaf className="w-4 h-4 text-cyber-green animate-pulse" />
                  Eco-Spending Index
                </h3>
                <p className="text-[10px] text-slate-400 mt-1">Calculated from green merchants (e.g. electric grid, transit) vs high emissions.</p>
              </div>

              <div className="relative w-28 h-28 flex items-center justify-center my-6">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="56" cy="56" r="46" className="stroke-white/5 fill-transparent" strokeWidth="8" />
                  <circle
                    cx="56"
                    cy="56"
                    r="46"
                    className="stroke-cyber-green fill-transparent transition-all duration-1000"
                    strokeWidth="8"
                    strokeDasharray="289"
                    strokeDashoffset={289 - (289 * carbonScore) / 100}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className="text-2xl font-black text-white">{carbonScore}</span>
                  <span className="text-[8px] uppercase tracking-widest text-cyber-green font-bold">Carbon Rating</span>
                </div>
              </div>

              <div className="bg-cyber-green/5 border border-cyber-green/20 p-3 rounded-xl w-full">
                <p className="text-[11px] text-slate-300 leading-normal font-medium">
                  Your carbon ranking is **Excellent (top 8%)** in the software professional category.
                </p>
              </div>
            </div>

            {/* Achievements & Gamification (7 Cols) */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Badges showcase */}
              <div className="glass-panel rounded-2xl p-6">
                <h3 className="font-extrabold text-sm text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Award className="w-4.5 h-4.5 text-cyber-gold" /> Unlocked Financial Badges
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {badges.map((badge) => (
                    <div
                      key={badge}
                      className="p-3 rounded-xl bg-obsidian-900 border border-white/5 flex flex-col items-center justify-center text-center space-y-2 group hover:border-cyber-gold/40 transition-all"
                    >
                      <span className="text-2xl group-hover:scale-110 transition-transform">🏆</span>
                      <p className="text-xs font-bold text-slate-200">{badge}</p>
                      <span className="text-[9px] text-slate-500 font-semibold">Active</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Streaks Card */}
              <div className="glass-panel rounded-2xl p-6 bg-gradient-to-br from-obsidian-900 to-obsidian-950 flex justify-between items-center">
                <div>
                  <h4 className="font-extrabold text-sm text-white uppercase">Wealth Wellness Streak</h4>
                  <p className="text-[11px] text-slate-400 mt-1">Earned by investing 30% of income over successive months.</p>
                </div>
                <div className="text-center">
                  <span className="text-3xl font-black text-cyber-gold block">🔥 {streakDays}</span>
                  <span className="text-[9px] text-slate-500 uppercase tracking-widest font-bold">Months Streak</span>
                </div>
              </div>

            </div>
          </motion.div>
        )}

      </AnimatePresence>

    </div>
  );
};
