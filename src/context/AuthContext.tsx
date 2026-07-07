import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  type User as FirebaseUser,
} from 'firebase/auth';
import { auth, googleProvider } from '../firebase';

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
  photoURL?: string;
  uid?: string;
}

interface AuthContextProps {
  user: UserDetails | null;
  firebaseUser: FirebaseUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  biometricActive: boolean;
  login: (email: string, pass: string) => Promise<boolean>;
  googleSignIn: () => Promise<boolean>;
  otpRequest: (mobile: string) => Promise<string>;
  otpVerify: (mobile: string, code: string) => Promise<boolean>;
  signup: (details: UserDetails) => Promise<boolean>;
  biometricLogin: () => Promise<boolean>;
  enableBiometrics: () => void;
  logout: () => void;
  loadDemoUser: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

// Helper to map Firebase user to our UserDetails
function firebaseUserToDetails(fbUser: FirebaseUser, extra?: Partial<UserDetails>): UserDetails {
  return {
    fullName: fbUser.displayName || extra?.fullName || fbUser.email?.split('@')[0] || 'User',
    age: extra?.age || 30,
    occupation: extra?.occupation || 'Professional',
    annualIncome: extra?.annualIncome || 0,
    maritalStatus: extra?.maritalStatus || 'Single',
    dependents: extra?.dependents || 0,
    email: fbUser.email || '',
    mobile: fbUser.phoneNumber || extra?.mobile || '',
    riskProfile: extra?.riskProfile || 'Moderate',
    riskScore: extra?.riskScore || 55,
    photoURL: fbUser.photoURL || undefined,
    uid: fbUser.uid,
  };
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserDetails | null>(null);
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [biometricActive, setBiometricActive] = useState<boolean>(() => {
    return localStorage.getItem('finaura_biometrics') === 'enabled';
  });

  // Listen to Firebase auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (fbUser) => {
      if (fbUser) {
        // User is signed in
        const storedExtra = localStorage.getItem('finaura_user_extra');
        const extra = storedExtra ? JSON.parse(storedExtra) : {};
        const userDetails = firebaseUserToDetails(fbUser, extra);
        setUser(userDetails);
        setFirebaseUser(fbUser);
        setIsAuthenticated(true);
      } else {
        // User is signed out
        setUser(null);
        setFirebaseUser(null);
        setIsAuthenticated(false);
      }
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Email / Password Login via Firebase
  const login = async (email: string, pass: string): Promise<boolean> => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, pass);
      const userDetails = firebaseUserToDetails(result.user);
      setUser(userDetails);
      setFirebaseUser(result.user);
      setIsAuthenticated(true);
      return true;
    } catch (error: any) {
      console.error('Login error:', error.message);
      throw error;
    }
  };

  // Google Sign-In via Firebase popup
  const googleSignIn = async (): Promise<boolean> => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const userDetails = firebaseUserToDetails(result.user);
      setUser(userDetails);
      setFirebaseUser(result.user);
      setIsAuthenticated(true);
      return true;
    } catch (error: any) {
      console.error('Google sign-in error:', error.message);
      throw error;
    }
  };

  // OTP request (mock – Firebase phone auth requires recaptcha setup)
  const otpRequest = async (_mobile: string): Promise<string> => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    return '123456';
  };

  // OTP verification (mock)
  const otpVerify = async (mobile: string, code: string): Promise<boolean> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    if (code === '123456') {
      // For OTP users, create a simple session
      const mockUser: UserDetails = {
        fullName: 'OTP User',
        age: 28,
        occupation: 'Professional',
        annualIncome: 1500000,
        maritalStatus: 'Single',
        dependents: 0,
        email: `${mobile.replace(/\D/g, '')}@otp.finaura.ai`,
        mobile: mobile,
        riskProfile: 'Moderate',
        riskScore: 55,
      };
      setUser(mockUser);
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  // Email / Password Signup via Firebase
  const signup = async (details: UserDetails): Promise<boolean> => {
    try {
      // If we have a Firebase user (already authenticated), just update the profile
      if (firebaseUser) {
        const completeUser: UserDetails = {
          ...details,
          riskProfile: details.riskProfile || 'Moderate',
          riskScore: details.riskScore || 55,
          photoURL: firebaseUser.photoURL || undefined,
          uid: firebaseUser.uid,
        };

        // Update display name in Firebase
        await updateProfile(firebaseUser, { displayName: details.fullName });

        // Store extra details locally (age, income, etc. that Firebase Auth doesn't store)
        localStorage.setItem('finaura_user_extra', JSON.stringify(completeUser));

        setUser(completeUser);
        return true;
      }

      // New signup — create account with email/password
      // Use the email from details; password is the email + default (for hackathon demo)
      const result = await createUserWithEmailAndPassword(auth, details.email, 'Finaura@123');

      await updateProfile(result.user, { displayName: details.fullName });

      const completeUser: UserDetails = {
        ...details,
        riskProfile: details.riskProfile || 'Moderate',
        riskScore: details.riskScore || 55,
        uid: result.user.uid,
      };

      localStorage.setItem('finaura_user_extra', JSON.stringify(completeUser));

      setUser(completeUser);
      setFirebaseUser(result.user);
      setIsAuthenticated(true);
      return true;
    } catch (error: any) {
      console.error('Signup error:', error.message);
      throw error;
    }
  };

  // Biometric login (simulated – reads from stored session)
  const biometricLogin = async (): Promise<boolean> => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    // If Firebase has a current user, re-authenticate
    if (auth.currentUser) {
      const userDetails = firebaseUserToDetails(auth.currentUser);
      setUser(userDetails);
      setFirebaseUser(auth.currentUser);
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const enableBiometrics = () => {
    setBiometricActive(true);
    localStorage.setItem('finaura_biometrics', 'enabled');
  };

  const logout = () => {
    signOut(auth).then(() => {
      setUser(null);
      setFirebaseUser(null);
      setIsAuthenticated(false);
      localStorage.removeItem('finaura_user_extra');
    });
  };

  const loadDemoUser = () => {
    // For demo, sign in with Google for the best experience
    googleSignIn().catch(() => {
      // Fallback: use mock user if Google sign-in fails
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
      enableBiometrics();
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        firebaseUser,
        isAuthenticated,
        isLoading,
        biometricActive,
        login,
        googleSignIn,
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
