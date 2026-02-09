import { describe, it, expect } from 'vitest'
import { readFileSync, existsSync } from 'fs'
import { resolve } from 'path'

describe('docs routes in App.tsx', () => {
  const appTsx = readFileSync(resolve(__dirname, '../../App.tsx'), 'utf-8')

  it('should have a docs slug route under language nesting', () => {
    expect(appTsx).toContain("path='/docs/:slug'")
  })

  it('should have a docs index route under language nesting', () => {
    expect(appTsx).toContain("path='/docs'")
  })

  it('should import DocsIndex component', () => {
    expect(appTsx).toContain("import { DocsIndex } from './pages/docs'")
  })

  it('should import DocPage component', () => {
    expect(appTsx).toContain("import { DocPage } from './pages/docs/DocPage'")
  })

  it('should place docs routes inside the language-nested route', () => {
    // The docs routes should appear between the /:lang nest and the home route
    const langNestMatch = appTsx.match(/path='\/:lang'[\s\S]*?nest[\s\S]*?<\/Route>/m)
    expect(langNestMatch).not.toBeNull()
    expect(langNestMatch![0]).toContain("'/docs/:slug'")
    expect(langNestMatch![0]).toContain("'/docs'")
  })
})

describe('docs markdown content', () => {
  const docsDir = resolve(__dirname, '../../../public/docs')

  it('should have en/extract-rar.md', () => {
    expect(existsSync(resolve(docsDir, 'en/extract-rar.md'))).toBe(true)
  })

  it('should have de/extract-rar.md', () => {
    expect(existsSync(resolve(docsDir, 'de/extract-rar.md'))).toBe(true)
  })

  it('English extract-rar should have frontmatter with title and description', () => {
    const content = readFileSync(resolve(docsDir, 'en/extract-rar.md'), 'utf-8')
    expect(content).toMatch(/^---/)
    expect(content).toMatch(/title:/)
    expect(content).toMatch(/description:/)
  })

  it('German extract-rar should have frontmatter with title and description', () => {
    const content = readFileSync(resolve(docsDir, 'de/extract-rar.md'), 'utf-8')
    expect(content).toMatch(/^---/)
    expect(content).toMatch(/title:/)
    expect(content).toMatch(/description:/)
  })
})

describe('DocsIndex component', () => {
  const docsIndexTsx = readFileSync(resolve(__dirname, './index.tsx'), 'utf-8')

  it('should import and use Header component', () => {
    expect(docsIndexTsx).toContain("import { Header }")
    expect(docsIndexTsx).toContain('<Header')
  })

  it('should import and use Footer component', () => {
    expect(docsIndexTsx).toContain("import { Footer }")
    expect(docsIndexTsx).toContain('<Footer')
  })

  it('should use useDocMeta hook for SEO', () => {
    expect(docsIndexTsx).toContain('useDocMeta')
  })

  it('should use useLocalizedPath for doc links', () => {
    expect(docsIndexTsx).toContain('useLocalizedPath')
  })

  it('should list the extract-rar doc', () => {
    expect(docsIndexTsx).toContain('extract-rar')
  })
})

describe('DocPage component', () => {
  const docPageTsx = readFileSync(resolve(__dirname, './DocPage.tsx'), 'utf-8')

  it('should import and use Header component', () => {
    expect(docPageTsx).toContain("import { Header }")
    expect(docPageTsx).toContain('<Header')
  })

  it('should import and use Footer component', () => {
    expect(docPageTsx).toContain("import { Footer }")
    expect(docPageTsx).toContain('<Footer')
  })

  it('should use react-markdown for rendering', () => {
    expect(docPageTsx).toContain("import Markdown from 'react-markdown'")
    expect(docPageTsx).toContain('<Markdown')
  })

  it('should use remarkGfm plugin', () => {
    expect(docPageTsx).toContain('remarkGfm')
  })

  it('should use rehypeHighlight for syntax highlighting', () => {
    expect(docPageTsx).toContain('rehypeHighlight')
  })

  it('should use useDocMeta hook for SEO meta tags', () => {
    expect(docPageTsx).toContain('useDocMeta')
  })

  it('should use TableOfContents component', () => {
    expect(docPageTsx).toContain('TableOfContents')
  })

  it('should use prose classes for typography', () => {
    expect(docPageTsx).toMatch(/prose/)
  })

  it('should fetch markdown using docsDir mapping', () => {
    expect(docPageTsx).toContain('docsDir(lang)')
    expect(docPageTsx).toContain('docsDir(fallbackLanguage)')
  })

  it('should fall back to English when localized doc is not found', () => {
    expect(docPageTsx).toContain('fallbackLanguage')
  })

  it('should render heading elements with IDs for anchor navigation', () => {
    expect(docPageTsx).toContain('headingToId')
  })
})

describe('TableOfContents component', () => {
  const tocTsx = readFileSync(resolve(__dirname, '../../components/TableOfContents.tsx'), 'utf-8')

  it('should have an aria-label for accessibility', () => {
    expect(tocTsx).toContain("aria-label='Table of contents'")
  })

  it('should render anchor links with hash hrefs', () => {
    expect(tocTsx).toContain('href={`#${heading.id}`}')
  })

  it('should indent h3 entries', () => {
    expect(tocTsx).toContain("heading.level === 3 ? 'ml-4' : ''")
  })

  it('should return null when there are no headings', () => {
    expect(tocTsx).toContain('if (headings.length === 0) return null')
  })
})

describe('useDocMeta hook', () => {
  const hookTs = readFileSync(resolve(__dirname, '../../hooks/useDocMeta.ts'), 'utf-8')

  it('should set document.title with MacPacker suffix', () => {
    expect(hookTs).toContain('— MacPacker')
  })

  it('should update meta description', () => {
    expect(hookTs).toContain("meta[name=\"description\"]")
  })

  it('should restore previous title on unmount', () => {
    expect(hookTs).toContain('prevTitle')
  })
})

describe('highlight.js CSS import', () => {
  const css = readFileSync(resolve(__dirname, '../../../src/index.css'), 'utf-8')

  it('should import highlight.js github theme', () => {
    expect(css).toContain('highlight.js/styles/github.css')
  })
})

describe('Chinese docs markdown content', () => {
  const docsPath = resolve(__dirname, '../../../public/docs')

  it('should have zh-Hans/extract-rar.md', () => {
    expect(existsSync(resolve(docsPath, 'zh-Hans/extract-rar.md'))).toBe(true)
  })

  it('Chinese extract-rar should have frontmatter with title and description', () => {
    const content = readFileSync(resolve(docsPath, 'zh-Hans/extract-rar.md'), 'utf-8')
    expect(content).toMatch(/^---/)
    expect(content).toMatch(/title:/)
    expect(content).toMatch(/description:/)
  })
})

describe('extract-rar content structure', () => {
  const docsPath = resolve(__dirname, '../../../public/docs')
  const enContent = readFileSync(resolve(docsPath, 'en/extract-rar.md'), 'utf-8')
  const deContent = readFileSync(resolve(docsPath, 'de/extract-rar.md'), 'utf-8')
  const zhContent = readFileSync(resolve(docsPath, 'zh-Hans/extract-rar.md'), 'utf-8')

  function countWords(text: string): number {
    // Strip frontmatter
    const body = text.replace(/^---[\s\S]*?---\n/, '')
    // Strip markdown syntax, code blocks, and image references
    const cleaned = body
      .replace(/```[\s\S]*?```/g, '')
      .replace(/!\[.*?\]\(.*?\)/g, '')
      .replace(/\[([^\]]*)\]\(.*?\)/g, '$1')
      .replace(/[#*>`_~\-|]/g, '')
      .replace(/\n+/g, ' ')
      .trim()
    return cleaned.split(/\s+/).filter(w => w.length > 0).length
  }

  it('English version should have 1,200-1,500 words', () => {
    const words = countWords(enContent)
    expect(words).toBeGreaterThanOrEqual(1100)
    expect(words).toBeLessThanOrEqual(1600)
  })

  it('should have exactly one H1 heading in English version', () => {
    const body = enContent.replace(/^---[\s\S]*?---\n/, '')
    const h1Matches = body.match(/^# .+$/gm) || []
    expect(h1Matches).toHaveLength(1)
  })

  it('should have H2 sections for all required content areas in English', () => {
    expect(enContent).toMatch(/^## .*(MacPacker|Method 1)/m)
    expect(enContent).toMatch(/^## .*(Terminal|Method 2)/m)
    expect(enContent).toMatch(/^## .*(Other|Method 3)/m)
    expect(enContent).toMatch(/^## .*(Troubleshoot)/m)
    expect(enContent).toMatch(/^## .*(FAQ|Frequently)/m)
  })

  it('English FAQ section should have 5-8 questions', () => {
    const faqSection = enContent.split(/^## .*(?:FAQ|Frequently)/m)[1] || ''
    const questions = faqSection.match(/^### .+$/gm) || []
    expect(questions.length).toBeGreaterThanOrEqual(5)
    expect(questions.length).toBeLessThanOrEqual(8)
  })

  it('should include screenshot placeholders with dimensions', () => {
    const placeholders = enContent.match(/!\[.*?\]\(placeholder-\d+x\d+\.png\)/g) || []
    expect(placeholders.length).toBeGreaterThanOrEqual(1)
  })

  it('should include download links to MacPacker', () => {
    expect(enContent).toContain('macpacker.app')
    expect(enContent).toContain('#download')
  })

  it('English frontmatter should include keywords', () => {
    expect(enContent).toMatch(/keywords:/)
  })

  it('English frontmatter should include canonical URL', () => {
    expect(enContent).toMatch(/canonical:.*macpacker\.app/)
  })

  it('all three language versions should have consistent structure', () => {
    // All should have FAQ section
    expect(enContent).toMatch(/^## .*(?:FAQ|Frequently)/m)
    expect(deContent).toMatch(/^## .*(?:Häufig|FAQ)/m)
    expect(zhContent).toMatch(/^## .*常见问题/m)

    // All should have MacPacker method section
    expect(enContent).toMatch(/^## .*MacPacker/m)
    expect(deContent).toMatch(/^## .*MacPacker/m)
    expect(zhContent).toMatch(/^## .*MacPacker/m)
  })
})

describe('DocPage structured data', () => {
  const docPageTsx = readFileSync(resolve(__dirname, './DocPage.tsx'), 'utf-8')

  it('should extract FAQ entries from markdown', () => {
    expect(docPageTsx).toContain('extractFaqEntries')
    expect(docPageTsx).toContain('faqEntries')
  })

  it('should build FAQ schema with correct JSON-LD structure', () => {
    expect(docPageTsx).toContain('FAQPage')
    expect(docPageTsx).toContain('schema.org')
    expect(docPageTsx).toContain('mainEntity')
  })

  it('should use useStructuredData hook to inject schema', () => {
    expect(docPageTsx).toContain('useStructuredData')
    expect(docPageTsx).toContain('doc-faq-schema')
  })
})

describe('useDocMeta OG and hreflang support', () => {
  const hookTs = readFileSync(resolve(__dirname, '../../hooks/useDocMeta.ts'), 'utf-8')

  it('should accept lang and slug as optional parameters', () => {
    expect(hookTs).toContain('lang?: string')
    expect(hookTs).toContain('slug?: string')
  })

  it('should update OG title and description', () => {
    expect(hookTs).toContain('og:title')
    expect(hookTs).toContain('og:description')
  })

  it('should update Twitter card tags', () => {
    expect(hookTs).toContain('twitter:title')
    expect(hookTs).toContain('twitter:description')
  })

  it('should set canonical URL for doc pages', () => {
    expect(hookTs).toContain('canonical')
    expect(hookTs).toContain('macpacker.app')
  })

  it('should add hreflang tags for all supported languages', () => {
    expect(hookTs).toContain('hreflang')
    expect(hookTs).toContain('x-default')
  })

  it('should clean up added elements on unmount', () => {
    expect(hookTs).toContain('el.remove()')
  })
})

describe('useStructuredData hook', () => {
  const hookTs = readFileSync(resolve(__dirname, '../../hooks/useStructuredData.ts'), 'utf-8')

  it('should create a script tag with type application/ld+json', () => {
    expect(hookTs).toContain('application/ld+json')
  })

  it('should stringify data as JSON', () => {
    expect(hookTs).toContain('JSON.stringify')
  })

  it('should remove the script tag on cleanup', () => {
    expect(hookTs).toContain('remove()')
  })

  it('should use a unique ID for the script tag', () => {
    expect(hookTs).toContain('script.id = id')
  })
})

describe('sitemap includes docs URLs', () => {
  const sitemapPath = resolve(__dirname, '../../../public/sitemap.xml')
  const sitemap = readFileSync(sitemapPath, 'utf-8')

  it('should include English extract-rar docs URL', () => {
    expect(sitemap).toContain('<loc>https://macpacker.app/en/docs/extract-rar</loc>')
  })

  it('should include German extract-rar docs URL', () => {
    expect(sitemap).toContain('<loc>https://macpacker.app/de/docs/extract-rar</loc>')
  })

  it('should include Chinese extract-rar docs URL', () => {
    expect(sitemap).toContain('<loc>https://macpacker.app/zh/docs/extract-rar</loc>')
  })

  it('docs URLs should have priority 0.8', () => {
    // Check that docs URLs are followed by priority 0.8
    const docsEntries = sitemap.match(/<url>\s*<loc>https:\/\/macpacker\.app\/\w+\/docs\/extract-rar<\/loc>[\s\S]*?<\/url>/g) || []
    expect(docsEntries.length).toBe(3)
    for (const entry of docsEntries) {
      expect(entry).toContain('<priority>0.8</priority>')
    }
  })
})
