import type { Metadata } from 'next';
import { HomeClient } from './HomeClient';

export const metadata: Metadata = {
  title: 'Lavender Blue Granite Best Price ₹105/sqft | Quarry Owner Direct — A B Minerals',
  description: 'Best Lavender Blue granite price in India — ₹105 to ₹160/sqft direct from quarry owner A B Minerals. No middlemen. Own quarry + factory in Odisha. Polished, honed, flamed, lepatora. Also SK Blue, Ikon Brown, Star White. Sharjah Airport, Surat Bullet Train supplier. Pan-India & export.',
  keywords: [
    'lavender blue granite best price',
    'lavender blue granite price',
    'lavender blue granite lowest price',
    'lavender blue granite cheapest price',
    'lavender blue granite quarry owner direct',
    'lavender blue granite rate per sqft',
    'lavender blue granite supplier',
    'A B Minerals',
    'granite manufacturer India best price',
    'granite supplier Odisha direct',
    'premium granite slabs factory price',
    'blue granite India price',
  ],
  alternates: {
    canonical: 'https://www.abminerals.com',
  },
  openGraph: {
    title: 'Lavender Blue Granite Best Price ₹105/sqft — Direct from Quarry Owner | A B Minerals',
    description: 'Best price guaranteed — own quarry, own factory, no middlemen. Lavender Blue granite ₹105–160/sqft. Direct supply to architects, builders & contractors.',
    url: 'https://www.abminerals.com',
    siteName: 'A B Minerals Pvt Ltd',
  },
};

export default function Home() {
  return <HomeClient />;
}
