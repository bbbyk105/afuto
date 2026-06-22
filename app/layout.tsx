import type { Metadata, Viewport } from "next";
import { Inter, Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StructuredData from "@/components/StructuredData";
import { site } from "@/data/site";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

// Japanese typeface — Noto Sans JP, used across the site (incl. hero).
// 実使用ウェイトのみ読み込む（body=500 / .display=600）。700・800 は未使用。
const notoSansJp = Noto_Sans_JP({
  variable: "--font-noto",
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default:
      "合同会社アフト | IT・オフィス・建設インフラを支えるソリューションパートナー",
    template: "%s | 合同会社アフト",
  },
  description:
    "合同会社アフトは、OA機器・ネットワーク環境・システム構築・建設インフラサポート・流通支援まで、企業の業務効率化とコスト最適化を一貫して支援します。",
  alternates: { canonical: "/" },
  keywords: [
    "合同会社アフト",
    "Aft LLC",
    "OA機器",
    "ネットワーク構築",
    "ITソリューション",
    "オフィス環境",
    "建設インフラ",
    "神奈川",
    "横浜",
    "全省庁統一資格",
  ],
  authors: [{ name: "合同会社アフト" }],
  openGraph: {
    type: "website",
    locale: "ja_JP",
    siteName: "合同会社アフト",
    title:
      "合同会社アフト | IT・オフィス・建設インフラを支えるソリューションパートナー",
    description:
      "企業のオフィス環境とITインフラの最適化を支援するソリューションプロバイダー。OA機器・ネットワーク・システム構築・建設インフラ・流通までを一気通貫で支援します。",
    url: site.url,
  },
  twitter: {
    card: "summary_large_image",
    title: "合同会社アフト | 事業を支える、見えないインフラを整える。",
    description:
      "IT・オフィス・設備・施工・流通まで。事業の裏側を支える環境づくりを一気通貫で支援します。",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0b1f33",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja" className={`${inter.variable} ${notoSansJp.variable} h-full`}>
      <body className="min-h-full antialiased">
        <StructuredData />
        <SmoothScroll>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-100 focus:rounded-full focus:bg-navy focus:px-5 focus:py-2 focus:text-white"
          >
            本文へスキップ
          </a>
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
