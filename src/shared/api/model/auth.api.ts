import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import {
  LoginFormType,
  LoginResponseType,
  LogoutResponse,
  PasswordRecoveryType,
  SignUpType,
  UserType,
} from './auth.api.types'
import { baseURL } from './common.api'

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
        query: (email, recaptcha) => {
          return {
            method: 'POST',
            url: 'auth/password-recovery',
            body: {
              email,
              recaptcha,
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
} = authApi
