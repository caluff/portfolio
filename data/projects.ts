export type Project = {
  id: "needThis" | "galloExpress" | "travelAdvisor";
  name: string;
  tags: readonly {
    name: string;
  }[];
  images: readonly `/projects/${string}`[];
  sourceCodeLink: `https://${string}`;
  liveUrl: `https://${string}`;
  developing: boolean;
};

export const projects = [
  {
    id: "needThis",
    name: "NEED THIS",
    tags: [
      {name: "nextjs16"},
      {name: "react19"},
      {name: "typescript"},
      {name: "convex"},
      {name: "stripe"},
      {name: "better-auth"},
      {name: "tailwindCSS4"},
    ],
    images: [
      "/projects/need-this/need-this.png",
      "/projects/need-this/need-this-2.png",
      "/projects/need-this/need-this-3.png",
    ],
    sourceCodeLink: "https://github.com/caluff/NEED-THISS",
    liveUrl: "https://need-this.vercel.app/",
    developing: true,
  },
  {
    id: "galloExpress",
    name: "Gallo Express",
    tags: [
      {name: "nextjs15"},
      {name: "react19"},
      {name: "typescript"},
      {name: "tailwindCSS4"},
      {name: "postgresql"},
      {name: "drizzle"},
      {name: "better-auth"},
      {name: "zustand"},
      {name: "uploadthing"},
    ],
    images: ["/projects/gallo-express.png"],
    sourceCodeLink: "https://github.com/caluff/gallo-express",
    liveUrl: "https://galloexpress.com/",
    developing: false,
  },
  {
    id: "travelAdvisor",
    name: "Travel Advisor",
    tags: [
      {name: "react"},
      {name: "vite"},
      {name: "rapidAPI"},
      {name: "MaterialUI"},
      {name: "GoogleCloud"},
    ],
    images: ["/projects/travel-advisor.webp"],
    sourceCodeLink: "https://github.com/caluff/travel_advisor",
    liveUrl: "https://traveladvisor-caluff.vercel.app",
    developing: false,
  },
] as const satisfies readonly Project[];
