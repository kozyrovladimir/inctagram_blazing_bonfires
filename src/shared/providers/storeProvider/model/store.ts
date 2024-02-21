import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { createWrapper } from 'next-redux-wrapper'

import { authApi, devicesApi, profileApi, publicApi, subscriptionsApi } from '../../../api'

import userManagementSlice from '@/features/user-management/model/userManagementSlice'
import adminAuthReducer from '@/pages/super-admin/modal/slices/admin-auth-reducer'
import adminReducer from '@/pages/super-admin/modal/slices/admin-reducer'
import { authReducer } from '@/shared/api/services/auth/auth.slice'
import { postsApi } from '@/shared/api/services/posts/posts.api'
import generalInfoReducer from '@/shared/providers/storeProvider/slices/profileSettings/generalInfoReducer'

const rootReducer = combineReducers({
  auth: authReducer,
  profileSetting: generalInfoReducer,
  admin: adminReducer,
  adminAuth: adminAuthReducer,
  userManagement: userManagementSlice,
  [authApi.reducerPath]: authApi.reducer,
  [profileApi.reducerPath]: profileApi.reducer,
  [devicesApi.reducerPath]: devicesApi.reducer,
  [postsApi.reducerPath]: postsApi.reducer,
  [subscriptionsApi.reducerPath]: subscriptionsApi.reducer,
  [publicApi.reducerPath]: publicApi.reducer,
})

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
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

setupListeners(makeStore().dispatch)

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

export const wrapper = createWrapper<AppStore>(makeStore, { debug: true })
