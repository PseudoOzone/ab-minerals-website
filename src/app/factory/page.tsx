import type { Metadata } from 'next';
import { FactoryClient } from './FactoryClient';

export const metadata: Metadata = {
  title: 'Granite Processing Factory | A B Minerals Pvt Ltd',
  description: 'A B Minerals granite factory in Chamakhandi, Odisha — gang saws, block cutters & line polishers. 250,000+ sqft monthly capacity. Factory-finished slabs & tiles.',
  keywords: ['A B Minerals factory', 'granite factory Odisha', 'granite processing plant India', 'granite polishing factory', 'gang saw granite'],
  alternates: {
    canonical: 'https://www.abminerals.com/factory',
  },
  openGraph: {
    title: 'Granite Processing Factory | A B Minerals Pvt Ltd',
    description: 'State-of-the-art granite processing factory in Odisha with 250,000+ sqft monthly capacity.',
    url: 'https://www.abminerals.com/factory',
  },
};

export default function FactoryPage() {
  return <FactoryClient />;
}
