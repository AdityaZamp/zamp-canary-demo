import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Comma-separated list of org_ids that always get the canary build.
// Set this in Vercel environment variables: BETA_ORG_IDS=org_beta_001,org_beta_002
const BETA_ORG_IDS = new Set(
  (process.env.BETA_ORG_IDS ?? '').split(',').map(s => s.trim()).filter(Boolean)
)

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Redirect away from login if already authenticated
  if (pathname === '/login') {
    const orgId = req.cookies.get('org_id')?.value
    if (orgId) {
      return NextResponse.redirect(new URL('/', req.url))
    }
    return NextResponse.next()
  }

  // Require login for all other pages
  const orgId = req.cookies.get('org_id')?.value
  if (!orgId) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  // org_id is in beta list → canary build (vercel.json rewrite handles this)
  // org_id is not in beta list → stable build (fall through to NextResponse.next())
  // The actual rewrite is declared in vercel.json using the `org_is_beta` cookie
  // which we set here so the edge rule can match on a simple boolean cookie.
  const isBeta = BETA_ORG_IDS.has(orgId)
  const res = NextResponse.next()
  if (isBeta) {
    res.cookies.set('org_is_beta', 'true', { path: '/', sameSite: 'lax', secure: process.env.NODE_ENV === 'production' })
  } else {
    res.cookies.delete('org_is_beta')
  }
  return res
}

export const config = {
  matcher: '/((?!favicon.ico|_next/static|_next/image|api).*)',
}
