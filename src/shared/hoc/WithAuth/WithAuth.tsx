import { useRouter } from 'next/router'

import { useMeQuery, useUpdateTokenMutation } from '../../api/auth/auth.api'

const publicPaths = ['/sign-in', '/sign-up']
const emailConfirmationPaths = [
  '/auth/expired-verification-link',
  '/auth/registration-confirmation',
]

export const WithAuth = ({ children }) => {
  const router = useRouter()

  if (emailConfirmationPaths.some(paths => paths === router.pathname)) {
    return children
  }

  const { data, error, isLoading, isError } = useMeQuery()

  if (isError) {
    router.push('/sign-in')
  }

  return children
}
