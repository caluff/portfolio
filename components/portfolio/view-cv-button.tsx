import {ChevronDown} from "lucide-react";
import {getTranslations} from "next-intl/server";

import {Button} from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {cn} from "@/lib/utils";

const cvUrlEs = process.env.NEXT_PUBLIC_CV_URL_ES ?? process.env.NEXT_PUBLIC_CV_URL;
const cvUrlEn = process.env.NEXT_PUBLIC_CV_URL_EN;

export async function ViewCvButton({className}: { className?: string }) {
  if (!cvUrlEs && !cvUrlEn) return null;
  const t = await getTranslations("Profile.cv");
  const label = t("label");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            className={cn("neon-action h-8 rounded-none px-4", className)}
            size="lg"
            title={label}
          />
        }
      >
        <span className="flex items-center justify-center gap-1.5">
          {label}
          <ChevronDown data-icon="inline-end" aria-hidden="true"/>
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-auto">
        <DropdownMenuGroup>
          <DropdownMenuLabel>{t("menuLabel")}</DropdownMenuLabel>
          {cvUrlEs ? (
            <DropdownMenuItem
              render={
                <a
                  aria-label={t("newTab", {language: t("options.spanish")})}
                  href={cvUrlEs}
                  rel="noopener noreferrer"
                  target="_blank"
                />
              }
            >
              {t("options.spanish")}
            </DropdownMenuItem>
          ) : null}
          {cvUrlEn ? (
            <DropdownMenuItem
              render={
                <a
                  aria-label={t("newTab", {language: t("options.english")})}
                  href={cvUrlEn}
                  rel="noopener noreferrer"
                  target="_blank"
                />
              }
            >
              {t("options.english")}
            </DropdownMenuItem>
          ) : null}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
