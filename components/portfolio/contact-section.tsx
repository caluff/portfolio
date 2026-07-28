import { ArrowUpRight } from "lucide-react";

import { SectionHeader } from "@/components/portfolio/section-header";
import { contactLinks } from "@/data/links";

export function ContactSection() {
  return (
    <section id="contact">
      <SectionHeader title="Contact" />
      <div className="px-5 py-6 sm:px-6">
        <div className="grid grid-cols-1 border-t border-dashed sm:grid-cols-2 lg:grid-cols-4">
          {contactLinks.map(({ href, icon: Icon, label }) => (
            <a
              className="group flex min-h-16 items-center gap-3 border-x border-b border-dashed px-3 transition-colors hover:bg-accent hover:text-accent-foreground sm:border-r-0 sm:last:border-r"
              href={href}
              key={label}
            >
              <span className="flex size-10 shrink-0 items-center justify-center rounded-lg border bg-background">
                <Icon className="size-4" aria-hidden="true" />
              </span>
              <strong className="text-xs">{label}</strong>
              <ArrowUpRight className="ml-auto size-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
