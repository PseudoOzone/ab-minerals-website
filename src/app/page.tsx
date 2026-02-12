import type { Metadata } from 'next';
import { HomeClient } from './HomeClient';

export const metadata: Metadata = {
  title: 'A B Minerals Pvt Ltd | Premium Granite Manufacturer & Quarry Owner in Odisha',
  description: 'A B Minerals Pvt Ltd — premium granite manufacturer in Odisha with own Lavender Blue quarry. Factory-finished slabs & tiles from ₹105/sqft. SK Blue, Ikon Brown, Star White. Pan-India & export.',
  keywords: [
    'A B Minerals',
    'A B Minerals Pvt Ltd',
    'AB Minerals',
    'granite manufacturer Odisha',
    'lavender blue granite',
    'lavender blue granite price',
    'lavender blue granite quarry owner',
    'granite supplier India',
    'premium granite slabs',
    'granite factory Odisha',
    'blue granite India',
    'granite exporter India',
  ],
  alternates: {
    canonical: 'https://www.abminerals.com',
  },
  openGraph: {
    title: 'A B Minerals Pvt Ltd | Premium Granite Manufacturer & Quarry Owner in Odisha',
    description: 'Own quarry, own factory, no middlemen. Lavender Blue granite from ₹105/sqft. Direct supply to architects, builders & contractors across India.',
    url: 'https://www.abminerals.com',
    siteName: 'A B Minerals Pvt Ltd',
  },
};

export default function Home() {
  return <HomeClient />;
}
