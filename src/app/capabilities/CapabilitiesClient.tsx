"use client";

import { motion } from "framer-motion";
import { Pickaxe, Factory, Truck, Ruler, Shield, Clock, Award, Layers } from "lucide-react";
import { Container, Section } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Heading, Text, SectionHeader } from "@/components/ui/Typography";
import { companyInfo, capabilities } from "@/config/company.config";
import Link from "next/link";
import { MessageCircle } from "lucide-react";
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
// ICON MAP
// ═══════════════════════════════════════════════════════════════════════

const iconMap: Record<string, React.ReactNode> = {
  quarry: <Pickaxe className="w-8 h-8" />,
  factory: <Factory className="w-8 h-8" />,
  logistics: <Truck className="w-8 h-8" />,
  customization: <Ruler className="w-8 h-8" />,
  quality: <Shield className="w-8 h-8" />,
  delivery: <Clock className="w-8 h-8" />,
};

// ═══════════════════════════════════════════════════════════════════════
// PAGE COMPONENT
// ═══════════════════════════════════════════════════════════════════════

export function CapabilitiesClient() {
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
              What We Offer
            </motion.span>
            <motion.div variants={fadeInUp}>
              <Heading as="h1" size="display-lg" className="mb-6">
                Our Capabilities
              </Heading>
            </motion.div>
            <motion.div variants={fadeInUp}>
              <Text size="lg" muted className="max-w-2xl">
                From quarry extraction to final delivery, we control every step of the 
                granite production process. Discover our vertically integrated capabilities 
                that ensure quality at every stage.
              </Text>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* Capacity Stats */}
      <Section padding="md" background="charcoal-light">
        <Container>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            <motion.div variants={fadeInUp} className="text-center">
              <div className="text-4xl md:text-5xl font-serif mb-2" style={{ color: '#C9A962' }}>
                {companyInfo.stats.monthlyCapacity}
              </div>
              <Text muted>{companyInfo.stats.capacityUnit}/Month</Text>
            </motion.div>
            <motion.div variants={fadeInUp} className="text-center">
              <div className="text-4xl md:text-5xl font-serif mb-2" style={{ color: '#C9A962' }}>
                {companyInfo.stats.quarriesOwned}
              </div>
              <Text muted>Own Quarry</Text>
            </motion.div>
            <motion.div variants={fadeInUp} className="text-center">
              <div className="text-4xl md:text-5xl font-serif mb-2" style={{ color: '#C9A962' }}>
                4
              </div>
              <Text muted>Stone Varieties</Text>
            </motion.div>
            <motion.div variants={fadeInUp} className="text-center">
              <div className="text-4xl md:text-5xl font-serif mb-2" style={{ color: '#C9A962' }}>
                Pan-India
              </div>
              <Text muted>Delivery Network</Text>
            </motion.div>
          </motion.div>
        </Container>
      </Section>

      {/* Capabilities Grid */}
      <Section padding="lg" background="charcoal">
        <Container>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp}>
              <SectionHeader
                eyebrow="End-to-End"
                title="Quarry to Finish Excellence"
                description="Complete vertical integration means consistent quality and competitive pricing."
              />
            </motion.div>

            <motion.div 
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {capabilities.map((capability, index) => (
                <motion.div
                  key={capability.id}
                  variants={fadeInUp}
                  className="p-8 rounded-xl transition-all duration-300 group hover:shadow-xl"
                  style={{ 
                    backgroundColor: '#141414',
                    border: '1px solid rgba(245, 245, 240, 0.05)'
                  }}
                >
                  <div 
                    className="w-16 h-16 rounded-full flex items-center justify-center mb-6 transition-colors group-hover:scale-110"
                    style={{ backgroundColor: 'rgba(201, 169, 98, 0.1)', color: '#C9A962' }}
                  >
                    {iconMap[capability.icon] || <Layers className="w-8 h-8" />}
                  </div>
                  <h3 className="font-serif text-xl mb-3" style={{ color: '#F5F5F0' }}>
                    {capability.title}
                  </h3>
                  <Text size="sm" muted>
                    {capability.description}
                  </Text>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </Container>
      </Section>

      {/* Process Flow */}
      <Section padding="lg" background="charcoal-light">
        <Container>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp}>
              <SectionHeader
                eyebrow="Our Process"
                title="From Quarry Block to Your Project"
              />
            </motion.div>

            <motion.div 
              variants={staggerContainer}
              className="relative max-w-4xl mx-auto"
            >
              {/* Process Steps */}
              {[
                { step: "01", title: "Quarry Extraction", desc: "Raw Lavender Blue blocks from our own 100-acre quarry in Odisha" },
                { step: "02", title: "Block Selection", desc: "Each block inspected for color consistency and structural integrity" },
                { step: "03", title: "Cutting & Sizing", desc: "Precision gang-saw cutting into slabs of required thickness" },
                { step: "04", title: "Surface Finishing", desc: "Polish, flame, leather or custom finish applied" },
                { step: "05", title: "Quality Control", desc: "Final inspection and grading before packing" },
                { step: "06", title: "Secure Delivery", desc: "Careful loading and pan-India transport to your site" },
              ].map((item, index) => (
                <motion.div
                  key={item.step}
                  variants={fadeInUp}
                  className="flex gap-6 mb-8 last:mb-0"
                >
                  <div 
                    className="w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0 font-serif text-xl"
                    style={{ 
                      backgroundColor: 'rgba(201, 169, 98, 0.1)',
                      color: '#C9A962',
                      border: '2px solid rgba(201, 169, 98, 0.3)'
                    }}
                  >
                    {item.step}
                  </div>
                  <div className="pt-3">
                    <h3 className="font-serif text-xl mb-1" style={{ color: '#F5F5F0' }}>
                      {item.title}
                    </h3>
                    <Text muted>{item.desc}</Text>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section padding="lg" background="charcoal">
        <Container size="md">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Heading as="h2" size="display-sm" className="mb-4">
              Ready to discuss your project?
            </Heading>
            <Text size="lg" muted className="mb-8 max-w-xl mx-auto">
              Get personalized quotes, technical specifications, and samples for your next project.
            </Text>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="gold"
                size="lg"
                onClick={handleWhatsApp}
                leftIcon={<MessageCircle className="w-5 h-5" />}
              >
                Get Quote on WhatsApp
              </Button>
              <Link href="/stones">
                <Button variant="outline" size="lg">
                  View Stone Collection
                </Button>
              </Link>
            </div>
          </motion.div>
        </Container>
      </Section>
    </>
  );
}
