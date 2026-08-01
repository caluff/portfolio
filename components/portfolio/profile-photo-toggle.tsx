"use client";

import Image from "next/image";
import {useTranslations} from "next-intl";
import {type ReactNode, useState} from "react";

import {Button} from "@/components/ui/button";
import {PixelatedCanvas} from "@/components/ui/pixelated-canvas";
import {cn} from "@/lib/utils";

type ProfilePhotoToggleProps = {
  children: ReactNode;
  mobileAction?: ReactNode;
  name: string;
};

export function ProfilePhotoToggle({
                                     children,
                                     mobileAction,
                                     name,
                                   }: ProfilePhotoToggleProps) {
  const [isPixelated, setIsPixelated] = useState(true);
  const t = useTranslations("Profile.avatar");
  const toggleLabel = isPixelated
    ? t("showRegular")
    : t("showPixelated");

  return (
    <>
      <div className="flex flex-col gap-3">
        <div className="size-24 border border-dashed bg-subtle-band p-1 sm:size-32">
          <div className="relative size-full overflow-hidden">
            {isPixelated ? (
              <PixelatedCanvas
                ariaLabel={t("pixelated", {name})}
                backgroundColor=""
                cellSize={3}
                className="absolute top-1/2 left-1/2 block origin-center -translate-x-1/2 -translate-y-1/2 scale-[0.733] sm:scale-100"
                distortionMode="repel"
                distortionRadius={52}
                distortionStrength={5}
                dropoutStrength={0.08}
                height={120}
                jitterStrength={2}
                objectPosition={{x: 0.5, y: 0.35}}
                src="/profile/profile.jpg"
                tintStrength={0}
                width={120}
              />
            ) : (
              <Image
                alt={t("regular", {name})}
                className="animate-in fade-in object-cover object-[center_35%] duration-200"
                fill
                sizes="(max-width: 640px) 6rem, 8rem"
                src="/profile/profile.jpg"
              />
            )}
          </div>
        </div>
        {mobileAction && <div className="sm:hidden">{mobileAction}</div>}
      </div>

      <div className="flex flex-col">
        <Button
          aria-label={toggleLabel}
          aria-pressed={isPixelated}
          className="-mt-1.5 -ml-1.5 mb-0.5"
          onClick={() => setIsPixelated((current) => !current)}
          size="icon-xs"
          title={toggleLabel}
          type="button"
          variant="ghost"
        >
          <span
            className={cn(
              "size-3 rounded-full border border-border p-0.5 after:block after:size-full after:rounded-full after:transition-colors",
              isPixelated && "after:bg-foreground",
            )}
            aria-hidden="true"
          />
        </Button>
        {children}
      </div>
    </>
  );
}
