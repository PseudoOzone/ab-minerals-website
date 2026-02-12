import type { Metadata } from 'next';
import { HomeClient } from './HomeClient';

export const metadata: Metadata = {
  title: 'A B Minerals Pvt Ltd — Lavender Blue Granite Quarry Owner',
  description: 'A B Minerals Pvt Ltd is the quarry owner of Lavender Blue granite in Odisha, India. Own 100-acre mine, own factory — direct supply, best price, no middlemen. Factory-finished slabs, tiles & custom cuts. Pan-India delivery & export.',
  keywords: [
    // Brand — correct spellings
    'A B Minerals', 'A B Minerals Pvt Ltd', 'AB Minerals', 'ABM',
    'A B Minerals Private Limited', 'AB Minerals Private Limited',
    // Brand — common misspellings
    'A.B. Minerals', 'A B Mineral', 'AB Mineral', 'Ab Minerals',
    'ab minerals odisha', 'ab minerals berhampur', 'ab minerals granite',
    // Product — correct spellings
    'lavender blue granite', 'lavender blue', 'lavender blue granite price',
    'lavender blue granite quarry owner', 'lavender blue granite supplier',
    'lavender blue granite manufacturer',
    // Product — common misspellings
    'lavendar blue granite', 'lavander blue granite', 'lavender blu granite',
    'lavendor blue granite', 'lavnder blue granite', 'lavender blue granit',
    'lavendar blue granit', 'lavander blue', 'lavendar blue',
    'lavendar blue granite price', 'lavander blue granite price',
    // Generic
    'granite manufacturer Odisha', 'granite supplier India',
    'blue granite India', 'granite exporter India',
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
