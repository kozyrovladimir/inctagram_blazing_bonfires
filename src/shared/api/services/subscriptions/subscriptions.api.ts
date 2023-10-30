import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { baseURL } from '../baseUrl.api'

export const subscriptionsApi = createApi({
  reducerPath: 'subscriptionsApi',
  baseQuery: fetchBaseQuery({ baseUrl: baseURL, credentials: 'include' }),
  tagTypes: ['dataPSubscriptions'],
  endpoints: build => {
    return {
      getSubscriptions: build.query<any, any>({
        query: () => {
          return {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('accessToken') as string}`,
            },
            method: 'GET',
            url: 'subscriptions/my-payments',
          }
        },
      }),
    }
  },
})

export const { useGetSubscriptionsQuery } = subscriptionsApi
