import { describe, it, expect, afterEach } from 'vitest'
import { detectBrowserLanguage } from '@/i18n/detectLanguage'

describe('detectBrowserLanguage', () => {
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

  it('should return "en" for English browser', () => {
    mockNavigatorLanguages(['en-US', 'en'])
    expect(detectBrowserLanguage()).toBe('en')
  })

  it('should return "en" for German browser (no longer supported)', () => {
    mockNavigatorLanguages(['de-DE', 'de', 'en'])
    expect(detectBrowserLanguage()).toBe('en')
  })

  it('should return "zh" for zh browser language', () => {
    mockNavigatorLanguages(['zh-CN', 'zh'])
    expect(detectBrowserLanguage()).toBe('zh')
  })

  it('should return "zh" for exact zh match', () => {
    mockNavigatorLanguages(['zh'])
    expect(detectBrowserLanguage()).toBe('zh')
  })

  it('should fall back to "en" for unsupported languages', () => {
    mockNavigatorLanguages(['fr-FR', 'fr'])
    expect(detectBrowserLanguage()).toBe('en')
  })

  it('should fall back to "en" for empty languages array', () => {
    mockNavigatorLanguages([])
    expect(detectBrowserLanguage()).toBe('en')
  })

  it('should pick the first supported language from preferences', () => {
    mockNavigatorLanguages(['ja', 'zh-CN', 'en-US'])
    expect(detectBrowserLanguage()).toBe('zh')
  })

  it('should fall back to English when only unsupported languages present', () => {
    mockNavigatorLanguages(['de', 'fr'])
    expect(detectBrowserLanguage()).toBe('en')
  })
})
