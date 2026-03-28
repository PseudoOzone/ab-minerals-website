import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { AboutClient } from './AboutClient';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'about' });

  return {
    title: t('pageTitle'),
    description: t('pageDescription'),
    keywords: ['A B Minerals', 'A B Minerals Pvt Ltd', 'granite company India', 'granite quarry owner Odisha', 'granite manufacturer Berhampur'],
    alternates: {
      canonical: `https://www.abminerals.com/${locale}/about`,
    },
    openGraph: {
      title: t('ogTitle'),
      description: t('ogDescription'),
      url: `https://www.abminerals.com/${locale}/about`,
    },
  };
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <AboutClient />;
}
