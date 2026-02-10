import { describe, it, expect, afterEach } from 'vitest'
import { readFileSync, existsSync } from 'fs'
import { resolve } from 'path'
import { supportedLanguages, fallbackLanguage } from '@/i18n/config'
import { languages } from '@/i18n/languages'
import { ogImageAlt, ogLocale } from '@/hooks/useOgImage'
import { docsDir, extractFaqEntries } from '@/utils/docs'
import { detectBrowserLanguage } from '@/i18n/detectLanguage'

const projectRoot = resolve(__dirname, '..')

describe('AR-212: German language completely removed', () => {
  describe('AC-1: No German translated pages exist in the repository', () => {
    it('should not have a German locale file', () => {
      expect(existsSync(resolve(projectRoot, 'src/locales/de.json'))).toBe(false)
    })

    it('should not have a German docs directory', () => {
      expect(existsSync(resolve(projectRoot, 'public/docs/de'))).toBe(false)
    })

    it('should not have German media-kit descriptions', () => {
      expect(existsSync(resolve(projectRoot, 'public/media-kit/descriptions/de'))).toBe(false)
    })

    it('should not have a German OG image', () => {
      expect(existsSync(resolve(projectRoot, 'public/media-kit/social/og-image-de.png'))).toBe(false)
    })
  })

  describe('AC-2: Language switcher displays only English and Chinese options', () => {
    it('supportedLanguages should contain only en and zh', () => {
      expect([...supportedLanguages]).toEqual(['en', 'zh'])
    })

    it('supportedLanguages should not include de', () => {
      expect((supportedLanguages as readonly string[]).includes('de')).toBe(false)
    })

    it('languages array should have exactly 2 entries', () => {
      expect(languages).toHaveLength(2)
    })

    it('languages array should contain English and Chinese only', () => {
      const codes = languages.map(l => l.code)
      expect(codes).toEqual(['en', 'zh'])
    })

    it('languages array should not contain German', () => {
      const codes = languages.map(l => l.code)
      expect(codes).not.toContain('de')
    })
  })

  describe('AC-3: English and Chinese switching works as before', () => {
    it('fallbackLanguage should be en', () => {
      expect(fallbackLanguage).toBe('en')
    })

    it('should have English OG image alt text', () => {
      expect(ogImageAlt.en).toBeDefined()
      expect(ogImageAlt.en.length).toBeGreaterThan(0)
    })

    it('should have Chinese OG image alt text', () => {
      expect(ogImageAlt.zh).toBeDefined()
      expect(ogImageAlt.zh.length).toBeGreaterThan(0)
    })

    it('should not have German OG image alt text', () => {
      expect((ogImageAlt as Record<string, string>)['de']).toBeUndefined()
    })

    it('should have English OG locale', () => {
      expect(ogLocale.en).toBe('en_US')
    })

    it('should have Chinese OG locale', () => {
      expect(ogLocale.zh).toBe('zh_CN')
    })

    it('should not have German OG locale', () => {
      expect((ogLocale as Record<string, string>)['de']).toBeUndefined()
    })

    it('docsDir should map zh to zh-Hans', () => {
      expect(docsDir('zh')).toBe('zh-Hans')
    })

    it('docsDir should pass en through unchanged', () => {
      expect(docsDir('en')).toBe('en')
    })
  })

  describe('German language detection falls back to English', () => {
    const originalNavigator = globalThis.navigator

    function mockNavigatorLanguages(langs: string[]) {
      Object.defineProperty(globalThis, 'navigator', {
        value: { languages: langs, language: langs[0] ?? 'en' },
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

    it('should fall back to en for German browser', () => {
      mockNavigatorLanguages(['de-DE', 'de'])
      expect(detectBrowserLanguage()).toBe('en')
    })

    it('should fall back to en for Austrian German browser', () => {
      mockNavigatorLanguages(['de-AT', 'de'])
      expect(detectBrowserLanguage()).toBe('en')
    })
  })

  describe('sitemap does not contain German URLs', () => {
    it('should not contain any /de/ URLs in sitemap.xml', () => {
      const sitemap = readFileSync(resolve(projectRoot, 'public/sitemap.xml'), 'utf-8')
      expect(sitemap).not.toContain('/de/')
      expect(sitemap).not.toContain('hreflang="de"')
    })
  })

  describe('index.html does not contain German hreflang', () => {
    it('should not have German hreflang link in index.html', () => {
      const indexHtml = readFileSync(resolve(projectRoot, 'index.html'), 'utf-8')
      expect(indexHtml).not.toContain('hreflang="de"')
    })
  })

  describe('FAQ extraction no longer uses German pattern', () => {
    it('should not extract FAQ from German heading "Häufig gestellte Fragen"', () => {
      const md = `## Häufig gestellte Fragen

### Ist es sicher?

Ja, es ist sicher.
`
      const entries = extractFaqEntries(md)
      expect(entries).toHaveLength(0)
    })

    it('should still extract FAQ from English heading', () => {
      const md = `## Frequently Asked Questions

### Is it safe?

Yes, it is safe.
`
      const entries = extractFaqEntries(md)
      expect(entries).toHaveLength(1)
    })

    it('should still extract FAQ from Chinese heading', () => {
      const md = `## 常见问题解答

### 安全吗？

是的，它是安全的。
`
      const entries = extractFaqEntries(md)
      expect(entries).toHaveLength(1)
    })
  })

  describe('home page does not display German language badge', () => {
    it('should not contain German Language component in home page', () => {
      const homeSource = readFileSync(resolve(projectRoot, 'src/pages/home/index.tsx'), 'utf-8')
      expect(homeSource).not.toContain("code={'de'}")
      expect(homeSource).not.toContain("name={'German'}")
    })
  })

  describe('OG image generation script excludes German', () => {
    it('should not contain German config in generate-og-images script', () => {
      const script = readFileSync(resolve(projectRoot, 'scripts/generate-og-images.mjs'), 'utf-8')
      expect(script).not.toContain("lang: 'de'")
      expect(script).not.toContain('og-image-de')
    })
  })
})
