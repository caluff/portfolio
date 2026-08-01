export const siteName = "Daniel Caluff";

export const primaryNavigationLinks = [
  {key: "home", href: "#inicio"},
  {key: "experience", href: "#experience"},
  {key: "projects", href: "#projects"},
  {key: "contact", href: "#lets-talk"},
] as const;

export const moreNavigationLinks = [
  {key: "techStack", href: "#tech-stack"},
  {key: "githubActivity", href: "#github-activity"},
] as const;

export const sectionNavigationLinks = [
  primaryNavigationLinks[0],
  primaryNavigationLinks[1],
  primaryNavigationLinks[2],
  ...moreNavigationLinks,
  primaryNavigationLinks[3],
] as const;
