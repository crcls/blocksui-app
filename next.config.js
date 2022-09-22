/** @type {import('next').NextConfig} */
const nextConfig = {
  exportPathMap: async function (
    defaultPathMap,
    { dev, dir, outDir, distDir, buildId }
  ) {
    return {
      '/': { page: '/' },
      '/editor': { page: '/editor' },
      '/faqs': { page: '/faqs' },
      '/marketplace': { page: '/marketplace' },
      '/publish': { page: '/publish' },
    }
  },
  experimental: {
    newNextLinkBehavior: true,
    scrollRestoration: true,
  },
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
  swcMinify: true,
  trailingSlash: true,
}

module.exports = nextConfig
