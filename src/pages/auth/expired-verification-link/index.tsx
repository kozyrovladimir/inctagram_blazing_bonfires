import React, { useState } from 'react'

import Image from 'next/image'
import { useRouter } from 'next/router'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast, Toaster } from 'react-hot-toast'

import styles from './ExpiredVerificationLink.module.scss'

import { useResendVerificationLinkMutation } from '@/shared/api/services/auth/auth.api'
import { ResendVerificationLinkType } from '@/shared/api/services/auth/auth.api.types'
import broResend from '@/shared/assets/icons/login/broResend.svg'
import { getLayout } from '@/shared/layouts/MainLayout/MainLayout'
import { Button, ButtonSize, ButtonTheme } from '@/shared/ui/Button/Button'
import { Modal } from '@/shared/ui/Modal/Modal'
import {CircularLoader} from "@/shared/ui/Loaders/CircularLoader"

const ExpiredVerificationLinkPage = () => {
  const [resendNewVerificationLink, { isLoading }] = useResendVerificationLinkMutation()
  const [resendVerificationLinkSuccess, setResendVerificationLinkSuccess] = useState(false)
  const callBackCloseWindow = () => setResendVerificationLinkSuccess(false)

  const router = useRouter()
  const { query } = router
  const { email, baseUrl } = query as ResendVerificationLinkType

  const { handleSubmit } = useForm<ResendVerificationLinkType>({
    mode: 'onChange',
    defaultValues: {
      email: email,
      baseUrl: baseUrl,
    },
  })
  const onSubmit: SubmitHandler<ResendVerificationLinkType> = (
    data: ResendVerificationLinkType
  ) => {
    resendNewVerificationLink(data)
      .unwrap()
      .then(() => {
        setResendVerificationLinkSuccess(true)
      })
      .catch(error => toast.error(error.data.messages[0].message))
  }

  return (
    <>
      <Toaster position="top-right" />
      {resendVerificationLinkSuccess && (
        <Modal title={'New link sent'} mainButton={'OK'} callBackCloseWindow={callBackCloseWindow}>
          <p>We have sent a new link to your email</p>
        </Modal>
      )}
      {isLoading && <CircularLoader />}
      <div className={styles.expiredContainer}>
        <h3>Email verification link expired</h3>
        <p>
          Looks like the verification link has expired. Not to worry, we can send the link again
        </p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Button theme={ButtonTheme.FILLED} size={ButtonSize.LARGE}>
            Resend verification link
          </Button>
        </form>
        <Image src={broResend} alt={'man waits and looks at clock'} />
      </div>
    </>
  )
}

ExpiredVerificationLinkPage.getLayout = getLayout
export default ExpiredVerificationLinkPage
