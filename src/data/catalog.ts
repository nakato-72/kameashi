import type { Catalog, Genre, Photo } from "../types";

export function getGenre(catalog: Catalog, id: string): Genre | undefined {
  return catalog.genres.find((g) => g.id === id);
}

export function getPhotosByGenre(catalog: Catalog, genreId: string): Photo[] {
  return catalog.photos
    .filter((p) => p.genreId === genreId)
    .sort((a, b) => a.order - b.order);
}

export function getPhoto(
  catalog: Catalog,
  genreId: string,
  photoId: string,
): Photo | undefined {
  return catalog.photos.find((p) => p.genreId === genreId && p.id === photoId);
}

export function getAdjacentPhotos(
  catalog: Catalog,
  genreId: string,
  photoId: string,
) {
  const list = getPhotosByGenre(catalog, genreId);
  const index = list.findIndex((p) => p.id === photoId);
  return {
    list,
    index,
    prev: index > 0 ? list[index - 1] : undefined,
    next: index >= 0 && index < list.length - 1 ? list[index + 1] : undefined,
  };
}

export function nextPhotoId(catalog: Catalog): string {
  const max = catalog.photos.reduce((n, p) => {
    const parsed = Number.parseInt(p.id, 10);
    return Number.isFinite(parsed) ? Math.max(n, parsed) : n;
  }, 0);
  return String(max + 1).padStart(2, "0");
}
