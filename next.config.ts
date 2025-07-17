import type { NextConfig } from "next";
// eslint-disable-next-line @typescript-eslint/no-require-imports
const createNextIntlPlugin = require("next-intl/plugin");
const withNextIntl = createNextIntlPlugin();

const repoName = "ฝprasertnuannim.github.io.git"; // 👈 Replace with your GitHub repo name

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "export", // Enables static export for GitHub Pages
  trailingSlash: true, // Required for GitHub Pages routing
  basePath: `/${repoName}`, // 👈 Needed to fix routing
  images: {
    unoptimized: true, // Required if you use `next/image`
  },
};

export default withNextIntl(nextConfig);
