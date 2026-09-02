"use client";

import Image from "next/image";
import {useTranslations} from "next-intl";
import {useLayoutEffect, useRef, useState, type CSSProperties} from "react";

import {SectionHeader} from "@/components/portfolio/section-header";
import {Button} from "@/components/ui/button";
import {Tabs, TabsContent, TabsList, TabsTrigger,} from "@/components/ui/tabs";
import {
  technologies,
  type Technology,
  type TechnologyCategory,
  type TechnologyTab,
  technologyTabs,
} from "@/data/tech-stack";
import {playGlassSound} from "@/lib/play-glass-sound";

type TechnologyIconProps = {
  iconSrc: string;
  iconMode: Technology["iconMode"];
};

function TechnologyIcon({iconMode, iconSrc}: TechnologyIconProps) {
  if (iconMode === "monochrome") {
    const maskStyle = {
      WebkitMaskImage: `url("${iconSrc}")`,
      maskImage: `url("${iconSrc}")`,
    } satisfies CSSProperties;

    return (
      <span
        className="size-4 shrink-0 bg-muted-foreground transition-colors duration-200 mask-contain mask-center mask-no-repeat group-hover/button:bg-foreground group-focus-visible/button:bg-foreground"
        style={maskStyle}
        data-icon="inline-start"
        aria-hidden="true"
      />
    );
  }

  return (
    <Image
      className="size-4 shrink-0 grayscale opacity-60 transition-[filter,opacity] duration-200 group-hover/button:grayscale-0 group-hover/button:opacity-100 group-focus-visible/button:grayscale-0 group-focus-visible/button:opacity-100"
      src={iconSrc}
      alt=""
      width={16}
      height={16}
      data-icon="inline-start"
    />
  );
}

function getTechnologiesByTab(tab: TechnologyTab) {
  if (tab === "all") {
    return technologies;
  }

  return technologies.filter(({categories}) =>
    (categories as readonly TechnologyCategory[]).includes(tab),
  );
}

function TechnologyList({items}: {
  items: readonly Technology[];
}) {
  const t = useTranslations("TechStack");

  return (
    <div className="flex flex-wrap gap-2 px-5 py-6 sm:px-6">
      {items.map(({href, iconMode, iconSrc, name}) => (
        <Button
          className="group h-8 gap-2 border-0 px-3"
          variant="ghost"
          nativeButton={false}
          render={
            <a
              href={href}
              rel="noreferrer"
              target="_blank"
            />
          }
          key={name}
          aria-label={
            t.has("visitWebsite")
              ? t("visitWebsite", {name})
              : name
          }
          onMouseEnter={playGlassSound}
        >
          <TechnologyIcon iconMode={iconMode} iconSrc={iconSrc}/>
          {name}
        </Button>
      ))}
    </div>
  );
}

export function TechStackSection() {
  const t = useTranslations("TechStack");
  const allPanelRef = useRef<HTMLDivElement>(null);
  const [allPanelHeight, setAllPanelHeight] = useState(0);

  useLayoutEffect(() => {
    const allPanel = allPanelRef.current;
    if (!allPanel) {
      return;
    }

    const updateHeight = () => {
      const height = Math.ceil(allPanel.getBoundingClientRect().height);

      setAllPanelHeight((currentHeight) => currentHeight === height ? currentHeight : height);
    };
    const ResizeObserver = allPanel.ownerDocument.defaultView?.ResizeObserver;

    updateHeight();

    if (!ResizeObserver) {
      return;
    }

    const observer = new ResizeObserver(updateHeight);
    observer.observe(allPanel);

    return () => observer.disconnect();
  }, []);

  return (
    <section id="tech-stack">
      <Tabs className="gap-0" defaultValue="all">
        <SectionHeader
          title={t("title")}
          action={
            <TabsList variant="line" aria-label={t("filterAriaLabel")}>
              {technologyTabs.map(({value}) => (
                <TabsTrigger
                  className="px-1 text-[0.65rem] sm:px-1.5 sm:text-sm"
                  value={value}
                  key={value}
                >
                  {t(`tabs.${value}`)}
                </TabsTrigger>
              ))}
            </TabsList>
          }
        />

        {technologyTabs.map(({value}) => (
          <TabsContent
            className="m-0 bg-background [background-image:radial-gradient(circle,var(--tech-grid-dot)_1px,transparent_1px)] [background-position:8px_8px] [background-size:18px_18px]"
            ref={value === "all" ? allPanelRef : undefined}
            style={value === "all" || !allPanelHeight ? undefined : {minHeight: allPanelHeight}}
            value={value}
            key={value}
          >
            <TechnologyList items={getTechnologiesByTab(value)}/>
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
}
