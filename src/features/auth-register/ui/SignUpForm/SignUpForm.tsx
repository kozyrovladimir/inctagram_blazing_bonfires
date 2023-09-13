import React, { useState } from 'react'

import { CircularProgress } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast, Toaster } from 'react-hot-toast'

import styles from './SignUpForm.module.scss'

import { SignUpType, useSignUpMutation } from '@/shared/api'
import githubIcon from '@/shared/assets/icons/socialIcons/github-icon.svg'
import googleIcon from '@/shared/assets/icons/socialIcons/google-icon.svg'
import { Button, ButtonSize, ButtonTheme } from '@/shared/ui/Button/Button'
import { Checkbox } from '@/shared/ui/Checkbox/Checkbox'
import { Input, InputType } from '@/shared/ui/Input/Input'
import inputStyles from '@/shared/ui/Input/Input.module.scss'
import { Modal } from '@/shared/ui/Modal/Modal'

type FormType = {
  userName: string
  email: string
  password: string
  passwordConfirmation: string
  agreement: boolean
}

export function SignUpForm() {
  const [signUp, { isLoading }] = useSignUpMutation()
  const [registrationSuccess, setRegistrationSuccess] = useState(false)
  const callBackCloseWindow = () => setRegistrationSuccess(false)

  const {
    watch,
    register,
    handleSubmit,
    setError,
    formState: { errors },
    reset,
  } = useForm<FormType>({
    mode: 'onChange',
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
      // todo field name(back returns) !== userName and this shows an error in email field,
      //  although the error occurred in name, ask support
      .catch(error => toast.error(error.data.messages[0].message))
  }

  return (
    <>
      <Toaster position="top-right" />
      {registrationSuccess && (
        <Modal title={'Email sent'} mainButton={'OK'} callBackCloseWindow={callBackCloseWindow}>
          <p>We have sent a link to confirm your email </p>
        </Modal>
      )}
      {isLoading && <CircularProgress />}
      <form onSubmit={handleSubmit(onSubmit)} className={styles.formContainer}>
        <div className={styles.socialIconContainer}>
          <Image src={googleIcon} alt="google icon" />
          <Image src={githubIcon} alt="github icon" />
        </div>
        <Input
          {...register('userName', {
            required: 'Username field is required',
            minLength: 3,
          })}
          type={InputType.TEXT}
          label="Username"
          placeholder="Enter name"
          className={inputStyles.input}
          error={errors.userName && errors.userName?.message}
        />
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
        <Input
          {...register('password', {
            required: 'Password field is required',
            pattern: {
              value: /^[a-zA-Z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]*$/,
              message:
                'Password must contain a-z, A-Z,  ! " # $ % & \' ( ) * + , - . / : ; < = > ? @ [ \\ ] ^ _` { | } ~',
            },
            minLength: {
              value: 6,
              message: 'Email must be at least 6 characters long',
            },
            maxLength: {
              value: 30,
              message: 'Email must not exceed 30 characters',
            },
          })}
          label="Password"
          type={InputType.PASSWORD}
          placeholder="Enter password"
          className={inputStyles.input}
          error={errors.password && errors.password?.message}
        />
        <Input
          {...register('passwordConfirmation', {
            required: 'Confirm password field is required',
            validate: {
              value: (value: string) => value === password || 'Passwords do not match',
            },
          })}
          label="Password confirmation"
          type={InputType.PASSWORD}
          placeholder="Enter password confirmation"
          className={inputStyles.input}
          error={errors.passwordConfirmation && errors.passwordConfirmation?.message}
        />
        <div className={styles.agreementContainer}>
          <Checkbox
            {...register('agreement', {
              required: 'Agreement checkbox is required',
            })}
            error={errors.agreement && errors.agreement?.message}
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
          <Button className={styles.oppositeBtn} theme={ButtonTheme.CLEAR} size={ButtonSize.SMALL}>
            Sign In
          </Button>
        </Link>
      </form>
    </>
  )
}
