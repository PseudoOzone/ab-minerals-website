import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ProjectsClient } from './ProjectsClient';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'projects' });

  return {
    title: t('pageTitle'),
    description: t('pageDescription'),
    keywords: ['A B Minerals projects', 'granite projects India', 'airport granite supplier', 'Sharjah Airport granite', 'landmark granite projects'],
    alternates: {
      canonical: `https://www.abminerals.com/${locale}/projects`,
    },
    openGraph: {
      title: t('ogTitle'),
      description: t('ogDescription'),
      url: `https://www.abminerals.com/${locale}/projects`,
    },
  };
}

export default async function ProjectsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ProjectsClient />;
}
