'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Loader2, Mail, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function LoginForm() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    })

    setLoading(false)

    if (!res.ok) {
      setError('No account found for that email. Try one of the test accounts below.')
      return
    }

    const data = await res.json()
    toast.success(`Welcome, ${data.name}!`, { description: data.org_name })
    router.push('/')
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-5">
      <div className="space-y-2">
        <Label htmlFor="email" className="text-slate-700">Work email</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400 pointer-events-none" />
          <Input
            id="email"
            type="email"
            required
            autoFocus
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="you@company.com"
            aria-invalid={!!error}
            className={`pl-9 placeholder:text-slate-400 text-slate-900 h-10
              ${error ? 'border-red-400 focus-visible:ring-red-200 bg-red-50' : ''}
            `}
          />
        </div>
        {error && (
          <p className="flex items-start gap-1.5 text-xs text-red-600">
            <AlertCircle className="size-3.5 mt-0.5 shrink-0" />
            {error}
          </p>
        )}
      </div>

      <Button type="submit" disabled={loading} className="w-full h-10 cursor-pointer">
        {loading ? <Loader2 className="size-4 animate-spin" /> : null}
        {loading ? 'Signing in…' : 'Continue with email'}
      </Button>
    </form>
  )
}
