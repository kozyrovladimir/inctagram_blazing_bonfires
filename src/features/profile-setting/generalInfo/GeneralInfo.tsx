import { useEffect, useState } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import { SerializedError } from '@reduxjs/toolkit'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import * as yup from 'yup'

import { GeneralInfoView } from '../ui/generalInfo/GeneralInfo'

import { useGetProfileQuery, useUpdateProfileMutation, useMeQuery } from '@/shared/api'
import {
  useDeleteAvatarMutation,
  useUpdateAvatarMutation,
} from '@/shared/api/services/profile/profile.api'
import { ProfileUserType } from '@/shared/api/services/profile/profile.api.types'
import { RoutersPath } from '@/shared/constants/paths'
import { useFormCache } from '@/shared/hooks/useFormCache'
import { setGeneralInfo } from '@/shared/providers/storeProvider/slices/profileSettings/generalInfoReducer'
import { errorHandler } from '@/shared/utils/errorHandler'

export const GeneralInfo = () => {
  const router = useRouter()

  const {
    t,
    i18n: { t: tRoot },
  } = useTranslation('common', { keyPrefix: 'ProfileSettings' })
  const { t: tError } = useTranslation('common', { keyPrefix: 'Error' })

  const [photo, setPhoto] = useState<Blob | null>(null)
  const [isDeleteAvatar, setIsDeleteAvatar] = useState(false)
  const [isModal, setIsModal] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const [forwardURL, setForwardURL] = useState('')
  const [isLeftPage, setIsLeftPage] = useState(false)
  const [isFormChanged, setIsFormChanged] = useState(false)

  const dispatch = useDispatch()

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

  if (currentError) {
    currentErrorHandler(currentError)
  }

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
    trigger,
    getValues,
    formState: { errors, isDirty },
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
  const { formCache, cacheForm } = useFormCache({
    getValues,
    setIsFormChanged,
    photo,
    profileData,
  })

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

  const handleRouteChange = (url: string, { shallow }: { shallow: boolean }) => {
    const urlWithoutQuery = url.split('?')[1]
      ? '/' + router.locale + url.split('?')[0]
      : '/' + router.locale + url
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
    if ((isDirty || isFormChanged || !!formCache) && !isLeftPage) {
      router.events.on('routeChangeStart', handleRouteChange)

      return () => {
        router.events.off('routeChangeStart', handleRouteChange)
      }
    }
  }, [isDirty, isLeftPage, isFormChanged, formCache])

  const settingsSaved = () => {
    setIsModal(true)
    setIsSaved(true)
  }

  const handleUpdateAvatar = () => {
    if (isDeleteAvatar) {
      deleteAvatar()
        .unwrap()
        .then(() => {
          settingsSaved()
        })
        .catch(error => currentErrorHandler(error))
    } else if (photo) {
      const formData = new FormData()

      formData.set('file', photo as Blob)
      updateAvatar(formData)
        .unwrap()
        .then(() => {
          settingsSaved()
        })
        .catch(error => currentErrorHandler(error))
    } else {
      settingsSaved()
    }
  }

  const handleLeftPageWithoutSave = () => {
    dispatch(setGeneralInfo(''))
    setIsLeftPage(true)
    setIsModal(false)
    router.push(forwardURL)
  }
  const handleCloseModal = () => {
    setIsModal(false)
    setIsSaved(false)
  }
  const handleDeleteAvatar = (data: boolean) => {
    setIsDeleteAvatar(data)
    setIsFormChanged(true)
  }
  const handleChangedAvatar = (data: Blob) => {
    setPhoto(data as Blob)
    setIsFormChanged(true)
  }

  const onSubmit = (data: ProfileUserType) => {
    updateProfile(data)
      .unwrap()
      .then(() => {
        handleUpdateAvatar()
      })
      .then(() => {
        dispatch(setGeneralInfo(''))
      })
      .catch(error => currentErrorHandler(error))
  }

  return (
    <GeneralInfoView
      currentIsLoading={currentIsLoading}
      profileData={profileData}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      control={control}
      handleChangedAvatar={handleChangedAvatar}
      handleDeleteAvatar={handleDeleteAvatar}
      formCache={formCache}
      errors={errors}
      cacheForm={cacheForm}
      translateFields={{
        userNameLabel: t('UserName'),
        firstNameLabel: t('FirstName'),
        lastNameLabel: t('LastName'),
        cityLabel: t('City'),
        dateOfBirthLabel: t('DateBirthday'),
        aboutMeLabel: t('AboutMe'),
        privacyPolicy: tRoot('PrivacyPolicy'),
        notification: tRoot('Notification'),
        yes: tRoot('Yes'),
        no: tRoot('No'),
        ok: tRoot('Ok'),
        saveChanges: tRoot('SaveChanges'),
        leftWithoutSave: tRoot('LeftWithoutSave'),
        settingsSaved: t('SettingsSaved'),
      }}
      isModal={isModal}
      isSaved={isSaved}
      handleCloseModal={handleCloseModal}
      handleLeftPageWithoutSave={handleLeftPageWithoutSave}
    />
    // </>
  )
}
