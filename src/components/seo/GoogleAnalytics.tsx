'use client';

import Script from 'next/script';
import { analyticsConfig, siteConfig } from '@/config';

/**
 * Google Analytics (GA4) Component
 * 
 * Loads gtag.js only when analytics is enabled in siteConfig.
 * Replace the measurementId placeholder in site.config.ts with your GA4 ID.
 */
export function GoogleAnalytics() {
  const { measurementId } = analyticsConfig.googleAnalytics;
  
  // Don't render if analytics is disabled or ID is still placeholder
  if (!siteConfig.features.enableAnalytics || measurementId === 'G-XXXXXXXXXX') {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${measurementId}', {
            page_title: document.title,
            send_page_view: true,
          });
        `}
      </Script>
    </>
  );
}

/**
 * Microsoft Clarity Component (Heatmaps & Session Recordings)
 */
export function MicrosoftClarity() {
  const { projectId } = analyticsConfig.clarity;
  
  if (!siteConfig.features.enableAnalytics || projectId === 'XXXXXXXXXX') {
    return null;
  }

  return (
    <Script id="microsoft-clarity" strategy="afterInteractive">
      {`
        (function(c,l,a,r,i,t,y){
          c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
          t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
          y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", "${projectId}");
      `}
    </Script>
  );
}
