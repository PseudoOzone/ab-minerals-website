import type { Metadata } from 'next';
import { CapabilitiesClient } from './CapabilitiesClient';

export const metadata: Metadata = {
  title: 'Processing Capabilities | A B Minerals Pvt Ltd',
  description: 'A B Minerals capabilities — quarry extraction, gang saw & block cutter processing, precision polishing, custom sizing & pan-India dispatch. Export-ready granite from Odisha.',
  keywords: ['A B Minerals capabilities', 'granite processing India', 'granite cutting services Odisha', 'custom granite sizes', 'granite export services'],
  alternates: {
    canonical: 'https://www.abminerals.com/capabilities',
  },
  openGraph: {
    title: 'Processing Capabilities | A B Minerals Pvt Ltd',
    description: 'Full-service granite: quarry extraction, factory processing, quality control & dispatch from Odisha.',
    url: 'https://www.abminerals.com/capabilities',
  },
};

export default function CapabilitiesPage() {
  return <CapabilitiesClient />;
}
