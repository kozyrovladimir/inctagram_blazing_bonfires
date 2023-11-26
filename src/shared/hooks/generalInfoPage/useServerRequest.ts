import { useEffect } from 'react'

import { SerializedError } from '@reduxjs/toolkit'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'

import { useMeQuery } from '@/shared/api/services/auth/auth.api'
import {
  useDeleteAvatarMutation,
  useGetProfileQuery,
  useUpdateAvatarMutation,
  useUpdateProfileMutation,
} from '@/shared/api/services/profile/profile.api'
import { errorHandler } from '@/shared/utils/errorHandler'

type Props = {
  translate: {
    notAuthorization: string
    serverNotAvailable: string
    networkError: string
  }
}

export const useServerRequest = ({
  translate: { notAuthorization, serverNotAvailable, networkError },
}: Props) => {
  const { data, isError, error, isLoading } = useMeQuery()

  const {
    data: profileData,
    error: errorProfileData,
    isLoading: isLoadingProfileData,
  } = useGetProfileQuery(data?.userId ? data?.userId.toString() : '', {
    skip: isLoading || isError,
  })

  const [updateProfile, { isLoading: isLoadingUpdateProfile, error: errorUpdateProfile }] =
    useUpdateProfileMutation()

  const [updateAvatar, { isLoading: isLoadingAvatar, error: errorUpdateAvatar }] =
    useUpdateAvatarMutation()

  const [deleteAvatar, { isLoading: isLoadingDeleteAvatar, error: errorDeleteAvatar }] =
    useDeleteAvatarMutation()

  const currentIsLoading =
    isLoading ||
    isLoadingUpdateProfile ||
    isLoadingProfileData ||
    isLoadingAvatar ||
    isLoadingDeleteAvatar

  const currentError =
    error || errorProfileData || errorUpdateProfile || errorUpdateAvatar || errorDeleteAvatar

  const currentErrorHandler = (error: FetchBaseQueryError | SerializedError | undefined) => {
    errorHandler(error, notAuthorization, serverNotAvailable, networkError)
  }

  useEffect(() => {
    if (currentError) {
      currentErrorHandler(currentError)
    }
  }, [currentError])

  return {
    profileData,
    updateProfile,
    updateAvatar,
    deleteAvatar,
    currentIsLoading,
    isLoadingProfileData,
    currentErrorHandler,
  }
}
