import { useEffect } from 'react'
import { useLocation } from 'wouter'
import i18n from '@/i18n/config'
import { detectBrowserLanguage } from '@/i18n/detectLanguage'

function LanguageRedirect() {
  const [, setLocation] = useLocation()

  useEffect(() => {
    const lang = detectBrowserLanguage()
    void i18n.changeLanguage(lang)
    setLocation(`/${lang}/`, { replace: true })
  }, [setLocation])

  return null
}

export { LanguageRedirect }
