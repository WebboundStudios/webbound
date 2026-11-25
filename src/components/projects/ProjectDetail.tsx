'use client';

import { useId, useLayoutEffect, useRef } from 'react';
import Link from 'next/link';
import { ButtonLink } from '@/components/ui/Button';
import gsap from 'gsap';
import { Flip } from 'gsap/Flip';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import type { ProjectItem } from '@/types';
import { SERVICE_PAGES } from '@/constants/service-pages';
import { ProjectFrame } from './ProjectFrame';
import styles from './project-detail.module.css';

const reducedMotion = '(prefers-reduced-motion: reduce)';
gsap.registerPlugin(Flip);

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

  let copy = ghost.querySelector('img');
  if (!copy) {
    copy = document.createElement('img');
    copy.alt = '';
    ghost.append(copy);
  }
  if (copy.src !== source.src) copy.src = source.src;

  // Capture the visible frame, including the current position of an interrupted flight.
  gsap.set(ghost, { clearProps: 'transform' });
  gsap.set(ghost, { ...source.frame, visibility: 'visible' });
  const first = Flip.getState(ghost, { simple: true, props: 'borderRadius' });
  gsap.set(ghost, { ...target, transformOrigin: '0 0', visibility: 'visible' });
  return Flip.from(first, { simple: true, scale: true, props: 'borderRadius', duration: 0.68, ease: 'power2.inOut' });
}

type ProjectDetailProps = {
  project: ProjectItem;
  trigger: HTMLButtonElement;
  cover: HTMLDivElement;
  onClose: () => void;
};

export function ProjectDetail({ project, trigger, cover, onClose }: ProjectDetailProps) {
  const titleId = useId();
  const service = SERVICE_PAGES.find(({ focus }) => focus === project.focus);
  const previewSections = [
    { heading: 'Overview', text: project.preview.overview },
    { heading: 'The challenge', text: project.preview.challenge },
    { heading: 'The approach', text: project.preview.approach },
  ];
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

    const source = readCover(cover);
    dialog.showModal();
    window.dispatchEvent(new CustomEvent('webbound:scroll-lock', { detail: { open: true } }));
    closeRef.current?.focus({ preventScroll: true });

    if (!window.matchMedia(reducedMotion).matches) {
      const flip = playCoverFlip(ghost, source, measureCover(image));
      const entrance = gsap.timeline();
      if (flip && source) {
        flying.current = true;
        gsap.set([cover, image], { visibility: 'hidden' });
        // Keep the thumbnail visible on landing while the larger image loads.
        image.style.backgroundImage = `url(${JSON.stringify(source.src)})`;
        entrance.add(flip, 0);
      }
      entrance.fromTo(pane, { opacity: 0 }, { opacity: 1, duration: flip ? 0.5 : 0.3, ease: 'sine.inOut' }, flip ? 0.08 : 0);
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
      gsap.set([pane, image, cover], { clearProps: 'opacity,visibility' });
      image.style.removeProperty('background-image');
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
    const frame = measureCover(from);
    const thumbnail = readCover(cover);
    const source = readCover(from) ?? (frame && thumbnail && { frame, src: thumbnail.src });
    const target = measureCover(cover);
    timeline.current?.kill();

    const flip = playCoverFlip(ghost, source, target);
    if (flip) gsap.set([cover, image], { visibility: 'hidden' });
    else {
      gsap.set(ghost, { visibility: 'hidden' });
      gsap.set(cover, { clearProps: 'visibility' });
    }

    const exit = gsap.timeline({ onComplete: onClose });
    if (flip) exit.add(flip, 0);
    exit.to(pane, { opacity: 0, duration: flip ? 0.48 : 0.24, ease: 'sine.inOut' }, 0);
    timeline.current = exit;
  }

  return (
    <dialog
      ref={dialogRef}
      data-project-detail
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
              aria-label="Close project preview"
              className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-white hover:text-[#C5F52A] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C5F52A]"
            >
              <ArrowLeft size={17} aria-hidden="true" /> Back
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
          <p className="font-body-ui mt-4 max-w-[62ch] leading-relaxed text-white/70">{project.description}</p>
          <ButtonLink href={`/work/${project.id}`} onNavigate={onClose} className="mt-5">
            Read full case study
          </ButtonLink>

          <div className="mt-8 grid gap-7 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] lg:gap-10">
            <ProjectFrame project={project} detailRef={imageRef} sizes="(max-width: 1023px) calc(100vw - 48px), (max-width: 1439px) 60vw, 840px" />
            <dl className="font-body-ui self-start divide-y divide-white/15 border-y border-white/15 text-sm lg:text-base">
              <div className="py-3"><dt className="text-white/65">Client</dt><dd className="mt-1 font-semibold">{project.client}</dd></div>
              {project.role && <div className="py-3"><dt className="text-white/65">Role</dt><dd className="mt-1 font-semibold">{project.role}</dd></div>}
              <div className="py-3"><dt className="text-white/65">Deliverable</dt><dd className="mt-1 font-semibold">{project.impact}</dd></div>
              <div className="py-3"><dt className="text-white/65">Technology</dt><dd className="mt-1 font-semibold">{project.tags.join(' · ')}</dd></div>
            </dl>
          </div>

          <div className="mt-10 grid gap-6 border-t border-white/15 pt-7 md:grid-cols-3">
            {previewSections.map(({ heading, text }) => (
              <section key={heading}>
                <h3 className="font-section-heading text-xl font-bold">{heading}</h3>
                <p className="font-body-ui mt-2 max-w-[50ch] leading-relaxed text-white/70">{text}</p>
              </section>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2">
            <Link href="/#contact" onNavigate={onClose} className="inline-flex min-h-11 items-center gap-2 font-semibold text-[#C5F52A] underline-offset-4 hover:underline">
              Get a project quote <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
            {service && (
              <Link href={`/services/${service.slug}`} onNavigate={onClose} className="inline-flex min-h-11 items-center font-semibold underline-offset-4 hover:underline">
                {service.name}
              </Link>
            )}
          </div>
        </div>
      </div>
      <div ref={ghostRef} className={styles.ghost} aria-hidden="true" data-project-flight />
    </dialog>
  );
}
