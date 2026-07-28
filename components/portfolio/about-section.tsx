import { SectionHeader } from "@/components/portfolio/section-header";
import { Highlighter } from "@/components/ui/highlighter";
import { aboutSegments } from "@/data/profile";

export function AboutSection() {
  return (
    <section id="about">
      <SectionHeader title="About" />
      <div className="px-5 py-6 sm:px-6">
        <p className="max-w-3xl text-sm leading-7 font-medium">
          {aboutSegments.map((segment) =>
            "emphasis" in segment ? (
              <Highlighter
                action={segment.emphasis}
                color={`var(--about-${segment.emphasis})`}
                animationDuration={700}
                iterations={1}
                isView
                key={segment.text}
              >
                {segment.text}
              </Highlighter>
            ) : (
              segment.text
            ),
          )}
        </p>
      </div>
    </section>
  );
}
