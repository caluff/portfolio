type ContactLink = {
  label: string;
  href: string;
  iconSrc: string;
  iconMode: "color" | "monochrome";
};

export const contactLinks = [
  {
    label: "GitHub",
    href: "#",
    iconSrc: "/contact/github-circle.svg",
    iconMode: "monochrome",
  },
  {
    label: "LinkedIn",
    href: "#",
    iconSrc: "/contact/linkedin.svg",
    iconMode: "color",
  },
  {
    label: "X / Twitter",
    href: "#",
    iconSrc: "/contact/X.svg",
    iconMode: "monochrome",
  },
  {
    label: "Mail",
    href: "mailto:hola@caluff.studio",
    iconSrc: "/contact/gmail.svg",
    iconMode: "color",
  },
] as const satisfies readonly ContactLink[];
