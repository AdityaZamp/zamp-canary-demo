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

  return (
    <main className="min-h-screen bg-white text-gray-900 flex flex-col">
      {isBeta && <CanaryBanner />}

      {/* Top nav */}
      <nav className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
        <span className="font-semibold text-gray-800">Zamp</span>
        <div className="flex items-center gap-3 text-sm text-gray-500">
          <span>{session?.name} · {session?.org_name}</span>
          <LogoutButton />
        </div>
      </nav>

      <div className="flex-1 flex flex-col items-center justify-center gap-8 p-8">
        {/* Build badge */}
        <div className={`px-4 py-2 rounded-full text-sm font-semibold tracking-wide ${
          isBeta
            ? 'bg-amber-100 text-amber-800 border border-amber-300'
            : 'bg-green-100 text-green-800 border border-green-300'
        }`}>
          {isBeta ? '🐦 CANARY BUILD' : '✅ STABLE BUILD'}
        </div>

        <h1 className="text-4xl font-bold text-center">
          {isBeta ? 'You are on the Canary Build' : 'You are on the Stable Build'}
        </h1>

        <p className="text-gray-500 text-center max-w-md">
          {isBeta
            ? 'Your org is enrolled in the beta programme. You automatically get the latest unreleased features.'
            : 'Your org is on the stable build. All features here are fully tested and production-ready.'}
        </p>

        {/* Feature panel */}
        <div className={`w-full max-w-sm rounded-2xl p-6 border-2 text-center ${
          isBeta ? 'bg-amber-50 border-amber-300' : 'bg-blue-50 border-blue-200'
        }`}>
          <p className="text-xs uppercase tracking-widest font-semibold text-gray-400 mb-2">Feature Panel</p>
          {isBeta ? (
            <>
              <p className="text-2xl font-bold text-amber-700">Dashboard v2</p>
              <p className="text-sm text-amber-600 mt-1">Redesigned analytics, live metrics, AI summaries.</p>
            </>
          ) : (
            <>
              <p className="text-2xl font-bold text-blue-700">Dashboard v1</p>
              <p className="text-sm text-blue-600 mt-1">Reliable, battle-tested.</p>
            </>
          )}
        </div>

        {/* Build version info */}
        <div className="w-full max-w-sm rounded-xl border border-gray-100 bg-gray-50 p-4 text-xs font-mono text-gray-500 space-y-1">
          <div className="flex justify-between">
            <span className="text-gray-400">build</span>
            <span className={isBeta ? 'text-amber-600 font-bold' : 'text-green-600 font-bold'}>
              {isBeta ? 'canary' : 'stable'}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">org_id</span>
            <span>{orgId}</span>
          </div>
          {commitSha && (
            <div className="flex justify-between">
              <span className="text-gray-400">commit</span>
              <span>{commitSha}</span>
            </div>
          )}
          {branch && (
            <div className="flex justify-between">
              <span className="text-gray-400">branch</span>
              <span>{branch}</span>
            </div>
          )}
          <div className="flex justify-between gap-4">
            <span className="text-gray-400 shrink-0">deployment</span>
            <span className="truncate text-right">{deploymentUrl}</span>
          </div>
        </div>
      </div>
    </main>
  )
}
