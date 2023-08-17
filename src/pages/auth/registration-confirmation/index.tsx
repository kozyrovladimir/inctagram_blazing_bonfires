import React, { useEffect } from 'react'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

import styles from '@/pages/auth/confirmed-email/ConfirmedEmail.module.scss'
import { useVerifyEmailMutation } from '@/shared/api'
import broConfirmImage from '@/shared/assets/icons/login/broCongratulations.svg'
import { Button, ButtonTheme } from '@/shared/ui/Button/Button'
import { getLayout } from '@/widgets/layout/MainLayout/MainLayout'

export const RegistrationConfirmation = () => {
  const [verifyEmail] = useVerifyEmailMutation()
  const router = useRouter()
  const { query } = router
  const { code, email } = query

  useEffect(() => {
    if (code) {
      verifyEmail(code)
        .unwrap()
        .then(() => {})
        .catch(e => {
          console.log(e)
          router.push(`/auth/expired-verification-link?email=${email}`)
        })
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

RegistrationConfirmation.getLayout = getLayout
export default RegistrationConfirmation
