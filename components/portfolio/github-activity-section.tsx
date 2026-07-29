import { ArrowUpRight } from "lucide-react";

import { GitHubContributionCalendar } from "@/components/portfolio/github-contribution-calendar";
import { SectionHeader } from "@/components/portfolio/section-header";
import { githubProfile } from "@/data/github";
import { getGitHubActivity } from "@/lib/github";

export async function GitHubActivitySection() {
  const result = await getGitHubActivity();

  return (
    <section id="github-activity">
      <SectionHeader
        title="GitHub Activity"
        action={
          <a
            className="flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
            href={githubProfile.url}
            rel="noreferrer"
            target="_blank"
          >
            Visit profile <ArrowUpRight className="size-3" aria-hidden="true" />
          </a>
        }
      />
      <div className="px-5 py-6 sm:px-6">
        {result.ok ? (
          <GitHubContributionCalendar
            total={result.data.contributions.total}
            weeks={result.data.contributions.weeks}
          />
        ) : (
          <p className="text-sm text-muted-foreground">
            GitHub activity is temporarily unavailable.
          </p>
        )}
      </div>
    </section>
  );
}
