import { NextRequest, NextResponse } from 'next/server'

// Mock org database — in production this comes from your real auth API
const MOCK_USERS: Record<string, { org_id: string; org_name: string; name: string }> = {
  'alice@beta.com':   { org_id: 'org_beta_001', org_name: 'Beta Corp',   name: 'Alice' },
  'bob@beta.com':     { org_id: 'org_beta_002', org_name: 'Beta Labs',   name: 'Bob' },
  'charlie@stable.com': { org_id: 'org_stable_001', org_name: 'Stable Inc', name: 'Charlie' },
  'dave@stable.com':  { org_id: 'org_stable_002', org_name: 'Stable Co',  name: 'Dave' },
}

export async function POST(req: NextRequest) {
  const { email } = await req.json()

  const user = MOCK_USERS[email?.toLowerCase()]
  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 401 })
  }

  const res = NextResponse.json({ success: true, org_id: user.org_id, org_name: user.org_name, name: user.name })

  // Set org_id + session cookies — proxy.ts reads org_id to decide canary vs stable
  res.cookies.set('org_id', user.org_id, {
    path: '/',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7,
  })
  res.cookies.set('session_user', JSON.stringify({ email, name: user.name, org_name: user.org_name }), {
    path: '/',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7,
  })

  return res
}
