import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'

import { baseURL } from '@/shared/api'
import {
  ImagesResponse,
  PostsResponseType,
  PostsType,
} from '@/shared/api/services/posts/posts.api.types'

export const postsApi = createApi({
  reducerPath: 'postsApi',
  baseQuery: fetchBaseQuery({ baseUrl: baseURL, credentials: 'include' }),
  tagTypes: ['createPost'],
  endpoints: build => {
    return {
      createPost: build.mutation<PostsResponseType, PostsType>({
        query: body => {
          return {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${localStorage.getItem('accessToken') as string}`,
            },
            url: 'posts',
            body,
          }
        },
        invalidatesTags: ['createPost'],
      }),
      uploadImage: build.mutation<ImagesResponse, FormData>({
        query: body => {
          return {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${localStorage.getItem('accessToken') as string}`,
            },
            url: 'posts/image',
            body,
          }
        },
      }),
    }
  },
})

export const { useCreatePostMutation, useUploadImageMutation } = postsApi
