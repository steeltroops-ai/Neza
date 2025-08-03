'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ClerkErrorPage() {
  const router = useRouter();

  useEffect(() => {
    // Check if we're being redirected to Clerk's domain
    const isClerkRedirect = window.location.href.includes('clerk.accounts.dev');
    
    if (isClerkRedirect) {
      // Redirect back to the homepage
      router.push('/');
    }
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-black text-white">
      <div className="max-w-md w-full bg-gray-900/50 backdrop-blur-md p-8 rounded-xl border border-gray-800 shadow-2xl">
        <h1 className="text-2xl font-bold mb-4 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 text-transparent bg-clip-text">
          Authentication Error
        </h1>
        <p className="mb-6 text-gray-300">
          We're experiencing an issue with our authentication service. This is likely due to a configuration problem.
        </p>
        <div className="space-y-4">
          <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
            <h2 className="text-lg font-medium mb-2 text-purple-400">Possible Solutions:</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              <li>Make sure localhost:3000 is registered in your Clerk dashboard</li>
              <li>Check that your Clerk publishable key is correct</li>
              <li>Verify your environment variables are properly set</li>
            </ul>
          </div>
          <button
            onClick={() => router.push('/')}
            className="w-full py-2 px-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-md text-white font-medium hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 transition-all duration-300"
          >
            Return to Homepage
          </button>
        </div>
      </div>
    </div>
  );
}