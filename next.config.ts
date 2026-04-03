import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: false,
  allowedDevOrigins: ["192.168.2.201"],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'wallpapercave.com',
      },
    ],
  },
};

export default nextConfig;
