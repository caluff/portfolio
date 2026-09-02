import {getTranslations} from "next-intl/server";

import {ContactLinkButton} from "@/components/portfolio/contact-link-button";
import {SectionHeader} from "@/components/portfolio/section-header";
import {contactLinks} from "@/data/links";

export async function ContactSection() {
  const contactT = await getTranslations("Contact");
  const linksT = await getTranslations("ContactLinks");

  return (
    <section id="contact">
      <SectionHeader title={contactT("title")}/>

      <div className="grid grid-cols-1 border-0 bg-background sm:grid-cols-5 sm:divide-x sm:divide-dashed">
        {contactLinks.map(({href, iconMode, iconSrc, key}) => (
          <ContactLinkButton
            href={href}
            iconMode={iconMode}
            iconSrc={iconSrc}
            key={key}
            label={linksT(key)}
          />
        ))}
      </div>
    </section>
  );
}
