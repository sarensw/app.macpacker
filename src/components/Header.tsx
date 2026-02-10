import { useState, type ReactElement, type ReactNode } from 'react'
import { Link } from 'wouter'
import { useLocalizedPath } from '@/hooks/useLocalizedPath'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { HeaderMobileMenu } from '@/components/HeaderMobileMenu'

interface HeaderProps {
  children?: ReactNode
}

function Header ({ children }: HeaderProps): ReactElement {
  const localizedPath = useLocalizedPath()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  function toggleMobileMenu () {
    setIsMobileMenuOpen(prev => !prev)
  }

  function closeMobileMenu () {
    setIsMobileMenuOpen(false)
  }

  return (
    <header className='relative'>
      <div className='flex flex-row w-full max-w-3xl mx-auto justify-between items-center gap-2 px-4 mt-2'>
        {/* Left section: Brand */}
        <Link className='flex flex-row items-center gap-2' href={localizedPath('/')}>
          <img src='/icon_512x512@2x.png' className='w-12' alt='MacPacker' />
          <p className='hidden md:block font-bold text-lg'>MacPacker</p>
        </Link>

        {/* Middle section: Navigation links (desktop) */}
        <nav aria-label='Main navigation' className='hidden md:flex flex-row items-center gap-2'>
          {children}
        </nav>

        {/* Right section: Language switcher (desktop) */}
        <div className='hidden md:flex flex-row items-center'>
          <LanguageSwitcher />
        </div>

        {/* Mobile: Hamburger menu */}
        <HeaderMobileMenu isOpen={isMobileMenuOpen} onToggle={toggleMobileMenu}>
          {children && (
            <nav aria-label='Main navigation' className='flex flex-col gap-4' onClick={closeMobileMenu}>
              {children}
            </nav>
          )}
          <LanguageSwitcher />
        </HeaderMobileMenu>
      </div>
    </header>
  )
}

export { Header }
