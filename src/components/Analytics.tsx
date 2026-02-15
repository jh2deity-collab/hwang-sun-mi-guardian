"use client";

import Script from "next/script";

const Analytics = () => {
    // 실제 서비스 시 Google Analytics 4 (GA4) ID 또는 GTM ID로 교체 필요
    const GA_TRACKING_ID = "G-XXXXXXXXXX";

    return (
        <>
            <Script
                strategy="afterInteractive"
                src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
            />
            <Script
                id="gtag-init"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
                }}
            />
        </>
    );
};

export default Analytics;
