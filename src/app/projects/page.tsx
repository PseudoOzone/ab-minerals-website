"use client";

import { motion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";
import { Container, Section } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Heading, Text, SectionHeader } from "@/components/ui/Typography";
import { benchmarkProjects, projectDisclaimer } from "@/config/company.config";
import { generateWhatsAppUrl, messageTemplates } from "@/config/whatsapp.config";
import Link from "next/link";
import Image from "next/image";

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
    transition: { staggerChildren: 0.15, delayChildren: 0.1 }
  },
};

// ═══════════════════════════════════════════════════════════════════════
// PAGE COMPONENT
// ═══════════════════════════════════════════════════════════════════════

export default function ProjectsPage() {
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
              Track Record
            </motion.span>
            <motion.div variants={fadeInUp}>
              <Heading as="h1" size="display-lg" className="mb-6">
                Benchmark Projects
              </Heading>
            </motion.div>
            <motion.div variants={fadeInUp}>
              <Text size="lg" muted className="max-w-2xl">
                Our granite has been specified for some of India&apos;s most prestigious 
                infrastructure projects. From airports to metro systems, discover where 
                A B Minerals stone has made its mark.
              </Text>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* Projects Grid */}
      <Section padding="lg" background="charcoal-light">
        <Container>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {benchmarkProjects.map((project) => (
              <motion.div
                key={project.id}
                variants={fadeInUp}
                className="group rounded-xl overflow-hidden"
                style={{ 
                  backgroundColor: '#0A0A0A',
                  border: '1px solid rgba(245, 245, 240, 0.05)'
                }}
              >
                {/* Project Image */}
                <div 
                  className="relative aspect-video overflow-hidden"
                  style={{ backgroundColor: '#141414' }}
                >
                  {/* Placeholder for project image */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-6xl opacity-30">🏛️</div>
                  </div>
                  
                  {/* Status badge */}
                  <div 
                    className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-medium"
                    style={{ 
                      backgroundColor: 'rgba(201, 169, 98, 0.2)',
                      color: '#C9A962'
                    }}
                  >
                    {project.status}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <span 
                    className="text-xs uppercase tracking-wider mb-2 block"
                    style={{ color: '#C9A962' }}
                  >
                    {project.type}
                  </span>
                  <h3 className="font-serif text-2xl mb-2" style={{ color: '#F5F5F0' }}>
                    {project.name}
                  </h3>
                  <Text size="sm" muted className="mb-4">
                    {project.description}
                  </Text>
                  
                  {/* Stone used */}
                  {project.stoneUsed && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.stoneUsed.map((stone) => (
                        <span
                          key={stone}
                          className="px-2 py-1 rounded text-xs"
                          style={{ 
                            backgroundColor: 'rgba(245, 245, 240, 0.05)',
                            color: '#A0A0A0'
                          }}
                        >
                          {stone}
                        </span>
                      ))}
                    </div>
                  )}
                  
                  {/* Metrics */}
                  {project.quantity && (
                    <div 
                      className="pt-4 mt-4"
                      style={{ borderTop: '1px solid rgba(245, 245, 240, 0.05)' }}
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-xs uppercase tracking-wider" style={{ color: '#A0A0A0' }}>
                          Quantity Supplied
                        </span>
                        <span className="font-medium" style={{ color: '#F5F5F0' }}>
                          {project.quantity}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Disclaimer */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Text size="sm" muted className="italic max-w-2xl mx-auto">
              {projectDisclaimer}
            </Text>
          </motion.div>
        </Container>
      </Section>

      {/* Stats Section */}
      <Section padding="md" background="charcoal">
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
                3+
              </div>
              <Text muted>Major Airports</Text>
            </motion.div>
            <motion.div variants={fadeInUp} className="text-center">
              <div className="text-4xl md:text-5xl font-serif mb-2" style={{ color: '#C9A962' }}>
                5+
              </div>
              <Text muted>Metro Systems</Text>
            </motion.div>
            <motion.div variants={fadeInUp} className="text-center">
              <div className="text-4xl md:text-5xl font-serif mb-2" style={{ color: '#C9A962' }}>
                50+
              </div>
              <Text muted>Commercial Projects</Text>
            </motion.div>
            <motion.div variants={fadeInUp} className="text-center">
              <div className="text-4xl md:text-5xl font-serif mb-2" style={{ color: '#C9A962' }}>
                Pan-India
              </div>
              <Text muted>Reach</Text>
            </motion.div>
          </motion.div>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section padding="lg" background="charcoal-light">
        <Container size="md">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Heading as="h2" size="display-sm" className="mb-4">
              Your project could be next
            </Heading>
            <Text size="lg" muted className="mb-8 max-w-xl mx-auto">
              Whether it&apos;s a commercial development, hospitality project, or infrastructure 
              venture, we have the capacity and quality to deliver.
            </Text>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="gold"
                size="lg"
                onClick={handleWhatsApp}
                leftIcon={<MessageCircle className="w-5 h-5" />}
              >
                Discuss Your Project
              </Button>
              <Link href="/stones">
                <Button variant="outline" size="lg">
                  View Our Stones
                </Button>
              </Link>
            </div>
          </motion.div>
        </Container>
      </Section>
    </>
  );
}
