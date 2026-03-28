import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { FactoryClient } from './FactoryClient';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'factory' });

  return {
    title: t('pageTitle'),
    description: t('pageDescription'),
    keywords: ['A B Minerals factory', 'granite factory Odisha', 'granite processing plant India', 'granite polishing factory', 'gang saw granite'],
    alternates: {
      canonical: `https://www.abminerals.com/${locale}/factory`,
    },
    openGraph: {
      title: t('ogTitle'),
      description: t('ogDescription'),
      url: `https://www.abminerals.com/${locale}/factory`,
    },
  };
}

export default async function FactoryPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <FactoryClient />;
}
