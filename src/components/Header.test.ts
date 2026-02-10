import { describe, it, expect } from 'vitest'
import { readFileSync } from 'fs'
import { resolve } from 'path'

const headerComponent = readFileSync(resolve(__dirname, './Header.tsx'), 'utf-8')
const headerNavLinkComponent = readFileSync(resolve(__dirname, './HeaderNavLink.tsx'), 'utf-8')
const headerMobileMenuComponent = readFileSync(resolve(__dirname, './HeaderMobileMenu.tsx'), 'utf-8')
const homeComponent = readFileSync(resolve(__dirname, '../pages/home/index.tsx'), 'utf-8')
const imprintComponent = readFileSync(resolve(__dirname, '../pages/imprint/index.tsx'), 'utf-8')
const docsIndexComponent = readFileSync(resolve(__dirname, '../pages/docs/index.tsx'), 'utf-8')
const docPageComponent = readFileSync(resolve(__dirname, '../pages/docs/DocPage.tsx'), 'utf-8')

describe('AC-1: Header is used on all pages', () => {
  it('should render Header on the Home page', () => {
    expect(homeComponent).toContain("import { Header } from '@/components/Header'")
    expect(homeComponent).toContain('<Header />')
  })

  it('should render Header on the Imprint page', () => {
    expect(imprintComponent).toContain("import { Header } from '@/components/Header'")
    expect(imprintComponent).toContain('<Header />')
  })

  it('should render Header on the Docs index page', () => {
    expect(docsIndexComponent).toContain("import { Header } from '@/components/Header'")
    expect(docsIndexComponent).toContain('<Header />')
  })

  it('should render Header on the Doc detail page', () => {
    expect(docPageComponent).toContain("import { Header } from '@/components/Header'")
    expect(docPageComponent).toContain('<Header />')
  })
})

describe('AC-2: Desktop 3-section layout with gap-2', () => {
  it('should have gap-2 spacing on the main container', () => {
    expect(headerComponent).toContain('gap-2')
  })

  it('should use justify-between for section distribution', () => {
    expect(headerComponent).toContain('justify-between')
  })

  it('should have a flex row layout', () => {
    expect(headerComponent).toContain('flex flex-row')
  })
})

describe('AC-3: Left section with logo + MacPacker text linking to localized root', () => {
  it('should have a Link wrapping both logo and text', () => {
    expect(headerComponent).toContain("href={localizedPath('/')}")
  })

  it('should show the MacPacker logo', () => {
    expect(headerComponent).toContain("src='/icon_512x512@2x.png'")
  })

  it('should show MacPacker text', () => {
    expect(headerComponent).toContain('MacPacker')
  })

  it('should have gap-2 between logo and text', () => {
    expect(headerComponent).toMatch(/Link[^>]*className='flex flex-row items-center gap-2'/)
  })

  it('should have alt text on the logo image', () => {
    expect(headerComponent).toMatch(/img[^>]*alt='MacPacker'/)
  })
})

describe('AC-4: Mobile left section shows icon only', () => {
  it('should hide MacPacker text on mobile with hidden md:block', () => {
    expect(headerComponent).toContain('hidden md:block')
  })

  it('should keep the logo visible on all screen sizes', () => {
    expect(headerComponent).toMatch(/<img[^>]*className='w-12'/)
  })
})

describe('AC-5: Middle section nav link styling', () => {
  it('should have text-gray-900 color', () => {
    expect(headerNavLinkComponent).toContain('text-gray-900')
  })

  it('should have hover:opacity-80', () => {
    expect(headerNavLinkComponent).toContain('hover:opacity-80')
  })

  it('should have no underline', () => {
    expect(headerNavLinkComponent).toContain('no-underline')
  })

  it('should have font-medium weight', () => {
    expect(headerNavLinkComponent).toContain('font-medium')
  })

  it('should have transition-opacity for smooth hover', () => {
    expect(headerNavLinkComponent).toContain('transition-opacity')
  })
})

describe('AC-6: HeaderNavLink is a separate reusable component', () => {
  it('should exist as a standalone file', () => {
    expect(headerNavLinkComponent).toBeTruthy()
  })

  it('should accept href prop', () => {
    expect(headerNavLinkComponent).toContain('href: string')
  })

  it('should accept children prop', () => {
    expect(headerNavLinkComponent).toContain('children: ReactNode')
  })

  it('should accept optional onClick prop', () => {
    expect(headerNavLinkComponent).toContain('onClick?: () => void')
  })

  it('should export the component', () => {
    expect(headerNavLinkComponent).toContain('export { HeaderNavLink }')
  })
})

describe('AC-7: HeaderNavLink uses Wouter Link', () => {
  it('should import Link from wouter', () => {
    expect(headerNavLinkComponent).toMatch(/import.*Link.*from 'wouter'/)
  })

  it('should use Link component in render', () => {
    expect(headerNavLinkComponent).toContain('<Link')
  })
})

describe('AC-8: Desktop language switcher in right section', () => {
  it('should import LanguageSwitcher', () => {
    expect(headerComponent).toContain("import { LanguageSwitcher } from '@/components/LanguageSwitcher'")
  })

  it('should render LanguageSwitcher in a hidden md:flex container', () => {
    expect(headerComponent).toContain("'hidden md:flex flex-row items-center'")
    expect(headerComponent).toContain('<LanguageSwitcher />')
  })
})

describe('AC-9: Mobile hamburger replaces middle+right sections', () => {
  it('should import HeaderMobileMenu', () => {
    expect(headerComponent).toContain("import { HeaderMobileMenu } from '@/components/HeaderMobileMenu'")
  })

  it('should render HeaderMobileMenu component', () => {
    expect(headerComponent).toContain('<HeaderMobileMenu')
  })

  it('should show hamburger button only on mobile (md:hidden)', () => {
    expect(headerMobileMenuComponent).toContain('md:hidden')
  })

  it('should hide desktop nav section on mobile (hidden md:flex)', () => {
    expect(headerComponent).toContain('hidden md:flex')
  })
})

describe('AC-10: Mobile dropdown shows links first, then language switcher', () => {
  it('should render LanguageSwitcher inside mobile menu', () => {
    const mobileMenuBlock = headerComponent.match(/<HeaderMobileMenu[\s\S]*?<\/HeaderMobileMenu>/)?.[0]
    expect(mobileMenuBlock).toBeTruthy()
    expect(mobileMenuBlock).toContain('<LanguageSwitcher />')
  })

  it('should render nav links before language switcher in mobile menu', () => {
    const mobileMenuBlock = headerComponent.match(/<HeaderMobileMenu[\s\S]*?<\/HeaderMobileMenu>/)?.[0]
    expect(mobileMenuBlock).toBeTruthy()
    const navIndex = mobileMenuBlock!.indexOf('Main navigation')
    const langIndex = mobileMenuBlock!.indexOf('<LanguageSwitcher />')
    expect(navIndex).toBeLessThan(langIndex)
  })
})

describe('AC-11: Mobile hamburger accessibility', () => {
  it('should have aria-label on hamburger button', () => {
    expect(headerMobileMenuComponent).toContain("aria-label='Menu'")
  })

  it('should have aria-expanded attribute', () => {
    expect(headerMobileMenuComponent).toContain('aria-expanded={isOpen}')
  })

  it('should have aria-controls referencing mobile-menu', () => {
    expect(headerMobileMenuComponent).toContain("aria-controls='mobile-menu'")
  })

  it('should have matching id on mobile menu container', () => {
    expect(headerMobileMenuComponent).toContain("id='mobile-menu'")
  })

  it('should have role=menu on the dropdown', () => {
    expect(headerMobileMenuComponent).toContain("role='menu'")
  })
})

describe('AC-12: Mobile menu closes on link click', () => {
  it('should have closeMobileMenu function', () => {
    expect(headerComponent).toContain('function closeMobileMenu')
  })

  it('should pass closeMobileMenu as onClick to nav container in mobile menu', () => {
    expect(headerComponent).toContain('onClick={closeMobileMenu}')
  })

  it('should support toggle via onToggle prop', () => {
    expect(headerComponent).toContain('onToggle={toggleMobileMenu}')
  })
})

describe('AC-13: Header container max-w-3xl and centered', () => {
  it('should have max-w-3xl class', () => {
    expect(headerComponent).toContain('max-w-3xl')
  })

  it('should have mx-auto for centering', () => {
    expect(headerComponent).toContain('mx-auto')
  })
})

describe('Header uses semantic HTML', () => {
  it('should use <header> element', () => {
    expect(headerComponent).toContain('<header')
  })

  it('should use <nav> element for desktop navigation', () => {
    expect(headerComponent).toContain("<nav aria-label='Main navigation'")
  })
})

describe('HeaderMobileMenu uses correct icons', () => {
  it('should import Bars3Icon from heroicons', () => {
    expect(headerMobileMenuComponent).toContain('Bars3Icon')
  })

  it('should import XMarkIcon from heroicons', () => {
    expect(headerMobileMenuComponent).toContain('XMarkIcon')
  })

  it('should use size-6 for icon sizing', () => {
    expect(headerMobileMenuComponent).toContain('size-6')
  })
})

describe('HeaderNavLink focus accessibility', () => {
  it('should have focus-visible outline styles', () => {
    expect(headerNavLinkComponent).toContain('focus-visible:outline')
  })
})

describe('Home page does not have a duplicate ad-hoc header', () => {
  it('should not have an inline fork-me GitHub header', () => {
    expect(homeComponent).not.toContain("t('header.forkMe')")
  })

  it('should not import github-mark.svg', () => {
    expect(homeComponent).not.toContain('github-mark.svg')
  })
})
