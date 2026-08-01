import {getTranslations} from "next-intl/server";

import { SectionHeader } from "@/components/portfolio/section-header";
import { Highlighter } from "@/components/ui/highlighter";

export async function AboutSection() {
  const t = await getTranslations("About");

  return (
    <section id="about">
      <SectionHeader title={t("title")}/>
      <div className="px-5 py-6 sm:px-6">
        <p className="max-w-3xl text-sm leading-7 font-medium">
          {t.rich("body", {
            highlight: (chunks) => (
              <Highlighter
                action="highlight"
                color="var(--about-highlight)"
                animationDuration={700}
                iterations={1}
                isView
              >
                {chunks}
              </Highlighter>
            ),
            underline: (chunks) => (
              <Highlighter
                action="underline"
                color="var(--about-underline)"
                animationDuration={700}
                iterations={1}
                isView
              >
                {chunks}
              </Highlighter>
            ),
          })}
        </p>
      </div>
    </section>
  );
}
