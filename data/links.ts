import { AtSign, BriefcaseBusiness, Code2, Mail, type LucideIcon } from "lucide-react";

type ContactLink = {
  label: string;
  href: string;
  icon: LucideIcon;
};

export const contactLinks = [
  {
    label: "GitHub",
    href: "#",
    icon: Code2,
  },
  {
    label: "LinkedIn",
    href: "#",
    icon: BriefcaseBusiness,
  },
  {
    label: "X / Twitter",
    href: "#",
    icon: AtSign,
  },
  {
    label: "Mail",
    href: "mailto:hola@caluff.studio",
    icon: Mail,
  },
] satisfies readonly ContactLink[];
