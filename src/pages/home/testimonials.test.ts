import { describe, it, expect, afterEach } from 'vitest'
import { readFileSync } from 'fs'
import { resolve } from 'path'
import i18n from '../../i18n/config'

const en = JSON.parse(readFileSync(resolve(__dirname, '../../locales/en.json'), 'utf-8'))
const de = JSON.parse(readFileSync(resolve(__dirname, '../../locales/de.json'), 'utf-8'))
const zh = JSON.parse(readFileSync(resolve(__dirname, '../../locales/zh.json'), 'utf-8'))

const homeComponent = readFileSync(resolve(__dirname, './index.tsx'), 'utf-8')
const whatOthersSayComponent = readFileSync(resolve(__dirname, '../../components/WhatOthersSay.tsx'), 'utf-8')

describe('testimonials section is enabled (AC-1)', () => {
  it('should not have the testimonials section commented out', () => {
    expect(homeComponent).not.toMatch(/\/\*[\s\S]*WhatOthersSay[\s\S]*\*\//)
  })

  it('should import WhatOthersSay component', () => {
    expect(homeComponent).toContain("import { WhatOthersSay } from '@/components/WhatOthersSay'")
  })

  it('should render at least 2 WhatOthersSay components', () => {
    const matches = homeComponent.match(/<WhatOthersSay/g)
    expect(matches).not.toBeNull()
    expect(matches!.length).toBeGreaterThanOrEqual(2)
  })

  it('should render exactly 3 WhatOthersSay components', () => {
    const matches = homeComponent.match(/<WhatOthersSay/g)
    expect(matches).not.toBeNull()
    expect(matches!.length).toBe(3)
  })
})

describe('GitHub stars displayed (AC-2)', () => {
  it('should link to the GitHub repository', () => {
    expect(homeComponent).toContain("href='https://github.com/sarensw/MacPacker'")
  })

  it('should display GitHub stars count using translation key', () => {
    expect(homeComponent).toContain("t('testimonials.githubStars'")
  })

  it('should pass star count to the translation', () => {
    expect(homeComponent).toMatch(/testimonials\.githubStars.*count:\s*369/)
  })
})

describe('testimonials are real with proper attribution (AC-3)', () => {
  it('should include testimonial from hi362846', () => {
    expect(homeComponent).toContain("name='hi362846'")
  })

  it('should include testimonial from Sevikha', () => {
    expect(homeComponent).toContain("name='Sevikha'")
  })

  it('should include testimonial from Jae_gone', () => {
    expect(homeComponent).toContain("name='Jae_gone'")
  })

  it('should attribute all testimonials to App Store', () => {
    const appStoreMatches = homeComponent.match(/source='App Store'/g)
    expect(appStoreMatches).not.toBeNull()
    expect(appStoreMatches!.length).toBe(3)
  })

  it('should include specific review content about Quick Look', () => {
    expect(homeComponent).toContain('Quick Look integration')
  })

  it('should include specific review content about open source', () => {
    expect(homeComponent).toContain('open source implementation')
  })
})

describe('section is visually balanced (AC-4)', () => {
  it('should use a 3-column grid for desktop', () => {
    expect(homeComponent).toContain('md:grid-cols-3')
  })

  it('should use a 1-column grid for mobile', () => {
    // The testimonials grid should have grid-cols-1
    const testimonialsSection = homeComponent.slice(
      homeComponent.indexOf("aria-labelledby='testimonials-heading'")
    )
    expect(testimonialsSection).toContain('grid-cols-1')
  })

  it('should use semantic section element with aria-labelledby', () => {
    expect(homeComponent).toContain("aria-labelledby='testimonials-heading'")
  })

  it('should have h2 with matching id for testimonials heading', () => {
    expect(homeComponent).toContain("id='testimonials-heading'")
  })
})

describe('not overly promotional (AC-5)', () => {
  it('should include honest feedback (not all glowing)', () => {
    expect(homeComponent).toContain('Not perfect')
  })

  it('should not use marketing superlatives', () => {
    const testimonialsSection = homeComponent.slice(
      homeComponent.indexOf("aria-labelledby='testimonials-heading'")
    )
    expect(testimonialsSection).not.toMatch(/amazing|incredible|revolutionary|game-changing/i)
  })
})

describe('WhatOthersSay component structure', () => {
  it('should export WhatOthersSay function', () => {
    expect(whatOthersSayComponent).toContain('export { WhatOthersSay }')
  })

  it('should export WhatOthersSayProperties type', () => {
    expect(whatOthersSayComponent).toContain('export type { WhatOthersSayProperties }')
  })

  it('should use the ring pattern consistent with other components', () => {
    expect(whatOthersSayComponent).toContain('ring-1 ring-gray-500 ring-inset')
  })

  it('should have source, title, text, and name props', () => {
    expect(whatOthersSayComponent).toContain('source: string')
    expect(whatOthersSayComponent).toContain('title: string')
    expect(whatOthersSayComponent).toContain('text: string')
    expect(whatOthersSayComponent).toContain('name: string')
  })
})

describe('testimonials section translation keys', () => {
  it('should have testimonials.title key in all languages', () => {
    expect(en.testimonials.title).toBeDefined()
    expect(de.testimonials.title).toBeDefined()
    expect(zh.testimonials.title).toBeDefined()
  })

  it('should have testimonials.githubStars key in all languages', () => {
    expect(en.testimonials.githubStars).toBeDefined()
    expect(de.testimonials.githubStars).toBeDefined()
    expect(zh.testimonials.githubStars).toBeDefined()
  })

  it('should use testimonials.title translation key in component', () => {
    expect(homeComponent).toContain("t('testimonials.title')")
  })

  it('should use testimonials.githubStars translation key in component', () => {
    expect(homeComponent).toContain("t('testimonials.githubStars'")
  })
})

describe('i18n resolves testimonial keys correctly', () => {
  afterEach(async () => {
    await i18n.changeLanguage('en')
  })

  it('should resolve testimonials.title in English', async () => {
    await i18n.changeLanguage('en')
    expect(i18n.t('testimonials.title')).toBe('What others say')
  })

  it('should resolve testimonials.githubStars in English', async () => {
    await i18n.changeLanguage('en')
    expect(i18n.t('testimonials.githubStars', { count: 369 })).toBe('369 GitHub Stars')
  })

  it('should resolve testimonial keys in all languages without returning the key itself', async () => {
    const keys = ['testimonials.title', 'testimonials.githubStars']
    for (const lang of ['en', 'de', 'zh']) {
      await i18n.changeLanguage(lang)
      for (const key of keys) {
        const value = i18n.t(key, { count: 369 })
        expect(value.length).toBeGreaterThan(0)
        expect(value).not.toBe(key)
      }
    }
  })
})

describe('testimonials section positioning', () => {
  it('should have testimonials section after write-to section', () => {
    const writeToIndex = homeComponent.indexOf("t('formats.writeTitle')")
    const testimonialsIndex = homeComponent.indexOf("aria-labelledby='testimonials-heading'")
    expect(writeToIndex).toBeGreaterThan(-1)
    expect(testimonialsIndex).toBeGreaterThan(-1)
    expect(testimonialsIndex).toBeGreaterThan(writeToIndex)
  })

  it('should have testimonials section before Footer', () => {
    const testimonialsIndex = homeComponent.indexOf("aria-labelledby='testimonials-heading'")
    const footerIndex = homeComponent.indexOf('<Footer')
    expect(testimonialsIndex).toBeGreaterThan(-1)
    expect(footerIndex).toBeGreaterThan(-1)
    expect(testimonialsIndex).toBeLessThan(footerIndex)
  })
})
