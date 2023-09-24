/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config')

const nextConfig = {
  i18n,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'storage.yandexcloud.net',
        port: '',
        // pathname: '/account123/**',
      },
    ],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      if (!config.resolve.fallback) {
        config.resolve.fallback = {}
      }
      config.resolve.fallback.fs = false
    }

    return config
  },
}

module.exports = nextConfig
