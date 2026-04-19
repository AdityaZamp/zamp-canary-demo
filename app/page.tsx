import { cookies } from 'next/headers'
import CanaryBanner from '@/components/CanaryBanner'
import CanaryToggle from '@/components/CanaryToggle'

// Vercel injects these at build time (only populated when deployed from a Git repo)
const commitSha = process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 7) || null
const branch = process.env.VERCEL_GIT_COMMIT_REF || null
const deploymentUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000'

export default async function Home() {
  const cookieStore = await cookies()
  const isCanary = cookieStore.get('canary')?.value === 'true'

  return (
    <main className="min-h-screen bg-white text-gray-900 flex flex-col">
      {isCanary && <CanaryBanner />}

      <div className="flex-1 flex flex-col items-center justify-center gap-8 p-8">
        <div
          className={`px-4 py-2 rounded-full text-sm font-semibold tracking-wide ${
            isCanary
              ? 'bg-amber-100 text-amber-800 border border-amber-300'
              : 'bg-green-100 text-green-800 border border-green-300'
          }`}
        >
          {isCanary ? '🐦 CANARY BUILD' : '✅ STABLE BUILD'}
        </div>

        <h1 className="text-4xl font-bold text-center">
          {isCanary ? 'You are on the Canary Build' : 'You are on the Stable Build'}
        </h1>

        <p className="text-gray-500 text-center max-w-md">
          {isCanary
            ? 'Latest unreleased features served via transparent middleware rewrite — the URL in your browser never changed.'
            : 'Production-stable build served to all regular users. Opt in below to preview unreleased features.'}
        </p>

        <div
          className={`w-full max-w-sm rounded-2xl p-6 border-2 text-center ${
            isCanary
              ? 'bg-amber-50 border-amber-300'
              : 'bg-blue-50 border-blue-200'
          }`}
        >
          <p className="text-xs uppercase tracking-widest font-semibold text-gray-400 mb-2">
            Feature Panel
          </p>
          {isCanary ? (
            <>
              <p className="text-2xl font-bold text-amber-700">Dashboard v2</p>
              <p className="text-sm text-amber-600 mt-1">
                Redesigned analytics, live metrics, AI summaries — coming soon to stable.
              </p>
            </>
          ) : (
            <>
              <p className="text-2xl font-bold text-blue-700">Dashboard v1</p>
              <p className="text-sm text-blue-600 mt-1">
                Reliable, battle-tested. Switch to canary to preview what is next.
              </p>
            </>
          )}
        </div>

        <CanaryToggle isCanary={isCanary} />

        {/* Build version info */}
        <div className="w-full max-w-sm rounded-xl border border-gray-100 bg-gray-50 p-4 text-xs font-mono text-gray-500 space-y-1">
          <div className="flex justify-between">
            <span className="text-gray-400">build</span>
            <span className={isCanary ? 'text-amber-600 font-bold' : 'text-green-600 font-bold'}>
              {isCanary ? 'canary' : 'stable'}
            </span>
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

        <p className="text-xs text-gray-400 text-center max-w-xs">
          The toggle sets a cookie scoped to this domain. All subsequent requests route
          transparently to the correct deployment without changing the URL.
        </p>
      </div>
    </main>
  )
}
