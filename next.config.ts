import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'yumesuta.com',
      },
    ],
  },
};

export default nextConfig;
