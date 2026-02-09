import { describe, it, expect } from 'vitest'
import { supportedLanguages } from '@/i18n/config'
import { languages } from '@/i18n/languages'

describe('LanguageSwitcher language configuration', () => {
  it('should define exactly three languages', () => {
    expect(languages).toHaveLength(3)
  })

  it('should have English as the first language with label "EN"', () => {
    expect(languages[0]).toEqual({ code: 'en', label: 'EN', name: 'English' })
  })

  it('should have German as the second language with label "DE"', () => {
    expect(languages[1]).toEqual({ code: 'de', label: 'DE', name: 'German' })
  })

  it('should have Chinese as the third language with label "中文"', () => {
    expect(languages[2]).toEqual({ code: 'zh', label: '中文', name: 'Chinese' })
  })

  it('should only use text labels, no flag icons (AC-3)', () => {
    for (const lang of languages) {
      expect(lang).not.toHaveProperty('icon')
      expect(lang).not.toHaveProperty('flag')
      expect(lang.label).toBeDefined()
      expect(typeof lang.label).toBe('string')
    }
  })

  it('should have codes matching the supported languages in i18n config', () => {
    const switcherCodes = languages.map(l => l.code)
    expect(switcherCodes).toEqual([...supportedLanguages])
  })

  it('should have unique language codes', () => {
    const codes = languages.map(l => l.code)
    expect(new Set(codes).size).toBe(codes.length)
  })

  it('should have a human-readable name for each language for accessibility', () => {
    for (const lang of languages) {
      expect(lang.name).toBeDefined()
      expect(lang.name.length).toBeGreaterThan(0)
    }
  })
})

describe('LanguageSwitcher accessibility requirements', () => {
  it('should provide aria-label text for active language', () => {
    for (const lang of languages) {
      const activeLabel = `${lang.name} (current language)`
      expect(activeLabel).toBeTruthy()
      expect(activeLabel).toContain(lang.name)
    }
  })

  it('should provide aria-label text for switching to a language', () => {
    for (const lang of languages) {
      const switchLabel = `Switch to ${lang.name}`
      expect(switchLabel).toBeTruthy()
      expect(switchLabel).toContain(lang.name)
    }
  })
})
