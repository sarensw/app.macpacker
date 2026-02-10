import { describe, it, expect } from 'vitest'
import { parseFrontmatter, extractHeadings, headingToId, extractFaqEntries, docsDir } from './docs'

describe('parseFrontmatter', () => {
  it('should parse title and description from frontmatter', () => {
    const md = `---
title: My Doc Title
description: A short description of the doc.
---

# Hello World`

    const { frontmatter, body } = parseFrontmatter(md)
    expect(frontmatter.title).toBe('My Doc Title')
    expect(frontmatter.description).toBe('A short description of the doc.')
    expect(body.trim()).toBe('# Hello World')
  })

  it('should return empty frontmatter when no frontmatter block exists', () => {
    const md = '# Just a heading\n\nSome content.'
    const { frontmatter, body } = parseFrontmatter(md)
    expect(frontmatter.title).toBe('')
    expect(frontmatter.description).toBe('')
    expect(body).toBe(md)
  })

  it('should handle frontmatter with only title', () => {
    const md = `---
title: Only Title
---

Content here.`

    const { frontmatter } = parseFrontmatter(md)
    expect(frontmatter.title).toBe('Only Title')
    expect(frontmatter.description).toBe('')
  })

  it('should handle frontmatter with only description', () => {
    const md = `---
description: Only description
---

Content here.`

    const { frontmatter } = parseFrontmatter(md)
    expect(frontmatter.title).toBe('')
    expect(frontmatter.description).toBe('Only description')
  })

  it('should ignore unknown frontmatter fields', () => {
    const md = `---
title: Test
author: Someone
description: Desc
tags: one, two
---

Body`

    const { frontmatter } = parseFrontmatter(md)
    expect(frontmatter.title).toBe('Test')
    expect(frontmatter.description).toBe('Desc')
  })
})

describe('extractHeadings', () => {
  it('should extract h2 and h3 headings from markdown', () => {
    const md = `# Title (should be skipped)

## First Section

Some text.

### Subsection A

More text.

## Second Section

### Subsection B`

    const headings = extractHeadings(md)
    expect(headings).toHaveLength(4)
    expect(headings[0]).toEqual({ id: 'first-section', text: 'First Section', level: 2 })
    expect(headings[1]).toEqual({ id: 'subsection-a', text: 'Subsection A', level: 3 })
    expect(headings[2]).toEqual({ id: 'second-section', text: 'Second Section', level: 2 })
    expect(headings[3]).toEqual({ id: 'subsection-b', text: 'Subsection B', level: 3 })
  })

  it('should return empty array for markdown with no h2/h3 headings', () => {
    const md = `# Only h1 heading

Some content with no sub-headings.`

    const headings = extractHeadings(md)
    expect(headings).toHaveLength(0)
  })

  it('should skip h1 and h4+ headings', () => {
    const md = `# H1

## H2

### H3

#### H4

##### H5`

    const headings = extractHeadings(md)
    expect(headings).toHaveLength(2)
    expect(headings[0].text).toBe('H2')
    expect(headings[1].text).toBe('H3')
  })

  it('should generate slugified IDs from heading text', () => {
    const md = '## How to Extract RAR Files on macOS'
    const headings = extractHeadings(md)
    expect(headings[0].id).toBe('how-to-extract-rar-files-on-macos')
  })

  it('should handle special characters in headings', () => {
    const md = '## Step 1: Install MacPacker'
    const headings = extractHeadings(md)
    expect(headings[0].id).toBe('step-1-install-macpacker')
  })
})

describe('headingToId', () => {
  it('should convert heading text to a URL-safe id', () => {
    expect(headingToId('Hello World')).toBe('hello-world')
  })

  it('should strip special characters', () => {
    expect(headingToId('Step 1: Install')).toBe('step-1-install')
  })

  it('should collapse multiple spaces into a single dash', () => {
    expect(headingToId('Too   many   spaces')).toBe('too-many-spaces')
  })

  it('should lowercase the result', () => {
    expect(headingToId('UPPERCASE HEADING')).toBe('uppercase-heading')
  })
})

describe('docsDir', () => {
  it('should return the same language code for en', () => {
    expect(docsDir('en')).toBe('en')
  })

  it('should map zh to zh-Hans', () => {
    expect(docsDir('zh')).toBe('zh-Hans')
  })

  it('should pass through unknown language codes unchanged', () => {
    expect(docsDir('fr')).toBe('fr')
  })
})

describe('extractFaqEntries', () => {
  it('should extract FAQ question/answer pairs from English markdown', () => {
    const md = `## Some Section

Some content.

## Frequently Asked Questions

### Can macOS open RAR files natively?

No, macOS does not have built-in support for RAR files.

### What is the best free RAR extractor for Mac?

MacPacker is the best free RAR extractor for Mac. It supports 30+ formats.
`

    const entries = extractFaqEntries(md)
    expect(entries).toHaveLength(2)
    expect(entries[0].question).toBe('Can macOS open RAR files natively?')
    expect(entries[0].answer).toBe('No, macOS does not have built-in support for RAR files.')
    expect(entries[1].question).toBe('What is the best free RAR extractor for Mac?')
    expect(entries[1].answer).toBe('MacPacker is the best free RAR extractor for Mac. It supports 30+ formats.')
  })

  it('should extract FAQ entries from Chinese markdown', () => {
    const md = `## 常见问题解答

### macOS 能原生打开 RAR 文件吗？

不能，macOS 没有内置 RAR 文件支持。
`

    const entries = extractFaqEntries(md)
    expect(entries).toHaveLength(1)
    expect(entries[0].question).toBe('macOS 能原生打开 RAR 文件吗？')
  })

  it('should return empty array when no FAQ section exists', () => {
    const md = `## Introduction

Some content here.

## Method 1

Steps to follow.
`

    const entries = extractFaqEntries(md)
    expect(entries).toHaveLength(0)
  })

  it('should stop collecting FAQ entries when a new H2 section starts', () => {
    const md = `## FAQ

### Question 1?

Answer 1.

## Next Section

### Not a FAQ question

Not an answer.
`

    const entries = extractFaqEntries(md)
    expect(entries).toHaveLength(1)
    expect(entries[0].question).toBe('Question 1?')
  })

  it('should handle multi-line answers by joining them', () => {
    const md = `## Frequently Asked Questions

### Is it safe?

Yes, it is completely safe.
It is open-source software.
`

    const entries = extractFaqEntries(md)
    expect(entries).toHaveLength(1)
    expect(entries[0].answer).toBe('Yes, it is completely safe. It is open-source software.')
  })
})
