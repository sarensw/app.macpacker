import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Docs",
  description:
    "Learn how to extract files from every archive and disk image format on macOS. Step-by-step guides for ZIP, RAR, 7z, DMG, ISO, and 25+ more formats.",
};

export default function DocsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
