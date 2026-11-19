'use client';

import { useId, useState } from 'react';
import Link from 'next/link';
import { MotionConfig, useReducedMotion } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, Maximize2, Pause, Play, RotateCcw } from 'lucide-react';
import { Navbar } from '@/components/common/Navbar';
import { CustomCursor } from '@/components/common/CustomCursor';
import { Footer } from '@/sections/Footer/Footer';
import { TextRoll } from '@/components/animations/TextRoll';
import { MagneticButton } from '@/components/animations/MagneticButton';
import { InfiniteMarquee } from '@/components/animations/InfiniteMarquee';
import { CounterAnimation } from '@/components/animations/CounterAnimation';
import { ParallaxColumns } from '@/components/animations/ParallaxColumns';
import {
  EFFECT_CATEGORIES,
  PREVIEW_EFFECTS,
  FullscreenPreviewModal,
  type PreviewEffectId,
} from '@/components/animations/FullscreenPreviewModal';
import styles from './MotionLab.module.css';

const filters = {
  all: 'All',
  ...EFFECT_CATEGORIES,
};

type Filter = keyof typeof filters;

const marqueeWords = ['Ease in', 'Spring', 'Loop', 'Ease out'];

function MarqueeDemo({ paused }: { paused: boolean }) {
  const reducedMotion = useReducedMotion();
  const [playing, setPlaying] = useState<boolean | null>(null);
  const isPlaying = playing ?? !reducedMotion;
  const Icon = isPlaying ? Pause : Play;

  return (
    <>
      <InfiniteMarquee speed="slow" fadeColor="none" paused={paused || !isPlaying}>
        {marqueeWords.map((word) => (
          <span key={word} className={styles.marqueeWord}>{word}</span>
        ))}
      </InfiniteMarquee>
      <button type="button" className={styles.stageControl} onClick={() => setPlaying(!isPlaying)}>
        <Icon size={14} aria-hidden="true" />
        {isPlaying ? 'Pause' : 'Play'}
      </button>
    </>
  );
}

function CounterDemo() {
  const [replay, setReplay] = useState(0);
  const reducedMotion = useReducedMotion();

  return (
    <>
      <div className="text-center">
        <div className="font-hero-display text-[clamp(4.5rem,10vw,8rem)] leading-[0.9] font-bold tracking-[-0.055em] tabular-nums" aria-hidden="true">
          {reducedMotion && replay === 0 ? '+100' : <CounterAnimation key={replay} end={100} prefix="+" />}
        </div>
        <span className="font-body-ui mt-2 block text-sm font-medium text-[#52544b]">Sample count</span>
      </div>
      <button type="button" className={styles.stageControl} onClick={() => setReplay((previous) => previous + 1)}>
        <RotateCcw size={14} aria-hidden="true" />
        Replay
      </button>
    </>
  );
}

function EffectStage({ id, paused }: { id: PreviewEffectId; paused: boolean }) {
  switch (id) {
    case 'dual-text-roll':
      return (
        <TextRoll interactive center className="font-hero-display text-[clamp(2.625rem,6vw,5.5rem)] font-bold tracking-[-0.045em]">
          Roll type
        </TextRoll>
      );
    case 'magnetic-physics':
      return (
        <div className="z-10 flex flex-wrap items-center justify-center gap-3 px-4">
          <MagneticButton type="button" variant="primary" strength={0.5}>
            Pull <ArrowUpRight size={16} aria-hidden="true" />
          </MagneticButton>
          <MagneticButton type="button" variant="outline-dark" strength={0.28}>
            Glide
          </MagneticButton>
        </div>
      );
    case 'parallax-gallery':
      return <ParallaxColumns paused={paused} />;
    case 'infinite-marquee':
      return <MarqueeDemo paused={paused} />;
    case 'metric-counter':
      return <CounterDemo />;
  }
}

export default function AnimationsLabPage() {
  const [filter, setFilter] = useState<Filter>('all');
  const [activePreview, setActivePreview] = useState<PreviewEffectId | null>(null);
  const previewId = useId();
  const reducedMotion = useReducedMotion();
  const effects = PREVIEW_EFFECTS.filter((effect) => filter === 'all' || effect.category === filter);

  return (
    <MotionConfig reducedMotion="user">
      <main className="site-shell relative min-h-screen bg-[#F5F3EE] text-[#0A0A0A]">
        <CustomCursor />
        <Navbar />

        <div className={styles.container}>
          <header className={styles.hero}>
            <Link href="/" className={styles.backLink}>
              <ArrowLeft size={16} aria-hidden="true" />
              Studio home
            </Link>

            <div className={styles.heroIntro}>
              <h1 className={`font-hero-display ${styles.heroTitle}`}>
                Motion Lab<span className={styles.headingDot} aria-hidden="true">.</span>
              </h1>
              <p className="font-body-ui max-w-[29ch] text-base leading-relaxed text-[#4d4e46] sm:text-lg">
                Try kinetic type, magnetic buttons, and scroll-driven motion.
              </p>
            </div>
          </header>

          <section id="experiments" aria-labelledby="experiments-title" className={styles.gallery}>
            <div className={styles.galleryHeader}>
              <h2 id="experiments-title" className="font-section-heading text-3xl leading-none font-extrabold tracking-[-0.04em] sm:text-4xl">Experiments</h2>
              <div className={styles.filters} role="group" aria-label="Filter experiments">
                {(Object.keys(filters) as Filter[]).map((category) => (
                  <button
                    key={category}
                    type="button"
                    aria-pressed={filter === category}
                    onClick={() => setFilter(category)}
                  >
                    {filters[category]}
                  </button>
                ))}
              </div>
              <span className={styles.resultCount} role="status">{effects.length} {effects.length === 1 ? 'effect' : 'effects'}</span>
            </div>

            <div className={styles.effectGrid}>
              {effects.map((effect) => (
                <article
                  key={effect.id}
                  className={styles.effectCard}
                  data-wide={effect.id === 'parallax-gallery' || effects.length === 1 || undefined}
                  aria-labelledby={effect.id + '-title'}
                >
                  <div className={styles.stage} data-effect={effect.id}>
                    <EffectStage
                      id={effect.id}
                      paused={activePreview !== null || (effect.id === 'parallax-gallery' && Boolean(reducedMotion))}
                    />
                  </div>
                  <div className={styles.cardDetails}>
                    <div>
                      <p className={styles.category}>{EFFECT_CATEGORIES[effect.category]}</p>
                      <h3 id={effect.id + '-title'} className="font-section-heading mt-1 text-2xl leading-tight font-extrabold tracking-[-0.035em] sm:text-3xl">
                        {effect.title}
                      </h3>
                      <p className="font-body-ui mt-2 text-sm leading-relaxed text-[#4d4e46]">{effect.description}</p>
                    </div>
                    <button
                      type="button"
                      aria-haspopup="dialog"
                      aria-controls={previewId}
                      aria-label={'Open preview: ' + effect.title}
                      className={styles.previewButton}
                      onClick={() => setActivePreview(effect.id)}
                    >
                      <Maximize2 size={15} aria-hidden="true" />
                      Open preview
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section aria-labelledby="lab-contact-title" className={styles.contact}>
            <h2 id="lab-contact-title" className="font-section-heading max-w-[20ch] text-3xl leading-none font-extrabold tracking-[-0.04em] sm:text-5xl">
              Want an effect on your site?
            </h2>
            <Link href="/#contact" className={styles.contactLink}>
              Start a project <ArrowUpRight size={18} aria-hidden="true" />
            </Link>
          </section>
        </div>

        <Footer />

        <FullscreenPreviewModal
          id={previewId}
          effectId={activePreview}
          onClose={() => setActivePreview(null)}
          onSelectEffect={setActivePreview}
        />
      </main>
    </MotionConfig>
  );
}
