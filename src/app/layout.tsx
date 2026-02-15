import type { Metadata } from "next";
import { Noto_Serif_KR, Noto_Sans_KR } from "next/font/google";
import "./globals.css";

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
  title: "황선미: The Premier Financial Guardian | MDRT 백만 달러 원탁 회의",
  description: "당신의 삶, 그 이상의 가치를 설계합니다. MDRT 회원 재무 설계사 황선미 공식 웹사이트.",
  keywords: ["재무설계", "MDRT", "자산관리", "상속", "증여", "은퇴설계", "황선미"],
  openGraph: {
    title: "황선미: The Premier Financial Guardian",
    description: "당신의 삶, 그 이상의 가치를 설계합니다.",
    url: "https://hwang-sun-mi.guardian",
    siteName: "황선미 가디언",
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "황선미: The Premier Financial Guardian",
    description: "당신의 삶, 그 이상의 가치를 설계합니다.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          as="style"
          crossOrigin=""
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.css"
        />
      </head>
      <body className={`${notoSerif.variable} ${notoSans.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
