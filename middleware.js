import { NextRequest, NextResponse } from 'next/server';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';

export async function middleware(request) {
  const { isAuthenticated } = getKindeServerSession();
  
  if (!(await isAuthenticated())) {
    const url = request.nextUrl.clone();
    url.pathname = '/api/auth/login';
    url.searchParams.set('post_login_redirect_url', request.nextUrl.pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
