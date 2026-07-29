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
        className="size-5 bg-current"
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
