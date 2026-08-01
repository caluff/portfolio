"use client";

import { MenuIcon } from "lucide-react";
import {useTranslations} from "next-intl";
import { useState } from "react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  moreNavigationLinks,
  primaryNavigationLinks,
  siteName,
} from "@/data/navigation";

const mobileNavigationLinks = [
  ...primaryNavigationLinks,
  ...moreNavigationLinks,
] as const;

export function MobileNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations("Navigation");
  const labels = {
    home: t("primary.home"),
    experience: t("primary.experience"),
    projects: t("primary.projects"),
    contact: t("primary.contact"),
    techStack: t("moreItems.techStack.label"),
    githubActivity: t("moreItems.githubActivity.label"),
  } as const;

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger
        render={
          <Button
            aria-label={t("openMenu")}
            size="icon-lg"
            title={t("openMenu")}
            variant="ghost"
          />
        }
      >
        <MenuIcon aria-hidden="true" />
      </SheetTrigger>

      <SheetContent
        className="w-[min(20rem,calc(100vw-2rem))] border-l border-dashed p-0"
        side="right"
      >
        <SheetHeader className="border-b border-dashed px-5 py-4 pr-12">
          <SheetTitle className="text-2xl tracking-tighter">
            {siteName}
          </SheetTitle>
          <SheetDescription>{t("menuDescription")}</SheetDescription>
        </SheetHeader>

        <nav aria-label={t("mobileAriaLabel")}>
          <ul className="flex flex-col">
            {mobileNavigationLinks.map(({href, key}) => (
              <li key={href}>
                <a
                  className="flex h-12 items-center border-b border-dashed px-5 font-medium transition-colors hover:bg-muted focus-visible:bg-muted focus-visible:outline-none"
                  href={href}
                  onClick={() => setIsOpen(false)}
                >
                  {labels[key]}
                </a>
              </li>
            ))}
          </ul>
        </nav>

      </SheetContent>
    </Sheet>
  );
}
