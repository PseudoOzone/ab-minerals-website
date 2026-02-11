import type { Metadata } from 'next';
import { QuarryClient } from './QuarryClient';

export const metadata: Metadata = {
  title: 'Lavender Blue Granite Quarry Owner — 100 Acres, Berhampur Odisha | A B Minerals',
  description: 'A B Minerals owns a 100-acre Lavender Blue granite quarry in Berhampur, Odisha. Direct quarry-to-factory supply — no middlemen. Best Lavender Blue granite price in India. Consistent blue-grey wave pattern, large block extraction.',
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
    title: 'Lavender Blue Granite Quarry — Own 100-Acre Mine | A B Minerals',
    description: '100-acre own Lavender Blue granite quarry in Odisha. Direct supply, best price, consistent quality.',
    url: 'https://www.abminerals.com/quarry',
  },
};

export default function QuarryPage() {
  return <QuarryClient />;
}
