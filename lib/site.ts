const fallbackSiteUrl = "https://caluff.studio";

function getSiteUrl() {
  const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const vercelUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL;

  return new URL(
    configuredUrl ?? (vercelUrl ? `https://${vercelUrl}` : fallbackSiteUrl),
  );
}

export const siteUrl = getSiteUrl();
