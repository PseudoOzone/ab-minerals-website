import type { Metadata } from 'next';
import { StonesClient } from './StonesClient';

export const metadata: Metadata = {
  title: 'Granite Products | A B Minerals Pvt Ltd',
  description: 'A B Minerals granite collection — Lavender Blue from ₹105/sqft (quarry-owner direct), SK Blue, Ikon Brown, Star White. Factory-finished slabs, tiles & custom cuts from Odisha.',
  keywords: [
    'A B Minerals granite',
    'A B Minerals Pvt Ltd',
    'granite products India',
    'lavender blue granite',
    'lavender blue granite price',
    'lavender blue granite supplier',
    'sk blue granite',
    'vizag blue granite',
    'ikon brown granite',
    'star white granite',
    'granite manufacturer Odisha',
    'premium granite slabs',
  ],
  alternates: {
    canonical: 'https://www.abminerals.com/stones',
  },
  openGraph: {
    title: 'Granite Products | A B Minerals Pvt Ltd',
    description: 'Lavender Blue, SK Blue, Ikon Brown, Star White — factory-finished granite from A B Minerals, quarry owner in Odisha.',
    url: 'https://www.abminerals.com/stones',
  },
};

export default function StonesPage() {
  return <StonesClient />;
}
