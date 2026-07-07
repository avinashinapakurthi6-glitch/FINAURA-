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
  welcomeBack: { en: 'Welcome back', hi: 'आपका स्वागत है', te: 'మళ్లీ స్వాగతం' }
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
