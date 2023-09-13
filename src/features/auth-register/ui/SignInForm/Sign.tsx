import React, { useState } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Controller, useForm } from 'react-hook-form'
import { toast, Toaster } from 'react-hot-toast'
import * as yup from 'yup'

import styles from './SignInForm.module.scss'

import { OAuth } from '@/features/auth-register/ui/OAuth/OAuth'
import { useLoginMutation, LoginFormType } from '@/shared/api'
import { Button, ButtonSize } from '@/shared/ui/Button/Button'
import FormContainer from '@/shared/ui/FormContainer/FormContainer'
import { Input, InputType } from '@/shared/ui/Input/Input'
import { LinearLoader } from '@/shared/ui/Loaders/LinearLoader'

const schema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Enter email'),
  password: yup.string().required('Enter password'),
})

export const Sign = () => {
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
            setPasswordError('The password is incorrect. Try again please ')
          } else if (statusCode === 401) {
            setEmailError('This email address is not registered. Please register')
          }
        } else {
          toast.error('Network error')
        }
      })
  }

  return (
    <>
      <Toaster position="top-right" />
      {isLoading && <LinearLoader />}
      <FormContainer title={'Sign in'}>
        <OAuth />
        <form className={styles.formContainer} onSubmit={handleSubmit(onSubmit)}>
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
      </FormContainer>
    </>
  )
}
