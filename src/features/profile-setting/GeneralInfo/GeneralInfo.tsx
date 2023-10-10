/* eslint-disable no-console */
import { useEffect, useState } from 'react'
import * as React from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query/fetchBaseQuery'
import { useTranslation } from 'next-i18next'
import { Controller, FieldErrors, useForm } from 'react-hook-form'
import { toast, Toaster } from 'react-hot-toast'
import * as yup from 'yup'

import { ProfilePhoto } from '../ui/ProfilePhoto/ProfilePhoto'

import styles from './GeneralInfo.module.scss'

import { useGetProfileQuery, useUpdateProfileMutation, useMeQuery } from '@/shared/api'
import {
  useDeleteAvatarMutation,
  useUpdateAvatarMutation,
} from '@/shared/api/services/profile/profile.api'
import { BaseUserType, ProfileUserType } from '@/shared/api/services/profile/profile.api.types'
import { Button } from '@/shared/ui/Button/Button'
import { CircularProgressLoader } from '@/shared/ui/CircularProgressLoader/CircularProgressLoader'
import { Input, InputType } from '@/shared/ui/Input/Input'
import { Calendar } from '@/widgets/Calendar/ui/Calendar'

export const GeneralInfo = () => {
  const {
    t,
    i18n: { t: tRoot },
  } = useTranslation('common', { keyPrefix: 'ProfileSettings' })
  const { t: tError } = useTranslation('common', { keyPrefix: 'Error' })

  const { data, isError, error, isLoading } = useMeQuery()

  // не знаю как проверить что нам пришел айди в data из useMeQuery() - пока написал такой костыль(
  const {
    data: profileData,
    isError: isErrorProfileData,
    isLoading: isLoadingProfileData,
  } = useGetProfileQuery(data ? data?.userId : -1, { skip: isLoading })

  const [updateProfile, {}] = useUpdateProfileMutation()

  const [updateAvatar, { isLoading: isLoadingAvatar }] = useUpdateAvatarMutation()

  const [deleteAvatar, { isLoading: isLoadingDeleteAvatar }] = useDeleteAvatarMutation()

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
      .matches(/^[A-ZА-Я][a-zа-я]{1,50}$/, tError('SrartLatterNotSpecial')),
    lastName: yup
      .string()
      .min(1, tError('MinCharactrers1'))
      .max(50, tError('MaxCharactrers50'))
      .matches(/^[A-ZА-Я][a-zа-я]{1,50}$/, tError('SrartLatterNotSpecial')),
    city: yup
      .string()
      .min(2, tError('MinCharactrers2'))
      .max(30, tError('MaxCharactrers30'))
      .matches(/^[A-ZА-Я][a-zа-я]{2,30}$/, tError('SrartLatterNotSpecial')),
    dateOfBirth: yup.date(),
    aboutMe: yup.string().min(1, tError('MinCharactrers1')).max(200, tError('MaxCharactrers200')),
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
      dateOfBirth: profileData?.dateOfBirth ?? new Date(),
      aboutMe: profileData?.aboutMe ?? '',
    },
  })

  useEffect(() => {
    reset(profileData)
  }, [isLoadingProfileData])

  const onSubmit = (data: ProfileUserType) => {
    updateProfile(data)
      .unwrap()
      .then(() => {
        if (isDeleteAvatar) {
          deleteAvatar()
        }
        if (photo) {
          const formData = new FormData()

          formData.set('file', photo as Blob)

          updateAvatar(formData)
        }
      })
      .catch(error => {
        toast.error(error.data.messages[0].message)
        if (error && error.data) {
          const { statusCode } = error.data

          if (statusCode === 401) {
            console.log('You are not authorization, please enter in your account')
          }
        } else {
          alert('Network error')
        }
      })
  }

  if (isError) {
    const { status } = error as FetchBaseQueryError

    if (status === 401) {
      console.log('You are not authorized, please enter in your account')

      return <h2>You are not authorized, please enter in your account</h2>
    } else {
      return <h2>Network error. Sorry, offline mode isn&apos;t ready</h2>
    }
  }

  const onError = (errors: FieldErrors) => console.log(errors)

  watch()
  const isFillField = getValues([
    'userName',
    'firstName',
    'lastName',
    'dateOfBirth',
    'city',
    'aboutMe',
    'avatars',
  ]).every(e => !!e)

  return (
    <>
      <Toaster position="top-right" />
      {(isLoading || isLoadingProfileData || isLoadingAvatar || isLoadingDeleteAvatar) && (
        <CircularProgressLoader />
      )}

      {profileData && (
        <form className={styles.container} onSubmit={handleSubmit(onSubmit, onError)}>
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
                    placeholder="Enter your user-name"
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
              <label className={styles.labelDate}>{t('DateBirthday')}</label>
              <Controller
                name="dateOfBirth"
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, ref, ...args } }) => (
                  <Calendar
                    data={profileData}
                    outsideOnChange={onChange}
                    classNameWrap={styles.calendar}
                    {...args}
                  />
                )}
              />
              <Controller
                name="city"
                control={control}
                render={({ field }) => (
                  <Input
                    label={t('City')}
                    placeholder={''}
                    error={(errors as FieldErrors<ProfileUserType>).city?.message}
                    type={InputType.TEXT}
                    classNameWrap={'myCustomLabel'}
                    {...field}
                  />
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
                  <p className={styles.error}>
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
