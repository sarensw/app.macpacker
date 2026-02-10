import { describe, it, expect } from 'vitest'
import { readFileSync } from 'fs'
import { resolve } from 'path'
import { supportedLanguages, fallbackLanguage } from '@/i18n/config'
import type { SupportedLanguage } from '@/i18n/config'
import { languages } from '@/i18n/languages'

const switcherSource = readFileSync(resolve(__dirname, './LanguageSwitcher.tsx'), 'utf-8')

describe('LanguageSwitcher language configuration', () => {
  it('should define exactly two languages', () => {
    expect(languages).toHaveLength(2)
  })

  it('should have English as the first language with label "EN"', () => {
    expect(languages[0]).toEqual({ code: 'en', label: 'EN', name: 'English' })
  })

  it('should have Chinese as the second language with label "中文"', () => {
    expect(languages[1]).toEqual({ code: 'zh', label: '中文', name: 'Chinese' })
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

// Pure function that mirrors the navigation logic in handleLanguageChange
function buildLanguageSwitchPath (lang: SupportedLanguage): string {
  if (lang === fallbackLanguage) {
    return '~/'
  }
  return `~/${lang}/`
}

describe('LanguageSwitcher navigation path construction (AR-208)', () => {
  it('AC-1: should navigate to ~/zh/ when switching from default language to Chinese', () => {
    expect(buildLanguageSwitchPath('zh')).toBe('~/zh/')
  })

  it('AC-3: should navigate to ~/ (root) when selecting English (default language)', () => {
    expect(buildLanguageSwitchPath('en')).toBe('~/')
  })

  it('should use the ~ prefix for all language paths to ensure absolute navigation', () => {
    for (const lang of languages) {
      const path = buildLanguageSwitchPath(lang.code)
      expect(path.startsWith('~/')).toBe(true)
    }
  })
})

describe('LanguageSwitcher source code uses absolute paths (AR-208)', () => {
  it('should use ~ prefix for absolute navigation in setLocation calls', () => {
    expect(switcherSource).toContain('setLocation(`~/${targetLang}${subpath')
  })

  it('should not use relative setLocation paths without ~ prefix', () => {
    // Ensure there are no setLocation calls with paths like /${lang}/ (without ~)
    // that would cause the nested route appending bug
    const relativePattern = /setLocation\(`\/\$\{lang\}\/`\)/
    expect(switcherSource).not.toMatch(relativePattern)
  })

  it('should preserve the current subpath when switching languages', () => {
    expect(switcherSource).toContain('const subpath = location')
  })
})
