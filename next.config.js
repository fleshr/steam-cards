/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        hostname: "community.akamai.steamstatic.com",
      },
    ],
  },
};

module.exports = nextConfig;
