import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'

import { baseURL } from '@/shared/api'
import { PostImageType, PostsImageResponseType } from '@/shared/api/model/posts.api.types'

export const postsApi = createApi({
  reducerPath: 'postsApi',
  baseQuery: fetchBaseQuery({ baseUrl: baseURL, credentials: 'include' }),
  endpoints: build => {
    return {
      postsImage: build.mutation<PostsImageResponseType, PostImageType>({
        query: file => {
          return {
            method: 'POST',
            url: 'posts/image',
            body: {
              file,
            },
          }
        },
      }),
    }
  },
})

export const { usePostsImageMutation } = postsApi
