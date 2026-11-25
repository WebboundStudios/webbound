'use client';

import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { ArrowUpRight, ChevronLeft, ChevronRight, Pause, Play, RotateCcw, X } from 'lucide-react';
import { ButtonLink } from '@/components/ui/Button';
import { TextRoll } from './TextRoll';
import { MagneticButton } from './MagneticButton';
import { InfiniteMarquee } from './InfiniteMarquee';
import { CounterAnimation } from './CounterAnimation';
import { ParallaxColumns } from './ParallaxColumns';
import { CurvedText } from './CurvedText';
import styles from './FullscreenPreviewModal.module.css';

export const EFFECT_CATEGORIES = {
  typography: 'Typography',
  physics: 'Interaction',
  scroll: 'Scrolling',
} as const;

export const PREVIEW_EFFECTS = [
  {
    id: 'dual-text-roll',
    title: 'Text roll',
    category: 'typography',
    library: 'Framer Motion',
    description: 'Hover, tap, or focus the text to roll each letter upward in sequence.',
  },
  {
    id: 'magnetic-physics',
    title: 'Magnetic buttons',
    category: 'physics',
    library: 'GSAP',
    description: 'Move across a button or drag your finger over it to feel the pull.',
  },
  {
    id: 'parallax-gallery',
    title: 'Parallax gallery',
    category: 'scroll',
    library: 'Framer Motion',
    description: 'Scroll to see four columns move at different speeds.',
  },
  {
    id: 'infinite-marquee',
    title: 'Infinite marquee',
    category: 'scroll',
    library: 'Framer Motion',
    description: 'A looping row that responds to scrolling and pauses on hover.',
  },
  {
    id: 'metric-counter',
    title: 'Count-up',
    category: 'physics',
    library: 'GSAP',
    description: 'Watch a number count up as it enters view, or replay it anytime.',
  },
  {
    id: 'curved-text',
    title: 'Curved text',
    category: 'typography',
    library: 'SVG',
    description: 'Play the text as it follows a curved line, then adjust how sharply the line bends.',
  },
] as const satisfies ReadonlyArray<{
  id: string;
  title: string;
  category: keyof typeof EFFECT_CATEGORIES;
  library: string;
  description: string;
}>;

export type PreviewEffectId = (typeof PREVIEW_EFFECTS)[number]['id'];

const counters = [
  { end: 100, suffix: '%', label: 'Progress' },
  { end: 360, suffix: '°', label: 'Angle' },
  { end: 240, suffix: '', label: 'Quantity' },
  { end: 12, suffix: 's', label: 'Time' },
];

function CurvedTextPreview() {
  const [bend, setBend] = useState(72);
  const [playing, setPlaying] = useState(false);
  const Icon = playing ? Pause : Play;

  return (
    <div className="flex w-full max-w-3xl flex-col gap-5 sm:gap-7">
      <div className="rounded-xl bg-[#e8edda] px-3 text-[#31430E] sm:px-6">
        <CurvedText bend={bend} playing={playing} />
      </div>
      <div className="mx-auto flex w-full max-w-sm flex-wrap items-end gap-4">
        <label className="flex min-w-0 flex-1 basis-32 flex-col text-sm font-semibold">
          Curve depth
          <input
            type="range"
            min={20}
            max={96}
            value={bend}
            onChange={(event) => setBend(event.currentTarget.valueAsNumber)}
            className="min-h-9 w-full accent-[#c5f52a]"
          />
        </label>
        <button type="button" className={styles.action} onClick={() => setPlaying(!playing)}>
          <Icon size={16} aria-hidden="true" /> {playing ? 'Pause' : 'Play'}
        </button>
      </div>
    </div>
  );
}

type PreviewProps = {
  id: string;
  effectId: PreviewEffectId | null;
  onClose: () => void;
  onSelectEffect: (id: PreviewEffectId) => void;
};

export function FullscreenPreviewModal({ id, effectId, onClose, onSelectEffect }: PreviewProps) {
  const [customText, setCustomText] = useState('Roll type');
  const [counterKey, setCounterKey] = useState(0);
  const [marqueePlaying, setMarqueePlaying] = useState<boolean | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const parallaxScrollRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const index = PREVIEW_EFFECTS.findIndex((effect) => effect.id === effectId);
  const effect = PREVIEW_EFFECTS[index];
  const isOpen = index !== -1;
  const playMarquee = marqueePlaying ?? !reducedMotion;
  const marqueeIcon = playMarquee ? <Pause size={16} aria-hidden="true" /> : <Play size={16} aria-hidden="true" />;
  const text = customText.trim() || 'Roll type';

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!isOpen || !dialog) return;

    dialog.showModal();
    closeRef.current?.focus({ preventScroll: true });
    window.dispatchEvent(new CustomEvent('webbound:preview-scroll', { detail: { open: true } }));

    return () => {
      dialog.close();
      window.dispatchEvent(new CustomEvent('webbound:preview-scroll', { detail: { open: false } }));
    };
  }, [isOpen]);

  function movePreview(direction: number) {
    const next = (index + direction + PREVIEW_EFFECTS.length) % PREVIEW_EFFECTS.length;
    onSelectEffect(PREVIEW_EFFECTS[next].id);
    dialogRef.current?.scrollTo({ top: 0 });
  }

  return (
    <dialog
      ref={dialogRef}
      id={id}
      aria-labelledby={id + '-title'}
      aria-describedby={id + '-description'}
      className={styles.dialog}
      data-lenis-prevent
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
    >
      {effect && (
        <div className={styles.layout}>
          <header className={styles.header}>
            <div className="min-w-0">
              <h2 id={id + '-title'} className="font-section-heading text-2xl leading-none font-extrabold tracking-[-0.04em] sm:text-4xl">{effect.title}</h2>
              <p id={id + '-description'} className="font-body-ui mt-2 max-w-[52ch] text-sm leading-relaxed text-[#bdc2b4]">{effect.description}</p>
            </div>

            <div className={styles.navigation}>
              <button type="button" className={styles.iconButton} aria-label="Previous effect" onClick={() => movePreview(-1)}>
                <ChevronLeft size={20} aria-hidden="true" />
              </button>
              <span role="status" aria-label={effect.title + ', effect ' + (index + 1) + ' of ' + PREVIEW_EFFECTS.length} className={styles.position}>
                {index + 1} / {PREVIEW_EFFECTS.length}
              </span>
              <button type="button" className={styles.iconButton} aria-label="Next effect" onClick={() => movePreview(1)}>
                <ChevronRight size={20} aria-hidden="true" />
              </button>
              <button ref={closeRef} type="button" className={styles.iconButton} aria-label="Close preview" onClick={onClose}>
                <X size={20} aria-hidden="true" />
              </button>
            </div>
          </header>

          <div className={styles.stage} data-effect={effect.id}>
            {effect.id === 'curved-text' && <CurvedTextPreview />}

            {effect.id === 'dual-text-roll' && (
              <div className="@container w-full max-w-5xl space-y-8 text-center">
                <div className="overflow-hidden rounded-xl bg-[#c5f52a] px-3 py-10 text-[#11130f] sm:py-16">
                  <div style={{ fontSize: `min(${Math.min(19, 94 / Array.from(text).length)}cqw, 7rem)` }}>
                    <TextRoll interactive center className="font-hero-display font-bold tracking-[-0.045em]">{text}</TextRoll>
                  </div>
                </div>
                <div className="mx-auto flex max-w-md flex-wrap items-end gap-3 text-left">
                  <label className="min-w-0 flex-1 basis-44 space-y-2 text-sm font-semibold">
                    <span>Try your own text</span>
                    <input
                      type="text"
                      value={customText}
                      onChange={(event) => setCustomText(event.target.value)}
                      maxLength={40}
                      className="block min-h-11 w-full rounded-lg border border-white/25 bg-black/25 px-3 text-base text-white"
                    />
                  </label>
                  <button type="button" className={styles.action} onClick={() => setCustomText('Motion Lab')}>Use preset</button>
                </div>
              </div>
            )}

            {effect.id === 'magnetic-physics' && (
              <div className="grid w-full max-w-3xl grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                <MagneticButton type="button" variant="primary" strength={0.4}>Primary pull</MagneticButton>
                <MagneticButton type="button" variant="dark" strength={0.5}>Dark spring</MagneticButton>
                <MagneticButton type="button" variant="secondary" icon={<ArrowUpRight />} strength={0.3}>Outline motion</MagneticButton>
                <MagneticButton type="button" variant="secondary" icon={<ArrowUpRight />} strength={0.45}>Explore work</MagneticButton>
                <MagneticButton type="button" variant="primary" strength={0.6}>High elasticity</MagneticButton>
                <MagneticButton type="button" variant="dark" strength={0.35}>Soft spring</MagneticButton>
              </div>
            )}

            {effect.id === 'parallax-gallery' && (
              <div
                ref={parallaxScrollRef}
                role="region"
                aria-label="Scrollable parallax gallery"
                tabIndex={0}
                className={styles.parallaxScroll}
              >
                <ParallaxColumns scrollContainer={parallaxScrollRef} paused={Boolean(reducedMotion)} className="min-h-[44rem] sm:min-h-[58rem]" />
              </div>
            )}

            {effect.id === 'infinite-marquee' && (
              <div className="flex w-full min-w-0 flex-col items-center gap-7">
                <div className="w-full space-y-2 overflow-hidden rounded-xl bg-[#0a0a0a] py-6 sm:py-10">
                  <InfiniteMarquee paused={!playMarquee} speed="medium" fadeColor="dark">
                    {['Ease in', 'Spring', 'Loop', 'Ease out'].map((word) => <span key={word} className={styles.marqueeWord}>{word}</span>)}
                  </InfiniteMarquee>
                  <InfiniteMarquee paused={!playMarquee} direction="right" speed="fast" fadeColor="dark">
                    {['Accelerate', 'Pause', 'Reverse', 'Repeat'].map((word) => <span key={word} className={styles.marqueeWord}>{word}</span>)}
                  </InfiniteMarquee>
                </div>
                <button type="button" className={styles.action} onClick={() => setMarqueePlaying(!playMarquee)}>
                  {marqueeIcon}
                  {playMarquee ? 'Pause' : 'Play'}
                </button>
              </div>
            )}

            {effect.id === 'metric-counter' && (
              <div className="flex w-full max-w-4xl flex-col items-center gap-6">
                <div key={counterKey} className="grid w-full grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3">
                  {counters.map(({ end, suffix, label }) => (
                    <div key={label} className="rounded-xl bg-[#0a0a0a] px-2 py-5 text-center ring-1 ring-white/12 sm:py-8">
                      <p className="font-hero-display text-[clamp(2rem,6vw,4.5rem)] leading-none font-bold tracking-[-0.06em] text-[#c5f52a]" aria-hidden="true">
                        {reducedMotion && counterKey === 0 ? end + suffix : <CounterAnimation end={end} suffix={suffix} />}
                      </p>
                      <p className="font-body-ui mt-2 text-sm text-[#bdc2b4]">{label}</p>
                    </div>
                  ))}
                </div>
                <button type="button" className={styles.action} onClick={() => setCounterKey((previous) => previous + 1)}>
                  <RotateCcw size={16} aria-hidden="true" /> Replay counters
                </button>
              </div>
            )}
          </div>

          <footer className={styles.footer}>
            <p className="text-sm text-[#bdc2b4]">Built with {effect.library}</p>
            <ButtonLink href="/#contact" onClick={onClose}>Request this effect</ButtonLink>
          </footer>
        </div>
      )}
    </dialog>
  );
}
