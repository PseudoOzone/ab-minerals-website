"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Factory, Ruler, Layers, Sparkles, MessageCircle, Phone, MapPin, Clock, Wrench, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Heading, Text } from "@/components/ui/Typography";
import { AnimatedCounter, RevealOnScroll, AnimatedWords } from "@/components/ui/AnimatedElements";
import { getFactoryManager } from "@/config/whatsapp.config";
import { openChatBot } from "@/lib/chatbot-events";
import { contactInfo } from "@/config/company.config";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

// ═══════════════════════════════════════════════════════════════════════
// FACTORY PAGE - Machinery Showcase & Processing Specifications
// ═══════════════════════════════════════════════════════════════════════

const finishIcons = ["✨", "🪨", "🔲", "🔥"];
const finishKeys = [
  { name: "polished", desc: "polishedDesc" },
  { name: "honed", desc: "honedDesc" },
  { name: "laptro", desc: "laptroDesc" },
  { name: "flamed", desc: "flamedDesc" },
];

const sizeIcons = [
  <Ruler key="ruler" className="w-6 h-6" />,
  <Layers key="layers" className="w-6 h-6" />,
  <Wrench key="wrench" className="w-6 h-6" />,
  <Sparkles key="sparkles" className="w-6 h-6" />,
];
const sizeKeys = [
  { title: "gangSawSlabs", spec: "gangSawSpec", desc: "gangSawDesc" },
  { title: "blockCutter", spec: "blockCutterSpec", desc: "blockCutterDesc" },
  { title: "tiles", spec: "tilesSpec", desc: "tilesDesc" },
  { title: "customThickness", spec: "customThicknessSpec", desc: "customThicknessDesc" },
];

const factoryStatsData = [
  { value: 250, suffix: "K+", labelKey: "sqftMonthly" },
  { value: 4, suffix: "", labelKey: "surfaceFinishes" },
  { value: 8, suffix: "", labelKey: "machinesInstalled" },
  { value: 100, suffix: "+", labelKey: "blocksProcessed" },
];

const machineryKeys = [
  { name: "multiCutter", desc: "multiCutterDesc", count: "4 Nos" },
  { name: "singleBladeCutter", desc: "singleBladeDesc", count: "2 Nos" },
  { name: "linePolisher", desc: "linePolisherDesc", count: "1 No" },
  { name: "wiresaw", desc: "wiresawDesc", count: "1 No" },
];

export function FactoryClient() {
  const t = useTranslations('factory');
  const tc = useTranslations('common');

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  const factoryManager = getFactoryManager();

  const handleQuote = () => {
    openChatBot("quote_start");
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
              {t('eyebrow')}
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium mb-6"
            >
              <span style={{ color: '#C9A962' }}>{t('title')}</span>
              <br />
              <span style={{ color: '#F5F5F0' }}>{t('subtitle')}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-lg md:text-xl mb-8 max-w-2xl"
              style={{ color: 'rgba(245, 245, 240, 0.8)' }}
            >
              {t('description')}
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
                {t('requestFactoryQuote')}
              </Button>
              <Button
                variant="outline"
                size="lg"
                rightIcon={<ArrowRight className="w-5 h-5" />}
                onClick={() => document.getElementById("specs")?.scrollIntoView({ behavior: "smooth" })}
              >
                {t('viewSpecs')}
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
              {factoryStatsData.map((stat, index) => (
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
                    {t(stat.labelKey)}
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
                {t('finishesTitle')}
              </p>
              <h2 className="font-display text-4xl md:text-5xl font-light mb-4" style={{ color: '#F5F5F0' }}>
                <AnimatedWords text={t('finishesSubtitle')} />
              </h2>
              <p className="max-w-2xl mx-auto text-lg" style={{ color: 'rgba(245, 245, 240, 0.6)' }}>
                {t('finishesDesc')}
              </p>
            </div>
          </RevealOnScroll>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {finishKeys.map((finish, index) => (
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
                  <div className="text-4xl mb-6">{finishIcons[index]}</div>
                  <h3 className="font-display text-xl mb-3" style={{ color: '#F5F5F0' }}>
                    {t(finish.name)}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'rgba(245, 245, 240, 0.6)' }}>
                    {t(finish.desc)}
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
                {t('sizesTitle')}
              </p>
              <h2 className="font-display text-4xl md:text-5xl font-light mb-4" style={{ color: '#F5F5F0' }}>
                <AnimatedWords text={t('sizesSubtitle')} />
              </h2>
              <p className="max-w-2xl mx-auto text-lg" style={{ color: 'rgba(245, 245, 240, 0.6)' }}>
                {t('sizesDesc')}
              </p>
            </div>
          </RevealOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {sizeKeys.map((category, index) => (
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
                      <span style={{ color: '#C9A962' }}>{sizeIcons[index]}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-display text-xl mb-2" style={{ color: '#F5F5F0' }}>
                        {t(category.title)}
                      </h3>
                      <div 
                        className="inline-block px-4 py-2 rounded-lg mb-3 font-mono text-sm"
                        style={{ 
                          backgroundColor: 'rgba(201, 169, 98, 0.1)',
                          border: '1px solid rgba(201, 169, 98, 0.2)',
                          color: '#C9A962'
                        }}
                      >
                        {t(category.spec)}
                      </div>
                      <p className="text-sm leading-relaxed" style={{ color: 'rgba(245, 245, 240, 0.6)' }}>
                        {t(category.desc)}
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
                {t('equipmentTitle')}
              </p>
              <h2 className="font-display text-4xl md:text-5xl font-light mb-4" style={{ color: '#F5F5F0' }}>
                <AnimatedWords text={t('equipmentSubtitle')} />
              </h2>
              <p className="max-w-2xl mx-auto text-lg" style={{ color: 'rgba(245, 245, 240, 0.6)' }}>
                {t('equipmentDesc')}
              </p>
            </div>
          </RevealOnScroll>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {machineryKeys.map((machine, index) => (
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
                          {t(machine.name)}
                        </h3>
                        <span 
                          className="px-3 py-1 rounded-full text-xs font-medium"
                          style={{ backgroundColor: 'rgba(201, 169, 98, 0.15)', color: '#C9A962' }}
                        >
                          {machine.count}
                        </span>
                      </div>
                      <p className="text-sm" style={{ color: '#A0A0A0' }}>
                        {t(machine.desc)}
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
                {t('locationTitle')}
              </p>
              <h2 className="font-display text-4xl md:text-5xl font-light mb-4" style={{ color: '#F5F5F0' }}>
                <AnimatedWords text={t('locationName')} />
              </h2>
              <p className="max-w-2xl mx-auto text-lg" style={{ color: 'rgba(245, 245, 240, 0.6)' }}>
                {t('locationAddress')}
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
                height="300"
                style={{ border: 0, minHeight: 'min(450px, 60vh)' }}
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
                <p className="text-sm font-medium mb-1" style={{ color: '#F5F5F0' }}>{t('address')}</p>
                <p className="text-sm" style={{ color: 'rgba(245, 245, 240, 0.6)' }}>
                  {t('locationAddress')}
                </p>
              </div>
              <div 
                className="text-center p-6 rounded-xl"
                style={{ backgroundColor: '#141414', border: '1px solid rgba(245, 245, 240, 0.05)' }}
              >
                <Clock className="w-6 h-6 mx-auto mb-3" style={{ color: '#C9A962' }} />
                <p className="text-sm font-medium mb-1" style={{ color: '#F5F5F0' }}>{t('workingHours')}</p>
                <p className="text-sm" style={{ color: 'rgba(245, 245, 240, 0.6)' }}>
                  {t('workingHoursValue')}
                </p>
              </div>
              <div 
                className="text-center p-6 rounded-xl"
                style={{ backgroundColor: '#141414', border: '1px solid rgba(245, 245, 240, 0.05)' }}
              >
                <Phone className="w-6 h-6 mx-auto mb-3" style={{ color: '#C9A962' }} />
                <p className="text-sm font-medium mb-1" style={{ color: '#F5F5F0' }}>{t('contactFactory')}</p>
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
                {t('ctaEyebrow')}
              </p>
              <h2 
                className="font-display text-4xl md:text-5xl lg:text-6xl font-light mb-6"
                style={{ color: '#F5F5F0' }}
              >
                <AnimatedWords text={t('ctaTitle')} />
              </h2>
              <p 
                className="text-lg md:text-xl max-w-xl mx-auto mb-10"
                style={{ color: 'rgba(245, 245, 240, 0.7)' }}
              >
                {t('ctaDescription')}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    variant="gold"
                    size="lg"
                    onClick={handleQuote}
                    leftIcon={<MessageCircle className="w-5 h-5" />}
                  >
                    {t('requestFactoryQuote')}
                  </Button>
                </motion.div>
                <Link href="/quarry">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                    <Button variant="outline" size="lg" rightIcon={<ArrowRight className="w-5 h-5" />}>
                      {t('visitQuarry')}
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
