import React, { useState } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'

import styles from './SignInForm.module.scss'

import { LoginFormType, useLoginMutation } from '@/shared/api'
import githubIcon from '@/shared/assets/icons/socialIcons/github-icon.svg'
import googleIcon from '@/shared/assets/icons/socialIcons/google-icon.svg'
import { Button, ButtonSize } from '@/shared/ui/Button/Button'
import { Input, InputType } from '@/shared/ui/Input/Input'

const schema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Enter email'),
  password: yup.string().required('Enter password'),
})

export const Sign = () => {
  const [passwordError, setPasswordError] = useState<string>('')
  const [emailError, setEmailError] = useState<string>('')
  const [login, { isLoading, isError, data }] = useLoginMutation()
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
      .then(res => {
        router.replace('/')
      })
      .catch(error => {
        if (error && error.data) {
          const { statusCode } = error.data

          if (statusCode === 400) {
            setPasswordError('The password is incorrect. Try again please ')
          } else if (statusCode === 401) {
            setEmailError('This email address is not registered. Please register')
          }
        } else {
          alert('Network error')
        }
      })
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <form className={styles.formContainer} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.socialIconContainer}>
        <Image src={googleIcon} alt="google icon" />
        <Image src={githubIcon} alt="github icon" />
      </div>
      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <Input
            label={'Email'}
            type={InputType.EMAIL}
            placeholder="Enter email"
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
            label={'Password'}
            type={InputType.PASSWORD}
            placeholder="Enter password"
            error={errors.password?.message || (passwordError as string)}
            {...field}
          />
        )}
      />
      <Link href="/forgot-password" className={styles.signInForgotText}>
        Forgot Password
      </Link>
      <Button size={ButtonSize.STRETCHED}>Sign In</Button>
      <p className={styles.helpText}>Don’t have an account?</p>
      <Link href="/sign-up" className={styles.link}>
        <p className={styles.oppositeBtn}>Sign Up</p>
      </Link>
    </form>
  )
}
