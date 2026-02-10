import { supportedLanguages, fallbackLanguage } from './config'
import type { SupportedLanguage } from './config'

function detectBrowserLanguage(): SupportedLanguage {
  const browserLangs = navigator.languages ?? [navigator.language]
  for (const lang of browserLangs) {
    const normalized = lang.trim()
    // Exact match first (e.g. zh, en)
    if ((supportedLanguages as readonly string[]).includes(normalized)) {
      return normalized as SupportedLanguage
    }
    // Try base language (e.g. "zh-CN" → "zh")
    const base = normalized.split('-')[0]
    if ((supportedLanguages as readonly string[]).includes(base)) {
      return base as SupportedLanguage
    }
  }
  return fallbackLanguage
}

export { detectBrowserLanguage }
