import {PageViewCounter} from "@/components/portfolio/page-view-counter";
import { ProfilePhotoToggle } from "@/components/portfolio/profile-photo-toggle";
import { ViewCvButton } from "@/components/portfolio/view-cv-button";
import { HyperText } from "@/components/ui/hyper-text";
import { MorphingText } from "@/components/ui/morphing-text";
import { profile } from "@/data/profile";

export function ProfileSection() {
  return (
    <section className="grid min-h-44 grid-cols-[6rem_1fr] items-center gap-4 p-5 sm:grid-cols-[8.5rem_1fr_auto] sm:gap-7 sm:p-6">
      <ProfilePhotoToggle name={profile.name}>
        <HyperText
          className="py-0 font-heading text-3xl leading-none font-medium tracking-tighter sm:text-4xl"
          as="h1"
          duration={900}
          startOnView
        >
          {profile.name}
        </HyperText>
        <MorphingText
          className="mx-0 mt-2 h-16 max-w-none text-left text-sm leading-5 font-semibold text-muted-foreground sm:h-6 sm:text-base sm:leading-6 md:h-6 lg:text-base"
          texts={[...profile.headlines]}
        />
        <p className="mt-1 text-xs font-medium text-muted-foreground">{profile.location}</p>
        <div className="mt-4">
          <ViewCvButton/>
        </div>
      </ProfilePhotoToggle>

      <PageViewCounter/>
    </section>
  );
}
