"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Mail, MessageCircle, Clock, Building2 } from "lucide-react";
import { Container, Section } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Heading, Text, SectionHeader } from "@/components/ui/Typography";
import { companyInfo, contactInfo, leadership } from "@/config/company.config";
import { generateWhatsAppUrl, messageTemplates } from "@/config/whatsapp.config";

// ═══════════════════════════════════════════════════════════════════════
// ANIMATION VARIANTS
// ═══════════════════════════════════════════════════════════════════════

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  },
} as const;

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 }
  },
};

// ═══════════════════════════════════════════════════════════════════════
// PAGE COMPONENT
// ═══════════════════════════════════════════════════════════════════════

export default function ContactPage() {
  const handleWhatsApp = () => {
    const message = messageTemplates.general;
    window.open(generateWhatsAppUrl(message), "_blank");
  };

  return (
    <>
      {/* Hero Section */}
      <section 
        className="relative pt-32 pb-16"
        style={{ backgroundColor: '#0A0A0A' }}
      >
        <Container>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-3xl"
          >
            <motion.span 
              variants={fadeInUp}
              className="text-sm uppercase tracking-widest mb-4 block"
              style={{ color: '#C9A962' }}
            >
              Get In Touch
            </motion.span>
            <motion.div variants={fadeInUp}>
              <Heading as="h1" size="display-lg" className="mb-6">
                Contact Us
              </Heading>
            </motion.div>
            <motion.div variants={fadeInUp}>
              <Text size="lg" muted className="max-w-2xl">
                Ready to source premium granite for your project? Get in touch with our team 
                for quotes, samples, or any inquiries. We respond within hours on WhatsApp.
              </Text>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* Contact Options */}
      <Section padding="lg" background="charcoal-light">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left: Contact Cards */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="space-y-6"
            >
              {/* WhatsApp - Primary */}
              <motion.div 
                variants={fadeInUp}
                className="p-8 rounded-xl"
                style={{ 
                  backgroundColor: '#0A0A0A',
                  border: '2px solid rgba(201, 169, 98, 0.3)'
                }}
              >
                <div className="flex items-start gap-4">
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: 'rgba(37, 211, 102, 0.2)' }}
                  >
                    <MessageCircle className="w-6 h-6" style={{ color: '#25D366' }} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-serif text-xl mb-2" style={{ color: '#F5F5F0' }}>
                      WhatsApp (Fastest)
                    </h3>
                    <p className="mb-4" style={{ color: '#A0A0A0' }}>
                      Get quotes, availability, and samples. Most inquiries answered within hours.
                    </p>
                    <Button
                      variant="gold"
                      onClick={handleWhatsApp}
                      leftIcon={<MessageCircle className="w-5 h-5" />}
                    >
                      Start Chat on WhatsApp
                    </Button>
                  </div>
                </div>
              </motion.div>

              {/* Phone */}
              <motion.div 
                variants={fadeInUp}
                className="p-6 rounded-xl"
                style={{ 
                  backgroundColor: '#0A0A0A',
                  border: '1px solid rgba(245, 245, 240, 0.05)'
                }}
              >
                <div className="flex items-start gap-4">
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: 'rgba(201, 169, 98, 0.1)' }}
                  >
                    <Phone className="w-6 h-6" style={{ color: '#C9A962' }} />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg mb-1" style={{ color: '#F5F5F0' }}>
                      Phone
                    </h3>
                    <a 
                      href={`tel:${contactInfo.phone.primary}`}
                      className="text-lg font-medium hover:opacity-80 transition-opacity"
                      style={{ color: '#C9A962' }}
                    >
                      {contactInfo.phone.display}
                    </a>
                    <p className="text-sm mt-1" style={{ color: '#A0A0A0' }}>
                      Mon-Sat, 9:00 AM - 6:00 PM IST
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Email */}
              <motion.div 
                variants={fadeInUp}
                className="p-6 rounded-xl"
                style={{ 
                  backgroundColor: '#0A0A0A',
                  border: '1px solid rgba(245, 245, 240, 0.05)'
                }}
              >
                <div className="flex items-start gap-4">
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: 'rgba(201, 169, 98, 0.1)' }}
                  >
                    <Mail className="w-6 h-6" style={{ color: '#C9A962' }} />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg mb-1" style={{ color: '#F5F5F0' }}>
                      Email
                    </h3>
                    <a 
                      href={`mailto:${contactInfo.email.primary}`}
                      className="font-medium hover:opacity-80 transition-opacity"
                      style={{ color: '#C9A962' }}
                    >
                      {contactInfo.email.primary}
                    </a>
                    <p className="text-sm mt-1" style={{ color: '#A0A0A0' }}>
                      For detailed RFQs and documentation
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Office Address */}
              <motion.div 
                variants={fadeInUp}
                className="p-6 rounded-xl"
                style={{ 
                  backgroundColor: '#0A0A0A',
                  border: '1px solid rgba(245, 245, 240, 0.05)'
                }}
              >
                <div className="flex items-start gap-4">
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: 'rgba(201, 169, 98, 0.1)' }}
                  >
                    <MapPin className="w-6 h-6" style={{ color: '#C9A962' }} />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg mb-1" style={{ color: '#F5F5F0' }}>
                      Office & Factory
                    </h3>
                    <p style={{ color: '#A0A0A0' }}>
                      {contactInfo.address.line1}<br />
                      {contactInfo.address.city}, {contactInfo.address.state} {contactInfo.address.pincode}<br />
                      {contactInfo.address.country}
                    </p>
                    <a 
                      href={contactInfo.maps.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm mt-2 hover:opacity-80 transition-opacity"
                      style={{ color: '#C9A962' }}
                    >
                      View on Google Maps →
                    </a>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Right: Map / Image */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              {/* Map placeholder */}
              <div 
                className="w-full h-full min-h-[400px] rounded-xl overflow-hidden"
                style={{ 
                  backgroundColor: '#141414',
                  border: '1px solid rgba(245, 245, 240, 0.05)'
                }}
              >
                <iframe
                  src={contactInfo.maps.embedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: '500px' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </motion.div>
          </div>
        </Container>
      </Section>

      {/* Business Hours */}
      <Section padding="md" background="charcoal">
        <Container size="md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <Clock className="w-5 h-5" style={{ color: '#C9A962' }} />
              <h3 className="font-serif text-xl" style={{ color: '#F5F5F0' }}>Business Hours</h3>
            </div>
            <p style={{ color: '#A0A0A0' }}>
              Monday - Saturday: 9:00 AM - 6:00 PM IST<br />
              Sunday: Closed (WhatsApp available)
            </p>
          </motion.div>
        </Container>
      </Section>
    </>
  );
}
