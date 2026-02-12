import type { Metadata } from 'next';
import { ContactClient } from './ContactClient';

export const metadata: Metadata = {
  title: 'Contact A B Minerals Pvt Ltd | Berhampur, Odisha',
  description: 'Contact A B Minerals Pvt Ltd for granite inquiries, bulk orders & project quotes. Office in Berhampur, Odisha. WhatsApp, phone & email support.',
  keywords: ['contact A B Minerals', 'A B Minerals phone number', 'granite supplier contact Odisha', 'granite quote India', 'bulk granite order'],
  alternates: {
    canonical: 'https://www.abminerals.com/contact',
  },
  openGraph: {
    title: 'Contact A B Minerals Pvt Ltd | Berhampur, Odisha',
    description: 'Get in touch for granite inquiries, quotes & orders. WhatsApp, phone & email support available.',
    url: 'https://www.abminerals.com/contact',
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
