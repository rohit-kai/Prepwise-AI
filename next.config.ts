import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [],
  },
  // Enable strict mode for better development experience
  reactStrictMode: true,
  // Fix turbopack root warning when using workspaces
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;