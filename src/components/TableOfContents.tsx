import type { ReactElement } from 'react'
import type { TocEntry } from '@/utils/docs'

interface TableOfContentsProps {
  headings: TocEntry[]
}

function TableOfContents({ headings }: TableOfContentsProps): ReactElement | null {
  if (headings.length === 0) return null

  return (
    <nav aria-label='Table of contents' className='mb-8 rounded-lg border border-gray-200 bg-gray-50 p-4'>
      <p className='mb-2 text-sm font-semibold text-gray-700'>On this page</p>
      <ul className='space-y-1'>
        {headings.map((heading) => (
          <li
            key={heading.id}
            className={heading.level === 3 ? 'ml-4' : ''}
          >
            <a
              href={`#${heading.id}`}
              className='text-sm text-gray-600 hover:text-gray-900 hover:underline'
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export { TableOfContents }
