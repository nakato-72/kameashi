import { Link } from "react-router-dom";
import { PhotoFrame } from "../../components/PhotoFrame";
import { useCatalog } from "../../content/CatalogContext";

export function ManageHomePage() {
  const { catalog } = useCatalog();
  const list = [...catalog.photos].sort((a, b) => a.order - b.order);

  return (
    <main className="admin-page">
      <h1>写真一覧</h1>
      <p className="admin-lead">
        構図のパターンと、光・角度・撮影ポイントの文言を直せます。
      </p>
      <ul className="admin-list">
        {list.map((photo) => (
          <li key={photo.id}>
            <Link to={`/manage/${photo.id}`} className="admin-row">
              <div className="admin-thumb">
                <PhotoFrame photo={photo} className="photo-square" />
              </div>
              <div>
                <p className="admin-row-id">
                  {photo.order.toString().padStart(2, "0")} {photo.title}
                </p>
                <p className="admin-row-meta">{photo.composition}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
