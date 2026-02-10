import { describe, it, expect, afterEach } from 'vitest'
import { readFileSync } from 'fs'
import { resolve } from 'path'
import i18n from './config'

const en = JSON.parse(readFileSync(resolve(__dirname, '../locales/en.json'), 'utf-8'))
const zhHans = JSON.parse(readFileSync(resolve(__dirname, '../locales/zh.json'), 'utf-8'))

function getKeys(obj: Record<string, unknown>, prefix = ''): string[] {
  const keys: string[] = []
  for (const key of Object.keys(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      keys.push(...getKeys(obj[key] as Record<string, unknown>, fullKey))
    } else {
      keys.push(fullKey)
    }
  }
  return keys
}

describe('translation files exist and are valid JSON', () => {
  it('should have en.json with content', () => {
    expect(en).toBeDefined()
    expect(Object.keys(en).length).toBeGreaterThan(0)
  })

  it('should have zh.json with content', () => {
    expect(zhHans).toBeDefined()
    expect(Object.keys(zhHans).length).toBeGreaterThan(0)
  })
})

describe('translation key structure', () => {
  const enKeys = getKeys(en).sort()
  const zhHansKeys = getKeys(zhHans).sort()

  it('should have the same keys in en and zh', () => {
    expect(zhHansKeys).toEqual(enKeys)
  })

  it('should have required top-level sections', () => {
    const requiredSections = ['hero', 'header', 'download', 'languages', 'formats', 'footer']
    for (const section of requiredSections) {
      expect(en).toHaveProperty(section)
      expect(zhHans).toHaveProperty(section)
    }
  })

  it('should have hero keys: title, subtitle, openSource, openSourceTagline, previewFeature, nested, previewTagline', () => {
    const heroKeys = ['title', 'subtitle', 'openSource', 'openSourceTagline', 'previewFeature', 'nested', 'previewTagline']
    for (const key of heroKeys) {
      expect(en.hero).toHaveProperty(key)
    }
  })

  it('should have download keys: versionInfo, downloadZip, appStore', () => {
    const downloadKeys = ['versionInfo', 'downloadZip', 'appStore']
    for (const key of downloadKeys) {
      expect(en.download).toHaveProperty(key)
    }
  })

  it('should have footer keys: createdBy, copyright, imprint, contact, mediaKit', () => {
    const footerKeys = ['createdBy', 'copyright', 'imprint', 'contact', 'mediaKit']
    for (const key of footerKeys) {
      expect(en.footer).toHaveProperty(key)
    }
  })
})

describe('translation values are non-empty strings', () => {
  const locales = { en, zh: zhHans }

  for (const [locale, translations] of Object.entries(locales)) {
    const keys = getKeys(translations)
    for (const key of keys) {
      it(`${locale}: "${key}" should be a non-empty string`, () => {
        const value = key.split('.').reduce((obj: Record<string, unknown>, k) => obj[k] as Record<string, unknown>, translations) as unknown as string
        expect(typeof value).toBe('string')
        expect(value.length).toBeGreaterThan(0)
      })
    }
  }
})

describe('interpolation variables', () => {
  it('should have {{version}}, {{size}}, and {{minVersion}} in download.versionInfo for all locales', () => {
    for (const locale of [en, zhHans]) {
      expect(locale.download.versionInfo).toContain('{{version}}')
      expect(locale.download.versionInfo).toContain('{{size}}')
      expect(locale.download.versionInfo).toContain('{{minVersion}}')
    }
  })

  it('should have {{year}} in footer.copyright for all locales', () => {
    for (const locale of [en, zhHans]) {
      expect(locale.footer.copyright).toContain('{{year}}')
    }
  })
})

describe('preserved terms across translations', () => {
  it('should keep "MacPacker" as the hero title in all languages', () => {
    expect(en.hero.title).toBe('MacPacker')
    expect(zhHans.hero.title).toBe('MacPacker')
  })

  it('should keep "macOS" in subtitle across all languages', () => {
    expect(en.hero.subtitle).toContain('macOS')
    expect(zhHans.hero.subtitle).toContain('macOS')
  })

  it('should include ".zip" in downloadZip value', () => {
    expect(en.download.downloadZip).toContain('.zip')
    expect(zhHans.download.downloadZip).toContain('.zip')
  })

  it('should keep "Mac App Store" untranslated', () => {
    expect(en.download.appStore).toBe('Mac App Store')
    expect(zhHans.download.appStore).toBe('Mac App Store')
  })
})

describe('i18n resources loaded', () => {
  afterEach(async () => {
    await i18n.changeLanguage('en')
  })

  it('should have translation resources for English', () => {
    expect(i18n.hasResourceBundle('en', 'translation')).toBe(true)
  })

  it('should have translation resources for Simplified Chinese', () => {
    expect(i18n.hasResourceBundle('zh', 'translation')).toBe(true)
  })

  it('should resolve English keys via t()', async () => {
    await i18n.changeLanguage('en')
    expect(i18n.t('hero.title')).toBe('MacPacker')
    expect(i18n.t('footer.contact')).toBe('Contact')
  })

  it('should resolve Chinese keys via t()', async () => {
    await i18n.changeLanguage('zh')
    expect(i18n.t('hero.subtitle')).toContain('macOS')
    expect(i18n.t('footer.contact')).toBe('联系方式')
  })

  it('should interpolate variables correctly', async () => {
    await i18n.changeLanguage('en')
    const result = i18n.t('download.versionInfo', { version: '0.13', size: '5', minVersion: '13.5' })
    expect(result).toBe('v0.13 | 5 MB | macOS 13.5 or newer')
  })

  it('should interpolate year in copyright', async () => {
    await i18n.changeLanguage('en')
    const result = i18n.t('footer.copyright', { year: 2025 })
    expect(result).toBe('© 2025 Stephan Arenswald')
  })

  it('should switch language and return Chinese translations', async () => {
    await i18n.changeLanguage('zh')
    const result = i18n.t('download.versionInfo', { version: '0.13', size: '5', minVersion: '13.5' })
    expect(result).toContain('0.13')
    expect(result).toContain('5 MB')
    expect(result).toContain('13.5')
  })
})
