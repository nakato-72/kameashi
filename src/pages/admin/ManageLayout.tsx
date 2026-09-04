import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { isAdminUnlocked, lockAdmin, ManageLogin } from "./ManageLogin";

export function ManageLayout() {
  const [unlocked, setUnlocked] = useState(isAdminUnlocked);

  if (!unlocked) {
    return <ManageLogin onUnlock={() => setUnlocked(true)} />;
  }

  return (
    <div className="admin-shell">
      <header className="admin-bar">
        <strong>カメアシ メンテナンス</strong>
        <nav>
          <Link to="/manage">一覧</Link>
          <Link to="/manage/new">写真を追加</Link>
          <button
            type="button"
            className="admin-text-btn"
            onClick={() => {
              lockAdmin();
              setUnlocked(false);
            }}
          >
            ロック
          </button>
        </nav>
      </header>
      <Outlet />
    </div>
  );
}
