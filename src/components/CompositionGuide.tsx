import type { GuideType } from "../types";

type Props = {
  type: GuideType;
  highlights: { x: number; y: number }[];
};

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
      {highlights.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="3.6" />
      ))}
    </g>
  );
}

function Hinomaru({ highlights }: { highlights: { x: number; y: number }[] }) {
  const c = highlights[0] ?? { x: 50, y: 50 };
  return (
    <g>
      <ellipse cx={c.x} cy={c.y} rx="22" ry="30" fill="none" />
      <circle cx={c.x} cy={c.y} r="3.8" />
    </g>
  );
}

function Center({ highlights }: { highlights: { x: number; y: number }[] }) {
  const c = highlights[0] ?? { x: 50, y: 50 };
  return (
    <g>
      <line x1={c.x} y1="0" x2={c.x} y2="100" />
      <line x1="28" y1={c.y} x2="72" y2={c.y} />
      <circle cx={c.x} cy={c.y} r="3.8" />
    </g>
  );
}
