import type { Metadata } from 'next';
import { ContactClient } from './ContactClient';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with A B Minerals Pvt Ltd for granite inquiries, bulk orders & project quotes. Office in Berhampur, Odisha. WhatsApp, phone & email support available.',
  keywords: ['contact A B Minerals', 'granite supplier contact', 'granite quote India', 'bulk granite order', 'A B Minerals phone number'],
  alternates: {
    canonical: 'https://www.abminerals.com/contact',
  },
  openGraph: {
    title: 'Contact A B Minerals Pvt Ltd',
    description: 'Reach out for granite inquiries, quotes & orders. WhatsApp, phone & email support.',
    url: 'https://www.abminerals.com/contact',
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
