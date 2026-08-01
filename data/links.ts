import {githubProfile} from "@/data/github";

type ContactLink = {
  key: "github" | "linkedin" | "telegram" | "twitter" | "email";
  href: string;
  iconSrc: string;
  iconMode: "color" | "monochrome";
};

export const contactLinks = [
  {
    key: "github",
    href: githubProfile.url,
    iconSrc: "/contact/github-circle.svg",
    iconMode: "monochrome",
  },
  {
    key: "linkedin",
    href: "https://www.linkedin.com/in/danielcaluff",
    iconSrc: "/contact/linkedin.svg",
    iconMode: "monochrome",
  },
  {
    key: "telegram",
    href: "https://t.me/DanielCaluff",
    iconSrc: "/contact/telegram.svg",
    iconMode: "monochrome",
  },
  {
    key: "twitter",
    href: "https://x.com/danielcaluff",
    iconSrc: "/contact/X.svg",
    iconMode: "monochrome",
  },
  {
    key: "email",
    href: "mailto:dcaluff@gmail.com",
    iconSrc: "/contact/gmail.svg",
    iconMode: "monochrome",
  },
] as const satisfies readonly ContactLink[];
