import {getTranslations} from "next-intl/server";

import { ContactFormReveal } from "@/components/portfolio/contact-form-reveal";
import { SectionHeader } from "@/components/portfolio/section-header";

export async function ContactCtaSection() {
  const t = await getTranslations("Contact");

  return (
    <section className="relative isolate" id="lets-talk">
      <div className="relative z-10">
        <SectionHeader title={t("sectionTitle")}/>
        <ContactFormReveal />
      </div>
    </section>
  );
}
