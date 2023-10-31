import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { baseURL } from '../baseUrl.api'

export const subscriptionsApi = createApi({
  reducerPath: 'subscriptionsApi',
  baseQuery: fetchBaseQuery({ baseUrl: baseURL, credentials: 'include' }),
  tagTypes: ['dataPSubscriptions'],
  endpoints: build => {
    return {
      getSubscriptions: build.query<any, any>({
        query: () => ({
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken') as string}`,
          },
          method: 'GET',
          url: 'subscriptions/my-payments',
        }),
      }),
      getSubscriptionsCost: build.query<any, void>({
        query: () => ({
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken') as string}`,
          },
          url: `subscriptions/cost-of-subscriptions`,
          method: 'GET',
        }),
      }),
      getCurrentSubscription: build.query<any, void>({
        query: () => ({
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken') as string}`,
          },
          url: `subscriptions/current-subscriptions`,
          method: 'GET',
        }),
      }),
      createNewSubscription: build.mutation<any, any>({
        query: body => ({
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken') as string}`,
          },
          url: 'subscriptions',
          method: 'POST',
          body,
        }),
      }),
    }
  },
})

export const {
  useGetSubscriptionsQuery,
  useGetSubscriptionsCost,
  useGetCurrentSubscription,
  useCreateNewSubscriptionMutation,
} = subscriptionsApi
