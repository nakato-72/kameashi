export type GuideType =
  | "thirds"
  | "hinomaru"
  | "diagonal"
  | "radial"
  | "frame"
  | "spiral"
  | "split"
  | "curve";

export type Genre = {
  id: string;
  name: string;
  nameEn: string;
  coverPhotoId: string;
};

export type Highlight = {
  x: number;
  y: number;
  r: number;
};

export type Photo = {
  id: string;
  genreId: string;
  order: number;
  title: string;
  composition: string;
  light: string;
  angle: string;
  shootingPoint: string;
  guideType: GuideType;
  image?: string;
  highlights: Highlight[];
  crop: { x: number; y: number };
};

export type Catalog = {
  genres: Genre[];
  photos: Photo[];
};
