import { aboutItems } from "@/data/profile";

export function AboutSection() {
  return (
    <section className="px-5 py-7 sm:px-6" id="about">
      <h2 className="mb-6 font-heading text-3xl tracking-tighter">About</h2>
      <ul className="flex max-w-2xl list-disc flex-col gap-3 pl-4 marker:text-muted-foreground">
        {aboutItems.map((item) => (
          <li className="text-sm leading-relaxed font-medium" key={item}>
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}
