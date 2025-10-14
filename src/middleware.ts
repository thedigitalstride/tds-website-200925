import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  // Block test/development pages in production builds only
  // Allow in development and preview deployments for testing
  const isProduction = process.env.NODE_ENV === 'production' && process.env.VERCEL_ENV === 'production'

  if (isProduction) {
    const devRoutes = ['/test-header', '/style-guide']

    if (devRoutes.some(route => request.nextUrl.pathname.startsWith(route))) {
      return new NextResponse('Not Found', { status: 404 })
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/test-header/:path*',
    '/style-guide/:path*',
    // Add other dev/internal routes here as needed
  ]
}