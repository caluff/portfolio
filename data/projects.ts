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
      {name: "TypeScript"},
      {name: "React 19"},
      {name: "Node.js"},
      {name: "Next.js 16"},
      {name: "Convex"},
      {name: "Stripe"},
      {name: "Better Auth"},
      {name: "Tailwind CSS 4"},
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
      {name: "TypeScript"},
      {name: "React 19"},
      {name: "Next.js 15"},
      {name: "Tailwind CSS 4"},
      {name: "PostgreSQL"},
      {name: "Drizzle ORM"},
      {name: "Better Auth"},
      {name: "Zustand"},
      {name: "UploadThing"},
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
      {name: "React"},
      {name: "Vite"},
      {name: "RapidAPI"},
      {name: "Material UI"},
      {name: "Google Cloud"},
    ],
    images: ["/projects/travel-advisor.webp"],
    sourceCodeLink: "https://github.com/caluff/travel_advisor",
    liveUrl: "https://traveladvisor-caluff.vercel.app",
    developing: false,
  },
] as const satisfies readonly Project[];
