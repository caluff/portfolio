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
      WebkitMask: `url("${iconSrc}") center / contain no-repeat`,
      mask: `url("${iconSrc}") center / contain no-repeat`,
    } satisfies CSSProperties;

    return (
      <span
        className="block size-4 bg-current"
        style={maskStyle}
        aria-hidden="true"
      />
    );
  }

  return (
    <Image
      className="size-4"
      src={iconSrc}
      alt=""
      width={16}
      height={16}
    />
  );
}
