export type GuideType = "hinomaru" | "thirds" | "center";

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
  /** 実写素材を置く場合のパス。未設定時はイラストを描画する */
  image?: string;
  /** 構図ガイド上で強調する点（写真座標の %） */
  highlights: { x: number; y: number }[];
  /** 一覧 1:1 トリミングの焦点（0–100） */
  crop: { x: number; y: number };
};
