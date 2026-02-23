import Link from "next/link";

export default function NotFound() {
  return (
    <html lang="en">
      <body className="font-sans bg-bg text-text antialiased">
        <main>
          <section className="min-h-[80vh] flex flex-col items-center justify-center text-center px-6">
            <h1 className="text-[clamp(44px,6.5vw,80px)] font-bold tracking-[-0.035em]">
              404
            </h1>
            <p className="mt-4 text-[17px] leading-[1.65] text-text-secondary max-w-[480px]">
              This page doesn&apos;t exist.
            </p>
            <div className="mt-8">
              <Link href="/en" className="btn-primary">
                Go to homepage
              </Link>
            </div>
          </section>
        </main>
      </body>
    </html>
  );
}
