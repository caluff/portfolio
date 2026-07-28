import Image from "next/image";
import type { CSSProperties } from "react";

import { contactLinks } from "@/data/links";

type ContactIconProps = {
  iconMode: (typeof contactLinks)[number]["iconMode"];
  iconSrc: string;
};

export function ContactIcon({ iconMode, iconSrc }: ContactIconProps) {
  if (iconMode === "monochrome") {
    const maskStyle = {
      WebkitMaskImage: `url("${iconSrc}")`,
      maskImage: `url("${iconSrc}")`,
    } satisfies CSSProperties;

    return (
      <span
        className="size-5 bg-foreground mask-contain mask-center mask-no-repeat"
        style={maskStyle}
        aria-hidden="true"
      />
    );
  }

  return (
    <Image
      className="size-5"
      src={iconSrc}
      alt=""
      width={20}
      height={20}
    />
  );
}
