import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'yumesuta.com',
      },
      {
        protocol: 'https',
        hostname: 'assets.yumesuta.com',
      },
    ],
  },
};

export default nextConfig;
