import type { ReactElement } from 'react'
import { useState, useEffect } from 'react'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

function Imprint (): ReactElement {
  const [content, setContent] = useState<string>('')

  const renderers = {
    img: ({
      alt,
      src,
      title
    }: {
      alt?: string
      src?: string
      title?: string
    }) => (
      <img
        alt={alt}
        src={src}
        title={title}
        style={{ maxWidth: '25%', height: 'auto' }}
      />
    )
  }

  useEffect(() => {
    const loadPrivacy = async (): Promise<void> => {
      await fetch('/markdown/imprint.md')
        .then(async (response) => await response.text())
        .then((text) => {
          setContent(text)
        })
    }

    loadPrivacy()
      .catch(console.error)
  }, [])

  return (
    <>
      <Header />
      <article className='prose prose-zinc prose-sm mx-auto mt-24 p-4'>
        <Markdown remarkPlugins={[remarkGfm]} components={renderers}>{content}</Markdown>
      </article>
      <Footer />
    </>
  )
}

export { Imprint }
