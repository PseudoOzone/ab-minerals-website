"use client";

import { motion, type Variants } from "framer-motion";
import { ArrowRight, MapPin, MessageCircle, Sparkles, Shield, Truck, Factory } from "lucide-react";
import { Container, Section } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Heading, Text, SectionHeader, GoldText } from "@/components/ui/Typography";
import { AnimatedCounter, RevealOnScroll, AnimatedWords } from "@/components/ui/AnimatedElements";
import { stones } from "@/config/stones.config";
import { companyInfo, contactInfo, capabilities, benchmarkProjects, projectDisclaimer } from "@/config/company.config";
import { openChatBot } from "@/lib/chatbot-events";
import Link from "next/link";
import Image from "next/image";

// ═══════════════════════════════════════════════════════════════════════
// ANIMATION VARIANTS
// ═══════════════════════════════════════════════════════════════════════

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6 }
  },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

// ═══════════════════════════════════════════════════════════════════════
// HOMEPAGE
// ═══════════════════════════════════════════════════════════════════════

export function HomeClient() {
  const handleRequestQuote = () => {
    openChatBot("quote_start");
  };

  return (
    <>
      {/* ═══════════════════════════════════════════════════════════════
          HERO SECTION
          ═══════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex flex-col sm:flex-row sm:items-center sm:justify-center overflow-hidden">
        {/* Lavender Blue raw photo background — hidden on mobile, shown on desktop */}
        <div className="hidden sm:block absolute inset-0">
          <Image
            src="/stones/lavender-blue/slab-1.jpg"
            alt="Lavender Blue Granite"
            fill
            className="object-contain"
            priority
            quality={100}
          />
        </div>
        
        <Container className="relative z-10 pt-24 sm:pt-32 pb-4 sm:pb-20">
          <div className="max-w-4xl mx-auto">
            {/* Hero Content with subtle frosted background */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="px-4 sm:px-8 py-6 sm:py-10 rounded-2xl"
              style={{
                background: 'rgba(255, 255, 255, 0.15)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
              }}
            >
              {/* Logo Left + Address Right (address hidden on mobile) */}
              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 mb-4 sm:mb-8">
                <Image
                  src="/logo-abm.png"
                  alt="A B Minerals Pvt Ltd"
                  width={100}
                  height={100}
                  className="object-contain w-16 h-16 sm:w-[100px] sm:h-[100px]"
                  priority
                />
                <div className="hidden sm:block text-center sm:text-right">
                  <span className="inline-flex items-center gap-2 text-sm uppercase tracking-widest font-semibold" style={{ color: '#1a1a2e' }}>
                    <MapPin className="w-4 h-4" />
                    Ganjam Office
                  </span>
                  <p className="text-sm mt-2 font-medium" style={{ color: '#2d2d44' }}>
                    {contactInfo.address.line1}<br />
                    {contactInfo.address.city}, {contactInfo.address.district}<br />
                    {contactInfo.address.state} – {contactInfo.address.pincode}
                  </p>
                </div>
              </motion.div>

              {/* Headline */}
              <motion.div variants={fadeInUp} className="text-center">
                <h1 className="font-serif font-medium tracking-tight text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl mb-4 sm:mb-6">
                  <span style={{ color: '#B8860B' }}>Lavender Blue Quarry-Owner.</span>
                  <br />
                  <span className="text-[#e0e0e0] sm:text-[#1a1a2e]">Factory-Finished.</span>
                  <br />
                  <span className="text-[#e0e0e0] sm:text-[#1a1a2e]">Premium Granite Slabs.</span>
                </h1>
              </motion.div>

              {/* Subtext */}
              <motion.div variants={fadeInUp} className="text-center">
                <p className="text-sm sm:text-base md:text-lg mb-6 sm:mb-10 max-w-xl mx-auto font-medium text-[#e0e0e0] sm:text-[#2d2d44]">
                  Quarry-owner price advantage — no middlemen, no markup. Factory-finished granite delivered to your project site.
                  <br className="hidden sm:block" />
                  <span className="hidden sm:inline">Best price guaranteed • Pan-India dispatch • Export-ready • Quote in minutes</span>
                  <span className="sm:hidden">Best price • Pan-India • Export-ready</span>
                </p>
              </motion.div>

              {/* CTAs */}
              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center pt-2 sm:pt-4">
                <button
                  onClick={handleRequestQuote}
                  className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-sm transition-all duration-300 w-full sm:w-auto"
                  style={{ 
                    backgroundColor: '#1a1a2e', 
                    color: '#ffffff',
                    boxShadow: '0 4px 14px rgba(26, 26, 46, 0.4)'
                  }}
                >
                  <MessageCircle className="w-5 h-5" />
                  Request Quote
                </button>
                <button
                  onClick={() => document.getElementById("stones")?.scrollIntoView({ behavior: "smooth" })}
                  className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-sm transition-all duration-300 w-full sm:w-auto"
                  style={{ 
                    backgroundColor: '#8B4513', 
                    color: '#ffffff',
                    boxShadow: '0 4px 14px rgba(139, 69, 19, 0.4)'
                  }}
                >
                  View Stones
                  <ArrowRight className="w-5 h-5" />
                </button>
              </motion.div>
            </motion.div>
          </div>
        </Container>

        {/* Lavender Blue slab image - shown below content on mobile only */}
        <div className="sm:hidden w-full flex-1 relative min-h-[40vh]">
          <Image
            src="/stones/lavender-blue/slab-1.jpg"
            alt="Lavender Blue Granite"
            fill
            className="object-cover"
            priority
            quality={100}
          />
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div 
            className="w-6 h-10 rounded-full flex justify-center pt-2"
            style={{ border: '2px solid rgba(201, 169, 98, 0.5)' }}
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: '#C9A962' }}
            />
          </div>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          ANIMATED STATS SECTION
          ═══════════════════════════════════════════════════════════════ */}
      <section className="py-20 relative overflow-hidden" style={{ backgroundColor: '#0D0D0D' }}>
        {/* Background gradient accent */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{ 
            background: 'radial-gradient(ellipse at center, rgba(201, 169, 98, 0.15) 0%, transparent 70%)' 
          }}
        />
        
        <Container>
          <RevealOnScroll>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
              {/* Stat 1: Years */}
              <div className="text-center group">
                <div className="relative inline-block">
                  <span 
                    className="text-5xl md:text-6xl lg:text-7xl font-display font-light"
                    style={{ color: '#C9A962' }}
                  >
                    <AnimatedCounter value={25} duration={2} />
                  </span>
                  <span 
                    className="text-2xl md:text-3xl font-display"
                    style={{ color: '#C9A962' }}
                  >+</span>
                </div>
                <p 
                  className="mt-3 text-sm md:text-base tracking-wider uppercase"
                  style={{ color: 'rgba(245, 245, 240, 0.7)' }}
                >
                  Years of Excellence
                </p>
                <div 
                  className="mt-4 w-12 h-px mx-auto transition-all duration-500 group-hover:w-20"
                  style={{ backgroundColor: 'rgba(201, 169, 98, 0.3)' }}
                />
              </div>

              {/* Stat 2: Projects */}
              <div className="text-center group">
                <div className="relative inline-block">
                  <span 
                    className="text-5xl md:text-6xl lg:text-7xl font-display font-light"
                    style={{ color: '#C9A962' }}
                  >
                    <AnimatedCounter value={500} duration={2.5} />
                  </span>
                  <span 
                    className="text-2xl md:text-3xl font-display"
                    style={{ color: '#C9A962' }}
                  >+</span>
                </div>
                <p 
                  className="mt-3 text-sm md:text-base tracking-wider uppercase"
                  style={{ color: 'rgba(245, 245, 240, 0.7)' }}
                >
                  Projects Delivered
                </p>
                <div 
                  className="mt-4 w-12 h-px mx-auto transition-all duration-500 group-hover:w-20"
                  style={{ backgroundColor: 'rgba(201, 169, 98, 0.3)' }}
                />
              </div>

              {/* Stat 3: Capacity */}
              <div className="text-center group">
                <div className="relative inline-block">
                  <span 
                    className="text-5xl md:text-6xl lg:text-7xl font-display font-light"
                    style={{ color: '#C9A962' }}
                  >
                    <AnimatedCounter value={250} duration={2} suffix="K" />
                  </span>
                  <span 
                    className="text-2xl md:text-3xl font-display"
                    style={{ color: '#C9A962' }}
                  >+</span>
                </div>
                <p 
                  className="mt-3 text-sm md:text-base tracking-wider uppercase"
                  style={{ color: 'rgba(245, 245, 240, 0.7)' }}
                >
                  Sqft Monthly
                </p>
                <div 
                  className="mt-4 w-12 h-px mx-auto transition-all duration-500 group-hover:w-20"
                  style={{ backgroundColor: 'rgba(201, 169, 98, 0.3)' }}
                />
              </div>

              {/* Stat 4: Quarries */}
              <div className="text-center group">
                <div className="relative inline-block">
                  <span 
                    className="text-5xl md:text-6xl lg:text-7xl font-display font-light"
                    style={{ color: '#C9A962' }}
                  >
                    <AnimatedCounter value={1} duration={1.5} />
                  </span>
                </div>
                <p 
                  className="mt-3 text-sm md:text-base tracking-wider uppercase"
                  style={{ color: 'rgba(245, 245, 240, 0.7)' }}
                >
                  Own Quarry
                </p>
                <div 
                  className="mt-4 w-12 h-px mx-auto transition-all duration-500 group-hover:w-20"
                  style={{ backgroundColor: 'rgba(201, 169, 98, 0.3)' }}
                />
              </div>
            </div>
          </RevealOnScroll>
        </Container>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          STONES COLLECTION
          ═══════════════════════════════════════════════════════════════ */}
      <Section id="stones" padding="lg" background="charcoal-light">
        <Container>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp}>
              <SectionHeader
                eyebrow="Our Collection"
                title="Stones Collection"
                description="Lavender Blue Quarry-Owner. Factory-Finished. Four signature granites for landmark projects."
              />
            </motion.div>

            {/* Stones Grid */}
            <motion.div
              variants={staggerContainer}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {stones.map((stone) => (
                <motion.div key={stone.id} variants={fadeInUp}>
                  <Link href={`/stones/${stone.slug}`} className="group block">
                    <div 
                      className="relative aspect-[3/4] overflow-hidden rounded-lg transition-all duration-500 hover-lift"
                      style={{ 
                        backgroundColor: '#0A0A0A', 
                        border: '1px solid rgba(245, 245, 240, 0.05)' 
                      }}
                    >
                      {/* Stone Image */}
                      <Image
                        src={stone.images.thumbnail}
                        alt={stone.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                      
                      {/* Content */}
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <h3 
                          className="font-serif text-xl transition-colors"
                          style={{ color: '#F5F5F0' }}
                        >
                          {stone.name}
                        </h3>
                        <p 
                          className="text-sm mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          style={{ color: '#A0A0A0' }}
                        >
                          {stone.shortDescription}
                        </p>
                        <div 
                          className="flex items-center gap-2 mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          style={{ color: '#C9A962' }}
                        >
                          <span className="text-sm">View Details</span>
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>

            {/* View All CTA */}
            <motion.div variants={fadeInUp} className="text-center mt-12">
              <Link href="/stones">
                <Button variant="outline" size="lg" rightIcon={<ArrowRight className="w-5 h-5" />}>
                  View All Stones
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </Container>
      </Section>

      {/* ═══════════════════════════════════════════════════════════════
          CAPABILITIES SECTION
          ═══════════════════════════════════════════════════════════════ */}
      <Section padding="lg" background="charcoal">
        <Container>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp}>
              <SectionHeader
                eyebrow="Quarry to Factory"
                title="Quarry-to-Finish Excellence & Scale"
                description={`${companyInfo.stats.monthlyCapacity} ${companyInfo.stats.capacityUnit} monthly capacity with complete vertical integration.`}
              />
            </motion.div>

            {/* Capabilities Grid */}
            <motion.div
              variants={staggerContainer}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {capabilities.map((capability) => (
                <motion.div
                  key={capability.id}
                  variants={fadeInUp}
                  className="p-6 rounded-lg transition-all duration-300 group"
                  style={{ 
                    backgroundColor: '#141414', 
                    border: '1px solid rgba(245, 245, 240, 0.05)' 
                  }}
                >
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center mb-4 transition-colors"
                    style={{ backgroundColor: 'rgba(201, 169, 98, 0.1)' }}
                  >
                    <span style={{ color: '#C9A962', fontSize: '1.25rem' }}>✦</span>
                  </div>
                  <h3 
                    className="font-serif text-lg mb-2"
                    style={{ color: '#F5F5F0' }}
                  >
                    {capability.title}
                  </h3>
                  <p 
                    className="text-sm"
                    style={{ color: '#A0A0A0' }}
                  >
                    {capability.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </Container>
      </Section>

      {/* ═══════════════════════════════════════════════════════════════
          WHY CHOOSE US - TRUST SIGNALS
          ═══════════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28" style={{ backgroundColor: '#0D0D0D' }}>
        <Container>
          <RevealOnScroll>
            <div className="text-center mb-16">
              <p 
                className="text-sm tracking-widest uppercase mb-4"
                style={{ color: '#C9A962' }}
              >
                Why Choose Us
              </p>
              <h2 
                className="font-display text-4xl md:text-5xl font-light mb-4"
                style={{ color: '#F5F5F0' }}
              >
                <AnimatedWords text="The A B Minerals Advantage" />
              </h2>
              <p 
                className="max-w-2xl mx-auto text-lg"
                style={{ color: 'rgba(245, 245, 240, 0.6)' }}
              >
                Vertically integrated excellence from quarry to your project site.
              </p>
            </div>
          </RevealOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <Sparkles className="w-6 h-6" />,
                title: "Best Price — Direct",
                description: "Own 100-acre quarry + own factory = no middlemen. You get the best Lavender Blue granite price in India, starting ₹105/sqft."
              },
              {
                icon: <Factory className="w-6 h-6" />,
                title: "In-House Processing",
                description: "State-of-the-art factory: gang saws, multi-cutters & 12-head polishers. 250,000+ sqft monthly — any scale, any finish."
              },
              {
                icon: <Shield className="w-6 h-6" />,
                title: "Quality Assurance",
                description: "Quarry-to-delivery quality control. Consistent colour, finish & thickness — trusted by airports & metro projects."
              },
              {
                icon: <Truck className="w-6 h-6" />,
                title: "Pan-India & Export",
                description: "Efficient logistics across India + export-ready packing. Sharjah Airport, Surat Bullet Train — we deliver worldwide."
              }
            ].map((item, index) => (
              <RevealOnScroll key={index} delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  className="p-8 rounded-2xl h-full transition-all duration-300"
                  style={{ 
                    backgroundColor: '#141414', 
                    border: '1px solid rgba(201, 169, 98, 0.15)',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
                  }}
                >
                  <div 
                    className="w-14 h-14 rounded-xl flex items-center justify-center mb-6"
                    style={{ 
                      background: 'linear-gradient(135deg, rgba(201, 169, 98, 0.2) 0%, rgba(201, 169, 98, 0.1) 100%)',
                      border: '1px solid rgba(201, 169, 98, 0.3)'
                    }}
                  >
                    <span style={{ color: '#C9A962' }}>{item.icon}</span>
                  </div>
                  <h3 
                    className="font-display text-xl mb-3"
                    style={{ color: '#F5F5F0' }}
                  >
                    {item.title}
                  </h3>
                  <p 
                    className="text-sm leading-relaxed"
                    style={{ color: 'rgba(245, 245, 240, 0.6)' }}
                  >
                    {item.description}
                  </p>
                </motion.div>
              </RevealOnScroll>
            ))}
          </div>
        </Container>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          BENCHMARKS / PROJECTS SECTION
          ═══════════════════════════════════════════════════════════════ */}
      <Section padding="lg" background="charcoal-light">
        <Container>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp}>
              <SectionHeader
                eyebrow="Track Record"
                title="Benchmark Projects"
                description="Used in projects such as airports and metro rail systems across India."
              />
            </motion.div>

            {/* Projects Grid - Featured projects with real images */}
            <motion.div
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {benchmarkProjects.filter(p => p.featured).map((project) => (
                <motion.div
                  key={project.id}
                  variants={fadeInUp}
                >
                  <Link href="/projects" className="group block">
                    <div 
                      className="relative aspect-video mb-4 rounded-lg overflow-hidden"
                      style={{ 
                        backgroundColor: '#0A0A0A', 
                        border: '1px solid rgba(245, 245, 240, 0.05)' 
                      }}
                    >
                      {project.images && project.images.length > 0 ? (
                        <Image
                          src={project.images[0]}
                          alt={project.name}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      ) : project.video ? (
                        <video
                          src={project.video}
                          className="w-full h-full object-cover"
                          muted
                          loop
                          playsInline
                          autoPlay
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <div className="text-4xl" style={{ color: 'rgba(201, 169, 98, 0.3)' }}>🏛️</div>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <h3 
                      className="font-serif text-xl mb-1 group-hover:text-gold transition-colors"
                      style={{ color: '#F5F5F0' }}
                    >
                      {project.name}
                    </h3>
                    <p className="text-sm" style={{ color: '#C9A962' }}>{project.type}</p>
                    <span 
                      className="inline-block mt-2 px-3 py-1 text-xs rounded-full"
                      style={{ backgroundColor: 'rgba(201, 169, 98, 0.1)', color: '#C9A962' }}
                    >
                      {project.status}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </motion.div>

            {/* Other Notable Projects */}
            <motion.div
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10"
            >
              {benchmarkProjects.filter(p => !p.featured).map((project) => (
                <motion.div
                  key={project.id}
                  variants={fadeInUp}
                >
                  <Link href="/projects" className="group block">
                    <div 
                      className="relative aspect-video mb-4 rounded-lg overflow-hidden"
                      style={{ 
                        backgroundColor: '#0A0A0A', 
                        border: '1px solid rgba(245, 245, 240, 0.05)' 
                      }}
                    >
                      {project.images && project.images.length > 0 ? (
                        <Image
                          src={project.images[0]}
                          alt={project.name}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <div className="text-4xl" style={{ color: 'rgba(201, 169, 98, 0.3)' }}>🏛️</div>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                      {/* Stone tags */}
                      <div className="absolute bottom-3 left-3 flex flex-wrap gap-1">
                        {project.stoneUsed.map((stone) => (
                          <span 
                            key={stone}
                            className="px-2 py-0.5 text-xs rounded-full backdrop-blur-sm"
                            style={{ backgroundColor: 'rgba(201, 169, 98, 0.2)', color: '#C9A962', border: '1px solid rgba(201, 169, 98, 0.3)' }}
                          >
                            {stone}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-xs uppercase tracking-wider mb-1" style={{ color: '#C9A962' }}>{project.type}</p>
                        <h3 className="font-serif text-lg mb-1" style={{ color: '#F5F5F0' }}>
                          {project.name}
                        </h3>
                        <p className="text-sm" style={{ color: '#A0A0A0' }}>{project.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <span 
                        className="inline-block px-3 py-1 text-xs rounded-full"
                        style={{ backgroundColor: 'rgba(201, 169, 98, 0.1)', color: '#C9A962' }}
                      >
                        {project.status}
                      </span>
                      {project.quantity && (
                        <span className="text-sm font-medium" style={{ color: '#F5F5F0' }}>
                          {project.quantity}
                        </span>
                      )}
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>

            {/* View All Projects CTA */}
            <motion.div variants={fadeInUp} className="text-center mt-10">
              <Link href="/projects">
                <Button variant="outline" size="lg" rightIcon={<ArrowRight className="w-5 h-5" />}>
                  View All Projects
                </Button>
              </Link>
            </motion.div>

            {/* Disclaimer */}
            <motion.p 
              variants={fadeInUp} 
              className="text-center text-xs mt-8"
              style={{ color: '#A0A0A0' }}
            >
              {projectDisclaimer}
            </motion.p>
          </motion.div>
        </Container>
      </Section>

      {/* ═══════════════════════════════════════════════════════════════
          CTA SECTION - Premium Animated
          ═══════════════════════════════════════════════════════════════ */}
      <section className="relative py-24 overflow-hidden" style={{ backgroundColor: '#0A0A0A' }}>
        {/* Background elements */}
        <div 
          className="absolute inset-0"
          style={{ 
            background: 'radial-gradient(ellipse at bottom, rgba(201, 169, 98, 0.1) 0%, transparent 60%)' 
          }}
        />
        <div 
          className="absolute top-0 left-0 w-full h-px"
          style={{ 
            background: 'linear-gradient(90deg, transparent, rgba(201, 169, 98, 0.3), transparent)' 
          }}
        />
        
        <Container size="md">
          <RevealOnScroll>
            <div className="text-center relative z-10">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <p 
                  className="text-sm tracking-widest uppercase mb-6"
                  style={{ color: '#C9A962' }}
                >
                  Get Started Today
                </p>
                <h2 
                  className="font-display text-4xl md:text-5xl lg:text-6xl font-light mb-6 leading-tight"
                  style={{ color: '#F5F5F0' }}
                >
                  <AnimatedWords text="Ready to source premium granite?" />
                </h2>
                <p 
                  className="text-lg md:text-xl max-w-xl mx-auto mb-10 leading-relaxed"
                  style={{ color: 'rgba(245, 245, 240, 0.7)' }}
                >
                  Get rates, availability, and samples. Most inquiries answered within hours on WhatsApp.
                </p>
              </motion.div>

              <motion.div 
                className="flex flex-col sm:flex-row gap-4 justify-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    variant="gold"
                    size="lg"
                    onClick={handleRequestQuote}
                    leftIcon={<MessageCircle className="w-5 h-5" />}
                  >
                    Request a Quote
                  </Button>
                </motion.div>
                <Link href="/contact">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                    <Button variant="outline" size="lg">
                      Contact Us
                    </Button>
                  </motion.div>
                </Link>
              </motion.div>

              {/* Trust indicators */}
              <motion.div 
                className="mt-12 flex flex-wrap justify-center gap-6 md:gap-10"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#C9A962' }} />
                  <span className="text-sm" style={{ color: 'rgba(245, 245, 240, 0.5)' }}>Quick Response</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#C9A962' }} />
                  <span className="text-sm" style={{ color: 'rgba(245, 245, 240, 0.5)' }}>Sample Kits Available</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#C9A962' }} />
                  <span className="text-sm" style={{ color: 'rgba(245, 245, 240, 0.5)' }}>Pan-India Delivery</span>
                </div>
              </motion.div>
            </div>
          </RevealOnScroll>
        </Container>
      </section>
    </>
  );
}
