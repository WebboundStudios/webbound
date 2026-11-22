'use client';

import { memo, type ReactNode, type Ref } from 'react';
import { m, useTransform, type MotionValue } from 'framer-motion';
import styles from './hero-core.module.css';

// Isometric artwork adapted from the supplied Syntra hero.
const ISO_X = 0.866
const ISO_Y = 0.5

const CX = 500
const CY = 500
const VIEWBOX = { x: -60, y: 40, width: 1120, height: 800 }

// Isometric ring flattening (true isometric circle height / width).
const RING_FLATTEN = 0.57

// Horizontal radii of the two orbits around the core, inner and outer.
const RING_RX = [400, 530] as const

type SlabType = {
  // half the side length of the square footprint
  half: number

  // corner radius of the footprint
  radius: number

  // screen y of the top face centre
  top: number

  // vertical thickness
  depth: number
}

// Stack, bottom to top. Each slab sits `gap` above the one below it; the gap is where the light lives.
const BASE: SlabType = { half: 168, radius: 40, top: 475, depth: 34 }
const SEAM_GAP = 9
const MID: SlabType = { half: 151, radius: 36, top: BASE.top - SEAM_GAP - 28, depth: 28 }
const CAP: SlabType = { half: 101, radius: 28, top: MID.top - 14, depth: 14 }

type Point = [number, number]

// Server and browser can disagree in the last float digit, which React reports as a hydration mismatch.
const round = (n: number) => Math.round(n * 100) / 100

const project = (x: number, y: number, cx = CX, cy = CY): Point => {
  return [cx + (x - y) * ISO_X, cy + (x + y) * ISO_Y]
}

// Rounded square in plane coordinates, walked once around.
const footprint = (half: number, radius: number, steps = 14): Point[] => {
  const r = Math.min(radius, half)
  const c = half - r

  const corners: [number, number, number][] = [
    [c, c, 0],
    [-c, c, 90],
    [-c, -c, 180],
    [c, -c, 270]
  ]

  const pts: Point[] = []

  for (const [ox, oy, start] of corners) {
    for (let i = 0; i <= steps; i++) {
      const a = ((start + (90 * i) / steps) * Math.PI) / 180

      pts.push([ox + r * Math.cos(a), oy + r * Math.sin(a)])
    }
  }

  return pts
}

const toPath = (pts: Point[]) => `M${pts.map(([x, y]) => `${x.toFixed(2)} ${y.toFixed(2)}`).join('L')}Z`

const topPath = (slab: SlabType, inset = 0, cx = CX, dy = 0) => {
  const half = slab.half - inset
  const radius = Math.max(slab.radius - inset, 1)

  return toPath(footprint(half, radius).map(([x, y]) => project(x, y, cx, slab.top + dy)))
}

// A vertically extruded convex shape is the convex hull of its top and bottom outlines.
const hull = (points: Point[]): Point[] => {
  const pts = [...points].sort((a, b) => a[0] - b[0] || a[1] - b[1])
  const cross = (o: Point, a: Point, b: Point) => (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0])

  const build = (list: Point[]) => {
    const out: Point[] = []

    for (const p of list) {
      while (out.length >= 2 && cross(out[out.length - 2], out[out.length - 1], p) <= 0) out.pop()
      out.push(p)
    }

    out.pop()

    return out
  }

  return [...build(pts), ...build([...pts].reverse())]
}

const bodyPath = (slab: SlabType, inset = 0) => {
  const half = slab.half - inset
  const radius = Math.max(slab.radius - inset, 1)
  const outline = footprint(half, radius)
  const upper = outline.map(([x, y]) => project(x, y, CX, slab.top))
  const lower = outline.map(([x, y]) => project(x, y, CX, slab.top + slab.depth))

  return toPath(hull([...upper, ...lower]))
}

// A point on one of the two visible side faces. u runs along the face, v down its thickness.
const facePoint = (slab: SlabType, side: 'left' | 'right', u: number, v: number): Point => {
  const { half, top, depth } = slab

  if (side === 'left') {
    const [x, y] = project(-half + 2 * half * u, half, CX, top)

    return [x, y + depth * v]
  }

  const [x, y] = project(half, half - 2 * half * u, CX, top)

  return [x, y + depth * v]
}

// Transform that lays a local (x, y) rectangle onto a side face, or onto a top plane.
const FACE_MATRIX = {
  left: `${ISO_X} ${ISO_Y} 0 1`,
  right: `${ISO_X} ${-ISO_Y} 0 1`,
  top: `${ISO_X} ${ISO_Y} ${-ISO_X} ${ISO_Y}`
}

const ringPath = (rx: number) => {
  const ry = rx * RING_FLATTEN

  return `M${CX + rx} ${CY}A${rx} ${ry} 0 1 1 ${CX - rx} ${CY}A${rx} ${ry} 0 1 1 ${CX + rx} ${CY}Z`
}

const LEAF = 'M11 0H19A3 3 0 0 1 22 3V11A11 11 0 0 1 11 22H3A3 3 0 0 1 0 19V11A11 11 0 0 1 11 0Z'

const TURNS = [0, 90, 180, 270]

type SyntraLeavesProps = { fill: string; stroke?: string }

// The four leaves on their own, for drawing the mark inside another SVG (the core's top plate).
const SyntraLeaves = ({ fill, stroke }: SyntraLeavesProps) => {
  return (
    <>
      {TURNS.map((turn) => (
        <path
          key={turn}
          d={LEAF}
          transform={`rotate(${turn}) translate(-25 -25)`}
          fill={fill}
          stroke={stroke}
          strokeWidth={stroke ? 0.6 : undefined}
        />
      ))}
    </>
  )
}

const ACCENT = 'var(--core-accent)'

type FaceProps = { slab: SlabType; side: 'left' | 'right'; u: number; v: number }

const FaceMark = ({
  slab,
  side,
  u,
  v,
  w,
  h,
  fill,
  glow
}: FaceProps & { w: number; h: number; fill: string; glow?: boolean }) => {
  const [x, y] = facePoint(slab, side, u, v)

  return (
    <g transform={`translate(${x.toFixed(2)} ${y.toFixed(2)}) matrix(${FACE_MATRIX[side]} 0 0)`}>
      {glow && (
        <rect
          x={-w / 2 - 2}
          y={-h / 2 - 3}
          width={w + 4}
          height={h + 6}
          rx={h}
          fill={fill}
          filter='url(#webbound-core-blur-sm)'
          opacity='0.75'
        />
      )}
      <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={h / 2} fill={fill} />
    </g>
  )
}

type PanelLineProps = {
  slab: SlabType
  side: 'left' | 'right'
  v: number
  from?: number
  to?: number
}

// A thin panel line running along a side face.
const PanelLine = ({ slab, side, v, from = 0.14, to = 0.86 }: PanelLineProps) => {
  const [x1, y1] = facePoint(slab, side, from, v)
  const [x2, y2] = facePoint(slab, side, to, v)

  return <line x1={x1} y1={y1} x2={x2} y2={y2} stroke='#A7A298' strokeWidth='0.9' opacity='0.55' />
}

type FastenerProps = { slab: SlabType; x: number; y: number }

// A round fastener sunk into a top face, laid in the plane.
const Fastener = ({ slab, x, y }: FastenerProps) => {
  const [px, py] = project(x, y, CX, slab.top)

  return (
    <g transform={`translate(${px.toFixed(2)} ${py.toFixed(2)}) matrix(${FACE_MATRIX.top} 0 0)`}>
      <circle r='6.5' fill='url(#webbound-core-hole)' stroke='#C9C5BB' strokeWidth='1' />
    </g>
  )
}

const SlabBody = ({ slab }: { slab: SlabType }) => {
  return (
    <g>
      <path d={bodyPath(slab)} fill='url(#webbound-core-side)' />
      <path d={bodyPath(slab)} fill='url(#webbound-core-side-shade)' />
      <path d={bodyPath(slab)} fill='none' stroke='#CFCBC1' strokeWidth='1' opacity='0.85' />
    </g>
  )
}

const SlabTop = ({ slab, groove }: { slab: SlabType; groove?: number }) => {
  return (
    <g>
      <path d={topPath(slab)} fill='url(#webbound-core-bevel)' stroke='#D9D6D0' strokeWidth='1' />
      <path d={topPath(slab, 4.5)} fill='url(#webbound-core-top)' stroke='#fff' strokeWidth='1' opacity='1' />
      {groove !== undefined && <path d={topPath(slab, groove)} fill='none' stroke='#DAD6CE' strokeWidth='1.2' />}
    </g>
  )
}

// Side colours of the mark's extrusion, bottom layer first: darker where it meets the plate.
const LOGO_SIDE = [40, 47, 54, 61, 68, 75]
const LOGO_SCALE = 1.42

/**
 * The mark as a small solid object standing on a top face at (x, y): a stepped extrusion, a top
 * face lit from the upper left with a fine bright rim, and a soft neutral contact shadow. No glow,
 * so the mark stays crisp.
 */
const CoreLogo = ({ x, y }: { x: number; y: number }) => {
  const plane = (lift: number) => `translate(${x} ${y - lift}) matrix(${FACE_MATRIX.top} 0 0) scale(${LOGO_SCALE})`
  const top = LOGO_SIDE.length

  return (
    <g>
      <g transform={`${plane(0)} translate(2.4 2.4)`} opacity='0.22' filter='url(#webbound-core-blur-sm)'>
        <SyntraLeaves fill='#6E6556' />
      </g>
      {LOGO_SIDE.map((strength, k) => (
        <g key={strength} transform={plane(k)}>
          <SyntraLeaves fill={'color-mix(in srgb, var(--core-accent) ' + strength + '%, var(--core-accent-ink))'} />
        </g>
      ))}
      <g transform={plane(top)}>
        <rect x='-27' y='-27' width='54' height='54' fill='url(#webbound-core-logo-top)' clipPath='url(#webbound-core-mark-clip)' />
        <SyntraLeaves fill='none' stroke='var(--core-accent-light)' />
      </g>
    </g>
  )
}

const CoreDefs = () => {
  return (
    <defs>
      <linearGradient id='webbound-core-side' x1='0' y1='0' x2='1' y2='0'>
        <stop offset='0' stopColor='#F3F1EB' />
        <stop offset='0.46' stopColor='#E9E6DF' />
        <stop offset='0.5' stopColor='#DAD6CD' />
        <stop offset='1' stopColor='#E3DFD7' />
      </linearGradient>
      <linearGradient id='webbound-core-side-shade' x1='0' y1='0' x2='0' y2='1'>
        <stop offset='0.45' stopColor='#7C7566' stopOpacity='0' />
        <stop offset='1' stopColor='#7C7566' stopOpacity='0.16' />
      </linearGradient>
      <linearGradient id='webbound-core-bevel' x1='0' y1='0' x2='1' y2='1'>
        <stop offset='0' stopColor='#FFFFFF' />
        <stop offset='1' stopColor='#E6E2DA' />
      </linearGradient>
      <linearGradient id='webbound-core-top' x1='0.1' y1='0' x2='0.9' y2='1'>
        <stop offset='0' stopColor='#FFFFFF' />
        <stop offset='1' stopColor='#F2EFE9' />
      </linearGradient>
      <linearGradient id='webbound-core-inlay' x1='0' y1='0' x2='1' y2='1'>
        <stop offset='0' stopColor='#EFEBE4' />
        <stop offset='1' stopColor='#FFFFFF' />
      </linearGradient>
      <linearGradient id='webbound-core-seam' x1='0' y1='0' x2='1' y2='0'>
        <stop offset='0' stopColor='var(--core-accent-light)' />
        <stop offset='0.5' stopColor={ACCENT} />
        <stop offset='1' stopColor='var(--core-accent-deep)' />
      </linearGradient>
      <linearGradient id='webbound-core-slot' x1='0' y1='0' x2='0' y2='1'>
        <stop offset='0' stopColor='#5F5A52' />
        <stop offset='1' stopColor='#8E897F' />
      </linearGradient>
      <linearGradient id='webbound-core-logo-top' x1='0' y1='0' x2='1' y2='1'>
        <stop offset='0' stopColor='var(--core-accent-light)' />
        <stop offset='0.55' stopColor='var(--core-accent)' />
        <stop offset='1' stopColor='var(--core-accent-deep)' />
      </linearGradient>
      <clipPath id='webbound-core-mark-clip'>
        <SyntraLeaves fill='#000' />
      </clipPath>
      <radialGradient id='webbound-core-hole' cx='0.5' cy='0.4' r='0.7'>
        <stop offset='0' stopColor='#D9D5CC' />
        <stop offset='1' stopColor='#F3F1EB' />
      </radialGradient>
      <filter id='webbound-core-blur-sm' x='-40%' y='-40%' width='180%' height='180%'>
        <feGaussianBlur stdDeviation='3.5' />
      </filter>
      <filter id='webbound-core-blur-glow' x='-40%' y='-40%' width='180%' height='180%'>
        <feGaussianBlur stdDeviation='9' />
      </filter>
      <filter id='webbound-core-blur-spill' x='-40%' y='-40%' width='180%' height='180%'>
        <feGaussianBlur stdDeviation='18' />
      </filter>
    </defs>
  )
}

/**
 * The core at rest: three ceramic slabs (base, mid, cap), each a rounded square laid in an isometric
 * plane, with a light seam between the base and mid slabs and the mark inlaid on the cap.
 */
const SyntraCoreObject = () => {
  const seam: SlabType = {
    half: MID.half - 2,
    radius: MID.radius - 2,
    top: MID.top + MID.depth - 1,
    depth: SEAM_GAP + 1
  }

  const spillDy = BASE.top - MID.top
  const [logoX, logoY] = [CX, CAP.top]

  return (
    <g>
      {/* Base slab, a tray the others sit in. */}
      <SlabBody slab={BASE} />
      <SlabTop slab={BASE} groove={10} />
      <PanelLine slab={BASE} side='left' v={0.3} />
      <PanelLine slab={BASE} side='right' v={0.3} />
      <FaceMark slab={BASE} side='right' u={0.5} v={0.62} w={4.5} h={4.5} fill='url(#webbound-core-slot)' />
      <FaceMark slab={BASE} side='right' u={0.58} v={0.62} w={4.5} h={4.5} fill='url(#webbound-core-slot)' />
      <FaceMark slab={BASE} side='right' u={0.66} v={0.62} w={4.5} h={4.5} fill='url(#webbound-core-slot)' />
      <FaceMark slab={BASE} side='left' u={0.32} v={0.62} w={4.5} h={4.5} fill='url(#webbound-core-slot)' />
      <FaceMark slab={BASE} side='left' u={0.4} v={0.62} w={4.5} h={4.5} fill='url(#webbound-core-slot)' />

      {/* Light from the seam spills onto the tray and out along its own edge. */}
      <g className={styles.seam}>
        <path d={topPath(MID, 4, CX, spillDy)} fill={ACCENT} opacity='0.24' filter='url(#webbound-core-blur-spill)' />
        <path d={bodyPath(seam)} fill={ACCENT} opacity='0.6' filter='url(#webbound-core-blur-glow)' />
      </g>
      <path d={bodyPath(seam)} fill='url(#webbound-core-seam)' />

      {/* Mid slab. */}
      <SlabBody slab={MID} />
      <SlabTop slab={MID} groove={11} />
      <PanelLine slab={MID} side='left' v={0.78} />
      <PanelLine slab={MID} side='right' v={0.78} />
      <FaceMark slab={MID} side='left' u={0.62} v={0.42} w={34} h={7.5} fill='url(#webbound-core-slot)' />
      <FaceMark slab={MID} side='left' u={0.34} v={0.42} w={5} h={5} fill='url(#webbound-core-slot)' />
      <FaceMark slab={MID} side='left' u={0.42} v={0.42} w={5} h={5} fill='url(#webbound-core-slot)' />
      <FaceMark slab={MID} side='right' u={0.44} v={0.42} w={5} h={5} fill='url(#webbound-core-slot)' />
      <FaceMark slab={MID} side='right' u={0.52} v={0.42} w={5} h={5} fill='url(#webbound-core-slot)' />
      <FaceMark slab={MID} side='right' u={0.68} v={0.42} w={22} h={4.5} fill='url(#webbound-core-slot)' />
      <g className={styles.seam}>
        <FaceMark slab={MID} side='left' u={0.2} v={0.42} w={7} h={2.6} fill={ACCENT} glow />
      </g>

      <Fastener slab={MID} x={0} y={-MID.half + 28} />
      <Fastener slab={MID} x={-MID.half + 28} y={0} />
      <Fastener slab={MID} x={MID.half - 28} y={0} />
      <Fastener slab={MID} x={0} y={MID.half - 28} />

      {/* Cap slab and its inlaid mark. */}
      <SlabBody slab={CAP} />
      <SlabTop slab={CAP} />
      <path d={topPath(CAP, 19)} fill='url(#webbound-core-inlay)' stroke='#DDD9D1' strokeWidth='1.2' />
      <path d={topPath(CAP, 20.5)} fill='none' stroke='#fff' strokeWidth='1' opacity='0.9' />

      <CoreLogo x={logoX} y={logoY} />
    </g>
  )
}

// ───── assets/motionuikit/svg/syntra-core-shadow.tsx ─────
// The soft contact shadow under the core, laid on the floor plane below the base slab.
const SyntraCoreShadow = () => {
  const floor = { ...BASE, top: BASE.top + BASE.depth + 30 }

  return (
    <g>
      <defs>
        <filter id='webbound-core-blur-lg' x='-30%' y='-30%' width='160%' height='160%'>
          <feGaussianBlur stdDeviation='26' />
        </filter>
        <filter id='webbound-core-blur-md' x='-30%' y='-30%' width='160%' height='160%'>
          <feGaussianBlur stdDeviation='9' />
        </filter>
      </defs>
      <path d={topPath(floor, -14)} fill='#8A8377' opacity='0.2' filter='url(#webbound-core-blur-lg)' />
      <path d={topPath(floor, 6)} fill='#5D574D' opacity='0.22' filter='url(#webbound-core-blur-md)' />
    </g>
  )
}

// ───── assets/motionuikit/svg/syntra-depth-backdrop.tsx ─────
/**
 * Layers of quiet depth behind the stack: two panes of glass
 * standing behind, and a few loose nodes. All of it very low contrast.
 */
const NODES: [number, number][] = [
  [118, 132],
  [318, 82],
  [690, 96],
  [884, 188],
  [936, 470],
  [70, 512],
  [150, 858],
  [850, 846]
]

const SyntraDepthBackdrop = () => {
  return (
    <g>
      <defs>
        <linearGradient id='webbound-core-glass' x1='0' y1='0' x2='1' y2='1'>
          <stop offset='0' stopColor='#fff' stopOpacity='0.7' />
          <stop offset='1' stopColor='#fff' stopOpacity='0.12' />
        </linearGradient>
      </defs>

      <g fill='url(#webbound-core-glass)' stroke='#E3E0D9' strokeWidth='1' opacity='0.35'>
        <rect width='290' height='250' rx='22' transform='matrix(0.866 -0.5 0 1 232 300)' />
        <rect width='290' height='250' rx='22' transform='matrix(0.866 0.5 0 1 520 150)' />
      </g>

      <g fill='#fff' stroke='#CFCBC1' strokeWidth='1'>
        {NODES.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={i % 3 === 0 ? 4 : 3} opacity='0.85' />
        ))}
      </g>
    </g>
  )
}

const EXPLODE = {
  gap: 94,
  aiLift: 12,
  topPlateY: 230,
  stagger: 0.05,
  scales: [0.63, 0.62, 0.7, 1.07, 1.06]
}

/**
 * The five plates, one per stage, bottom to top, cut from the three stacked slabs so that,
 * together, they are the resting object exactly: the base is two plates, the mid slab is the AI
 * plate, the cap is two.
 */
const PLATE_SLABS: SlabType[] = [
  { ...BASE, top: BASE.top + 17, depth: 17 },
  { ...BASE, top: BASE.top, depth: 17 },
  MID,
  { ...CAP, top: CAP.top + 7, depth: 7 },
  { ...CAP, top: CAP.top, depth: 7 }
]

const AI_PLATE = 2

// Where each plate's top face sits once apart, and how far it travels to get there.
const TARGET_TOPS = PLATE_SLABS.map(
  (_, i) => EXPLODE.topPlateY + (PLATE_SLABS.length - 1 - i) * EXPLODE.gap - (i === AI_PLATE ? EXPLODE.aiLift : 0)
)

export const heroCoreLayerAnchors = PLATE_SLABS.map(({ half, radius, depth }, index) => {
  const cornerY = TARGET_TOPS[index] + depth / 2
  const cornerOffset = ISO_X * (2 * half - 0.586 * radius) * EXPLODE.scales[index]

  return {
    top: ((cornerY - VIEWBOX.y) / VIEWBOX.height) * 100,
    edge: (cornerOffset / VIEWBOX.width) * 100
  }
})

const TRAVEL = PLATE_SLABS.map((slab, i) => TARGET_TOPS[i] - slab.top)

const clamp = (v: number) => Math.min(1, Math.max(0, v))

// Progress of one plate, 0 stacked to 1 apart. The AI plate leads; the rest follow at a stagger.
const plateProgress = (i: number, p: number) => {
  const delay = Math.abs(i - AI_PLATE) * EXPLODE.stagger

  return clamp((p - delay) / (1 - delay))
}

const plateY = (i: number, p: number) => TRAVEL[i] * plateProgress(i, p)
const plateScale = (i: number, p: number) => 1 + (EXPLODE.scales[i] - 1) * plateProgress(i, p)

/**
 * Extra side thickness each plate grows once it is apart, bottom to top. The thin cap plates gain
 * the most; at rest it is zero, so the stack still matches the resting object exactly.
 */
const SKIRT = [0, 4, 0, 10, 10]

type PlateProps = {
  index: number
  progress: MotionValue<number>
  children: ReactNode
}

const Plate = ({ index, progress, children }: PlateProps) => {
  const y = useTransform(progress, v => plateY(index, v))
  const scale = useTransform(progress, v => plateScale(index, v))
  const apart = useTransform(progress, v => plateProgress(index, v))
  const shadow = useTransform(apart, v => v * 0.16)

  const slab = PLATE_SLABS[index]
  const skirt = SKIRT[index]

  return (
    <m.g style={{ y, scale }}>
      {/* A soft shadow the plate casts on the one below it as they part. */}
      {index > 0 && (
        <m.path
          d={topPath(slab, -6, CX, slab.depth + 34)}
          fill='#6E6556'
          filter='url(#webbound-core-blur-spill)'
          style={{ opacity: shadow }}
        />
      )}
      {skirt > 0 && (
        <m.g style={{ opacity: apart }}>
          <SlabBody slab={{ ...slab, top: slab.top + slab.depth - 1, depth: skirt + 1 }} />
        </m.g>
      )}
      {children}
    </m.g>
  )
}

type PlateNumberProps = { slab: SlabType; n: number; main?: boolean }

/**
 * The stage number engraved into a plate's top face near its front corner, laid flat in the
 * surface so it reads as part of the ceramic: a soft groove with light catching its lower lip.
 */
const PlateNumber = ({ slab, n, main = false }: PlateNumberProps) => {
  const k = slab.half * 0.56
  const [x, y] = project(k, k, CX, slab.top)
  const plane = `matrix(${FACE_MATRIX.top} 0 0) rotate(-45)`
  const label = String(n).padStart(2, '0')

  const text = {
    textAnchor: 'middle' as const,
    dominantBaseline: 'central' as const,
    fontSize: 25,
    fontWeight: 500,
    letterSpacing: 2.5
  }

  return (
    <g transform={`translate(${x.toFixed(2)} ${y.toFixed(2)})`} aria-hidden>
      <text {...text} transform={`translate(0 0.9) ${plane}`} fill='#FFFFFF' opacity='0.95'>
        {label}
      </text>
      <text {...text} transform={plane} fill={main ? 'var(--core-accent-ink)' : '#CBC6BC'}>
        {label}
      </text>
    </g>
  )
}

// A little light coming up on the AI plate: a ring and core in its plane.
const AiEmphasis = ({ progress }: { progress: MotionValue<number> }) => {
  const on = useTransform(progress, v => clamp((v - 0.5) / 0.4))
  const rim = useTransform(on, v => v * 0.9)
  const halo = useTransform(on, v => v * 0.55)
  const spill = useTransform(halo, v => v * 0.35)

  return (
    <g transform={`translate(${CX} ${MID.top}) matrix(${FACE_MATRIX.top} 0 0)`}>
      <m.circle r='86' fill={ACCENT} filter='url(#webbound-core-blur-spill)' style={{ opacity: spill }} />
      <m.circle r='56' fill='none' stroke={ACCENT} strokeWidth='1.4' style={{ opacity: rim }} />
      <m.circle r='38' fill='none' stroke={ACCENT} strokeWidth='1' strokeDasharray='3 6' style={{ opacity: halo }} />
      <m.circle r='9' fill={ACCENT} style={{ opacity: rim }} />
    </g>
  )
}

/**
 * The core taken apart into its five stage plates, driven by `progress`. The AI plate's underglow
 * strengthens as the stack opens, on top of the resting glow.
 */
const SyntraExplodedCore = ({ progress }: { progress: MotionValue<number> }) => {
  const strongGlow = useTransform(progress, v => clamp((v - 0.4) / 0.5) * 0.6)

  const seam = { half: MID.half - 2, radius: MID.radius - 2, top: MID.top + MID.depth - 1, depth: SEAM_GAP + 1 }

  const inlay = (slab: (typeof PLATE_SLABS)[number]) => (
    <>
      <path d={topPath(slab, 19)} fill='url(#webbound-core-inlay)' stroke='#DDD9D1' strokeWidth='1.2' />
      <path d={topPath(slab, 20.5)} fill='none' stroke='#fff' strokeWidth='1' opacity='0.9' />
    </>
  )

  return (
    <g>
      <Plate index={0} progress={progress}>
        <SlabBody slab={PLATE_SLABS[0]} />
        <SlabTop slab={PLATE_SLABS[0]} groove={10} />
        <PlateNumber slab={PLATE_SLABS[0]} n={1} />
        <FaceMark slab={BASE} side='right' u={0.5} v={0.62} w={4.5} h={4.5} fill='url(#webbound-core-slot)' />
        <FaceMark slab={BASE} side='right' u={0.58} v={0.62} w={4.5} h={4.5} fill='url(#webbound-core-slot)' />
        <FaceMark slab={BASE} side='right' u={0.66} v={0.62} w={4.5} h={4.5} fill='url(#webbound-core-slot)' />
        <FaceMark slab={BASE} side='left' u={0.32} v={0.62} w={4.5} h={4.5} fill='url(#webbound-core-slot)' />
        <FaceMark slab={BASE} side='left' u={0.4} v={0.62} w={4.5} h={4.5} fill='url(#webbound-core-slot)' />
      </Plate>

      <Plate index={1} progress={progress}>
        <SlabBody slab={PLATE_SLABS[1]} />
        <SlabTop slab={PLATE_SLABS[1]} groove={10} />
        <PlateNumber slab={PLATE_SLABS[1]} n={2} />
        <PanelLine slab={BASE} side='left' v={0.3} />
        <PanelLine slab={BASE} side='right' v={0.3} />
      </Plate>

      <Plate index={AI_PLATE} progress={progress}>
        <g className={styles.seam}>
          <path d={topPath(MID, 4, CX, BASE.top - MID.top)} fill={ACCENT} opacity='0.24' filter='url(#webbound-core-blur-spill)' />
          <path d={bodyPath(seam)} fill={ACCENT} opacity='0.6' filter='url(#webbound-core-blur-glow)' />
        </g>
        <m.path d={bodyPath(seam)} fill={ACCENT} filter='url(#webbound-core-blur-glow)' style={{ opacity: strongGlow }} />
        <path d={bodyPath(seam)} fill='url(#webbound-core-seam)' />
        <SlabBody slab={MID} />
        <SlabTop slab={MID} groove={11} />
        <PlateNumber slab={MID} n={3} main />
        <PanelLine slab={MID} side='left' v={0.78} />
        <PanelLine slab={MID} side='right' v={0.78} />
        <FaceMark slab={MID} side='left' u={0.62} v={0.42} w={34} h={7.5} fill='url(#webbound-core-slot)' />
        <FaceMark slab={MID} side='left' u={0.34} v={0.42} w={5} h={5} fill='url(#webbound-core-slot)' />
        <FaceMark slab={MID} side='left' u={0.42} v={0.42} w={5} h={5} fill='url(#webbound-core-slot)' />
        <FaceMark slab={MID} side='right' u={0.44} v={0.42} w={5} h={5} fill='url(#webbound-core-slot)' />
        <FaceMark slab={MID} side='right' u={0.52} v={0.42} w={5} h={5} fill='url(#webbound-core-slot)' />
        <FaceMark slab={MID} side='right' u={0.68} v={0.42} w={22} h={4.5} fill='url(#webbound-core-slot)' />
        <g className={styles.seam}>
          <FaceMark slab={MID} side='left' u={0.2} v={0.42} w={7} h={2.6} fill={ACCENT} glow />
        </g>
        <Fastener slab={MID} x={0} y={-MID.half + 28} />
        <Fastener slab={MID} x={-MID.half + 28} y={0} />
        <Fastener slab={MID} x={MID.half - 28} y={0} />
        <Fastener slab={MID} x={0} y={MID.half - 28} />
        <AiEmphasis progress={progress} />
      </Plate>

      <Plate index={3} progress={progress}>
        <SlabBody slab={PLATE_SLABS[3]} />
        <SlabTop slab={PLATE_SLABS[3]} />
        {inlay(PLATE_SLABS[3])}
        <PlateNumber slab={PLATE_SLABS[3]} n={4} />
      </Plate>

      <Plate index={4} progress={progress}>
        <SlabBody slab={PLATE_SLABS[4]} />
        <SlabTop slab={PLATE_SLABS[4]} />
        {inlay(CAP)}
        <CoreLogo x={CX} y={CAP.top} />
      </Plate>
    </g>
  )
}

// Two orbits around the core. Their nodes ride them in opposite directions (see syntra-particles).
const SyntraOrbitalSystem = () => {
  return (
    <g>
      <g fill='none' stroke='#D9D6D0' strokeWidth='1'>
        <ellipse cx={CX} cy={CY} rx={RING_RX[0]} ry={RING_RX[0] * RING_FLATTEN} opacity='0.8' />
        <ellipse cx={CX} cy={CY} rx={RING_RX[1]} ry={RING_RX[1] * RING_FLATTEN} opacity='0.65' />
      </g>
    </g>
  )
}

type NodeType = { ring: 0 | 1; angle: number; size: number }

/**
 * Small crystal beads spaced evenly around each orbit: four on the inner, five on the outer. Every
 * bead on an orbit shares its lap time, so they keep their spacing; the inner orbit runs
 * clockwise and the outer one against it.
 */
const ORBIT_NODES: NodeType[] = [
  { ring: 0, angle: 20, size: 7 },
  { ring: 0, angle: 110, size: 5.5 },
  { ring: 0, angle: 200, size: 8 },
  { ring: 0, angle: 290, size: 6 },
  { ring: 1, angle: 60, size: 6 },
  { ring: 1, angle: 132, size: 8 },
  { ring: 1, angle: 204, size: 5.5 },
  { ring: 1, angle: 276, size: 7 },
  { ring: 1, angle: 348, size: 6.5 }
]

/**
 * A small sphere of amber glass: light at the upper left deepening to orange at the lower right,
 * a rim that is bright on top and darker below, a crisp specular highlight, and light gathered
 * at the bottom where it passes through the glass.
 */
const Crystal = ({ size }: { size: number }) => {
  return (
    <g>
      <ellipse cy={size * 0.5} rx={size * 0.9} ry={size * 0.7} fill="var(--core-accent-ink)" opacity="0.14" />
      <circle r={size * 1.55} fill='url(#webbound-core-crystal-halo)' />
      <circle r={size} fill='url(#webbound-core-crystal-body)' />
      <circle r={size} fill='url(#webbound-core-crystal-refract)' />
      <circle r={size - 0.5} fill='none' stroke='url(#webbound-core-crystal-rim)' strokeWidth='1' />
      <ellipse
        cx={-size * 0.32}
        cy={-size * 0.4}
        rx={size * 0.36}
        ry={size * 0.2}
        transform={`rotate(-30 ${-size * 0.32} ${-size * 0.4})`}
        fill='#FFFFFF'
        opacity='0.95'
      />
      <circle cx={size * 0.34} cy={-size * 0.5} r={Math.max(0.7, size * 0.07)} fill='#FFFFFF' opacity='0.85' />
    </g>
  )
}

/**
 * Construction geometry behind the core: quiet enough that the eye only finds it on a second look.
 * Deterministic scatter, so server and client render the same dots.
 */
const DOTS = Array.from({ length: 26 }, (_, i) => {
  const a = (i * 137.5 * Math.PI) / 180
  const r = 160 + ((i * 53) % 340)

  return [
    round(CX + r * Math.cos(a) * 1.02),
    round(CY + r * Math.sin(a) * RING_FLATTEN * 1.6),
    0.8 + (i % 3) * 0.5
  ] as const
})

const SyntraTechnicalBackdrop = () => {
  return (
    <g>
      <defs>
        <linearGradient id='webbound-core-axis-v' x1='0' y1='0' x2='0' y2='1'>
          <stop offset='0' stopColor='#C9C5BC' stopOpacity='0' />
          <stop offset='0.5' stopColor='#C9C5BC' stopOpacity='0.45' />
          <stop offset='1' stopColor='#C9C5BC' stopOpacity='0' />
        </linearGradient>
        <linearGradient id='webbound-core-axis-h' x1='0' y1='0' x2='1' y2='0'>
          <stop offset='0' stopColor='#C9C5BC' stopOpacity='0' />
          <stop offset='0.5' stopColor='#C9C5BC' stopOpacity='0.7' />
          <stop offset='1' stopColor='#C9C5BC' stopOpacity='0' />
        </linearGradient>
      </defs>

      <rect x={CX - 0.5} y='110' width='1' height='780' fill='url(#webbound-core-axis-v)' />
      <rect x='70' y={CY - 0.5} width='860' height='1' fill='url(#webbound-core-axis-h)' />

      <g fill='#C9C5BC'>
        {DOTS.map(([x, y, r], i) => (
          <circle key={i} cx={x} cy={y} r={r} opacity={0.35 + (i % 4) * 0.12} />
        ))}
      </g>

      <g stroke='#C9C5BC' strokeWidth='1' opacity='0.5'>
        {(
          [
            [212, 292],
            [790, 690],
            [860, 430],
            [150, 560]
          ] as const
        ).map(([x, y]) => (
          <path key={`${x}-${y}`} d={`M${x - 5} ${y}h10M${x} ${y - 5}v10`} />
        ))}
      </g>
    </g>
  )
}

const ORBIT_SECONDS = [70, 95] as const;

const CrystalDefs = () => (
  <defs>
    <clipPath id="webbound-core-clip-back"><rect x={-200} y={-200} width={1400} height={CY + 200} /></clipPath>
    <clipPath id="webbound-core-clip-front"><rect x={-200} y={CY} width={1400} height={700} /></clipPath>
    <linearGradient id='webbound-core-crystal-body' x1='0.15' y1='0.1' x2='0.85' y2='0.95'>
      <stop offset='0' stopColor='var(--core-accent-tint)' stopOpacity='0.9' />
      <stop offset='0.5' stopColor='var(--core-accent)' stopOpacity='0.88' />
      <stop offset='1' stopColor='var(--core-accent-deep)' stopOpacity='0.95' />
    </linearGradient>
    <radialGradient id='webbound-core-crystal-refract' cx='0.6' cy='0.78' r='0.45'>
      <stop offset='0' stopColor='var(--core-accent-tint)' stopOpacity='0.85' />
      <stop offset='1' stopColor='var(--core-accent-tint)' stopOpacity='0' />
    </radialGradient>
    <linearGradient id='webbound-core-crystal-rim' x1='0' y1='0' x2='0' y2='1'>
      <stop offset='0' stopColor='#FFFFFF' stopOpacity='0.95' />
      <stop offset='1' stopColor='var(--core-accent-ink)' stopOpacity='0.55' />
    </linearGradient>
    <radialGradient id='webbound-core-crystal-halo' cx='0.5' cy='0.5' r='0.5'>
      <stop offset='0.5' stopColor='var(--core-accent)' stopOpacity='0.12' />
      <stop offset='1' stopColor='var(--core-accent)' stopOpacity='0' />
    </radialGradient>
  </defs>
);
const SyntraParticles = ({ half }: { half: "back" | "front" }) => (
  <g clipPath={"url(#webbound-core-clip-" + half + ")"}>
    {ORBIT_NODES.map((node, i) => {
      const rx = RING_RX[node.ring]
      const dur = ORBIT_SECONDS[node.ring]
      const reverse = node.ring === 1
      // The ring path starts at angle 0 and runs clockwise; a reversed lap starts from the far end.
      const start = node.angle / 360
      const begin = -dur * (reverse ? 1 - start : start)
      return (
        <g key={i}>
          <Crystal size={node.size} />
          <animateMotion
            dur={`${dur}s`}
            begin={`${begin}s`}
            repeatCount='indefinite'
            path={ringPath(rx)}
            {...(reverse && { keyPoints: '1;0', keyTimes: '0;1', calcMode: 'linear' })}
          />
        </g>
      )
    })}
  </g>
);
export const HeroCoreArtwork = memo(function HeroCoreArtwork({
  svgRef,
  x,
  y,
  progress,
}: {
  svgRef: Ref<SVGSVGElement>;
  x: MotionValue<number>;
  y: MotionValue<number>;
  progress: MotionValue<number>;
}) {
  const backdropX = useTransform(x, (value) => value * -5);
  const backdropY = useTransform(y, (value) => value * -5);
  const orbitX = useTransform(x, (value) => value * 12);
  const orbitY = useTransform(y, (value) => value * 12);
  const orbitOpacity = useTransform(progress, [0, 0.6], [1, 0.15]);
  const shadowOpacity = useTransform(progress, [0, 1], [1, 0.55]);
  const stackedOpacity = useTransform(progress, [0, 0.04], [1, 0]);
  const explodedOpacity = useTransform(progress, [0, 0.03], [0, 1]);
  const stackedDisplay = useTransform(stackedOpacity, opacity => opacity > 0 ? 'inline' : 'none');
  const explodedDisplay = useTransform(explodedOpacity, opacity => opacity > 0 ? 'inline' : 'none');
  return (
    <svg
      ref={svgRef}
      viewBox={Object.values(VIEWBOX).join(' ')}
      aria-hidden="true"
      focusable="false"
      className={styles.svg}
    >
      <CoreDefs />
      <CrystalDefs />
      <m.g style={{ x: backdropX, y: backdropY }}>
        <SyntraDepthBackdrop />
        <SyntraTechnicalBackdrop />
      </m.g>
      <m.g style={{ x: orbitX, y: orbitY, opacity: orbitOpacity }}>
        <SyntraOrbitalSystem />
        <SyntraParticles half="back" />
      </m.g>
      <m.g style={{ opacity: shadowOpacity }}><SyntraCoreShadow /></m.g>
      <m.g className={styles.float} style={{ opacity: stackedOpacity, display: stackedDisplay }}><SyntraCoreObject /></m.g>
      <m.g style={{ opacity: explodedOpacity, display: explodedDisplay }}><SyntraExplodedCore progress={progress} /></m.g>
      <m.g style={{ x: orbitX, y: orbitY, opacity: orbitOpacity }}>
        <SyntraParticles half="front" />
      </m.g>
    </svg>
  );
});
