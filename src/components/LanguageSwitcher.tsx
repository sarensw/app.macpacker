import type { ReactElement } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'wouter'
import { fallbackLanguage } from '@/i18n/config'
import type { SupportedLanguage } from '@/i18n/config'
import { languages } from '@/i18n/languages'
import { useCurrentLanguage } from '@/i18n/LanguageContext'

function LanguageSwitcher (): ReactElement {
  const { i18n } = useTranslation()
  const [location, setLocation] = useLocation()
  const currentLang = useCurrentLanguage()

  function handleLanguageChange (targetLang: SupportedLanguage): void {
    void i18n.changeLanguage(targetLang)

    // location is the current subpath within the route context
    const subpath = location && location !== '/' ? location : ''

    if (targetLang === fallbackLanguage) {
      // Navigate to root-level English path
      setLocation(`~${subpath || '/'}`)
    } else {
      // Navigate to language-prefixed path
      setLocation(`~/${targetLang}${subpath || '/'}`)
    }
  }

  return (
    <nav aria-label='Language switcher'>
      <div className='flex flex-row items-center space-x-1'>
        {languages.map((lang) => {
          const isActive = currentLang === lang.code
          return (
            <button
              key={lang.code}
              type='button'
              aria-current={isActive ? 'true' : undefined}
              aria-label={isActive ? `${lang.name} (current language)` : `Switch to ${lang.name}`}
              onClick={() => { handleLanguageChange(lang.code) }}
              className={`
                px-2 py-1 md:px-3 md:py-2
                text-xs md:text-sm font-medium
                rounded-md
                transition-colors duration-150
                focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-400
                ${isActive
                  ? 'bg-gray-800 text-white hover:bg-gray-700'
                  : 'text-gray-600 hover:bg-gray-100'
                }
              `}
            >
              {lang.label}
            </button>
          )
        })}
      </div>
    </nav>
  )
}

export { LanguageSwitcher }
