"use client";

import { MenuIcon } from "lucide-react";
import { useState } from "react";

import { ThemeTogglerButton } from "@/components/animate-ui/components/buttons/theme-toggler";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
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

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger
        render={
          <Button
            aria-label="Abrir menú de navegación"
            size="icon-lg"
            title="Abrir menú"
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
          <SheetDescription>Navigate through the portfolio.</SheetDescription>
        </SheetHeader>

        <nav aria-label="Navegación móvil">
          <ul className="flex flex-col">
            {mobileNavigationLinks.map(({ href, label }) => (
              <li key={href}>
                <a
                  className="flex h-12 items-center border-b border-dashed px-5 font-medium transition-colors hover:bg-muted focus-visible:bg-muted focus-visible:outline-none"
                  href={href}
                  onClick={() => setIsOpen(false)}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <SheetFooter className="border-t border-dashed px-5 py-4">
          <div className="flex items-center justify-between gap-4">
            <span className="font-mono text-xs tracking-[0.14em] text-muted-foreground uppercase">
              Theme
            </span>
            <ThemeTogglerButton
              aria-label="Cambiar tema"
              size="icon-lg"
              title="Cambiar tema"
              variant="outline"
            />
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
