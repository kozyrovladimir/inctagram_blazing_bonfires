import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import {
  SignUpType,
  UserType,
  ForgotPasswordType,
  LoginFormType,
  LoginResponseType,
  LogoutResponse,
  RecoveryPasswordType,
} from './../../shared/api/auth.api.types'
import { baseURL } from './../../shared/api/common.api'

import {
  LoginFormType,
  LoginResponseType,
  LogoutResponse,
  SignUpType,
  UserType,
} from '@/shared/api/auth.api.types'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: baseURL, credentials: 'include' }),
  endpoints: build => {
    return {
      login: build.mutation<LoginResponseType, LoginFormType>({
        query: ({ email, password }) => {
          return {
            method: 'POST',
            url: 'auth/login',
            body: {
              email,
              password,
            },
          }
        },
      }),
      signUp: build.mutation<UserType, SignUpType>({
        query: (data: UserType) => {
          return {
            method: 'POST',
            url: 'auth/registration',
            body: {
              userName: data.userName,
              email: data.email,
              password: data.password,
            },
          }
        },
      }),
      logout: build.mutation<LogoutResponse, void>({
        query: () => ({
          method: 'POST',
          url: 'auth/logout',
        }),
      }),
      verifyEmail: build.mutation<any, any>({
        query: (confirmationCode: string) => {
          console.log(confirmationCode)

          return {
            method: 'POST',
            url: 'auth/registration-confirmation',
            body: {
              confirmationCode,
            },
          }
        },
      }),
      forgotPassword: build.mutation<any, ForgotPasswordType>({
        query: (data: ForgotPasswordType) => {
          return {
            method: 'POST',
            url: 'auth/password-recovery',
            body: {
              email: data.email,
              recaptcha: data.recaptcha,
            },
          }
        },
      }),
      createNewPassword: build.mutation<UserType, RecoveryPasswordType>({
        query: (data: RecoveryPasswordType) => {
          return {
            method: 'POST',
            url: 'auth/new-password',
            body: {
              newPassword: data.newPassword,
              recoveryCodd: data.recoveryCode,
            },
          }
        },
      }),
    }
  },
})

export const {
  useLoginMutation,
  useLogoutMutation,
  useSignUpMutation,
  useVerifyEmailMutation,
  useForgotPasswordMutation,
  useCreateNewPasswordMutation,
} = authApi
