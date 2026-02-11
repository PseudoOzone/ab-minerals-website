import type { Metadata } from 'next';
import { HomeClient } from './HomeClient';

export const metadata: Metadata = {
  title: 'A B Minerals — Lavender Blue Granite Quarry Owner & Manufacturer | ₹105/sqft Onwards',
  description: 'A B Minerals Pvt Ltd — Lavender Blue granite quarry owner & factory in Odisha. Price from ₹105/sqft. Polished, honed, flamed, lepatora slabs & tiles. Also SK Blue, Ikon Brown, Star White. Used in Sharjah Airport, Surat Bullet Train. Pan-India delivery & export.',
  keywords: [
    'lavender blue granite',
    'lavender blue granite price',
    'lavender blue granite supplier',
    'lavender blue granite quarry owner',
    'A B Minerals',
    'granite manufacturer India',
    'granite supplier Odisha',
    'premium granite slabs',
    'granite factory India',
    'blue granite India',
  ],
  alternates: {
    canonical: 'https://www.abminerals.com',
  },
  openGraph: {
    title: 'A B Minerals — Lavender Blue Granite from ₹105/sqft | Quarry Owner',
    description: 'Own Lavender Blue quarry in Odisha. Factory-finished granite slabs & tiles. Direct supply to architects, builders & contractors.',
    url: 'https://www.abminerals.com',
    siteName: 'A B Minerals Pvt Ltd',
  },
};

export default function Home() {
  return <HomeClient />;
}
