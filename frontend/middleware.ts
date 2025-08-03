import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Define public routes that don't require authentication
const publicRoutes = [
  "/",
  "/auth/login",
  "/auth/register",
  "/about",
  "/contact",
  "/faq",
  "/how-it-works",
  "/privacy",
  "/terms",
  "/services",
  "/services/(.*)",
  "/categories",
  "/categories/(.*)",
  "/clerk-error", // Add the clerk error page to public routes
];

const isPublicRoute = createRouteMatcher(publicRoutes);

// Custom middleware function to handle Clerk redirects
function handleClerkRedirects(req: NextRequest) {
  // Check if the URL contains clerk.accounts.dev which indicates a redirection issue
  const url = req.nextUrl.toString();
  if (url.includes('clerk.accounts.dev')) {
    console.log('Detected Clerk redirect, redirecting to clerk-error page');
    const errorUrl = new URL('/clerk-error', req.url);
    return NextResponse.redirect(errorUrl);
  }
  return null;
}

// Combine our custom middleware with Clerk's middleware
export default function middleware(req: NextRequest) {
  // First check for Clerk redirects
  const redirectResponse = handleClerkRedirects(req);
  if (redirectResponse) return redirectResponse;
  
  // If no redirect needed, use Clerk's middleware
  return clerkMiddleware(async (auth, req) => {
    const { userId } = await auth();
    
    // If the user is not signed in and the route is not public, redirect to sign in
    if (!userId && !isPublicRoute(req)) {
      const { redirectToSignIn } = await auth();
      return redirectToSignIn({ returnBackUrl: req.url });
    }
    
    return NextResponse.next();
  })(req);
}
 
export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};