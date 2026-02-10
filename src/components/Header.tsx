import type { ReactElement } from 'react'
import { Link } from 'wouter'
import { useLocalizedPath } from '@/hooks/useLocalizedPath'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'

function Header (): ReactElement {
  const localizedPath = useLocalizedPath()

  return (
    <>
      <div className='flex flex-row w-full max-w-3xl mx-auto justify-between items-center px-4 mt-2'>
        <Link className='flex flex-row items-center space-x-2' href={localizedPath('/')}>
          <img src='/icon_512x512@2x.png' className='w-12' alt='MacPacker' />
          <p className='font-bold text-lg'>MacPacker</p>
        </Link>
        <div className='flex flex-row items-center space-x-4'>
          <LanguageSwitcher />
        </div>
      </div>
    </>
  )
}

export { Header }
