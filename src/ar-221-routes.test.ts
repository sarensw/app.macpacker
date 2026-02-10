import { describe, it, expect } from 'vitest'
import { readFileSync } from 'fs'
import { resolve } from 'path'

const appTsx = readFileSync(resolve(__dirname, './App.tsx'), 'utf-8')
const blogCardComponent = readFileSync(resolve(__dirname, './components/BlogCard.tsx'), 'utf-8')
const blogDetailComponent = readFileSync(resolve(__dirname, './pages/blog/BlogDetail.tsx'), 'utf-8')
const useLocalizedPathHook = readFileSync(resolve(__dirname, './hooks/useLocalizedPath.ts'), 'utf-8')

// Mirrors BlogCard href logic from BlogCard.tsx
function buildBlogCardHref(lang: string, slug: string, fallbackLanguage: string): string {
  return lang === fallbackLanguage ? `~/blog/${slug}` : `~/${lang}/blog/${slug}`
}

// Mirrors useLocalizedPath logic from useLocalizedPath.ts
function buildLocalizedPath(lang: string, fallbackLanguage: string, path: string): string {
  const cleanPath = path.startsWith('/') ? path : `/${path}`
  if (lang === fallbackLanguage) {
    return `~${cleanPath}`
  }
  return `~/${lang}${cleanPath}`
}

describe('AR-221 AC-1: Correct Route Structure', () => {
  describe('English routes', () => {
    it('should have / route (root/home page)', () => {
      // The root route uses LanguageRedirect which renders Home for English
      expect(appTsx).toContain("path='/' component={LanguageRedirect}")
    })

    it('should have /blog route (blog index)', () => {
      // English blog route at root level (outside /zh nest)
      expect(appTsx).toContain("path='/blog' component={BlogIndex}")
    })

    it('should have /blog/:slug route (blog detail)', () => {
      // English blog detail route at root level
      expect(appTsx).toContain("path='/blog/:slug' component={BlogDetail}")
    })

    it('should have /imprint route', () => {
      expect(appTsx).toContain("path='/imprint' component={Imprint}")
    })
  })

  describe('Chinese routes', () => {
    it('should have /zh nested route for Chinese language', () => {
      expect(appTsx).toContain("path='/zh' nest")
    })

    it('should have /zh (root/home page in Chinese) via nested / route', () => {
      // Inside the /zh nest, the / route maps to /zh
      const zhNestBlock = appTsx.match(/path='\/zh'.*nest[\s\S]*?<\/Route>\s*\n/m)?.[0]
      expect(zhNestBlock).toBeTruthy()
      expect(zhNestBlock).toContain("path='/' component={Home}")
    })

    it('should have /zh/blog (blog index in Chinese) via nested /blog route', () => {
      const zhNestBlock = appTsx.match(/path='\/zh'.*nest[\s\S]*?<\/Route>\s*\n/m)?.[0]
      expect(zhNestBlock).toBeTruthy()
      expect(zhNestBlock).toContain("path='/blog' component={BlogIndex}")
    })

    it('should have /zh/blog/:slug (blog detail in Chinese) via nested /blog/:slug route', () => {
      const zhNestBlock = appTsx.match(/path='\/zh'.*nest[\s\S]*?<\/Route>\s*\n/m)?.[0]
      expect(zhNestBlock).toBeTruthy()
      expect(zhNestBlock).toContain("path='/blog/:slug' component={BlogDetail}")
    })

    it('should have /zh/imprint via nested /imprint route', () => {
      const zhNestBlock = appTsx.match(/path='\/zh'.*nest[\s\S]*?<\/Route>\s*\n/m)?.[0]
      expect(zhNestBlock).toBeTruthy()
      expect(zhNestBlock).toContain("path='/imprint' component={Imprint}")
    })

    it('should wrap Chinese routes in LanguageRoute with lang=zh', () => {
      expect(appTsx).toContain("<LanguageRoute lang='zh'>")
    })
  })
})

describe('AR-221 AC-1: BlogCard link generation (bug fix)', () => {
  it('should use ~ prefix for English blog card href to navigate absolutely', () => {
    expect(blogCardComponent).toContain('`~/blog/${slug}`')
  })

  it('should use ~ prefix for non-English blog card href to navigate absolutely', () => {
    expect(blogCardComponent).toContain('`~/${lang}/blog/${slug}`')
  })

  it('should produce correct English blog post path', () => {
    expect(buildBlogCardHref('en', 'hello-world', 'en')).toBe('~/blog/hello-world')
  })

  it('should produce correct Chinese blog post path without double /zh', () => {
    const href = buildBlogCardHref('zh', 'hello-world', 'en')
    expect(href).toBe('~/zh/blog/hello-world')
  })

  it('should never produce double language prefix in Chinese blog card links', () => {
    const href = buildBlogCardHref('zh', 'hello-world', 'en')
    expect(href).not.toContain('/zh/zh/')
  })
})

describe('AR-221 AC-1: BlogDetail back link uses useLocalizedPath', () => {
  it('should use useLocalizedPath hook for blog index link', () => {
    expect(blogDetailComponent).toContain('useLocalizedPath')
    expect(blogDetailComponent).toContain("localizedPath('/blog')")
  })

  it('should produce correct English blog index path via localizedPath', () => {
    expect(buildLocalizedPath('en', 'en', '/blog')).toBe('~/blog')
  })

  it('should produce correct Chinese blog index path via localizedPath', () => {
    expect(buildLocalizedPath('zh', 'en', '/blog')).toBe('~/zh/blog')
  })
})

describe('AR-221 AC-2: Route navigation paths for all known routes', () => {
  describe('English navigation paths', () => {
    it('/ is handled by LanguageRedirect at root level', () => {
      expect(appTsx).toContain("path='/' component={LanguageRedirect}")
    })

    it('/blog is routable at root level', () => {
      // Verify it's outside the /zh nest block (at root level)
      const rootRoutes = appTsx.split("path='/zh' nest")[1]
      expect(rootRoutes).toBeTruthy()
      // After the zh nest block closes, there are root-level routes
      expect(rootRoutes).toContain("path='/blog' component={BlogIndex}")
    })

    it('/blog/hello-world resolves via /blog/:slug at root level', () => {
      const rootRoutes = appTsx.split("path='/zh' nest")[1]
      expect(rootRoutes).toBeTruthy()
      expect(rootRoutes).toContain("path='/blog/:slug' component={BlogDetail}")
    })

    it('/imprint is routable at root level', () => {
      const rootRoutes = appTsx.split("path='/zh' nest")[1]
      expect(rootRoutes).toBeTruthy()
      expect(rootRoutes).toContain("path='/imprint' component={Imprint}")
    })
  })

  describe('Chinese navigation paths', () => {
    it('/zh resolves to Home via nested / route', () => {
      const zhNestBlock = appTsx.match(/path='\/zh'.*nest[\s\S]*?<\/Route>\s*\n/m)?.[0]
      expect(zhNestBlock).toBeTruthy()
      expect(zhNestBlock).toContain("path='/' component={Home}")
    })

    it('/zh/blog resolves to BlogIndex via nested /blog route', () => {
      const zhNestBlock = appTsx.match(/path='\/zh'.*nest[\s\S]*?<\/Route>\s*\n/m)?.[0]
      expect(zhNestBlock).toBeTruthy()
      expect(zhNestBlock).toContain("path='/blog' component={BlogIndex}")
    })

    it('/zh/blog/hello-world resolves to BlogDetail via nested /blog/:slug route', () => {
      const zhNestBlock = appTsx.match(/path='\/zh'.*nest[\s\S]*?<\/Route>\s*\n/m)?.[0]
      expect(zhNestBlock).toBeTruthy()
      expect(zhNestBlock).toContain("path='/blog/:slug' component={BlogDetail}")
    })

    it('/zh/imprint resolves to Imprint via nested /imprint route', () => {
      const zhNestBlock = appTsx.match(/path='\/zh'.*nest[\s\S]*?<\/Route>\s*\n/m)?.[0]
      expect(zhNestBlock).toBeTruthy()
      expect(zhNestBlock).toContain("path='/imprint' component={Imprint}")
    })
  })

  describe('link generation produces correct absolute paths', () => {
    it('useLocalizedPath uses ~ prefix to escape nested route context', () => {
      expect(useLocalizedPathHook).toContain('`~${cleanPath}`')
      expect(useLocalizedPathHook).toContain('`~/${lang}${cleanPath}`')
    })

    it('BlogCard uses ~ prefix on all href values', () => {
      // Both branches of the ternary must use ~ prefix
      expect(blogCardComponent).toContain('`~/blog/${slug}`')
      expect(blogCardComponent).toContain('`~/${lang}/blog/${slug}`')
    })

    it('BlogDetail fallback redirect uses ~ prefix', () => {
      expect(blogDetailComponent).toContain('`~/blog/${slug}`')
    })
  })
})
