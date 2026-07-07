import React, { useEffect, useState, useRef } from 'react';
import {
  Play,
  Square,
  Volume2,
  VolumeX,
  Languages,
  UserCheck,
  Maximize2,
  Minimize2,
  PlayCircle,
  PauseCircle,
  RefreshCw,
  Clock,
  AudioLines
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface AIAvatarProps {
  isSpeaking?: boolean;
  isTyping?: boolean;
  textToSpeak?: string;
  onSpeechStateChange?: (speaking: boolean) => void;
}

type AdvisorType = 'male' | 'female';
type LanguageType = 'en' | 'hi' | 'te';
type VoiceGender = 'male' | 'female';

export const AIAvatar: React.FC<AIAvatarProps> = ({
  isSpeaking: externalIsSpeaking,
  isTyping = false,
  textToSpeak,
  onSpeechStateChange
}) => {
  const { language: globalLanguage, setLanguage: setGlobalLanguage } = useLanguage();

  // Config & Preference State
  const [advisor, setAdvisor] = useState<AdvisorType>('male');
  const [language, setLanguage] = useState<LanguageType>(globalLanguage as LanguageType);

  useEffect(() => {
    setLanguage(globalLanguage as LanguageType);
  }, [globalLanguage]);
  const [voiceGender, setVoiceGender] = useState<VoiceGender>('male');
  const [volume, setVolume] = useState<number>(0.9);
  const [speed, setSpeed] = useState<number>(1.0);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  // Translation States
  const [translatedText, setTranslatedText] = useState<string>('');
  const [isTranslating, setIsTranslating] = useState<boolean>(false);
  const translationCacheRef = useRef<{ [key: string]: string }>({});

  // Loaded Voices
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  // Animation States
  const [mouthShape, setMouthShape] = useState<'closed' | 'A' | 'E' | 'I' | 'O' | 'U'>('closed');
  const [isBlinking, setIsBlinking] = useState<boolean>(false);
  const [isNodding, setIsNodding] = useState<boolean>(false);
  const [eyeGaze, setEyeGaze] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [speakingTimer, setSpeakingTimer] = useState<number>(0);

  // Subtitle Tracking State
  const [internalIsSpeaking, setInternalIsSpeaking] = useState<boolean>(false);
  const [spokenWords, setSpokenWords] = useState<string[]>([]);
  const [currentWordIdx, setCurrentWordIdx] = useState<number>(-1);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const timerIntervalRef = useRef<any>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const mouthTimerRef = useRef<any>(null);

  const isSpeaking = externalIsSpeaking !== undefined ? externalIsSpeaking : internalIsSpeaking;

  // AI State computation
  const getAiState = (): 'idle' | 'listening' | 'thinking' | 'speaking' | 'paused' | 'translating' => {
    if (isTranslating) return 'translating';
    if (isSpeaking) {
      return isPaused ? 'paused' : 'speaking';
    }
    if (isTyping) return 'thinking';
    return 'idle';
  };

  const aiState = getAiState();

  // Load voices asynchronously and bind update listener
  useEffect(() => {
    const updateVoices = () => {
      const allVoices = window.speechSynthesis.getVoices();
      setVoices(allVoices);
    };
    updateVoices();
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = updateVoices;
    }
  }, []);

  // Sync Voice Gender automatically when Advisor changes
  useEffect(() => {
    setVoiceGender(advisor);
    // Restart active speech if playing to immediately switch voice persona
    if (isSpeaking && textToSpeak) {
      handleStop();
    }
  }, [advisor]);

  // Natural Random Blinking
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 150);
    }, 3800 + Math.random() * 2000);

    return () => clearInterval(blinkInterval);
  }, []);

  // Natural Eye Gaze Micro-movements
  useEffect(() => {
    const gazeInterval = setInterval(() => {
      if (Math.random() > 0.4) {
        setEyeGaze({
          x: (Math.random() - 0.5) * 2.5,
          y: (Math.random() - 0.5) * 1.5
        });
      } else {
        setEyeGaze({ x: 0, y: 0 });
      }
    }, 2500);

    return () => clearInterval(gazeInterval);
  }, []);

  // Natural Micro Head Nodding
  useEffect(() => {
    const nodInterval = setInterval(() => {
      if (isSpeaking && !isPaused && Math.random() > 0.6) {
        setIsNodding(true);
        setTimeout(() => setIsNodding(false), 800);
      }
    }, 3000);

    return () => clearInterval(nodInterval);
  }, [isSpeaking, isPaused]);

  // Speaking Timer Track
  useEffect(() => {
    if (isSpeaking && !isPaused) {
      timerIntervalRef.current = setInterval(() => {
        setSpeakingTimer((prev) => prev + 1);
      }, 1000);
    } else {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
      if (!isSpeaking) {
        setSpeakingTimer(0);
      }
    }

    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, [isSpeaking, isPaused]);

  // Real-time phoneme/lip morph loops when speaking
  useEffect(() => {
    if (isSpeaking && !isPaused) {
      const shapes: ('A' | 'E' | 'I' | 'O' | 'U' | 'closed')[] = ['A', 'E', 'O', 'I', 'U', 'closed'];
      let idx = 0;
      mouthTimerRef.current = setInterval(() => {
        // High variation speaking lip-sync morphing
        const nextShape = shapes[idx % shapes.length];
        setMouthShape(Math.random() > 0.2 ? nextShape : 'closed');
        idx++;
      }, 120);
    } else {
      if (mouthTimerRef.current) clearInterval(mouthTimerRef.current);
      setMouthShape('closed');
    }

    return () => {
      if (mouthTimerRef.current) clearInterval(mouthTimerRef.current);
    };
  }, [isSpeaking, isPaused]);

  // Fallback Translator Map for instant client-side translations when Gemini API is offline
  const getFallbackTranslation = (text: string, targetLang: 'hi' | 'te'): string => {
    const lower = text.toLowerCase();
    if (targetLang === 'hi') {
      if (lower.includes('emergency fund') || lower.includes('emergency')) {
        return "मैं आपको सलाह देता हूँ कि आप अपनी ६ महीने के खर्चों के बराबर एक आपातकालीन निधि (Emergency Fund) बनाए रखें। इसे किसी सुरक्षित बचत खाते या लिक्विड फंड में रखना सबसे अच्छा रहेगा।";
      }
      if (lower.includes('invest') || lower.includes('investment') || lower.includes('sip')) {
        return "आप निश्चित रूप से हर महीने निवेश करना शुरू कर सकते हैं। आपकी जोखिम प्रोफ़ाइल के अनुसार, ६०% शेयर बाज़ार (Mutual Funds) में और ४०% सुरक्षित ऋण योजनाओं (PPF/FD) में निवेश करना उचित होगा।";
      }
      if (lower.includes('saving vs current') || lower.includes('savings vs current')) {
        return "बचत खाता व्यक्तिगत बचत और ब्याज कमाने के लिए होता है, जबकि चालू खाता मुख्य रूप से व्यवसायों और असीमित दैनिक लेनदेन के लिए बनाया गया है जिस पर कोई ब्याज नहीं मिलता।";
      }
      if (lower.includes('savings account') || lower.includes('savings')) {
        return "बचत खाता आपके पैसे को सुरक्षित रखने और उस पर वार्षिक ब्याज कमाने का एक उत्कृष्ट साधन है। यह आपको अत्यंत उच्च तरलता प्रदान करता है जिससे आप कभी भी पैसा निकाल सकते हैं।";
      }
      if (lower.includes('student')) {
        return "छात्रों के लिए सबसे बढ़िया विकल्प एक ज़ीरो-बैलेंस बचत खाता है, जो बिना किसी मासिक शुल्क के डिजिटल बैंकिंग और यूपीआई (UPI) की सुविधा प्रदान करता है।";
      }
      if (lower.includes('retirement') || lower.includes('pension')) {
        return "रिटायरमेंट या सेवानिवृत्ति की योजना के लिए राष्ट्रीय पेंशन योजना (NPS) और म्यूचुअल फंड एसआईपी (SIP) का मिश्रण सबसे बेहतरीन है। इससे आपकी संपत्ति सुरक्षित रूप से बढ़ेगी।";
      }
      if (lower.includes('expense') || lower.includes('budget') || lower.includes('spend')) {
        return "अपने खर्चों को प्रबंधित करने के लिए ५०-३०-२० नियम का पालन करें। ५० प्रतिशत आवश्यक जरूरतों के लिए, ३३ प्रतिशत इच्छाओं के लिए और १७ प्रतिशत बचत व निवेश के लिए रखें।";
      }
      if (lower.includes('tax') || lower.includes('reduce tax') || lower.includes('save tax')) {
        return "टैक्स बचाने के लिए आप आयकर अधिनियम की धारा 80C के तहत ईएलएसएस (ELSS) म्यूचुअल फंड, पीपीएफ (PPF) और राष्ट्रीय बचत पत्र (NSC) में निवेश कर सकते हैं।";
      }
      if (lower.includes('credit score') || lower.includes('cibil')) {
        return "अपना क्रेडिट स्कोर बेहतर बनाने के लिए हमेशा अपने क्रेडिट कार्ड बिलों और ऋण की किश्तों का भुगतान समय पर करें। इससे आपको भविष्य में कम ब्याज दर पर लोन मिलेगा।";
      }
      if (lower.includes('hello') || lower.includes('hi ') || lower.includes('welcome')) {
        return "नमस्कार! मैं आपका व्यक्तिगत डिजिटल धन सलाहकार हूँ। आज मैं आपकी बचत, निवेश या वित्तीय योजना में किस प्रकार सहायता कर सकता हूँ?";
      }
      return "वित्तीय योजना और निवेश का सही तालमेल आपको भविष्य में समृद्ध बनाएगा। अपने धन को बुद्धिमानी से व्यवस्थित करें।";
    } else {
      // Telugu
      if (lower.includes('emergency fund') || lower.includes('emergency')) {
        return "మీరు కనీసం 6 నెలల అత్యవసర ఖర్చులకు సరిపడే అత్యవసర నిధిని (Emergency Fund) ఏర్పాటు చేసుకోవాలని నేను మీకు సిఫార్సు చేస్తున్నాను. దీనిని సురక్షితమైన లిక్విడ్ ఫండ్స్‌లో ఉంచడం మంచిది.";
      }
      if (lower.includes('invest') || lower.includes('investment') || lower.includes('sip')) {
        return "మీరు ఖచ్చితంగా పెట్టుబడి పెట్టవచ్చు. మీ ఆదాయంలో 60% మ్యూచువల్ ఫండ్స్ లో మరియు 40% సురక్షితమైన పథకాలలో (PPF/FD) పెట్టుబడి పెట్టాలని మేము సిఫార్సు చేస్తున్నాము.";
      }
      if (lower.includes('saving vs current') || lower.includes('savings vs current')) {
        return "సేవింగ్స్ खाता అనేది వ్యక్తిగత పొదుపు మరియు వడ్డీ సంపాదించడానికి ఉపయోగపడుతుంది, కానీ కరెంట్ ఖాతా వ్యాపార లావాదేవీల కొరకు రూపొందించబడింది మరియు దీనిపై వడ్డీ లభించదు.";
      }
      if (lower.includes('savings account') || lower.includes('savings')) {
        return "సేవింగ్స్ ఖాతా మీ డబ్బును సురక్షితంగా ఉంచుతుంది మరియు వార్షిక వడ్డీని అందిస్తుంది. అవసరమైనప్పుడు డబ్బును వెంటనే విత్‌డ్రా చేసుకునే సదుపాయం ఇందులో ఉంటుంది.";
      }
      if (lower.includes('student')) {
        return "విద్యార్థులకు జీరో బ్యాలెన్స్ సేవింగ్స్ ఖాతా చాలా ఉత్తమమైన ఎంపిక. ఇందులో ఎటువంటి కనీస నిల్వ పరిమితులు లేకుండా డిజిటల్ బ్యాంకింగ్ సేవలు పొందవచ్చు.";
      }
      if (lower.includes('retirement') || lower.includes('pension')) {
        return "రిటైర్మెంట్ ప్లానింగ్ కోసం నేషనల్ పెన్షన్ సిస్టమ్ (NPS) మరియు ఈక్విటీ ఎస్ఐపి (SIP)ల కలయిక చాలా ఉత్తమమైనది. ఇది మీ భవిష్యత్తును సురక్షితం చేస్తుంది.";
      }
      if (lower.includes('expense') || lower.includes('budget') || lower.includes('spend')) {
        return "మీ బడ్జెట్‌ను నిర్వహించడానికి 50-30-20 సూత్రాన్ని పాటించండి. మీ ఆదాయంలో 50% అవసరాలకు, 30% కోరికలకు మరియు 20% తప్పనిసరిగా పొదుపునకు కేటాయించండి.";
      }
      if (lower.includes('tax') || lower.includes('reduce tax') || lower.includes('save tax')) {
        return "పన్ను ఆదా చేయడానికి మీరు సెక్షన్ 80C కింద ELSS మ్యూచువల్ ఫండ్స్, PPF మరియు సురక్షిత పొదుపు పథకాలలో పెట్టుబడి పెట్టవచ్చు.";
      }
      if (lower.includes('credit score') || lower.includes('cibil')) {
        return "క్రెడిట్ స్కోరును మెరుగుపరచుకోవడానికి మీ క్రెడిట్ కార్డు బిల్లులు మరియు లోన్ ఈఎంఐ (EMI)లను ఎల్లప్పుడూ సమయానికి చెల్లించండి. ఇది మీకు భవిష్యత్తులో తక్కువ వడ్డీకి లోన్ రావడానికి సహాయపడుతుంది.";
      }
      if (lower.includes('hello') || lower.includes('hi ') || lower.includes('welcome')) {
        return "నమస్కారం! నేను మీ వ్యక్తిగత డిజిటల్ వెల్త్ అడ్వైజర్‌ను. ఈ రోజు మీ పొదుపు మరియు పెట్టుబడి ప్రణాళికలో నేను మీకు ఎలా సహాయపడగలను?";
      }
      return "ఆర్థిక ప్రణాళిక మరియు పెట్టుబడులు మీ భవిష్యత్తును సురక్షితం చేస్తాయి. మీ పొదుపులను తెలివిగా నిర్వహించండి.";
    }
  };

  // Run Translation Effect when Input text or Language changes
  useEffect(() => {
    if (!textToSpeak) {
      setTranslatedText('');
      return;
    }

    // Stop previous speaking first to avoid overlays
    window.speechSynthesis.cancel();
    if (onSpeechStateChange) onSpeechStateChange(false);

    if (language === 'en') {
      setTranslatedText(textToSpeak);
      setIsTranslating(false);
      return;
    }

    const isAlreadyInTargetLanguage = (text: string, lang: string): boolean => {
      if (lang === 'hi') {
        return /[\u0900-\u097F]/.test(text); // Devanagari range (Hindi)
      }
      if (lang === 'te') {
        return /[\u0C00-\u0C7F]/.test(text); // Telugu range
      }
      return false;
    };

    if (isAlreadyInTargetLanguage(textToSpeak, language)) {
      setTranslatedText(textToSpeak);
      setIsTranslating(false);
      return;
    }

    // Check cache first
    const cacheKey = `${language}:${textToSpeak}`;
    if (translationCacheRef.current[cacheKey]) {
      setTranslatedText(translationCacheRef.current[cacheKey]);
      setIsTranslating(false);
      return;
    }

    // Translate live using server-side Gemini translator API
    const runTranslation = async () => {
      setIsTranslating(true);
      try {
        const response = await fetch('/api/translate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            text: textToSpeak,
            lang: language
          })
        });

        if (response.ok) {
          const data = await response.json();
          if (data && data.text) {
            const cleanResult = data.text.trim();
            translationCacheRef.current[cacheKey] = cleanResult;
            setTranslatedText(cleanResult);
            setIsTranslating(false);
            return;
          }
        }
      } catch (err) {
        console.error('Translation fetch failed, fallback to client dictionary:', err);
      }

      // Offline dictionary fallback
      const fallbackText = getFallbackTranslation(textToSpeak, language);
      translationCacheRef.current[cacheKey] = fallbackText;
      setTranslatedText(fallbackText);
      setIsTranslating(false);
    };

    runTranslation();
  }, [textToSpeak, language]);

  // Trigger speech automatically when translatedText is ready
  useEffect(() => {
    if (translatedText && !isTranslating) {
      const timeout = setTimeout(() => {
        speakText(translatedText);
      }, 250);
      return () => clearTimeout(timeout);
    }
  }, [translatedText, isTranslating]);

  // Clean and parse text to support Subtitle Highlight
  const prepareSubtitleWords = (text: string): string[] => {
    return text
      .replace(/###/g, '')
      .replace(/\*\*/g, '')
      .replace(/\*/g, '')
      .replace(/- /g, '')
      .split(/\s+/)
      .filter((w) => w.length > 0);
  };

  // Transliteration Helpers for English fallback voices speaking Hindi/Telugu
  const transliterateDevanagariToLatin = (text: string): string => {
    const charMap: { [key: string]: string } = {
      'अ': 'a', 'आ': 'aa', 'इ': 'i', 'ई': 'ee', 'उ': 'u', 'ऊ': 'oo', 'ऋ': 'ri',
      'ए': 'e', 'ऐ': 'ai', 'ओ': 'o', 'औ': 'au',
      'क': 'ka', 'ख': 'kha', 'ग': 'ga', 'घ': 'gha', 'ङ': 'nga',
      'च': 'cha', 'छ': 'chha', 'ज': 'ja', 'झ': 'jha', 'ञ': 'nya',
      'ट': 'ta', 'ठ': 'tha', 'ड': 'da', 'ढ': 'dha', 'ण': 'na',
      'त': 'ta', 'थ': 'tha', 'द': 'da', 'ध': 'dha', 'न': 'na',
      'प': 'pa', 'फ': 'pha', 'ब': 'ba', 'भ': 'bha', 'म': 'ma',
      'य': 'ya', 'र': 'ra', 'ल': 'la', 'व': 'va', 'श': 'sha', 'ष': 'sha', 'स': 'sa', 'ह': 'ha',
      'ा': 'a', 'ि': 'i', 'ी': 'ee', 'ु': 'u', 'ू': 'oo', 'ृ': 'ri', 'े': 'e', 'ै': 'ai', 'ो': 'o', 'ौ': 'au',
      'ं': 'n', 'ः': 'h', 'ँ': 'n', '्': '',
      '०': '0', '१': '1', '२': '2', '३': '3', '४': '4', '५': '5', '६': '6', '७': '7', '८': '8', '९': '9'
    };

    const consonants = ['क','ख','ग','घ','ङ','च','छ','ज','झ','ञ','ट','ठ','ड','ढ','ण','त','थ','द','ध','न','प','फ','ब','भ','म','य','र','ल','व','श','ष','स','ह'];
    const matras = ['ा','ि','ी','ु','ू','ृ','े','ै','ो','ौ','्'];

    let result = '';
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      const nextChar = text[i + 1] || '';
      
      if (charMap[char] !== undefined) {
        let mapped = charMap[char];
        if (consonants.includes(char)) {
          if (matras.includes(nextChar)) {
            mapped = mapped.slice(0, -1);
          }
        }
        result += mapped;
      } else {
        result += char;
      }
    }
    return result;
  };

  const transliterateTeluguToLatin = (text: string): string => {
    const charMap: { [key: string]: string } = {
      'అ': 'a', 'ఆ': 'aa', 'ఇ': 'i', 'ఈ': 'ee', 'ఉ': 'u', 'ఊ': 'oo', 'ఋ': 'ru',
      'ఎ': 'e', 'ఏ': 'ee', 'ఐ': 'ai', 'ఒ': 'o', 'ఓ': 'oo', 'ఔ': 'au',
      'క': 'ka', 'ఖ': 'kha', 'గ': 'ga', 'ఘ': 'gha',
      'చ': 'cha', 'ఛ': 'chha', 'జ': 'ja', 'ఝ': 'jha',
      'ట': 'ta', 'ఠ': 'tha', 'డ': 'da', 'ఢ': 'dha', 'ణ': 'na',
      'త': 'ta', 'థ': 'tha', 'ద': 'da', 'ధ': 'dha', 'న': 'na',
      'ప': 'pa', 'ఫ': 'pha', 'బ': 'ba', 'భ': 'bha', 'మ': 'ma',
      'య': 'ya', 'ర': 'ra', 'ల': 'la', 'వ': 'va', 'శ': 'sha', 'ष': 'sha', 'స': 'sa', 'హ': 'ha', 'ళ': 'la',
      'ా': 'aa', 'і': 'i', 'ీ': 'ee', 'ు': 'u', 'ూ': 'oo', 'ృ': 'ru', 'ె': 'e', 'ే': 'ee', 'ై': 'ai', 'ొ': 'o', 'ో': 'oo', 'ౌ': 'au',
      'ం': 'm', 'ః': 'h', '్': '',
      '౦': '0', '౧': '1', '౨': '2', '౩': '3', '౪': '4', '౫': '5', '౬': '6', '౭': '7', '౮': '8', '౯': '9'
    };

    const consonants = ['క','ఖ','గ','ఘ','చ','ఛ','జ','ఝ','ట','ఠ','డ','ఢ','ణ','త','థ','ద','ధ','న','ప','ఫ','బ','భ','మ','య','ర','ల','వ','శ','ష','స','హ','ళ'];
    const matras = ['ా','ి','ీ','ు','ూ','ృ','ె','ే','ై','\u0C46','\u0C47','\u0C48','ఒ','ఓ','ఔ','ొ','ో','ౌ','్'];

    let result = '';
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      const nextChar = text[i + 1] || '';
      
      if (charMap[char] !== undefined) {
        let mapped = charMap[char];
        if (consonants.includes(char)) {
          if (matras.includes(nextChar)) {
            mapped = mapped.slice(0, -1);
          }
        }
        result += mapped;
      } else {
        result += char;
      }
    }
    return result;
  };

  const speakText = (overrideText?: string) => {
    const rawText = overrideText || translatedText || textToSpeak;
    if (!rawText) return;

    window.speechSynthesis.cancel();

    // Setup word by word tracker
    const words = prepareSubtitleWords(rawText);
    setSpokenWords(words);
    setCurrentWordIdx(-1);

    // Clean text for optimal TTS output
    let cleanText = rawText
      .replace(/###/g, '')
      .replace(/\*\*/g, '')
      .replace(/\*/g, '')
      .replace(/- /g, '')
      .trim();

    // Attempt matching specific locale based on Language and Gender Selection
    const availableVoices = voices.length > 0 ? voices : window.speechSynthesis.getVoices();
    let selectedVoice = null;

    const isFemale = voiceGender === 'female';

    // Advanced search for specific voice combination
    const findBestVoice = (langPrefix: string, targetFemale: boolean) => {
      // 1. Filter voices for the exact language prefix or names first
      const langMatches = availableVoices.filter(v => {
        const vl = v.lang.toLowerCase();
        const vn = v.name.toLowerCase();
        return vl.startsWith(langPrefix) || 
               (langPrefix === 'hi' && (vn.includes('hindi') || vl.startsWith('hin'))) || 
               (langPrefix === 'te' && (vn.includes('telugu') || vl.startsWith('tel')));
      });

      // Gender indicators
      const femaleKeywords = ['female', 'girl', 'woman', 'zira', 'sangeeta', 'heera', 'veena', 'priya', 'raveena', 'hazel', 'swara', 'shruti', 'chitra', 'hema', 'kalpana', 'shrishti', 'susan', 'lisa', 'dfh', 'ene', 'xiaoxiao', 'ananya'];
      const maleKeywords = ['male', 'boy', 'man', 'david', 'ravi', 'hemant', 'madhur', 'mohan', 'george', 'mark', 'ahp', 'cne', 'yunjian', 'devon', 'rishi'];

      const matchesGender = (voice: SpeechSynthesisVoice, female: boolean): boolean => {
        const vnLower = voice.name.toLowerCase();
        if ('gender' in voice && (voice as any).gender) {
          const g = String((voice as any).gender).toLowerCase();
          if (female && (g === 'female' || g === 'f')) return true;
          if (!female && (g === 'male' || g === 'm')) return true;
        }
        
        if (female) {
          if (femaleKeywords.some(kw => vnLower.includes(kw))) return true;
          if (maleKeywords.some(kw => vnLower.includes(kw))) return false;
          return true; // default guess is female
        } else {
          if (maleKeywords.some(kw => vnLower.includes(kw))) return true;
          if (femaleKeywords.some(kw => vnLower.includes(kw))) return false;
          return false; // default guess is male
        }
      };

      // 2. Try to find a voice that matches BOTH language and requested gender
      const genderAndLangMatch = langMatches.find(v => matchesGender(v, targetFemale));
      if (genderAndLangMatch) {
        return genderAndLangMatch;
      }

      // 3. If NO gendered match is found for that language, fallback to Indian English of that gender
      const indianEnglishMatch = availableVoices.find(v => {
        const vl = v.lang.toLowerCase();
        const vn = v.name.toLowerCase();
        const isIndEng = vl.startsWith('en-in') || vl.startsWith('en_in') || vn.includes('india');
        return isIndEng && matchesGender(v, targetFemale);
      });
      if (indianEnglishMatch) return indianEnglishMatch;

      // 4. Look for ANY English voice of that gender
      const generalEnglishMatch = availableVoices.find(v => {
        const vl = v.lang.toLowerCase();
        return vl.startsWith('en') && matchesGender(v, targetFemale);
      });
      if (generalEnglishMatch) return generalEnglishMatch;

      // 5. Fallback to first language match or null
      return langMatches[0] || null;
    };

    selectedVoice = findBestVoice(language, isFemale);

    // If an English voice fallback is used for Hindi/Telugu, automatically transliterate to Latin
    if (selectedVoice && selectedVoice.lang.toLowerCase().startsWith('en') && (language === 'hi' || language === 'te')) {
      if (language === 'hi') {
        cleanText = transliterateDevanagariToLatin(cleanText);
      } else if (language === 'te') {
        cleanText = transliterateTeluguToLatin(cleanText);
      }
    }

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utteranceRef.current = utterance;

    // Apply voice settings based on configuration
    utterance.volume = isMuted ? 0 : volume;
    utterance.rate = speed;

    if (selectedVoice) {
      utterance.voice = selectedVoice;
    } else {
      // Standard local accent
      utterance.lang = language === 'hi' ? 'hi-IN' : language === 'te' ? 'te-IN' : 'en-IN';
    }

    // Capture boundary changes to highlight active word dynamically
    utterance.onboundary = (event: any) => {
      if (event.name === 'word') {
        const charIdx = event.charIndex;
        // Count words up to charIdx to match index
        const spokenPart = cleanText.substring(0, charIdx).trim();
        const wordCount = spokenPart ? spokenPart.split(/\s+/).length : 0;
        setCurrentWordIdx(wordCount);
      }
    };

    utterance.onstart = () => {
      setInternalIsSpeaking(true);
      setIsPaused(false);
      if (onSpeechStateChange) onSpeechStateChange(true);
    };

    utterance.onend = () => {
      setInternalIsSpeaking(false);
      setIsPaused(false);
      setCurrentWordIdx(-1);
      if (onSpeechStateChange) onSpeechStateChange(false);
    };

    utterance.onerror = (e) => {
      console.warn('Speech error occurred: ', e);
      setInternalIsSpeaking(false);
      setIsPaused(false);
      if (onSpeechStateChange) onSpeechStateChange(false);
    };

    window.speechSynthesis.speak(utterance);
  };

  const handlePauseToggle = () => {
    if (!isSpeaking) return;
    if (isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
    } else {
      window.speechSynthesis.pause();
      setIsPaused(true);
    }
  };

  const handleReplay = () => {
    const rawText = translatedText || textToSpeak;
    if (rawText) {
      speakText(rawText);
    }
  };

  const handleStop = () => {
    window.speechSynthesis.cancel();
    setInternalIsSpeaking(false);
    setIsPaused(false);
    setCurrentWordIdx(-1);
    if (onSpeechStateChange) onSpeechStateChange(false);
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!isFullscreen) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen();
      }
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
      setIsFullscreen(false);
    }
  };

  // Keep fullscreen state in sync with physical exit
  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(document.fullscreenElement !== null);
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  // Format Speaking Timer
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // Keyboard accessibility listeners
  useEffect(() => {
    const handleKeys = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return; // Ignore inside input fields
      }
      if (e.key === ' ') {
        e.preventDefault();
        handlePauseToggle();
      } else if (e.key === 'r' || e.key === 'R') {
        handleReplay();
      } else if (e.key === 'm' || e.key === 'M') {
        setIsMuted((prev) => !prev);
      } else if (e.key === 'f' || e.key === 'F') {
        toggleFullscreen();
      }
    };

    window.addEventListener('keydown', handleKeys);
    return () => window.removeEventListener('keydown', handleKeys);
  }, [isSpeaking, isPaused, textToSpeak]);

  return (
    <div
      ref={containerRef}
      className={`glass-panel rounded-2xl flex flex-col justify-between overflow-hidden relative shadow-2xl transition-all duration-500 bg-gradient-to-br from-[#0d1117] via-[#111827] to-[#020617] border border-white/10 ${
        isFullscreen ? 'fixed inset-0 z-50 rounded-none w-screen h-screen p-8' : 'w-full h-[520px] p-4'
      }`}
    >
      {/* Dynamic Scanline overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(16,185,129,0.01)_50%,rgba(0,0,0,0.15)_50%)] bg-[size:100%_4px] pointer-events-none z-10" />

      {/* Grid Pattern Backdrop */}
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      {/* Top Advisory Control Rail */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3 z-20">
        {/* Left: Advisor Details */}
        <div className="flex items-center gap-2">
          <span className="relative flex h-3 w-3">
            <span
              className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                aiState === 'speaking'
                  ? 'bg-cyber-green'
                  : aiState === 'thinking'
                  ? 'bg-cyber-gold'
                  : 'bg-cyber-blue'
              }`}
            />
            <span
              className={`relative inline-flex rounded-full h-3 w-3 ${
                aiState === 'speaking'
                  ? 'bg-cyber-green'
                  : aiState === 'thinking'
                  ? 'bg-cyber-gold'
                  : 'bg-cyber-blue'
              }`}
            />
          </span>
          <div>
            <h5 className="text-[10px] font-extrabold text-white uppercase tracking-wider">
              {advisor === 'male' ? 'Devon Sharma' : 'Ananya Sen'}
            </h5>
            <p className="text-[8px] text-slate-400 font-bold tracking-widest">
              Private Wealth Partner
            </p>
          </div>
        </div>

        {/* Right: Controller Toggles */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {/* Avatar Selector */}
          <div className="flex bg-white/5 border border-white/5 rounded-lg p-0.5" title="Switch Advisor">
            <button
              onClick={() => setAdvisor('male')}
              className={`px-1.5 py-0.5 rounded text-[10px] font-bold transition-all cursor-pointer ${
                advisor === 'male' ? 'bg-cyber-green text-obsidian-950 font-extrabold' : 'text-slate-400 hover:text-white'
              }`}
            >
              👨 M
            </button>
            <button
              onClick={() => setAdvisor('female')}
              className={`px-1.5 py-0.5 rounded text-[10px] font-bold transition-all cursor-pointer ${
                advisor === 'female' ? 'bg-cyber-green text-obsidian-950 font-extrabold' : 'text-slate-400 hover:text-white'
              }`}
            >
              👩 F
            </button>
          </div>

          {/* Language Selector */}
          <div className="flex bg-white/5 border border-white/5 rounded-lg p-0.5" title="Speech Language">
            <button
              onClick={() => {
                setGlobalLanguage('en');
                if (isSpeaking) handleStop();
              }}
              className={`px-1 py-0.5 rounded text-[8px] font-bold transition-all ${
                language === 'en' ? 'bg-cyber-blue-light text-white font-extrabold' : 'text-slate-400'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => {
                setGlobalLanguage('hi');
                if (isSpeaking) handleStop();
              }}
              className={`px-1 py-0.5 rounded text-[8px] font-bold transition-all ${
                language === 'hi' ? 'bg-cyber-blue-light text-white font-extrabold' : 'text-slate-400'
              }`}
            >
              HI
            </button>
            <button
              onClick={() => {
                setGlobalLanguage('te');
                if (isSpeaking) handleStop();
              }}
              className={`px-1 py-0.5 rounded text-[8px] font-bold transition-all ${
                language === 'te' ? 'bg-cyber-blue-light text-white font-extrabold' : 'text-slate-400'
              }`}
            >
              TE
            </button>
          </div>

          {/* Speed Selector */}
          <select
            value={speed}
            onChange={(e) => {
              const newSpeed = parseFloat(e.target.value);
              setSpeed(newSpeed);
              if (isSpeaking) {
                // Restart to apply rate immediately
                setTimeout(() => speakText(), 100);
              }
            }}
            className="bg-white/5 border border-white/10 rounded-lg text-[9px] text-white px-1 py-0.5 font-bold focus:outline-none cursor-pointer"
            title="Speech Rate"
          >
            <option value="0.75" className="bg-obsidian-900">0.75x</option>
            <option value="1.0" className="bg-obsidian-900">1x Speed</option>
            <option value="1.25" className="bg-obsidian-900">1.25x</option>
            <option value="1.5" className="bg-obsidian-900">1.5x</option>
          </select>

          {/* Fullscreen Toggle */}
          <button
            onClick={toggleFullscreen}
            className="p-1 rounded bg-white/5 hover:bg-white/10 border border-white/5 text-slate-400 hover:text-white transition-all cursor-pointer"
            title={isFullscreen ? 'Exit Fullscreen (F)' : 'Fullscreen (F)'}
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Holographic Interactive Avatar Visualizer Window */}
      <div className="relative flex-1 flex flex-col items-center justify-center my-4 overflow-hidden rounded-2xl border border-white/5 bg-gradient-to-b from-[#0f172a]/20 to-[#020617]/90 group">
        
        {/* Simulated High-End Office Premium Background Blur */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,208,132,0.12),transparent_60%)] z-0" />
        <div className="absolute top-[10%] left-[20%] w-72 h-72 rounded-full bg-cyan-500/5 blur-3xl z-0 pointer-events-none" />

        {/* Ambient Halo Glowing Rings */}
        <div className="absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 pointer-events-none z-0">
          <div
            className={`absolute inset-0 rounded-full border border-dashed transition-all duration-1000 ${
              aiState === 'speaking'
                ? 'border-cyber-green/40 scale-110 animate-[spin_12s_linear_infinite]'
                : aiState === 'thinking'
                ? 'border-cyber-gold/40 scale-105 animate-[spin_8s_linear_infinite_reverse]'
                : aiState === 'listening'
                ? 'border-red-500/40 scale-110 animate-pulse'
                : 'border-cyber-blue/15 scale-95'
            }`}
          />
          <div
            className={`absolute inset-4 rounded-full border transition-all duration-1000 ${
              aiState === 'speaking'
                ? 'border-cyber-green/20 animate-[spin_20s_linear_infinite_reverse]'
                : aiState === 'thinking'
                ? 'border-cyber-gold/20 animate-[spin_15s_linear_infinite]'
                : 'border-cyber-blue/5'
            }`}
          />
          <div
            className={`absolute inset-0 rounded-full blur-3xl transition-all duration-1000 ${
              aiState === 'speaking'
                ? 'bg-cyber-green/10 scale-105'
                : aiState === 'thinking'
                ? 'bg-cyber-gold/10'
                : aiState === 'listening'
                ? 'bg-red-500/10'
                : 'bg-cyber-blue/5'
            }`}
          />
        </div>

        {/* Dynamic Holographic Floating HUD Info */}
        <div className="absolute top-3 left-4 text-[8px] font-mono text-slate-500 flex items-center gap-1.5 z-10 select-none">
          <AudioLines className="w-3 h-3 text-cyber-blue animate-pulse" />
          <span>AUDIO ENGINE: ACTIVE</span>
          <span className="text-white/25">|</span>
          <span>LATENCY: 42MS</span>
        </div>

        <div className="absolute top-3 right-4 text-[8px] font-mono text-slate-500 flex items-center gap-1.5 z-10 select-none">
          <span>FPS: 60</span>
          <span className="text-white/25">|</span>
          <span className="text-cyber-green uppercase font-bold">{aiState}</span>
        </div>

        {/* High-Fidelity Modular Vector Advisor Character Frame */}
        <div
          style={{
            transform: isNodding ? 'translateY(4px) rotate(0.5deg)' : 'none',
            transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
          className="relative w-52 h-52 flex items-end justify-center z-10"
        >
          <svg
            viewBox="0 0 200 200"
            className="w-full h-full drop-shadow-[0_12px_24px_rgba(0,0,0,0.8)]"
          >
            {/* BREATHING ROOT WRAPPER */}
            <g className="animate-[breathing_4s_ease-in-out_infinite]">
              
              {/* BACK HAIR (Female) */}
              {advisor === 'female' && (
                <path
                  d="M 60 120 C 60 40, 140 40, 140 120 C 140 160, 150 170, 150 180 C 140 180, 60 180, 50 180 C 50 170, 60 160, 60 120 Z"
                  fill="#111"
                />
              )}

              {/* SHOULDER & SUIT / BLAZER JACKET */}
              <g id="body">
                {advisor === 'male' ? (
                  <>
                    {/* Suit Shoulders */}
                    <path
                      d="M 40 190 Q 60 145, 100 145 Q 140 145, 160 190 Z"
                      fill="#1e293b" // Premium Charcoal suit
                      stroke="#334155"
                      strokeWidth="1.5"
                    />
                    {/* White Shirt Collar */}
                    <path d="M 85 145 L 100 160 L 115 145 Z" fill="#ffffff" />
                    <path d="M 85 145 L 95 155 L 100 145 Z" fill="#e2e8f0" />
                    <path d="M 115 145 L 105 155 L 100 145 Z" fill="#e2e8f0" />
                    {/* Royal Blue Tie */}
                    <path
                      d="M 96 153 L 104 153 L 107 185 L 100 195 L 93 185 Z"
                      fill="#2563eb"
                    />
                    <path d="M 96 153 L 104 153 L 100 162 Z" fill="#1d4ed8" />
                  </>
                ) : (
                  <>
                    {/* Blazer Shoulders */}
                    <path
                      d="M 42 190 Q 60 148, 100 148 Q 140 148, 158 190 Z"
                      fill="#1e1b4b" // Premium deep violet navy blazer
                      stroke="#312e81"
                      strokeWidth="1.5"
                    />
                    {/* Female Inner Silk Top */}
                    <path d="M 88 148 L 100 165 L 112 148 Z" fill="#ffffff" />
                    {/* Minimal Gold Necklace */}
                    <path
                      d="M 90 148 Q 100 158, 110 148"
                      fill="none"
                      stroke="#fbbf24"
                      strokeWidth="1"
                    />
                    <circle cx="100" cy="156" r="2" fill="#fbbf24" />
                    {/* Blazer Lapels */}
                    <path d="M 75 148 L 92 178 L 88 190 L 68 190 Z" fill="#111827" />
                    <path d="M 125 148 L 108 178 L 112 190 L 132 190 Z" fill="#111827" />
                  </>
                )}
              </g>

              {/* NECK */}
              <path
                d="M 88 115 L 88 148 L 112 148 L 112 115 Z"
                fill="#ffedd5" // warm Indian skin shadow
              />
              <path
                d="M 88 132 Q 100 142, 112 132 L 112 148 L 88 148 Z"
                fill="#fde047"
                opacity="0.12"
              />

              {/* HEAD WITH MICRO-GAZE & NOD SHIFTS */}
              <g
                style={{
                  transform: `translate(${eyeGaze.x}px, ${eyeGaze.y}px)`,
                  transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
              >
                {/* FACE CONTOUR */}
                <path
                  d="M 70 85 C 70 50, 130 50, 130 85 C 130 115, 115 132, 100 132 C 85 132, 70 115, 70 85 Z"
                  fill="#fed7aa" // warm rich Indian skin tone
                  stroke="#fdba74"
                  strokeWidth="1"
                />

                {/* EAR DETAILS */}
                <circle cx="68" cy="90" r="6" fill="#fed7aa" />
                <circle cx="132" cy="90" r="6" fill="#fed7aa" />
                <circle cx="68" cy="90" r="3" fill="#fdba74" opacity="0.5" />
                <circle cx="132" cy="90" r="3" fill="#fdba74" opacity="0.5" />

                {/* HAIR (FRONT) */}
                {advisor === 'male' ? (
                  <>
                    {/* Sharp modern haircut */}
                    <path
                      d="M 68 80 C 60 75, 65 50, 100 44 C 135 50, 140 75, 132 80 C 134 70, 120 54, 100 54 C 80 54, 66 70, 68 80 Z"
                      fill="#1e293b"
                    />
                    <path
                      d="M 70 70 L 130 70 C 130 54, 70 54, 70 70 Z"
                      fill="#0f172a"
                    />
                  </>
                ) : (
                  <>
                    {/* Sleek executive side partition */}
                    <path
                      d="M 68 80 C 65 40, 135 40, 132 80 C 122 55, 78 55, 68 80 Z"
                      fill="#111827"
                    />
                    {/* Front waves */}
                    <path
                      d="M 69 75 Q 85 64, 100 70 Q 115 64, 131 75 C 131 70, 115 58, 100 62 C 85 58, 69 70, 69 75 Z"
                      fill="#030712"
                    />
                  </>
                )}

                {/* EYE BROWS */}
                <g className={isSpeaking && !isPaused ? 'animate-[microEyebrow_1.2s_infinite_alternate]' : ''}>
                  {/* Left Brow */}
                  <path
                    d="M 78 76 Q 86 73, 90 77"
                    fill="none"
                    stroke="#1e293b"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  {/* Right Brow */}
                  <path
                    d="M 110 77 Q 114 73, 122 76"
                    fill="none"
                    stroke="#1e293b"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </g>

                {/* EYES (Blinking support) */}
                {isBlinking ? (
                  <>
                    {/* Closed Eye Lines */}
                    <path
                      d="M 78 85 L 90 85"
                      stroke="#1e293b"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M 110 85 L 122 85"
                      stroke="#1e293b"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                  </>
                ) : (
                  <>
                    {/* Left Eye Open */}
                    <ellipse cx="84" cy="85" rx="5" ry="3.5" fill="#ffffff" />
                    <circle cx="84" cy="85" r="2.8" fill="#1e293b" />
                    <circle cx="85" cy="83.8" r="1.1" fill="#ffffff" /> {/* Pupil shine */}
                    
                    {/* Right Eye Open */}
                    <ellipse cx="116" cy="85" rx="5" ry="3.5" fill="#ffffff" />
                    <circle cx="116" cy="85" r="2.8" fill="#1e293b" />
                    <circle cx="117" cy="83.8" r="1.1" fill="#ffffff" />
                  </>
                )}

                {/* NOSE */}
                <path
                  d="M 98 84 L 98 102 Q 100 105, 102 102"
                  fill="none"
                  stroke="#fdba74"
                  strokeWidth="2"
                  strokeLinecap="round"
                />

                {/* MOUTH - MORPHING VISUALS FOR PHONEMES */}
                <g id="mouth" className="transition-all duration-100">
                  {mouthShape === 'closed' && (
                    /* Soft Friendly Smile */
                    <path
                      d="M 88 112 Q 100 120, 112 112"
                      fill="none"
                      stroke="#ea580c"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                  )}
                  {mouthShape === 'A' && (
                    /* Tall wide oval */
                    <ellipse
                      cx="100"
                      cy="114"
                      rx="8"
                      ry="6.5"
                      fill="#ea580c"
                      stroke="#9a3412"
                      strokeWidth="1.5"
                    />
                  )}
                  {mouthShape === 'E' && (
                    /* Wide shallow oval */
                    <ellipse
                      cx="100"
                      cy="114"
                      rx="11"
                      ry="4"
                      fill="#ea580c"
                      stroke="#9a3412"
                      strokeWidth="1.5"
                    />
                  )}
                  {mouthShape === 'I' && (
                    /* Small circular slit */
                    <ellipse
                      cx="100"
                      cy="114"
                      rx="6"
                      ry="3.5"
                      fill="#ea580c"
                      stroke="#9a3412"
                      strokeWidth="1"
                    />
                  )}
                  {mouthShape === 'O' && (
                    /* Big open circle */
                    <circle
                      cx="100"
                      cy="114"
                      r="6.5"
                      fill="#ea580c"
                      stroke="#9a3412"
                      strokeWidth="1.5"
                    />
                  )}
                  {mouthShape === 'U' && (
                    /* Very small circle */
                    <circle
                      cx="100"
                      cy="114"
                      r="4.5"
                      fill="#ea580c"
                      stroke="#9a3412"
                      strokeWidth="1"
                    />
                  )}
                </g>

                {/* BLUSH FOR FRIENDLY PERSONALITY */}
                <ellipse cx="75" cy="94" rx="4" ry="2" fill="#f43f5e" opacity="0.15" />
                <ellipse cx="125" cy="94" rx="4" ry="2" fill="#f43f5e" opacity="0.15" />

              </g>
            </g>
          </svg>

          {/* Green Glowing Ring around active Speaking Avatar */}
          <div
            className={`absolute inset-0 rounded-full border-2 transition-all duration-700 pointer-events-none ${
              aiState === 'speaking'
                ? 'border-cyber-green/50 scale-100 opacity-100 shadow-[0_0_20px_rgba(0,208,132,0.3)]'
                : aiState === 'listening'
                ? 'border-red-500/50 scale-100 opacity-100 shadow-[0_0_20px_rgba(239,68,68,0.3)]'
                : 'border-transparent scale-90 opacity-0'
            }`}
          />
        </div>

        {/* Dynamic HUD Speaking Waveform Overlay */}
        <div className="absolute bottom-3 left-0 right-0 px-6 flex items-center justify-between z-10 w-full">
          <div className="flex items-center gap-1.5 bg-obsidian-950/80 backdrop-blur border border-white/5 px-2.5 py-1 rounded-full">
            <span className={`w-2 h-2 rounded-full ${aiState === 'speaking' ? 'bg-cyber-green animate-ping' : aiState === 'translating' ? 'bg-cyber-gold animate-pulse' : 'bg-slate-600'}`} />
            <span className="text-[9px] font-mono font-bold text-white uppercase tracking-wider">
              {aiState === 'speaking' ? '🎙 Speaking' : aiState === 'translating' ? '⚙ Translating' : aiState === 'thinking' ? '⚙ Thinking' : aiState === 'listening' ? '🎧 listening' : '● Idle'}
            </span>
          </div>

          {/* Core Sound Wave animation */}
          <div className="flex items-center gap-0.5 h-6">
            {[...Array(12)].map((_, i) => {
              let height = 'h-[3px]';
              let anim = {};

              if (aiState === 'speaking') {
                const dur = 0.3 + Math.random() * 0.5;
                const del = Math.random() * 0.3;
                anim = {
                  animation: `equalizerHeight ${dur}s ease-in-out infinite alternate`,
                  animationDelay: `${del}s`
                };
              } else if (aiState === 'thinking') {
                const dur = 0.8 + Math.sin(i * 0.5) * 0.4;
                anim = {
                  animation: `equalizerHeight ${dur}s ease-in-out infinite alternate`
                };
              }

              return (
                <div
                  key={i}
                  style={anim}
                  className={`w-[2.5px] rounded-full transition-all duration-300 ${height} ${
                    aiState === 'speaking'
                      ? 'bg-cyber-green shadow-[0_0_4px_#00D084]'
                      : aiState === 'thinking'
                      ? 'bg-cyber-gold'
                      : 'bg-slate-700'
                  }`}
                />
              );
            })}
          </div>
        </div>
      </div>

      {/* Live Transcript / Karaoke Subtitles Container */}
      <div className="bg-obsidian-950/60 backdrop-blur-md rounded-xl p-3 border border-white/5 flex-shrink-0 z-10 h-28 flex flex-col justify-between overflow-hidden">
        <div className="flex items-center justify-between border-b border-white/5 pb-1 mb-1 flex-shrink-0">
          <span className="text-[8px] text-slate-400 font-bold uppercase tracking-wider flex items-center gap-1">
            <Clock className="w-2.5 h-2.5 text-cyber-green" /> LIVE TRANSCRIPT
          </span>
          {isSpeaking && (
            <span className="text-[8px] font-mono text-cyber-green font-extrabold animate-pulse">
              {formatTime(speakingTimer)}
            </span>
          )}
        </div>

        {/* Word-by-word highlighted text */}
        <div className="flex-1 overflow-y-auto text-[10px] leading-relaxed text-slate-300 font-medium font-sans glass-scroll pr-1 py-1">
          {spokenWords.length > 0 ? (
            <div className="flex flex-wrap gap-x-1 gap-y-0.5">
              {spokenWords.map((word, index) => {
                const isActive = index === currentWordIdx;
                const isPassed = index < currentWordIdx;
                return (
                  <span
                    key={index}
                    className={`transition-all duration-150 rounded px-0.5 ${
                      isActive
                        ? 'text-cyber-green bg-cyber-green/15 font-extrabold shadow-[0_0_8px_rgba(0,208,132,0.2)] scale-110'
                        : isPassed
                        ? 'text-white font-semibold'
                        : 'text-slate-500'
                    }`}
                  >
                    {word}
                  </span>
                );
              })}
            </div>
          ) : (
            <p className="text-slate-500 text-[10px] italic flex items-center justify-center h-full text-center">
              {isTranslating
                ? `Advisor is translating recommendations into ${language === 'hi' ? 'Hindi (हिंदी)' : 'Telugu (తెలుగు)'}...`
                : isTyping
                ? 'Advisor is crafting detailed wealth analysis...'
                : 'The live transcript will display word-by-word here when speaking.'}
            </p>
          )}
        </div>
      </div>

      {/* Interactive Bottom Control Bar */}
      <div className="flex items-center justify-between border-t border-white/10 pt-3 z-10 mt-2 flex-shrink-0">
        {/* Left: Volume Adjustment & Mute */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsMuted((prev) => !prev)}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 text-slate-400 hover:text-white transition-all cursor-pointer"
            title={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted || volume === 0 ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-cyber-green" />}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={(e) => {
              const val = parseFloat(e.target.value);
              setVolume(val);
              if (val > 0) setIsMuted(false);
            }}
            className="w-16 h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-cyber-green"
            title="Volume Control"
          />
        </div>

        {/* Center: Play, Pause, Replay, Stop Controls */}
        <div className="flex items-center gap-2">
          {isSpeaking ? (
            <>
              {/* Pause / Resume */}
              <button
                onClick={handlePauseToggle}
                className="p-2 rounded-xl bg-cyber-gold/15 hover:bg-cyber-gold/20 border border-cyber-gold/30 text-cyber-gold transition-all flex items-center gap-1 text-[10px] font-bold cursor-pointer"
                title="Pause Speech (Space)"
              >
                {isPaused ? <PlayCircle className="w-4 h-4" /> : <PauseCircle className="w-4 h-4" />}
                <span>{isPaused ? 'Resume' : 'Pause'}</span>
              </button>

              {/* Stop speaking */}
              <button
                onClick={handleStop}
                className="p-2 rounded-xl bg-red-500/15 hover:bg-red-500/20 border border-red-500/30 text-red-400 transition-all flex items-center gap-1 text-[10px] font-bold cursor-pointer"
                title="Stop Speech"
              >
                <Square className="w-3.5 h-3.5 fill-red-400 text-red-400" />
                <span>Stop</span>
              </button>
            </>
          ) : (
            /* Replay previous response */
            <button
              onClick={handleReplay}
              disabled={!textToSpeak}
              className={`p-2 rounded-xl border transition-all flex items-center gap-1.5 text-[10px] font-extrabold cursor-pointer ${
                textToSpeak
                  ? 'bg-cyber-green/15 border-cyber-green/30 text-cyber-green hover:bg-cyber-green/25'
                  : 'bg-white/5 border-white/5 text-slate-500 cursor-not-allowed'
              }`}
              title="Replay Response (R)"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Replay Advice</span>
            </button>
          )}
        </div>

        {/* Right: Informative State Text */}
        <div className="text-[8px] font-mono text-slate-500 select-none hidden sm:block">
          SHORTCUTS: [SPACE] PAUSE/PLAY | [R] REPLAY | [F] FS
        </div>
      </div>

      {/* Character Animation Keyframes */}
      <style>{`
        @keyframes breathing {
          0% {
            transform: translateY(0px) scale(1);
          }
          50% {
            transform: translateY(-2px) scale(1.005);
          }
          100% {
            transform: translateY(0px) scale(1);
          }
        }
        @keyframes microEyebrow {
          0% {
            transform: translateY(0px);
          }
          100% {
            transform: translateY(-1.2px);
          }
        }
        @keyframes equalizerHeight {
          0% {
            height: 3px;
          }
          100% {
            height: 22px;
          }
        }
      `}</style>
    </div>
  );
};
