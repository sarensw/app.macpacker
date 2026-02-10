import type { ReactElement, ReactNode } from 'react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

interface HeaderMobileMenuProps {
  isOpen: boolean
  onToggle: () => void
  children: ReactNode
}

function HeaderMobileMenu ({ isOpen, onToggle, children }: HeaderMobileMenuProps): ReactElement {
  return (
    <>
      <button
        type='button'
        aria-label='Menu'
        aria-expanded={isOpen}
        aria-controls='mobile-menu'
        onClick={onToggle}
        className='md:hidden p-2 text-gray-900 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-400 rounded-md active:opacity-50'
      >
        {isOpen
          ? <XMarkIcon className='size-6' />
          : <Bars3Icon className='size-6' />}
      </button>
      {isOpen && (
        <div
          id='mobile-menu'
          role='menu'
          className='md:hidden absolute top-full left-0 right-0 bg-white border border-gray-200 shadow-lg rounded-b-lg p-4 flex flex-col gap-4'
        >
          {children}
        </div>
      )}
    </>
  )
}

export { HeaderMobileMenu }
