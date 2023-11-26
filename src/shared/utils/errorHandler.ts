import { SerializedError } from '@reduxjs/toolkit'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import router from 'next/router'
import { toast } from 'react-hot-toast'

import { RoutersPath } from '../constants/paths'
import { serverError } from '../types/errorTypes'

export const errorHandler = (
  error: FetchBaseQueryError | SerializedError | undefined,
  notAuthorizationMessage: string,
  ServerErrorMessage: string,
  networkErrorMessage: string
) => {
  const notAuthorizationHandler = () => {
    toast.error(notAuthorizationMessage, { id: notAuthorizationMessage })
    router.push(RoutersPath.signIn)
  }

  if (error) {
    const { status } = error as FetchBaseQueryError

    if (status === 401) {
      notAuthorizationHandler()
    } else {
      const errorMessage = (error as serverError)?.data?.error ?? ServerErrorMessage

      toast.error(errorMessage, { id: errorMessage })
    }
  } else {
    toast.error(networkErrorMessage, { id: networkErrorMessage })
  }
}
