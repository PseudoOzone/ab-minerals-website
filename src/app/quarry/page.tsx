import type { Metadata } from 'next';
import { QuarryClient } from './QuarryClient';

export const metadata: Metadata = {
  title: 'Our Quarry',
  description: 'Visit the A B Minerals Lavender Blue granite quarry — 100 acres of premium blue-grey granite in Odisha, India. Own-quarry extraction ensures quality control and competitive pricing.',
  keywords: ['granite quarry Odisha', 'lavender blue granite quarry', 'granite mining India', 'granite quarry owner', 'blue granite quarry'],
  alternates: {
    canonical: 'https://www.abminerals.com/quarry',
  },
  openGraph: {
    title: 'Lavender Blue Granite Quarry | A B Minerals',
    description: '100-acre Lavender Blue granite quarry in Odisha. Own-quarry extraction for premium quality.',
    url: 'https://www.abminerals.com/quarry',
  },
};

export default function QuarryPage() {
  return <QuarryClient />;
}
