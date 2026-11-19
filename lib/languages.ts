// The app's languages, each named in itself: the language list, its count, the
// JSON-LD and llms.txt all come from here, so adding one is a single line.
// Catalan takes Andorra's flag (there is no Catalonia emoji); Traditional
// Chinese is the app's zh-TW.
export const LANGUAGES = [
  ["en", "🇺🇸", "English"],
  ["ar", "🇸🇦", "العربية"],
  ["ca", "🇦🇩", "Català"],
  ["cs", "🇨🇿", "Čeština"],
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
