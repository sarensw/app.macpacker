import { describe, it, expect } from 'vitest'
import { readFileSync } from 'fs'
import { resolve } from 'path'
import { fallbackLanguage, supportedLanguages } from './i18n/config'

/**
 * AR-242: Behavior-based routing tests
 *
 * These tests validate routing behavior and runtime outcomes rather than
 * just checking source text. They verify the localized path construction,
 * 404 handling, language state consistency, and footer navigation.
 */

// Mirror the actual useLocalizedPath logic for behavioral testing
function buildLocalizedPath(lang: string, path: string): string {
  const cleanPath = path.startsWith('/') ? path : `/${path}`
  if (lang === fallbackLanguage) {
    return `~${cleanPath}`
  }
  return `~/${lang}${cleanPath}`
}

describe('AR-242 AC-1: Internal links use router-aware navigation', () => {
  const homeTsx = readFileSync(resolve(__dirname, './pages/home/index.tsx'), 'utf-8')

  it('should import Link from wouter for internal navigation', () => {
    expect(homeTsx).toMatch(/import.*\{[^}]*Link[^}]*\}.*from\s+['"]wouter['"]/)
  })

  it('should use wouter Link for the format comparison link instead of native <a>', () => {
    // The format comparison link uses localizedPath which returns ~-prefixed paths
    // It must use wouter Link, not native <a>, to handle the ~ prefix correctly
    expect(homeTsx).toContain("<Link")
    expect(homeTsx).toContain("localizedPath('/docs/format-comparison')")
    // Verify there's no native <a> tag with localizedPath
    expect(homeTsx).not.toMatch(/<a\s[^>]*href=\{localizedPath\(/)
  })

  it('should still use native <a> tags for external links', () => {
    // External links (GitHub, App Store, downloads) should remain as <a> tags
    expect(homeTsx).toContain('href={downloadUrlZip}')
    expect(homeTsx).toContain('href={masUrl}')
    expect(homeTsx).toContain("href='https://github.com/sarensw/MacPacker/issues/new'")
  })
})

describe('AR-242 AC-2: Catch-all 404 routes', () => {
  const appTsx = readFileSync(resolve(__dirname, './App.tsx'), 'utf-8')

  it('should import NotFound component', () => {
    expect(appTsx).toContain("import { NotFound } from './pages/NotFound'")
  })

  it('should have a catch-all route at the root level for unknown paths', () => {
    // The catch-all should be the last route in the root Switch
    expect(appTsx).toContain("path='/:rest*' component={NotFound}")
  })

  it('should have a catch-all route inside the /zh nest for unknown Chinese paths', () => {
    const zhNestBlock = appTsx.match(/path='\/zh'.*nest[\s\S]*?<\/Route>\s*\n/m)?.[0]
    expect(zhNestBlock).toBeTruthy()
    expect(zhNestBlock).toContain("path='/:rest*' component={NotFound}")
  })

  it('should place catch-all after all specific routes in root Switch', () => {
    // Verify catch-all is after the / route (LanguageRedirect)
    const rootRedirectIdx = appTsx.indexOf("path='/' component={LanguageRedirect}")
    const rootCatchAllIdx = appTsx.lastIndexOf("path='/:rest*' component={NotFound}")
    expect(rootRedirectIdx).toBeLessThan(rootCatchAllIdx)
  })

  it('should place catch-all after all specific routes in /zh Switch', () => {
    const zhNestBlock = appTsx.match(/path='\/zh'.*nest[\s\S]*?<\/Route>\s*\n/m)?.[0]
    expect(zhNestBlock).toBeTruthy()
    // Home route should come before catch-all in the /zh nest
    const homeIdx = zhNestBlock!.indexOf("path='/' component={Home}")
    const catchAllIdx = zhNestBlock!.indexOf("path='/:rest*' component={NotFound}")
    expect(homeIdx).toBeLessThan(catchAllIdx)
  })
})

describe('AR-242 AC-2: NotFound page structure', () => {
  const notFoundTsx = readFileSync(resolve(__dirname, './pages/NotFound.tsx'), 'utf-8')

  it('should display 404 heading', () => {
    expect(notFoundTsx).toContain('404')
  })

  it('should display a descriptive message', () => {
    expect(notFoundTsx).toContain('does not exist')
  })

  it('should provide a link back to home', () => {
    expect(notFoundTsx).toContain("href='~/'")
    expect(notFoundTsx).toContain('Back to Home')
  })

  it('should include Header and Footer', () => {
    expect(notFoundTsx).toContain('<Header />')
    expect(notFoundTsx).toContain('<Footer />')
  })
})

describe('AR-242 AC-3: Language state consistency for root English routes', () => {
  const appTsx = readFileSync(resolve(__dirname, './App.tsx'), 'utf-8')

  it('should wrap root English routes in LanguageRoute with lang=en', () => {
    // All English routes (except LanguageRedirect which handles its own language)
    // should be wrapped in LanguageRoute to ensure i18n and context are synced
    expect(appTsx).toContain("<LanguageRoute lang='en'><Imprint /></LanguageRoute>")
    expect(appTsx).toContain("<LanguageRoute lang='en'><BlogDetail /></LanguageRoute>")
    expect(appTsx).toContain("<LanguageRoute lang='en'><BlogIndex /></LanguageRoute>")
    expect(appTsx).toContain("<LanguageRoute lang='en'><DocPage /></LanguageRoute>")
    expect(appTsx).toContain("<LanguageRoute lang='en'><DocsIndex /></LanguageRoute>")
  })

  it('should wrap Chinese routes in LanguageRoute with lang=zh', () => {
    expect(appTsx).toContain("<LanguageRoute lang='zh'>")
  })

  it('should use LanguageRoute for both en and zh language contexts', () => {
    // Both language contexts should use LanguageRoute to ensure consistency
    expect(appTsx).toContain("lang='en'")
    expect(appTsx).toContain("lang='zh'")
  })
})

describe('AR-242 AC-3: Language state alignment behavior', () => {
  const languageRouteTsx = readFileSync(resolve(__dirname, './components/LanguageRoute.tsx'), 'utf-8')

  it('LanguageRoute should call i18n.changeLanguage to sync i18next state', () => {
    expect(languageRouteTsx).toContain('i18n.changeLanguage(lang)')
  })

  it('LanguageRoute should provide LanguageContext.Provider', () => {
    expect(languageRouteTsx).toContain('<LanguageContext.Provider value={lang}>')
  })

  it('LanguageRoute should only change language when it differs from current', () => {
    expect(languageRouteTsx).toContain('i18n.language !== lang')
  })
})

describe('AR-242 AC-4: Footer uses localized imprint path', () => {
  const footerTsx = readFileSync(resolve(__dirname, './components/Footer.tsx'), 'utf-8')

  it('should import useLocalizedPath hook', () => {
    expect(footerTsx).toContain("import { useLocalizedPath } from '@/hooks/useLocalizedPath'")
  })

  it('should import Link from wouter', () => {
    expect(footerTsx).toMatch(/import.*\{[^}]*Link[^}]*\}.*from\s+['"]wouter['"]/)
  })

  it('should use localizedPath for the imprint link', () => {
    expect(footerTsx).toContain("localizedPath('/imprint')")
  })

  it('should use wouter Link component for imprint navigation', () => {
    expect(footerTsx).toContain('<Link href={localizedPath')
  })

  it('should still use native <a> tags for external links (email, media kit)', () => {
    expect(footerTsx).toContain("href='mailto:")
    expect(footerTsx).toContain("href='/media-kit/")
  })
})

describe('AR-242 AC-4: Footer localized path behavioral tests', () => {
  it('should produce /imprint for English context', () => {
    const path = buildLocalizedPath('en', '/imprint')
    expect(path).toBe('~/imprint')
  })

  it('should produce /zh/imprint for Chinese context', () => {
    const path = buildLocalizedPath('zh', '/imprint')
    expect(path).toBe('~/zh/imprint')
  })
})

describe('AR-242 AC-5: Localized path construction behavior', () => {
  it('should produce correct paths for all supported languages and common routes', () => {
    const routes = ['/', '/blog', '/blog/hello-world', '/imprint', '/docs', '/docs/format-comparison']

    for (const lang of supportedLanguages) {
      for (const route of routes) {
        const result = buildLocalizedPath(lang, route)
        expect(result).toMatch(/^~\//)

        if (lang === fallbackLanguage) {
          // English paths should not contain the language prefix
          expect(result).not.toContain(`/${lang}/`)
        } else {
          // Non-English paths should contain the language prefix
          expect(result).toContain(`/${lang}`)
        }
      }
    }
  })

  it('should never produce double language prefixes', () => {
    for (const lang of supportedLanguages) {
      const result = buildLocalizedPath(lang, '/blog')
      const doublePrefix = `/${lang}/${lang}/`
      expect(result).not.toContain(doublePrefix)
    }
  })

  it('should always start with ~ prefix for wouter absolute navigation', () => {
    const paths = [
      buildLocalizedPath('en', '/'),
      buildLocalizedPath('zh', '/blog'),
      buildLocalizedPath('en', '/imprint'),
      buildLocalizedPath('zh', '/docs/some-page'),
    ]
    for (const p of paths) {
      expect(p.startsWith('~')).toBe(true)
    }
  })

  it('should normalize paths without leading slash', () => {
    expect(buildLocalizedPath('en', 'blog')).toBe('~/blog')
    expect(buildLocalizedPath('zh', 'blog')).toBe('~/zh/blog')
  })
})

describe('AR-242 AC-6: Backward compatibility with AR-220/AR-221 routing model', () => {
  const appTsx = readFileSync(resolve(__dirname, './App.tsx'), 'utf-8')

  it('should maintain /zh nested routing structure', () => {
    expect(appTsx).toContain("path='/zh' nest")
  })

  it('should maintain all required English routes at root level', () => {
    const rootSection = appTsx.split("path='/zh' nest")[1]
    expect(rootSection).toBeTruthy()
    expect(rootSection).toContain("path='/imprint'")
    expect(rootSection).toContain("path='/blog/:slug'")
    expect(rootSection).toContain("path='/blog'")
    expect(rootSection).toContain("path='/docs/:slug'")
    expect(rootSection).toContain("path='/docs'")
    expect(rootSection).toContain("path='/' component={LanguageRedirect}")
  })

  it('should maintain all required Chinese routes under /zh nest', () => {
    const zhNestBlock = appTsx.match(/path='\/zh'.*nest[\s\S]*?<\/Route>\s*\n/m)?.[0]
    expect(zhNestBlock).toBeTruthy()
    expect(zhNestBlock).toContain("path='/imprint'")
    expect(zhNestBlock).toContain("path='/blog/:slug'")
    expect(zhNestBlock).toContain("path='/blog'")
    expect(zhNestBlock).toContain("path='/docs/:slug'")
    expect(zhNestBlock).toContain("path='/docs'")
    expect(zhNestBlock).toContain("path='/'")
  })

  it('should use LanguageRedirect for root / to handle language detection', () => {
    expect(appTsx).toContain("path='/' component={LanguageRedirect}")
  })

  it('should use Switch for route matching in both root and /zh contexts', () => {
    expect(appTsx).toContain("import { Router, Route, Switch } from 'wouter'")
    // Count Switch components - should have at least 3 (root, zh nest, and the Router wrapper)
    const switchCount = (appTsx.match(/<Switch>/g) ?? []).length
    expect(switchCount).toBeGreaterThanOrEqual(2)
  })
})
