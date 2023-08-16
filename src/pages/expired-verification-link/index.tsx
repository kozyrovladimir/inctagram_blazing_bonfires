import React, { useEffect } from 'react'

import Image from 'next/image'
import { useRouter } from 'next/router'

import styles from './ExpiredVerificationLink.module.scss'

import { useRequestNewVerificationLink } from '@/shared/api/model/auth.api'
import broResend from '@/shared/assets/icons/login/broResend.svg'
import { Button, ButtonSize, ButtonTheme } from '@/shared/ui/Button/Button'
import { getLayout } from '@/widgets/layout/MainLayout/MainLayout'

const ExpiredVerificationLinkPage = () => {
  const [requestNewVerificationLink] = useRequestNewVerificationLink()
  const router = useRouter()
  const { query } = router
  const { email, baseUrl } = query

  useEffect(() => {
    if (email) {
      requestNewVerificationLink(email, baseUrl)
        .unwrap()
        .catch(() => {})
    }
  }, [email])

  return (
    <div className={styles.expiredContainer}>
      <h3>Email verification link expired</h3>
      <p>Looks like the verification link has expired. Not to worry, we can send the link again</p>
      <Button theme={ButtonTheme.FILLED} size={ButtonSize.LARGE}>
        Resend verification link
      </Button>
      <Image src={broResend} alt={'man waits and looks at clock'} />
    </div>
  )
}

ExpiredVerificationLinkPage.getLayout = getLayout
export default ExpiredVerificationLinkPage
