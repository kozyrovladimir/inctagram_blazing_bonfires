import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import { EndpointDefinitions, setupListeners } from '@reduxjs/toolkit/query'

import { authApi, profileApi, devicesApi } from '../../../api'

import generalInfoReducer from '@/shared/providers/storeProvider/slices/profileSettings/generalInfoReducer'

export const store = configureStore({
  reducer: {
    profileSetting: generalInfoReducer,
    [authApi.reducerPath]: authApi.reducer,
    [profileApi.reducerPath]: profileApi.reducer,
    [devicesApi.reducerPath]: devicesApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(authApi.middleware, profileApi.middleware, devicesApi.middleware),
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
