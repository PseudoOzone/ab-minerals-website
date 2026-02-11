import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SmartChatBot } from "@/components/ui/ChatBot";
import { OrganizationJsonLd, LocalBusinessJsonLd, WebSiteJsonLd } from "@/components/seo/JsonLd";
import { GoogleAnalytics, MicrosoftClarity } from "@/components/seo/GoogleAnalytics";
import { seoDefaults, companyInfo } from "@/config";
import "./globals.css";

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
// METADATA
// ═══════════════════════════════════════════════════════════════════════

export const metadata: Metadata = {
  metadataBase: new URL('https://www.abminerals.com'),
  title: {
    default: seoDefaults.defaultTitle,
    template: seoDefaults.titleTemplate,
  },
  description: seoDefaults.defaultDescription,
  keywords: seoDefaults.keywords,
  authors: [{ name: companyInfo.name }],
  creator: companyInfo.name,
  icons: {
    icon: '/logo-abm.png',
    shortcut: '/logo-abm.png',
    apple: '/logo-abm.png',
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
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
  robots: {
    index: true,
    follow: true,
  },
};

// ═══════════════════════════════════════════════════════════════════════
// ROOT LAYOUT
// ═══════════════════════════════════════════════════════════════════════

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
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
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <SmartChatBot />
      </body>
    </html>
  );
}
