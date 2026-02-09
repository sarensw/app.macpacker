import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

export const supportedLanguages = ['en', 'de', 'zh-Hans'] as const
export type SupportedLanguage = (typeof supportedLanguages)[number]
export const fallbackLanguage: SupportedLanguage = 'en'

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    supportedLngs: supportedLanguages,
    fallbackLng: fallbackLanguage,
    detection: {
      order: ['navigator'],
    },
    interpolation: {
      escapeValue: false,
    },
    resources: {},
  })

export default i18n
