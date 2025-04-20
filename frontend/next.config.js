/** @type {import('next').NextConfig} */
const nextConfig = {
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
      },
      {
        protocol: 'https',
        hostname: 'api.campuscouch.com',
        pathname: '/**',
      }
    ],
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3005',
  },
  eslint: {
    ignoreDuringBuilds: true
  },
  // Enable static exports
  trailingSlash: true,
  // Ensure proper routing in production
  async redirects() {
    return [
      {
        source: '/',
        destination: '/coming-soon',
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig; 