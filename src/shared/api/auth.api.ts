import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { baseURL } from './../../shared/api/common.api'
import { SignUpType, UserType } from './../../shared/types/types'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: baseURL, credentials: 'include' }),
  endpoints: build => {
    return {
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
export const { useSignUpMutation, useVerifyEmailMutation } = authApi
