import type { ReactElement } from 'react'

interface GradientPlaceholderProps {
  className?: string
}

function GradientPlaceholder ({ className = '' }: GradientPlaceholderProps): ReactElement {
  return (
    <div
      className={`w-full aspect-video bg-gradient-to-br from-teal-700 via-gray-400 to-gray-300 rounded-lg ${className}`}
      aria-hidden='true'
    />
  )
}

export { GradientPlaceholder }
