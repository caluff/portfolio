export type Project = {
  name: string;
  description: string;
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
    name: "NEED THIS",
    description:
      "Full-stack ecommerce platform with a responsive storefront, guest checkout, secure payments, real-time inventory, customer accounts, and a private operations dashboard.",
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
    developing: false,
  },
  {
    name: "Gallo Express",
    description:
      "Production-ready ecommerce app with catalogs, multi-location inventory, admin area, auth, file uploads, and persistent cart.",
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
    name: "Travel Advisor",
    description:
      "Location-based travel discovery app that integrates maps and external APIs to surface restaurants, hotels, and attractions.",
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
