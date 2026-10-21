import {AboutSection} from "@/components/portfolio/about-section";
import {ContactSection} from "@/components/portfolio/contact-section";
import {CoverSection} from "@/components/portfolio/cover-section";
import {ProfileSection} from "@/components/portfolio/profile-section";
import {SectionSeparator} from "@/components/portfolio/section-separator";

export function IntroductionSection() {
  return (
    <>
      <CoverSection/>
      <SectionSeparator/>
      <ProfileSection/>
      <ContactSection/>
      <AboutSection/>
    </>
  );
}
