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

  it('should prefix path with German language code', () => {
    expect(buildLocalizedPath('de', '/imprint')).toBe('/de/imprint')
  })

  it('should prefix path with zh-Hans language code', () => {
    expect(buildLocalizedPath('zh-Hans', '/imprint')).toBe('/zh-Hans/imprint')
  })

  it('should handle root path correctly', () => {
    expect(buildLocalizedPath('en', '/')).toBe('/en/')
    expect(buildLocalizedPath('de', '/')).toBe('/de/')
    expect(buildLocalizedPath('zh-Hans', '/')).toBe('/zh-Hans/')
  })

  it('should add leading slash if missing', () => {
    expect(buildLocalizedPath('en', 'imprint')).toBe('/en/imprint')
  })

  it('should handle nested paths', () => {
    expect(buildLocalizedPath('en', '/docs/getting-started')).toBe('/en/docs/getting-started')
  })
})
