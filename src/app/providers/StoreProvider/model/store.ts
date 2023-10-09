import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'

import { authApi } from '@/shared/api'
import { postsApi } from '@/shared/api/model/posts.api'
import photosSlice from '@/features/profile-setting/ui/newPostModal/reducers/photos.slice'

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [postsApi.reducerPath]: postsApi.reducer,
    photos: photosSlice
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(authApi.middleware).concat(postsApi.middleware),
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
