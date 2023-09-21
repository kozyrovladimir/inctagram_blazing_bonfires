import React, { useState } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import Link from 'next/link'
// eslint-disable-next-line import/no-named-as-default
import ReCAPTCHA from 'react-google-recaptcha'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'

import styles from './ForgotPassForm.module.scss'

import { useRecoverPasswordMutation } from '@/shared/api/services/auth/auth.api'
import { PasswordRecoveryType } from '@/shared/api/services/auth/auth.api.types'
import { AppErrors } from '@/shared/common/errors'
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

  const schema = yup.object().shape({
    email: yup
      .string()
      .email(AppErrors.EMAIL_VALIDATION_ERROR_TEXT)
      .required(AppErrors.REQUIRED_FIELD),
    recaptcha: yup.string().required(),
  })

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
    reset,
  } = useForm<PasswordRecoveryType>({
    mode: 'onChange',
    resolver: yupResolver(schema),
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
      {isLoading && <LinearLoader />}
      <FormContainer title={'Forgot password'}>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.formContainer}>
          <Input
            {...register('email')}
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
            aria-required
          />
        </form>
      </FormContainer>
    </>
  )
}
