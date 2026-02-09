import type { Metadata } from 'next';
import { ProjectsClient } from './ProjectsClient';

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Landmark projects supplied by A B Minerals — Sharjah International Airport, Surat Bullet Train Station, SCB Medical College Cuttack, Pune Metro & more. Premium granite for iconic structures.',
  keywords: ['granite projects India', 'airport granite supplier', 'metro station granite', 'hospital granite', 'landmark granite projects', 'Sharjah Airport granite'],
  alternates: {
    canonical: 'https://www.abminerals.com/projects',
  },
  openGraph: {
    title: 'Our Projects | A B Minerals',
    description: 'Premium granite supplied to iconic projects across India and the Middle East.',
    url: 'https://www.abminerals.com/projects',
  },
};

export default function ProjectsPage() {
  return <ProjectsClient />;
}
