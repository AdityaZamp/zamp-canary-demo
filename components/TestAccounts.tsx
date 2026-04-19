'use client'

import { useState } from 'react'
import { Copy, Check } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

const ACCOUNTS = [
  { email: 'alice@beta.com',     label: 'Canary',  variant: 'canary'  },
  { email: 'bob@beta.com',       label: 'Canary',  variant: 'canary'  },
  { email: 'charlie@stable.com', label: 'Stable',  variant: 'stable'  },
  { email: 'dave@stable.com',    label: 'Stable',  variant: 'stable'  },
] as const

export default function TestAccounts() {
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null)

  async function handleCopy(email: string) {
    await navigator.clipboard.writeText(email)
    setCopiedEmail(email)
    toast.success('Copied!', { description: email, duration: 1500 })
    setTimeout(() => setCopiedEmail(null), 1500)
  }

  return (
    <div className="rounded-xl bg-white border border-slate-200 overflow-hidden shadow-sm">
      <div className="px-4 py-2.5 bg-slate-50 border-b border-slate-100">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Test accounts</p>
      </div>
      <div className="divide-y divide-slate-100">
        {ACCOUNTS.map(({ email, label, variant }) => (
          <div key={email} className="flex items-center justify-between px-4 py-2.5 gap-3 group">
            <Badge
              className={`text-[10px] font-semibold shrink-0 select-none ${
                variant === 'canary'
                  ? 'bg-amber-100 text-amber-700 border-amber-200 hover:bg-amber-100'
                  : 'bg-emerald-100 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
              }`}
              variant="outline"
            >
              {variant === 'canary' ? '🐦' : '✅'} {label}
            </Badge>

            <span className="text-xs font-mono text-slate-700 truncate flex-1">{email}</span>

            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              onClick={() => handleCopy(email)}
              className="shrink-0 text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
              aria-label={`Copy ${email}`}
            >
              {copiedEmail === email
                ? <Check className="size-3.5 text-emerald-500" />
                : <Copy className="size-3.5" />
              }
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}
