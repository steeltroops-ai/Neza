'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Home } from 'lucide-react';
import { Button } from '../components/ui/button';

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <h1 className="text-9xl font-bold text-primary">404</h1>
        <h2 className="text-3xl font-semibold mt-4 mb-2">Page Not Found</h2>
        <p className="text-gray-600 mb-8">
          Oops! The page you are looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button 
            onClick={() => router.back()}
            variant="outline"
            className="flex items-center gap-2"
          >
            <ArrowLeft size={16} />
            Go Back
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
            Need help? <Link href="/contact" className="text-primary hover:underline">Contact Support</Link> or visit our <Link href="/help" className="text-primary hover:underline">Help Center</Link>
          </p>
        </div>
      </div>
    </div>
  );
}