// Clerk configuration for development and production environments

export const clerkConfig = {
  // Development domain configuration
  developmentDomain: process.env.NEXT_PUBLIC_CLERK_DEVELOPMENT_DOMAIN || 'localhost:3000',
  
  // Publishable key
  publishableKey: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
  
  // Redirect URLs
  signInUrl: process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL || '/auth/login',
  signUpUrl: process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL || '/auth/register',
  afterSignInUrl: process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL || '/dashboard',
  afterSignUpUrl: process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL || '/dashboard',
};