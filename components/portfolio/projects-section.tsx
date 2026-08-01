import {Globe} from "lucide-react";
import type {CSSProperties} from "react";

import {ProjectDevelopmentRibbon} from "@/components/portfolio/project-development-ribbon";
import {ProjectMediaCarousel} from "@/components/portfolio/project-media-carousel";
import {SectionHeader} from "@/components/portfolio/section-header";
import {Badge} from "@/components/ui/badge";
import {HoverEffect, type HoverEffectItem} from "@/components/ui/card-hover-effect";
import {type Project, projects} from "@/data/projects";
import {cn} from "@/lib/utils";

type ProjectCardProps = {
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

function ProjectCard({featured = false, project}: ProjectCardProps) {
  const {
    description,
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
      {developing && <ProjectDevelopmentRibbon/>}

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
              Live
            </span>
          )}
        </div>

        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>

        <div className="mt-auto flex items-end justify-between gap-4 pt-5">
          <ul
            className="flex flex-wrap gap-2"
            aria-label={`${name} technologies`}
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
              title={`Visit ${name}`}
              aria-label={`Visit ${name} live site`}
            >
              <Globe className="size-5" aria-hidden="true"/>
            </a>
            <a
              className="flex size-8 items-center justify-center text-muted-foreground transition-[color,transform] hover:-translate-y-0.5 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none"
              href={sourceCodeLink}
              target="_blank"
              rel="noreferrer"
              title={`View ${name} source code`}
              aria-label={`View ${name} source code on GitHub`}
            >
              <GitHubIcon/>
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}

export function ProjectsSection() {
  const hoverItems = projects.map((project, index) => ({
    id: project.name,
    className: cn("project-reveal", index === 0 && "sm:col-span-2"),
    content: <ProjectCard featured={index === 0} project={project}/>,
  })) satisfies readonly HoverEffectItem[];

  return (
    <section id="projects">
      <SectionHeader
        title="Projects"
        action={
          <span className="text-xs text-muted-foreground">
            {projects.length} selected works
          </span>
        }
      />

      <div className="px-5 py-6 sm:px-6">
        <HoverEffect items={hoverItems}/>
      </div>
    </section>
  );
}
