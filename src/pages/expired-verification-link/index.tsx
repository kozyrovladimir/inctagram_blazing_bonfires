import React from 'react'

import Image from 'next/image'
import Link from 'next/link'

import styles from './ExpiredVerificationLink.module.scss'

import broResend from '@/shared/assets/icons/login/broResend.svg'
import { Button, ButtonSize, ButtonTheme } from '@/shared/ui/Button/Button'
import { getLayout } from '@/widgets/layout/MainLayout/MainLayout'

const ExpiredVerificationLinkPage = () => {
  return (
    <div className={styles.expiredContainer}>
      <h3>Email verification link expired</h3>
      {/* eslint-disable-next-line react/jsx-no-comment-textnodes */}
      <p>Looks like the verification link has expired. Not to worry, we can send the link again</p>
      // TODO talk to Denis to get verification link expired // TODO query params: email and
      verification code
      <Link href={'/sign-up'}>
        <Button theme={ButtonTheme.FILLED} size={ButtonSize.LARGE}>
          Resend verification link
        </Button>
      </Link>
      <Image src={broResend} alt={'man waits and looks at clock'} />
    </div>
  )
}

ExpiredVerificationLinkPage.getLayout = getLayout
export default ExpiredVerificationLinkPage
