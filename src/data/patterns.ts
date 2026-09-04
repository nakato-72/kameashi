import type { GuideType } from "../types";

export type CompositionPattern = {
  id: GuideType;
  name: string;
  highlights: { x: number; y: number }[];
};

export const COMPOSITION_PATTERNS: CompositionPattern[] = [
  {
    id: "thirds",
    name: "三分割構図",
    highlights: [{ x: 66.7, y: 66.7 }],
  },
  {
    id: "hinomaru",
    name: "日の丸構図",
    highlights: [{ x: 50, y: 50 }],
  },
  {
    id: "center",
    name: "中央構図",
    highlights: [{ x: 50, y: 50 }],
  },
  {
    id: "diagonal",
    name: "対角線構図",
    highlights: [
      { x: 30, y: 30 },
      { x: 70, y: 70 },
    ],
  },
  {
    id: "radial",
    name: "放射構図",
    highlights: [{ x: 50, y: 50 }],
  },
  {
    id: "frame",
    name: "フレーム構図",
    highlights: [{ x: 50, y: 50 }],
  },
];

export function getPattern(id: GuideType): CompositionPattern {
  return (
    COMPOSITION_PATTERNS.find((p) => p.id === id) ?? COMPOSITION_PATTERNS[0]
  );
}
