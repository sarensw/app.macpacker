import en from "./translations/en.json";

export const locales = ["en", "zh"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export type Translations = typeof en;

export function isValidLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export async function getTranslations(locale: Locale): Promise<Translations> {
  switch (locale) {
    case "zh":
      return (await import("./translations/zh.json")).default;
    case "en":
    default:
      return (await import("./translations/en.json")).default;
  }
}
