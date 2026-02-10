import { describe, it, expect } from 'vitest'
import { readFileSync, existsSync } from 'fs'
import { resolve } from 'path'

const appTsx = readFileSync(resolve(__dirname, '../../App.tsx'), 'utf-8')
const headerComponent = readFileSync(resolve(__dirname, '../../components/Header.tsx'), 'utf-8')
const blogIndexComponent = readFileSync(resolve(__dirname, './BlogIndex.tsx'), 'utf-8')
const blogDetailComponent = readFileSync(resolve(__dirname, './BlogDetail.tsx'), 'utf-8')
const blogCardComponent = readFileSync(resolve(__dirname, '../../components/BlogCard.tsx'), 'utf-8')
const gradientPlaceholderComponent = readFileSync(resolve(__dirname, '../../components/GradientPlaceholder.tsx'), 'utf-8')
const languageSwitcherComponent = readFileSync(resolve(__dirname, '../../components/LanguageSwitcher.tsx'), 'utf-8')
const blogUtils = readFileSync(resolve(__dirname, '../../utils/blog.ts'), 'utf-8')
const useBlogMetaHook = readFileSync(resolve(__dirname, '../../hooks/useBlogMeta.ts'), 'utf-8')
const sitemapXml = readFileSync(resolve(__dirname, '../../../public/sitemap.xml'), 'utf-8')

describe('AC-1: Header displays localized Blog link', () => {
  it('should import HeaderNavLink in Header', () => {
    expect(headerComponent).toContain("import { HeaderNavLink } from '@/components/HeaderNavLink'")
  })

  it('should import fallbackLanguage in Header', () => {
    expect(headerComponent).toContain("import { fallbackLanguage } from '@/i18n/config'")
  })

  it('should compute blogLabel with Chinese translation', () => {
    expect(headerComponent).toContain("lang === 'zh' ? '博客' : 'Blog'")
  })

  it('should render blog link in desktop nav using HeaderNavLink', () => {
    expect(headerComponent).toContain("<HeaderNavLink href={localizedPath('/blog')}>{blogLabel}</HeaderNavLink>")
  })

  it('should render blog link in mobile nav', () => {
    const mobileMenuBlock = headerComponent.match(/<HeaderMobileMenu[\s\S]*?<\/HeaderMobileMenu>/)?.[0]
    expect(mobileMenuBlock).toBeTruthy()
    expect(mobileMenuBlock).toContain("<HeaderNavLink href={localizedPath('/blog')}>{blogLabel}</HeaderNavLink>")
  })
})

describe('AC-2: Blog index routes exist', () => {
  it('should import BlogIndex in App.tsx', () => {
    expect(appTsx).toContain("import { BlogIndex } from './pages/blog/BlogIndex'")
  })

  it('should have /blog route under /:lang nest', () => {
    expect(appTsx).toContain("path='/blog' component={BlogIndex}")
  })
})

describe('AC-3: Blog detail routes exist', () => {
  it('should import BlogDetail in App.tsx', () => {
    expect(appTsx).toContain("import { BlogDetail } from './pages/blog/BlogDetail'")
  })

  it('should have /blog/:slug route under /:lang nest', () => {
    expect(appTsx).toContain("path='/blog/:slug' component={BlogDetail}")
  })

  it('should place blog routes before docs routes', () => {
    const blogIdx = appTsx.indexOf("'/blog/:slug'")
    const docsIdx = appTsx.indexOf("'/docs/:slug'")
    expect(blogIdx).toBeLessThan(docsIdx)
  })
})

describe('AC-4: Blog index page layout', () => {
  it('should use centered layout with max-w-3xl', () => {
    expect(blogIndexComponent).toContain('max-w-3xl')
  })

  it('should use mx-auto for centering', () => {
    expect(blogIndexComponent).toContain('mx-auto')
  })

  it('should use space-y-4 for card spacing', () => {
    expect(blogIndexComponent).toContain('space-y-4')
  })

  it('should sort posts newest-first using sortBlogPosts', () => {
    expect(blogIndexComponent).toContain('sortBlogPosts')
  })

  it('should have mt-24 mb-20 spacing', () => {
    expect(blogIndexComponent).toContain('mt-24 mb-20')
  })
})

describe('AC-5: Blog card displays required elements', () => {
  it('should render GradientPlaceholder', () => {
    expect(blogCardComponent).toContain('<GradientPlaceholder')
  })

  it('should display title in h2', () => {
    expect(blogCardComponent).toContain('<h2')
    expect(blogCardComponent).toContain('{title}')
  })

  it('should display excerpt', () => {
    expect(blogCardComponent).toContain('{excerpt}')
  })

  it('should display formatted date with time element', () => {
    expect(blogCardComponent).toContain('<time')
    expect(blogCardComponent).toContain('dateTime={date}')
  })

  it('should have hover states on card', () => {
    expect(blogCardComponent).toContain('hover:border-gray-400')
    expect(blogCardComponent).toContain('hover:bg-gray-50')
    expect(blogCardComponent).toContain('transition-colors')
  })

  it('should be a clickable link', () => {
    expect(blogCardComponent).toContain('import { Link }')
    expect(blogCardComponent).toContain('<Link')
  })
})

describe('AC-6: Blog detail page elements', () => {
  it('should have a back link to blog index', () => {
    expect(blogDetailComponent).toContain('blogIndexHref')
    expect(blogDetailComponent).toContain('Back to Blog')
  })

  it('should have localized back link for Chinese', () => {
    expect(blogDetailComponent).toContain('返回博客')
  })

  it('should render GradientPlaceholder', () => {
    expect(blogDetailComponent).toContain('<GradientPlaceholder')
  })

  it('should render title, description, and date', () => {
    expect(blogDetailComponent).toContain('{title}')
    expect(blogDetailComponent).toContain('{description}')
    expect(blogDetailComponent).toContain('<time')
  })

  it('should render markdown content with prose styling', () => {
    expect(blogDetailComponent).toContain('prose prose-zinc max-w-none')
    expect(blogDetailComponent).toContain('<Markdown')
    expect(blogDetailComponent).toContain('remarkGfm')
    expect(blogDetailComponent).toContain('rehypeHighlight')
  })

  it('should use Header and Footer', () => {
    expect(blogDetailComponent).toContain('<Header />')
    expect(blogDetailComponent).toContain('<Footer />')
  })
})

describe('AC-7: Language switcher preserves blog context', () => {
  it('should capture current location for subpath preservation', () => {
    expect(languageSwitcherComponent).toContain('const [location, setLocation] = useLocation()')
  })

  it('should compute subpath from current location', () => {
    expect(languageSwitcherComponent).toContain("const subpath = location && location !== '/' ? location : ''")
  })

  it('should include subpath in language switch navigation', () => {
    expect(languageSwitcherComponent).toContain('`~/${targetLang}${subpath || ')
  })
})

describe('AC-8: Missing translation fallback to English', () => {
  it('should handle fallback when localized post is not found', () => {
    expect(blogDetailComponent).toContain('fallbackLanguage')
    expect(blogDetailComponent).toContain("fetchBlogPost(slug, fallbackLanguage)")
  })

  it('should redirect to English canonical URL on missing translation', () => {
    // English blog is at root /blog/ (AC-2)
    expect(blogDetailComponent).toContain('`~/blog/${slug}`')
  })
})

describe('AC-9: Seed blog posts exist', () => {
  it('should have English hello-world blog post', () => {
    const filePath = resolve(__dirname, '../../../public/blog/hello-world.md')
    expect(existsSync(filePath)).toBe(true)
  })

  it('should have Chinese hello-world blog post', () => {
    const filePath = resolve(__dirname, '../../../public/blog/zh/hello-world.md')
    expect(existsSync(filePath)).toBe(true)
  })

  it('should have correct English frontmatter', () => {
    const content = readFileSync(resolve(__dirname, '../../../public/blog/hello-world.md'), 'utf-8')
    expect(content).toContain('title:')
    expect(content).toContain('description:')
    expect(content).toContain('date: 2026-02-10')
    expect(content).toContain('excerpt:')
  })

  it('should have correct Chinese frontmatter', () => {
    const content = readFileSync(resolve(__dirname, '../../../public/blog/zh/hello-world.md'), 'utf-8')
    expect(content).toContain('title:')
    expect(content).toContain('description:')
    expect(content).toContain('date: 2026-02-10')
    expect(content).toContain('excerpt:')
  })
})

describe('AC-10: Blog file storage locations', () => {
  it('should have English blog post at /public/blog/<slug>.md', () => {
    expect(existsSync(resolve(__dirname, '../../../public/blog/hello-world.md'))).toBe(true)
  })

  it('should have Chinese blog post at /public/blog/zh/<slug>.md', () => {
    expect(existsSync(resolve(__dirname, '../../../public/blog/zh/hello-world.md'))).toBe(true)
  })

  it('should use correct blog directory paths in utility', () => {
    expect(blogUtils).toContain("if (lang === 'en') return '/blog'")
    expect(blogUtils).toContain("return `/blog/${lang}`")
  })
})

describe('AC-11: Frontmatter required fields', () => {
  it('should parse title, description, date, and excerpt fields', () => {
    expect(blogUtils).toContain("if (key === 'title')")
    expect(blogUtils).toContain("if (key === 'description')")
    expect(blogUtils).toContain("if (key === 'date')")
    expect(blogUtils).toContain("if (key === 'excerpt')")
  })

  it('should define BlogFrontmatter interface with required fields', () => {
    expect(blogUtils).toContain('title: string')
    expect(blogUtils).toContain('description: string')
    expect(blogUtils).toContain('date: string')
    expect(blogUtils).toContain('excerpt: string')
  })

  it('should derive slug from blogPostSlugs, not frontmatter', () => {
    expect(blogUtils).toContain("blogPostSlugs: string[]")
    expect(blogUtils).toContain("'hello-world'")
  })
})

describe('AC-12: SEO metadata', () => {
  it('should have useBlogMeta hook', () => {
    expect(useBlogMetaHook).toBeTruthy()
  })

  it('should set document title', () => {
    expect(useBlogMetaHook).toContain('document.title =')
  })

  it('should set meta description', () => {
    expect(useBlogMetaHook).toContain("'description'")
  })

  it('should set OG tags', () => {
    expect(useBlogMetaHook).toContain('og:title')
    expect(useBlogMetaHook).toContain('og:description')
    expect(useBlogMetaHook).toContain('og:url')
  })

  it('should set Twitter tags', () => {
    expect(useBlogMetaHook).toContain('twitter:title')
    expect(useBlogMetaHook).toContain('twitter:description')
  })

  it('should set canonical URL', () => {
    expect(useBlogMetaHook).toContain("ensureLinkTag('canonical')")
  })

  it('should set hreflang tags for en and zh', () => {
    expect(useBlogMetaHook).toContain("'en', 'zh'")
  })

  it('should set x-default hreflang', () => {
    expect(useBlogMetaHook).toContain("'x-default'")
  })

  it('should be used in BlogIndex', () => {
    expect(blogIndexComponent).toContain('useBlogMeta')
  })

  it('should be used in BlogDetail', () => {
    expect(blogDetailComponent).toContain('useBlogMeta')
  })
})

describe('AC-13: Sitemap includes blog URLs', () => {
  it('should include English blog index URL', () => {
    // English at root (AC-2)
    expect(sitemapXml).toContain('<loc>https://macpacker.app/blog</loc>')
  })

  it('should include Chinese blog index URL', () => {
    expect(sitemapXml).toContain('<loc>https://macpacker.app/zh/blog</loc>')
  })

  it('should include English hello-world blog post URL', () => {
    // English at root (AC-2)
    expect(sitemapXml).toContain('<loc>https://macpacker.app/blog/hello-world</loc>')
  })

  it('should include Chinese hello-world blog post URL', () => {
    expect(sitemapXml).toContain('<loc>https://macpacker.app/zh/blog/hello-world</loc>')
  })

  it('should be valid XML', () => {
    expect(sitemapXml).toContain('<?xml version="1.0"')
    expect(sitemapXml).toContain('<urlset')
    expect(sitemapXml).toContain('</urlset>')
  })
})

describe('GradientPlaceholder component', () => {
  it('should have the correct gradient classes', () => {
    expect(gradientPlaceholderComponent).toContain('bg-gradient-to-br from-teal-700 via-gray-400 to-gray-300')
  })

  it('should use aspect-video for 16:9 ratio', () => {
    expect(gradientPlaceholderComponent).toContain('aspect-video')
  })

  it('should have rounded corners', () => {
    expect(gradientPlaceholderComponent).toContain('rounded-lg')
  })

  it('should be aria-hidden', () => {
    expect(gradientPlaceholderComponent).toContain("aria-hidden='true'")
  })

  it('should accept optional className prop', () => {
    expect(gradientPlaceholderComponent).toContain('className?: string')
  })
})

describe('BlogIndex renders Header and Footer', () => {
  it('should render Header', () => {
    expect(blogIndexComponent).toContain("import { Header } from '@/components/Header'")
    expect(blogIndexComponent).toContain('<Header />')
  })

  it('should render Footer', () => {
    expect(blogIndexComponent).toContain("import { Footer } from '@/components/Footer'")
    expect(blogIndexComponent).toContain('<Footer />')
  })
})

describe('BlogIndex displays localized content', () => {
  it('should show localized page title', () => {
    expect(blogIndexComponent).toContain("lang === 'zh' ? '博客' : 'Blog'")
  })

  it('should show localized page description', () => {
    expect(blogIndexComponent).toContain("lang === 'zh'")
  })

  it('should show empty state message', () => {
    expect(blogIndexComponent).toContain('No blog posts yet. Check back soon!')
  })

  it('should show localized empty state for Chinese', () => {
    expect(blogIndexComponent).toContain('暂无博客文章')
  })
})

describe('BlogDetail loading and error states', () => {
  it('should show loading state', () => {
    expect(blogDetailComponent).toContain('Loading...')
  })

  it('should show error state for English', () => {
    expect(blogDetailComponent).toContain('Page not found')
    expect(blogDetailComponent).toContain("The blog post you're looking for doesn't exist.")
  })

  it('should show error state for Chinese', () => {
    expect(blogDetailComponent).toContain('页面未找到')
    expect(blogDetailComponent).toContain('您查找的博客文章不存在')
  })
})
