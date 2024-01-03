import React from 'react'

import { useGoogleLogin } from '@react-oauth/google'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { toast } from 'react-hot-toast'

import styles from '@/features/auth-register/ui/oAuth/OAuth.module.scss'
import { useLoginViaGoogleMutation } from '@/shared/api/services/auth/auth.api'
import githubIcon from '@/shared/assets/icons/socialIcons/github-icon.svg'
import googleIcon from '@/shared/assets/icons/socialIcons/google-icon.svg'
import { RoutersPath } from '@/shared/constants/paths'

export const OAuth = () => {
  const { t: tError } = useTranslation('common', { keyPrefix: 'Error' })
  const router = useRouter()
  const [loginViaGoogle] = useLoginViaGoogleMutation()

  const loginGoogle = useGoogleLogin({
    onSuccess: tokenResponse => {
      // window.location.assign(RoutersPath.apiAuthGithubLogin)
      loginViaGoogle(tokenResponse)
      router.push(RoutersPath.profile) // /profile was before
    },
    onError: () => toast.error(tError('SomethingWentWrong')),
    flow: 'auth-code',
  })

  const onGithubLogin = () => {
    // window.location.assign(RoutersPath.apiAuthGithubLogin)
    router.push(RoutersPath.apiAuthGithubLogin)
  }

  return (
    <div className={styles.socialIconContainer}>
      <Image
        onClick={loginGoogle}
        className={styles.socialIcon}
        src={googleIcon}
        alt="google icon"
      />
      <Image
        onClick={onGithubLogin}
        className={styles.socialIcon}
        src={githubIcon}
        alt="github icon"
      />
    </div>
  )
}
