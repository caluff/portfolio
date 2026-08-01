export type TechnologyCategory = "frontend" | "backend" | "tools" | "ai";

export type Technology = {
  name: string;
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
    iconSrc: "/tech/javascript.svg",
    iconMode: "color",
    categories: ["frontend", "backend"],
  },
  {
    name: "TypeScript",
    iconSrc: "/tech/typescript.svg",
    iconMode: "color",
    categories: ["frontend", "backend"],
  },
  {
    name: "React",
    iconSrc: "/tech/react.svg",
    iconMode: "color",
    categories: ["frontend"],
  },
  {
    name: "Next.js",
    iconSrc: "/tech/nextjs.svg",
    iconMode: "monochrome",
    categories: ["frontend", "backend"],
  },
  {
    name: "Tailwind CSS",
    iconSrc: "/tech/tailwindcss.svg",
    iconMode: "color",
    categories: ["frontend"],
  },
  {
    name: "Vite",
    iconSrc: "/tech/vitejs.svg",
    iconMode: "color",
    categories: ["frontend", "tools"],
  },
  {
    name: "Node.js",
    iconSrc: "/tech/node.svg",
    iconMode: "color",
    categories: ["backend"],
  },
  {
    name: "pnpm",
    iconSrc: "/tech/pnpm.svg",
    iconMode: "color",
    categories: ["tools"],
  },
  {
    name: "Convex",
    iconSrc: "/tech/convex.svg",
    iconMode: "color",
    categories: ["backend"],
  },
  {
    name: "Supabase",
    iconSrc: "/tech/supabase.svg",
    iconMode: "color",
    categories: ["backend"],
  },
  {
    name: "GitHub",
    iconSrc: "/tech/github.svg",
    iconMode: "monochrome",
    categories: ["tools"],
  },
  {
    name: "Git",
    iconSrc: "/tech/git.svg",
    iconMode: "color",
    categories: ["tools"],
  },
  {
    name: "Vercel",
    iconSrc: "/tech/vercel.svg",
    iconMode: "monochrome",
    categories: ["tools"],
  },
  {
    name: "Postman",
    iconSrc: "/tech/postman.svg",
    iconMode: "monochrome",
    categories: ["backend", "tools"],
  },
  {
    name: "Stripe",
    iconSrc: "/tech/stripe.svg",
    iconMode: "color",
    categories: ["backend"],
  },
  {
    name: "Codex",
    iconSrc: "/tech/codex.svg",
    iconMode: "color",
    categories: ["tools", "ai"],
  },
  {
    name: "Pi Coding Agent",
    iconSrc: "/tech/pi-coding-agent.svg",
    iconMode: "monochrome",
    categories: ["tools", "ai"],
  },
  {
    name: "MCP",
    iconSrc: "/tech/mcp.svg",
    iconMode: "monochrome",
    categories: ["tools", "ai"],
  },
  {
    name: "Cursor",
    iconSrc: "/tech/cursor.svg",
    iconMode: "monochrome",
    categories: ["tools", "ai"],
  },
  {
    name: "JetBrains",
    iconSrc: "/tech/jetbrain.svg",
    iconMode: "monochrome",
    categories: ["tools"],
  },
  {
    name: "WebStorm",
    iconSrc: "/tech/webstorm.svg",
    iconMode: "color",
    categories: ["tools"],
  },
] as const satisfies readonly Technology[];
