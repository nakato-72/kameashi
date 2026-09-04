import { HashRouter, Navigate, Outlet, Route, Routes } from "react-router-dom";
import { CatalogProvider } from "./content/CatalogContext";
import { ManageEditPage } from "./pages/admin/ManageEditPage";
import { ManageHomePage } from "./pages/admin/ManageHomePage";
import { ManageLayout } from "./pages/admin/ManageLayout";
import { GenreSelectPage } from "./pages/GenreSelectPage";
import { PhotoDetailPage } from "./pages/PhotoDetailPage";
import { PhotoListPage } from "./pages/PhotoListPage";
import "./admin.css";

function UserLayout() {
  return (
    <div className="app-shell">
      <Outlet />
    </div>
  );
}

export default function App() {
  return (
    <CatalogProvider>
      <HashRouter>
        <Routes>
          <Route path="/manage" element={<ManageLayout />}>
            <Route index element={<ManageHomePage />} />
            <Route path="new" element={<ManageEditPage />} />
            <Route path=":photoId" element={<ManageEditPage />} />
          </Route>
          <Route element={<UserLayout />}>
            <Route path="/" element={<GenreSelectPage />} />
            <Route path="/g/:genreId" element={<PhotoListPage />} />
            <Route path="/g/:genreId/p/:photoId" element={<PhotoDetailPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </HashRouter>
    </CatalogProvider>
  );
}
