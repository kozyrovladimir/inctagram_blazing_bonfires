import { PropsWithChildren } from 'react'

import { NextPage } from 'next'
import { useRouter } from 'next/router'

import { useMeQuery } from '../../api/services/auth/auth.api'

const publicPaths = ['/sign-in', '/sign-up']

const emailConfirmationPaths = [
  '/auth/expired-verification-link',
  '/auth/registration-confirmation',
]

export const WithAuth: NextPage<PropsWithChildren> = ({ children }) => {
  const router = useRouter()

  // check weather url contains private paths
  if (emailConfirmationPaths.some(paths => paths === router.pathname)) {
    return children
  }

  const { data, error, isLoading, isError } = useMeQuery({})

  if (isError) {
    // if to use router.push will be infinite rerenders. Instead of it needs to use window.history.pushState to prevent rerenders
    // router.push('/sign-in')

    window.history.pushState({}, '', window.location.origin + '/sign-in')
  }

  return children
}
