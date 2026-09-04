const TOKEN_KEY = "kameashi-gh-token";
const REPO = "nakato-72/kameashi";
const BRANCH = "main";
const API = `https://api.github.com/repos/${REPO}/contents`;

export function getGithubToken(): string {
  return localStorage.getItem(TOKEN_KEY) ?? "";
}

export function setGithubToken(token: string) {
  if (token) localStorage.setItem(TOKEN_KEY, token.trim());
  else localStorage.removeItem(TOKEN_KEY);
}

function utf8ToBase64(text: string): string {
  const bytes = new TextEncoder().encode(text);
  let binary = "";
  bytes.forEach((b) => {
    binary += String.fromCharCode(b);
  });
  return btoa(binary);
}

async function blobToBase64(blob: Blob): Promise<string> {
  const buffer = await blob.arrayBuffer();
  const bytes = new Uint8Array(buffer);
  let binary = "";
  bytes.forEach((b) => {
    binary += String.fromCharCode(b);
  });
  return btoa(binary);
}

type GhFile = { sha: string; content?: string };

async function getFile(path: string, token: string): Promise<GhFile | null> {
  const res = await fetch(`${API}/${path}?ref=${BRANCH}`, {
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (res.status === 404) return null;
  if (!res.ok) {
    throw new Error(await errorMessage(res));
  }
  return (await res.json()) as GhFile;
}

async function putFile(options: {
  path: string;
  contentBase64: string;
  message: string;
  token: string;
  sha?: string;
}) {
  const res = await fetch(`${API}/${options.path}`, {
    method: "PUT",
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${options.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: options.message,
      content: options.contentBase64,
      branch: BRANCH,
      sha: options.sha,
    }),
  });
  if (!res.ok) {
    throw new Error(await errorMessage(res));
  }
}

async function errorMessage(res: Response): Promise<string> {
  try {
    const body = (await res.json()) as { message?: string };
    return body.message ?? `${res.status}`;
  } catch {
    return `${res.status}`;
  }
}

export async function saveCatalogFile(jsonText: string): Promise<void> {
  const token = getGithubToken();
  if (!token) throw new Error("GitHubトークンが未設定です");
  const current = await getFile("src/data/catalog.json", token);
  await putFile({
    path: "src/data/catalog.json",
    contentBase64: utf8ToBase64(jsonText),
    message: "メンテナンス: 写真データを更新する",
    token,
    sha: current?.sha,
  });
}

export async function savePhotoFile(
  filename: string,
  blob: Blob,
): Promise<string> {
  const token = getGithubToken();
  if (!token) throw new Error("GitHubトークンが未設定です");
  const path = `public/content/photos/${filename}`;
  const current = await getFile(path, token);
  await putFile({
    path,
    contentBase64: await blobToBase64(blob),
    message: `メンテナンス: 写真 ${filename} を追加する`,
    token,
    sha: current?.sha,
  });
  return `content/photos/${filename}`;
}
