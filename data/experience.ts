export type ExperienceIcon = "frontend" | "systems";

export type Experience = {
  readonly role: string;
  readonly company: string;
  readonly employmentType: "Full time" | "Part time";
  readonly period: string;
  readonly startedAt: string;
  readonly icon: ExperienceIcon;
  readonly highlights: readonly string[];
};

export const experiences = [
  {
    role: "Frontend Engineer",
    company: "Active Tech Corp",
    employmentType: "Full time",
    period: "Aug 2023 — Present",
    startedAt: "2023-08",
    icon: "frontend",
    highlights: [
      "Develop, maintain, and evolve modern web applications using Next.js, React, and TypeScript, ensuring scalability, performance, and technical quality",
      "Integrate payment gateways such as Stripe and NMI for secure transaction processing, subscriptions, and custom checkout flows",
      "Implement and automate build and deployment pipelines on Vercel, improving delivery speed and reducing production environment errors",
      "Participate in frontend architecture decisions and define best practices to improve maintainability and scalability across the codebase",
    ],
  },
  {
    role: "Computer Science Specialist",
    company: "Desoft",
    employmentType: "Part time",
    period: "Jan 2023 — Aug 2024",
    startedAt: "2023-01",
    icon: "systems",
    highlights: [
      "Developed and maintained web applications using React.js and related frontend technologies",
      "Implemented responsive designs and ensured cross-browser compatibility across supported devices",
      "Participated in code reviews to improve quality, readability, and consistency across the codebase",
    ],
  },
] as const satisfies readonly Experience[];
