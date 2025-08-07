'use client';

import { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser, useAuth as useClerkAuth, useSignIn, useSignUp } from '@clerk/nextjs';
import { motion } from 'framer-motion';

type User = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
};

type ClerkAuthContextType = {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  register: (userData: any) => Promise<void>;
  logout: () => Promise<void>;
  error: string | null;
};

const ClerkAuthContext = createContext<ClerkAuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(ClerkAuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within a ClerkAuthProvider');
  }
  return context;
}

export function ClerkAuthProvider({ children }: { children: ReactNode }) {
  // Temporary placeholder values until we migrate fully to direct Clerk hooks
  const clerkUser = null;
  const isClerkLoaded = true;
  const signOut = async () => {};
  const signIn = null;
  const setSignInActive = async () => {};
  const signUp = null;
  const setSignUpActive = async () => {};
  
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Map Clerk user to our User type
  useEffect(() => {
    if (isClerkLoaded) {
      if (clerkUser) {
        // Get role from public metadata
        const role = clerkUser.publicMetadata.role as string || 'CLIENT';
        
        setUser({
          id: clerkUser.id,
          email: clerkUser.primaryEmailAddress?.emailAddress || '',
          firstName: clerkUser.firstName || '',
          lastName: clerkUser.lastName || '',
          role: role,
        });
      } else {
        setUser(null);
      }
      setIsLoading(false);
    }
  }, [clerkUser, isClerkLoaded]);

  // Handle role-based redirects
  useEffect(() => {
    if (!isLoading && user) {
      // Redirect based on role
      if (user.role === 'PROVIDER') {
        router.push('/provider-dashboard');
      } else {
        router.push('/dashboard');
      }
    }
  }, [user, isLoading, router]);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await signIn?.create({
        identifier: email,
        password,
      });
      
      if (result?.status === 'complete') {
        await setSignInActive({ session: result.createdSessionId });
      } else {
        throw new Error('Login failed');
      }
    } catch (err: any) {
      // Handle Clerk errors more gracefully
      let errorMessage = 'Login failed. Please try again.';
      
      if (err.errors && err.errors.length > 0) {
        // Extract the specific error message from Clerk's error format
        errorMessage = err.errors[0].message || errorMessage;
        
        // Handle specific error codes
        if (err.errors[0].code === 'host_invalid') {
          errorMessage = 'Authentication configuration issue. Please contact support.';
        }
      } else if (err.message) {
        errorMessage = err.message;
      }
      
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithGoogle = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      await signIn?.authenticateWithRedirect({
        strategy: 'oauth_google',
        redirectUrl: '/auth/sso-callback',
        redirectUrlComplete: '/dashboard',
      });
    } catch (err: any) {
      setError(err.message || 'Google login failed. Please try again.');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: any) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await signUp?.create({
        firstName: userData.firstName,
        lastName: userData.lastName,
        emailAddress: userData.email,
        password: userData.password,
      });
      
      if (result?.status === 'complete') {
        // Set role in public metadata
        await result.updateUser({
          publicMetadata: { role: userData.role || 'CLIENT' },
        });
        
        await setSignUpActive({ session: result.createdSessionId });
      } else {
        throw new Error('Registration failed');
      }
    } catch (err: any) {
      setError(err.message || 'Registration failed. Please try again.');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await signOut();
      router.push('/');
    } catch (err: any) {
      setError(err.message || 'Logout failed');
    }
  };

  return (
    <ClerkAuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        loginWithGoogle,
        register,
        logout,
        error,
      }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {children}
      </motion.div>
    </ClerkAuthContext.Provider>
  );
}