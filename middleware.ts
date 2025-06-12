import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
  const langCookie = req.cookies.get('lang')?.value
  const pathname = req.nextUrl.pathname

  // Default language
  const lang = langCookie || 'en'

  // Skip next internals and API routes
  if (pathname.startsWith('/_next') || pathname.startsWith('/api')) return NextResponse.next()

  // If URL already has lang prefix, just continue
  if (pathname.startsWith(`/${lang}`)) {
    return NextResponse.next()
  }

  // Redirect to /[lang]/...
  return NextResponse.redirect(new URL(`/${lang}${pathname}`, req.url))
}

export const config = {
  matcher: ['/((?!_next|favicon.ico|api).*)'], // match all except _next, favicon, api
}
