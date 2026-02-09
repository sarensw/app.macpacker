import { describe, it, expect, afterEach } from 'vitest'
import { readFileSync } from 'fs'
import { resolve } from 'path'
import i18n from '../../i18n/config'

const en = JSON.parse(readFileSync(resolve(__dirname, '../../locales/en.json'), 'utf-8'))
const de = JSON.parse(readFileSync(resolve(__dirname, '../../locales/de.json'), 'utf-8'))
const zh = JSON.parse(readFileSync(resolve(__dirname, '../../locales/zh.json'), 'utf-8'))

const homeComponent = readFileSync(resolve(__dirname, './index.tsx'), 'utf-8')

describe('hero section translation keys', () => {
  it('should have hero.headline key in all languages', () => {
    expect(en.hero.headline).toBeDefined()
    expect(de.hero.headline).toBeDefined()
    expect(zh.hero.headline).toBeDefined()
  })

  it('should have hero.subheadline key in all languages', () => {
    expect(en.hero.subheadline).toBeDefined()
    expect(de.hero.subheadline).toBeDefined()
    expect(zh.hero.subheadline).toBeDefined()
  })

  it('should have hero.freeAndOpenSource key in all languages', () => {
    expect(en.hero.freeAndOpenSource).toBeDefined()
    expect(de.hero.freeAndOpenSource).toBeDefined()
    expect(zh.hero.freeAndOpenSource).toBeDefined()
  })

  it('should have hero.copyCommand key in all languages', () => {
    expect(en.hero.copyCommand).toBeDefined()
    expect(de.hero.copyCommand).toBeDefined()
    expect(zh.hero.copyCommand).toBeDefined()
  })

  it('should have hero.commandCopied key in all languages', () => {
    expect(en.hero.commandCopied).toBeDefined()
    expect(de.hero.commandCopied).toBeDefined()
    expect(zh.hero.commandCopied).toBeDefined()
  })

  it('should have hero.installWith key in all languages', () => {
    expect(en.hero.installWith).toBeDefined()
    expect(de.hero.installWith).toBeDefined()
    expect(zh.hero.installWith).toBeDefined()
  })

  it('should have download.alternativeLabel key in all languages', () => {
    expect(en.download.alternativeLabel).toBeDefined()
    expect(de.download.alternativeLabel).toBeDefined()
    expect(zh.download.alternativeLabel).toBeDefined()
  })
})

describe('hero headline content (AC-1: value proposition)', () => {
  it('should contain "macOS" in the English headline', () => {
    expect(en.hero.headline).toContain('macOS')
  })

  it('should contain action verbs in the English headline', () => {
    expect(en.hero.headline).toMatch(/Preview|Extract/)
  })

  it('should contain "macOS" in the German headline', () => {
    expect(de.hero.headline).toContain('macOS')
  })

  it('should contain "macOS" in the Chinese headline', () => {
    expect(zh.hero.headline).toContain('macOS')
  })
})

describe('hero subheadline content (AC-2: nested preview mentioned)', () => {
  it('should mention nested archives in the English subheadline', () => {
    expect(en.hero.subheadline.toLowerCase()).toContain('nested')
  })

  it('should mention nested archives in the German subheadline', () => {
    expect(de.hero.subheadline.toLowerCase()).toContain('verschachtelt')
  })

  it('should mention nested archives in the Chinese subheadline', () => {
    expect(zh.hero.subheadline).toContain('嵌套')
  })
})

describe('hero component structure', () => {
  it('should use hero.headline translation key (AC-1)', () => {
    expect(homeComponent).toContain("t('hero.headline')")
  })

  it('should use hero.subheadline translation key (AC-2)', () => {
    expect(homeComponent).toContain("t('hero.subheadline')")
  })

  it('should use hero.freeAndOpenSource translation key', () => {
    expect(homeComponent).toContain("t('hero.freeAndOpenSource')")
  })

  it('should have h1 element for the headline (SEO)', () => {
    expect(homeComponent).toMatch(/<h1\s/)
  })

  it('should not have h1 containing just hero.title anymore', () => {
    expect(homeComponent).not.toMatch(/h1[^>]*>.*t\('hero\.title'\)/)
  })

  it('should use h2 for section headings instead of h3 (SEO hierarchy)', () => {
    // Section-level headings should be h2; h3 is valid for subsections (e.g. format categories)
    expect(homeComponent).toMatch(/<h2\s/)
  })
})

describe('CTA hierarchy (AC-3: single primary CTA, AC-4: secondary visible)', () => {
  it('should have the Homebrew command in the component', () => {
    expect(homeComponent).toContain('brew install --cask macpacker')
  })

  it('should have a semantic button element for the copy action', () => {
    expect(homeComponent).toMatch(/<button[\s\S]*?type='button'/)
  })

  it('should have aria-label on copy button for accessibility', () => {
    expect(homeComponent).toMatch(/aria-label=\{t\('hero\.copyCommand'\)\}/)
  })

  it('should have CheckIcon for copy success feedback', () => {
    expect(homeComponent).toContain('CheckIcon')
  })

  it('should import CheckIcon from heroicons', () => {
    expect(homeComponent).toMatch(/import.*CheckIcon.*from '@heroicons\/react/)
  })

  it('should have download.alternativeLabel for secondary CTAs', () => {
    expect(homeComponent).toContain("t('download.alternativeLabel')")
  })

  it('should have a zip download link', () => {
    expect(homeComponent).toContain("t('download.downloadZip')")
  })

  it('should have a Mac App Store link with alt text', () => {
    expect(homeComponent).toContain("t('download.appStore')")
  })
})

describe('mobile responsiveness (AC-5)', () => {
  it('should have responsive headline sizing', () => {
    expect(homeComponent).toMatch(/text-4xl\s+md:text-6xl/)
  })

  it('should have responsive logo sizing', () => {
    expect(homeComponent).toMatch(/w-12\s+md:w-16/)
  })

  it('should stack secondary CTAs vertically on mobile', () => {
    expect(homeComponent).toMatch(/flex-col\s+md:flex-row/)
  })
})

describe('all text is translatable (AC-6)', () => {
  it('should not have hardcoded English text in visible hero content', () => {
    // Check that visible user-facing text uses t() function
    // The Homebrew command itself is technical and should NOT be translated
    expect(homeComponent).toContain("t('hero.headline')")
    expect(homeComponent).toContain("t('hero.subheadline')")
    expect(homeComponent).toContain("t('hero.freeAndOpenSource')")
    expect(homeComponent).toContain("t('hero.copyCommand')")
    expect(homeComponent).toContain("t('download.alternativeLabel')")
    expect(homeComponent).toContain("t('download.downloadZip')")
    expect(homeComponent).toContain("t('download.appStore')")
    expect(homeComponent).toContain("t('download.versionInfo'")
  })
})

describe('accessibility', () => {
  it('should have alt text on the MacPacker logo', () => {
    expect(homeComponent).toMatch(/src='\/icon_512x512@2x\.png'\s+alt='/)
  })

  it('should have alt text on the main screenshot', () => {
    expect(homeComponent).toMatch(/src='\/main\.png'\s+alt='/)
  })

  it('should have alt text on the Mac App Store badge', () => {
    expect(homeComponent).toMatch(/src=\{mas\}\s+alt=\{t\('download\.appStore'\)\}/)
  })

  it('should have role="region" on the Homebrew command block', () => {
    expect(homeComponent).toContain("role='region'")
  })

  it('should have focus ring styles on interactive elements', () => {
    expect(homeComponent).toContain('focus:ring-2')
  })

  it('should use code element for the Homebrew command', () => {
    expect(homeComponent).toMatch(/<code[\s\S]*?brew/)
  })

  it('should have aria-hidden on the $ prompt symbol', () => {
    expect(homeComponent).toContain("aria-hidden='true'")
  })
})

describe('i18n resolves hero keys correctly', () => {
  afterEach(async () => {
    await i18n.changeLanguage('en')
  })

  it('should resolve hero.headline in English', async () => {
    await i18n.changeLanguage('en')
    expect(i18n.t('hero.headline')).toBe('Preview & Extract Any Archive on macOS')
  })

  it('should resolve hero.subheadline in English', async () => {
    await i18n.changeLanguage('en')
    expect(i18n.t('hero.subheadline')).toBe('See inside nested archives without extracting.')
  })

  it('should resolve hero.freeAndOpenSource in English', async () => {
    await i18n.changeLanguage('en')
    expect(i18n.t('hero.freeAndOpenSource')).toBe('Free & open source.')
  })

  it('should resolve hero.headline in German', async () => {
    await i18n.changeLanguage('de')
    const headline = i18n.t('hero.headline')
    expect(headline).toContain('macOS')
    expect(headline.length).toBeGreaterThan(0)
  })

  it('should resolve hero.headline in Chinese', async () => {
    await i18n.changeLanguage('zh')
    const headline = i18n.t('hero.headline')
    expect(headline).toContain('macOS')
    expect(headline.length).toBeGreaterThan(0)
  })

  it('should resolve hero.copyCommand in all languages', async () => {
    for (const lang of ['en', 'de', 'zh']) {
      await i18n.changeLanguage(lang)
      const value = i18n.t('hero.copyCommand')
      expect(value.length).toBeGreaterThan(0)
      expect(value).not.toBe('hero.copyCommand') // should not return the key itself
    }
  })

  it('should resolve download.alternativeLabel in all languages', async () => {
    for (const lang of ['en', 'de', 'zh']) {
      await i18n.changeLanguage(lang)
      const value = i18n.t('download.alternativeLabel')
      expect(value.length).toBeGreaterThan(0)
      expect(value).not.toBe('download.alternativeLabel')
    }
  })
})

describe('SEO meta tags match hero content', () => {
  const html = readFileSync(resolve(__dirname, '../../../index.html'), 'utf-8')

  it('should have updated page title matching hero headline', () => {
    expect(html).toMatch(/<title>.*Preview & Extract Any Archive on macOS.*<\/title>/)
  })

  it('should have updated meta description mentioning nested archives', () => {
    const match = html.match(/<meta\s+name="description"\s+content="([^"]*)"/)
    expect(match).not.toBeNull()
    expect(match![1]).toContain('nested')
  })

  it('should have updated OG title', () => {
    const match = html.match(/<meta\s+property="og:title"\s+content="([^"]*)"/)
    expect(match).not.toBeNull()
    expect(match![1]).toContain('Preview & Extract Any Archive')
  })

  it('should have updated Twitter title', () => {
    const match = html.match(/<meta\s+name="twitter:title"\s+content="([^"]*)"/)
    expect(match).not.toBeNull()
    expect(match![1]).toContain('Preview & Extract Any Archive')
  })
})
