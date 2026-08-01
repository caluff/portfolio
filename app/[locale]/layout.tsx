import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import {hasLocale, NextIntlClientProvider} from "next-intl";
import {getMessages, getTranslations, setRequestLocale} from "next-intl/server";
import {notFound} from "next/navigation";

import {ThemeProvider} from "@/components/theme-provider";
import {Toaster} from "@/components/ui/toast";
import {routing} from "@/i18n/routing";
import {siteUrl} from "@/lib/site";

import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

type LocaleLayoutProps = {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export async function generateMetadata({
  params,
}: Omit<LocaleLayoutProps, "children">): Promise<Metadata> {
  const {locale: requestedLocale} = await params;
  const locale = hasLocale(routing.locales, requestedLocale)
    ? requestedLocale
    : routing.defaultLocale;
  const t = await getTranslations({locale, namespace: "Metadata"});
  const canonical = locale === routing.defaultLocale ? "/" : `/${locale}`;

  return {
    metadataBase: siteUrl,
    title: t("title"),
    description: t("description"),
    keywords: t.raw("keywords"),
    authors: [{name: "Daniel Caluff"}],
    creator: "Daniel Caluff",
    alternates: {
      canonical,
      languages: {
        es: "/",
        en: "/en",
        "x-default": "/",
      },
    },
    openGraph: {
      type: "website",
      url: canonical,
      siteName: "Daniel Caluff",
      title: t("title"),
      description: t("description"),
      locale: locale === "es" ? "es_UY" : "en_US",
      alternateLocale: locale === "es" ? ["en_US"] : ["es_UY"],
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const {locale} = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();
  const clientMessages = {
    Common: messages.Common,
    Navigation: messages.Navigation,
    LocaleSwitcher: messages.LocaleSwitcher,
    Profile: messages.Profile,
    Projects: messages.Projects,
    TechStack: messages.TechStack,
    GitHub: messages.GitHub,
    ContactLinks: messages.ContactLinks,
    Contact: messages.Contact,
  };

  return (
    <html
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      lang={locale}
      suppressHydrationWarning
    >
      <body>
        <NextIntlClientProvider messages={clientMessages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            disableTransitionOnChange
            enableSystem
          >
            {children}
            <Toaster/>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
