import type { GuideType, Highlight } from "../types";
import { normalizeHighlight } from "../data/patterns";

type Props = {
  type: GuideType;
  highlights: Highlight[];
  selectedIndex?: number;
};

const VW = 150;
const VH = 100;
const PHI = (1 + Math.sqrt(5)) / 2;

function px(x: number) {
  return (x / 100) * VW;
}

function py(y: number) {
  return (y / 100) * VH;
}

function radius(r: number) {
  return py(r);
}

export function CompositionGuide({ type, highlights, selectedIndex }: Props) {
  const marks = highlights.map(normalizeHighlight);
  return (
    <svg
      className="composition-guide"
      viewBox={`0 0 ${VW} ${VH}`}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {type === "thirds" && (
        <Thirds highlights={marks} selectedIndex={selectedIndex} />
      )}
      {type === "hinomaru" && (
        <Hinomaru highlights={marks} selectedIndex={selectedIndex} />
      )}
      {type === "diagonal" && (
        <Diagonal highlights={marks} selectedIndex={selectedIndex} />
      )}
      {type === "radial" && (
        <Radial highlights={marks} selectedIndex={selectedIndex} />
      )}
      {type === "spiral" && (
        <Spiral highlights={marks} selectedIndex={selectedIndex} />
      )}
      {type === "split" && (
        <Split highlights={marks} selectedIndex={selectedIndex} />
      )}
      {type === "curve" && (
        <Curve highlights={marks} selectedIndex={selectedIndex} />
      )}
      {type === "frame" && (
        <Frame highlights={marks} selectedIndex={selectedIndex} />
      )}
    </svg>
  );
}

function Hits({
  highlights,
  selectedIndex,
}: {
  highlights: Highlight[];
  selectedIndex?: number;
}) {
  return (
    <>
      {highlights.map((p, i) => (
        <circle
          key={i}
          className={`guide-hit${selectedIndex === i ? " is-selected" : ""}`}
          cx={px(p.x)}
          cy={py(p.y)}
          r={radius(p.r)}
        />
      ))}
    </>
  );
}

function Thirds({
  highlights,
  selectedIndex,
}: {
  highlights: Highlight[];
  selectedIndex?: number;
}) {
  return (
    <g>
      <line x1={px(33.33)} y1="0" x2={px(33.33)} y2={VH} />
      <line x1={px(66.67)} y1="0" x2={px(66.67)} y2={VH} />
      <line x1="0" y1={py(33.33)} x2={VW} y2={py(33.33)} />
      <line x1="0" y1={py(66.67)} x2={VW} y2={py(66.67)} />
      <Hits highlights={highlights} selectedIndex={selectedIndex} />
    </g>
  );
}

function Hinomaru({
  highlights,
  selectedIndex,
}: {
  highlights: Highlight[];
  selectedIndex?: number;
}) {
  const c = highlights[0] ?? { x: 50, y: 50, r: 6 };
  return (
    <g>
      <circle
        className="guide-ring"
        cx={px(c.x)}
        cy={py(c.y)}
        r={radius(Math.max(c.r * 3.2, 12))}
      />
      <Hits highlights={highlights} selectedIndex={selectedIndex} />
    </g>
  );
}

function Diagonal({
  highlights,
  selectedIndex,
}: {
  highlights: Highlight[];
  selectedIndex?: number;
}) {
  return (
    <g>
      <line x1="6" y1="4" x2={VW - 6} y2={VH - 4} />
      <line x1={VW - 6} y1="4" x2="6" y2={VH - 4} />
      <Hits highlights={highlights} selectedIndex={selectedIndex} />
    </g>
  );
}

function rayToEdge(cx: number, cy: number, angle: number) {
  const dx = Math.cos(angle);
  const dy = Math.sin(angle);
  const hits: number[] = [];
  if (dx > 1e-8) hits.push((VW - cx) / dx);
  if (dx < -1e-8) hits.push(-cx / dx);
  if (dy > 1e-8) hits.push((VH - cy) / dy);
  if (dy < -1e-8) hits.push(-cy / dy);
  const t = Math.min(...hits.filter((v) => v > 0.4));
  return { x: cx + t * dx, y: cy + t * dy };
}

function Radial({
  highlights,
  selectedIndex,
}: {
  highlights: Highlight[];
  selectedIndex?: number;
}) {
  const c = highlights[0] ?? { x: 50, y: 50, r: 7 };
  const cx = px(c.x);
  const cy = py(c.y);
  const rays = Array.from({ length: 8 }, (_, i) =>
    rayToEdge(cx, cy, (i * Math.PI) / 4),
  );

  return (
    <g>
      {rays.map((end, i) => (
        <line
          key={i}
          className="guide-ray"
          x1={cx}
          y1={cy}
          x2={end.x}
          y2={end.y}
        />
      ))}
      <Hits highlights={highlights} selectedIndex={selectedIndex} />
    </g>
  );
}

type Square = { x: number; y: number; s: number };

function goldenSpiralGeometry() {
  const squares: Square[] = [];
  let d = "";
  let rx = 0;
  let ry = (VH - VW / PHI) / 2;
  let rw = VW;
  let rh = VW / PHI;
  let started = false;

  for (let i = 0; i < 10 && Math.min(rw, rh) > 0.8; i += 1) {
    const side = i % 4;
    if (side === 0) {
      const s = rh;
      squares.push({ x: rx, y: ry, s });
      if (!started) {
        d += `M ${rx} ${ry + s}`;
        started = true;
      }
      d += ` A ${s} ${s} 0 0 1 ${rx + s} ${ry}`;
      rx += s;
      rw -= s;
    } else if (side === 1) {
      const s = rw;
      squares.push({ x: rx, y: ry, s });
      d += ` A ${s} ${s} 0 0 1 ${rx + s} ${ry + s}`;
      ry += s;
      rh -= s;
    } else if (side === 2) {
      const s = rh;
      squares.push({ x: rx + rw - s, y: ry, s });
      d += ` A ${s} ${s} 0 0 1 ${rx + rw - s} ${ry + s}`;
      rw -= s;
    } else {
      const s = rw;
      squares.push({ x: rx, y: ry + rh - s, s });
      d += ` A ${s} ${s} 0 0 1 ${rx} ${ry + rh - s}`;
      rh -= s;
    }
  }

  return { squares, d };
}

function Spiral({
  highlights,
  selectedIndex,
}: {
  highlights: Highlight[];
  selectedIndex?: number;
}) {
  const { squares, d } = goldenSpiralGeometry();
  return (
    <g>
      {squares.map((sq, i) => (
        <rect
          key={i}
          className="guide-grid"
          x={sq.x}
          y={sq.y}
          width={sq.s}
          height={sq.s}
        />
      ))}
      <path className="guide-spiral" d={d} />
      <Hits highlights={highlights} selectedIndex={selectedIndex} />
    </g>
  );
}

function Split({
  highlights,
  selectedIndex,
}: {
  highlights: Highlight[];
  selectedIndex?: number;
}) {
  const y = py(highlights[0]?.y ?? 50);
  return (
    <g>
      <line x1="0" y1={y} x2={VW} y2={y} />
      <Hits highlights={highlights} selectedIndex={selectedIndex} />
    </g>
  );
}

function curvePath(highlights: Highlight[]) {
  const pts = highlights.map((h) => ({ x: px(h.x), y: py(h.y) }));
  if (pts.length < 2) return "";
  if (pts.length === 2) {
    return `M ${pts[0].x} ${pts[0].y} L ${pts[1].x} ${pts[1].y}`;
  }
  if (pts.length === 3) {
    const [a, b, c] = pts;
    const qx = 2 * b.x - (a.x + c.x) / 2;
    const qy = 2 * b.y - (a.y + c.y) / 2;
    return `M ${a.x} ${a.y} Q ${qx} ${qy} ${c.x} ${c.y}`;
  }
  let d = `M ${pts[0].x} ${pts[0].y}`;
  for (let i = 0; i < pts.length - 1; i += 1) {
    const p0 = pts[i - 1] ?? pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] ?? p2;
    const c1x = p1.x + (p2.x - p0.x) / 6;
    const c1y = p1.y + (p2.y - p0.y) / 6;
    const c2x = p2.x - (p3.x - p1.x) / 6;
    const c2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C ${c1x} ${c1y} ${c2x} ${c2y} ${p2.x} ${p2.y}`;
  }
  return d;
}

function Curve({
  highlights,
  selectedIndex,
}: {
  highlights: Highlight[];
  selectedIndex?: number;
}) {
  const fallback: Highlight[] = [
    { x: 62, y: 10, r: 6 },
    { x: 22, y: 50, r: 6 },
    { x: 62, y: 90, r: 6 },
  ];
  const marks = highlights.length >= 2 ? highlights : fallback;
  return (
    <g>
      <path className="guide-curve" d={curvePath(marks)} />
      <Hits highlights={marks} selectedIndex={selectedIndex} />
    </g>
  );
}

function Frame({
  highlights,
  selectedIndex,
}: {
  highlights: Highlight[];
  selectedIndex?: number;
}) {
  return (
    <g>
      <path d="M12 22 V8 H33" />
      <path d="M117 8 H138 V22" />
      <path d="M138 78 V92 H117" />
      <path d="M33 92 H12 V78" />
      <Hits highlights={highlights} selectedIndex={selectedIndex} />
    </g>
  );
}
