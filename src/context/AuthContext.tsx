import React, { createContext, useContext, useState, useEffect } from 'react';

export interface UserDetails {
  fullName: string;
  age: number;
  occupation: string;
  annualIncome: number;
  maritalStatus: string;
  dependents: number;
  email: string;
  mobile: string;
  riskProfile?: 'Conservative' | 'Moderate' | 'Aggressive';
  riskScore?: number;
}

interface AuthContextProps {
  user: UserDetails | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  biometricActive: boolean;
  login: (email: string, pass: string) => Promise<boolean>;
  otpRequest: (mobile: string) => Promise<string>;
  otpVerify: (mobile: string, code: string) => Promise<boolean>;
  signup: (details: UserDetails) => Promise<boolean>;
  biometricLogin: () => Promise<boolean>;
  enableBiometrics: () => void;
  logout: () => void;
  loadDemoUser: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserDetails | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [biometricActive, setBiometricActive] = useState<boolean>(() => {
    return localStorage.getItem('finaura_biometrics') === 'enabled';
  });

  useEffect(() => {
    const storedUser = localStorage.getItem('finaura_user');
    const token = localStorage.getItem('finaura_token');
    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, pass: string): Promise<boolean> => {
    // Simulated delay
    await new Promise((resolve) => setTimeout(resolve, 800));
    if (email && pass.length >= 6) {
      const mockUser: UserDetails = {
        fullName: 'Aravind Sharma',
        age: 32,
        occupation: 'Senior Software Engineer',
        annualIncome: 1800000,
        maritalStatus: 'Married',
        dependents: 2,
        email: email,
        mobile: '+91 98765 43210',
        riskProfile: 'Moderate',
        riskScore: 65,
      };
      setUser(mockUser);
      setIsAuthenticated(true);
      localStorage.setItem('finaura_user', JSON.stringify(mockUser));
      localStorage.setItem('finaura_token', 'mock-jwt-token-xyz');
      return true;
    }
    return false;
  };

  const otpRequest = async (_mobile: string): Promise<string> => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    // Always return mock OTP code
    return '123456';
  };

  const otpVerify = async (mobile: string, code: string): Promise<boolean> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    if (code === '123456') {
      const mockUser: UserDetails = {
        fullName: 'Kiran Reddy',
        age: 28,
        occupation: 'Product Manager',
        annualIncome: 1500000,
        maritalStatus: 'Single',
        dependents: 0,
        email: 'kiran.reddy@wealth.in',
        mobile: mobile,
        riskProfile: 'Aggressive',
        riskScore: 82,
      };
      setUser(mockUser);
      setIsAuthenticated(true);
      localStorage.setItem('finaura_user', JSON.stringify(mockUser));
      localStorage.setItem('finaura_token', 'mock-jwt-token-otp');
      return true;
    }
    return false;
  };

  const signup = async (details: UserDetails): Promise<boolean> => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const completeUser = {
      ...details,
      riskProfile: details.riskProfile || 'Moderate',
      riskScore: details.riskScore || 55,
    };
    setUser(completeUser);
    setIsAuthenticated(true);
    localStorage.setItem('finaura_user', JSON.stringify(completeUser));
    localStorage.setItem('finaura_token', 'mock-jwt-token-signup');
    return true;
  };

  const biometricLogin = async (): Promise<boolean> => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    const storedUser = localStorage.getItem('finaura_user_backup');
    const mockUser: UserDetails = storedUser ? JSON.parse(storedUser) : {
      fullName: 'Aarav Mehta',
      age: 35,
      occupation: 'Investment Analyst',
      annualIncome: 2400000,
      maritalStatus: 'Married',
      dependents: 1,
      email: 'aarav.mehta@finaura.ai',
      mobile: '+91 99988 87766',
      riskProfile: 'Aggressive',
      riskScore: 78,
    };
    setUser(mockUser);
    setIsAuthenticated(true);
    localStorage.setItem('finaura_user', JSON.stringify(mockUser));
    localStorage.setItem('finaura_token', 'mock-jwt-token-biometric');
    return true;
  };

  const enableBiometrics = () => {
    setBiometricActive(true);
    localStorage.setItem('finaura_biometrics', 'enabled');
    if (user) {
      localStorage.setItem('finaura_user_backup', JSON.stringify(user));
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('finaura_user');
    localStorage.removeItem('finaura_token');
  };

  const loadDemoUser = () => {
    const demoUser: UserDetails = {
      fullName: 'Vikram Aditya',
      age: 34,
      occupation: 'Business consultant',
      annualIncome: 2200000,
      maritalStatus: 'Married',
      dependents: 2,
      email: 'vikram.aditya@executive.in',
      mobile: '+91 98888 77777',
      riskProfile: 'Moderate',
      riskScore: 68,
    };
    setUser(demoUser);
    setIsAuthenticated(true);
    localStorage.setItem('finaura_user', JSON.stringify(demoUser));
    localStorage.setItem('finaura_token', 'mock-jwt-token-demo');
    enableBiometrics();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        biometricActive,
        login,
        otpRequest,
        otpVerify,
        signup,
        biometricLogin,
        enableBiometrics,
        logout,
        loadDemoUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
