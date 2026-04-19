import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { Cpu, GitBranch, GitCommit, Globe, Sparkles, ShieldCheck, BarChart3, Zap, Bot, Lock } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
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

  const canaryFeatures = [
    { icon: BarChart3, label: 'Dashboard v2',   sub: 'Redesigned analytics' },
    { icon: Zap,       label: 'Live Metrics',   sub: 'Real-time data streaming' },
    { icon: Bot,       label: 'AI Summaries',   sub: 'Coming soon to stable' },
  ]
  const stableFeatures = [
    { icon: BarChart3, label: 'Dashboard v1',   sub: 'Battle-tested analytics' },
    { icon: Lock,      label: 'Stable & Reliable', sub: 'Fully production-ready' },
  ]

  const buildMeta = [
    { icon: Cpu,       label: 'Build',      value: isBeta ? 'canary' : 'stable', highlight: true },
    { icon: Sparkles,  label: 'Org ID',     value: orgId },
    ...(commitSha ? [{ icon: GitCommit, label: 'Commit',     value: commitSha }] : []),
    ...(branch    ? [{ icon: GitBranch, label: 'Branch',     value: branch }]    : []),
    { icon: Globe,     label: 'Deployment', value: deploymentUrl, mono: true },
  ]

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      {isBeta && <CanaryBanner />}

      {/* Navbar */}
      <nav className="bg-white border-b border-slate-200 px-5 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-slate-900 flex items-center justify-center shrink-0">
            <span className="text-white text-xs font-bold">Z</span>
          </div>
          <span className="font-semibold text-slate-800 text-sm">Zamp</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-medium text-slate-700 leading-tight">{session?.name}</p>
            <p className="text-[11px] text-slate-400 leading-tight">{session?.org_name}</p>
          </div>
          <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-semibold text-slate-600 shrink-0">
            {session?.name?.[0] ?? '?'}
          </div>
          <LogoutButton />
        </div>
      </nav>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center gap-6 px-4 py-12 max-w-lg mx-auto w-full">

        {/* Build badge */}
        <Badge
          variant="outline"
          className={`gap-1.5 px-3 py-1 text-xs font-semibold rounded-full ${
            isBeta
              ? 'bg-amber-50 text-amber-700 border-amber-200'
              : 'bg-emerald-50 text-emerald-700 border-emerald-200'
          }`}
        >
          <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${isBeta ? 'bg-amber-500' : 'bg-emerald-500'}`} />
          {isBeta ? 'Canary Build' : 'Stable Build'}
        </Badge>

        {/* Hero */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            {isBeta ? 'You are on the Canary Build' : 'You are on the Stable Build'}
          </h1>
          <p className="text-slate-500 text-sm leading-relaxed max-w-sm mx-auto">
            {isBeta
              ? 'Your org is enrolled in the beta programme and automatically receives unreleased features.'
              : 'Your org is on the production-stable build — fully tested and ready for everyone.'}
          </p>
        </div>

        {/* Feature card */}
        <Card className={`w-full border ${isBeta ? 'bg-amber-50 border-amber-200' : 'bg-emerald-50 border-emerald-200'}`}>
          <CardHeader className="pb-3">
            <CardTitle className={`text-xs uppercase tracking-widest font-semibold ${isBeta ? 'text-amber-600' : 'text-emerald-600'}`}>
              Feature Panel
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {(isBeta ? canaryFeatures : stableFeatures).map(({ icon: Icon, label, sub }) => (
              <div key={label} className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                  isBeta ? 'bg-amber-200 text-amber-700' : 'bg-emerald-200 text-emerald-700'
                }`}>
                  <Icon className="size-4" />
                </div>
                <div>
                  <p className={`text-sm font-semibold ${isBeta ? 'text-amber-800' : 'text-emerald-800'}`}>{label}</p>
                  <p className={`text-xs ${isBeta ? 'text-amber-600' : 'text-emerald-600'}`}>{sub}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Build info */}
        <Card className="w-full">
          <CardHeader className="pb-3">
            <CardTitle className="text-xs uppercase tracking-widest font-semibold text-slate-400">
              Build Info
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-slate-100">
              {buildMeta.map(({ icon: Icon, label, value, highlight, mono }) => (
                <div key={label} className="flex items-center justify-between px-6 py-2.5 gap-4">
                  <div className="flex items-center gap-2 shrink-0">
                    <Icon className="size-3.5 text-slate-400" />
                    <span className="text-xs text-slate-400">{label}</span>
                  </div>
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
          </CardContent>
        </Card>

      </div>
    </main>
  )
}
