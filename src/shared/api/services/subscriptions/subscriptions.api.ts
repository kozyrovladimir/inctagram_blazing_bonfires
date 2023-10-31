import { debuggerStatement } from '@babel/types'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { baseURL } from '../baseUrl.api'

import {
  CurrentSubscriptionType,
  NewSubscriptionType,
  ResponseNewSubscriptionType,
  SubscriptionDataType,
} from '@/shared/api/services/subscriptions/subscriptions.api.types'

export const subscriptionsApi = createApi({
  reducerPath: 'subscriptionsApi',
  baseQuery: fetchBaseQuery({ baseUrl: baseURL, credentials: 'include' }),
  tagTypes: ['dataPSubscriptions'],
  endpoints: build => {
    return {
      getSubscriptions: build.query<SubscriptionDataType[], any>({
        query: () => ({
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken') as string}`,
          },
          method: 'GET',
          url: 'subscriptions/my-payments',
        }),
      }),
      getCurrentSubscriptions: build.query<CurrentSubscriptionType[], void>({
        query: () => ({
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken') as string}`,
          },
          url: `subscriptions/current-subscriptions`,
          method: 'GET',
        }),
      }),
      createNewSubscription: build.mutation<ResponseNewSubscriptionType, NewSubscriptionType>({
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
  useGetCurrentSubscriptionsQuery,
  useCreateNewSubscriptionMutation,
} = subscriptionsApi
