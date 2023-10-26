import { PropsWithChildren } from 'react'

import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import { useMeQuery } from '../../api/services/auth/auth.api'

import {
  AUTH_CONFIRMED_EMAIL_PATH,
  AUTH_EXPIRRED_VERIFICATION_LINK_PATH,
  AUTH_PRIVACY_POLICY_PATH,
  AUTH_REGISTRATION_CONFIRMATION_PATH,
  AUTH_TERMS_OF_SERVICE_PATH,
  FORGOT_PASSWORD_PATH,
  SIGN_IN_PATH,
  SIGN_UP_PATH,
} from '@/shared/constants/paths'
import { ShortLangs } from '@/widgets/langSwitcher/ui/LanguageSelect'

// const publicPaths = []

const emailConfirmationPaths = [
  AUTH_EXPIRRED_VERIFICATION_LINK_PATH,
  AUTH_REGISTRATION_CONFIRMATION_PATH,
]

export const WithAuth: NextPage<PropsWithChildren> = ({ children }) => {
  const router = useRouter()
  const { pathname } = router
  const { i18n } = useTranslation()

  // check weather url contains private paths
  if (emailConfirmationPaths.some(paths => paths === pathname)) {
    return children
  }
  // if (publicPaths.some(paths => paths === pathname)) {
  //   return children
  // }
  const { data, error, isLoading, isError } = useMeQuery()

  if (isError) {
    // if to use router.push will be infinite rerenders. Instead of it needs to use window.history.pushState to prevent rerenders

    let pageUnautorization = SIGN_IN_PATH

    switch (pathname) {
      case SIGN_UP_PATH:
        pageUnautorization = SIGN_UP_PATH
        break
      case FORGOT_PASSWORD_PATH:
        pageUnautorization = FORGOT_PASSWORD_PATH
        break
      case AUTH_TERMS_OF_SERVICE_PATH:
        pageUnautorization = AUTH_TERMS_OF_SERVICE_PATH
        break
      case AUTH_PRIVACY_POLICY_PATH:
        pageUnautorization = AUTH_PRIVACY_POLICY_PATH
        break
      case AUTH_CONFIRMED_EMAIL_PATH:
        pageUnautorization = AUTH_CONFIRMED_EMAIL_PATH
        break
      case AUTH_EXPIRRED_VERIFICATION_LINK_PATH:
        pageUnautorization = AUTH_EXPIRRED_VERIFICATION_LINK_PATH
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
