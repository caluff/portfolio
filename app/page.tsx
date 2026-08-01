import {AboutSection} from "@/components/portfolio/about-section";
import {ContactSection} from "@/components/portfolio/contact-section";
import {ContactCtaSection} from "@/components/portfolio/contact-cta-section";
import {CoverSection} from "@/components/portfolio/cover-section";
import {ExperienceSection} from "@/components/portfolio/experience-section";
import {FloatingContactDock} from "@/components/portfolio/floating-contact-dock";
import {GitHubActivitySection} from "@/components/portfolio/github-activity-section";
import {ProfileSection} from "@/components/portfolio/profile-section";
import {ProjectsSection} from "@/components/portfolio/projects-section";
import {SectionSeparator} from "@/components/portfolio/section-separator";
import {SiteFooter} from "@/components/portfolio/site-footer";
import {SiteHeader} from "@/components/portfolio/site-header";
import {TechStackSection} from "@/components/portfolio/tech-stack-section";

export default function Home() {
  return (
    <main className="min-h-svh overflow-x-clip bg-background text-foreground" id="inicio">
      <SiteHeader/>
      <FloatingContactDock/>
      <div className="relative isolate mx-auto min-h-svh max-w-3xl bg-background before:pointer-events-none before:absolute before:inset-y-0 before:left-0 before:z-50 before:border-l before:border-dashed before:border-border before:content-[''] after:pointer-events-none after:absolute after:inset-y-0 after:right-0 after:z-50 after:border-r after:border-dashed after:border-border after:content-['']">
        <CoverSection/>
        <SectionSeparator/>
        <ProfileSection/>
        <ContactSection/>
        <AboutSection/>
        <ExperienceSection/>
        <ProjectsSection/>
        <TechStackSection/>
        <GitHubActivitySection/>
        <ContactCtaSection/>
        <SectionSeparator/>
        <SiteFooter/>
      </div>
    </main>
  );
}
