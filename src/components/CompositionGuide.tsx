import type { GuideType } from "../types";

type Props = {
  type: GuideType;
  highlights: { x: number; y: number }[];
};

const THIRDS = [
  { x: 33.33, y: 33.33 },
  { x: 66.67, y: 33.33 },
  { x: 33.33, y: 66.67 },
  { x: 66.67, y: 66.67 },
];

export function CompositionGuide({ type, highlights }: Props) {
  return (
    <svg
      className="composition-guide"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {type === "thirds" && <Thirds highlights={highlights} />}
      {type === "hinomaru" && <Hinomaru highlights={highlights} />}
      {type === "center" && <Center highlights={highlights} />}
      {type === "diagonal" && <Diagonal highlights={highlights} />}
      {type === "radial" && <Radial highlights={highlights} />}
      {type === "frame" && <Frame highlights={highlights} />}
    </svg>
  );
}

function Hits({ highlights }: { highlights: { x: number; y: number }[] }) {
  return (
    <>
      {highlights.map((p, i) => (
        <circle key={i} className="guide-hit" cx={p.x} cy={p.y} r="4.2" />
      ))}
    </>
  );
}

function Thirds({ highlights }: { highlights: { x: number; y: number }[] }) {
  return (
    <g>
      <line x1="33.33" y1="0" x2="33.33" y2="100" />
      <line x1="66.67" y1="0" x2="66.67" y2="100" />
      <line x1="0" y1="33.33" x2="100" y2="33.33" />
      <line x1="0" y1="66.67" x2="100" y2="66.67" />
      {THIRDS.map((p, i) => (
        <circle key={`n-${i}`} className="guide-node" cx={p.x} cy={p.y} r="2.4" />
      ))}
      <Hits highlights={highlights} />
    </g>
  );
}

function Hinomaru({ highlights }: { highlights: { x: number; y: number }[] }) {
  const c = highlights[0] ?? { x: 50, y: 50 };
  return (
    <g>
      <ellipse cx={c.x} cy={c.y} rx="20" ry="28" />
      <Hits highlights={highlights} />
    </g>
  );
}

function Center({ highlights }: { highlights: { x: number; y: number }[] }) {
  const c = highlights[0] ?? { x: 50, y: 50 };
  return (
    <g>
      <rect x={c.x - 16} y={c.y - 22} width="32" height="44" rx="3" fill="none" />
      <line x1={c.x} y1="8" x2={c.x} y2="92" />
      <Hits highlights={highlights} />
    </g>
  );
}

function Diagonal({ highlights }: { highlights: { x: number; y: number }[] }) {
  return (
    <g>
      <line x1="4" y1="4" x2="96" y2="96" />
      <line x1="96" y1="4" x2="4" y2="96" />
      <Hits highlights={highlights} />
    </g>
  );
}

function Radial({ highlights }: { highlights: { x: number; y: number }[] }) {
  const c = highlights[0] ?? { x: 50, y: 50 };
  return (
    <g>
      <ellipse cx={c.x} cy={c.y} rx="14" ry="18" />
      <ellipse cx={c.x} cy={c.y} rx="26" ry="34" />
      <ellipse cx={c.x} cy={c.y} rx="38" ry="48" />
      <line x1={c.x} y1="6" x2={c.x} y2="94" />
      <line x1="8" y1={c.y} x2="92" y2={c.y} />
      <Hits highlights={highlights} />
    </g>
  );
}

function Frame({ highlights }: { highlights: { x: number; y: number }[] }) {
  return (
    <g>
      <path d="M8 22 V8 H22" />
      <path d="M78 8 H92 V22" />
      <path d="M92 78 V92 H78" />
      <path d="M22 92 H8 V78" />
      <Hits highlights={highlights} />
    </g>
  );
}
