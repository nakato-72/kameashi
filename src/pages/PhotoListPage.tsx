import { Link, Navigate, useParams } from "react-router-dom";
import { PhotoFrame } from "../components/PhotoFrame";
import { getGenre, getPhotosByGenre } from "../data/catalog";

export function PhotoListPage() {
  const { genreId = "" } = useParams();
  const genre = getGenre(genreId);
  const list = getPhotosByGenre(genreId);

  if (!genre) return <Navigate to="/" replace />;

  return (
    <main className="page page-list">
      <header className="list-header">
        <Link to="/" className="icon-btn" aria-label="ジャンル選択へ戻る">
          <BackIcon />
        </Link>
        <div className="list-title">
          <h1>{genre.name}</h1>
          <p>{genre.nameEn}</p>
        </div>
        <span className="list-header-spacer" />
      </header>

      <section className="photo-grid" aria-label={`${genre.name}の写真一覧`}>
        {list.map((photo) => (
          <Link
            key={photo.id}
            to={`/g/${genre.id}/p/${photo.id}`}
            className="photo-tile"
            aria-label={`${photo.order.toString().padStart(2, "0")} ${photo.title}`}
          >
            <PhotoFrame photo={photo} className="photo-square" />
          </Link>
        ))}
      </section>
    </main>
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
