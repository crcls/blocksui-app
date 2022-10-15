const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '.env') })

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    ALCHEMY_ID: process.env.ALCHEMY_ID,
    INFURA_ID: process.env.INFURA_ID,
  },
  exportPathMap: async function (
    defaultPathMap,
    { dev, dir, outDir, distDir, buildId }
  ) {
    return {
      '/': { page: '/' },
      '/editor': { page: '/editor' },
      '/faqs': { page: '/faqs' },
      '/marketplace': { page: '/marketplace' },
      '/my-blocks': { page: '/my-blocks' },
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
