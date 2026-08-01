import {ArrowUp} from "lucide-react";
import {getTranslations} from "next-intl/server";

import {ContactIcon} from "@/components/portfolio/contact-icon";
import {FooterThinkingOrb} from "@/components/portfolio/footer-thinking-orb";
import {contactLinks} from "@/data/links";
import {footerCredit} from "@/data/profile";

export async function SiteFooter() {
  const commonT = await getTranslations("Common");
  const footerT = await getTranslations("Footer");
  const linksT = await getTranslations("ContactLinks");

  return (
    <footer className="px-5 py-10 sm:px-6 sm:py-14">
      <div className="grid items-center gap-8 sm:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] sm:gap-6">
        <div className="flex flex-col items-center gap-2 text-center sm:items-start sm:text-left">
          <p className="font-mono text-xs tracking-[0.18em] text-muted-foreground uppercase">
            {footerT("credit")}
          </p>
          <a
            className="font-heading text-4xl leading-none tracking-tighter transition-colors hover:text-muted-foreground focus-visible:text-muted-foreground focus-visible:outline-none"
            href="#inicio"
          >
            {footerCredit.author}
          </a>
        </div>

        <div className="flex justify-center" aria-hidden="true">
          <FooterThinkingOrb/>
        </div>

        <div className="flex flex-col items-center gap-6 sm:items-end">
          <nav
            className="flex flex-wrap items-center gap-5"
            aria-label={footerT("contactAriaLabel")}
          >
            {contactLinks.map(({href, iconMode, iconSrc, key}) => (
              <a
                aria-label={linksT(key)}
                className="group flex size-4 items-center justify-center text-muted-foreground transition-colors hover:text-foreground focus-visible:text-foreground focus-visible:outline-none"
                href={href}
                key={key}
                rel={href.startsWith("http") ? "noreferrer" : undefined}
                target={href.startsWith("http") ? "_blank" : undefined}
              >
                <span className="flex size-4 items-center justify-center transition-transform group-hover:-translate-y-0.5 group-focus-visible:-translate-y-0.5">
                  <ContactIcon iconMode={iconMode} iconSrc={iconSrc}/>
                </span>
              </a>
            ))}
          </nav>

          <a
            className="group flex w-fit items-center gap-2 font-mono text-xs text-muted-foreground transition-colors hover:text-foreground focus-visible:text-foreground focus-visible:outline-none"
            href="#inicio"
          >
            {commonT("backToTop")}
            <ArrowUp
              className="size-3.5 transition-transform group-hover:-translate-y-1 group-focus-visible:-translate-y-1"
              aria-hidden="true"
            />
          </a>
        </div>
      </div>
    </footer>
  );
}
