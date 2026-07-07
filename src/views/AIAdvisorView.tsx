import React, { useState, useRef, useEffect } from 'react';
import { useWealth } from '../context/WealthContext';
import { useAuth } from '../context/AuthContext';
import { getGeminiResponse } from '../utils/gemini';
import { faqCategories } from '../utils/bankingAnswers';
import {
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Send,
  Sparkles,
  Bot,
  User,
  ArrowRight,
  HelpCircle,
  BookOpen
} from 'lucide-react';
import { AIAvatar } from '../components/AIAvatar';
import { useLanguage } from '../context/LanguageContext';


interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: Date;
}

export const AIAdvisorView: React.FC = () => {
  const { user } = useAuth();
  const wealthContext = useWealth();
  const { geminiApiKey } = wealthContext;
  const { language } = useLanguage();

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm-1',
      sender: 'ai',
      text: `### Hello ${user?.fullName || 'User'}! I am FinAura AI 🌟\n\nI have completed analyzing your wealth parameters:\n- **Surplus savings rate**: ${Math.round((wealthContext.monthlySavings / 150000) * 100)}%\n- **Risk profile**: ${user?.riskProfile || 'Moderate'}\n- **Net worth**: Rs. ${wealthContext.netWorth.toLocaleString('en-IN')}\n\nAsk me any question or try one of the suggestions below!`,
      timestamp: new Date()
    }
  ]);
  const [translatedTexts, setTranslatedTexts] = useState<Record<string, Record<string, string>>>({});
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [voiceOutputEnabled, setVoiceOutputEnabled] = useState(true);
  const [isSpeechActive, setIsSpeechActive] = useState(false);
  const [activeCategoryIdx, setActiveCategoryIdx] = useState(0);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const recognitionRef = useRef<any>(null);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Background Translation Effect
  const translatingMsgsRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    if (language === 'en') return;

    messages.forEach((msg) => {
      if (msg.sender === 'ai') {
        const cacheKey = `${msg.id}_${language}`;
        if (translatingMsgsRef.current.has(cacheKey)) return;

        const hasTranslation = translatedTexts[msg.id]?.[language];
        if (!hasTranslation) {
          translatingMsgsRef.current.add(cacheKey);

          fetch('/api/translate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: msg.text, lang: language })
          })
            .then(res => {
              if (!res.ok) {
                throw new Error(`Server returned status ${res.status}`);
              }
              return res.json();
            })
            .then(data => {
              if (data && data.text) {
                setTranslatedTexts(prev => ({
                  ...prev,
                  [msg.id]: {
                    ...prev[msg.id],
                    [language]: data.text
                  }
                }));
              }
            })
            .catch(err => {
              console.error("Failed to translate message in background:", err);
            });
        }
      }
    });
  }, [messages, language, translatedTexts]);

  // Stop speaking when user exits this view
  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  // Keep handleSend ref updated to avoid stale closures in Web Speech API
  const handleSendRef = useRef<(text: string) => Promise<void>>(null as any);

  // Speech Recognition (Speech-to-Text) Setup
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const rec = new SpeechRecognition();
      rec.continuous = false;
      rec.interimResults = false;
      rec.lang = language === 'hi' ? 'hi-IN' : language === 'te' ? 'te-IN' : 'en-IN';

      rec.onstart = () => {
        setIsListening(true);
      };

      rec.onresult = (event: any) => {
        const text = event.results[0][0].transcript;
        setInput(text);
        // Automatically submit the voice query
        handleSendRef.current(text);
      };

      rec.onend = () => {
        setIsListening(false);
      };

      rec.onerror = (e: any) => {
        console.error(e);
        setIsListening(false);
      };

      recognitionRef.current = rec;
    }
  }, []);

  // Update language dynamically when app language changes
  useEffect(() => {
    if (recognitionRef.current) {
      recognitionRef.current.lang = language === 'hi' ? 'hi-IN' : language === 'te' ? 'te-IN' : 'en-IN';
    }
  }, [language]);

  const handleToggleVoiceInput = () => {
    if (!recognitionRef.current) {
      alert("Speech recognition is not supported on this browser version. Use Google Chrome or Microsoft Edge for full support.");
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
    } else {
      // Clear input and start recording
      setInput('');
      recognitionRef.current.start();
    }
  };

  const handleSend = async (textToSend: string) => {
    if (!textToSend.trim()) return;

    // User message
    const userMsg: Message = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const response = await getGeminiResponse(
        textToSend,
        {
          user,
          transactions: wealthContext.transactions,
          goals: wealthContext.goals,
          balance: wealthContext.balance,
          investments: wealthContext.investments,
          carbonScore: wealthContext.carbonScore,
          wealthHealthScore: wealthContext.wealthHealthScore,
          emergencyFund: wealthContext.emergencyFund
        },
        geminiApiKey
      );

      const aiMsg: Message = {
        id: `msg-${Date.now() + 1}`,
        sender: 'ai',
        text: response,
        timestamp: new Date()
      };

      setIsTyping(false);
      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      console.error(err);
      setIsTyping(false);
      
      const errorMsg: Message = {
        id: `msg-${Date.now() + 1}`,
        sender: 'ai',
        text: "I encountered a digital signal error. Please check your Gemini API key in the Settings panel, or proceed using the simulated local fallback advisor.",
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, errorMsg]);
    }
  };

  handleSendRef.current = handleSend;

  const presetSuggestions = [
    "Can I invest Rs. 10000 monthly?",
    "Am I overspending?",
    "How much should I save?",
    "Suggest a retirement plan.",
    "How can I reduce expenses?"
  ];

  // Helper to render markdown-like structures
  const renderMessageText = (text: string) => {
    const lines = text.split('\n');
    return lines.map((line, idx) => {
      if (line.startsWith('### ')) {
        return <h4 key={idx} className="text-sm font-extrabold text-white mt-3 mb-1.5 uppercase tracking-wide">{line.replace('### ', '')}</h4>;
      }
      if (line.startsWith('- ')) {
        return (
          <li key={idx} className="ml-4 list-disc text-slate-300 text-xs mb-1">
            {line.replace('- ', '')}
          </li>
        );
      }
      // Simple bold parser
      const boldRegex = /\*\*(.*?)\*\*/g;
      const parts = [];
      let lastIndex = 0;
      let match;
      
      while ((match = boldRegex.exec(line)) !== null) {
        if (match.index > lastIndex) {
          parts.push(line.slice(lastIndex, match.index));
        }
        parts.push(<strong key={match.index} className="text-cyber-green font-bold">{match[1]}</strong>);
        lastIndex = boldRegex.lastIndex;
      }
      
      if (lastIndex < line.length) {
        parts.push(line.slice(lastIndex));
      }

      return (
        <p key={idx} className="text-xs text-slate-300 leading-relaxed mb-2 font-medium">
          {parts.length > 0 ? parts : line}
        </p>
      );
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[calc(100vh-120px)]">
      
      {/* Left Column: Chat Window (8 Cols) */}
      <div className="lg:col-span-8 glass-panel rounded-2xl flex flex-col justify-between overflow-hidden h-full">
        
        {/* Chat Header */}
        <div className="p-4 bg-obsidian-950/60 border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-cyber-green/10 border border-cyber-green/30 flex items-center justify-center relative">
              <Bot className="w-5 h-5 text-cyber-green" />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-cyber-green border border-obsidian-950" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-white">FinAura AI Coach</h3>
              <p className="text-[10px] text-slate-400 font-semibold flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-cyber-gold" /> Powered by Gemini
              </p>
            </div>
          </div>

          <div className="flex gap-2">
            {/* TTS Mute Toggle */}
            <button
              onClick={() => {
                const nextVal = !voiceOutputEnabled;
                setVoiceOutputEnabled(nextVal);
                if (!nextVal) {
                  window.speechSynthesis.cancel();
                  setIsSpeechActive(false);
                }
              }}
              className={`p-2 rounded-lg border transition-all cursor-pointer ${
                voiceOutputEnabled
                  ? 'bg-cyber-green/15 border-cyber-green/30 text-cyber-green'
                  : 'bg-white/5 border-white/5 text-slate-400 hover:text-slate-200'
              }`}
              title={voiceOutputEnabled ? 'Mute AI Voice' : 'Unmute AI Voice'}
            >
              {voiceOutputEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Chat History Panel */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 glass-scroll bg-gradient-to-b from-obsidian-950/20 to-obsidian-900/10">
          {messages.map((msg) => {
            const isAI = msg.sender === 'ai';
            return (
              <div
                key={msg.id}
                className={`flex gap-3 max-w-[85%] ${isAI ? 'mr-auto' : 'ml-auto flex-row-reverse'}`}
              >
                <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center border ${
                  isAI ? 'bg-cyber-green/10 border-cyber-green/20 text-cyber-green' : 'bg-white/5 border-white/10 text-slate-300'
                }`}>
                  {isAI ? <Bot className="w-4.5 h-4.5" /> : <User className="w-4.5 h-4.5" />}
                </div>

                <div className={`p-4 rounded-2xl ${
                  isAI ? 'bg-obsidian-900/60 border border-white/5 rounded-tl-sm' : 'bg-cyber-green text-obsidian-950 rounded-tr-sm shadow-neon-green'
                }`}>
                  {isAI ? (
                    <div>
                      {isAI && language !== 'en' && !translatedTexts[msg.id]?.[language] && (
                        <p className="text-[9px] text-cyber-gold font-bold flex items-center gap-1 mb-1.5 animate-pulse">
                          <span>⚙</span> Translating to {language === 'hi' ? 'Hindi' : 'Telugu'}...
                        </p>
                      )}
                      {renderMessageText((language !== 'en' && translatedTexts[msg.id]?.[language]) ? translatedTexts[msg.id][language] : msg.text)}
                    </div>
                  ) : (
                    <p className="text-xs font-bold leading-relaxed">{msg.text}</p>
                  )}
                  <span className={`text-[8px] font-medium block mt-2 text-right ${isAI ? 'text-slate-500' : 'text-obsidian-900/60'}`}>
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            );
          })}

          {/* Typing bubble loader */}
          {isTyping && (
            <div className="flex gap-3 mr-auto max-w-[85%]">
              <div className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center bg-cyber-green/10 border border-cyber-green/20 text-cyber-green">
                <Bot className="w-4.5 h-4.5" />
              </div>
              <div className="p-4 rounded-2xl bg-obsidian-900/60 border border-white/5 rounded-tl-sm flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-cyber-green animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 rounded-full bg-cyber-green animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 rounded-full bg-cyber-green animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Controls */}
        <div className="p-4 border-t border-white/5 bg-obsidian-950/40">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend(input);
            }}
            className="flex items-center gap-2"
          >
            {/* Voice Input STT */}
            <button
              type="button"
              onClick={handleToggleVoiceInput}
              className={`p-3 rounded-xl border cursor-pointer transition-all ${
                isListening
                  ? 'bg-red-500/20 border-red-500/30 text-red-400 shadow-neon-gold pulse-glow-gold'
                  : 'bg-white/5 border-white/5 text-slate-400 hover:text-slate-200'
              }`}
              title="Voice Input (Speech to Text)"
            >
              {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </button>

            <div className="flex-1 relative flex items-center">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={isListening ? "Listening... Speak now" : "Ask FinAura AI (e.g. Can I save Rs. 10000?)"}
                className="w-full glass-input focus:ring-cyber-green focus:border-transparent py-3.5 pr-14 text-xs font-semibold"
                disabled={isListening}
              />
              {isListening && (
                <div className="absolute right-3 flex items-center gap-1">
                  <span className="w-1.5 h-3 bg-red-400 rounded-full animate-bounce" style={{ animationDelay: '0s', animationDuration: '0.6s' }} />
                  <span className="w-1.5 h-5 bg-red-400 rounded-full animate-bounce" style={{ animationDelay: '0.15s', animationDuration: '0.6s' }} />
                  <span className="w-1.5 h-3 bg-red-400 rounded-full animate-bounce" style={{ animationDelay: '0.3s', animationDuration: '0.6s' }} />
                </div>
              )}
            </div>

            <button
              type="submit"
              className="p-3.5 rounded-xl bg-cyber-green text-obsidian-950 hover:bg-cyber-green-light shadow-neon-green font-bold transition-all hover:scale-105"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

      </div>

      {/* Right Column: Suggestions & Assistant Avatar Info (4 Cols) */}
      <div className="lg:col-span-4 space-y-6 flex flex-col justify-between h-full">
        
        {/* Live Interactive AIAvatar */}
        <AIAvatar
          isSpeaking={isSpeechActive}
          isTyping={isTyping}
          textToSpeak={
            (() => {
              const latestAiMsg = [...messages].reverse().find(m => m.sender === 'ai');
              if (!latestAiMsg) return '';
              return (language !== 'en' && translatedTexts[latestAiMsg.id]?.[language])
                ? translatedTexts[latestAiMsg.id][language]
                : latestAiMsg.text;
            })()
          }
          onSpeechStateChange={(speaking) => setIsSpeechActive(speaking)}
        />

        {/* Suggestion Chips / FAQ Explorer */}
        <div className="glass-panel rounded-2xl p-5 space-y-4 flex flex-col flex-1 min-h-0 overflow-hidden">
          <h4 className="text-xs font-extrabold text-white uppercase tracking-wider flex items-center gap-2 flex-shrink-0">
            <BookOpen className="w-4 h-4 text-cyber-gold" /> Advisory Q&A Directory
          </h4>
          <p className="text-[11px] text-slate-400 flex-shrink-0">
            Select a category to browse and run real financial analytics questions instantly.
          </p>

          {/* Category Dropdown Selector */}
          <div className="flex-shrink-0">
            <select
              value={activeCategoryIdx}
              onChange={(e) => setActiveCategoryIdx(parseInt(e.target.value, 10))}
              className="w-full glass-input focus:ring-cyber-green focus:border-transparent py-2.5 text-xs font-semibold bg-obsidian-900 border border-white/10 rounded-xl text-white cursor-pointer"
            >
              {faqCategories.map((cat, idx) => (
                <option key={cat.id} value={idx} className="bg-obsidian-950 text-white">
                  {cat.name} ({cat.questions.length} Qs)
                </option>
              ))}
            </select>
          </div>

          {/* Questions list, scrollable */}
          <div className="flex-1 overflow-y-auto space-y-2 pr-1 glass-scroll min-h-[160px] max-h-[260px]">
            {faqCategories[activeCategoryIdx].questions.map((qItem) => (
              <button
                key={qItem.question}
                onClick={() => handleSend(qItem.question)}
                className="w-full text-left p-2.5 text-[11px] font-semibold rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-cyber-green/30 hover:text-cyber-green transition-all flex items-center justify-between group cursor-pointer"
              >
                <span className="truncate pr-2">{qItem.question}</span>
                <ArrowRight className="w-3 h-3 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity text-cyber-green" />
              </button>
            ))}
          </div>
        </div>

        {/* Live System Specs info */}
        <div className="glass-panel rounded-2xl p-5 space-y-3 bg-gradient-to-br from-obsidian-900 to-obsidian-950">
          <span className="text-[9px] text-cyber-green font-bold uppercase tracking-wider flex items-center gap-1">&bull; COGNITIVE ENGINE SPEC</span>
          
          <div className="space-y-2 text-[11px] text-slate-400">
            <div className="flex justify-between border-b border-white/5 pb-1.5">
              <span>Primary Model</span>
              <span className="text-white font-bold">Gemini 2.5 Flash</span>
            </div>
            <div className="flex justify-between border-b border-white/5 pb-1.5">
              <span>Token Windows</span>
              <span className="text-white font-bold">1M Context</span>
            </div>
            <div className="flex justify-between border-b border-white/5 pb-1.5">
              <span>Response Mode</span>
              <span className="text-cyber-green font-bold flex items-center gap-1">
                {geminiApiKey ? 'Live API Connected' : 'Simulated Sandbox'}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Voice Speech Synthesis</span>
              <span className="text-white font-bold">{voiceOutputEnabled ? 'Enabled' : 'Muted'}</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
