import type { Metadata } from 'next';
import { StonesClient } from './StonesClient';

export const metadata: Metadata = {
  title: 'Granite Collection — Lavender Blue, SK Blue, Ikon Brown, Star White | A B Minerals',
  description: 'Browse premium granite from quarry owner A B Minerals — Lavender Blue granite from ₹105/sqft (own quarry), Vizag/SK Blue, Ikon Brown, Star White. Factory-finished slabs, tiles & custom cuts. Polished, honed, lepatora, flamed finishes. Pan-India delivery & export.',
  keywords: [
    'granite slabs India',
    'lavender blue granite',
    'lavender blue granite price',
    'lavender blue granite supplier',
    'lavender blue granite quarry owner',
    'sk blue granite',
    'vizag blue granite',
    'ikon brown granite',
    'star white granite',
    'granite collection India',
    'premium granite slabs',
    'granite manufacturer Odisha',
    'buy granite online India',
    'granite factory direct',
  ],
  alternates: {
    canonical: 'https://www.abminerals.com/stones',
  },
  openGraph: {
    title: 'Lavender Blue & Premium Granite Collection | A B Minerals — Quarry Owner',
    description: 'Lavender Blue granite from ₹105/sqft + SK Blue, Ikon Brown, Star White. Direct from quarry owner & manufacturer.',
    url: 'https://www.abminerals.com/stones',
  },
};

export default function StonesPage() {
  return <StonesClient />;
}
