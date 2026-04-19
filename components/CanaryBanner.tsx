export default function CanaryBanner() {
  return (
    <div className="w-full bg-amber-400 text-amber-900 text-center text-xs font-semibold py-2 px-4 tracking-wide">
      🐦 CANARY — You are previewing unreleased features. Visit{' '}
      <span className="underline font-bold">/?canary=false</span> to return to stable.
    </div>
  )
}
