'use client';

import { useEffect, useId, useRef, useState, useSyncExternalStore, type CSSProperties, type PointerEvent } from 'react';
import {
  LazyMotion,
  domAnimation,
  m,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion';
import { CodeXml, Compass, Gauge, MousePointer2, PenTool, Rocket } from 'lucide-react';
import { HeroCoreArtwork, heroCoreLayerAnchors } from './hero-core-artwork';
import styles from './hero-core.module.css';

const pointerSpring = { stiffness: 55, damping: 18, mass: 0.9 };
const stackSpring = { stiffness: 105, damping: 25, mass: 1 };
const reducedMotionQuery = '(prefers-reduced-motion: reduce)';
const mobileCalloutTop = (index: number) => (82 - index * 16) + '%';

const layers = [
  { title: 'Discovery & Strategy', details: 'Goals · Audience · Site plan', icon: Compass, side: 'right' },
  { title: 'Design & Motion', details: 'UI/UX · Prototypes · Animation', icon: PenTool, side: 'left' },
  { title: 'Web Development', details: 'Pages · Galleries · Enquiry forms', icon: CodeXml, side: 'right', main: true },
  { title: 'Performance & QA', details: 'Speed · SEO · Device testing', icon: Gauge, side: 'left' },
  { title: 'Launch & Support', details: 'Deployment · Handover · Maintenance', icon: Rocket, side: 'right' },
];

function subscribeToMotionPreference(update: () => void) {
  const preference = window.matchMedia(reducedMotionQuery);
  preference.addEventListener('change', update);
  return () => preference.removeEventListener('change', update);
}

function subscribeToVisibility(update: () => void) {
  document.addEventListener('visibilitychange', update);
  return () => document.removeEventListener('visibilitychange', update);
}

export function HeroCore() {
  const canvas = useRef<HTMLDivElement>(null);
  const svg = useRef<SVGSVGElement>(null);
  const pointerType = useRef('mouse');
  const layersId = useId();
  const [expanded, setExpanded] = useState(false);
  const pageVisible = useSyncExternalStore(subscribeToVisibility, () => !document.hidden, () => true);
  const reducedMotion = useSyncExternalStore(
    subscribeToMotionPreference,
    () => window.matchMedia(reducedMotionQuery).matches,
    () => false,
  );
  const inView = useInView(canvas, { initial: true, margin: '40px' });
  const playing = inView && pageVisible && !reducedMotion;

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const x = useSpring(pointerX, pointerSpring);
  const y = useSpring(pointerY, pointerSpring);
  const progress = useSpring(0, stackSpring);
  const rotateY = useTransform([x, progress], ([pointer, open]: number[]) => pointer * 3.5 * (1 - open));
  const rotateX = useTransform([y, progress], ([pointer, open]: number[]) => pointer * -3.5 * (1 - open));

  useEffect(() => {
    const target = expanded ? 1 : 0;
    if (reducedMotion) progress.jump(target);
    else progress.set(target);
  }, [expanded, progress, reducedMotion]);

  useEffect(() => {
    const artwork = svg.current;
    if (playing && !expanded) artwork?.unpauseAnimations?.();
    else artwork?.pauseAnimations?.();
  }, [expanded, playing]);

  function movePointer(event: PointerEvent<HTMLDivElement>) {
    if (reducedMotion || event.pointerType !== 'mouse') return;
    const bounds = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - bounds.left) / bounds.width * 2 - 1);
    pointerY.set((event.clientY - bounds.top) / bounds.height * 2 - 1);
  }

  return (
    <LazyMotion features={domAnimation}>
      <div
        className={styles.visual}
        data-playing={playing}
        onPointerLeave={(event) => {
          if (event.pointerType !== 'mouse') return;
          pointerX.set(0);
          pointerY.set(0);
          setExpanded(false);
        }}
      >
        <div ref={canvas} className={styles.canvas} onPointerMove={movePointer}>
          <m.div className={styles.tilt} style={reducedMotion ? undefined : { rotateX, rotateY }}>
            <HeroCoreArtwork svgRef={svg} x={x} y={y} progress={progress} />
          </m.div>
          {expanded && <svg className={styles.mobileLeaders} aria-hidden="true">
            {layers.map(({ title, side }, index) => {
              const { top, edge } = heroCoreLayerAnchors[index];
              const right = side === 'right';
              return <line key={title}
                x1={(50 + (right ? edge : -edge)) + '%'}
                y1={`calc(50% + ${(top - 50) * 800 / 1120}cqw)`}
                x2={right ? '67%' : '33%'} y2={mobileCalloutTop(index)}
              />;
            })}
          </svg>}
          <button
            type="button"
            className={styles.control}
            aria-label="Exploded view of the hero illustration"
            aria-controls={layersId}
            aria-expanded={expanded}
            onPointerDown={(event) => {
              pointerType.current = event.pointerType;
            }}
            onPointerEnter={(event) => {
              if (!reducedMotion && event.pointerType === 'mouse') setExpanded(true);
            }}
            onClick={(event) => {
              if (reducedMotion || event.detail === 0 || pointerType.current !== 'mouse') {
                setExpanded((current) => !current);
              }
            }}
            onBlur={() => setExpanded(false)}
            onKeyDown={(event) => {
              if (event.key === 'Escape') setExpanded(false);
            }}
          >
            <span className={styles.hint} aria-hidden="true">
              <MousePointer2 size={15} strokeWidth={1.8} />
              <span className={styles.pointerHint}>{reducedMotion ? 'Click to see how it works' : 'Hover to see how it works'}</span>
              <span className={styles.touchHint}>{expanded ? 'Tap to close' : 'Tap to see how it works'}</span>
            </span>
          </button>
        </div>
        <ol
          id={layersId}
          className={styles.layers}
          aria-label="Website project stages"
          aria-hidden={!expanded}
          data-expanded={expanded}
        >
          {layers.map(({ title, details, icon: Icon, side, main }, index) => {
            const anchor = heroCoreLayerAnchors[index];

            return (
              <li
                key={title}
                className={styles.layer}
                data-side={side}
                style={{ '--layer-top': anchor.top + '%', '--layer-edge': anchor.edge + 'cqw', '--mobile-top': mobileCalloutTop(index) } as CSSProperties}
              >
                <span className={styles.connector} aria-hidden="true" />
                <div className={styles.layerHeading}>
                  <span className={styles.layerNumber} aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                  <strong>{title}</strong>
                  {main && <span className={styles.mainLayer}>Core build</span>}
                </div>
                <p className={styles.layerDetails}><Icon size={14} aria-hidden="true" /> {details}</p>
              </li>
            );
          })}
        </ol>
      </div>
    </LazyMotion>
  );
}
