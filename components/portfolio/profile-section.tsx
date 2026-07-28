import { Eye } from "lucide-react";

import { profile } from "@/data/profile";

export function ProfileSection() {
  return (
    <section className="grid min-h-44 grid-cols-[5rem_1fr] items-center gap-4 p-5 sm:grid-cols-[7.5rem_1fr_auto] sm:gap-7 sm:p-6">
      <div
        className="relative flex size-20 items-center justify-center overflow-hidden rounded-xl border-4 border-muted-foreground/40 bg-muted font-heading text-3xl after:absolute after:top-10 after:left-4 after:h-28 after:w-12 after:rounded-full after:border after:border-foreground/70 sm:size-28 sm:text-4xl sm:after:top-12 sm:after:left-6 sm:after:h-40 sm:after:w-16"
        aria-label={`Avatar de ${profile.name}`}
      >
        <span className="relative">{profile.initials}</span>
      </div>

      <div className="flex flex-col">
        <span className="mb-2 size-3 rounded-full border border-border p-0.5 after:block after:size-full after:rounded-full after:bg-foreground" aria-hidden="true" />
        <h1 className="font-heading text-4xl leading-none tracking-tighter">{profile.name}</h1>
        <p className="mt-2 font-semibold text-muted-foreground">{profile.role}</p>
        <p className="mt-1 text-xs font-medium text-muted-foreground">{profile.location}</p>
      </div>

      <p className="hidden self-start gap-1 pt-2 font-mono text-xs text-muted-foreground sm:flex">
        <Eye className="size-3" aria-hidden="true" />
        <span>{profile.views}</span>
      </p>
    </section>
  );
}
