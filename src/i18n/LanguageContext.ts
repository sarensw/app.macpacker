import { createContext, useContext } from 'react'
import { fallbackLanguage } from './config'
import type { SupportedLanguage } from './config'

const LanguageContext = createContext<SupportedLanguage>(fallbackLanguage)

function useCurrentLanguage(): SupportedLanguage {
  return useContext(LanguageContext)
}

export { LanguageContext, useCurrentLanguage }
