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
  errorHandler(
    error,
    tError('NotAuthorization'),
    tError('ServerNotAvailable'),
    tError('NetworkError')
  )
}

useEffect(() => {
  if (currentError) {
    currentErrorHandler(currentError)
  }
}, [currentError])
