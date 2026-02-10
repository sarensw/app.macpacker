import { useEffect } from 'react'

interface DocMetaOptions {
  title: string
  description: string
  lang?: string
  slug?: string
}

const BASE_URL = 'https://macpacker.app'

/**
 * Sets document title, meta description, OG tags, canonical URL, and hreflang
 * tags for a docs page. Restores defaults on unmount.
 */
function useDocMeta({ title, description, lang, slug }: DocMetaOptions) {
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

    // Update OG tags
    const fullTitle = title ? `${title} — MacPacker` : ''
    setMetaTag('property', 'og:title', fullTitle)
    setMetaTag('property', 'og:description', description)
    setMetaTag('name', 'twitter:title', fullTitle)
    setMetaTag('name', 'twitter:description', description)

    // Canonical and hreflang for doc pages
    const addedElements: Element[] = []

    if (lang && slug) {
      // English pages at root, Chinese under /zh
      const langPrefix = lang === 'en' ? '' : `/${lang}`
      const canonicalUrl = `${BASE_URL}${langPrefix}/docs/${slug}`
      setMetaTag('property', 'og:url', canonicalUrl)

      const canonical = ensureLinkTag('canonical')
      canonical.setAttribute('href', canonicalUrl)
      addedElements.push(canonical)

      // Hreflang tags for all language versions
      const languages = ['en', 'zh']
      for (const hrefLang of languages) {
        const hrefPrefix = hrefLang === 'en' ? '' : `/${hrefLang}`
        const link = document.createElement('link')
        link.setAttribute('rel', 'alternate')
        link.setAttribute('hreflang', hrefLang === 'zh' ? 'zh-Hans' : hrefLang)
        link.setAttribute('href', `${BASE_URL}${hrefPrefix}/docs/${slug}`)
        link.setAttribute('data-doc-meta', 'true')
        document.head.appendChild(link)
        addedElements.push(link)
      }

      // x-default
      const xDefault = document.createElement('link')
      xDefault.setAttribute('rel', 'alternate')
      xDefault.setAttribute('hreflang', 'x-default')
      xDefault.setAttribute('href', `${BASE_URL}/docs/${slug}`)
      xDefault.setAttribute('data-doc-meta', 'true')
      document.head.appendChild(xDefault)
      addedElements.push(xDefault)
    }

    return () => {
      document.title = prevTitle
      if (metaDesc) {
        metaDesc.setAttribute('content', prevDescription)
      }
      // Remove dynamically added link tags
      for (const el of addedElements) {
        el.remove()
      }
    }
  }, [title, description, lang, slug])
}

function setMetaTag(attr: 'property' | 'name', key: string, value: string) {
  const el = document.querySelector(`meta[${attr}="${key}"]`)
  if (el && value) {
    el.setAttribute('content', value)
  }
}

function ensureLinkTag(rel: string): HTMLLinkElement {
  let link = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null
  if (!link) {
    link = document.createElement('link')
    link.setAttribute('rel', rel)
    document.head.appendChild(link)
  }
  return link
}

export { useDocMeta }
