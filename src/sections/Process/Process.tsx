'use client';

import { useEffect, useRef, useState, type PointerEvent } from 'react';
import { RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/Button';

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


type NodePosition = { x: number; y: number; w: number };
type Positions = Record<string, NodePosition>;
type Drag = {
  id: string;
  pointerId: number;
  pointerX: number;
  pointerY: number;
  origin: NodePosition;
  width: number;
  height: number;
  pending?: NodePosition;
};

const socketAnchors: Record<string, [number, number]> = {
  left: [0, 0.5],
  right: [1, 0.5],
  top: [0.5, 0],
  bottom: [0.5, 1],
  'bottom-left': [0.14, 1],
  'bottom-right': [0.86, 1],
  'top-left': [0.2, 0],
  'top-right': [0.8, 0],
  'bottom-left-inner': [0.2, 1],
  'bottom-right-inner': [0.8, 1],
};

function calculateDefaultPositions(width: number, mobile: boolean): Positions {
  if (!mobile) {
    const cardW = Math.min(DESKTOP_CARD_WIDTH, Math.max(172, Math.round(width * 0.19)));
    const inset = 18;
    const travel = width - cardW - inset * 2;
    const middle = inset + Math.round(travel * 0.33);

    return {
      discovery: { x: inset, y: 240, w: cardW },
      concept: { x: middle, y: 24, w: cardW },
      design: { x: middle, y: 240, w: cardW },
      develop: { x: middle, y: 456, w: cardW },
      polish: { x: inset + Math.round(travel * 0.67), y: 240, w: cardW },
      launch: { x: inset + travel, y: 240, w: cardW },
    };
  }

  const center = Math.min(Math.round(width * 0.58), 210);
  const side = Math.min(Math.floor((width - 28) / 2), 162);
  const edge = Math.min(Math.round(width * 0.56), 200);

  return {
    discovery: { x: Math.round((width - center) / 2), y: 12, w: center },
    concept: { x: 6, y: 172, w: side },
    develop: { x: width - side - 6, y: 172, w: side },
    design: { x: Math.round((width - center) / 2), y: 334, w: center },
    polish: { x: 6, y: 496, w: edge },
    launch: { x: width - edge - 6, y: 658, w: edge },
  };
}

function boundPosition(position: NodePosition, width: number, height: number, mobile: boolean): NodePosition {
  const cardHeight = mobile
    ? MOBILE_TITLE_HEIGHT + MOBILE_BODY_HEIGHT
    : DESKTOP_TITLE_HEIGHT + DESKTOP_BODY_HEIGHT;
  return {
    ...position,
    x: Math.max(6, Math.min(position.x, width - position.w - 6)),
    y: Math.max(6, Math.min(position.y, height - cardHeight - 6)),
  };
}

function getWirePath(wire: WireConnection, positions: Positions, mobile: boolean) {
  function center(id: string, socket: string) {
    const [x, y] = socketAnchors[socket];
    const node = positions[id];

    return {
      x: node.x + node.w * x,
      y: node.y + (mobile ? MOBILE_TITLE_HEIGHT : DESKTOP_TITLE_HEIGHT)
        + y * (mobile ? MOBILE_BODY_HEIGHT : DESKTOP_BODY_HEIGHT),
    };
  }

  const from = center(wire.from, wire.fromSocket);
  const to = center(wire.to, wire.toSocket);

  if (mobile || wire.fromSocket === 'bottom' || wire.fromSocket === 'top') {
    const direction = wire.fromSocket === 'top' ? -1 : 1;
    const bend = Math.max(Math.abs(to.y - from.y) * 0.5, 25) * direction;
    return ['M', from.x, from.y, 'C', from.x, from.y + bend, to.x, to.y - bend, to.x, to.y].join(' ');
  }

  const bend = Math.max(Math.abs(to.x - from.x) * 0.45, 35);
  return ['M', from.x, from.y, 'C', from.x + bend, from.y, to.x - bend, to.y, to.x, to.y].join(' ');
}

export function Process() {
  const canvasRef = useRef<HTMLDivElement>(null);
  const drag = useRef<Drag | null>(null);
  const frames = useRef({ move: 0, reset: 0 });
  const layout = useRef<{ width: number; mobile: boolean } | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [positions, setPositions] = useState<Positions>({});
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [wiresVisible, setWiresVisible] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const frameIds = frames.current;
    const resize = new ResizeObserver(() => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      if (!width) return;

      const mobile = window.innerWidth < 1024;
      const previousLayout = layout.current;
      if (previousLayout?.width === width && previousLayout.mobile === mobile) return;

      layout.current = { width, mobile };
      cancelAnimationFrame(frameIds.move);
      cancelAnimationFrame(frameIds.reset);
      frameIds.move = 0;
      frameIds.reset = 0;
      drag.current = null;
      setDraggingId(null);
      setIsMobile(mobile);

      const next = calculateDefaultPositions(width, mobile);
      if (!previousLayout || previousLayout.mobile !== mobile) {
        setPositions(next);
        return;
      }

      const previousDefaults = calculateDefaultPositions(previousLayout.width, mobile);
      setPositions((current) => Object.fromEntries(Object.entries(next).map(([id, target]) => {
        const currentPosition = current[id] ?? previousDefaults[id];
        const oldDefault = previousDefaults[id];
        return [id, boundPosition({
          ...target,
          x: target.x + currentPosition.x - oldDefault.x,
          y: target.y + currentPosition.y - oldDefault.y,
        }, width, height, mobile)];
      })));
    });

    const reveal = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      setWiresVisible(true);
      reveal.disconnect();
    }, { threshold: 0.1 });

    const approach = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      resize.observe(canvas);
      approach.disconnect();
    }, { rootMargin: '400px 0px' });
    approach.observe(canvas);
    reveal.observe(canvas);

    return () => {
      approach.disconnect();
      resize.disconnect();
      reveal.disconnect();
      cancelAnimationFrame(frameIds.move);
      cancelAnimationFrame(frameIds.reset);
    };
  }, []);

  function beginDrag(id: string, event: PointerEvent<HTMLElement>) {
    const canvas = canvasRef.current;
    if (event.button !== 0 || drag.current || !canvas) return;

    cancelAnimationFrame(frames.current.reset);
    frames.current.reset = 0;
    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    drag.current = {
      id,
      pointerId: event.pointerId,
      pointerX: event.clientX,
      pointerY: event.clientY,
      origin: positions[id],
      width: canvas.clientWidth,
      height: canvas.clientHeight,
    };
    setDraggingId(id);
  }

  function applyPendingMove() {
    const active = drag.current;
    if (!active?.pending) return;

    const { id, pending } = active;
    active.pending = undefined;
    setPositions((current) => ({ ...current, [id]: pending }));
  }

  function moveDrag(event: PointerEvent<HTMLDivElement>) {
    const active = drag.current;
    if (!active || active.pointerId !== event.pointerId) return;

    active.pending = boundPosition({
      ...active.origin,
      x: active.origin.x + event.clientX - active.pointerX,
      y: active.origin.y + event.clientY - active.pointerY,
    }, active.width, active.height, isMobile);

    if (frames.current.move) return;
    frames.current.move = requestAnimationFrame(() => {
      frames.current.move = 0;
      applyPendingMove();
    });
  }

  function endDrag(event: PointerEvent<HTMLDivElement>) {
    if (drag.current?.pointerId !== event.pointerId) return;

    cancelAnimationFrame(frames.current.move);
    frames.current.move = 0;
    applyPendingMove();
    drag.current = null;
    setDraggingId(null);
  }

  function resetLayout() {
    const canvas = canvasRef.current;
    if (!canvas || drag.current) return;

    cancelAnimationFrame(frames.current.reset);
    const target = calculateDefaultPositions(canvas.clientWidth, isMobile);
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setPositions(target);
      return;
    }

    const start = performance.now();
    function animate(now: number) {
      const progress = Math.min(1, (now - start) / 480);
      const ease = 1 - (1 - progress) ** 3;
      setPositions(Object.fromEntries(Object.entries(target).map(([id, end]) => {
        const origin = positions[id] ?? end;
        return [id, {
          ...end,
          x: origin.x + (end.x - origin.x) * ease,
          y: origin.y + (end.y - origin.y) * ease,
        }];
      })));
      frames.current.reset = progress < 1 ? requestAnimationFrame(animate) : 0;
    }

    frames.current.reset = requestAnimationFrame(animate);
  }

  const activeWires = isMobile ? MOBILE_WIRE_CONNECTIONS : DESKTOP_WIRE_CONNECTIONS;
  const bodyHeight = isMobile ? MOBILE_BODY_HEIGHT : DESKTOP_BODY_HEIGHT;
  const titleHeight = isMobile ? MOBILE_TITLE_HEIGHT : DESKTOP_TITLE_HEIGHT;

  return (
    <section
      id="process"
      aria-labelledby="process-heading"
      data-theme-bg="#F5F3EE"
      className="relative min-h-screen overflow-hidden bg-[#F5F3EE] px-4 pt-20 pb-28 text-[#0A0A0A] sm:px-8 md:px-12"
    >
      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <div className="mb-8 sm:mb-12">
          <h2 id="process-heading" className="font-section-heading text-[clamp(2.75rem,6vw,5rem)] leading-none font-bold tracking-[-0.045em]">
            How a project comes together
          </h2>
          <p className="font-body-ui mt-4 text-base text-[#4B5563]">Drag the cards to explore the connections.</p>
        </div>

        <div className="relative mx-auto max-w-lg lg:max-w-none">
          <div
            ref={canvasRef}
            onPointerMove={moveDrag}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
            onLostPointerCapture={endDrag}
            className="relative h-[805px] w-full overflow-hidden select-none lg:h-[670px]"
          >
            <svg aria-hidden="true" className="pointer-events-none absolute inset-0 size-full">
              {NODES_DATA.every(({ id }) => positions[id]) && activeWires.map((wire, index) => {
                const active = draggingId === wire.from || draggingId === wire.to;
                const path = getWirePath(wire, positions, isMobile);
                const strokeDashoffset = wiresVisible ? 0 : 1;
                const delay = (index * 32) + 'ms';

                return (
                  <g
                    key={wire.from + ':' + wire.to}
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray="1"
                    strokeDashoffset={strokeDashoffset}
                    style={{ transitionDelay: delay }}
                    className="transition-[stroke-dashoffset] duration-500 ease-out motion-reduce:transition-none"
                  >
                    <path d={path} pathLength={1} stroke={active ? '#BAFF3980' : '#0A0A0A10'} strokeWidth={active ? 5 : 4} />
                    <path d={path} pathLength={1} stroke={active ? '#30352A' : '#A5A69D'} strokeWidth={2} />
                  </g>
                );
              })}
            </svg>

            {NODES_DATA.map((node) => {
              const position = positions[node.id];
              if (!position) return null;
              const isDragging = draggingId === node.id;
              const isLime = node.theme === 'lime';
              const sockets = isMobile ? node.mobileSockets : node.desktopSockets;
              const centered = isMobile && (node.id === 'discovery' || node.id === 'design');
              const bodyText = isLime ? 'text-[#0A0A0A]' : node.textColor === 'lime' ? 'text-[#BAFF39]' : 'text-white';

              return (
                <article
                  key={node.id}
                  data-process-node={node.id}
                  data-cursor="Drag"
                  onPointerDown={(event) => beginDrag(node.id, event)}
                  className="absolute top-0 left-0 cursor-grab touch-none select-none active:cursor-grabbing"
                  style={{
                    transform: 'translate3d(' + position.x + 'px,' + position.y + 'px,0)',
                    width: position.w,
                    zIndex: isDragging ? 30 : 10,
                  }}
                >
                  <h3
                    style={{ height: titleHeight }}
                    className={'font-section-heading flex items-center text-xs leading-none font-black tracking-[0.12em] text-[#0A0A0A] uppercase sm:text-[13px] ' + (centered ? 'justify-center' : 'pl-1')}
                  >
                    {isMobile ? node.mobileName : node.name}
                  </h3>

                  <div
                    style={{ height: bodyHeight }}
                    className={'relative flex flex-col justify-center rounded-2xl px-3 py-3 ring-1 ring-inset transition-shadow duration-200 motion-reduce:transition-none sm:px-4 ' + bodyText
                      + (isLime ? ' bg-[#BAFF39] ring-black/10' : ' bg-[#141414] ring-white/12')
                      + (isDragging ? ' shadow-xl' : ' shadow-sm')}
                  >
                    {sockets.map((socket) => {
                      const [x, y] = socketAnchors[socket];
                      return (
                        <span
                          data-socket={socket}
                          key={socket}
                          aria-hidden="true"
                          style={{ left: (x * 100) + '%', top: (y * 100) + '%' }}
                          className={'pointer-events-none absolute grid size-3.5 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-[#FFFEFC] ring-1 transition-colors sm:size-4 ' + (isDragging ? 'ring-[#536514]' : 'ring-[#B0B1A8]')}
                        >
                          <span className={'size-1 rounded-full ' + (isDragging ? 'bg-[#536514]' : 'bg-black/30')} />
                        </span>
                      );
                    })}

                    <ul className="font-body-ui pointer-events-none space-y-1 text-[11.5px] leading-snug font-semibold sm:text-[13px]">
                      {node.bullets.map((bullet) => (
                        <li key={bullet} className="flex items-start gap-1.5">
                          <span aria-hidden="true" className="mt-[0.35em] size-1.5 shrink-0 rounded-full bg-current" />
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="mt-6 flex justify-center lg:absolute lg:right-6 lg:bottom-6 lg:z-30 lg:mt-0">
            <Button
              onClick={resetLayout}
              data-cursor="Reset"
              icon={<RotateCcw />}
            >
              Reset layout
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
