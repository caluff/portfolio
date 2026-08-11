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
      <div className="flex flex-col items-start gap-2 sm:h-full sm:gap-0">
        <div className="size-22 border border-dashed bg-subtle-band p-1 sm:size-28">
          <div className="relative size-full overflow-hidden">
            {isPixelated ? (
              <PixelatedCanvas
                ariaLabel={t("pixelated", {name})}
                backgroundColor=""
                cellSize={3}
                className="absolute inset-0 block"
                distortionMode="repel"
                distortionRadius={52}
                distortionStrength={5}
                dropoutStrength={0.08}
                fitToContainer
                height={120}
                jitterStrength={2}
                objectPosition={{x: 0.5, y: 0.25}}
                src="/profile/profile-canvas.webp"
                tintStrength={0}
                width={120}
              />
            ) : (
              <Image
                alt={t("regular", {name})}
                className="animate-in fade-in object-cover object-[center_25%] duration-200"
                fill
                sizes="(max-width: 640px) 6rem, 8rem"
                src="/profile/profile.jpg"
              />
            )}
          </div>
        </div>
        <Button
          aria-label={toggleLabel}
          aria-pressed={isPixelated}
          className="self-start sm:mt-auto"
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
        {mobileAction && <div className="sm:hidden">{mobileAction}</div>}
      </div>

      <div className="flex flex-col">
        {children}
      </div>
    </>
  );
}
