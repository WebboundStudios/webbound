'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLayoutEffect, useRef, useState, type CSSProperties } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { PROJECTS } from '@/constants/data';
import { CaseStudyButton } from '@/components/projects/CaseStudyButton';
import { ProjectFrame } from '@/components/projects/ProjectFrame';
import { usePageScrollTo } from '@/providers/SmoothScrollProvider';
import styles from './Projects.module.css';

if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger);

const wheelStepInterval = 420;

export function Projects() {
  const scrollTo = usePageScrollTo();
  const sectionRef = useRef<HTMLElement>(null);
  const pin = useRef<ScrollTrigger | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [desktop, setDesktop] = useState(false);
  const [selection, setSelection] = useState({ active: 0, previous: 0 });
  const { active, previous } = selection;
  function select(index: number) {
    setSelection(current => current.active === index ? current : { active: index, previous: current.active });
  }

  useLayoutEffect(() => {
    const track = trackRef.current;
    const section = sectionRef.current;
    if (!track || !section) return;

    const media = gsap.matchMedia();
    media.add({ desktop: '(min-width: 900px)', reduce: '(prefers-reduced-motion: reduce)' }, context => {
      if (!context.conditions?.desktop) return;
      setDesktop(true);
      const warmCovers = new IntersectionObserver(([entry]) => {
        if (!entry.isIntersecting) return;
        warmCovers.disconnect();
        track.querySelectorAll<HTMLImageElement>('[data-case-cover] img').forEach(image => {
          image.loading = 'eager';
          void image.decode().catch(() => {});
        });
      }, { rootMargin: '75% 0px' });
      warmCovers.observe(section);
      let lastStepTime = -Infinity;
      let lastStepDirection = 0;
      function stepOnWheel(event: WheelEvent) {
        const trigger = pin.current;
        if (!trigger || !event.cancelable || event.defaultPrevented || event.ctrlKey || event.shiftKey || !event.deltaY || Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;
        if (event.target instanceof Element && event.target.closest('dialog, [data-lenis-prevent]')) return;
        const y = trigger.scroll();
        if (y < trigger.start - 1 || y > trigger.end + 1) return;
        const direction = Math.sign(event.deltaY);
        const last = PROJECTS.length - 1;
        const next = Math.round(trigger.progress * last) + direction;
        if (next < 0 || next > last) return;

        // Give each transition time to play while allowing sustained scrolling to keep advancing.
        event.preventDefault();
        event.stopPropagation();
        const now = performance.now();
        if (direction === lastStepDirection && now - lastStepTime < wheelStepInterval) return;
        lastStepTime = now;
        lastStepDirection = direction;
        scrollTo(Math.round(trigger.start + next / last * (trigger.end - trigger.start)), true);
        ScrollTrigger.update();
      }
      if (!context.conditions.reduce) {
        const last = PROJECTS.length - 1;
        pin.current = ScrollTrigger.create({
          trigger: section,
          start: 'center center',
          end: () => '+=' + track.clientWidth * last,
          pin: true,
          refreshPriority: 1,
          onUpdate: self => select(Math.round(self.progress * last)),
          onRefresh: self => select(Math.round(self.progress * last)),
        });
        // Capture wheel input when the active card changes under a stationary pointer.
        window.addEventListener('wheel', stepOnWheel, { capture: true, passive: false });
      }
      return () => {
        warmCovers.disconnect();
        window.removeEventListener('wheel', stepOnWheel, true);
        pin.current = null;
        setSelection({ active: 0, previous: 0 });
        setDesktop(false);
      };
    });
    return () => media.revert();
  }, [scrollTo]);

  function slideTo(index: number) {
    const trigger = pin.current;
    if (trigger) {
      const progress = index / (PROJECTS.length - 1);
      scrollTo(trigger.start + progress * (trigger.end - trigger.start), false);
    } else {
      select(index);
    }
  }

  return (
    <section ref={sectionRef} id="projects" aria-labelledby="selected-work-heading" data-theme-bg="#0A0A0A" className={styles.section}>
      <div className={styles.gallery}>
        <header className={styles.header}>
          <h2 id="selected-work-heading" className="font-hero-display">Selected work<span>.</span></h2>
          <div>
            <p>Websites for architecture, interiors, and event studios.</p>
            <Link href="/work" className={styles.archive}>All case studies <ArrowUpRight size={16} aria-hidden="true" /></Link>
          </div>
        </header>

        <div className={styles.stage}>
          <div className={styles.corners} aria-hidden="true" />
          <div ref={trackRef} className={styles.track}
            onKeyDown={event => {
              if (!desktop || !['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
              event.preventDefault();
              event.currentTarget.focus({ preventScroll: true });
              slideTo(Math.max(0, Math.min(PROJECTS.length - 1, active + (event.key === 'ArrowRight' ? 1 : -1))));
            }}
            tabIndex={desktop ? 0 : undefined} role="region" aria-label="Selected projects">
            {PROJECTS.map((project, index) => {
              const name = project.shortTitle ?? project.title;
              function preview(direction: number) {
                const next = index + direction;
                const neighbor = PROJECTS[next];
                if (!neighbor) return null;
                const label = neighbor.shortTitle ?? neighbor.title;
                return (
                  <button type="button" className={direction < 0 ? styles.previous : styles.next}
                    aria-label={'Show ' + label} onClick={() => {
                      if (!trackRef.current) return;
                      trackRef.current.focus({ preventScroll: true });
                      slideTo(next);
                    }}>
                    <span className={styles.previewImage}><Image src={neighbor.image} alt="" fill sizes="(min-width: 900px) 16vw, 1px" className="object-cover" /></span>
                    <span>{direction < 0 && <ArrowLeft size={15} />}{label}{direction > 0 && <ArrowRight size={15} />}</span>
                  </button>
                );
              }
              return (
                <article key={project.id} className={styles.project} data-current={index === active || undefined}
                  style={{ '--cover-x': (index - active) * 100 + '%' } as CSSProperties}
                  data-switched={active !== previous || undefined}
                  data-direction={active < previous ? 'back' : 'forward'} inert={desktop && index !== active}>
                  <div className={styles.images}>
                    {preview(-1)}
                    <ProjectFrame className={styles.mainFrame} project={project} sizes="(min-width: 1500px) 700px, (min-width: 900px) 47vw, 90vw">
                      <CaseStudyButton project={project} className={styles.imageButton}>
                        <span className="sr-only">Open case study for {project.title}</span>
                      </CaseStudyButton>
                    </ProjectFrame>
                    {preview(1)}
                  </div>
                  <div className={styles.caption}>
                    <div>
                      <p className={styles.category}>{project.category}</p>
                      <h3 className={styles.title}><span className={styles.shortTitle}><i>{name.split(' ')[0]}</i>{' ' + name.split(' ').slice(1).join(' ')}</span><span className={styles.fullTitle}>{project.title}</span></h3>
                    </div>
                    <div className={styles.summary}>
                      <p>{project.description}</p>
                      <CaseStudyButton project={project} className={styles.open}>
                        Read case study<span className="sr-only"> for {project.title}</span><ArrowUpRight size={18} aria-hidden="true" />
                      </CaseStudyButton>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
