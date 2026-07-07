import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Smartphone, Mail, Fingerprint, Sparkles, TrendingUp, Compass, Award } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const AuthView: React.FC = () => {
  const { login, otpRequest, otpVerify, signup, biometricLogin, biometricActive, loadDemoUser } = useAuth();
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');
  const [loginMethod, setLoginMethod] = useState<'email' | 'otp' | 'biometric'>('email');

  // Login form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mobile, setMobile] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [authError, setAuthError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Signup form states (Multi-step)
  const [signupStep, setSignupStep] = useState(1);
  const [fullName, setFullName] = useState('');
  const [age, setAge] = useState('');
  const [occupation, setOccupation] = useState('');
  const [annualIncome, setAnnualIncome] = useState('');
  const [maritalStatus, setMaritalStatus] = useState('Single');
  const [dependents, setDependents] = useState('0');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupMobile, setSignupMobile] = useState('');

  // Onboarding Carousel states
  const [carouselIndex, setCarouselIndex] = useState(0);
  const onboardingSlides = [
    {
      icon: <Sparkles className="w-12 h-12 text-cyber-green" />,
      title: "FinAura AI Copilot",
      desc: "Hyper-personalized wealth planning powered by advanced Gemini models."
    },
    {
      icon: <TrendingUp className="w-12 h-12 text-cyber-gold" />,
      title: "Wealth Twin Simulator",
      desc: "Clone your financial self and simulate future cash flow scenarios in real time."
    },
    {
      icon: <Compass className="w-12 h-12 text-cyber-blue-light" />,
      title: "Smart Risk Engines",
      desc: "Map your asset allocation to custom products matching your risk appetite."
    }
  ];

  const handleNextCarousel = () => {
    setCarouselIndex((prev) => (prev + 1) % onboardingSlides.length);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setIsSubmitting(true);
    try {
      const success = await login(email, password);
      if (!success) setAuthError('Invalid credentials. Password must be 6+ characters.');
    } catch {
      setAuthError('Authentication failed.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRequestOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    if (!mobile.match(/^\+?[0-9]{10,12}$/)) {
      setAuthError('Enter a valid mobile number with country code.');
      return;
    }
    setIsSubmitting(true);
    try {
      await otpRequest(mobile);
      setOtpSent(true);
    } catch {
      setAuthError('OTP Request failed.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setIsSubmitting(true);
    try {
      const success = await otpVerify(mobile, otpCode);
      if (!success) setAuthError('Invalid code. Use mock code: 123456');
    } catch {
      setAuthError('Verification failed.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBiometricLogin = async () => {
    setAuthError('');
    setIsSubmitting(true);
    try {
      const success = await biometricLogin();
      if (!success) setAuthError('Biometric verification failed.');
    } catch {
      setAuthError('Biometrics unavailable.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    
    if (signupStep < 2) {
      if (!fullName || !age || !signupEmail || !signupMobile) {
        setAuthError('Please fill in all details.');
        return;
      }
      setSignupStep(2);
      return;
    }

    if (!occupation || !annualIncome) {
      setAuthError('Please provide income and occupation.');
      return;
    }

    setIsSubmitting(true);
    try {
      // Calculate a default risk score based on age and income
      const parsedAge = parseInt(age, 10);
      const parsedIncome = parseInt(annualIncome, 10);
      const baseScore = 50 + (parsedIncome > 1200000 ? 15 : 0) - (parsedAge > 45 ? 15 : 0);
      const riskProfile = baseScore > 65 ? 'Aggressive' : baseScore < 45 ? 'Conservative' : 'Moderate';

      const success = await signup({
        fullName,
        age: parsedAge,
        occupation,
        annualIncome: parsedIncome,
        maritalStatus,
        dependents: parseInt(dependents, 10),
        email: signupEmail,
        mobile: signupMobile,
        riskProfile,
        riskScore: baseScore
      });

      if (!success) setAuthError('Registration failed. Try again.');
    } catch {
      setAuthError('Signup error.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 relative overflow-hidden bg-obsidian-950">
      
      {/* Background Neon Gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-cyber-green/10 blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-cyber-gold/5 blur-[120px]" />
      <div className="absolute top-[40%] right-[10%] w-[30%] h-[30%] rounded-full bg-cyber-blue/10 blur-[100px]" />

      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-12 rounded-3xl overflow-hidden glass-panel border-white/10 z-10 shadow-2xl">
        
        {/* Left Side: Onboarding Carousel */}
        <div className="md:col-span-5 p-8 flex flex-col justify-between bg-gradient-to-br from-obsidian-900/90 to-obsidian-950/90 border-r border-white/5 relative">
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyber-green to-cyber-gold flex items-center justify-center shadow-neon-green">
              <Sparkles className="w-5 h-5 text-obsidian-950 font-bold" />
            </div>
            <div>
              <span className="font-extrabold text-2xl tracking-wide bg-gradient-to-r from-white via-slate-200 to-cyber-green bg-clip-text text-transparent">FinAura AI</span>
              <p className="text-[10px] text-cyber-green uppercase tracking-widest font-semibold">Wealth Autopilot</p>
            </div>
          </div>

          <div className="my-12 min-h-[220px] flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={carouselIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="space-y-4"
              >
                <div className="mb-4">{onboardingSlides[carouselIndex].icon}</div>
                <h2 className="text-3xl font-extrabold tracking-tight text-white leading-tight">
                  {onboardingSlides[carouselIndex].title}
                </h2>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {onboardingSlides[carouselIndex].desc}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Dots */}
            <div className="flex gap-2 mt-8">
              {onboardingSlides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCarouselIndex(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    idx === carouselIndex ? 'w-8 bg-cyber-green shadow-neon-green' : 'w-2 bg-white/20'
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={handleNextCarousel}
              className="text-xs text-cyber-green font-semibold hover:text-white flex items-center gap-1 transition-colors"
            >
              Explore Next Innovation &rarr;
            </button>
            <div className="pt-4 border-t border-white/5">
              <p className="text-slate-500 text-[11px]">
                Secured by military-grade AES-256 encryption. Integrated with national banking gateway regulatory interfaces.
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Auth Forms */}
        <div className="md:col-span-7 p-8 md:p-12 flex flex-col justify-center bg-obsidian-950/80">
          
          <div className="flex gap-4 mb-8 border-b border-white/5 pb-2">
            <button
              onClick={() => { setActiveTab('login'); setAuthError(''); }}
              className={`text-lg font-bold pb-2 transition-all relative ${
                activeTab === 'login' ? 'text-white' : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              Sign In
              {activeTab === 'login' && (
                <motion.div layoutId="activeTabUnderline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyber-green" />
              )}
            </button>
            <button
              onClick={() => { setActiveTab('signup'); setAuthError(''); setSignupStep(1); }}
              className={`text-lg font-bold pb-2 transition-all relative ${
                activeTab === 'signup' ? 'text-white' : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              Create Account
              {activeTab === 'signup' && (
                <motion.div layoutId="activeTabUnderline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyber-green" />
              )}
            </button>
          </div>

          {authError && (
            <div className="mb-4 p-3 rounded-xl bg-red-900/30 border border-red-500/30 text-red-300 text-xs font-semibold">
              {authError}
            </div>
          )}

          {activeTab === 'login' ? (
            <div className="space-y-6">
              
              {/* Login Method Buttons */}
              <div className="grid grid-cols-3 gap-2 bg-obsidian-900/80 p-1.5 rounded-xl border border-white/5">
                <button
                  type="button"
                  onClick={() => setLoginMethod('email')}
                  className={`py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                    loginMethod === 'email' ? 'bg-white/10 text-white border border-white/10' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Mail className="w-3.5 h-3.5" /> Email
                </button>
                <button
                  type="button"
                  onClick={() => setLoginMethod('otp')}
                  className={`py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                    loginMethod === 'otp' ? 'bg-white/10 text-white border border-white/10' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Smartphone className="w-3.5 h-3.5" /> OTP Mobile
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (!biometricActive) {
                      setAuthError("Simulated biometrics is currently disabled. Please Sign Up or click 'Quick Demo Account' to enable.");
                      return;
                    }
                    setLoginMethod('biometric');
                  }}
                  className={`py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                    loginMethod === 'biometric' ? 'bg-white/10 text-white border border-white/10' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Fingerprint className="w-3.5 h-3.5" /> Face/Touch ID
                </button>
              </div>

              {/* Email Form */}
              {loginMethod === 'email' && (
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">Email Address</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@bank.com"
                      required
                      className="w-full glass-input"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1.5">
                      <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">Password</label>
                      <button
                        type="button"
                        onClick={() => alert("Password reset link sent! (Mocking)")}
                        className="text-xs text-cyber-green hover:underline font-semibold"
                      >
                        Forgot Password?
                      </button>
                    </div>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                      className="w-full glass-input"
                    />
                  </div>
                  <button type="submit" disabled={isSubmitting} className="w-full glass-btn-primary mt-2">
                    {isSubmitting ? 'Decrypting Secure Vault...' : 'Access My Wealth'}
                  </button>
                </form>
              )}

              {/* OTP Form */}
              {loginMethod === 'otp' && (
                <form onSubmit={otpSent ? handleVerifyOtp : handleRequestOtp} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">Registered Mobile Number</label>
                    <input
                      type="text"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      placeholder="+91 XXXXX XXXXX"
                      disabled={otpSent}
                      required
                      className="w-full glass-input"
                    />
                  </div>
                  {otpSent && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-2"
                    >
                      <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">Enter OTP Code</label>
                      <input
                        type="text"
                        value={otpCode}
                        onChange={(e) => setOtpCode(e.target.value)}
                        placeholder="Enter 123456"
                        maxLength={6}
                        required
                        className="w-full glass-input text-center text-xl tracking-[0.5em] font-mono"
                      />
                      <span className="text-[11px] text-cyber-green text-center block">Test OTP sent! Use mock code: <strong>123456</strong></span>
                    </motion.div>
                  )}
                  <button type="submit" disabled={isSubmitting} className="w-full glass-btn-primary mt-2">
                    {isSubmitting ? 'Transmitting Data...' : otpSent ? 'Verify OTP Security Code' : 'Send Authentication Code'}
                  </button>
                </form>
              )}

              {/* Biometric Form */}
              {loginMethod === 'biometric' && (
                <div className="flex flex-col items-center justify-center py-6 space-y-6">
                  <motion.div
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="w-20 h-20 rounded-full bg-cyber-green/10 border border-cyber-green/40 flex items-center justify-center cursor-pointer shadow-neon-green"
                    onClick={handleBiometricLogin}
                  >
                    <Fingerprint className="w-10 h-10 text-cyber-green" />
                  </motion.div>
                  <div className="text-center space-y-1">
                    <p className="text-white text-sm font-semibold">Simulated Biometrics Active</p>
                    <p className="text-slate-400 text-xs">Tap scanner or look at front camera to authenticate</p>
                  </div>
                  <button
                    onClick={handleBiometricLogin}
                    disabled={isSubmitting}
                    className="w-full glass-btn-primary"
                  >
                    {isSubmitting ? 'Validating Biometric Signal...' : 'Scan Fingerprint (Demo)'}
                  </button>
                </div>
              )}

              {/* Quick Demo Login Option */}
              <div className="relative flex py-2 items-center">
                <div className="flex-grow border-t border-white/5"></div>
                <span className="flex-shrink mx-4 text-slate-500 text-xs">HACKATHON QUICK START</span>
                <div className="flex-grow border-t border-white/5"></div>
              </div>

              <button
                type="button"
                onClick={loadDemoUser}
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-cyber-green/20 via-cyber-gold/20 to-cyber-blue/20 hover:from-cyber-green/30 hover:via-cyber-gold/30 hover:to-cyber-blue/30 text-white font-bold border border-white/10 shadow-lg text-sm flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <Award className="w-4 h-4 text-cyber-gold" />
                Quick Demo Account (Pre-Populated)
              </button>

            </div>
          ) : (
            // Sign Up Form (Wizard)
            <form onSubmit={handleSignup} className="space-y-4">
              <div className="flex justify-between items-center text-xs text-slate-400 font-semibold mb-2">
                <span>STEP {signupStep} OF 2</span>
                <span>{signupStep === 1 ? 'PERSONAL BIO' : 'FINANCIAL BIO'}</span>
              </div>

              {signupStep === 1 ? (
                // Step 1: Personal Details
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">Full Name</label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Aravind Sharma"
                      required
                      className="w-full glass-input"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">Age</label>
                      <input
                        type="number"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        placeholder="32"
                        required
                        className="w-full glass-input"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">Mobile Number</label>
                      <input
                        type="text"
                        value={signupMobile}
                        onChange={(e) => setSignupMobile(e.target.value)}
                        placeholder="+91 98765 43210"
                        required
                        className="w-full glass-input"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">Email Address</label>
                    <input
                      type="email"
                      value={signupEmail}
                      onChange={(e) => setSignupEmail(e.target.value)}
                      placeholder="aravind@finaura.ai"
                      required
                      className="w-full glass-input"
                    />
                  </div>
                  <button type="submit" className="w-full glass-btn-primary mt-2">
                    Proceed to Financial Details &rarr;
                  </button>
                </div>
              ) : (
                // Step 2: Financial Details
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">Occupation</label>
                      <select
                        value={occupation}
                        onChange={(e) => setOccupation(e.target.value)}
                        required
                        className="w-full glass-input"
                      >
                        <option value="" disabled className="bg-obsidian-950 text-slate-300">Select...</option>
                        <option value="Senior Software Engineer" className="bg-obsidian-950 text-slate-100">Tech Engineer</option>
                        <option value="Corporate Executive" className="bg-obsidian-950 text-slate-100">Corporate Manager</option>
                        <option value="Doctor / Medical professional" className="bg-obsidian-950 text-slate-100">Medical Professional</option>
                        <option value="Consultant" className="bg-obsidian-950 text-slate-100">Consultant</option>
                        <option value="Self Employed Business" className="bg-obsidian-950 text-slate-100">Business Owner</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">Annual Income (Rs.)</label>
                      <input
                        type="number"
                        value={annualIncome}
                        onChange={(e) => setAnnualIncome(e.target.value)}
                        placeholder="1800000"
                        required
                        className="w-full glass-input"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">Marital Status</label>
                      <select
                        value={maritalStatus}
                        onChange={(e) => setMaritalStatus(e.target.value)}
                        className="w-full glass-input"
                      >
                        <option value="Single" className="bg-obsidian-950">Single</option>
                        <option value="Married" className="bg-obsidian-950">Married</option>
                        <option value="Divorced" className="bg-obsidian-950">Divorced</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">Dependents</label>
                      <input
                        type="number"
                        value={dependents}
                        onChange={(e) => setDependents(e.target.value)}
                        placeholder="2"
                        className="w-full glass-input"
                      />
                    </div>
                  </div>
                  
                  <div className="flex gap-4 mt-4">
                    <button
                      type="button"
                      onClick={() => setSignupStep(1)}
                      className="w-1/3 glass-btn-secondary"
                    >
                      &larr; Back
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-2/3 glass-btn-primary"
                    >
                      {isSubmitting ? 'Registering Portfolio...' : 'Complete & Compute Risk'}
                    </button>
                  </div>
                </div>
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
