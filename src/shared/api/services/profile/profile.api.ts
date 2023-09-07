import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import moment from 'moment'

import { baseURL } from '../baseUrl.api'

import { AvatarsType, BaseUserType, ProfileUserType } from './profile.api.types'

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
      updateAvatar: build.mutation<any, FormData>({
        query: data => {
          return {
            method: 'POST',
            url: 'users/profile/avatar',
            headers: {
              Authorization: `Bearer ${localStorage.getItem('accessToken') as string}`,
            },
            body: data,
          }
        },
        invalidatesTags: ['dataProfile'],
      }),
      deleteAvatar: build.mutation<void, void>({
        query: () => {
          return {
            method: 'DELETE',
            url: 'users/profile/avatar',
            headers: {
              Authorization: `Bearer ${localStorage.getItem('accessToken') as string}`,
            },
          }
        },
        invalidatesTags: ['dataProfile'],
      }),
    }
  },
})

export const {
  useGetProfileQuery,
  useUpdateProfileMutation,
  useUpdateAvatarMutation,
  useDeleteAvatarMutation,
} = profileApi
