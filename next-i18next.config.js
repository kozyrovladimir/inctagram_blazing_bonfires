/** @type {import('next-i18next').UserConfig} */
const { i18n } = require('./next-i18next.config')

module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'ru'],
    localeDetection: false,
  },
  react: { useSuspense: false }, //this line
}
