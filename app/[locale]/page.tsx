import { notFound } from "next/navigation";
import { isValidLocale, getTranslations } from "@/lib/i18n";
import { getReleaseData } from "@/lib/release";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/sections/home/Hero";
import Proof from "@/sections/home/Proof";
import Love from "@/sections/home/Love";
import Features from "@/sections/home/Features";
import OpenSource from "@/sections/home/OpenSource";
import Specs from "@/sections/home/Specs";
import Faq from "@/sections/home/Faq";
import GetBand from "@/sections/home/GetBand";

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

      <Header locale={locale} t={t} />

      <main id="main-content" className="b-page">
        <Hero
          locale={locale}
          t={t}
          version={release.latestVersion}
          dmgUrl={release.latestDmgUrl}
          zipUrl={release.latestZipUrl}
        />
        <Proof locale={locale} t={t} />
        <Love locale={locale} t={t} />
        <Features locale={locale} t={t} />
        <OpenSource t={t} />
        <Specs locale={locale} t={t} />
        <Faq t={t} />
        <GetBand locale={locale} t={t} dmgUrl={release.latestDmgUrl} zipUrl={release.latestZipUrl} />
      </main>

      <Footer locale={locale} t={t} />
    </>
  );
}
