const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '.env') })

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    ALCHEMY_ID: process.env.ALCHEMY_ID,
    INFURA_ID: process.env.INFURA_ID,
    ENV: process.env.NODE_ENV,
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
