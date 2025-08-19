import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#ffffff",
};

export const metadata: Metadata = {
  title: "보험스토어 | 연금보험, 종신보험, 저축보험 비교 및 상담",
  description: "연금보험, 종신보험, 저축보험 비교 및 전문 상담 플랫폼",
  keywords: "보험, 보험비교, 보험상담, 맞춤형보험, 온라인보험, 보험가입, 보험추천, 연금보험, 변액연금보험, 확정형연금보험, 보증형연금보험, 8%연금보험, 7%연금보험, 고이율연금보험, 세제혜택연금보험, 단기납연금보험, 종신보험, 고환급종신보험, 저해지환급형종신보험, 간편가입종신보험, 단기납종신보험, 10년환급형종신보험, 15년환급형종신보험, 저축보험, 고이율저축보험, 세제혜택저축보험, 변액저축보험, 해약환급금, 환급률, 보험환급률, 납입기간, 납입완료보너스, 장기유지보너스, 암보험, 유사암보험, 고진단비암보험, 무해지암보험, 치매보험, 간병보험, 노후간병보험, 어린이보험, 태아보험, 자녀보험, 생명보험, 손해보험, 변액보험, 재테크보험, 노후대비보험, 절세보험",
  authors: [{ name: "보험스토어" }],
  creator: "보험스토어",
  publisher: "보험스토어",
  robots: "index, follow",
      openGraph: {
      title: "보험스토어 | Bohumstore",
      description: "연금보험, 종신보험, 저축보험 비교 및 상담",
    url: "https://bohumstore.net",
    siteName: "보험스토어",
          images: [
        {
          url: "https://bohumstore.net/kakao-img.png",
          width: 1000,
          height: 500,
          alt: "보험스토어 - 연금보험, 종신보험, 저축보험 비교 및 상담",
        },
      ],
    type: "website",
    locale: "ko_KR",
  },
  twitter: {
    card: "summary_large_image",
    title: "보험스토어 | Bohumstore",
    description: "연금보험, 종신보험, 저축보험 비교 및 상담",
    images: ["https://bohumstore.net/kakao-img.png"],
  },
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
  },
  alternates: {
    canonical: "https://bohumstore.net",
  },
  category: "insurance",
  classification: "insurance comparison platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="보험스토어" />
        
        {/* 파비콘 설정 - 네이버 파워링크 광고용 */}
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="48x48" href="/favicon-48x48.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="shortcut icon" href="/favicon.ico" />
        
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
