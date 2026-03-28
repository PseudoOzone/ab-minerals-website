'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from '@/i18n/navigation';
import { Container, Typography } from '@/components/ui';
import MediaCarousel from '@/components/ui/MediaCarousel';
import { useTranslations } from 'next-intl';

// Quarry media items
const quarryMediaKeys = [
  { type: 'video' as const, src: '/quarry/quarry-1.mp4', titleKey: 'mediaTitle1', descKey: 'mediaDesc1' },
  { type: 'video' as const, src: '/quarry/quarry-2.mp4', titleKey: 'mediaTitle2', descKey: 'mediaDesc2' },
  { type: 'video' as const, src: '/quarry/lavender-blue.mp4', titleKey: 'mediaTitle3', descKey: 'mediaDesc3' },
  { type: 'image' as const, src: '/quarry/block-1.jpg', titleKey: 'mediaTitle4', descKey: 'mediaDesc4' },
  { type: 'image' as const, src: '/quarry/block-2.jpg', titleKey: 'mediaTitle5', descKey: 'mediaDesc5' },
];

// Stats data
const stats = [
  { value: '1', label: 'statOwnQuarry', suffix: '' },
  { value: '30', label: 'statYears', suffix: '+' },
  { value: '100', label: 'statAcres', suffix: '' },
  { value: '100', label: 'statOutput', suffix: '+' },
];

// Process steps
const processSteps = [
  {
    step: '01',
    title: 'extraction',
    description: 'extractionDesc',
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    step: '02',
    title: 'selection',
    description: 'selectionDesc',
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    step: '03',
    title: 'processing',
    description: 'processingDesc',
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    step: '04',
    title: 'finishing',
    description: 'finishingDesc',
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
  },
];

export function QuarryClient() {
  const t = useTranslations('quarry');
  const tc = useTranslations('common');

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  const quarryMedia = quarryMediaKeys.map((item) => ({
    type: item.type,
    src: item.src,
    title: t(item.titleKey),
    description: t(item.descKey),
  }));

  return (
    <>
      {/* Hero Section with Video Background */}
      <section ref={heroRef} className="relative h-screen overflow-hidden">
        <motion.div 
          className="absolute inset-0"
          style={{ scale: heroScale, y: heroY }}
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            className="h-full w-full object-cover"
            style={{
              filter: 'contrast(1.1) saturate(1.15) brightness(1.05)',
            }}
          >
            <source src="/quarry/quarry-1.mp4" type="video/mp4" />
          </video>
          <div 
            className="absolute inset-0"
            style={{
              background: `linear-gradient(to bottom, 
                rgba(13, 13, 13, 0.4) 0%, 
                rgba(13, 13, 13, 0.6) 50%,
                rgba(13, 13, 13, 0.95) 100%
              )`,
            }}
          />
        </motion.div>

        <motion.div 
          className="relative h-full flex items-center"
          style={{ opacity: heroOpacity }}
        >
          <Container>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="max-w-3xl"
            >
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-block px-4 py-2 rounded-full text-sm font-medium mb-6"
                style={{ 
                  backgroundColor: 'rgba(201, 169, 98, 0.15)',
                  color: '#C9A962',
                  border: '1px solid rgba(201, 169, 98, 0.3)',
                }}
              >
                {t('eyebrow')}
              </motion.span>
              
              <Typography variant="display" className="mb-6">
                {t('title')}
                <br />
                <span style={{ color: '#C9A962' }}>{t('subtitle')}</span>
              </Typography>
              
              <Typography 
                variant="body" 
                className="text-xl mb-8 max-w-xl"
                style={{ color: 'rgba(245, 245, 240, 0.8)' }}
              >
                {t('description')}
              </Typography>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="/stones/lavender-blue"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all"
                  style={{ 
                    backgroundColor: '#C9A962',
                    color: '#0D0D0D',
                  }}
                >
                  {t('viewLavenderBlue')}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all"
                  style={{ 
                    backgroundColor: 'transparent',
                    color: '#F5F5F0',
                    border: '1px solid rgba(245, 245, 240, 0.3)',
                  }}
                >
                  {t('scheduleVisit')}
                </Link>
              </div>
            </motion.div>
          </Container>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C9A962" strokeWidth="2">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-20" style={{ backgroundColor: '#0D0D0D' }}>
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div 
                  className="text-5xl md:text-6xl font-light mb-2"
                  style={{ color: '#C9A962' }}
                >
                  {stat.value}
                  <span className="text-3xl">{stat.suffix}</span>
                </div>
                <div style={{ color: 'rgba(245, 245, 240, 0.6)' }}>
                  {t(stat.label)}
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Media Carousel Section */}
      <section className="py-24" style={{ backgroundColor: '#0A0A0A' }}>
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Typography variant="label" className="mb-4">
              {t('processEyebrow')}
            </Typography>
            <Typography variant="h2" className="mb-4">
              {t('processTitle')}
            </Typography>
            <Typography 
              variant="body" 
              className="max-w-2xl mx-auto"
              style={{ color: 'rgba(245, 245, 240, 0.7)' }}
            >
              {t('processDescription')}
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <MediaCarousel 
              items={quarryMedia} 
              autoPlay={true}
              interval={8000}
              showThumbnails={true}
            />
          </motion.div>
        </Container>
      </section>

      {/* Process Section */}
      <section className="py-24" style={{ backgroundColor: '#0D0D0D' }}>
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Typography variant="label" className="mb-4">
              {t('advantageEyebrow')}
            </Typography>
            <Typography variant="h2" className="mb-4">
              {t('advantageTitle')}
            </Typography>
            <Typography 
              variant="body" 
              className="max-w-2xl mx-auto"
              style={{ color: 'rgba(245, 245, 240, 0.7)' }}
            >
              {t('advantageDescription')}
            </Typography>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative p-8 rounded-2xl group"
                style={{ 
                  backgroundColor: '#141414',
                  border: '1px solid rgba(201, 169, 98, 0.1)',
                }}
              >
                {/* Step Number */}
                <div 
                  className="absolute -top-4 -right-4 w-12 h-12 rounded-full flex items-center justify-center text-sm font-medium"
                  style={{ 
                    backgroundColor: '#C9A962',
                    color: '#0D0D0D',
                  }}
                >
                  {step.step}
                </div>

                {/* Icon */}
                <div 
                  className="w-16 h-16 rounded-xl flex items-center justify-center mb-6 transition-all group-hover:scale-110"
                  style={{ 
                    backgroundColor: 'rgba(201, 169, 98, 0.1)',
                    color: '#C9A962',
                  }}
                >
                  {step.icon}
                </div>

                <h3 
                  className="text-xl font-medium mb-3"
                  style={{ color: '#F5F5F0' }}
                >
                  {t(step.title)}
                </h3>
                <p style={{ color: 'rgba(245, 245, 240, 0.6)' }}>
                  {t(step.description)}
                </p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Why Own Quarry Section */}
      <section className="py-24" style={{ backgroundColor: '#0A0A0A' }}>
        <Container>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Typography variant="label" className="mb-4">
                {t('whyTitle')}
              </Typography>
              <Typography variant="h2" className="mb-6">
                {t('whySubtitle')}
                <span style={{ color: '#C9A962' }}> {t('whySubtitle2')}</span>
              </Typography>
              
              <div className="space-y-6">
                {[
                  {
                    title: 'qualityControl',
                    description: 'qualityControlDesc',
                  },
                  {
                    title: 'competitivePricing',
                    description: 'competitivePricingDesc',
                  },
                  {
                    title: 'reliableSupply',
                    description: 'reliableSupplyDesc',
                  },
                  {
                    title: 'customization',
                    description: 'customizationDesc',
                  },
                ].map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex gap-4"
                  >
                    <div 
                      className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                      style={{ backgroundColor: '#C9A962' }}
                    />
                    <div>
                      <h4 
                        className="font-medium mb-1"
                        style={{ color: '#F5F5F0' }}
                      >
                        {t(item.title)}
                      </h4>
                      <p style={{ color: 'rgba(245, 245, 240, 0.6)' }}>
                        {t(item.description)}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative aspect-square rounded-2xl overflow-hidden"
            >
              <video
                autoPlay
                muted
                loop
                playsInline
                className="h-full w-full object-cover"
                style={{
                  filter: 'contrast(1.1) saturate(1.15) brightness(1.05)',
                }}
              >
                <source src="/quarry/quarry-2.mp4" type="video/mp4" />
              </video>
              <div 
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(135deg, rgba(13, 13, 13, 0.3) 0%, transparent 100%)',
                }}
              />
              
              {/* Floating Badge */}
              <div 
                className="absolute bottom-6 left-6 px-4 py-3 rounded-xl backdrop-blur-md"
                style={{ 
                  backgroundColor: 'rgba(13, 13, 13, 0.8)',
                  border: '1px solid rgba(201, 169, 98, 0.3)',
                }}
              >
                <div className="text-sm" style={{ color: 'rgba(245, 245, 240, 0.6)' }}>
                  {t('locationLabel')}
                </div>
                <div className="font-medium" style={{ color: '#F5F5F0' }}>
                  Berhampur, Odisha
                </div>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          QUARRY LOCATION - Satellite Map
          ═══════════════════════════════════════════════════════════════ */}
      <section className="py-24" style={{ backgroundColor: '#0A0A0A' }}>
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-sm tracking-widest uppercase mb-4" style={{ color: '#C9A962' }}>
              {t('locationTitle')}
            </p>
            <h2 
              className="font-display text-4xl md:text-5xl font-light mb-4"
              style={{ color: '#F5F5F0' }}
            >
              {t('locationDescription')}
            </h2>
            <p className="max-w-2xl mx-auto text-lg" style={{ color: 'rgba(245, 245, 240, 0.6)' }}>
              {t('locationCoordinates')}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl overflow-hidden"
            style={{ 
              border: '1px solid rgba(201, 169, 98, 0.2)',
              boxShadow: '0 4px 30px rgba(0, 0, 0, 0.4)'
            }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3800!2d84.7271239!3d19.3424339!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTnCsDIwJzMyLjgiTiA4NMKwNDMnMzcuNiJF!5e1!3m2!1sen!2sin!4v1707100000000!5m2!1sen!2sin"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full"
            />
          </motion.div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-24" style={{ backgroundColor: '#0D0D0D' }}>
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <Typography variant="h2" className="mb-6">
              {t('ctaTitle')}
            </Typography>
            <Typography 
              variant="body" 
              className="text-lg mb-8"
              style={{ color: 'rgba(245, 245, 240, 0.7)' }}
            >
              {t('ctaDescription')}
            </Typography>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-medium text-lg transition-all hover:scale-105"
                style={{ 
                  backgroundColor: '#C9A962',
                  color: '#0D0D0D',
                }}
              >
                {t('scheduleVisit')}
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
              <Link
                href="/factory"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-medium text-lg transition-all hover:scale-105"
                style={{ 
                  backgroundColor: 'transparent',
                  color: '#F5F5F0',
                  border: '1px solid rgba(201, 169, 98, 0.3)',
                }}
              >
                {t('visitFactory')}
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
              <Link
                href="/stones/lavender-blue"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-medium text-lg transition-all"
                style={{ 
                  backgroundColor: 'transparent',
                  color: '#F5F5F0',
                  border: '1px solid rgba(245, 245, 240, 0.3)',
                }}
              >
                {t('exploreLavenderBlue')}
              </Link>
            </div>
          </motion.div>
        </Container>
      </section>

    </>
  );
}
