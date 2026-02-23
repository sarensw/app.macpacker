import { describe, it, expect } from "vitest";
import { getTranslations, locales, isValidLocale, defaultLocale } from "@/lib/i18n";
import en from "@/lib/translations/en.json";
import zh from "@/lib/translations/zh.json";

describe("i18n configuration", () => {
  it("has en and zh locales", () => {
    expect(locales).toContain("en");
    expect(locales).toContain("zh");
    expect(locales).toHaveLength(2);
  });

  it("defaults to en locale", () => {
    expect(defaultLocale).toBe("en");
  });

  it("validates known locales", () => {
    expect(isValidLocale("en")).toBe(true);
    expect(isValidLocale("zh")).toBe(true);
  });

  it("rejects unknown locales", () => {
    expect(isValidLocale("fr")).toBe(false);
    expect(isValidLocale("")).toBe(false);
    expect(isValidLocale("EN")).toBe(false);
  });
});

describe("getTranslations", () => {
  it("loads English translations", async () => {
    const t = await getTranslations("en");
    expect(t.nav.features).toBe("Features");
    expect(t.hero.badge).toContain("open source");
    expect(t.meta.title).toContain("MacPacker");
  });

  it("loads Chinese translations", async () => {
    const t = await getTranslations("zh");
    expect(t.nav.features).toBe("功能");
    expect(t.hero.badge).toContain("免费开源");
    expect(t.meta.title).toContain("MacPacker");
  });

  it("falls back to English for unknown locale", async () => {
    const t = await getTranslations("fr");
    expect(t.nav.features).toBe("Features");
  });
});

describe("translation completeness", () => {
  function getKeys(obj: Record<string, unknown>, prefix = ""): string[] {
    const keys: string[] = [];
    for (const key of Object.keys(obj)) {
      const fullKey = prefix ? `${prefix}.${key}` : key;
      const value = obj[key];
      if (value !== null && typeof value === "object" && !Array.isArray(value)) {
        keys.push(...getKeys(value as Record<string, unknown>, fullKey));
      } else {
        keys.push(fullKey);
      }
    }
    return keys;
  }

  it("zh has all the same keys as en", () => {
    const enKeys = getKeys(en as unknown as Record<string, unknown>);
    const zhKeys = getKeys(zh as unknown as Record<string, unknown>);
    for (const key of enKeys) {
      expect(zhKeys, `Missing key in zh: ${key}`).toContain(key);
    }
  });

  it("en has all the same keys as zh", () => {
    const enKeys = getKeys(en as unknown as Record<string, unknown>);
    const zhKeys = getKeys(zh as unknown as Record<string, unknown>);
    for (const key of zhKeys) {
      expect(enKeys, `Extra key in zh not in en: ${key}`).toContain(key);
    }
  });

  it("no empty translation values in en", () => {
    const check = (obj: Record<string, unknown>, path = "") => {
      for (const [key, value] of Object.entries(obj)) {
        const fullPath = path ? `${path}.${key}` : key;
        if (typeof value === "string") {
          expect(value.trim().length, `Empty value at en.${fullPath}`).toBeGreaterThan(0);
        } else if (value !== null && typeof value === "object" && !Array.isArray(value)) {
          check(value as Record<string, unknown>, fullPath);
        }
      }
    };
    check(en as unknown as Record<string, unknown>);
  });

  it("no empty translation values in zh", () => {
    const check = (obj: Record<string, unknown>, path = "") => {
      for (const [key, value] of Object.entries(obj)) {
        const fullPath = path ? `${path}.${key}` : key;
        if (typeof value === "string") {
          expect(value.trim().length, `Empty value at zh.${fullPath}`).toBeGreaterThan(0);
        } else if (value !== null && typeof value === "object" && !Array.isArray(value)) {
          check(value as Record<string, unknown>, fullPath);
        }
      }
    };
    check(zh as unknown as Record<string, unknown>);
  });
});

describe("translation content", () => {
  it("en meta has required fields", () => {
    expect(en.meta.title).toBeDefined();
    expect(en.meta.description).toBeDefined();
    expect(en.meta.siteName).toBe("MacPacker");
  });

  it("zh meta has required fields", () => {
    expect(zh.meta.title).toBeDefined();
    expect(zh.meta.description).toBeDefined();
    expect(zh.meta.siteName).toBe("MacPacker");
  });

  it("has all 6 feature sections in en", () => {
    expect(en.features.peek.title).toBeDefined();
    expect(en.features.nested.title).toBeDefined();
    expect(en.features.selective.title).toBeDefined();
    expect(en.features.native.title).toBeDefined();
    expect(en.features.quicklook.title).toBeDefined();
    expect(en.features.finder.title).toBeDefined();
  });

  it("has all 3 how-it-works steps in en", () => {
    expect(en.howItWorks.open.title).toBeDefined();
    expect(en.howItWorks.browse.title).toBeDefined();
    expect(en.howItWorks.extract.title).toBeDefined();
  });

  it("has 10 languages listed", () => {
    expect(en.languages.list).toHaveLength(10);
    expect(zh.languages.list).toHaveLength(10);
  });

  it("has 3 blog posts", () => {
    expect(en.blog.posts).toHaveLength(3);
    expect(zh.blog.posts).toHaveLength(3);
  });

  it("has 4 tech strip items", () => {
    expect(en.techStrip.items).toHaveLength(4);
    expect(zh.techStrip.items).toHaveLength(4);
  });

  it("brew command is correct", () => {
    expect(en.hero.brewCommand).toBe("brew install --cask macpacker");
    expect(zh.hero.brewCommand).toBe("brew install --cask macpacker");
  });
});
