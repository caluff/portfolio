import {PageViewCounter} from "@/components/portfolio/page-view-counter";
import { ProfilePhotoToggle } from "@/components/portfolio/profile-photo-toggle";
import { ViewCvButton } from "@/components/portfolio/view-cv-button";
import { HyperText } from "@/components/ui/hyper-text";
import { MorphingText } from "@/components/ui/morphing-text";
import { profile } from "@/data/profile";

export async function ProfileSection() {
  const t = await getTranslations("Profile");
  const headlines = [t("headlines.primary"), t("headlines.secondary")];

  return (
    <section className="relative grid min-h-44 grid-cols-[6rem_1fr] items-start gap-4 p-5 sm:grid-cols-[8.5rem_1fr_auto] sm:items-start sm:gap-7 sm:p-6">
      <ProfilePhotoToggle
        mobileAction={<ViewCvButton className="w-full px-2"/>}
        name={profile.name}
      >
        <HyperText
          className="py-0 font-heading text-3xl leading-none font-medium tracking-tighter sm:text-4xl"
          as="h1"
          duration={900}
          startOnView
        >
          {profile.name}
        </HyperText>
        <p className="mt-2 text-sm leading-5 font-semibold text-muted-foreground sm:hidden">
          {headlines[0]}
        </p>
        <MorphingText
          className="hidden max-w-none text-left sm:mx-0 sm:mt-2 sm:block sm:h-6 sm:text-base sm:leading-6 md:h-6 lg:text-base"
          texts={headlines}
        />
        <p className="mt-1 text-xs font-medium text-muted-foreground">{t("location")}</p>
        <div className="mt-4 hidden sm:block">
          <ViewCvButton/>
        </div>
      </ProfilePhotoToggle>

      <PageViewCounter/>
    </section>
  );
}
import {getTranslations} from "next-intl/server";
