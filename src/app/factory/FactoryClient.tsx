"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Factory, Ruler, Layers, Sparkles, MessageCircle, Phone, MapPin, Clock, Wrench, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Heading, Text } from "@/components/ui/Typography";
import { AnimatedCounter, RevealOnScroll, AnimatedWords } from "@/components/ui/AnimatedElements";
import { generateWhatsAppUrl, messageTemplates, getFactoryManager, generateWhatsAppUrlForContact } from "@/config/whatsapp.config";
import { contactInfo } from "@/config/company.config";
import Link from "next/link";

// ═══════════════════════════════════════════════════════════════════════
// FACTORY PAGE - Machinery Showcase & Processing Specifications
// ═══════════════════════════════════════════════════════════════════════

const finishes = [
  {
    name: "Polished",
    description: "Mirror-like glossy finish that highlights the stone's natural color and veining patterns.",
    icon: "✨",
  },
  {
    name: "Honed",
    description: "Smooth matte finish with a softer, more natural appearance. Ideal for flooring.",
    icon: "🪨",
  },
  {
    name: "Laptro / Lepatora",
    description: "Semi-polished leather-like texture combining elegance with slip resistance.",
    icon: "🔲",
  },
  {
    name: "Flamed",
    description: "Rough textured finish created by high-temperature torching. Perfect for exteriors.",
    icon: "🔥",
  },
];

const sizeCategories = [
  {
    title: "Gang Saw Slabs",
    icon: <Ruler className="w-6 h-6" />,
    specs: "300 × 150 cm and above",
    description: "Large format slabs cut with precision gang saws for seamless installations. Ideal for countertops, wall cladding, and large-scale projects.",
  },
  {
    title: "Block Cutter Sizes",
    icon: <Layers className="w-6 h-6" />,
    specs: "Height: 60–120 cm | Length: 180–330 cm",
    description: "Custom dimensions for specialized projects requiring precise height and length configurations.",
  },
  {
    title: "Tiles",
    icon: <Wrench className="w-6 h-6" />,
    specs: "30×30 | 45×45 | 30×60 | 60×60 | 90×90 | 90×120 cm",
    description: "Standard and premium tile sizes for flooring, wall cladding, and modular installations.",
  },
  {
    title: "Custom Thickness",
    icon: <Sparkles className="w-6 h-6" />,
    specs: "As per requirement",
    description: "Thickness tailored to project specifications. Standard options: 15mm, 18mm, 20mm, 30mm, and custom.",
  },
];

const factoryStats = [
  { value: 250, suffix: "K+", label: "Sqft Monthly Capacity" },
  { value: 4, suffix: "", label: "Surface Finishes" },
  { value: 8, suffix: "", label: "Machines Installed" },
  { value: 100, suffix: "+", label: "Blocks Processed Monthly" },
];

const machinery = [
  {
    name: "Multi Cutter",
    description: "4 units — High-speed multi-blade cutters for efficient slab and tile production at scale.",
    count: "4 Nos",
  },
  {
    name: "Single Blade Cutter",
    description: "2 units — Precision single-blade cutters for custom dimensions and specialized cuts.",
    count: "2 Nos",
  },
  {
    name: "Line Polisher (12-Head)",
    description: "1 unit — 12-head automated polishing line for mirror-finish quality across large slabs.",
    count: "1 No",
  },
  {
    name: "Block Dressing Wiresaw",
    description: "1 unit — Diamond wire saw for precise block dressing and shaping before processing.",
    count: "1 No",
  },
];

export function FactoryClient() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  const factoryManager = getFactoryManager();

  const handleQuote = () => {
    const url = generateWhatsAppUrl(messageTemplates.general);
    window.open(url, "_blank");
  };

  return (
    <>
      {/* ═══════════════════════════════════════════════════════════════
          HERO - Factory Video Background
          ═══════════════════════════════════════════════════════════════ */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Video Background */}
        <motion.div className="absolute inset-0" style={{ scale: heroScale }}>
          <video
            src="/factory/factory.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          />
          {/* Dark overlay for readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal/80 via-charcoal/60 to-charcoal" />
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal/70 to-transparent" />
        </motion.div>

        <Container className="relative z-10 pt-32 pb-20">
          <motion.div
            style={{ opacity: heroOpacity }}
            className="max-w-3xl"
          >
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-sm tracking-widest uppercase mb-6"
              style={{ color: '#C9A962' }}
            >
              State-of-the-Art Processing
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium mb-6"
            >
              <span style={{ color: '#C9A962' }}>Our Factory</span>
              <br />
              <span style={{ color: '#F5F5F0' }}>Where Precision Meets Scale</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-lg md:text-xl mb-8 max-w-2xl"
              style={{ color: 'rgba(245, 245, 240, 0.8)' }}
            >
              From raw quarry blocks to perfectly finished slabs, tiles, and custom cuts — 
              our integrated factory handles every finish and size with industrial precision.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button
                variant="gold"
                size="lg"
                onClick={handleQuote}
                leftIcon={<MessageCircle className="w-5 h-5" />}
              >
                Request Factory Quote
              </Button>
              <Button
                variant="outline"
                size="lg"
                rightIcon={<ArrowRight className="w-5 h-5" />}
                onClick={() => document.getElementById("specs")?.scrollIntoView({ behavior: "smooth" })}
              >
                View Specifications
              </Button>
            </motion.div>
          </motion.div>
        </Container>

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
          FACTORY STATS
          ═══════════════════════════════════════════════════════════════ */}
      <section className="py-20 relative overflow-hidden" style={{ backgroundColor: '#0D0D0D' }}>
        <div 
          className="absolute inset-0 opacity-30"
          style={{ 
            background: 'radial-gradient(ellipse at center, rgba(201, 169, 98, 0.15) 0%, transparent 70%)' 
          }}
        />
        <Container>
          <RevealOnScroll>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
              {factoryStats.map((stat, index) => (
                <div key={index} className="text-center group">
                  <div className="relative inline-block">
                    <span 
                      className="text-5xl md:text-6xl lg:text-7xl font-display font-light"
                      style={{ color: '#C9A962' }}
                    >
                      <AnimatedCounter value={stat.value} duration={2} suffix={stat.suffix.replace('+', '')} />
                    </span>
                    {stat.suffix.includes('+') && (
                      <span className="text-2xl md:text-3xl font-display" style={{ color: '#C9A962' }}>+</span>
                    )}
                  </div>
                  <p 
                    className="mt-3 text-sm md:text-base tracking-wider uppercase"
                    style={{ color: 'rgba(245, 245, 240, 0.7)' }}
                  >
                    {stat.label}
                  </p>
                  <div 
                    className="mt-4 w-12 h-px mx-auto transition-all duration-500 group-hover:w-20"
                    style={{ backgroundColor: 'rgba(201, 169, 98, 0.3)' }}
                  />
                </div>
              ))}
            </div>
          </RevealOnScroll>
        </Container>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SURFACE FINISHES
          ═══════════════════════════════════════════════════════════════ */}
      <section id="specs" className="py-24 md:py-32" style={{ backgroundColor: '#0A0A0A' }}>
        <Container>
          <RevealOnScroll>
            <div className="text-center mb-16">
              <p className="text-sm tracking-widest uppercase mb-4" style={{ color: '#C9A962' }}>
                Surface Finishes
              </p>
              <h2 className="font-display text-4xl md:text-5xl font-light mb-4" style={{ color: '#F5F5F0' }}>
                <AnimatedWords text="Four Premium Finishes" />
              </h2>
              <p className="max-w-2xl mx-auto text-lg" style={{ color: 'rgba(245, 245, 240, 0.6)' }}>
                Every stone can be finished to match your project&apos;s aesthetic and functional requirements.
              </p>
            </div>
          </RevealOnScroll>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {finishes.map((finish, index) => (
              <RevealOnScroll key={finish.name} delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  className="p-8 rounded-2xl h-full text-center"
                  style={{ 
                    backgroundColor: '#141414', 
                    border: '1px solid rgba(201, 169, 98, 0.15)',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
                  }}
                >
                  <div className="text-4xl mb-6">{finish.icon}</div>
                  <h3 className="font-display text-xl mb-3" style={{ color: '#F5F5F0' }}>
                    {finish.name}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'rgba(245, 245, 240, 0.6)' }}>
                    {finish.description}
                  </p>
                </motion.div>
              </RevealOnScroll>
            ))}
          </div>
        </Container>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SIZE SPECIFICATIONS
          ═══════════════════════════════════════════════════════════════ */}
      <section className="py-24 md:py-32" style={{ backgroundColor: '#0D0D0D' }}>
        <Container>
          <RevealOnScroll>
            <div className="text-center mb-16">
              <p className="text-sm tracking-widest uppercase mb-4" style={{ color: '#C9A962' }}>
                Size Specifications
              </p>
              <h2 className="font-display text-4xl md:text-5xl font-light mb-4" style={{ color: '#F5F5F0' }}>
                <AnimatedWords text="Every Size, Every Scale" />
              </h2>
              <p className="max-w-2xl mx-auto text-lg" style={{ color: 'rgba(245, 245, 240, 0.6)' }}>
                From monumental slabs to precision-cut tiles — our factory delivers to your exact specifications.
              </p>
            </div>
          </RevealOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {sizeCategories.map((category, index) => (
              <RevealOnScroll key={category.title} delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3 }}
                  className="p-8 rounded-2xl"
                  style={{ 
                    backgroundColor: '#141414', 
                    border: '1px solid rgba(201, 169, 98, 0.15)',
                  }}
                >
                  <div className="flex items-start gap-4">
                    <div 
                      className="w-14 h-14 rounded-xl flex-shrink-0 flex items-center justify-center"
                      style={{ 
                        background: 'linear-gradient(135deg, rgba(201, 169, 98, 0.2) 0%, rgba(201, 169, 98, 0.1) 100%)',
                        border: '1px solid rgba(201, 169, 98, 0.3)'
                      }}
                    >
                      <span style={{ color: '#C9A962' }}>{category.icon}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-display text-xl mb-2" style={{ color: '#F5F5F0' }}>
                        {category.title}
                      </h3>
                      <div 
                        className="inline-block px-4 py-2 rounded-lg mb-3 font-mono text-sm"
                        style={{ 
                          backgroundColor: 'rgba(201, 169, 98, 0.1)',
                          border: '1px solid rgba(201, 169, 98, 0.2)',
                          color: '#C9A962'
                        }}
                      >
                        {category.specs}
                      </div>
                      <p className="text-sm leading-relaxed" style={{ color: 'rgba(245, 245, 240, 0.6)' }}>
                        {category.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </RevealOnScroll>
            ))}
          </div>
        </Container>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          MACHINERY & EQUIPMENT
          ═══════════════════════════════════════════════════════════════ */}
      <section className="py-24 md:py-32" style={{ backgroundColor: '#0A0A0A' }}>
        <Container>
          <RevealOnScroll>
            <div className="text-center mb-16">
              <p className="text-sm tracking-widest uppercase mb-4" style={{ color: '#C9A962' }}>
                Equipment & Machinery
              </p>
              <h2 className="font-display text-4xl md:text-5xl font-light mb-4" style={{ color: '#F5F5F0' }}>
                <AnimatedWords text="Industrial-Grade Processing" />
              </h2>
              <p className="max-w-2xl mx-auto text-lg" style={{ color: 'rgba(245, 245, 240, 0.6)' }}>
                Our factory is equipped with modern machinery for every stage of granite processing.
              </p>
            </div>
          </RevealOnScroll>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {machinery.map((machine, index) => (
              <RevealOnScroll key={machine.name} delay={index * 0.08}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3 }}
                  className="p-6 rounded-xl group"
                  style={{ 
                    backgroundColor: '#141414', 
                    border: '1px solid rgba(201, 169, 98, 0.15)' 
                  }}
                >
                  <div className="flex items-start gap-4">
                    <div 
                      className="w-14 h-14 rounded-xl flex-shrink-0 flex items-center justify-center"
                      style={{ 
                        background: 'linear-gradient(135deg, rgba(201, 169, 98, 0.2) 0%, rgba(201, 169, 98, 0.1) 100%)',
                        border: '1px solid rgba(201, 169, 98, 0.3)'
                      }}
                    >
                      <Factory className="w-5 h-5" style={{ color: '#C9A962' }} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-serif text-lg" style={{ color: '#F5F5F0' }}>
                          {machine.name}
                        </h3>
                        <span 
                          className="px-3 py-1 rounded-full text-xs font-medium"
                          style={{ backgroundColor: 'rgba(201, 169, 98, 0.15)', color: '#C9A962' }}
                        >
                          {machine.count}
                        </span>
                      </div>
                      <p className="text-sm" style={{ color: '#A0A0A0' }}>
                        {machine.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </RevealOnScroll>
            ))}
          </div>
        </Container>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          FACTORY LOCATION
          ═══════════════════════════════════════════════════════════════ */}
      <section className="py-24 md:py-32" style={{ backgroundColor: '#0D0D0D' }}>
        <Container>
          <RevealOnScroll>
            <div className="text-center mb-16">
              <p className="text-sm tracking-widest uppercase mb-4" style={{ color: '#C9A962' }}>
                Factory Location
              </p>
              <h2 className="font-display text-4xl md:text-5xl font-light mb-4" style={{ color: '#F5F5F0' }}>
                <AnimatedWords text="Chamakhandi, Odisha" />
              </h2>
              <p className="max-w-2xl mx-auto text-lg" style={{ color: 'rgba(245, 245, 240, 0.6)' }}>
                8WWJ+9MR, Chamakhandi, Sriramachandrapur, Odisha 761045 — strategically located near our quarry.
              </p>
            </div>
          </RevealOnScroll>

          <RevealOnScroll>
            <div 
              className="rounded-2xl overflow-hidden"
              style={{ 
                border: '1px solid rgba(201, 169, 98, 0.2)',
                boxShadow: '0 4px 30px rgba(0, 0, 0, 0.4)'
              }}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3800!2d84.7271239!3d19.3424339!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a3d57001d29c99d%3A0x17e8898dab6d2652!2sChamakhandi%2C%20Sriramachandrapur%2C%20Odisha%20761045!5e1!3m2!1sen!2sin!4v1707100000000!5m2!1sen!2sin"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full"
              />
            </div>
          </RevealOnScroll>

          {/* Factory Info Cards */}
          <RevealOnScroll>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
              <div 
                className="text-center p-6 rounded-xl"
                style={{ backgroundColor: '#141414', border: '1px solid rgba(245, 245, 240, 0.05)' }}
              >
                <MapPin className="w-6 h-6 mx-auto mb-3" style={{ color: '#C9A962' }} />
                <p className="text-sm font-medium mb-1" style={{ color: '#F5F5F0' }}>Address</p>
                <p className="text-sm" style={{ color: 'rgba(245, 245, 240, 0.6)' }}>
                  Chamakhandi, Sriramachandrapur, Odisha 761045
                </p>
              </div>
              <div 
                className="text-center p-6 rounded-xl"
                style={{ backgroundColor: '#141414', border: '1px solid rgba(245, 245, 240, 0.05)' }}
              >
                <Clock className="w-6 h-6 mx-auto mb-3" style={{ color: '#C9A962' }} />
                <p className="text-sm font-medium mb-1" style={{ color: '#F5F5F0' }}>Working Hours</p>
                <p className="text-sm" style={{ color: 'rgba(245, 245, 240, 0.6)' }}>
                  Mon – Sat: 9:00 AM – 6:00 PM
                </p>
              </div>
              <div 
                className="text-center p-6 rounded-xl"
                style={{ backgroundColor: '#141414', border: '1px solid rgba(245, 245, 240, 0.05)' }}
              >
                <Phone className="w-6 h-6 mx-auto mb-3" style={{ color: '#C9A962' }} />
                <p className="text-sm font-medium mb-1" style={{ color: '#F5F5F0' }}>Contact Factory</p>
                <p className="text-sm" style={{ color: 'rgba(245, 245, 240, 0.6)' }}>
                  {contactInfo.phone.display}
                </p>
              </div>
            </div>
          </RevealOnScroll>
        </Container>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          CTA SECTION
          ═══════════════════════════════════════════════════════════════ */}
      <section className="relative py-24 overflow-hidden" style={{ backgroundColor: '#0A0A0A' }}>
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
              <p className="text-sm tracking-widest uppercase mb-6" style={{ color: '#C9A962' }}>
                Get Started
              </p>
              <h2 
                className="font-display text-4xl md:text-5xl lg:text-6xl font-light mb-6"
                style={{ color: '#F5F5F0' }}
              >
                <AnimatedWords text="Need custom sizes or finishes?" />
              </h2>
              <p 
                className="text-lg md:text-xl max-w-xl mx-auto mb-10"
                style={{ color: 'rgba(245, 245, 240, 0.7)' }}
              >
                Our factory team will guide you on the best specifications for your project. 
                Get a quote within hours on WhatsApp.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    variant="gold"
                    size="lg"
                    onClick={handleQuote}
                    leftIcon={<MessageCircle className="w-5 h-5" />}
                  >
                    Request Factory Quote
                  </Button>
                </motion.div>
                <Link href="/quarry">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                    <Button variant="outline" size="lg" rightIcon={<ArrowRight className="w-5 h-5" />}>
                      Visit Our Quarry
                    </Button>
                  </motion.div>
                </Link>
              </div>
            </div>
          </RevealOnScroll>
        </Container>
      </section>
    </>
  );
}
