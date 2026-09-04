import { Link, Navigate, useParams } from "react-router-dom";
import { MenuIcon } from "../components/Icons";
import { PhotoFrame } from "../components/PhotoFrame";
import { useCatalog } from "../content/CatalogContext";

export function PhotoListPage() {
  const { genreId = "" } = useParams();
  const { getGenre, getPhotosByGenre } = useCatalog();
  const genre = getGenre(genreId);
  const list = getPhotosByGenre(genreId);

  if (!genre) return <Navigate to="/" replace />;

  return (
    <main className="page page-list">
      <header className="list-header">
        <Link to="/" className="icon-btn" aria-label="ジャンル選択へ戻る">
          <MenuIcon />
        </Link>
        <div className="list-title">
          <h1>{genre.name}</h1>
          <p>{genre.nameEn}</p>
        </div>
        <span className="list-header-spacer" />
      </header>

      <section className="photo-grid" aria-label={`${genre.name}の写真一覧`}>
        {list.map((photo) => {
          const num = photo.order.toString().padStart(2, "0");
          return (
            <Link
              key={photo.id}
              to={`/g/${genre.id}/p/${photo.id}`}
              className="photo-tile"
              aria-label={`${num} ${photo.title}`}
            >
              <PhotoFrame photo={photo} className="photo-square" />
              <span className="photo-num">{num}</span>
            </Link>
          );
        })}
      </section>
    </main>
  );
}
