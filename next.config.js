/** @type {import('next').NextConfig} */
// const { i18n } = require('../../../next-i18next.config')

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'storage.yandexcloud.net',
        port: '',
      },
    ],
  },
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'ru'],
    localeDetection: false,
  },
  pageExtensions: ['tsx'],
}

module.exports = nextConfig
