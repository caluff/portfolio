export type CoverAccent = "purple" | "cyan" | "orange";

export const coverGifs = [
  {
    accent: "purple",
    id: "herogif1",
    poster: "/video/hero-1-poster.webp",
    src: "/video/hero-1.mp4",
  },
  {
    accent: "cyan",
    id: "herogif2",
    poster: "/video/hero-2-poster.webp",
    src: "/video/hero-2.mp4",
  },
  {
    accent: "orange",
    id: "herogif3",
    poster: "/video/hero-3-poster.webp",
    src: "/video/hero-3.mp4",
  },
] as const;

export const defaultCoverGifId = "herogif1" as const;
