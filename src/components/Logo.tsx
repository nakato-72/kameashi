import { Link } from "react-router-dom";

export function Logo() {
  return (
    <Link to="/" className="logo" aria-label="カメアシ ホーム">
      <svg viewBox="0 0 32 32" className="logo-mark" aria-hidden="true">
        <rect
          x="5"
          y="11"
          width="22"
          height="15"
          rx="3"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
        />
        <circle
          cx="16"
          cy="18.5"
          r="4.4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
        />
        <circle cx="16" cy="18.5" r="1.4" fill="currentColor" />
        <rect x="12" y="7.5" width="8" height="3.4" rx="1" fill="currentColor" />
      </svg>
      <span className="logo-word">カメアシ</span>
    </Link>
  );
}
