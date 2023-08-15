import React, { FC, useEffect, useState } from 'react'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

import styles from './../../../../../pages-fs/auth-register/ui/ConfirmedEmail/ConfirmedEmail.module.scss'
import { useVerifyEmailMutation } from './../../../../../shared/api/auth.api'
import { Button, ButtonTheme } from './../../../../../shared/ui/Button/Button'

import broConfirmImage from '@/public/login/broCongratulations.svg'

export const RegistrationConfirmation: FC = () => {
  const [verifyEmail] = useVerifyEmailMutation()
  const router = useRouter()
  const { query } = router
  const { code } = query

  useEffect(() => {
    if (code) {
      verifyEmail(code)
        .unwrap()
        // как проверить что verification link expired??
        .catch(() => router.push('/invalid-verification-link'))
    }
  }, [code])

  return (
    <div className={styles.confirmedContainer}>
      <h3>Congratulations!</h3>
      <p>Your email has been confirmed</p>
      <Link href={'/sign-in'}>
        <Button theme={ButtonTheme.FILLED}>Sign In</Button>
      </Link>
      <Image src={broConfirmImage} alt={'women login account in her phone'} />
    </div>
  )
}
