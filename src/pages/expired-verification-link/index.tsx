import React from 'react'

import Image from 'next/image'

import styles from './ExpiredVerificationLink.module.scss'

import broResend from '@/shared/assets/icons/login/broResend.svg'
import { Button, ButtonSize, ButtonTheme } from '@/shared/ui/Button/Button'
import { getLayout } from '@/widgets/layout/MainLayout/MainLayout'

const ExpiredVerificationLinkPage = () => {
  return (
    <div className={styles.expiredContainer}>
      <h3>Email verification link expired</h3>
      <p>Looks like the verification link has expired. Not to worry, we can send the link again</p>
      <Button theme={ButtonTheme.FILLED} size={ButtonSize.LARGE}>
        Resend verification link
      </Button>
      <Image src={broResend} alt={'men wait and look on clock'} />
    </div>
  )
}

ExpiredVerificationLinkPage.getLayout = getLayout
export default ExpiredVerificationLinkPage
