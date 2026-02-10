import type { ReactElement } from 'react'
import { useState, useEffect } from 'react'
import { useParams, useLocation } from 'wouter'
import { Link } from 'wouter'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { GradientPlaceholder } from '@/components/GradientPlaceholder'
import { useBlogMeta } from '@/hooks/useBlogMeta'
import { fetchBlogPost } from '@/utils/blog'
import { fallbackLanguage } from '@/i18n/config'
import { useCurrentLanguage } from '@/i18n/LanguageContext'
import { useLocalizedPath } from '@/hooks/useLocalizedPath'

function BlogDetail(): ReactElement {
  const params = useParams<{ slug: string }>()
  const lang = useCurrentLanguage()
  const slug = params.slug ?? ''
  const [, setLocation] = useLocation()
  const localizedPath = useLocalizedPath()

  const [body, setBody] = useState<string>('')
  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [date, setDate] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<boolean>(false)

  useBlogMeta({ title, description, lang, slug })

  const blogIndexHref = localizedPath('/blog')

  const backLabel = lang === 'zh' ? '← 返回博客' : '← Back to Blog'

  useEffect(() => {
    if (!slug) return

    setLoading(true)
    setError(false)

    fetchBlogPost(slug, lang)
      .then(async (post) => {
        if (!post) {
          // Fall back to English if the localized version is not available
          if (lang !== fallbackLanguage) {
            const fallbackPost = await fetchBlogPost(slug, fallbackLanguage)
            if (fallbackPost) {
              // Redirect to English canonical URL
              setLocation(`~/blog/${slug}`, { replace: true })
              return
            }
          }
          throw new Error('Not found')
        }
        setTitle(post.frontmatter.title)
        setDescription(post.frontmatter.description)
        setDate(post.frontmatter.date)
        setBody(post.body)
        setLoading(false)
      })
      .catch(() => {
        setError(true)
        setLoading(false)
      })
  }, [lang, slug, setLocation])

  const formattedDate = date
    ? new Date(date + 'T00:00:00').toLocaleDateString(
        lang === 'zh' ? 'zh-CN' : 'en-US',
        { year: 'numeric', month: 'long', day: 'numeric' }
      )
    : ''

  return (
    <>
      <Header />
      <div className='w-full max-w-3xl mx-auto px-4 mt-24 mb-20'>
        {loading && (
          <p className='text-gray-500'>Loading...</p>
        )}
        {error && (
          <div className='text-center py-12'>
            <h1 className='text-2xl font-bold text-gray-900 mb-2'>
              {lang === 'zh' ? '页面未找到' : 'Page not found'}
            </h1>
            <p className='text-gray-600'>
              {lang === 'zh' ? '您查找的博客文章不存在。' : "The blog post you're looking for doesn't exist."}
            </p>
          </div>
        )}
        {!loading && !error && (
          <>
            <Link
              href={blogIndexHref}
              className='text-sm text-gray-600 hover:text-gray-900 transition-colors inline-flex items-center gap-1 mb-6'
            >
              {backLabel}
            </Link>

            <GradientPlaceholder className='mb-6' />

            <h1 className='text-3xl font-bold text-gray-950 mb-2'>{title}</h1>
            <p className='text-lg text-gray-600 mb-2'>{description}</p>
            <time className='text-sm text-gray-500 block mb-6' dateTime={date}>
              {formattedDate}
            </time>

            <article className='prose prose-zinc max-w-none'>
              <Markdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight]}
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

export { BlogDetail }
