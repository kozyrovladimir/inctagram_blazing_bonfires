import React, { useEffect, useState } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import { GetStaticProps } from 'next'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { FieldErrors, FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { toast, Toaster } from 'react-hot-toast'
import * as yup from 'yup'

import styles from './SignUpForm.module.scss'

import { OAuth } from '@/features/auth-register/ui/OAuth/OAuth'
import { SignUpType, useSignUpMutation } from '@/shared/api'
import { AppErrors } from '@/shared/common/errors'
import { Button, ButtonSize, ButtonTheme } from '@/shared/ui/Button/Button'
import { Checkbox } from '@/shared/ui/Checkbox/Checkbox'
import FormContainer from '@/shared/ui/FormContainer/FormContainer'
import { Input, InputType } from '@/shared/ui/Input/Input'
import inputStyles from '@/shared/ui/Input/Input.module.scss'
import { LinearLoader } from '@/shared/ui/Loaders/LinearLoader'
import { Modal } from '@/shared/ui/Modal/Modal'

type FormType = {
  userName: string
  email: string
  password: string
  passwordConfirmation: string
  agreement: boolean
}

export const SignUpForm = () => {
  const {
    t,
    i18n: { t: tRoot },
  } = useTranslation('common', { keyPrefix: 'Auth' })
  const { t: tError } = useTranslation('common', { keyPrefix: 'Error' })

  const [signUp, { isLoading }] = useSignUpMutation()
  const [registrationSuccess, setRegistrationSuccess] = useState(false)
  const callBackCloseWindow = () => setRegistrationSuccess(false)

  const schema = yup.object().shape({
    userName: yup
      .string()
      .min(6, tError('MinCharactrers6'))
      .max(20, tError('MaxCharactrers30'))
      .matches(/^[0-9A-Za-z_-]{6,20}$/, tError('UserNameValidationError'))
      .required(tError('RequiredField')),
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
      .matches(/^[a-zA-Z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]*$/, tError('PasswordValidationError'))
      .required(tError('RequiredField')),
    passwordConfirmation: yup.string().required(tError('RequiredField')),
    agreement: yup.string().required(tError('RequiredField')),
  })

  const {
    watch,
    register,
    handleSubmit,
    setError,
    getValues,
    formState: { errors },
    reset,
  } = useForm<FormType | any>({
    mode: 'onTouched',
    resolver: yupResolver(schema),
    defaultValues: {
      userName: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      agreement: false,
    },
  })
  const password = watch('password', '')
  const onSubmit: SubmitHandler<SignUpType> = (data: SignUpType) => {
    signUp(data)
      .unwrap()
      .then(() => {
        reset()
        setRegistrationSuccess(true)
      })
      .catch(error => toast.error(error.data.messages[0].message))
  }

  const isFillField = getValues([
    'userName',
    'email',
    'password',
    'passwordConfirmation',
    'agreement',
  ]).every(e => !!e)

  return (
    <>
      <Toaster position="top-right" />
      {isLoading && <LinearLoader />}
      {registrationSuccess && (
        <Modal title={t('EmailSent')} mainButton={'OK'} callBackCloseWindow={callBackCloseWindow}>
          <p>{t('LinkConfirmYourEmail')} </p>
        </Modal>
      )}
      <FormContainer title={t('SignUp')}>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.formContainer} noValidate>
          <OAuth />
          <Input
            {...register('userName')}
            type={InputType.TEXT}
            label={t('UserName')}
            placeholder={t('EnterName')}
            className={inputStyles.input}
            error={(errors as FieldErrors<FormType>)?.userName?.message}
            disabled={isLoading}
          />
          <Input
            {...register('email')}
            label={t('Email')}
            placeholder={t('EnterEmail')}
            type={InputType.EMAIL}
            className={inputStyles.input}
            error={(errors as FieldErrors<FormType>)?.email?.message}
            disabled={isLoading}
          />
          <Input
            {...register('password')}
            label={t('Password')}
            placeholder={t('EnterPassword')}
            type={InputType.PASSWORD}
            className={inputStyles.input}
            error={(errors as FieldErrors<FormType>)?.password?.message}
            disabled={isLoading}
          />
          <Input
            {...register('passwordConfirmation', {
              validate: {
                value: (value: string) => value === password || 'Passwords do not match',
              },
            })}
            label={t('PasswordConfirmation')}
            placeholder={t('EnterPasswordConfirmation')}
            type={InputType.PASSWORD}
            className={inputStyles.input}
            error={(errors as FieldErrors<FormType>)?.passwordConfirmation?.message}
            disabled={isLoading}
          />
          <div className={styles.agreementContainer}>
            <Checkbox
              {...register('agreement', {
                required: 'Agreement checkbox is required',
              })}
              error={(errors as FieldErrors<FormType>)?.agreement?.message}
              disabled={isLoading}
              label={
                <p className={styles.agreementText}>
                  {t('AgreeToThe') + ' '}
                  <Link href="/auth/terms-of-service" className={styles.agreementLink}>
                    {t('TermsOfService')}
                  </Link>
                  {' ' + tRoot('And') + ' '}
                  <Link href="/auth/privacy-policy" className={styles.agreementLink}>
                    {t('PrivacyPolicy')}
                  </Link>
                </p>
              }
            />
          </div>
          <Button className={styles.signUpBtn} size={ButtonSize.STRETCHED}>
            {t('SignUp')}
          </Button>
          <p className={styles.helpText}>{t('HaveAccount?')}</p>
          <Link href={'/sign-in'}>
            <Button
              className={styles.oppositeBtn}
              theme={ButtonTheme.CLEAR}
              size={ButtonSize.SMALL}
            >
              {t('SignIn')}
            </Button>
          </Link>
        </form>
      </FormContainer>
    </>
  )
}
