import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import {
  getGithubToken,
  setGithubToken,
} from "../../admin/githubStore";
import { isAdminUnlocked, lockAdmin, ManageLogin } from "./ManageLogin";

export function ManageLayout() {
  const [unlocked, setUnlocked] = useState(isAdminUnlocked);
  const [token, setToken] = useState(getGithubToken);
  const [tokenSaved, setTokenSaved] = useState(Boolean(getGithubToken()));

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

      <section className="admin-token">
        <p>
          メンテ用PCでは、初回だけ GitHub
          のトークンを保存します。保存すると写真と説明が本番に反映されます。
        </p>
        <form
          className="admin-token-row"
          onSubmit={(e) => {
            e.preventDefault();
            setGithubToken(token);
            setTokenSaved(Boolean(token.trim()));
          }}
        >
          <input
            type="password"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="ghp_ から始まるトークン"
            aria-label="GitHubトークン"
          />
          <button type="submit">トークンを保存</button>
        </form>
        <p className="admin-note">
          {tokenSaved
            ? "このブラウザにトークンが入っています。"
            : "未設定です。保存しても、このPCのブラウザ以外には反映されません。"}
        </p>
      </section>

      <Outlet />
    </div>
  );
}
