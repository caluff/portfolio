import {getTranslations} from "next-intl/server";

import {ThemeTogglerButton} from "@/components/animate-ui/components/buttons/theme-toggler";
import {BrandLogo} from "@/components/portfolio/brand-logo";
import {GridIntersectionNodes} from "@/components/portfolio/grid-intersection-nodes";
import {LocaleSwitcher} from "@/components/portfolio/locale-switcher";
import {MobileNavigation} from "@/components/portfolio/mobile-navigation";
import {PrimaryNavigation} from "@/components/portfolio/primary-navigation";
import {siteName} from "@/data/navigation";

export async function SiteHeader() {
  const t = await getTranslations("Navigation");

  return (
    <header className="sticky top-0 z-50 border-b border-dashed bg-background/95 backdrop-blur-sm">
      <div className="relative mx-auto flex h-12 max-w-3xl items-center justify-between border-x border-dashed px-5 sm:px-6">
        <a
          aria-label={siteName}
          className="flex items-center text-foreground transition-opacity hover:opacity-70 focus-visible:opacity-70 focus-visible:outline-none"
          href="#inicio"
        >
          <BrandLogo/>
        </a>

        <div className="hidden items-center gap-2 sm:flex">
          <PrimaryNavigation/>
          <LocaleSwitcher/>
          <ThemeTogglerButton
            aria-label={t("changeTheme")}
            title={t("changeTheme")}
            size="icon-lg"
          />
        </div>

        <div className="flex items-center gap-1 sm:hidden">
          <LocaleSwitcher/>
          <ThemeTogglerButton
            aria-label={t("changeTheme")}
            title={t("changeTheme")}
            size="icon-lg"
          />
          <MobileNavigation/>
        </div>
        <span className="absolute inset-x-0 bottom-0">
          <GridIntersectionNodes/>
        </span>
      </div>
    </header>
  );
}
