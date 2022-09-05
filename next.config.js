/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    images: {
      unoptimized: true,
    },
  },
  exportPathMap: async function (
    defaultPathMap,
    { dev, dir, outDir, distDir, buildId }
  ) {
    return {
      '/': { page: '/' },
    };
  },
  reactStrictMode: true,
  swcMinify: true,
  trailingSlash: true,
};

module.exports = nextConfig;
