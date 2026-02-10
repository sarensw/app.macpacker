import { useParams } from 'wouter'
import { fallbackLanguage } from '@/i18n/config'

function useLocalizedPath() {
  const params = useParams<{ lang: string }>()
  const lang = params.lang ?? fallbackLanguage

  return (path: string): string => {
    const cleanPath = path.startsWith('/') ? path : `/${path}`
    return `~/${lang}${cleanPath}`
  }
}

export { useLocalizedPath }
