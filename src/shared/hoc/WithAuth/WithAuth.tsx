import { PropsWithChildren } from 'react'

import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import { useMeQuery } from '../../api/services/auth/auth.api'

import { ShortLangs } from '@/widgets/LangSwitcher/ui/LanguageSelect/LanguageSelect'

const publicPaths = [
  '/auth/expired-verification-link',
  '/auth/registration-confirmation',
  '/auth/privacy-policy',
  '/auth/terms-of-service',
  '/forgot-password',
]

// const emailConfirmationPaths = [
// '/auth/expired-verification-link',
// '/auth/registration-confirmation',
// ]

export const WithAuth: NextPage<PropsWithChildren> = ({ children }) => {
  const router = useRouter()
  const { pathname, asPath, query } = router
  const { i18n } = useTranslation()

  // check weather url contains private paths
  // if (emailConfirmationPaths.some(paths => paths === pathname)) {
  //   return children
  // }
  if (publicPaths.some(paths => paths === pathname)) {
    return children
  }

  const { data, error, isLoading, isError } = useMeQuery({})

  if (isError) {
    // if to use router.push will be infinite rerenders. Instead of it needs to use window.history.pushState to prevent rerenders

    let pageUnautorization = '/sign-in'

    switch (router.pathname) {
      case '/sign-up':
        pageUnautorization = '/sign-up'
        break
      case '/forgot-password':
        pageUnautorization = '/forgot-password'
        break
      case '/auth/terms-of-service':
        pageUnautorization = '/auth/terms-of-service'
        break
      case '/auth/privacy-policy':
        pageUnautorization = '/auth/privacy-policy'
        break
    }
    const newUrl =
      window.location.origin +
      `${i18n.language === ShortLangs.RU ? '/ru' : ''}` +
      `${pageUnautorization}`

    window.history.replaceState({ ...window.history.state, as: newUrl, url: newUrl }, '', newUrl)
  }

  return children
}
