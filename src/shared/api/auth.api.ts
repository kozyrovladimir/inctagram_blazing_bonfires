import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { LoginFormType, LoginResponseType } from '../../shared/api/auth.api.types'
import { baseURL } from '../../shared/api/common.api'

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
    }
  },
})

export const { useLoginMutation } = authApi
