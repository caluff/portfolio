import {ThemeTogglerButton} from "@/components/animate-ui/components/buttons/theme-toggler";
import {MobileNavigation} from "@/components/portfolio/mobile-navigation";
import {PrimaryNavigation} from "@/components/portfolio/primary-navigation";
import {siteName} from "@/data/navigation";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-dashed bg-background/95 backdrop-blur-sm">
      <div className="mx-auto flex h-12 max-w-3xl items-center justify-between border-x border-dashed px-5 sm:px-6">
        <a
          className="font-heading text-2xl tracking-tighter"
          href="#inicio"
        >
          {siteName}
        </a>

        <div className="hidden items-center gap-2 sm:flex">
          <PrimaryNavigation/>
          <ThemeTogglerButton aria-label="Cambiar tema" title="Cambiar tema" size="icon-lg"/>
        </div>

        <div className="sm:hidden">
          <MobileNavigation/>
        </div>
      </div>
    </header>
  );
}
