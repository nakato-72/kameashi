import type { GuideType, Highlight } from "../types";

export const DEFAULT_RADIUS = 6;

export type CompositionPattern = {
  id: GuideType;
  name: string;
  highlights: Highlight[];
};

export const COMPOSITION_PATTERNS: CompositionPattern[] = [
  {
    id: "thirds",
    name: "三分割構図",
    highlights: [{ x: 66.7, y: 66.7, r: DEFAULT_RADIUS }],
  },
  {
    id: "hinomaru",
    name: "日の丸構図",
    highlights: [{ x: 50, y: 50, r: DEFAULT_RADIUS }],
  },
  {
    id: "diagonal",
    name: "対角線構図",
    highlights: [
      { x: 30, y: 30, r: DEFAULT_RADIUS },
      { x: 70, y: 70, r: DEFAULT_RADIUS },
    ],
  },
  {
    id: "radial",
    name: "放射線構図",
    highlights: [{ x: 50, y: 50, r: 7 }],
  },
  {
    id: "spiral",
    name: "黄金らせん構図",
    highlights: [{ x: 72, y: 70, r: DEFAULT_RADIUS }],
  },
  {
    id: "split",
    name: "二分割（シンメトリー）構図",
    highlights: [{ x: 50, y: 50, r: DEFAULT_RADIUS }],
  },
  {
    id: "curve",
    name: "曲線構図",
    highlights: [
      { x: 62, y: 10, r: DEFAULT_RADIUS },
      { x: 22, y: 50, r: DEFAULT_RADIUS },
      { x: 62, y: 90, r: DEFAULT_RADIUS },
    ],
  },
  {
    id: "frame",
    name: "フレーム構図",
    highlights: [{ x: 50, y: 50, r: DEFAULT_RADIUS }],
  },
];

export function getPattern(id: GuideType): CompositionPattern {
  return (
    COMPOSITION_PATTERNS.find((p) => p.id === id) ?? COMPOSITION_PATTERNS[0]
  );
}

export function normalizeHighlight(point: {
  x: number;
  y: number;
  r?: number;
}): Highlight {
  return {
    x: point.x,
    y: point.y,
    r: point.r ?? DEFAULT_RADIUS,
  };
}
