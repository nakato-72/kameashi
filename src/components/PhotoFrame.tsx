import type { CSSProperties } from "react";
import type { Photo } from "../types";
import { PhotoScene } from "../illustrations/PhotoScene";
import { photoSrc } from "../lib/photoSrc";

type Props = {
  photo: Photo;
  className?: string;
};

export function PhotoFrame({ photo, className }: Props) {
  const src = photoSrc(photo.image);
  return (
    <div
      className={className}
      style={
        {
          "--crop-x": photo.crop.x,
          "--crop-y": photo.crop.y,
        } as CSSProperties
      }
    >
      {src ? (
        <img src={src} alt="" className="photo-asset" />
      ) : (
        <PhotoScene photoId={photo.id} />
      )}
    </div>
  );
}
