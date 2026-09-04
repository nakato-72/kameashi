import { useCallback, useEffect, useState, type ReactNode } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { CompositionGuide } from "../components/CompositionGuide";
import { GuideToggle } from "../components/GuideToggle";
import { AngleIcon, BackIcon, GridIcon, StarIcon, SunIcon } from "../components/Icons";
import { PhotoFrame } from "../components/PhotoFrame";
import { PhotoPager } from "../components/PhotoPager";
import { useCatalog } from "../content/CatalogContext";
import { useSwipeNav } from "../hooks/useSwipeNav";

export function PhotoDetailPage() {
  const { genreId = "", photoId = "" } = useParams();
  const navigate = useNavigate();
  const { getGenre, getAdjacentPhotos } = useCatalog();
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
        <Link to={`/g/${genre.id}`} className="icon-btn" aria-label="一覧へ戻る">
          <BackIcon />
        </Link>
        <GuideToggle
          checked={guideOn}
          onChange={setGuideOn}
          label={guideOn ? "ガイド ON" : "ガイド OFF"}
        />
      </header>

      <section className="detail-stage" {...swipe}>
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

      <PhotoPager
        current={photo.order}
        total={list.length}
        onPrev={goPrev}
        onNext={goNext}
        canPrev={Boolean(prev)}
        canNext={Boolean(next)}
      />

      <section className="detail-info" aria-label="撮影のヒント">
        <InfoCard icon={<GridIcon />} label="構図" value={photo.composition} />
        <InfoCard icon={<SunIcon />} label="光" value={photo.light} />
        <InfoCard icon={<AngleIcon />} label="角度" value={photo.angle} />
        <InfoCard
          icon={<StarIcon />}
          label="撮影ポイント"
          value={photo.shootingPoint}
        />
      </section>
    </main>
  );
}

function InfoCard({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <article className="info-card">
      <div className="info-card-icon">{icon}</div>
      <div>
        <h2>{label}</h2>
        <p>{value}</p>
      </div>
    </article>
  );
}
