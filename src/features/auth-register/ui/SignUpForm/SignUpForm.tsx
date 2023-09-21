import React, { useState } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import Link from 'next/link'
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
  const [signUp, { isLoading }] = useSignUpMutation()
  const [registrationSuccess, setRegistrationSuccess] = useState(false)
  const callBackCloseWindow = () => setRegistrationSuccess(false)

  const singUpSchema = yup.object().shape({
    userName: yup
      .string()
      .min(6, AppErrors.MIN_6_CHARACTERS)
      .max(20, AppErrors.MAX_30_CHARACTERS)
      .matches(/^[0-9A-Za-z_-]$/, AppErrors.USERNAME_VALIDATION_ERROR_TEXT)
      .required(AppErrors.REQUIRED_FIELD),
    email: yup
      .string()
      .min(2, AppErrors.MIN_2_CHARACTERS)
      .matches(
        /^([a-zA-Z0-9._%+-]+)@([a-zA-Z0-9-]+.)+([a-zA-Z])$/,
        AppErrors.EMAIL_VALIDATION_ERROR_TEXT
      )
      .required(AppErrors.REQUIRED_FIELD),
    password: yup
      .string()
      .min(6, AppErrors.MIN_6_CHARACTERS)
      .max(20, AppErrors.MAX_20_CHARACTERS)
      .matches(
        /^[a-zA-Z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]*$/,
        AppErrors.PASSWORD_VALIDATION_ERROR_TEXT
      )
      .required(AppErrors.REQUIRED_FIELD),
    passwordConfirmation: yup.string().required(AppErrors.REQUIRED_FIELD),
    agreement: yup.string().required(AppErrors.REQUIRED_FIELD),
  })

  const {
    watch,
    register,
    handleSubmit,
    setError,
    formState: { errors },
    reset,
  } = useForm<FormType | any>({
    mode: 'onTouched',
    resolver: yupResolver(singUpSchema),
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

  return (
    <>
      <Toaster position="top-right" />
      {isLoading && <LinearLoader />}
      {registrationSuccess && (
        <Modal title={'Email sent'} mainButton={'OK'} callBackCloseWindow={callBackCloseWindow}>
          <p>We have sent a link to confirm your email </p>
        </Modal>
      )}
      <FormContainer title="Sign Up">
        <form onSubmit={handleSubmit(onSubmit)} className={styles.formContainer} noValidate>
          <OAuth />
          <Input
            {...register('userName')}
            type={InputType.TEXT}
            label="Username"
            placeholder="Enter name"
            className={inputStyles.input}
            error={(errors as FieldErrors<FormType>)?.userName?.message}
            disabled={isLoading}
          />
          <Input
            {...register('email')}
            label="Email"
            type={InputType.EMAIL}
            placeholder="Enter email"
            className={inputStyles.input}
            error={(errors as FieldErrors<FormType>)?.email?.message}
            disabled={isLoading}
          />
          <Input
            {...register('password')}
            label="Password"
            type={InputType.PASSWORD}
            placeholder="Enter password"
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
            label="Password confirmation"
            type={InputType.PASSWORD}
            placeholder="Enter password confirmation"
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
                  I agree to the{' '}
                  <Link href="/auth/terms-of-service" className={styles.agreementLink}>
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link href="/auth/privacy-policy" className={styles.agreementLink}>
                    Privacy Policy
                  </Link>
                </p>
              }
            />
          </div>
          <Button className={styles.signUpBtn} size={ButtonSize.STRETCHED}>
            Sign Up
          </Button>
          <p className={styles.helpText}>Do you have an account?</p>
          <Link href={'/sign-in'}>
            <Button
              className={styles.oppositeBtn}
              theme={ButtonTheme.CLEAR}
              size={ButtonSize.SMALL}
            >
              Sign In
            </Button>
          </Link>
        </form>
      </FormContainer>
    </>
  )
}
