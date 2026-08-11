import type {NextConfig} from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    useTypeScriptCli: true,
  },
  cacheComponents: true,
  partialPrefetching: true,
};

export default withNextIntl(nextConfig);
