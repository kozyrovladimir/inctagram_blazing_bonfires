/* eslint-disable no-useless-escape */
import React, { useState } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { Controller, useForm } from 'react-hook-form'
import { toast, Toaster } from 'react-hot-toast'
import * as yup from 'yup'

import styles from './SignInForm.module.scss'

import { OAuth } from '@/features/auth-register/ui/oAuth/OAuth'
import { useLoginMutation, LoginFormType } from '@/shared/api'
import { RoutersPath } from '@/shared/constants/paths'
import { Button, ButtonSize } from '@/shared/ui/button/Button'
import FormContainer from '@/shared/ui/formContainer/FormContainer'
import { Input, InputType } from '@/shared/ui/input/Input'
import { LinearLoader } from '@/shared/ui/loaders/LinearLoader'

export const SignInForm = () => {
  const { t, i18n } = useTranslation('common', { keyPrefix: 'Auth' })
  const { t: tError } = useTranslation('common', { keyPrefix: 'Error' })

  const schema = yup.object().shape({
    email: yup
      .string()
      .min(2, tError('MinCharacters2'))
      .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, tError('EmailValidationError'))
      .required(tError('RequiredField')),
    password: yup
      .string()
      .min(6, tError('MinCharacters6'))
      .max(20, tError('MaxCharacters20'))
      .required(tError('RequiredField')),
  })

  const [passwordError, setPasswordError] = useState<string>('')
  const [emailError, setEmailError] = useState<string>('')
  const [login, { isLoading }] = useLoginMutation()
  const router = useRouter()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormType>({
    mode: 'onTouched',
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = (args: LoginFormType) => {
    login(args)
      .unwrap()
      .then(() => router.push(RoutersPath.profile))
      .catch(error => {
        if (error && error.data) {
          const { statusCode } = error.data

          if (statusCode === 400) {
            setPasswordError(tError('PasswordIncorrect'))
          } else if (statusCode === 401) {
            setEmailError(tError('EmailNotRegistered'))
          }
        } else {
          toast.error(tError('NetworkError'))
        }
      })
  }

  return (
    <>
      <Toaster position="top-right" />
      {isLoading && <LinearLoader />}
      <FormContainer title={t('SignIn')}>
        <OAuth />
        <form className={styles.formContainer} onSubmit={handleSubmit(onSubmit)} noValidate>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Input
                label={t('Email')}
                type={InputType.EMAIL}
                placeholder={t('EnterEmail')}
                error={errors.email?.message || (emailError as string)}
                {...field}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <Input
                label={t('Password')}
                type={InputType.PASSWORD}
                placeholder={t('EnterPassword')}
                error={errors.password?.message || (passwordError as string)}
                {...field}
              />
            )}
          />
          <Link href="/forgot-password" className={styles.signInForgotText}>
            {t('ForgotPassword')}
          </Link>
          <Button size={ButtonSize.STRETCHED}>{t('SignIn')}</Button>
          <p className={styles.helpText}>{t('DontHaveAccount?')}</p>
          <Link href={RoutersPath.signUp} className={styles.link}>
            <p className={styles.oppositeBtn}>{t('SignUp')}</p>
          </Link>
        </form>
      </FormContainer>
    </>
  )
}
