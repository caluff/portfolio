"use client";

import { format, parseISO } from "date-fns";
import { useState } from "react";

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
import { cn } from "@/lib/utils";

const heatmapColors = {
  empty: "var(--color-github-heatmap-empty)",
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

type TooltipState = {
  activity: Activity;
  left: number;
  top: number;
  placement: "above" | "below";
};

function ContributionTooltip({ state }: { state: TooltipState | null }) {
  if (!state) return null;

  const contributionLabel =
    state.activity.value === 0
      ? "No contributions"
      : `${state.activity.value} ${
          state.activity.value === 1 ? "contribution" : "contributions"
        }`;

  return (
    <div
      className={cn(
        "pointer-events-none fixed z-[70] -translate-x-1/2 rounded-md border border-border bg-popover px-3 py-2 text-xs text-popover-foreground shadow-lg",
        state.placement === "above" && "-translate-y-full",
      )}
      role="tooltip"
      style={{ left: state.left, top: state.top }}
    >
      <p className="whitespace-nowrap font-medium">
        {contributionLabel} on{" "}
        {format(parseISO(state.activity.date), "MMM d, yyyy")}
      </p>
      <span
        aria-hidden="true"
        className={cn(
          "absolute left-1/2 size-2 -translate-x-1/2 rotate-45 border-border bg-popover",
          state.placement === "above"
            ? "-bottom-1 border-r border-b"
            : "-top-1 border-l border-t",
        )}
      />
    </div>
  );
}

export function GitHubContributionCalendar({
  total,
  weeks,
}: {
  total: number;
  weeks: readonly ContributionWeek[];
}) {
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);

  return (
    <>
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
              onMouseEnter={(event) => {
                const rect = event.currentTarget.getBoundingClientRect();
                const viewportPadding = 120;

                setTooltip({
                  activity,
                  left: Math.min(
                    Math.max(rect.left + rect.width / 2, viewportPadding),
                    window.innerWidth - viewportPadding,
                  ),
                  top: rect.top < 72 ? rect.bottom + 8 : rect.top - 8,
                  placement: rect.top < 72 ? "below" : "above",
                });
              }}
              onMouseLeave={() => setTooltip(null)}
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
      <ContributionTooltip state={tooltip} />
    </>
  );
}
