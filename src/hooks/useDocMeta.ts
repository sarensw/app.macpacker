import { useEffect } from 'react'

interface DocMetaOptions {
  title: string
  description: string
}

/**
 * Sets document title and meta description for a docs page.
 * Restores defaults on unmount.
 */
function useDocMeta({ title, description }: DocMetaOptions) {
  useEffect(() => {
    const prevTitle = document.title

    if (title) {
      document.title = `${title} — MacPacker`
    }

    let metaDesc = document.querySelector('meta[name="description"]')
    const prevDescription = metaDesc?.getAttribute('content') ?? ''

    if (description) {
      if (!metaDesc) {
        metaDesc = document.createElement('meta')
        metaDesc.setAttribute('name', 'description')
        document.head.appendChild(metaDesc)
      }
      metaDesc.setAttribute('content', description)
    }

    return () => {
      document.title = prevTitle
      if (metaDesc) {
        metaDesc.setAttribute('content', prevDescription)
      }
    }
  }, [title, description])
}

export { useDocMeta }
