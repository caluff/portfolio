import {Globe} from "lucide-react";
import {getTranslations} from "next-intl/server";
import type {CSSProperties} from "react";

import {ProjectDevelopmentRibbon} from "@/components/portfolio/project-development-ribbon";
import {ProjectMediaCarousel} from "@/components/portfolio/project-media-carousel";
import {SectionHeader} from "@/components/portfolio/section-header";
import {Badge} from "@/components/ui/badge";
import {HoverEffect, type HoverEffectItem} from "@/components/ui/card-hover-effect";
import {type Project, projects} from "@/data/projects";
import {cn} from "@/lib/utils";

type ProjectCardProps = {
  copy: {
    description: string;
    inDevelopment: string;
    live: string;
    sourceLabel: string;
    sourceTitle: string;
    technologies: string;
    visitLabel: string;
    visitTitle: string;
  };
  featured?: boolean;
  project: Project;
};

const githubIconStyle = {
  WebkitMaskImage: 'url("/tech/github.svg")',
  maskImage: 'url("/tech/github.svg")',
} satisfies CSSProperties;

function GitHubIcon() {
  return (
    <span
      className="size-5 bg-current mask-contain mask-center mask-no-repeat"
      style={githubIconStyle}
      aria-hidden="true"
    />
  );
}

function ProjectCard({copy, featured = false, project}: ProjectCardProps) {
  const {
    developing,
    images,
    liveUrl,
    name,
    sourceCodeLink,
    tags,
  } = project;

  return (
    <article
      className={cn(
        "group/project relative flex h-full flex-col overflow-hidden border border-dashed bg-background p-3",
        featured &&
        "sm:grid sm:grid-cols-[minmax(0,1.12fr)_minmax(0,0.88fr)] sm:gap-4",
      )}
    >
      {developing && <ProjectDevelopmentRibbon label={copy.inDevelopment}/>}

      <ProjectMediaCarousel
        featured={featured}
        images={images}
        liveUrl={liveUrl}
        projectName={name}
      />

      <div className={cn("flex grow flex-col pt-3", featured && "sm:pt-1")}>
        <div className="flex items-center gap-3 sm:justify-between">
          <h3 className="text-lg leading-tight font-bold tracking-tight">
            {name}
          </h3>
          {!developing && (
            <span className="flex shrink-0 items-center gap-1.5 text-sm text-muted-foreground">
              <span
                className="size-2 rounded-full bg-project-status-live"
                aria-hidden="true"
              />
              {copy.live}
            </span>
          )}
        </div>

        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {copy.description}
        </p>

        <div className="mt-auto flex items-end justify-between gap-4 pt-5">
          <ul
            className="flex flex-wrap gap-2"
            aria-label={copy.technologies}
          >
            {tags.map((tag) => (
              <li key={tag.name}>
                <Badge variant="outline">
                  {tag.name}
                </Badge>
              </li>
            ))}
          </ul>

          <div className="flex shrink-0 items-center gap-1">
            <a
              className="flex size-8 items-center justify-center text-muted-foreground transition-[color,transform] hover:-translate-y-0.5 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none"
              href={liveUrl}
              target="_blank"
              rel="noreferrer"
              title={copy.visitTitle}
              aria-label={copy.visitLabel}
            >
              <Globe className="size-5" aria-hidden="true"/>
            </a>
            <a
              className="flex size-8 items-center justify-center text-muted-foreground transition-[color,transform] hover:-translate-y-0.5 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none"
              href={sourceCodeLink}
              target="_blank"
              rel="noreferrer"
              title={copy.sourceTitle}
              aria-label={copy.sourceLabel}
            >
              <GitHubIcon/>
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}

export async function ProjectsSection() {
  const t = await getTranslations("Projects");
  const hoverItems = projects.map((project, index) => ({
    id: project.name,
    className: cn("project-reveal", index === 0 && "sm:col-span-2"),
    content: (
      <ProjectCard
        copy={{
          description: t(`items.${project.id}.description`),
          inDevelopment: t("inDevelopment"),
          live: t("live"),
          sourceLabel: t("sourceLabel", {name: project.name}),
          sourceTitle: t("sourceTitle", {name: project.name}),
          technologies: t("technologies", {name: project.name}),
          visitLabel: t("visitLabel", {name: project.name}),
          visitTitle: t("visitTitle", {name: project.name}),
        }}
        featured={index === 0}
        project={project}
      />
    ),
  })) satisfies readonly HoverEffectItem[];

  return (
    <section id="projects">
      <SectionHeader
        title={t("title")}
        action={
          <span className="text-xs text-muted-foreground">
            {t("selectedWorks", {count: projects.length})}
          </span>
        }
      />

      <div className="px-5 py-6 sm:px-6">
        <HoverEffect items={hoverItems}/>
      </div>
    </section>
  );
}
