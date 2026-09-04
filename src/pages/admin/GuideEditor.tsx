import { useRef, useState, type PointerEvent } from "react";
import { CompositionGuide } from "../../components/CompositionGuide";
import { PhotoFrame } from "../../components/PhotoFrame";
import { DEFAULT_RADIUS } from "../../data/patterns";
import type { GuideType, Highlight, Photo } from "../../types";

type Props = {
  photo: Photo;
  guideType: GuideType;
  highlights: Highlight[];
  onChange: (next: Highlight[]) => void;
};

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

export function GuideEditor({ photo, guideType, highlights, onChange }: Props) {
  const stageRef = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState(0);
  const drag = useRef<number | null>(null);

  const current = highlights[selected];

  function toPct(e: PointerEvent<HTMLDivElement>) {
    const box = stageRef.current!.getBoundingClientRect();
    return {
      x: clamp(((e.clientX - box.left) / box.width) * 100, 0, 100),
      y: clamp(((e.clientY - box.top) / box.height) * 100, 0, 100),
    };
  }

  function hitIndex(e: PointerEvent<HTMLDivElement>) {
    const box = stageRef.current!.getBoundingClientRect();
    const pct = toPct(e);
    for (let i = highlights.length - 1; i >= 0; i -= 1) {
      const h = highlights[i];
      const dx = ((pct.x - h.x) / 100) * box.width;
      const dy = ((pct.y - h.y) / 100) * box.height;
      const pixelR = (h.r / 100) * box.height + 10;
      if (Math.hypot(dx, dy) <= pixelR) return i;
    }
    return -1;
  }

  function onPointerDown(e: PointerEvent<HTMLDivElement>) {
    const hit = hitIndex(e);
    const pct = toPct(e);
    const index = hit >= 0 ? hit : selected;
    setSelected(index);
    drag.current = index;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    if (hit < 0 && highlights[index]) {
      onChange(
        highlights.map((h, i) => (i === index ? { ...h, ...pct } : h)),
      );
    }
  }

  function onPointerMove(e: PointerEvent<HTMLDivElement>) {
    if (drag.current === null) return;
    const pct = toPct(e);
    const index = drag.current;
    onChange(highlights.map((h, i) => (i === index ? { ...h, ...pct } : h)));
  }

  function onPointerUp() {
    drag.current = null;
  }

  function setRadius(r: number) {
    onChange(
      highlights.map((h, i) => (i === selected ? { ...h, r } : h)),
    );
  }

  function addMark() {
    const next = {
      x: clamp((current?.x ?? 50) + 8, 8, 92),
      y: clamp((current?.y ?? 50) + 8, 8, 92),
      r: current?.r ?? DEFAULT_RADIUS,
    };
    onChange([...highlights, next]);
    setSelected(highlights.length);
  }

  function removeMark() {
    if (highlights.length <= 1) return;
    const next = highlights.filter((_, i) => i !== selected);
    onChange(next);
    setSelected(Math.max(0, selected - 1));
  }

  return (
    <div className="guide-editor">
      <div
        ref={stageRef}
        className="admin-preview guide-editor-stage"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <div className="detail-photo">
          <PhotoFrame photo={photo} className="photo-landscape" />
          <CompositionGuide
            type={guideType}
            highlights={highlights}
            selectedIndex={selected}
          />
        </div>
      </div>
      <p className="admin-note">丸をドラッグして位置を変えられます。</p>
      <div className="guide-editor-tools">
        <label>
          大きさ
          <input
            type="range"
            min={3}
            max={22}
            step={0.5}
            value={current?.r ?? DEFAULT_RADIUS}
            onChange={(e) => setRadius(Number(e.target.value))}
            disabled={!current}
          />
        </label>
        <div className="guide-editor-actions">
          <button type="button" className="admin-secondary" onClick={addMark}>
            丸を追加
          </button>
          <button
            type="button"
            className="admin-secondary"
            onClick={removeMark}
            disabled={highlights.length <= 1}
          >
            この丸を消す
          </button>
        </div>
      </div>
    </div>
  );
}
