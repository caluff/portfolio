import { ThemeTogglerButton } from "@/components/animate-ui/components/buttons/theme-toggler";
import { navigationLinks, siteName } from "@/data/navigation";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-dashed bg-background/95 backdrop-blur-sm">
      <div className="mx-auto flex h-12 max-w-3xl items-center justify-between border-x border-dashed px-4">
        <a className="font-heading text-2xl tracking-tighter" href="#inicio">
          {siteName}
        </a>

        <nav className="flex items-center gap-4 sm:gap-6" aria-label="Navegación principal">
          {navigationLinks.map(({ href, label }, index) => (
            <a
              className={cn(
                "text-xs transition-colors hover:text-foreground",
                index === 0
                  ? "relative font-semibold after:absolute after:-bottom-2.5 after:left-1/2 after:size-1 after:-translate-x-1/2 after:rounded-full after:bg-foreground"
                  : "text-muted-foreground",
              )}
              href={href}
              key={href}
            >
              {label}
            </a>
          ))}
          <ThemeTogglerButton aria-label="Cambiar tema" title="Cambiar tema" />
        </nav>
      </div>
    </header>
  );
}
