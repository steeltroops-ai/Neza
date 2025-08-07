import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// TEMPORARY: Disable Clerk authentication to fix infinite loading
// This allows the site to work without Clerk configuration

export default function middleware(req: NextRequest) {
  // For now, just allow all requests to pass through
  // TODO: Re-enable Clerk authentication after proper configuration
  return NextResponse.next();
}
 
export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};