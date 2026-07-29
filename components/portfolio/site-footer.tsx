import {ArrowUp} from "lucide-react";

import {ContactIcon} from "@/components/portfolio/contact-icon";
import {contactLinks} from "@/data/links";
import {footerCredit} from "@/data/profile";

export function SiteFooter() {
  return (
    <footer className="px-4 py-10 sm:px-6 sm:py-12">
      <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex flex-col items-start gap-2">
          <p className="font-mono text-xs tracking-[0.18em] text-muted-foreground uppercase">
            {footerCredit.label}
          </p>
          <a
            className="font-heading text-4xl leading-none tracking-tighter transition-colors hover:text-muted-foreground focus-visible:text-muted-foreground focus-visible:outline-none"
            href="#inicio"
          >
            {footerCredit.author}
          </a>
        </div>

        <a
          className="group flex w-fit items-center gap-2 font-mono text-xs text-muted-foreground transition-colors hover:text-foreground focus-visible:text-foreground focus-visible:outline-none"
          href="#inicio"
        >
          {footerCredit.backToTopLabel}
          <ArrowUp
            className="size-3.5 transition-transform group-hover:-translate-y-1 group-focus-visible:-translate-y-1"
            aria-hidden="true"
          />
        </a>
      </div>

      <div className="mt-10 flex flex-col gap-4 border-t border-dashed pt-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-mono text-xs tracking-[0.18em] text-muted-foreground uppercase">
          {footerCredit.contactLabel}
        </p>

        <nav
          className="flex flex-wrap items-center gap-x-5 gap-y-3"
          aria-label={footerCredit.contactAriaLabel}
        >
          {contactLinks.map(({href, iconMode, iconSrc, label}) => (
            <a
              className="group flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:text-foreground focus-visible:outline-none"
              href={href}
              key={label}
              rel={href.startsWith("http") ? "noreferrer" : undefined}
              target={href.startsWith("http") ? "_blank" : undefined}
            >
              <span className="transition-transform group-hover:-translate-y-0.5 group-focus-visible:-translate-y-0.5">
                <ContactIcon iconMode={iconMode} iconSrc={iconSrc}/>
              </span>
              <span className="underline-offset-4 group-hover:underline group-focus-visible:underline">
                {label}
              </span>
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
