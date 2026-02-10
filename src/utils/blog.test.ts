import { describe, it, expect } from 'vitest'
import { parseBlogFrontmatter, blogDir, sortBlogPosts, blogPostSlugs } from './blog'
import type { BlogPost } from './blog'

describe('parseBlogFrontmatter', () => {
  it('should parse all blog frontmatter fields', () => {
    const md = `---
title: Hello World
description: A test blog post
date: 2026-02-10
excerpt: This is an excerpt.
---

# Hello World

Content here.`

    const { frontmatter, body } = parseBlogFrontmatter(md)
    expect(frontmatter.title).toBe('Hello World')
    expect(frontmatter.description).toBe('A test blog post')
    expect(frontmatter.date).toBe('2026-02-10')
    expect(frontmatter.excerpt).toBe('This is an excerpt.')
    expect(body.trim()).toBe('# Hello World\n\nContent here.')
  })

  it('should return empty frontmatter when no frontmatter block exists', () => {
    const md = '# Just a heading\n\nSome content.'
    const { frontmatter, body } = parseBlogFrontmatter(md)
    expect(frontmatter.title).toBe('')
    expect(frontmatter.description).toBe('')
    expect(frontmatter.date).toBe('')
    expect(frontmatter.excerpt).toBe('')
    expect(body).toBe(md)
  })

  it('should handle partial frontmatter', () => {
    const md = `---
title: Only Title
date: 2026-01-01
---

Content here.`

    const { frontmatter } = parseBlogFrontmatter(md)
    expect(frontmatter.title).toBe('Only Title')
    expect(frontmatter.date).toBe('2026-01-01')
    expect(frontmatter.description).toBe('')
    expect(frontmatter.excerpt).toBe('')
  })

  it('should ignore unknown frontmatter fields', () => {
    const md = `---
title: Test
author: Someone
description: Desc
date: 2026-02-10
excerpt: An excerpt
tags: one, two
---

Body`

    const { frontmatter } = parseBlogFrontmatter(md)
    expect(frontmatter.title).toBe('Test')
    expect(frontmatter.description).toBe('Desc')
    expect(frontmatter.date).toBe('2026-02-10')
    expect(frontmatter.excerpt).toBe('An excerpt')
  })

  it('should handle Chinese frontmatter content', () => {
    const md = `---
title: 欢迎来到 MacPacker 博客
description: 介绍 MacPacker 博客
date: 2026-02-10
excerpt: 我们很高兴推出 MacPacker 博客
---

# 欢迎`

    const { frontmatter } = parseBlogFrontmatter(md)
    expect(frontmatter.title).toBe('欢迎来到 MacPacker 博客')
    expect(frontmatter.description).toBe('介绍 MacPacker 博客')
    expect(frontmatter.excerpt).toBe('我们很高兴推出 MacPacker 博客')
  })
})

describe('blogDir', () => {
  it('should return /blog for English', () => {
    expect(blogDir('en')).toBe('/blog')
  })

  it('should return /blog/zh for Chinese', () => {
    expect(blogDir('zh')).toBe('/blog/zh')
  })
})

describe('sortBlogPosts', () => {
  it('should sort posts newest-first by date', () => {
    const posts: BlogPost[] = [
      { slug: 'old', frontmatter: { title: 'Old', description: '', date: '2026-01-01', excerpt: '' }, body: '' },
      { slug: 'new', frontmatter: { title: 'New', description: '', date: '2026-03-01', excerpt: '' }, body: '' },
      { slug: 'mid', frontmatter: { title: 'Mid', description: '', date: '2026-02-01', excerpt: '' }, body: '' },
    ]

    const sorted = sortBlogPosts(posts)
    expect(sorted[0].slug).toBe('new')
    expect(sorted[1].slug).toBe('mid')
    expect(sorted[2].slug).toBe('old')
  })

  it('should not mutate the original array', () => {
    const posts: BlogPost[] = [
      { slug: 'b', frontmatter: { title: 'B', description: '', date: '2026-01-01', excerpt: '' }, body: '' },
      { slug: 'a', frontmatter: { title: 'A', description: '', date: '2026-02-01', excerpt: '' }, body: '' },
    ]

    const sorted = sortBlogPosts(posts)
    expect(posts[0].slug).toBe('b')
    expect(sorted[0].slug).toBe('a')
  })

  it('should handle empty array', () => {
    expect(sortBlogPosts([])).toEqual([])
  })
})

describe('blogPostSlugs', () => {
  it('should include hello-world slug', () => {
    expect(blogPostSlugs).toContain('hello-world')
  })

  it('should be a non-empty array', () => {
    expect(blogPostSlugs.length).toBeGreaterThan(0)
  })
})
