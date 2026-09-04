import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import seed from "../data/catalog.json";
import {
  getAdjacentPhotos,
  getGenre,
  getPhoto,
  getPhotosByGenre,
} from "../data/catalog";
import type { Catalog, Genre, Photo } from "../types";

type CatalogContextValue = {
  catalog: Catalog;
  setCatalog: (next: Catalog) => void;
  getGenre: (id: string) => Genre | undefined;
  getPhotosByGenre: (genreId: string) => Photo[];
  getPhoto: (genreId: string, photoId: string) => Photo | undefined;
  getAdjacentPhotos: (genreId: string, photoId: string) => {
    list: Photo[];
    index: number;
    prev: Photo | undefined;
    next: Photo | undefined;
  };
};

const CatalogContext = createContext<CatalogContextValue | null>(null);

export function CatalogProvider({ children }: { children: ReactNode }) {
  const [catalog, setCatalog] = useState<Catalog>(seed as Catalog);

  const value = useMemo<CatalogContextValue>(
    () => ({
      catalog,
      setCatalog,
      getGenre: (id) => getGenre(catalog, id),
      getPhotosByGenre: (genreId) => getPhotosByGenre(catalog, genreId),
      getPhoto: (genreId, photoId) => getPhoto(catalog, genreId, photoId),
      getAdjacentPhotos: (genreId, photoId) =>
        getAdjacentPhotos(catalog, genreId, photoId),
    }),
    [catalog],
  );

  return (
    <CatalogContext.Provider value={value}>{children}</CatalogContext.Provider>
  );
}

export function useCatalog() {
  const ctx = useContext(CatalogContext);
  if (!ctx) throw new Error("CatalogProvider がありません");
  return ctx;
}
