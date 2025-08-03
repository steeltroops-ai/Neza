'use client';

import { useState, useEffect } from 'react';
import { AuthError } from '../ui/auth-error';

interface ClerkErrorBoundaryProps {
  children: React.ReactNode;
}

export default function ClerkErrorBoundary({ children }: ClerkErrorBoundaryProps) {
  const [error, setError] = useState<Error | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    // Listen for Clerk errors
    const handleClerkError = (event: ErrorEvent) => {
      // Check if it's a Clerk error
      if (event.error && event.error.message && (
        event.error.message.includes('Clerk') || 
        event.error.message.includes('host_invalid') ||
        event.error.message.includes('Invalid host')
      )) {
        setError(event.error);
        
        // Extract a user-friendly message
        if (event.error.message.includes('host_invalid')) {
          setErrorMessage('Authentication configuration issue. Please contact support.');
        } else {
          setErrorMessage('Authentication issue: Please contact support or check configuration');
        }
      }
    };

    window.addEventListener('error', handleClerkError);
    
    return () => {
      window.removeEventListener('error', handleClerkError);
    };
  }, []);

  const clearError = () => {
    setError(null);
    setErrorMessage('');
  };

  return (
    <>
      {error && <AuthError message={errorMessage} onClose={clearError} />}
      {children}
    </>
  );
}