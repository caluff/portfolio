import {ThemeTogglerButton} from "@/components/animate-ui/components/buttons/theme-toggler";
import {PrimaryNavigation} from "@/components/portfolio/primary-navigation";
import {siteName} from "@/data/navigation";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-dashed bg-background/95 backdrop-blur-sm">
      <div className="mx-auto flex h-12 max-w-3xl items-center justify-between border-x border-dashed px-4">
        <a
          className="hidden font-heading text-2xl tracking-tighter sm:block"
          href="#inicio"
        >
          {siteName}
        </a>

        <div className="flex items-center gap-2">
          <PrimaryNavigation/>
          <ThemeTogglerButton aria-label="Cambiar tema" title="Cambiar tema" size="icon-lg"/>
        </div>
      </div>
    </header>
  );
}
