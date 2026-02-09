import type { ReactElement } from 'react'

interface FeatureCardProps {
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
}

function FeatureCard ({ icon: Icon, title, description }: FeatureCardProps): ReactElement {
  return (
    <div className='bg-gray-50 ring-1 ring-gray-500 ring-inset rounded-lg p-6 flex flex-col items-center text-center space-y-3'>
      <Icon className='size-8 text-teal-700' />
      <h3 className='font-medium text-gray-950 text-base'>{title}</h3>
      <p className='text-sm text-gray-600'>{description}</p>
    </div>
  )
}

export { FeatureCard }
