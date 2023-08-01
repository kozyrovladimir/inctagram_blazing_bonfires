import React from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios, { AxiosResponse } from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'

import github from '../../../../public/icons/github.png'
import google from '../../../../public/icons/google.png'

import style from './LoginForm.module.scss'

import { Button } from '@/shared/ui/Button/Button'
import { Input, InputType } from '@/shared/ui/Input/Input'

type LoginFormType = {
  email: string
  password: string
}

type LoginResponseType = {
  accessToken: string
}

const schema = yup.object().shape({
  email: yup.string().email('Invalid email address').required('Enter email'),
  password: yup
    .string()
    .required('The password or email you entered is incorrect. Please try again'),
})

export const LoginForm = () => {
  const queryClient = useQueryClient()
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

  const { mutate, isLoading, isSuccess } = useMutation({
    mutationFn: (formData: LoginFormType) => {
      return axios.post('https://inctagram-api.vercel.app/api/auth/login', formData)
    },
    onSuccess: async (data: AxiosResponse<LoginResponseType>) => {
      queryClient.setQueryData<LoginResponseType>(['authToken'], data.data)
      await router.push('/profile')
    },
    onError: (error: any) => {
      alert(error.response.data.messages[0].message)
    },
  })

  const onSubmit = (formData: LoginFormType) => {
    mutate(formData)
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className={style.wrapper}>
      <div className={style.title}>Sign in</div>
      <div className={style.image}>
        <Image src={google} alt="google" height={36} />
        <Image src={github} alt="github" style={{ marginLeft: '60px' }} height={36} />
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className={style.form}>
        <div>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Input
                label={'Email'}
                type={InputType.EMAIL}
                placeholder="Enter email"
                error={errors.email?.message}
                {...field}
              />
            )}
          />
        </div>
        <div>
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <Input
                label={'Password'}
                type={InputType.PASSWORD}
                placeholder="Enter password"
                error={errors.password?.message}
                {...field}
              />
            )}
          />
        </div>
        <Link href="/forgot-password" className={style.forgot}>
          Forgot password
        </Link>
        <div>
          <Button
            style={{ height: '36px', width: '100%', marginTop: '30px' }}
            type="submit"
            disabled={isLoading}
          >
            Sign In
          </Button>
        </div>
        <div className={style.already}>{`Don't have an account?`} </div>
        <Link href="/sign-up" className={style.link}>
          <div className={style.singUp}>Sing up</div>
        </Link>
      </form>
    </div>
  )
}
