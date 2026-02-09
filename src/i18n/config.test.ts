import { describe, it, expect, afterEach } from 'vitest'
import i18n, { supportedLanguages, fallbackLanguage } from './config'

describe('i18n configuration', () => {
  afterEach(async () => {
    await i18n.changeLanguage('en')
  })

  it('should initialize without errors', () => {
    expect(i18n.isInitialized).toBe(true)
  })

  it('should have English as the fallback language', () => {
    expect(fallbackLanguage).toBe('en')
  })

  it('should support en, de, and zh-Hans', () => {
    expect(supportedLanguages).toEqual(['en', 'de', 'zh-Hans'])
  })

  it('should have supportedLngs configured in i18next options', () => {
    const options = i18n.options
    expect(options.supportedLngs).toContain('en')
    expect(options.supportedLngs).toContain('de')
    expect(options.supportedLngs).toContain('zh-Hans')
  })

  it('should allow manual language change to German', async () => {
    await i18n.changeLanguage('de')
    expect(i18n.language).toBe('de')
  })

  it('should allow manual language change to Simplified Chinese', async () => {
    await i18n.changeLanguage('zh-Hans')
    expect(i18n.language).toBe('zh-Hans')
  })

  it('should allow manual language change back to English', async () => {
    await i18n.changeLanguage('de')
    expect(i18n.language).toBe('de')
    await i18n.changeLanguage('en')
    expect(i18n.language).toBe('en')
  })

  it('should fall back to English for unsupported languages', async () => {
    await i18n.changeLanguage('fr')
    // With no resources loaded, i18next sets language to fallback for unsupported langs
    expect(i18n.language).toBe('en')
    expect(i18n.options.fallbackLng).toContain('en')
  })

  it('should have language detection configured', () => {
    const options = i18n.options
    expect(options.detection).toBeDefined()
    expect(options.detection!.order).toContain('navigator')
  })
})
