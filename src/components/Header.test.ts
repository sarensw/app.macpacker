import { describe, it, expect } from 'vitest'
import { readFileSync } from 'fs'
import { resolve } from 'path'

const headerComponent = readFileSync(resolve(__dirname, './Header.tsx'), 'utf-8')
const homeComponent = readFileSync(resolve(__dirname, '../pages/home/index.tsx'), 'utf-8')
const imprintComponent = readFileSync(resolve(__dirname, '../pages/imprint/index.tsx'), 'utf-8')
const docsIndexComponent = readFileSync(resolve(__dirname, '../pages/docs/index.tsx'), 'utf-8')
const docPageComponent = readFileSync(resolve(__dirname, '../pages/docs/DocPage.tsx'), 'utf-8')

describe('Header includes LanguageSwitcher (AC-1: visible in header on all pages)', () => {
  it('should import the LanguageSwitcher component', () => {
    expect(headerComponent).toContain("import { LanguageSwitcher } from '@/components/LanguageSwitcher'")
  })

  it('should render the LanguageSwitcher component', () => {
    expect(headerComponent).toContain('<LanguageSwitcher />')
  })

  it('should have a link to the home page with MacPacker branding', () => {
    expect(headerComponent).toContain('MacPacker')
    expect(headerComponent).toContain("src='/icon_512x512@2x.png'")
  })

  it('should use justify-between for left/right alignment', () => {
    expect(headerComponent).toContain('justify-between')
  })
})

describe('Header is rendered on all pages (AC-1)', () => {
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

describe('Home page does not have a duplicate ad-hoc header', () => {
  it('should not have an inline fork-me GitHub header', () => {
    // The old ad-hoc header had a "fork me" link in a flex-grow div
    expect(homeComponent).not.toContain("t('header.forkMe')")
  })

  it('should not import github-mark.svg', () => {
    expect(homeComponent).not.toContain('github-mark.svg')
  })
})

describe('Header accessibility (AC-7)', () => {
  it('should have alt text on the MacPacker logo image', () => {
    expect(headerComponent).toMatch(/img[^>]*alt=/)
  })
})
