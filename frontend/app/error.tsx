'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { RefreshCcw, Home } from 'lucide-react';
import { Button } from '../components/ui/button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-red-500 text-4xl">!</span>
        </div>
        <h1 className="text-3xl font-semibold mb-2">Something Went Wrong</h1>
        <p className="text-gray-600 mb-8">
          We're sorry, but we encountered an unexpected error. Our team has been notified and is working to fix the issue.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button 
            onClick={() => reset()}
            variant="outline"
            className="flex items-center gap-2"
          >
            <RefreshCcw size={16} />
            Try Again
          </Button>
          <Button asChild className="flex items-center gap-2">
            <Link href="/">
              <Home size={16} />
              Back to Home
            </Link>
          </Button>
        </div>
        <div className="mt-12">
          <p className="text-gray-500 text-sm">
            Error reference: {error.digest}
          </p>
          <p className="text-gray-500 text-sm mt-2">
            Need help? <Link href="/contact" className="text-primary hover:underline">Contact Support</Link> or visit our <Link href="/help" className="text-primary hover:underline">Help Center</Link>
          </p>
        </div>
      </div>
    </div>
  );
}