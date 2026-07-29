import Image from "next/image";
import { Eye } from "lucide-react";

import { HyperText } from "@/components/ui/hyper-text";
import { MorphingText } from "@/components/ui/morphing-text";
import { profile } from "@/data/profile";

export function ProfileSection() {
  return (
    <section className="grid min-h-44 grid-cols-[5rem_1fr] items-center gap-4 p-5 sm:grid-cols-[7.5rem_1fr_auto] sm:gap-7 sm:p-6">
      <div className="size-20 border border-dashed bg-subtle-band p-1 sm:size-28">
        <div className="relative size-full overflow-hidden">
          <Image
            alt={`Avatar de ${profile.name}`}
            className="object-cover object-[center_35%]"
            fill
            sizes="(max-width: 640px) 5rem, 7rem"
            src="/profile/profile.jpg"
          />
        </div>
      </div>

      <div className="flex flex-col">
        <span className="mb-2 size-3 rounded-full border border-border p-0.5 after:block after:size-full after:rounded-full after:bg-foreground" aria-hidden="true" />
        <HyperText
          className="py-0 font-heading text-3xl leading-none tracking-tighter sm:text-4xl"
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
      </div>

      <p className="hidden self-start gap-1 pt-2 font-mono text-xs text-muted-foreground sm:flex">
        <Eye className="size-3" aria-hidden="true" />
        <span>{profile.views}</span>
      </p>
    </section>
  );
}
