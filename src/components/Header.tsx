import { useState, type ReactElement, type ReactNode } from 'react'
import { Link, useParams } from 'wouter'
import { useLocalizedPath } from '@/hooks/useLocalizedPath'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { HeaderMobileMenu } from '@/components/HeaderMobileMenu'
import { HeaderNavLink } from '@/components/HeaderNavLink'
import { fallbackLanguage } from '@/i18n/config'

interface HeaderProps {
  children?: ReactNode
}

function Header ({ children }: HeaderProps): ReactElement {
  const localizedPath = useLocalizedPath()
  const params = useParams<{ lang: string }>()
  const lang = params.lang ?? fallbackLanguage
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const blogLabel = lang === 'zh' ? '博客' : 'Blog'

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
          <HeaderNavLink href={localizedPath('/blog')}>{blogLabel}</HeaderNavLink>
          {children}
        </nav>

        {/* Right section: Language switcher (desktop) */}
        <div className='hidden md:flex flex-row items-center'>
          <LanguageSwitcher />
        </div>

        {/* Mobile: Hamburger menu */}
        <HeaderMobileMenu isOpen={isMobileMenuOpen} onToggle={toggleMobileMenu}>
          <nav aria-label='Main navigation' className='flex flex-col gap-4' onClick={closeMobileMenu}>
            <HeaderNavLink href={localizedPath('/blog')}>{blogLabel}</HeaderNavLink>
            {children}
          </nav>
          <LanguageSwitcher />
        </HeaderMobileMenu>
      </div>
    </header>
  )
}

export { Header }
