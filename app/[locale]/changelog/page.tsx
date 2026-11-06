import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { isValidLocale, getTranslations } from "@/lib/i18n";
import { getReleaseData } from "@/lib/release";
import { pageMetadata } from "@/lib/seo";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChangelogRail from "@/sections/home/ChangelogRail";

export const revalidate = 3600;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const t = await getTranslations(locale);

  return pageMetadata({
    locale,
    path: "/changelog",
    title: t.changelog.metaTitle,
    description: t.changelog.metaDescription,
  });
}

// Every release, from the same changelog the app's updater reads.
export default async function ChangelogPage({
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
      <Header locale={locale} t={t} />
      <main id="main-content" className="max-w-[880px] mx-auto px-6 max-md:px-5 py-16 max-md:py-12">
        <ChangelogRail locale={locale} t={t} releases={release.releases} comingNext={release.comingNext} />
      </main>
      <Footer locale={locale} t={t} />
    </>
  );
}
