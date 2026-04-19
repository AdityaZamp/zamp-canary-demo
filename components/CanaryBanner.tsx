export default function CanaryBanner() {
  return (
    <div className="w-full bg-amber-500 text-white text-center text-xs font-medium py-2 px-4 flex items-center justify-center gap-2">
      <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-white/20 text-[10px]">🐦</span>
      <span>
        <strong className="font-semibold">Canary build</strong> — your org is enrolled in the beta programme and is previewing unreleased features
      </span>
    </div>
  )
}
