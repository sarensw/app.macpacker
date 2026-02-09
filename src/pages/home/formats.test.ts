import { describe, it, expect, afterEach } from 'vitest'
import { readFileSync } from 'fs'
import { resolve } from 'path'
import i18n from '../../i18n/config'

const en = JSON.parse(readFileSync(resolve(__dirname, '../../locales/en.json'), 'utf-8'))
const de = JSON.parse(readFileSync(resolve(__dirname, '../../locales/de.json'), 'utf-8'))
const zh = JSON.parse(readFileSync(resolve(__dirname, '../../locales/zh.json'), 'utf-8'))

const homeComponent = readFileSync(resolve(__dirname, './index.tsx'), 'utf-8')

describe('formats section translation keys (AC-6)', () => {
  it('should have formats.categories keys in all languages', () => {
    for (const locale of [en, de, zh]) {
      expect(locale.formats.categories.compression).toBeDefined()
      expect(locale.formats.categories.diskImages).toBeDefined()
      expect(locale.formats.categories.archives).toBeDefined()
      expect(locale.formats.categories.other).toBeDefined()
    }
  })

  it('should have formats.showMore key in all languages', () => {
    for (const locale of [en, de, zh]) {
      expect(locale.formats.showMore).toBeDefined()
    }
  })

  it('should have formats.showMoreAriaLabel key in all languages', () => {
    for (const locale of [en, de, zh]) {
      expect(locale.formats.showMoreAriaLabel).toBeDefined()
    }
  })

  it('should have formats.comparisonLink key in all languages', () => {
    for (const locale of [en, de, zh]) {
      expect(locale.formats.comparisonLink).toBeDefined()
    }
  })

  it('should have showMore with interpolation placeholder', () => {
    expect(en.formats.showMore).toContain('{{count}}')
    expect(de.formats.showMore).toContain('{{count}}')
    expect(zh.formats.showMore).toContain('{{count}}')
  })
})

describe('formats section categories (AC-1)', () => {
  it('should define formatCategories with four categories', () => {
    expect(homeComponent).toContain("labelKey: 'formats.categories.compression'")
    expect(homeComponent).toContain("labelKey: 'formats.categories.diskImages'")
    expect(homeComponent).toContain("labelKey: 'formats.categories.archives'")
    expect(homeComponent).toContain("labelKey: 'formats.categories.other'")
  })

  it('should use h3 elements for category headings', () => {
    expect(homeComponent).toMatch(/<h3\s.*className='text-sm font-medium text-gray-700 mb-3'/)
  })

  it('should render category labels using translation function', () => {
    expect(homeComponent).toContain('{t(category.labelKey)}')
  })
})

describe('formats section initial view (AC-2)', () => {
  it('should show approximately 15 initial formats', () => {
    // Extract initial arrays from source
    const initialMatches = homeComponent.match(/initial:\s*\[([^\]]*)\]/g)
    expect(initialMatches).not.toBeNull()

    let totalInitial = 0
    for (const match of initialMatches!) {
      const items = match.match(/'[^']+'/g)
      if (items) totalInitial += items.length
    }
    // Should be approximately 15 (the design specifies ~15)
    expect(totalInitial).toBeGreaterThanOrEqual(13)
    expect(totalInitial).toBeLessThanOrEqual(17)
  })

  it('should include common formats in initial view', () => {
    // Check that the most popular formats are in initial arrays
    expect(homeComponent).toMatch(/initial:\s*\[.*'zip'/)
    expect(homeComponent).toMatch(/initial:\s*\[.*'rar'/)
    expect(homeComponent).toMatch(/initial:\s*\[.*'dmg'/)
    expect(homeComponent).toMatch(/initial:\s*\[.*'iso'/)
    expect(homeComponent).toMatch(/initial:\s*\[.*'tar'/)
  })
})

describe('formats section expansion mechanism (AC-3)', () => {
  it('should use showAllFormats state', () => {
    expect(homeComponent).toContain('showAllFormats')
    expect(homeComponent).toContain('setShowAllFormats')
  })

  it('should have a show more button with proper ARIA attributes', () => {
    expect(homeComponent).toContain("aria-expanded={false}")
    expect(homeComponent).toContain("aria-label={t('formats.showMoreAriaLabel')}")
  })

  it('should render show more button conditionally', () => {
    expect(homeComponent).toContain('{!showAllFormats && (')
  })

  it('should call setShowAllFormats(true) on button click', () => {
    expect(homeComponent).toContain('onClick={() => setShowAllFormats(true)}')
  })

  it('should show expanded formats conditionally', () => {
    expect(homeComponent).toContain('showAllFormats && category.expanded.map')
  })

  it('should have expanded formats in data structure', () => {
    const expandedMatches = homeComponent.match(/expanded:\s*\[([^\]]*)\]/g)
    expect(expandedMatches).not.toBeNull()

    let totalExpanded = 0
    for (const match of expandedMatches!) {
      const items = match.match(/'[^']+'/g)
      if (items) totalExpanded += items.length
    }
    expect(totalExpanded).toBeGreaterThanOrEqual(10)
  })

  it('should calculate totalHiddenFormats from expanded arrays', () => {
    expect(homeComponent).toContain('totalHiddenFormats')
    expect(homeComponent).toContain("t('formats.showMore', { count: totalHiddenFormats })")
  })
})

describe('formats section reduced visual noise (AC-4)', () => {
  it('should use gap-2 instead of space-x-2 space-y-2 for format badges', () => {
    // The categorized layout uses gap-2 for better flexbox wrap spacing
    expect(homeComponent).toContain("className='font-mono flex flex-row flex-wrap gap-2 text-sm'")
  })

  it('should use space-y-6 for category spacing', () => {
    expect(homeComponent).toContain('space-y-6')
  })

  it('should hide categories with no initial formats when collapsed', () => {
    expect(homeComponent).toContain("if (category.initial.length === 0 && !showAllFormats) return null")
  })
})

describe('format comparison link (AC-5)', () => {
  it('should have a link to /docs/format-comparison', () => {
    expect(homeComponent).toContain("localizedPath('/docs/format-comparison')")
  })

  it('should use translation for link text', () => {
    expect(homeComponent).toContain("t('formats.comparisonLink')")
  })

  it('should have proper styling and accessibility', () => {
    expect(homeComponent).toContain('text-sm text-gray-600 hover:text-gray-900')
    expect(homeComponent).toContain('focus:outline-none focus:ring-2 focus:ring-teal-500')
  })

  it('should include arrow indicator', () => {
    expect(homeComponent).toContain("aria-hidden='true'")
    expect(homeComponent).toContain('&rarr;')
  })
})

describe('formats section accessibility', () => {
  it('should use button element for expansion (keyboard accessible)', () => {
    expect(homeComponent).toMatch(/<button[\s\S]*?type='button'[\s\S]*?onClick=\{.*setShowAllFormats/)
  })

  it('should have focus ring styles on expansion button', () => {
    expect(homeComponent).toContain('focus:ring-2 focus:ring-teal-500 focus:ring-offset-2')
  })

  it('should keep the "Please add..." CTA visible', () => {
    expect(homeComponent).toContain("t('formats.requestFormat')")
  })
})

describe('formats section uses ArchiveFormat component', () => {
  it('should render ArchiveFormat components for formats', () => {
    expect(homeComponent).toContain('<ArchiveFormat key={format} name={format} />')
  })
})

describe('i18n resolves format category keys correctly', () => {
  afterEach(async () => {
    await i18n.changeLanguage('en')
  })

  it('should resolve category keys in English', async () => {
    await i18n.changeLanguage('en')
    expect(i18n.t('formats.categories.compression')).toBe('Compression')
    expect(i18n.t('formats.categories.diskImages')).toBe('Disk Images')
    expect(i18n.t('formats.categories.archives')).toBe('Archives')
    expect(i18n.t('formats.categories.other')).toBe('Other')
  })

  it('should resolve showMore with interpolation', async () => {
    await i18n.changeLanguage('en')
    expect(i18n.t('formats.showMore', { count: 14 })).toBe('Show 14 more formats')
  })

  it('should resolve comparisonLink in English', async () => {
    await i18n.changeLanguage('en')
    expect(i18n.t('formats.comparisonLink')).toBe('Learn about format comparison')
  })

  it('should resolve format keys in all languages without returning the key itself', async () => {
    const keys = [
      'formats.categories.compression',
      'formats.categories.diskImages',
      'formats.categories.archives',
      'formats.categories.other',
      'formats.showMore',
      'formats.showMoreAriaLabel',
      'formats.comparisonLink'
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
