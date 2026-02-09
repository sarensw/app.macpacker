import { supportedLanguages, fallbackLanguage } from './config'
import type { SupportedLanguage } from './config'

function detectBrowserLanguage(): SupportedLanguage {
  const browserLangs = navigator.languages ?? [navigator.language]
  for (const lang of browserLangs) {
    const normalized = lang.trim()
    // Exact match first (e.g. zh-Hans)
    if ((supportedLanguages as readonly string[]).includes(normalized)) {
      return normalized as SupportedLanguage
    }
    // Try base language (e.g. "de-DE" → "de")
    const base = normalized.split('-')[0]
    if ((supportedLanguages as readonly string[]).includes(base)) {
      return base as SupportedLanguage
    }
    // Special case: zh → zh-Hans
    if (base === 'zh') {
      return 'zh-Hans'
    }
  }
  return fallbackLanguage
}

export { detectBrowserLanguage }
