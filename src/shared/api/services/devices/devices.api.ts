import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'

import { baseURL } from '../baseUrl.api'

import { ISessions } from '@/shared/types/types'

export const devicesApi = createApi({
  reducerPath: 'devicesApi',
  baseQuery: fetchBaseQuery({ baseUrl: baseURL, credentials: 'include' }),
  endpoints: build => {
    return {
      getSessions: build.query<ISessions[], void>({
        query: () => {
          return {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('accessToken') as string}`,
            },
            url: 'sessions',
          }
        },
      }),
    }
  },
})

export const { useGetSessionsQuery } = devicesApi
