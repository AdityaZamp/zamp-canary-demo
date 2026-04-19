'use client'

interface Props {
  isCanary: boolean
}

export default function CanaryToggle({ isCanary }: Props) {
  const href = isCanary ? '/?canary=false' : '/?canary=true'
  const label = isCanary ? 'Switch to Stable' : 'Enable Canary Preview'

  return (
    <a
      href={href}
      className={`px-6 py-3 rounded-full font-semibold text-sm transition-colors ${
        isCanary
          ? 'bg-gray-900 text-white hover:bg-gray-700'
          : 'bg-amber-500 text-white hover:bg-amber-600'
      }`}
    >
      {label}
    </a>
  )
}
