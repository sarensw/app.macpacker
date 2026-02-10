import { fallbackLanguage } from '@/i18n/config'
import { useCurrentLanguage } from '@/i18n/LanguageContext'

function useLocalizedPath() {
  const lang = useCurrentLanguage()

  return (path: string): string => {
    const cleanPath = path.startsWith('/') ? path : `/${path}`
    if (lang === fallbackLanguage) {
      return `~${cleanPath}`
    }
    return `~/${lang}${cleanPath}`
  }
}

export { useLocalizedPath }
