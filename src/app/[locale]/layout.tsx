import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Playfair_Display, Inter } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SmartChatBot } from "@/components/ui/ChatBot";
import { OrganizationJsonLd, LocalBusinessJsonLd, WebSiteJsonLd } from "@/components/seo/JsonLd";
import { GoogleAnalytics, MicrosoftClarity } from "@/components/seo/GoogleAnalytics";
import { routing } from '@/i18n/routing';
import { seoDefaults, companyInfo } from "@/config";
import type { Locale } from '@/i18n/config';
import { locales } from '@/i18n/config';

// ═══════════════════════════════════════════════════════════════════════
// FONTS
// ═══════════════════════════════════════════════════════════════════════

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

// ═══════════════════════════════════════════════════════════════════════
// STATIC PARAMS — generate pages for all locales
// ═══════════════════════════════════════════════════════════════════════

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

// ═══════════════════════════════════════════════════════════════════════
// OG LOCALE MAPPING
// ═══════════════════════════════════════════════════════════════════════

const ogLocaleMap: Record<Locale, string> = {
  en: 'en_IN',
  de: 'de_DE',
  'zh-CN': 'zh_CN',
  'zh-TW': 'zh_TW',
  ar: 'ar_AE',
  or: 'or_IN',
  ml: 'ml_IN',
  ta: 'ta_IN',
};

// ═══════════════════════════════════════════════════════════════════════
// METADATA
// ═══════════════════════════════════════════════════════════════════════

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  const alternatesLanguages: Record<string, string> = {};
  for (const l of locales) {
    alternatesLanguages[l] = `https://www.abminerals.com/${l}`;
  }

  return {
    openGraph: {
      type: "website",
      locale: ogLocaleMap[locale as Locale] || "en_IN",
      siteName: seoDefaults.siteName,
      title: seoDefaults.defaultTitle,
      description: seoDefaults.defaultDescription,
      images: [seoDefaults.ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: seoDefaults.defaultTitle,
      description: seoDefaults.defaultDescription,
      images: [seoDefaults.ogImage],
    },
    alternates: {
      languages: alternatesLanguages,
    },
  };
}

// ═══════════════════════════════════════════════════════════════════════
// LOCALE LAYOUT
// ═══════════════════════════════════════════════════════════════════════

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Validate locale
  if (!routing.locales.includes(locale as typeof routing.locales[number])) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  // Get messages for the current locale
  const messages = await getMessages();

  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'} className={`${playfair.variable} ${inter.variable}`}>
      <head>
        <OrganizationJsonLd />
        <LocalBusinessJsonLd />
        <WebSiteJsonLd />
        <GoogleAnalytics />
        <MicrosoftClarity />
      </head>
      <body
        className="font-sans antialiased"
        style={{ backgroundColor: '#0A0A0A', color: '#F5F5F0' }}
      >
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <SmartChatBot />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
