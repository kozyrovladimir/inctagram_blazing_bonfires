import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import {
  LoginFormType,
  LoginResponseType,
  LogoutResponse,
  NewPasswordType,
  PasswordRecoveryType,
  SignUpType,
  UserType,
} from './auth.api.types'
import { baseURL } from './common.api'

import {
  LoginFormType,
  LoginResponseType,
  LogoutResponse,
  SignUpType,
  UserType,
} from '@/shared/api'
import { ResendVerificationLinkType } from '@/shared/api/model/auth.api.types'

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
          return {
            method: 'POST',
            url: 'auth/registration-confirmation',
            body: {
              confirmationCode,
            },
          }
        },
      }),
      recoverPassword: build.mutation<any, PasswordRecoveryType>({
        query: (data: PasswordRecoveryType) => {
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
      createNewPassword: build.mutation<any, NewPasswordType>({
        query: (data: NewPasswordType) => {
          return {
            method: 'POST',
            url: 'auth/new-password',
            body: {
              newPassword: data.newPassword,
              recoveryCode: data.recoveryCode,
            },
          }
        },
      }),
      resendVerificationLink: build.mutation<string, ResendVerificationLinkType>({
        query: ({ email, baseUrl }) => {
          return {
            method: 'POST',
            url: 'auth/registration-email-resending',
            body: {
              email,
              baseUrl,
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
  useRecoverPasswordMutation,
  useCreateNewPasswordMutation,
  useResendVerificationLinkMutation,
} = authApi
