import type { Metadata } from 'next';
import { HomeClient } from './HomeClient';

export const metadata: Metadata = {
  title: 'A B Minerals Pvt Ltd | Premium Granite Slabs | Lavender Blue Quarry-Owner, Factory-Finished',
  description: 'Premium granite slabs from A B Minerals Pvt Ltd. Own Lavender Blue quarry in Odisha, factory-finished granite for architects, builders & contractors. SK Blue, Ikon Brown, Star White. Pan-India delivery & export-ready.',
  alternates: {
    canonical: 'https://www.abminerals.com',
  },
};

export default function Home() {
  return <HomeClient />;
}
