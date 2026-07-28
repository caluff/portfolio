import {AboutSection} from "@/components/portfolio/about-section";
import {ContactSection} from "@/components/portfolio/contact-section";
import {CoverSection} from "@/components/portfolio/cover-section";
import {ProfileSection} from "@/components/portfolio/profile-section";
import {ProjectsSection} from "@/components/portfolio/projects-section";
import {SectionSeparator} from "@/components/portfolio/section-separator";
import {SiteHeader} from "@/components/portfolio/site-header";
import {TechStackSection} from "@/components/portfolio/tech-stack-section";

export default function Home() {
  return (
    <main className="min-h-svh overflow-x-clip bg-background text-foreground" id="inicio">
      <SiteHeader/>
      <div className="relative mx-auto min-h-svh max-w-3xl border-x border-dashed bg-background">
        <CoverSection/>
        <SectionSeparator/>
        <ProfileSection/>
        <AboutSection/>
        <ContactSection/>
        <TechStackSection/>
        <ProjectsSection/>
        <SectionSeparator/>
      </div>
    </main>
  );
}
