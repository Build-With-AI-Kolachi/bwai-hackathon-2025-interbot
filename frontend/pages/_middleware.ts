import { NextResponse } from 'next/server';
import { getAuth } from '@clerk/nextjs/server';

export function middleware(request) {
  const { userId } = getAuth(request);

  // Check if the user is authenticated
  if (!userId) {
    // Redirect to login page if not authenticated
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Allow access to protected routes if authenticated
  return NextResponse.next();
}

// Specify which routes to protect
export const config = {
  matcher: ['/protected/:path*'],
}; 