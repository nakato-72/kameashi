import { Link } from "react-router-dom";
import { CameraMark } from "./Icons";

export function Logo() {
  return (
    <Link to="/" className="logo" aria-label="カメアシ ホーム">
      <CameraMark className="logo-mark" />
      <span className="logo-word">カメアシ</span>
    </Link>
  );
}
