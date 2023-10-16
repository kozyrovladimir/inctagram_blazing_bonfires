import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'

import { baseURL } from '../baseUrl.api'

import { UserSessionsType } from './devices.api.types'

export const devicesApi = createApi({
  reducerPath: 'devicesApi',
  baseQuery: fetchBaseQuery({ baseUrl: baseURL, credentials: 'include' }),
  tagTypes: ['sessions'],
  endpoints: build => {
    return {
      getSessions: build.query<UserSessionsType[], void>({
        query: () => {
          return {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('accessToken') as string}`,
            },
            url: 'sessions',
          }
        },
        providesTags: ['sessions'],
      }),
      deleteSession: build.mutation<any, number>({
        query: id => {
          return {
            method: 'DELETE',
            headers: {
              Authorization: `Bearer ${localStorage.getItem('accessToken') as string}`,
            },
            url: `sessions/${id}`,
          }
        },
        invalidatesTags: ['sessions'],
      }),
      terminateAll: build.mutation<any, void>({
        query: () => {
          return {
            method: 'DELETE',
            headers: {
              Authorization: `Bearer ${localStorage.getItem('accessToken') as string}`,
            },
            url: `sessions/terminate-all`,
          }
        },
        invalidatesTags: ['sessions'],
      }),
    }
  },
})

export const { useGetSessionsQuery, useDeleteSessionMutation, useTerminateAllMutation } = devicesApi
