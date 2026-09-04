import { useState, type FormEvent } from "react";

const PIN = "1223";
const SESSION_KEY = "kameashi-admin";

export function isAdminUnlocked(): boolean {
  return sessionStorage.getItem(SESSION_KEY) === "1";
}

export function lockAdmin() {
  sessionStorage.removeItem(SESSION_KEY);
}

export function ManageLogin({ onUnlock }: { onUnlock: () => void }) {
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");

  function submit(e: FormEvent) {
    e.preventDefault();
    if (pin === PIN) {
      sessionStorage.setItem(SESSION_KEY, "1");
      onUnlock();
      return;
    }
    setError("合言葉が違います");
  }

  return (
    <main className="admin-login">
      <h1>メンテナンス</h1>
      <p>合言葉を入力してください</p>
      <form onSubmit={submit}>
        <input
          type="password"
          inputMode="numeric"
          autoComplete="off"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
          aria-label="合言葉"
        />
        <button type="submit">入る</button>
      </form>
      {error && <p className="admin-error">{error}</p>}
    </main>
  );
}
