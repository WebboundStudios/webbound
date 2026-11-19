'use client';

import { useEffect, useRef } from 'react';
import styles from './CustomCursor.module.css';

const pointerMedia = '(any-pointer: fine) and (prefers-reduced-motion: no-preference) and (forced-colors: none)';
const nativeCursorTargets = 'input, textarea, select, iframe, dialog[open], :disabled, [aria-disabled="true"], [contenteditable]:not([contenteditable="false"])';
const hoverTargets = 'a[href], button, summary, [role="button"], [role="link"], [data-cursor]';
const maxTrailDistance = 26;

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
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const trail = trailRef.current;
    const label = labelRef.current;
    if (!cursor || !trail || !label) return;

    const media = window.matchMedia(pointerMedia);
    const listeners = new AbortController();
    const options = { passive: true, signal: listeners.signal };
    let point: { x: number; y: number } | null = null;
    let target: Element | null = null;
    let capturedTarget: Element | null = null;
    let active = false;
    let pressed = false;
    let frame = 0;
    let previousTime = 0;
    let trailX = 0;
    let trailY = 0;

    const setActive = (next: boolean) => {
      if (next === active) return;
      active = next;
      cursor.toggleAttribute('data-active', next);
      document.body.classList.toggle('custom-cursor-enabled', next);
    };

    const render = (now: number) => {
      frame = 0;
      if (!point) return;
      const { x, y } = point;
      const hit = document.elementFromPoint(x, y);
      const current = hit && (capturedTarget || hit);

      if (!current || current.closest(nativeCursorTargets)) {
        setActive(false);
        target = null;
        previousTime = 0;
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
      const side = x > window.innerWidth - 106 ? 'left' : 'right';
      if (cursor.dataset.side !== side) cursor.dataset.side = side;

      if (!active) {
        trailX = x;
        trailY = y;
      } else {
        const elapsed = previousTime ? now - previousTime : 1000 / 60;
        const easing = 1 - Math.exp(-elapsed / 34);
        trailX += (x - trailX) * easing;
        trailY += (y - trailY) * easing;
      }

      const offsetX = trailX - x;
      const offsetY = trailY - y;
      const distance = Math.hypot(offsetX, offsetY);
      const ratio = distance > maxTrailDistance ? maxTrailDistance / distance : 1;
      const moving = distance > 0.25;

      trailX = moving ? x + offsetX * ratio : x;
      trailY = moving ? y + offsetY * ratio : y;
      cursor.style.transform = `translate3d(${x}px,${y}px,0)`;
      trail.style.transform = `translate3d(${trailX - x}px,${trailY - y}px,0)`;
      setActive(true);

      previousTime = moving ? now : 0;
      if (moving) schedule();
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
      previousTime = 0;
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

    return () => {
      listeners.abort();
      reset();
    };
  }, []);

  return (
    <div ref={cursorRef} className={styles.cursor} aria-hidden="true">
      <div ref={trailRef} className={styles.trail}>
        <span className={styles.ring} />
      </div>
      <span className={styles.dot} />
      <span ref={labelRef} className={styles.label} />
    </div>
  );
}
