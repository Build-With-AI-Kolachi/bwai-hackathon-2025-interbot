import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your middleware
const publicRoutes = [
  "/",
  "/login",
  "/signup",
  "/blog",
  "/pricing",
  "/about",
  "/contact",
  "/help-center",
  "/privacy",
  "/terms",
  "/security",
  "/cookies"
];

export default clerkMiddleware((auth, req) => {
  // Check if the route is public
  const isPublicRoute = publicRoutes.some(route => req.nextUrl.pathname.startsWith(route));

  if (isPublicRoute) {
    return NextResponse.next();
  }

  // Handle admin-only routes (dashboard)
  if (req.nextUrl.pathname.startsWith('/dashboard')) {
    const isAdmin = auth.sessionClaims?.isAdmin === true;
    
    if (!isAdmin) {
      // Redirect non-admin users to home page
      return NextResponse.redirect(new URL('/', req.url));
    }
  }

  // For any other protected routes, ensure the user is authenticated
  if (!auth.userId) {
     const signInUrl = new URL('/login', req.url);
     signInUrl.searchParams.set('redirect_url', req.url);
     return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}; 