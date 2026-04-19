'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function LogoutButton() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function handleLogout() {
    setLoading(true)
    await fetch('/api/logout', { method: 'POST' })
    router.push('/login')
    router.refresh()
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleLogout}
      disabled={loading}
      className="cursor-pointer text-slate-600 h-8"
    >
      {loading
        ? <Loader2 className="size-3.5 animate-spin" />
        : <LogOut className="size-3.5" />
      }
      {loading ? 'Signing out…' : 'Sign out'}
    </Button>
  )
}
