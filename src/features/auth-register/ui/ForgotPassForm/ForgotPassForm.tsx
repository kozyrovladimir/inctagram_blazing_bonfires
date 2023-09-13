import React, { useState } from 'react'

import { CircularProgress } from '@mui/material'
import Link from 'next/link'
// eslint-disable-next-line import/no-named-as-default
import ReCAPTCHA from 'react-google-recaptcha'
import { SubmitHandler, useForm } from 'react-hook-form'

import styles from './ForgotPassForm.module.scss'

import { useRecoverPasswordMutation } from '@/shared/api/services/auth/auth.api'
import { PasswordRecoveryType } from '@/shared/api/services/auth/auth.api.types'
import { Button, ButtonSize, ButtonTheme } from '@/shared/ui/Button/Button'
import { Input, InputType } from '@/shared/ui/Input/Input'
import inputStyles from '@/shared/ui/Input/Input.module.scss'
import { Modal } from '@/shared/ui/Modal/Modal'

export function ForgotPass() {
  const [isSentPass, setIsSentPass] = useState(false)
  const [recoverPassword, { isLoading }] = useRecoverPasswordMutation()
  const callBackCloseWindow = () => setIsSentPass(false)

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
    reset,
  } = useForm<PasswordRecoveryType>({
    mode: 'onChange',
    defaultValues: {
      email: '',
      recaptcha: '',
    },
  })

  const onChangeRecaptchaHandler = (value: string | null) => {
    if (value === null) {
      throw new Error('value === null')
    }

    setValue('recaptcha', value)
  }

  const onSubmit: SubmitHandler<PasswordRecoveryType> = data => {
    recoverPassword(data)
      .unwrap()
      .then(() => {
        reset()
        setIsSentPass(true)
      })
      .catch(error => {
        if (error.data.messages[0].field === 'email') {
          setError('email', {
            type: 'manual',
            message: error.data.messages[0].message,
          })
        }
      })
  }

  return (
    <>
      {isLoading && <CircularProgress />}
      <form onSubmit={handleSubmit(onSubmit)} className={styles.formContainer}>
        <Input
          {...register('email', {
            required: 'Email field is required',
            pattern: {
              value: /^([a-zA-Z0-9._%+-]+)@([a-zA-Z0-9-]+.)+([a-zA-Z]{2,})$/,
              message: 'Email must contain A-Z, a-z , @',
            },
          })}
          label="Email"
          type={InputType.EMAIL}
          placeholder="Enter email"
          className={inputStyles.input}
          error={errors.email && errors.email?.message}
        />
        <p className={styles.forgotHelpText}>
          Enter your email address and we will send you further instructions
        </p>
        {isSentPass && (
          <Modal
            title={'Password sent'}
            mainButton={' OK '}
            callBackCloseWindow={callBackCloseWindow}
          >
            <p>The link has been sent by email. If you don’t receive an email send link again</p>
          </Modal>
        )}
        {!isSentPass ? (
          <Button size={ButtonSize.STRETCHED} className={styles.sendLinkBtn}>
            Send Link
          </Button>
        ) : (
          <Button size={ButtonSize.STRETCHED} className={styles.sendLinkBtn}>
            Send Again
          </Button>
        )}
        <Link href={'/sign-in'}>
          <Button className={styles.oppositeBtn} theme={ButtonTheme.CLEAR} size={ButtonSize.MIDDLE}>
            Back to Sign In
          </Button>
        </Link>
        <ReCAPTCHA
          sitekey="6LeY2y0mAAAAANwI_paCWfoksCgBm1n2z9J0nwNQ" // replace to .env
          onChange={onChangeRecaptchaHandler}
          theme={'dark'}
        />
      </form>
    </>
  )
}
