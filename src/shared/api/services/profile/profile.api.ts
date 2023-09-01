import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { UserType } from '../auth/auth.api.types'
import { baseURL } from '../baseUrl.api'

export const profileApi = createApi({
  reducerPath: 'profileApi',
  baseQuery: fetchBaseQuery({ baseUrl: baseURL, credentials: 'include' }),
  endpoints: build => {
    return {
      getProfile: build.mutation<UserType, number>({
        query: id => {
          return {
            method: 'GET',
            url: 'users/profile',
            params: { id },
          }
        },
      }),
      updateProfile: build.mutation<UserType, UserType>({
        query: (data: UserType) => {
          return {
            method: 'PUT',
            url: 'users/profile',
            body: {
              userName: data.userName, // userProfile.userName,
              firstName: data.firstName,
              lastName: data.lastName,
              city: data.city,
              dateOfBirth: data.dateOfBirth,
              aboutMe: data.aboutMe,
            },
          }
        },
      }),
    }
  },
})

export const { useGetProfileMutation, useUpdateProfileMutation } = profileApi
