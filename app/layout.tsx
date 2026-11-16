import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { FoldersProvider } from "@/components/FoldersProvider";
import { LinksProvider } from "@/components/LinksProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteName = "한입 링크";
const siteDescription = "링크를 폴더별로 한입에 모아 관리하는 북마크 서비스";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ),
  title: { default: siteName, template: `%s | ${siteName}` },
  description: siteDescription,
  // app/favicon.ico 는 파일 컨벤션으로 자동 적용됩니다.
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName,
    title: siteName,
    description: siteDescription,
    images: [
      { url: "/thumbnail.png", width: 2400, height: 1260, alt: siteName },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description: siteDescription,
    images: ["/thumbnail.png"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ko"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col"><FoldersProvider>
          <LinksProvider>{children}</LinksProvider>
        </FoldersProvider></body>
    </html>
  );
}
