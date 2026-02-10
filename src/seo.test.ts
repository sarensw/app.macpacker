import { describe, it, expect } from 'vitest'
import { readFileSync, existsSync } from 'fs'
import { resolve } from 'path'

const htmlPath = resolve(__dirname, '../index.html')
const html = readFileSync(htmlPath, 'utf-8')

function getMetaContent(attr: string, value: string): string | null {
  const regex = new RegExp(`<meta\\s+(?:[^>]*?)?(?:${attr}="${value}")(?:[^>]*?)?content="([^"]*)"`, 'i')
  const match = html.match(regex)
  if (match) return match[1]
  // Also try reversed attribute order (content before name/property)
  const regexReversed = new RegExp(`<meta\\s+(?:[^>]*?)?content="([^"]*)"(?:[^>]*?)?(?:${attr}="${value}")`, 'i')
  const matchReversed = html.match(regexReversed)
  return matchReversed ? matchReversed[1] : null
}

function countMetaOccurrences(attr: string, value: string): number {
  const regex = new RegExp(`<meta\\s+[^>]*${attr}="${value}"[^>]*>`, 'gi')
  const matches = html.match(regex)
  return matches ? matches.length : 0
}

describe('robots.txt', () => {
  const robotsPath = resolve(__dirname, '../public/robots.txt')

  it('should exist in public directory', () => {
    expect(existsSync(robotsPath)).toBe(true)
  })

  it('should allow all user agents', () => {
    const content = readFileSync(robotsPath, 'utf-8')
    expect(content).toContain('User-agent: *')
  })

  it('should allow crawling', () => {
    const content = readFileSync(robotsPath, 'utf-8')
    expect(content).toContain('Allow: /')
  })

  it('should reference the sitemap with correct domain', () => {
    const content = readFileSync(robotsPath, 'utf-8')
    expect(content).toContain('Sitemap: https://macpacker.app/sitemap.xml')
  })
})

describe('sitemap.xml', () => {
  const sitemapPath = resolve(__dirname, '../public/sitemap.xml')

  it('should exist in public directory', () => {
    expect(existsSync(sitemapPath)).toBe(true)
  })

  it('should be valid XML with proper declaration', () => {
    const content = readFileSync(sitemapPath, 'utf-8')
    expect(content).toMatch(/^<\?xml version="1\.0" encoding="UTF-8"\?>/)
  })

  it('should use the sitemaps.org schema', () => {
    const content = readFileSync(sitemapPath, 'utf-8')
    expect(content).toContain('xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"')
  })

  it('should include the root URL', () => {
    const content = readFileSync(sitemapPath, 'utf-8')
    expect(content).toContain('<loc>https://macpacker.app/</loc>')
  })

  it('should include language-specific home pages', () => {
    const content = readFileSync(sitemapPath, 'utf-8')
    // English home is at root /, Chinese at /zh/ (AC-2, AC-3)
    expect(content).toContain('<loc>https://macpacker.app/</loc>')
    expect(content).toContain('<loc>https://macpacker.app/zh/</loc>')
    expect(content).not.toContain('<loc>https://macpacker.app/de/</loc>')
  })

  it('should include imprint page at root level only', () => {
    const content = readFileSync(sitemapPath, 'utf-8')
    expect(content).toContain('<loc>https://macpacker.app/imprint</loc>')
  })

  it('should include Chinese imprint route per AC-5', () => {
    const content = readFileSync(sitemapPath, 'utf-8')
    // AC-5 requires both /imprint and /zh/imprint
    expect(content).toContain('<loc>https://macpacker.app/zh/imprint</loc>')
    expect(content).not.toContain('<loc>https://macpacker.app/en/imprint</loc>')
    expect(content).not.toContain('<loc>https://macpacker.app/de/imprint</loc>')
  })

  it('should only contain URLs that match actual routes', () => {
    const content = readFileSync(sitemapPath, 'utf-8')
    const locMatches = content.match(/<loc>(.*?)<\/loc>/g) || []
    const urls = locMatches.map(loc => loc.replace(/<\/?loc>/g, ''))
    // English pages at root (AC-2), Chinese pages at /zh (AC-3)
    const validPaths = [
      '/', '/zh/',
      '/docs/extract-rar', '/zh/docs/extract-rar',
      '/docs/extract-7zip', '/zh/docs/extract-7zip',
      '/docs/password-protect-zip', '/zh/docs/password-protect-zip',
      '/blog', '/zh/blog',
      '/blog/hello-world', '/zh/blog/hello-world',
      '/imprint', '/zh/imprint',
    ]
    for (const url of urls) {
      const path = url.replace('https://macpacker.app', '')
      expect(validPaths).toContain(path)
    }
  })

  it('should use macpacker.app domain for all URLs', () => {
    const content = readFileSync(sitemapPath, 'utf-8')
    const locMatches = content.match(/<loc>(.*?)<\/loc>/g) || []
    for (const loc of locMatches) {
      expect(loc).toContain('macpacker.app')
    }
  })
})

describe('Open Graph meta tags', () => {
  it('should have og:site_name set to MacPacker (not FileFillet)', () => {
    const siteName = getMetaContent('property', 'og:site_name')
    expect(siteName).toBe('MacPacker')
  })

  it('should have og:title', () => {
    const title = getMetaContent('property', 'og:title')
    expect(title).toBeTruthy()
    expect(title).toContain('MacPacker')
  })

  it('should have og:description', () => {
    const description = getMetaContent('property', 'og:description')
    expect(description).toBeTruthy()
    expect(description!.length).toBeGreaterThan(0)
  })

  it('should have og:url with correct domain', () => {
    const url = getMetaContent('property', 'og:url')
    expect(url).toContain('macpacker.app')
  })

  it('should have og:type set to website', () => {
    const type = getMetaContent('property', 'og:type')
    expect(type).toBe('website')
  })

  it('should have og:image with absolute URL', () => {
    const image = getMetaContent('property', 'og:image')
    expect(image).toMatch(/^https:\/\//)
  })
})

describe('Twitter meta tags', () => {
  it('should have twitter:domain set to macpacker.app (not macpacker.com)', () => {
    const domain = getMetaContent('property', 'twitter:domain')
    expect(domain).toBe('macpacker.app')
  })

  it('should have twitter:card set to summary_large_image', () => {
    const card = getMetaContent('name', 'twitter:card')
    expect(card).toBe('summary_large_image')
  })

  it('should not have duplicate twitter:card tags', () => {
    const count = countMetaOccurrences('name', 'twitter:card')
    expect(count).toBe(1)
  })

  it('should have twitter:title', () => {
    const title = getMetaContent('name', 'twitter:title')
    expect(title).toBeTruthy()
    expect(title).toContain('MacPacker')
  })

  it('should have twitter:description', () => {
    const description = getMetaContent('name', 'twitter:description')
    expect(description).toBeTruthy()
  })

  it('should have twitter:image with absolute URL', () => {
    const image = getMetaContent('name', 'twitter:image')
    expect(image).toMatch(/^https:\/\//)
  })
})

describe('canonical URL', () => {
  it('should have a canonical link tag', () => {
    expect(html).toMatch(/<link\s+rel="canonical"/)
  })

  it('should point to macpacker.app', () => {
    const match = html.match(/<link\s+rel="canonical"\s+href="([^"]*)"/)
    expect(match).not.toBeNull()
    expect(match![1]).toBe('https://macpacker.app/')
  })
})

describe('keywords meta tag', () => {
  it('should have a keywords meta tag', () => {
    const keywords = getMetaContent('name', 'keywords')
    expect(keywords).toBeTruthy()
  })

  it('should include relevant archive-related keywords', () => {
    const keywords = getMetaContent('name', 'keywords')!
    expect(keywords).toContain('archive manager')
    expect(keywords).toContain('macOS')
    expect(keywords).toContain('zip')
    expect(keywords).toContain('open source')
  })

  it('should include compression format keywords', () => {
    const keywords = getMetaContent('name', 'keywords')!
    expect(keywords).toContain('7zip')
    expect(keywords).toContain('lz4')
    expect(keywords).toContain('tar')
    expect(keywords).toContain('gzip')
  })
})

describe('general SEO requirements', () => {
  it('should have a title tag', () => {
    expect(html).toMatch(/<title>.*MacPacker.*<\/title>/)
  })

  it('should have a meta description', () => {
    const description = getMetaContent('name', 'description')
    expect(description).toBeTruthy()
    expect(description!.length).toBeGreaterThan(50)
  })

  it('should have a meta robots tag', () => {
    const robots = getMetaContent('name', 'robots')
    expect(robots).toContain('index')
    expect(robots).toContain('follow')
  })

  it('should have lang attribute on html element', () => {
    expect(html).toMatch(/<html\s+lang="en"/)
  })

  it('should have viewport meta tag', () => {
    const viewport = getMetaContent('name', 'viewport')
    expect(viewport).toBeTruthy()
  })

  it('should not contain any FileFillet references', () => {
    expect(html.toLowerCase()).not.toContain('filefillet')
  })

  it('should not contain macpacker.com references', () => {
    // Only check meta tags, not the full HTML (structured data, etc. may legitimately reference other domains)
    const metaTags = html.match(/<meta[^>]*>/gi) || []
    for (const tag of metaTags) {
      expect(tag).not.toContain('macpacker.com')
    }
  })
})
