import { useEffect } from 'react'
import type { SupportedLanguage } from '@/i18n/config'

const BASE_URL = 'https://macpacker.app'

const ogImageAlt: Record<SupportedLanguage, string> = {
  en: 'MacPacker archive manager for macOS showing nested archive preview',
  de: 'MacPacker Archivmanager für macOS mit verschachtelter Archivvorschau',
  zh: 'MacPacker macOS 归档管理器显示嵌套归档预览',
}

const ogLocale: Record<SupportedLanguage, string> = {
  en: 'en_US',
  de: 'de_DE',
  zh: 'zh_CN',
}

/**
 * Updates OG image meta tags based on the current language.
 * Sets og:image, og:image:alt, og:image:width, og:image:height, og:image:type,
 * og:locale, and twitter:image to the language-specific OG image.
 * Restores defaults on unmount.
 */
function useOgImage(lang: SupportedLanguage) {
  useEffect(() => {
    const imageUrl = `${BASE_URL}/media-kit/social/og-image-${lang}.png`
    const altText = ogImageAlt[lang]
    const locale = ogLocale[lang]

    // Store previous values for restoration
    const prevOgImage = getMetaContent('property', 'og:image')
    const prevTwitterImage = getMetaContent('name', 'twitter:image')
    const prevOgLocale = getMetaContent('property', 'og:locale')

    // Set language-specific OG image
    setMetaTag('property', 'og:image', imageUrl)
    setMetaTag('name', 'twitter:image', imageUrl)
    setMetaTag('property', 'og:locale', locale)

    // Add og:image metadata tags (create if missing)
    const addedTags = ensureMetaTags([
      { attr: 'property', key: 'og:image:alt', value: altText },
      { attr: 'property', key: 'og:image:width', value: '1200' },
      { attr: 'property', key: 'og:image:height', value: '630' },
      { attr: 'property', key: 'og:image:type', value: 'image/png' },
    ])

    return () => {
      // Restore previous values
      if (prevOgImage) setMetaTag('property', 'og:image', prevOgImage)
      if (prevTwitterImage) setMetaTag('name', 'twitter:image', prevTwitterImage)
      if (prevOgLocale) setMetaTag('property', 'og:locale', prevOgLocale)

      // Remove dynamically added meta tags
      for (const el of addedTags) {
        el.remove()
      }
    }
  }, [lang])
}

function getMetaContent(attr: string, key: string): string | null {
  const el = document.querySelector(`meta[${attr}="${key}"]`)
  return el?.getAttribute('content') ?? null
}

function setMetaTag(attr: string, key: string, value: string) {
  let el = document.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', value)
}

interface MetaTagDef {
  attr: string
  key: string
  value: string
}

function ensureMetaTags(defs: MetaTagDef[]): Element[] {
  const created: Element[] = []
  for (const { attr, key, value } of defs) {
    let el = document.querySelector(`meta[${attr}="${key}"]`)
    if (!el) {
      el = document.createElement('meta')
      el.setAttribute(attr, key)
      document.head.appendChild(el)
      created.push(el)
    }
    el.setAttribute('content', value)
  }
  return created
}

export { useOgImage, ogImageAlt, ogLocale }
