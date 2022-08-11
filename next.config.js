/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["ai4y.ddns.net"],
  },
};

module.exports = nextConfig;
