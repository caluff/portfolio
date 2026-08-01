import {getTranslations} from "next-intl/server";

import { ContactFormReveal } from "@/components/portfolio/contact-form-reveal";
import { SectionHeader } from "@/components/portfolio/section-header";

export async function ContactCtaSection() {
  const t = await getTranslations("Contact");

  return (
    <section id="lets-talk">
      <SectionHeader title={t("sectionTitle")}/>
      <ContactFormReveal />
    </section>
  );
}
