import {githubProfile} from "@/data/github";

type ContactLink = {
  label: string;
  href: string;
  iconSrc: string;
  iconMode: "color" | "monochrome";
};

export const contactLinks = [
  {
    label: "GitHub",
    href: githubProfile.url,
    iconSrc: "/contact/github-circle.svg",
    iconMode: "monochrome",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/danielcaluff",
    iconSrc: "/contact/linkedin.svg",
    iconMode: "monochrome",
  },
  {
    label: "Telegram",
    href: "https://t.me/DanielCaluff",
    iconSrc: "/contact/telegram.svg",
    iconMode: "monochrome",
  },
  {
    label: "X / Twitter",
    href: "https://x.com/danielcaluff",
    iconSrc: "/contact/X.svg",
    iconMode: "monochrome",
  },
  {
    label: "Mail",
    href: "mailto:dcaluff@gmail.com",
    iconSrc: "/contact/gmail.svg",
    iconMode: "monochrome",
  },
] as const satisfies readonly ContactLink[];
