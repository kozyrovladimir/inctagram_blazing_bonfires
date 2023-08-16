import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { baseURL } from './common.api'

import {
  LoginFormType,
  LoginResponseType,
  LogoutResponse,
  RequestNewVerificationLinkType,
  SignUpType,
  UserType,
} from '@/shared/api'

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
      requestNewVerificationLink: build.mutation<string, RequestNewVerificationLinkType>({
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

export const { useLoginMutation, useLogoutMutation, useSignUpMutation, useVerifyEmailMutation } =
  authApi
