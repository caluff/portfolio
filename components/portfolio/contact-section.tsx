import {Fragment} from "react";
import {ArrowUpRight} from "lucide-react";

import {ContactIcon} from "@/components/portfolio/contact-icon";
import {SectionHeader} from "@/components/portfolio/section-header";
import {Button} from "@/components/ui/button";
import {contactLinks} from "@/data/links";

export function ContactSection() {
  return (
    <section id="contact">
      <SectionHeader title="Contact"/>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.75rem_1fr_0.75rem_1fr_0.75rem_1fr]">
        {contactLinks.map(({href, iconMode, iconSrc, label}, index) => (
          <Fragment key={label}>
            {index > 0 && (
              <div
                className="h-3 border-y border-dashed bg-subtle-band lg:relative lg:z-10 lg:-my-px lg:h-auto lg:w-3 lg:border-x lg:border-y-0"
                aria-hidden="true"
              />
            )}
            <Button
              className="h-auto hover:underline min-h-12 w-full justify-start gap-3 rounded-none border-0 py-2 transition-[transform,box-shadow] hover:shadow-md focus-visible:-translate-y-0.5"
              variant="outline"
              nativeButton={false}
              render={<a href={href}/>}
            >
              <span
                className="flex size-11 shrink-0 items-center justify-center rounded-lg border bg-background shadow-sm transition-transform group-hover/button:scale-105 group-focus-visible/button:scale-105">
                <ContactIcon iconMode={iconMode} iconSrc={iconSrc}/>
              </span>
              <strong>{label}</strong>
              <ArrowUpRight
                className="ml-auto text-muted-foreground transition-transform group-hover/button:-translate-y-0.5 group-hover/button:translate-x-0.5 group-focus-visible/button:-translate-y-0.5 group-focus-visible/button:translate-x-0.5"
                aria-hidden="true"
              />
            </Button>
          </Fragment>
        ))}
      </div>
    </section>
  );
}
