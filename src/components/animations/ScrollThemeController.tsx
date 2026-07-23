'use client';

import React, { useEffect } from 'react';
import gsap from 'gsap';

export const ScrollThemeController: React.FC = () => {
  useEffect(() => {
    const mainEl = document.querySelector<HTMLElement>('main');
    if (!mainEl) return;

    gsap.set([mainEl, document.body], {
      backgroundColor: '#F5F3EE',
      color: '#0A0A0A',
    });
  }, []);

  return null;
};
