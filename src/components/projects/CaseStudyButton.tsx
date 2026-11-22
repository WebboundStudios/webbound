'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import type { ProjectItem } from '@/types';
import { ProjectDetail } from './ProjectDetail';

type Props = {
  project: ProjectItem;
  children: ReactNode;
  className: string;
  anchorId?: string;
};

export function CaseStudyButton({ project, children, className, anchorId }: Props) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [origin, setOrigin] = useState<{ trigger: HTMLButtonElement; cover: HTMLDivElement } | null>(null);

  function open() {
    const trigger = buttonRef.current;
    const cover = trigger?.closest('article')?.querySelector<HTMLDivElement>('[data-case-cover]');
    if (trigger && cover) setOrigin({ trigger, cover });
  }

  useEffect(() => {
    if (!anchorId) return;
    function openLinkedProject() {
      if (window.location.hash === '#' + anchorId) open();
    }
    openLinkedProject();
    window.addEventListener('hashchange', openLinkedProject);
    return () => window.removeEventListener('hashchange', openLinkedProject);
  }, [anchorId]);

  function close() {
    setOrigin(null);
    if (anchorId && window.location.hash === '#' + anchorId) {
      window.history.replaceState(window.history.state, '', window.location.pathname + window.location.search);
    }
  }

  return (
    <>
      <button ref={buttonRef} type="button" aria-haspopup="dialog" data-cursor="View project" onClick={open} className={className}>
        {children}
      </button>
      {origin && createPortal(<ProjectDetail project={project} {...origin} onClose={close} />, document.body)}
    </>
  );
}
