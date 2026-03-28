import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { StonesClient } from './StonesClient';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'stones' });

  return {
    title: t('pageTitle'),
    description: t('pageDescription'),
    keywords: [
      'A B Minerals granite', 'A B Minerals Pvt Ltd', 'AB Minerals', 'ABM',
      'granite products India',
      'lavender blue granite', 'lavender blue granite price', 'lavender blue granite supplier',
      'lavendar blue granite', 'lavander blue granite', 'lavendar blue granite price',
      'sk blue granite', 'vizag blue granite',
      'ikon brown granite', 'star white granite',
      'granite manufacturer Odisha', 'premium granite slabs',
    ],
    alternates: {
      canonical: `https://www.abminerals.com/${locale}/stones`,
    },
    openGraph: {
      title: t('ogTitle'),
      description: t('ogDescription'),
      url: `https://www.abminerals.com/${locale}/stones`,
    },
  };
}

export default async function StonesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <StonesClient />;
}
