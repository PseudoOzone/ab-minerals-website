import type { Metadata } from 'next';
import { CapabilitiesClient } from './CapabilitiesClient';

export const metadata: Metadata = {
  title: 'Our Capabilities',
  description: 'A B Minerals capabilities — own quarry extraction, gang saw & block cutter processing, precision polishing, custom sizing, quality control, and pan-India dispatch. Export-ready granite solutions.',
  keywords: ['granite processing capabilities', 'granite cutting services', 'granite polishing India', 'custom granite sizes', 'granite export services'],
  alternates: {
    canonical: 'https://www.abminerals.com/capabilities',
  },
  openGraph: {
    title: 'Our Capabilities | A B Minerals',
    description: 'Full-service granite: quarry extraction, factory processing, quality control & dispatch.',
    url: 'https://www.abminerals.com/capabilities',
  },
};

export default function CapabilitiesPage() {
  return <CapabilitiesClient />;
}
