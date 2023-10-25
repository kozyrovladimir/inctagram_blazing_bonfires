import {
  useEffect,
  useState,
  yupResolver,
  useRouter,
  useTranslation,
  Controller,
  useForm,
  Toaster,
  yup,
  styles,
  AutocompletionOfCities,
  ProfilePhoto,
  useGetProfileQuery,
  useUpdateProfileMutation,
  useMeQuery,
  useDeleteAvatarMutation,
  useUpdateAvatarMutation,
  Button,
  Input,
  InputType,
  LinearLoader,
  errorHandler,
  Calendar,
  PROFILE_PATH,
  SerializedError,
  FetchBaseQueryError,
  FieldErrors,
  ProfileUserType,
  GeneralInfoFields,
} from './imports'

export const GeneralInfo = () => {
  const router = useRouter()

  const {
    t,
    i18n: { t: tRoot },
  } = useTranslation('common', { keyPrefix: 'ProfileSettings' })
  const { t: tError } = useTranslation('common', { keyPrefix: 'Error' })

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

  const currentError =
    error || errorProfileData || errorUpdateProfile || errorUpdateAvatar || errorDeleteAvatar

  const currentIsLoading =
    isLoading ||
    isLoadingUpdateProfile ||
    isLoadingProfileData ||
    isLoadingAvatar ||
    isLoadingDeleteAvatar

  const currentErrorHandler = (error: FetchBaseQueryError | SerializedError | undefined) => {
    errorHandler(error, tError('NotAuthorization'), tError('TryAgain'), tError('NetworkError'))
  }

  if (currentError) {
    currentErrorHandler(currentError)
  }

  const [photo, setPhoto] = useState<Blob | null>(null)
  const [isDeleteAvatar, setIsDeleteAvatar] = useState(false)

  const profileSchema = yup.object().shape({
    userName: yup
      .string()
      .min(6, tError('MinCharactrers6'))
      .max(20, tError('MaxCharactrers30'))
      .matches(/[0-9A-Za-z_-]{6,20}$/, tError('UserNameValidationError'))
      .required(tError('RequiredField')),
    firstName: yup
      .string()
      .min(1, tError('MinCharactrers1'))
      .max(50, tError('MaxCharactrers50'))
      .matches(/^[A-ZА-Я][a-zа-я]{1,50}$/, tError('SrartLatterNotSpecial'))
      .required(tError('RequiredField')),
    lastName: yup
      .string()
      .min(1, tError('MinCharactrers1'))
      .max(50, tError('MaxCharactrers50'))
      .matches(/^[A-ZА-Я][a-zа-я]{1,50}$/, tError('SrartLatterNotSpecial'))
      .required(tError('RequiredField')),
    city: yup
      .string()
      .min(2, tError('MinCharactrers2'))
      .max(30, tError('MaxCharactrers30'))
      .matches(/^[A-ZА-Я][a-zа-я]{2,30}$/, tError('SrartLatterNotSpecial'))
      .required(tError('RequiredField')),
    dateOfBirth: yup
      .date()
      .max(new Date(new Date().setFullYear(new Date().getFullYear() - 13)), tError('MinAge'))
      .required(tError('RequiredField')),
    aboutMe: yup
      .string()
      .min(1, tError('MinCharactrers1'))
      .max(200, tError('MaxCharactrers200'))
      .required(tError('RequiredField')),
  })

  const {
    control,
    reset,
    watch,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileUserType | any>({
    mode: 'onChange',
    resolver: yupResolver(profileSchema),
    defaultValues: {
      userName: profileData?.userName ?? '',
      email: profileData?.email ?? '',
      password: profileData?.password ?? '',
      firstName: profileData?.firstName ?? '',
      lastName: profileData?.lastName ?? '',
      city: profileData?.city ?? '',
      dateOfBirth: profileData?.dateOfBirth ?? '',
      aboutMe: profileData?.aboutMe ?? '',
    },
  })

  useEffect(() => {
    reset(profileData)
  }, [isLoadingProfileData])

  const updateAvatarHandler = () => {
    if (isDeleteAvatar) {
      deleteAvatar()
        .unwrap()
        .then(() => {
          router.push(PROFILE_PATH)
        })
        .catch(error => currentErrorHandler(error))
    }
    if (photo) {
      const formData = new FormData()

      formData.set('file', photo as Blob)
      updateAvatar(formData)
        .unwrap()
        .then(() => {
          router.push(PROFILE_PATH)
        })
        .catch(error => currentErrorHandler(error))
    } else router.push(PROFILE_PATH)
  }

  const onSubmit = (data: ProfileUserType) => {
    updateProfile(data)
      .unwrap()
      .then(() => {
        updateAvatarHandler()
      })
      .catch(error => currentErrorHandler(error))
  }

  const allFields: GeneralInfoFields = [
    'userName',
    'firstName',
    'lastName',
    'dateOfBirth',
    'city',
    'aboutMe',
  ]

  watch()
  const isFillField = getValues(allFields).every(e => !!e)

  return (
    <>
      {currentIsLoading && <LinearLoader />}
      <Toaster position="top-right" />

      {!!profileData && (
        <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.content}>
            <div className={styles.photoContent}>
              <Controller
                name="avatars"
                control={control}
                render={({ field: { ref, ...args } }) => (
                  <ProfilePhoto
                    outsideOnChange={data => {
                      setPhoto(data as Blob)
                    }}
                    deleteAvatar={data => {
                      setIsDeleteAvatar(data)
                    }}
                    photoFromServer={profileData?.avatars}
                    {...args}
                  />
                )}
              />
            </div>
            <div className={styles.textFieldsContent}>
              {allFields.map(name => {
                switch (name) {
                  case 'dateOfBirth':
                    return (
                      <Controller
                        key={name}
                        name={name}
                        control={control}
                        render={({ field: { onChange, ref, ...args } }) => (
                          <div>
                            <label>{t('DateBirthday')}</label>
                            <Calendar
                              data={profileData.dateOfBirth}
                              outsideOnChange={onChange}
                              classNameWrap={styles.calendar}
                              {...args}
                            />
                            {errors && (
                              <p className={styles.error}>
                                {(errors as FieldErrors<ProfileUserType>)[name]?.message}
                              </p>
                            )}
                          </div>
                        )}
                      />
                    )
                  case 'city':
                    return (
                      <Controller
                        key={name}
                        name={name}
                        control={control}
                        render={({ field: { ref, ...args } }) => (
                          <div>
                            <label>{t('City')}</label>
                            <AutocompletionOfCities
                              error={(errors as FieldErrors<ProfileUserType>).city?.message}
                              {...args}
                            />
                          </div>
                        )}
                      />
                    )
                  case 'aboutMe':
                    return (
                      <Controller
                        key={name}
                        name={name}
                        control={control}
                        render={({ field }) => (
                          <>
                            <div className={styles.textareaContent}>
                              <label className={styles.aboutMeLabel}>{t('AboutMe')}</label>
                              <textarea
                                rows={4}
                                cols={50}
                                className={styles.aboutMeTextarea}
                                {...field}
                              />
                              {errors && (
                                <p className={styles.errorTextarea}>
                                  {(errors as FieldErrors<ProfileUserType>).aboutMe?.message}
                                </p>
                              )}
                            </div>
                          </>
                        )}
                      />
                    )
                  default:
                    return (
                      <Controller
                        key={name}
                        name={name}
                        control={control}
                        render={({ field }) => (
                          <Input
                            label={t(name.replace(name[0], name[0].toUpperCase()))}
                            type={InputType.TEXT}
                            error={(errors as FieldErrors<ProfileUserType>)[name]?.message}
                            classNameWrap={'myCustomLabel'}
                            placeholder=""
                            {...field}
                          />
                        )}
                      />
                    )
                }
              })}
            </div>
          </div>
          <div className={styles.footer}>
            <div className={styles.line}></div>
          </div>
          <Button className={styles.button} disabled={!isFillField}>
            {tRoot('SaveChanges')}
          </Button>
        </form>
      )}
    </>
  )
}
