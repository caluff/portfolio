export type CoverAccent = "purple" | "cyan" | "orange";

export const coverGifs = [
  {accent: "purple", id: "herogif1", src: "/gif/herogif1.gif"},
  {accent: "cyan", id: "herogif2", src: "/gif/herogif2.gif"},
  {accent: "orange", id: "herogif3", src: "/gif/herogif3.gif"},
] as const;

export const defaultCoverGifId = "herogif1" as const;
