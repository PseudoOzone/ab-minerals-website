import type { Metadata } from "next";
import { seoDefaults, companyInfo } from "@/config";
import "./globals.css";

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
    icon: [
      { url: '/favicon.ico', sizes: '16x16 32x32 48x48' },
      { url: '/icon-48.png', sizes: '48x48', type: 'image/png' },
      { url: '/icon-96.png', sizes: '96x96', type: 'image/png' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: '/icon-192.png',
  },
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large' as const,
    'max-snippet': -1,
    'max-video-preview': -1,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large' as const,
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
};

// ═══════════════════════════════════════════════════════════════════════
// ROOT LAYOUT — Minimal shell, locale layout handles rendering
// ═══════════════════════════════════════════════════════════════════════

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
