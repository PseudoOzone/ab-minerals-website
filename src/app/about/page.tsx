"use client";

import { motion } from "framer-motion";
import { Award, Users, Building2, Globe, MapPin, Calendar, Sparkles, Shield, Factory, Truck } from "lucide-react";
import { Container, Section } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Heading, Text, SectionHeader } from "@/components/ui/Typography";
import { companyInfo, leadership, capabilities } from "@/config/company.config";
import { AnimatedCounter, RevealOnScroll, AnimatedWords } from "@/components/ui/AnimatedElements";
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
    transition: { staggerChildren: 0.1, delayChildren: 0.1 }
  },
};

// ═══════════════════════════════════════════════════════════════════════
// PAGE COMPONENT
// ═══════════════════════════════════════════════════════════════════════

export default function AboutPage() {
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
              Our Story
            </motion.span>
            <motion.div variants={fadeInUp}>
              <Heading as="h1" size="display-lg" className="mb-6">
                About A B Minerals
              </Heading>
            </motion.div>
            <motion.div variants={fadeInUp}>
              <Text size="lg" muted className="max-w-2xl">
                {companyInfo.tagline}. From our exclusive 100-acre Lavender Blue quarry 
                in Odisha to landmark projects across India, we deliver premium granite 
                with unmatched quality control. Our factory processes a variety of stones 
                to meet all your architectural needs.
              </Text>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* Stats Section - Premium with Animated Counters */}
      <Section padding="md" background="charcoal-light">
        <Container>
          <RevealOnScroll>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center group">
                <div className="text-5xl md:text-6xl font-display font-light mb-3" style={{ color: '#C9A962' }}>
                  <AnimatedCounter value={companyInfo.stats.yearsExperience} duration={2} />
                  <span className="text-3xl">+</span>
                </div>
                <Text muted>Years of Excellence</Text>
                <div 
                  className="mt-4 w-12 h-px mx-auto transition-all duration-500 group-hover:w-20"
                  style={{ backgroundColor: 'rgba(201, 169, 98, 0.3)' }}
                />
              </div>
              <div className="text-center group">
                <div className="text-5xl md:text-6xl font-display font-light mb-3" style={{ color: '#C9A962' }}>
                  <AnimatedCounter value={250} duration={2} suffix="K" />
                  <span className="text-3xl">+</span>
                </div>
                <Text muted>{companyInfo.stats.capacityUnit}/Month</Text>
                <div 
                  className="mt-4 w-12 h-px mx-auto transition-all duration-500 group-hover:w-20"
                  style={{ backgroundColor: 'rgba(201, 169, 98, 0.3)' }}
                />
              </div>
              <div className="text-center group">
                <div className="text-5xl md:text-6xl font-display font-light mb-3" style={{ color: '#C9A962' }}>
                  <AnimatedCounter value={companyInfo.stats.projectsCompleted} duration={2.5} />
                  <span className="text-3xl">+</span>
                </div>
                <Text muted>Projects Delivered</Text>
                <div 
                  className="mt-4 w-12 h-px mx-auto transition-all duration-500 group-hover:w-20"
                  style={{ backgroundColor: 'rgba(201, 169, 98, 0.3)' }}
                />
              </div>
              <div className="text-center group">
                <div className="text-5xl md:text-6xl font-display font-light mb-3" style={{ color: '#C9A962' }}>
                  <AnimatedCounter value={companyInfo.stats.quarriesOwned} duration={1.5} />
                </div>
                <Text muted>Own Quarry (Lavender Blue)</Text>
                <div 
                  className="mt-4 w-12 h-px mx-auto transition-all duration-500 group-hover:w-20"
                  style={{ backgroundColor: 'rgba(201, 169, 98, 0.3)' }}
                />
              </div>
            </div>
          </RevealOnScroll>
        </Container>
      </Section>

      {/* Story Section */}
      <Section padding="lg" background="charcoal">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative aspect-[4/3] rounded-xl overflow-hidden"
              style={{ 
                backgroundColor: '#141414',
                border: '1px solid rgba(245, 245, 240, 0.05)'
              }}
            >
              {/* Placeholder for quarry image */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center p-8">
                  <Building2 className="w-16 h-16 mx-auto mb-4" style={{ color: 'rgba(201, 169, 98, 0.3)' }} />
                  <Text muted>Quarry & Factory Image</Text>
                </div>
              </div>
            </motion.div>

            {/* Content */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <motion.div variants={fadeInUp}>
                <SectionHeader
                  eyebrow="Our Journey"
                  title="Excellence from Source to Site"
                  align="left"
                  className="mb-8"
                />
              </motion.div>
              
              <motion.div variants={fadeInUp} className="space-y-4">
                <Text muted className="leading-relaxed">
                  A B Minerals was founded with a simple vision: to provide the highest quality 
                  granite directly from source to project, eliminating middlemen and ensuring 
                  complete quality control at every step.
                </Text>
                <Text muted className="leading-relaxed">
                  We own and operate our exclusive 100-acre Lavender Blue quarry in Berhampur, 
                  Odisha—one of India&apos;s richest granite belts. While Lavender Blue is our signature 
                  stone from our own quarry, our factory also processes and supplies a variety of 
                  premium granites including SK Blue, Ikon Brown, and Star White.
                </Text>
                <Text muted className="leading-relaxed">
                  Our state-of-the-art processing facility ensures every slab meets our exacting 
                  standards before it leaves for your project site. From rough block to polished 
                  perfection, we control the entire journey.
                </Text>
              </motion.div>
            </motion.div>
          </div>
        </Container>
      </Section>

      {/* Leadership Section */}
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
                eyebrow="Leadership"
                title="The Team Behind the Stone"
                description="Meet the visionaries driving A B Minerals' commitment to excellence."
              />
            </motion.div>

            <motion.div 
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto"
            >
              {leadership.map((person) => (
                <motion.div
                  key={person.id}
                  variants={fadeInUp}
                  className="text-center"
                >
                  <div 
                    className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden"
                    style={{ 
                      backgroundColor: '#0A0A0A',
                      border: '2px solid rgba(201, 169, 98, 0.3)'
                    }}
                  >
                    {/* Leader photo placeholder */}
                    <div className="w-full h-full flex items-center justify-center">
                      <Users className="w-12 h-12" style={{ color: 'rgba(201, 169, 98, 0.3)' }} />
                    </div>
                  </div>
                  <h3 className="font-serif text-xl mb-1" style={{ color: '#F5F5F0' }}>
                    {person.name}
                  </h3>
                  <p className="text-sm mb-2" style={{ color: '#C9A962' }}>
                    {person.role}
                  </p>
                  <Text size="sm" muted>
                    {person.bio}
                  </Text>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </Container>
      </Section>

      {/* Values Section */}
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
                eyebrow="Our Values"
                title="What We Stand For"
              />
            </motion.div>

            <motion.div 
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              <motion.div
                variants={fadeInUp}
                className="p-8 rounded-xl text-center"
                style={{ 
                  backgroundColor: '#141414',
                  border: '1px solid rgba(245, 245, 240, 0.05)'
                }}
              >
                <Award className="w-12 h-12 mx-auto mb-4" style={{ color: '#C9A962' }} />
                <h3 className="font-serif text-xl mb-2" style={{ color: '#F5F5F0' }}>
                  Quality First
                </h3>
                <Text size="sm" muted>
                  Every slab is inspected and graded before shipping. We never compromise on quality.
                </Text>
              </motion.div>

              <motion.div
                variants={fadeInUp}
                className="p-8 rounded-xl text-center"
                style={{ 
                  backgroundColor: '#141414',
                  border: '1px solid rgba(245, 245, 240, 0.05)'
                }}
              >
                <Globe className="w-12 h-12 mx-auto mb-4" style={{ color: '#C9A962' }} />
                <h3 className="font-serif text-xl mb-2" style={{ color: '#F5F5F0' }}>
                  Pan-India Reach
                </h3>
                <Text size="sm" muted>
                  From Bangalore to Delhi, we deliver premium granite to project sites across the nation.
                </Text>
              </motion.div>

              <motion.div
                variants={fadeInUp}
                className="p-8 rounded-xl text-center"
                style={{ 
                  backgroundColor: '#141414',
                  border: '1px solid rgba(245, 245, 240, 0.05)'
                }}
              >
                <Calendar className="w-12 h-12 mx-auto mb-4" style={{ color: '#C9A962' }} />
                <h3 className="font-serif text-xl mb-2" style={{ color: '#F5F5F0' }}>
                  On-Time Delivery
                </h3>
                <Text size="sm" muted>
                  We understand project timelines. Our logistics ensure your stone arrives when you need it.
                </Text>
              </motion.div>
            </motion.div>
          </motion.div>
        </Container>
      </Section>

      {/* Quality Assurance Section - Placeholder */}
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
                eyebrow="Quality Assurance"
                title="Certified Excellence"
                description="Our commitment to quality is backed by rigorous testing and certification."
              />
            </motion.div>

            <motion.div 
              variants={fadeInUp}
              className="max-w-4xl mx-auto"
            >
              {/* Placeholder for QA Report */}
              <div 
                className="p-12 rounded-2xl text-center"
                style={{ 
                  backgroundColor: '#141414',
                  border: '2px dashed rgba(201, 169, 98, 0.3)'
                }}
              >
                <Shield className="w-16 h-16 mx-auto mb-6" style={{ color: 'rgba(201, 169, 98, 0.4)' }} />
                <h3 className="font-serif text-2xl mb-3" style={{ color: '#F5F5F0' }}>
                  Quality Assurance Report
                </h3>
                <Text muted className="max-w-md mx-auto mb-6">
                  Our quality certifications, testing reports, and compliance documentation will be displayed here.
                </Text>
                <div className="flex flex-wrap justify-center gap-4 text-sm" style={{ color: 'rgba(245, 245, 240, 0.5)' }}>
                  <span className="px-4 py-2 rounded-full" style={{ backgroundColor: 'rgba(201, 169, 98, 0.1)' }}>
                    ISO Certification
                  </span>
                  <span className="px-4 py-2 rounded-full" style={{ backgroundColor: 'rgba(201, 169, 98, 0.1)' }}>
                    Material Testing
                  </span>
                  <span className="px-4 py-2 rounded-full" style={{ backgroundColor: 'rgba(201, 169, 98, 0.1)' }}>
                    Quality Reports
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </Container>
      </Section>
    </>
  );
}
