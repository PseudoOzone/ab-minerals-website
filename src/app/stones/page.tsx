import type { Metadata } from 'next';
import { StonesClient } from './StonesClient';

export const metadata: Metadata = {
  title: 'Our Granite Collection',
  description: 'Explore premium granite varieties from A B Minerals — Lavender Blue, SK Blue, Ikon Brown, Star White. Factory-finished slabs, tiles & custom cuts. View specs, finishes & request quotes.',
  keywords: ['granite slabs', 'lavender blue granite', 'sk blue granite', 'ikon brown granite', 'star white granite', 'granite collection India', 'premium granite slabs'],
  alternates: {
    canonical: 'https://www.abminerals.com/stones',
  },
  openGraph: {
    title: 'Premium Granite Collection | A B Minerals',
    description: 'Browse our granite varieties — Lavender Blue, SK Blue, Ikon Brown, Star White. Factory-finished, export-ready.',
    url: 'https://www.abminerals.com/stones',
  },
};

export default function StonesPage() {
  return <StonesClient />;
}
