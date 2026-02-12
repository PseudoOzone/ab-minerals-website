import type { Metadata } from 'next';
import { HomeClient } from './HomeClient';

export const metadata: Metadata = {
  title: 'A B Minerals Pvt Ltd — Lavender Blue Granite Quarry Owner',
  description: 'A B Minerals Pvt Ltd is the quarry owner of Lavender Blue granite in Odisha, India. Own 100-acre mine, own factory — direct supply, best price, no middlemen. Factory-finished slabs, tiles & custom cuts. Pan-India delivery & export.',
  keywords: [
    'A B Minerals',
    'A B Minerals Pvt Ltd',
    'AB Minerals',
    'ABM',
    'lavender blue granite',
    'lavender blue',
    'lavender blue granite price',
    'lavender blue granite quarry owner',
    'lavender blue granite supplier',
    'lavender blue granite manufacturer',
    'granite manufacturer Odisha',
    'granite supplier India',
    'blue granite India',
    'granite exporter India',
  ],
  alternates: {
    canonical: 'https://www.abminerals.com',
  },
  openGraph: {
    title: 'A B Minerals Pvt Ltd — Lavender Blue Granite Quarry Owner & Manufacturer',
    description: 'A B Minerals is the quarry owner of Lavender Blue granite in Odisha. Own quarry, own factory, no middlemen. Pan-India delivery & export.',
    url: 'https://www.abminerals.com',
    siteName: 'A B Minerals Pvt Ltd',
  },
};

export default function Home() {
  return <HomeClient />;
}
