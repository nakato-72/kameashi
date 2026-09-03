import { useCallback, useEffect, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { CompositionGuide } from "../components/CompositionGuide";
import { GuideToggle } from "../components/GuideToggle";
import { PhotoFrame } from "../components/PhotoFrame";
import { getAdjacentPhotos, getGenre } from "../data/catalog";
import { useSwipeNav } from "../hooks/useSwipeNav";

export function PhotoDetailPage() {
  const { genreId = "", photoId = "" } = useParams();
  const navigate = useNavigate();
  const genre = getGenre(genreId);
  const { list, index, prev, next } = getAdjacentPhotos(genreId, photoId);
  const photo = index >= 0 ? list[index] : undefined;
  const [guideOn, setGuideOn] = useState(true);

  const goPrev = useCallback(() => {
    if (prev) navigate(`/g/${genreId}/p/${prev.id}`, { replace: true });
  }, [genreId, navigate, prev]);

  const goNext = useCallback(() => {
    if (next) navigate(`/g/${genreId}/p/${next.id}`, { replace: true });
  }, [genreId, navigate, next]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goNext, goPrev]);

  const swipe = useSwipeNav({ onPrev: goPrev, onNext: goNext });

  if (!genre) return <Navigate to="/" replace />;
  if (!photo) return <Navigate to={`/g/${genreId}`} replace />;

  return (
    <main className="page page-detail">
      <header className="detail-header">
        <Link
          to={`/g/${genre.id}`}
          className="icon-btn"
          aria-label="一覧へ戻る"
        >
          <BackIcon />
        </Link>
        <GuideToggle
          checked={guideOn}
          onChange={setGuideOn}
          label={guideOn ? "ガイド ON" : "ガイド OFF"}
        />
      </header>

      <section
        className="detail-stage"
        {...swipe}
      >
        <div className="detail-photo">
          <PhotoFrame photo={photo} className="photo-landscape" />
          {guideOn && (
            <CompositionGuide
              type={photo.guideType}
              highlights={photo.highlights}
            />
          )}
        </div>
      </section>

      <section className="detail-info" aria-label="撮影のヒント">
        <InfoBlock label="構図" value={photo.composition} />
        <InfoBlock label="光" value={photo.light} />
        <InfoBlock label="角度" value={photo.angle} />
        <InfoBlock label="撮影ポイント" value={photo.shootingPoint} />
      </section>
    </main>
  );
}

function InfoBlock({ label, value }: { label: string; value: string }) {
  return (
    <div className="info-block">
      <h2>{label}</h2>
      <p>{value}</p>
    </div>
  );
}

function BackIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M15.5 5.5 8 12l7.5 6.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
