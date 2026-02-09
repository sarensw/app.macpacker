import { describe, it, expect } from 'vitest'
import { supportedLanguages } from '@/i18n/config'

// Test the language validation logic independently of React components
function isValidLanguage(lang: string): boolean {
  return (supportedLanguages as readonly string[]).includes(lang)
}

describe('language validation', () => {
  it('should accept "en" as valid', () => {
    expect(isValidLanguage('en')).toBe(true)
  })

  it('should accept "de" as valid', () => {
    expect(isValidLanguage('de')).toBe(true)
  })

  it('should accept "zh-Hans" as valid', () => {
    expect(isValidLanguage('zh-Hans')).toBe(true)
  })

  it('should reject unsupported language codes', () => {
    expect(isValidLanguage('fr')).toBe(false)
    expect(isValidLanguage('es')).toBe(false)
    expect(isValidLanguage('ja')).toBe(false)
  })

  it('should reject empty string', () => {
    expect(isValidLanguage('')).toBe(false)
  })

  it('should reject language codes with wrong casing', () => {
    expect(isValidLanguage('EN')).toBe(false)
    expect(isValidLanguage('De')).toBe(false)
    expect(isValidLanguage('ZH-Hans')).toBe(false)
  })

  it('should reject partial matches', () => {
    expect(isValidLanguage('zh')).toBe(false)
    expect(isValidLanguage('zh-Hant')).toBe(false)
  })
})
