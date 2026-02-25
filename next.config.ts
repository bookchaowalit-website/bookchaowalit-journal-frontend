import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  pageExtensions: ['ts', 'tsx', 'mdx'],
  experimental: {
    mdxRs: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
}

export default nextConfig;
