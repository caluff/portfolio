export type TechnologyCategory = "frontend" | "backend" | "tools" | "ai";

export type Technology = {
  name: string;
  href: string;
  iconSrc: string;
  iconMode: "color" | "monochrome";
  categories: readonly TechnologyCategory[];
};

export const technologyTabs = [
  {value: "all"},
  {value: "frontend"},
  {value: "backend"},
  {value: "tools"},
  {value: "ai"},
] as const;

export type TechnologyTab = (typeof technologyTabs)[number]["value"];

export const technologies = [
  {
    name: "JavaScript",
    href: "https://developer.mozilla.org/docs/Web/JavaScript",
    iconSrc: "/tech/javascript.svg",
    iconMode: "color",
    categories: ["frontend", "backend"],
  },
  {
    name: "TypeScript",
    href: "https://www.typescriptlang.org/",
    iconSrc: "/tech/typescript.svg",
    iconMode: "color",
    categories: ["frontend", "backend"],
  },
  {
    name: "React",
    href: "https://react.dev/",
    iconSrc: "/tech/react.svg",
    iconMode: "color",
    categories: ["frontend"],
  },
  {
    name: "Next.js",
    href: "https://nextjs.org/",
    iconSrc: "/tech/nextjs.svg",
    iconMode: "monochrome",
    categories: ["frontend", "backend"],
  },
  {
    name: "Tailwind CSS",
    href: "https://tailwindcss.com/",
    iconSrc: "/tech/tailwindcss.svg",
    iconMode: "color",
    categories: ["frontend"],
  },
  {
    name: "Vite",
    href: "https://vite.dev/",
    iconSrc: "/tech/vitejs.svg",
    iconMode: "color",
    categories: ["frontend", "tools"],
  },
  {
    name: "Node.js",
    href: "https://nodejs.org/",
    iconSrc: "/tech/node.svg",
    iconMode: "color",
    categories: ["backend"],
  },
  {
    name: "pnpm",
    href: "https://pnpm.io/",
    iconSrc: "/tech/pnpm.svg",
    iconMode: "color",
    categories: ["tools"],
  },
  {
    name: "Convex",
    href: "https://www.convex.dev/",
    iconSrc: "/tech/convex.svg",
    iconMode: "color",
    categories: ["backend"],
  },
  {
    name: "Supabase",
    href: "https://supabase.com/",
    iconSrc: "/tech/supabase.svg",
    iconMode: "color",
    categories: ["backend"],
  },
  {
    name: "GitHub",
    href: "https://github.com/",
    iconSrc: "/tech/github.svg",
    iconMode: "monochrome",
    categories: ["tools"],
  },
  {
    name: "Git",
    href: "https://git-scm.com/",
    iconSrc: "/tech/git.svg",
    iconMode: "color",
    categories: ["tools"],
  },
  {
    name: "Vercel",
    href: "https://vercel.com/",
    iconSrc: "/tech/vercel.svg",
    iconMode: "monochrome",
    categories: ["tools"],
  },
  {
    name: "Postman",
    href: "https://www.postman.com/",
    iconSrc: "/tech/postman.svg",
    iconMode: "monochrome",
    categories: ["backend", "tools"],
  },
  {
    name: "Stripe",
    href: "https://stripe.com/",
    iconSrc: "/tech/stripe.svg",
    iconMode: "color",
    categories: ["backend"],
  },
  {
    name: "Codex",
    href: "https://openai.com/codex/",
    iconSrc: "/tech/codex.svg",
    iconMode: "color",
    categories: ["tools", "ai"],
  },
  {
    name: "Pi Coding Agent",
    href: "https://pi.dev/",
    iconSrc: "/tech/pi-coding-agent.svg",
    iconMode: "monochrome",
    categories: ["tools", "ai"],
  },
  {
    name: "MCP",
    href: "https://modelcontextprotocol.io/",
    iconSrc: "/tech/mcp.svg",
    iconMode: "monochrome",
    categories: ["tools", "ai"],
  },
  {
    name: "Cursor",
    href: "https://cursor.com/",
    iconSrc: "/tech/cursor.svg",
    iconMode: "monochrome",
    categories: ["tools", "ai"],
  },
  {
    name: "JetBrains",
    href: "https://www.jetbrains.com/",
    iconSrc: "/tech/jetbrain.svg",
    iconMode: "monochrome",
    categories: ["tools"],
  },
  {
    name: "WebStorm",
    href: "https://www.jetbrains.com/webstorm/",
    iconSrc: "/tech/webstorm.svg",
    iconMode: "color",
    categories: ["tools"],
  },
] as const satisfies readonly Technology[];
