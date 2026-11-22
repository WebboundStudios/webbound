'use client';

import { useLayoutEffect, useRef, useSyncExternalStore } from 'react';
import { createPortal } from 'react-dom';
import styles from './CustomCursor.module.css';

const pointerMedia = '(any-pointer: fine) and (prefers-reduced-motion: no-preference) and (forced-colors: none)';
const nativeCursorTargets = 'input, textarea, select, iframe, dialog[open]:not([data-project-detail]), :disabled, [aria-disabled="true"], [contenteditable]:not([contenteditable="false"])';
const hoverTargets = 'a[href], button, summary, [role="button"], [role="link"], [data-cursor]';

function subscribeToDialogChanges(update: () => void) {
  window.addEventListener('webbound:scroll-lock', update);
  return () => window.removeEventListener('webbound:scroll-lock', update);
}

function getCursorDialog() {
  return document.querySelector<HTMLDialogElement>('dialog[data-project-detail][open]');
}

function getCursorTone(element: Element) {
  for (let surface: Element | null = element; surface; surface = surface.parentElement) {
    const background = getComputedStyle(surface).backgroundColor;
    const color = background.startsWith('rgb') ? background.match(/[\d.]+/g)?.map(Number) : undefined;
    if (color && color.length >= 3 && (color[3] ?? 1) >= 0.5) {
      const [red, green, blue] = color;
      return (red * 0.299 + green * 0.587 + blue * 0.114) < 135 ? 'light' : 'dark';
    }

    const theme = surface.getAttribute('data-theme-bg')?.toUpperCase();
    if (theme === '#0A0A0A') return 'light';
    if (theme === '#F5F3EE') return 'dark';
  }

  return 'dark';
}

export function CustomCursor() {
  const dialog = useSyncExternalStore(subscribeToDialogChanges, getCursorDialog, () => null);
  const lastPoint = useRef<{ x: number; y: number } | null>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const cursor = cursorRef.current;
    const label = labelRef.current;
    if (!cursor || !label) return;

    const media = window.matchMedia(pointerMedia);
    const listeners = new AbortController();
    const options = { passive: true, signal: listeners.signal };
    let point = lastPoint.current;
    let target: Element | null = null;
    let capturedTarget: Element | null = null;
    let active = false;
    let pressed = false;
    let frame = 0;

    const setActive = (next: boolean) => {
      if (next === active) return;
      active = next;
      cursor.toggleAttribute('data-active', next);
      document.body.classList.toggle('custom-cursor-enabled', next);
    };

    const render = () => {
      frame = 0;
      if (!point) return;
      const { x, y } = point;
      const hit = document.elementFromPoint(x, y);
      const current = hit && (capturedTarget || hit);

      if (!current || current.closest(nativeCursorTargets)) {
        setActive(false);
        target = null;
        return;
      }

      if (current !== target) {
        target = current;
        const interactive = current.closest(hoverTargets);
        const action = interactive?.getAttribute('data-cursor')?.trim();
        cursor.dataset.mode = action ? 'label' : interactive ? 'hover' : 'idle';
        cursor.dataset.tone = getCursorTone(current);
        if (action && label.textContent !== action) label.textContent = action;
      }

      cursor.toggleAttribute('data-pressed', pressed);
      const side = x > window.innerWidth - 132 ? 'left' : 'right';
      if (cursor.dataset.side !== side) cursor.dataset.side = side;
      cursor.toggleAttribute('data-above', y > window.innerHeight - 48);

      cursor.style.transform = `translate3d(${x}px,${y}px,0)`;
      setActive(true);
    };

    function schedule() {
      if (point && !frame) frame = requestAnimationFrame(render);
    }

    function reset() {
      setActive(false);
      cancelAnimationFrame(frame);
      point = null;
      target = null;
      capturedTarget = null;
      pressed = false;
      frame = 0;
    }

    function track(event: PointerEvent) {
      if (event.pointerType !== 'mouse' || !media.matches) {
        reset();
        return;
      }
      point = { x: event.clientX, y: event.clientY };
      pressed = Boolean(event.buttons & 1);
      schedule();
    }

    function updateCapture(event: PointerEvent) {
      if (event.pointerType !== 'mouse') return;
      capturedTarget = event.type === 'gotpointercapture' && event.target instanceof Element ? event.target : null;
      schedule();
    }

    window.addEventListener('pointermove', track, options);
    window.addEventListener('pointerover', track, options);
    window.addEventListener('pointerdown', track, options);
    window.addEventListener('pointerup', track, options);
    window.addEventListener('gotpointercapture', updateCapture, options);
    window.addEventListener('lostpointercapture', updateCapture, options);
    window.addEventListener('pointercancel', reset, options);
    window.addEventListener('scroll', schedule, { ...options, capture: true });
    window.addEventListener('resize', schedule, options);
    window.addEventListener('blur', reset, options);
    document.documentElement.addEventListener('pointerleave', reset, options);
    document.addEventListener('visibilitychange', reset, options);
    media.addEventListener('change', reset, options);

    if (point && media.matches) render();
    return () => {
      lastPoint.current = point;
      listeners.abort();
      reset();
    };
  }, [dialog]);

  const cursor = (
    <div ref={cursorRef} className={styles.cursor} aria-hidden="true">
      <svg className={styles.pointer} width="18" height="22" viewBox="0 0 18 22" focusable="false">
        <path d="M1 1 16 12.5 9.4 13.2 6.2 19.8Z" fill="var(--cursor-ink)" stroke="var(--cursor-contrast)" strokeWidth="1.4" strokeLinejoin="round" />
      </svg>
      <span ref={labelRef} className={styles.label} />
    </div>
  );
  return dialog ? createPortal(cursor, dialog) : cursor;
}
