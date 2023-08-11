import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

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
    }
  },
})

export const { useLoginMutation, useLogoutMutation, useSignUpMutation, useVerifyEmailMutation } =
  authApi
