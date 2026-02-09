import { describe, it, expect, afterEach } from 'vitest'
import { detectBrowserLanguage } from '@/i18n/detectLanguage'
import { fallbackLanguage } from '@/i18n/config'

describe('LanguageRedirect logic', () => {
  const originalNavigator = globalThis.navigator

  function mockNavigatorLanguages(languages: string[]) {
    Object.defineProperty(globalThis, 'navigator', {
      value: { languages, language: languages[0] ?? 'en' },
      writable: true,
      configurable: true,
    })
  }

  afterEach(() => {
    Object.defineProperty(globalThis, 'navigator', {
      value: originalNavigator,
      writable: true,
      configurable: true,
    })
  })

  it('should not redirect English browsers (detected lang equals fallback)', () => {
    mockNavigatorLanguages(['en-US', 'en'])
    const lang = detectBrowserLanguage()
    expect(lang).toBe(fallbackLanguage)
    // When lang === fallbackLanguage, LanguageRedirect renders Home instead of redirecting
  })

  it('should redirect German browsers to /de/', () => {
    mockNavigatorLanguages(['de-DE', 'de', 'en'])
    const lang = detectBrowserLanguage()
    expect(lang).not.toBe(fallbackLanguage)
    expect(`/${lang}/`).toBe('/de/')
  })

  it('should redirect Chinese browsers to /zh/', () => {
    mockNavigatorLanguages(['zh-CN', 'zh'])
    const lang = detectBrowserLanguage()
    expect(lang).not.toBe(fallbackLanguage)
    expect(`/${lang}/`).toBe('/zh/')
  })

  it('should not redirect for unsupported languages (falls back to English)', () => {
    mockNavigatorLanguages(['fr-FR', 'fr'])
    const lang = detectBrowserLanguage()
    expect(lang).toBe(fallbackLanguage)
    // Falls back to English, so no redirect — stays on /
  })

  it('should generate correct redirect paths for all non-English languages', () => {
    const testCases = [
      { input: ['de'], expected: '/de/' },
      { input: ['zh'], expected: '/zh/' },
      { input: ['zh-CN'], expected: '/zh/' },
    ]

    for (const { input, expected } of testCases) {
      mockNavigatorLanguages(input)
      const lang = detectBrowserLanguage()
      expect(`/${lang}/`).toBe(expected)
    }
  })
})
