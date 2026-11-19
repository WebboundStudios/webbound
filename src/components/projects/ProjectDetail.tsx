'use client';

import { useId, useLayoutEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { Flip } from 'gsap/Flip';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import type { ProjectItem } from '@/types';
import { ProjectStory } from './ProjectStory';
import styles from './project-detail.module.css';

if (typeof window !== 'undefined') gsap.registerPlugin(Flip);

const reducedMotion = '(prefers-reduced-motion: reduce)';

function measureCover(element: HTMLElement) {
  const { left, top, width, height, right, bottom } = element.getBoundingClientRect();
  if (!width || !height || bottom <= 0 || right <= 0 || top >= innerHeight || left >= innerWidth) return null;

  return { left, top, width, height, borderRadius: getComputedStyle(element).borderRadius };
}

function readCover(element: HTMLElement) {
  const frame = measureCover(element);
  const photo = element.querySelector('img');
  if (!frame || !photo?.complete || !photo.naturalWidth) return null;

  return { frame, src: photo.currentSrc || photo.src };
}

function playCoverFlip(
  ghost: HTMLDivElement,
  source: ReturnType<typeof readCover>,
  target: ReturnType<typeof measureCover>,
) {
  if (!source || !target) return null;

  const copy = document.createElement('img');
  copy.alt = '';
  copy.src = source.src;
  ghost.replaceChildren(copy);

  // Only the overlay changes geometry. The card and dialog keep their own image nodes.
  gsap.set(ghost, { clearProps: 'transform' });
  gsap.set(ghost, { ...source.frame, visibility: 'visible' });
  const state = Flip.getState(ghost, { props: 'borderRadius' });
  gsap.set(ghost, target);

  return Flip.from(state, { duration: 0.5, ease: 'power3.inOut', props: 'borderRadius', scale: false });
}

type ProjectDetailProps = {
  project: ProjectItem;
  trigger: HTMLButtonElement;
  cover: HTMLDivElement;
  onClose: () => void;
};

export function ProjectDetail({ project, trigger, cover, onClose }: ProjectDetailProps) {
  const titleId = useId();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const paneRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const ghostRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const timeline = useRef<gsap.core.Timeline | null>(null);
  const closing = useRef(false);
  const flying = useRef(false);

  useLayoutEffect(() => {
    const dialog = dialogRef.current;
    const pane = paneRef.current;
    const image = imageRef.current;
    const ghost = ghostRef.current;
    if (!dialog || !pane || !image || !ghost) return;

    dialog.showModal();
    window.dispatchEvent(new CustomEvent('webbound:scroll-lock', { detail: { open: true } }));
    closeRef.current?.focus({ preventScroll: true });

    if (!window.matchMedia(reducedMotion).matches) {
      const flip = playCoverFlip(ghost, readCover(cover), measureCover(image));
      const entrance = gsap.timeline();
      if (flip) {
        flying.current = true;
        gsap.set(image, { visibility: 'hidden' });
        entrance.add(flip, 0);
      }
      entrance.fromTo(pane, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'power2.out' }, 0);
      entrance.call(() => {
        flying.current = false;
        gsap.set(image, { clearProps: 'visibility' });
        gsap.set(ghost, { visibility: 'hidden' });
        ghost.replaceChildren();
      });
      timeline.current = entrance;
    }

    return () => {
      timeline.current?.kill();
      flying.current = false;
      if (dialog.open) dialog.close();
      gsap.set([pane, image], { clearProps: 'opacity,visibility' });
      gsap.set(ghost, { visibility: 'hidden' });
      ghost.replaceChildren();
      window.dispatchEvent(new CustomEvent('webbound:scroll-lock', { detail: { open: false } }));
      trigger.focus({ preventScroll: true });
    };
  }, [cover, trigger]);

  function close() {
    if (closing.current) return;
    closing.current = true;

    const pane = paneRef.current;
    const image = imageRef.current;
    const ghost = ghostRef.current;

    if (!pane || !image || !ghost || window.matchMedia(reducedMotion).matches) {
      onClose();
      return;
    }

    // If the close button is used mid-flight, start the return at the image's current position.
    const from = flying.current ? ghost : image;
    timeline.current?.pause();
    const source = readCover(from);
    const target = measureCover(cover);
    timeline.current?.kill();

    const flip = playCoverFlip(ghost, source, target);
    if (flip) gsap.set(image, { visibility: 'hidden' });
    else gsap.set(ghost, { visibility: 'hidden' });

    const exit = gsap.timeline({ onComplete: onClose });
    if (flip) exit.add(flip, 0);
    exit.to(pane, { opacity: 0, duration: 0.24, ease: 'power2.in' }, 0);
    timeline.current = exit;
  }

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      className={styles.dialog + ' text-white'}
      onCancel={(event) => {
        event.preventDefault();
        close();
      }}
    >
      <div ref={paneRef} className={styles.pane + ' bg-[#0A0A0A]'} data-lenis-prevent>
        <header className="sticky top-0 z-10 border-b border-white/15 bg-[#0A0A0A] px-6 md:px-12 lg:px-20">
          <div className="mx-auto flex min-h-16 max-w-7xl flex-wrap items-center justify-between gap-x-4">
            <button
              ref={closeRef}
              type="button"
              onClick={close}
              aria-label="Close case study"
              className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-white hover:text-[#C5F52A] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C5F52A]"
            >
              <ArrowLeft size={17} aria-hidden="true" /> Selected work
            </button>
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-[#C5F52A] underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C5F52A]"
              >
                Visit website <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            )}
          </div>
        </header>

        <div className="mx-auto max-w-360 px-6 pt-10 pb-20 md:px-12 md:pt-14 lg:px-20">
          <p className="font-body-ui mb-3 text-sm text-white/70">{project.category} · {project.year}</p>
          <h2 id={titleId} className="font-section-heading max-w-5xl text-[clamp(2.5rem,6vw,5.5rem)] leading-none font-bold tracking-[-0.045em] text-balance">
            {project.title}
          </h2>

          <div className="mt-8 grid gap-7 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] lg:gap-10">
            <div ref={imageRef} style={{ aspectRatio: project.coverAspectRatio }} className="relative aspect-video overflow-hidden rounded-lg bg-[#1B1B1B]" data-project-detail-cover>
              <Image
                src={project.image}
                alt={project.imageAlt}
                fill
                loading="eager"
                sizes="(max-width: 1023px) calc(100vw - 48px), (max-width: 1439px) 60vw, 840px"
                className="object-cover"
              />
            </div>
            <dl className="font-body-ui self-start divide-y divide-white/15 border-y border-white/15 text-sm lg:text-base">
              <div className="py-3"><dt className="text-white/65">Client</dt><dd className="mt-1 font-semibold">{project.client}</dd></div>
              {project.role && <div className="py-3"><dt className="text-white/65">Role</dt><dd className="mt-1 font-semibold">{project.role}</dd></div>}
              <div className="py-3"><dt className="text-white/65">Deliverable</dt><dd className="mt-1 font-semibold">{project.impact}</dd></div>
              <div className="py-3"><dt className="text-white/65">Technology</dt><dd className="mt-1 font-semibold">{project.tags.join(' · ')}</dd></div>
            </dl>
          </div>

          <ProjectStory project={project} inDialog />
          <Link href={`/work/${project.id}`} className="mt-8 inline-flex min-h-11 items-center gap-2 font-semibold text-[#C5F52A] underline-offset-4 hover:underline">
            Open case study page <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>
      <div ref={ghostRef} className={styles.ghost} aria-hidden="true" data-project-flight />
    </dialog>
  );
}
