import { useEffect, useState } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import { SerializedError } from '@reduxjs/toolkit'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { Controller, FieldErrors, useForm } from 'react-hook-form'
import { Toaster } from 'react-hot-toast'
import * as yup from 'yup'

import styles from './GeneralInfo.module.scss'

import { AutocompletionOfCities } from '@/features/profile-setting/generalInfo/autocompletion-of-cities/AutocompletionOfCities'
import { ProfilePhoto } from '@/features/profile-setting/ui/profilePhoto/ProfilePhoto'
import { useGetProfileQuery, useUpdateProfileMutation, useMeQuery } from '@/shared/api'
import {
  useDeleteAvatarMutation,
  useUpdateAvatarMutation,
} from '@/shared/api/services/profile/profile.api'
import { ProfileUserType } from '@/shared/api/services/profile/profile.api.types'
import { PROFILE_PATH } from '@/shared/constants/paths'
import { GeneralInfoFields } from '@/shared/types/profileSettingTypes'
import { Button } from '@/shared/ui/button/Button'
import { Input, InputType } from '@/shared/ui/input/Input'
import { LinearLoader } from '@/shared/ui/loaders/LinearLoader'
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
              <Controller
                name="userName"
                control={control}
                render={({ field }) => (
                  <Input
                    label={t('UserName')}
                    type={InputType.TEXT}
                    placeholder={''}
                    error={(errors as FieldErrors<ProfileUserType>).userName?.message}
                    classNameWrap={'myCustomLabel'}
                    {...field}
                  />
                )}
              />
              <Controller
                name="firstName"
                control={control}
                render={({ field }) => (
                  <Input
                    label={t('FirstName')}
                    placeholder={''}
                    type={InputType.TEXT}
                    error={(errors as FieldErrors<ProfileUserType>).firstName?.message}
                    classNameWrap={'myCustomLabel'}
                    {...field}
                  />
                )}
              />
              <Controller
                name="lastName"
                control={control}
                render={({ field }) => (
                  <Input
                    label={t('LastName')}
                    placeholder={''}
                    type={InputType.TEXT}
                    error={(errors as FieldErrors<ProfileUserType>).lastName?.message}
                    classNameWrap={'myCustomLabel'}
                    {...field}
                  />
                )}
              />
              <Controller
                name="dateOfBirth"
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
                        {(errors as FieldErrors<ProfileUserType>).dateOfBirth?.message}
                      </p>
                    )}
                  </div>
                )}
              />
              <Controller
                name="city"
                control={control}
                render={({ field: { ref, ...args } }) => (
                  <div>
                    <label>City</label>
                    <AutocompletionOfCities
                      error={(errors as FieldErrors<ProfileUserType>).city?.message}
                      {...args}
                    />
                  </div>
                )}
              />
              <div className={styles.textareaContent}>
                <label className={styles.aboutMeLabel}>{t('AboutMe')}</label>
                <Controller
                  name="aboutMe"
                  control={control}
                  render={({ field }) => (
                    <textarea
                      rows={4}
                      cols={50}
                      placeholder=""
                      className={styles.aboutMeTextarea}
                      {...field}
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