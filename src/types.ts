export type GuideType =
  | "thirds"
  | "hinomaru"
  | "center"
  | "diagonal"
  | "radial"
  | "frame";

export type Genre = {
  id: string;
  name: string;
  nameEn: string;
  coverPhotoId: string;
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
  highlights: { x: number; y: number }[];
  crop: { x: number; y: number };
};

export type Catalog = {
  genres: Genre[];
  photos: Photo[];
};
