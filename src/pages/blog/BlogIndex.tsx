import type { ReactElement } from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'wouter'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { BlogCard } from '@/components/BlogCard'
import { useBlogMeta } from '@/hooks/useBlogMeta'
import { fetchBlogPost, blogPostSlugs, sortBlogPosts } from '@/utils/blog'
import { fallbackLanguage } from '@/i18n/config'
import type { BlogPost } from '@/utils/blog'

function BlogIndex(): ReactElement {
  const params = useParams<{ lang: string }>()
  const lang = params.lang ?? fallbackLanguage

  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  const pageTitle = lang === 'zh' ? '博客' : 'Blog'
  const pageDescription = lang === 'zh'
    ? 'MacPacker 的指南、技巧和产品更新。'
    : 'Guides, tips, and product updates from MacPacker.'

  useBlogMeta({
    title: pageTitle,
    description: pageDescription,
    lang,
  })

  useEffect(() => {
    setLoading(true)

    Promise.all(
      blogPostSlugs.map((slug) => fetchBlogPost(slug, lang))
    ).then((results) => {
      const validPosts = results.filter((p): p is BlogPost => p !== null)
      setPosts(sortBlogPosts(validPosts))
      setLoading(false)
    })
  }, [lang])

  return (
    <>
      <Header />
      <div className='w-full max-w-3xl mx-auto px-4 mt-24 mb-20'>
        <h1 className='text-3xl font-bold text-gray-950 mb-2'>{pageTitle}</h1>
        <p className='text-gray-600 mb-8'>{pageDescription}</p>

        {loading && (
          <p className='text-gray-500'>Loading...</p>
        )}

        {!loading && posts.length === 0 && (
          <div className='text-center py-12'>
            <p className='text-gray-600'>
              {lang === 'zh' ? '暂无博客文章。请稍后再来！' : 'No blog posts yet. Check back soon!'}
            </p>
          </div>
        )}

        {!loading && posts.length > 0 && (
          <div className='space-y-4'>
            {posts.map((post) => (
              <BlogCard
                key={post.slug}
                slug={post.slug}
                title={post.frontmatter.title}
                excerpt={post.frontmatter.excerpt}
                date={post.frontmatter.date}
                lang={lang}
              />
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  )
}

export { BlogIndex }
