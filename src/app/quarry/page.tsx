import type { Metadata } from 'next';
import { QuarryClient } from './QuarryClient';

export const metadata: Metadata = {
  title: 'Lavender Blue Granite Quarry | A B Minerals Pvt Ltd — 100-Acre Own Mine, Odisha',
  description: 'A B Minerals owns a 100-acre Lavender Blue granite quarry in Berhampur, Odisha. Quarry-to-factory direct = best price, no middlemen. Consistent blue-grey wave pattern.',
  keywords: [
    'lavender blue granite quarry',
    'lavender blue granite quarry owner',
    'lavender blue quarry Odisha',
    'granite quarry Odisha',
    'granite mining India',
    'granite quarry owner India',
    'blue granite quarry',
    'lavender blue granite blocks',
    'lavender blue granite mine',
    'Berhampur granite quarry',
    'lavender blue granite direct from mine',
  ],
  alternates: {
    canonical: 'https://www.abminerals.com/quarry',
  },
  openGraph: {
    title: 'Lavender Blue Granite Quarry | A B Minerals Pvt Ltd',
    description: '100-acre own Lavender Blue granite quarry in Odisha. Direct supply, best price, consistent quality.',
    url: 'https://www.abminerals.com/quarry',
  },
};

export default function QuarryPage() {
  return <QuarryClient />;
}
