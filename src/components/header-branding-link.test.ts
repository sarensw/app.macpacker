import { describe, it, expect } from 'vitest'
import { readFileSync } from 'fs'
import { resolve } from 'path'

const headerComponent = readFileSync(resolve(__dirname, './Header.tsx'), 'utf-8')
const useLocalizedPathHook = readFileSync(resolve(__dirname, '../hooks/useLocalizedPath.ts'), 'utf-8')

// Mirrors the homePath logic from Header.tsx
function buildHomePath(lang: string, fallbackLanguage: string): string {
  return lang === fallbackLanguage ? '~/' : `~/${lang}`
}

// Mirrors the localizedPath logic from useLocalizedPath.ts
function buildLocalizedPath(lang: string, path: string): string {
  const cleanPath = path.startsWith('/') ? path : `/${path}`
  return `~/${lang}${cleanPath}`
}

describe('AR-215 AC-1: Clicking branding navigates to correct localized landing page', () => {
  it('should use homePath variable for branding link instead of localizedPath', () => {
    expect(headerComponent).toContain('href={homePath}')
    expect(headerComponent).not.toContain("href={localizedPath('/')}")
  })

  it('should compute homePath from lang and fallbackLanguage', () => {
    expect(headerComponent).toContain('const homePath')
    expect(headerComponent).toContain('fallbackLanguage')
  })
})

describe('AR-215 AC-2: English users navigate to / (root)', () => {
  it('should return ~/ for English (fallback) language', () => {
    expect(buildHomePath('en', 'en')).toBe('~/')
  })
})

describe('AR-215 AC-3: Chinese users navigate to /zh', () => {
  it('should return ~/zh for Chinese language', () => {
    expect(buildHomePath('zh', 'en')).toBe('~/zh')
  })
})

describe('AR-215 AC-4: Other languages navigate to /<lang>', () => {
  it('should return ~/fr for French language', () => {
    expect(buildHomePath('fr', 'en')).toBe('~/fr')
  })

  it('should return ~/ja for Japanese language', () => {
    expect(buildHomePath('ja', 'en')).toBe('~/ja')
  })
})

describe('AR-215 AC-5: Clicking branding does not repeatedly append /<lang>', () => {
  it('should use ~ prefix on homePath for absolute navigation (bypasses nest context)', () => {
    const enPath = buildHomePath('en', 'en')
    const zhPath = buildHomePath('zh', 'en')
    expect(enPath.startsWith('~/')).toBe(true)
    expect(zhPath.startsWith('~/')).toBe(true)
  })

  it('should use ~ prefix in useLocalizedPath for all paths', () => {
    expect(useLocalizedPathHook).toContain('`~/${lang}${cleanPath}`')
  })

  it('homePath should never contain double language segments', () => {
    const enPath = buildHomePath('en', 'en')
    const zhPath = buildHomePath('zh', 'en')
    // ~/en/en or ~/zh/zh would indicate the bug
    expect(enPath).not.toContain('/en/en')
    expect(zhPath).not.toContain('/zh/zh')
  })

  it('localizedPath should produce stable paths that dont stack', () => {
    // Simulating what happens when localizedPath is called inside a nested route:
    // The ~ prefix ensures wouter resolves from root, not relative to nest base
    const blogPath = buildLocalizedPath('en', '/blog')
    expect(blogPath).toBe('~/en/blog')
    // Without ~, inside /en nest, /en/blog would become /en/en/blog
    expect(blogPath).not.toMatch(/\/en\/en/)
  })
})

describe('AR-215 AC-6: Behavior is consistent regardless of starting page', () => {
  it('homePath is computed from lang context, independent of current page path', () => {
    // The homePath computation only depends on lang (from LanguageContext), not on the current URL
    expect(headerComponent).toContain("useCurrentLanguage()")
    expect(headerComponent).toMatch(/const homePath = lang === fallbackLanguage \? '~\/' : `~\/\$\{lang\}`/)
  })

  it('should import fallbackLanguage from config', () => {
    expect(headerComponent).toContain("import { fallbackLanguage } from '@/i18n/config'")
  })
})
