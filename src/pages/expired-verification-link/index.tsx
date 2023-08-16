import React, { useEffect, useState } from 'react'

import { CircularProgress } from '@mui/material'
import Image from 'next/image'
import { useRouter } from 'next/router'

import styles from './ExpiredVerificationLink.module.scss'

import { useRequestNewVerificationLink } from '@/shared/api/model/auth.api'
import broResend from '@/shared/assets/icons/login/broResend.svg'
import { Button, ButtonSize, ButtonTheme } from '@/shared/ui/Button/Button'
import { Modal } from '@/shared/ui/Modal/Modal'
import { getLayout } from '@/widgets/layout/MainLayout/MainLayout'

const ExpiredVerificationLinkPage = () => {
  const [requestNewVerificationLink, { isLoading }] = useRequestNewVerificationLink()
  const [sentNewLinkSuccess, setSentNewLinkSuccess] = useState(false)
  const callBackCloseWindow = () => setSentNewLinkSuccess(false)

  const router = useRouter()
  const { query } = router
  const { email, baseUrl } = query

  useEffect(() => {
    if (email) {
      requestNewVerificationLink(email, baseUrl)
        .unwrap()
        .then(() => setSentNewLinkSuccess(true))
        .catch(error => console.log(error))
    }
  }, [email])

  return (
    <>
      {sentNewLinkSuccess && (
        <Modal title={'New link sent'} mainButton={'OK'} callBackCloseWindow={callBackCloseWindow}>
          <p>We have sent a new link to your email</p>
        </Modal>
      )}
      {isLoading && <CircularProgress />}
      <div className={styles.expiredContainer}>
        <h3>Email verification link expired</h3>
        <p>
          Looks like the verification link has expired. Not to worry, we can send the link again
        </p>
        <Button theme={ButtonTheme.FILLED} size={ButtonSize.LARGE}>
          Resend verification link
        </Button>
        <Image src={broResend} alt={'man waits and looks at clock'} />
      </div>
    </>
  )
}

ExpiredVerificationLinkPage.getLayout = getLayout
export default ExpiredVerificationLinkPage
