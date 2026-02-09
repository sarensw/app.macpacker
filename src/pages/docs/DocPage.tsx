import type { ReactElement } from 'react'
import { useState, useEffect, useMemo } from 'react'
import { useParams } from 'wouter'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { TableOfContents } from '@/components/TableOfContents'
import { useDocMeta } from '@/hooks/useDocMeta'
import { useStructuredData } from '@/hooks/useStructuredData'
import { parseFrontmatter, extractHeadings, extractFaqEntries, headingToId, docsDir } from '@/utils/docs'
import type { TocEntry, FaqEntry } from '@/utils/docs'
import { fallbackLanguage } from '@/i18n/config'

function DocPage(): ReactElement {
  const params = useParams<{ lang: string; slug: string }>()
  const lang = params.lang ?? fallbackLanguage
  const slug = params.slug ?? ''

  const [body, setBody] = useState<string>('')
  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [headings, setHeadings] = useState<TocEntry[]>([])
  const [faqEntries, setFaqEntries] = useState<FaqEntry[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<boolean>(false)

  useDocMeta({ title, description, lang, slug })

  const faqSchema = useMemo(() => {
    if (faqEntries.length === 0) return null
    return {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqEntries.map((entry) => ({
        '@type': 'Question',
        name: entry.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: entry.answer,
        },
      })),
    }
  }, [faqEntries])

  useStructuredData(faqSchema, 'doc-faq-schema')

  useEffect(() => {
    if (!slug) return

    setLoading(true)
    setError(false)

    fetch(`/docs/${docsDir(lang)}/${slug}.md`)
      .then(async (response) => {
        if (!response.ok) {
          // Fall back to English if the localized version is not available
          if (lang !== fallbackLanguage) {
            const fallbackResponse = await fetch(`/docs/${docsDir(fallbackLanguage)}/${slug}.md`)
            if (!fallbackResponse.ok) throw new Error('Not found')
            return fallbackResponse.text()
          }
          throw new Error('Not found')
        }
        return response.text()
      })
      .then((text) => {
        const { frontmatter, body: mdBody } = parseFrontmatter(text)
        setTitle(frontmatter.title)
        setDescription(frontmatter.description)
        setBody(mdBody)
        setHeadings(extractHeadings(mdBody))
        setFaqEntries(extractFaqEntries(mdBody))
        setLoading(false)
      })
      .catch(() => {
        setError(true)
        setLoading(false)
      })
  }, [lang, slug])

  function HeadingWithId({ children, Tag }: { children?: React.ReactNode; Tag: 'h2' | 'h3' | 'h4' }) {
    const id = headingToId(String(children))
    return <Tag id={id}>{children}</Tag>
  }

  return (
    <>
      <Header />
      <div className='w-full max-w-3xl mx-auto px-4 mt-24 mb-20'>
        {loading && (
          <p className='text-gray-500'>Loading...</p>
        )}
        {error && (
          <div className='text-center py-12'>
            <h1 className='text-2xl font-bold text-gray-900 mb-2'>Page not found</h1>
            <p className='text-gray-600'>The documentation page you're looking for doesn't exist.</p>
          </div>
        )}
        {!loading && !error && (
          <>
            <TableOfContents headings={headings} />
            <article className='prose prose-zinc max-w-none'>
              <Markdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight]}
                components={{
                  h2: ({ children }) => <HeadingWithId Tag='h2'>{children}</HeadingWithId>,
                  h3: ({ children }) => <HeadingWithId Tag='h3'>{children}</HeadingWithId>,
                  h4: ({ children }) => <HeadingWithId Tag='h4'>{children}</HeadingWithId>,
                }}
              >
                {body}
              </Markdown>
            </article>
          </>
        )}
      </div>
      <Footer />
    </>
  )
}

export { DocPage }
