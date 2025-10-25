import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from 'next/script';
import "./globals.css";
import { Header } from "@/components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    default: '無料MBTI診断 | 就活・キャリア選択に役立つ性格診断',
    template: '%s | 無料MBTI診断',
  },
  description: '【完全無料】科学的根拠に基づくMBTI性格診断。就活での自己分析、適職診断、キャリア選択に最適。30問の質問で16タイプを判定し、あなたの強みと適性を詳しく解説。高校生から社会人まで、自己理解を深めたい全ての方へ。',
  keywords: [
    '無料MBTI診断',
    'MBTI診断',
    'MBTI',
    '無料',
    '性格診断',
    '自己分析',
    '就活',
    '適職診断',
    'キャリア選択',
    '16タイプ',
    '高校生',
    '就職活動',
    '自己理解',
    '強み診断',
    'INTJ',
    'ENFP',
    'INFP',
    'ENTJ',
    'INTP',
    'ENTP',
    'INFJ',
    'ENFJ',
    'ISTJ',
    'ISFJ',
    'ESTJ',
    'ESFJ',
    'ISTP',
    'ISFP',
    'ESTP',
    'ESFP',
  ],
  authors: [{ name: '株式会社ゆめスタ', url: 'https://yumesuta.com' }],
  creator: '株式会社ゆめスタ',
  publisher: '株式会社ゆめスタ',
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    siteName: '無料MBTI診断',
    title: '無料MBTI診断 | 就活・キャリア選択に役立つ性格診断',
    description: '【完全無料】就活での自己分析、適職診断に最適なMBTI性格診断。30問の質問で16タイプを判定し、あなたの強みを発見。',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: '無料MBTI診断 - 就活・キャリア選択に役立つ性格診断',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '無料MBTI診断 | 就活・キャリア選択に役立つ性格診断',
    description: '【完全無料】就活での自己分析、適職診断に最適。30問で16タイプを判定',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  const gscVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;

  return (
    <html lang="ja">
      <head>
        {/* Google Search Console Verification */}
        {gscVerification && (
          <meta name="google-site-verification" content={gscVerification} />
        )}

        {/* Google Analytics */}
        {gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}');
              `}
            </Script>
          </>
        )}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
