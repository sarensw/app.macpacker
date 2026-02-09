import type { ReactElement, ReactNode } from 'react'
import { useEffect } from 'react'
import { useParams, useLocation } from 'wouter'
import i18n from '@/i18n/config'
import { supportedLanguages, fallbackLanguage } from '@/i18n/config'

interface LanguageRouteProps {
  children: ReactNode
}

function LanguageRoute({ children }: LanguageRouteProps): ReactElement | null {
  const params = useParams<{ lang: string }>()
  const [location, setLocation] = useLocation()

  const lang = params.lang

  useEffect(() => {
    if (!lang) return

    if (!(supportedLanguages as readonly string[]).includes(lang)) {
      // Invalid language code — redirect to fallback with same path
      const rest = location.replace(/^\/[^/]+/, '')
      setLocation(`/${fallbackLanguage}${rest || '/'}`, { replace: true })
      return
    }

    if (i18n.language !== lang) {
      void i18n.changeLanguage(lang)
    }
  }, [lang, location, setLocation])

  if (!lang || !(supportedLanguages as readonly string[]).includes(lang)) {
    return null
  }

  return <>{children}</>
}

export { LanguageRoute }
