import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(req: NextRequest) {
  const { searchParams, pathname } = req.nextUrl

  const canaryQuery = searchParams.get('canary')

  if (canaryQuery === 'true') {
    // Strip ?canary=true from the URL, then set the cookie on the redirect response
    const cleanUrl = new URL(pathname, req.url)
    const res = NextResponse.redirect(cleanUrl)
    res.cookies.set('canary', 'true', {
      path: '/',
      maxAge: 60 * 60 * 24 * 30,
      // domain: '.zamp.ai', // uncomment for production subdomain sharing
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    })
    return res
  }

  if (canaryQuery === 'false') {
    // Strip ?canary=false from the URL, then clear the cookie
    const cleanUrl = new URL(pathname, req.url)
    const res = NextResponse.redirect(cleanUrl)
    res.cookies.delete('canary')
    return res
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/((?!favicon.ico).*)',
}
