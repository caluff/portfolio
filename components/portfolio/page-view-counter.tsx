"use client";

import {Eye} from "lucide-react";
import {useFormatter, useTranslations} from "next-intl";
import {useEffect, useRef, useState} from "react";

const VISIT_RECORDED_KEY = "portfolio-visit-recorded";
type PageViewResponse = {
  count: number;
};

function recordVisitInSession() {
  try {
    const visitWasRecorded =
      window.sessionStorage.getItem(VISIT_RECORDED_KEY) === "true";

    if (!visitWasRecorded) {
      window.sessionStorage.setItem(VISIT_RECORDED_KEY, "true");
    }

    return visitWasRecorded;
  } catch {
    return false;
  }
}

export function PageViewCounter() {
  const format = useFormatter();
  const t = useTranslations("Profile.pageViews");
  const [count, setCount] = useState<number | null>(null);
  const requestedRef = useRef(false);

  useEffect(() => {
    if (requestedRef.current) {
      return;
    }

    requestedRef.current = true;

    const visitWasRecorded = recordVisitInSession();

    const loadCount = async () => {
      try {
        const response = await fetch("/api/views", {
          method: visitWasRecorded ? "GET" : "POST",
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error(`Page view request failed with ${response.status}`);
        }

        const data = (await response.json()) as PageViewResponse;

        if (!Number.isFinite(data.count)) {
          throw new Error("Page view response contains an invalid count");
        }

        setCount(data.count);
      } catch {
        if (!visitWasRecorded) {
          try {
            window.sessionStorage.removeItem(VISIT_RECORDED_KEY);
          } catch {
            // Storage may be unavailable in privacy-restricted browsers.
          }
        }
      }
    };

    void loadCount();
  }, []);

  if (count === null) {
    return null;
  }

  const formattedCount = format.number(count, {
    minimumIntegerDigits: 4,
    useGrouping: false,
  });

  return (
    <p
      aria-label={t("count", {count})}
      aria-live="polite"
      className="absolute right-5 bottom-5 flex items-center gap-1 font-mono text-xs tabular-nums text-muted-foreground sm:static sm:self-start sm:pt-2"
    >
      <Eye className="size-3" aria-hidden="true"/>
      <span aria-hidden="true">{formattedCount}</span>
    </p>
  );
}
