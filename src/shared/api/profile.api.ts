import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { LoginResponseType } from './model/auth.api.types'

import { ProfileUserType, BaseUserType } from '@/shared/api/general.api.types'
import { baseURL } from '@/shared/api/model/common.api'

export const profileApi = createApi({
  reducerPath: 'profileApi',
  baseQuery: fetchBaseQuery({ baseUrl: baseURL, credentials: 'include' }),
  tagTypes: ['dataProfile'],
  endpoints: build => {
    return {
      getAuthMe: build.query<BaseUserType, void>({
        query: () => {
          return {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('accessToken') as string}`,
            },
            url: 'auth/me',
          }
        },
      }),
      getProfile: build.query<ProfileUserType, number | null>({
        query: id => {
          return {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${localStorage.getItem('accessToken') as string}`,
            },
            url: 'users/profile',
            params: { id },
          }
        },
        providesTags: ['dataProfile'],
      }),
      updateProfile: build.mutation<ProfileUserType, ProfileUserType>({
        query: (data: ProfileUserType) => {
          const { ...body } = data

          return {
            method: 'PUT',
            url: 'users/profile',
            headers: {
              Authorization: `Bearer ${localStorage.getItem('accessToken') as string}`,
            },
            body,
          }
        },
        invalidatesTags: ['dataProfile'],
      }),
      updateTokens: build.mutation<LoginResponseType, void>({
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
  useGetProfileQuery,
  useGetAuthMeQuery,
  useUpdateProfileMutation,
  useUpdateTokensMutation,
} = profileApi
