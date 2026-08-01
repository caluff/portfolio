import { ContactFormReveal } from "@/components/portfolio/contact-form-reveal";
import { SectionHeader } from "@/components/portfolio/section-header";
import { contactCta } from "@/data/contact";

export function ContactCtaSection() {
  return (
    <section id="lets-talk">
      <SectionHeader title={contactCta.sectionTitle} />
      <ContactFormReveal />
    </section>
  );
}
