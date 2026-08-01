"use client";

import {Eye} from "lucide-react";
import {useEffect, useRef, useState} from "react";

const VISIT_RECORDED_KEY = "portfolio-visit-recorded";
const numberFormatter = new Intl.NumberFormat("en-US", {
  minimumIntegerDigits: 4,
  useGrouping: false,
});

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
  const [count, setCount] = useState<number>();
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

  const formattedCount = numberFormatter.format(count ?? 0);

  return (
    <p
      aria-label={count === undefined ? "Loading page visits" : `${count} page visits`}
      aria-live="polite"
      className="hidden self-start gap-1 pt-2 font-mono text-xs tabular-nums text-muted-foreground sm:flex text-center justify-center items-center"
    >
      <Eye className="size-3" aria-hidden="true"/>
      <span aria-hidden="true">{formattedCount}</span>
    </p>
  );
}
