import type { Metadata } from 'next';
import { FactoryClient } from './FactoryClient';

export const metadata: Metadata = {
  title: 'Our Factory',
  description: 'A B Minerals factory in Chamakhandi, Odisha — equipped with gang saws, block cutters, line polishers & edge-cutting machines. 250,000+ sqft monthly capacity for granite processing.',
  keywords: ['granite factory Odisha', 'granite processing plant', 'granite polishing factory', 'granite cutting facility India', 'gang saw granite'],
  alternates: {
    canonical: 'https://www.abminerals.com/factory',
  },
  openGraph: {
    title: 'Granite Processing Factory | A B Minerals',
    description: 'State-of-the-art granite processing factory with 250,000+ sqft monthly capacity.',
    url: 'https://www.abminerals.com/factory',
  },
};

export default function FactoryPage() {
  return <FactoryClient />;
}
