import { describe, it, expect } from 'vitest'
import { readFileSync } from 'fs'
import { resolve } from 'path'
import { supportedLanguages } from './i18n/config'

describe('hreflang tags in index.html', () => {
  const html = readFileSync(resolve(__dirname, '../index.html'), 'utf-8')

  it('should have hreflang tag for each supported language', () => {
    for (const lang of supportedLanguages) {
      const pattern = new RegExp(
        `<link\\s+rel="alternate"\\s+hreflang="${lang}"\\s+href="https://macpacker\\.app/${lang.replace('-', '\\-')}/"\\s*/?>`,
      )
      expect(html).toMatch(pattern)
    }
  })

  it('should have an x-default hreflang tag pointing to English', () => {
    expect(html).toMatch(
      /<link\s+rel="alternate"\s+hreflang="x-default"\s+href="https:\/\/macpacker\.app\/en\/"\s*\/?>/,
    )
  })

  it('should have exactly 4 hreflang tags (3 languages + x-default)', () => {
    const matches = html.match(/hreflang="/g)
    expect(matches).toHaveLength(4)
  })
})

describe('route structure', () => {
  it('should support en, de, and zh-Hans as language codes', () => {
    expect(supportedLanguages).toContain('en')
    expect(supportedLanguages).toContain('de')
    expect(supportedLanguages).toContain('zh-Hans')
  })

  it('should have exactly 3 supported languages', () => {
    expect(supportedLanguages).toHaveLength(3)
  })
})
