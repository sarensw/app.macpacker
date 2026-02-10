export interface BlogFrontmatter {
  title: string
  description: string
  date: string
  excerpt: string
}

export interface BlogPost {
  slug: string
  frontmatter: BlogFrontmatter
  body: string
}

/**
 * Parse YAML frontmatter from a blog markdown string.
 * Extracts title, description, date, and excerpt fields.
 */
export function parseBlogFrontmatter(markdown: string): { frontmatter: BlogFrontmatter; body: string } {
  const match = markdown.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/)
  if (!match) {
    return {
      frontmatter: { title: '', description: '', date: '', excerpt: '' },
      body: markdown,
    }
  }

  const raw = match[1]
  const body = match[2]

  const frontmatter: BlogFrontmatter = { title: '', description: '', date: '', excerpt: '' }
  for (const line of raw.split('\n')) {
    const colonIndex = line.indexOf(':')
    if (colonIndex === -1) continue
    const key = line.slice(0, colonIndex).trim()
    const value = line.slice(colonIndex + 1).trim()
    if (key === 'title') frontmatter.title = value
    if (key === 'description') frontmatter.description = value
    if (key === 'date') frontmatter.date = value
    if (key === 'excerpt') frontmatter.excerpt = value
  }

  return { frontmatter, body }
}

/**
 * Returns the blog directory path for a given language.
 * English posts are at /blog/, other languages at /blog/<lang>/
 */
export function blogDir(lang: string): string {
  if (lang === 'en') return '/blog'
  return `/blog/${lang}`
}

/**
 * Fetches and parses a blog post markdown file.
 */
export async function fetchBlogPost(slug: string, lang: string): Promise<BlogPost | null> {
  const dir = blogDir(lang)
  const response = await fetch(`${dir}/${slug}.md`)
  if (!response.ok) return null

  const text = await response.text()
  const { frontmatter, body } = parseBlogFrontmatter(text)
  return { slug, frontmatter, body }
}

/**
 * Known blog post slugs. Since we serve static files, we maintain
 * an index of available posts rather than listing a directory.
 */
export const blogPostSlugs: string[] = [
  'hello-world',
]

/**
 * Sort blog posts by date, newest first.
 */
export function sortBlogPosts(posts: BlogPost[]): BlogPost[] {
  return [...posts].sort((a, b) => {
    const dateA = new Date(a.frontmatter.date + 'T00:00:00')
    const dateB = new Date(b.frontmatter.date + 'T00:00:00')
    return dateB.getTime() - dateA.getTime()
  })
}
