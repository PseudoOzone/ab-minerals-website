import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { CapabilitiesClient } from './CapabilitiesClient';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'capabilities' });

  return {
    title: t('pageTitle'),
    description: t('pageDescription'),
    keywords: ['A B Minerals capabilities', 'granite processing India', 'granite cutting services Odisha', 'custom granite sizes', 'granite export services'],
    alternates: {
      canonical: `https://www.abminerals.com/${locale}/capabilities`,
    },
    openGraph: {
      title: t('ogTitle'),
      description: t('ogDescription'),
      url: `https://www.abminerals.com/${locale}/capabilities`,
    },
  };
}

export default async function CapabilitiesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <CapabilitiesClient />;
}
