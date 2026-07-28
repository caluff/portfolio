import Image from "next/image";
import type {CSSProperties} from "react";

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

function TechnologyList({
                          items,
                        }: {
  items: readonly Technology[];
}) {
  return (
    <div className="flex flex-wrap gap-2 px-5 py-6 sm:px-6">
      {items.map(({iconMode, iconSrc, name}) => (
        <Button
          className="group h-8 gap-2 rounded-none border-0 px-3"
          variant="ghost"
          type="button"
          key={name}
          aria-label={`${name}: mostrar color original`}
        >
          <TechnologyIcon iconMode={iconMode} iconSrc={iconSrc}/>
          {name}
        </Button>
      ))}
    </div>
  );
}

export function TechStackSection() {
  return (
    <section id="tech-stack">
      <Tabs defaultValue="all">
        <SectionHeader
          title="Tech Stack"
          action={
            <TabsList variant="line" aria-label="Filtrar tecnologías">
              {technologyTabs.map(({label, value}) => (
                <TabsTrigger
                  className="px-1 text-[0.65rem] sm:px-1.5 sm:text-sm"
                  value={value}
                  key={value}
                >
                  {label}
                </TabsTrigger>
              ))}
            </TabsList>
          }
        />

        {technologyTabs.map(({value}) => (
          <TabsContent
            className="m-0 h-96 min-h-96 max-h-96 flex-none overflow-hidden bg-background [background-image:radial-gradient(circle,var(--tech-grid-dot)_1px,transparent_1px)] [background-position:8px_8px] [background-size:18px_18px] sm:h-64 sm:min-h-64 sm:max-h-64 md:h-56 md:min-h-56 md:max-h-56"
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
