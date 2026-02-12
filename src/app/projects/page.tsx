import type { Metadata } from 'next';
import { ProjectsClient } from './ProjectsClient';

export const metadata: Metadata = {
  title: 'Projects & Installations | A B Minerals Pvt Ltd',
  description: 'A B Minerals granite in landmark projects — Sharjah Airport, Surat Bullet Train, SCB Medical Cuttack, Pune Metro. Premium granite for iconic structures across India & the Middle East.',
  keywords: ['A B Minerals projects', 'granite projects India', 'airport granite supplier', 'Sharjah Airport granite', 'landmark granite projects'],
  alternates: {
    canonical: 'https://www.abminerals.com/projects',
  },
  openGraph: {
    title: 'Projects & Installations | A B Minerals Pvt Ltd',
    description: 'Premium granite supplied to iconic projects — Sharjah Airport, Surat Bullet Train & more.',
    url: 'https://www.abminerals.com/projects',
  },
};

export default function ProjectsPage() {
  return <ProjectsClient />;
}
