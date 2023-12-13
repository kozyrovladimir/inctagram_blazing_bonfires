import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'

import { baseURL } from '@/shared/api'
import {
  GetPostsResponseType,
  GetUserPostsRequestType,
  GetUserPostsResponseType,
  ImagesResponse,
  PostsResponseType,
  PostsType,
} from '@/shared/api/services/posts/posts.api.types'

export const postsApi = createApi({
  reducerPath: 'postsApi',
  baseQuery: fetchBaseQuery({ baseUrl: baseURL, credentials: 'include' }),
  tagTypes: ['deletePost', 'createPost'],
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
      getPost: build.query<GetPostsResponseType, number>({
        query: postId => {
          return {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${localStorage.getItem('accessToken') as string}`,
            },
            url: `posts/p/${postId}`,
          }
        },
      }),
      getUserPost: build.query<GetUserPostsResponseType, GetUserPostsRequestType>({
        query: ({ userId, pageNumber, pageSize }) => {
          return {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${localStorage.getItem('accessToken') as string}`,
            },
            url: `public-posts/user/${userId}`,
            params: {
              pageSize,
              pageNumber,
            },
          }
        },
        providesTags: ['deletePost', 'createPost'],
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

export const {
  useCreatePostMutation,
  useUploadImageMutation,
  useLazyGetPostQuery,
  useLazyGetUserPostQuery,
  useGetPostQuery,
  useGetUserPostQuery,
} = postsApi
