import { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { algByDecodingToken } from '../../utils/algByDecodingToken'
import { baseURL } from '../baseUrl.api'
import { BaseUserType } from '../profile/profile.api.types'

import {
  LoginFormType,
  LoginType,
  LogoutType,
  NewPasswordType,
  PasswordRecoveryType,
  SignUpType,
  UserType,
  ResendVerificationLinkType,
} from './auth.api.types'

const baseQuery = fetchBaseQuery({
  baseUrl: baseURL,
  method: 'POST',
  credentials: 'same-origin',
  prepareHeaders: headers => {
    const token = localStorage.getItem('accessToken')

    if (token) {
      headers.set('Authorization', `Bearer ${token}`)
      algByDecodingToken(token)
    }

    return headers
  },
})

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions
) => {
  let result = await baseQuery(args, api, extraOptions)

  if (result.error && result.error.status === 401) {
    const token = localStorage.getItem('accessToken')

    if (!token) {
      throw new Error('Token not found')
    }
    // check weather token is expired. If token is expired, it requires to update token and set it to localStorage
    const { isExpirationTimeLongerThanCurrent } = algByDecodingToken(token)

    if (!isExpirationTimeLongerThanCurrent) {
      const refreshResult = await baseQuery(`${baseURL}auth/update-tokens`, api, extraOptions)

      if (
        refreshResult.data &&
        typeof refreshResult.data === 'object' &&
        'accessToken' in refreshResult.data
      ) {
        localStorage.setItem('accessToken', refreshResult.data.accessToken as string)
      }
    }
  }

  if (
    api.endpoint === 'login' &&
    result.data &&
    typeof result.data === 'object' &&
    'accessToken' in result.data
  ) {
    localStorage.setItem('accessToken', result.data.accessToken as string)
  }

  if (api.endpoint === 'logout') {
    localStorage.removeItem('accessToken')
  }

  return result
}

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Me'],
  endpoints: build => {
    return {
      login: build.mutation<LoginType, LoginFormType>({
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
        invalidatesTags: ['Me'],
      }),
      signUp: build.mutation<UserType, SignUpType>({
        query: ({ userName, email, password }: UserType) => {
          return {
            method: 'POST',
            url: 'auth/registration',
            body: {
              userName,
              email,
              password,
            },
          }
        },
      }),
      logout: build.mutation<LogoutType, void>({
        query: () => ({
          method: 'POST',
          url: 'auth/logout',
        }),
        invalidatesTags: ['Me'],
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
        query: ({ email, recaptcha }: PasswordRecoveryType) => {
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
      createNewPassword: build.mutation<any, NewPasswordType>({
        query: ({ newPassword, recoveryCode }: NewPasswordType) => {
          return {
            method: 'POST',
            url: 'auth/new-password',
            body: {
              newPassword,
              recoveryCode,
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
      me: build.query<BaseUserType, void>({
        query: () => {
          return {
            method: 'GET',
            url: 'auth/me',
          }
        },
        providesTags: ['Me'],
      }),
      updateToken: build.mutation({
        query: () => {
          return {
            method: 'POST',
            url: 'auth/update-tokens',
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
  useMeQuery,
  useLazyMeQuery,
  useUpdateTokenMutation,
} = authApi
