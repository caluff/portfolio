"use client";

import {
  CalendarHeatmap,
  CalendarHeatmapBlock,
  CalendarHeatmapBody,
  CalendarHeatmapFooter,
  CalendarHeatmapLegend,
  CalendarHeatmapStat,
  type Activity,
} from "@/components/heatmap/calendar-heatmap";
import type { ContributionWeek } from "@/lib/github";

const heatmapColors = {
  empty: "var(--color-secondary)",
  scale: "var(--color-github-heatmap-active)",
} as const;

function toActivities(weeks: readonly ContributionWeek[]): Activity[] {
  return weeks.flatMap((week) =>
    week.contributionDays.map((day) => ({
      date: day.date,
      value: day.contributionCount,
    })),
  );
}

export function GitHubContributionCalendar({
  total,
  weeks,
}: {
  total: number;
  weeks: readonly ContributionWeek[];
}) {
  return (
    <CalendarHeatmap
      blockMargin={3}
      blockRadius={2}
      blockSize={10}
      className="w-full gap-2 p-0"
      colors={heatmapColors}
      data={toActivities(weeks)}
      fontSize={13}
      labels={{
        cellLabel: "{{date}}: {{value}} contributions",
        heatmapLabel: "GitHub contributions for {{year}}",
      }}
      totalCount={total}
    >
      <CalendarHeatmapBody
        className="py-0"
        hideWeekdayLabels
        hideYearLabels
        labelClassName="text-foreground"
      >
        {({ activity, dayIndex, weekIndex }) => (
          <CalendarHeatmapBlock
            activity={activity}
            dayIndex={dayIndex}
            weekIndex={weekIndex}
          />
        )}
      </CalendarHeatmapBody>
      <CalendarHeatmapFooter className="items-center pt-1 text-xs">
        <CalendarHeatmapStat
          label="{{value}} contributions in the last year"
        />
        <CalendarHeatmapLegend labels={{ less: "Less", more: "More" }} />
      </CalendarHeatmapFooter>
    </CalendarHeatmap>
  );
}
