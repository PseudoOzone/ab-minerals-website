import type { Metadata } from 'next';
import { AboutClient } from './AboutClient';

export const metadata: Metadata = {
  title: 'About A B Minerals Pvt Ltd | Granite Quarry Owner & Manufacturer, Odisha',
  description: 'A B Minerals Pvt Ltd — granite quarry owner and manufacturer in Berhampur, Odisha. 25+ years supplying premium Lavender Blue granite to architects, builders & contractors across India.',
  keywords: ['A B Minerals', 'A B Minerals Pvt Ltd', 'granite company India', 'granite quarry owner Odisha', 'granite manufacturer Berhampur'],
  alternates: {
    canonical: 'https://www.abminerals.com/about',
  },
  openGraph: {
    title: 'About A B Minerals Pvt Ltd | Granite Quarry Owner, Odisha',
    description: 'Premium granite quarry owner and manufacturer in Odisha. 25+ years of experience supplying architects & builders.',
    url: 'https://www.abminerals.com/about',
  },
};

export default function AboutPage() {
  return <AboutClient />;
}
