'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { TextReveal } from '@/components/animations/TextReveal';
import { TextRoll } from '@/components/animations/TextRoll';
import { ShieldCheck, RotateCcw } from 'lucide-react';

interface NodeConfig {
  id: string;
  name: string;
  mobileName: string;
  theme: 'lime' | 'black';
  textColor: 'black' | 'lime' | 'white';
  bullets: string[];
  // Desktop relative coordinates
  relX: number;
  relY: number;
  desktopSockets: ('left' | 'right' | 'top' | 'bottom')[];
  mobileSockets: ('top' | 'bottom' | 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right' | 'bottom-left-inner' | 'bottom-right-inner')[];
}

const NODES_DATA: NodeConfig[] = [
  {
    id: 'discovery',
    name: '01 // DISCOVERY',
    mobileName: 'DISCOVERY',
    theme: 'lime',
    textColor: 'black',
    bullets: ['Creative Brief', 'Brand Research', 'Mood Boards'],
    relX: 0.03,
    relY: 0.38,
    desktopSockets: ['right'],
    mobileSockets: ['bottom-left', 'bottom-right'],
  },
  {
    id: 'concept',
    name: '02 // CONCEPT',
    mobileName: 'CONCEPT',
    theme: 'black',
    textColor: 'lime',
    bullets: ['Visual Direction', 'Art Direction', 'Storyboarding'],
    relX: 0.28,
    relY: 0.06,
    desktopSockets: ['left', 'bottom', 'right'],
    mobileSockets: ['top-right', 'bottom-right-inner'],
  },
  {
    id: 'develop',
    name: '04 // DEVELOP',
    mobileName: 'DEVELOP',
    theme: 'black',
    textColor: 'white',
    bullets: ['Creative Coding', 'WebGL & 3D', 'Animations'],
    relX: 0.28,
    relY: 0.70,
    desktopSockets: ['left', 'top', 'right'],
    mobileSockets: ['top-left', 'bottom-left-inner'],
  },
  {
    id: 'design',
    name: '03 // DESIGN',
    mobileName: 'DESIGN',
    theme: 'lime',
    textColor: 'black',
    bullets: ['UI/UX Craft', 'Motion Design', 'Interaction Design'],
    relX: 0.28,
    relY: 0.38,
    desktopSockets: ['left', 'top', 'bottom', 'right'],
    mobileSockets: ['top', 'bottom'],
  },
  {
    id: 'polish',
    name: '05 // POLISH',
    mobileName: 'POLISH',
    theme: 'lime',
    textColor: 'black',
    bullets: ['Micro-interactions', 'Performance', 'Pixel Perfect'],
    relX: 0.55,
    relY: 0.38,
    desktopSockets: ['left', 'right'],
    mobileSockets: ['top-right', 'bottom-right-inner'],
  },
  {
    id: 'launch',
    name: '06 // LAUNCH',
    mobileName: 'LAUNCH',
    theme: 'black',
    textColor: 'lime',
    bullets: ['Go Live', 'Case Study', 'Awards Submit'],
    relX: 0.79,
    relY: 0.38,
    desktopSockets: ['left'],
    mobileSockets: ['top-left'],
  },
];

interface WireConnection {
  from: string;
  fromSocket: string;
  to: string;
  toSocket: string;
}

const DESKTOP_WIRE_CONNECTIONS: WireConnection[] = [
  { from: 'discovery', fromSocket: 'right', to: 'concept', toSocket: 'left' },
  { from: 'discovery', fromSocket: 'right', to: 'design', toSocket: 'left' },
  { from: 'discovery', fromSocket: 'right', to: 'develop', toSocket: 'left' },
  { from: 'concept', fromSocket: 'bottom', to: 'design', toSocket: 'top' },
  { from: 'develop', fromSocket: 'top', to: 'design', toSocket: 'bottom' },
  { from: 'concept', fromSocket: 'right', to: 'polish', toSocket: 'left' },
  { from: 'design', fromSocket: 'right', to: 'polish', toSocket: 'left' },
  { from: 'develop', fromSocket: 'right', to: 'polish', toSocket: 'left' },
  { from: 'polish', fromSocket: 'right', to: 'launch', toSocket: 'left' },
];

// Mobile vertical river connections matching user reference image
const MOBILE_WIRE_CONNECTIONS: WireConnection[] = [
  { from: 'discovery', fromSocket: 'bottom-left', to: 'concept', toSocket: 'top-right' },
  { from: 'discovery', fromSocket: 'bottom-right', to: 'develop', toSocket: 'top-left' },
  { from: 'concept', fromSocket: 'bottom-right-inner', to: 'design', toSocket: 'top' },
  { from: 'develop', fromSocket: 'bottom-left-inner', to: 'design', toSocket: 'top' },
  { from: 'design', fromSocket: 'bottom', to: 'polish', toSocket: 'top-right' },
  { from: 'polish', fromSocket: 'bottom-right-inner', to: 'launch', toSocket: 'top-left' },
];

const DESKTOP_CARD_WIDTH = 216;
const DESKTOP_BODY_HEIGHT = 132;
const DESKTOP_TITLE_HEIGHT = 30;

const MOBILE_BODY_HEIGHT = 104;
const MOBILE_TITLE_HEIGHT = 22;

export const Process: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [positions, setPositions] = useState<Record<string, { x: number; y: number; w?: number }>>({});
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const dragStartRef = useRef<{ pointerX: number; pointerY: number; nodeX: number; nodeY: number }>({
    pointerX: 0,
    pointerY: 0,
    nodeX: 0,
    nodeY: 0,
  });
  const prevMobileRef = useRef<boolean | null>(null);

  // Calculate positions for either Desktop or Mobile
  const calculateDefaultPositions = useCallback((width: number, height: number, mobile: boolean) => {
    const coords: Record<string, { x: number; y: number; w?: number }> = {};

    if (!mobile) {
      // Responsive Desktop 4-column layout fitting precisely within available container width
      const containerW = Math.max(width, 320);
      const cardW = DESKTOP_CARD_WIDTH;
      const padX = 18;
      const usableW = Math.max(containerW - cardW - padX * 2, 40);

      // Col 1: Discovery (Left)
      const col1X = padX;
      // Col 2: Concept, Design, Develop (Middle-Left)
      const col2X = padX + Math.round(usableW * 0.33);
      // Col 3: Polish (Middle-Right)
      const col3X = padX + Math.round(usableW * 0.67);
      // Col 4: Launch (Right) — locked inside container with padX right margin
      const col4X = padX + usableW;

      coords['discovery'] = { x: col1X, y: 240, w: cardW };
      coords['concept'] = { x: col2X, y: 24, w: cardW };
      coords['design'] = { x: col2X, y: 240, w: cardW };
      coords['develop'] = { x: col2X, y: 456, w: cardW };
      coords['polish'] = { x: col3X, y: 240, w: cardW };
      coords['launch'] = { x: col4X, y: 240, w: cardW };
    } else {
      // Mobile vertical S-curve layout matching the user's reference image
      const safeW = Math.max(width, 320);
      const centerCardW = Math.min(Math.round(safeW * 0.58), 210);
      const sideCardW = Math.min(Math.round((safeW - 28) / 2), 162);
      const asymmCardW = Math.min(Math.round(safeW * 0.56), 200);

      // Row 1: DISCOVERY (center)
      coords['discovery'] = {
        x: Math.round((safeW - centerCardW) / 2),
        y: 12,
        w: centerCardW,
      };
      // Row 2: CONCEPT (left) & DEVELOP (right)
      coords['concept'] = {
        x: 6,
        y: 172,
        w: sideCardW,
      };
      coords['develop'] = {
        x: Math.round(safeW - sideCardW - 6),
        y: 172,
        w: sideCardW,
      };
      // Row 3: DESIGN (center)
      coords['design'] = {
        x: Math.round((safeW - centerCardW) / 2),
        y: 334,
        w: centerCardW,
      };
      // Row 4: POLISH (left)
      coords['polish'] = {
        x: 6,
        y: 496,
        w: asymmCardW,
      };
      // Row 5: LAUNCH (right)
      coords['launch'] = {
        x: Math.round(safeW - asymmCardW - 6),
        y: 658,
        w: asymmCardW,
      };
    }

    return coords;
  }, []);

  // Sync dimensions and responsive mode
  useEffect(() => {
    const updateDimensions = () => {
      if (!containerRef.current) return;
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      const rect = containerRef.current.getBoundingClientRect();

      setPositions((prev) => {
        // Recalculate if switching between desktop and mobile or on initial mount
        if (prevMobileRef.current === null || prevMobileRef.current !== mobile || Object.keys(prev).length === 0) {
          prevMobileRef.current = mobile;
          return calculateDefaultPositions(rect.width, rect.height, mobile);
        }

        // On window resize within the same mode, clamp any positions that exceed current container bounds
        const updated: Record<string, { x: number; y: number; w?: number }> = {};
        let changed = false;
        for (const [id, pos] of Object.entries(prev)) {
          const cardW = pos.w || (mobile ? 170 : DESKTOP_CARD_WIDTH);
          const maxX = Math.max(8, rect.width - cardW - 14);
          if (pos.x > maxX) {
            updated[id] = { ...pos, x: maxX };
            changed = true;
          } else {
            updated[id] = pos;
          }
        }
        return changed ? updated : prev;
      });
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, [calculateDefaultPositions]);

  // Pointer drag handling
  const handlePointerDown = (id: string, e: React.PointerEvent) => {
    e.preventDefault();
    const currentPos = positions[id] || { x: 0, y: 0 };
    dragStartRef.current = {
      pointerX: e.clientX,
      pointerY: e.clientY,
      nodeX: currentPos.x,
      nodeY: currentPos.y,
    };
    setDraggingId(id);
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!draggingId || !containerRef.current) return;
    const deltaX = e.clientX - dragStartRef.current.pointerX;
    const deltaY = e.clientY - dragStartRef.current.pointerY;

    const containerRect = containerRef.current.getBoundingClientRect();
    const cardW = positions[draggingId]?.w || (isMobile ? 170 : DESKTOP_CARD_WIDTH);
    const cardH = isMobile ? MOBILE_BODY_HEIGHT + MOBILE_TITLE_HEIGHT : DESKTOP_BODY_HEIGHT + DESKTOP_TITLE_HEIGHT;

    // Hard boundary constraints: cards CANNOT be dragged outside the visible canvas width or height
    const maxX = Math.max(8, containerRect.width - cardW - 14);
    const maxY = Math.max(8, (isMobile ? 805 : 670) - cardH - 14);

    const newX = Math.max(10, Math.min(dragStartRef.current.nodeX + deltaX, maxX));
    const newY = Math.max(10, Math.min(dragStartRef.current.nodeY + deltaY, maxY));

    setPositions((prev) => ({
      ...prev,
      [draggingId]: { ...prev[draggingId], x: newX, y: newY },
    }));
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (draggingId) {
      try {
        (e.target as HTMLElement).releasePointerCapture(e.pointerId);
      } catch {
        // Fallback
      }
      setDraggingId(null);
    }
  };

  // Re-Arrange animation
  const handleRearrange = () => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const targetCoords = calculateDefaultPositions(rect.width, rect.height, isMobile);
    const startCoords = { ...positions };

    const startTime = performance.now();
    const duration = 600;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Smooth elastic ease-out
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress) * Math.cos((progress * 10 - 0.75) * ((2 * Math.PI) / 3));

      const nextPositions: Record<string, { x: number; y: number; w?: number }> = {};
      for (const id of Object.keys(startCoords)) {
        const start = startCoords[id] || targetCoords[id];
        const target = targetCoords[id];
        nextPositions[id] = {
          x: start.x + (target.x - start.x) * ease,
          y: start.y + (target.y - start.y) * ease,
          w: target.w,
        };
      }

      setPositions(nextPositions);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setPositions(targetCoords);
      }
    };

    requestAnimationFrame(animate);
  };

  // Compute exact socket center coordinates for wire endpoints
  const getSocketCoord = (nodeId: string, socket: string) => {
    const pos = positions[nodeId] || { x: 0, y: 0 };
    const cardW = pos.w || (isMobile ? 165 : DESKTOP_CARD_WIDTH);
    const titleH = isMobile ? MOBILE_TITLE_HEIGHT : DESKTOP_TITLE_HEIGHT;
    const bodyH = isMobile ? MOBILE_BODY_HEIGHT : DESKTOP_BODY_HEIGHT;
    const cardTop = pos.y + titleH;

    if (isMobile) {
      switch (socket) {
        case 'bottom-left':
          return { x: pos.x + cardW * 0.14, y: cardTop + bodyH };
        case 'bottom-right':
          return { x: pos.x + cardW * 0.86, y: cardTop + bodyH };
        case 'top-left':
          return { x: pos.x + cardW * 0.20, y: cardTop };
        case 'top-right':
          return { x: pos.x + cardW * 0.80, y: cardTop };
        case 'bottom-right-inner':
          return { x: pos.x + cardW * 0.80, y: cardTop + bodyH };
        case 'bottom-left-inner':
          return { x: pos.x + cardW * 0.20, y: cardTop + bodyH };
        case 'top':
          return { x: pos.x + cardW * 0.5, y: cardTop };
        case 'bottom':
        default:
          return { x: pos.x + cardW * 0.5, y: cardTop + bodyH };
      }
    } else {
      switch (socket) {
        case 'left':
          return { x: pos.x, y: cardTop + bodyH / 2 };
        case 'right':
          return { x: pos.x + cardW, y: cardTop + bodyH / 2 };
        case 'top':
          return { x: pos.x + cardW / 2, y: cardTop };
        case 'bottom':
          return { x: pos.x + cardW / 2, y: cardTop + bodyH };
        default:
          return { x: pos.x + cardW / 2, y: cardTop + bodyH / 2 };
      }
    }
  };

  // Compute smooth cubic bezier path between two sockets
  const getBezierPath = (wire: WireConnection) => {
    const p1 = getSocketCoord(wire.from, wire.fromSocket);
    const p2 = getSocketCoord(wire.to, wire.toSocket);

    if (isMobile) {
      // Smooth vertical waterfall S-curves for mobile
      const dy = Math.max((p2.y - p1.y) * 0.5, 25);
      return `M ${p1.x} ${p1.y} C ${p1.x} ${p1.y + dy}, ${p2.x} ${p2.y - dy}, ${p2.x} ${p2.y}`;
    } else {
      if (wire.fromSocket === 'bottom' && wire.toSocket === 'top') {
        const dy = Math.max(Math.abs(p2.y - p1.y) * 0.5, 30);
        return `M ${p1.x} ${p1.y} C ${p1.x} ${p1.y + dy}, ${p2.x} ${p2.y - dy}, ${p2.x} ${p2.y}`;
      }

      if (wire.fromSocket === 'right' && wire.toSocket === 'left') {
        const dx = Math.max(Math.abs(p2.x - p1.x) * 0.45, 45);
        return `M ${p1.x} ${p1.y} C ${p1.x + dx} ${p1.y}, ${p2.x - dx} ${p2.y}, ${p2.x} ${p2.y}`;
      }

      const dx = Math.max(Math.abs(p2.x - p1.x) * 0.45, 35);
      return `M ${p1.x} ${p1.y} C ${p1.x + dx} ${p1.y}, ${p2.x - dx} ${p2.y}, ${p2.x} ${p2.y}`;
    }
  };

  const activeWires = isMobile ? MOBILE_WIRE_CONNECTIONS : DESKTOP_WIRE_CONNECTIONS;

  return (
    <section
      id="process"
      data-theme-bg="#F5F3EE"
      className="relative min-h-screen text-[#0A0A0A] bg-[#F5F3EE] pt-20 pb-28 px-4 sm:px-8 md:px-12 transition-colors duration-500 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-12">
          <div className="flex flex-col space-y-3">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-[#0A0A0A]" />
              <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#6B7280]">
                Methodology &bull; How We Ship
              </span>
            </div>
            <TextReveal
              as="h2"
              className="font-section-heading text-3xl sm:text-5xl md:text-6xl font-black text-[#0A0A0A] tracking-[-0.03em] leading-tight max-w-4xl"
            >
              Systems engineered for longevity. Deployed with precision.
            </TextReveal>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0A0A0A] text-[#C5F52A] text-xs font-mono font-bold tracking-wider shadow-sm shrink-0 w-fit">
            <ShieldCheck className="w-3.5 h-3.5 text-[#C5F52A]" />
            <TextRoll center>ARCHITECTURAL GUARANTEE</TextRoll>
          </div>
        </div>

        {/* Workflow Canvas (Seamlessly on section background) */}
        <div className={`relative w-full overflow-hidden ${isMobile ? 'max-w-lg mx-auto' : 'pt-2 pb-4'}`}>
          <div
            ref={containerRef}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            style={{ height: isMobile ? '805px' : '670px' }}
            className="relative w-full select-none overflow-hidden max-w-full"
          >
            {/* Dynamic Connecting Wires SVG Layer */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
              {activeWires.map((wire, idx) => {
                const isWireActive = draggingId === wire.from || draggingId === wire.to;
                const pathData = getBezierPath(wire);

                return (
                  <g key={`wire-${idx}`}>
                    {/* Soft Shadow wire */}
                    <path
                      d={pathData}
                      fill="none"
                      stroke={isWireActive ? 'rgba(186, 255, 57, 0.5)' : 'rgba(0, 0, 0, 0.08)'}
                      strokeWidth={isWireActive ? 6 : 4}
                      strokeLinecap="round"
                    />
                    {/* Outer Cable Line */}
                    <path
                      d={pathData}
                      fill="none"
                      stroke={isWireActive ? '#0A0A0A' : isMobile ? '#E5E7EB' : 'rgba(10, 10, 10, 0.3)'}
                      strokeWidth={isWireActive ? 2.5 : 2.5}
                      strokeLinecap="round"
                    />
                    {/* Inner highlight (giving authentic 3D cable look in screenshot) */}
                    {isMobile && !isWireActive && (
                      <path
                        d={pathData}
                        fill="none"
                        stroke="rgba(255, 255, 255, 0.85)"
                        strokeWidth={1.25}
                        strokeLinecap="round"
                      />
                    )}
                  </g>
                );
              })}
            </svg>

            {/* Draggable Process Nodes */}
            {NODES_DATA.map((node) => {
              const pos = positions[node.id] || { x: 0, y: 0 };
              const isDragging = draggingId === node.id;
              const isLime = node.theme === 'lime';
              const cardW = pos.w || (isMobile ? 165 : DESKTOP_CARD_WIDTH);
              const bodyH = isMobile ? MOBILE_BODY_HEIGHT : DESKTOP_BODY_HEIGHT;
              const titleH = isMobile ? MOBILE_TITLE_HEIGHT : DESKTOP_TITLE_HEIGHT;
              const sockets = isMobile ? node.mobileSockets : node.desktopSockets;
              const title = isMobile ? node.mobileName : node.name;
              const isCenteredTitle = isMobile && (node.id === 'discovery' || node.id === 'design');

              return (
                <div
                  key={node.id}
                  data-cursor="Drag"
                  style={{
                    transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
                    width: `${cardW}px`,
                    zIndex: isDragging ? 30 : 10,
                    touchAction: 'none',
                  }}
                  onPointerDown={(e) => handlePointerDown(node.id, e)}
                  className={`absolute top-0 left-0 cursor-grab active:cursor-grabbing select-none ${
                    isDragging ? 'shadow-2xl' : 'shadow-md'
                  }`}
                >
                  {/* Node Title */}
                  <h3
                    style={{ height: `${titleH}px` }}
                    className={`font-section-heading font-black text-xs sm:text-[13px] tracking-[0.14em] text-[#0A0A0A] flex items-center uppercase select-none mb-1 ${
                      isCenteredTitle ? 'justify-center' : 'justify-start pl-1'
                    }`}
                  >
                    {title}
                  </h3>

                  {/* Node Card Body */}
                  <div
                    data-cursor="Drag"
                    style={{ height: `${bodyH}px` }}
                    className={`relative rounded-2xl px-3 py-3 sm:px-4.5 sm:py-3.5 flex flex-col justify-center border transition-shadow duration-150 ${
                      isLime
                        ? 'bg-[#BAFF39] text-[#0A0A0A] border-[#a2e825] shadow-[0_10px_25px_-4px_rgba(186,255,57,0.4)]'
                        : 'bg-[#141414] border-white/10 shadow-[0_12px_28px_-5px_rgba(0,0,0,0.35)]'
                    }`}
                  >
                    {/* Integrated Socket Anchor Dots locked directly to card borders */}
                    {sockets.map((socket) => {
                      let socketClass = '';
                      if (isMobile) {
                        if (socket === 'bottom-left') socketClass = 'left-[14%] -bottom-2 -translate-x-1/2';
                        else if (socket === 'bottom-right') socketClass = 'left-[86%] -bottom-2 -translate-x-1/2';
                        else if (socket === 'top-left') socketClass = 'left-[20%] -top-2 -translate-x-1/2';
                        else if (socket === 'top-right') socketClass = 'left-[80%] -top-2 -translate-x-1/2';
                        else if (socket === 'bottom-right-inner') socketClass = 'left-[80%] -bottom-2 -translate-x-1/2';
                        else if (socket === 'bottom-left-inner') socketClass = 'left-[20%] -bottom-2 -translate-x-1/2';
                        else if (socket === 'top') socketClass = 'left-1/2 -top-2 -translate-x-1/2';
                        else if (socket === 'bottom') socketClass = 'left-1/2 -bottom-2 -translate-x-1/2';
                      } else {
                        if (socket === 'left') socketClass = '-left-2 top-1/2 -translate-y-1/2';
                        else if (socket === 'right') socketClass = '-right-2 top-1/2 -translate-y-1/2';
                        else if (socket === 'top') socketClass = 'left-1/2 -top-2 -translate-x-1/2';
                        else if (socket === 'bottom') socketClass = 'left-1/2 -bottom-2 -translate-x-1/2';
                      }

                      return (
                        <div
                          key={`socket-${node.id}-${socket}`}
                          className={`absolute ${socketClass} w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-white border-2 border-white/90 z-20 pointer-events-none flex items-center justify-center shadow-xs transition-transform ${
                            isDragging ? 'scale-110 shadow-[0_0_8px_rgba(186,255,57,0.9)] border-[#0A0A0A]' : ''
                          }`}
                        >
                          <div className={`w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full ${isDragging ? 'bg-[#0A0A0A]' : 'bg-[#0A0A0A]/25'}`} />
                        </div>
                      );
                    })}

                    <ul className="space-y-1 font-body-ui text-[11.5px] sm:text-[12.5px] font-semibold tracking-[-0.01em] pointer-events-none leading-tight">
                      {node.bullets.map((bullet, idx) => {
                        const bulletDotColor = isLime
                          ? 'bg-[#0A0A0A]'
                          : node.textColor === 'lime'
                          ? 'bg-[#BAFF39]'
                          : 'bg-white';

                        const bulletTextColor = isLime
                          ? 'text-[#0A0A0A]'
                          : node.textColor === 'lime'
                          ? 'text-[#BAFF39]'
                          : 'text-white';

                        return (
                          <li key={idx} className="flex items-center gap-1.5">
                            <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${bulletDotColor}`} />
                            <span className={bulletTextColor}>
                              {bullet}
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              );
            })}

            {/* Desktop RE-ARRANGE Button (bottom-right) */}
            {!isMobile && (
              <button
                onClick={handleRearrange}
                data-cursor="Reset"
                type="button"
                className="absolute bottom-6 right-6 z-20 inline-flex items-center gap-2 bg-[#BAFF39] hover:bg-[#a6ec26] text-[#0A0A0A] font-mono text-xs sm:text-sm font-black uppercase tracking-wider px-6 py-3 rounded-lg shadow-lg border border-[#0A0A0A]/10 active:scale-95 transition-all cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>RE-ARRANGE</span>
              </button>
            )}
          </div>

          {/* Mobile RE-ARRANGE Button (Centered at bottom, matching screenshot) */}
          {isMobile && (
            <div className="flex justify-center mt-6">
              <button
                onClick={handleRearrange}
                data-cursor="Reset"
                type="button"
                className="inline-flex items-center justify-center bg-[#BAFF39] hover:bg-[#a6ec26] text-[#0A0A0A] font-section-heading font-black text-sm uppercase tracking-wider px-9 py-3 rounded-lg shadow-md border border-[#0A0A0A]/10 active:scale-95 transition-all cursor-pointer"
              >
                <span>RE-ARRANGE</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};