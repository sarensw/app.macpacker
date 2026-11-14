// The app's languages, each named in itself: the one list the site states them from
// (home spec sheet and count, JSON-LD, llms.txt). Sync it when the app gains a
// language; a test holds the counts written in the translations to its length.
// Catalan takes Andorra's flag (there is no Catalonia emoji); Traditional Chinese
// is the app's zh-TW.
export const appLanguages = [
  ["en", "🇺🇸", "English"],
  ["ar", "🇸🇦", "العربية"],
  ["ca", "🇦🇩", "Català"],
  ["de", "🇩🇪", "Deutsch"],
  ["el", "🇬🇷", "Ελληνικά"],
  ["es-MX", "🇲🇽", "Español (México)"],
  ["fa", "🇮🇷", "فارسی"],
  ["fr", "🇫🇷", "Français"],
  ["hi", "🇮🇳", "हिन्दी"],
  ["it", "🇮🇹", "Italiano"],
  ["ja", "🇯🇵", "日本語"],
  ["ko", "🇰🇷", "한국어"],
  ["nl", "🇳🇱", "Nederlands"],
  ["no", "🇳🇴", "Norsk"],
  ["pl", "🇵🇱", "Polski"],
  ["pt-BR", "🇧🇷", "Português (Brasil)"],
  ["ru", "🇷🇺", "Русский"],
  ["tr", "🇹🇷", "Türkçe"],
  ["uk", "🇺🇦", "Українська"],
  ["vi", "🇻🇳", "Tiếng Việt"],
  ["zh-Hans", "🇨🇳", "简体中文"],
  ["zh-Hant-TW", "🇹🇼", "繁體中文"],
] as const;
