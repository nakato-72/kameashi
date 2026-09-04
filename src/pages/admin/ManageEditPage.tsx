import { useMemo, useState, type FormEvent } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { compressImage } from "../../admin/compressImage";
import { getGithubToken, saveCatalogFile, savePhotoFile } from "../../admin/githubStore";
import { CompositionGuide } from "../../components/CompositionGuide";
import { PhotoFrame } from "../../components/PhotoFrame";
import { useCatalog } from "../../content/CatalogContext";
import { nextPhotoId } from "../../data/catalog";
import { COMPOSITION_PATTERNS, getPattern } from "../../data/patterns";
import type { GuideType, Photo } from "../../types";

export function ManageEditPage() {
  const { photoId } = useParams();
  const isNew = photoId === undefined;
  const navigate = useNavigate();
  const { catalog, setCatalog, getPhoto } = useCatalog();
  const existing = photoId ? getPhoto("newborn", photoId) : undefined;

  const [title, setTitle] = useState(existing?.title ?? "");
  const [guideType, setGuideType] = useState<GuideType>(
    existing?.guideType ?? "thirds",
  );
  const [light, setLight] = useState(existing?.light ?? "");
  const [angle, setAngle] = useState(existing?.angle ?? "");
  const [shootingPoint, setShootingPoint] = useState(
    existing?.shootingPoint ?? "",
  );
  const [preview, setPreview] = useState(existing?.image ?? "");
  const [imageBlob, setImageBlob] = useState<Blob | null>(null);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const pattern = getPattern(guideType);
  const draftPhoto: Photo = useMemo(
    () => ({
      id: existing?.id ?? "preview",
      genreId: "newborn",
      order: existing?.order ?? catalog.photos.length + 1,
      title: title || "新しい写真",
      composition: pattern.name,
      light,
      angle,
      shootingPoint,
      guideType,
      image: preview || existing?.image,
      highlights: pattern.highlights,
      crop: existing?.crop ?? { x: 50, y: 50 },
    }),
    [
      angle,
      catalog.photos.length,
      existing,
      guideType,
      light,
      pattern.highlights,
      pattern.name,
      preview,
      shootingPoint,
      title,
    ],
  );

  if (!isNew && !existing) {
    return (
      <main className="admin-page">
        <p>写真が見つかりません。</p>
        <Link to="/manage">一覧へ</Link>
      </main>
    );
  }

  async function onFile(file: File | undefined) {
    if (!file) return;
    setError("");
    try {
      const blob = await compressImage(file);
      setImageBlob(blob);
      setPreview(URL.createObjectURL(blob));
    } catch {
      setError("画像を読み込めませんでした");
    }
  }

  async function onSave(e: FormEvent) {
    e.preventDefault();
    setError("");
    setMessage("");
    if (isNew && !imageBlob) {
      setError("写真を選んでください");
      return;
    }
    if (!getGithubToken()) {
      setError("先に GitHub トークンを保存してください");
      return;
    }

    setBusy(true);
    try {
      const id = existing?.id ?? nextPhotoId(catalog);
      let image = existing?.image;
      if (imageBlob) {
        image = await savePhotoFile(`${id}.jpg`, imageBlob);
      }
      const photo: Photo = {
        id,
        genreId: "newborn",
        order: existing?.order ?? catalog.photos.length + 1,
        title: title.trim() || `写真${id}`,
        composition: pattern.name,
        light: light.trim(),
        angle: angle.trim(),
        shootingPoint: shootingPoint.trim(),
        guideType,
        image,
        highlights: pattern.highlights,
        crop: existing?.crop ?? { x: 50, y: 50 },
      };
      const photos = existing
        ? catalog.photos.map((p) => (p.id === existing.id ? photo : p))
        : [...catalog.photos, photo];
      const next = { ...catalog, photos };
      await saveCatalogFile(JSON.stringify(next, null, 2) + "\n");
      setCatalog(next);
      setMessage("保存しました。サイトへの反映に1分ほどかかることがあります。");
      if (isNew) navigate(`/manage/${id}`, { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : "保存に失敗しました");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="admin-page">
      <p>
        <Link to="/manage">← 一覧</Link>
      </p>
      <h1>{isNew ? "写真を追加" : `写真 ${existing?.id}`}</h1>

      <form className="admin-form" onSubmit={onSave}>
        <label>
          写真
          <input
            type="file"
            accept="image/*"
            onChange={(e) => onFile(e.target.files?.[0])}
          />
        </label>

        <div className="admin-preview">
          <div className="detail-photo">
            <PhotoFrame photo={draftPhoto} className="photo-landscape" />
            <CompositionGuide
              type={draftPhoto.guideType}
              highlights={draftPhoto.highlights}
            />
          </div>
        </div>

        <label>
          タイトル（管理用）
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="例: 余白を活かした寝姿"
          />
        </label>

        <label>
          構図
          <select
            value={guideType}
            onChange={(e) => setGuideType(e.target.value as GuideType)}
          >
            {COMPOSITION_PATTERNS.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </label>

        <label>
          光
          <input
            value={light}
            onChange={(e) => setLight(e.target.value)}
            placeholder="例: 柔らかい自然光"
          />
        </label>

        <label>
          角度
          <input
            value={angle}
            onChange={(e) => setAngle(e.target.value)}
            placeholder="例: 真上"
          />
        </label>

        <label>
          撮影ポイント
          <textarea
            rows={3}
            value={shootingPoint}
            onChange={(e) => setShootingPoint(e.target.value)}
            placeholder="撮影時にすぐ分かる一文"
          />
        </label>

        <button type="submit" disabled={busy}>
          {busy ? "保存中…" : "保存する"}
        </button>
        {message && <p className="admin-ok">{message}</p>}
        {error && <p className="admin-error">{error}</p>}
      </form>
    </main>
  );
}
