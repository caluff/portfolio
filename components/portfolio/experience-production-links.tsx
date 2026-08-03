import {ExternalLink} from "lucide-react";

import type {ProductionApp} from "@/data/experience";

type ExperienceProductionLinksProps = {
  label: string;
  apps: readonly ProductionApp[];
};

export function ExperienceProductionLinks({
  label,
  apps,
}: ExperienceProductionLinksProps) {
  return (
    <div className="mt-5 border-t border-dashed border-border pt-4">
      <p className="mb-2 text-xs font-medium tracking-wide text-muted-foreground">
        {label}
      </p>
      <ul className="flex flex-col gap-2">
        {apps.map((app) => (
          <li key={app.url}>
            <a
              className="group/production-link flex items-start gap-2 text-sm text-foreground underline decoration-border underline-offset-4 transition-colors hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              href={app.url}
              target="_blank"
              rel="noreferrer"
              aria-label={`${label}: ${app.name}`}
            >
              <span>{app.name}</span>
              <ExternalLink
                className="mt-0.5 size-3.5 shrink-0 text-muted-foreground transition-transform group-hover/production-link:translate-x-0.5"
                aria-hidden="true"
              />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
