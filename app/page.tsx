import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import CanaryBanner from '@/components/CanaryBanner'
import LogoutButton from '@/components/LogoutButton'

const commitSha = process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 7) || null
const branch = process.env.VERCEL_GIT_COMMIT_REF || null
const deploymentUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000'

export default async function Home() {
  const cookieStore = await cookies()
  const orgId = cookieStore.get('org_id')?.value
  if (!orgId) redirect('/login')

  const sessionRaw = cookieStore.get('session_user')?.value
  const session = sessionRaw ? JSON.parse(sessionRaw) : null
  const isBeta = cookieStore.get('org_is_beta')?.value === 'true'

  const buildColor = isBeta
    ? { badge: 'bg-amber-100 text-amber-700 border-amber-200', ring: 'ring-amber-200', card: 'bg-amber-50 border-amber-200', title: 'text-amber-800', sub: 'text-amber-600', dot: 'bg-amber-400' }
    : { badge: 'bg-emerald-100 text-emerald-700 border-emerald-200', ring: 'ring-emerald-200', card: 'bg-emerald-50 border-emerald-200', title: 'text-emerald-800', sub: 'text-emerald-600', dot: 'bg-emerald-400' }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      {isBeta && <CanaryBanner />}

      {/* Navbar */}
      <nav className="bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-slate-900 flex items-center justify-center">
            <span className="text-white text-xs font-bold">Z</span>
          </div>
          <span className="font-semibold text-slate-800 text-sm">Zamp</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-medium text-slate-700">{session?.name}</p>
            <p className="text-[11px] text-slate-400">{session?.org_name}</p>
          </div>
          <div className="w-7 h-7 rounded-full bg-slate-200 flex items-center justify-center text-xs font-semibold text-slate-600">
            {session?.name?.[0] ?? '?'}
          </div>
          <LogoutButton />
        </div>
      </nav>

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center gap-6 px-4 py-12">

        {/* Build badge */}
        <div className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold border ${buildColor.badge}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${buildColor.dot} animate-pulse`} />
          {isBeta ? 'Canary Build' : 'Stable Build'}
        </div>

        {/* Hero */}
        <div className="text-center space-y-2 max-w-md">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            {isBeta ? 'You are on the Canary Build' : 'You are on the Stable Build'}
          </h1>
          <p className="text-slate-500 text-sm leading-relaxed">
            {isBeta
              ? 'Your org is enrolled in the beta programme. You automatically receive the latest unreleased features ahead of everyone else.'
              : 'Your org is on the production-stable build. All features here are fully tested and ready for everyone.'}
          </p>
        </div>

        {/* Feature card */}
        <div className={`w-full max-w-sm rounded-2xl border p-6 ${buildColor.card}`}>
          <p className="text-[10px] uppercase tracking-widest font-semibold text-slate-400 mb-3">Feature Panel</p>
          {isBeta ? (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-amber-200 flex items-center justify-center text-amber-700 text-sm">📊</div>
                <div>
                  <p className="text-sm font-semibold text-amber-800">Dashboard v2</p>
                  <p className="text-xs text-amber-600">Redesigned analytics</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-amber-200 flex items-center justify-center text-amber-700 text-sm">⚡</div>
                <div>
                  <p className="text-sm font-semibold text-amber-800">Live Metrics</p>
                  <p className="text-xs text-amber-600">Real-time data streaming</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-amber-200 flex items-center justify-center text-amber-700 text-sm">🤖</div>
                <div>
                  <p className="text-sm font-semibold text-amber-800">AI Summaries</p>
                  <p className="text-xs text-amber-600">Coming soon to stable</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-200 flex items-center justify-center text-emerald-700 text-sm">📈</div>
                <div>
                  <p className="text-sm font-semibold text-emerald-800">Dashboard v1</p>
                  <p className="text-xs text-emerald-600">Battle-tested analytics</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-200 flex items-center justify-center text-emerald-700 text-sm">🔒</div>
                <div>
                  <p className="text-sm font-semibold text-emerald-800">Stable & Reliable</p>
                  <p className="text-xs text-emerald-600">Fully production-ready</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Build metadata */}
        <div className="w-full max-w-sm rounded-xl bg-white border border-slate-200 overflow-hidden shadow-sm">
          <div className="px-4 py-2.5 bg-slate-50 border-b border-slate-100">
            <p className="text-[10px] uppercase tracking-widest font-semibold text-slate-400">Build Info</p>
          </div>
          <div className="divide-y divide-slate-100">
            {[
              { label: 'Build',      value: isBeta ? 'canary' : 'stable', highlight: true },
              { label: 'Org ID',     value: orgId },
              ...(commitSha ? [{ label: 'Commit', value: commitSha }] : []),
              ...(branch    ? [{ label: 'Branch', value: branch }]    : []),
              { label: 'Deployment', value: deploymentUrl, mono: true },
            ].map(({ label, value, highlight, mono }) => (
              <div key={label} className="flex items-center justify-between px-4 py-2.5 gap-4">
                <span className="text-xs text-slate-400 shrink-0">{label}</span>
                <span className={`text-xs truncate text-right font-medium ${
                  highlight
                    ? isBeta ? 'text-amber-600' : 'text-emerald-600'
                    : mono ? 'font-mono text-slate-500' : 'text-slate-700'
                }`}>
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </main>
  )
}
