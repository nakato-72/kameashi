export function photoSrc(image?: string): string | undefined {
  if (!image) return undefined;
  if (
    image.startsWith("blob:") ||
    image.startsWith("data:") ||
    image.startsWith("http://") ||
    image.startsWith("https://")
  ) {
    return image;
  }
  const base = import.meta.env.BASE_URL;
  return `${base}${image.replace(/^\//, "")}`;
}
