import LoginForm from '@/components/LoginForm'

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-sm space-y-5">

        {/* Logo / heading */}
        <div className="text-center space-y-1">
          <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-slate-900 mb-3">
            <span className="text-white text-lg font-bold">Z</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Sign in to Zamp</h1>
          <p className="text-sm text-slate-500">Enter your work email to continue</p>
        </div>

        <LoginForm />

        {/* Test accounts hint */}
        <div className="rounded-xl bg-white border border-slate-200 divide-y divide-slate-100 overflow-hidden shadow-sm">
          <div className="px-4 py-2.5 bg-slate-50">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Test accounts</p>
          </div>
          <div className="divide-y divide-slate-100">
            {[
              { email: 'alice@beta.com',     label: 'Canary',  color: 'text-amber-600 bg-amber-50 border-amber-200' },
              { email: 'bob@beta.com',       label: 'Canary',  color: 'text-amber-600 bg-amber-50 border-amber-200' },
              { email: 'charlie@stable.com', label: 'Stable',  color: 'text-emerald-600 bg-emerald-50 border-emerald-200' },
              { email: 'dave@stable.com',    label: 'Stable',  color: 'text-emerald-600 bg-emerald-50 border-emerald-200' },
            ].map(({ email, label, color }) => (
              <div key={email} className="flex items-center justify-between px-4 py-2.5">
                <span className="text-xs font-mono text-slate-700">{email}</span>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${color}`}>
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </main>
  )
}
