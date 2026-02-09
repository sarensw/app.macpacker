import { useEffect, useState } from 'react'
import { useLocation } from 'wouter'
import i18n from '@/i18n/config'
import { fallbackLanguage } from '@/i18n/config'
import { detectBrowserLanguage } from '@/i18n/detectLanguage'
import { useOgImage } from '@/hooks/useOgImage'
import { Home } from '@/pages/home'

function LanguageRedirect() {
  const [, setLocation] = useLocation()
  const [showHome, setShowHome] = useState(false)

  useOgImage(fallbackLanguage)

  useEffect(() => {
    const lang = detectBrowserLanguage()
    void i18n.changeLanguage(lang)

    if (lang === fallbackLanguage) {
      // English users stay at / and see English content directly
      setShowHome(true)
    } else {
      // Non-English users redirect to their language prefix
      setLocation(`/${lang}/`, { replace: true })
    }
  }, [setLocation])

  if (!showHome) return null

  return <Home />
}

export { LanguageRedirect }
