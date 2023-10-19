/* eslint-disable no-nested-ternary */
import { useEffect, useState } from 'react'
import * as React from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import { SerializedError } from '@reduxjs/toolkit'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { Controller, FieldErrors, useForm } from 'react-hook-form'
import { Toaster } from 'react-hot-toast'
import * as yup from 'yup'

import { ProfilePhoto } from '../ui/ProfilePhoto/ProfilePhoto'

import styles from './GeneralInfo.module.scss'

import { AutocompletionOfCities } from '@/features/profile-setting/GeneralInfo/Autocompletion_of_cities/AutocompletionOfCities'
import { useGetProfileQuery, useUpdateProfileMutation, useMeQuery } from '@/shared/api'
import {
  useDeleteAvatarMutation,
  useUpdateAvatarMutation,
} from '@/shared/api/services/profile/profile.api'
import { ProfileUserType } from '@/shared/api/services/profile/profile.api.types'
import { fieldGeneralInfo } from '@/shared/types/profileSettingTypes'
import { Button } from '@/shared/ui/Button/Button'
import { Input, InputType } from '@/shared/ui/Input/Input'
import { LinearLoader } from '@/shared/ui/Loaders/LinearLoader'
import { errorHandler } from '@/shared/utils/errorHandler'
import { Calendar } from '@/widgets/Calendar/ui/Calendar'

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

  const [updateProfile, { error: errorUpdateProfile }] = useUpdateProfileMutation()

  const [updateAvatar, { isLoading: isLoadingAvatar, error: errorUpdateAvatar }] =
    useUpdateAvatarMutation()

  const [deleteAvatar, { isLoading: isLoadingDeleteAvatar, error: errorDeleteAvatar }] =
    useDeleteAvatarMutation()

  const currentError =
    error || errorProfileData || errorUpdateProfile || errorUpdateAvatar || errorDeleteAvatar
  const currentIsLoading =
    isLoading || isLoadingProfileData || isLoadingAvatar || isLoadingDeleteAvatar
  const currentErrorHandler = (error: FetchBaseQueryError | SerializedError | undefined) => {
    errorHandler(error, tError('NotAuthorization'), tError('TryAgain'), tError('NetworkError'))
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

  if (currentError) {
    currentErrorHandler(currentError)
  }

  const onSubmit = (data: ProfileUserType) => {
    updateProfile(data)
      .unwrap()
      .then(() => {
        if (isDeleteAvatar) {
          deleteAvatar()
            .unwrap()
            .then(() => {
              router.push('/profile')
            })
            .catch(error => currentErrorHandler(error))
        }
        if (photo) {
          const formData = new FormData()

          formData.set('file', photo as Blob)
          updateAvatar(formData)
            .unwrap()
            .then(() => {
              router.push('/profile')
            })
            .catch(error => currentErrorHandler(error))
        } else {
          router.push('/profile')
        }
      })
      .catch(error => currentErrorHandler(error))
  }

  watch()

  const allFields: fieldGeneralInfo[] = [
    'userName',
    'firstName',
    'lastName',
    'dateOfBirth',
    'city',
    'aboutMe',
  ]
  const isFillField = getValues(allFields).every(e => !!e)

  return (
    <>
      {currentIsLoading && <LinearLoader />}
      <Toaster position="top-right" />

      {profileData && (
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
              {allFields.map(e => {
                return (
                  <Controller
                    key={e}
                    name={e}
                    control={control}
                    render={
                      e === 'dateOfBirth'
                        ? ({ field: { onChange, ref, ...args } }) => (
                            <>
                              <label className={styles.labelDate}>{t('DateBirthday')}</label>
                              <Calendar
                                data={profileData.dateOfBirth}
                                outsideOnChange={onChange}
                                classNameWrap={styles.calendar}
                                {...args}
                              />
                              {errors && (
                                <p className={styles.error}>
                                  {(errors as FieldErrors<ProfileUserType>)[e]?.message}
                                </p>
                              )}
                            </>
                          )
                        : e === 'city'
                        ? ({ field }) => (
                            <>
                              <label>{t('City')}</label>
                              <AutocompletionOfCities
                                error={(errors as FieldErrors<ProfileUserType>).city?.message}
                                {...field}
                              />
                            </>
                          )
                        : e === 'aboutMe'
                        ? ({ field }) => (
                            <>
                              <div className={styles.textareaContent}>
                                <label className={styles.aboutMeLabel}>{t('AboutMe')}</label>
                                <textarea
                                  rows={4}
                                  cols={50}
                                  placeholder=""
                                  className={styles.aboutMeTextarea}
                                  {...field}
                                />
                              </div>
                              {errors && (
                                <p className={styles.error}>
                                  {(errors as FieldErrors<ProfileUserType>).aboutMe?.message}
                                </p>
                              )}
                            </>
                          )
                        : ({ field }) => (
                            <Input
                              label={t(e.replace(e[0], e[0].toUpperCase()))}
                              type={InputType.TEXT}
                              placeholder={`Enter your ${e}`}
                              error={(errors as FieldErrors<ProfileUserType>)[e]?.message}
                              classNameWrap={'myCustomLabel'}
                              {...field}
                            />
                          )
                    }
                  />
                )
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
