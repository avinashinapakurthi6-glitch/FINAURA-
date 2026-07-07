import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'hi' | 'te';

interface Translations {
  [key: string]: {
    en: string;
    hi: string;
    te: string;
  };
}

export const translations: Translations = {
  // Navigation
  dashboard: { en: 'Dashboard', hi: 'डैशबोर्ड', te: 'డ్యాష్‌బోర్డ్' },
  aiAdvisor: { en: 'AI Advisor', hi: 'एआई सलाहकार', te: 'AI సలహాదారు' },
  wealthPlanner: { en: 'Goal Planner', hi: 'लक्ष्य योजनाकार', te: 'లక్ష్య ప్రణాళికాకర్త' },
  riskProfiling: { en: 'Risk Profiler', hi: 'जोखिम मूल्यांकन', te: 'రిస్క్ ప్రొఫైలింగ్' },
  transactionAnalysis: { en: 'AI Analyzer', hi: 'एआई विश्लेषक', te: 'AI విశ్లేషకుడు' },
  innovations: { en: 'Innovations', hi: 'नवाचार', te: 'ఆవిష్కరణలు' },
  admin: { en: 'Admin', hi: 'एडमिन', te: 'అడ్మిన్' },
  learningHub: { en: 'Academy', hi: 'अकादमी', te: 'అకాడమీ' },
  logout: { en: 'Logout', hi: 'लॉगआउट', te: 'లాగ్ అవుట్' },

  // Dashboard Core
  totalBalance: { en: 'Total Account Balance', hi: 'कुल खाता शेष', te: 'మొత్తం ఖాతా బ్యాలెన్స్' },
  totalInvestments: { en: 'Total Investments', hi: 'कुल निवेश', te: 'మొత్తం పెట్టుబడులు' },
  monthlySavings: { en: 'Monthly Savings', hi: 'मासिक बचत', te: 'నెలవారీ పొదుపు' },
  monthlyExpenses: { en: 'Monthly Expenses', hi: 'मासिक खर्च', te: 'నెలవారీ ఖర్చులు' },
  netWorth: { en: 'Net Worth', hi: 'कुल संपत्ति', te: 'నికర విలువ' },
  emergencyFundStatus: { en: 'Emergency Fund Status', hi: 'आपातकालीन कोष स्थिति', te: 'అత్యవసర నిధి స్థితి' },
  wealthHealthScore: { en: 'Wealth Health Score', hi: 'वित्तीय स्वास्थ्य स्कोर', te: 'సంపద ఆరోగ్య స్కోరు' },
  goalAchievement: { en: 'Goal Achievement', hi: 'लक्ष्य प्राप्ति प्रगति', te: 'లక్ష్య సాధన పురోగతి' },
  savingsStreak: { en: 'Savings Streak', hi: 'बचत सिलसिला', te: 'పొదుపు స్ట్రీక్' },
  streakDays: { en: 'days active', hi: 'दिन सक्रिय', te: 'రోజులు యాక్టివ్' },
  activeChallenges: { en: 'Wellness Challenges', hi: 'कल्याण चुनौतियाँ', te: 'ఆరోగ్య సవాళ్లు' },
  carbonFootprint: { en: 'Eco Footprint Score', hi: 'इको फुटप्रिंट स्कोर', te: 'ఎకో ఫుట్‌ప్రింట్ స్కోరు' },

  // Risk profiling
  investorPersonality: { en: 'Investor Personality', hi: 'निवेशक व्यक्तित्व', te: 'పెట్టుబడిదారుడి వ్యక్తిత్వం' },
  riskScore: { en: 'Risk Score', hi: 'जोखिम स्कोर', te: 'రిస్క్ స్కోరు' },
  conservative: { en: 'Conservative', hi: 'रूढ़िवादी', te: 'కన్సర్వేటివ్ (సురక్షిత)' },
  moderate: { en: 'Moderate', hi: 'मध्यम', te: 'మోడరేట్ (మధ్యస్థ)' },
  aggressive: { en: 'Aggressive', hi: 'आक्रामक', te: 'అగ్రెసివ్ (సాహసోపేత)' },

  // Alerts & Notifications
  alertsTitle: { en: 'AI Proactive Alerts', hi: 'एआई सक्रिय सूचनाएं', te: 'AI చురుకైన హెచ్చరికలు' },
  overspendingAlert: { en: 'Overspending Alert', hi: 'अत्यधिक खर्च चेतावनी', te: 'ఎక్కువ ఖర్చు హెచ్చరిక' },
  lowSavingsAlert: { en: 'Low Savings Alert', hi: 'कम बचत चेतावनी', te: 'తక్కువ పొదుపు హెచ్చరిక' },
  idleMoneyAlert: { en: 'Idle Money Alert', hi: 'निष्क्रिय धन चेतावनी', te: 'నిష్క్రియ पैसा चेतावनी' },
  investmentOpportunity: { en: 'Investment Alert', hi: 'निवेश अवसर अलर्ट', te: 'పెట్టుబడి అవకాశం' },

  // Common UI Buttons
  save: { en: 'Save', hi: 'सहेजें', te: 'సేవ్ చేయి' },
  cancel: { en: 'Cancel', hi: 'रद्द करें', te: 'రద్దు చేయి' },
  downloadReport: { en: 'Download PDF Report', hi: 'पीडीएफ रिपोर्ट डाउनलोड करें', te: 'PDF రిపోర్ట్ డౌన్‌లోడ్' },
  askFinAura: { en: 'Ask FinAura AI...', hi: 'फिनऑरा एआई से पूछें...', te: 'ఫిన్‌ఆరా AIని అడగండి...' },
  voiceInput: { en: 'Voice', hi: 'आवाज़', te: 'వాయిస్' },

  // Header & Navigation
  portfolioSummary: { en: 'PORTFOLIO SUMMARY', hi: 'पोर्टफोलियो सारांश', te: 'పోర్ట్‌ఫోలియో సారాంశం' },
  welcomeBack: { en: 'Welcome back', hi: 'आपका स्वागत है', te: 'మళ్లీ స్వాగతం' },

  // Dashboard Page Items
  welcomeOwner: { en: 'Welcome back, Vikram Aditya', hi: 'आपका स्वागत है, विक्रम आदित्य', te: 'మళ్లీ స్వాగతం, విక్రమ్ ఆదిత్య' },
  assetsGrew: { en: 'FinAura wealth advisor aggregates your accounts. Your assets grew 4.2% this week.', hi: 'फिनऑरा वेल्थ एडवाइजर आपके खातों को जोड़ता है। इस सप्ताह आपकी संपत्ति 4.2% बढ़ी।', te: 'ఫిన్‌ఆరా వెల్త్ అడ్వైజర్ మీ ఖాతాలను సమగ్రపరుస్తుంది. ఈ వారం మీ ఆస్తులు 4.2% పెరిగాయి.' },
  level4Saver: { en: 'Level 4 Saver', hi: 'स्तर 4 बचतकर्ता', te: 'స్థాయి 4 పొదుపుదారు' },
  moderateInvestor: { en: 'Moderate Investor', hi: 'मध्यम निवेशक', te: 'మోడరేట్ ఇన్వెస్టర్' },
  wealthHealthAnalysis: { en: 'Wealth Health Analysis', hi: 'वित्तीय स्वास्थ्य विश्लेषण', te: 'సంపద ఆరోగ్య విశ్లేషణ' },
  healthStatus: { en: 'Health Status', hi: 'स्वास्थ्य स्थिति', te: 'ఆరోగ్య స్థితి' },
  suggestionsForImprovement: { en: 'Suggestions for improvement', hi: 'सुधार के सुझाव', te: 'మెరుగుదల కోసం సూచనలు' },
  financialTrendAllocation: { en: 'Financial Trend & Allocation', hi: 'वित्तीय रुझान और आवंटन', te: 'ఆర్థిక ధోరణి & కేటాయింపు' },
  incomeVsExpenses: { en: 'Income vs Expenses', hi: 'आय बनाम व्यय', te: 'ఆదాయం వర్సెస్ ఖర్చులు' },
  assetAllocation: { en: 'Asset Allocation', hi: 'संपत्ति आवंटन', te: 'ఆస్తి కేటాయింపు' },
  tenYearGrowthProjection: { en: '10-Year Growth Projection', hi: '10-वर्षीय विकास अनुमान', te: '10-సంవత్సరాల వృద్ధి అంచనా' },
  finAuraSmartPlan: { en: 'FinAura Smart Plan', hi: 'फिनऑरा स्मार्ट योजना', te: 'ఫిన్‌ఆరా స్మార్ట్ ప్లాన్' },
  basicSavingsPlan: { en: 'Basic Savings Plan', hi: 'बुनियादी बचत योजना', te: 'ప్రాథమిక పొదుపు ప్లాన్' },
  recentTransactions: { en: 'Recent Transactions', hi: 'हाल के लेनदेन', te: 'ఇటీవలి లావాదేవీలు' },
  seeAll: { en: 'See all', hi: 'सभी देखें', te: 'అన్నీ చూడు' },
  addTransaction: { en: 'Add Transaction', hi: 'लेनदेन जोड़ें', te: 'లావాదేవీని జోడించు' },
  income: { en: 'Income', hi: 'आय', te: 'ఆదాయం' },
  expense: { en: 'Expense', hi: 'व्यय', te: 'ఖर्च' },
  investment: { en: 'Investment', hi: 'निवेश', te: 'పెట్టుబడి' },
  activeGoals: { en: 'Active Goals', hi: 'सक्रिय लक्ष्य', te: 'యాక్టివ్ లక్ష్యాలు' },
  addGoal: { en: 'Add Goal', hi: 'लक्ष्य जोड़ें', te: 'లక్ష్యాన్ని జోడించు' },
  target: { en: 'Target', hi: 'लक्ष्य', te: 'లక్ష్యం' },
  saved: { en: 'Saved', hi: 'सहेज लिया', te: 'పొదుపు చేసావు' },
  timeRemaining: { en: 'Time remaining', hi: 'शेष समय', te: 'మిగిలి ఉన్న సమయం' },
  monthlyContributionNeeded: { en: 'Monthly contribution needed', hi: 'मासिक योगदान आवश्यक', te: 'नెలవారీ సహకారం అవసరం' },
  joinChallenge: { en: 'Join Challenge', hi: 'चुनौती में शामिल हों', te: 'సవాలులో చేరండి' },
  completed: { en: 'Completed', hi: 'पूरा किया गया', te: 'పూర్తయింది' },

  // Goal Planner Page
  wealthGoalPlanner: { en: 'Wealth Goal Planner', hi: 'वेल्थ लक्ष्य योजनाकार', te: 'సంపద లక్ష్య ప్రణాళికాకర్త' },
  goalPlannerDesc: { en: 'Track, fund, and optimize your life goals with AI-guided contribution planning.', hi: 'एआई-निर्देशित योगदान योजना के साथ अपने जीवन के लक्ष्यों को ट्रैक, फंड और अनुकूलित करें।', te: 'AI-ఆధారిత సహకార ప్రణాళికతో మీ జీవిత లక్ష్యాలను ట్రాక్ చేయండి, నిధులు సమకూర్చండి మరియు ఆప్టిమైజ్ చేయండి.' },
  activeWealthGoals: { en: 'Active Wealth Goals', hi: 'सक्रिय वेल्थ लक्ष्य', te: 'యాక్టివ్ సంపద లక్ష్యాలు' },
  addFunds: { en: 'Add Funds', hi: 'फंड जोड़ें', te: 'నిధులు జోడించు' },
  deleteGoal: { en: 'Delete Goal', hi: 'लक्ष्य हटाएं', te: 'లక్ష్యాన్ని తొలగించు' },
  createNewWealthGoal: { en: 'Create New Wealth Goal', hi: 'नया वेल्थ लक्ष्य बनाएं', te: 'కొత్త సంపద లక్ష్యాన్ని సృష్టించండి' },
  goalName: { en: 'Goal Name', hi: 'लक्ष्य का नाम', te: 'లక్ష్యం పేరు' },
  targetAmountRs: { en: 'Target Amount (Rs.)', hi: 'लक्ष्य राशि (रुपये)', te: 'లక్ష్యం మొత్తం (రూ.)' },
  priorityLevel: { en: 'Priority Level', hi: 'प्राथमिकता स्तर', te: 'ప్రాధాన్యత స్థాయి' },
  high: { en: 'High', hi: 'उच्च', te: 'ఎక్కువ' },
  medium: { en: 'Medium', hi: 'मध्यम', te: 'మధ్యస్థ' },
  low: { en: 'Low', hi: 'कम', te: 'తక్కువ' },
  createGoal: { en: 'Create Goal', hi: 'लक्ष्य बनाएं', te: 'लक्ष్యాన్ని సృష్టించు' },

  // Risk Profiler Page
  investorRiskProfiler: { en: 'Investor Risk Profiler', hi: 'निवेशक जोखिम प्रोफाइलर', te: 'పెట్టుబడిదారుల రిస్క్ ప్రొఫైలర్' },
  riskProfilerDesc: { en: 'Take our quantitative assessment to determine your risk profile and optimize asset allocations.', hi: 'अपने जोखिम प्रोफाइल को निर्धारित करने और परिसंपत्ति आवंटन को अनुकूलित करने के लिए हमारा मात्रात्मक मूल्यांकन लें।', te: 'మీ రిస్క్ ప్రొఫైల్‌ను నిర్ణయించడానికి మరియు ఆస్తి కేటాయింపులను ఆప్టిమైజ్ చేయడానికి మా గుణాత్మక అంచనాను తీసుకోండి.' },
  yourCurrentRiskProfile: { en: 'Your Current Risk Profile', hi: 'आपका वर्तमान जोखिम प्रोफाइल', te: 'మీ ప్రస్తుత రిస్క్ ప్రొఫైల్' },
  suggestPortfolioMix: { en: 'Based on your age and income, we suggest a', hi: 'आपकी उम्र और आय के आधार पर, हम एक सुझाव देते हैं', te: 'మీ వయస్సు మరియు ఆదాయం ఆధారంగా, మేము ఒక సూచనను అందిస్తున్నాము' },
  portfolioMix: { en: 'portfolio mix.', hi: 'पोर्टफोलियो मिश्रण।', te: 'పోర్ట్‌ఫోలియో మిశ్రమం.' },
  recommendedAssetAllocation: { en: 'Recommended Asset Allocation', hi: 'अनुशंसित परिसंपत्ति आवंटन', te: 'సిఫార్సు చేయబడిన ఆస్తి కేటాయింపు' },
  riskProfileAssessment: { en: 'Risk Profile Assessment', hi: 'जोखिम प्रोफाइल मूल्यांकन', te: 'రిస్క్ ప్రొఫైల్ అసెస్‌మెంట్' },
  q1: { en: 'What is your primary investment goal?', hi: 'आपका प्राथमिक निवेश लक्ष्य क्या है?', te: 'మీ ప్రాథమిక పెట్టుబడి లక్ష్యం ఏమిటి?' },
  q1a1: { en: 'Capital Preservation', hi: 'पूंजी संरक्षण', te: 'మూలధన పరిరక్షణ' },
  q1a2: { en: 'Balanced Growth', hi: 'संतुलित विकास', te: 'సమతుల్య వృద్ధి' },
  q1a3: { en: 'Maximum Capital Appreciation', hi: 'अधिकतम पूंजी वृद्धि', te: 'గరిష్ట మూలధన విలువ పెరగడం' },
  q2: { en: 'How would you react if your portfolio fell 20% in a month?', hi: 'यदि आपका पोर्टफोलियो एक महीने में 20% गिर जाता है तो आप क्या प्रतिक्रिया देंगे?', te: 'ఒక నెలలో మీ పోర్ట్‌ఫోలియో 20% పడిపోతే మీరు ఎలా స్పందిస్తారు?' },
  q2a1: { en: 'Sell everything to prevent further loss', hi: 'आगे के नुकसान को रोकने के लिए सब कुछ बेच दें', te: 'మరింత నష్టాన్ని నివారించడానికి అన్నింటినీ అమ్మేయండి' },
  q2a2: { en: 'Do nothing and wait for recovery', hi: 'कुछ न करें और सुधार की प्रतीक्षा करें', te: 'ఏమీ చేయకుండా కోలుకునే వరకు వేచి ఉండండి' },
  q2a3: { en: 'Buy more at lower prices', hi: 'कम कीमतों पर अधिक खरीदें', te: 'తక్కువ ధరల వద్ద మరింత కొనండి' },
  q3: { en: 'What is your investment horizon?', hi: 'आपका निवेश क्षितिज क्या है?', te: 'మీ పెట్టుబడి పరిమితి ఎంత సమయం?' },
  q3a1: { en: 'Under 2 years', hi: '2 वर्ष से कम', te: '2 సంవత్సరాల లోపు' },
  q3a2: { en: '2 to 5 years', hi: '2 से 5 वर्ष', te: '2 నుండి 5 సంవత్సరాలు' },
  q3a3: { en: 'Over 5 years', hi: '5 वर्ष से अधिक', te: '5 సంవత్సరాల కంటే ఎక్కువ' },
  submitAssessment: { en: 'Submit Assessment', hi: 'मूल्यांकन जमा करें', te: 'అంచనాను సమర్పించు' },

  // AI Analyzer Page
  aiTransactionCarbonAnalyzer: { en: 'AI Transaction & Carbon Analyzer', hi: 'एआई लेनदेन और कार्बन विश्लेषक', te: 'AI లావాదేవీ & కార్బన్ విశ్లేషకుడు' },
  aiAnalyzerDesc: { en: 'Analyze your cashflow categories, recurring subscriptions, and eco-spending scores.', hi: 'अपनी नकदी प्रवाह श्रेणियों, आवर्ती सदस्यताओं और पर्यावरण-व्यय स्कोर का विश्लेषण करें।', te: 'మీ నగదు ప్రవాహ వర్గాలు, పునరావృత సభ్యత్వాలు మరియు పర్యావరణ వ్యయ స్కోర్‌లను విశ్లేషించండి.' },
  uploadBankingStatement: { en: 'Upload Banking Statement', hi: 'बैंकिंग स्टेटमेंट अपलोड करें', te: 'బ్యాంకింగ్ స్టేట్‌మెంట్ అప్‌లోడ్' },
  uploadPDF: { en: 'Upload PDF', hi: 'पीडीएफ अपलोड करें', te: 'PDF అప్‌లోడ్ చేయి' },
  carbonFootprintAnalytics: { en: 'Carbon Footprint Analytics', hi: 'कार्बन फुटप्रिंट एनालिटिक्स', te: 'కార్బన్ ఫుట్‌ప్రింట్ అనలిటిక్స్' },
  transportation: { en: 'Transportation', hi: 'परिवहन', te: 'రవాణా' },
  shopping: { en: 'Shopping', hi: 'खरीदारी', te: 'షాపింగ్' },
  food: { en: 'Food', hi: 'भोजन', te: 'ఆహారం' },
  utilities: { en: 'Utilities', hi: 'उपयोगिताएँ', te: 'యుటిలిటీస్' },
  healthcare: { en: 'Healthcare', hi: 'स्वास्थ्य सेवा', te: 'ఆరోగ్య రక్షణ' },
  entertainment: { en: 'Entertainment', hi: 'मनोरंजन', te: 'వినోదం' },
  recurringSubscriptions: { en: 'Recurring Subscriptions', hi: 'आवर्ती सदस्यताएँ', te: 'పునరావృత సభ్యత్వాలు' },
  unsubscribe: { en: 'Unsubscribe', hi: 'सदस्यता रद्द करें', te: 'సభ్యత్వాన్ని రద్దు చేయి' },
  transactionHistory: { en: 'Transaction History', hi: 'लेनदेन का इतिहास', te: 'లావాదేవీల చరిత్ర' },

  // Innovations Hub
  innovationsSavingsHub: { en: 'Innovations & Savings Hub', hi: 'नवाचार और बचत हब', te: 'ఆవిష్కరణలు & పొదుపు కేంద్రం' },
  innovationsDesc: { en: 'Participate in wellness challenges, optimize carbon footprint spending, and earn XP.', hi: 'कल्याण चुनौतियों में भाग लें, कार्बन फुटप्रिंट खर्च को अनुकूलित करें और XP कमाएं।', te: 'ఆరోగ్య సవాళ్లలో పాల్గొనండి, కార్బన్ ఫుట్‌ప్రింట్ వ్యయాన్ని ఆప్టిమైజ్ చేయండి మరియు XP సంపాదించండి.' },
  ecoFootprintTracker: { en: 'Eco Footprint Tracker', hi: 'इको फुटप्रिंट ट्रैकर', te: 'ఎకో ఫుట్‌ప్రింట్ ట్రాకర్' },

  // Academy Page
  financialLiteracyAcademy: { en: 'Financial Literacy Academy', hi: 'वित्तीय साक्षरता अकादमी', te: 'ఆర్థిక అక్షరాస్యత అకాడమీ' },
  academyDesc: { en: 'Learn the basics of smart investing, tax planning, and compound interest.', hi: 'स्मार्ट निवेश, कर योजना और चक्रवृद्धि ब्याज की मूल बातें सीखें।', te: 'స్మార్ట్ ఇన్వెస్టింగ్, టాక్స్ ప్లానింగ్ మరియు చక్రవడ్డీ ప్రాథమికాలను నేర్చుకోండి.' },

  // Admin Portal
  adminConfigPortal: { en: 'Admin & Config Portal', hi: 'प्रशासन और कॉन्फ़िगरेशन पोर्टल', te: 'అడ్మిన్ & కాన్ఫిగరేషన్ పోర్టల్' },
  adminDesc: { en: 'Adjust security parameters, manage connection tokens, audit users, and view platform execution logs.', hi: 'सुरक्षा मापदंडों को समायोजित करें, कनेक्शन टोकन प्रबंधित करें, उपयोगकर्ताओं का ऑडिट करें और प्लेटफ़ॉर्म निष्पादन लॉग देखें।', te: 'భద్రతా పారామితులను సర్దుబాటు చేయండి, కనెక్షన్ టోకెన్లను నిర్వహించండి, వినియోగదారులను ఆడిట్ చేయండి మరియు ప్లాట్‌ఫారమ్ అమలు లాగ్‌లను వీక్షించండి.' }
};

// Global in-memory dynamic translation cache loaded from localStorage
let dynamicCache: { [key: string]: string } = {};
try {
  const saved = localStorage.getItem('finaura_dynamic_translations');
  if (saved) {
    dynamicCache = JSON.parse(saved);
  }
} catch (e) {
  console.error("Failed to load dynamic translations cache:", e);
}

const pendingTranslations = new Set<string>();
const failedTranslations = new Set<string>();

const getCachedTranslation = (text: string, lang: Language): string | null => {
  if (lang === 'en') return text;
  
  // 1. Direct key search in static translations
  if (translations[text] && translations[text][lang]) {
    return translations[text][lang];
  }

  // 2. Value-based search in static translations
  for (const key of Object.keys(translations)) {
    if (translations[key].en.toLowerCase() === text.toLowerCase()) {
      return translations[key][lang];
    }
  }

  // 3. Dynamic translations cache search
  const cacheKey = `${text.trim()}_${lang}`;
  return dynamicCache[cacheKey] || null;
};

// Helper to check if a string already has characters of the target language
const isAlreadyTranslated = (text: string, lang: Language): boolean => {
  if (lang === 'hi') {
    return /[\u0900-\u097F]/.test(text); // Devanagari range (Hindi)
  }
  if (lang === 'te') {
    return /[\u0C00-\u0C7F]/.test(text); // Telugu range
  }
  return false;
};

// Queue background translation
const queueTranslation = (text: string, lang: Language, onTranslated: (val: string) => void) => {
  if (lang === 'en') return;
  const trimmed = text.trim();
  if (!trimmed || trimmed.length < 2) return;
  
  // Skip if purely numeric/symbols/currencies/metrics
  if (/^[0-9\s.,\-+*/$%()#:|&xXP🔥⚡🌟✨🎓👑📊📈📉🔒🔓🛡️🚀⏳💡🌱🎁👥🤖💬📞🎯📢📣🔊❌]*$/.test(trimmed)) return;
  
  const cacheKey = `${trimmed}_${lang}`;
  if (failedTranslations.has(cacheKey)) return;
  
  if (pendingTranslations.has(cacheKey)) {
    // Poll for completion
    const interval = setInterval(() => {
      const val = dynamicCache[cacheKey];
      if (val) {
        clearInterval(interval);
        onTranslated(val);
      }
    }, 150);
    return;
  }

  pendingTranslations.add(cacheKey);

  fetch('/api/translate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text: trimmed, lang })
  })
    .then(res => {
      if (!res.ok) {
        throw new Error(`Server returned status ${res.status}`);
      }
      return res.json();
    })
    .then(data => {
      if (data && data.text) {
        dynamicCache[cacheKey] = data.text;
        try {
          localStorage.setItem('finaura_dynamic_translations', JSON.stringify(dynamicCache));
        } catch (e) {
          console.error("Local storage quota exceeded or disabled", e);
        }
        onTranslated(data.text);
        // Trigger a global custom event so observers re-translate
        window.dispatchEvent(new CustomEvent('finaura_translation_complete'));
      } else {
        failedTranslations.add(cacheKey);
      }
      pendingTranslations.delete(cacheKey);
    })
    .catch(err => {
      console.error("Failed to translate text:", trimmed, err);
      failedTranslations.add(cacheKey);
      pendingTranslations.delete(cacheKey);
    });
};

interface LanguageContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('finaura_lang');
    return (saved as Language) || 'en';
  });

  const setLanguage = (lang: Language) => {
    if (lang !== language) {
      setLanguageState(lang);
      localStorage.setItem('finaura_lang', lang);
    }
  };

  const t = (key: string): string => {
    const cached = getCachedTranslation(key, language);
    if (cached) return cached;
    
    if (language !== 'en' && !isAlreadyTranslated(key, language)) {
      // Trigger background translation for fallback
      queueTranslation(key, language, () => {});
    }
    
    return key;
  };

  // Set up standard DOM-level automatic translation for complete full-app coverage
  useEffect(() => {
    let observer: MutationObserver | null = null;
    const observerConfig = {
      childList: true,
      subtree: true,
      characterData: true
    };

    const disconnectObserver = () => {
      if (observer) {
        observer.disconnect();
      }
    };

    const reconnectObserver = () => {
      if (observer) {
        observer.observe(document.body, observerConfig);
      }
    };

    const translateTextNode = (node: Text) => {
      // 1. Initialize or retrieve the original English text
      if (!(node as any).__original_en__) {
        (node as any).__original_en__ = node.nodeValue || '';
      }
      
      const originalVal = (node as any).__original_en__;
      const trimmed = originalVal.trim();
      if (!trimmed || trimmed.length < 2) return;

      // If we are in English, restore original value and return
      if (language === 'en') {
        if (node.nodeValue !== originalVal) {
          disconnectObserver();
          node.nodeValue = originalVal;
          reconnectObserver();
        }
        return;
      }

      // If already translated and the current nodeValue contains the correct language characters, skip
      if (isAlreadyTranslated(node.nodeValue || '', language)) return;

      const cached = getCachedTranslation(trimmed, language);
      if (cached) {
        const newVal = originalVal.replace(trimmed, cached);
        if (node.nodeValue !== newVal) {
          disconnectObserver();
          node.nodeValue = newVal;
          reconnectObserver();
        }
      } else {
        queueTranslation(trimmed, language, (translated) => {
          const newVal = originalVal.replace(trimmed, translated);
          if (node.nodeValue !== newVal) {
            disconnectObserver();
            node.nodeValue = newVal;
            reconnectObserver();
          }
        });
      }
    };

    const translateElementAttributes = (el: HTMLElement) => {
      const inputEl = el as HTMLInputElement;
      if (inputEl.placeholder !== undefined && inputEl.placeholder !== '') {
        if (!(inputEl as any).__original_placeholder_en__) {
          (inputEl as any).__original_placeholder_en__ = inputEl.placeholder;
        }
        
        const originalVal = (inputEl as any).__original_placeholder_en__;
        const trimmed = originalVal.trim();
        
        if (language === 'en') {
          if (inputEl.placeholder !== originalVal) {
            disconnectObserver();
            inputEl.placeholder = originalVal;
            reconnectObserver();
          }
          return;
        }

        if (isAlreadyTranslated(inputEl.placeholder || '', language)) return;
        
        const cached = getCachedTranslation(trimmed, language);
        if (cached) {
          const newVal = originalVal.replace(trimmed, cached);
          if (inputEl.placeholder !== newVal) {
            disconnectObserver();
            inputEl.placeholder = newVal;
            reconnectObserver();
          }
        } else {
          queueTranslation(trimmed, language, (translated) => {
            const newVal = originalVal.replace(trimmed, translated);
            if (inputEl.placeholder !== newVal) {
              disconnectObserver();
              inputEl.placeholder = newVal;
              reconnectObserver();
            }
          });
        }
      }
    };

    const translateTree = (root: Node) => {
      const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
        acceptNode: (node) => {
          const parent = node.parentElement;
          if (!parent) return NodeFilter.FILTER_REJECT;
          const tag = parent.tagName.toLowerCase();
          if (['script', 'style', 'noscript', 'canvas', 'code'].includes(tag)) {
            return NodeFilter.FILTER_REJECT;
          }
          return NodeFilter.FILTER_ACCEPT;
        }
      });

      let current = walker.nextNode();
      while (current) {
        translateTextNode(current as Text);
        current = walker.nextNode();
      }

      // Translate inputs
      if (root instanceof HTMLElement) {
        const inputs = root.querySelectorAll('input, textarea');
        inputs.forEach(input => translateElementAttributes(input as HTMLElement));
      }
    };

    // 1. First sweep of the entire page
    translateTree(document.body);

    // 2. Live observer for newly added or modified nodes (dynamic React updates)
    observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach(node => {
            translateTree(node);
          });
        } else if (mutation.type === 'characterData') {
          translateTextNode(mutation.target as Text);
        }
      }
    });

    reconnectObserver();

    // 3. React on new translations fetched in the background
    const handleTranslationUpdated = () => {
      translateTree(document.body);
    };

    window.addEventListener('finaura_translation_complete', handleTranslationUpdated);

    return () => {
      disconnectObserver();
      window.removeEventListener('finaura_translation_complete', handleTranslationUpdated);
    };
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
