import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { baseURL } from '@/shared/api'
import { UserType } from '@/shared/api/auth.api.types'

export const profileApi = createApi({
  reducerPath: 'profileApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://inctagram.work/api/v1/', credentials: 'include' }),
  endpoints: build => {
    return {
      getProfile: build.query<UserType, number>({
        query: id => `users/profile/${id}`,
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

export const { useGetProfileQuery, useUpdateProfileMutation } = profileApi
