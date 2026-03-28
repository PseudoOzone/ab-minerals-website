import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { QuarryClient } from './QuarryClient';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'quarry' });

  return {
    title: t('pageTitle'),
    description: t('pageDescription'),
    keywords: [
      'lavender blue granite quarry', 'lavender blue granite quarry owner',
      'lavender blue quarry Odisha', 'granite quarry Odisha',
      'granite mining India', 'granite quarry owner India',
      'blue granite quarry', 'lavender blue granite blocks',
      'lavender blue granite mine', 'Berhampur granite quarry',
      'lavender blue granite direct from mine',
      'lavendar blue granite quarry', 'lavander blue granite quarry',
      'lavendar blue granite quarry owner', 'lavander blue quarry',
      'A B Minerals quarry', 'AB Minerals quarry',
    ],
    alternates: {
      canonical: `https://www.abminerals.com/${locale}/quarry`,
    },
    openGraph: {
      title: t('ogTitle'),
      description: t('ogDescription'),
      url: `https://www.abminerals.com/${locale}/quarry`,
    },
  };
}

export default async function QuarryPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <QuarryClient />;
}
