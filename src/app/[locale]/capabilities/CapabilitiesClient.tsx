"use client";

import { motion } from "framer-motion";
import { Pickaxe, Factory, Truck, Ruler, Shield, Clock, Award, Layers } from "lucide-react";
import { Container, Section } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Heading, Text, SectionHeader } from "@/components/ui/Typography";
import { companyInfo, capabilities } from "@/config/company.config";
import { Link } from "@/i18n/navigation";
import { MessageCircle } from "lucide-react";
import { openChatBot } from "@/lib/chatbot-events";
import { useTranslations } from "next-intl";

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
  const t = useTranslations('capabilities');
  const tc = useTranslations('common');

  const handleWhatsApp = () => {
    openChatBot("quote_start");
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
              {t('eyebrow')}
            </motion.span>
            <motion.div variants={fadeInUp}>
              <Heading as="h1" size="display-lg" className="mb-6">
                {t('title')}
              </Heading>
            </motion.div>
            <motion.div variants={fadeInUp}>
              <Text size="lg" muted className="max-w-2xl">
                {t('heroDescription')}
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
              <Text muted>{t('monthlyCapacity', { capacity: '250,000+' })}</Text>
            </motion.div>
            <motion.div variants={fadeInUp} className="text-center">
              <div className="text-4xl md:text-5xl font-serif mb-2" style={{ color: '#C9A962' }}>
                {companyInfo.stats.quarriesOwned}
              </div>
              <Text muted>{t('ownQuarry')}</Text>
            </motion.div>
            <motion.div variants={fadeInUp} className="text-center">
              <div className="text-4xl md:text-5xl font-serif mb-2" style={{ color: '#C9A962' }}>
                4
              </div>
              <Text muted>{t('stoneVarieties')}</Text>
            </motion.div>
            <motion.div variants={fadeInUp} className="text-center">
              <div className="text-4xl md:text-5xl font-serif mb-2" style={{ color: '#C9A962' }}>
                Pan-India
              </div>
              <Text muted>{t('deliveryNetwork')}</Text>
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
                eyebrow={t('processEyebrow')}
                title={t('processTitle')}
                description={t('processDescription')}
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
                    {t(`cap${capability.id.charAt(0).toUpperCase() + capability.id.slice(1)}Title`)}
                  </h3>
                  <Text size="sm" muted>
                    {t(`cap${capability.id.charAt(0).toUpperCase() + capability.id.slice(1)}Desc`)}
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
                eyebrow={t('ourProcess')}
                title={t('fromQuarryToProject')}
              />
            </motion.div>

            <motion.div 
              variants={staggerContainer}
              className="relative max-w-4xl mx-auto"
            >
              {/* Process Steps */}
              {[
                { step: "01", title: t('step1Title'), desc: t('step1Desc') },
                { step: "02", title: t('step2Title'), desc: t('step2Desc') },
                { step: "03", title: t('step3Title'), desc: t('step3Desc') },
                { step: "04", title: t('step4Title'), desc: t('step4Desc') },
                { step: "05", title: t('step5Title'), desc: t('step5Desc') },
                { step: "06", title: t('step6Title'), desc: t('step6Desc') },
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
              {t('ctaTitle')}
            </Heading>
            <Text size="lg" muted className="mb-8 max-w-xl mx-auto">
              {t('ctaDescription')}
            </Text>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="gold"
                size="lg"
                onClick={handleWhatsApp}
                leftIcon={<MessageCircle className="w-5 h-5" />}
              >
                {tc('requestAQuote')}
              </Button>
              <Link href="/stones">
                <Button variant="outline" size="lg">
                  {t('viewCollection')}
                </Button>
              </Link>
            </div>
          </motion.div>
        </Container>
      </Section>
    </>
  );
}
