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
    </svg>
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
      {highlights.map((p, i) => (
        <circle key={`h-${i}`} className="guide-hit" cx={p.x} cy={p.y} r="4.2" />
      ))}
    </g>
  );
}

function Hinomaru({ highlights }: { highlights: { x: number; y: number }[] }) {
  const c = highlights[0] ?? { x: 50, y: 50 };
  return (
    <g>
      <ellipse cx={c.x} cy={c.y} rx="20" ry="28" />
      <circle className="guide-hit" cx={c.x} cy={c.y} r="4.2" />
    </g>
  );
}

function Center({ highlights }: { highlights: { x: number; y: number }[] }) {
  const c = highlights[0] ?? { x: 50, y: 50 };
  return (
    <g>
      <rect
        x={c.x - 16}
        y={c.y - 22}
        width="32"
        height="44"
        rx="3"
        fill="none"
      />
      <line x1={c.x} y1="8" x2={c.x} y2="92" />
      <circle className="guide-hit" cx={c.x} cy={c.y} r="4.2" />
    </g>
  );
}
