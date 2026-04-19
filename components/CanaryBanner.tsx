import { FlaskConical } from 'lucide-react'

export default function CanaryBanner() {
  return (
    <div className="w-full bg-amber-500 text-white text-center text-xs font-medium py-2 px-4 flex items-center justify-center gap-2">
      <FlaskConical className="size-3.5 shrink-0" />
      <span>
        <strong className="font-semibold">Canary build</strong> — your org is enrolled in the beta programme and is previewing unreleased features
      </span>
    </div>
  )
}
