import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "shadcndesign-agency-template.vercel.app",
      },
    ],
  },
};

export default nextConfig;
