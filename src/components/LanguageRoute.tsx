import type { ReactElement, ReactNode } from 'react'
import { useEffect } from 'react'
import i18n from '@/i18n/config'
import type { SupportedLanguage } from '@/i18n/config'
import { useOgImage } from '@/hooks/useOgImage'
import { LanguageContext } from '@/i18n/LanguageContext'

interface LanguageRouteProps {
  lang: SupportedLanguage
  children: ReactNode
}

function LanguageRoute({ lang, children }: LanguageRouteProps): ReactElement {
  useEffect(() => {
    if (i18n.language !== lang) {
      void i18n.changeLanguage(lang)
    }
  }, [lang])

  useOgImage(lang)

  return (
    <LanguageContext.Provider value={lang}>
      {children}
    </LanguageContext.Provider>
  )
}

export { LanguageRoute }
