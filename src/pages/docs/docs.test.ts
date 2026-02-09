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

  it('should fetch markdown from /docs/{lang}/{slug}.md', () => {
    expect(docPageTsx).toContain('/docs/${lang}/${slug}.md')
  })

  it('should fall back to English when localized doc is not found', () => {
    expect(docPageTsx).toContain('fallbackLanguage')
    expect(docPageTsx).toContain('/docs/${fallbackLanguage}/${slug}.md')
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
