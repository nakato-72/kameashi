import { Link } from "react-router-dom";
import { ChevronIcon } from "../components/Icons";
import { PhotoFrame } from "../components/PhotoFrame";
import { useCatalog } from "../content/CatalogContext";

export function GenreSelectPage() {
  const { catalog, getPhoto } = useCatalog();

  return (
    <main className="page page-home">
      <header className="home-header">
        <p className="home-brand">カメアシ</p>
        <h1 className="home-lead">撮りたい写真を探す</h1>
      </header>

      <section className="genre-list" aria-label="ジャンル">
        {catalog.genres.map((genre) => {
          const cover = getPhoto(genre.id, genre.coverPhotoId);
          return (
            <Link key={genre.id} to={`/g/${genre.id}`} className="genre-card">
              <div className="genre-card-image">
                {cover && (
                  <PhotoFrame photo={cover} className="photo-portrait" />
                )}
              </div>
              <div className="genre-card-meta">
                <div>
                  <h2>{genre.name}</h2>
                  <p>{genre.nameEn}</p>
                </div>
                <ChevronIcon className="genre-card-chevron" />
              </div>
            </Link>
          );
        })}
      </section>
    </main>
  );
}
