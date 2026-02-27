import type { NextConfig } from "next";

const nextConfig = {
  eslint: {
    // ESLint runs in CI separately; don't block Vercel builds on lint warnings
    ignoreDuringBuilds: true,
  },
} satisfies NextConfig;

export default nextConfig;
