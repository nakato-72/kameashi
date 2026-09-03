import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { GenreSelectPage } from "./pages/GenreSelectPage";
import { PhotoDetailPage } from "./pages/PhotoDetailPage";
import { PhotoListPage } from "./pages/PhotoListPage";

export default function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <Routes>
          <Route path="/" element={<GenreSelectPage />} />
          <Route path="/g/:genreId" element={<PhotoListPage />} />
          <Route path="/g/:genreId/p/:photoId" element={<PhotoDetailPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
