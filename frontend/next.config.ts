import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3005',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'campuscouch.com',
        pathname: '/**',
      }
    ],
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3005',
  },
};

export default nextConfig;
