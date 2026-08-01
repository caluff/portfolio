export type CoverAccent = "purple" | "cyan" | "orange";

export const coverGifs = [
  {accent: "cyan", id: "herogif1", src: "/gif/herogif1.gif"},
  {accent: "purple", id: "herogif2", src: "/gif/herogif2.gif"},
  {accent: "orange", id: "herogif3", src: "/gif/herogif3.gif"},
] as const;

export const defaultCoverGifId = "herogif2" as const;
