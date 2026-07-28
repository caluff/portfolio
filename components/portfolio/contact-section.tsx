import { Fragment } from "react";
import { ArrowUpRight } from "lucide-react";

import { ContactIcon } from "@/components/portfolio/contact-icon";
import { SectionHeader } from "@/components/portfolio/section-header";
import { contactLinks } from "@/data/links";

export function ContactSection() {
  return (
    <section id="contact">
      <SectionHeader title="Contact" />

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.75rem_1fr_0.75rem_1fr_0.75rem_1fr]">
        {contactLinks.map(({ href, iconMode, iconSrc, label }, index) => (
          <Fragment key={label}>
            {index > 0 && (
              <div
                className="h-3 border-y border-dashed bg-subtle-band lg:relative lg:z-10 lg:-my-px lg:h-auto lg:w-3 lg:border-x lg:border-y-0"
                aria-hidden="true"
              />
            )}
            <a
              className="group flex min-h-16 items-center gap-3 px-3 transition-colors hover:bg-accent hover:text-accent-foreground"
              href={href}
            >
              <span className="flex size-10 shrink-0 items-center justify-center rounded-lg border bg-background">
                <ContactIcon iconMode={iconMode} iconSrc={iconSrc} />
              </span>
              <strong className="text-xs">{label}</strong>
              <ArrowUpRight
                className="ml-auto size-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </a>
          </Fragment>
        ))}
      </div>
    </section>
  );
}
