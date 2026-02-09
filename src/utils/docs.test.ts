import { describe, it, expect } from 'vitest'
import { parseFrontmatter, extractHeadings, headingToId } from './docs'

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
