import {CodeXml, type LucideIcon, Workflow} from "lucide-react";
import {getFormatter, getTranslations} from "next-intl/server";

import {SectionHeader} from "@/components/portfolio/section-header";
import {Badge} from "@/components/ui/badge";
import {Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,} from "@/components/ui/card";
import {type Experience, type ExperienceIcon, experiences} from "@/data/experience";
import {cn} from "@/lib/utils";

const experienceIcons: Record<ExperienceIcon, LucideIcon> = {
  frontend: CodeXml,
  systems: Workflow,
};

type ExperienceCardProps = {
  employmentTypeLabel: string;
  experience: Experience;
  highlights: readonly string[];
  period: string;
  role: string;
};

function ExperienceCard({
  employmentTypeLabel,
  experience,
  highlights,
  period,
  role,
}: ExperienceCardProps) {
  const {company, employmentType, from} = experience;

  return (
    <Card className="[--card-spacing:--spacing(6)] transition-shadow duration-300 hover:shadow-lg">
      <CardHeader>
        <CardTitle>{role}</CardTitle>
        <CardDescription>{company}</CardDescription>
        <CardAction>
          <Badge variant={employmentType === "fullTime" ? "secondary" : "outline"}>
            {employmentTypeLabel}
          </Badge>
        </CardAction>
      </CardHeader>

      <CardContent className="sm:pb-6">
        <ul
          className="flex list-disc flex-col gap-2.5 pl-4 text-sm leading-relaxed text-muted-foreground marker:text-foreground/50">
          {highlights.map((highlight) => (
            <li key={highlight}>{highlight}</li>
          ))}
        </ul>
      </CardContent>

      <CardFooter className="sm:hidden">
        <time className="text-xs font-medium text-muted-foreground" dateTime={from.slice(0, 7)}>
          {period}
        </time>
      </CardFooter>
    </Card>
  );
}

export async function ExperienceSection() {
  const t = await getTranslations("Experience");
  const format = await getFormatter();
  const formatPeriod = ({from, to}: Experience) =>
    t("period", {
      start: format.dateTime(new Date(`${from}T00:00:00Z`), {
        month: "short",
        year: "numeric",
        timeZone: "UTC",
      }),
      end: to
        ? format.dateTime(new Date(`${to}T00:00:00Z`), {
            month: "short",
            year: "numeric",
            timeZone: "UTC",
          })
        : t("present"),
    });

  return (
    <section id="experience">
      <SectionHeader
        title={t("title")}
        action={
          <span className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>{t("years")}</span>
            <span aria-hidden="true">•</span>
            <span>{t("roles", {count: experiences.length})}</span>
          </span>
        }
      />

      <div className="px-5 py-6 sm:px-6">
        <ol className="relative flex flex-col gap-10 sm:gap-6">
          <span
            className="absolute top-4 bottom-4 left-4 border-l border-dashed border-border sm:hidden"
            aria-hidden="true"
          />

          {experiences.map((experience, index) => {
            const Icon = experienceIcons[experience.icon];
            const markerOnLeft = index % 2 === 0;
            const isLast = index === experiences.length - 1;
            const period = formatPeriod(experience);
            const role = t(`items.${experience.id}.role`);
            const highlights = experience.id === "activeTech"
              ? experience.highlightKeys.map((key) =>
                  t(`items.activeTech.highlights.${key}`),
                )
              : experience.highlightKeys.map((key) =>
                  t(`items.desoft.highlights.${key}`),
                );

            return (
              <li
                className="relative pl-12 sm:pl-0 sm:pt-15"
                key={experience.id}
              >
                <span
                  className="absolute top-4.5 right-0 left-0 hidden border-t border-dashed border-border sm:block"
                  aria-hidden="true"
                />

                <span
                  className={cn(
                    "absolute top-4.5 hidden border-dashed border-border sm:block",
                    markerOnLeft ? "right-0 border-r" : "left-0 border-l",
                    isLast ? "bottom-0" : "-bottom-10.5",
                  )}
                  aria-hidden="true"
                />

                <div
                  className="absolute top-0 left-0 flex items-center gap-2 bg-background pr-2 sm:left-1/2 sm:-translate-x-1/2 sm:px-2"
                >
                  <span className="flex size-9 items-center justify-center rounded-full border bg-background shadow-sm">
                    <Icon className="size-4" aria-hidden="true"/>
                    <span className="sr-only">{experience.company}</span>
                  </span>
                  <time
                    className="hidden text-xs font-medium text-muted-foreground sm:block"
                    dateTime={experience.from.slice(0, 7)}
                  >
                    {period}
                  </time>
                </div>

                <div className="min-w-0 sm:mx-6">
                  <ExperienceCard
                    employmentTypeLabel={t(`employmentTypes.${experience.employmentType}`)}
                    experience={experience}
                    highlights={highlights}
                    period={period}
                    role={role}
                  />
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
