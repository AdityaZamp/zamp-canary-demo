import LoginForm from '@/components/LoginForm'

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Sign in to Zamp</h1>
          <p className="text-sm text-gray-500 mt-1">Beta orgs automatically get the canary build</p>
        </div>
        <LoginForm />
        <div className="mt-6 rounded-xl bg-white border border-gray-100 p-4 text-xs text-gray-400 space-y-1">
          <p className="font-semibold text-gray-500 mb-2">Test accounts</p>
          <p>🐦 <span className="font-mono">alice@beta.com</span> — beta org (canary)</p>
          <p>🐦 <span className="font-mono">bob@beta.com</span> — beta org (canary)</p>
          <p>✅ <span className="font-mono">charlie@stable.com</span> — stable org</p>
          <p>✅ <span className="font-mono">dave@stable.com</span> — stable org</p>
        </div>
      </div>
    </main>
  )
}
