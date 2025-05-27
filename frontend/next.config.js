/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    BACKEND_PORT: process.env.BACKEND_PORT || 8001,
    BACKEND_URL: process.env.BACKEND_URL || `http://localhost:${process.env.BACKEND_PORT || 8001}`,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || `${process.env.BACKEND_URL || `http://localhost:${process.env.BACKEND_PORT || 8001}`}/api`,
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.BACKEND_URL || `http://localhost:${process.env.BACKEND_PORT || 8001}`}/api/:path*`,
      },
    ];
  },
};

module.exports = nextConfig; 