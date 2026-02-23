import Link from "next/link";
import { notFound } from "next/navigation";
import { isValidLocale } from "@/lib/i18n";

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  const isZh = locale === "zh";

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-100 px-12 h-15 flex items-center justify-between bg-[rgba(250,250,248,0.85)] backdrop-blur-[20px] backdrop-saturate-[1.3] border-b border-border max-md:px-5">
        <div className="flex items-center gap-2.5">
          <Link href={`/${locale}`} className="no-underline flex items-center gap-2.5">
            <div className="w-[26px] h-[26px] bg-gradient-to-br from-accent to-[#C06830] rounded-[6px] flex items-center justify-center font-bold text-[13px] text-white">M</div>
            <span className="text-base font-bold text-text tracking-[-0.02em]">MacPacker</span>
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/sarensw/MacPacker"
            className="flex items-center justify-center min-w-[44px] min-h-[44px] text-[13px] font-semibold text-text-secondary no-underline transition-colors hover:text-text"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </div>
      </nav>

      <main>
        <section className="min-h-0 flex flex-col items-start text-left pt-30 px-6 pb-20 max-w-[720px] mx-auto">
          <h1 className="section-title mb-6">
            {isZh ? "隐私政策" : "Privacy Policy"}
          </h1>

          <p className="text-text-secondary leading-[1.7] mb-5 text-[15px]">
            {isZh
              ? "MacPacker 尊重您的隐私。本应用不收集、存储或传输任何个人数据。"
              : "MacPacker respects your privacy. The app does not collect, store, or transmit any personal data."}
          </p>

          <h2 className="text-xl font-bold mb-3 mt-8">
            {isZh ? "数据收集" : "Data Collection"}
          </h2>
          <p className="text-text-secondary leading-[1.7] mb-5 text-[15px]">
            {isZh
              ? "MacPacker 完全在您的设备本地运行。不会向任何服务器发送数据。没有分析工具、没有追踪器、没有遥测数据。"
              : "MacPacker runs entirely on your local device. No data is sent to any server. There are no analytics, no trackers, and no telemetry."}
          </p>

          <h2 className="text-xl font-bold mb-3 mt-8">
            {isZh ? "文件访问" : "File Access"}
          </h2>
          <p className="text-text-secondary leading-[1.7] mb-5 text-[15px]">
            {isZh
              ? "MacPacker 仅在您明确打开文件时访问您选择的文件。应用在 macOS 沙盒环境中运行，不会在您的操作范围之外访问任何文件。"
              : "MacPacker only accesses files that you explicitly open. The app runs in a macOS sandbox and does not access files beyond what you interact with."}
          </p>

          <h2 className="text-xl font-bold mb-3 mt-8">
            {isZh ? "联系方式" : "Contact"}
          </h2>
          <p className="text-text-secondary leading-[1.7] mb-5 text-[15px]">
            {isZh ? "如有疑问，请通过 " : "For questions, reach out via "}
            <a href="https://github.com/sarensw/MacPacker/issues" className="text-accent no-underline font-semibold">
              GitHub Issues
            </a>
            {isZh ? "。" : "."}
          </p>

          <div className="mt-10">
            <Link href={`/${locale}`} className="btn-outline">
              ← {isZh ? "返回首页" : "Back to home"}
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
