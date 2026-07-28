export const profile = {
  name: "Daniel Caluff",
  initials: "CA",
  headlines: [
    "Senior Frontend Engineer with 4+ years of experience",
    "B.Sc. in Computer Science",
  ],
  location: "Montevideo, Uruguay",
  views: "0000",
} as const;

type AboutSegment = {
  text: string;
  emphasis?: "highlight" | "underline";
};

export const aboutSegments = [
  { text: "Frontend Developer with experience in " },
  {
    text: "React, Next.js, and TypeScript",
    emphasis: "highlight",
  },
  {
    text: ", focused on building modern, product-driven web applications. I have contributed to the development of ",
  },
  {
    text: "analytics dashboards",
    emphasis: "underline",
  },
  {
    text: " and the integration of external APIs and third-party services, including payment gateways such as ",
  },
  {
    text: "Stripe and NMI",
    emphasis: "highlight",
  },
  {
    text: ". I have experience making ",
  },
  {
    text: "frontend architecture decisions",
    emphasis: "underline",
  },
  {
    text: ", defining rendering strategies with Next.js (CSR, SSR, and SSG), and automating build and deployment pipelines on ",
  },
  {
    text: "Vercel",
    emphasis: "highlight",
  },
  {
    text: " to improve the scalability, performance, and maintainability of applications in production.",
  },
] as const satisfies readonly AboutSegment[];
