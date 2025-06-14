import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();
  const adminUser = process.env.ADMIN_USERNAME;
  const adminPass = process.env.ADMIN_PASSWORD;

  if (
    username === adminUser &&
    password === adminPass
  ) {
    // Set a secure cookie for admin session
    const res = NextResponse.json({ success: true });
    res.cookies.set('admin_auth', '1', {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60 * 8, // 8 hours
    });
    return res;
  }
  return NextResponse.json({ success: false }, { status: 401 });
} 