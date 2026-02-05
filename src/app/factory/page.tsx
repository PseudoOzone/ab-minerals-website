"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle, Phone, Factory, MapPin, Clock, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Heading, Text } from "@/components/ui/Typography";
import { getFactoryManager, generateWhatsAppUrlForContact } from "@/config/whatsapp.config";
import { contactInfo } from "@/config/company.config";

// ═══════════════════════════════════════════════════════════════════════
// FACTORY CONTACT PAGE
// ═══════════════════════════════════════════════════════════════════════
// This page is shared by A N Bakshi or Anant Bakshi to forward clients
// directly to the Factory Manager (Jagannath)

export default function FactoryPage() {
  const [factoryManager, setFactoryManager] = useState<ReturnType<typeof getFactoryManager>>(undefined);
  const [whatsappUrl, setWhatsappUrl] = useState("");

  useEffect(() => {
    const manager = getFactoryManager();
    setFactoryManager(manager);
    
    if (manager) {
      const message = `Hi ${manager.name}, I was referred by A B Minerals management.

Please help me with my order/inquiry.`;
      setWhatsappUrl(generateWhatsAppUrlForContact("factory", message));
    }
  }, []);

  const handleWhatsAppClick = () => {
    if (whatsappUrl) {
      window.open(whatsappUrl, "_blank");
    }
  };

  const handleCallClick = () => {
    if (factoryManager) {
      window.location.href = `tel:${factoryManager.number}`;
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section 
        className="relative min-h-[70vh] flex items-center justify-center pt-20"
        style={{ backgroundColor: '#0A0A0A' }}
      >
        {/* Background gradient */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{ 
            background: 'radial-gradient(ellipse at center, rgba(201, 169, 98, 0.15) 0%, transparent 70%)' 
          }}
        />

        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto"
          >
            {/* Icon */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-8"
              style={{ 
                background: 'linear-gradient(135deg, rgba(201, 169, 98, 0.2) 0%, rgba(201, 169, 98, 0.1) 100%)',
                border: '1px solid rgba(201, 169, 98, 0.3)'
              }}
            >
              <Factory className="w-10 h-10" style={{ color: '#C9A962' }} />
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-sm tracking-widest uppercase mb-4"
              style={{ color: '#C9A962' }}
            >
              Factory Direct Contact
            </motion.p>

            <Heading as="h1" size="display-md" className="mb-6">
              Connect with Our Factory
            </Heading>

            <Text size="lg" muted className="mb-4">
              You&apos;ve been referred by A B Minerals management.
            </Text>
            <Text size="lg" muted className="mb-10">
              Contact our Factory Manager directly for production updates, dispatch coordination, and order tracking.
            </Text>

            {/* Factory Manager Card */}
            {factoryManager && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="p-8 rounded-2xl mb-8"
                style={{ 
                  backgroundColor: '#141414', 
                  border: '1px solid rgba(201, 169, 98, 0.2)' 
                }}
              >
                <div className="flex flex-col items-center">
                  {/* Avatar placeholder */}
                  <div 
                    className="w-20 h-20 rounded-full flex items-center justify-center mb-4 text-2xl font-display"
                    style={{ 
                      backgroundColor: 'rgba(201, 169, 98, 0.15)',
                      color: '#C9A962'
                    }}
                  >
                    {factoryManager.name.charAt(0)}
                  </div>
                  
                  <h2 
                    className="font-display text-2xl mb-1"
                    style={{ color: '#F5F5F0' }}
                  >
                    {factoryManager.name}
                  </h2>
                  <p 
                    className="text-sm mb-6"
                    style={{ color: '#C9A962' }}
                  >
                    {factoryManager.description}
                  </p>

                  {/* Contact buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                    <Button
                      variant="gold"
                      size="lg"
                      onClick={handleWhatsAppClick}
                      leftIcon={<MessageCircle className="w-5 h-5" />}
                      className="w-full sm:w-auto"
                    >
                      Message on WhatsApp
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={handleCallClick}
                      leftIcon={<Phone className="w-5 h-5" />}
                      className="w-full sm:w-auto"
                    >
                      Call Directly
                    </Button>
                  </div>

                  {/* Phone number display */}
                  <p 
                    className="mt-6 text-lg font-medium"
                    style={{ color: '#F5F5F0' }}
                  >
                    {factoryManager.number.replace(/(\+91)(\d{5})(\d{5})/, '$1 $2 $3')}
                  </p>
                </div>
              </motion.div>
            )}

            {/* Factory Info */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8"
            >
              <div className="text-center p-4">
                <MapPin className="w-6 h-6 mx-auto mb-2" style={{ color: '#C9A962' }} />
                <p className="text-sm" style={{ color: 'rgba(245, 245, 240, 0.7)' }}>
                  {contactInfo.address.short}
                </p>
              </div>
              <div className="text-center p-4">
                <Clock className="w-6 h-6 mx-auto mb-2" style={{ color: '#C9A962' }} />
                <p className="text-sm" style={{ color: 'rgba(245, 245, 240, 0.7)' }}>
                  Mon - Sat: 9 AM - 6 PM
                </p>
              </div>
              <div className="text-center p-4">
                <Factory className="w-6 h-6 mx-auto mb-2" style={{ color: '#C9A962' }} />
                <p className="text-sm" style={{ color: 'rgba(245, 245, 240, 0.7)' }}>
                  250,000+ sqft/month capacity
                </p>
              </div>
            </motion.div>

            {/* Back to main site */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-12"
            >
              <a 
                href="/"
                className="inline-flex items-center gap-2 text-sm transition-colors hover:opacity-80"
                style={{ color: 'rgba(245, 245, 240, 0.5)' }}
              >
                <ArrowRight className="w-4 h-4 rotate-180" />
                Back to A B Minerals
              </a>
            </motion.div>
          </motion.div>
        </Container>
      </section>
    </>
  );
}
