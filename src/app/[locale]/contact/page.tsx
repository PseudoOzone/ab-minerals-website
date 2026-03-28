import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ContactClient } from './ContactClient';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'contact' });

  return {
    title: t('pageTitle'),
    description: t('pageDescription'),
    keywords: ['contact A B Minerals', 'A B Minerals phone number', 'granite supplier contact Odisha', 'granite quote India', 'bulk granite order'],
    alternates: {
      canonical: `https://www.abminerals.com/${locale}/contact`,
    },
    openGraph: {
      title: t('ogTitle'),
      description: t('ogDescription'),
      url: `https://www.abminerals.com/${locale}/contact`,
    },
  };
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ContactClient />;
}
