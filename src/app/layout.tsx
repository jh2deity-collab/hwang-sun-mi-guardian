import type { Metadata } from "next";
import { Noto_Serif_KR, Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import Analytics from "@/components/Analytics";

const notoSerif = Noto_Serif_KR({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-serif",
});

const notoSans = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "황선미 가디언 | 상위 1% 재무 전략 및 자산 관리 전문가 (MDRT)",
  description: "글로벌 금융 시장의 통찰과 MDRT 백만 달러 원탁 회의 정회원의 전문성으로 당신의 자산 가치를 완벽히 호위합니다. 상속, 증여, 은퇴 설계 및 CEO 리스크 관리 전문.",
  keywords: ["황선미", "재무설계사", "MDRT", "자산관리전문가", "상속세절세", "증여세계산", "은퇴설계", "CEO리스크관리", "가업승계"],
  authors: [{ name: "황선미", url: "https://hwang-sun-mi.guardian" }],
  creator: "황선미",
  publisher: "Wealth Guardian",
  openGraph: {
    title: "황선미 가디언 | The Premier Financial Wealth Guardian",
    description: "글로벌 상위 1%의 전문성으로 당신의 삶에 압도적 가치를 설계합니다.",
    url: "https://hwang-sun-mi.guardian",
    siteName: "황선미 공식 웹사이트",
    images: [
      {
        url: "/images/hsm_profile_v8.jpg",
        width: 1200,
        height: 630,
        alt: "황선미 전문가 프로필",
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "황선미 가디언 | Wealth Guardian",
    description: "당신의 자산 가치를 지키는 가장 든든한 파트너.",
    images: ["/images/hsm_profile_v8.jpg"],
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
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FinancialService",
    "name": "황선미 재무설계",
    "description": "재무 설계, 자산 관리, 상속 및 증여 전문 서비스",
    "url": "https://hwang-sun-mi.guardian",
    "telephone": "010-8673-4589",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Seoul",
      "addressCountry": "KR"
    },
    "founder": {
      "@type": "Person",
      "name": "황선미",
      "jobTitle": "Wealth Advisor",
      "honorificPrefix": "MDRT"
    }
  };

  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          as="style"
          crossOrigin=""
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.css"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${notoSerif.variable} ${notoSans.variable} font-sans antialiased bg-[#fdfdfd]`}>
        <Analytics />
        {children}
      </body>
    </html>
  );
}
