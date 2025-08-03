import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This middleware runs before Clerk's middleware
export function middleware(request: NextRequest) {
  // Check if the request is being redirected to Clerk's domain
  const { pathname, search } = request.nextUrl;
  
  // If we detect a Clerk redirect to their domain
  if (search && search.includes('clerk.accounts.dev')) {
    // Create a new URL to redirect to our custom error page
    const url = request.nextUrl.clone();
    url.pathname = '/clerk-error';
    url.search = '';
    
    return NextResponse.redirect(url);
  }
  
  // Continue with the request
  return NextResponse.next();
}

// Configure the middleware to run on specific paths
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public directory)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};