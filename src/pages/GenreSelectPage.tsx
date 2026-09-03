import { Link } from "react-router-dom";
import { Logo } from "../components/Logo";
import { PhotoFrame } from "../components/PhotoFrame";
import { genres, getPhoto } from "../data/catalog";

export function GenreSelectPage() {
  return (
    <main className="page page-home">
      <header className="home-header">
        <Logo />
        <p className="home-lead">撮りたい写真を探す</p>
        <p className="home-sub">カメラマンは、あなた。カメアシは、撮影をサポート。</p>
      </header>

      <section className="genre-list" aria-label="ジャンル">
        {genres.map((genre) => {
          const cover = getPhoto(genre.id, genre.coverPhotoId);
          return (
            <Link
              key={genre.id}
              to={`/g/${genre.id}`}
              className="genre-card"
            >
              <div className="genre-card-image">
                {cover && <PhotoFrame photo={cover} className="photo-cover" />}
              </div>
              <div className="genre-card-meta">
                <h2>{genre.name}</h2>
                <p>{genre.nameEn}</p>
              </div>
            </Link>
          );
        })}
      </section>
    </main>
  );
}
