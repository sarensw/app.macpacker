import type { SupportedLanguage } from './config'

interface LanguageOption {
  code: SupportedLanguage
  label: string
  name: string
}

const languages: LanguageOption[] = [
  { code: 'en', label: 'EN', name: 'English' },
  { code: 'de', label: 'DE', name: 'German' },
  { code: 'zh', label: '中文', name: 'Chinese' },
]

export { languages }
export type { LanguageOption }
