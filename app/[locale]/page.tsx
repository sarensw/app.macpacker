import { notFound } from "next/navigation";
import { isValidLocale, getTranslations } from "@/lib/i18n";
import { getReleaseData } from "@/lib/release";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/sections/home/Hero";
import FeatureStrip from "@/sections/home/FeatureStrip";
import FormatsChips from "@/sections/home/FormatsChips";
import OpenSourceLine from "@/sections/home/OpenSourceLine";
import TranslationsLine from "@/sections/home/TranslationsLine";
import ChangelogRail from "@/sections/home/ChangelogRail";

export const revalidate = 3600;

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  const t = await getTranslations(locale);
  const release = await getReleaseData(locale);

  return (
    <>
      <a href="#main-content" className="skip-link">
        {locale === "zh" ? "跳到主要内容" : "Skip to main content"}
      </a>

      <Header locale={locale} t={t} downloadUrl={release.latestDmgUrl} />

      <main id="main-content" className="max-w-[1120px] mx-auto px-6 max-md:px-5">
        <Hero
          locale={locale}
          t={t}
          latestVersion={release.latestVersion}
          latestDmgUrl={release.latestDmgUrl}
          latestZipUrl={release.latestZipUrl}
        />
        <FeatureStrip t={t} />
        <FormatsChips locale={locale} t={t} />
        <OpenSourceLine t={t} />
        <TranslationsLine t={t} />
        <ChangelogRail
          locale={locale}
          t={t}
          releases={release.releases}
          comingNext={release.comingNext}
        />
      </main>

      <Footer locale={locale} t={t} />
    </>
  );
}
