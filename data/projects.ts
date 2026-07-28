import { ArrowUpRight, Briefcase, MoonStar, Square, type LucideIcon } from "lucide-react";

export type ProjectTone = "blue" | "lime" | "rose" | "sand";

type Project = {
  title: string;
  description: string;
  kind: string;
  year: number;
  href: string;
  icon: LucideIcon;
  tone: ProjectTone;
};

export const projects = [
  {
    title: "Orbit",
    description: "Un dashboard financiero para decisiones claras.",
    kind: "Fintech / Producto digital",
    year: 2026,
    href: "#contact",
    icon: MoonStar,
    tone: "lime",
  },
  {
    title: "Mono Studio",
    description: "Una identidad web para un estudio independiente.",
    kind: "Branding / Desarrollo web",
    year: 2026,
    href: "#contact",
    icon: Briefcase,
    tone: "rose",
  },
  {
    title: "Archivo",
    description: "Una biblioteca digital para historias locales.",
    kind: "Editorial / UX UI",
    year: 2026,
    href: "#contact",
    icon: Square,
    tone: "blue",
  },
  {
    title: "Borde",
    description: "Comercio de objetos hechos para durar.",
    kind: "E-commerce / Frontend",
    year: 2026,
    href: "#contact",
    icon: ArrowUpRight,
    tone: "sand",
  },
] satisfies readonly Project[];
