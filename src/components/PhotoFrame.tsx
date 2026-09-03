import type { CSSProperties } from "react";
import type { Photo } from "../types";
import { PhotoScene } from "../illustrations/PhotoScene";

type Props = {
  photo: Photo;
  className?: string;
};

export function PhotoFrame({ photo, className }: Props) {
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
      {photo.image ? (
        <img src={photo.image} alt="" className="photo-asset" />
      ) : (
        <PhotoScene photoId={photo.id} />
      )}
    </div>
  );
}
