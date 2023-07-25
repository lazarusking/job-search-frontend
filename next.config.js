/** @type {import('next').NextConfig} */
const nextConfig = {images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'shuffle.dev',
      },
    ],
  },}

module.exports = nextConfig
