import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'

import { authApi, profileApi, devicesApi, subscriptionsApi } from '../../../api'

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [profileApi.reducerPath]: profileApi.reducer,
    [devicesApi.reducerPath]: devicesApi.reducer,
    [subscriptionsApi.reducerPath]: subscriptionsApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware()
      .concat(authApi.middleware, profileApi.middleware, devicesApi.middleware)
      .concat(subscriptionsApi.middleware),
})

setupListeners(store.dispatch)

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
