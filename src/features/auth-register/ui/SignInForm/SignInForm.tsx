import React, { useState } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { Controller, useForm } from 'react-hook-form'
import { toast, Toaster } from 'react-hot-toast'
import * as yup from 'yup'

import styles from './SignInForm.module.scss'

import { OAuth } from '@/features/auth-register/ui/OAuth/OAuth'
import { useLoginMutation, LoginFormType } from '@/shared/api'
import { AppErrors } from '@/shared/common/errors'
import { Button, ButtonSize } from '@/shared/ui/Button/Button'
import FormContainer from '@/shared/ui/FormContainer/FormContainer'
import { Input, InputType } from '@/shared/ui/Input/Input'
import { LinearLoader } from '@/shared/ui/Loaders/LinearLoader'
import { ShortLangs } from '@/widgets/LangSwitcher/ui/LanguageSelect/LanguageSelect'

export const SignInForm = () => {
  const { t, i18n } = useTranslation('common', { keyPrefix: 'Auth' })
  const { t: tError } = useTranslation('common', { keyPrefix: 'Error' })

  const schema = yup.object().shape({
    email: yup
      .string()
      .min(2, tError('MinCharactrers2'))
      .matches(
        /^([a-zA-Z0-9._%+-]+)@([a-zA-Z0-9-]+.)+([a-zA-Z]{2,})$/,
        tError('EmailValidationError')
      )
      .required(tError('RequiredField')),
    password: yup
      .string()
      .min(6, tError('MinCharactrers6'))
      .max(20, tError('MaxCharactrers20'))
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
      .then(() => router.push('/profile'))
      .catch(error => {
        if (error && error.data) {
          const { statusCode } = error.data

          if (statusCode === 400) {
            setPasswordError(tError('PasswordIncorrect'))
          } else if (statusCode === 401) {
            setEmailError(tError('EmailNotRegidtred'))
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
          <Link href="/sign-up" className={styles.link}>
            <p className={styles.oppositeBtn}>{t('SignUp')}</p>
          </Link>
        </form>
      </FormContainer>
    </>
  )
}
