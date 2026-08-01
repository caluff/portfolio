import type {MetadataRoute} from "next";

import {siteUrl} from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: new URL("/", siteUrl).toString(),
      alternates: {
        languages: {
          es: new URL("/", siteUrl).toString(),
          en: new URL("/en", siteUrl).toString(),
        },
      },
    },
    {
      url: new URL("/en", siteUrl).toString(),
      alternates: {
        languages: {
          es: new URL("/", siteUrl).toString(),
          en: new URL("/en", siteUrl).toString(),
        },
      },
    },
  ];
}
