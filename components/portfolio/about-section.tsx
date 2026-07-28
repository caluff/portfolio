import { aboutItems } from "@/data/profile";
import { SectionHeader } from "@/components/portfolio/section-header";

export function AboutSection() {
  return (
    <section id="about">
      <SectionHeader title="About" />
      <div className="px-5 py-6 sm:px-6">
        <ul className="flex max-w-2xl list-disc flex-col gap-3 pl-4 marker:text-muted-foreground">
          {aboutItems.map((item) => (
            <li className="text-sm leading-relaxed font-medium" key={item}>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
