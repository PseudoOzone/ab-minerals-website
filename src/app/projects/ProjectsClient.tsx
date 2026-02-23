"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, MessageCircle, X, ChevronLeft, ChevronRight } from "lucide-react";
import { Container, Section } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Heading, Text, SectionHeader } from "@/components/ui/Typography";
import { benchmarkProjects, projectDisclaimer } from "@/config/company.config";
import { openChatBot } from "@/lib/chatbot-events";
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
// LIGHTBOX COMPONENT
// ═══════════════════════════════════════════════════════════════════════

function Lightbox({ 
  images, 
  currentIndex, 
  onClose, 
  onNext, 
  onPrev,
  projectName
}: { 
  images: string[]; 
  currentIndex: number; 
  onClose: () => void; 
  onNext: () => void; 
  onPrev: () => void;
  projectName?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.95)' }}
      onClick={onClose}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 md:top-6 md:right-6 p-3 rounded-full transition-all hover:bg-white/20 z-20"
        style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
      >
        <X className="w-6 h-6" style={{ color: '#F5F5F0' }} />
      </button>

      {/* Previous button */}
      <button
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 p-3 md:p-4 rounded-full transition-all hover:bg-white/20 z-20"
        style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
      >
        <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" style={{ color: '#F5F5F0' }} />
      </button>

      {/* Next button */}
      <button
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 p-3 md:p-4 rounded-full transition-all hover:bg-white/20 z-20"
        style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
      >
        <ChevronRight className="w-6 h-6 md:w-8 md:h-8" style={{ color: '#F5F5F0' }} />
      </button>

      {/* Image Container */}
      <motion.div
        key={currentIndex}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        className="relative w-[90vw] h-[80vh] md:w-[85vw] md:h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={images[currentIndex]}
          alt={`${projectName || 'A B Minerals granite project'} — image ${currentIndex + 1}`}
          fill
          className="object-contain"
          sizes="90vw"
          priority
        />
      </motion.div>

      {/* Image counter */}
      <div 
        className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full text-sm font-medium"
        style={{ backgroundColor: 'rgba(255, 255, 255, 0.15)', color: '#F5F5F0' }}
      >
        {currentIndex + 1} / {images.length}
      </div>

      {/* Thumbnail strip */}
      <div className="absolute bottom-16 md:bottom-20 left-1/2 -translate-x-1/2 flex gap-2 p-2 rounded-lg max-w-[90vw] overflow-x-auto" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={(e) => { e.stopPropagation(); onClose(); setTimeout(() => {}, 0); }}
            className={`relative w-12 h-12 md:w-16 md:h-16 rounded overflow-hidden flex-shrink-0 transition-all ${
              idx === currentIndex ? 'ring-2 ring-[#C9A962] opacity-100' : 'opacity-50 hover:opacity-80'
            }`}
            style={{ cursor: 'default' }}
          >
            <Image src={img} alt="" fill className="object-cover" sizes="64px" />
          </button>
        ))}
      </div>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// PAGE COMPONENT
// ═══════════════════════════════════════════════════════════════════════

export function ProjectsClient() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImages, setLightboxImages] = useState<string[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightbox = (images: string[], index: number) => {
    setLightboxImages(images);
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => setLightboxOpen(false);
  
  const nextImage = useCallback(() => {
    setLightboxIndex((prev) => (prev + 1) % lightboxImages.length);
  }, [lightboxImages.length]);
  
  const prevImage = useCallback(() => {
    setLightboxIndex((prev) => (prev - 1 + lightboxImages.length) % lightboxImages.length);
  }, [lightboxImages.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;
      
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, nextImage, prevImage]);

  const handleWhatsApp = () => {
    openChatBot("quote_start");
  };

  return (
    <>
      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <Lightbox
            images={lightboxImages}
            currentIndex={lightboxIndex}
            onClose={closeLightbox}
            onNext={nextImage}
            onPrev={prevImage}
          />
        )}
      </AnimatePresence>

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
                className={`group rounded-xl overflow-hidden ${
                  (project as any).featured ? 'md:col-span-2 lg:col-span-3' : ''
                }`}
                style={{ 
                  backgroundColor: '#0A0A0A',
                  border: '1px solid rgba(245, 245, 240, 0.05)'
                }}
              >
                {/* Featured Project with Gallery */}
                {(project as any).featured && (project as any).images ? (
                  <>
                    {/* Main Image - Clickable */}
                    <div 
                      className="relative aspect-[21/9] overflow-hidden cursor-pointer"
                      onClick={() => openLightbox((project as any).images, 0)}
                    >
                      <Image
                        src={project.image}
                        alt={`${project.name} — ${project.stoneUsed.join(', ')} granite by A B Minerals`}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        title={`${project.name} — A B Minerals Pvt Ltd`}
                      />
                      <div 
                        className="absolute inset-0"
                        style={{ background: 'linear-gradient(to top, rgba(10, 10, 10, 0.8) 0%, transparent 50%)' }}
                      />
                      {/* Status badge */}
                      <div 
                        className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-medium"
                        style={{ 
                          backgroundColor: 'rgba(201, 169, 98, 0.2)',
                          color: '#C9A962'
                        }}
                      >
                        Featured Project
                      </div>
                      {/* Click to view hint */}
                      <div className="absolute bottom-4 right-4 px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
                        style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)', color: '#F5F5F0' }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="11" cy="11" r="8" />
                          <path d="M21 21l-4.35-4.35M11 8v6M8 11h6" />
                        </svg>
                        Click to enlarge
                      </div>
                    </div>

                    {/* Gallery Grid - All Clickable */}
                    <div className="grid grid-cols-3 md:grid-cols-6 gap-2 p-2" style={{ backgroundColor: '#141414' }}>
                      {((project as any).images as string[]).slice(1, 7).map((img, idx) => (
                        <div 
                          key={idx} 
                          className="relative aspect-[4/3] overflow-hidden rounded-lg cursor-pointer group/thumb"
                          onClick={() => openLightbox((project as any).images, idx + 1)}
                        >
                          <Image
                            src={img}
                            alt={`${project.name} — ${project.stoneUsed.join(', ')} granite view ${idx + 2} by A B Minerals`}
                            fill
                            className="object-cover transition-transform duration-500 group-hover/thumb:scale-110"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover/thumb:bg-black/30 transition-colors flex items-center justify-center">
                            <svg className="w-8 h-8 opacity-0 group-hover/thumb:opacity-100 transition-opacity" viewBox="0 0 24 24" fill="none" stroke="#F5F5F0" strokeWidth="2">
                              <circle cx="11" cy="11" r="8" />
                              <path d="M21 21l-4.35-4.35M11 8v6M8 11h6" />
                            </svg>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Content */}
                    <div className="p-6 md:p-8">
                      <div className="flex flex-wrap items-start justify-between gap-4">
                        <div>
                          <span 
                            className="text-xs uppercase tracking-wider mb-2 block"
                            style={{ color: '#C9A962' }}
                          >
                            {project.type}
                          </span>
                          <h3 className="font-serif text-3xl md:text-4xl mb-2" style={{ color: '#F5F5F0' }}>
                            {project.name}
                          </h3>
                          <Text size="md" muted className="max-w-2xl">
                            {project.description}
                          </Text>
                        </div>
                        <div className="flex flex-col gap-3">
                          {project.stoneUsed?.map((stone) => (
                            <span
                              key={stone}
                              className="px-4 py-2 rounded-full text-sm font-medium"
                              style={{ 
                                backgroundColor: 'rgba(138, 155, 168, 0.15)',
                                color: '#8A9BA8'
                              }}
                            >
                              {stone}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </>
                ) : (project as any).featured && (project as any).video ? (
                  <>
                    {/* Featured Project with Video */}
                    <div className="relative aspect-video overflow-hidden">
                      <video
                        src={(project as any).video}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="absolute inset-0 w-full h-full object-cover"
                        style={{ filter: 'contrast(1.1) saturate(1.15) brightness(1.05)' }}
                      />
                      <div 
                        className="absolute inset-0"
                        style={{ background: 'linear-gradient(to top, rgba(10, 10, 10, 0.8) 0%, transparent 30%)' }}
                      />
                      {/* Status badge */}
                      <div 
                        className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1.5"
                        style={{ 
                          backgroundColor: 'rgba(201, 169, 98, 0.2)',
                          color: '#C9A962'
                        }}
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                          <polygon points="5 3 19 12 5 21 5 3" />
                        </svg>
                        Video
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 md:p-8">
                      <div className="flex flex-wrap items-start justify-between gap-4">
                        <div>
                          <span 
                            className="text-xs uppercase tracking-wider mb-2 block"
                            style={{ color: '#C9A962' }}
                          >
                            {project.type}
                          </span>
                          <h3 className="font-serif text-3xl md:text-4xl mb-2" style={{ color: '#F5F5F0' }}>
                            {project.name}
                          </h3>
                          <Text size="md" muted className="max-w-2xl">
                            {project.description}
                          </Text>
                        </div>
                        <div className="flex flex-col gap-3">
                          {project.stoneUsed?.map((stone) => (
                            <span
                              key={stone}
                              className="px-4 py-2 rounded-full text-sm font-medium"
                              style={{ 
                                backgroundColor: 'rgba(138, 155, 168, 0.15)',
                                color: '#8A9BA8'
                              }}
                            >
                              {stone}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Regular Project Card */}
                    {/* Project Image */}
                    <div 
                      className="relative aspect-video overflow-hidden"
                      style={{ backgroundColor: '#141414' }}
                    >
                      {project.images && project.images.length > 0 ? (
                        <Image
                          src={project.images[0]}
                          alt={`${project.name} — ${project.stoneUsed.join(', ')} granite project by A B Minerals`}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, 50vw"
                          title={`${project.name} — A B Minerals`}
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-6xl opacity-30">🏛️</div>
                        </div>
                      )}
                      
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
                  </>
                )}
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
