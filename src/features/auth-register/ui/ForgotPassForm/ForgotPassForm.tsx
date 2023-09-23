import React, { useState } from 'react'

import Link from 'next/link'
// eslint-disable-next-line import/no-named-as-default
import ReCAPTCHA from 'react-google-recaptcha'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast, Toaster } from 'react-hot-toast'

import styles from './ForgotPassForm.module.scss'

import { useRecoverPasswordMutation } from '@/shared/api/services/auth/auth.api'
import { PasswordRecoveryType } from '@/shared/api/services/auth/auth.api.types'
import { Button, ButtonSize, ButtonTheme } from '@/shared/ui/Button/Button'
import FormContainer from '@/shared/ui/FormContainer/FormContainer'
import { Input, InputType } from '@/shared/ui/Input/Input'
import inputStyles from '@/shared/ui/Input/Input.module.scss'
import { LinearLoader } from '@/shared/ui/Loaders/LinearLoader'
import { Modal } from '@/shared/ui/Modal/Modal'

export function ForgotPass() {
  const [isSentPass, setIsSentPass] = useState(false)
  const [recoverPassword, { isLoading }] = useRecoverPasswordMutation()
  const callBackCloseWindow = () => setIsSentPass(false)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<PasswordRecoveryType>({
    mode: 'onChange',
    defaultValues: {
      email: '',
      recaptcha: '',
    },
  })

  const onChangeRecaptchaHandler = (value: string) => {
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
        if (error) {
          toast.error(error.data.error + ', probably you forgot reCaptcha ')
        }
      })
  }

  return (
    <>
      <Toaster position="top-right" />
      {isLoading && <LinearLoader />}
      <FormContainer title={'Forgot password'}>
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
            <Button
              className={styles.oppositeBtn}
              theme={ButtonTheme.CLEAR}
              size={ButtonSize.MIDDLE}
            >
              Back to Sign In
            </Button>
          </Link>
          <ReCAPTCHA
            sitekey="6LeY2y0mAAAAANwI_paCWfoksCgBm1n2z9J0nwNQ" // replace to .env.production
            onChange={onChangeRecaptchaHandler}
            theme={'dark'}
          />
        </form>
      </FormContainer>
    </>
  )
}
