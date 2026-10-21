export type CoverAccent = "purple" | "cyan" | "orange";

export const coverImages = [
  {
    accent: "purple",
    id: "creation-dots",
    labelKey: "3",
    src: "/images/covers/creation-dots.png",
  },
  {
    accent: "orange",
    id: "creation-pixel",
    labelKey: "1",
    src: "/images/covers/creation-pixel.png",
  },
  {
    accent: "cyan",
    id: "creation-cyan",
    labelKey: "2",
    src: "/images/covers/creation-cyan.png",
  },
] as const;

export const defaultCoverImageId = coverImages[0].id;
