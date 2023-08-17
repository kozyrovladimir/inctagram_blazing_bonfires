import React, { useState } from 'react'

import { CircularProgress } from '@mui/material'
import Image from 'next/image'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'

import styles from './ForgotPassForm.module.scss'

import { useRecoverPasswordMutation } from '@/shared/api/model/auth.api'
import { PasswordRecoveryType } from '@/shared/api/model/auth.api.types'
import captchaIcon from '@/shared/assets/icons/login/reCaptchaIcon.svg'
import { Button, ButtonSize, ButtonTheme } from '@/shared/ui/Button/Button'
import { Checkbox } from '@/shared/ui/Checkbox/Checkbox'
import { Input, InputType } from '@/shared/ui/Input/Input'
import inputStyles from '@/shared/ui/Input/Input.module.scss'

const schema = yup.object({
  email: yup.string().trim().email('invalid email').required('emailErrorMessage'),
  recaptcha: yup.string().nonNullable().trim().required('Token is required'),
})

type FormType = {
  email: string
  recaptcha: boolean
}

function ForgotPass() {
  // const recaptcha = '6LeY2y0mAAAAANwI_paCWfoksCgBm1n2z9J0nwNQ'
  const [isSentPass, setIsSentPass] = useState(false)
  const [token, setToken] = useState<string>('')
  const [recoverPassword, { isLoading }] = useRecoverPasswordMutation()

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<FormType>({
    mode: 'onChange',
    defaultValues: {
      email: '',
      recaptcha: false,
    },
  })

  const handleChangeCaptcha = (value: string) => {
    setToken(value)
    setValue('recaptcha', value)
  }

  const onSubmit: SubmitHandler<PasswordRecoveryType> = data => {
    data.recaptcha = token
    console.log(data)
    recoverPassword(data)
      .unwrap()
      .then(() => {
        reset()
        setIsSentPass(true)
      })
      .catch(error => {
        console.log(error)
        // if (error.data.messages[0].field === 'email') {
        //   setError('email', {
        //     type: 'manual',
        //     message: error.data.messages[0].message,
        //   })
        // }
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
          <p className={styles.linkAgainText}>
            The link has been sent by email. If you don’t receive an email send link again
          </p>
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
        <Button className={styles.oppositeBtn} theme={ButtonTheme.CLEAR} size={ButtonSize.MIDDLE}>
          Back to Sign In
        </Button>
        <div className={styles.captchaContainer}>
          <Checkbox
            label={<p>I&apos;m not a robot</p>}
            {...register('recaptcha', {
              required: 'Recaptcha is required',
            })}
            error={errors.recaptcha && errors.recaptcha?.message}
          />
          <div className={styles.captchaIcon}>
            <Image src={captchaIcon} alt={'captchaIcon'}></Image>
            <p>reCaptchaIcon</p>
            <span>Privacy - Terms</span>
          </div>
        </div>
      </form>
    </>
  )
}

export default ForgotPass
