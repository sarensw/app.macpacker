import type { ReactElement } from 'react'
import { Link } from 'wouter'
import { useLocalizedPath } from '@/hooks/useLocalizedPath'

function Header (): ReactElement {
  const localizedPath = useLocalizedPath()

  return (
    <>
      <div className='flex flex-row w-full mx-auto  justify-center space-x-2'>
        <Link className='flex flex-row items-center' href={localizedPath('/')}>
          <img src='/icon_512x512@2x.png' className='w-12' />
          <p className='font-bold text-lg'>MacPacker</p>
        </Link>
      </div>
    </>
  )
}

export { Header }
