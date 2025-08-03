'use client';

import { useEffect, useState } from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export default function ClerkErrorFallback() {
  const [isVisible, setIsVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('Authentication issue: Please contact support or check configuration');

  useEffect(() => {
    // Check if there's a Clerk error in the page
    const checkForClerkErrors = () => {
      // Look for error JSON in the page
      const errorElements = document.querySelectorAll('pre');
      
      for (const element of errorElements) {
        try {
          const content = element.textContent || '';
          if (content.includes('"errors"') && content.includes('"host_invalid"')) {
            // Found a Clerk error JSON
            setIsVisible(true);
            setErrorMessage('Authentication configuration issue. Please make sure localhost:3000 is registered in Clerk dashboard.');
            
            // Hide the JSON error
            element.style.display = 'none';
            
            // Also hide any parent elements that might be containers
            let parent = element.parentElement;
            for (let i = 0; i < 3 && parent; i++) {
              parent.style.display = 'none';
              parent = parent.parentElement;
            }
            
            break;
          }
        } catch (e) {
          // Ignore parsing errors
        }
      }
    };

    // Run on mount and set up a mutation observer to catch dynamically added errors
    checkForClerkErrors();
    
    const observer = new MutationObserver(checkForClerkErrors);
    observer.observe(document.body, { childList: true, subtree: true });
    
    return () => observer.disconnect();
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="max-w-md w-full bg-black/90 backdrop-blur-md border border-gray-800 rounded-xl shadow-xl p-8 m-4"
      >
        <div className="flex flex-col items-center text-center">
          <div className="bg-red-500/10 p-3 rounded-full mb-4">
            <AlertCircle className="h-8 w-8 text-red-400" />
          </div>
          
          <h1 className="text-2xl font-bold bg-gradient-to-r from-red-400 to-orange-400 text-transparent bg-clip-text mb-2">
            Authentication Error
          </h1>
          
          <p className="text-gray-300 mb-6">
            {errorMessage}
          </p>
          
          <div className="flex flex-col gap-3 w-full">
            <Button 
              className="w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600"
              onClick={() => window.location.reload()}
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh Page
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}