import React, { FC, useEffect, useState } from 'react'

import Image from 'next/image'
import Link from 'next/link'

import styles from '@/pages-fs/auth-register/ui/ConfirmedEmail/ConfirmedEmail.module.scss'
import broConfirmImage from '@/public/login/broCongratulations.svg'
import { useVerifyEmailMutation } from '@/shared/api/auth.api'
import { Button, ButtonTheme } from '@/shared/ui/Button/Button'

export const RegistrationConfirmation: FC = () => {
  const [code, setCode] = useState('')
  const [verifyEmail] = useVerifyEmailMutation()

  useEffect(() => {
    const urlCode = window.location.search.split('=')[1]

    setCode(urlCode)
  }, [])

  useEffect(() => {
    if (code) {
      verifyEmail(code)
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
