import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { HomeClient } from './HomeClient';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });

  return {
    title: t('homeTitle'),
    description: t('homeDescription'),
    keywords: [
      'A B Minerals', 'A B Minerals Pvt Ltd', 'AB Minerals', 'ABM',
      'A B Minerals Private Limited', 'AB Minerals Private Limited',
      'A.B. Minerals', 'A B Mineral', 'AB Mineral', 'Ab Minerals',
      'ab minerals odisha', 'ab minerals berhampur', 'ab minerals granite',
      'lavender blue granite', 'lavender blue', 'lavender blue granite price',
      'lavender blue granite quarry owner', 'lavender blue granite supplier',
      'lavender blue granite manufacturer',
      'lavendar blue granite', 'lavander blue granite', 'lavender blu granite',
      'lavendor blue granite', 'lavnder blue granite', 'lavender blue granit',
      'lavendar blue granit', 'lavander blue', 'lavendar blue',
      'lavendar blue granite price', 'lavander blue granite price',
      'granite manufacturer Odisha', 'granite supplier India',
      'blue granite India', 'granite exporter India',
    ],
    alternates: {
      canonical: `https://www.abminerals.com/${locale}`,
    },
    openGraph: {
      title: t('homeOgTitle'),
      description: t('homeOgDescription'),
      url: `https://www.abminerals.com/${locale}`,
      siteName: 'A B Minerals Pvt Ltd',
    },
  };
}

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <HomeClient />;
}
