import { describe, it, expect, afterEach } from 'vitest'
import { readFileSync } from 'fs'
import { resolve } from 'path'
import i18n from '../../i18n/config'

const en = JSON.parse(readFileSync(resolve(__dirname, '../../locales/en.json'), 'utf-8'))
const de = JSON.parse(readFileSync(resolve(__dirname, '../../locales/de.json'), 'utf-8'))
const zh = JSON.parse(readFileSync(resolve(__dirname, '../../locales/zh.json'), 'utf-8'))

const homeComponent = readFileSync(resolve(__dirname, './index.tsx'), 'utf-8')
const featureCardComponent = readFileSync(resolve(__dirname, '../../components/FeatureCard.tsx'), 'utf-8')

describe('features section translation keys (AC-5)', () => {
  it('should have features.title key in all languages', () => {
    expect(en.features.title).toBeDefined()
    expect(de.features.title).toBeDefined()
    expect(zh.features.title).toBeDefined()
  })

  it('should have features.nestedPreview keys in all languages', () => {
    for (const locale of [en, de, zh]) {
      expect(locale.features.nestedPreview.title).toBeDefined()
      expect(locale.features.nestedPreview.description).toBeDefined()
    }
  })

  it('should have features.extractSingle keys in all languages', () => {
    for (const locale of [en, de, zh]) {
      expect(locale.features.extractSingle.title).toBeDefined()
      expect(locale.features.extractSingle.description).toBeDefined()
    }
  })

  it('should have features.formats keys in all languages', () => {
    for (const locale of [en, de, zh]) {
      expect(locale.features.formats.title).toBeDefined()
      expect(locale.features.formats.description).toBeDefined()
    }
  })
})

describe('features text scannability (AC-4)', () => {
  it('should have feature descriptions under 15 words each in English', () => {
    const descriptions = [
      en.features.nestedPreview.description,
      en.features.extractSingle.description,
      en.features.formats.description
    ]
    for (const desc of descriptions) {
      const wordCount = desc.split(/\s+/).length
      expect(wordCount).toBeLessThan(15)
    }
  })

  it('should have feature titles under 15 words each in English', () => {
    const titles = [
      en.features.nestedPreview.title,
      en.features.extractSingle.title,
      en.features.formats.title
    ]
    for (const title of titles) {
      const wordCount = title.split(/\s+/).length
      expect(wordCount).toBeLessThan(15)
    }
  })
})

describe('features section layout (AC-1, AC-2)', () => {
  it('should have a 3-column grid for desktop (AC-1)', () => {
    expect(homeComponent).toContain('md:grid-cols-3')
  })

  it('should have a 1-column grid for mobile (AC-2)', () => {
    expect(homeComponent).toContain('grid-cols-1')
  })

  it('should render exactly 3 FeatureCard components', () => {
    const matches = homeComponent.match(/<FeatureCard/g)
    expect(matches).not.toBeNull()
    expect(matches!.length).toBe(3)
  })
})

describe('features section icons (AC-3)', () => {
  it('should import MagnifyingGlassIcon for nested preview', () => {
    expect(homeComponent).toContain('MagnifyingGlassIcon')
  })

  it('should import ArrowDownTrayIcon for extract single files', () => {
    expect(homeComponent).toContain('ArrowDownTrayIcon')
  })

  it('should import SquaresPlusIcon for formats', () => {
    expect(homeComponent).toContain('SquaresPlusIcon')
  })

  it('should import icons from heroicons outline set', () => {
    expect(homeComponent).toMatch(/import.*MagnifyingGlassIcon.*from '@heroicons\/react\/24\/outline'/)
  })
})

describe('features section positioning (AC-6)', () => {
  it('should have features section after main image', () => {
    const mainImageIndex = homeComponent.indexOf("src='/main.png'")
    const featuresIndex = homeComponent.indexOf("aria-labelledby='features-heading'")
    expect(mainImageIndex).toBeGreaterThan(-1)
    expect(featuresIndex).toBeGreaterThan(-1)
    expect(featuresIndex).toBeGreaterThan(mainImageIndex)
  })

  it('should have features section before formats section', () => {
    const featuresIndex = homeComponent.indexOf("aria-labelledby='features-heading'")
    const formatsIndex = homeComponent.indexOf("id='formats'")
    expect(featuresIndex).toBeGreaterThan(-1)
    expect(formatsIndex).toBeGreaterThan(-1)
    expect(featuresIndex).toBeLessThan(formatsIndex)
  })
})

describe('features section uses translation keys', () => {
  it('should use features.title translation key', () => {
    expect(homeComponent).toContain("t('features.title')")
  })

  it('should use features.nestedPreview translation keys', () => {
    expect(homeComponent).toContain("t('features.nestedPreview.title')")
    expect(homeComponent).toContain("t('features.nestedPreview.description')")
  })

  it('should use features.extractSingle translation keys', () => {
    expect(homeComponent).toContain("t('features.extractSingle.title')")
    expect(homeComponent).toContain("t('features.extractSingle.description')")
  })

  it('should use features.formats translation keys', () => {
    expect(homeComponent).toContain("t('features.formats.title')")
    expect(homeComponent).toContain("t('features.formats.description')")
  })
})

describe('FeatureCard component structure', () => {
  it('should export FeatureCard function', () => {
    expect(featureCardComponent).toContain('export { FeatureCard }')
  })

  it('should have an icon prop with className', () => {
    expect(featureCardComponent).toContain("icon: React.ComponentType<{ className?: string }>")
  })

  it('should render h3 for title', () => {
    expect(featureCardComponent).toMatch(/<h3\s/)
  })

  it('should render p for description', () => {
    expect(featureCardComponent).toMatch(/<p\s/)
  })

  it('should use the badge-style ring pattern', () => {
    expect(featureCardComponent).toContain('ring-1 ring-gray-500 ring-inset')
  })

  it('should use teal-700 for icon color', () => {
    expect(featureCardComponent).toContain('text-teal-700')
  })
})

describe('features section accessibility', () => {
  it('should use semantic section element', () => {
    expect(homeComponent).toContain("<section aria-labelledby='features-heading'")
  })

  it('should have h2 with matching id for aria-labelledby', () => {
    expect(homeComponent).toContain("id='features-heading'")
  })
})

describe('i18n resolves feature keys correctly', () => {
  afterEach(async () => {
    await i18n.changeLanguage('en')
  })

  it('should resolve features.title in English', async () => {
    await i18n.changeLanguage('en')
    expect(i18n.t('features.title')).toBe('Key Features')
  })

  it('should resolve features.nestedPreview.title in English', async () => {
    await i18n.changeLanguage('en')
    expect(i18n.t('features.nestedPreview.title')).toBe('Nested Preview')
  })

  it('should resolve features.nestedPreview.description in English', async () => {
    await i18n.changeLanguage('en')
    expect(i18n.t('features.nestedPreview.description')).toBe('See inside archives without extracting')
  })

  it('should resolve feature keys in all languages without returning the key itself', async () => {
    const keys = [
      'features.title',
      'features.nestedPreview.title',
      'features.nestedPreview.description',
      'features.extractSingle.title',
      'features.extractSingle.description',
      'features.formats.title',
      'features.formats.description'
    ]
    for (const lang of ['en', 'de', 'zh']) {
      await i18n.changeLanguage(lang)
      for (const key of keys) {
        const value = i18n.t(key)
        expect(value.length).toBeGreaterThan(0)
        expect(value).not.toBe(key)
      }
    }
  })
})
