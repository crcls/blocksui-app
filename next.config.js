const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '.env') })

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    ETHEREUM_ALCHEMY_API: process.env.ETHEREUM_ALCHEMY_API,
    GOERLI_ALCHEMY_API: process.env.GOERLI_ALCHEMY_API,
    MUMBAI_ALCHEMY_API: process.env.MUMBAI_ALCHEMY_API,
    POLYGON_ALCHEMY_API: process.env.POLYGON_ALCHEMY_API,
    ENV: process.env.NODE_ENV || 'production',
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
      '/publish': { page: '/publish' },
      '/collection': { page: '/collection' },
      '/apikeys': { page: '/apikeys' },
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
