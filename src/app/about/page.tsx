import type { Metadata } from 'next';
import { AboutClient } from './AboutClient';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about A B Minerals Pvt Ltd — a premium granite company with its own Lavender Blue quarry in Odisha and integrated factory. 25+ years of experience supplying architects, builders, and contractors across India.',
  keywords: ['A B Minerals', 'granite company India', 'granite quarry owner Odisha', 'A B Minerals Pvt Ltd about', 'granite manufacturer Berhampur'],
  alternates: {
    canonical: 'https://www.abminerals.com/about',
  },
  openGraph: {
    title: 'About A B Minerals Pvt Ltd',
    description: 'Premium granite company with own quarry and factory in Odisha. 25+ years of experience.',
    url: 'https://www.abminerals.com/about',
  },
};

export default function AboutPage() {
  return <AboutClient />;
}
