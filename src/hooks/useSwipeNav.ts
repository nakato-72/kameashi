import { useCallback, useRef, type PointerEvent } from "react";

type Options = {
  onPrev?: () => void;
  onNext?: () => void;
  threshold?: number;
};

export function useSwipeNav({ onPrev, onNext, threshold = 56 }: Options) {
  const startX = useRef(0);
  const startY = useRef(0);
  const lastX = useRef(0);
  const tracking = useRef(false);
  const locked = useRef<"h" | "v" | null>(null);

  const onPointerDown = useCallback((e: PointerEvent) => {
    tracking.current = true;
    locked.current = null;
    startX.current = e.clientX;
    startY.current = e.clientY;
    lastX.current = e.clientX;
    (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
  }, []);

  const onPointerMove = useCallback((e: PointerEvent) => {
    if (!tracking.current) return;
    lastX.current = e.clientX;
    if (locked.current) return;
    const dx = e.clientX - startX.current;
    const dy = e.clientY - startY.current;
    if (Math.abs(dx) < 8 && Math.abs(dy) < 8) return;
    locked.current = Math.abs(dx) > Math.abs(dy) ? "h" : "v";
  }, []);

  const finish = useCallback(() => {
    if (!tracking.current) return;
    const dx = lastX.current - startX.current;
    tracking.current = false;
    const axis = locked.current;
    locked.current = null;
    if (axis !== "h") return;
    if (dx <= -threshold) onNext?.();
    if (dx >= threshold) onPrev?.();
  }, [onNext, onPrev, threshold]);

  return {
    onPointerDown,
    onPointerMove,
    onPointerUp: finish,
    onPointerCancel: finish,
  };
}
