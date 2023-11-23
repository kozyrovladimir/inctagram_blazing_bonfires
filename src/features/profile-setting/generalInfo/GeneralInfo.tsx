import { useCallback, useEffect, useState } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import { SerializedError } from '@reduxjs/toolkit'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { Controller, FieldErrors, useForm } from 'react-hook-form'
import { Toaster } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import * as yup from 'yup'

import styles from './GeneralInfo.module.scss'

import { AutocompletionOfCities } from '@/features/profile-setting/generalInfo/autocompletion-of-cities/AutocompletionOfCities'
import { ProfilePhoto } from '@/features/profile-setting/ui/profilePhoto/ProfilePhoto'
import { useGetProfileQuery, useUpdateProfileMutation, useMeQuery } from '@/shared/api'
import {
  useDeleteAvatarMutation,
  useUpdateAvatarMutation,
} from '@/shared/api/services/profile/profile.api'
import { AvatarsType, ProfileUserType } from '@/shared/api/services/profile/profile.api.types'
import { RoutersPath } from '@/shared/constants/paths'
import { RootState } from '@/shared/providers/storeProvider'
import { setGeneralInfo } from '@/shared/providers/storeProvider/slices/profileSettings/generalInfoReducer'
import { Button } from '@/shared/ui/button/Button'
import { Input, InputType } from '@/shared/ui/input/Input'
import { LinearLoader } from '@/shared/ui/loaders/LinearLoader'
import { Modal } from '@/shared/ui/modal/Modal'
import { errorHandler } from '@/shared/utils/errorHandler'
import { Calendar } from '@/widgets/calendar/ui/Calendar'

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

  const currentIsLoading =
    isLoading ||
    isLoadingUpdateProfile ||
    isLoadingProfileData ||
    isLoadingAvatar ||
    isLoadingDeleteAvatar

  const currentErrorHandler = (error: FetchBaseQueryError | SerializedError | undefined) => {
    errorHandler(error, tError('NotAuthorization'), tError('TryAgain'), tError('NetworkError'))
  }

  const currentError =
    error || errorProfileData || errorUpdateProfile || errorUpdateAvatar || errorDeleteAvatar

  if (currentError) {
    currentErrorHandler(currentError)
  }

  const [photo, setPhoto] = useState<Blob | null>(null)
  const [isDeleteAvatar, setIsDeleteAvatar] = useState(false)
  const [isModal, setIsModal] = useState(false)
  const [forwardURL, setForwardURL] = useState('')
  const [isLeftPage, setIsLeftPage] = useState(false)

  const dispatch = useDispatch()

  const profileSchema = yup.object().shape({
    userName: yup
      .string()
      .min(6, tError('MinCharacters6'))
      .max(30, tError('MaxCharacters30'))
      .matches(/[0-9A-Za-z_-]{6,30}$/, tError('UserNameValidationError'))
      .nullable()
      .required(tError('RequiredField')),
    firstName: yup
      .string()
      .min(1, tError('MinCharacters1'))
      .max(50, tError('MaxCharacters50'))
      .matches(/^[A-ZА-Я][a-zа-я]{1,50}$/, tError('StartLatterNotSpecial'))
      .nullable()
      .required(tError('RequiredField')),
    lastName: yup
      .string()
      .min(1, tError('MinCharacters1'))
      .max(50, tError('MaxCharacters50'))
      .matches(/^[A-ZА-Я][a-zа-я]{1,50}$/, tError('StartLatterNotSpecial'))
      .nullable()
      .required(tError('RequiredField')),
    city: yup
      .string()
      .min(2, tError('MinCharacters2'))
      .max(30, tError('MaxCharacters30'))
      .nullable()
      .matches(/^[A-ZА-Я][a-zа-я]{2,30}$/, tError('StartLatterNotSpecial')),
    dateOfBirth: yup
      .date()
      .nullable()
      .max(new Date(new Date().setFullYear(new Date().getFullYear() - 13)), tError('MinAge')),
    aboutMe: yup.string().nullable().max(200, tError('MaxCharacters200')),
  })

  const {
    control,
    reset,
    handleSubmit,
    formState: { isDirty },
    trigger,
    getValues,
    formState: { errors },
  } = useForm<ProfileUserType | any>({
    mode: 'onChange',
    resolver: yupResolver(profileSchema),
    defaultValues: {
      userName: '',
      firstName: '',
      lastName: '',
      city: '',
      dateOfBirth: '',
      aboutMe: '',
    },
  })

  const cacheForm = () => {
    const currentForm: ProfileUserType = getValues()

    currentForm.dateOfBirth = new Date(currentForm.dateOfBirth as number).toISOString()

    let avatars: AvatarsType = []

    if (photo) {
      avatars.push({
        url: URL.createObjectURL(photo as Blob),
        fileSize: photo.size,
      })
    } else if (profileData && profileData?.avatars?.length > 0) {
      avatars = profileData.avatars
    }
    currentForm.avatars = avatars

    dispatch(setGeneralInfo(JSON.stringify(currentForm)))
  }

  const formStore: string =
    useSelector(state => (state as RootState).profileSetting.generalInfo) ?? ''
  const formCache: ProfileUserType = !!formStore && JSON.parse(formStore)

  const handleRouteChange = (url: string, { shallow }: { shallow: boolean }) => {
    const urlWithoutQuery = url.split('?')[1] ? url.split('?')[0] : url
    const currentURL = '/' + router.locale + router.asPath
    const privacyPolicyURL = '/' + router.locale + RoutersPath.authPrivacyPolicy

    if (urlWithoutQuery !== currentURL && urlWithoutQuery !== privacyPolicyURL) {
      setIsModal(true)
      setForwardURL(urlWithoutQuery)

      if (!shallow) {
        router.events.emit('routeChangeError')
        throw 'Abort route change. Please ignore this error.'
      }
    }
  }

  useEffect(() => {
    if (isDirty && !isLeftPage) {
      router.events.on('routeChangeStart', handleRouteChange)

      return () => {
        router.events.off('routeChangeStart', handleRouteChange)
      }
    }
  }, [isDirty, isLeftPage])

  useEffect(() => {
    if (formCache) {
      reset(formCache)
    } else if (profileData) {
      reset(profileData)
    }
  }, [isLoadingProfileData, profileData])

  useEffect(() => {
    const checkValidation = async () => {
      await trigger()
    }

    checkValidation()
  }, [trigger])

  const updateAvatarHandler = () => {
    if (isDeleteAvatar) {
      deleteAvatar()
        .unwrap()
        .then(() => {
          router.push(RoutersPath.profile)
        })
        .catch(error => currentErrorHandler(error))
    } else if (photo) {
      const formData = new FormData()

      formData.set('file', photo as Blob)
      updateAvatar(formData)
        .unwrap()
        .then(() => {
          router.push(RoutersPath.profile)
        })
        .catch(error => currentErrorHandler(error))
    } else {
      router.push(RoutersPath.profile)
    }
  }

  const onSubmit = (data: ProfileUserType) => {
    updateProfile(data)
      .unwrap()
      .then(() => {
        updateAvatarHandler()
      })
      .then(() => {
        dispatch(setGeneralInfo(''))
      })
      .catch(error => currentErrorHandler(error))
  }
  const handleLeftPageWithoutSave = () => {
    dispatch(setGeneralInfo(''))
    router.events.off('routeChangeStart', handleRouteChange)
    setIsLeftPage(true)
    setIsModal(false)
    router.push(forwardURL)
  }
  const handleCloseModal = () => {
    setIsModal(false)
  }

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
                render={({ field: { ref, value, ...args } }) => (
                  <ProfilePhoto
                    outsideOnChange={data => {
                      setPhoto(data as Blob)
                    }}
                    deleteAvatar={data => {
                      setIsDeleteAvatar(data)
                    }}
                    uploadPhoto={formCache ? formCache.avatars : profileData.avatars}
                    {...args}
                  />
                )}
              />
            </div>
            <div className={styles.textFieldsContent}>
              <Controller
                name="userName"
                control={control}
                render={({ field: { ref, value, ...args } }) => (
                  <Input
                    label={t('UserName')}
                    type={InputType.TEXT}
                    placeholder={''}
                    error={(errors as FieldErrors<ProfileUserType>).userName?.message}
                    classNameWrap={styles.myCustomLabel}
                    value={value ?? ''}
                    {...args}
                  />
                )}
              />
              <Controller
                name="firstName"
                control={control}
                render={({ field: { ref, value, ...args } }) => (
                  <Input
                    label={t('FirstName')}
                    placeholder={''}
                    type={InputType.TEXT}
                    error={(errors as FieldErrors<ProfileUserType>).firstName?.message}
                    classNameWrap={styles.myCustomLabel}
                    value={value ?? ''}
                    {...args}
                  />
                )}
              />
              <Controller
                name="lastName"
                control={control}
                render={({ field: { ref, value, ...args } }) => (
                  <Input
                    label={t('LastName')}
                    placeholder={''}
                    type={InputType.TEXT}
                    error={(errors as FieldErrors<ProfileUserType>).lastName?.message}
                    classNameWrap={styles.myCustomLabel}
                    value={value ?? ''}
                    {...args}
                  />
                )}
              />
              <Controller
                name="city"
                control={control}
                render={({ field: { ref, value, ...args } }) => (
                  <>
                    <label>{t('City')}</label>
                    <AutocompletionOfCities
                      error={(errors as FieldErrors<ProfileUserType>).city?.message}
                      {...args}
                    />
                  </>
                )}
              />
              <Controller
                name="dateOfBirth"
                control={control}
                render={({ field: { onChange, value, ref, ...args } }) => (
                  <div>
                    <label>{t('DateBirthday')}</label>
                    <Calendar
                      data={formCache ? formCache.dateOfBirth : profileData.dateOfBirth}
                      outsideOnChange={onChange}
                      classNameWrap={styles.calendar}
                      {...args}
                    />
                    {(errors as FieldErrors<ProfileUserType>).dateOfBirth && (
                      <p className={styles.errorCalendar}>
                        {(errors as FieldErrors<ProfileUserType>).dateOfBirth?.message}{' '}
                        <Link
                          href={{
                            pathname: `${RoutersPath.authPrivacyPolicy}`,
                            query: { previousPage: `${RoutersPath.profileGeneralInformation}` },
                          }}
                          className={styles.agreementLink}
                          onClick={() => cacheForm()}
                        >
                          {tRoot('PrivacyPolicy')}
                        </Link>
                      </p>
                    )}
                  </div>
                )}
              />

              <div className={styles.textareaContent}>
                <label className={styles.aboutMeLabel}>{t('AboutMe')}</label>
                <Controller
                  name="aboutMe"
                  control={control}
                  render={({ field: { ref, value, ...args } }) => (
                    <textarea
                      rows={4}
                      cols={50}
                      placeholder=""
                      className={styles.aboutMeTextarea}
                      value={value ?? ''}
                      {...args}
                    />
                  )}
                />
                {errors && (
                  <p className={styles.errorTextarea}>
                    {(errors as FieldErrors<ProfileUserType>).aboutMe?.message}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className={styles.line}></div>
          <Button className={styles.button}>{tRoot('SaveChanges')}</Button>
        </form>
      )}

      {isModal && (
        <Modal
          title={tRoot('Notification')}
          callBackCloseWindow={handleCloseModal}
          extraButtonCB={handleLeftPageWithoutSave}
          mainButtonCB={handleCloseModal}
          extraButton={tRoot('Yes')}
          mainButton={tRoot('No')}
        >
          {tRoot('LeftWithoutSave')}
        </Modal>
      )}
    </>
  )
}
