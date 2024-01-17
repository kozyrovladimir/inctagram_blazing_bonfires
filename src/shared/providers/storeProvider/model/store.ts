import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import { createWrapper } from 'next-redux-wrapper'

import { authApi, devicesApi, profileApi, publicApi, subscriptionsApi } from '../../../api'

import { postsApi } from '@/shared/api/services/posts/posts.api'
import generalInfoReducer from '@/shared/providers/storeProvider/slices/profileSettings/generalInfoReducer'

const makeStore = () => {
  return configureStore({
    reducer: {
      profileSetting: generalInfoReducer,
      [authApi.reducerPath]: authApi.reducer,
      [profileApi.reducerPath]: profileApi.reducer,
      [devicesApi.reducerPath]: devicesApi.reducer,
      [postsApi.reducerPath]: postsApi.reducer,
      [subscriptionsApi.reducerPath]: subscriptionsApi.reducer,
      [publicApi.reducerPath]: publicApi.reducer,
    },
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware().concat(
        authApi.middleware,
        profileApi.middleware,
        devicesApi.middleware,
        postsApi.middleware,
        subscriptionsApi.middleware,
        publicApi.middleware
      ),
  })
}

// setupListeners(store.dispatch)

type AppStore = ReturnType<typeof makeStore>
export type AppDispatch = ReturnType<AppStore['dispatch']>
export type RootState = ReturnType<AppStore['getState']>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>

export const wrapper = createWrapper<AppStore>(makeStore, { debug: true })
