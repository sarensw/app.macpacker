import type { ReactElement } from 'react'
import { Link } from 'wouter'
import { GradientPlaceholder } from '@/components/GradientPlaceholder'

interface BlogCardProps {
  slug: string
  title: string
  excerpt: string
  date: string
  lang: string
}

function BlogCard ({ slug, title, excerpt, date, lang }: BlogCardProps): ReactElement {
  const href = lang === 'en' ? `/en/blog/${slug}` : `/${lang}/blog/${slug}`

  const formattedDate = new Date(date + 'T00:00:00').toLocaleDateString(
    lang === 'zh' ? 'zh-CN' : 'en-US',
    { year: 'numeric', month: 'long', day: 'numeric' }
  )

  return (
    <Link
      href={href}
      className='block rounded-lg overflow-hidden border border-gray-200 hover:border-gray-400 hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2'
    >
      <GradientPlaceholder />
      <div className='p-4'>
        <h2 className='text-lg font-semibold text-gray-900'>{title}</h2>
        <p className='text-sm text-gray-600 mt-1'>{excerpt}</p>
        <time className='text-xs text-gray-500 mt-2 block' dateTime={date}>{formattedDate}</time>
      </div>
    </Link>
  )
}

export { BlogCard }
export type { BlogCardProps }
