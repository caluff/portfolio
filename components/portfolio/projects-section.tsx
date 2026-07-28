import { ArrowUpRight } from "lucide-react";

import { SectionHeader } from "@/components/portfolio/section-header";
import { cn } from "@/lib/utils";
import { projects, type ProjectTone } from "@/data/projects";

const projectToneClasses: Record<ProjectTone, string> = {
  blue: "from-project-blue-soft via-project-blue to-project-blue-deep text-project-blue-foreground",
  lime: "from-project-lime-soft via-project-lime to-project-lime-deep text-project-lime-foreground",
  rose: "from-project-rose-soft via-project-rose to-project-rose-deep text-project-rose-foreground",
  sand: "from-project-sand-soft via-project-sand to-project-sand-deep text-project-sand-foreground",
};

export function ProjectsSection() {
  return (
    <section id="projects">
      <SectionHeader
        title="Projects"
        action={
        <a className="text-xs text-muted-foreground transition-colors hover:text-foreground" href="#projects">
          View all <span aria-hidden="true">↗</span>
        </a>
        }
      />

      <div className="px-5 py-6 sm:px-6">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10">
          {projects.map(({ description, href, icon: Icon, kind, title, tone, year }) => (
            <article className="min-w-0" key={title}>
              <div
                className={cn(
                  "relative flex h-40 flex-col justify-between overflow-hidden rounded-xl bg-linear-to-br p-5",
                  projectToneClasses[tone],
                )}
              >
                <Icon className="size-7" aria-hidden="true" />
                <strong className="relative text-xl">{title}</strong>
                <span className="absolute -right-1 -bottom-4 text-6xl font-black opacity-20" aria-hidden="true">
                  {year}
                </span>
              </div>

              <div className="relative flex flex-col gap-1 pt-3 pr-10">
                <h3 className="text-sm font-semibold">{title}</h3>
                <p className="text-xs leading-relaxed text-muted-foreground">{description}</p>
                <small className="text-[0.65rem] text-muted-foreground">{kind}</small>
                <a
                  className="absolute top-3 right-0 flex size-7 items-center justify-center rounded-full border transition-colors hover:bg-accent hover:text-accent-foreground"
                  href={href}
                  aria-label={`Ver ${title}`}
                >
                  <ArrowUpRight className="size-4" aria-hidden="true" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
