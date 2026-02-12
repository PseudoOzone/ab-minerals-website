import type { Metadata } from 'next';
import { HomeClient } from './HomeClient';

export const metadata: Metadata = {
  title: 'A B Minerals — Lavender Blue Granite Quarry Owner | Lowest Price Direct, Odisha',
  description: 'A B Minerals — Lavender Blue granite quarry owner in Odisha. Lowest price guaranteed, direct from mine. Factory-finished slabs, tiles & custom cuts. No middlemen. Pan-India delivery & export.',
  keywords: [
    'A B Minerals',
    'A B Minerals Pvt Ltd',
    'AB Minerals',
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
    title: 'A B Minerals — Lavender Blue Granite Quarry Owner | Best Price Direct',
    description: 'Lavender Blue granite at lowest price — direct from quarry owner A B Minerals. Own quarry, own factory, no middlemen. Pan-India & export.',
    url: 'https://www.abminerals.com',
    siteName: 'A B Minerals Pvt Ltd',
  },
};

export default function Home() {
  return <HomeClient />;
}
