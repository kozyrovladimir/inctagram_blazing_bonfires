import React from 'react'

import Image from 'next/image'
import Link from 'next/link'

import styles from './ExpiredVerificationLink.module.scss'

import broResend from '@/public/login/broResend.svg'
import { Button, ButtonSize, ButtonTheme } from '@/shared/ui/Button/Button'

export const ExpiredVerificationLink = () => {
  return (
    <div className={styles.expiredContainer}>
      <h3>Email verification link expired</h3>
      <p>Looks like the verification link has expired. Not to worry, we can send the link again</p>
      <Link href={'/forgot-password'}>
        <Button theme={ButtonTheme.FILLED} size={ButtonSize.LARGE}>
          Resend verification link
        </Button>
      </Link>
      <Image src={broResend} alt={'men wait and look on clock'} />
    </div>
  )
}
