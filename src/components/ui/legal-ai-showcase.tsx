'use client';

import { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import {
  Scale,
  Brain,
  ChevronRight,
  Shield,
  BookOpen,
  Gavel,
  FileText,
  LucideIcon,
} from 'lucide-react';
import justiceSymbol from '@/assets/justice-symbol.png';
import llmBrain from '@/assets/llm-brain.png';

// =========================================
// 1. CONFIGURATION & DATA TYPES
// =========================================

export type SideId = 'justice' | 'intelligence';

export interface FeatureMetric {
  label: string;
  value: number;
  icon: LucideIcon;
}

export interface SideData {
  id: SideId;
  label: string;
  title: string;
  description: string;
  image: string;
  colors: {
    gradient: string;
    glow: string;
    ring: string;
  };
  stats: {
    status: string;
    percentage: number;
  };
  features: FeatureMetric[];
}

const SIDE_DATA: Record<SideId, SideData> = {
  justice: {
    id: 'justice',
    label: 'Legal Foundation',
    title: 'Indian Legal Heritage',
    description: 'Rooted in the Constitution of India, centuries of jurisprudence, and the wisdom of our courts. Nyaya AI understands Indian law at its core.',
    image: justiceSymbol,
    colors: {
      gradient: 'from-primary to-primary-dark',
      glow: 'bg-primary',
      ring: 'border-l-primary/50',
    },
    stats: { status: 'Comprehensive', percentage: 98 },
    features: [
      { label: 'Statutes', value: 95, icon: BookOpen },
      { label: 'Judgments', value: 88, icon: Gavel },
    ],
  },
  intelligence: {
    id: 'intelligence',
    label: 'AI Engine',
    title: 'Explainable AI',
    description: 'Advanced language models fine-tuned for legal reasoning. Every answer is grounded, cited, and transparent—no black boxes.',
    image: llmBrain,
    colors: {
      gradient: 'from-accent to-accent-dark',
      glow: 'bg-accent',
      ring: 'border-r-accent/50',
    },
    stats: { status: 'Active', percentage: 94 },
    features: [
      { label: 'Accuracy', value: 96, icon: Shield },
      { label: 'Citations', value: 92, icon: FileText },
    ],
  },
};

// =========================================
// 2. ANIMATION VARIANTS
// =========================================

const ANIMATIONS = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.2 },
    },
  },
  item: {
    hidden: { opacity: 0, y: 20, filter: 'blur(10px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { type: 'spring' as const, stiffness: 100, damping: 20 },
    },
    exit: { opacity: 0, y: -10, filter: 'blur(5px)' },
  },
  image: (isLeft: boolean): Variants => ({
    initial: {
      opacity: 0,
      scale: 1.5,
      filter: 'blur(15px)',
      rotate: isLeft ? -30 : 30,
      x: isLeft ? -80 : 80,
    },
    animate: {
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
      rotate: 0,
      x: 0,
      transition: { type: 'spring' as const, stiffness: 260, damping: 20 },
    },
    exit: {
      opacity: 0,
      scale: 0.6,
      filter: 'blur(20px)',
      transition: { duration: 0.25 },
    },
  }),
};

// =========================================
// 3. SUB-COMPONENTS
// =========================================

const BackgroundGradient = ({ isLeft }: { isLeft: boolean }) => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    <motion.div
      animate={{
        background: isLeft
          ? 'radial-gradient(circle at 20% 50%, hsl(var(--primary) / 0.15), transparent 50%)'
          : 'radial-gradient(circle at 80% 50%, hsl(var(--accent) / 0.15), transparent 50%)',
      }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      className="absolute inset-0"
    />
  </div>
);

const ProductVisual = ({ data, isLeft }: { data: SideData; isLeft: boolean }) => (
  <motion.div 
    layout
    className="relative group shrink-0"
    initial={{ x: isLeft ? -100 : 100, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    exit={{ x: isLeft ? 100 : -100, opacity: 0 }}
    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
  >
    {/* Animated Rings */}
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
      className={`absolute inset-[-20%] rounded-full border border-dashed border-border/30 ${data.colors.ring}`}
    />
    <motion.div
      animate={{ scale: [1, 1.08, 1], rotate: [0, 5, -5, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      className={`absolute inset-0 rounded-full bg-gradient-to-br ${data.colors.gradient} blur-3xl opacity-25`}
    />

    {/* Image Container */}
    <div className="relative h-64 w-64 md:h-80 md:w-80 lg:h-96 lg:w-96 rounded-full border border-border/20 shadow-elevated flex items-center justify-center overflow-hidden bg-secondary/30 backdrop-blur-sm">
      <motion.div
        animate={{ 
          y: [-12, 12, -12],
          rotate: [0, 2, -2, 0]
        }}
        transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
        className="relative z-10 w-full h-full flex items-center justify-center p-8"
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={data.id}
            src={data.image}
            alt={data.title}
            variants={ANIMATIONS.image(isLeft)}
            initial="initial"
            animate="animate"
            exit="exit"
            className="w-3/4 h-3/4 object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
            draggable={false}
          />
        </AnimatePresence>
      </motion.div>
    </div>

    {/* Status Label */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap"
    >
      <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground bg-card px-4 py-2 rounded-full border border-border shadow-emboss backdrop-blur">
        <span className={`h-1.5 w-1.5 rounded-full ${data.colors.glow} animate-pulse`} />
        {data.stats.status}
      </div>
    </motion.div>
  </motion.div>
);

const ProductDetails = ({ data, isLeft }: { data: SideData; isLeft: boolean }) => {
  const alignClass = isLeft ? 'items-start text-left' : 'items-end text-right';
  const barColorClass = isLeft ? 'left-0 bg-primary' : 'right-0 bg-accent';

  return (
    <motion.div
      variants={ANIMATIONS.container}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={`flex flex-col ${alignClass} max-w-md`}
    >
      <motion.h2 variants={ANIMATIONS.item} className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground mb-2 font-sans">
        {data.label}
      </motion.h2>
      <motion.h1 variants={ANIMATIONS.item} className="text-3xl md:text-4xl lg:text-5xl font-serif font-semibold tracking-tight mb-3 text-foreground">
        {data.title}
      </motion.h1>
      <motion.p variants={ANIMATIONS.item} className="text-muted-foreground mb-8 leading-relaxed font-sans">
        {data.description}
      </motion.p>

      {/* Feature Grid */}
      <motion.div variants={ANIMATIONS.item} className={`grid grid-cols-2 gap-4 w-full mb-6`}>
        {data.features.map((feature, idx) => (
          <div
            key={idx}
            className="bg-card border border-border rounded-xl p-4 shadow-emboss"
          >
            <div className="flex items-center gap-2 mb-2">
              <feature.icon className="w-4 h-4 text-primary" />
              <span className={`text-sm font-medium ${feature.value > 50 ? 'text-foreground' : 'text-muted-foreground'}`}>
                {feature.label}
              </span>
            </div>
            <div className="text-2xl font-serif font-bold text-foreground">
              {feature.value}%
            </div>
            <div className="mt-2 h-1.5 bg-secondary rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${feature.value}%` }}
                transition={{ duration: 1, delay: 0.5 + idx * 0.2 }}
                className={`h-full rounded-full ${barColorClass}`}
              />
            </div>
          </div>
        ))}

        <div className="col-span-2">
          <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary text-primary-foreground rounded-lg font-medium transition-all hover:bg-primary/90 shadow-emboss font-sans">
            Learn More
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </motion.div>

      {/* Coverage */}
      <motion.div variants={ANIMATIONS.item} className="flex items-center gap-2 text-sm text-muted-foreground">
        <Scale className="w-4 h-4 text-primary" />
        {data.stats.percentage}% Coverage
      </motion.div>
    </motion.div>
  );
};

const Switcher = ({
  activeId,
  onToggle
}: {
  activeId: SideId;
  onToggle: (id: SideId) => void
}) => {
  const options = Object.values(SIDE_DATA).map(p => ({ id: p.id, label: p.label }));

  return (
    <div className="flex justify-center">
      <div className="relative flex p-1 bg-card border border-border rounded-full shadow-emboss">
        {options.map((opt) => (
          <motion.button
            key={opt.id}
            onClick={() => onToggle(opt.id)}
            whileTap={{ scale: 0.96 }}
            className="relative px-6 py-3 rounded-full flex items-center justify-center text-sm font-medium focus:outline-none font-sans transition-colors"
          >
            {activeId === opt.id && (
              <motion.div
                layoutId="activePill"
                className="absolute inset-0 bg-primary rounded-full"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
            <span className={`relative z-10 ${activeId === opt.id ? 'text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}>
              {opt.label}
            </span>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

// =========================================
// 4. MAIN COMPONENT
// =========================================

export default function LegalAIShowcase() {
  const [activeSide, setActiveSide] = useState<SideId>('justice');

  const currentData = SIDE_DATA[activeSide];
  const isLeft = activeSide === 'justice';

  return (
    <section className="relative min-h-[80vh] bg-background overflow-hidden py-16 md:py-24">
      <BackgroundGradient isLeft={isLeft} />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-sm uppercase tracking-[0.3em] text-muted-foreground mb-4 font-sans">
            The Nyaya Advantage
          </h2>
          <h3 className="text-3xl md:text-4xl font-serif font-semibold text-foreground">
            Where Law Meets Intelligence
          </h3>
        </div>

        {/* Content switches sides based on selection */}
        <div className={`flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-24 ${!isLeft ? 'lg:flex-row-reverse' : ''}`}>
          {/* Visual */}
          <AnimatePresence mode="wait">
            <ProductVisual key={currentData.id} data={currentData} isLeft={isLeft} />
          </AnimatePresence>

          {/* Details */}
          <AnimatePresence mode="wait">
            <ProductDetails key={currentData.id} data={currentData} isLeft={isLeft} />
          </AnimatePresence>
        </div>

        <div className="mt-16">
          <Switcher activeId={activeSide} onToggle={setActiveSide} />
        </div>
      </div>
    </section>
  );
}
