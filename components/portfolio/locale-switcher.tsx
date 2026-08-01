"use client";

import Image from "next/image";
import {useLocale, useTranslations} from "next-intl";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {getPathname, usePathname} from "@/i18n/navigation";
import type {AppLocale} from "@/i18n/routing";

const localeOptions = {
  es: {code: "ES", flag: "/flags/es.svg"},
  en: {code: "EN", flag: "/flags/us.svg"},
} as const satisfies Record<AppLocale, {code: string; flag: string}>;

function LocaleOption({locale}: {locale: AppLocale}) {
  const {code, flag} = localeOptions[locale];

  return (
    <>
      <Image alt="" height={12} src={flag} width={18}/>
      <span>{code}</span>
    </>
  );
}

export function LocaleSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const t = useTranslations("LocaleSwitcher");

  const switchLocale = (nextLocale: AppLocale | null) => {
    if (!nextLocale) {
      return;
    }

    if (nextLocale === locale) {
      return;
    }

    const localizedPathname = getPathname({
      locale: nextLocale,
      href: pathname,
      forcePrefix: true,
    });
    window.location.assign(
      `${localizedPathname}${window.location.search}${window.location.hash}`,
    );
  };

  return (
    <Select value={locale} onValueChange={switchLocale}>
      <SelectTrigger
        aria-label={t("label")}
        className="w-auto font-mono text-xs uppercase"
        variant="ghost"
      >
        <SelectValue>
          {(value) => (
            <LocaleOption locale={value as AppLocale}/>
          )}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem label="ES" value="es">
            <LocaleOption locale="es"/>
          </SelectItem>
          <SelectItem label="EN" value="en">
            <LocaleOption locale="en"/>
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
