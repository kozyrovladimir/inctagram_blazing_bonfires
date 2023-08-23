export {
  authApi,
  useLogoutMutation,
  useSignUpMutation,
  useLoginMutation,
  useVerifyEmailMutation,
} from './model/auth.api'
export {
  type LoginFormType,
  type LoginResponseType,
  type LogoutResponse,
  type RequestNewVerificationLinkType,
  type SignUpType,
  type UserType,
} from './model/auth.api.types'
export { baseURL, instance } from './model/common.api'

export { postsApi, usePostsImageMutation } from './model/posts.api'

export { type PostsImageResponseType, type PostImageType } from './model/posts.api.types'
