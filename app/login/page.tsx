import LoginForm from '@/components/LoginForm'
import TestAccounts from '@/components/TestAccounts'

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-sm space-y-5">

        <div className="text-center space-y-1">
          <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-slate-900 mb-3">
            <span className="text-white text-lg font-bold">Z</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Sign in to Zamp</h1>
          <p className="text-sm text-slate-500">Enter your work email to continue</p>
        </div>

        <LoginForm />
        <TestAccounts />

      </div>
    </main>
  )
}
