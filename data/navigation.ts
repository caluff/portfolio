export const siteName = "Daniel Caluff";

export const primaryNavigationLinks = [
  { label: "Home", href: "#inicio" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#lets-talk" },
] as const;

export const moreNavigationLinks = [
  {
    label: "Tech Stack",
    href: "#tech-stack",
    description: "Tools and technologies I use.",
  },
  {
    label: "GitHub Activity",
    href: "#github-activity",
    description: "Recent work and contributions.",
  },
] as const;

export const sectionNavigationLinks = [
  primaryNavigationLinks[0],
  primaryNavigationLinks[1],
  primaryNavigationLinks[2],
  ...moreNavigationLinks,
  primaryNavigationLinks[3],
] as const;
