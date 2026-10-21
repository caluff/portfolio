import {setRequestLocale} from "next-intl/server";

import {AudioPlayerProvider} from "@/components/portfolio/audio-player-provider";
import {AsciiOceanBackground} from "@/components/portfolio/ascii-ocean-background";
import {ContactCtaSection} from "@/components/portfolio/contact-cta-section";
import {ExperienceSection} from "@/components/portfolio/experience-section";
import {FloatingAudioPlayer} from "@/components/portfolio/floating-audio-player";
import {FloatingContactDock} from "@/components/portfolio/floating-contact-dock";
import {GitHubActivitySection} from "@/components/portfolio/github-activity-section";
import {IntroductionSection} from "@/components/portfolio/introduction-section";
import {ProjectsSection} from "@/components/portfolio/projects-section";
import {SectionSeparator} from "@/components/portfolio/section-separator";
import {SiteFooter} from "@/components/portfolio/site-footer";
import {SiteHeader} from "@/components/portfolio/site-header";
import {TechStackSection} from "@/components/portfolio/tech-stack-section";

type HomeProps = {
  params: Promise<{locale: "es" | "en"}>;
};

export default async function Home({params}: HomeProps) {
  const {locale} = await params;
  setRequestLocale(locale);

  return (
    <AudioPlayerProvider locale={locale}>
      <main className="relative isolate min-h-svh overflow-x-clip bg-background text-foreground" id="inicio">
        <AsciiOceanBackground/>
        <SiteHeader/>
        <FloatingContactDock/>
        <FloatingAudioPlayer/>
        <div className="relative isolate mx-auto min-h-svh max-w-3xl bg-background/80 before:pointer-events-none before:absolute before:inset-y-0 before:left-0 before:z-50 before:border-l before:border-dashed before:border-border before:content-[''] after:pointer-events-none after:absolute after:inset-y-0 after:right-0 after:z-50 after:border-r after:border-dashed after:border-border after:content-['']">
          <IntroductionSection/>
          <ExperienceSection/>
          <ProjectsSection/>
          <TechStackSection/>
          <GitHubActivitySection/>
          <ContactCtaSection/>
          <SectionSeparator/>
          <SiteFooter/>
        </div>
      </main>
    </AudioPlayerProvider>
  );
}
