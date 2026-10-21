import {githubProfile} from "@/data/github";

type ContactLink = {
  key: "github" | "linkedin" | "telegram" | "whatsapp" | "email";
  href: string;
  iconSrc: string;
  iconMode: "color" | "monochrome";
};

const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, "");

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
  ...(whatsappNumber
    ? [{
        key: "whatsapp",
        href: `https://wa.me/${whatsappNumber}`,
        iconSrc: "/contact/whatsapp.svg",
        iconMode: "monochrome",
      }] as const
    : []),
  {
    key: "email",
    href: "mailto:dcaluff@gmail.com",
    iconSrc: "/contact/gmail.svg",
    iconMode: "monochrome",
  },
] as const satisfies readonly ContactLink[];
