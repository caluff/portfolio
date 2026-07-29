import "server-only";

import { githubProfile } from "@/data/github";

export type ContributionDay = {
  readonly contributionCount: number;
  readonly date: string;
};

export type ContributionWeek = {
  readonly contributionDays: readonly ContributionDay[];
};

type GitHubActivity = {
  readonly contributions: {
    readonly total: number;
    readonly weeks: readonly ContributionWeek[];
  };
};

export type GitHubActivityResult =
  | { readonly data: GitHubActivity; readonly ok: true }
  | {
      readonly ok: false;
      readonly reason: "missing-token" | "request-failed" | "user-not-found";
      readonly username: string;
    };

type GitHubGraphQLResponse = {
  data?: {
    user: {
      contributionsCollection: {
        contributionCalendar: {
          totalContributions: number;
          weeks: ContributionWeek[];
        };
      };
    } | null;
  };
  errors?: Array<{ message: string }>;
};

const GITHUB_ACTIVITY_QUERY = `
  query GitHubActivity($login: String!, $from: DateTime!, $to: DateTime!) {
    user(login: $login) {
      contributionsCollection(from: $from, to: $to) {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              contributionCount
              date
            }
          }
        }
      }
    }
  }
`;

function getContributionRange() {
  const now = new Date();
  const to = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 23, 59, 59),
  );
  const from = new Date(to);
  from.setUTCDate(from.getUTCDate() - 364);
  from.setUTCHours(0, 0, 0, 0);

  return { from: from.toISOString(), to: to.toISOString() };
}

export async function getGitHubActivity(): Promise<GitHubActivityResult> {
  const token = process.env.GITHUB_TOKEN;
  const username = process.env.GITHUB_USERNAME ?? githubProfile.username;

  if (!token) return { ok: false, reason: "missing-token", username };

  const { from, to } = getContributionRange();

  try {
    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "User-Agent": "portfolio-caluff",
      },
      body: JSON.stringify({
        query: GITHUB_ACTIVITY_QUERY,
        variables: { from, login: username, to },
      }),
      next: { revalidate: 3600, tags: ["github-activity"] },
    });

    if (!response.ok) return { ok: false, reason: "request-failed", username };

    const payload = (await response.json()) as GitHubGraphQLResponse;
    if (payload.errors?.length) {
      return { ok: false, reason: "request-failed", username };
    }

    const calendar = payload.data?.user?.contributionsCollection.contributionCalendar;
    if (!calendar) return { ok: false, reason: "user-not-found", username };

    return {
      ok: true,
      data: {
        contributions: {
          total: calendar.totalContributions,
          weeks: calendar.weeks,
        },
      },
    };
  } catch {
    return { ok: false, reason: "request-failed", username };
  }
}
