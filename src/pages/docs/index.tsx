import type { ReactElement } from 'react'
import { Link } from 'wouter'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { useDocMeta } from '@/hooks/useDocMeta'
import { useLocalizedPath } from '@/hooks/useLocalizedPath'

interface DocLink {
  slug: string
  title: string
  description: string
}

const docs: DocLink[] = [
  {
    slug: 'extract-rar',
    title: 'How to Extract RAR Files on macOS',
    description: 'Learn how to open and extract RAR archives on your Mac using MacPacker.',
  },
  {
    slug: 'extract-7zip',
    title: 'How to Extract 7z Files on macOS',
    description: 'Learn how to open and extract 7z (7-Zip) archives on your Mac using MacPacker.',
  },
  {
    slug: 'password-protect-zip',
    title: 'How to Password Protect ZIP Files on Mac',
    description: 'Learn 3 ways to password protect ZIP files on Mac: Terminal, MacPacker, or Disk Utility.',
  },
]

function DocsIndex(): ReactElement {
  const localizedPath = useLocalizedPath()

  useDocMeta({
    title: 'Documentation',
    description: 'MacPacker documentation — guides for extracting and managing archive files on macOS.',
  })

  return (
    <>
      <Header />
      <div className='w-full max-w-3xl mx-auto px-4 mt-24 mb-20'>
        <h1 className='text-3xl font-bold text-gray-950 mb-2'>Documentation</h1>
        <p className='text-gray-600 mb-8'>Guides for extracting and managing archive files on macOS.</p>
        <div className='space-y-4'>
          {docs.map((doc) => (
            <Link
              key={doc.slug}
              href={localizedPath(`/docs/${doc.slug}`)}
              className='block rounded-lg border border-gray-200 p-4 hover:border-gray-400 hover:bg-gray-50 transition-colors'
            >
              <h2 className='text-lg font-semibold text-gray-900'>{doc.title}</h2>
              <p className='text-sm text-gray-600 mt-1'>{doc.description}</p>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </>
  )
}

export { DocsIndex }
