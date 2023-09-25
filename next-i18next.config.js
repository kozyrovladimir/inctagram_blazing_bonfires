/** @type {import('next-i18next').UserConfig} */
module.exports = {
  i18n: {
    defaultLocale: window.navigator.language.slice(0, 2),
    locales: ['en', 'ru'],
    localeDetection: false,
  },
  react: { useSuspense: false }, //this line
}
