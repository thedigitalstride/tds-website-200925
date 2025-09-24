import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  // Block test/development pages in production and preview builds
  const isProduction = process.env.NODE_ENV === 'production'
  const isVercelPreview = process.env.VERCEL_ENV === 'preview'

  if (isProduction || isVercelPreview) {
    const testRoutes = ['/test-header']

    if (testRoutes.some(route => request.nextUrl.pathname.startsWith(route))) {
      return new NextResponse('Not Found', { status: 404 })
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/test-header/:path*',
    // Add other test/dev routes here as needed
  ]
}