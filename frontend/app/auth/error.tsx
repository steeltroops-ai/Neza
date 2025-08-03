'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AlertCircle, ArrowLeft, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export default function AuthError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState('Authentication issue: Please contact support or check configuration');

  useEffect(() => {
    // Parse the error to provide a more specific message
    if (error.message.includes('host_invalid') || error.message.includes('Invalid host')) {
      setErrorMessage('Authentication configuration issue. The application may need to be properly configured.');
    }
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black to-gray-900 p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-black/80 backdrop-blur-md border border-gray-800 rounded-xl shadow-xl p-8"
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
          
          <div className="flex flex-col sm:flex-row gap-3 w-full">
            <Button 
              variant="outline" 
              className="flex-1 border-gray-700 hover:bg-gray-800 hover:text-white"
              onClick={() => router.push('/')}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
            
            <Button 
              className="flex-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600"
              onClick={() => {
                reset();
                router.refresh();
              }}
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Try Again
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}