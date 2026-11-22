'use client';

import { useEffect, useEffectEvent } from 'react';
import { cancelFrame, frame } from 'framer-motion';

export function useMarqueeFrame(active: boolean, advance: (elapsed: number, scrollDelta: number) => void) {
  const onFrame = useEffectEvent(advance);

  useEffect(() => {
    if (!active) return;
    let previousScroll = window.scrollY;
    function tick({ delta }: { delta: number }) {
      const scroll = window.scrollY;
      onFrame(delta, scroll - previousScroll);
      previousScroll = scroll;
    }
    frame.update(tick, true);
    return () => cancelFrame(tick);
  }, [active]);
}
