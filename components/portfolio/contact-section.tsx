import {ArrowUpRight} from "lucide-react";
import {getTranslations} from "next-intl/server";

import {ContactIcon} from "@/components/portfolio/contact-icon";
import {SectionHeader} from "@/components/portfolio/section-header";
import {Button} from "@/components/ui/button";
import {contactLinks} from "@/data/links";

export async function ContactSection() {
  const contactT = await getTranslations("Contact");
  const linksT = await getTranslations("ContactLinks");

  return (
    <section id="contact">
      <SectionHeader title={contactT("title")}/>

      <div className="grid grid-cols-1 border-0 bg-background sm:grid-cols-5 sm:divide-x sm:divide-dashed">
        {contactLinks.map(({href, iconMode, iconSrc, key}) => (
          <Button
            className="h-auto min-h-12 w-full min-w-0 justify-start gap-1.5 border-0 px-5 py-2 transition-[transform,box-shadow] hover:underline hover:shadow-md focus-visible:-translate-y-0.5 sm:px-1.5"
            variant="outline"
            nativeButton={false}
            render={<a href={href}/>}
            key={key}
          >
            <span
              className="flex size-8 shrink-0 items-center justify-center border bg-background shadow-sm transition-transform group-hover/button:scale-105 group-focus-visible/button:scale-105">
              <ContactIcon iconMode={iconMode} iconSrc={iconSrc}/>
            </span>
            <strong className="truncate">{linksT(key)}</strong>
            <ArrowUpRight
              className="ml-auto size-3.5 shrink-0 text-muted-foreground transition-transform group-hover/button:-translate-y-0.5 group-hover/button:translate-x-0.5 group-focus-visible/button:-translate-y-0.5 group-focus-visible/button:translate-x-0.5"
              aria-hidden="true"
            />
          </Button>
        ))}
      </div>
    </section>
  );
}
