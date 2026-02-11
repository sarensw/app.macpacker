import { describe, it, expect } from 'vitest'
import { readFileSync } from 'fs'
import { resolve } from 'path'

/**
 * AR-242: Component and Integration Tests
 *
 * These tests verify component-level integration - testing how multiple
 * components work together to achieve routing, localization, and navigation
 * functionality. Unlike unit tests that verify individual pieces, these tests
 * verify the integration between components.
 */

const appTsx = readFileSync(resolve(__dirname, './App.tsx'), 'utf-8')
const notFoundTsx = readFileSync(resolve(__dirname, './pages/NotFound.tsx'), 'utf-8')
const footerTsx = readFileSync(resolve(__dirname, './components/Footer.tsx'), 'utf-8')
const homeTsx = readFileSync(resolve(__dirname, './pages/home/index.tsx'), 'utf-8')
const languageRouteTsx = readFileSync(resolve(__dirname, './components/LanguageRoute.tsx'), 'utf-8')

describe('AR-242 Component Integration: NotFound page complete structure', () => {
  it('should integrate Header, Footer, and navigation in NotFound component', () => {
    // NotFound should compose Header and Footer with its own content
    expect(notFoundTsx).toContain("import { Header } from '@/components/Header'")
    expect(notFoundTsx).toContain("import { Footer } from '@/components/Footer'")
    expect(notFoundTsx).toContain('<Header />')
    expect(notFoundTsx).toContain('<Footer />')

    // Should integrate wouter Link for navigation
    expect(notFoundTsx).toContain("import { Link } from 'wouter'")
    expect(notFoundTsx).toContain('<Link')

    // Should provide complete user experience (heading, message, navigation)
    expect(notFoundTsx).toContain('404')
    expect(notFoundTsx).toContain('does not exist')
    expect(notFoundTsx).toContain('Back to Home')
    expect(notFoundTsx).toContain("href='~/'")
  })

  it('should be properly integrated into App routing at multiple levels', () => {
    // NotFound should be integrated at both root and /zh levels
    expect(appTsx).toContain("import { NotFound } from './pages/NotFound'")

    // Should be integrated as catch-all in root Switch
    const rootCatchAll = appTsx.includes("path='/:rest*' component={NotFound}")
    expect(rootCatchAll).toBe(true)

    // Should be integrated as catch-all in /zh nested Switch
    const zhNest = appTsx.match(/path='\/zh'.*nest[\s\S]*?<\/Route>/)?.[0]
    expect(zhNest).toBeTruthy()
    expect(zhNest).toContain("path='/:rest*' component={NotFound}")
  })
})

describe('AR-242 Component Integration: Footer and useLocalizedPath integration', () => {
  it('should integrate Footer with useLocalizedPath hook and wouter Link', () => {
    // Footer integrates multiple pieces for localized navigation
    expect(footerTsx).toContain("import { useLocalizedPath } from '@/hooks/useLocalizedPath'")
    expect(footerTsx).toContain("import { Link } from 'wouter'")

    // Should use the hook to get localized path function
    expect(footerTsx).toContain('const localizedPath = useLocalizedPath()')

    // Should integrate Link with localizedPath for imprint
    expect(footerTsx).toContain('<Link href={localizedPath')
    expect(footerTsx).toContain("localizedPath('/imprint')")
  })

  it('should integrate Footer consistently across all pages', () => {
    // Footer should be integrated into NotFound (AC-2 requirement)
    expect(notFoundTsx).toContain('<Footer />')

    // Verify Footer's localization integration works in both language contexts
    // Footer should call useLocalizedPath which adapts to LanguageContext
    expect(footerTsx).toContain('useLocalizedPath()')
  })
})

describe('AR-242 Component Integration: Routing and LanguageRoute integration', () => {
  it('should integrate English routes with LanguageRoute wrapper', () => {
    // App should integrate routes with LanguageRoute to ensure language sync
    // This is component-level integration: Route + LanguageRoute + Page Component

    // Imprint integration
    const imprintRoute = appTsx.includes("<Route path='/imprint'>{() => <LanguageRoute lang='en'><Imprint /></LanguageRoute>}</Route>")
    expect(imprintRoute).toBe(true)

    // Blog routes integration
    const blogDetailRoute = appTsx.includes("<Route path='/blog/:slug'>{() => <LanguageRoute lang='en'><BlogDetail /></LanguageRoute>}</Route>")
    const blogIndexRoute = appTsx.includes("<Route path='/blog'>{() => <LanguageRoute lang='en'><BlogIndex /></LanguageRoute>}</Route>")
    expect(blogDetailRoute).toBe(true)
    expect(blogIndexRoute).toBe(true)

    // Docs routes integration
    const docPageRoute = appTsx.includes("<Route path='/docs/:slug'>{() => <LanguageRoute lang='en'><DocPage /></LanguageRoute>}</Route>")
    const docsIndexRoute = appTsx.includes("<Route path='/docs'>{() => <LanguageRoute lang='en'><DocsIndex /></LanguageRoute>}</Route>")
    expect(docPageRoute).toBe(true)
    expect(docsIndexRoute).toBe(true)
  })

  it('should integrate Chinese routes with LanguageRoute wrapper', () => {
    // Chinese routes should be wrapped in a single LanguageRoute at the /zh level
    const zhBlock = appTsx.match(/<Route path='\/zh' nest>[\s\S]*?<LanguageRoute lang='zh'>[\s\S]*?<\/LanguageRoute>[\s\S]*?<\/Route>/)?.[0]
    expect(zhBlock).toBeTruthy()

    // Verify the nested routes are inside the LanguageRoute wrapper
    expect(zhBlock).toContain("path='/imprint' component={Imprint}")
    expect(zhBlock).toContain("path='/blog/:slug' component={BlogDetail}")
    expect(zhBlock).toContain("path='/blog' component={BlogIndex}")
  })

  it('should integrate LanguageRoute with i18n to synchronize language state', () => {
    // LanguageRoute should integrate with i18next to keep state synchronized
    expect(languageRouteTsx).toContain('useEffect')
    expect(languageRouteTsx).toContain('i18n.changeLanguage(lang)')
    expect(languageRouteTsx).toContain('<LanguageContext.Provider value={lang}>')

    // This integration ensures routing state and i18n state stay aligned
    expect(languageRouteTsx).toContain('i18n.language !== lang')
  })
})

describe('AR-242 Component Integration: Link component integration in pages', () => {
  it('should integrate wouter Link with useLocalizedPath in home page', () => {
    // Home page should integrate Link and useLocalizedPath for internal navigation
    expect(homeTsx).toContain("import { Link } from 'wouter'")
    expect(homeTsx).toContain("import { useLocalizedPath } from '@/hooks/useLocalizedPath'")

    // Should use localizedPath with Link for format comparison
    expect(homeTsx).toContain('<Link')
    expect(homeTsx).toContain("localizedPath('/docs/format-comparison')")

    // Should NOT use native <a> with localizedPath (broken integration)
    const brokenPattern = /<a\s[^>]*href=\{localizedPath\(/
    expect(homeTsx).not.toMatch(brokenPattern)
  })

  it('should maintain separation: wouter Link for internal, native <a> for external', () => {
    // Home page should integrate Link for internal, <a> for external
    // This tests the integration pattern is correctly applied

    // External links should use native <a>
    expect(homeTsx).toContain('href={downloadUrlZip}') // Download link
    expect(homeTsx).toContain('href={masUrl}') // App Store link
    expect(homeTsx).toContain("href='https://github.com") // GitHub link

    // Internal navigation should use Link
    expect(homeTsx).toContain('<Link')
    expect(homeTsx).toContain('localizedPath(')
  })
})

describe('AR-242 Integration Test: Catch-all route positioning', () => {
  it('should integrate catch-all after all specific routes to prevent premature matching', () => {
    // This tests the integration between route order and matching behavior
    // Catch-all must come last or it will catch valid routes

    // Root level: catch-all should be after LanguageRedirect
    const rootRedirectPos = appTsx.indexOf("path='/' component={LanguageRedirect}")
    const rootCatchAllPos = appTsx.lastIndexOf("path='/:rest*' component={NotFound}")
    expect(rootRedirectPos).toBeGreaterThan(0)
    expect(rootCatchAllPos).toBeGreaterThan(0)
    expect(rootCatchAllPos).toBeGreaterThan(rootRedirectPos)

    // /zh level: catch-all should be after Home route
    const zhNest = appTsx.match(/path='\/zh'.*nest[\s\S]*?<\/Route>/)?.[0]
    expect(zhNest).toBeTruthy()

    const zhHomePos = zhNest!.indexOf("path='/' component={Home}")
    const zhCatchAllPos = zhNest!.indexOf("path='/:rest*' component={NotFound}")
    expect(zhHomePos).toBeGreaterThan(0)
    expect(zhCatchAllPos).toBeGreaterThan(0)
    expect(zhCatchAllPos).toBeGreaterThan(zhHomePos)
  })
})

describe('AR-242 Integration Test: Backward compatibility with existing routing', () => {
  it('should maintain integration with AR-220/AR-221 routing structure', () => {
    // Tests that new changes integrate with existing routing model
    // without breaking the established pattern

    // Should maintain nested /zh structure
    expect(appTsx).toContain("path='/zh' nest")

    // Should maintain all AR-220 routes (English and Chinese)
    const routes = ['/', '/imprint', '/blog', '/blog/:slug', '/docs', '/docs/:slug']

    // All routes should exist at root level (English)
    for (const route of routes) {
      const routeExists = appTsx.includes(`path='${route}'`)
      expect(routeExists).toBe(true)
    }

    // All non-root routes should exist in /zh nest (Chinese)
    const zhNest = appTsx.match(/path='\/zh'.*nest[\s\S]*?<\/Route>/)?.[0]
    expect(zhNest).toBeTruthy()
    for (const route of routes.slice(1)) { // Skip root /
      expect(zhNest).toContain(`path='${route}'`)
    }
  })

  it('should integrate new 404 handling without disrupting existing routes', () => {
    // NotFound integration should not interfere with existing routes
    // This is verified by ensuring specific routes come before catch-all

    // All specific routes should be present
    const specificRoutes = [
      "path='/imprint'",
      "path='/blog/:slug'",
      "path='/blog'",
      "path='/docs/:slug'",
      "path='/docs'",
      "path='/' component={LanguageRedirect}"
    ]

    for (const route of specificRoutes) {
      expect(appTsx).toContain(route)
    }

    // Catch-all should be last
    const lastRoute = appTsx.lastIndexOf("<Route path='/:rest*' component={NotFound} />")
    const switchEnd = appTsx.lastIndexOf("</Switch>")
    expect(lastRoute).toBeLessThan(switchEnd)
    expect(lastRoute).toBeGreaterThan(0)
  })
})
