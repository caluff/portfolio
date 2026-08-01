"use client";

import {
  moreNavigationLinks,
  primaryNavigationLinks,
  sectionNavigationLinks,
} from "@/data/navigation";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import {useTranslations} from "next-intl";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

const moreTarget = "more";
type PrimaryHref = (typeof primaryNavigationLinks)[number]["href"];
type SectionHref = (typeof sectionNavigationLinks)[number]["href"];
type MenuTarget = PrimaryHref | typeof moreTarget;

function getMenuTarget(href: SectionHref): MenuTarget {
  return moreNavigationLinks.some((link) => link.href === href)
    ? moreTarget
    : (href as PrimaryHref);
}

export function PrimaryNavigation() {
  const t = useTranslations("Navigation");
  const menuRef = useRef<HTMLElement | null>(null);
  const itemRefs = useRef(new Map<MenuTarget, HTMLElement>());
  const [activeHref, setActiveHref] = useState<SectionHref>("#inicio");
  const [previewTarget, setPreviewTarget] = useState<MenuTarget | null>(null);
  const [indicatorLeft, setIndicatorLeft] = useState(0);
  const [indicatorReady, setIndicatorReady] = useState(false);
  const indicatorTarget = previewTarget ?? getMenuTarget(activeHref);

  const registerItem = useCallback(
    (target: MenuTarget) => (element: HTMLElement | null) => {
      if (element) itemRefs.current.set(target, element);
      else itemRefs.current.delete(target);
    },
    [],
  );

  useLayoutEffect(() => {
    const menu = menuRef.current;
    const item = itemRefs.current.get(indicatorTarget);
    if (!menu || !item) return;

    const updateIndicator = () => {
      const menuRect = menu.getBoundingClientRect();
      const itemRect = item.getBoundingClientRect();
      setIndicatorLeft(itemRect.left - menuRect.left + itemRect.width / 2);
      setIndicatorReady(true);
    };

    updateIndicator();
    const resizeObserver = new ResizeObserver(updateIndicator);
    resizeObserver.observe(menu);
    return () => resizeObserver.disconnect();
  }, [indicatorTarget]);

  useEffect(() => {
    let animationFrame = 0;

    const updateActiveSection = () => {
      const activationLine = Math.min(window.innerHeight * 0.3, 240);
      let nextHref: SectionHref = "#inicio";

      for (const { href } of sectionNavigationLinks) {
        const section = document.getElementById(href.slice(1));
        if (section && section.getBoundingClientRect().top <= activationLine) {
          nextHref = href;
        }
      }

      setActiveHref(nextHref);
    };

    const scheduleUpdate = () => {
      cancelAnimationFrame(animationFrame);
      animationFrame = requestAnimationFrame(updateActiveSection);
    };

    updateActiveSection();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, []);

  return (
    <NavigationMenu
      align="end"
      aria-label={t("primaryAriaLabel")}
      className="relative min-w-0"
      onPointerLeave={() => setPreviewTarget(null)}
      ref={menuRef}
    >
      <NavigationMenuList>
        {primaryNavigationLinks.map(({href, key}) => (
          <NavigationMenuItem
            key={href}
            onFocusCapture={() => setPreviewTarget(href)}
            onPointerEnter={() => setPreviewTarget(href)}
            ref={registerItem(href)}
          >
            <NavigationMenuLink
              aria-current={activeHref === href ? "page" : undefined}
              className={cn(
                navigationMenuTriggerStyle(),
                "px-0 text-xs sm:px-2.5 sm:text-sm",
              )}
              href={href}
              onClick={() => setActiveHref(href)}
            >
              {t(`primary.${key}`)}
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}

        <NavigationMenuItem
          onFocusCapture={() => setPreviewTarget(moreTarget)}
          onPointerEnter={() => setPreviewTarget(moreTarget)}
          ref={registerItem(moreTarget)}
        >
          <NavigationMenuTrigger className="px-0 text-xs sm:px-2.5 sm:text-sm">
            {t("more")}
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="flex w-64 flex-col gap-1">
              {moreNavigationLinks.map(({href, key}) => (
                <NavigationMenuLink
                  aria-current={activeHref === href ? "page" : undefined}
                  data-active={activeHref === href || undefined}
                  href={href}
                  key={href}
                  onClick={() => setActiveHref(href)}
                >
                  <span className="flex flex-col gap-1">
                    <span className="font-medium">
                      {t(`moreItems.${key}.label`)}
                    </span>
                    <span className="text-muted-foreground">
                      {t(`moreItems.${key}.description`)}
                    </span>
                  </span>
                </NavigationMenuLink>
              ))}
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>

      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute -bottom-0.5 left-0 size-1 rounded-full bg-foreground opacity-0 transition-[transform,opacity] duration-300 ease-out motion-reduce:transition-none",
          indicatorReady && "opacity-100",
        )}
        style={{
          transform: `translate3d(calc(${indicatorLeft}px - 50%), 0, 0)`,
        }}
      />
    </NavigationMenu>
  );
}
