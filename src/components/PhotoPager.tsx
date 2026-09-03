import { BackIcon, ChevronIcon } from "./Icons";

type Props = {
  current: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
  canPrev: boolean;
  canNext: boolean;
};

export function PhotoPager({
  current,
  total,
  onPrev,
  onNext,
  canPrev,
  canNext,
}: Props) {
  const label = `${String(current).padStart(2, "0")} / ${String(total).padStart(2, "0")}`;

  return (
    <div className="pager">
      <div className="pager-row">
        <button
          type="button"
          className="pager-arrow"
          onClick={onPrev}
          disabled={!canPrev}
          aria-label="前の写真"
        >
          <BackIcon />
        </button>
        <p className="pager-count">{label}</p>
        <button
          type="button"
          className="pager-arrow"
          onClick={onNext}
          disabled={!canNext}
          aria-label="次の写真"
        >
          <ChevronIcon />
        </button>
      </div>
      <div className="pager-dots" aria-hidden="true">
        {Array.from({ length: total }, (_, i) => (
          <span
            key={i}
            className={`pager-dot ${i + 1 === current ? "is-active" : ""}`}
          />
        ))}
      </div>
    </div>
  );
}
