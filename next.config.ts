import type { NextConfig } from "next";
// eslint-disable-next-line @typescript-eslint/no-require-imports
const createNextIntlPlugin = require("next-intl/plugin");
const withNextIntl = createNextIntlPlugin();
const nextConfig: NextConfig = {
  output: 'export',
  images: { unoptimized: true }, // ถ้าใช้ <Image />
  basePath: '',
};

export default withNextIntl(nextConfig);
