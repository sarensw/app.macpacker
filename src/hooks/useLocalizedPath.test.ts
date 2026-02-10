import { describe, it, expect } from 'vitest'

// Test the path construction logic independently of the React hook
function buildLocalizedPath(lang: string, path: string): string {
  const cleanPath = path.startsWith('/') ? path : `/${path}`
  return `/${lang}${cleanPath}`
}

describe('localized path construction', () => {
  it('should prefix path with English language code', () => {
    expect(buildLocalizedPath('en', '/imprint')).toBe('/en/imprint')
  })

  it('should prefix path with zh language code', () => {
    expect(buildLocalizedPath('zh', '/imprint')).toBe('/zh/imprint')
  })

  it('should handle root path correctly', () => {
    expect(buildLocalizedPath('en', '/')).toBe('/en/')
    expect(buildLocalizedPath('zh', '/')).toBe('/zh/')
  })

  it('should add leading slash if missing', () => {
    expect(buildLocalizedPath('en', 'imprint')).toBe('/en/imprint')
  })

  it('should handle nested paths', () => {
    expect(buildLocalizedPath('en', '/docs/getting-started')).toBe('/en/docs/getting-started')
  })
})
