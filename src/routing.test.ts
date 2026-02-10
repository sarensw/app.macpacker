import { describe, it, expect } from 'vitest'
import { readFileSync } from 'fs'
import { resolve } from 'path'
import { supportedLanguages, fallbackLanguage } from './i18n/config'

describe('hreflang tags in index.html', () => {
  const html = readFileSync(resolve(__dirname, '../index.html'), 'utf-8')

  it('should have hreflang tag for each supported language', () => {
    for (const lang of supportedLanguages) {
      // English (fallback) hreflang points to root /, other languages to /<lang>/
      const hrefPath = lang === fallbackLanguage ? '' : `${lang}/`
      const pattern = new RegExp(
        `<link\\s+rel="alternate"\\s+hreflang="${lang}"\\s+href="https://macpacker\\.app/${hrefPath}"\\s*/?>`,
      )
      expect(html).toMatch(pattern)
    }
  })

  it('should have an x-default hreflang tag pointing to root URL', () => {
    expect(html).toMatch(
      /<link\s+rel="alternate"\s+hreflang="x-default"\s+href="https:\/\/macpacker\.app\/"\s*\/?>/,
    )
  })

  it('should have exactly 3 hreflang tags (2 languages + x-default)', () => {
    const matches = html.match(/hreflang="/g)
    expect(matches).toHaveLength(3)
  })
})

describe('route structure', () => {
  it('should support en and zh as language codes', () => {
    expect(supportedLanguages).toContain('en')
    expect(supportedLanguages).toContain('zh')
  })

  it('should have exactly 2 supported languages', () => {
    expect(supportedLanguages).toHaveLength(2)
  })

  it('should have English as the fallback language', () => {
    expect(fallbackLanguage).toBe('en')
  })
})

describe('imprint route', () => {
  const appTsx = readFileSync(resolve(__dirname, './App.tsx'), 'utf-8')

  it('should have /imprint as a root-level route without language prefix', () => {
    expect(appTsx).toMatch(/path='\/imprint'/)
  })

  it('should have imprint under /zh language route per AC-5', () => {
    // AC-5 requires both /imprint and /zh/imprint routes
    const zhNestMatch = appTsx.match(/path='\/zh'.*nest[\s\S]*?<\/Route>/m)
    expect(zhNestMatch).not.toBeNull()
    expect(zhNestMatch![0]).toContain("'/imprint'")
  })
})

describe('footer imprint link', () => {
  const footerTsx = readFileSync(resolve(__dirname, './components/Footer.tsx'), 'utf-8')

  it('should link to /imprint without language prefix', () => {
    expect(footerTsx).toContain("href='/imprint'")
  })

  it('should not use useLocalizedPath for imprint link', () => {
    expect(footerTsx).not.toContain('useLocalizedPath')
  })

  it('should use a plain <a> tag instead of wouter Link for imprint', () => {
    expect(footerTsx).toMatch(/<a\s[^>]*href='\/imprint'/)
  })

  it('should not import Link from wouter', () => {
    expect(footerTsx).not.toMatch(/import.*Link.*from\s+['"]wouter['"]/)
  })
})

describe('language redirect behavior', () => {
  const redirectTsx = readFileSync(resolve(__dirname, './components/LanguageRedirect.tsx'), 'utf-8')

  it('should render Home component for English browsers without redirect', () => {
    expect(redirectTsx).toContain('fallbackLanguage')
    expect(redirectTsx).toContain('<Home />')
  })

  it('should redirect non-English browsers to language-prefixed URL', () => {
    expect(redirectTsx).toContain('setLocation(`/${lang}/`')
  })
})
